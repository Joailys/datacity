import React from 'react';
import { Building2, Trophy, ScrollText, Key, Layers, Activity, Globe, LogOut, ChevronDown } from 'lucide-react';
import type { GscSiteEntry } from '../../types/seo';

interface NavbarProps {
  connectedSites: GscSiteEntry[];
  selectedSiteUrl: string | null;
  onSelectSiteUrl: (siteUrl: string) => void;
  metricMode: 'clicks' | 'impressions';
  onToggleMetricMode: (mode: 'clicks' | 'impressions') => void;
  onOpenLeaderboard: () => void;
  onOpenMayorReport: () => void;
  onOpenGscConnect: () => void;
  onDisconnect: () => void;
  alertCount: number;
  healthScore: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  connectedSites,
  selectedSiteUrl,
  onSelectSiteUrl,
  metricMode,
  onToggleMetricMode,
  onOpenLeaderboard,
  onOpenMayorReport,
  onOpenGscConnect,
  onDisconnect,
  alertCount,
  healthScore,
}) => {
  return (
    <header className="absolute top-4 left-4 right-4 z-40 flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
      {/* Brand & Site Switcher */}
      <div className="flex items-center gap-3 bg-white/95 border border-amber-200/90 rounded-2xl px-4 py-2.5 shadow-xl shadow-orange-950/5 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center font-extrabold shadow-md shadow-orange-500/20">
            <Building2 className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="font-heading font-extrabold text-lg text-slate-900 leading-none tracking-tight flex items-center gap-1.5">
              DataCity
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-orange-100 text-orange-900 border border-orange-300">
                GSC 3D
              </span>
            </h1>
            <p className="text-[11px] text-amber-900/70 font-medium leading-tight">Search Console en Ville Automnale</p>
          </div>
        </div>

        <div className="h-6 w-px bg-amber-200 mx-1 hidden sm:block" />

        {/* Real GSC Multi-Site Dropdown Selector */}
        {connectedSites.length > 0 ? (
          <div className="relative flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-xl px-3 py-1.5">
            <Globe className="w-4 h-4 text-orange-600 flex-shrink-0" />
            <select
              value={selectedSiteUrl || ''}
              onChange={(e) => onSelectSiteUrl(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-900 focus:outline-none cursor-pointer pr-4 appearance-none"
            >
              {connectedSites.map((site) => (
                <option key={site.siteUrl} value={site.siteUrl}>
                  {site.displayName}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 pointer-events-none absolute right-2" />
          </div>
        ) : (
          <button
            onClick={onOpenGscConnect}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100 text-amber-950 text-xs font-bold hover:bg-amber-200 transition-colors"
          >
            <Key className="w-3.5 h-3.5 text-orange-600" />
            <span>Connecter un site Google</span>
          </button>
        )}
      </div>

      {/* Center Controls: Metrics & Camera */}
      <div className="hidden md:flex items-center gap-2 bg-white/95 border border-amber-200/90 rounded-2xl px-3 py-2 shadow-xl shadow-orange-950/5 backdrop-blur-xl">
        {/* Clicks vs Impressions */}
        <div className="flex items-center gap-1 bg-amber-50/80 p-1 rounded-xl border border-amber-200/60">
          <button
            onClick={() => onToggleMetricMode('clicks')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              metricMode === 'clicks'
                ? 'bg-orange-600 text-white font-bold shadow-sm'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            Mode Clics
          </button>
          <button
            onClick={() => onToggleMetricMode('impressions')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              metricMode === 'impressions'
                ? 'bg-orange-600 text-white font-bold shadow-sm'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Mode Impressions
          </button>
        </div>
      </div>

      {/* Right Action Buttons */}
      <div className="flex items-center gap-2">
        {/* Mayor Report */}
        <button
          onClick={onOpenMayorReport}
          className="relative flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/95 border border-amber-200/90 text-xs font-bold text-slate-800 hover:text-slate-900 hover:bg-amber-50 shadow-xl backdrop-blur-xl transition-all"
        >
          <ScrollText className="w-4 h-4 text-amber-600" />
          <span className="hidden sm:inline">Rapport du Maire</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300">
            {healthScore}/100
          </span>
          {alertCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-orange-600 text-white text-[10px] font-extrabold flex items-center justify-center shadow-md animate-bounce">
              {alertCount}
            </span>
          )}
        </button>

        {/* Mur des Villes Leaderboard */}
        <button
          onClick={onOpenLeaderboard}
          className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/95 border border-amber-200/90 text-xs font-bold text-slate-800 hover:text-slate-900 hover:bg-amber-50 shadow-xl backdrop-blur-xl transition-all"
        >
          <Trophy className="w-4 h-4 text-amber-500" />
          <span className="hidden sm:inline">Mur des Villes</span>
        </button>

        {/* Connect / Manage Account Button */}
        {connectedSites.length > 0 ? (
          <button
            onClick={onDisconnect}
            title="Se déconnecter de Google Search Console"
            className="p-2 rounded-2xl bg-white/95 border border-amber-200/90 text-slate-600 hover:text-red-600 hover:bg-red-50 shadow-xl transition-all"
          >
            <LogOut className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={onOpenGscConnect}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white text-xs font-bold shadow-lg shadow-orange-500/20 hover:brightness-110 active:scale-95 transition-all"
          >
            <Key className="w-4 h-4" />
            <span>Connecter Google</span>
          </button>
        )}
      </div>
    </header>
  );
};
