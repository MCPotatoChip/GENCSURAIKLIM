import { useEffect, useState } from "react";
import { RankInfo } from "../hooks/useBadges";

interface RankUpPopupProps {
  currentRank: RankInfo;
  prevRank: RankInfo | null;
  lang: 'tr' | 'en';
  onClose: () => void;
}

export default function RankUpPopup({ currentRank, prevRank, lang, onClose }: RankUpPopupProps) {
  const [stage, setStage] = useState<'intro' | 'flash' | 'reveal'>('intro');

  useEffect(() => {
    // Stage 1: Intro (Show previous rank or just start if no previous)
    const t1 = setTimeout(() => {
      setStage('flash');
    }, 1500);

    // Stage 2: Flash (Bright white cover)
    const t2 = setTimeout(() => {
      setStage('reveal');
    }, 2000);

    // Auto close after reveal
    const t3 = setTimeout(() => {
      onClose();
    }, 6000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [currentRank, onClose]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md animate-fade-in" onClick={onClose} />

      {/* Confetti or Particles could go here */}

      {/* Main Container */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        
        {stage === 'intro' && (
          <div className="animate-fade-in-up flex flex-col items-center gap-4">
            <h2 className="text-xl md:text-3xl font-black text-on-surface uppercase tracking-widest">
              {lang === 'tr' ? 'Rütbe Atlanıyor...' : 'Ranking Up...'}
            </h2>
            {prevRank ? (
               <div className={`w-32 h-32 md:w-48 md:h-48 rounded-full flex items-center justify-center bg-gradient-to-br ${prevRank.colorClass} border-4 border-white/20`}>
                 <span className="material-symbols-outlined text-[64px] md:text-[96px] text-white" style={{ fontVariationSettings: "'FILL' 1" }}>{prevRank.icon}</span>
               </div>
            ) : (
               <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-outline-variant/50 border-dashed animate-spin-slow"></div>
            )}
            {prevRank && (
              <p className="text-lg font-bold text-on-surface-variant uppercase tracking-widest mt-2">{prevRank.nameTR}</p>
            )}
          </div>
        )}

        {stage === 'flash' && (
          <div className="fixed inset-0 bg-white z-50 animate-flash pointer-events-none"></div>
        )}

        {stage === 'reveal' && (
          <div className="animate-rank-pop flex flex-col items-center gap-6">
            <div className="text-center mb-4">
              <h2 className="text-2xl md:text-5xl font-black text-white uppercase tracking-widest drop-shadow-xl animate-fade-in-up">
                {lang === 'tr' ? 'YENİ RÜTBE!' : 'NEW RANK!'}
              </h2>
            </div>
            
            <div className={`relative w-48 h-48 md:w-64 md:h-64 rounded-full flex items-center justify-center bg-gradient-to-br ${currentRank.colorClass} border-4 border-white animate-pulse-glow`}>
              <span className="material-symbols-outlined text-[80px] md:text-[120px] text-white" style={{ fontVariationSettings: "'FILL' 1" }}>
                {currentRank.icon}
              </span>
            </div>

            <div className="text-center mt-4">
              <h1 className="text-4xl md:text-6xl font-black text-white drop-shadow-2xl uppercase tracking-tighter">
                {lang === 'tr' ? currentRank.nameTR : currentRank.nameEN}
              </h1>
              <p className="text-on-surface-variant font-bold mt-2 uppercase tracking-widest">
                {lang === 'tr' ? 'İklim mücadelesinde yeni bir adım!' : 'A new step in climate action!'}
              </p>
            </div>

            <button onClick={onClose} className="mt-8 px-8 py-3 rounded-full bg-white text-black font-black uppercase tracking-widest hover:scale-105 transition-transform">
              {lang === 'tr' ? 'Devam Et' : 'Continue'}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
