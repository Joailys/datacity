import { useState, useEffect, useMemo } from 'react';
import type { PageData, Building3DState, GscSiteEntry } from './types/seo';
import { generate3DCityLayout, calculateCitySummary, generateMayorAlerts } from './utils/gscParser';
import { fetchUserGscSites, fetchSitePagesAnalytics } from './services/gscApi';
import { CityCanvas } from './components/city3d/CityCanvas';
import { Navbar } from './components/ui/Navbar';
import { BuildingInspector } from './components/ui/BuildingInspector';
import { MayorReport } from './components/ui/MayorReport';
import { LeaderboardModal } from './components/ui/LeaderboardModal';
import { GscConnectModal } from './components/ui/GscConnectModal';
import { WelcomeConnectHero } from './components/ui/WelcomeConnectHero';
import { TimeSlider } from './components/ui/TimeSlider';

export default function App() {
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    return localStorage.getItem('datacity_gsc_token') || null;
  });

  const [connectedSites, setConnectedSites] = useState<GscSiteEntry[]>([]);
  const [selectedSiteUrl, setSelectedSiteUrl] = useState<string | null>(null);

  const [sitePages, setSitePages] = useState<PageData[]>([]);
  const [isLoadingPages, setIsLoadingPages] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const [metricMode, setMetricMode] = useState<'clicks' | 'impressions'>('clicks');
  const [cameraPreset, setCameraPreset] = useState<'iso' | 'top' | 'drone'>('iso');

  const [selectedBuilding, setSelectedBuilding] = useState<Building3DState | null>(null);
  const [isMayorReportOpen, setIsMayorReportOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isGscConnectOpen, setIsGscConnectOpen] = useState(false);

  const [timeRatio, setTimeRatio] = useState<number>(1.0);

  // 1. Check for OAuth Access Token in URL hash on redirect (e.g. #access_token=ya29...)
  useEffect(() => {
    if (window.location.hash) {
      const params = new URLSearchParams(window.location.hash.substring(1));
      const token = params.get('access_token');
      if (token) {
        setAccessToken(token);
        localStorage.setItem('datacity_gsc_token', token);
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }, []);

  // 2. Fetch User Sites when Access Token is present
  useEffect(() => {
    if (!accessToken) {
      setConnectedSites([]);
      setSelectedSiteUrl(null);
      setSitePages([]);
      return;
    }

    let isMounted = true;

    async function loadSites() {
      try {
        setApiError(null);
        const sites = await fetchUserGscSites(accessToken!);
        if (isMounted) {
          setConnectedSites(sites);
          if (sites.length > 0) {
            setSelectedSiteUrl(sites[0].siteUrl);
          } else {
            setApiError('Aucun site validé trouvé dans votre compte Google Search Console.');
          }
        }
      } catch (err: any) {
        if (isMounted) {
          setApiError(err.message || 'Échec de connexion à la Search Console API.');
        }
      }
    }

    loadSites();

    return () => {
      isMounted = false;
    };
  }, [accessToken]);

  // 3. Fetch Real Analytics Data for Selected Site
  useEffect(() => {
    if (!accessToken || !selectedSiteUrl) {
      setSitePages([]);
      return;
    }

    let isMounted = true;

    async function loadAnalytics() {
      setIsLoadingPages(true);
      setApiError(null);
      try {
        const pages = await fetchSitePagesAnalytics(accessToken!, selectedSiteUrl!);
        if (isMounted) {
          setSitePages(pages);
          setSelectedBuilding(null);
        }
      } catch (err: any) {
        if (isMounted) {
          setApiError(err.message || 'Erreur lors du chargement des données du site.');
        }
      } finally {
        if (isMounted) setIsLoadingPages(false);
      }
    }

    loadAnalytics();

    return () => {
      isMounted = false;
    };
  }, [accessToken, selectedSiteUrl]);

  // 4. Apply time-travel scaling to page metrics
  const activePages: PageData[] = useMemo(() => {
    if (timeRatio === 1.0) return sitePages;

    return sitePages.map((p) => {
      const timeScale = 0.3 + (timeRatio * 0.7);
      return {
        ...p,
        currentMetrics: {
          ...p.currentMetrics,
          clicks: Math.round(p.currentMetrics.clicks * timeScale),
          impressions: Math.round(p.currentMetrics.impressions * timeScale),
        },
      };
    });
  }, [sitePages, timeRatio]);

  // 5. Compute 3D City Layout & Districts
  const { buildings, districts } = useMemo(() => {
    return generate3DCityLayout(activePages, metricMode);
  }, [activePages, metricMode]);

  // 6. Compute Summary Metrics & Mayor Alerts
  const citySummary = useMemo(() => {
    return calculateCitySummary(activePages);
  }, [activePages]);

  const mayorAlerts = useMemo(() => {
    return generateMayorAlerts(activePages);
  }, [activePages]);

  const handleDisconnect = () => {
    localStorage.removeItem('datacity_gsc_token');
    setAccessToken(null);
    setConnectedSites([]);
    setSelectedSiteUrl(null);
    setSitePages([]);
    setSelectedBuilding(null);
  };

  const isAnyModalOpen = isMayorReportOpen || isLeaderboardOpen || isGscConnectOpen || !accessToken;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-b from-amber-100 via-orange-50 to-amber-200">
      {/* Navbar HUD Overlay */}
      <Navbar
        connectedSites={connectedSites}
        selectedSiteUrl={selectedSiteUrl}
        onSelectSiteUrl={setSelectedSiteUrl}
        metricMode={metricMode}
        onToggleMetricMode={setMetricMode}
        cameraPreset={cameraPreset}
        onSelectCameraPreset={setCameraPreset}
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
        onOpenMayorReport={() => setIsMayorReportOpen(true)}
        onOpenGscConnect={() => setIsGscConnectOpen(true)}
        onDisconnect={handleDisconnect}
        alertCount={mayorAlerts.length}
        healthScore={citySummary.healthScore}
      />

      {/* Main 3D Canvas */}
      <CityCanvas
        buildings={buildings}
        districts={districts}
        selectedBuilding={selectedBuilding}
        onSelectBuilding={setSelectedBuilding}
        cameraPreset={cameraPreset}
        hide3DLabels={isAnyModalOpen}
      />

      {/* Loading & Error Status Overlay */}
      {isLoadingPages && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-40 bg-white/90 border border-amber-300 rounded-full px-5 py-2 shadow-lg backdrop-blur-md flex items-center gap-3 text-xs font-bold text-slate-800 animate-pulse">
          <div className="w-3 h-3 rounded-full bg-orange-600 animate-ping" />
          <span>Génération de la ville 3D depuis Google Search Console...</span>
        </div>
      )}

      {apiError && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-40 bg-red-50 border border-red-300 rounded-2xl px-5 py-3 shadow-lg text-xs text-red-900 font-medium max-w-md text-center">
          <span className="font-bold block mb-1">Avertissement API :</span>
          {apiError}
        </div>
      )}

      {/* Time Travel Slider */}
      {accessToken && sitePages.length > 0 && (
        <TimeSlider onDateRangeChange={setTimeRatio} />
      )}

      {/* Building Details Inspector Drawer */}
      <BuildingInspector
        building={selectedBuilding}
        onClose={() => setSelectedBuilding(null)}
      />

      {/* Mayor's Report Modal */}
      <MayorReport
        isOpen={isMayorReportOpen}
        onClose={() => setIsMayorReportOpen(false)}
        alerts={mayorAlerts}
        summary={citySummary}
      />

      {/* Leaderboard Modal ("Mur des Villes") */}
      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
        onConnectGsc={() => setIsGscConnectOpen(true)}
      />

      {/* GSC Connection Modal */}
      <GscConnectModal
        isOpen={isGscConnectOpen}
        onClose={() => setIsGscConnectOpen(false)}
        onConnectSuccess={() => setIsGscConnectOpen(false)}
      />

      {/* Welcome Google Connect Hero Overlay (when no account connected) */}
      {!accessToken && (
        <WelcomeConnectHero
          onConnectToken={(token) => {
            setAccessToken(token);
            localStorage.setItem('datacity_gsc_token', token);
          }}
        />
      )}
    </div>
  );
}
