import { useEffect } from 'react';
import { Link } from 'react-router-dom';

// Données simplifiées pour la page d'accueil
const products = [
  { id: 'mug', name: 'Mug', imageUrl: 'https://via.placeholder.com/300x300.png/f0f0f0?text=Mug' },
  { id: 't-shirt', name: 'T-Shirt', imageUrl: 'https://via.placeholder.com/300x300.png/f0f0f0?text=T-Shirt' },
  { id: 'sac', name: 'Sac', imageUrl: 'https://via.placeholder.com/300x300.png/f0f0f0?text=Sac' },
  { id: 'stylo', name: 'Stylo', imageUrl: 'https://via.placeholder.com/300x300.png/f0f0f0?text=Stylo' },
  { id: 'porte-cle', name: 'Porte-clé', imageUrl: 'https://via.placeholder.com/300x300.png/f0f0f0?text=Porte-Clé' },
];

const features = [
    { icon: 'sparkles', title: 'IA Créative', description: 'Générez des designs uniques en quelques secondes.' },
    { icon: 'palette', title: '100% Personnalisable', description: 'Ajustez chaque détail à votre goût.' },
    { icon: 'truck', title: 'Livraison Rapide', description: 'Recevez votre commande en 3-5 jours ouvrés.' },
    { icon: 'message-circle', title: 'Support Dédié', description: 'Notre équipe est là pour vous aider.' },
];

// Icônes SVG pour simuler les icônes Lucide
const icons = {
    sparkles: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.9 4.8-4.8 1.9 4.8 1.9L12 21l1.9-4.8 4.8-1.9-4.8-1.9L12 3zM21 12l-1.9 4.8-4.8 1.9 4.8 1.9L21 24l1.9-4.8 4.8-1.9-4.8-1.9L21 12zM3 12l-1.9 4.8-4.8 1.9 4.8 1.9L3 24l1.9-4.8 4.8-1.9-4.8-1.9L3 12z"/></svg>,
    palette: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.667 0-.424-.108-.83-.31-1.188-.24-.43-.586-.84-.99-1.212-.41-.38-.91-.7-1.43-1.01A9 9 0 0 1 12 2z"/></svg>,
    truck: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11"/><path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2"/><circle cx="7" cy="18" r="2"/><path d="M9 18h6"/><circle cx="18" cy="18" r="2"/></svg>,
    'message-circle': <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>,
};

function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Donnez vie à vos idées avec CustomPrint</h1>
        <p className="subtitle">Personnalisez des produits uniques grâce à la puissance de l'intelligence artificielle.</p>
        <div className="cta-buttons">
          <Link to="/personnaliser" className="btn btn-primary">Commencer à créer</Link>
          <Link to="/produits" className="btn btn-secondary">Voir les produits</Link>
        </div>
      </div>
      <div className="hero-image-container">
        <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999" alt="Produits personnalisables" className="hero-image" />
        <div className="hero-glow"></div>
      </div>
    </section>
  );
}

function FeaturesSection() {
    return (
        <section className="features-section">
            <div className="feature-grid">
                {features.map(feature => (
                    <div key={feature.title} className="feature-card">
                        <div className="feature-icon">{icons[feature.icon]}</div>
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

function ProductsSection() {
  return (
    <section className="products-section">
      <h2>Nos Produits Populaires</h2>
      <p>Une sélection de nos meilleurs articles prêts à être personnalisés.</p>
      <div className="product-grid">
        {products.map((product) => (
          <Link key={product.id} to={`/personnaliser?produit=${product.id}`} className="product-card-link">
            <div className="product-card">
              <img src={product.imageUrl} alt={`Image de ${product.name}`} />
              <h3>{product.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function CallToActionSection() {
  return (
    <section className="cta-section">
      <h2>Prêt à créer quelque chose d'unique ?</h2>
      <p>Lancez-vous dans l'aventure de la personnalisation et créez un objet qui vous ressemble.</p>
      <Link to="/personnaliser" className="btn btn-light">Créer mon design maintenant</Link>
    </section>
  );
}

export function HomePage() {
  useEffect(() => {
    document.title = "CustomPrint - Personnalisez vos produits avec l'IA";
  }, []);

  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <ProductsSection />
      <CallToActionSection />
    </>
  )
}