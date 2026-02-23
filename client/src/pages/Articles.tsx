import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";

export default function Articles() {
  return (
    <Layout>
      <PageHeader title="Articles & Blogs" description="Latest articles and resources for players." />

      <div className="py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active FIDE-Titled Women and Girls Chess Players in the US</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">A decorated ranked list of 28 active U.S. FIDE-titled women and girls, with photo-ready player cards.</p>
              <Link href="/articles/active-fide-women-us" className="text-primary font-medium">Read the article →</Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Changing Demographics of Females in US Chess</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Insights from USCF data by Fun Fong and Amrita Kumar.</p>
              <Link href="/articles/demographics-females" className="text-primary font-medium">Read the article →</Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Why Fewer Girls Start Playing Chess — Parent's Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">A short, practical guide for parents to encourage girls to start playing.</p>
              <Link href="/articles/fewer-girls-guide" className="text-primary font-medium">Read the article →</Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Why Fewer Girls Start Playing Chess — In-depth</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">A comprehensive unpacking of theories and cultural realities.</p>
              <Link href="/articles/fewer-girls-unpacking" className="text-primary font-medium">Read the article →</Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>More articles coming soon</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Send content and images to the organizers to have it published here.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
