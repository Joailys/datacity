import React from 'react';
import { X, Trophy, ExternalLink, Globe, Sparkles } from 'lucide-react';
import { mockLeaderboardCities } from '../../data/mockGscData';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnectGsc: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({ isOpen, onClose, onConnectGsc }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-amber-950/40 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-3xl bg-white border border-amber-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-6 border-b border-amber-100 flex items-center justify-between bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-xl text-slate-900">Le Mur des Villes DataCity</h2>
              <p className="text-xs text-slate-600 font-medium">Les plus grandes métropoles SEO classées par trafic et rendement</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-amber-100/60 text-slate-600 hover:text-slate-900 hover:bg-amber-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Top Banner CTA */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-100/80 via-orange-100/60 to-amber-50 border border-amber-300/80 flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                <Sparkles className="w-4 h-4 text-orange-600" />
                Votre ville sur le Mur des Villes ?
              </div>
              <p className="text-xs text-slate-700 font-medium">
                Connectez votre Search Console en 2 minutes pour faire apparaître votre métropole 3D et obtenir un lien dofollow.
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onConnectGsc();
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs font-bold shadow-md hover:brightness-110 transition-all"
            >
              Classer Ma Ville Gratuitement
            </button>
          </div>

          {/* Leaderboard Table */}
          <div className="rounded-2xl border border-amber-200 overflow-hidden bg-amber-50/40 divide-y divide-amber-100">
            <div className="grid grid-cols-12 p-3 text-[11px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100/80">
              <div className="col-span-1 text-center">Rang</div>
              <div className="col-span-4">Métropole / Domaine</div>
              <div className="col-span-3 text-right">Visiteurs 28j</div>
              <div className="col-span-2 text-right">Tours</div>
              <div className="col-span-2 text-right">Score SEO</div>
            </div>

            {mockLeaderboardCities.map((city, rank) => (
              <div key={city.id} className="grid grid-cols-12 p-4 items-center text-xs hover:bg-white transition-colors">
                <div className="col-span-1 text-center font-extrabold font-mono text-orange-600 text-sm">
                  #{rank + 1}
                </div>
                <div className="col-span-4 space-y-0.5">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    {city.name}
                    <a
                      href={`https://${city.domain}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-orange-600"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="text-[10px] text-slate-500 flex items-center gap-1">
                    <Globe className="w-3 h-3 text-slate-400" />
                    {city.domain} • <span className="text-orange-700 font-bold">{city.category}</span>
                  </div>
                </div>
                <div className="col-span-3 text-right font-mono font-bold text-slate-800">
                  {city.visitors28d.toLocaleString()}
                </div>
                <div className="col-span-2 text-right font-mono text-slate-600">
                  {city.pageCount} pages
                </div>
                <div className="col-span-2 text-right font-mono font-bold text-emerald-700">
                  {city.score}/100
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
