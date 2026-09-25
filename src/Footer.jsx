import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      {/* Bloc CTA qui prend toute la largeur */}
      <div className="w-full bg-primary px-6 py-12 sm:py-16 lg:px-8 text-center text-primary-foreground shadow-sm">
        <div className="mx-auto max-w-4xl space-y-6">
          <h2 className="text-balance text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-primary-foreground">
            Prêt à créer votre mug unique ?
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-primary-foreground/90 max-w-2xl mx-auto">
            Parcourez nos modèles de mugs et soyez guidés pour y intégrer vos souvenirs et vos mots doux.
          </p>

          <div className="pt-2">
            <Button size="lg" variant="secondary" asChild className="shadow-lg font-semibold">
              <Link to="/produits">
                Explorer la collection des modèles
                <Sparkles className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Menus de navigation intégrés au bloc */}
          <nav className="flex flex-wrap justify-center gap-8 pt-4">
            <Link to="/" className="text-sm font-medium text-primary-foreground/90 transition-colors hover:text-white hover:underline">
              Accueil
            </Link>
            <Link to="/produits" className="text-sm font-medium text-primary-foreground/90 transition-colors hover:text-white hover:underline">
              Modèles
            </Link>
            <Link to="/contact" className="text-sm font-medium text-primary-foreground/90 transition-colors hover:text-white hover:underline">
              Contact
            </Link>
          </nav>
        </div>
      </div>

      {/* Bas de page Copyright neutre */}
      <div className="mx-auto max-w-7xl px-6 py-6 text-center">
        <p className="text-xs sm:text-sm text-muted-foreground font-normal">
          © {new Date().getFullYear()} CustomPrint. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
