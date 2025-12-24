import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TOURNAMENT_DATA } from "@/lib/constants";
import { Phone, User, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function Contact() {
  return (
    <Layout>
      <PageHeader 
        title="Contact & Coordinators" 
        description="Get in touch with our tournament team."
      />
      
      <div className="py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
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
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <a 
                        href={`tel:${coordinator.phone.replace(/[^0-9]/g, '')}`}
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
          
          <section>
            <Card data-testid="card-contact-form">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Contact Form
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-muted/50 rounded-lg mb-6">
                  <p className="text-muted-foreground text-sm flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Contact form coming soon. Please call our coordinators directly.
                  </p>
                </div>
                
                <form className="space-y-4 opacity-60 pointer-events-none" aria-disabled="true">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input 
                        id="name" 
                        placeholder="Your name" 
                        disabled 
                        data-testid="input-contact-name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="your@email.com" 
                        disabled 
                        data-testid="input-contact-email"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input 
                      id="subject" 
                      placeholder="How can we help?" 
                      disabled 
                      data-testid="input-contact-subject"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Your message..." 
                      rows={4} 
                      disabled 
                      data-testid="input-contact-message"
                    />
                  </div>
                  <Button type="button" disabled data-testid="button-contact-submit">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </Layout>
  );
}
