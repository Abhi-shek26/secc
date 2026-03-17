import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TOURNAMENT_DATA, PAIRINGS_SHEET_URL, STANDINGS_SHEET_URL } from "@/lib/constants";
import {
  extractSheetId,
  getGoogleSheetDataUrl,
  parseGoogleSheetGvizResponse,
  type GoogleSheetTabRef,
  type SheetTableData,
} from "@/lib/googleSheets";
import { useQuery } from "@tanstack/react-query";
import { ClipboardList, Trophy } from "lucide-react";

type SheetTabsApiResponse = {
  tabs?: string[];
};

interface SheetTabData {
  id: string;
  value: string;
  title: string;
  tableData: SheetTableData;
}

interface TournamentSheetTableProps {
  tabsData?: SheetTabData[];
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  emptyMessage: string;
  variant: "pairings" | "standings";
}

function toTabValue(label: string, index: number): string {
  const normalized = label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return normalized ? `${normalized}-${index}` : `sheet-${index}`;
}

function parsePreferredSheetNames(value?: string): string[] {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((name) => name.trim())
    .filter(Boolean);
}

function getSheetTabsApiCandidates(): string[] {
  const configured = import.meta.env.VITE_SHEET_TABS_API_URL?.trim();
  const candidates: string[] = [];

  if (configured) {
    candidates.push(configured);
  }

  if (typeof window === "undefined") {
    return candidates;
  }

  candidates.push(`${window.location.origin}/api/sheet-tabs`);

  const hostname = window.location.hostname;
  const isLocalHost = hostname === "localhost" || hostname === "127.0.0.1";
  if (!isLocalHost) {
    candidates.push(`${window.location.protocol}//api.${hostname}/api/sheet-tabs`);
  }

  return Array.from(new Set(candidates));
}

function toSheetTabsApiUrl(baseOrFullUrl: string, sheetUrl: string): string | null {
  const sheetId = extractSheetId(sheetUrl);
  if (!sheetId) {
    return null;
  }

  const endpoint = /\/api\/sheet-tabs(\?|$)/.test(baseOrFullUrl)
    ? baseOrFullUrl
    : `${baseOrFullUrl.replace(/\/$/, "")}/api/sheet-tabs`;

  const url = new URL(endpoint);
  url.searchParams.set("sheetUrl", `https://docs.google.com/spreadsheets/d/${sheetId}/edit?usp=sharing`);
  url.searchParams.set("refresh", "1");
  return url.toString();
}

async function fetchSheetTableData(sheetUrl: string, tab?: GoogleSheetTabRef): Promise<SheetTableData> {
  const dataUrl = sheetUrl.includes("/gviz/tq")
    ? (() => {
        const url = new URL(sheetUrl);
        if (!url.searchParams.has("tqx")) {
          url.searchParams.set("tqx", "out:json");
        }
        if (tab?.gid) {
          url.searchParams.set("gid", tab.gid);
        } else if (tab && !tab.gid) {
          url.searchParams.set("sheet", tab.title);
        }
        return url.toString();
      })()
    : getGoogleSheetDataUrl(sheetUrl, {
        gid: tab?.gid,
        sheetName: tab && !tab.gid ? tab.title : undefined,
      });

  if (!dataUrl) {
    throw new Error("Invalid Google Sheet URL");
  }

  const response = await fetch(dataUrl);
  if (!response.ok) {
    throw new Error(`Failed to load sheet (${response.status})`);
  }

  const payload = await response.text();
  return parseGoogleSheetGvizResponse(payload);
}

async function discoverSheetTabs(sheetUrl: string, preferredSheetNames: string[]): Promise<GoogleSheetTabRef[]> {
  if (preferredSheetNames.length > 0) {
    return preferredSheetNames.map((name, index) => ({
      id: `preferred-${index}-${name}`,
      title: name,
    }));
  }

  const candidateBases = getSheetTabsApiCandidates();
  if (candidateBases.length === 0) {
    return [];
  }

  for (const candidateBase of candidateBases) {
    const tabsApiUrl = toSheetTabsApiUrl(candidateBase, sheetUrl);
    if (!tabsApiUrl) {
      continue;
    }

    try {
      const response = await fetch(tabsApiUrl);
      const contentType = response.headers.get("content-type") || "";

      if (!response.ok || !contentType.includes("application/json")) {
        continue;
      }

      const payload = (await response.json()) as SheetTabsApiResponse;
      const tabs = Array.isArray(payload.tabs) ? payload.tabs : [];

      return tabs
        .map((name, index) => {
          const title = name.trim();
          if (!title) {
            return null;
          }

          return {
            id: `live-${index}-${title}`,
            title,
          } satisfies GoogleSheetTabRef;
        })
        .filter((tab): tab is GoogleSheetTabRef => tab !== null);
    } catch {
      continue;
    }
  }

  return [];
}

async function fetchMultiSheetData(sheetUrl: string, preferredSheetNames: string[]): Promise<SheetTabData[]> {
  const discoveredTabs = await discoverSheetTabs(sheetUrl, preferredSheetNames);
  if (discoveredTabs.length > 0) {
    const loadedTabs = await Promise.all(
      discoveredTabs.map(async (tab, index) => {
        try {
          const tableData = await fetchSheetTableData(sheetUrl, tab);

          // Keep only tabs that contain at least one visible column.
          if (tableData.headers.length === 0) {
            return null;
          }

          return {
            id: tab.id,
            value: toTabValue(tab.title, index + 1),
            title: tab.title,
            tableData,
          } satisfies SheetTabData;
        } catch {
          return null;
        }
      }),
    );

    const tabsWithData = loadedTabs.filter((tab): tab is SheetTabData => tab !== null);
    if (tabsWithData.length > 0) {
      return tabsWithData;
    }
  }

  const fallbackData = await fetchSheetTableData(sheetUrl);
  if (fallbackData.headers.length === 0) {
    return [];
  }

  return [
    {
      id: "default-sheet",
      value: "overview-1",
      title: "Overview",
      tableData: fallbackData,
    },
  ];
}

function normalizeHeader(header: string): string {
  return header.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function findHeaderIndex(headers: string[], keys: string[]): number {
  const normalized = headers.map(normalizeHeader);
  return normalized.findIndex((header) => keys.some((key) => header.includes(normalizeHeader(key))));
}

function GenericSheetTable({ tableData }: { tableData: SheetTableData }) {
  return (
    <div className="overflow-x-auto rounded-md border">
      <table className="w-full text-sm">
        <thead className="bg-muted/60">
          <tr>
            {tableData.headers.map((header, index) => (
              <th
                key={`${header}-${index}`}
                className="text-left whitespace-nowrap py-3 px-4 font-semibold border-b uppercase tracking-wide text-xs"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.rows.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`} className="border-b last:border-0 even:bg-muted/20 hover:bg-muted/30">
              {row.map((cell, cellIndex) => (
                <td key={`row-${rowIndex}-cell-${cellIndex}`} className="py-3 px-4 align-top">
                  {cell || "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PairingsTournamentTable({ tableData }: { tableData: SheetTableData }) {
  const roundIndex = findHeaderIndex(tableData.headers, ["round"]);
  const boardIndex = findHeaderIndex(tableData.headers, ["board"]);
  const whiteIndex = findHeaderIndex(tableData.headers, ["white", "player1"]);
  const blackIndex = findHeaderIndex(tableData.headers, ["black", "player2"]);
  const resultIndex = findHeaderIndex(tableData.headers, ["result", "score"]);

  const hasTournamentColumns =
    roundIndex !== -1 && boardIndex !== -1 && whiteIndex !== -1 && blackIndex !== -1;

  if (!hasTournamentColumns) {
    return <GenericSheetTable tableData={tableData} />;
  }

  const groupedRounds = tableData.rows.reduce<Record<string, string[][]>>((acc, row) => {
    const round = row[roundIndex]?.trim() || "Current Round";
    if (!acc[round]) {
      acc[round] = [];
    }
    acc[round].push(row);
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      {Object.entries(groupedRounds).map(([round, roundRows]) => (
        <div key={round} className="rounded-md border">
          <div className="px-4 py-3 border-b bg-muted/50 font-semibold">Round {round}</div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/30">
                <tr>
                  <th className="text-left whitespace-nowrap py-2 px-4 font-semibold uppercase tracking-wide text-xs">Board</th>
                  <th className="text-left whitespace-nowrap py-2 px-4 font-semibold uppercase tracking-wide text-xs">White</th>
                  <th className="text-left whitespace-nowrap py-2 px-4 font-semibold uppercase tracking-wide text-xs">Black</th>
                  <th className="text-left whitespace-nowrap py-2 px-4 font-semibold uppercase tracking-wide text-xs">Result</th>
                </tr>
              </thead>
              <tbody>
                {roundRows.map((row, index) => (
                  <tr key={`${round}-${index}`} className="border-t even:bg-muted/15">
                    <td className="py-2 px-4 font-medium">{row[boardIndex] || "—"}</td>
                    <td className="py-2 px-4">{row[whiteIndex] || "—"}</td>
                    <td className="py-2 px-4">{row[blackIndex] || "—"}</td>
                    <td className="py-2 px-4">
                      <span className="inline-flex min-w-16 justify-center rounded border px-2 py-0.5 text-xs font-medium">
                        {resultIndex === -1 ? "Pending" : row[resultIndex] || "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

function StandingsTournamentTable({ tableData }: { tableData: SheetTableData }) {
  const rankIndex = findHeaderIndex(tableData.headers, ["rank", "standing", "position"]);
  const playerIndex = findHeaderIndex(tableData.headers, ["player", "fullname", "name"]);
  const pointsIndex = findHeaderIndex(tableData.headers, ["points", "score", "pts"]);

  const hasTournamentColumns = rankIndex !== -1 && playerIndex !== -1;
  if (!hasTournamentColumns) {
    return <GenericSheetTable tableData={tableData} />;
  }

  return (
    <div className="overflow-x-auto rounded-md border">
      <table className="w-full text-sm">
        <thead className="bg-muted/60">
          <tr>
            {tableData.headers.map((header, index) => (
              <th
                key={`${header}-${index}`}
                className={`whitespace-nowrap py-3 px-4 font-semibold border-b uppercase tracking-wide text-xs ${
                  index === rankIndex || index === pointsIndex ? "text-center" : "text-left"
                }`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.rows.map((row, rowIndex) => {
            const rankValue = row[rankIndex];
            const rankNumber = Number.parseInt(rankValue ?? "", 10);
            const isTopThree = Number.isFinite(rankNumber) && rankNumber > 0 && rankNumber <= 3;

            return (
              <tr
                key={`standing-${rowIndex}`}
                className={`border-b last:border-0 even:bg-muted/20 hover:bg-muted/30 ${isTopThree ? "bg-primary/5" : ""}`}
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={`standing-${rowIndex}-cell-${cellIndex}`}
                    className={`py-3 px-4 align-top ${
                      cellIndex === rankIndex || cellIndex === pointsIndex
                        ? "text-center font-semibold"
                        : cellIndex === playerIndex
                          ? "font-medium"
                          : ""
                    }`}
                  >
                    {cell || "—"}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function TournamentSheetTable({
  tabsData,
  isLoading,
  isError,
  errorMessage,
  emptyMessage,
  variant,
}: TournamentSheetTableProps) {
  if (isLoading) {
    return <p className="text-center py-8 text-muted-foreground">Loading latest results...</p>;
  }

  if (isError) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Unable to load sheet data right now.</p>
        {errorMessage ? <p className="mt-1 text-xs">{errorMessage}</p> : null}
      </div>
    );
  }

  if (!tabsData || tabsData.length === 0) {
    return <p className="text-center py-8 text-muted-foreground">{emptyMessage}</p>;
  }

  if (tabsData.length === 1) {
    return variant === "pairings" ? (
      <PairingsTournamentTable tableData={tabsData[0].tableData} />
    ) : (
      <StandingsTournamentTable tableData={tabsData[0].tableData} />
    );
  }

  return (
    <Tabs defaultValue={tabsData[0].value} className="w-full">
      <TabsList className="mb-4 h-auto w-full flex-wrap justify-start gap-2 bg-transparent p-0">
        {tabsData.map((tab) => (
          <TabsTrigger key={tab.id} value={tab.value} className="rounded-md border bg-background px-3 py-1.5">
            {tab.title}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabsData.map((tab) => (
        <TabsContent key={tab.id} value={tab.value}>
          {variant === "pairings" ? (
            <PairingsTournamentTable tableData={tab.tableData} />
          ) : (
            <StandingsTournamentTable tableData={tab.tableData} />
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
}

export default function Pairings() {
  const pairingsSheetUrl = import.meta.env.VITE_PAIRINGS_DATA_URL?.trim() || PAIRINGS_SHEET_URL;
  const standingsSheetUrl = import.meta.env.VITE_STANDINGS_DATA_URL?.trim() || STANDINGS_SHEET_URL;
  const preferredPairingsSheets = parsePreferredSheetNames(import.meta.env.VITE_PAIRINGS_SHEETS);
  const preferredStandingsSheets = parsePreferredSheetNames(import.meta.env.VITE_STANDINGS_SHEETS);

  const {
    data: pairingsTabs,
    isLoading: isPairingsLoading,
    isError: isPairingsError,
    error: pairingsError,
  } = useQuery<SheetTabData[]>({
    queryKey: ["pairings-sheet-tabs", pairingsSheetUrl, preferredPairingsSheets.join("|")],
    enabled: Boolean(pairingsSheetUrl),
    queryFn: async () => fetchMultiSheetData(pairingsSheetUrl as string, preferredPairingsSheets),
    staleTime: 10_000,
    refetchInterval: 20_000,
    refetchIntervalInBackground: true,
  });

  const {
    data: standingsTabs,
    isLoading: isStandingsLoading,
    isError: isStandingsError,
    error: standingsError,
  } = useQuery<SheetTabData[]>({
    queryKey: ["standings-sheet-tabs", standingsSheetUrl, preferredStandingsSheets.join("|")],
    enabled: Boolean(standingsSheetUrl),
    queryFn: async () => fetchMultiSheetData(standingsSheetUrl as string, preferredStandingsSheets),
    staleTime: 10_000,
    refetchInterval: 20_000,
    refetchIntervalInBackground: true,
  });

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <ClipboardList className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4" data-testid="text-pairings-title">
            Pairings & Standings
          </h1>
          <p className="text-muted-foreground text-lg">
            {TOURNAMENT_DATA.name}
          </p>
        </div>

        <Tabs defaultValue="pairings" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="pairings" data-testid="tab-pairings">Pairings</TabsTrigger>
            <TabsTrigger value="standings" data-testid="tab-standings">Standings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pairings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="h-5 w-5" />
                  Round Pairings
                </CardTitle>
              </CardHeader>
              <CardContent>
                {pairingsSheetUrl ? (
                  <>
                    <TournamentSheetTable
                      tabsData={pairingsTabs}
                      isLoading={isPairingsLoading}
                      isError={isPairingsError}
                      errorMessage={pairingsError instanceof Error ? pairingsError.message : undefined}
                      emptyMessage="Pairings will be posted here on tournament day."
                      variant="pairings"
                    />

                    <div className="mt-8 space-y-4">
                      <h3 className="font-semibold text-lg">Sections</h3>
                      <div className="grid gap-3">
                        <div className="p-4 bg-muted/50 rounded-md">
                          <p className="font-medium">Women's Open</p>
                          <p className="text-sm text-muted-foreground">{TOURNAMENT_DATA.timeControls.openWomen.format}</p>
                        </div>
                        <div className="p-4 bg-muted/50 rounded-md">
                          <p className="font-medium">Girls K-12, K-8, K-5, K-3</p>
                          <p className="text-sm text-muted-foreground">{TOURNAMENT_DATA.timeControls.scholastic.format}</p>
                        </div>
                        <div className="p-4 bg-muted/50 rounded-md">
                          <p className="font-medium">Family & Friends / Unrated</p>
                          <p className="text-sm text-muted-foreground">{TOURNAMENT_DATA.timeControls.scholastic.format}</p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-center py-12">
                      <p className="text-muted-foreground text-lg mb-4">
                        Pairings will be posted here on tournament day.
                      </p>
                      <p className="text-muted-foreground">
                        Check back on {TOURNAMENT_DATA.date} for live updates.
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="standings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Tournament Standings
                </CardTitle>
              </CardHeader>
              <CardContent>
                {standingsSheetUrl ? (
                  <TournamentSheetTable
                    tabsData={standingsTabs}
                    isLoading={isStandingsLoading}
                    isError={isStandingsError}
                    errorMessage={standingsError instanceof Error ? standingsError.message : undefined}
                    emptyMessage="Standings will be posted here during the tournament."
                    variant="standings"
                  />
                ) : (
                  <>
                    <div className="text-center py-12">
                      <p className="text-muted-foreground text-lg mb-4">
                        Standings will be posted here during the tournament.
                      </p>
                      <p className="text-muted-foreground">
                        Results will be updated after each round.
                      </p>
                    </div>

                    <div className="mt-8">
                      <h3 className="font-semibold text-lg mb-4">Tiebreak Procedures</h3>
                      <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                        {TOURNAMENT_DATA.tiebreaks.map((tiebreak, index) => (
                          <li key={index}>{tiebreak}</li>
                        ))}
                      </ol>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
