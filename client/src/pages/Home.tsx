import { Layout } from "@/components/layout/Layout";
import { RegisterButton } from "@/components/RegisterButton";
import { TOURNAMENT_DATA } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Trophy, Users, MapPin } from "lucide-react";

export default function Home() {
  return (
    <Layout>
      <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoMzB2MzBIMHoiIGZpbGw9InJnYmEoMCwwLDAsMC4wMikiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6IiBmaWxsPSJyZ2JhKDAsMCwwLDAuMDIpIi8+PC9nPjwvc3ZnPg==')] opacity-50" />
        
        <div className="relative z-10 text-center px-4 py-16 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight" data-testid="text-hero-title">
            {TOURNAMENT_DATA.name}
          </h1>
          
          <div className="mt-8 flex flex-wrap justify-center gap-4 md:gap-8">
            <div className="flex items-center gap-2 text-lg text-muted-foreground">
              <Calendar className="h-5 w-5 text-primary" />
              <span data-testid="text-hero-date">{TOURNAMENT_DATA.date}</span>
            </div>
            <div className="flex items-center gap-2 text-lg text-muted-foreground">
              <Trophy className="h-5 w-5 text-primary" />
              <span data-testid="text-hero-prize">{TOURNAMENT_DATA.prizeFund}</span>
            </div>
            <div className="flex items-center gap-2 text-lg text-muted-foreground">
              <Users className="h-5 w-5 text-primary" />
              <span data-testid="text-hero-cap">Cap: {TOURNAMENT_DATA.registrationCap} players</span>
            </div>
          </div>
          
          <div className="mt-10">
            <RegisterButton size="lg" className="text-lg px-8 py-6" />
          </div>
          
          <p className="mt-4 text-sm text-muted-foreground" data-testid="text-hero-grant">
            {TOURNAMENT_DATA.grantNote}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" data-testid="text-highlights-title">
            Tournament Highlights
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card data-testid="card-highlight-sections">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Multiple Sections</h3>
                <p className="text-muted-foreground">
                  Women's Open, U1800, and Girls' K-3, K-5, K-8, K-12 sections. 
                  Family & Friends section available.
                </p>
              </CardContent>
            </Card>
            
            <Card data-testid="card-highlight-prizes">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Guaranteed Prizes</h3>
                <p className="text-muted-foreground">
                  $5,000+ guaranteed prize fund with cash prizes, trophies, and medals 
                  for top performers across all sections.
                </p>
              </CardContent>
            </Card>
            
            <Card data-testid="card-highlight-free">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Free Entry Available</h3>
                <p className="text-muted-foreground">
                  Titled players, ACCC members, and designated children eligible 
                  for free registration.
                </p>
              </CardContent>
            </Card>
            
            <Card data-testid="card-highlight-broadcast">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Live Broadcast</h3>
                <p className="text-muted-foreground">
                  Top boards broadcast via DGT boards online. Watch the excitement 
                  from anywhere!
                </p>
              </CardContent>
            </Card>
            
            <Card data-testid="card-highlight-venue">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Great Venue</h3>
                    <p className="text-muted-foreground text-sm">
                      {TOURNAMENT_DATA.venue.name}<br />
                      {TOURNAMENT_DATA.venue.address}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card data-testid="card-highlight-special">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Special Awards</h3>
                <p className="text-muted-foreground">
                  State medals for top players from 10 states. Winners receive free 
                  entry to national championships!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="text-cta-title">
            Ready to Compete?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join chess players from across the Southeast for an exciting day of competition, 
            networking, and fun. Don't miss this opportunity!
          </p>
          <RegisterButton size="lg" className="text-lg px-8 py-6" />
        </div>
      </section>
    </Layout>
  );
}
