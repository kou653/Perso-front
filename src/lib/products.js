import { MUG_MOCKUP } from "./mugMockup";

export const products = {
  mug: {
    id: "mug",
    name: "Mug Céramique",
    description: "Mug en céramique de haute qualité, 330ml",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop",
    price: "12,99 €",
    priceValue: 12.99,
    features: ["Capacité 330ml", "Céramique premium", "Impression HD"],
    mockup: MUG_MOCKUP,
    templates: [
      {
        id: "mug-corporate-1",
        name: "Corporate Pro",
        description: "Logo, nom et slogan d'entreprise sur le mug",
        category: "Professionnel",
        example: {
          logo: "https://images.unsplash.com/photo-1611162617474-5b21e939e113?w=200&h=200&fit=crop",
          company: "TechVision Solutions",
          name: "Marie Laurent",
          message: "L'innovation au service de votre succès",
          accent_color: "#1e3a5f",
        },
        fields: [
          {
            key: "logo",
            type: "image",
            label: "Logo entreprise",
            placeholder: "https://exemple.com/logo.png",
            required: false,
            zone: { top: "4%", left: "50%", width: "55%", height: "30%", anchor: "center" },
          },
          {
            key: "company",
            type: "text",
            label: "Nom de l'entreprise",
            placeholder: "TechVision Solutions",
            required: true,
            zone: { top: "36%", left: "50%", width: "92%", height: "10%", anchor: "center" },
            style: {
              fontSize: "0.45rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#64748b",
              textAlign: "center",
            },
          },
          {
            key: "name",
            type: "text",
            label: "Votre nom",
            placeholder: "Marie Laurent",
            required: true,
            usesAccent: true,
            zone: { top: "48%", left: "50%", width: "92%", height: "14%", anchor: "center" },
            style: {
              fontSize: "0.75rem",
              fontWeight: 700,
              textAlign: "center",
            },
          },
          {
            key: "message",
            type: "text",
            label: "Slogan / Message",
            placeholder: "L'innovation au service de votre succès",
            required: false,
            zone: { top: "64%", left: "50%", width: "90%", height: "12%", anchor: "center" },
            style: {
              fontSize: "0.42rem",
              fontStyle: "italic",
              color: "#94a3b8",
              textAlign: "center",
              lineHeight: 1.3,
            },
          },
          {
            key: "accent_color",
            type: "color",
            label: "Couleur principale",
            defaultValue: "#1e3a5f",
          },
        ],
      },
      {
        id: "mug-gift-1",
        name: "Cadeau Personnalisé",
        description: "Prénom et message affectueux imprimés sur le mug",
        category: "Cadeau",
        example: {
          name: "Papa",
          message: "Le meilleur papa du monde ! ☕",
          accent_color: "#dc2626",
        },
        fields: [
          {
            key: "name",
            type: "text",
            label: "Destinataire",
            placeholder: "Papa",
            required: true,
            usesAccent: true,
            zone: { top: "30%", left: "50%", width: "88%", height: "18%", anchor: "center" },
            style: {
              fontSize: "0.9rem",
              fontWeight: 800,
              textAlign: "center",
              fontFamily: "Georgia, serif",
            },
          },
          {
            key: "message",
            type: "text",
            label: "Message personnel",
            placeholder: "Le meilleur papa du monde !",
            required: true,
            zone: { top: "52%", left: "50%", width: "85%", height: "20%", anchor: "center" },
            style: {
              fontSize: "0.5rem",
              fontStyle: "italic",
              color: "#475569",
              textAlign: "center",
              lineHeight: 1.4,
            },
          },
          {
            key: "accent_color",
            type: "color",
            label: "Couleur du prénom",
            defaultValue: "#dc2626",
          },
        ],
      },
      {
        id: "mug-nature-1",
        name: "Nature & Zen",
        description: "Prénom et citation inspirante avec style naturel",
        category: "Lifestyle",
        example: {
          name: "Sophie",
          message: "« Chaque jour est une nouvelle opportunité »",
          accent_color: "#166534",
        },
        fields: [
          {
            key: "name",
            type: "text",
            label: "Prénom",
            placeholder: "Sophie",
            required: true,
            zone: { top: "68%", left: "50%", width: "80%", height: "10%", anchor: "center" },
            style: {
              fontSize: "0.55rem",
              fontWeight: 600,
              color: "#166534",
              textAlign: "center",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            },
          },
          {
            key: "message",
            type: "text",
            label: "Citation inspirante",
            placeholder: "Chaque jour est une nouvelle opportunité",
            required: true,
            usesAccent: true,
            zone: { top: "28%", left: "50%", width: "88%", height: "32%", anchor: "center" },
            style: {
              fontSize: "0.55rem",
              fontStyle: "italic",
              textAlign: "center",
              lineHeight: 1.5,
              fontFamily: "Georgia, serif",
            },
          },
          {
            key: "accent_color",
            type: "color",
            label: "Couleur de la citation",
            defaultValue: "#166534",
          },
        ],
      },
      {
        id: "mug-photo-1",
        name: "Photo Souvenir",
        description: "Votre photo imprimée sur le mug avec une légende",
        category: "Photo",
        example: {
          photo: "https://images.unsplash.com/photo-1529156069898-b59f1a629594?w=400&h=400&fit=crop",
          caption: "Souvenirs inoubliables — Été 2024",
        },
        fields: [
          {
            key: "photo",
            type: "image",
            label: "Votre photo",
            placeholder: "https://exemple.com/photo.jpg",
            required: true,
            zone: { top: "8%", left: "50%", width: "78%", height: "58%", anchor: "center" },
          },
          {
            key: "caption",
            type: "text",
            label: "Légende",
            placeholder: "Souvenirs inoubliables — Été 2024",
            required: false,
            zone: { top: "72%", left: "50%", width: "90%", height: "12%", anchor: "center" },
            style: {
              fontSize: "0.42rem",
              fontWeight: 500,
              color: "#64748b",
              textAlign: "center",
            },
          },
        ],
      },
    ],
  },
};

export function getProductById(id) {
  return products[id];
}

export function getTemplateById(productId, templateId) {
  const product = products[productId];
  return product?.templates.find((t) => t.id === templateId);
}

export function buildInitialValues(template) {
  if (!template) return {};
  return Object.fromEntries(
    template.fields.map((field) => [
      field.key,
      template.example?.[field.key] ?? field.defaultValue ?? "",
    ])
  );
}

export function findTemplateById(templateId) {
  for (const product of Object.values(products)) {
    const template = product.templates.find((t) => t.id === templateId);
    if (template) return { product, template };
  }
  return null;
}
