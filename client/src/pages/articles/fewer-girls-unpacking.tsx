import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

const references = [
  { id: 1, text: "US Chess Women's Program. (2025). US Chess Federation.", href: "https://new.uschess.org/women-chess" },
  { id: 2, text: "Women in chess. Wikipedia.", href: "https://en.wikipedia.org/wiki/Women_in_chess" },
  { id: 3, text: "Li, R., et al. (2025). Sex Differences in Ratings and Retention. Chess.com.", href: "https://www.chess.com/news/view/li-glickman-chabris-2025-sex-ratings-retention-competitive-chess" },
  { id: 4, text: "Gerdes, C., & Gränsmark, P. (2010). Strategic Behavior Across Gender. IZA DP No. 4793.", href: "https://www.iza.org/publications/dp/4793" },
  { id: 5, text: "Male chess players show elevated aggressiveness. (2010). ChessBase.", href: "https://en.chessbase.com/post/male-che-players-show-elevated-aggreivene-against-women" },
  { id: 6, text: "Gender, time constraint, and risk taking. (2021). ScienceDirect.", href: "https://www.sciencedirect.com/science/article/abs/pii/S0165176521003621" },
  { id: 7, text: "Bilalić, M., et al. (2009). Why are women so good at chess? PMC.", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2679077/" },
  { id: 8, text: "Gender Bias Research. (2023). Chess.com.", href: "https://www.chess.com/news/view/gender-bias-chess-parents-mentors-shortchange-girls-potential" },
  { id: 9, text: "Brancaccio & Gobet. (2023). Scientific Explanations. Journal of Expertise.", href: "https://www.journalofexpertise.org/articles/volume6_issue1/JoE_6_1_Brancaccio_Gobet.pdf" },
  { id: 10, text: "Polgar, S. (2023). X post.", href: "https://x.com/SusanPolgar/status/1636630889571446784" },
  { id: 11, text: "Arnold et al. (2023). Checking gender bias. NYU.", href: "https://www.nyu.edu/about/news-publications/news/2023/october/in-checking-chess-s-gender-bias--researchers-find-parents-and-me.html" },
  { id: 12, text: "Ratings gap analysis. (2021). ChessBase.", href: "https://en.chessbase.com/post/ratings-gap-and-gender-in-the-us-part-1" },
  { id: 13, text: "Gender and the President's Cup: A Statistical Analysis. (2025). USChess.org.", href: "https://new.uschess.org/news/gender-and-presidents-cup-statistical-analysis" },
  { id: 14, text: "Maass et al. (2008). Checkmate? Wiley.", href: "https://onlinelibrary.wiley.com/doi/abs/10.1002/ejsp.440" },
  { id: 15, text: "Rothgerber & Wolsiefer. (2014). BPS Research Digest.", href: "https://www.bps.org.uk/research-digest/girls-underperform-when-they-play-chess-against-boys-real-life-evidence-stereotype" },
  { id: 16, text: "Stafford. (2018). Psychology Today.", href: "https://www.psychologytoday.com/au/blog/ulterior-motives/201804/no-stereotype-threat-women-chess-players" },
  { id: 17, text: "Vishkin. (2022). Gender-Equality Paradox. Sage.", href: "https://journals.sagepub.com/doi/abs/10.1177/09567976211034806" },
  { id: 18, text: "Gender gap across countries. (2021). ScienceDirect.", href: "https://www.sciencedirect.com/science/article/abs/pii/S0147596720300688" },
  { id: 19, text: "Queen's Gambit impact. Chess.com.", href: "https://www.chess.com/blog/sthabirrr/the-impact-of-the-queens-gambit-on-chess-popularity" },
  { id: 20, text: "FEMchess. USChess.org.", href: "https://new.uschess.org/news/femchess-third-california-all-girls-scholastic-addresses-gender-gap" },
  { id: 21, text: "FIDE GECI discussion.", href: "https://www.reddit.com/r/chess/comments/189vw6i/fide_introduces_the_gender_equality_in_chess/" }
];

export default function UnpackingBarriers() {
  return (
    <Layout>
      <PageHeader title="Why Fewer Girls Start Playing Chess — Unpacking Barriers" description="Theories and cultural realities" />
      <div className="py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                Chess, the timeless "game of kings," remains strikingly male-dominated in modern
                competition. As of 2025, women account for roughly 14% of USCF membership
                (about 13,000 of nearly 79,000 active rated players), and global figures are similarly
                low. At elite levels, representation narrows even further.
              </p>
              <p>
                Recent USCF-linked research suggests the gap is primarily an entry problem, not a
                post-entry performance problem. When girls and boys are matched on starting age,
                year, and initial rating, retention and rating progression are similar. This reframes
                the central question: why do fewer girls start?
              </p>

              <h3>Aggression theory and early self-selection</h3>
              <p>
                One proposed mechanism is that chess is culturally framed as aggressive and
                combative — a style often socially encouraged in boys more than girls. In practical
                chess terms, this appears in opening and middlegame risk profiles, where some
                studies report women choosing more solid lines on average while men increase risk,
                especially against female opponents.
              </p>
              <p>
                The key implication is social rather than biological: if chess is presented as a
                combative identity signal rather than a strategic and creative discipline, girls may
                self-select out before they begin.
              </p>

              <h3>Stereotypes and the "brilliance" frame</h3>
              <p>
                Chess is frequently grouped with "genius" domains that are historically coded male
                in many cultures. This can suppress early participation by signaling that girls need
                to prove belonging first. Male-heavy clubs and online spaces can reinforce that
                effect, especially in adolescence when peer perception matters most.
              </p>
              <p>
                Visibility compounds this dynamic: fewer girls in beginner pipelines produce fewer
                role models, which in turn lowers perceived fit for the next cohort.
              </p>

              <h3>Parental and mentor bias</h3>
              <p>
                Survey evidence from USCF-affiliated families and mentors shows that adults may
                underestimate girls' long-term rating potential relative to boys, particularly among
                those who strongly believe chess success depends on innate brilliance. Even when
                direct spending is similar, expectation bias can reduce encouragement intensity,
                tournament exposure, and confidence-building opportunities.
              </p>

              <h3>Stereotype threat and psychological friction</h3>
              <p>
                Experimental and real-world studies indicate that gender cues can reduce female
                performance in mixed settings. More importantly for entry, anticipated stereotype
                pressure can deter girls from trying the activity in the first place.
              </p>

              <h3>Cross-cultural paradoxes</h3>
              <p>
                International comparisons show a complex pattern: some less gender-equal countries
                report higher female participation in chess than more egalitarian countries. Proposed
                explanations include stronger centralized programs, different youth pipelines, and
                differences in how high-intensity pursuits are socially distributed.
              </p>
              <p>
                The takeaway is not that equality reduces ability — it is that participation depends
                heavily on local incentives, exposure systems, and cultural framing.
              </p>

              <h3>What changes participation</h3>
              <ul>
                <li>Girls-only beginner cohorts and tournaments that reduce entry friction.</li>
                <li>Parent/coach messaging that frames chess as problem-solving, not warfare.</li>
                <li>Visible female role models in clubs, media, and school programs.</li>
                <li>Mentorship systems that normalize long-term development for girls.</li>
              </ul>

              <h3>Conclusion</h3>
              <p>
                Current evidence supports a cultural-barriers model: fewer girls start chess because
                of social framing, stereotypes, and access dynamics — not because of inferior
                potential. Since matched progression is comparable, the most effective lever is
                increasing supportive entry pathways and retaining girls through early milestones.
              </p>

              <h3>References</h3>
              <ol className="ml-4 list-decimal text-sm text-muted-foreground">
                {references.map((reference) => (
                  <li key={reference.id}>
                    <a href={reference.href} target="_blank" rel="noreferrer" className="text-primary">
                      {reference.text}
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
