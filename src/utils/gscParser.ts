import type { PageData, DistrictGroup, Building3DState, CityMetricsSummary, MayorAlert, BuildingStage } from '../types/seo';

/**
 * Extracts a human-readable district name from a URL path.
 */
export function extractDistrictFromUrl(urlPath: string): string {
  if (!urlPath || urlPath === '/' || urlPath === '') {
    return 'Accueil & Core';
  }

  const parts = urlPath.split('/').filter(Boolean);
  if (parts.length === 0) return 'Accueil & Core';

  const firstSegment = parts[0].toLowerCase();
  const segmentMap: Record<string, string> = {
    blog: 'Blog & Articles',
    posts: 'Blog & Articles',
    article: 'Blog & Articles',
    news: 'Actualités',
    product: 'Catalogue Produits',
    products: 'Catalogue Produits',
    shop: 'Boutique',
    store: 'Boutique',
    docs: 'Documentation',
    doc: 'Documentation',
    api: 'API & Dev',
    guide: 'Guides & Tutos',
    guides: 'Guides & Tutos',
    feature: 'Fonctionnalités',
    features: 'Fonctionnalités',
    pricing: 'Tarification',
    about: 'Entreprise',
    'case-studies': 'Études de Cas',
    solutions: 'Solutions',
  };

  if (segmentMap[firstSegment]) {
    return segmentMap[firstSegment];
  }

  return firstSegment.charAt(0).toUpperCase() + firstSegment.slice(1);
}

/**
 * Determines architectural stage and level strictly based on Clicks or Impressions.
 */
export function getBuildingStageFromClicks(clicks: number): {
  stage: BuildingStage;
  level: 1 | 2 | 3 | 4;
} {
  if (clicks < 80) {
    return { stage: 'house', level: 1 };
  }
  if (clicks < 400) {
    return { stage: 'building', level: 2 };
  }
  if (clicks < 1500) {
    return { stage: 'tower', level: 3 };
  }
  return { stage: 'skyscraper', level: 4 };
}

/**
 * Assigns color scheme and neon tier based on average Google Search position.
 */
export function getTierFromPosition(position: number): {
  tier: 'top3' | 'top10' | 'top30' | 'rest';
  color: string;
  neonColor: string;
} {
  if (position <= 3.0) {
    return { tier: 'top3', color: '#ea580c', neonColor: '#f59e0b' }; // Warm Terracotta / Amber
  }
  if (position <= 10.0) {
    return { tier: 'top10', color: '#d97706', neonColor: '#fbbf24' }; // Golden Amber
  }
  if (position <= 30.0) {
    return { tier: 'top30', color: '#b45309', neonColor: '#d97706' }; // Burnt Bronze
  }
  return { tier: 'rest', color: '#78350f', neonColor: '#a16207' }; // Warm Earth
}

/**
 * Calculates balanced 3D Building Dimensions (Width, Height, Depth).
 * Clicks dictate Height (Max 12.0 units).
 * Impressions dictate Footprint Width/Depth (1.6 to 3.0 units).
 */
export function calculateBuildingDimensions(
  clicks: number,
  impressions: number,
  metricMode: 'clicks' | 'impressions' = 'clicks'
): [number, number, number] {
  const primaryVal = metricMode === 'clicks' ? clicks : impressions;
  const secondaryVal = metricMode === 'clicks' ? impressions : clicks;
  const { level } = getBuildingStageFromClicks(primaryVal);

  let height = 1.5;

  if (level === 1) {
    // House (Level 1): Height 1.2 to 1.8
    height = 1.2 + (Math.min(primaryVal, 80) / 80) * 0.6;
  } else if (level === 2) {
    // Mid-rise Building (Level 2): Height 2.2 to 4.0
    height = 2.2 + ((Math.min(primaryVal, 400) - 80) / 320) * 1.8;
  } else if (level === 3) {
    // Glass Commercial Tower (Level 3): Height 4.5 to 7.5
    height = 4.5 + ((Math.min(primaryVal, 1500) - 400) / 1100) * 3.0;
  } else {
    // Skyscraper (Level 4): Height 8.2 to 12.0 (Balanced)
    const extraLog = Math.log10(Math.max(primaryVal - 1500, 1) + 1);
    height = Math.min(8.2 + extraLog * 1.4, 12.0);
  }

  // Base width & depth calculated from impressions volume (1.6 to 3.0)
  const impLog = Math.log10(Math.max(secondaryVal, 10) + 1);
  const width = Math.min(Math.max(1.6 + impLog * 0.25, 1.6), 3.0);
  const depth = width;

  return [parseFloat(width.toFixed(2)), parseFloat(height.toFixed(2)), parseFloat(depth.toFixed(2))];
}

/**
 * Transforms a list of GSC PageData into 3D Building States centered on their District Blocks.
 */
export function generate3DCityLayout(
  pages: PageData[],
  metricMode: 'clicks' | 'impressions' = 'clicks'
): { buildings: Building3DState[]; districts: DistrictGroup[] } {
  const districtMap = new Map<string, PageData[]>();

  pages.forEach((page) => {
    const districtName = extractDistrictFromUrl(page.path);
    const existing = districtMap.get(districtName) || [];
    existing.push(page);
    districtMap.set(districtName, existing);
  });

  const districts: DistrictGroup[] = [];
  const buildings: Building3DState[] = [];

  const districtColors = [
    '#ea580c', '#d97706', '#b45309', '#c2410c', '#eab308', '#9a3412', '#78350f'
  ];

  let currentDistX = 0;
  let currentDistZ = 0;
  const maxPerRow = 3;
  let distIndex = 0;

  districtMap.forEach((distPages, distName) => {
    distPages.sort((a, b) => b.currentMetrics.clicks - a.currentMetrics.clicks);

    const distColor = districtColors[distIndex % districtColors.length];
    const gridOffset: [number, number] = [currentDistX, currentDistZ];

    districts.push({
      id: `dist-${distIndex}`,
      name: distName,
      pathPrefix: distName.toLowerCase(),
      color: distColor,
      pages: distPages,
      gridOffset,
    });

    // Calculate grid size for this district
    const count = distPages.length;
    const cols = Math.ceil(Math.sqrt(count));
    const rows = Math.ceil(count / cols);

    const buildingSpacing = 5.0;
    const totalWidth = cols * buildingSpacing;
    const totalDepth = rows * buildingSpacing;

    // Center buildings inside the district block
    const startX = currentDistX - (totalWidth / 2) + (buildingSpacing / 2);
    const startZ = currentDistZ - (totalDepth / 2) + (buildingSpacing / 2);

    distPages.forEach((page, idx) => {
      const row = Math.floor(idx / cols);
      const col = idx % cols;

      const posX = startX + col * buildingSpacing;
      const posZ = startZ + row * buildingSpacing;

      const [w, h, d] = calculateBuildingDimensions(
        page.currentMetrics.clicks,
        page.currentMetrics.impressions,
        metricMode
      );

      // Y = 0.04 (District plate Y=0.02 + Sidewalk plate 0.02) + h/2
      const posY = 0.04 + h / 2;
      const tierInfo = getTierFromPosition(page.currentMetrics.position);
      const stageInfo = getBuildingStageFromClicks(
        metricMode === 'clicks' ? page.currentMetrics.clicks : page.currentMetrics.impressions
      );

      buildings.push({
        id: page.id,
        pageData: page,
        gridX: col,
        gridZ: row,
        position: [posX, posY, posZ],
        dimensions: [w, h, d],
        color: tierInfo.color,
        neonColor: tierInfo.neonColor,
        tier: tierInfo.tier,
        stage: stageInfo.stage,
        level: stageInfo.level,
      });
    });

    distIndex++;
    currentDistX += 28;
    if (distIndex % maxPerRow === 0) {
      currentDistX = 0;
      currentDistZ += 28;
    }
  });

  return { buildings, districts };
}

/**
 * Calculates global SEO health score and summary metrics.
 */
export function calculateCitySummary(pages: PageData[]): CityMetricsSummary {
  if (!pages || pages.length === 0) {
    return {
      totalClicks: 0,
      totalImpressions: 0,
      avgCtr: 0,
      avgPosition: 0,
      totalPages: 0,
      totalDistricts: 0,
      healthScore: 0,
    };
  }

  const totalClicks = pages.reduce((acc, p) => acc + p.currentMetrics.clicks, 0);
  const totalImpressions = pages.reduce((acc, p) => acc + p.currentMetrics.impressions, 0);
  const avgCtr = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
  
  const weightedPositionSum = pages.reduce(
    (acc, p) => acc + p.currentMetrics.position * Math.max(p.currentMetrics.impressions, 1),
    0
  );
  const avgPosition = totalImpressions > 0 ? weightedPositionSum / totalImpressions : 20.0;

  const top10Count = pages.filter((p) => p.currentMetrics.position <= 10).length;
  const top10Ratio = top10Count / pages.length;

  const ctrScore = Math.min(avgCtr * 10, 40);
  const posScore = Math.max(0, 40 - (avgPosition - 1) * 2);
  const ratioScore = top10Ratio * 20;

  const healthScore = Math.round(Math.min(Math.max(ctrScore + posScore + ratioScore, 10), 100));
  const districtsCount = new Set(pages.map((p) => extractDistrictFromUrl(p.path))).size;

  return {
    totalClicks,
    totalImpressions,
    avgCtr: parseFloat(avgCtr.toFixed(2)),
    avgPosition: parseFloat(avgPosition.toFixed(1)),
    totalPages: pages.length,
    totalDistricts: districtsCount,
    healthScore,
  };
}

/**
 * Generates automated SEO insights and alerts ("Le Rapport du Maire").
 */
export function generateMayorAlerts(pages: PageData[]): MayorAlert[] {
  const alerts: MayorAlert[] = [];

  if (!pages || pages.length === 0) return alerts;

  const lowCtrSkyscrapers = pages.filter(
    (p) => p.currentMetrics.impressions > 5000 && p.currentMetrics.ctr < 2.0 && p.currentMetrics.position <= 10
  );

  lowCtrSkyscrapers.slice(0, 2).forEach((p, idx) => {
    alerts.push({
      id: `alert-ctr-${idx}`,
      type: 'opportunity',
      title: `⚡ Tour à Fort Potentiel : ${p.title}`,
      description: `Cette page enregistre ${p.currentMetrics.impressions.toLocaleString()} impressions en Top 10 mais un CTR de seulement ${p.currentMetrics.ctr}%. Réécrivez la balise Title et la Meta Description pour booster vos clics sans effort !`,
      affectedUrl: p.url,
      impact: 'high',
    });
  });

  const decliningPages = pages.filter((p) => {
    if (p.history.length < 2) return false;
    const first = p.history[0].metrics.clicks;
    const last = p.history[p.history.length - 1].metrics.clicks;
    return first > 100 && last < first * 0.7;
  });

  decliningPages.slice(0, 2).forEach((p, idx) => {
    alerts.push({
      id: `alert-drop-${idx}`,
      type: 'warning',
      title: `⚠️ Perte de Hauteur : ${p.title}`,
      description: `Baisse de plus de 30% des clics sur les 30 derniers jours. Vérifiez l'intention de recherche et mettez à jour le contenu frais.`,
      affectedUrl: p.url,
      impact: 'high',
    });
  });

  const top3Pages = pages.filter((p) => p.currentMetrics.position <= 3.0 && p.currentMetrics.clicks > 500);
  if (top3Pages.length > 0) {
    const topPage = top3Pages[0];
    alerts.push({
      id: `alert-top-1`,
      type: 'success',
      title: `👑 Gratte-Ciel Roi : ${topPage.title}`,
      description: `Position moyenne #${topPage.currentMetrics.position} avec ${topPage.currentMetrics.clicks.toLocaleString()} clics ! Cette tour génère le coeur de l'économie de votre ville 3D.`,
      affectedUrl: topPage.url,
      impact: 'medium',
    });
  }

  if (alerts.length < 3) {
    alerts.push({
      id: 'alert-general-1',
      type: 'alert',
      title: '🏙️ Rapport Général d\'Urbanisme SEO',
      description: 'L\'extension de votre ville se déroule bien. Concentrez vos efforts sur la création de liens internes (netlinking) vers les tours en seconde page Google (positions 11-20).',
      impact: 'low',
    });
  }

  return alerts;
}
