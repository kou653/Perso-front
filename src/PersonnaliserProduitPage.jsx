import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProductById, getTemplateById } from './data';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Sparkles, Loader2, Check, ArrowLeft, ArrowRight, X } from "lucide-react";

function buildInitialValues(template) {
  return Object.fromEntries(
    template.fields.map(field => [field.key, field.defaultValue ?? '']),
  );
}

function FieldInput({ field, value, onChange }) {
  const commonProps = {
    id: field.key,
    name: field.key,
    value,
    onChange: event => onChange(field.key, event.target.value),
  };

  if (field.type === 'image') {
    return (
      <Input
        {...commonProps}
        type="url"
        placeholder="https://exemple.com/image.png"
      />
    );
  }

  if (field.type === 'color') {
    return <Input {...commonProps} type="color" className="h-12 cursor-pointer p-1" />;
  }

  return (
    <Input
      {...commonProps}
      type="text"
      placeholder={field.defaultValue || field.label}
    />
  );
}

function TemplatePreview({ product, template, values }) {
  return (
    <Card className="sticky top-24 border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
            {template.category}
          </span>
          <span className="font-bold text-primary">{product.price.toFixed(2)} €</span>
        </div>
        <CardTitle className="mt-2 text-xl">{template.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <img 
            src={template.imageUrl} 
            alt={`Aperçu ${template.name}`}
            className="h-full w-full object-cover" 
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 p-4 text-white">
            <div 
              className="rounded-lg p-4 text-center backdrop-blur-sm"
              style={{ backgroundColor: template.layout?.primaryColor || 'rgba(0,0,0,0.5)' }}
            >
              {template.fields.map(field => (
                <div key={field.key} className="mb-2 last:mb-0">
                  <span className="text-xs uppercase opacity-80 block">{field.label}</span>
                  <span className="font-bold">{values[field.key] || '...'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function PersonnaliserProduitPage() {
  const { productId, templateId } = useParams();
  const product = getProductById(productId);
  const template = getTemplateById(templateId);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [values, setValues] = useState(() => template ? buildInitialValues(template) : {});
  
  // API States
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [aiSuggestions, setAiSuggestions] = useState(null);
  const [createdProject, setCreatedProject] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  if (!product || !template || template.productId !== productId) {
    return (
      <div className="py-24 text-center">
        <h1 className="text-2xl font-bold text-foreground">Modèle introuvable</h1>
        <p className="mt-4 text-muted-foreground mb-8">Le modèle de mug demandé n'existe pas dans le catalogue actuel.</p>
        <Button asChild>
          <Link to="/produits">Retour aux modèles</Link>
        </Button>
      </div>
    );
  }

  const updateValue = (fieldKey, nextValue) => {
    setValues(currentValues => ({
      ...currentValues,
      [fieldKey]: nextValue,
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);
    setAiSuggestions(null);

    try {
      const payload = {
        product_id: parseInt(product.id),
        product_template_id: parseInt(template.id),
        customer_name: customerName || null,
        customer_email: customerEmail || null,
        customization_data: values,
      };

      if (aiPrompt.trim()) {
        payload.ai_refinement_prompt = aiPrompt;
      }

      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erreur ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.ai_suggestions && Object.keys(result.ai_suggestions).length > 0) {
        setAiSuggestions(result.ai_suggestions);
        setShowSuggestions(true);
      }

      setCreatedProject(result.data);
      
      if (!result.ai_suggestions || Object.keys(result.ai_suggestions).length === 0) {
        setTimeout(() => {
          window.location.href = `/commande?projectId=${result.data.id}`;
        }, 1500);
      }
    } catch (err) {
      console.error('API Error:', err);
      setError(err.message || 'Une erreur est survenue lors de la création du projet.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptSuggestions = () => {
    if (createdProject) {
      window.location.href = `/commande?projectId=${createdProject.id}`;
    }
  };

  const handleRejectSuggestions = () => {
    setShowSuggestions(false);
    setAiSuggestions(null);
  };

  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/produits" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> Retour aux modèles
          </Link>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Personnaliser {product.name}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Remplacez les valeurs du modèle, vérifiez l'aperçu, puis créez votre projet.
          </p>
        </div>

        {error && (
          <div className="mb-8 rounded-md bg-destructive/10 p-4 text-sm text-destructive flex justify-between items-center">
            <span><strong>Erreur :</strong> {error}</span>
            <button onClick={() => setError(null)} className="font-bold">×</button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <Card className="border-border/50">
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg border-b pb-2">Informations client</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="customer-name">Nom</Label>
                        <Input
                          id="customer-name"
                          type="text"
                          value={customerName}
                          onChange={event => setCustomerName(event.target.value)}
                          placeholder="Votre nom"
                          disabled={isLoading}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="customer-email">Email</Label>
                        <Input
                          id="customer-email"
                          type="email"
                          value={customerEmail}
                          onChange={event => setCustomerEmail(event.target.value)}
                          placeholder="vous@exemple.com"
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg border-b pb-2">Champs du modèle</h3>
                    {template.fields.map(field => (
                      <div className="space-y-2" key={field.key}>
                        <Label htmlFor={field.key}>{field.label}</Label>
                        <FieldInput 
                          field={field} 
                          value={values[field.key] ?? ''} 
                          onChange={updateValue}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg border-b pb-2 flex items-center justify-between">
                      Assistance IA
                      {aiPrompt && <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">Actif</span>}
                    </h3>
                    <div className="space-y-2">
                      <Label htmlFor="ai-prompt">Prompt IA optionnel</Label>
                      <Textarea
                        id="ai-prompt"
                        value={aiPrompt}
                        onChange={event => setAiPrompt(event.target.value)}
                        rows={3}
                        placeholder={`Exemple : crée un style moderne pour ${product.name}, avec une ambiance premium.`}
                        disabled={isLoading}
                      />
                      <p className="text-sm text-muted-foreground">
                        💡 Laissez vide pour garder vos valeurs, ou décrivez comment l'IA peut affiner votre design.
                      </p>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading || (createdProject && !showSuggestions)}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Création en cours...
                        {aiPrompt && <span className="ml-1 text-xs opacity-75">(L'IA affine...)</span>}
                      </>
                    ) : (
                      'Créer le projet'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {showSuggestions && aiSuggestions && (
              <Card className="mt-8 border-primary/50 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
                <CardHeader>
                  <CardTitle className="flex items-center text-primary">
                    <Sparkles className="mr-2 h-5 w-5" /> Suggestions IA appliquées
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">L'IA a affiné votre design avec les modifications suivantes :</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6 bg-muted/30 p-4 rounded-lg">
                    {Object.entries(aiSuggestions).map(([key, value]) => (
                      <div key={key} className="flex flex-col sm:flex-row sm:items-start sm:gap-4 border-b border-border/50 pb-2 last:border-0 last:pb-0">
                        <span className="font-medium text-sm w-32 shrink-0">{key}:</span>
                        <span className="text-sm text-muted-foreground break-all">
                          {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button onClick={handleAcceptSuggestions} className="flex-1">
                      <Check className="mr-2 h-4 w-4" /> Accepter et commander
                    </Button>
                    <Button onClick={handleRejectSuggestions} variant="outline" className="flex-1">
                      <X className="mr-2 h-4 w-4" /> Rejeter et modifier
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {createdProject && !showSuggestions && (
              <div className="mt-8 rounded-lg bg-green-500/10 p-6 text-center text-green-600 dark:text-green-400">
                <Check className="mx-auto h-8 w-8 mb-2" />
                <h2 className="text-xl font-bold mb-1">Projet créé avec succès !</h2>
                <p className="text-sm">Redirection vers la commande...</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-5">
            <TemplatePreview product={product} template={template} values={values} />
          </div>
        </div>
      </div>
    </div>
  );
}
