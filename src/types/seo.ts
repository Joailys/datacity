export interface GscMetric {
  clicks: number;
  impressions: number;
  ctr: number; // Percentage (0 - 100)
  position: number; // Google average position (1.0 = top)
}

export interface KeywordQuery {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface PageHistorySnapshot {
  date: string; // YYYY-MM-DD
  metrics: GscMetric;
}

export interface PageData {
  id: string;
  url: string;
  path: string;
  district: string;
  title: string;
  currentMetrics: GscMetric;
  history: PageHistorySnapshot[];
  topKeywords: KeywordQuery[];
}

export type BuildingStage = 'house' | 'building' | 'tower' | 'skyscraper';

export interface Building3DState {
  id: string;
  pageData: PageData;
  gridX: number;
  gridZ: number;
  position: [number, number, number]; // x, y, z
  dimensions: [number, number, number]; // width, height, depth
  color: string;
  neonColor: string;
  tier: 'top3' | 'top10' | 'top30' | 'rest';
  stage: BuildingStage;
  level: 1 | 2 | 3 | 4;
  isSelected?: boolean;
  isHovered?: boolean;
}

export interface DistrictGroup {
  id: string;
  name: string;
  pathPrefix: string;
  color: string;
  pages: PageData[];
  gridOffset: [number, number];
}

export interface CityMetricsSummary {
  totalClicks: number;
  totalImpressions: number;
  avgCtr: number;
  avgPosition: number;
  totalPages: number;
  totalDistricts: number;
  healthScore: number; // 0 - 100
}

export interface MayorAlert {
  id: string;
  type: 'warning' | 'opportunity' | 'success' | 'alert';
  title: string;
  description: string;
  affectedUrl?: string;
  impact: 'high' | 'medium' | 'low';
}

export interface LeaderboardCity {
  id: string;
  name: string;
  domain: string;
  visitors28d: number;
  pageCount: number;
  clicksPerPage: number;
  score: number;
  category: string;
  updatedAt: string;
}

export interface GscSiteEntry {
  siteUrl: string;
  permissionLevel: string;
  displayName: string;
}

export interface UserAuthSession {
  accessToken: string;
  userEmail?: string;
  connectedSites: GscSiteEntry[];
  selectedSiteUrl: string | null;
}
