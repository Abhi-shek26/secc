import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TOURNAMENT_DATA } from "@/lib/constants";
import { Hotel as HotelIcon, Phone, MapPin, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Hotel() {
  return (
    <Layout>
      <PageHeader 
        title="Hotel Information" 
        description="Recommended accommodation with special chess rates."
      />
      
      <div className="py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card data-testid="card-hotel-info">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <HotelIcon className="h-5 w-5 text-primary" />
                Official Tournament Hotel
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold" data-testid="text-hotel-name">
                  {TOURNAMENT_DATA.hotel.name}
                </h3>
              </div>
              
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-foreground" data-testid="text-hotel-address">
                  {TOURNAMENT_DATA.hotel.address}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <a 
                  href={`tel:${TOURNAMENT_DATA.hotel.phone.replace(/[^0-9]/g, '')}`}
                  className="text-foreground underline"
                  data-testid="link-hotel-phone"
                >
                  {TOURNAMENT_DATA.hotel.phone}
                </a>
              </div>
              
              <div className="flex items-center gap-2 p-4 bg-primary/5 rounded-lg">
                <Info className="h-5 w-5 text-primary flex-shrink-0" />
                <p className="text-foreground font-medium" data-testid="text-hotel-rate">
                  {TOURNAMENT_DATA.hotel.rateNote}
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card data-testid="card-hotel-map">
            <CardContent className="p-0 overflow-hidden rounded-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3314.5!2d-84.28!3d33.86!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s4156%20Lavista%20Rd%2C%20Atlanta%2C%20GA%2030084!5e0!3m2!1sen!2sus!4v1700000000000"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Hotel Location Map"
                className="w-full"
                data-testid="map-hotel"
              />
            </CardContent>
          </Card>
          
          <Card data-testid="card-booking-tips">
            <CardHeader className="pb-3">
              <CardTitle>Booking Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                  <span>Call the hotel directly and mention "Chess Rate" to receive the special tournament discount.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                  <span>The hotel is conveniently located near the tournament venue.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                  <span>Book early as rooms may fill up quickly.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
