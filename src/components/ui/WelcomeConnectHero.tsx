import React, { useState } from 'react';
import { Key, ShieldCheck, ArrowRight, ExternalLink, Building2, Settings, Zap } from 'lucide-react';

interface WelcomeConnectHeroProps {
  onConnectToken: (accessToken: string) => void;
}

export const WelcomeConnectHero: React.FC<WelcomeConnectHeroProps> = ({
  onConnectToken,
}) => {
  const [customClientId, setCustomClientId] = useState(() => {
    return localStorage.getItem('datacity_google_client_id') || import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
  });

  const [showConfigModal, setShowConfigModal] = useState(false);
  const [manualTokenInput, setManualTokenInput] = useState('');

  const activeClientId = customClientId || import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

  const handleGoogleRedirect = () => {
    if (!activeClientId) {
      setShowConfigModal(true);
      return;
    }

    const redirectUri = window.location.origin;
    const scope = 'https://www.googleapis.com/auth/webmasters.readonly';
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(
      activeClientId.trim()
    )}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=token&scope=${encodeURIComponent(scope)}&prompt=select_account`;

    window.location.href = authUrl;
  };

  const handleSaveClientId = (e: React.FormEvent) => {
    e.preventDefault();
    if (customClientId.trim()) {
      localStorage.setItem('datacity_google_client_id', customClientId.trim());
      setShowConfigModal(false);
      handleGoogleRedirect();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-amber-950/60 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="w-full max-w-xl bg-white border border-amber-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header Hero */}
        <div className="p-8 border-b border-amber-100 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-orange-500/30">
            <Building2 className="w-9 h-9 stroke-[2.5]" />
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 leading-tight">
            DataCity · Google Search Console 3D
          </h1>
          <p className="text-sm text-slate-700 max-w-md mx-auto font-medium leading-relaxed">
            Connectez votre compte Google en 1 clic pour afficher vos sites validés en métropoles 3D.
          </p>
        </div>

        {/* Action Body */}
        <div className="p-8 space-y-6">
          {/* Security guarantee */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-start gap-3 text-xs">
            <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold text-emerald-950">Accès Sécurisé Officiel Google</span>
              <p className="text-emerald-800 font-medium">
                Redirection directe sur la mire officielle Google (<code className="text-[10px] bg-emerald-100 px-1.5 py-0.5 rounded text-emerald-900 font-bold">webmasters.readonly</code>).
              </p>
            </div>
          </div>

          {/* Main Direct Google Login Button */}
          <div className="space-y-3">
            <button
              onClick={handleGoogleRedirect}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white font-extrabold text-base shadow-xl shadow-orange-500/25 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
            >
              <Key className="w-5 h-5" />
              <span>Accéder à la Page de Connexion Google</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-center text-[11px] text-slate-500 font-medium">
              Redirection instantanée vers accounts.google.com
            </p>
          </div>

          {/* Configuration box if Client ID is missing */}
          {(!activeClientId || showConfigModal) && (
            <form onSubmit={handleSaveClientId} className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-3 text-xs animate-in slide-in-from-top duration-200">
              <div className="font-bold text-slate-900 flex items-center justify-between">
                <span>Configuration initiale de l'ID Client Google OAuth</span>
                <Settings className="w-4 h-4 text-orange-600" />
              </div>
              <p className="text-slate-700 leading-relaxed">
                Google exige que chaque application s'identifie avec un <strong>Client ID Google Cloud</strong> pour autoriser la redirection vers <code className="text-orange-700 font-bold">accounts.google.com</code>.
              </p>
              <input
                type="text"
                placeholder="ex: 123456789-abc.apps.googleusercontent.com"
                value={customClientId}
                onChange={(e) => setCustomClientId(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-amber-300 text-slate-900 font-mono text-xs focus:outline-none focus:border-orange-500"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-orange-600 text-white font-bold text-xs hover:bg-orange-700 transition-colors shadow-md"
              >
                Enregistrer & Rediriger vers Google
              </button>
            </form>
          )}

          {/* Quick OAuth Playground Test Option */}
          <div className="p-4 rounded-2xl bg-orange-50/80 border border-orange-200 space-y-2 text-xs">
            <div className="font-bold text-orange-950 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-orange-600" />
              <span>Test Instantané sans créer de projet Google Cloud (10 sec)</span>
            </div>
            <p className="text-slate-700 text-[11px]">
              Générez un jeton d'accès temporaire Google Search Console en 2 clics sur Google OAuth Playground :
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Collez le token ja29..."
                value={manualTokenInput}
                onChange={(e) => setManualTokenInput(e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-lg bg-white border border-orange-200 text-xs font-mono"
              />
              <button
                onClick={() => {
                  if (manualTokenInput.trim()) onConnectToken(manualTokenInput.trim());
                }}
                disabled={!manualTokenInput}
                className="px-3 py-1.5 rounded-lg bg-orange-600 text-white font-bold text-xs hover:bg-orange-700 disabled:opacity-50"
              >
                Charger
              </button>
            </div>
            <a
              href="https://developers.google.com/oauthplayground/#step1&apisSelect=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fwebmasters.readonly"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-orange-700 font-bold hover:underline inline-flex items-center gap-1 pt-1"
            >
              <span>Obtenir mon token d'accès sur Google OAuth Playground</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Footer links */}
          <div className="flex flex-wrap items-center justify-between text-xs pt-2 gap-2 border-t border-amber-100 text-slate-600">
            <button
              onClick={() => setShowConfigModal(!showConfigModal)}
              className="text-orange-700 font-bold hover:underline flex items-center gap-1"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>{activeClientId ? 'Modifier ID Client OAuth' : 'Ajouter ID Client Google'}</span>
            </button>

            <a
              href="https://console.cloud.google.com/apis/credentials"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 flex items-center gap-1 font-semibold"
            >
              <span>Console Google Cloud (GCP)</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
