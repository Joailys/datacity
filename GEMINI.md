# DataCity 3D — Directives Projet

## 🚀 Règle Absolue de Déploiement Continu (GitHub & VPS)

**À CHAQUE MODIFICATION** réalisée sur ce dépôt :
1. **Tests & Build** : Lancer `npm test` et `npm run build`.
2. **GitHub Push** : Committer et pousser sur `https://github.com/Joailys/datacity.git` (branche `main`).
3. **VPS Sync** : Synchroniser le dossier `dist/` sur le VPS `164.132.79.101` (`/var/www/datacity/dist/` pour `https://city.lups.io`).
