# Portfolio & CV Interactif - Nicolas Surget

Ce projet est un portfolio et un CV interactif complet présentant mon parcours, mes compétences et mes projets. Il a été conçu avec une architecture moderne en **Monorepo** combinant un backend API REST et un frontend dynamique moderne.

## 🚀 Technologies Utilisées

### Frontend
- **Vue.js 3** (Composition API, `<script setup>`)
- **Vite** (Build tool ultra-rapide)
- **Tailwind CSS** (Design fluide et responsive)
- **Vue Router** (Navigation fluide sans rechargement de page)

### Backend
- **Express.js (Node.js)** (Serveur API léger)
- **Sequelize ORM** (Modélisation et requêtage de la base de données)
- **SQLite** (Base de données embarquée, idéale pour la portabilité et le déploiement)

---

## 📂 Structure du Projet

```
nsurget/
├── backend/            # API REST (Node.js/Express.js & Sequelize)
│   ├── src/
│   │   ├── config/     # Configuration de la base de données
│   │   ├── models/     # Modèles Sequelize (Project, Education, Tag)
│   │   ├── routes/     # Routes API REST
│   │   └── app.js      # Point d'entrée de l'application
├── frontend/           # Application SPA (Vue 3 & Vite)
│   ├── src/
│   │   ├── components/ # Composants d'interface (Navbar, Footer, etc.)
│   │   ├── views/      # Vues de l'application (Projets, Formations, etc.)
│   │   └── main.js
└── cv/                 # Fichier source Markdown (cv.md) utilisé pour peupler la BDD
```

---

## ⚙️ Installation et Lancement en local

### 1. Cloner le projet
```bash
git clone https://github.com/VOTRE_PSEUDO/nsurget.git
cd nsurget
```

### 2. Installer les dépendances (Front et Back)
```bash
npm run install:all
```

### 3. Initialiser la base de données (Seed)
Cette commande va lire le fichier `cv/cv.md` et charger l'ensemble des données (formations, projets, tags) dans la base de données SQLite.
```bash
npm run seed
```

### 4. Lancer le projet en mode développement
Dans deux terminaux séparés :
```bash
# Pour le backend (port 5001)
npm run backend

# Pour le frontend (port 5173 par défaut)
npm run frontend
```
