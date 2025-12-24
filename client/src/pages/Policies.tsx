import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TOURNAMENT_DATA } from "@/lib/constants";
import { Shield, AlertCircle } from "lucide-react";

export default function Policies() {
  return (
    <Layout>
      <PageHeader 
        title="Tournament Policies" 
        description="Rules and guidelines for all participants."
      />
      
      <div className="py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card data-testid="card-policies">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Tournament Rules
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {TOURNAMENT_DATA.policies.map((policy, index) => (
                  <li key={index} className="flex items-start gap-3" data-testid={`text-policy-${index}`}>
                    <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                    <span className="text-foreground">{policy}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <Card data-testid="card-tiebreaks">
            <CardHeader className="pb-3">
              <CardTitle>Tie-break System</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                For trophies and stipends, the following tie-break procedures will be used:
              </p>
              <ol className="space-y-3 list-decimal list-inside">
                {TOURNAMENT_DATA.tiebreaks.map((rule, index) => (
                  <li key={index} className="text-foreground" data-testid={`text-tiebreak-${index}`}>
                    {rule}
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
          
          <Card data-testid="card-important-notes">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-primary" />
                Important Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                  <span>Equipment: Boards & sets are provided. Please bring your own chess clock.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                  <span>Top boards will be broadcast via DGT boards online.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                  <span>The Chief Tournament Director's decisions are final.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
