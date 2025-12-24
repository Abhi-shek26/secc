import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NAV_ITEMS } from "@/lib/constants";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
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
    <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b border-border" data-testid="navigation">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-2">
          
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 min-w-0" data-testid="link-home-logo">
            <img
              src="/favicon.png"
              alt="SE Women's Chess Logo"
              className="h-9 w-9 flex-shrink-0 object-contain"
            />
            <span className="hidden 2xl:block font-semibold text-base tracking-tight truncate">
              SE Women and Girls Chess Championship
            </span>
            <span className="hidden md:block 2xl:hidden font-semibold text-base tracking-tight">
              SE Women's Chess
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-0.5 flex-shrink-0">
            {NAV_ITEMS.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={location === item.href ? "secondary" : "ghost"}
                  size="sm"
                  className="px-2 text-sm whitespace-nowrap"
                  data-testid={`link-nav-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <ThemeToggle />

            <Link href="/register">
              <Button 
                size="sm"
                className="hidden lg:flex whitespace-nowrap" 
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
