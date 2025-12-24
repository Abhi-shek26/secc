import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { TOURNAMENT_DATA } from "@/lib/constants";
import { Phone, User } from "lucide-react";

export default function Contact() {
  return (
    <Layout>
      <PageHeader 
        title="Contact" 
        description="Get in touch with our tournament team."
      />
      
      <div className="py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <section>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6" data-testid="text-coordinators-title">
              Tournament Coordinators
            </h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {TOURNAMENT_DATA.coordinators.map((coordinator, index) => (
                <Card key={index} data-testid={`card-coordinator-${index}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold" data-testid={`text-coordinator-name-${index}`}>
                          {coordinator.name}
                        </h3>
                        {(coordinator as any).role && (
                          <p className="text-sm text-muted-foreground">
                            {(coordinator as any).role}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <a 
                        href={`tel:${coordinator.phone.replace(/[^0-9+]/g, '')}`}
                        className="text-foreground underline"
                        data-testid={`link-coordinator-phone-${index}`}
                      >
                        {coordinator.phone}
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
