import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MugPreview } from "@/components/MugPreview";
import { buildInitialValues } from "@/lib/products";

function TemplateCard({ product, template }) {
  const previewValues = buildInitialValues(template);

  return (
    <Card className="group overflow-hidden border-border/50 transition-all hover:shadow-xl hover:border-primary/30">
      <div className="relative">
        <MugPreview
          mockup={product.mockup}
          fields={template.fields}
          values={previewValues}
          className="rounded-none transition-transform duration-300 group-hover:scale-[1.02]"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-foreground shadow-sm">
          {template.category}
        </span>
      </div>

      <CardContent className="p-4 flex flex-col justify-between h-full">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{template.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                {template.description}
              </p>
            </div>
            <span className="shrink-0 font-bold text-primary">{product.price}</span>
          </div>
        </div>
        <Button asChild className="mt-4 w-full">
          <Link to={`/personnaliser/${product.id}/${template.id}`}>
            <Sparkles className="mr-2 h-4 w-4" />
            Personnaliser avec mes infos
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export { TemplateCard };
