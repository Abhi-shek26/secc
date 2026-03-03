import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import * as cheerio from "cheerio";

const REGISTRANTS_URL =
  "https://www.chessregister.com/registrants?event_key=6OeZgtjyCj6SDFjtSJPtts1V04Ucuw73-2nkGVypuPY%3D";
const PLAYERS_CACHE_TTL_MS = 5 * 60 * 1000;

type Registrant = {
  section: string;
  name: string;
  rating: string;
  ratingUrl?: string;
  schedule?: string;
  byes?: string;
};

let playersCache: { players: Registrant[]; fetchedAt: number } | null = null;

async function fetchRegistrants(): Promise<Registrant[]> {
  const response = await fetch(REGISTRANTS_URL, {
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
  let currentSection = "Open";

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
          currentSection = sectionText.replace(/^-+\s*/, "").replace(/\s*-+$/, "").trim();
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

        if (!name || name === "Registrant Name") {
          return;
        }

        registrants.push({
          section: currentSection,
          name,
          rating,
          ratingUrl: ratingHref || undefined,
          schedule: schedule || undefined,
          byes: byes || undefined,
        });
      });
  });

  return registrants;
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

  return httpServer;
}
