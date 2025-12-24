import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NAV_ITEMS, REGISTRATION_URL, isRegistrationAvailable } from "@/lib/constants";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const handleRegisterClick = () => {
    if (isRegistrationAvailable()) {
      window.open(REGISTRATION_URL, "_blank");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border" data-testid="navigation">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between gap-4 h-16">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0" data-testid="link-home-logo">
            <Crown className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg hidden sm:block">SE Women's Chess</span>
          </Link>

          <div className="hidden lg:flex items-center gap-1 flex-wrap">
            {NAV_ITEMS.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={location === item.href ? "secondary" : "ghost"}
                  size="sm"
                  data-testid={`link-nav-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            
            <Link href="/register">
              <Button 
                variant="default" 
                className="hidden sm:flex"
                data-testid="button-register-nav"
              >
                Register Now
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
              data-testid="button-mobile-menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border" data-testid="mobile-menu">
            <div className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={location === item.href ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setIsOpen(false)}
                    data-testid={`link-mobile-${item.label.toLowerCase()}`}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
              <Link href="/register">
                <Button 
                  variant="default" 
                  className="w-full mt-2"
                  onClick={() => setIsOpen(false)}
                  data-testid="button-register-mobile"
                >
                  Register Now
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
