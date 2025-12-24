import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TOURNAMENT_DATA } from "@/lib/constants";
import { Clock } from "lucide-react";

export default function Schedule() {
  return (
    <Layout>
      <PageHeader 
        title="Tournament Schedule" 
        description="Complete schedule for the day's events and activities."
      />
      
      <div className="py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <section>
            <Card data-testid="card-schedule-main">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Day Schedule (G/25; d5 sections)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-32">Time</TableHead>
                        <TableHead>Event</TableHead>
                        <TableHead className="w-32">Location</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {TOURNAMENT_DATA.schedule.map((item, index) => (
                        <TableRow key={index} data-testid={`row-schedule-${index}`}>
                          <TableCell className="font-medium whitespace-nowrap">
                            {item.time}
                          </TableCell>
                          <TableCell>
                            {item.event.includes("Round") ? (
                              <span className="flex items-center gap-2">
                                {item.event}
                                <Badge variant="outline" className="text-xs">Game</Badge>
                              </span>
                            ) : item.event.includes("Bonus") ? (
                              <span className="flex items-center gap-2">
                                {item.event}
                                <Badge variant="secondary" className="text-xs">Optional</Badge>
                              </span>
                            ) : (
                              item.event
                            )}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {item.location || "—"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </section>
          
          <section>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6" data-testid="text-rounds-title">
              Round Times by Section
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card data-testid="card-scholastic-rounds">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">
                    {TOURNAMENT_DATA.timeControls.scholastic.sections}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    {TOURNAMENT_DATA.timeControls.scholastic.format}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {TOURNAMENT_DATA.timeControls.scholastic.rounds.map((time, index) => (
                      <Badge key={index} variant="outline">
                        R{index + 1}: {time}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card data-testid="card-open-rounds">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">
                    {TOURNAMENT_DATA.timeControls.openWomen.sections}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    {TOURNAMENT_DATA.timeControls.openWomen.format}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {TOURNAMENT_DATA.timeControls.openWomen.rounds.map((time, index) => (
                      <Badge key={index} variant="outline">
                        R{index + 1}: {time}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
