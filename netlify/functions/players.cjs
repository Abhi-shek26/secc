const cheerio = require("cheerio");

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
];
const PLAYERS_CACHE_TTL_MS = 5 * 60 * 1000;

let playersCache = null;

function normalizeLabel(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function resolveSectionLabel(baseSection, subSection) {
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

async function fetchRegistrantsFromUrl(url, fallbackSection) {
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
  const registrants = [];
  const currentSection = fallbackSection;
  let currentSubSection;

  $("table").each((_, table) => {
    const hasRegistrantHeader =
      $(table)
        .find("th")
        .filter((_, th) => $(th).text().trim() === "Registrant Name").length > 0;

    if (!hasRegistrantHeader) {
      return;
    }

    $(table)
      .find("tr")
      .each((_, row) => {
        const sectionCell = $(row).find("th[colspan]").first();
        const sectionText = sectionCell.text().trim().replace(/\s+/g, " ");

        if (sectionText.includes("---") && sectionText.length > 0) {
          const parsedSubSection = sectionText
            .replace(/^-+\s*/, "")
            .replace(/\s*-+$/, "")
            .trim();
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

async function fetchRegistrants() {
  const registrantsBySource = await Promise.all(
    REGISTRANTS_SOURCES.map(({ section, url }) => fetchRegistrantsFromUrl(url, section)),
  );

  return registrantsBySource.flat();
}

exports.handler = async function handler(event) {
  try {
    const forceRefresh = event.queryStringParameters?.refresh === "1";
    const cacheFresh =
      playersCache && Date.now() - playersCache.fetchedAt < PLAYERS_CACHE_TTL_MS;

    if (!forceRefresh && cacheFresh && playersCache) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "cache",
          fetchedAt: new Date(playersCache.fetchedAt).toISOString(),
          count: playersCache.players.length,
          players: playersCache.players,
        }),
      };
    }

    const players = await fetchRegistrants();
    playersCache = { players, fetchedAt: Date.now() };

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "live",
        fetchedAt: new Date(playersCache.fetchedAt).toISOString(),
        count: players.length,
        players,
      }),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to sync players";

    if (playersCache) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "stale-cache",
          fetchedAt: new Date(playersCache.fetchedAt).toISOString(),
          count: playersCache.players.length,
          players: playersCache.players,
          warning: message,
        }),
      };
    }

    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    };
  }
};
