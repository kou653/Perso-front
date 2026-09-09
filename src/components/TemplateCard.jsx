import { Link } from "react-router-dom";
import { Sparkles, Bot } from "lucide-react";
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
        <span className="absolute left-3 top-3 rounded-full bg-background/90 backdrop-blur-sm px-2.5 py-1 text-xs font-semibold text-foreground shadow-sm">
          {template.category}
        </span>
        {template.aiAnalysis && (
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-primary/90 text-primary-foreground backdrop-blur-sm px-2 py-0.5 text-[11px] font-medium shadow-sm">
            <Bot className="h-3 w-3" />
            IA Détectée
          </span>
        )}
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
            <Sparkles className="mr-2 h-4 w-4" />
            Personnaliser ce modèle
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export { TemplateCard };

