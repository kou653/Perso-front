import { Link } from "react-router-dom";
import { ArrowRight, Palette, Truck, Sliders } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TemplateCard } from "@/components/TemplateCard";
import { products } from "@/lib/products";

const mugProduct = products.mug;

const features = [
  {
    icon: Sliders,
    title: "Détection Intelligente",
    description: "Le système analyse le modèle de mug choisi et détecte automatiquement les zones à personnaliser.",
  },
  {
    icon: Palette,
    title: "Personnalisation Sélective",
    description: "Remplacez textes, photos et dates, ou conservez les éléments d'origine selon vos choix.",
  },
  {
    icon: Truck,
    title: "Impression HD & Livraison",
    description: "Sublimation haute définition et expédition soignée en 3-5 jours ouvrés.",
  },
];

const featuredModels = [
  {
    id: "mug-maman-damour",
    name: "Maman d'Amour",
    imageUrl: "/model/mug-maman-damour.jpg",
  },
  {
    id: "mug-calendrier-couple",
    name: "Calendrier & Photo Couple",
    imageUrl: "/model/mug-calendrier-couple.jpg",
  },
  {
    id: "mug-belle-mere",
    name: "Belle-Mère & Famille",
    imageUrl: "/model/mug-belle-mere.jpg",
  },
  {
    id: "mug-monogramme-or",
    name: "Monogramme Doré",
    imageUrl: "/model/mug-monogramme-or.jpg",
  },
];

export function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/15 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 lg:flex lg:items-center lg:gap-x-12">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary mb-6 border border-primary/20">
              Personnalisation Sur-Mesure
            </div>
            <h1 className="text-balance text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight sm:leading-tight">
              Votre mug personnalisé sur-mesure
            </h1>
            <p className="mt-6 text-pretty text-base sm:text-lg leading-relaxed text-muted-foreground">
              Choisissez un modèle parmi notre collection. Notre système détecte automatiquement chaque élément et vous permet de les remplacer ou de conserver l'original.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="shadow-md font-semibold cursor-pointer">
                <Link to="/produits">
                  Choisir un modèle de mug
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="mt-14 lg:mt-0 lg:shrink-0 lg:grow">
            <div className="relative mx-auto w-[22rem] max-w-full">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-primary/20 via-primary/10 to-accent/20 blur-2xl opacity-70" />
              <img
                src="/model/mug-photo-souvenir.jpg"
                alt="Mug personnalisé"
                className="relative rounded-2xl shadow-2xl w-full h-auto object-cover border border-border/40"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 Modèles Populaires */}
      <section className="py-16 sm:py-24 bg-background border-b border-border/40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-foreground">
              Nos Modèles Populaires
            </h2>
            <p className="text-pretty text-base sm:text-lg leading-relaxed text-muted-foreground">
              Découvrez un aperçu de nos plus beaux modèles de mugs personnalisables.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredModels.map((item) => (
              <TemplateCard
                key={item.id}
                product={mugProduct}
                template={item}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline" className="shadow-xs font-semibold cursor-pointer">
              <Link to="/produits">
                Voir tous les modèles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/30 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center space-y-2">
            <h2 className="text-balance text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-foreground">
              Comment fonctionne CustomPrint ?
            </h2>
            <p className="text-pretty text-base sm:text-lg leading-relaxed text-muted-foreground">
              Une expérience fluide et intuitive en 3 étapes simples.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={feature.title} className="border-border/60 bg-card shadow-sm hover:shadow-md transition-shadow rounded-2xl">
                <CardContent className="p-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <span className="text-2xl font-bold text-muted-foreground/30">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

