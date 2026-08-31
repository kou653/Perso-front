import { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from './data';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Check, ChevronRight, Loader2, RefreshCw, ShoppingCart, Sparkles, Send } from "lucide-react";

function Step1SelectProduct({ onSelect }) {
  return (
    <div>
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-foreground">
          Choisissez votre produit
        </h1>
        <p className="mt-4 text-muted-foreground">
          Sélectionnez le produit que vous souhaitez personnaliser.
        </p>
      </div>
      
      <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
        {products.map(product => (
          <Card
            key={product.id}
            className="cursor-pointer overflow-hidden transition-all hover:shadow-lg border-border/50"
            onClick={() => onSelect(product)}
          >
            <div className="aspect-square bg-muted flex items-center justify-center text-4xl">
              📦
            </div>
            <CardContent className="p-3 text-center">
              <h3 className="font-semibold text-foreground">{product.name}</h3>
              <p className="text-sm text-primary">{product.price.toFixed(2)} €</p>
              <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{product.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Step2DescribeDesign({ product, onSubmit, onBack }) {
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!description.trim()) {
      setError('Veuillez décrire le design que vous souhaitez.');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/templates/generate-ai', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: parseInt(product.id),
          description: description.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erreur ${response.status}`);
      }

      const result = await response.json();
      onSubmit(result.data);
    } catch (err) {
      console.error('API Error:', err);
      setError(err.message || 'Erreur lors de la génération du design.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-foreground">
          Décrivez votre design
        </h1>
        <p className="mt-4 text-muted-foreground">
          Décrivez le design que l'IA doit créer pour votre {product.name.toLowerCase()}.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-2xl">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Votre vision</CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-6 rounded-md bg-destructive/10 p-4 text-sm text-destructive flex justify-between items-center">
                <span><strong>Erreur :</strong> {error}</span>
                <button onClick={() => setError(null)} className="font-bold">×</button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="description">
                  Description du design <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Exemple: T-shirt noir avec un logo blanc minimaliste, style moderne et épuré."
                  rows={6}
                  disabled={isLoading}
                />
                <p className="text-sm text-muted-foreground">
                  💡 Soyez précis : couleurs, style, ambiance, éléments visuels...
                </p>
              </div>

              <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={onBack} disabled={isLoading}>
                  ← Retour
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Génération en cours...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Générer par IA
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Step3ViewTemplate({ product, template, onNext, onBack }) {
  return (
    <div>
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-foreground">
          Template généré
        </h1>
        <p className="mt-4 text-muted-foreground">
          Voici le template créé par l'IA. Vérifiez que les champs correspondent à votre vision.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-2xl">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>{template.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{template.description}</p>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg bg-muted p-4">
              <h4 className="font-medium mb-2">Champs à personnaliser :</h4>
              <ul className="space-y-2 text-sm">
                {template.editable_areas && template.editable_areas.map(area => {
                  const defaultVal = template.default_values?.[area.key] ?? area.default_value;
                  return (
                    <li key={area.key} className="bg-background rounded p-2 border">
                      <span className="font-semibold">{area.label}</span> <span className="text-muted-foreground italic">({area.type})</span>
                      {defaultVal && (
                        <p className="mt-1 text-muted-foreground">
                          Défaut: {String(defaultVal).substring(0, 50)}
                          {String(defaultVal).length > 50 ? '...' : ''}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="flex justify-between pt-6">
              <Button type="button" variant="outline" onClick={onBack}>
                ← Retour
              </Button>
              <Button type="button" onClick={onNext}>
                Continuer →
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Step4FillFields({ product, template, onSubmit, onBack }) {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [values, setValues] = useState(() => {
    const initial = {};
    if (template.editable_areas) {
      template.editable_areas.forEach(area => {
        const defaultVal = template.default_values?.[area.key];
        initial[area.key] = defaultVal ?? area.default_value ?? '';
      });
    }
    return initial;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateValue = (fieldKey, newValue) => {
    setValues(prev => ({ ...prev, [fieldKey]: newValue }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const payload = {
        product_id: parseInt(product.id),
        product_template_id: parseInt(template.id),
        customer_name: customerName || null,
        customer_email: customerEmail || null,
        customization_data: values,
      };

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
        throw new Error(errorData.message || `Erreur ${response.status}`);
      }

      const result = await response.json();
      onSubmit(result.data);
    } catch (err) {
      console.error('API Error:', err);
      setError(err.message || 'Erreur lors de la création du projet.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-foreground">Remplir les champs</h1>
        <p className="mt-4 text-muted-foreground">
          Personnalisez les valeurs pour votre {product.name.toLowerCase()}.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-2xl">
        <Card className="border-border/50">
          <CardContent className="pt-6">
            {error && (
              <div className="mb-6 rounded-md bg-destructive/10 p-4 text-sm text-destructive flex justify-between items-center">
                <span><strong>Erreur :</strong> {error}</span>
                <button onClick={() => setError(null)} className="font-bold">×</button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Informations client</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="customer-name">Nom</Label>
                    <Input
                      id="customer-name"
                      type="text"
                      value={customerName}
                      onChange={e => setCustomerName(e.target.value)}
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
                      onChange={e => setCustomerEmail(e.target.value)}
                      placeholder="vous@exemple.com"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Personnalisation du design</h3>
                {template.editable_areas && template.editable_areas.map(area => (
                  <div className="space-y-2" key={area.key}>
                    <Label htmlFor={area.key}>{area.label}</Label>
                    {area.type === 'image' ? (
                      <Input
                        id={area.key}
                        type="url"
                        value={values[area.key] ?? ''}
                        onChange={e => updateValue(area.key, e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        disabled={isLoading}
                      />
                    ) : area.type === 'color' ? (
                      <Input
                        id={area.key}
                        type="color"
                        value={values[area.key] ?? '#000000'}
                        onChange={e => updateValue(area.key, e.target.value)}
                        disabled={isLoading}
                        className="h-12 w-full cursor-pointer p-1"
                      />
                    ) : (
                      <Textarea
                        id={area.key}
                        value={values[area.key] ?? ''}
                        onChange={e => updateValue(area.key, e.target.value)}
                        placeholder={area.label}
                        rows={3}
                        disabled={isLoading}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={onBack} disabled={isLoading}>
                  ← Retour
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Création en cours...
                    </>
                  ) : (
                    <>
                      ✓ Créer le projet
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Step5Success({ project }) {
  return (
    <div className="mx-auto mt-12 max-w-lg text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <Check className="h-8 w-8 text-primary" />
      </div>
      <h2 className="mt-6 text-2xl font-bold text-foreground">Projet créé avec succès !</h2>
      <p className="mt-2 text-muted-foreground">Votre design personnalisé a été créé.</p>

      <Card className="mt-8 border-border/50 text-left">
        <CardHeader>
          <CardTitle className="text-lg">{project.product?.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm">ID du projet: <code className="bg-muted px-1 py-0.5 rounded">{project.id}</code></p>
          <p className="text-sm">Client: <strong className="text-foreground">{project.customer_name || 'Anonyme'}</strong></p>
          <p className="text-sm flex items-center gap-2">
            Statut: 
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
              {project.status}
            </span>
          </p>
        </CardContent>
      </Card>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button asChild>
          <Link to="/commande">
            Aller à la commande <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/produits">
            Voir d'autres designs
          </Link>
        </Button>
      </div>
    </div>
  );
}

export function PersonnaliserPage() {
  const [step, setStep] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [generatedTemplate, setGeneratedTemplate] = useState(null);
  const [createdProject, setCreatedProject] = useState(null);

  const handleProductSelect = product => {
    setSelectedProduct(product);
    setStep(2);
  };

  const handleDescribeDesign = template => {
    setGeneratedTemplate(template);
    setStep(3);
  };

  const handleFillFields = project => {
    setCreatedProject(project);
    setStep(5);
  };

  const stepLabels = ["Produit", "Modèle (IA)", "Vérification", "Champs", "Résultat"];

  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl">
          <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
            {stepLabels.map((label, index) => {
              const currentStep = index + 1;
              const isCompleted = step > currentStep;
              const isCurrent = step === currentStep;

              return (
                <div key={label} className="flex items-center gap-2">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                      isCompleted || isCurrent
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isCompleted ? <Check className="h-4 w-4" /> : currentStep}
                  </div>
                  <span
                    className={`hidden text-sm sm:block ${
                      isCurrent ? "font-medium text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {label}
                  </span>
                  {index < stepLabels.length - 1 && (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {step === 1 && (
          <Step1SelectProduct onSelect={handleProductSelect} />
        )}

        {step === 2 && selectedProduct && (
          <Step2DescribeDesign
            product={selectedProduct}
            onSubmit={handleDescribeDesign}
            onBack={() => setStep(1)}
          />
        )}

        {step === 3 && generatedTemplate && selectedProduct && (
          <Step3ViewTemplate
            product={selectedProduct}
            template={generatedTemplate}
            onNext={() => setStep(4)}
            onBack={() => setStep(2)}
          />
        )}

        {step === 4 && generatedTemplate && selectedProduct && (
          <Step4FillFields
            product={selectedProduct}
            template={generatedTemplate}
            onSubmit={handleFillFields}
            onBack={() => setStep(3)}
          />
        )}

        {step === 5 && createdProject && (
          <Step5Success project={createdProject} />
        )}
      </div>
    </div>
  );
}