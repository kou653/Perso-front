import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { products, templates } from './data';

const productCategories = [
    { id: 'all', name: 'Tous les produits' },
    ...products.map(product => ({ id: product.id, name: product.name })),
];

const templateCategories = ['Tous', ...new Set(templates.map(template => template.category))];

function TemplateCard({ template }) {
    const product = products.find(productItem => productItem.id === template.productId);

    return (
        <div className="template-card">
            <div className="template-image-container">
                <img src={template.imageUrl} alt={`Aperçu de ${template.name}`} />
                <div className="template-overlay" style={{ '--overlay-color': template.layout.primaryColor }}>
                    {template.fields.map(field => (
                        <p key={field.key}><strong>{field.label}:</strong> {field.defaultValue || '...'}</p>
                    ))}
                </div>
            </div>
            <span className="badge badge-category">{template.category}</span>
            <span className="badge badge-product">{product?.name}</span>
            <div className="template-info">
                <h3>{template.name}</h3>
                <p className="price">{product?.price.toFixed(2)} €</p>
                <Link to={`/personnaliser/${template.productId}/${template.id}`} className="btn btn-primary">
                    Personnaliser
                </Link>
            </div>
        </div>
    );
}

export function ProduitsPage() {
    const [productFilter, setProductFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('Tous');

    const filteredTemplates = useMemo(() => {
        return templates.filter(template => {
            const productMatch = productFilter === 'all' || template.productId === productFilter;
            const categoryMatch = categoryFilter === 'Tous' || template.category === categoryFilter;
            return productMatch && categoryMatch;
        });
    }, [productFilter, categoryFilter]);

    const resetFilters = () => {
        setProductFilter('all');
        setCategoryFilter('Tous');
    };

    return (
        <section>
            <h1>Explorez nos modèles</h1>
            <p>Trouvez l'inspiration parmi nos designs ou partez de zéro.</p>

            <div className="filters">
                <div className="filter-group">
                    <label htmlFor="product-filter">Filtrer par produit :</label>
                    <select id="product-filter" value={productFilter} onChange={(event) => setProductFilter(event.target.value)}>
                        {productCategories.map(product => <option key={product.id} value={product.id}>{product.name}</option>)}
                    </select>
                </div>
                <div className="filter-group">
                    <label htmlFor="category-filter">Filtrer par catégorie :</label>
                    <select id="category-filter" value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
                        {templateCategories.map(category => <option key={category} value={category}>{category}</option>)}
                    </select>
                </div>
            </div>

            {filteredTemplates.length > 0 ? (
                <div className="template-grid">
                    {filteredTemplates.map(template => (
                        <TemplateCard key={template.id} template={template} />
                    ))}
                </div>
            ) : (
                <div className="no-results">
                    <p>Aucun modèle ne correspond à votre recherche.</p>
                    <button onClick={resetFilters} className="btn btn-secondary">Réinitialiser les filtres</button>
                </div>
            )}

            <section className="how-it-works">
                <h2>Comment ça marche ?</h2>
                <div className="steps">
                    <div className="step">
                        <span>1</span>
                        <h3>Choisissez</h3>
                        <p>Sélectionnez un modèle qui vous plaît.</p>
                    </div>
                    <div className="step">
                        <span>2</span>
                        <h3>Entrez vos infos</h3>
                        <p>Remplissez les champs pour personnaliser le design.</p>
                    </div>
                    <div className="step">
                        <span>3</span>
                        <h3>L'IA crée</h3>
                        <p>Notre IA génère un visuel unique que vous pouvez affiner.</p>
                    </div>
                </div>
            </section>
        </section>
    );
}
