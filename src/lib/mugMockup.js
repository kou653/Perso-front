/** Configuration du mockup mug — zone d'impression calibrée sur l'image */
export const MUG_MOCKUP = {
  image:
    "https://images.unsplash.com/photo-1585238342024-78d3877894ea?w=800&h=800&fit=crop&q=80",
  printArea: {
    top: "22%",
    left: "19%",
    width: "46%",
    height: "52%",
  },
  perspective: "500px",
  rotateY: "-16deg",
};

/** Construit l'objet values à partir des champs et d'une source (example ou saisie utilisateur) */
export function resolveFieldValues(fields, source = {}) {
  return Object.fromEntries(
    fields.map((field) => [field.key, source[field.key] ?? field.defaultValue ?? ""])
  );
}
