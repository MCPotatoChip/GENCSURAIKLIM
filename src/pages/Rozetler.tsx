//@ts-nocheck
import { useState, useEffect, useCallback } from "react";
import { useTheme } from "../App";
import { getAllBadges, type Badge } from "../hooks/useBadges";

const colorMap: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  emerald: { bg: 'bg-emerald-500/20', border: 'border-emerald-500/40', text: 'text-emerald-400', glow: 'shadow-[0_0_20px_rgba(16,185,129,0.3)]' },
  blue:    { bg: 'bg-blue-500/20',    border: 'border-blue-500/40',    text: 'text-blue-400',    glow: 'shadow-[0_0_20px_rgba(59,130,246,0.3)]' },
  yellow:  { bg: 'bg-yellow-500/20',  border: 'border-yellow-500/40',  text: 'text-yellow-400',  glow: 'shadow-[0_0_20px_rgba(234,179,8,0.3)]' },
  purple:  { bg: 'bg-purple-500/20',  border: 'border-purple-500/40',  text: 'text-purple-400',  glow: 'shadow-[0_0_20px_rgba(168,85,247,0.3)]' },
  teal:    { bg: 'bg-teal-500/20',    border: 'border-teal-500/40',    text: 'text-teal-400',    glow: 'shadow-[0_0_20px_rgba(20,184,166,0.3)]' },
  orange:  { bg: 'bg-orange-500/20',  border: 'border-orange-500/40',  text: 'text-orange-400',  glow: 'shadow-[0_0_20px_rgba(249,115,22,0.3)]' },
  green:   { bg: 'bg-green-500/20',   border: 'border-green-500/40',   text: 'text-green-400',   glow: 'shadow-[0_0_20px_rgba(34,197,94,0.3)]' },
  cyan:    { bg: 'bg-cyan-500/20',    border: 'border-cyan-500/40',    text: 'text-cyan-400',    glow: 'shadow-[0_0_20px_rgba(6,182,212,0.3)]' },
  lime:    { bg: 'bg-lime-500/20',    border: 'border-lime-500/40',    text: 'text-lime-400',    glow: 'shadow-[0_0_20px_rgba(132,204,22,0.3)]' },
  amber:   { bg: 'bg-amber-500/20',   border: 'border-amber-500/40',   text: 'text-amber-400',   glow: 'shadow-[0_0_20px_rgba(245,158,11,0.3)]' },
  rose:    { bg: 'bg-rose-500/20',    border: 'border-rose-500/40',    text: 'text-rose-400',    glow: 'shadow-[0_0_20px_rgba(244,63,94,0.3)]' },
  gold:    { bg: 'bg-yellow-400/20',  border: 'border-yellow-400/50',  text: 'text-yellow-300',  glow: 'shadow-[0_0_30px_rgba(250,204,21,0.5)]' },
};

export default function Rozetler() {
  const { lang } = useTheme();
  const [badges, setBadges] = useState<Badge[]>([]);
  const [filter, setFilter] = useState<'all' | 'earned' | 'locked'>('all');

  const refresh = useCallback(() => setBadges(getAllBadges()), []);

  useEffect(() => {
    refresh();
    window.addEventListener('badge_earned', refresh);
    return () => window.removeEventListener('badge_earned', refresh);
  }, [refresh]);

  const text = lang === 'tr' ? {
    title1: 'Rozet', title2: 'Koleksiyonu',
    desc: 'Platform üzerinde eylemler gerçekleştirerek rozetler kazan. Her rozet farklı bir başarıyı temsil eder.',
    earned: 'Kazanıldı', locked: 'Kilitli', all: 'Tümü',
    progress: 'İlerleme',
    earnedOn: 'Kazanılma tarihi',
    howToEarn: 'Nasıl kazanılır?',
    empty: 'Bu filtrede henüz rozet yok.',
    complete: 'Tüm rozetleri topladın! Efsanesin 🏆',
  } : {
    title1: 'Badge', title2: 'Collection',
    desc: 'Earn badges by performing actions on the platform. Each badge represents a different achievement.',
    earned: 'Earned', locked: 'Locked', all: 'All',
    progress: 'Progress',
    earnedOn: 'Earned on',
    howToEarn: 'How to earn?',
    empty: 'No badges in this filter yet.',
    complete: 'You collected all badges! Legendary 🏆',
  };

  const filtered = badges.filter(b =>
    filter === 'all' ? true : filter === 'earned' ? b.earned : !b.earned
  );
  const earnedCount = badges.filter(b => b.earned).length;
  const totalCount = badges.length;

  return (
    <div className="w-full">
      <main className="pt-24 pb-20 px-6 max-w-5xl mx-auto">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 font-headline">
            {text.title1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-300">{text.title2}</span>
          </h1>
          <p className="text-lg text-on-surface-variant max-w-2xl">{text.desc}</p>
        </header>

        {/* Progress Bar */}
        <div className="glass-card rounded-2xl p-6 border border-yellow-500/20 mb-8 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0 text-center">
            <div className="text-5xl font-black text-yellow-300 font-headline">{earnedCount}</div>
            <div className="text-xs font-bold uppercase tracking-widest text-yellow-500/60">/ {totalCount} {text.progress}</div>
          </div>
          <div className="flex-1 w-full">
            <div className="h-4 bg-black/40 rounded-full overflow-hidden border border-yellow-900/30">
              <div
                className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-amber-400 transition-all duration-700"
                style={{ width: `${(earnedCount / totalCount) * 100}%` }}
              />
            </div>
            {earnedCount === totalCount && (
              <p className="text-yellow-300 font-bold text-sm mt-2">{text.complete}</p>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          {(['all', 'earned', 'locked'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-bold border transition-all ${filter === f ? 'bg-yellow-500/20 border-yellow-400/50 text-yellow-300' : 'border-transparent text-on-surface-variant hover:text-on-surface'}`}>
              {f === 'all' ? text.all : f === 'earned' ? text.earned : text.locked}
            </button>
          ))}
        </div>

        {/* Badge Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-on-surface-variant">{text.empty}</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filtered.map(badge => {
              const c = colorMap[badge.color] ?? colorMap.emerald;
              const name = lang === 'tr' ? badge.nameTR : badge.nameEN;
              const desc = lang === 'tr' ? badge.descTR : badge.descEN;
              return (
                <div
                  key={badge.id}
                  className={`relative flex flex-col items-center gap-3 p-5 rounded-2xl border transition-all group
                    ${badge.earned
                      ? `${c.bg} ${c.border} ${c.glow}`
                      : 'bg-black/20 border-outline-variant/10 grayscale opacity-50'
                    }`}
                >
                  {badge.earned && (
                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.8)]" />
                  )}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${badge.earned ? c.bg : 'bg-black/20'} border ${c.border}`}>
                    <span className={`material-symbols-outlined text-3xl ${badge.earned ? c.text : 'text-on-surface-variant'}`}
                      style={{ fontVariationSettings: "'FILL' 1" }}>
                      {badge.icon}
                    </span>
                  </div>
                  <div className="text-center">
                    <div className={`text-sm font-black ${badge.earned ? c.text : 'text-on-surface-variant'}`}>{name}</div>
                    <div className="text-[10px] text-on-surface-variant mt-1 leading-tight">{desc}</div>
                    {badge.earned && badge.earnedAt && (
                      <div className="text-[9px] text-on-surface-variant/50 mt-2">
                        {text.earnedOn}: {new Date(badge.earnedAt).toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-US')}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
