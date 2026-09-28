import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Accueil", href: "/" },
  { name: "Modèles de Mugs", href: "/produits" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md transition-all">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5 group">
          <img src="/logo/FullLogo.png" alt="CustomPrint" className="h-9 sm:h-10 w-auto object-contain transition-transform group-hover:scale-[1.02]" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-x-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                  isActive
                    ? "text-primary font-semibold bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden p-2 rounded-lg text-foreground hover:bg-muted/60 transition-colors cursor-pointer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu principal"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border/50 bg-background/95 backdrop-blur-md px-6 pb-6 pt-2 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1.5">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}