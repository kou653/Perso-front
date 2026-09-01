import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold text-foreground">CustomPrint</span>
          </div>
          
          <nav className="flex flex-wrap justify-center gap-6">
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
              Accueil
            </Link>
            <Link to="/produits" className="text-sm text-muted-foreground hover:text-primary">
              Modèles
            </Link>
            <Link to="/personnaliser" className="text-sm text-muted-foreground hover:text-primary">
              Personnaliser
            </Link>
            <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary">
              Contact
            </Link>
          </nav>
        </div>
        
        <div className="mt-8 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CustomPrint. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
