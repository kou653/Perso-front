import { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from './data';

// Étape 1: Choisir un produit
function Step1SelectProduct({ onSelect }) {
  return (
    <div className="wizard-step">
      <h2>Étape 1: Choisir un produit</h2>
      <p>Sélectionnez le produit que vous souhaitez personnaliser.</p>
      
      <div className="product-selector-grid">
        {products.map(product => (
          <button
            key={product.id}
            className="product-selector-card"
            onClick={() => onSelect(product)}
          >
            <div className="product-selector-image">
              <span className="placeholder-text">📦</span>
            </div>
            <h3>{product.name}</h3>
            <p className="price">{product.price.toFixed(2)} €</p>
            <p className="description">{product.description}</p>
            <span className="cta">Choisir →</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// Étape 2: Décrire le design
function Step2DescribeDesign({ product, onSubmit, onBack }) {
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!description.trim()) {
      setError('Veuillez décrire le design que vous souhaitez.');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/templates/generate-ai', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: parseInt(product.id),
          description: description.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erreur ${response.status}`);
      }

      const result = await response.json();
      onSubmit(result.data); // Passe le template généré à l'étape 3
    } catch (err) {
      console.error('API Error:', err);
      setError(err.message || 'Erreur lors de la génération du design.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="wizard-step">
      <h2>Étape 2: Décrire votre design</h2>
      <p>Décrivez le design que l'IA doit créer pour votre {product.name.toLowerCase()}.</p>

      {error && (
        <div className="alert alert-error" role="alert">
          <strong>Erreur :</strong> {error}
          <button onClick={() => setError(null)} className="close-btn">×</button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="design-description-form">
        <div className="form-group">
          <label htmlFor="description">
            Description du design
            <span className="required">*</span>
          </label>
          <textarea
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder={`Exemple: T-shirt noir avec un logo blanc minimaliste, style moderne et épuré.`}
            rows="6"
            disabled={isLoading}
          />
          <p className="form-help">
            💡 Soyez précis : couleurs, style, ambiance, éléments visuels...
          </p>
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            onClick={onBack}
            className="btn btn-secondary"
            disabled={isLoading}
          >
            ← Retour
          </button>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? '⏳ Génération en cours...' : '🤖 Générer par IA'}
          </button>
        </div>
      </form>
    </div>
  );
}

// Étape 3: Afficher template généré
function Step3ViewTemplate({ product, template, onNext, onBack }) {
  return (
    <div className="wizard-step">
      <h2>Étape 3: Template généré</h2>
      <p>Voici le template créé par l'IA. Vérifiez que les champs correspondent à votre vision.</p>

      <div className="template-preview-card">
        <div className="template-header">
          <h3>{template.name}</h3>
          <p className="template-description">{template.description}</p>
        </div>

        <div className="editable-areas-preview">
          <h4>Champs à personnaliser :</h4>
          <ul>
            {template.editable_areas && template.editable_areas.map(area => {
              const defaultVal = template.default_values?.[area.key] ?? area.default_value;
              return (
                <li key={area.key}>
                  <strong>{area.label}</strong> <em>({area.type})</em>
                  {defaultVal && (
                    <p className="default-value">
                      Défaut: {String(defaultVal).substring(0, 50)}
                      {String(defaultVal).length > 50 ? '...' : ''}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="form-actions">
        <button 
          type="button" 
          onClick={onBack}
          className="btn btn-secondary"
        >
          ← Retour
        </button>
        <button 
          type="button" 
          onClick={onNext}
          className="btn btn-primary"
        >
          Continuer →
        </button>
      </div>
    </div>
  );
}

// Étape 4: Remplir les champs
function Step4FillFields({ product, template, onSubmit, onBack }) {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [values, setValues] = useState(() => {
    const initial = {};
    if (template.editable_areas) {
      template.editable_areas.forEach(area => {
        // Chercher dans default_values du template
        const defaultVal = template.default_values?.[area.key];
        initial[area.key] = defaultVal ?? area.default_value ?? '';
      });
    }
    return initial;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateValue = (fieldKey, newValue) => {
    setValues(prev => ({ ...prev, [fieldKey]: newValue }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const payload = {
        product_id: parseInt(product.id),
        product_template_id: parseInt(template.id),
        customer_name: customerName || null,
        customer_email: customerEmail || null,
        customization_data: values,
      };

      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erreur ${response.status}`);
      }

      const result = await response.json();
      onSubmit(result.data); // Passe le projet créé à l'étape 5
    } catch (err) {
      console.error('API Error:', err);
      setError(err.message || 'Erreur lors de la création du projet.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="wizard-step">
      <h2>Étape 4: Remplir les champs</h2>
      <p>Personnalisez les valeurs pour votre {product.name.toLowerCase()}.</p>

      {error && (
        <div className="alert alert-error" role="alert">
          <strong>Erreur :</strong> {error}
          <button onClick={() => setError(null)} className="close-btn">×</button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="customize-form">
        <fieldset>
          <legend>Informations client</legend>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="customer-name">Nom</label>
              <input
                id="customer-name"
                type="text"
                value={customerName}
                onChange={e => setCustomerName(e.target.value)}
                placeholder="Votre nom"
                disabled={isLoading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="customer-email">Email</label>
              <input
                id="customer-email"
                type="email"
                value={customerEmail}
                onChange={e => setCustomerEmail(e.target.value)}
                placeholder="vous@exemple.com"
                disabled={isLoading}
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Personnalisation du design</legend>
          {template.editable_areas && template.editable_areas.map(area => (
            <div className="form-group" key={area.key}>
              <label htmlFor={area.key}>{area.label}</label>
              {area.type === 'image' ? (
                <input
                  id={area.key}
                  type="url"
                  value={values[area.key] ?? ''}
                  onChange={e => updateValue(area.key, e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  disabled={isLoading}
                />
              ) : area.type === 'color' ? (
                <input
                  id={area.key}
                  type="color"
                  value={values[area.key] ?? '#000000'}
                  onChange={e => updateValue(area.key, e.target.value)}
                  disabled={isLoading}
                />
              ) : (
                <textarea
                  id={area.key}
                  value={values[area.key] ?? ''}
                  onChange={e => updateValue(area.key, e.target.value)}
                  placeholder={area.label}
                  rows="3"
                  disabled={isLoading}
                />
              )}
            </div>
          ))}
        </fieldset>

        <div className="form-actions">
          <button 
            type="button" 
            onClick={onBack}
            className="btn btn-secondary"
            disabled={isLoading}
          >
            ← Retour
          </button>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? '⏳ Création en cours...' : '✓ Créer le projet'}
          </button>
        </div>
      </form>
    </div>
  );
}

// Étape 5: Succès
function Step5Success({ project }) {
  return (
    <div className="wizard-step">
      <div className="success-container">
        <div className="success-icon">✓</div>
        <h2>Projet créé avec succès !</h2>
        <p>Votre design personnalisé a été créé.</p>

        <div className="project-summary">
          <h3>{project.product?.name}</h3>
          <p>ID du projet: <code>{project.id}</code></p>
          <p>Client: <strong>{project.customer_name || 'Anonyme'}</strong></p>
          <p>Statut: <span className="status-badge">{project.status}</span></p>
        </div>

        <div className="form-actions">
          <Link to="/commande" className="btn btn-primary">
            Aller à la commande →
          </Link>
          <Link to="/produits" className="btn btn-secondary">
            Voir d'autres designs
          </Link>
        </div>
      </div>
    </div>
  );
}

// Composant Principal: Wizard
export function PersonnaliserPage() {
  const [step, setStep] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [generatedTemplate, setGeneratedTemplate] = useState(null);
  const [createdProject, setCreatedProject] = useState(null);

  const handleProductSelect = product => {
    setSelectedProduct(product);
    setStep(2);
  };

  const handleDescribeDesign = template => {
    setGeneratedTemplate(template);
    setStep(3);
  };

  const handleFillFields = project => {
    setCreatedProject(project);
    setStep(5);
  };

  return (
    <section className="personaliser-page">
      <div className="wizard-header">
        <h1>Créer votre design avec l'IA</h1>
        <div className="wizard-progress">
          <span className={`step ${step >= 1 ? 'active' : ''}`}>1</span>
          <span className={`step ${step >= 2 ? 'active' : ''}`}>2</span>
          <span className={`step ${step >= 3 ? 'active' : ''}`}>3</span>
          <span className={`step ${step >= 4 ? 'active' : ''}`}>4</span>
          <span className={`step ${step >= 5 ? 'active' : ''}`}>5</span>
        </div>
      </div>

      <div className="wizard-container">
        {step === 1 && (
          <Step1SelectProduct onSelect={handleProductSelect} />
        )}

        {step === 2 && selectedProduct && (
          <Step2DescribeDesign
            product={selectedProduct}
            onSubmit={handleDescribeDesign}
            onBack={() => setStep(1)}
          />
        )}

        {step === 3 && generatedTemplate && selectedProduct && (
          <Step3ViewTemplate
            product={selectedProduct}
            template={generatedTemplate}
            onNext={() => setStep(4)}
            onBack={() => setStep(2)}
          />
        )}

        {step === 4 && generatedTemplate && selectedProduct && (
          <Step4FillFields
            product={selectedProduct}
            template={generatedTemplate}
            onSubmit={handleFillFields}
            onBack={() => setStep(3)}
          />
        )}

        {step === 5 && createdProject && (
          <Step5Success project={createdProject} />
        )}
      </div>
    </section>
  );
}