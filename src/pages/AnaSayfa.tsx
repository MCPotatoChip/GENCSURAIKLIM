import { Link } from "react-router-dom";

export default function AnaSayfa() {
  const pages = [
    { path: "/hakkinda", label: "Proje Hakkında", icon: "info", desc: "Projemiz ve ekibimiz hakkında detaylı bilgi edinin." },
    { path: "/simulasyon", label: "Simülasyon Süreci", icon: "model_training", desc: "Genç İklim Şurası aşamalarını detaylıca inceleyin." },
    { path: "/veri-analizi", label: "Veri Analizi", icon: "analytics", desc: "Güncel iklim verilerini ve analizleri keşfedin." },
    { path: "/quiz", label: "İklim Quizi", icon: "psychology", desc: "İklim bilginizi test edin ve yeni şeyler öğrenin." },
    { path: "/simulator", label: "Simülatör", icon: "sports_esports", desc: "Kararlarınızın çevreye etkisini uygulamalı görün." },
    { path: "/anket", label: "İklim Anketi", icon: "assignment", desc: "İklim farkındalığı anketimize katılın ve katkıda bulunun." },
    { path: "/karbon", label: "Karbon Hesapla", icon: "co2", desc: "Bireysel karbon ayak izinizi kolayca hesaplayın." },
    { path: "/harita", label: "Etkileşimli Harita", icon: "public", desc: "Küresel iklim verilerini harita üzerinde inceleyin." },
    { path: "/zaman-cizelgesi", label: "Geri Sayım", icon: "hourglass_empty", desc: "Önemli çevre günleri ve iklim hedeflerini takip edin." },
    { path: "/karsilastirma", label: "Şehir Kıyaslama", icon: "location_city", desc: "Farklı şehirlerin iklim verilerini kıyaslayın." },
    { path: "/eylem-rehberi", label: "Eylem Rehberi", icon: "volunteer_activism", desc: "Günlük hayatta uygulayabileceğiniz çevre dostu eylemler ve pratik adımlar." },
    { path: "/sozluk", label: "İklim Sözlüğü", icon: "menu_book", desc: "İklim terminolojisini ve kavramları öğrenin." },
    { path: "/kavram-agi", label: "Kavram Ağı", icon: "hub", desc: "İklim kavramlarının birbiriyle olan ilişkisini 3D görün." },
    { path: "/infografikler", label: "İnfografikler", icon: "insights", desc: "Verileri kapsamlı 2D grafiklerle analiz edin." },
    { path: "/soru-sor", label: "Soru & Cevap", icon: "help_outline", desc: "Sıkça sorulan soruları inceleyin veya kendi sorunuzu iletin." },
  ];

  return (
    <div className="w-full">
      <main className="relative w-full overflow-hidden flex flex-col justify-center pt-10 pb-20">
        
        {/* Abstract Background Elements */}
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-secondary-container/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute top-1/4 left-10 w-64 h-64 glass-card rounded-xl rotate-12 opacity-40 pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-20 w-80 h-80 glass-card rounded-full -rotate-12 opacity-30 pointer-events-none"></div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container border border-outline-variant/10 self-start">
              <span className="material-symbols-outlined text-primary text-sm" data-icon="potted_plant">potted_plant</span>
              <span className="text-xs font-label font-bold uppercase tracking-widest text-primary">Dijital Doğayı Geri Kazanmak</span>
            </div>
            
            <h1 className="text-display-lg font-headline font-black text-on-surface leading-[1.1] tracking-tighter text-5xl md:text-7xl lg:text-8xl">
              Gelecek Dünyanın <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-dim to-secondary">Nabzı.</span>
            </h1>
            
            <p className="text-body-lg text-on-surface-variant max-w-xl leading-relaxed text-lg">
              İklim değişikliğine karşı farkındalık ve çözüm odaklı gençlik projesi. Dünyanın en hayati ormanlarını koruyan harekete katılın ve verilerle geleceği şekillendirin.
            </p>
            
            <div className="flex flex-wrap gap-6 mt-4">
              <Link to="/simulasyon" className="no-underline group relative bg-gradient-to-b from-primary to-primary-container text-on-primary-container font-headline font-extrabold px-10 py-5 rounded-lg glow-primary transition-all duration-300 hover:scale-105 flex items-center gap-3">
                Simülasyonu Keşfet
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
              <Link to="/harita" className="no-underline px-8 py-5 rounded-lg font-headline font-bold text-primary hover:bg-primary/5 border border-primary/20 transition-all flex items-center gap-3">
                Etkiyi İncele
                <span className="material-symbols-outlined">public</span>
              </Link>
            </div>
            
            <div className="flex items-center gap-6 mt-12 border-t border-outline-variant/10 pt-8 overflow-x-auto">
              <div>
                <div className="text-2xl md:text-3xl font-black text-on-surface">14.2k</div>
                <div className="text-[10px] md:text-sm font-label text-on-surface-variant tracking-wider uppercase">Aktif Koruyucular</div>
              </div>
              <div className="h-10 w-px bg-outline-variant/20 mx-2"></div>
              <div>
                <div className="text-2xl md:text-3xl font-black text-on-surface">98%</div>
                <div className="text-[10px] md:text-sm font-label text-on-surface-variant tracking-wider uppercase">Farkındalık Artışı</div>
              </div>
              <div className="h-10 w-px bg-outline-variant/20 mx-2"></div>
              <div>
                <div className="text-2xl md:text-3xl font-black text-on-surface">240k+</div>
                <div className="text-[10px] md:text-sm font-label text-on-surface-variant tracking-wider uppercase">Hedeflenen Ağaç</div>
              </div>
            </div>
          </div>
          
          {/* Hero Image / Visual Element */}
          <div className="lg:col-span-5 relative mt-10 lg:mt-0">
            <div className="relative rounded-xl overflow-hidden shadow-2xl glass-card p-4 border border-outline-variant/10">
              <img alt="İklim Doğası" className="w-full h-[400px] lg:h-[600px] object-cover rounded-lg" src="https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=2000&auto=format&fit=crop"/>
              
              {/* Floating Data Card */}
              <div className="absolute bottom-10 -left-6 md:-left-10 glass-card p-6 rounded-lg shadow-2xl border border-primary/20 max-w-[240px]">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">monitoring</span>
                  </div>
                  <div>
                    <div className="text-xs font-label text-primary uppercase font-bold">Gerçek Zamanlı</div>
                    <div className="text-lg font-headline font-black text-on-surface">Lume-Core</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                    <div className="w-[85%] h-full bg-primary"></div>
                  </div>
                  <div className="flex justify-between text-[10px] font-bold uppercase text-on-surface-variant">
                    <span>Oksijen Üretimi</span>
                    <span className="text-primary">+85%</span>
                  </div>
                </div>
              </div>
              
              {/* Ambient Floating Icons */}
              <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full glass-card flex items-center justify-center border border-secondary/30 hidden md:flex">
                <span className="material-symbols-outlined text-secondary text-4xl biolume-glow">forest</span>
              </div>
            </div>
          </div>
        </div>

        {/* Focus Bio-Regions (From Stitch) */}
        <div className="max-w-7xl mx-auto px-8 w-full mt-32 mb-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <h2 className="text-4xl font-headline font-black text-on-surface tracking-tight mb-2">Öncelikli Biyo-Bölgeler</h2>
              <p className="text-on-surface-variant">Hemen katılım gerektiren güncel aktif restorasyon bölgeleri.</p>
            </div>
            <Link to="/harita" className="no-underline text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all">
              Tüm Bölgeleri Gör <span className="material-symbols-outlined">chevron_right</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Bento Card 1 */}
            <div className="md:col-span-2 group relative h-80 rounded-lg overflow-hidden glass-card border border-outline-variant/10">
              <img alt="Ebedi Yeşillik" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCg61Bj70XVaOqWgIOLOWst-rsPGG1Iw5q28F0pNP2w4A65zIcW_4xdNFXSWz6AZD-89vK7g3o5lS_DCIufJEvMkaGGWTjT6Lr7wPjv_ZQzM2-zHBJpXcEgzByrf6PWz-Uyn3go3CTWPmLi2gFUZ_5-LJN_RPZgrGGfgCj2Mp1gCkv7V4oSzSpOSIasnDfqZlBretm8BrjLejtmkju2PhYDz2NSZ2y5eYtRqnCBU1vU5dIBlgurhbh_NAaWywyP9cT2t0A7uWO5CKg"/>
              <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">Yüksek Aciliyet</span>
                <h3 className="text-2xl font-headline font-extrabold text-on-surface">Amazonia Delta-7</h3>
                <p className="text-on-surface-variant text-sm mt-2 max-w-md">Neon Eğreltiotu için kalan son yaşam alanı. Bu döngüde 400 yeni koruyucuya daha ihtiyaç var.</p>
              </div>
            </div>
            
            {/* Bento Card 2 */}
            <div className="group relative h-80 rounded-lg overflow-hidden bg-surface-container border border-outline-variant/10 flex flex-col p-8 justify-between hover:border-primary/50 transition-colors">
              <div className="w-16 h-16 rounded-lg bg-secondary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary text-3xl">water_drop</span>
              </div>
              <div>
                <h3 className="text-xl font-headline font-extrabold text-on-surface">Sıvı Zekası</h3>
                <p className="text-on-surface-variant text-sm mt-2 mb-4">Mekong havzası boyunca yeni su filtrasyon düğümleri kuruluyor.</p>
                <Link to="/infografikler" className="inline-block w-full py-3 rounded-lg border border-outline-variant/30 text-sm font-bold text-center text-on-surface hover:bg-white/5 transition-colors uppercase tracking-widest no-underline">
                  Verileri Gör
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* App Directory Section (Adapted from original features) */}
        <div className="max-w-7xl mx-auto px-8 w-full mt-24">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-black text-on-surface tracking-tight mb-4">Tüm Modüller</h2>
            <p className="text-on-surface-variant max-w-2xl">GençŞura projesinin sunduğu tüm özellikleri ve analiz modüllerini keşfedin.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pages.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="group relative bg-surface-container-low border border-outline-variant/20 rounded-2xl p-6 hover:shadow-[0_8px_30px_rgba(107,255,143,0.1)] hover:-translate-y-1 transition-all duration-300 no-underline overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[40px] group-hover:bg-primary/10 transition-colors"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-surface-variant border border-outline-variant/30 flex items-center justify-center mb-4 group-hover:border-primary/50 transition-colors">
                    <span className="material-symbols-outlined text-primary text-2xl group-hover:scale-110 transition-transform">{item.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-on-surface mb-2">{item.label}</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
