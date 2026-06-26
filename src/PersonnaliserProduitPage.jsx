import { useParams } from 'react-router-dom';

export function PersonnaliserProduitPage() {
  const { productId, templateId } = useParams();
  return (
    <div>
      <h1>Personnalisation Directe</h1>
      <p>Produit: {productId}, Modèle: {templateId}</p>
    </div>
  );
}