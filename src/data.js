export const products = [
    { id: 'mug', name: 'Mug Premium', description: 'Mug personnalisable pour photo, texte ou logo.', category: 'mug', price: 14.99 },
    { id: 't-shirt', name: 'T-Shirt Street', description: 'T-shirt personnalisable avec visuel et slogan.', category: 't_shirt', price: 24.99 },
    { id: 'sac', name: 'Sac Tote Urban', description: 'Sac personnalisable avec design textile et citation.', category: 'sac', price: 19.99 },
    { id: 'porte-cle', name: 'Porte-Clé Métal', description: 'Porte-clé personnalisé avec nom, date ou symbole.', category: 'porte_cle', price: 9.99 },
    { id: 'stylo', name: 'Stylo Signature', description: 'Stylo personnalisable pour cadeaux et branding.', category: 'stylo', price: 7.99 },
    { id: 'casquette', name: 'Casquette Sport', description: 'Casquette personnalisable avec patch, logo et texte.', category: 'casquette', price: 29.99 },
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
    {
        id: 'tshirt-minimal-logo',
        productId: 't-shirt',
        name: 'T-Shirt Minimal Logo',
        category: 'Commerce',
        imageUrl: 'https://via.placeholder.com/400x300.png/f0f0f0?text=T-Shirt+Logo',
        layout: { primaryColor: 'oklch(0.7 0.15 180 / 0.5)' },
        fields: [
            { key: 'front_logo', type: 'image', label: 'Logo poitrine', defaultValue: null },
            { key: 'back_text', type: 'text', label: 'Texte au dos', defaultValue: 'Create your move' },
        ],
    },
    {
        id: 'sac-citation-chic',
        productId: 'sac',
        name: 'Sac Citation Chic',
        category: 'Écologie',
        imageUrl: 'https://via.placeholder.com/400x300.png/f0f0f0?text=Sac+Citation',
        layout: { primaryColor: 'oklch(0.577 0.245 27.325 / 0.5)' },
        fields: [
            { key: 'quote', type: 'text', label: 'Citation', defaultValue: 'Le style commence ici' },
        ],
    },
    {
        id: 'porte-cle-initiales',
        productId: 'porte-cle',
        name: 'Porte-Clé Initiales',
        category: 'Cadeau',
        imageUrl: 'https://via.placeholder.com/400x300.png/f0f0f0?text=Porte-Clé',
        layout: { primaryColor: 'oklch(0.55 0.2 250 / 0.5)' },
        fields: [
            { key: 'initials', type: 'text', label: 'Initiales', defaultValue: 'AB' },
        ],
    },
    {
        id: 'stylo-corporate',
        productId: 'stylo',
        name: 'Stylo Corporate',
        category: 'Commerce',
        imageUrl: 'https://via.placeholder.com/400x300.png/f0f0f0?text=Stylo+Corp',
        layout: { primaryColor: 'oklch(0.7 0.15 180 / 0.5)' },
        fields: [
            { key: 'brand_name', type: 'text', label: 'Nom de marque', defaultValue: 'Votre Marque' },
        ],
    },
    {
        id: 'casquette-club',
        productId: 'casquette',
        name: 'Casquette Club',
        category: 'Équipe',
        imageUrl: 'https://via.placeholder.com/400x300.png/f0f0f0?text=Casquette+Club',
        layout: { primaryColor: 'oklch(0.577 0.245 27.325 / 0.5)' },
        fields: [
            { key: 'front_patch', type: 'image', label: 'Patch frontal', defaultValue: null },
            { key: 'side_text', type: 'text', label: 'Texte latéral', defaultValue: 'CLUB' },
        ],
    },
];

export const getProductById = (id) => products.find(p => p.id === id);
export const getTemplateById = (id) => templates.find(t => t.id === id);
export const getProductByTemplateId = (templateId) => {
    const template = getTemplateById(templateId);
    return template ? getProductById(template.productId) : null;
};
