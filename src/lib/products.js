export const products = {
  mug: {
    id: "mug",
    name: "Mug Céramique",
    description: "Mug en céramique de haute qualité, 330ml",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop",
    price: "12,99 €",
    features: ["Capacité 330ml", "Céramique premium", "Impression HD"],
    templates: [
      {
        id: "mug-corporate-1",
        name: "Corporate Pro",
        description: "Logo et nom d'entreprise en position centrale",
        preview: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=400&fit=crop",
        category: "Professionnel",
        example: {
          name: "Marie Laurent",
          company: "TechVision Solutions",
          message: "L'innovation au service de votre succès",
        },
        fields: [
          { key: "name", label: "Votre nom", placeholder: "Marie Laurent", required: true },
          { key: "company", label: "Nom de l'entreprise", placeholder: "TechVision Solutions", required: true },
          { key: "message", label: "Slogan / Message", placeholder: "L'innovation au service de votre succès", required: false },
        ],
        layout: {
          position: "center",
          style: "corporate",
          primaryColor: "#1e3a5f",
          secondaryColor: "#64748b",
        },
      },
      {
        id: "mug-gift-1",
        name: "Cadeau Personnalisé",
        description: "Message affectueux pour un proche",
        preview: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop",
        category: "Cadeau",
        example: {
          name: "Papa",
          company: "",
          message: "Le meilleur papa du monde !",
        },
        fields: [
          { key: "name", label: "Destinataire", placeholder: "Papa", required: true },
          { key: "message", label: "Message personnel", placeholder: "Le meilleur papa du monde !", required: true },
        ],
        layout: {
          position: "center",
          style: "playful",
          primaryColor: "#dc2626",
          secondaryColor: "#fbbf24",
        },
      },
      {
        id: "mug-nature-1",
        name: "Nature & Zen",
        description: "Design naturel avec citation inspirante",
        preview: "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=400&h=400&fit=crop",
        category: "Lifestyle",
        example: {
          name: "Sophie",
          company: "",
          message: "Chaque jour est une nouvelle opportunité",
        },
        fields: [
          { key: "name", label: "Prénom", placeholder: "Sophie", required: true },
          { key: "message", label: "Citation inspirante", placeholder: "Chaque jour est une nouvelle opportunité", required: true },
        ],
        layout: {
          position: "bottom",
          style: "elegant",
          primaryColor: "#166534",
          secondaryColor: "#86efac",
        },
      },
    ],
  },
  tshirt: {
    id: "tshirt",
    name: "T-Shirt Coton",
    description: "T-shirt 100% coton bio, tailles XS à XXL",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    price: "24,99 €",
    features: ["100% coton bio", "Tailles XS à XXL", "Impression durable"],
    templates: [
      {
        id: "tshirt-team-1",
        name: "Team Building",
        description: "T-shirt d'équipe avec nom et logo",
        preview: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop",
        category: "Équipe",
        example: {
          name: "Équipe Alpha",
          company: "StartupHub Paris",
          message: "Ensemble, on va plus loin",
        },
        fields: [
          { key: "name", label: "Nom de l'équipe", placeholder: "Équipe Alpha", required: true },
          { key: "company", label: "Organisation", placeholder: "StartupHub Paris", required: true },
          { key: "message", label: "Devise de l'équipe", placeholder: "Ensemble, on va plus loin", required: false },
        ],
        layout: {
          position: "center",
          style: "bold",
          primaryColor: "#7c3aed",
          secondaryColor: "#c4b5fd",
        },
      },
      {
        id: "tshirt-event-1",
        name: "Événement Spécial",
        description: "Souvenir d'événement avec date",
        preview: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&h=400&fit=crop",
        category: "Événement",
        example: {
          name: "Festival d'Été 2024",
          company: "",
          message: "Des souvenirs inoubliables",
          date: "15-17 Juillet 2024",
          location: "Nice, France",
        },
        fields: [
          { key: "name", label: "Nom de l'événement", placeholder: "Festival d'Été 2024", required: true },
          { key: "date", label: "Date", placeholder: "15-17 Juillet 2024", required: true },
          { key: "location", label: "Lieu", placeholder: "Nice, France", required: false },
          { key: "message", label: "Slogan", placeholder: "Des souvenirs inoubliables", required: false },
        ],
        layout: {
          position: "center",
          style: "playful",
          primaryColor: "#f97316",
          secondaryColor: "#fcd34d",
        },
      },
      {
        id: "tshirt-sport-1",
        name: "Club Sportif",
        description: "Maillot personnalisé pour votre club",
        preview: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=400&fit=crop",
        category: "Sport",
        example: {
          name: "Thomas Durand",
          company: "FC Lyon Elite",
          message: "Numéro 10",
        },
        fields: [
          { key: "name", label: "Nom du joueur", placeholder: "Thomas Durand", required: true },
          { key: "company", label: "Nom du club", placeholder: "FC Lyon Elite", required: true },
          { key: "message", label: "Numéro", placeholder: "Numéro 10", required: true },
        ],
        layout: {
          position: "center",
          style: "bold",
          primaryColor: "#dc2626",
          secondaryColor: "#1e3a8a",
        },
      },
    ],
  },
  sac: {
    id: "sac",
    name: "Sac Tote Bag",
    description: "Sac en toile de coton résistant",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=400&fit=crop",
    price: "19,99 €",
    features: ["Toile épaisse", "Anses renforcées", "Grande capacité"],
    templates: [
      {
        id: "sac-eco-1",
        name: "Éco-Responsable",
        description: "Message environnemental personnalisé",
        preview: "https://images.unsplash.com/photo-1597484661973-ee6cd0b6482c?w=400&h=400&fit=crop",
        category: "Écologie",
        example: {
          name: "Claire Martin",
          company: "GreenLife Association",
          message: "Zéro déchet, maximum impact",
        },
        fields: [
          { key: "name", label: "Votre nom", placeholder: "Claire Martin", required: false },
          { key: "company", label: "Organisation", placeholder: "GreenLife Association", required: false },
          { key: "message", label: "Message écologique", placeholder: "Zéro déchet, maximum impact", required: true },
        ],
        layout: {
          position: "center",
          style: "minimal",
          primaryColor: "#15803d",
          secondaryColor: "#bbf7d0",
        },
      },
      {
        id: "sac-boutique-1",
        name: "Boutique & Marque",
        description: "Sac personnalisé pour votre commerce",
        preview: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop",
        category: "Commerce",
        example: {
          name: "",
          company: "La Petite Épicerie",
          message: "Produits locaux depuis 1985",
        },
        fields: [
          { key: "company", label: "Nom de la boutique", placeholder: "La Petite Épicerie", required: true },
          { key: "message", label: "Slogan", placeholder: "Produits locaux depuis 1985", required: false },
        ],
        layout: {
          position: "center",
          style: "elegant",
          primaryColor: "#78350f",
          secondaryColor: "#fef3c7",
        },
      },
      {
        id: "sac-citation-1",
        name: "Citation Personnelle",
        description: "Votre citation préférée sur un sac",
        preview: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400&h=400&fit=crop",
        category: "Personnel",
        example: {
          name: "Emma",
          company: "",
          message: "La vie est trop courte pour porter des sacs moches",
        },
        fields: [
          { key: "name", label: "Signé par", placeholder: "Emma", required: false },
          { key: "message", label: "Votre citation", placeholder: "La vie est trop courte pour porter des sacs moches", required: true },
        ],
        layout: {
          position: "center",
          style: "playful",
          primaryColor: "#be185d",
          secondaryColor: "#fbcfe8",
        },
      },
    ],
  },
  stylo: {
    id: "stylo",
    name: "Stylo Personnalisé",
    description: "Stylo à bille avec gravure laser",
    image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=400&h=400&fit=crop",
    price: "4,99 €",
    features: ["Encre longue durée", "Gravure laser", "Corps métallique"],
    templates: [
      {
        id: "stylo-corporate-1",
        name: "Business Card Stylo",
        description: "Nom, titre et entreprise gravés",
        preview: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=400&h=400&fit=crop",
        category: "Professionnel",
        example: {
          name: "Dr. Philippe Moreau",
          company: "Cabinet Médical Saint-Louis",
          message: "Directeur",
        },
        fields: [
          { key: "name", label: "Nom complet", placeholder: "Dr. Philippe Moreau", required: true },
          { key: "company", label: "Entreprise / Cabinet", placeholder: "Cabinet Médical Saint-Louis", required: true },
          { key: "message", label: "Titre / Fonction", placeholder: "Directeur", required: false },
        ],
        layout: {
          position: "center",
          style: "corporate",
          primaryColor: "#0f172a",
          secondaryColor: "#64748b",
        },
      },
      {
        id: "stylo-gift-1",
        name: "Cadeau Gravé",
        description: "Message personnel pour un cadeau mémorable",
        preview: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&h=400&fit=crop",
        category: "Cadeau",
        example: {
          name: "Pour Lucas",
          company: "",
          message: "Félicitations pour ta réussite !",
          date: "Juin 2024",
        },
        fields: [
          { key: "name", label: "Destinataire", placeholder: "Pour Lucas", required: true },
          { key: "message", label: "Message", placeholder: "Félicitations pour ta réussite !", required: true },
          { key: "date", label: "Date / Occasion", placeholder: "Juin 2024", required: false },
        ],
        layout: {
          position: "center",
          style: "elegant",
          primaryColor: "#854d0e",
          secondaryColor: "#fef9c3",
        },
      },
    ],
  },
  "porte-cle": {
    id: "porte-cle",
    name: "Porte-clé Métal",
    description: "Porte-clé en métal avec gravure",
    image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=400&h=400&fit=crop",
    price: "7,99 €",
    features: ["Métal brossé", "Gravure précise", "Anneau solide"],
    templates: [
      {
        id: "portecle-initiales-1",
        name: "Monogramme Élégant",
        description: "Vos initiales gravées avec style",
        preview: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&h=400&fit=crop",
        category: "Personnel",
        example: {
          name: "A.B.",
          company: "",
          message: "",
        },
        fields: [
          { key: "name", label: "Initiales (ex: A.B.)", placeholder: "A.B.", required: true },
        ],
        layout: {
          position: "center",
          style: "elegant",
          primaryColor: "#78716c",
          secondaryColor: "#d6d3d1",
        },
      },
      {
        id: "portecle-souvenir-1",
        name: "Souvenir Mémorable",
        description: "Date et lieu d'un moment spécial",
        preview: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
        category: "Souvenir",
        example: {
          name: "Notre Mariage",
          company: "",
          message: "",
          date: "12 Septembre 2024",
          location: "Paris",
        },
        fields: [
          { key: "name", label: "Occasion", placeholder: "Notre Mariage", required: true },
          { key: "date", label: "Date", placeholder: "12 Septembre 2024", required: true },
          { key: "location", label: "Lieu", placeholder: "Paris", required: false },
        ],
        layout: {
          position: "center",
          style: "minimal",
          primaryColor: "#b91c1c",
          secondaryColor: "#fecaca",
        },
      },
      {
        id: "portecle-voiture-1",
        name: "Fan Auto/Moto",
        description: "Pour les passionnés de véhicules",
        preview: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=400&fit=crop",
        category: "Passion",
        example: {
          name: "BMW M3 E46",
          company: "",
          message: "Ma première voiture",
          date: "2024",
        },
        fields: [
          { key: "name", label: "Modèle du véhicule", placeholder: "BMW M3 E46", required: true },
          { key: "message", label: "Note personnelle", placeholder: "Ma première voiture", required: false },
          { key: "date", label: "Année", placeholder: "2024", required: false },
        ],
        layout: {
          position: "center",
          style: "bold",
          primaryColor: "#1e40af",
          secondaryColor: "#93c5fd",
        },
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
