# Règle de Déploiement Systématique — DataCity 3D

**À CHAQUE MODIFICATION** apportée au projet DataCity, l'agent Antigravity doit SYSTÉMATIQUEMENT :

1. **Valider les tests & le build de production** : Exécuter `npm test` et `npm run build`.
2. **Pousser sur GitHub** : Committer les modifications avec un Conventional Commit (`feat(...)`, `fix(...)`, etc.) et pousser sur la branche `main` de `https://github.com/Joailys/datacity.git`.
3. **Synchroniser sur le VPS OVH** : Déployer le build compilé (`dist/`) via `rsync` sur le serveur VPS `164.132.79.101` dans `/var/www/datacity/dist/` (accessible en HTTPS sur `https://city.lups.io`).
