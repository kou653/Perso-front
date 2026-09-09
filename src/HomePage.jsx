import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Palette, Truck, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const mug = {
  id: "mug",
  name: "Mug Céramique",
  description: "Mug en céramique de qualité, 330ml",
  image: "/model/mug-maman-damour.jpg",
  price: "14,99 €",
};

const features = [
  {
    icon: Bot,
    title: "Détection IA Intelligente",
    description: "L'IA analyse le modèle de mug choisi et détecte automatiquement les zones à personnaliser.",
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


export function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-36">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4">
              <Sparkles className="h-3.5 w-3.5" /> Personnalisation Assistée par IA
            </div>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              Votre mug personnalisé avec l'IA
            </h1>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
              Choisissez un modèle parmi notre collection. Notre intelligence artificielle détecte automatiquement chaque élément (textes, photos, prénoms, dates) et vous permet de les remplacer ou de conserver l'original.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button size="lg" asChild className="shadow-md">
                <Link to="/produits">
                  Choisir un modèle de mug
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
            <div className="relative mx-auto w-[22rem] max-w-full">
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 blur-2xl" />
              <img
                src="/model/mug-photo-souvenir.jpg"
                alt="Mug personnalisé"
                className="relative rounded-2xl shadow-2xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-card py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Comment fonctionne l'IA CustomPrint ?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Une expérience fluide en 3 étapes simples.
            </p>
          </div>
          <div className="mt-16 flex flex-wrap justify-center gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="border-border/50 bg-background w-72">
                <CardContent className="pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
              Prêt à créer votre mug unique ?
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-primary-foreground/80">
              Parcourez nos modèles de mugs et laissez l'IA vous guider pour y intégrer vos souvenirs et vos mots doux.
            </p>
            <div className="mt-10">
              <Button size="lg" variant="secondary" asChild className="shadow-lg font-semibold">
                <Link to="/produits">
                  Explorer la collection des modèles
                  <Sparkles className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

