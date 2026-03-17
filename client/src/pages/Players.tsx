import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TOURNAMENT_DATA, PREREGISTERED_PLAYERS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { Users } from "lucide-react";

type PlayerRow = {
  section?: string;
  name: string;
  rating: string;
  ratingUrl?: string;
  schedule?: string;
  byes?: string;
};

interface PlayerSectionProps {
  title: string;
  players: PlayerRow[];
}

type PlayersApiResponse = {
  source: "cache" | "live" | "stale-cache";
  fetchedAt: string;
  count: number;
  players: PlayerRow[];
  warning?: string;
};

type EventSection = {
  id: string;
  title: string;
  players: PlayerRow[];
};

const EVENT_TITLES = [
  "Open",
  "Girls K-12",
  "Girls K-8",
  "Girls K-5",
  "Girls K-3",
  "Family & Friends",
  "Unrated",
] as const;

function normalizeSection(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function toTabId(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function PlayerSection({ title, players }: PlayerSectionProps) {
  return (
    <Card className="mb-6" data-testid={`card-section-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <span className="text-center w-full">--- {title} ---</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {players.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-lg">Players to be announced</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-4 font-medium text-muted-foreground">Registrant Name</th>
                  <th className="text-left py-2 px-4 font-medium text-muted-foreground">Rating</th>
                  <th className="text-left py-2 px-4 font-medium text-muted-foreground">Schedule</th>
                  <th className="text-left py-2 px-4 font-medium text-muted-foreground">Byes</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player, index) => (
                  <tr key={index} className="border-b border-border/50 last:border-0" data-testid={`row-player-${index}`}>
                    <td className="py-3 px-4">{player.name}</td>
                    <td className="py-3 px-4 text-primary">
                      {player.ratingUrl ? (
                        <a
                          href={player.ratingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline"
                          data-testid={`link-rating-${index}`}
                        >
                          {player.rating}
                        </a>
                      ) : (
                        player.rating
                      )}
                    </td>
                    <td className="py-3 px-4">{player.schedule ?? "—"}</td>
                    <td className="py-3 px-4">{player.byes ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function Players() {
  const configuredPlayersApiUrl = import.meta.env.VITE_PLAYERS_API_URL?.trim();
  const computedProductionApiUrl = (() => {
    if (!import.meta.env.PROD || typeof window === "undefined") {
      return "/api/players?refresh=1";
    }

    const hostname = window.location.hostname;
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return "/api/players?refresh=1";
    }

    return `${window.location.protocol}//api.${hostname}/api/players?refresh=1`;
  })();
  const playersApiUrl = configuredPlayersApiUrl || computedProductionApiUrl;

  const { data, isLoading, isError, error } = useQuery<PlayersApiResponse>({
    queryKey: [playersApiUrl],
    queryFn: async () => {
      const response = await fetch(playersApiUrl);
      const contentType = response.headers.get("content-type") || "";

      if (!response.ok) {
        throw new Error(`Failed to load players: ${response.status}`);
      }

      if (!contentType.includes("application/json")) {
        const preview = (await response.text()).slice(0, 120).replace(/\s+/g, " ");
        throw new Error(
          `API did not return JSON (content-type: ${contentType || "unknown"}). Preview: ${preview}`,
        );
      }

      return response.json();
    },
    staleTime: 0,
    refetchOnMount: true,
  });

  const livePlayers = data?.players ?? [];
  const hasLivePlayers = livePlayers.length > 0;
  const groupedLivePlayers = livePlayers.reduce<Record<string, PlayerRow[]>>((acc, player) => {
    const sectionName = player.section?.trim() || "Open";
    if (!acc[sectionName]) {
      acc[sectionName] = [];
    }
    acc[sectionName].push(player);
    return acc;
  }, {});

  const fallbackSections: EventSection[] = [
    { id: toTabId("Open"), title: "Open", players: PREREGISTERED_PLAYERS.Open },
    { id: toTabId("Girls K-12"), title: "Girls K-12", players: PREREGISTERED_PLAYERS.girlsK12 },
    { id: toTabId("Girls K-8"), title: "Girls K-8", players: PREREGISTERED_PLAYERS.girlsK8 },
    { id: toTabId("Girls K-5"), title: "Girls K-5", players: PREREGISTERED_PLAYERS.girlsK5 },
    { id: toTabId("Girls K-3"), title: "Girls K-3", players: PREREGISTERED_PLAYERS.girlsK3 },
    { id: toTabId("Family & Friends"), title: "Family & Friends", players: PREREGISTERED_PLAYERS.familyFriends },
    { id: toTabId("Unrated"), title: "Unrated", players: PREREGISTERED_PLAYERS.unrated },
  ];

  const liveSections: EventSection[] = (() => {
    const liveByNormalizedSection = new Map<string, { title: string; players: PlayerRow[] }>();

    Object.entries(groupedLivePlayers).forEach(([title, players]) => {
      liveByNormalizedSection.set(normalizeSection(title), { title, players });
    });

    const knownSections = EVENT_TITLES.map((title) => {
      const normalizedTitle = normalizeSection(title);
      const entry = liveByNormalizedSection.get(normalizedTitle);
      return {
        id: toTabId(title),
        title,
        players: entry?.players ?? [],
      };
    });

    const knownKeys = new Set(EVENT_TITLES.map((title) => normalizeSection(title)));
    const extraSections = Array.from(liveByNormalizedSection.entries())
      .filter(([key]) => !knownKeys.has(key))
      .map(([, entry]) => ({
        id: toTabId(entry.title),
        title: entry.title,
        players: entry.players,
      }));

    return [...knownSections, ...extraSections];
  })();

  const sectionsToDisplay = hasLivePlayers
    ? [...liveSections].sort((a, b) => {
        const countDiff = b.players.length - a.players.length;
        if (countDiff !== 0) {
          return countDiff;
        }
        return a.title.localeCompare(b.title);
      })
    : fallbackSections;
  const defaultTabValue =
    sectionsToDisplay.find((section) => section.players.length > 0)?.id ||
    sectionsToDisplay[0]?.id ||
    "open";

  const totalPlayers = Object.values(PREREGISTERED_PLAYERS).reduce(
    (acc, section) => acc + section.length, 
    0
  );

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <Users className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4" data-testid="text-players-title">
            Pre-Registered Players
          </h1>
          <p className="text-muted-foreground text-lg">
            Event Registrants for {TOURNAMENT_DATA.name}
          </p>
        </div>

        {isLoading ? (
          <Card className="mb-6">
            <CardContent className="py-8 text-center text-muted-foreground">
              Loading registrants...
            </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue={defaultTabValue}>
            <TabsList className="mb-4 h-auto w-full flex-wrap justify-start gap-2 bg-transparent p-0">
              {sectionsToDisplay.map((section) => (
                <TabsTrigger
                  key={section.id}
                  value={section.id}
                  className="rounded-md border bg-background px-3 py-1.5"
                  data-testid={`tab-section-${section.id}`}
                >
                  {section.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {sectionsToDisplay.map((section) => (
              <TabsContent key={section.id} value={section.id}>
                <PlayerSection title={section.title} players={section.players} />
              </TabsContent>
            ))}
          </Tabs>
        )}

        {isError ? (
          <Card className="mb-6">
            <CardContent className="py-8 text-center text-muted-foreground">
              <p>Unable to load live registrants from API.</p>
              <p className="mt-1 text-xs">Showing fallback list below.</p>
              <p className="mt-1 text-xs break-all">{error instanceof Error ? error.message : "Unknown error"}</p>
            </CardContent>
          </Card>
        ) : null}

        <div className="mt-8 text-center text-muted-foreground text-sm">
          <p>
            * Player list is updated regularly.
            {hasLivePlayers ? ` Last sync: ${new Date(data?.fetchedAt ?? "").toLocaleString()}` : " Registration closes May 7, 2026."}
          </p>
          {!hasLivePlayers && totalPlayers === 0 ? (
            <p className="mt-1">No local preregistered players yet.</p>
          ) : null}
        </div>
      </div>
    </Layout>
  );
}
