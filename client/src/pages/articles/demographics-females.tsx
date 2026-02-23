import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

const footnotes = [
  { id: 1, text: "Li, R., Glickman, M. E., & Chabris, C. F. (2025). Sex Differences in Ratings and Retention in Competitive Chess. Chess.com.", href: "https://www.chess.com/news/view/li-glickman-chabris-2025-sex-ratings-retention-competitive-chess" },
  { id: 2, text: "US Chess Women's Program. (2025). US Chess Federation.", href: "https://new.uschess.org/women-chess" },
  { id: 3, text: "The ratings gap and gender: Analyzing U.S. Chess Championships. (2021). ChessBase.", href: "https://en.chessbase.com/post/ratings-gap-and-gender-in-the-us-part-1" },
  { id: 4, text: "FEMchess Third California All-Girls Scholastic Addresses Gender Gap. (2024). US Chess.org.", href: "https://new.uschess.org/news/femchess-third-california-all-girls-scholastic-addresses-gender-gap" },
  { id: 5, text: "The Importance of Analytics for Chess Federations. (2022). The Chess Drum.", href: "https://thechessdrum.net/blog/2022/08/14/the-importance-of-chess-analytics/" },
  { id: 6, text: "Gender and the President's Cup: A Statistical Analysis. (2025). US Chess.org.", href: "https://new.uschess.org/news/gender-and-presidents-cup-statistical-analysis" },
  { id: 7, text: "Women's Chess Titles: The Unanticipated Effects of Institutional Intervention on Female Participation in Competitive Chess. (2022). CAUSEweb.", href: "https://www.causeweb.org/usproc/sites/default/files/usclap/2022-1/womens-chess-titles-the-unanticipated-effects-of-institutional-intervention-on-female-participation-in-competitive-chess.pdf" },
  { id: 8, text: "Why are (the best) women so good at chess? Participation rates and gender differences in intellectual domains. (2009). PMC.", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2679077/" },
  { id: 9, text: "New Study on Sex Differences in Chess Published in Journal Supported by Chessable. (2025). Chessable.", href: "https://www.chess.com/blog/Chessable/new-study-on-sex-differences-in-chess-published-in-journal-supported-by-chessable" },
  { id: 10, text: "Study Reveals New Insights Into Gender Gap In Chess. (2025). Chess.com.", href: "https://www.chess.com/news/view/li-glickman-chabris-2025-sex-ratings-retention-competitive-chess" },
  { id: 11, text: "A new study, backed by Chessable, explores gender differences in chess. (2025). Facebook.", href: "https://www.facebook.com/groups/Wchesschamp2018/posts/1723411421691275/" }
];

export default function DemographicsArticle() {
  return (
    <Layout>
      <PageHeader title="Changing Demographics of Females in US Chess" description="Insights from USCF Data" />
      <div className="py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p className="text-sm text-muted-foreground">Fun Fong, MD · Amrita Kumar, PhD</p>

              <h2>Submission to Chess Research</h2>
              <p>
                The US Chess Federation (USCF) Membership Update Information Report (MUIR)
                database, along with predecessor systems such as the Member Services Area (MSA),
                provides a rich source for demographic analysis. Although direct access to raw historical
                MUIR files is limited, peer-reviewed studies and USCF reports based on large cohorts
                (1992–2019 and beyond) provide reliable trend-level insights.
              </p>
              <p>
                This synthesis focuses on two dimensions: playing years (inferred from retention,
                rated-game experience, and peak-performance age) and age demographics. Across
                studies, the central pattern is persistent female underrepresentation, with positive
                movement in youth entry and targeted-program regions.
              </p>

              <h3>Overall Participation Trends</h3>
              <p>
                Female participation has increased steadily. USCF sources report approximately
                13,000 female members in 2025 (~14% of membership), representing substantial growth
                from 2009 levels. The broader youth boom in US chess appears to disproportionately
                benefit female entry, especially in scholastic and girls-focused programming.
              </p>
              <p>
                Despite gains, women and girls remain a minority in the overall pool and are further
                underrepresented in higher-competition cohorts. This pattern is consistent across both
                federation reports and independent analyses using USCF-derived datasets.
              </p>

              <h3>1) Trends in Playing Years and Experience</h3>
              <p>
                Retention studies indicate that unmatched female cohorts often show higher attrition
                than male cohorts over multi-year horizons. However, when cohorts are matched by
                entry age, year, and initial rating, retention and improvement curves are much closer,
                suggesting entry conditions account for a large share of observed gender gaps.
              </p>
              <p>
                Experience-based findings are similar: females in aggregate may show lower average
                experience due to younger age distributions, but matched analyses and peak-age
                comparisons show substantial convergence. At peak performance ages (often around
                30–39), rating differences narrow significantly in several studies.
              </p>

              <h3>2) Trends in Age Demographics</h3>
              <p>
                Female members skew younger than males in contemporary USCF snapshots.
                Participation is stronger in youth bands but declines sharply into adulthood, with lower
                representation in collegiate and post-collegiate competitive segments.
              </p>
              <p>
                Historically, this pattern appears stable: relatively stronger participation before mid-
                adolescence, followed by drop-off during teenage and early-adult years. Recent growth
                in girls' membership and all-girls initiatives improves early pipeline numbers, but long-
                term retention remains the key bottleneck.
              </p>

              <h3>Key Drivers and Implications</h3>
              <p>
                Evidence points to entry and environment effects as primary drivers: social support,
                mentorship, all-girls events, and inclusive local ecosystems are associated with better
                retention outcomes. The implication is practical — when early barriers are reduced,
                female progress trajectories increasingly resemble male trajectories over time.
              </p>

              <h3>Conclusion</h3>
              <p>
                Female demographics in US chess are improving, especially in youth participation,
                but attrition into adulthood remains the central challenge. The strongest policy lever is
                sustained, supportive retention infrastructure from first entry through late scholastic and
                collegiate transition years.
              </p>

              <h3>Footnotes & References</h3>
              <ol className="ml-4 list-decimal text-sm text-muted-foreground">
                {footnotes.map((note) => (
                  <li key={note.id}>
                    <a href={note.href} target="_blank" rel="noreferrer" className="text-primary">
                      {note.text}
                    </a>
                  </li>
                ))}
              </ol>

              <div className="mt-6">
                <Link href="/articles" className="text-primary font-medium">← Back to Articles</Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
