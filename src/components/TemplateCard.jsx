import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function TemplateCard({ product, template }) {
  return (
    <Card className="group overflow-hidden border border-border/60 bg-card rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/40 flex flex-col justify-between">
      <div className="relative aspect-square overflow-hidden bg-muted/30">
        <img
          src={template.imageUrl}
          alt={template.name}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 right-3 rounded-full bg-background/90 backdrop-blur-md px-3 py-1 text-xs font-bold text-primary shadow-xs border border-border/40">
          {product.price}
        </div>
      </div>

      <CardContent className="p-4 flex flex-col gap-3">
        <div className="min-h-[2.5rem] flex items-center">
          <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors leading-snug line-clamp-2">
            {template.name}
          </h3>
        </div>
        <Button asChild className="w-full shadow-xs hover:shadow-md transition-all font-semibold text-xs sm:text-sm py-2.5 cursor-pointer">
          <Link to={`/personnaliser/${product.id}/${template.id}`}>
            Personnaliser ce modèle
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export { TemplateCard };

