import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProductById, getTemplateById } from './data';

function buildInitialValues(template) {
  return Object.fromEntries(
    template.fields.map(field => [field.key, field.defaultValue ?? '']),
  );
}

function FieldInput({ field, value, onChange }) {
  const commonProps = {
    id: field.key,
    name: field.key,
    value,
    onChange: event => onChange(field.key, event.target.value),
  };

  if (field.type === 'image') {
    return (
      <input
        {...commonProps}
        type="url"
        placeholder="https://exemple.com/image.png"
      />
    );
  }

  if (field.type === 'color') {
    return <input {...commonProps} type="color" />;
  }

  return (
    <input
      {...commonProps}
      type="text"
      placeholder={field.defaultValue || field.label}
    />
  );
}

function TemplatePreview({ product, template, values }) {
  return (
    <aside className="customizer-preview">
      <div className="preview-visual">
        <img src={template.imageUrl} alt={`Aperçu ${template.name}`} />
        <div className="preview-overlay" style={{ '--overlay-color': template.layout.primaryColor }}>
          {template.fields.map(field => (
            <p key={field.key}>
              <strong>{field.label}</strong>
              <span>{values[field.key] || '...'}</span>
            </p>
          ))}
        </div>
      </div>

      <div className="preview-summary">
        <span className="badge-inline">{template.category}</span>
        <h2>{template.name}</h2>
        <p>{product.description}</p>
        <strong>{product.price.toFixed(2)} €</strong>
      </div>
    </aside>
  );
}

export function PersonnaliserProduitPage() {
  const { productId, templateId } = useParams();
  const product = getProductById(productId);
  const template = getTemplateById(templateId);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [values, setValues] = useState(() => template ? buildInitialValues(template) : {});
  
  // API States
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [aiSuggestions, setAiSuggestions] = useState(null);
  const [createdProject, setCreatedProject] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  if (!product || !template || template.productId !== productId) {
    return (
      <section className="customizer-page">
        <h1>Modèle introuvable</h1>
        <p>Le produit ou le modèle demandé n'existe pas dans le catalogue actuel.</p>
        <Link to="/produits" className="btn btn-primary">Retour aux modèles</Link>
      </section>
    );
  }

  const updateValue = (fieldKey, nextValue) => {
    setValues(currentValues => ({
      ...currentValues,
      [fieldKey]: nextValue,
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);
    setAiSuggestions(null);

    try {
      const payload = {
        product_id: parseInt(product.id),
        product_template_id: parseInt(template.id),
        customer_name: customerName || null,
        customer_email: customerEmail || null,
        customization_data: values,
      };

      // Add AI refinement prompt if provided
      if (aiPrompt.trim()) {
        payload.ai_refinement_prompt = aiPrompt;
      }

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
        throw new Error(errorData.message || `Erreur ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      
      // If AI suggestions were made, show them
      if (result.ai_suggestions && Object.keys(result.ai_suggestions).length > 0) {
        setAiSuggestions(result.ai_suggestions);
        setShowSuggestions(true);
      }

      // Save created project
      setCreatedProject(result.data);
      
      // If no AI or user wants to proceed
      if (!result.ai_suggestions || Object.keys(result.ai_suggestions).length === 0) {
        // Redirect to order or success page after 1.5s
        setTimeout(() => {
          window.location.href = `/commande?projectId=${result.data.id}`;
        }, 1500);
      }
    } catch (err) {
      console.error('API Error:', err);
      setError(err.message || 'Une erreur est survenue lors de la création du projet.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptSuggestions = () => {
    // Suggestions already merged on backend, just proceed
    if (createdProject) {
      window.location.href = `/commande?projectId=${createdProject.id}`;
    }
  };

  const handleRejectSuggestions = () => {
    setShowSuggestions(false);
    setAiSuggestions(null);
    // User can go back and modify manually
  };

  return (
    <section className="customizer-page">
      <div className="customizer-header">
        <Link to="/produits" className="back-link">← Retour aux modèles</Link>
        <h1>Personnaliser {product.name}</h1>
        <p>Remplacez les valeurs du modèle, vérifiez l'aperçu, puis créez votre projet.</p>
      </div>

      {error && (
        <div className="alert alert-error" role="alert">
          <strong>Erreur :</strong> {error}
          <button onClick={() => setError(null)} className="close-btn">×</button>
        </div>
      )}

      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner">
            <div className="spinner-circle"></div>
            <p>Création de votre projet en cours...</p>
            {aiPrompt && <p className="text-sm">L'IA affine votre design...</p>}
          </div>
        </div>
      )}

      <div className="customizer-layout">
        <form className="customizer-form" onSubmit={handleSubmit} disabled={isLoading}>
          <fieldset>
            <legend>Informations client</legend>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="customer-name">Nom</label>
                <input
                  id="customer-name"
                  type="text"
                  value={customerName}
                  onChange={event => setCustomerName(event.target.value)}
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
                  onChange={event => setCustomerEmail(event.target.value)}
                  placeholder="vous@exemple.com"
                  disabled={isLoading}
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Champs du modèle</legend>
            {template.fields.map(field => (
              <div className="form-group" key={field.key}>
                <label htmlFor={field.key}>{field.label}</label>
                <FieldInput 
                  field={field} 
                  value={values[field.key] ?? ''} 
                  onChange={updateValue}
                />
              </div>
            ))}
          </fieldset>

          <fieldset>
            <legend>Assistance IA</legend>
            <div className="form-group">
              <label htmlFor="ai-prompt">
                Prompt IA optionnel
                {aiPrompt && <span className="badge-inline">Actif</span>}
              </label>
              <textarea
                id="ai-prompt"
                value={aiPrompt}
                onChange={event => setAiPrompt(event.target.value)}
                rows="5"
                placeholder={`Exemple : crée un style moderne pour ${product.name}, avec une ambiance premium.`}
                disabled={isLoading}
              />
              <p className="form-help">
                💡 Laissez vide pour garder vos valeurs, ou décrivez comment vous voulez que l'IA affine votre design.
              </p>
            </div>
          </fieldset>

          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={isLoading}
          >
            {isLoading ? 'Création en cours...' : 'Créer le projet'}
          </button>
        </form>

        <TemplatePreview product={product} template={template} values={values} />
      </div>

      {showSuggestions && aiSuggestions && (
        <div className="suggestions-panel">
          <h2>Suggestions IA appliquées</h2>
          <p>L'IA a affiné votre design avec les modifications suivantes :</p>
          
          <div className="suggestions-list">
            {Object.entries(aiSuggestions).map(([key, value]) => (
              <div key={key} className="suggestion-item">
                <strong>{key}:</strong>
                <p className="suggestion-value">
                  {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                </p>
              </div>
            ))}
          </div>

          <div className="suggestions-actions">
            <button 
              onClick={handleAcceptSuggestions} 
              className="btn btn-primary"
            >
              ✓ Accepter et commander
            </button>
            <button 
              onClick={handleRejectSuggestions} 
              className="btn btn-secondary"
            >
              ✗ Rejeter et modifier
            </button>
          </div>
        </div>
      )}

      {createdProject && !showSuggestions && (
        <div className="success-message">
          <h2>✓ Projet créé avec succès !</h2>
          <p>Redirection vers la commande...</p>
        </div>
      )}
    </section>
  );
}
