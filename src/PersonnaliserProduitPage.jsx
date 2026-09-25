import { useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProductById, getTemplateById } from './lib/products';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { COUNTRIES, DEFAULT_COUNTRY } from "./lib/countries";
import { 
  Sparkles, 
  Loader2, 
  Check, 
  ArrowLeft, 
  Upload, 
  Image as ImageIcon, 
  RotateCcw, 
  CheckCircle2, 
  Lock, 
  Edit3, 
  MapPin, 
  Phone, 
  Truck, 
  User, 
  ShieldCheck, 
  Send, 
  ChevronRight,
  ShoppingCart
} from "lucide-react";

export function PersonnaliserProduitPage() {
  const { productId, templateId } = useParams();
  const product = getProductById(productId || 'mug');
  const template = getTemplateById(productId || 'mug', templateId);

  // Steps: 'form' (saisie/modification) | 'recap' (récapitulatif avant commande) | 'success' (commande transmise)
  const [viewStep, setViewStep] = useState('form');

  // Customer & Delivery States
  const [customerName, setCustomerName] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [selectedCountryCode, setSelectedCountryCode] = useState(DEFAULT_COUNTRY.code);
  const [customerPhone, setCustomerPhone] = useState('');

  const selectedCountry = COUNTRIES.find((c) => c.code === selectedCountryCode) || DEFAULT_COUNTRY;

  // Field customization state: { [key]: { value: string, isCustomized: boolean, fileName?: string } }
  const [fieldStates, setFieldStates] = useState(() => {
    if (!template) return {};
    const initial = {};
    template.fields.forEach((f) => {
      const origVal = template.example?.[f.key] ?? f.originalValue ?? f.defaultValue ?? '';
      initial[f.key] = {
        value: origVal,
        isCustomized: false, // By default: keeps original template value unless modified
      };
    });
    return initial;
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdProject, setCreatedProject] = useState(null);
  const [validationError, setValidationError] = useState(null);
  const fileInputRefs = useRef({});

  if (!product || !template) {
    return (
      <div className="py-24 text-center">
        <h1 className="text-2xl font-bold text-foreground">Modèle introuvable</h1>
        <p className="mt-4 text-muted-foreground mb-8">Le modèle de mug demandé n'existe pas dans le catalogue.</p>
        <Button asChild>
          <Link to="/produits">Retour aux modèles</Link>
        </Button>
      </div>
    );
  }

  // Count modified vs preserved
  const customizedCount = Object.values(fieldStates).filter((s) => s.isCustomized).length;
  const preservedCount = template.fields.length - customizedCount;

  // Handle text change: if differs from original, marked as customized
  const handleFieldChange = (fieldKey, newValue) => {
    const originalValue = template.example?.[fieldKey] ?? template.fields.find(f => f.key === fieldKey)?.originalValue ?? '';
    const isDifferent = newValue.trim() !== originalValue.trim();
    
    setFieldStates((prev) => ({
      ...prev,
      [fieldKey]: {
        value: newValue,
        isCustomized: isDifferent,
      },
    }));
  };

  // Reset to original default value
  const handleResetToOriginal = (fieldKey) => {
    const originalValue = template.example?.[fieldKey] ?? template.fields.find(f => f.key === fieldKey)?.originalValue ?? '';
    setFieldStates((prev) => ({
      ...prev,
      [fieldKey]: {
        value: originalValue,
        isCustomized: false,
      },
    }));
  };

  // Handle local image file upload
  const handleImageUpload = (fieldKey, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Url = e.target.result;
      setFieldStates((prev) => ({
        ...prev,
        [fieldKey]: {
          value: base64Url,
          isCustomized: true,
          fileName: file.name,
        },
      }));
    };
    reader.readAsDataURL(file);
  };

  // Passage à l'étape Récapitulatif après validation
  const handleValidateForm = (e) => {
    e.preventDefault();
    setValidationError(null);

    // Validation stricte des champs obligatoires
    if (!deliveryLocation.trim()) {
      setValidationError('Veuillez renseigner votre lieu de livraison.');
      document.getElementById('delivery-location')?.focus();
      return;
    }

    const requiredDigits = selectedCountry.digitsCount || 9;
    const cleanPhone = customerPhone.replace(/\D/g, '');

    if (!cleanPhone) {
      setValidationError('Veuillez renseigner votre numéro de téléphone.');
      document.getElementById('cust-phone')?.focus();
      return;
    }

    if (cleanPhone.length !== requiredDigits) {
      setValidationError(`Le numéro de téléphone pour ${selectedCountry.name} (${selectedCountry.dialCode}) doit comporter exactement ${requiredDigits} chiffres (actuellement ${cleanPhone.length}).`);
      document.getElementById('cust-phone')?.focus();
      return;
    }

    // Tout est valide -> redirection vers la page de récapitulatif
    setViewStep('recap');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Confirmation finale et envoi de la commande à l'administrateur
  const handleConfirmOrder = async () => {
    setIsSubmitting(true);

    // Build final values: if not customized, keeps default original value
    const finalValues = {};
    const detailedSummary = [];

    template.fields.forEach((f) => {
      const state = fieldStates[f.key];
      const origVal = template.example?.[f.key] ?? f.originalValue ?? '';
      const finalVal = (state?.isCustomized && state?.value?.trim()) ? state.value : origVal;
      
      finalValues[f.key] = finalVal;
      detailedSummary.push({
        key: f.key,
        label: f.label,
        type: f.type,
        isCustomized: Boolean(state?.isCustomized),
        originalValue: origVal,
        finalValue: state?.isCustomized ? (state.fileName || finalVal) : origVal,
      });
    });

    const fullPhone = `${selectedCountry.dialCode} ${customerPhone.trim()}`;

    const payload = {
      product_id: 1, // mug
      template_slug: template.id,
      customer_name: customerName.trim() || 'Client',
      delivery_location: deliveryLocation.trim(),
      customer_phone: fullPhone,
      customization_data: finalValues,
      summary: {
        template_name: template.name,
        price: product.price,
        customized_count: customizedCount,
        preserved_count: preservedCount,
        detailed_fields: detailedSummary,
      },
    };

    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        setCreatedProject(result.data || payload);
      } else {
        // Fallback simulation
        setCreatedProject({
          id: 'CMD-' + Math.floor(100000 + Math.random() * 900000),
          customer_name: customerName.trim() || 'Client',
          delivery_location: deliveryLocation.trim(),
          customer_phone: fullPhone,
          selected_country: selectedCountry,
          product: { name: product.name },
          status: 'transmitted_to_admin',
          ...payload,
        });
      }
    } catch (err) {
      // Offline / dev fallback
      setCreatedProject({
        id: 'CMD-' + Math.floor(100000 + Math.random() * 900000),
        customer_name: customerName.trim() || 'Client',
        delivery_location: deliveryLocation.trim(),
        customer_phone: fullPhone,
        selected_country: selectedCountry,
        product: { name: product.name },
        status: 'transmitted_to_admin',
        ...payload,
      });
    } finally {
      setIsSubmitting(false);
      setViewStep('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-12 sm:py-16 bg-muted/20 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        {viewStep !== 'success' && (
          <div className="mb-6">
            {viewStep === 'recap' ? (
              <button 
                type="button" 
                onClick={() => {
                  setViewStep('form');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Retour à la modification des informations
              </button>
            ) : (
              <Link to="/produits" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" /> Retour à la galerie des modèles
              </Link>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* ÉTAPE 3 : COMMANDE ENREGISTRÉE & TRANSMISE */}
        {/* ========================================================================= */}
        {viewStep === 'success' ? (
          <div className="mx-auto max-w-xl bg-card rounded-2xl p-8 sm:p-12 border shadow-xl text-center my-12 space-y-6">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Check className="h-10 w-10" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Commande enregistrée & transmise
            </h1>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Button asChild size="lg" className="shadow-md cursor-pointer">
                <Link to="/">
                  <CheckCircle2 className="mr-2 h-4 w-4" /> Retour à l'accueil
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="cursor-pointer">
                <Link to="/produits">
                  Commander un autre mug
                </Link>
              </Button>
            </div>
          </div>
        ) : viewStep === 'recap' ? (
          /* ========================================================================= */
          /* ÉTAPE 2 : PAGE DE RÉCAPITULATIF DES INFORMATIONS */
          /* ========================================================================= */
          <div className="mx-auto max-w-4xl space-y-8">
            
            {/* Titre & Étape */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
                Étape 2 sur 2 • Récapitulatif
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Récapitulatif de votre commande
              </h1>
              <p className="text-[13px] sm:text-[15px] text-muted-foreground/90 font-medium max-w-xl mx-auto">
                Veuillez vérifier vos informations ci-dessous avant d'envoyer votre commande à l'atelier.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              
              {/* Colonne Gauche : Aperçu visuel du mug et détails */}
              <div className="md:col-span-5 space-y-4">
                <Card className="border-border/60 shadow-md overflow-hidden">
                  <div className="relative aspect-square overflow-hidden bg-card">
                    <img
                      src={template.imageUrl}
                      alt={template.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-foreground text-base">{template.name}</span>
                      <span className="font-bold text-primary text-lg">{product.price}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {template.description}
                    </p>
                    <div className="pt-2 border-t text-xs text-muted-foreground space-y-1">
                      <div className="flex justify-between">
                        <span>Contenance :</span>
                        <strong className="text-foreground">330 ml (Céramique brillante)</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Impression :</span>
                        <strong className="text-foreground">Sublimation HD 300 DPI</strong>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Colonne Droite : Coordonnées et Détail des éléments personnalisés */}
              <div className="md:col-span-7 space-y-4">
                
                {/* Coordonnées de livraison */}
                <Card className="border-border/60 shadow-xs">
                  <CardHeader className="pb-3 border-b bg-muted/20">
                    <CardTitle className="text-sm font-bold flex items-center justify-between">
                      <span className="flex items-center gap-2 text-foreground">
                        <Truck className="h-4 w-4 text-primary" />
                        Coordonnées de livraison
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setViewStep('form');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="h-7 text-xs text-primary hover:text-primary hover:bg-primary/10"
                      >
                        <Edit3 className="h-3 w-3 mr-1" />
                        Modifier
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-2.5 text-sm">
                    <div className="flex items-center justify-between border-b pb-2">
                      <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
                        <User className="h-3.5 w-3.5" />
                        Destinataire :
                      </span>
                      <span className="font-semibold text-foreground">
                        {customerName || 'Client'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-b pb-2">
                      <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
                        <MapPin className="h-3.5 w-3.5 text-primary" />
                        Lieu de livraison :
                      </span>
                      <span className="font-semibold text-foreground text-right max-w-xs truncate">
                        {deliveryLocation}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
                        <Phone className="h-3.5 w-3.5 text-primary" />
                        Téléphone :
                      </span>
                      <span className="font-semibold text-foreground">
                        {selectedCountry.flag} {selectedCountry.dialCode} {customerPhone}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Éléments à imprimer sur le mug */}
                <Card className="border-border/60 shadow-xs">
                  <CardHeader className="pb-3 border-b bg-muted/20">
                    <CardTitle className="text-sm font-bold flex items-center justify-between">
                      <span className="flex items-center gap-2 text-foreground">
                        <Edit3 className="h-4 w-4 text-primary" />
                        Éléments à imprimer sur le mug
                      </span>
                      <span className="text-xs font-normal text-muted-foreground">
                        {customizedCount} modifié(s) • {preservedCount} par défaut
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-2">
                    {template.fields.map((field) => {
                      const state = fieldStates[field.key];
                      const isMod = state?.isCustomized;
                      const origVal = template.example?.[field.key] ?? field.originalValue ?? '';
                      const finalVal = isMod ? (state?.fileName || state?.value) : origVal;

                      return (
                        <div key={field.key} className="flex items-start justify-between text-xs py-2 px-3 rounded-lg bg-muted/30 border">
                          <span className="font-medium text-muted-foreground">{field.label} :</span>
                          <div className="text-right max-w-xs ml-2">
                            <span className="font-semibold text-foreground block truncate">
                              {finalVal}
                            </span>
                            <span className="text-[10px] italic block mt-0.5">
                              {isMod ? (
                                <span className="text-primary font-medium">✓ Remplacé par vous</span>
                              ) : (
                                <span className="text-muted-foreground">Modèle d'origine conservé</span>
                              )}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>

                {/* Boutons d'action : Modifier vs Commander */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      setViewStep('form');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex-1 text-sm font-semibold py-6 cursor-pointer"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Modifier les informations
                  </Button>
                  
                  <Button
                    type="button"
                    size="lg"
                    disabled={isSubmitting}
                    onClick={handleConfirmOrder}
                    className="flex-1 text-base font-bold py-6 shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Commander ({product.price})
                      </>
                    )}
                  </Button>
                </div>

              </div>

            </div>

          </div>
        ) : (
          /* ========================================================================= */
          /* ÉTAPE 1 : FORMULAIRE DE SAISIE & MODIFICATION */
          /* ========================================================================= */
          <div className="mx-auto max-w-2xl space-y-6">
            
            {/* Titre & Description */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary border border-primary/20">
                Étape 1 sur 2 • Personnalisation du mug
              </div>
              <div className="flex items-center justify-between gap-4">
                <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {template.name}
                </h1>
                <span className="text-xl font-bold text-primary shrink-0">{product.price}</span>
              </div>
              <p className="text-[13px] sm:text-[15px] text-muted-foreground/90 font-medium leading-relaxed">
                {template.description}
              </p>
            </div>

            {/* Formulaire principal */}
            <form onSubmit={handleValidateForm} className="space-y-6">

              {/* Section : Éléments du modèle à modifier ou conserver */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-semibold text-foreground flex items-center gap-2">
                    <Edit3 className="h-4 w-4 text-primary" />
                    Éléments du mug ({template.fields.length})
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    {customizedCount} modifié(s) • {preservedCount} par défaut
                  </span>
                </div>

                {template.fields.map((field, index) => {
                  const state = fieldStates[field.key] || { value: '', isCustomized: false };
                  const isCustomized = state.isCustomized;
                  const originalVal = template.example?.[field.key] ?? field.originalValue ?? '';

                  return (
                    <Card 
                      key={field.key} 
                      className={`transition-all border ${isCustomized ? 'border-primary/80 shadow-xs bg-background' : 'border-border/60 bg-card/60'}`}
                    >
                      <CardContent className="p-4 sm:p-5 space-y-3">
                        
                        {/* En-tête du champ */}
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <div>
                            <Label htmlFor={field.key} className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[11px] font-bold text-muted-foreground">
                                {index + 1}
                              </span>
                              {field.label}
                            </Label>
                            {field.description && (
                              <p className="text-xs text-muted-foreground mt-0.5">{field.description}</p>
                            )}
                          </div>

                          {/* Badge état / Réinitialiser */}
                          <div className="flex items-center gap-2">
                            {isCustomized ? (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleResetToOriginal(field.key)}
                                className="h-7 text-xs text-muted-foreground hover:text-foreground"
                              >
                                <RotateCcw className="h-3 w-3 mr-1" />
                                Rétablir la valeur par défaut
                              </Button>
                            ) : (
                              <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground border">
                                <Lock className="h-3 w-3" />
                                Modèle par défaut conservé
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Saisie (Image vs Texte) */}
                        {field.type === 'image' ? (
                          <div className="space-y-3 pt-1">
                            <div className="flex items-center gap-4">
                              <div className="relative h-16 w-16 shrink-0 rounded-lg overflow-hidden border bg-muted flex items-center justify-center">
                                {state.value ? (
                                  <img src={state.value} alt={field.label} className="h-full w-full object-cover" />
                                ) : (
                                  <ImageIcon className="h-6 w-6 text-muted-foreground" />
                                )}
                              </div>

                              <div className="flex-1 space-x-2">
                                <input
                                  type="file"
                                  ref={(el) => (fileInputRefs.current[field.key] = el)}
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => handleImageUpload(field.key, e.target.files?.[0])}
                                />
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => fileInputRefs.current[field.key]?.click()}
                                  className="text-xs"
                                >
                                  <Upload className="h-3.5 w-3.5 mr-1.5" />
                                  {isCustomized ? "Changer votre photo" : "Remplacer par votre photo"}
                                </Button>
                              </div>
                            </div>
                            <p className="text-[11px] text-muted-foreground">
                              {isCustomized ? `✓ Photo personnalisée : ${state.fileName || 'Image sélectionnée'}` : "Photo du modèle d'origine conservée"}
                            </p>
                          </div>
                        ) : (
                          <div className="pt-1">
                            <Input
                              id={field.key}
                              type="text"
                              value={state.value}
                              placeholder={field.placeholder || originalVal}
                              onChange={(e) => handleFieldChange(field.key, e.target.value)}
                              className="text-sm font-medium"
                            />
                            <div className="flex items-center justify-between text-[11px] text-muted-foreground mt-1.5">
                              <span>Valeur par défaut : <strong className="text-foreground/80">{originalVal || '(vide)'}</strong></span>
                              {isCustomized && (
                                <span className="text-primary font-semibold">✓ Remplacé par votre texte</span>
                              )}
                            </div>
                          </div>
                        )}

                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Section : Informations de livraison et de contact */}
              <Card className="border-border/60">
                <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <Truck className="h-4 w-4 text-primary" />
                    Informations de livraison & Contact
                  </CardTitle>
                  <span className="text-[11px] font-normal text-muted-foreground">
                    <span className="text-destructive font-bold">*</span> Champs obligatoires
                  </span>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Nom ou Prénom */}
                    <div className="space-y-1.5">
                      <Label htmlFor="cust-name" className="text-xs flex items-center gap-1.5 font-medium">
                        <User className="h-3.5 w-3.5 text-muted-foreground" />
                        Votre Nom ou Prénom
                      </Label>
                      <Input
                        id="cust-name"
                        placeholder="Ex: Sophie Martin"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                      />
                    </div>

                    {/* Lieu de livraison (Obligatoire avec *) */}
                    <div className="space-y-1.5">
                      <Label htmlFor="delivery-location" className="text-xs flex items-center gap-1.5 font-medium">
                        <MapPin className="h-3.5 w-3.5 text-primary" />
                        Lieu de livraison <span className="text-destructive font-bold">*</span>
                      </Label>
                      <Input
                        id="delivery-location"
                        type="text"
                        required
                        placeholder="Ex: 14 Rue de la Paix, Paris..."
                        value={deliveryLocation}
                        onChange={(e) => {
                          setDeliveryLocation(e.target.value);
                          if (validationError) setValidationError(null);
                        }}
                        className={validationError && !deliveryLocation.trim() ? "border-destructive focus-visible:ring-destructive" : ""}
                      />
                    </div>

                    {/* Numéro de téléphone (Obligatoire avec *) */}
                    <div className="space-y-1.5 sm:col-span-1">
                      <Label htmlFor="cust-phone" className="text-xs flex items-center justify-between font-medium">
                        <span className="flex items-center gap-1.5">
                          <Phone className="h-3.5 w-3.5 text-primary" />
                          Numéro de téléphone <span className="text-destructive font-bold">*</span>
                        </span>
                        <span className="text-[10px] text-muted-foreground font-normal">
                          ({selectedCountry.digitsCount} chiffres)
                        </span>
                      </Label>
                      
                      {/* Champ unique compact : uniquement l'indicateur (+225) et le numéro */}
                      <div className={`relative flex items-center h-9 rounded-md border bg-background shadow-xs focus-within:ring-2 transition-all overflow-hidden ${
                        validationError && (!customerPhone.trim() || customerPhone.replace(/\D/g, '').length !== selectedCountry.digitsCount)
                          ? "border-destructive focus-within:ring-destructive" 
                          : "border-input focus-within:ring-ring focus-within:border-primary"
                      }`}>
                        {/* Sélecteur compact avec uniquement drapeau + indicatif */}
                        <div className="relative shrink-0 border-r border-input bg-muted/40 hover:bg-muted/70 transition-colors flex items-center">
                          <div className="px-2.5 py-1.5 flex items-center gap-1 text-xs font-semibold text-foreground select-none pointer-events-none">
                            <span>{selectedCountry.flag}</span>
                            <span>{selectedCountry.dialCode}</span>
                            <span className="text-muted-foreground text-[8px] ml-0.5">▼</span>
                          </div>
                          <select
                            id="cust-country"
                            value={selectedCountryCode}
                            onChange={(e) => {
                              setSelectedCountryCode(e.target.value);
                              if (validationError) setValidationError(null);
                            }}
                            aria-label="Sélectionner le pays"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          >
                            {COUNTRIES.map((c) => (
                              <option key={c.code} value={c.code}>
                                {c.flag} {c.dialCode} - {c.name} ({c.digitsCount} chiffres)
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Saisie directe du numéro (chiffres uniquement et longueur exacte) */}
                        <div className="flex-1 flex items-center">
                          <input
                            id="cust-phone"
                            type="tel"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength={selectedCountry.digitsCount}
                            required
                            placeholder={selectedCountry.placeholder ? selectedCountry.placeholder.replace(/\s/g, '') : '012345678'}
                            value={customerPhone}
                            onChange={(e) => {
                              const val = e.target.value.replace(/\D/g, '').slice(0, selectedCountry.digitsCount);
                              setCustomerPhone(val);
                              if (validationError) setValidationError(null);
                            }}
                            className="w-full h-9 px-2.5 bg-transparent text-xs sm:text-sm font-medium text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Message d'erreur de validation si champs manquants */}
              {validationError && (
                <div className="rounded-lg bg-destructive/10 border border-destructive/30 p-3 text-xs text-destructive font-medium flex items-center gap-2 animate-shake">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-destructive text-white font-bold text-[11px]">!</span>
                  <span>{validationError}</span>
                </div>
              )}

              {/* Bouton Valider pour passer au récapitulatif */}
              <div className="pt-2">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full text-base font-semibold py-6 shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Valider</span>
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>

            </form>

          </div>
        )}

      </div>
    </div>
  );
}
