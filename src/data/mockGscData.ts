import type { PageData, LeaderboardCity } from '../types/seo';

/**
 * Mock Dataset 1: SaaS B2B Platform (DataCity.ai)
 * Mix of Skyscrapers (Level 4), Towers (Level 3), Buildings (Level 2), and Houses (Level 1).
 */
export const saasMockPages: PageData[] = [
  // LEVEL 4 SKYSCRAPERS (Clicks >= 1800)
  {
    id: 'saas-1',
    url: 'https://datacity.ai/',
    path: '/',
    district: 'Accueil & Core',
    title: 'DataCity · Google Search Console 3D Visualizer',
    currentMetrics: { clicks: 3450, impressions: 38000, ctr: 9.07, position: 1.2 },
    history: [
      { date: '2026-08-01', metrics: { clicks: 2100, impressions: 25000, ctr: 8.4, position: 1.4 } },
      { date: '2026-09-01', metrics: { clicks: 3450, impressions: 38000, ctr: 9.07, position: 1.2 } },
    ],
    topKeywords: [
      { query: 'search console 3d', clicks: 1250, impressions: 8400, ctr: 14.88, position: 1.1 },
    ],
  },
  {
    id: 'saas-2',
    url: 'https://datacity.ai/pricing',
    path: '/pricing',
    district: 'Tarification',
    title: 'Tarifs et Abonnements DataCity Pro',
    currentMetrics: { clicks: 1890, impressions: 14200, ctr: 13.31, position: 1.8 },
    history: [],
    topKeywords: [
      { query: 'datacity prix', clicks: 920, impressions: 3400, ctr: 27.05, position: 1.0 },
    ],
  },

  // LEVEL 3 TOWERS (500 <= Clicks < 1800)
  {
    id: 'saas-3',
    url: 'https://datacity.ai/blog/guide-seo-3d',
    path: '/blog/guide-seo-3d',
    district: 'Blog & Articles',
    title: 'Guide Ultime : Représenter son Trafic SEO en 3D',
    currentMetrics: { clicks: 1420, impressions: 28900, ctr: 4.91, position: 3.2 },
    history: [],
    topKeywords: [],
  },
  {
    id: 'saas-4',
    url: 'https://datacity.ai/blog/comment-analyser-cannibalisation-seo',
    path: '/blog/comment-analyser-cannibalisation-seo',
    district: 'Blog & Articles',
    title: 'Comment Détecter la Cannibalisation SEO',
    currentMetrics: { clicks: 840, impressions: 31000, ctr: 2.71, position: 6.4 },
    history: [],
    topKeywords: [],
  },
  {
    id: 'saas-5',
    url: 'https://datacity.ai/docs/quickstart',
    path: '/docs/quickstart',
    district: 'Documentation',
    title: 'Démarrage Rapide : Connecter sa GSC',
    currentMetrics: { clicks: 1150, impressions: 9800, ctr: 11.73, position: 2.1 },
    history: [],
    topKeywords: [],
  },

  // LEVEL 2 MID-RISE BUILDINGS (100 <= Clicks < 500)
  {
    id: 'saas-6',
    url: 'https://datacity.ai/blog/optimiser-ctr-google',
    path: '/blog/optimiser-ctr-google',
    district: 'Blog & Articles',
    title: '10 Astuces pour Doubler son Taux de Clic',
    currentMetrics: { clicks: 320, impressions: 14500, ctr: 2.2, position: 8.1 },
    history: [],
    topKeywords: [],
  },
  {
    id: 'saas-7',
    url: 'https://datacity.ai/features/time-travel',
    path: '/features/time-travel',
    district: 'Fonctionnalités',
    title: 'Time Travel 3D : L\'Histoire du Trafic',
    currentMetrics: { clicks: 280, impressions: 8900, ctr: 3.14, position: 4.8 },
    history: [],
    topKeywords: [],
  },
  {
    id: 'saas-8',
    url: 'https://datacity.ai/case-studies/agency-boost',
    path: '/case-studies/agency-boost',
    district: 'Études de Cas',
    title: 'Étude de Cas : Agence SEO-Max',
    currentMetrics: { clicks: 410, impressions: 7800, ctr: 5.25, position: 5.2 },
    history: [],
    topKeywords: [],
  },

  // LEVEL 1 REAL HOUSES / COTTAGES (Clicks < 100)
  {
    id: 'saas-house-1',
    url: 'https://datacity.ai/blog/balise-alt-image-seo',
    path: '/blog/balise-alt-image-seo',
    district: 'Blog & Articles',
    title: 'Pavillon #1 : Guide Optimisation Balise Alt Image',
    currentMetrics: { clicks: 45, impressions: 1200, ctr: 3.75, position: 12.4 },
    history: [],
    topKeywords: [{ query: 'balise alt seo', clicks: 25, impressions: 800, ctr: 3.12, position: 11.2 }],
  },
  {
    id: 'saas-house-2',
    url: 'https://datacity.ai/blog/redirection-301-vs-302',
    path: '/blog/redirection-301-vs-302',
    district: 'Blog & Articles',
    title: 'Pavillon #2 : Différence entre Redirection 301 et 302',
    currentMetrics: { clicks: 68, impressions: 1800, ctr: 3.77, position: 14.1 },
    history: [],
    topKeywords: [],
  },
  {
    id: 'saas-house-3',
    url: 'https://datacity.ai/docs/api-rate-limits',
    path: '/docs/api-rate-limits',
    district: 'Documentation',
    title: 'Maison #3 : Documentation Quotas et Limites API',
    currentMetrics: { clicks: 35, impressions: 950, ctr: 3.68, position: 9.8 },
    history: [],
    topKeywords: [],
  },
  {
    id: 'saas-house-4',
    url: 'https://datacity.ai/docs/webhooks-events',
    path: '/docs/webhooks-events',
    district: 'Documentation',
    title: 'Maison #4 : Webhooks et Événements Temps Réel',
    currentMetrics: { clicks: 28, impressions: 600, ctr: 4.66, position: 8.2 },
    history: [],
    topKeywords: [],
  },
  {
    id: 'saas-house-5',
    url: 'https://datacity.ai/case-studies/ecommerce-growth',
    path: '/case-studies/ecommerce-growth',
    district: 'Études de Cas',
    title: 'Maison #5 : Cas Client E-commerce Tech',
    currentMetrics: { clicks: 82, impressions: 2100, ctr: 3.9, position: 15.3 },
    history: [],
    topKeywords: [],
  },
  {
    id: 'saas-house-6',
    url: 'https://datacity.ai/features/mayor-alerts',
    path: '/features/mayor-alerts',
    district: 'Fonctionnalités',
    title: 'Maison #6 : Système d\'Alertes du Maire',
    currentMetrics: { clicks: 55, impressions: 1400, ctr: 3.92, position: 11.0 },
    history: [],
    topKeywords: [],
  },
];

/**
 * Mock Dataset 2: E-commerce Tech Store
 */
export const ecommerceMockPages: PageData[] = [
  {
    id: 'ecom-1',
    url: 'https://techcyber.shop/',
    path: '/',
    district: 'Accueil & Core',
    title: 'TechCyber · Hardware & Gaming Cyberpunk',
    currentMetrics: { clicks: 8900, impressions: 95000, ctr: 9.36, position: 1.5 },
    history: [],
    topKeywords: [],
  },
  {
    id: 'ecom-2',
    url: 'https://techcyber.shop/products/pc-gamer-rtx-5090',
    path: '/products/pc-gamer-rtx-5090',
    district: 'Catalogue Produits',
    title: 'PC Gamer Ultra Cyberpunk RTX 5090',
    currentMetrics: { clicks: 3100, impressions: 42000, ctr: 7.38, position: 2.1 },
    history: [],
    topKeywords: [],
  },
  {
    id: 'ecom-house-1',
    url: 'https://techcyber.shop/products/cables-hdmi-21',
    path: '/products/cables-hdmi-21',
    district: 'Catalogue Produits',
    title: 'Maison Produit : Câbles HDMI 2.1 Braisés',
    currentMetrics: { clicks: 42, impressions: 1100, ctr: 3.81, position: 18.2 },
    history: [],
    topKeywords: [],
  },
  {
    id: 'ecom-house-2',
    url: 'https://techcyber.shop/blog/nettoyer-clavier-mecanique',
    path: '/blog/nettoyer-clavier-mecanique',
    district: 'Blog & Articles',
    title: 'Maison Blog : Comment Nettoyer son Clavier',
    currentMetrics: { clicks: 75, impressions: 2200, ctr: 3.4, position: 14.5 },
    history: [],
    topKeywords: [],
  },
];

/**
 * Community Leaderboard Data
 */
export const mockLeaderboardCities: LeaderboardCity[] = [
  {
    id: 'city-1',
    name: 'Datacity.ai',
    domain: 'datacity.ai',
    visitors28d: 48200,
    pageCount: 38,
    clicksPerPage: 1268,
    score: 98,
    category: 'SaaS B2B',
    updatedAt: '2026-09-01',
  },
  {
    id: 'city-2',
    name: 'TechCyber Metropolis',
    domain: 'techcyber.shop',
    visitors28d: 124500,
    pageCount: 142,
    clicksPerPage: 876,
    score: 94,
    category: 'E-commerce',
    updatedAt: '2026-09-01',
  },
];
