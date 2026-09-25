import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { products } from "@/lib/products";
import { TemplateCard } from "@/components/TemplateCard";

const productList = Object.values(products);

export function ProduitsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTemplates = productList.flatMap((p) =>
    p.templates
      .filter((t) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase().trim();
        const matchName = t.name.toLowerCase().includes(q);
        const matchCategory = t.category ? t.category.toLowerCase().includes(q) : false;
        const matchDesc = t.description ? t.description.toLowerCase().includes(q) : false;
        const matchKeywords = Array.isArray(t.keywords)
          ? t.keywords.some((k) => k.toLowerCase().includes(q))
          : false;
        return matchName || matchCategory || matchDesc || matchKeywords;
      })
      .map((t) => ({ product: p, template: t }))
  );

  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Barre de recherche compacte et élégante (en haut) */}
        <div className="mx-auto max-w-md mb-6">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              placeholder="Rechercher un modèle ou catégorie..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-9 h-10 text-sm bg-background border-border/80 shadow-xs focus-visible:ring-primary rounded-full"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 p-1 rounded-full text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                aria-label="Effacer la recherche"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-balance text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight">
            Modèles de Mugs
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Choisissez un modèle de mug et remplacez les informations par les vôtres.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredTemplates.map(({ product, template }) => (
            <TemplateCard
              key={`${product.id}-${template.id}`}
              product={product}
              template={template}
            />
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="mt-16 text-center space-y-4">
            <p className="text-muted-foreground">
              Aucun modèle ne correspond à votre recherche « <strong className="text-foreground">{searchQuery}</strong> ».
            </p>
            <Button
              variant="outline"
              onClick={() => setSearchQuery("")}
            >
              Réinitialiser la recherche
            </Button>
          </div>
        )}

        <div className="mx-auto mt-24 max-w-3xl rounded-2xl bg-card p-8 text-center shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">Comment ça marche ?</h2>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                1
              </div>
              <h3 className="mt-4 text-base sm:text-lg font-semibold text-foreground">Choisissez un modèle</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Parcourez nos modèles avec des exemples de personnalisation déjà appliqués.
              </p>
            </div>
            <div>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                2
              </div>
              <h3 className="mt-4 text-base sm:text-lg font-semibold text-foreground">Entrez vos informations</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Remplacez les informations d'exemple par les vôtres (nom, entreprise, message...).
              </p>
            </div>
            <div>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                3
              </div>
              <h3 className="mt-4 text-base sm:text-lg font-semibold text-foreground">Commander</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Validez votre commande et nous nous occupons du reste.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

