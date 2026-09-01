import React from 'react';
import { X, ShieldAlert, Sparkles, TrendingDown, Award, AlertCircle } from 'lucide-react';
import type { MayorAlert, CityMetricsSummary } from '../../types/seo';

interface MayorReportProps {
  isOpen: boolean;
  onClose: () => void;
  alerts: MayorAlert[];
  summary: CityMetricsSummary;
}

export const MayorReport: React.FC<MayorReportProps> = ({ isOpen, onClose, alerts, summary }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-amber-950/40 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white border border-amber-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-6 border-b border-amber-100 flex items-center justify-between bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-600">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-xl text-slate-900">Le Rapport du Maire DataCity</h2>
              <p className="text-xs text-slate-600 font-medium">Diagnostics et opportunités d'urbanisme SEO en temps réel</p>
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
          {/* Health Score Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-100/60 border border-amber-200/80 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs text-slate-600 font-bold uppercase tracking-wider">Indice de Santé Globale de la Ville</span>
              <div className="text-3xl font-extrabold font-heading text-slate-900 flex items-center gap-2">
                <span>{summary.healthScore}</span>
                <span className="text-sm font-normal text-slate-500">/ 100</span>
              </div>
              <p className="text-xs text-slate-700 font-medium">
                {summary.healthScore >= 80
                  ? 'Excellente métropole SEO. La majorité de vos bâtiments règnent en Top 10.'
                  : 'Ville en plein développement. Quelques pavillons et immeubles nécessitent un coup de pouce (Title/CTR).'}
              </p>
            </div>
            <div className="w-20 h-20 rounded-full border-4 border-orange-500/30 flex items-center justify-center relative flex-shrink-0">
              <div
                className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-600 font-extrabold font-mono text-xl"
              >
                {summary.healthScore}%
              </div>
            </div>
          </div>

          {/* Alerts List */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
              Alertes & Recommandations du Maire ({alerts.length})
            </h3>

            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    alert.type === 'opportunity'
                      ? 'bg-amber-50/80 border-amber-200 text-slate-900'
                      : alert.type === 'warning'
                      ? 'bg-orange-50/80 border-orange-200 text-slate-900'
                      : alert.type === 'success'
                      ? 'bg-emerald-50/80 border-emerald-200 text-slate-900'
                      : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-white flex-shrink-0 mt-0.5 shadow-sm border border-amber-100">
                      {alert.type === 'opportunity' && <Sparkles className="w-5 h-5 text-orange-600" />}
                      {alert.type === 'warning' && <TrendingDown className="w-5 h-5 text-amber-600" />}
                      {alert.type === 'success' && <Award className="w-5 h-5 text-emerald-600" />}
                      {alert.type === 'alert' && <AlertCircle className="w-5 h-5 text-slate-600" />}
                    </div>
                    <div className="space-y-1 overflow-hidden">
                      <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                        {alert.title}
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold uppercase ${
                          alert.impact === 'high' ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-amber-100 text-amber-900'
                        }`}>
                          Impact {alert.impact}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed text-slate-700 font-medium">{alert.description}</p>
                      {alert.affectedUrl && (
                        <div className="text-[11px] font-mono text-orange-700 font-bold truncate pt-1">
                          URL ciblée: {alert.affectedUrl}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
