# Site Web des Villes Impériales du Maroc

Ce projet est un site web présentant les activités touristiques dans les villes impériales du Maroc (Fès, Meknès, Rabat et Marrakech).

## Structure du projet

```
mon-agence-touristique/
├── index.html                  # Page d'accueil
├── villes.html                 # Détail des villes impériales
├── itineraire.html            # Page d'itinéraires
├── partenaires.html           # Liste des partenaires
├── marketing.html             # Stratégie marketing
│
├── css/
│   └── style.css              # Fichier CSS global
│
├── ts/                        # Scripts TypeScript
│   ├── main.ts                # Script général (navbar, navigation)
│   ├── villes.ts              # Gestion du contenu des villes
│   ├── itineraire.ts          # Affichage dynamique des itinéraires
│   ├── partenaires.ts         # Insertion de partenaires
│   └── marketing.ts           # Affichage des promotions & cibles
│
├── data/
│   ├── villes.json            # Données : histoire, sites, traditions
│   ├── itineraire.json        # Données : circuits jour par jour
│   ├── partenaires.json       # Données : hôtels, restos, guides
│   └── marketing.json         # Données : promos, cibles
│
├── assets/
│   ├── images/                # Photos des villes, icônes, etc.
│   └── logos/
│
├── dist/                      # Dossier de sortie (après compilation TS)
└── README.md
```

## Installation

1. Cloner le projet
2. Installer les dépendances : `npm install`
3. Compiler les fichiers TypeScript : `npm run build`
4. Lancer le serveur de développement : `npm start`

## Technologies utilisées

- HTML5 / CSS3
- TypeScript
- JSON pour le stockage des données

## Fonctionnalités

- Présentation des quatre villes impériales du Maroc
- Itinéraires de voyage avec planification jour par jour
- Liste des partenaires (hôtels, restaurants, guides...)
- Section marketing avec promotions et segments cibles

## Développement

Pour travailler sur le projet :

1. Lancer la compilation TypeScript en mode watch : `npm run watch`
2. Démarrer le serveur de développement : `npm start`

## Crédits

Projet développé comme démonstration de site touristique pour les villes impériales du Maroc.
