import { MUG_MOCKUP } from "./mugMockup";

export const products = {
  mug: {
    id: "mug",
    name: "Mug Céramique Personnalisé",
    description: "Mug en céramique de haute qualité (330ml), résistant au micro-ondes et lave-vaisselle.",
    image: "/model/mug-maman-damour.jpg",
    price: "14,99 €",
    priceValue: 14.99,
    features: ["Capacité 330ml", "Céramique premium brillante", "Impression HD haute fidélité", "Compatible lave-vaisselle"],
    mockup: MUG_MOCKUP,
    templates: [

      // ─────────────────────────────────────────────────────────────────────
      // 1. mug-belle-mere
      // ─────────────────────────────────────────────────────────────────────
      {
        id: "mug-belle-mere",
        name: "Belle-Mère & Famille",
        description: "Tasse avec poignée en cœur, collage de 2 photos polaroid et message d'affection.",
        category: "Cadeau & Famille",
        imageUrl: "/model/mug-belle-mere.jpg",
        aiAnalysis: {
          summary: "Modèle composé d'un en-tête affectueux, de deux photos polaroid vintage et d'un texte de remerciement au bas.",
          detectedTypes: ["Texte d'en-tête", "2 Photos polaroid", "Message de remerciement"],
          elementsCount: 4,
        },
        dominantColors: ["#f9e8e0", "#ffffff", "#8B4513"],
        mugBase: "white",
        example: {
          header_text: "Dear mother-in-law",
          photo_1: "/model/mug-belle-mere.jpg",
          photo_2: "/model/mug-belle-mere.jpg",
          footer_message: "Thank you my mother-in-law for treating me like a daughter.",
        },
        // ── Config rendu réaliste ──────────────────────────────────────────
        // Vue quasi-frontale → cylinderWarp faible, reflets discrets
        renderConfig: {
          cylinderWarp: 2,
          overlayIntensity: 0.35,
          overlayThreshold: 215,
          printZone: { top: "18%", left: "4%", width: "78%", height: "74%" },
        },
        fields: [
          {
            key: "header_text",
            type: "text",
            label: "Titre d'en-tête",
            originalValue: "Dear mother-in-law",
            placeholder: "Ex: Chère belle-maman / Dear mother-in-law",
            description: "Texte manuscrit en haut du mug",
            required: false,
            zone: { top: "20%", left: "6%", width: "70%", height: "9%" },
            style: {
              fontFamily: "'Caveat', cursive",
              fontSize: "clamp(0.8rem, 2.2vw, 1.3rem)",
              fontWeight: "700",
              color: "#c0605a",
              textAlign: "center",
              lineHeight: 1.2,
            },
          },
          {
            key: "photo_1",
            type: "image",
            label: "Photo Polaroid 1 (gauche)",
            originalValue: "/model/mug-belle-mere.jpg",
            placeholder: "Téléchargez votre première photo",
            description: "Photo souvenir polaroid à gauche",
            required: false,
            zone: { top: "30%", left: "5%", width: "34%", height: "38%" },
            style: { objectFit: "cover" },
            polaroid: true,
            rotation: -4,
          },
          {
            key: "photo_2",
            type: "image",
            label: "Photo Polaroid 2 (droite)",
            originalValue: "/model/mug-belle-mere.jpg",
            placeholder: "Téléchargez votre deuxième photo",
            description: "Photo souvenir polaroid à droite",
            required: false,
            zone: { top: "27%", left: "41%", width: "34%", height: "38%" },
            style: { objectFit: "cover" },
            polaroid: true,
            rotation: 4,
          },
          {
            key: "footer_message",
            type: "text",
            label: "Message de remerciement",
            originalValue: "Thank you my mother-in-law for treating me like a daughter.",
            placeholder: "Ex: Merci pour tout ton amour et ta gentillesse...",
            description: "Message d'affection imprimé au bas du mug",
            required: false,
            zone: { top: "70%", left: "4%", width: "74%", height: "20%" },
            style: {
              fontFamily: "'Caveat', cursive",
              fontSize: "clamp(0.55rem, 1.5vw, 0.88rem)",
              fontWeight: "400",
              color: "#5c3d2e",
              textAlign: "center",
              lineHeight: 1.3,
            },
          },
        ],
      },

      // ─────────────────────────────────────────────────────────────────────
      // 2. mug-calendrier-couple
      // ─────────────────────────────────────────────────────────────────────
      {
        id: "mug-calendrier-couple",
        name: "Calendrier & Photo Couple",
        description: "Double face : calendrier avec cœur sur la date clé et photo de couple avec mot doux.",
        category: "Amour & Couple",
        imageUrl: "/model/mug-calendrier-couple.jpg",
        aiAnalysis: {
          summary: "Modèle duo intégrant un calendrier commémoratif personnalisé avec un cœur sur le jour précis, ainsi qu'une photo de couple et citation.",
          detectedTypes: ["Date & Mois", "Jour spécial", "Légende date", "Photo de couple", "Message d'amour"],
          elementsCount: 5,
        },
        dominantColors: ["#ffffff", "#e74c3c", "#2c2c2c"],
        mugBase: "white",
        example: {
          date_title: "06 de Agosto de 2022",
          day_number: "6",
          bottom_left_text: "quando tudo começou...",
          photo_couple: "/model/mug-calendrier-couple.jpg",
          couple_message: "Te amo !!",
        },
        // Vue vue de dessus légèrement → quasi-plat, image présentant 2 mugs
        renderConfig: {
          cylinderWarp: 2,
          overlayIntensity: 0.28,
          overlayThreshold: 220,
          printZone: { top: "25%", left: "2%", width: "53%", height: "65%" },
        },
        fields: [
          {
            key: "date_title",
            type: "text",
            label: "Mois et Année du calendrier",
            originalValue: "06 de Agosto de 2022",
            placeholder: "Ex: 06 Août 2022 / 14 Février 2023",
            description: "Date principale inscrite en haut du calendrier",
            required: false,
            zone: { top: "28%", left: "4%", width: "48%", height: "8%" },
            style: {
              fontFamily: "'Caveat', cursive",
              fontSize: "clamp(0.5rem, 1.4vw, 0.85rem)",
              fontWeight: "600",
              color: "#2c2c2c",
              textAlign: "left",
              letterSpacing: "0.01em",
            },
          },
          {
            key: "day_number",
            type: "text",
            label: "Numéro du jour entouré d'un cœur",
            originalValue: "6",
            placeholder: "Ex: 6, 14, 25...",
            description: "Le jour mis en valeur par l'icône cœur rouge",
            required: false,
            zone: { top: "39%", left: "26%", width: "10%", height: "10%" },
            style: {
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(0.55rem, 1.5vw, 0.9rem)",
              fontWeight: "700",
              color: "#ffffff",
              textAlign: "center",
              lineHeight: 1,
            },
          },
          {
            key: "bottom_left_text",
            type: "text",
            label: "Citation sous calendrier",
            originalValue: "quando tudo começou...",
            placeholder: "Ex: Quand tout a commencé... / Le début de notre histoire",
            description: "Phrase manuscrite sous le calendrier",
            required: false,
            zone: { top: "74%", left: "4%", width: "46%", height: "10%" },
            style: {
              fontFamily: "'Caveat', cursive",
              fontSize: "clamp(0.5rem, 1.4vw, 0.85rem)",
              fontWeight: "500",
              color: "#4a4a4a",
              textAlign: "left",
              fontStyle: "italic",
            },
          },
          {
            key: "photo_couple",
            type: "image",
            label: "Photo de couple",
            originalValue: "/model/mug-calendrier-couple.jpg",
            placeholder: "Téléchargez votre photo de couple",
            description: "Photo cadrée au verso du mug",
            required: false,
            zone: { top: "28%", left: "55%", width: "40%", height: "55%" },
            style: { objectFit: "cover", borderRadius: "2px" },
          },
          {
            key: "couple_message",
            type: "text",
            label: "Message d'amour",
            originalValue: "Te amo !!",
            placeholder: "Ex: Je t'aime !! / Pour toujours",
            description: "Texte manuscrit sous la photo",
            required: false,
            zone: { top: "84%", left: "55%", width: "40%", height: "10%" },
            style: {
              fontFamily: "'Dancing Script', cursive",
              fontSize: "clamp(0.5rem, 1.4vw, 0.85rem)",
              fontWeight: "700",
              color: "#e74c3c",
              textAlign: "center",
            },
          },
        ],
      },

      // ─────────────────────────────────────────────────────────────────────
      // 3. mug-magique-maman
      // ─────────────────────────────────────────────────────────────────────
      {
        id: "mug-magique-maman",
        name: "Best Mom & Poème",
        description: "Face avant avec photo et mention 'Best Mom Ever', face arrière avec un poème émouvant.",
        category: "Famille & Maman",
        imageUrl: "/model/mug-magique-maman.png",
        aiAnalysis: {
          summary: "Design bi-face avec titre 'Best Mom Ever', photo de famille centrale et poème de gratitude au dos.",
          detectedTypes: ["Titre face avant", "Photo famille", "Sous-titre", "Poème face arrière"],
          elementsCount: 4,
        },
        dominantColors: ["#1a1a2e", "#e91e63", "#ffffff"],
        mugBase: "colored",
        example: {
          front_title: "Best Mom Ever",
          mom_photo: "/model/mug-magique-maman.png",
          front_subtitle: "WE LOVE YOU SO MUCH",
          back_poem: "Tu es notre repère, notre force et notre plus belle histoire ❤️",
        },
        // Vue légèrement de face, fond sombre → reflets très subtils
        renderConfig: {
          cylinderWarp: 3,
          overlayIntensity: 0.40,
          overlayThreshold: 200,
          printZone: { top: "8%", left: "8%", width: "82%", height: "82%" },
        },
        fields: [
          {
            key: "front_title",
            type: "text",
            label: "Titre face avant",
            originalValue: "Best Mom Ever",
            placeholder: "Ex: Best Mom Ever / Meilleure Maman du Monde",
            description: "Titre principal entouré de petits cœurs",
            required: false,
            zone: { top: "8%", left: "10%", width: "80%", height: "13%" },
            style: {
              fontFamily: "'Great Vibes', cursive",
              fontSize: "clamp(0.85rem, 2.4vw, 1.5rem)",
              fontWeight: "400",
              color: "#ffffff",
              textAlign: "center",
              lineHeight: 1.2,
            },
          },
          {
            key: "mom_photo",
            type: "image",
            label: "Photo maman & enfant(s)",
            originalValue: "/model/mug-magique-maman.png",
            placeholder: "Téléchargez votre photo de famille",
            description: "Photo centrale de la face avant",
            required: false,
            zone: { top: "20%", left: "22%", width: "56%", height: "52%" },
            style: { objectFit: "cover", borderRadius: "50%" },
          },
          {
            key: "front_subtitle",
            type: "text",
            label: "Sous-titre face avant",
            originalValue: "WE LOVE YOU SO MUCH",
            placeholder: "Ex: WE LOVE YOU SO MUCH / On t'aime tellement",
            description: "Ligne de texte sous la photo",
            required: false,
            zone: { top: "75%", left: "8%", width: "84%", height: "10%" },
            style: {
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(0.45rem, 1.2vw, 0.72rem)",
              fontWeight: "700",
              color: "#e91e63",
              textAlign: "center",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
            },
          },
          {
            key: "back_poem",
            type: "text",
            label: "Poème / Message face arrière",
            originalValue: "Tu es notre repère, notre force et notre plus belle histoire ❤️",
            placeholder: "Ex: Tu es notre repère, notre force et notre plus belle histoire ❤️",
            description: "Texte calligraphié au verso du mug",
            required: false,
            zone: { top: "22%", left: "8%", width: "84%", height: "56%" },
            style: {
              fontFamily: "'Caveat', cursive",
              fontSize: "clamp(0.6rem, 1.6vw, 1rem)",
              fontWeight: "500",
              color: "#ffffff",
              textAlign: "center",
              lineHeight: 1.5,
            },
            backFace: true,
          },
        ],
      },

      // ─────────────────────────────────────────────────────────────────────
      // 4. mug-monogramme-or
      // ─────────────────────────────────────────────────────────────────────
      {
        id: "mug-monogramme-or",
        name: "Monogramme Doré",
        description: "Grande initiale dorée majuscule ornée d'un prénom calligraphié en noir.",
        category: "Monogramme & Élégant",
        imageUrl: "/model/mug-monogramme-or.jpg",
        aiAnalysis: {
          summary: "Design raffiné avec une majuscule dorée en arrière-plan et un prénom en écriture manuscrite fluide superposé.",
          detectedTypes: ["Initiale Majuscule", "Prénom Calligraphié"],
          elementsCount: 2,
        },
        dominantColors: ["#ffffff", "#c9a84c", "#1a1a1a"],
        mugBase: "white",
        example: {
          initial: "M",
          name: "Mackenzie",
        },
        // Vue 3/4 légère, mug blanc → reflets visibles sur les côtés
        renderConfig: {
          cylinderWarp: 4,
          overlayIntensity: 0.55,
          overlayThreshold: 205,
          printZone: { top: "15%", left: "22%", width: "60%", height: "68%" },
        },
        fields: [
          {
            key: "initial",
            type: "text",
            label: "Initiale Monogramme (Doré)",
            originalValue: "M",
            placeholder: "Ex: M, A, L, J...",
            description: "Grande lettre majuscule dorée",
            required: false,
            zone: { top: "15%", left: "22%", width: "60%", height: "60%" },
            style: {
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(3rem, 10vw, 6rem)",
              fontWeight: "700",
              color: "#c9a84c",
              textAlign: "center",
              lineHeight: 1,
            },
          },
          {
            key: "name",
            type: "text",
            label: "Prénom calligraphié",
            originalValue: "Mackenzie",
            placeholder: "Ex: Mackenzie, Thomas, Sarah...",
            description: "Prénom en script calligraphié superposé sur l'initiale",
            required: false,
            zone: { top: "56%", left: "18%", width: "68%", height: "20%" },
            style: {
              fontFamily: "'Dancing Script', cursive",
              fontSize: "clamp(0.9rem, 2.5vw, 1.6rem)",
              fontWeight: "700",
              color: "#1a1a1a",
              textAlign: "center",
              lineHeight: 1,
            },
          },
        ],
      },

      // ─────────────────────────────────────────────────────────────────────
      // 5. mug-maman-damour
      // ─────────────────────────────────────────────────────────────────────
      {
        id: "mug-maman-damour",
        name: "Maman d'Amour",
        description: "Mug avec intérieur rouge. Face 1 : 'Maman D'AMOUR', Face 2 : Prénoms des enfants.",
        category: "Famille & Maman",
        imageUrl: "/model/mug-maman-damour.jpg",
        aiAnalysis: {
          summary: "Mug bicolore avec inscription 'Maman D'AMOUR' sur une face et liste des prénoms des enfants sur l'autre face.",
          detectedTypes: ["Titre 'Maman D'AMOUR'", "Liste des prénoms des enfants"],
          elementsCount: 2,
        },
        dominantColors: ["#ffffff", "#c0392b", "#2c2c2c"],
        mugBase: "white",
        example: {
          title: "Maman D'AMOUR",
          children_names: "Alma\nLucie\nNoah",
        },
        // Image montre 2 mugs côte à côte → zone limitée à gauche
        renderConfig: {
          cylinderWarp: 4,
          overlayIntensity: 0.45,
          overlayThreshold: 210,
          printZone: { top: "22%", left: "4%", width: "44%", height: "58%" },
        },
        fields: [
          {
            key: "title",
            type: "text",
            label: "Titre face 1",
            originalValue: "Maman D'AMOUR",
            placeholder: "Ex: Maman D'AMOUR / Papa Poule / Mamie Chérie",
            description: "Titre principal de la première face",
            required: false,
            zone: { top: "28%", left: "5%", width: "42%", height: "40%" },
            style: {
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(0.7rem, 2vw, 1.25rem)",
              fontWeight: "800",
              color: "#c0392b",
              textAlign: "center",
              textTransform: "uppercase",
              letterSpacing: "0.03em",
              lineHeight: 1.35,
            },
          },
          {
            key: "children_names",
            type: "text",
            label: "Prénoms des enfants (face 2)",
            originalValue: "Alma\nLucie\nNoah",
            placeholder: "Ex: Alma, Lucie, Noah",
            description: "Prénoms écrits en rouge sur la deuxième face",
            required: false,
            zone: { top: "26%", left: "51%", width: "42%", height: "52%" },
            style: {
              fontFamily: "'Dancing Script', cursive",
              fontSize: "clamp(0.7rem, 2vw, 1.25rem)",
              fontWeight: "700",
              color: "#c0392b",
              textAlign: "center",
              lineHeight: 1.6,
            },
          },
        ],
      },

      // ─────────────────────────────────────────────────────────────────────
      // 6. mug-ourson-amour
      // ─────────────────────────────────────────────────────────────────────
      {
        id: "mug-ourson-amour",
        name: "Tu es l'amour de ma vie",
        description: "Mug intérieur rouge avec la déclaration d'amour et le prénom personnalisé.",
        category: "Amour & Saint-Valentin",
        imageUrl: "/model/mug-ourson-amour.jpg",
        aiAnalysis: {
          summary: "Déclaration d'amour romantique en typographie moderne et prénom du destinataire.",
          detectedTypes: ["Citation d'amour", "Prénom"],
          elementsCount: 2,
        },
        dominantColors: ["#ffffff", "#c0392b", "#1a1a1a"],
        mugBase: "white",
        example: {
          quote: "Tu es L'AMOUR de ma vie",
          name: "Caroline",
        },
        // Vue 3/4 à ~15°, mug blanc avec reflet gauche marqué
        renderConfig: {
          cylinderWarp: 5,
          overlayIntensity: 0.62,
          overlayThreshold: 205,
          printZone: { top: "15%", left: "10%", width: "68%", height: "74%" },
        },
        fields: [
          {
            key: "quote",
            type: "text",
            label: "Message / Déclaration",
            originalValue: "Tu es L'AMOUR de ma vie",
            placeholder: "Ex: Tu es L'AMOUR de ma vie",
            description: "Citation principale en typographie bicolore",
            required: false,
            zone: { top: "18%", left: "10%", width: "65%", height: "50%" },
            style: {
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(0.65rem, 1.8vw, 1.1rem)",
              fontWeight: "700",
              color: "#1a1a1a",
              textAlign: "center",
              lineHeight: 1.45,
            },
          },
          {
            key: "name",
            type: "text",
            label: "Prénom personnalisé",
            originalValue: "Caroline",
            placeholder: "Ex: Caroline, Alexandre, Chloé...",
            description: "Prénom sous les pointillés",
            required: false,
            zone: { top: "72%", left: "12%", width: "60%", height: "16%" },
            style: {
              fontFamily: "'Dancing Script', cursive",
              fontSize: "clamp(0.85rem, 2.3vw, 1.45rem)",
              fontWeight: "700",
              color: "#c0392b",
              textAlign: "center",
              lineHeight: 1,
            },
          },
        ],
      },

      // ─────────────────────────────────────────────────────────────────────
      // 7. mug-photo-souvenir
      // ─────────────────────────────────────────────────────────────────────
      {
        id: "mug-photo-souvenir",
        name: "Photo Souvenir & Date",
        description: "Photo carrée haute définition, prénoms de couple élégants et date commémorative.",
        category: "Photo & Souvenir",
        imageUrl: "/model/mug-photo-souvenir.jpg",
        aiAnalysis: {
          summary: "Mise en page épurée style tirage photo avec une belle photo carrée, les prénoms du couple et la date souvenir avec un petit cœur central.",
          detectedTypes: ["Photo centrale", "Noms / Prénoms", "Date souvenir"],
          elementsCount: 3,
        },
        dominantColors: ["#ffffff", "#8b6e5a", "#2c2c2c"],
        mugBase: "white",
        example: {
          photo: "/model/mug-photo-souvenir.jpg",
          couple_names: "Lucas & Isabella",
          special_date: "22.06.2024",
        },
        // Vue quasi-frontale, très peu de courbure
        renderConfig: {
          cylinderWarp: 3,
          overlayIntensity: 0.42,
          overlayThreshold: 208,
          printZone: { top: "5%", left: "10%", width: "72%", height: "88%" },
        },
        fields: [
          {
            key: "photo",
            type: "image",
            label: "Photo principale",
            originalValue: "/model/mug-photo-souvenir.jpg",
            placeholder: "Téléchargez votre photo haute résolution",
            description: "Photo cadrée au format portrait / carré",
            required: false,
            zone: { top: "6%", left: "11%", width: "68%", height: "58%" },
            style: { objectFit: "cover", borderRadius: "2px" },
          },
          {
            key: "couple_names",
            type: "text",
            label: "Noms / Prénoms",
            originalValue: "Lucas & Isabella",
            placeholder: "Ex: Lucas & Isabella / Julie & Marc",
            description: "Prénoms en typographie serif élégante",
            required: false,
            zone: { top: "66%", left: "10%", width: "70%", height: "13%" },
            style: {
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(0.7rem, 1.9vw, 1.2rem)",
              fontWeight: "400",
              color: "#1a1a1a",
              textAlign: "center",
              letterSpacing: "0.05em",
              lineHeight: 1,
            },
          },
          {
            key: "special_date",
            type: "text",
            label: "Date mémorable",
            originalValue: "22.06.2024",
            placeholder: "Ex: 22.06.2024 / 15.09.2023",
            description: "Date affichée sous la ligne avec cœur",
            required: false,
            zone: { top: "81%", left: "22%", width: "46%", height: "10%" },
            style: {
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(0.45rem, 1.2vw, 0.72rem)",
              fontWeight: "500",
              color: "#555555",
              textAlign: "center",
              letterSpacing: "0.12em",
            },
          },
        ],
      },

      // ─────────────────────────────────────────────────────────────────────
      // 8. mug-minimaliste-prenom
      // ─────────────────────────────────────────────────────────────────────
      {
        id: "mug-minimaliste-prenom",
        name: "Prénom & Cœur",
        description: "Design épuré et raffiné avec un cœur délicat et votre prénom manuscrit.",
        category: "Minimaliste & Prénom",
        imageUrl: "/model/mug-minimaliste-prenom.jpg",
        aiAnalysis: {
          summary: "Style minimaliste moderne avec un petit cœur tracé à la main et un prénom calligraphié élégant.",
          detectedTypes: ["Prénom calligraphié"],
          elementsCount: 1,
        },
        dominantColors: ["#ffffff", "#f0f0f0", "#111111"],
        mugBase: "white",
        example: {
          name: "Emma",
        },
        // Vue 3/4 légère, blanc éclatant → fort reflet vertical gauche
        renderConfig: {
          cylinderWarp: 6,
          overlayIntensity: 0.72,
          overlayThreshold: 200,
          printZone: { top: "18%", left: "14%", width: "65%", height: "62%" },
        },
        fields: [
          {
            key: "name",
            type: "text",
            label: "Prénom personnalisé",
            originalValue: "Emma",
            placeholder: "Ex: Emma, Léa, Maxime...",
            description: "Prénom en lettrage cursif moderne",
            required: false,
            zone: { top: "38%", left: "14%", width: "62%", height: "28%" },
            style: {
              fontFamily: "'Dancing Script', cursive",
              fontSize: "clamp(1.4rem, 4vw, 2.6rem)",
              fontWeight: "700",
              color: "#111111",
              textAlign: "center",
              lineHeight: 1,
            },
          },
        ],
      },
    ],
  },
};

export function getProductById(id) {
  return products[id] || products.mug;
}

export function getTemplateById(productId, templateId) {
  const product = products[productId] || products.mug;
  return product?.templates.find((t) => t.id === templateId) || product?.templates[0];
}

export function buildInitialValues(template) {
  if (!template) return {};
  return Object.fromEntries(
    template.fields.map((field) => [
      field.key,
      template.example?.[field.key] ?? field.originalValue ?? field.defaultValue ?? "",
    ])
  );
}

export function findTemplateById(templateId) {
  for (const product of Object.values(products)) {
    const template = product.templates.find((t) => t.id === templateId);
    if (template) return { product, template };
  }
  return { product: products.mug, template: products.mug.templates[0] };
}
