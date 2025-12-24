import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TOURNAMENT_DATA } from "@/lib/constants";

export default function Info() {
  return (
    <Layout>
      <PageHeader 
        title="Tournament Information" 
        description="Everything you need to know about sections, fees, and time controls."
      />
      
      <div className="py-12 md:py-16 px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <section>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6" data-testid="text-sections-title">
              Sections & Entry Fees
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card data-testid="card-women-sections">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    Women's Sections
                    <Badge variant="secondary">Rated</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Section</TableHead>
                        <TableHead>Early</TableHead>
                        <TableHead>On-site</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {TOURNAMENT_DATA.sections.rated.women.map((section) => (
                        <TableRow key={section.name}>
                          <TableCell className="font-medium">{section.name}</TableCell>
                          <TableCell>{section.earlyFee}</TableCell>
                          <TableCell>{section.onsiteFee}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <Card data-testid="card-girls-sections">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    Girls' Sections
                    <Badge variant="secondary">Rated</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Section</TableHead>
                        <TableHead>Early</TableHead>
                        <TableHead>On-site</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {TOURNAMENT_DATA.sections.rated.girls.map((section) => (
                        <TableRow key={section.name}>
                          <TableCell className="font-medium">{section.name}</TableCell>
                          <TableCell>{section.earlyFee}</TableCell>
                          <TableCell>{section.onsiteFee}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <Card data-testid="card-family-section">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    Family & Friends
                    <Badge variant="secondary">Rated</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Entry Fee: <span className="text-foreground font-medium">{TOURNAMENT_DATA.sections.rated.familyFriends.earlyFee}</span>
                  </p>
                </CardContent>
              </Card>
              
              <Card data-testid="card-unrated-section">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    Unrated Section
                    <Badge variant="outline">Unrated</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {TOURNAMENT_DATA.sections.unrated.note}<br />
                    Entry Fee: <span className="text-foreground font-medium">{TOURNAMENT_DATA.sections.unrated.fee}</span>
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6" data-testid="text-free-title">
              Free Registration
            </h2>
            <Card>
              <CardContent className="p-6">
                <ul className="space-y-2">
                  {TOURNAMENT_DATA.sections.free.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>
          
          <section>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6" data-testid="text-time-controls-title">
              Time Controls & Rounds
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card data-testid="card-scholastic-time">
                <CardHeader className="pb-3">
                  <CardTitle>{TOURNAMENT_DATA.timeControls.scholastic.sections}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-medium text-primary mb-3">
                    {TOURNAMENT_DATA.timeControls.scholastic.format}
                  </p>
                  <p className="text-muted-foreground">
                    Rounds: {TOURNAMENT_DATA.timeControls.scholastic.rounds.join(", ")}
                  </p>
                </CardContent>
              </Card>
              
              <Card data-testid="card-open-time">
                <CardHeader className="pb-3">
                  <CardTitle>{TOURNAMENT_DATA.timeControls.openWomen.sections}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-medium text-primary mb-3">
                    {TOURNAMENT_DATA.timeControls.openWomen.format}
                  </p>
                  <p className="text-muted-foreground">
                    Rounds: {TOURNAMENT_DATA.timeControls.openWomen.rounds.join(", ")}
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6" data-testid="text-equipment-title">
              Equipment & Broadcast
            </h2>
            <Card>
              <CardContent className="p-6">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                    <span>{TOURNAMENT_DATA.equipment.provided} — {TOURNAMENT_DATA.equipment.bring}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                    <span>{TOURNAMENT_DATA.equipment.broadcast}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>
          
          <section>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6" data-testid="text-tiebreak-title">
              Tie-break System
            </h2>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-4">For trophies and stipends:</p>
                <ol className="space-y-2 list-decimal list-inside">
                  {TOURNAMENT_DATA.tiebreaks.map((rule, index) => (
                    <li key={index}>{rule}</li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </Layout>
  );
}
