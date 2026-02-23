import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NAV_ITEMS, TOURNAMENT_DATA } from "@/lib/constants";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1280px)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) setIsOpen(false);
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b border-border" data-testid="navigation">
      <div className="max-w-7xl mx-auto px-2 xl:px-3">
        <div className="flex items-center justify-between h-[72px] gap-1">
          
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 min-w-0" data-testid="link-home-logo">
            <img
              src={TOURNAMENT_DATA.logoUrl || "/favicon.png"}
              alt="SE Women's Chess Logo"
              className="h-12 w-12 md:h-14 md:w-14 xl:h-16 xl:w-16 flex-shrink-0 object-contain"
            />
            <span className="hidden 2xl:block font-semibold text-base tracking-tight truncate max-w-[320px]">
              SE Women and Girl Chess
            </span>
          </Link>

          <div className="hidden xl:flex items-center gap-0.5 flex-1 min-w-0 justify-center px-1">
            {NAV_ITEMS.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={location === item.href ? "secondary" : "ghost"}
                  size="sm"
                  className="px-1.5 text-[13px] 2xl:text-sm whitespace-nowrap"
                  data-testid={`link-nav-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            <ThemeToggle />

            <Link href="/register">
              <Button 
                size="sm"
                className="hidden 2xl:flex whitespace-nowrap px-3" 
                data-testid="button-register-nav"
              >
                Register Now
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="xl:hidden"
              onClick={() => setIsOpen(!isOpen)}
              data-testid="button-mobile-menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <div className="xl:hidden py-4 border-t border-border" data-testid="mobile-menu">
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
