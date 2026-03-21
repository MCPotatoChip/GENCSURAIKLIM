import { useState, useEffect, createContext, useContext } from "react";
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

// ===== Dark Mode Context =====
interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}
export const ThemeContext = createContext<ThemeContextType>({
  isDark: true, // Default to true as the new design is primarily dark mode
  toggleTheme: () => { },
});
export const useTheme = () => useContext(ThemeContext);

const navItems = [
  { path: "/", label: "Ana Sayfa", icon: "🏠" },
  { path: "/hakkinda", label: "Hakkında", icon: "ℹ️" },
  { path: "/simulasyon", label: "Simülasyon", icon: "⚙️" },
  { path: "/veri-analizi", label: "Veri Analizi", icon: "📊" },
  { path: "/quiz", label: "Quiz", icon: "🧠" },
  { path: "/simulator", label: "Simülatör", icon: "🎮" },
  { path: "/anket", label: "Anket", icon: "📝" },
  { path: "/karbon", label: "Karbon Hesapla", icon: "🌍" },
  { path: "/harita", label: "Harita", icon: "🗺️" },
  { path: "/zaman-cizelgesi", label: "Geri Sayım", icon: "⏳" },
  { path: "/karsilastirma", label: "Karşılaştırma", icon: "⚖️" },
  { path: "/eylem-rehberi", label: "Eylem Rehberi", icon: "🌱" },
  { path: "/sozluk", label: "Sözlük", icon: "📖" },
  { path: "/kavram-agi", label: "Kavram Ağı", icon: "🕸️" },
  { path: "/infografikler", label: "İnfografikler", icon: "📈" },
  { path: "/soru-sor", label: "Soru & Cevap", icon: "❓" },
];

export default function App() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") !== "light"; // Default dark
  });

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem("theme", next ? "dark" : "light");
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <div className="min-h-screen flex flex-col bg-surface text-on-surface font-body selection:bg-primary/30">
        
        {/* TopNavBar */}
        <nav className="fixed top-0 w-full z-50 bg-[#061009]/80 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] border-b border-outline-variant/10">
          <div className="flex justify-between items-center px-4 xl:px-8 py-3 max-w-[1440px] mx-auto">
            
            {/* Logo */}
            <Link to="/" className="text-xl md:text-2xl font-black text-primary flex items-center gap-2 font-headline tracking-tight no-underline">
              <span className="material-symbols-outlined biolume-glow text-primary" style={{fontSize: '32px'}}>eco</span>
              <span className="hidden sm:inline">GençŞura<span className="text-primary-dim opacity-80 font-medium"> | İklim</span></span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden xl:flex items-center gap-1 flex-wrap justify-center flex-1 mx-4 max-w-5xl">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 no-underline flex items-center gap-1.5 ${
                    location.pathname === item.path
                      ? "bg-primary/15 text-primary border border-primary/30 shadow-[0_0_10px_rgba(107,255,143,0.15)]"
                      : "text-on-surface-variant hover:text-primary hover:bg-surface-variant border border-transparent"
                  }`}
                >
                  <span className="text-[14px] leading-none">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleTheme}
                className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-variant transition-colors cursor-pointer border border-outline-variant/20 bg-surface-container"
                title={isDark ? "Aydınlık Mod" : "Karanlık Mod"}
              >
                <span className="material-symbols-outlined text-[20px]">{isDark ? "light_mode" : "dark_mode"}</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-variant transition-colors cursor-pointer border border-outline-variant/20 bg-surface-container"
              >
                <span className="material-symbols-outlined">{mobileMenuOpen ? "close" : "menu"}</span>
              </button>
            </div>
          </div>

          {/* Mobile Nav */}
          {mobileMenuOpen && (
            <div className="xl:hidden border-t border-outline-variant/20 bg-surface-container/95 backdrop-blur-xl animate-fade-in max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-2 p-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-4 py-3 rounded-xl text-sm font-bold transition-all no-underline text-left flex items-center gap-2 ${
                      location.pathname === item.path
                        ? "bg-primary/15 text-primary border border-primary/30"
                        : "text-on-surface-variant hover:text-primary hover:bg-surface-variant border border-outline-variant/10"
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
                <Link to="/hakkinda" className="hover:text-primary transition-colors no-underline">Proje Hakkında</Link>
                <Link to="/soru-sor" className="hover:text-primary transition-colors no-underline">İletişim</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ThemeContext.Provider>
  );
}
