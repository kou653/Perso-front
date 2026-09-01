export const products = [
    { id: 'mug', name: 'Mug Premium', description: 'Mug personnalisable pour photo, texte ou logo.', category: 'mug', price: 14.99 },
    // Autres produits — désactivés pour le lancement mugs uniquement
    // { id: 't-shirt', name: 'T-Shirt Street', description: 'T-shirt personnalisable avec visuel et slogan.', category: 't_shirt', price: 24.99 },
    // { id: 'sac', name: 'Sac Tote Urban', description: 'Sac personnalisable avec design textile et citation.', category: 'sac', price: 19.99 },
    // { id: 'porte-cle', name: 'Porte-Clé Métal', description: 'Porte-clé personnalisé avec nom, date ou symbole.', category: 'porte_cle', price: 9.99 },
    // { id: 'stylo', name: 'Stylo Signature', description: 'Stylo personnalisable pour cadeaux et branding.', category: 'stylo', price: 7.99 },
    // { id: 'casquette', name: 'Casquette Sport', description: 'Casquette personnalisable avec patch, logo et texte.', category: 'casquette', price: 29.99 },
];

export const templates = [
    {
        id: 'mug-photo-classique',
        productId: 'mug',
        name: 'Mug Photo Classique',
        category: 'Cadeau',
        imageUrl: 'https://via.placeholder.com/400x300.png/f0f0f0?text=Mug+Classique',
        layout: { primaryColor: 'oklch(0.55 0.2 250 / 0.5)' },
        fields: [
            { key: 'title', type: 'text', label: 'Texte principal', defaultValue: 'Votre message ici' },
            { key: 'image', type: 'image', label: 'Photo', defaultValue: null },
        ],
    },
    // Autres modèles — désactivés pour le lancement mugs uniquement
    // {
    //     id: 'tshirt-minimal-logo',
    //     productId: 't-shirt',
    //     name: 'T-Shirt Minimal Logo',
    //     ...
    // },
];

export const getProductById = (id) => products.find(product => product.id === id);
export const getTemplateById = (id) => templates.find(template => template.id === id);
export const getProductByTemplateId = (templateId) => {
    const template = getTemplateById(templateId);
    return template ? getProductById(template.productId) : null;
};
