import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { TOURNAMENT_DATA } from "@/lib/constants";

export default function TopScholasticGirls() {
  return (
    <Layout>
      <PageHeader title="Top Scholastic Girls in US" description="Profiles and achievements of top scholastic girls." />

      <div className="py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardContent>
              <p className="text-muted-foreground mb-4">Article content to be provided by the organizer. Please forward the article text and any player names or photos and I will add them here.</p>

              <ul className="list-disc pl-5 text-foreground space-y-2">
                <li>Placeholder: Player 1 — Details to be added</li>
                <li>Placeholder: Player 2 — Details to be added</li>
                <li>Placeholder: Player 3 — Details to be added</li>
              </ul>

              <p className="text-sm text-muted-foreground mt-4">If you have the article and images, send them and I will replace this content.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
