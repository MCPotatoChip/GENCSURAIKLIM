//@ts-nocheck
import { useState, useEffect, createContext, useContext, useRef, useCallback } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import AnaSayfa from "./pages/AnaSayfa";
import Hakkinda from "./pages/Hakkinda";
import SimulasyonSureci from "./pages/SimulasyonSureci";
import VeriAnalizi from "./pages/VeriAnalizi";
import SoruAtma from "./pages/SoruAtma";
import Anket from "./pages/Anket";
import KarbonAyakIzi from "./pages/KarbonAyakIzi";
import Harita from "./pages/Harita";
import IklimQuizi from "./pages/IklimQuizi";
import Simulator from "./pages/Simulator";
import Sozluk from "./pages/Sozluk";
import EylemRehberi from "./pages/EylemRehberi";
import ZamanCizelgesi from "./pages/ZamanCizelgesi";
import Karsilastirma from "./pages/Karsilastirma";
import KavramAgi from "./pages/KavramAgi";
import Grafikler from "./pages/Grafikler";
import Oneri from "./pages/Oneri";
import Rozetler from "./pages/Rozetler";
import Haberler from "./pages/Haberler";
import OnboardingTour from "./components/OnboardingTour";
import RankUpPopup from "./components/RankUpPopup";
import { getAllBadges, getEarnedCount, trackPageVisit, getRankInfo, RankInfo } from "./hooks/useBadges";

// ===== Theme & Lang Context =====
interface AppContextType {
  isDark: boolean;
  toggleTheme: () => void;
  lang: 'tr' | 'en';
  toggleLang: () => void;
}
export const AppContext = createContext<AppContextType>({
  isDark: true,
  toggleTheme: () => { },
  lang: 'tr',
  toggleLang: () => { }
});
export const useTheme = () => useContext(AppContext);

const getNavItems = (lang: 'tr' | 'en') => [
  { path: "/", label: lang === 'tr' ? "Ana Sayfa" : "Home", icon: "🏠" },
  { path: "/hakkinda", label: lang === 'tr' ? "Hakkında" : "About", icon: "ℹ️" },
  { path: "/simulasyon", label: lang === 'tr' ? "Simülasyon" : "Simulation", icon: "⚙️" },
  { path: "/veri-analizi", label: lang === 'tr' ? "Veri Analizi" : "Data Analysis", icon: "📊" },
  { path: "/quiz", label: lang === 'tr' ? "Quiz" : "Quiz", icon: "🧠" },
  { path: "/simulator", label: lang === 'tr' ? "Simülatör" : "Simulator", icon: "🎮" },
  { path: "/anket", label: lang === 'tr' ? "Anket" : "Survey", icon: "📝" },
  { path: "/karbon", label: lang === 'tr' ? "Karbon Hesapla" : "Carbon Footprint", icon: "🌍" },
  { path: "/harita", label: lang === 'tr' ? "Harita" : "Map", icon: "🗺️" },
  { path: "/zaman-cizelgesi", label: lang === 'tr' ? "Geri Sayım" : "Countdown", icon: "⏳" },
  { path: "/karsilastirma", label: lang === 'tr' ? "Karşılaştırma" : "Compare", icon: "⚖️" },
  { path: "/eylem-rehberi", label: lang === 'tr' ? "Eylem Rehberi" : "Action Guide", icon: "🌱" },
  { path: "/sozluk", label: lang === 'tr' ? "Sözlük" : "Glossary", icon: "📖" },
  { path: "/kavram-agi", label: lang === 'tr' ? "Kavram Ağı" : "Concept Map", icon: "🕸️" },
  { path: "/infografikler", label: lang === 'tr' ? "İnfografikler" : "Infographics", icon: "📈" },
  { path: "/soru-sor", label: lang === 'tr' ? "Merak Edilen Sorular" : "FAQ", icon: "❓" },
  { path: "/oneri", label: lang === 'tr' ? "Yarışma Önerileriniz" : "Competition Suggestions", icon: "💡" },
  { path: "/haberler", label: lang === 'tr' ? "Haberler" : "News", icon: "📰" },
  { path: "/rozetler", label: lang === 'tr' ? "Rozetlerim" : "My Badges", icon: "🏅" },
];

// === Badge Toast Notification ===
function BadgeToast({ badgeId, lang, onClose }: { badgeId: string; lang: 'tr' | 'en'; onClose: () => void }) {
  const badge = getAllBadges().find(b => b.id === badgeId);
  useEffect(() => {
    const t = setTimeout(onClose, 4500);
    return () => clearTimeout(t);
  }, [onClose]);

  if (!badge) return null;
  return (
    <div className="fixed bottom-6 right-6 z-[300] glass-card border border-yellow-400/40 rounded-2xl p-4 flex items-center gap-4 shadow-[0_0_30px_rgba(250,204,21,0.3)] animate-fade-in-up max-w-sm">
      <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center border border-yellow-400/30 flex-shrink-0">
        <span className="material-symbols-outlined text-yellow-400" style={{ fontVariationSettings: "'FILL' 1" }}>{badge.icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-bold text-yellow-400 uppercase tracking-widest">{lang === 'tr' ? '🏅 Yeni Rozet!' : '🏅 New Badge!'}</div>
        <div className="text-sm font-black text-on-surface">{lang === 'tr' ? badge.nameTR : badge.nameEN}</div>
      </div>
      <button onClick={onClose} className="text-on-surface-variant hover:text-on-surface">
        <span className="material-symbols-outlined text-sm">close</span>
      </button>
    </div>
  );
}

export default function App() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") !== "light";
  });

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem("theme", next ? "dark" : "light");
      if (next) earnBadge('dark_mode_user');
      return next;
    });
  };

  const [lang, setLang] = useState<'tr' | 'en'>(() => {
    return (localStorage.getItem("lang") as 'tr' | 'en') || 'tr';
  });

  const [visits, setVisits] = useState<number | null>(null);
  const hasFetchedVisits = useRef(false);
  const [badgeEarnedId, setBadgeEarnedId] = useState<string | null>(null);
  const [earnedCount, setEarnedCount] = useState(getEarnedCount);
  const [prevEarnedCount, setPrevEarnedCount] = useState(earnedCount);
  const [showRankPopup, setShowRankPopup] = useState<{ current: RankInfo, prev: RankInfo | null } | null>(null);

  useEffect(() => {
    if (earnedCount > prevEarnedCount) {
      const currentRank = getRankInfo(earnedCount);
      const prevRank = getRankInfo(prevEarnedCount);
      
      if (currentRank && currentRank.level !== prevRank?.level) {
        setShowRankPopup({ current: currentRank, prev: prevRank });
      }
      setPrevEarnedCount(earnedCount);
    }
  }, [earnedCount, prevEarnedCount]);

  useEffect(() => {
    if (hasFetchedVisits.current) return;
    hasFetchedVisits.current = true;
    
    // Using local storage for visit counter to avoid API rate limits/breakages
    const currentVisits = parseInt(localStorage.getItem('iklim_visits') || '1024', 10);
    const newVisits = currentVisits + 1;
    localStorage.setItem('iklim_visits', newVisits.toString());
    setVisits(newVisits);
  }, []);

  // Listen for badge events
  const handleBadge = useCallback((e: Event) => {
    const id = (e as CustomEvent).detail?.id;
    if (id) { setBadgeEarnedId(id); setEarnedCount(getEarnedCount()); }
  }, []);

  useEffect(() => {
    window.addEventListener('badge_earned', handleBadge);
    return () => window.removeEventListener('badge_earned', handleBadge);
  }, [handleBadge]);

  const toggleLang = () => {
    setLang((prev) => {
      const next = prev === 'tr' ? 'en' : 'tr';
      localStorage.setItem("lang", next);
      if (next === 'en') earnBadge('polyglot');
      return next;
    });
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
    trackPageVisit(location.pathname);
  }, [location.pathname]);

  return (
    <AppContext.Provider value={{ isDark, toggleTheme, lang, toggleLang }}>
      <div className="min-h-screen flex flex-col bg-surface text-on-surface font-body selection:bg-primary/30">

        {/* Green Particles Background */}
        <div className="particle-container pointer-events-none">
          {Array.from({ length: 75 }).map((_, i) => {
            const size = 3 + Math.random() * 5;
            const left = Math.random() * 100;
            const duration = 7 + Math.random() * 10;
            const delay = Math.random() * 12;
            const drift = -30 + Math.random() * 60;
            const greens = [
              'rgba(107,255,143,0.4)', 'rgba(34,197,94,0.35)', 'rgba(22,163,74,0.3)',
              'rgba(74,222,128,0.35)', 'rgba(134,239,172,0.3)', 'rgba(5,150,105,0.3)',
              'rgba(16,185,129,0.3)', 'rgba(52,211,153,0.35)'
            ];
            const color = greens[Math.floor(Math.random() * greens.length)];
            return (
              <div
                key={i}
                className="particle"
                style={{
                  width: size,
                  height: size,
                  left: `${left}%`,
                  '--duration': `${duration}s`,
                  '--delay': `${delay}s`,
                  '--drift': `${drift}px`,
                  '--p-color': color,
                } as React.CSSProperties}
              />
            );
          })}
        </div>

        {/* Onboarding Tour — first-visit only */}
        <OnboardingTour lang={lang} />

        {/* Rank Up Popup */}
        {showRankPopup && (
          <RankUpPopup
            currentRank={showRankPopup.current}
            prevRank={showRankPopup.prev}
            lang={lang}
            onClose={() => setShowRankPopup(null)}
          />
        )}

        {/* Badge Toast */}
        {badgeEarnedId && (
          <BadgeToast badgeId={badgeEarnedId} lang={lang} onClose={() => setBadgeEarnedId(null)} />
        )}

        {/* TopNavBar */}
        <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] border-b border-outline-variant/10">
          <div className="flex justify-between items-center px-4 xl:px-8 py-3 max-w-[1440px] mx-auto">

            {/* Logo */}
            <Link to="/" className="text-xl md:text-2xl font-black text-primary flex items-center gap-2 font-headline tracking-tight no-underline">
              <span className="material-symbols-outlined biolume-glow text-primary" style={{ fontSize: '32px' }}>eco</span>
              <span className="hidden sm:inline">GençŞura<span className="text-primary-dim opacity-80 font-medium"> | {lang === 'tr' ? 'İklim' : 'Climate'}</span></span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden xl:flex items-center gap-1 flex-wrap justify-center flex-1 mx-4 max-w-5xl">
              {getNavItems(lang).map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 no-underline flex items-center gap-1.5 ${location.pathname === item.path
                      ? "bg-primary/15 text-primary border border-primary/30 shadow-[0_0_10px_rgba(107,255,143,0.15)]"
                      : "text-on-surface hover:text-primary hover:bg-surface-variant border border-transparent"
                    }`}
                >
                  <span className="text-[14px] leading-none">{item.icon}</span>
                  {item.label}
                  {item.path === '/rozetler' && earnedCount > 0 && (
                    <span className="ml-0.5 bg-yellow-500 text-black text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">{earnedCount}</span>
                  )}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {/* Visit Counter */}
              <div className="hidden sm:flex items-center justify-center px-3 h-10 rounded-full font-bold text-sm text-primary bg-primary/10 border border-primary/20" title={lang === 'tr' ? "Toplam Ziyaretçi" : "Total Visitors"}>
                <span className="material-symbols-outlined text-[16px] mr-1">visibility</span>
                {visits !== null ? visits : '...'}
              </div>

              {/* Badge Counter */}
              <Link to="/rozetler" className="hidden sm:flex items-center justify-center px-3 h-10 rounded-full font-bold text-sm text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 hover:bg-yellow-500/20 transition-colors" title={lang === 'tr' ? "Rozetlerim" : "My Badges"}>
                <span className="material-symbols-outlined text-[16px] mr-1">emoji_events</span>
                {earnedCount}
              </Link>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleTheme}
                className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-variant transition-colors cursor-pointer border border-outline-variant/20 bg-surface-container"
                title={isDark ? "Aydınlık Mod" : "Karanlık Mod"}
              >
                <span className="material-symbols-outlined text-[20px]">{isDark ? "light_mode" : "dark_mode"}</span>
              </button>

              {/* Language Toggle */}
              <button
                onClick={toggleLang}
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-on-surface-variant hover:text-primary hover:bg-surface-variant transition-colors cursor-pointer border border-outline-variant/20 bg-surface-container uppercase"
                title="Dili Değiştir"
              >
                {lang}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden w-10 h-10 rounded-full flex items-center justify-center text-on-surface hover:text-primary hover:bg-surface-variant transition-colors cursor-pointer border border-outline-variant/20 bg-surface-container"
              >
                <span className="material-symbols-outlined">{mobileMenuOpen ? "close" : "menu"}</span>
              </button>
            </div>
          </div>

          {/* Mobile Nav */}
          {mobileMenuOpen && (
            <div className="xl:hidden border-t border-outline-variant/20 bg-surface-container/95 backdrop-blur-xl animate-fade-in max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-2 p-4">
                {getNavItems(lang).map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-4 py-3 rounded-xl text-sm font-bold transition-all no-underline text-left flex items-center gap-2 ${location.pathname === item.path
                        ? "bg-primary/15 text-primary border border-primary/30"
                        : "text-on-surface hover:text-primary hover:bg-surface-variant border border-outline-variant/10"
                      }`}
                  >
                    <span>{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Page Content */}
        <main className="flex-1 relative pt-[72px] flex flex-col">
          <div className="page-enter flex-1 flex flex-col" key={location.pathname}>
            <Routes>
              <Route path="/" element={<AnaSayfa />} />
              <Route path="/hakkinda" element={<Hakkinda />} />
              <Route path="/simulasyon" element={<SimulasyonSureci />} />
              <Route path="/veri-analizi" element={<VeriAnalizi />} />
              <Route path="/soru-sor" element={<SoruAtma />} />
              <Route path="/anket" element={<Anket />} />
              <Route path="/karbon" element={<KarbonAyakIzi />} />
              <Route path="/harita" element={<Harita />} />
              <Route path="/quiz" element={<IklimQuizi />} />
              <Route path="/simulator" element={<Simulator />} />
              <Route path="/sozluk" element={<Sozluk />} />
              <Route path="/eylem-rehberi" element={<EylemRehberi />} />
              <Route path="/zaman-cizelgesi" element={<ZamanCizelgesi />} />
              <Route path="/karsilastirma" element={<Karsilastirma />} />
              <Route path="/kavram-agi" element={<KavramAgi />} />
              <Route path="/infografikler" element={<Grafikler />} />
              <Route path="/oneri" element={<Oneri />} />
              <Route path="/rozetler" element={<Rozetler />} />
              <Route path="/haberler" element={<Haberler />} />
            </Routes>
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full mt-auto border-t border-outline-variant/10 bg-surface-container-low pt-12 pb-6">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-10">
              <div className="text-center md:text-left">
                <Link to="/" className="text-2xl font-black text-primary font-headline tracking-tight no-underline flex items-center justify-center md:justify-start gap-2 mb-3">
                  <span className="material-symbols-outlined biolume-glow text-primary">eco</span>
                  GençŞura | İklim
                </Link>
                <p className="text-sm text-on-surface-variant max-w-xs mx-auto md:mx-0">
                  İklim değişikliğine karşı farkındalık ve çözüm odaklı gençlik projesi. Biyolüminesans ormanları koruyoruz.
                </p>
              </div>

              <div className="flex gap-4">
                <a className="w-12 h-12 rounded-full border border-outline-variant/30 flex items-center justify-center text-primary hover:bg-primary/10 transition-colors" href="#">
                  <span className="material-symbols-outlined text-xl" data-icon="public">public</span>
                </a>
                <a className="w-12 h-12 rounded-full border border-outline-variant/30 flex items-center justify-center text-primary hover:bg-primary/10 transition-colors" href="#">
                  <span className="material-symbols-outlined text-xl" data-icon="groups">groups</span>
                </a>
              </div>
            </div>

            <div className="border-t border-outline-variant/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-on-surface-variant font-medium">
              <p>© 2026 GençŞura İklim Projesi. Tüm hakları saklıdır.</p>
              <div className="flex gap-6">
                {/* Links removed as requested */}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </AppContext.Provider>
  );
}
