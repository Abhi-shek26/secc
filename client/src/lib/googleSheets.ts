export type SheetTableData = {
  headers: string[];
  rows: string[][];
};

export type GoogleSheetTabRef = {
  id: string;
  title: string;
  gid?: string;
};

export function extractSheetId(sheetUrl: string): string | null {
  const match = sheetUrl.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  return match?.[1] ?? null;
}

interface GoogleSheetDataUrlOptions {
  gid?: string;
  sheetName?: string;
}

export function getGoogleSheetDataUrl(sheetUrl: string, options?: GoogleSheetDataUrlOptions): string | null {
  if (!sheetUrl) {
    return null;
  }

  const sheetId = extractSheetId(sheetUrl);
  if (!sheetId) {
    return null;
  }

  const params = new URLSearchParams({ tqx: "out:json" });

  if (options?.gid) {
    params.set("gid", options.gid);
  }

  if (options?.sheetName) {
    params.set("sheet", options.sheetName);
  }

  return `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?${params.toString()}`;
}

export function getGoogleWorksheetsFeedUrl(sheetUrl: string): string | null {
  if (!sheetUrl) {
    return null;
  }

  const sheetId = extractSheetId(sheetUrl);
  if (!sheetId) {
    return null;
  }

  return `https://spreadsheets.google.com/feeds/worksheets/${sheetId}/public/basic?alt=json`;
}

function parseGidFromLink(link?: string): string | undefined {
  if (!link) {
    return undefined;
  }

  const gidMatch = link.match(/[?&]gid=(\d+)/);
  return gidMatch?.[1];
}

export function parseGoogleWorksheetsFeed(payload: string): GoogleSheetTabRef[] {
  const parsed = JSON.parse(payload) as {
    feed?: {
      entry?: Array<{
        title?: { $t?: string };
        id?: { $t?: string };
        link?: Array<{ rel?: string; href?: string }>;
      }>;
    };
  };

  const entries = parsed.feed?.entry ?? [];

  return entries
    .map((entry, index) => {
      const title = entry.title?.$t?.trim() || `Sheet ${index + 1}`;
      const alternateLink = entry.link?.find((item) => item.rel === "alternate")?.href;
      const gid = parseGidFromLink(alternateLink);
      const id = entry.id?.$t || gid || `sheet-${index + 1}`;

      return { id, title, gid };
    })
    .filter((tab) => tab.title.length > 0);
}

export function parseGoogleSheetGvizResponse(payload: string): SheetTableData {
  const start = payload.indexOf("{");
  const end = payload.lastIndexOf("}");

  if (start === -1 || end === -1 || start >= end) {
    throw new Error("Invalid Google Sheets response format.");
  }

  const json = payload.slice(start, end + 1);
  const parsed = JSON.parse(json) as {
    table?: {
      cols?: { label?: string }[];
      rows?: { c?: Array<{ v?: unknown; f?: string } | null> }[];
    };
  };

  const cols = parsed.table?.cols ?? [];
  const sourceRows = parsed.table?.rows ?? [];
  const headers = cols.map((column, index) => column.label?.trim() || `Column ${index + 1}`);

  const rows = sourceRows
    .map((row) => {
      const cells = row.c ?? [];
      return headers.map((_, index) => {
        const cell = cells[index];
        if (!cell) {
          return "";
        }

        const value = cell.f ?? cell.v;
        return value === null || value === undefined ? "" : String(value);
      });
    })
    .filter((row) => row.some((cell) => cell.trim() !== ""));

  return { headers, rows };
}