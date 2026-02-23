import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

export default function ParentsGuide() {
  return (
    <Layout>
      <PageHeader title="Why Fewer Girls Start Playing Chess" description="A parent's guide to barriers" />
      <div className="py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                Chess is an amazing game that sharpens the mind, teaches strategy, and builds
                resilience — but far more boys than girls start playing from a young age. In the
                U.S., girls make up only about 14% of federation membership, and global figures
                are similarly imbalanced.
              </p>

              <p>
                The encouraging truth is that once girls enter chess, they typically persist and
                improve at rates comparable to boys. The biggest challenge is entry, not ability.
                For parents, that means the most powerful interventions happen before and during
                first exposure.
              </p>

              <h3>Why entry is lower</h3>
              <p>
                From early childhood, many boys are socialized toward overt competition while
                many girls are encouraged toward social harmony and cooperation. Because chess
                language often emphasizes conflict — attacks, captures, threats — it can appear
                culturally coded as "for boys," even though the game itself is for everyone.
              </p>
              <p>
                Parents and coaches may unintentionally reinforce this by inviting boys to chess
                spaces more often or more urgently. Over time, this creates a self-fulfilling loop:
                fewer girls in beginner pools means fewer visible role models, which further
                depresses new sign-ups.
              </p>

              <h3>The stereotype effect</h3>
              <p>
                Chess is often grouped with "genius" domains such as math and coding, which are
                still burdened by gender stereotypes in many communities. That framing can make
                girls feel they have to prove themselves before they even begin.
              </p>
              <p>
                In environments that actively normalize girls' intellectual achievement, entry tends
                to be higher. This is why girls-only programs and beginner cohorts matter: they
                reduce social friction at the moment of first participation.
              </p>

              <h3>Culture, visibility, and choice</h3>
              <p>
                Cross-cultural patterns suggest the issue is less about innate interest and more
                about visibility, exposure, and invitation. Popular media can shift this quickly —
                for example, stories featuring strong female chess characters have boosted interest
                among girls by making success in chess easier to imagine.
              </p>
              <p>
                In highly equal environments, girls may still distribute into many activities because
                they have more options, not because chess is a poor fit. The practical takeaway is
                to improve access and framing, not to assume lack of potential.
              </p>

              <h3>What parents can do right now</h3>
              <ul>
                <li>Frame chess as creativity and problem-solving, not just combat.</li>
                <li>Start with casual home games and low-pressure beginner events.</li>
                <li>Find girls-friendly clubs, camps, or online communities.</li>
                <li>Share role models such as Judit Polgár and Irina Krush.</li>
                <li>Praise effort, learning, and curiosity over "must-win" outcomes.</li>
              </ul>

              <h3>Bottom line</h3>
              <p>
                Fewer girls start chess primarily because of social and cultural barriers at entry,
                not because of lower capacity or long-term fit. With intentional exposure,
                welcoming communities, and supportive framing at home, many more girls can
                discover the joy of the game.
              </p>

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
