import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { RegisterButton } from "@/components/RegisterButton";
import { TOURNAMENT_DATA } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Trophy, Users, MapPin } from "lucide-react";
import heroImage1 from "@assets/generated_images/women_playing_chess_tournament.png";
import heroImage2 from "@assets/generated_images/women_chess_tournament_move.png";
import heroImage3 from "@assets/generated_images/girl_chess_tournament_concentration.png";

const heroImages = [heroImage1, heroImage2, heroImage3];

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <img 
              key={index}
              src={image} 
              alt={`Women and girls playing chess ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>
        
        <div className="relative z-10 text-center px-4 py-16 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight drop-shadow-lg" data-testid="text-hero-title">
            {TOURNAMENT_DATA.name}
          </h1>
          
          <div className="mt-8 flex flex-wrap justify-center gap-4 md:gap-8">
            <div className="flex items-center gap-2 text-lg text-white/90">
              <Calendar className="h-5 w-5 text-white" />
              <span data-testid="text-hero-date">{TOURNAMENT_DATA.date}</span>
            </div>
            <div className="flex items-center gap-2 text-lg text-white/90">
              <Trophy className="h-5 w-5 text-white" />
              <span data-testid="text-hero-prize">{TOURNAMENT_DATA.prizeFund}</span>
            </div>
            <div className="flex items-center gap-2 text-lg text-white/90">
              <Users className="h-5 w-5 text-white" />
              <span data-testid="text-hero-cap">Cap: {TOURNAMENT_DATA.registrationCap} players</span>
            </div>
          </div>
          
          <div className="mt-10">
            <RegisterButton size="lg" className="text-lg px-8 py-6" />
          </div>
          
          <p className="mt-4 text-sm text-white/80" data-testid="text-hero-grant">
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
