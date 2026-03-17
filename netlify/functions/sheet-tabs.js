const cheerio = require("cheerio");

const SHEET_TABS_CACHE_TTL_MS = 10 * 1000;
let sheetTabsCache = {};

function extractGoogleSheetId(sheetUrl) {
  const match = sheetUrl.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : null;
}

async function fetchGoogleSheetTabs(sheetUrl) {
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
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch sheet metadata: ${response.status}`);
  }

  const html = await response.text();
  const $ = cheerio.load(html);
  const tabs = [];
  const seen = new Set();

  $(".docs-sheet-tab-caption").each((_, tab) => {
    const label = $(tab).text().trim();
    if (!label || seen.has(label)) {
      return;
    }

    seen.add(label);
    tabs.push(label);
  });

  return tabs;
}

exports.handler = async function handler(event) {
  try {
    const sheetUrl = (event.queryStringParameters?.sheetUrl || "").trim();
    const forceRefresh = event.queryStringParameters?.refresh === "1";

    if (!sheetUrl) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "Missing sheetUrl query parameter" }),
      };
    }

    const cached = sheetTabsCache[sheetUrl];
    const isFresh = cached && Date.now() - cached.fetchedAt < SHEET_TABS_CACHE_TTL_MS;

    if (!forceRefresh && isFresh) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "cache",
          tabs: cached.tabs,
          fetchedAt: new Date(cached.fetchedAt).toISOString(),
        }),
      };
    }

    const tabs = await fetchGoogleSheetTabs(sheetUrl);
    const fetchedAt = Date.now();
    sheetTabsCache[sheetUrl] = { tabs, fetchedAt };

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "live",
        tabs,
        fetchedAt: new Date(fetchedAt).toISOString(),
      }),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to discover sheet tabs";

    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    };
  }
};
