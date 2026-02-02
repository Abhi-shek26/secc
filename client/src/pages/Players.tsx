import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TOURNAMENT_DATA, PREREGISTERED_PLAYERS } from "@/lib/constants";
import { Users } from "lucide-react";

interface PlayerSectionProps {
  title: string;
  players: { name: string; rating: string }[];
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
                </tr>
              </thead>
              <tbody>
                {players.map((player, index) => (
                  <tr key={index} className="border-b border-border/50 last:border-0" data-testid={`row-player-${index}`}>
                    <td className="py-3 px-4">{player.name}</td>
                    <td className="py-3 px-4 text-primary">{player.rating}</td>
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

        <PlayerSection title="Women's Open" players={PREREGISTERED_PLAYERS.womensOpen} />
        <PlayerSection title="Women's U1800" players={PREREGISTERED_PLAYERS.womensU1800} />
        <PlayerSection title="Girls K-12" players={PREREGISTERED_PLAYERS.girlsK12} />
        <PlayerSection title="Girls K-8" players={PREREGISTERED_PLAYERS.girlsK8} />
        <PlayerSection title="Girls K-5" players={PREREGISTERED_PLAYERS.girlsK5} />
        <PlayerSection title="Girls K-3" players={PREREGISTERED_PLAYERS.girlsK3} />
        <PlayerSection title="Family & Friends" players={PREREGISTERED_PLAYERS.familyFriends} />
        <PlayerSection title="Unrated" players={PREREGISTERED_PLAYERS.unrated} />

        <div className="mt-8 text-center text-muted-foreground text-sm">
          <p>* Player list is updated regularly. Registration closes May 7, 2026.</p>
        </div>
      </div>
    </Layout>
  );
}
