import { useState } from "react";
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
    <div className="py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Barre de recherche compacte et élégante (en haut) */}
        <div className="mx-auto max-w-lg mb-8">
          <div className="relative flex items-center shadow-xs rounded-full group">
            <Search className="absolute left-4 h-4 w-4 text-muted-foreground pointer-events-none group-focus-within:text-primary transition-colors" />
            <Input
              type="text"
              placeholder="Rechercher un modèle ou catégorie..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 h-11 text-sm bg-card border-border/80 focus-visible:ring-2 focus-visible:ring-primary/20 rounded-full transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 p-1 rounded-full text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                aria-label="Effacer la recherche"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <div className="mx-auto max-w-2xl text-center space-y-2 mb-12">
          <h1 className="text-balance text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight">
            Modèles de Mugs
          </h1>
          <p className="text-pretty text-base sm:text-lg text-muted-foreground leading-relaxed">
            Choisissez un modèle parmi notre collection et remplacez les informations par les vôtres.
          </p>
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredTemplates.map(({ product, template }) => (
            <TemplateCard
              key={`${product.id}-${template.id}`}
              product={product}
              template={template}
            />
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="mt-16 text-center space-y-4 py-12 rounded-2xl border border-dashed border-border p-8 bg-card">
            <p className="text-muted-foreground">
              Aucun modèle ne correspond à votre recherche « <strong className="text-foreground">{searchQuery}</strong> ».
            </p>
            <Button
              variant="outline"
              onClick={() => setSearchQuery("")}
              className="cursor-pointer"
            >
              Réinitialiser la recherche
            </Button>
          </div>
        )}

        <div className="mx-auto mt-24 max-w-4xl rounded-3xl bg-card p-8 sm:p-12 border border-border/60 shadow-md">
          <div className="text-center space-y-2 mb-10">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">Comment ça marche ?</h2>
            <p className="text-sm text-muted-foreground">Personnalisez et commandez votre mug en quelques clics.</p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center space-y-3">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-base font-bold text-primary-foreground shadow-sm">
                1
              </div>
              <h3 className="text-base font-semibold text-foreground">1. Choisissez un modèle</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Parcourez nos modèles originaux créés par des designers.
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-base font-bold text-primary-foreground shadow-sm">
                2
              </div>
              <h3 className="text-base font-semibold text-foreground">2. Saisissez vos infos</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Remplacez les textes et photos d'exemple par vos propres détails.
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-base font-bold text-primary-foreground shadow-sm">
                3
              </div>
              <h3 className="text-base font-semibold text-foreground">3. Validez la commande</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Nous imprimons votre mug avec soin et nous vous le livrons rapidement.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

