import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TOURNAMENT_DATA, PREREGISTERED_PLAYERS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { Users } from "lucide-react";

interface PlayerSectionProps {
  title: string;
  players: {
    section?: string;
    name: string;
    rating: string;
    ratingUrl?: string;
    schedule?: string;
    byes?: string;
  }[];
}

type PlayersApiResponse = {
  source: "cache" | "live" | "stale-cache";
  fetchedAt: string;
  count: number;
  players: {
    section?: string;
    name: string;
    rating: string;
    ratingUrl?: string;
    schedule?: string;
    byes?: string;
  }[];
  warning?: string;
};

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
  const playersApiUrl = import.meta.env.VITE_PLAYERS_API_URL?.trim() || "/api/players?refresh=1";

  const { data, isLoading } = useQuery<PlayersApiResponse>({
    queryKey: [playersApiUrl],
    queryFn: async () => {
      const response = await fetch(playersApiUrl);
      if (!response.ok) {
        throw new Error(`Failed to load players: ${response.status}`);
      }
      return response.json();
    },
    staleTime: 0,
    refetchOnMount: true,
  });

  const livePlayers = data?.players ?? [];
  const hasLivePlayers = livePlayers.length > 0;
  const groupedLivePlayers = livePlayers.reduce<Record<string, typeof livePlayers>>((acc, player) => {
    const sectionName = player.section?.trim() || "Open";
    if (!acc[sectionName]) {
      acc[sectionName] = [];
    }
    acc[sectionName].push(player);
    return acc;
  }, {});

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
        ) : hasLivePlayers ? (
          Object.entries(groupedLivePlayers).map(([sectionName, sectionPlayers]) => (
            <PlayerSection key={sectionName} title={sectionName} players={sectionPlayers} />
          ))
        ) : (
          <>
            <PlayerSection title="Women's Open" players={PREREGISTERED_PLAYERS.womensOpen} />
            <PlayerSection title="Girls K-12" players={PREREGISTERED_PLAYERS.girlsK12} />
            <PlayerSection title="Girls K-8" players={PREREGISTERED_PLAYERS.girlsK8} />
            <PlayerSection title="Girls K-5" players={PREREGISTERED_PLAYERS.girlsK5} />
            <PlayerSection title="Girls K-3" players={PREREGISTERED_PLAYERS.girlsK3} />
            <PlayerSection title="Family & Friends" players={PREREGISTERED_PLAYERS.familyFriends} />
            <PlayerSection title="Unrated" players={PREREGISTERED_PLAYERS.unrated} />
          </>
        )}

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
