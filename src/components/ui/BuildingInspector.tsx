import React from 'react';
import { X, ExternalLink, TrendingUp, Eye, MousePointerClick, Search, Sparkles, Home, Building, Building2 as TowerIcon, Landmark } from 'lucide-react';
import type { Building3DState } from '../../types/seo';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface BuildingInspectorProps {
  building: Building3DState | null;
  onClose: () => void;
}

export const BuildingInspector: React.FC<BuildingInspectorProps> = ({ building, onClose }) => {
  if (!building) return null;

  const { pageData, stage, level } = building;
  const { currentMetrics, topKeywords, history } = pageData;

  const stageLabel =
    stage === 'house' ? 'Maison Individuelle' : stage === 'building' ? 'Immeuble R+4' : stage === 'tower' ? 'Tour Commerciale' : 'Gratte-ciel Megatower';

  const chartData = history.length > 0 ? history.map((h) => ({
    date: h.date.slice(5),
    clicks: h.metrics.clicks,
    impressions: h.metrics.impressions,
  })) : [
    { date: 'J-28', clicks: Math.round(currentMetrics.clicks * 0.7), impressions: Math.round(currentMetrics.impressions * 0.7) },
    { date: 'J-14', clicks: Math.round(currentMetrics.clicks * 0.85), impressions: Math.round(currentMetrics.impressions * 0.85) },
    { date: 'J-1', clicks: currentMetrics.clicks, impressions: currentMetrics.impressions },
  ];

  return (
    <div className="fixed top-20 right-4 bottom-24 z-50 w-full max-w-md bg-white/95 border border-amber-200/90 rounded-3xl shadow-2xl backdrop-blur-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="p-5 border-b border-amber-100 flex items-start justify-between gap-3 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="space-y-1 overflow-hidden">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
              {pageData.district}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-100 text-orange-950 border border-orange-300 flex items-center gap-1">
              {stage === 'house' && <Home className="w-3 h-3 text-orange-600" />}
              {stage === 'building' && <Building className="w-3 h-3 text-orange-600" />}
              {stage === 'tower' && <TowerIcon className="w-3 h-3 text-orange-600" />}
              {stage === 'skyscraper' && <Landmark className="w-3 h-3 text-orange-600" />}
              Niv.{level} • {stageLabel}
            </span>
          </div>
          <h2 className="font-heading font-extrabold text-lg text-slate-900 truncate leading-tight">
            {pageData.title}
          </h2>
          <a
            href={pageData.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-orange-600 truncate max-w-full transition-colors"
          >
            <span className="truncate">{pageData.path}</span>
            <ExternalLink className="w-3 h-3 flex-shrink-0" />
          </a>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-xl bg-amber-100/60 text-slate-600 hover:text-slate-900 hover:bg-amber-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Body Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80">
            <div className="flex items-center gap-2 text-slate-600 text-xs mb-1 font-medium">
              <MousePointerClick className="w-4 h-4 text-orange-600" />
              <span>Clics (28j)</span>
            </div>
            <div className="text-2xl font-bold font-mono text-slate-900">
              {currentMetrics.clicks.toLocaleString()}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80">
            <div className="flex items-center gap-2 text-slate-600 text-xs mb-1 font-medium">
              <Eye className="w-4 h-4 text-amber-600" />
              <span>Impressions</span>
            </div>
            <div className="text-2xl font-bold font-mono text-slate-900">
              {currentMetrics.impressions.toLocaleString()}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80">
            <div className="flex items-center gap-2 text-slate-600 text-xs mb-1 font-medium">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>Taux de Clic (CTR)</span>
            </div>
            <div className="text-2xl font-bold font-mono text-emerald-700">
              {currentMetrics.ctr}%
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80">
            <div className="flex items-center gap-2 text-slate-600 text-xs mb-1 font-medium">
              <Search className="w-4 h-4 text-purple-600" />
              <span>Pos. Moyenne</span>
            </div>
            <div className="text-2xl font-bold font-mono text-purple-700">
              #{currentMetrics.position}
            </div>
          </div>
        </div>

        {/* Historical Evolution Chart */}
        <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800">
            <span>Évolution des Clics dans le Temps</span>
            <span className="text-[10px] text-orange-700 font-mono font-bold">28 derniers jours</span>
          </div>
          <div className="h-32 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ea580c" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#ea580c" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff7ed', borderColor: '#fed7aa', borderRadius: '12px', fontSize: '12px', color: '#1e293b' }}
                />
                <Area type="monotone" dataKey="clicks" stroke="#ea580c" strokeWidth={2.5} fillOpacity={1} fill="url(#colorClicks)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Keywords Table */}
        {topKeywords && topKeywords.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800">
              <span className="flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-orange-600" />
                Mots-clés / Requêtes Clés
              </span>
              <span className="text-[10px] text-slate-500 font-mono font-bold">{topKeywords.length} requêtes</span>
            </div>
            <div className="rounded-2xl border border-amber-200/80 overflow-hidden divide-y divide-amber-100 bg-white">
              {topKeywords.map((kw, i) => (
                <div key={i} className="p-3 flex items-center justify-between gap-2 text-xs hover:bg-amber-50/60 transition-colors">
                  <div className="space-y-0.5 overflow-hidden">
                    <div className="font-semibold text-slate-900 truncate">{kw.query}</div>
                    <div className="text-[10px] text-slate-500">
                      {kw.impressions.toLocaleString()} imp. • CTR {kw.ctr}%
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-mono font-bold text-orange-600">{kw.clicks} clics</div>
                    <div className="text-[10px] text-emerald-700 font-mono font-bold">#{kw.position}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI Recommendations for Building */}
        <div className="p-4 rounded-2xl bg-amber-100/60 border border-amber-300/80 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
            <Sparkles className="w-4 h-4 text-orange-600" />
            Préconisation d'Urbanisme SEO
          </div>
          <p className="text-xs text-slate-800 leading-relaxed font-medium">
            {currentMetrics.clicks < 100
              ? 'Cette maison individuelle a un beau potentiel ! Publiez 2 articles complémentaires dans son quartier et intégrez un maillage interne pour la faire grandir en immeuble.'
              : currentMetrics.ctr < 3.0
              ? 'Le taux de clic est en dessous de la moyenne de la ville. Testez une nouvelle accroche dans votre balise Title pour booster sa hauteur !'
              : 'Excellente stabilité de ce bâtiment. Pour consolider sa position en Top 3, développez le linking vers les pages voisines.'}
          </p>
        </div>
      </div>
    </div>
  );
};
