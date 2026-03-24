import { Link } from "react-router-dom";
import { useTheme } from "../App";
import DailyChallenge from "../components/DailyChallenge";

export default function AnaSayfa() {
  const { lang } = useTheme();

  const text = lang === 'tr' ? {
    tag: "Dijital Doğayı Geri Kazanmak",
    title1: "Gelecek Dünyanın",
    title2: "Nabzı.",
    desc: "İklim değişikliğine karşı farkındalık ve çözüm odaklı gençlik projesi. Dünyanın en hayati ormanlarını koruyan harekete katılın ve verilerle geleceği şekillendirin.",
    btn1: "Simülasyonu Keşfet",
    btn2: "Etkiyi İncele",
    realTime: "Gerçek Zamanlı",
    lumeCore: "Lume-Core",
    oxygen: "Oksijen Üretimi",
    modulesTitle: "Tüm Modüller",
    modulesDesc: "GençŞura projesinin sunduğu tüm özellikleri ve analiz modüllerini keşfedin."
  } : {
    tag: "Reclaiming Digital Nature",
    title1: "Pulse of the Future",
    title2: "World.",
    desc: "A youth project focused on awareness and solutions to climate change. Join the movement protecting the world's most vital forests and shape the future with data.",
    btn1: "Explore Simulation",
    btn2: "Examine Impact",
    realTime: "Real-Time",
    lumeCore: "Lume-Core",
    oxygen: "Oxygen Production",
    modulesTitle: "All Modules",
    modulesDesc: "Discover all the features and analysis modules offered by the GençŞura project."
  };

  const pagesTr = [
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
    { path: "/soru-sor", label: "Merak Edilen Sorular", icon: "help_outline", desc: "Sıkça sorulan soruları inceleyin veya kendi sorunuzu iletin." },
    { path: "/oneri", label: "Öneriler", icon: "lightbulb", desc: "Görüş ve önerilerinizi bizimle paylaşın." },
    { path: "/haberler", label: "İklim Haberleri", icon: "newspaper", desc: "Güncel iklim haberleri ve IPCC raporlarını takip edin." },
    { path: "/rozetler", label: "Rozetlerim", icon: "emoji_events", desc: "Platform üzerinde rozet kazan ve koleksiyonunu büyüt." }
  ];

  const pagesEn = [
    { path: "/hakkinda", label: "About Project", icon: "info", desc: "Get detailed information about our project and team." },
    { path: "/simulasyon", label: "Simulation Process", icon: "model_training", desc: "Examine the youth climate council stages in detail." },
    { path: "/veri-analizi", label: "Data Analysis", icon: "analytics", desc: "Discover current climate data and analysis." },
    { path: "/quiz", label: "Climate Quiz", icon: "psychology", desc: "Test your climate knowledge and learn new things." },
    { path: "/simulator", label: "Simulator", icon: "sports_esports", desc: "See the practical environmental impact of your decisions." },
    { path: "/anket", label: "Climate Survey", icon: "assignment", desc: "Participate in our climate awareness survey and contribute." },
    { path: "/karbon", label: "Carbon Footprint", icon: "co2", desc: "Easily calculate your individual carbon footprint." },
    { path: "/harita", label: "Interactive Map", icon: "public", desc: "Examine global climate data on the map." },
    { path: "/zaman-cizelgesi", label: "Countdown", icon: "hourglass_empty", desc: "Keep track of important environmental days and climate goals." },
    { path: "/karsilastirma", label: "City Comparison", icon: "location_city", desc: "Compare climate data from different cities." },
    { path: "/eylem-rehberi", label: "Action Guide", icon: "volunteer_activism", desc: "Eco-friendly actions and practical steps for daily life." },
    { path: "/sozluk", label: "Climate Glossary", icon: "menu_book", desc: "Learn climate terminology and concepts." },
    { path: "/kavram-agi", label: "Concept Map", icon: "hub", desc: "See the relationships between climate concepts in 3D." },
    { path: "/infografikler", label: "Infographics", icon: "insights", desc: "Analyze data with comprehensive 2D charts." },
    { path: "/soru-sor", label: "FAQ", icon: "help_outline", desc: "Examine frequently asked questions or submit your own." },
    { path: "/oneri", label: "Suggestions", icon: "lightbulb", desc: "Share your ideas and suggestions with us." },
    { path: "/haberler", label: "Climate News", icon: "newspaper", desc: "Follow current climate news and IPCC reports." },
    { path: "/rozetler", label: "My Badges", icon: "emoji_events", desc: "Earn badges on the platform and grow your collection." }
  ];

  const pages = lang === 'tr' ? pagesTr : pagesEn;

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
              <span className="text-xs font-label font-bold uppercase tracking-widest text-primary">{text.tag}</span>
            </div>
            
            <h1 className="text-display-lg font-headline font-black text-on-surface leading-[1.1] tracking-tighter text-5xl md:text-7xl lg:text-8xl">
              {text.title1} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-dim to-secondary">{text.title2}</span>
            </h1>
            
            <p className="text-body-lg text-on-surface-variant max-w-xl leading-relaxed text-lg">
              {text.desc}
            </p>
            
            <div className="flex flex-wrap gap-6 mt-4">
              <Link to="/simulasyon" className="no-underline group relative bg-gradient-to-b from-primary to-primary-container text-on-primary-container font-headline font-extrabold px-10 py-5 rounded-lg glow-primary transition-all duration-300 hover:scale-105 flex items-center gap-3">
                {text.btn1}
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
              <Link to="/harita" className="no-underline px-8 py-5 rounded-lg font-headline font-bold text-primary hover:bg-primary/5 border border-primary/20 transition-all flex items-center gap-3">
                {text.btn2}
                <span className="material-symbols-outlined">public</span>
              </Link>
            </div>

            {/* Daily Challenge Card */}
            <DailyChallenge />

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
                    <div className="text-xs font-label text-primary uppercase font-bold">{text.realTime}</div>
                    <div className="text-lg font-headline font-black text-on-surface">{text.lumeCore}</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                    <div className="w-[85%] h-full bg-primary"></div>
                  </div>
                  <div className="flex justify-between text-[10px] font-bold uppercase text-on-surface-variant">
                    <span>{text.oxygen}</span>
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


        {/* App Directory Section (Adapted from original features) */}
        <div className="max-w-7xl mx-auto px-8 w-full mt-24">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-black text-on-surface tracking-tight mb-4">{text.modulesTitle}</h2>
            <p className="text-on-surface-variant max-w-2xl">{text.modulesDesc}</p>
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
