import React, { useState } from 'react';
import { X, Key, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';

interface GscConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnectSuccess: (domainName: string) => void;
}

export const GscConnectModal: React.FC<GscConnectModalProps> = ({ isOpen, onClose, onConnectSuccess }) => {
  const [customDomain, setCustomDomain] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  if (!isOpen) return null;

  const handleSimulateOAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customDomain) return;
    setIsConnecting(true);

    setTimeout(() => {
      setIsConnecting(false);
      onConnectSuccess(customDomain.trim().toLowerCase());
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-amber-950/40 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-white border border-amber-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-amber-100 flex items-center justify-between bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-600">
              <Key className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-xl text-slate-900">Connexion Google Search Console</h2>
              <p className="text-xs text-slate-600 font-medium">Accès lecture seule (Read-Only) sécurisé par OAuth 2.0</p>
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
        <div className="p-6 space-y-6">
          {step === 1 ? (
            <div className="space-y-5">
              {/* Security guarantee */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3 text-xs">
                <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="font-bold text-emerald-950">Sécurité & Confidentialité Strictes</span>
                  <p className="text-emerald-800 font-medium">
                    DataCity demande uniquement l'autorisation d'accès en lecture seule à votre Search Console (<code className="text-[10px] text-emerald-900 font-bold bg-emerald-100 px-1 py-0.5 rounded">webmasters.readonly</code>). Aucune modification n'est apportée à vos données.
                  </p>
                </div>
              </div>

              {/* Form Input */}
              <form onSubmit={handleSimulateOAuth} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Nom de votre domaine ou site web
                  </label>
                  <input
                    type="text"
                    placeholder="ex: monsite.com ou https://monsite.com"
                    value={customDomain}
                    onChange={(e) => setCustomDomain(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-amber-50/50 border border-amber-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-orange-500 transition-colors font-medium"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isConnecting || !customDomain}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white font-bold text-sm shadow-lg shadow-orange-500/20 hover:brightness-110 active:scale-[0.98] disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                >
                  {isConnecting ? (
                    <span>Connexion à l'API Search Console en cours...</span>
                  ) : (
                    <>
                      <span>Se Connecter avec Google Search Console</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="pt-2 text-center">
                <button
                  onClick={() => setStep(2)}
                  className="text-xs text-orange-700 font-bold hover:underline inline-flex items-center gap-1"
                >
                  <span>Besoin d'instructions pour configurer l'ID OAuth Google Cloud ?</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4 text-xs">
              <h3 className="font-bold text-sm text-slate-900">Guide d'activation Google Cloud OAuth</h3>
              <ol className="space-y-2.5 text-slate-800 list-decimal list-inside bg-amber-50 p-4 rounded-2xl border border-amber-200 font-medium">
                <li>Rendez-vous sur la <strong>Google Cloud Console</strong> (<code className="text-orange-700 font-bold">console.cloud.google.com</code>).</li>
                <li>Activez l'API <strong>Google Search Console API</strong> dans la bibliothèque d'API.</li>
                <li>Allez dans <em>Identifiants</em> &gt; <em>Créer des Identifiants OAuth 2.0</em>.</li>
                <li>Ajoutez les origines JavaScript autorisées et ajoutez le scope <code className="text-emerald-800 font-bold">https://www.googleapis.com/auth/webmasters.readonly</code>.</li>
              </ol>

              <button
                onClick={() => setStep(1)}
                className="w-full py-2.5 rounded-xl bg-amber-100 text-slate-800 font-bold hover:bg-amber-200 transition-colors"
              >
                Retour au formulaire de connexion
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
