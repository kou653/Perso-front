import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import { COUNTRIES, DEFAULT_COUNTRY } from "./lib/countries";

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [selectedCountryCode, setSelectedCountryCode] = useState(DEFAULT_COUNTRY.code);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  const selectedCountry = COUNTRIES.find((c) => c.code === selectedCountryCode) || DEFAULT_COUNTRY;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPhoneError("");

    const requiredDigits = selectedCountry.digitsCount;
    const cleanPhone = formData.phone.replace(/\D/g, "");

    if (!cleanPhone) {
      setPhoneError("Veuillez renseigner votre numéro de téléphone.");
      return;
    }

    if (cleanPhone.length !== requiredDigits) {
      setPhoneError(
        `Le numéro de téléphone pour ${selectedCountry.name} (${selectedCountry.dialCode}) doit comporter exactement ${requiredDigits} chiffres (actuellement ${cleanPhone.length}).`
      );
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center space-y-2 mb-10">
          <h1 className="text-balance text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight">
            Contactez-nous
          </h1>
          <p className="text-pretty text-base sm:text-lg text-muted-foreground leading-relaxed">
            Une question ? Un projet personnalisé ? Notre équipe est là pour vous accompagner.
          </p>
        </div>

        <div className="mx-auto max-w-xl">
          <Card className="border border-border/60 bg-card rounded-3xl shadow-md overflow-hidden">
            <CardHeader className="bg-muted/20 border-b border-border/40 pb-5">
              <CardTitle className="text-xl font-semibold">Envoyez-nous un message</CardTitle>
            </CardHeader>
            <CardContent className="p-6 sm:p-8">
              {submitted ? (
                <div className="rounded-2xl bg-primary/5 border border-primary/20 p-8 text-center space-y-4">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Message envoyé avec succès !</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Nous vous répondrons dans les plus brefs délais sur votre numéro.
                  </p>
                  <Button
                    className="mt-2 font-semibold cursor-pointer"
                    variant="outline"
                    onClick={() => {
                      setSubmitted(false);
                      setPhoneError("");
                    }}
                  >
                    Envoyer un autre message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="name" className="text-xs font-medium">Nom complet <span className="text-destructive">*</span></FieldLabel>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        placeholder="Jean Dupont"
                        className="h-10 text-sm"
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="phone" className="flex items-center justify-between text-xs font-medium">
                        <span>Numéro de téléphone <span className="text-destructive">*</span></span>
                        <span className="text-[10px] text-muted-foreground font-normal">
                          ({selectedCountry.digitsCount} chiffres requis)
                        </span>
                      </FieldLabel>
                      
                      <div className={`relative flex items-center h-10 rounded-md border bg-background shadow-xs focus-within:ring-2 transition-all overflow-hidden ${
                        phoneError ? "border-destructive focus-within:ring-destructive" : "border-input focus-within:ring-ring focus-within:border-primary"
                      }`}>
                        {/* Sélecteur compact avec uniquement drapeau + indicatif */}
                        <div className="relative shrink-0 border-r border-input bg-muted/40 hover:bg-muted/70 transition-colors flex items-center">
                          <div className="px-2.5 py-1.5 flex items-center gap-1 text-xs sm:text-sm font-semibold text-foreground select-none pointer-events-none">
                            <span>{selectedCountry.flag}</span>
                            <span>{selectedCountry.dialCode}</span>
                            <span className="text-muted-foreground text-[8px] ml-0.5">▼</span>
                          </div>
                          <select
                            id="country-select"
                            value={selectedCountryCode}
                            onChange={(e) => {
                              setSelectedCountryCode(e.target.value);
                              if (phoneError) setPhoneError("");
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
                            id="phone"
                            type="tel"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            minLength={selectedCountry.digitsCount}
                            maxLength={selectedCountry.digitsCount}
                            required
                            placeholder={selectedCountry.placeholder ? selectedCountry.placeholder.replace(/\s/g, '') : '012345678'}
                            value={formData.phone}
                            onChange={(e) => {
                              const val = e.target.value.replace(/\D/g, '').slice(0, selectedCountry.digitsCount);
                              setFormData({ ...formData, phone: val });
                              if (phoneError) setPhoneError("");
                            }}
                            className="w-full h-10 px-3 bg-transparent text-sm font-medium text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
                          />
                        </div>
                      </div>

                      {phoneError && (
                        <p className="mt-1.5 text-xs text-destructive font-medium flex items-center gap-1">
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-destructive" />
                          {phoneError}
                        </p>
                      )}
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="subject" className="text-xs font-medium">Sujet <span className="text-xs font-normal text-muted-foreground">(optionnel)</span></FieldLabel>
                      <Input
                        id="subject"
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Votre sujet"
                        className="h-10 text-sm"
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="message" className="text-xs font-medium">Message <span className="text-destructive">*</span></FieldLabel>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        placeholder="Décrivez votre demande..."
                        rows={5}
                        className="text-sm"
                      />
                    </Field>

                    <Button type="submit" className="w-full shadow-md font-semibold cursor-pointer py-2.5" disabled={isSubmitting}>
                      {isSubmitting ? (
                        "Envoi en cours..."
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Envoyer le message
                        </>
                      )}
                    </Button>
                  </FieldGroup>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}