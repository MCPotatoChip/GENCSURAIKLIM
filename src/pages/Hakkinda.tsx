import { useTheme } from "../App";

export default function Hakkinda() {
  const { lang } = useTheme();

  const text = lang === 'tr' ? {
    tag: "Hakkımızda",
    title: "GençŞura | İklim",
    desc: "Geleceği şekillendiren genç zihinler için sürdürülebilir bir dünya vizyonu. İklim değişikliğine karşı farkındalık ve çözüm odaklı gençlik projesi.",
    introTitle: "Projenin Tanıtımı",
    simTitle: "Araştırma ve Simülasyon",
    simDesc: "Genç İklim Şurası Projesi, iklim değişikliği konusunda gençlerin farkındalığını artırmayı ve çevresel sorunlara yönelik çözüm önerileri geliştirmelerini amaçlayan bir araştırma ve simülasyon çalışmasıdır. Proje kapsamında öğrenciler iklim politikalarını incelemiş, farklı bölgelerin çevresel sorunlarını değerlendirmiş ve çözüm önerileri geliştirmiştir. Ayrıca proje kapsamında hazırlanan bu web sitesi aracılığıyla iklim değişikliği hakkında toplumsal farkındalık oluşturulması hedeflenmektedir.",
    badge1: "İnovasyon",
    badge2: "Eğitim",
    statNum: "81",
    statDesc: "İli Temsil Eden Gönüllü",
    purpose: "Projenin Amacı: Gençlerin iklim değişikliği konusunda bilinçlenmesini sağlamak ve karar alma süreçlerini deneyimleyebileceği bir simülasyon ortamı oluşturmak.",
    sciTag: "BİLİMSEL YAKLAŞIM",
    methodTitle: "Kapsam ve Yöntem",
    method1Title: "Komisyon Çalışmaları",
    method1Desc: "Enerji politikaları, su yönetimi, sürdürülebilir şehirler ve çevre koruma gibi alanlarda Türkiye'nin farklı coğrafi bölgelerini temsil eden katılımcılar tartışmıştır.",
    method2Title: "Veri Toplama ve Analiz",
    method2Desc: "Katılımcı görüşleri anketlerle toplanmış, istatistiksel analiz yöntemleri uygulanmış ve metin analizlerinde Doğal Dil İşleme tekniklerinden yararlanılmıştır.",
    method3Title: "Web Sitesi ve Toplum",
    method3Desc: "Soru-cevap bölümü, kullanıcı anketleri ve proje çıktıları yayımlanarak ziyaretçilerin iklim konusundaki bilgi düzeylerini artırmaları hedeflenmektedir."
  } : {
    tag: "About Us",
    title: "GençŞura | Climate",
    desc: "A sustainable world vision for young minds shaping the future. A youth project focused on awareness and solutions to climate change.",
    introTitle: "Project Introduction",
    simTitle: "Research & Simulation",
    simDesc: "The Youth Climate Council Project is a research and simulation study aimed at raising youth awareness about climate change and developing solutions for environmental problems. Students examined climate policies, evaluated environmental issues of different regions, and developed proposals. Furthermore, this website aims to create public awareness about climate change.",
    badge1: "Innovation",
    badge2: "Education",
    statNum: "81",
    statDesc: "Provincial Volunteer Representatives",
    purpose: "Project Purpose: To ensure youth become conscious about climate change and to create a simulation environment where they can experience decision-making processes.",
    sciTag: "SCIENTIFIC APPROACH",
    methodTitle: "Scope & Methodology",
    method1Title: "Commission Works",
    method1Desc: "Participants representing different geographical regions of Turkey discussed fields such as energy policies, water management, sustainable cities, and environmental protection.",
    method2Title: "Data Collection & Analysis",
    method2Desc: "Participant views were collected via surveys, statistical analysis methods were applied, and Natural Language Processing techniques were utilized in text analysis.",
    method3Title: "Website & Society",
    method3Desc: "The aim is to increase visitors' knowledge levels about climate by publishing an FAQ section, user surveys, and project outputs."
  };

  return (
    <div className="w-full">
      <main className="pt-20 pb-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto space-y-24">
        
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-2xl p-12 md:p-24 bg-surface-container border border-outline-variant/10">
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #6bff8f 0%, transparent 70%)' }}></div>
          <div className="relative z-10 max-w-3xl">
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-6 block font-label">{text.tag}</span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-on-surface mb-8 font-headline">{text.title}</h1>
            <p className="text-xl md:text-2xl text-on-surface-variant leading-relaxed font-body">
              {text.desc}
            </p>
          </div>
        </section>

        {/* Projenin Tanıtımı (Bento Grid) */}
        <section className="space-y-10">
          <div className="flex items-end justify-between">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-on-surface font-headline">{text.introTitle}</h2>
            <div className="h-px bg-outline-variant flex-grow ml-8 mb-3 opacity-30"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Main Intro Card */}
            <div className="md:col-span-8 glass-card rounded-2xl p-10 biolume-glow flex flex-col justify-between group border border-outline-variant/10 relative overflow-hidden">
              <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-primary/10 rounded-full blur-[60px] pointer-events-none"></div>
              <div className="relative z-10">
                <span className="material-symbols-outlined text-primary text-4xl mb-6" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
                <h3 className="text-2xl font-bold mb-4 text-on-surface font-headline">{text.simTitle}</h3>
                <p className="text-on-surface-variant leading-relaxed text-lg font-body">
                  {text.simDesc}
                </p>
              </div>
              <div className="mt-12 flex gap-4 relative z-10">
                <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">{text.badge1}</span>
                <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">{text.badge2}</span>
              </div>
            </div>

            {/* Secondary Visual Card */}
            <div className="md:col-span-4 rounded-2xl overflow-hidden bg-surface-container-highest flex items-center justify-center p-8 relative group border border-outline-variant/10">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
              <div className="relative z-10 text-center">
                <div className="text-6xl font-black text-primary mb-2 font-headline">{text.statNum}</div>
                <div className="text-on-surface-variant font-medium font-body">{text.statDesc}</div>
              </div>
              <div className="absolute bottom-4 right-4">
                <span className="material-symbols-outlined text-primary/20 text-6xl">public</span>
              </div>
            </div>
            
            {/* Statistics Row Equivalent */}
            <div className="md:col-span-12 glass-card rounded-2xl p-8 flex items-center justify-between border border-outline-variant/10">
              <p className="text-on-surface font-semibold font-body text-lg">{text.purpose}</p>
              <span className="material-symbols-outlined text-primary hidden md:block">psychology</span>
            </div>
          </div>
        </section>

        {/* Misyonumuz Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-surface-container overflow-hidden relative border border-outline-variant/10">
              <img 
                alt="Young activists environment" 
                className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700" 
                src="/img/hakkinda-team.jpeg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 glass-card rounded-2xl p-6 flex flex-col justify-center items-center text-center shadow-xl border border-outline-variant/20 hidden md:flex">
              <span className="material-symbols-outlined text-primary text-4xl mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              <span className="text-xs font-bold uppercase tracking-widest text-on-surface">{text.sciTag}</span>
            </div>
          </div>
          <div className="space-y-8">
            <h2 className="text-4xl font-bold tracking-tight text-on-surface font-headline">{text.methodTitle}</h2>
            <div className="space-y-6">
              
              <div className="flex gap-6 items-start p-4 hover:bg-surface-container-low rounded-xl transition-colors border border-transparent hover:border-outline-variant/10">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary">analytics</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-on-surface font-headline">{text.method1Title}</h4>
                  <p className="text-on-surface-variant font-body">{text.method1Desc}</p>
                </div>
              </div>

              <div className="flex gap-6 items-start p-4 hover:bg-surface-container-low rounded-xl transition-colors border border-transparent hover:border-outline-variant/10">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary">biotech</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-on-surface font-headline">{text.method2Title}</h4>
                  <p className="text-on-surface-variant font-body">{text.method2Desc}</p>
                </div>
              </div>

              <div className="flex gap-6 items-start p-4 hover:bg-surface-container-low rounded-xl transition-colors border border-transparent hover:border-outline-variant/10">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary">diversity_3</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-on-surface font-headline">{text.method3Title}</h4>
                  <p className="text-on-surface-variant font-body">{text.method3Desc}</p>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
