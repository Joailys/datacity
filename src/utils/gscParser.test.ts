import { describe, it, expect } from 'vitest';
import {
  extractDistrictFromUrl,
  getTierFromPosition,
  calculateBuildingDimensions,
  generate3DCityLayout,
  calculateCitySummary,
  generateMayorAlerts,
  getBuildingStageFromClicks,
} from './gscParser';
import type { PageData } from '../types/seo';

describe('GSC Parser & 3D Layout Utils', () => {
  it('should extract correct district names from URL paths', () => {
    expect(extractDistrictFromUrl('/')).toBe('Accueil & Core');
    expect(extractDistrictFromUrl('/blog/mon-article')).toBe('Blog & Articles');
    expect(extractDistrictFromUrl('/products/laptop-pro')).toBe('Catalogue Produits');
    expect(extractDistrictFromUrl('/docs/api/v1')).toBe('Documentation');
    expect(extractDistrictFromUrl('/pricing')).toBe('Tarification');
    expect(extractDistrictFromUrl('/inconnu/page')).toBe('Inconnu');
  });

  it('should calculate building architectural evolution stage based on traffic', () => {
    expect(getBuildingStageFromClicks(25).stage).toBe('house');
    expect(getBuildingStageFromClicks(25).level).toBe(1);

    expect(getBuildingStageFromClicks(250).stage).toBe('building');
    expect(getBuildingStageFromClicks(250).level).toBe(2);

    expect(getBuildingStageFromClicks(1200).stage).toBe('tower');
    expect(getBuildingStageFromClicks(1200).level).toBe(3);

    expect(getBuildingStageFromClicks(3500).stage).toBe('skyscraper');
    expect(getBuildingStageFromClicks(3500).level).toBe(4);
  });

  it('should assign correct neon color tier based on Search position', () => {
    expect(getTierFromPosition(1.5).tier).toBe('top3');
    expect(getTierFromPosition(3.0).tier).toBe('top3');
    expect(getTierFromPosition(5.4).tier).toBe('top10');
    expect(getTierFromPosition(15.0).tier).toBe('top30');
    expect(getTierFromPosition(42.0).tier).toBe('rest');
  });

  it('should calculate valid 3D building dimensions across evolution levels', () => {
    const [w1, h1] = calculateBuildingDimensions(10, 100, 'clicks');
    const [w2, h2] = calculateBuildingDimensions(3000, 50000, 'clicks');

    expect(h2).toBeGreaterThan(h1);
    expect(w2).toBeGreaterThan(w1);
    expect(h1).toBeGreaterThanOrEqual(1.2);
    expect(h2).toBeLessThanOrEqual(32);
  });

  it('should layout pages into 3D buildings with architectural stages correctly', () => {
    const mockPages: PageData[] = [
      {
        id: 'p1',
        url: 'https://mysite.com/',
        path: '/',
        district: 'Accueil & Core',
        title: 'Accueil',
        currentMetrics: { clicks: 2500, impressions: 35000, ctr: 8.0, position: 1.2 },
        history: [],
        topKeywords: [],
      },
      {
        id: 'p2',
        url: 'https://mysite.com/blog/article-low',
        path: '/blog/article-low',
        district: 'Blog & Articles',
        title: 'Article Récent',
        currentMetrics: { clicks: 35, impressions: 600, ctr: 5.8, position: 14.5 },
        history: [],
        topKeywords: [],
      },
    ];

    const { buildings, districts } = generate3DCityLayout(mockPages, 'clicks');

    expect(buildings.length).toBe(2);
    expect(districts.length).toBe(2);
    expect(buildings[0].stage).toBe('skyscraper');
    expect(buildings[1].stage).toBe('house');
  });

  it('should calculate summary metrics and health score', () => {
    const mockPages: PageData[] = [
      {
        id: 'p1',
        url: 'https://mysite.com/',
        path: '/',
        district: 'Accueil',
        title: 'Accueil',
        currentMetrics: { clicks: 1000, impressions: 10000, ctr: 10.0, position: 2.0 },
        history: [],
        topKeywords: [],
      },
    ];

    const summary = calculateCitySummary(mockPages);

    expect(summary.totalClicks).toBe(1000);
    expect(summary.totalImpressions).toBe(10000);
    expect(summary.avgCtr).toBe(10.0);
    expect(summary.healthScore).toBeGreaterThan(50);
  });

  it('should generate mayor alerts for high-impression low-CTR pages', () => {
    const mockPages: PageData[] = [
      {
        id: 'p1',
        url: 'https://mysite.com/blog/low-ctr',
        path: '/blog/low-ctr',
        district: 'Blog & Articles',
        title: 'Page à Fort Potentiel',
        currentMetrics: { clicks: 50, impressions: 20000, ctr: 0.25, position: 4.0 },
        history: [],
        topKeywords: [],
      },
    ];

    const alerts = generateMayorAlerts(mockPages);

    expect(alerts.length).toBeGreaterThan(0);
    expect(alerts.some((a) => a.type === 'opportunity')).toBe(true);
  });
});
