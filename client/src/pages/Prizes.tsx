import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TOURNAMENT_DATA } from "@/lib/constants";
import { Trophy, Medal, Award, Gift } from "lucide-react";

export default function Prizes() {
  return (
    <Layout>
      <PageHeader 
        title="Prizes & Awards" 
        description="Cash prizes, trophies, medals, and special awards for all sections."
      />
      
      <div className="py-12 md:py-16 px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <section>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 flex items-center gap-2" data-testid="text-cash-title">
              <Trophy className="h-6 w-6 text-primary" />
              Cash Prizes
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card data-testid="card-womens-open-prizes">
                <CardHeader className="pb-3">
                  <CardTitle>Women's Open</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Place</TableHead>
                        <TableHead className="text-right">Prize</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {TOURNAMENT_DATA.prizes.womensOpen.map((prize) => (
                        <TableRow key={prize.place}>
                          <TableCell className="font-medium">{prize.place}</TableCell>
                          <TableCell className="text-right text-primary font-semibold">
                            {prize.amount}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <Card data-testid="card-u1600-prizes">
                <CardHeader className="pb-3">
                  <CardTitle>U1600</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Place</TableHead>
                        <TableHead className="text-right">Prize</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {TOURNAMENT_DATA.prizes.u1600.map((prize) => (
                        <TableRow key={prize.place}>
                          <TableCell className="font-medium">{prize.place}</TableCell>
                          <TableCell className="text-right text-primary font-semibold">
                            {prize.amount}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <Card data-testid="card-senior-prize">
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground text-sm">{TOURNAMENT_DATA.prizes.senior.label}</p>
                  <p className="text-2xl font-bold text-primary mt-1">{TOURNAMENT_DATA.prizes.senior.amount}</p>
                </CardContent>
              </Card>
              
              <Card data-testid="card-unrated-prize">
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground text-sm">Unrated Women/Girls</p>
                  <p className="text-lg font-semibold mt-1">{TOURNAMENT_DATA.prizes.unrated}</p>
                </CardContent>
              </Card>
              
              <Card data-testid="card-family-prize">
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground text-sm">Family & Friends</p>
                  <p className="text-lg font-semibold mt-1">{TOURNAMENT_DATA.prizes.familyFriends}</p>
                </CardContent>
              </Card>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 flex items-center gap-2" data-testid="text-medals-title">
              <Medal className="h-6 w-6 text-primary" />
              Medals & Trophies
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card data-testid="card-state-medals">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    State Medals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {TOURNAMENT_DATA.prizes.medals}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["AL", "AR", "FL", "GA", "MS", "NC", "SC", "TN", "TX", "VA"].map((state) => (
                      <Badge key={state} variant="outline">{state}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card data-testid="card-plaques">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Plaques & Trophies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {TOURNAMENT_DATA.prizes.plaques}
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 flex items-center gap-2" data-testid="text-free-reg-title">
              <Gift className="h-6 w-6 text-primary" />
              Free Registration Prizes
            </h2>
            
            <Card data-testid="card-free-registration">
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">
                  Winners receive free entry to national championships:
                </p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Winner</TableHead>
                      <TableHead>Receives Free Entry To</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {TOURNAMENT_DATA.prizes.freeRegistration.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.winner}</TableCell>
                        <TableCell className="text-primary">{item.prize}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </Layout>
  );
}
