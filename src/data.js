import { products as productsMap } from './lib/products';

export const products = [
  {
    id: 'mug',
    name: 'Mug Céramique Personnalisé',
    description: 'Mug personnalisable pour photo, texte ou prénom.',
    category: 'mug',
    price: 14.99,
  },
];

export const templates = productsMap.mug.templates.map((t) => ({
  id: t.id,
  productId: 'mug',
  name: t.name,
  category: t.category,
  imageUrl: t.imageUrl,
  description: t.description,
  fields: t.fields,
  example: t.example,
  aiAnalysis: t.aiAnalysis,
}));

export const getProductById = (id) => products.find((product) => product.id === id) || products[0];
export const getTemplateById = (id) => templates.find((template) => template.id === id) || templates[0];
export const getProductByTemplateId = (templateId) => {
  const template = getTemplateById(templateId);
  return template ? getProductById(template.productId) : products[0];
};

