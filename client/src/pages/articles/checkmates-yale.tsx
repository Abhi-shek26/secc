import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export default function CheckmatesYaleArticle() {
  return (
    <Layout>
      <PageHeader
        title="Checkmates: Chess Phenoms Share a College and a Mastery of the 'Royal Game'"
        description="Reaching the status of chess grandmaster, the game's highest title, is pretty rare. But not at Trumbull College, where two current Yale students share the honor."
      />

      <div className="py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card>
            <CardContent className="prose dark:prose-invert max-w-none pt-8">
              <h3>About This Publication</h3>
              <p>
                This article from Yale News highlights the remarkable achievements of two current Yale students at Trumbull College who have both reached the status of chess grandmaster—the game's highest title.
              </p>
              <p>
                The achievement of reaching grandmaster status is exceptionally rare, making this accomplishment by two students at the same residential college particularly noteworthy. The article explores their paths to mastery of the royal game and what this means for their academic and personal journeys at Yale.
              </p>

              <h3>Why This Matters</h3>
              <p>
                Stories of young chess phenoms reaching grandmaster status inspire the next generation of players and demonstrate the intellectual excellence that can be achieved through dedication and strategic thinking. This feature in Yale News showcases how chess excellence coexists with top-tier academic pursuits.
              </p>

              <div className="mt-8 flex gap-4">
                <a
                  href="https://news.yale.edu/2025/03/19/checkmates-chess-phenoms-share-college-and-mastery-royal-game"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button className="gap-2">
                    Read on Yale News
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </a>
              </div>

              <p className="text-sm text-muted-foreground mt-6">
                <strong>Source:</strong> Yale News
                <br />
                <strong>Published:</strong> March 19, 2025
                <br />
                <strong>Link:</strong> news.yale.edu
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
