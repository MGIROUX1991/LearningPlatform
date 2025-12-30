# Plateforme d'Apprentissage Québec

Une plateforme d'apprentissage en ligne gamifiée pour les élèves à la maison (Secondaire 1-5 / 7e à 11e année), inspirée de l'UX de Spotify avec un système de XP, niveaux, et quêtes quotidiennes.

## 🚀 Fonctionnalités

### Tableau de bord
- Statistiques utilisateur (niveau, XP, série quotidienne)
- Quêtes quotidiennes (3 par jour, réinitialisées chaque jour)
- Cartes de progression par matière
- Réalisations récentes
- Défi hebdomadaire

### Module Histoire - Nouvelle-France
- **Vue d'ensemble des chapitres**: Timeline visuelle avec 5 chapitres
- **Leçons de lecture**: Design de parchemin avec rouleaux en bois, esthétique manuscrite
- **Journal de Bord**: Activité immersive où les étudiants tiennent un journal de bord de navire
- Système de progression avec chapitres verrouillés/déverrouillés

### Module Mathématiques
- **Arbre de compétences**: Système de progression visuel
- **Résolveur de problèmes**: Interface avec thème tableau noir
- Système de "boss battles" (évaluations complètes)
- Indices qui coûtent des XP
- Zone de travail pour les calculs

### Système de gamification
- **XP et niveaux**: 500 XP par niveau
- **Série quotidienne**: Suivi des jours consécutifs
- **Réalisations**: Badges débloquables
- **Quêtes quotidiennes**: Objectifs quotidiens avec récompenses XP

## 🛠️ Technologies

- **React 18** avec React Router pour la navigation
- **Vite** comme outil de build
- **Tailwind CSS** pour le styling
- **lucide-react** pour les icônes
- **Supabase** pour l'authentification et la base de données
- **PostgreSQL** (via Supabase) pour le stockage des données

## 📦 Installation

### Prerequisites

1. Node.js and npm installed
2. A Supabase account (sign up at [supabase.com](https://supabase.com))

### Setup Steps

1. **Install dependencies:**
```bash
npm install
```

2. **Set up Supabase:**
   - Create a Supabase project at [app.supabase.com](https://app.supabase.com)
   - Get your project URL and anon key from Settings → API
   - Copy `.env.example` to `.env` and add your Supabase credentials:
     ```
     VITE_SUPABASE_URL=your-project-url.supabase.co
     VITE_SUPABASE_ANON_KEY=your-anon-key
     ```

3. **Set up database:**
   - In Supabase dashboard, go to SQL Editor
   - Run the SQL migrations from `supabase/migrations/`:
     - `001_initial_schema.sql`
     - `002_initial_quests.sql`

4. **Configure authentication:**
   - In Supabase dashboard: Authentication → Settings
   - Add `http://localhost:3000` to Site URL
   - Add `http://localhost:3000/**` to Redirect URLs

5. **Start development server:**
```bash
npm run dev
```

6. **Open your browser:**
   - Navigate to `http://localhost:3000`
   - You'll be redirected to the auth page
   - Create an account to get started!

For detailed setup instructions, see [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)

## 🏗️ Structure du projet

```
src/
├── components/          # Composants réutilisables
│   └── Layout.jsx      # Layout principal avec navigation
├── context/            # Gestion d'état
│   └── AppContext.jsx  # Context API pour user, progress, quests
├── pages/              # Pages de l'application
│   ├── Dashboard.jsx   # Page d'accueil
│   ├── history/        # Module Histoire
│   │   ├── HistoryOverview.jsx
│   │   ├── HistoryLesson.jsx
│   │   └── HistoryJournal.jsx
│   └── math/           # Module Mathématiques
│       ├── MathOverview.jsx
│       ├── MathSkillTree.jsx
│       └── MathProblemSolver.jsx
├── App.jsx             # Composant principal avec routes
├── main.jsx            # Point d'entrée
└── index.css           # Styles globaux et Tailwind
```

## 🎨 Thèmes

### Histoire
- Esthétique parchemin vieilli
- Rouleaux avec tiges en bois
- Texture de papier manuscrit
- Encadrés décoratifs pour faits amusants et vocabulaire

### Mathématiques
- Thème tableau noir et cahier
- Papier quadrillé pour les calculs
- Interface type "chalkboard"

## 📊 Système de progression

- **XP par activité**: Variable selon l'activité
- **Niveaux**: 500 XP requis par niveau
- **Série**: Réinitialisée si un jour est manqué
- **Quêtes**: Réinitialisées chaque jour à minuit
- **Progression**: Sauvegardée dans Supabase (synchronisée entre appareils)

## 🔮 Fonctionnalités futures possibles

- Modules Français, Anglais, et Sciences
- Système de badges plus complet
- Multi-joueurs et classements
- Intégration avec des enseignants
- Rapports de progression détaillés

## 📝 Notes

Les données de leçons et problèmes sont actuellement codées en dur dans les composants. Dans une version de production, elles devraient être stockées dans une base de données ou un CMS.

## 📄 Licence

Ce projet est un exemple éducatif.

