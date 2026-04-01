# Pokedex

Application React + Vite déployable sur GitHub Pages.

## Développement local

```bash
npm install
npm run dev
```

## Publication sur GitHub Pages

Le dépôt contient déjà le workflow GitHub Actions nécessaire dans `.github/workflows/deploy.yml`.

1. Pousse le projet sur un dépôt GitHub.
2. Vérifie que la branche par défaut du dépôt est `main`.
3. Dans GitHub, ouvre `Settings > Pages`.
4. Dans `Build and deployment`, choisis `Source: GitHub Actions`.
5. Pousse sur `main` pour déclencher le déploiement.

Le build calcule automatiquement le bon `base path` pour le nom du dépôt, et l'application utilise un routage compatible GitHub Pages en production.
