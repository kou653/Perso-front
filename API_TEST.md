# 🧪 Test Flux IA Complet - CustomPrint

## Flux de Test : Affiner design par prompt IA

### **1️⃣ Prérequis**
- ✅ Backend Laravel démarré : `php artisan serve`
- ✅ Frontend React démarré : `npm run dev`
- ✅ CORS configuré dans Laravel (vérifier `config/cors.php`)
- ✅ API Gemini configurée dans `.env` (API_KEY + MODEL)
- ✅ User authentifié (token Sanctum valide)

---

## **2️⃣ Scénario Test : Créer customization AVEC prompt IA**

### **Étape 1 : Naviguer vers customizer**
```
URL: http://localhost:5173/personnaliser/mug/mug-photo-classique
```

### **Étape 2 : Remplir le formulaire**

**Données entrées** :
- **Nom** : "Jean Dupont"
- **Email** : "jean@example.com"
- **Champs du modèle** :
  - `title` : "Happy Birthday"
  - `image` : "https://via.placeholder.com/300x300?text=Birthday"

**Prompt IA** (optionnel mais pour ce test) :
```
Rends le texte plus moderne avec des émojis, ajoute une ambiance festive,
et propose une police élégante pour "Happy Birthday"
```

### **Étape 3 : Cliquer "Créer le projet"**

---

## **3️⃣ Requête API Générée (Backend)**

### **POST `/api/projects`**
```json
{
  "product_id": 1,
  "product_template_id": 1,
  "customer_name": "Jean Dupont",
  "customer_email": "jean@example.com",
  "customization_data": {
    "title": "Happy Birthday",
    "image": "https://via.placeholder.com/300x300?text=Birthday"
  },
  "ai_refinement_prompt": "Rends le texte plus moderne avec des émojis, ajoute une ambiance festive, et propose une police élégante pour 'Happy Birthday'"
}
```

### **Réponse Attendue (201 Created)**
```json
{
  "data": {
    "id": 42,
    "user_id": 1,
    "product_id": 1,
    "product_template_id": 1,
    "customer_name": "Jean Dupont",
    "customer_email": "jean@example.com",
    "status": "ai_refined",  // ← Status changé car IA appliquée
    "prompt": "Rends le texte...",
    "customization_data": {
      "title": "🎉 Happy Birthday 🎉",  // ← Modifié par IA
      "image": "https://via.placeholder.com/300x300?text=Birthday"
    },
    "latest_render": {
      "html": "<div>...</div>"  // ← Rendu mis à jour
    },
    "created_at": "2026-06-26T10:30:00",
    "updated_at": "2026-06-26T10:30:00"
  },
  "ai_suggestions": {
    "title": "🎉 Happy Birthday 🎉"  // ← Suggestions affichées au user
  }
}
```

---

## **4️⃣ Comportement Frontend Attendu**

### **Phase 1 : Soumission**
1. User clique "Créer le projet"
2. Overlay loading apparaît : "Création de votre projet en cours..."
3. Message supplémentaire : "L'IA affine votre design..."
4. Bouton désactivé, inputs grisés

### **Phase 2 : Réponse IA**
5. Overlay loading disparaît (~2-5 secondes)
6. Panel "Suggestions IA appliquées" s'affiche avec les modifications

### **Phase 3 : Décision User**
7. User voit 2 boutons :
   - ✓ **Accepter et commander** → Redirige vers `/commande?projectId=42`
   - ✗ **Rejeter et modifier** → Réinitialise et permet re-customization

---

## **5️⃣ Cas d'Erreur à Tester**

### **Erreur API Gemini (API down ou rate-limited)**
```
Response: 500 Server Error
Message: "AI Refinement Error: Gemini API Error"
```
**Comportement Frontend** :
- Loading disparaît
- Alert rouge affichée : "Erreur : Une erreur est survenue..."
- User peut retry ou continuer sans IA

### **Validation échouée**
```
Même données + prompt IA essaie de remplir un champ avec donnée invalide
```
**Comportement** :
- Backend refuse les données
- Frontend affiche erreur de validation

---

## **6️⃣ Vérifications à Faire**

✅ **Backend**
- [ ] `ProjectController::store()` accepte `ai_refinement_prompt`
- [ ] GeminiCustomizer est appelé si prompt fourni
- [ ] Données IA sont mergées avec données user
- [ ] Status devient `ai_refined` si IA appliquée
- [ ] `ai_suggestions` retourné en réponse
- [ ] Erreurs Gemini loggées et catchées

✅ **Frontend**
- [ ] Form soumission envoyé réelle (pas juste affichage du payload)
- [ ] Loading overlay pendant API call
- [ ] Erreurs affichées en alerte
- [ ] Suggestions IA affichées avec boutons
- [ ] Redirection vers commande après acceptation

✅ **Network**
- [ ] CORS OK (check browser console)
- [ ] Request headers include auth token
- [ ] Response status 201 (not 200)
- [ ] Payload JSON valid

---

## **7️⃣ Debugging Tips**

### **Vérifier appel API**
```javascript
// Dans DevTools Console
fetch('/api/projects', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    product_id: 1,
    product_template_id: 1,
    customization_data: { title: 'Test' },
    ai_refinement_prompt: 'Make it modern'
  })
})
.then(r => r.json())
.then(d => console.log(d))
```

### **Vérifier réponse serveur**
```bash
# Terminal
tail -f storage/logs/laravel.log | grep "AI Refinement"
```

### **Vérifier Gemini API**
```php
// Dans tinker
>>> $gemini = app(\App\Services\Ai\GeminiCustomizer::class)
>>> $result = $gemini->customize($template, "test prompt", [])
>>> dd($result)
```

---

## **8️⃣ Prochaines Étapes**

1. ✅ IA affine sur creation (`POST /api/projects` avec prompt)
2. ✅ IA affine sur update (`PUT /api/projects/{id}` avec prompt)
3. ⏳ Créer page commande (`/commande?projectId=X`)
4. ⏳ Intégrer Stripe payment
5. ⏳ Webhook Stripe confirmation
6. ⏳ Tests unitaires du flux IA

