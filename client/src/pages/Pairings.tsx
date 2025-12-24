import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TOURNAMENT_DATA } from "@/lib/constants";
import { ClipboardList, Trophy } from "lucide-react";

export default function Pairings() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-12">
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
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg mb-4">
                    Pairings will be posted here on tournament day.
                  </p>
                  <p className="text-muted-foreground">
                    Check back on {TOURNAMENT_DATA.date} for live updates.
                  </p>
                </div>

                <div className="mt-8 space-y-4">
                  <h3 className="font-semibold text-lg">Sections</h3>
                  <div className="grid gap-3">
                    <div className="p-4 bg-muted/50 rounded-md">
                      <p className="font-medium">Women's Open</p>
                      <p className="text-sm text-muted-foreground">{TOURNAMENT_DATA.timeControls.openWomen.format}</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-md">
                      <p className="font-medium">Women's U1800</p>
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
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
