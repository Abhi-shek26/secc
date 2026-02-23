import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

type Player = {
  rank: number;
  name: string;
  age: number;
  titles: string;
  fideRating: number;
  approxUscf: number;
  summary: string;
};

const players: Player[] = [
  { rank: 1, name: "Carissa Yip", age: 22, titles: "IM, WGM", fideRating: 2459, approxUscf: 2550, summary: "Top-rated U.S. woman player with multiple U.S. Women's Championship titles and strong international results." },
  { rank: 2, name: "Alice Lee", age: 16, titles: "IM, WGM", fideRating: 2408, approxUscf: 2500, summary: "Teen prodigy and one of the youngest IMs, with major recent performances in top U.S. women's events." },
  { rank: 3, name: "Irina Krush", age: 42, titles: "GM", fideRating: 2402, approxUscf: 2510, summary: "Eight-time national champion and Olympiad veteran; a cornerstone of U.S. women's chess." },
  { rank: 4, name: "Tatev Abrahamyan", age: 37, titles: "IM, WGM", fideRating: 2390, approxUscf: 2480, summary: "Consistent medal contender and trusted U.S. team player with deep strategic style." },
  { rank: 5, name: "Anna Zatonskih", age: 47, titles: "IM, WGM", fideRating: 2380, approxUscf: 2470, summary: "Four-time U.S. Women's Champion with long-standing elite-level experience." },
  { rank: 6, name: "Anna M. Sargsyan", age: 28, titles: "WGM", fideRating: 2379, approxUscf: 2465, summary: "Rising U.S. WGM with steady international progress and strong tournament form." },
  { rank: 7, name: "Gulrukhbegim Tokhirjonova", age: 26, titles: "IM, WGM", fideRating: 2370, approxUscf: 2460, summary: "Sharp tactical player adding high-level firepower in U.S. team and open events." },
  { rank: 8, name: "Nazi Paikidze", age: 32, titles: "IM, WGM", fideRating: 2358, approxUscf: 2450, summary: "Former U.S. Women's Champion known for resilient, counterattacking play." },
  { rank: 9, name: "Zoey Tang", age: 17, titles: "WIM", fideRating: 2356, approxUscf: 2445, summary: "Fast-rising junior with strong norm trajectory and dynamic practical play." },
  { rank: 10, name: "Jennifer Yu", age: 23, titles: "IM, WGM", fideRating: 2350, approxUscf: 2440, summary: "Former national champion with creative openings and elite tournament experience." },
  { rank: 11, name: "Anna Sharevich", age: 40, titles: "IM, WGM", fideRating: 2325, approxUscf: 2415, summary: "Experienced IM/WGM bringing stability to team competitions." },
  { rank: 12, name: "Sabina Foisor", age: 36, titles: "IM, WGM", fideRating: 2300, approxUscf: 2390, summary: "Former U.S. Women's Champion and proven endgame specialist." },
  { rank: 13, name: "Rochelle Wu", age: 24, titles: "WGM", fideRating: 2295, approxUscf: 2385, summary: "Strong junior-to-open transition with consistent high-level activity." },
  { rank: 14, name: "Thalia Cervantes", age: 19, titles: "WIM", fideRating: 2285, approxUscf: 2375, summary: "Promising young WIM with notable junior accolades." },
  { rank: 15, name: "Beatriz Marinello", age: 50, titles: "WIM", fideRating: 2270, approxUscf: 2360, summary: "Veteran competitor and coach with deep contributions to chess development." },
  { rank: 16, name: "Olga Sagalchik", age: 62, titles: "WFM", fideRating: 2250, approxUscf: 2340, summary: "Senior contender whose longevity reflects lasting competitive dedication." },
  { rank: 17, name: "Abby Marshall", age: 18, titles: "WFM", fideRating: 2245, approxUscf: 2335, summary: "Young WFM balancing academic and competitive progress." },
  { rank: 18, name: "Megan Paragua", age: 15, titles: "WFM", fideRating: 2230, approxUscf: 2320, summary: "Rapidly improving junior from a well-known U.S. chess family." },
  { rank: 19, name: "Becca Lampman", age: 17, titles: "WCM", fideRating: 2220, approxUscf: 2310, summary: "Junior titleholder with strong upward trajectory in youth circuits." },
  { rank: 20, name: "Camille DeSerpa", age: 35, titles: "WIM", fideRating: 2215, approxUscf: 2305, summary: "Active WIM and educator with sustained regional tournament strength." },
  { rank: 21, name: "Alisa Wang", age: 16, titles: "WFM", fideRating: 2205, approxUscf: 2295, summary: "Talented junior with international youth exposure." },
  { rank: 22, name: "Agata Janaszewska", age: 28, titles: "WIM", fideRating: 2200, approxUscf: 2290, summary: "Steady open-event performer with continued rating momentum." },
  { rank: 23, name: "Eleanor Hoang", age: 14, titles: "WCM", fideRating: 2195, approxUscf: 2285, summary: "Young U.S. youth standout with impressive early national results." },
  { rank: 24, name: "Sofia Mumcuoglu", age: 15, titles: "WFM", fideRating: 2190, approxUscf: 2280, summary: "Developing junior earning results in increasingly strong fields." },
  { rank: 25, name: "Yuliya Bogdanova", age: 38, titles: "WFM", fideRating: 2185, approxUscf: 2275, summary: "Active competitor in open and veteran categories with reliable play." },
  { rank: 26, name: "Varvara Tataeva", age: 29, titles: "WIM", fideRating: 2180, approxUscf: 2270, summary: "WIM adding depth to U.S. women's competitive pool." },
  { rank: 27, name: "Laura Smith", age: 22, titles: "WCM", fideRating: 2175, approxUscf: 2265, summary: "Young titleholder continuing her push toward higher norms and titles." },
  { rank: 28, name: "Isabella Zhou", age: 13, titles: "WCM", fideRating: 2160, approxUscf: 2250, summary: "One of the youngest on the list and a notable long-term prospect." }
];

const photoFileOverrides: Record<string, string> = {
  "Irina Krush": "Irina Krush.png",
  "Nazi Paikidze": "Nazi Paikidze Barnes.jpg"
};

function getPhotoPath(name: string) {
  const filename = photoFileOverrides[name] ?? `${name}.jpg`;
  return `/player_photos/${encodeURIComponent(filename)}`;
}

export default function ActiveFideWomenUsArticle() {
  return (
    <Layout>
      <PageHeader
        title="Active FIDE-Titled Women and Girls Chess Players in the US"
        description="Ranked by December 2025 FIDE classical ratings"
      />

      <div className="py-12 md:py-16 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          <Card>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                The United States has a deep and active roster of FIDE-titled women and girls,
                including grandmasters, international masters, and woman-title holders. This
                ranking reflects active U.S.-affiliated players with published December 2025
                classical ratings, along with approximate USCF ratings.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="overflow-x-auto p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/40">
                    <th className="text-left p-3">Rank</th>
                    <th className="text-left p-3">Name</th>
                    <th className="text-left p-3">Age</th>
                    <th className="text-left p-3">FIDE Titles</th>
                    <th className="text-left p-3">FIDE Rating</th>
                    <th className="text-left p-3">Approx. USCF</th>
                  </tr>
                </thead>
                <tbody>
                  {players.map((player) => (
                    <tr key={player.rank} className="border-b last:border-b-0">
                      <td className="p-3">{player.rank}</td>
                      <td className="p-3 font-medium">{player.name}</td>
                      <td className="p-3">{player.age}</td>
                      <td className="p-3">{player.titles}</td>
                      <td className="p-3">{player.fideRating}</td>
                      <td className="p-3">{player.approxUscf}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {players.map((player) => (
              <Card key={player.name}>
                <CardContent className="p-4 space-y-3">
                  <img
                    src={getPhotoPath(player.name)}
                    alt={player.name}
                    className="w-full aspect-[4/3] object-cover rounded-md border"
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.src = "/favicon.png?v=20260224";
                    }}
                  />
                  <div>
                    <p className="font-semibold">#{player.rank} {player.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Age {player.age} · {player.titles}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      FIDE {player.fideRating} · Approx. USCF {player.approxUscf}
                    </p>
                  </div>
                  <p className="text-sm">{player.summary}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                These players reflect the depth and diversity of U.S. women's chess across
                generations, from established champions to emerging junior talents. The list is
                ideal for tournament invitations, player spotlights, and federation outreach.
              </p>
              <p>
                For invitations and verification, use official US Chess and FIDE player profiles.
              </p>
            </CardContent>
          </Card>

          <div>
            <Link href="/articles" className="text-primary font-medium">← Back to Articles</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
