import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TOURNAMENT_DATA, REGISTRATION_URL, isRegistrationAvailable } from "@/lib/constants";
import { RegisterButton, RegistrationStatus } from "@/components/RegisterButton";
import { Calendar, Trophy, Users, Clock, DollarSign, Info, ExternalLink } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function Register() {
  const available = isRegistrationAvailable();

  return (
    <Layout>
      <PageHeader 
        title="Registration" 
        description="Register now to secure your spot in the championship."
      />
      
      <div className="py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card data-testid="card-registration-cta">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl text-center">
                Register for the Tournament
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {TOURNAMENT_DATA.date}
                </span>
                <span className="flex items-center gap-1">
                  <Trophy className="h-4 w-4" />
                  {TOURNAMENT_DATA.prizeFund}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  Cap: {TOURNAMENT_DATA.registrationCap}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <a
                  href="https://www.chessregister.com/register?event_key=6OeZgtjyCj6SDFjtSJPtts1V04Ucuw73-2nkGVypuPY%3D"
                  target="_blank"
                  rel="noreferrer"
                  className="group"
                >
                  <div className="p-4 border border-primary/20 rounded-lg hover:border-primary/60 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Open Session</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">Women's Open & U1800</p>
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-pink-600 text-white px-5 py-2.5 rounded-md shadow-lg ring-2 ring-primary/30 hover:ring-primary/60 group-hover:shadow-xl group-hover:scale-[1.05] transition-all duration-300 text-base font-semibold">
                      Register Now
                      <ExternalLink className="h-4 w-4" />
                    </div>
                  </div>
                </a>

                <a
                  href="https://www.chessregister.com/register?event_key=7GirNtG8DsjEGkmQZqlLxM1V04Ucuw73-2nkGVypuPY%3D"
                  target="_blank"
                  rel="noreferrer"
                  className="group"
                >
                  <div className="p-4 border border-primary/20 rounded-lg hover:border-primary/60 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Scholastic</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">K-3, K-5, K-8, K-12</p>
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-pink-600 text-white px-5 py-2.5 rounded-md shadow-lg ring-2 ring-primary/30 hover:ring-primary/60 group-hover:shadow-xl group-hover:scale-[1.05] transition-all duration-300 text-base font-semibold">
                      Register Now
                      <ExternalLink className="h-4 w-4" />
                    </div>
                  </div>
                </a>

                <a
                  href="https://www.chessregister.com/register?event_key=29LIKyXgHBd5g0o0HrhAEs1V04Ucuw73-2nkGVypuPY%3D"
                  target="_blank"
                  rel="noreferrer"
                  className="group"
                >
                  <div className="p-4 border border-primary/20 rounded-lg hover:border-primary/60 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Non-Rated</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">Women & Girls (Unrated)</p>
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-pink-600 text-white px-5 py-2.5 rounded-md shadow-lg ring-2 ring-primary/30 hover:ring-primary/60 group-hover:shadow-xl group-hover:scale-[1.05] transition-all duration-300 text-base font-semibold">
                      Register Now
                      <ExternalLink className="h-4 w-4" />
                    </div>
                  </div>
                </a>

                <a
                  href="https://www.chessregister.com/register?event_key=o0mSOO83WQmAOiHwHySmcc1V04Ucuw73-2nkGVypuPY%3D"
                  target="_blank"
                  rel="noreferrer"
                  className="group"
                >
                  <div className="p-4 border border-primary/20 rounded-lg hover:border-primary/60 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Friends & Family</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">Family & Friends Section</p>
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-pink-600 text-white px-5 py-2.5 rounded-md shadow-lg ring-2 ring-primary/30 hover:ring-primary/60 group-hover:shadow-xl group-hover:scale-[1.05] transition-all duration-300 text-base font-semibold">
                      Register Now
                      <ExternalLink className="h-4 w-4" />
                    </div>
                  </div>
                </a>
              </div>
            </CardContent>
          </Card>
          
          <section>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 flex items-center gap-2" data-testid="text-fees-title">
              <DollarSign className="h-6 w-6 text-primary" />
              Entry Fees
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card data-testid="card-women-fees">
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
              
              <Card data-testid="card-girls-fees">
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
            
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <Card data-testid="card-family-fee">
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground text-sm">Family & Friends (Rated)</p>
                  <p className="text-xl font-bold text-primary mt-1">{TOURNAMENT_DATA.sections.rated.familyFriends.earlyFee}</p>
                </CardContent>
              </Card>
              
              <Card data-testid="card-unrated-fee">
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground text-sm">Unrated Section</p>
                  <p className="text-xl font-bold text-primary mt-1">{TOURNAMENT_DATA.sections.unrated.fee}</p>
                </CardContent>
              </Card>
              
              <Card data-testid="card-free-fee">
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground text-sm">Titled Players / ACCC</p>
                  <p className="text-xl font-bold text-primary mt-1">FREE</p>
                </CardContent>
              </Card>
            </div>
          </section>

          <Card data-testid="card-important-info">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                Important Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                  <span>All participants must have a valid US Chess membership.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                  <span>Registration is capped at {TOURNAMENT_DATA.registrationCap} players. Register early to secure your spot!</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                  <span>Early registration fees apply until the deadline. On-site fees are higher.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                  <span>No refunds after registration closes.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
