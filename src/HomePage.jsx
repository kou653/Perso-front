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


const featuredModels = [
  {
    id: "mug-maman-damour",
    name: "Maman d'Amour",
    image: "/model/mug-maman-damour.jpg",
  },
  {
    id: "mug-calendrier-couple",
    name: "Calendrier & Photo Couple",
    image: "/model/mug-calendrier-couple.jpg",
  },
  {
    id: "mug-belle-mere",
    name: "Belle-Mère & Famille",
    image: "/model/mug-belle-mere.jpg",
  },
  {
    id: "mug-monogramme-or",
    name: "Monogramme Doré",
    image: "/model/mug-monogramme-or.jpg",
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

      {/* Section 4 Modèles Populaires */}
      <section className="py-16 sm:py-20 bg-background border-b border-border/40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-1">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Nos Modèles Populaires
            </h2>
            <p className="text-sm text-muted-foreground">
              Découvrez un aperçu de nos plus beaux modèles de mugs personnalisables.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredModels.map((item) => (
              <Card key={item.id} className="group overflow-hidden border-border/60 bg-card shadow-xs transition-all hover:shadow-xl hover:border-primary/50 flex flex-col justify-between">
                <div className="relative aspect-square overflow-hidden bg-muted/40">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <CardContent className="p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors leading-snug">
                      {item.name}
                    </h3>
                    <span className="shrink-0 font-bold text-primary text-sm">14,99 €</span>
                  </div>
                  <Button asChild className="w-full shadow-sm">
                    <Link to={`/personnaliser/mug/${item.id}`}>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Personnaliser ce modèle
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button asChild size="lg" variant="outline" className="shadow-xs font-semibold">
              <Link to="/produits">
                Voir tous les modèles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
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

