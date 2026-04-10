import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import * as cheerio from "cheerio";

const REGISTRANTS_SOURCES = [
  {
    section: "Open",
    url: "https://www.chessregister.com/registrants?event_key=6OeZgtjyCj6SDFjtSJPtts1V04Ucuw73-2nkGVypuPY%3D",
  },
  {
    section: "Girls",
    url: "https://www.chessregister.com/registrants?event_key=7GirNtG8DsjEGkmQZqlLxM1V04Ucuw73-2nkGVypuPY%3D",
  },
  {
    section: "Unrated",
    url: "https://www.chessregister.com/registrants?event_key=29LIKyXgHBd5g0o0HrhAEs1V04Ucuw73-2nkGVypuPY%3D",
  },
  {
    section: "Family & Friends",
    url: "https://www.chessregister.com/registrants?event_key=o0mSOO83WQmAOiHwHySmcc1V04Ucuw73-2nkGVypuPY%3D",
  },
] as const;
const PLAYERS_CACHE_TTL_MS = 5 * 60 * 1000;
const SHEET_TABS_CACHE_TTL_MS = 10 * 1000;

type Registrant = {
  section: string;
  subSection?: string;
  name: string;
  rating: string;
  ratingUrl?: string;
  schedule?: string;
  byes?: string;
  team?: string;
};

function normalizeLabel(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function resolveSectionLabel(baseSection: string, subSection?: string): string {
  if (normalizeLabel(baseSection) !== "girls") {
    return baseSection;
  }

  const normalizedSubSection = normalizeLabel(subSection || "");
  if (normalizedSubSection === "k12") {
    return "Girls K-12";
  }
  if (normalizedSubSection === "k8") {
    return "Girls K-8";
  }
  if (normalizedSubSection === "k5") {
    return "Girls K-5";
  }
  if (normalizedSubSection === "k3") {
    return "Girls K-3";
  }

  return baseSection;
}

let playersCache: { players: Registrant[]; fetchedAt: number } | null = null;
let sheetTabsCache: Record<string, { tabs: string[]; fetchedAt: number }> = {};

function extractGoogleSheetId(sheetUrl: string): string | null {
  const match = sheetUrl.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  return match?.[1] ?? null;
}

async function fetchGoogleSheetTabs(sheetUrl: string): Promise<string[]> {
  const sheetId = extractGoogleSheetId(sheetUrl);
  if (!sheetId) {
    throw new Error("Invalid Google Sheet URL");
  }

  const editUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/edit?usp=sharing`;
  const response = await fetch(editUrl, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; Brief-Architect/1.0)",
      Accept: "text/html",
    },
    signal: AbortSignal.timeout(15000),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch sheet metadata: ${response.status}`);
  }

  const html = await response.text();
  const $ = cheerio.load(html);
  const tabNames: string[] = [];
  const seen = new Set<string>();

  $(".docs-sheet-tab-caption").each((_, tab) => {
    const label = $(tab).text().trim();
    if (!label || seen.has(label)) {
      return;
    }

    seen.add(label);
    tabNames.push(label);
  });

  return tabNames;
}

async function fetchRegistrantsFromUrl(url: string, fallbackSection: string): Promise<Registrant[]> {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; Brief-Architect/1.0)",
      Accept: "text/html",
    },
    signal: AbortSignal.timeout(15000),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch registrants: ${response.status}`);
  }

  const html = await response.text();
  const $ = cheerio.load(html);
  const registrants: Registrant[] = [];
  const currentSection = fallbackSection;
  let currentSubSection: string | undefined;

  $("table").each((_, table) => {
    const hasRegistrantHeader =
      $(table).find("th").filter((_, th) => $(th).text().trim() === "Registrant Name").length > 0;

    if (!hasRegistrantHeader) {
      return;
    }

    $(table)
      .find("tr")
      .each((_, row) => {
        const sectionCell = $(row).find("th[colspan]").first();
        const sectionText = sectionCell.text().trim().replace(/\s+/g, " ");

        if (sectionText.includes("---") && sectionText.length > 0) {
          const parsedSubSection = sectionText.replace(/^-+\s*/, "").replace(/\s*-+$/, "").trim();
          currentSubSection =
            parsedSubSection &&
            normalizeLabel(parsedSubSection) !== normalizeLabel(fallbackSection)
              ? parsedSubSection
              : undefined;
          return;
        }

        const columns = $(row).find("td");
        if (columns.length < 2) {
          return;
        }

        const name = columns.eq(0).text().trim().replace(/\s+/g, " ");
        const rating = columns.eq(1).text().trim().replace(/\s+/g, " ") || "—";
        const ratingHref = columns.eq(1).find("a").attr("href");
        const schedule = columns.eq(2).text().trim().replace(/\s+/g, " ");
        const byes = columns.eq(3).text().trim().replace(/\s+/g, " ");
        const team = columns.eq(4).text().trim().replace(/\s+/g, " ");

        if (!name || name === "Registrant Name") {
          return;
        }

        registrants.push({
          section: resolveSectionLabel(currentSection, currentSubSection),
          subSection: currentSubSection,
          name,
          rating,
          ratingUrl: ratingHref || undefined,
          schedule: schedule || undefined,
          byes: byes || undefined,
          team: team || undefined,
        });
      });
  });

  return registrants;
}

async function fetchRegistrants(): Promise<Registrant[]> {
  const registrantsBySource = await Promise.all(
    REGISTRANTS_SOURCES.map(async ({ section, url }) => fetchRegistrantsFromUrl(url, section)),
  );

  return registrantsBySource.flat();
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  app.get("/api/players", async (req, res) => {
    try {
      const forceRefresh = req.query.refresh === "1";
      const cacheFresh =
        playersCache && Date.now() - playersCache.fetchedAt < PLAYERS_CACHE_TTL_MS;

      if (!forceRefresh && cacheFresh && playersCache) {
        return res.json({
          source: "cache",
          fetchedAt: new Date(playersCache.fetchedAt).toISOString(),
          count: playersCache.players.length,
          players: playersCache.players,
        });
      }

      const players = await fetchRegistrants();
      playersCache = { players, fetchedAt: Date.now() };

      return res.json({
        source: "live",
        fetchedAt: new Date(playersCache.fetchedAt).toISOString(),
        count: players.length,
        players,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to sync players";

      if (playersCache) {
        return res.status(200).json({
          source: "stale-cache",
          fetchedAt: new Date(playersCache.fetchedAt).toISOString(),
          count: playersCache.players.length,
          players: playersCache.players,
          warning: message,
        });
      }

      return res.status(500).json({ message });
    }
  });

  app.get("/api/sheet-tabs", async (req, res) => {
    try {
      const sheetUrl = String(req.query.sheetUrl || "").trim();
      const forceRefresh = req.query.refresh === "1";

      if (!sheetUrl) {
        return res.status(400).json({ message: "Missing sheetUrl query parameter" });
      }

      const cached = sheetTabsCache[sheetUrl];
      const isFresh = cached && Date.now() - cached.fetchedAt < SHEET_TABS_CACHE_TTL_MS;
      if (!forceRefresh && isFresh) {
        return res.json({ source: "cache", tabs: cached.tabs, fetchedAt: new Date(cached.fetchedAt).toISOString() });
      }

      const tabs = await fetchGoogleSheetTabs(sheetUrl);
      const fetchedAt = Date.now();
      sheetTabsCache[sheetUrl] = { tabs, fetchedAt };

      return res.json({ source: "live", tabs, fetchedAt: new Date(fetchedAt).toISOString() });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to discover sheet tabs";
      return res.status(500).json({ message });
    }
  });

  return httpServer;
}
