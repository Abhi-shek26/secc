import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TOURNAMENT_DATA } from "@/lib/constants";
import { Heart, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Sponsors() {
  return (
    <Layout>
      <PageHeader 
        title="Sponsors & Partners" 
        description="Organizations supporting women's and girls' chess in the Southeast."
      />
      
      <div className="py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card data-testid="card-grant">
            <CardContent className="p-8 text-center">
              <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">US Chess Grant</h2>
              <p className="text-muted-foreground">
                {TOURNAMENT_DATA.footer.grantAck}
              </p>
            </CardContent>
          </Card>
          
          <Card data-testid="card-partners">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Tournament Partners
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                {TOURNAMENT_DATA.partners.map((partner, index) => {
                  const isPossible = partner.includes("Possible");
                  const displayName = partner.replace(" (Possible)", "");
                  
                  return (
                    <div 
                      key={index} 
                      className="p-4 bg-muted/30 rounded-lg flex items-center justify-between gap-2"
                      data-testid={`card-partner-${index}`}
                    >
                      <span className="font-medium">{displayName}</span>
                      {isPossible && (
                        <Badge variant="outline" className="text-xs">Pending</Badge>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
          
          <Card data-testid="card-become-sponsor">
            <CardHeader className="pb-3">
              <CardTitle>Become a Sponsor</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Interested in supporting women's and girls' chess in the Southeast? 
                We welcome sponsors of all levels. Your contribution helps us provide 
                larger prize funds, better venues, and more opportunities for players.
              </p>
              <p className="text-muted-foreground">
                Please contact our coordinators for sponsorship opportunities.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
