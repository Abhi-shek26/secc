import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TOURNAMENT_DATA } from "@/lib/constants";
import { MapPin, Building } from "lucide-react";

export default function Venue() {
  return (
    <Layout>
      <PageHeader 
        title="Venue & Maps" 
        description="Location details and directions to the tournament venue."
      />
      
      <div className="py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card data-testid="card-venue-info">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5 text-primary" />
                Tournament Venue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold" data-testid="text-venue-name">
                    {TOURNAMENT_DATA.venue.name}
                  </h3>
                  <p className="text-muted-foreground" data-testid="text-venue-rooms">
                    {TOURNAMENT_DATA.venue.rooms}
                  </p>
                </div>
                
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-foreground" data-testid="text-venue-address">
                    {TOURNAMENT_DATA.venue.address}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card data-testid="card-venue-map">
            <CardContent className="p-0 overflow-hidden rounded-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3314.8989!2d-84.2165!3d33.8453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f5a8c5f9f9f9f9%3A0x0!2s4434%20Britt%20Rd%2C%20Tucker%2C%20GA%2030084!5e0!3m2!1sen!2sus!4v1700000000000"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Tournament Venue Map"
                className="w-full h-96"
                data-testid="map-venue"
              />
            </CardContent>
          </Card>
          
          <Card data-testid="card-directions">
            <CardHeader className="pb-3">
              <CardTitle>Getting There</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                  <span>The venue is located in Tucker, GA, approximately 20 minutes northeast of downtown Atlanta.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                  <span>Ample free parking is available on-site.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                  <span>Registration and check-in will be held in the Cafeteria.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                  <span>The Inspirational Keynote and Girls' Club sessions will be in the Chapel.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
