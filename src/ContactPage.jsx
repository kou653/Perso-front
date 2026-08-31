import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Contactez-nous
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Une question ? Un projet personnalisé ? Notre équipe est là pour vous accompagner.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a href="mailto:contact@customprint.fr" className="text-muted-foreground hover:text-primary">
                  contact@customprint.fr
                </a>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  Téléphone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a href="tel:+33123456789" className="text-muted-foreground hover:text-primary">
                  +33 1 23 45 67 89
                </a>
                <p className="mt-1 text-sm text-muted-foreground">
                  Du lundi au vendredi, 9h-18h
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  Adresse
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  123 Rue de la Création
                  <br />
                  75001 Paris, France
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Envoyez-nous un message</CardTitle>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="rounded-lg bg-accent/50 p-6 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent">
                    <Send className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">Message envoyé !</h3>
                  <p className="mt-2 text-muted-foreground">
                    Nous vous répondrons dans les plus brefs délais.
                  </p>
                  <Button
                    className="mt-4"
                    variant="outline"
                    onClick={() => setSubmitted(false)}
                  >
                    Envoyer un autre message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="name">Nom complet</FieldLabel>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        placeholder="Jean Dupont"
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="email">Email</FieldLabel>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        placeholder="jean@exemple.fr"
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="subject">Sujet</FieldLabel>
                      <Input
                        id="subject"
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                        placeholder="Votre sujet"
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="message">Message</FieldLabel>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        placeholder="Décrivez votre demande..."
                        rows={5}
                      />
                    </Field>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
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