import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function TemplateCard({ product, template }) {
  return (
    <Card className="group overflow-hidden border-border/50 transition-all hover:shadow-xl hover:border-primary/40 flex flex-col justify-between">
      <div className="relative aspect-square overflow-hidden bg-muted/40">
        <img
          src={template.imageUrl}
          alt={template.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <CardContent className="p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors leading-snug">
            {template.name}
          </h3>
          <span className="shrink-0 font-bold text-primary text-sm">{product.price}</span>
        </div>
        <Button asChild className="w-full shadow-sm">
          <Link to={`/personnaliser/${product.id}/${template.id}`}>
            Personnaliser ce modèle
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export { TemplateCard };

