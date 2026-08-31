import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Palette, Truck, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const products = [
  {
    id: "mug",
    name: "Mug",
    description: "Mug en céramique de qualité",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop",
    price: "12,99 €",
  },
  {
    id: "tshirt",
    name: "T-Shirt",
    description: "T-shirt 100% coton bio",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    price: "24,99 €",
  },
  {
    id: "sac",
    name: "Sac",
    description: "Sac en toile résistant",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=400&fit=crop",
    price: "19,99 €",
  },
  {
    id: "stylo",
    name: "Stylo",
    description: "Stylo à bille personnalisable",
    image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=400&h=400&fit=crop",
    price: "4,99 €",
  },
  {
    id: "porte-cle",
    name: "Porte-clé",
    description: "Porte-clé en métal gravé",
    image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=400&h=400&fit=crop",
    price: "7,99 €",
  },
];

const features = [
  {
    icon: Sparkles,
    title: "IA Créative",
    description: "Notre intelligence artificielle génère des designs uniques selon vos envies.",
  },
  {
    icon: Palette,
    title: "100% Personnalisable",
    description: "Modifiez chaque détail pour créer un produit qui vous ressemble.",
  },
  {
    icon: Truck,
    title: "Livraison Rapide",
    description: "Recevez votre création en 3-5 jours ouvrés partout en France.",
  },
  {
    icon: MessageSquare,
    title: "Support Dédié",
    description: "Notre équipe vous accompagne à chaque étape de votre création.",
  },
];

export function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              Créez des designs uniques avec l'IA
            </h1>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
              Personnalisez vos mugs, t-shirts, sacs et plus encore grâce à notre intelligence artificielle. 
              Décrivez votre vision et laissez la magie opérer.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link to="/personnaliser">
                  Commencer à créer
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/produits">Voir les produits</Link>
              </Button>
            </div>
          </div>
          <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
            <div className="relative mx-auto w-[22rem] max-w-full">
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 blur-2xl" />
              <img
                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&h=600&fit=crop"
                alt="Produits personnalisés"
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
              Pourquoi choisir CustomPrint ?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Une expérience de personnalisation simple, rapide et assistée par l'IA.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {features.map((feature) => (
              <Card key={feature.title} className="border-border/50 bg-background">
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

      {/* Products Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Nos produits personnalisables
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Choisissez votre support et laissez libre cours à votre créativité.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-5">
            {products.map((product) => (
              <Link key={product.id} to={`/personnaliser?produit=${product.id}`}>
                <Card className="group cursor-pointer overflow-hidden border-border/50 transition-all hover:border-primary/50 hover:shadow-lg h-full flex flex-col">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4 flex-1 flex flex-col">
                    <h3 className="font-semibold text-foreground">{product.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground flex-1">{product.description}</p>
                    <p className="mt-2 text-sm font-medium text-primary">À partir de {product.price}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/produits">
                Voir tous les produits
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
              Prêt à créer votre design unique ?
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-primary-foreground/80">
              Décrivez simplement votre idée et notre IA génère un design personnalisé en quelques secondes.
            </p>
            <div className="mt-10">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/personnaliser">
                  Commencer maintenant
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
