import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NAV_ITEMS } from "@/lib/constants";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  return (
    <nav className="sticky top-0 z-50 w-full bg-background border-b border-border">
      {/* 🔑 SAME WIDTH AS PAGE CONTENT */}
      <div className="max-w-6xl mx-auto px-4">

        {/* FLEX — NOT GRID */}
        <div className="relative flex items-center min-h-16">

          {/* LEFT: LOGO */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <img
              src="/favicon.png"
              alt="SE Women's Chess Logo"
              className="h-10 w-10 object-contain"
            />

            <span className="hidden lg:block font-semibold text-base tracking-tight whitespace-nowrap">
              SE Women and Girls Chess Championship
            </span>
          </Link>

          {/* CENTER: NAV (ABSOLUTE CENTERED) */}
          <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex gap-1">
            {NAV_ITEMS.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={location === item.href ? "secondary" : "ghost"}
                  size="sm"
                  className="px-3 text-sm"
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* RIGHT: ACTIONS */}
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />

            <Link href="/register">
              <Button className="hidden md:flex">
                Register Now
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={location === item.href ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
              <Link href="/register">
                <Button className="w-full mt-2">
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
