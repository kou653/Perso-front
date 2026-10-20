import { Heart } from "lucide-react";

export function AProposPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/15 via-primary/5 to-accent/20 border-b border-border/60 shadow-xs py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <div className="mx-auto max-w-2xl space-y-6">
            <h1 className="text-balance text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight sm:leading-tight">
              À propos de nous
            </h1>
            <p className="mt-6 text-pretty text-[15px] sm:text-[17px] leading-relaxed text-muted-foreground/90 font-medium">
              Nous croyons que les petits objets du quotidien peuvent devenir de beaux souvenirs. C’est pourquoi nous avons créé KRS Customization, notre boutique de mugs personnalisés.
            </p>
          </div>
        </div>
      </section>

      {/* Single Content Block */}
      <section className="py-12 sm:py-20 bg-card border-b border-border/60">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          
          <div className="bg-background border border-border/60 rounded-3xl p-8 sm:p-12 shadow-sm space-y-10">
            
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Des mugs personnalisés facilement
              </h2>
              <p className="text-[15px] sm:text-base leading-relaxed text-muted-foreground/90 font-medium">
                Nous proposons différents modèles que vous pouvez personnaliser avec vos propres informations : prénom, photo, message, date ou tout autre élément prévu sur le modèle choisi.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Créez un mug unique
              </h2>
              <p className="text-[15px] sm:text-base leading-relaxed text-muted-foreground/90 font-medium">
                Que ce soit pour vous faire plaisir, offrir un cadeau original ou marquer une occasion particulière, nous vous permettons de créer un mug qui correspond réellement à votre personnalité et à vos émotions.
              </p>
              <p className="text-[15px] sm:text-base leading-relaxed text-muted-foreground/90 font-medium">
                Anniversaire, couple, famille, amitié, événement spécial ou simple envie de faire plaisir : chaque création peut raconter une histoire.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Votre idée, votre mug
              </h2>
              <p className="text-[15px] sm:text-base leading-relaxed text-muted-foreground/90 font-medium">
                Notre objectif est simple : rendre la personnalisation accessible, simple et créative.
              </p>
              <p className="text-[15px] sm:text-base leading-relaxed text-muted-foreground/90 font-medium">
                Vous choisissez d’abord le modèle qui vous plaît. Vous renseignez ensuite les informations que vous souhaitez y faire apparaître, puis nous préparons votre mug à partir de votre personnalisation.
              </p>
              <p className="text-[15px] sm:text-base text-foreground font-semibold leading-relaxed mt-4 border-l-2 border-primary pl-4">
                Parce qu’un mug peut être bien plus qu’un simple objet : il peut porter un souvenir, un message ou une émotion.
              </p>
            </div>

            <hr className="border-border/60" />

            <div className="space-y-6 text-center pt-4">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground flex items-center justify-center gap-2">
                <Heart className="h-6 w-6 text-primary fill-primary/20" />
                Merci de nous faire confiance
              </h2>
              <p className="text-[15px] sm:text-base leading-relaxed text-muted-foreground/90 font-medium">
                Derrière chaque commande, il y a une personne qui a choisi de créer quelque chose de personnel. Nous accordons donc une attention particulière à chaque création afin de vous offrir une expérience simple et agréable.
              </p>
              <div className="inline-block mt-4 rounded-full bg-primary/10 px-6 py-2 text-sm font-bold text-primary">
                Créez. Personnalisez. Offrez. Gardez un souvenir.
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
