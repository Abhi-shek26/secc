export type SheetTableData = {
  headers: string[];
  rows: string[][];
};

function extractSheetId(sheetUrl: string): string | null {
  const match = sheetUrl.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  return match?.[1] ?? null;
}

export function getGoogleSheetDataUrl(sheetUrl: string): string | null {
  if (!sheetUrl) {
    return null;
  }

  const sheetId = extractSheetId(sheetUrl);
  if (!sheetId) {
    return null;
  }

  return `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;
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