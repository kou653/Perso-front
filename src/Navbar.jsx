import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Accueil", href: "/" },
  { name: "Produits", href: "/produits" },
  { name: "Personnaliser", href: "/personnaliser" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <Sparkles className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-foreground">CustomPrint</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:gap-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Button asChild>
            <Link to="/personnaliser">Créer mon design</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-6 pb-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block py-2 text-base font-medium text-muted-foreground hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Button asChild className="mt-4 w-full">
              <Link to="/personnaliser">Créer mon design</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}