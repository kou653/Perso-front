import { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { products } from "@/lib/products";
import { TemplateCard } from "@/components/TemplateCard";

const productList = Object.values(products);

export function ProduitsPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const allCategories = Array.from(
    new Set(
      productList.flatMap((p) => p.templates.map((t) => t.category))
    )
  ).sort();

  const filteredTemplates = productList.flatMap((p) =>
    p.templates
      .filter((t) => !selectedCategory || t.category === selectedCategory)
      .map((t) => ({ product: p, template: t }))
  );

  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Modèles de Mugs
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Choisissez un modèle de mug et remplacez les informations par les vôtres.
            L'IA reproduira exactement le même design avec vos données.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mr-2">
              <Filter className="h-4 w-4" />
              <span>Catégorie :</span>
            </div>
            <Button
              variant={selectedCategory === null ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              Toutes
            </Button>
            {allCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredTemplates.map(({ product, template }) => (
            <TemplateCard
              key={`${product.id}-${template.id}`}
              product={product}
              template={template}
            />
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="mt-16 text-center">
            <p className="text-muted-foreground">
              Aucun modèle ne correspond à vos critères.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => setSelectedCategory(null)}
            >
              Réinitialiser les filtres
            </Button>
          </div>
        )}

        <div className="mx-auto mt-24 max-w-3xl rounded-2xl bg-card p-8 text-center shadow-lg">
          <h2 className="text-2xl font-bold text-foreground">Comment ça marche ?</h2>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                1
              </div>
              <h3 className="mt-4 font-semibold text-foreground">Choisissez un modèle</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Parcourez nos modèles avec des exemples de personnalisation déjà appliqués.
              </p>
            </div>
            <div>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                2
              </div>
              <h3 className="mt-4 font-semibold text-foreground">Entrez vos informations</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Remplacez les informations d'exemple par les vôtres (nom, entreprise, message...).
              </p>
            </div>
            <div>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                3
              </div>
              <h3 className="mt-4 font-semibold text-foreground">L'IA crée votre design</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Notre IA reproduit exactement le même style avec vos informations.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-xl text-center">
          <p className="text-muted-foreground">
            Vous ne trouvez pas ce que vous cherchez ?
          </p>
          <Button asChild variant="outline" className="mt-4">
            <Link to="/personnaliser">
              <Sparkles className="mr-2 h-4 w-4" />
              Créer un design de zéro avec l'IA
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
