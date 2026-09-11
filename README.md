# 📝 Todo App - Gestionnaire de Tâches Avancé

Une application de gestion de tâches moderne et complète avec sauvegarde locale, catégories, niveaux de priorité et une interface épurée.

## ✨ Fonctionnalités

### 📋 Gestion des Tâches
- ✅ Ajouter, éditer et supprimer des tâches
- 📌 Marquer les tâches comme complétées
- 🎯 Interface intuitive et réactive
- 💾 Sauvegarde automatique dans le localStorage

### 🏷️ Catégories
- 💼 **Travail** - Tâches professionnelles
- 🏠 **Personnes** - Tâches personnelles
- 🛒 **Courses** - Liste d'courses
- 💪 **Santé** - Activités de santé
- 📋 **Toutes les tâches** - Vue globale

### 🔴 Niveaux de Priorité
- 🟢 **Faible** - Tâches non urgentes
- 🟡 **Moyen** - Tâches importantes
- 🔴 **Élevée** - Tâches prioritaires

### 🔍 Filtrage et Recherche
- Filtrer par statut (Toutes, Complétées, En attente)
- Recherche en temps réel par texte
- Tri personnalisé (Date, Priorité, Nom)

### 📊 Statistiques
- Nombre total de tâches
- Nombre de tâches complétées
- Nombre de tâches en attente
- Nombre de tâches prioritaires

### 🎨 Design
- Interface sombre moderne
- Responsive (desktop, tablette, mobile)
- Animations fluides
- Thème gradient elegant

## 🚀 Démarrage Rapide

1. **Cloner ou télécharger le projet**
```bash
git clone <repo-url>
cd todo-app-localstorage
```

2. **Ouvrir dans un navigateur**
```bash
# Double-cliquez sur index.html
# Ou servez avec un serveur local
python -m http.server 8000
# Puis ouvrez http://localhost:8000
```

## 📁 Structure du Projet

```
todo-app-localstorage/
├── index.html          # Structure HTML
├── styles.css          # Styles CSS (Dark Theme)
├── app.js              # Logique JavaScript
└── README.md           # Documentation
```

## 🛠️ Utilisation

### Ajouter une Tâche
1. Entrez le texte de la tâche
2. Sélectionnez une catégorie
3. Choisissez le niveau de priorité
4. Cliquez sur "Ajouter" (ou appuyez sur Entrée)

### Gérer une Tâche
- **Cocher** : Marquer comme complétée
- **✏️ Éditer** : Modifier la tâche
- **🗑️ Supprimer** : Supprimer la tâche

### Filtrer les Tâches
- Cliquez sur une catégorie dans la barre latérale
- Utilisez les filtres (Toutes, Complétées, En attente)
- Recherchez par texte
- Triez par date, priorité ou nom

### Actions Globales
- **📥 Exporter** : Télécharge vos tâches en JSON
- **🗑️ Effacer tout** : Supprime toutes les tâches

## 💾 Sauvegarde Locale

Les tâches sont automatiquement sauvegardées dans le `localStorage` du navigateur.

**Clé de stockage :** `todoAppData`

```javascript
// Accéder aux données dans la console
localStorage.getItem('todoAppData')
```

## 🎨 Personnalisation

### Modifier les Couleurs
Dans `styles.css`, modifiez les variables CSS :

```css
:root {
    --primary: #6366f1;           /* Couleur primaire */
    --secondary: #ec4899;         /* Couleur secondaire */
    --success: #10b981;           /* Succès */
    --warning: #f59e0b;           /* Avertissement */
    --danger: #ef4444;            /* Danger */
    --dark-bg: #0f172a;           /* Fond sombre */
    --dark-card: #1e293b;         /* Cartes */
    --dark-border: #334155;       /* Bordures */
}
```

### Ajouter de Nouvelles Catégories
Modifiez le tableau `categories` dans `app.js` :

```javascript
this.categories = {
    all: 'Toutes les tâches',
    work: 'Travail',
    personal: 'Personnes',
    shopping: 'Courses',
    health: 'Santé',
    // Ajoutez votre catégorie
    study: 'Études'
};
```

## 🔧 Technologies Utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Styles modernes avec Grid et Flexbox
- **JavaScript (Vanilla)** - Logique sans dépendances
- **LocalStorage API** - Persistance des données

## 📱 Compatibilité

- ✅ Chrome/Edge (dernières versions)
- ✅ Firefox (dernières versions)
- ✅ Safari (dernières versions)
- ✅ Mobile browsers

## ⚠️ Limitations

- Les données ne sont stockées que localement (pas de synchronisation cloud)
- Limite de stockage selon le navigateur (~5-10MB)
- Pas de support offline avancé

## 🐛 Débogage

### Vérifier les Tâches Stockées
Dans la console du navigateur :
```javascript
app.tasks        // Voir toutes les tâches
app.tasks.length // Nombre de tâches
```

### Réinitialiser l'App
```javascript
localStorage.clear()  // Effacer toutes les données
location.reload()     // Recharger la page
```

### Valider les Données
L'application valide :
- ✅ Texte non vide
- ✅ Longueur maximale de 200 caractères
- ✅ Catégories valides
- ✅ Niveaux de priorité valides

## 📈 Améliorations Futures

- [ ] Export/Import en CSV
- [ ] Dates d'échéance
- [ ] Récurrence des tâches
- [ ] Thème clair/sombre
- [ ] Synchronisation cloud
- [ ] Notification de rappels
- [ ] Collaboration en temps réel

## 📄 Licence

MIT License - Libre d'utilisation

## 👨‍💻 Contribution

Les contributions sont bienvenues ! 

1. Fork le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📧 Contact

Pour des questions ou des suggestions, veuillez ouvrir une issue sur GitHub.

---

**Fait avec ❤️ pour les amateurs de productivité**