# DataCity - Roadmap & Vision Produit

> Transformez la Google Search Console de votre site web en une métropole 3D interactive et en temps réel.

## 🚀 Version Actuelle : `v2.0.4` (Production Ready)

---

### [v2.0.4] - Déduplication & Consolidation des URLs GSC (Fusion des slashs finaux)
- [x] **Consolidation Canonique des URLs** : Fusion des variantes d'URLs envoyées séparément par la Search Console (ex: `https://woofissimo.fr/` et `https://woofissimo.fr`).
- [x] **Agrégation des Métriques** : Somme automatique des clics et impressions et calcul de la moyenne pondérée des positions pour regrouper tout le trafic sur un seul et unique bâtiment.
- [x] **Livraison continue** : Validation des tests, build de production, commit git, push GitHub et synchronisation VPS sur `https://city.lups.io`.

### [v2.0.3] - Correction de l'Intervalle de Dates API Search Analytics (GSC)
- [x] **Calcul d'Intervalle Temporel Sécurisé** : Remplacement de la mutation `setDate()` par un calcul en millisecondes (`now - 31 days` à `now - 3 days`), éliminant l'erreur `Invalid date range` lors du chevauchement de début de mois.
- [x] **Livraison continue** : Validation des tests, build de production, commit git, push GitHub et synchronisation VPS sur `https://city.lups.io`.

### [v2.0.2] - Intégration du Client ID Google Cloud Officiel & Déploiement VPS
- [x] **Client ID Officiel Enregistré** : Intégration de l'ID Client officiel (`181176144243-4ldaisp7ejmu24ljq63mv90kqhda7gpm.apps.googleusercontent.com`) dans la configuration d'environnement `.env`.
- [x] **Connexion 1-Clic Directe Sans Saisie** : Le bouton *"Accéder à la Page de Connexion Google"* envoie désormais directement l'utilisateur sur `accounts.google.com` sans aucune popup de configuration intermédiaire.
- [x] **Déploiement VPS OVH `city.lups.io`** : Build de production compilé et synchronisé sur `/var/www/datacity/dist` avec serveur Nginx configuré.

### [v2.0.1] - Redirection Directe vers accounts.google.com (Zéro saisie manuelle)
- [x] **Flux d'Authentification Google Direct** : Le bouton principal *"Accéder à la Page de Connexion Google"* redirige désormais directement l'utilisateur vers la page officielle de connexion Google (`accounts.google.com/o/oauth2/v2/auth`).
- [x] **Masquage de la saisie manuelle** : Les champs de saisie manuelle de jetons OAuth ne sont plus affichés par défaut pour offrir un parcours 1-clic fluide et automatique.
- [x] **Configuration simple du Client ID** : Un modale de configuration permet d'enregistrer son `Client ID Google Cloud` en 1 seconde (sauvegardé en mémoire locale `localStorage`).

### [v2.0.0] - Intégration Native Google Search Console OAuth & Gestion Multi-Sites ("Une Ville par Site")
- [x] **Suppression définitive des jeux de données fictifs** : L'application s'appuie désormais exclusivement sur la connexion Google Search Console API réelle du compte utilisateur.
- [x] **Gestion Multi-Sites (Une ville par site)** : Menu déroulant dynamique dans la barre de navigation permettant de basculer instantanément entre tous les sites validés de son compte Google Search Console.
- [x] **Connexion Google OAuth 2.0 en Lecture Seule (`webmasters.readonly`)** : Écran d'accueil interactif `WelcomeConnectHero` pour s'authentifier directement avec Google ou coller son jeton d'accès OAuth.
- [x] **Intégration API temps réel `gscApi.ts`** : Requêtes réelles sur l'API Search Analytics v3 pour récupérer les pages, clics, impressions, CTR, positions et mots-clés de chaque site et générer la métropole 3D correspondante.

### [v1.2.1] - Élimination Totale du Z-Fighting & Recentrage des Îlots Urbains
- [x] **Zéro Z-Fighting / Clignotement de Dalles** : Re-superposition millimétrée des coordonnées Y (`0.0` Sol général, `0.001` Grille, `0.015` Ombre au contact, `0.02` Plaque de quartier, `0.03` Contour néon, `0.04` Trottoir de parcelle).
- [x] **Recentrage dynamique des Bâtiments** : Alignement mathématique parfait des bâtiments au centre de leurs îlots de quartiers respectifs (plus aucun bâtiment entassé dans les coins ou grands vides).
- [x] **Parcelles Paves de Trottoir sous Chaque Bâtiment** : Ajout d'une terrasse/trottoir individuel sous chaque construction pour ancrer visuellement chaque maison, immeuble et tour sur sa parcelle.

### [v1.2.0] - Refonte Architecturale 3D Haut de Gamme & ContactShadows
- [x] **Modèles 3D Architecturaux Low-Poly d'Élite** :
  - **Villas & Cottages (< 80 clics)** : Murs crépi crème, soubassement pierre, toit en tuiles terre cuite avec lucarne de toit, cheminée avec volute de fumée, porche en bois et fenêtres avec volets.
  - **Immeubles Haussmanniens / Boutiques (80 à 400 clics)** : Rez-de-chaussée commercial (cafés/boutiques) avec vitrines éclairées, balcons en fer forgé et toit mansardé en zinc.
  - **Tours Vitrées Art-Déco (400 à 1500 clics)** : Structure en retrait (stepped setbacks), lobby vitré à tambour, ceintures de corniche dorées et flèche pinnaculaire.
  - **Megatower Skyscraper (>= 1500 clics)** : Structure à 3 niveaux dégressifs, terrasses avec jardins suspendus (végétation 3D), héliport et phare de signalisation rotatif.
- [x] **Ancrage au Sol & Ombres Douces (`ContactShadows`)** : Intégration du composant ContactShadows pour ancrer naturellement chaque bâtiment au sol avec des ombres au contact de la terre.

### [v1.1.2] - Refonte Architecturale des Façades 3D & Équilibrage des Échelles
- [x] **Suppression des monolithes géants** : Plafond de hauteur ajusté à 13.5 unités maximum pour que l'ensemble des bâtiments s'intègre harmonieusement dans le champ de vision sans s'étirer à l'infini.
- [x] **Façades 3D multi-étages détaillées** :
  - **Maison (< 80 clics)** : Modélisation complète avec toit en pente, cheminée, porte en bois, fenêtres dorées et arbres d'automne.
  - **Immeuble R+4 (80 à 400 clics)** : Balcons, corniches d'étages et fenêtres lumineuses sur 4 côtés.
  - **Tour Commerciale (400 à 1500 clics)** : Façade en verre avec anneaux d'étages dorés et marquise d'entrée.
  - **Gratte-ciel Megatower (>= 1500 clics)** : Structure 3 niveaux avec grille d'étages lumineuse, flèche et gyrophare.
- [x] **Correspondance stricte Clics vs Impressions** :
  - **Hauteur** = Clics (niveau d'évolution morphologique).
  - **Emprise au sol (Largeur & Profondeur)** = Impressions.

### [v1.1.1] - Intégration des Maisons dans les jeux de données & Modélisation Procédurale Réaliste
- [x] **Enrichissement du dataset par défaut** : Ajout de 6+ pages à faible trafic (< 100 clics) afin d'afficher immédiatement de vrais pavillons et maisons individuelles dans la ville.
- [x] **Modélisation architecturale 3D poussée** :
  - **Maisons (< 100 clics)** : Murs crépi crème, toit en pente terre cuite débordant, cheminée en brique, porte en bois et fenêtres avec éclairage intérieur doré.
  - **Immeubles (100-500 clics)** : Balcons, façade beige et quadrillage de fenêtres lumineuses.
  - **Tours Vitrées (500-1800 clics)** : Verre, ceintures d'accentuation dorées et marquise d'entrée.
  - **Gratte-ciels (>= 1800 clics)** : Megatower double bloc avec flèche et gyrophare.

### [v1.1.0] - Thème Lumineux Automnal & Modélisation 3D Réaliste des Maisons
- [x] **Direction Artistique Lumineuse & Automnale** :
  - **Atmosphère & Ciel** : Lumière dorée ("Golden Hour"), ciel chaud et doux brouillard automnal.
  - **Végétation 3D** : Arbres automnaux 3D (érables, chênes) aux feuillages orange, rouge et doré disséminés dans les quartiers.
  - **Plaques de Sol & Grille** : Tons terre cuite, sable chaud et ambre.
  - **Design System UI Overlay** : Interfaces en verre dépoli blanc/crème avec typographie sombre et touches ambre/terracotta.
- [x] **Modélisation Réaliste des Maisons (Niveau 1)** :
  - **Murs crépi crème** avec vraie toiture à double pente terre cuite débordante.
  - **Cheminée en brique** sur le toit.
  - **Porte d'entrée en bois** et fenêtres aux lumières intérieures dorées.

### [v1.0.1] - Correction des Bugs Visuels & Évolution Architecturale (Maison -> Gratte-ciel)
- [x] **Évolution morphologique procédurale à 4 niveaux** :
  - **Niveau 1 (< 100 clics)** : Petite Maison / Pavillon avec toit en pente et porte lumineuse.
  - **Niveau 2 (100 à 500 clics)** : Immeuble résidentiel / bureau R+4 avec toit terrasse.
  - **Niveau 3 (500 à 1800 clics)** : Tour commerciale vitrée avec néon circulaire et antenne de toit.
  - **Niveau 4 (>= 1800 clics)** : Gratte-ciel Megatower Cyberpunk avec flèche lumineuse et gyrophare clignotant.
- [x] **Correction du bug visuel de z-index** : Masquage propre des labels HTML 3D lors de l'ouverture des modales (`GscConnectModal`, `MayorReport`, `LeaderboardModal`) et élévation à `z-[100]`.

## 🎯 Jalons & Release Plan

### [v1.0.0] - Lancement Initial & Moteur 3D Procedural
- [x] Initialisation de la stack React 19 + TypeScript + Vite + Three.js.
- [x] Implémentation du moteur de rendu 3D procedural (Three.js / React Three Fiber).
- [x] Mapping des métriques GSC :
  - **Hauteur des tours** : Clics & Impressions.
  - **Superficie** : Volume de données / Trafic global.
  - **Couleurs & Néons** : Position moyenne Google & CTR.
  - **Zonage par quartiers** : Structuration automatique par sous-dossiers d'URL (`/blog/`, `/products/`, `/docs/`, etc.).
- [x] Mode Démo interactif avec 3 jeux de données pré-chargés (SaaS B2B, E-commerce Tech, Média SEO).
- [x] Inspecteur de bâtiment interactif (détails au clic, requêtes clés, mots-clés, taux de clic).
- [x] Contrôle temporel (Time Travel) pour animer l'évolution de la ville dans le temps.
- [x] Le Rapport du Maire (détection automatique des anomalies et recommandations SEO).
- [x] Mur des Villes (Classement communautaire des plus grandes métropoles SEO).
- [x] Module de connexion Google Search Console (OAuth 2.0).
- [x] Suite de tests unitaires Vitest sur les fonctions d'aggrégation et de scoring.

### [v1.1.0] - Fonctionnalités Avancées (Prochaine Étape)
- [ ] Export vidéo/image haute définition de sa ville 3D pour réseaux sociaux (X, LinkedIn).
- [ ] Mode Réalité Augmentée / VR (WebXR).
- [ ] Connecteurs d'analytics complémentaires (Google Analytics 4, Plausible, Matomo).
- [ ] IA Générative pour personnaliser l'architecture visuelle des bâtiments selon le sujet de la page.
- [ ] Webhooks et alertes Slack/Discord en cas de chute de position des gratte-ciels clés.

---

## 🛠️ Normes & Discipline
- **Semantic Versioning 2.0.0** : `MAJEUR.MINEUR.CORRECTIF`.
- **Conventional Commits** : `feat(...)`, `fix(...)`, `perf(...)`, `refactor(...)`, `chore(...)`.
- **Tests Unitaires** : Vitest obligatoire pour tout calcul de score, transformation GSC et masquage d'erreurs.
