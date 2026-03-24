import { useState, useRef, useEffect } from "react";
import { useTheme } from "../App";

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

const faqsTR: FAQ[] = [
  {
    category: "Genel",
    question: "İklim değişikliği nedir?",
    answer: "İklim değişikliği, dünya genelinde ortalama sıcaklıkların ve hava koşullarının uzun dönemde değişmesidir. Özellikle fosil yakıtların yakılması, ormansızlaşma ve endüstriyel süreçler sonucu atmosfere salınan sera gazlarının artışı bu değişimin başlıca nedenidir.",
  },
  {
    category: "Genel",
    question: "Küresel ısınma ile iklim değişikliği arasındaki fark nedir?",
    answer: "Küresel ısınma, dünya yüzey sıcaklıklarının artışını ifade eder. İklim değişikliği ise daha geniş bir kavramdır; yağış düzenlerinin değişmesi, deniz seviyesinin yükselmesi, aşırı hava olaylarının artması gibi tüm değişimleri kapsar.",
  },
  {
    category: "Genel",
    question: "Sera gazı nedir ve neden önemlidir?",
    answer: "Sera gazları (CO₂, metan, azot oksit vb.) güneşten gelen ısıyı atmosferde tutarak dünyayı yaşanabilir bir sıcaklıkta tutar. Ancak bu gazların aşırı artışı, ısının fazla tutulmasına ve küresel ısınmaya neden olmaktadır.",
  },
  {
    category: "Genel",
    question: "İklim değişikliğinin temel nedenleri nelerdir?",
    answer: "Fosil yakıtların yakılması (kömür, petrol, doğal gaz), ormansızlaşma, sanayileşme, tarımsal faaliyetler ve atık yönetimi iklim değişikliğinin başlıca nedenleri arasındadır.",
  },
  {
    category: "Etki",
    question: "İklim değişikliği Türkiye'yi nasıl etkiliyor?",
    answer: "Türkiye, kuraklık, aşırı sıcaklıklar, sel felâketleri, orman yangınları ve su kıtlığı gibi iklim değişikliğinin etkilerini giderek daha yoğun yaşamaktadır. Özellikle İç Anadolu'da kuraklık, Karadeniz'de sel riski artmaktadır.",
  },
  {
    category: "Etki",
    question: "Deniz seviyesinin yükselmesi ne demek?",
    answer: "Küresel ısınma nedeniyle buzulların erimesi ve deniz suyunun ısıyla genleşmesi sonucu deniz seviyesi yükselmektedir. Bu durum kıyı şehirlerini, deltaları ve ada ülkelerini tehdit etmektedir. Son 100 yılda yaklaşık 20 cm yükselme gerçekleşmiştir.",
  },
  {
    category: "Etki",
    question: "İklim değişikliği tarımı nasıl etkiler?",
    answer: "Değişen yağış düzenleri, aşırı sıcaklıklar ve kuraklık tarımsal verimliliği düşürmektedir. Hasat zamanlamaları değişmekte, zararlıların yayılma alanları genişlemekte ve su kaynakları azalmaktadır.",
  },
  {
    category: "Etki",
    question: "Biyoçeşitlilik neden azalıyor?",
    answer: "İklim değişikliği, habitat kaybı, aşırı av, çevre kirliliği ve istilacı türler biyoçeşitliliğin azalmasının başlıca nedenleridir. Sıcaklık değişimleri birçok türün yaşam alanlarını tehdit etmektedir.",
  },
  {
    category: "Çözüm",
    question: "Karbon ayak izi nedir ve nasıl azaltılır?",
    answer: "Karbon ayak izi, bir bireyin veya kurumun faaliyetleri sonucu atmosfere salınan toplam sera gazı miktarıdır. Toplu taşıma kullanmak, enerji tasarrufu yapmak, et tüketimini azaltmak ve geri dönüşüm yapmak karbon ayak izini azaltmanın yollarıdır.",
  },
  {
    category: "Çözüm",
    question: "Yenilenebilir enerji kaynakları nelerdir?",
    answer: "Güneş, rüzgâr, hidroelektrik, jeotermal ve biyokütle başlıca yenilenebilir enerji kaynaklarıdır. Bu kaynaklar fosil yakıtlara alternatif olup sera gazı emisyonlarını önemli ölçüde azaltır.",
  },
  {
    category: "Çözüm",
    question: "Paris İklim Anlaşması nedir?",
    answer: "2015 yılında imzalanan Paris İklim Anlaşması, küresel sıcaklık artışını sanayi öncesi dönemin 1.5°C - 2°C üzerinde sınırlamayı hedefleyen uluslararası bir antlaşmadır. 196 ülke bu anlaşmayı imzalamıştır.",
  },
  {
    category: "Çözüm",
    question: "Geri dönüşüm iklim değişikliği ile mücadelede nasıl yardımcı olur?",
    answer: "Geri dönüşüm, ham madde çıkarımını azaltarak enerji tasarrufu sağlar. Örneğin alüminyum geri dönüşümü %95 daha az enerji tüketir. Ayrıca çöp miktarını azaltarak metan emisyonlarını düşürür.",
  },
  {
    category: "Proje",
    question: "Genç İklim Şurası nedir?",
    answer: "Genç İklim Şurası, öğrencilerin TBMM simülasyonu formatında iklim politikalarını tartıştığı, komisyonlarda çalıştığı ve yasa teklifleri hazırladığı bir gençlik projesidir. Proje kapsamında 49 milletvekili 3 komisyonda 2 gün boyunca çalışmıştır.",
  },
  {
    category: "Proje",
    question: "Projede hangi komisyonlar yer aldı?",
    answer: "Projede Su Kaynakları (Tarımda Su Yönetimi ve Kuraklıkla Mücadele), Enerji Yönetimi (Karbon Kotası ve Bireysel Sınırlandırma) ve İklim Afetleri (Ekolojik Göç ve Mağduriyetlerin Önlenmesi) komisyonları yer almıştır.",
  },
  {
    category: "Proje",
    question: "Simülasyonun amacı nedir?",
    answer: "Simülasyon, gençlerin demokratik karar alma süreçlerini deneyimlemelerini, iklim konusunda çözüm önerileri geliştirmelerini ve yasama sürecini bizzat yaşayarak öğrenmelerini amaçlamaktadır.",
  },
  {
    category: "Proje",
    question: "Genç Şura Resmi Gazetesi nedir?",
    answer: "Simülasyon sürecinde komisyonlarda tartışılan ve genel kurulda kabul edilen kanun tekliflerinin derlendiği resmi bir yayındır. Kapanış seremonisinde ilan edilmiştir.",
  },
  {
    category: "Bilim",
    question: "IPCC nedir?",
    answer: "Hükümetlerarası İklim Değişikliği Paneli (IPCC), Birleşmiş Milletler bünyesinde iklim değişikliği konusunda bilimsel değerlendirmeler yapan ve politika yapıcılara rehberlik eden uluslararası bir kuruluştur.",
  },
  {
    category: "Bilim",
    question: "Ozon tabakası ile iklim değişikliği arasındaki ilişki nedir?",
    answer: "Ozon tabakası zararlı UV ışınlarını filtreler. CFC gazları ozon tabakasını incelterek UV radyasyonunu artırmıştır. İklim değişikliği ise sera gazlarıyla ilgili farklı bir süreçtir, ancak iki konu birbirini etkiler.",
  },
  {
    category: "Bilim",
    question: "Permafrost nedir ve neden önemlidir?",
    answer: "Permafrost, en az 2 yıl boyunca donmuş kalan toprak tabakasıdır. İçinde depolanan organik madde eridikçe metan ve CO₂ salarak iklim değişikliğini hızlandırır. Kuzey yarımkürede geniş alanları kaplar.",
  },
  {
    category: "Bilim",
    question: "Karbon nötr olmak ne demektir?",
    answer: "Karbon nötr, bir birey, şirket veya ülkenin atmosfere saldığı CO₂ miktarı kadar karbon emilimini/dengelenmesini sağlamasıdır. Bu hedefe ulaşmak için emisyon azaltma ve karbon dengeleme projeleri uygulanır.",
  },
];

const faqsEN: FAQ[] = [
  {
    category: "General",
    question: "What is climate change?",
    answer: "Climate change refers to long-term shifts in temperatures and weather patterns mainly caused by human activities, especially the burning of fossil fuels, deforestation, and industrial processes.",
  },
  {
    category: "General",
    question: "What is the difference between global warming and climate change?",
    answer: "Global warming is the long-term heating of Earth's climate system, whereas climate change includes global warming, but refers to the broader range of changes that are happening to our planet.",
  },
  {
    category: "General",
    question: "What is greenhouse gas?",
    answer: "Greenhouse gases are gases in Earth's atmosphere that trap heat. They let sunlight pass through the atmosphere, but they prevent the heat that the sunlight brings from leaving the atmosphere.",
  },
  {
    category: "General",
    question: "What are the core reasons for climate change?",
    answer: "Generating power (burning coal, oil and gas), manufacturing goods, cutting down forests, using transportation, producing food, and powering buildings are among the main causes.",
  },
  {
    category: "Impact",
    question: "How does climate change affect Turkey?",
    answer: "Turkey increasingly experiences effects like droughts, extreme temperatures, floods, forest fires, and water scarcity. Drought risk is especially rising in Central Anatolia, and flood risk in the Black Sea region.",
  },
  {
    category: "Impact",
    question: "What does sea level rise mean?",
    answer: "Sea level describes the rising of ocean waters due to melting ice caps and thermal expansion of seawater as it warms. It threatens coastal cities and island nations. In the last 100 years, it rose by about 20 cm.",
  },
  {
    category: "Impact",
    question: "How does climate change affect agriculture?",
    answer: "Changing precipitation patterns, extreme temperatures, and droughts reduce agricultural productivity. Harvest times change, pest areas expand, and water resources diminish.",
  },
  {
    category: "Impact",
    question: "Why is biodiversity decreasing?",
    answer: "Climate change, habitat loss, overexploitation, pollution, and alien species are the main drivers of biodiversity loss. Temperature changes threaten the habitats of many species.",
  },
  {
    category: "Solution",
    question: "What is a carbon footprint and how to reduce it?",
    answer: "A carbon footprint is the total amount of greenhouse gases generated by our actions. Using public transport, saving energy, reducing meat consumption, and recycling help reduce it.",
  },
  {
    category: "Solution",
    question: "What are renewable energy sources?",
    answer: "Solar, wind, hydroelectric, geothermal, and biomass are major renewable sources. They are alternatives to fossil fuels and significantly reduce greenhouse gas emissions.",
  },
  {
    category: "Solution",
    question: "What is the Paris Agreement?",
    answer: "Signed in 2015, the Paris Agreement is an international treaty aimed at limiting global temperature rise to well below 2°C, preferably to 1.5°C, compared to pre-industrial levels.",
  },
  {
    category: "Solution",
    question: "How does recycling help fight climate change?",
    answer: "Recycling saves energy by reducing raw material extraction. E.g., recycling aluminum uses 95% less energy. It also reduces methane emissions by decreasing waste in landfills.",
  },
  {
    category: "Project",
    question: "What is Youth Climate Council (Genç İklim Şurası)?",
    answer: "It is a youth project where students discuss climate policies, work in commissions, and prepare draft laws in a parliamentary simulation format. 49 delegates worked across 3 commissions for 2 days.",
  },
  {
    category: "Project",
    question: "Which commissions were in the project?",
    answer: "Water Resources (Water Management in Agriculture & Combating Drought), Energy Management (Carbon Quotas & Individual Limitation), and Climate Disasters (Ecological Migration & Preventing Grievances).",
  },
  {
    category: "Project",
    question: "What is the goal of the simulation?",
    answer: "It aims for youth to experience democratic decision-making processes, develop solutions for climate issues, and learn the legislative process firsthand.",
  },
  {
    category: "Project",
    question: "What is the Official Youth Council Gazette?",
    answer: "It is an official publication compiling the draft laws discussed in commissions and accepted in the general assembly. It was announced at the closing ceremony.",
  },
  {
    category: "Science",
    question: "What is the IPCC?",
    answer: "The Intergovernmental Panel on Climate Change (IPCC) is an international body under the UN that provides scientific assessments on climate change and guides policymakers.",
  },
  {
    category: "Science",
    question: "What is the link between the ozone layer and climate change?",
    answer: "The ozone layer filters harmful UV rays. CFC gases depleted it, increasing UV radiation. Climate change is a different process involving greenhouse gases, though they affect each other.",
  },
  {
    category: "Science",
    question: "What is permafrost and why is it important?",
    answer: "Permafrost is ground that remains frozen for at least 2 years. As the organic matter inside it thaws, it releases methane and CO₂, accelerating climate change. It covers vast areas in the Northern Hemisphere.",
  },
  {
    category: "Science",
    question: "What does it mean to be carbon neutral?",
    answer: "Carbon neutrality means balancing the amount of CO₂ emitted with the amount absorbed or offset. This goal is achieved through emission reduction and carbon offset projects.",
  },
];

const categoriesTR = ["Tümü", "Genel", "Etki", "Çözüm", "Proje", "Bilim"];
const categoriesEN = ["All", "General", "Impact", "Solution", "Project", "Science"];

export default function SoruAtma() {
  const { lang } = useTheme();
  
  const faqs = lang === 'tr' ? faqsTR : faqsEN;
  const categories = lang === 'tr' ? categoriesTR : categoriesEN;
  
  const text = lang === 'tr' ? {
    title1: "Merak Edilen",
    title2: "Sorular",
    desc: `İklim değişikliği, Genç İklim Şurası ve çevresel sorumluluklarımız hakkında en çok sorulan ve yanıtları bilmeniz gereken kritik ${faqs.length} soru.`,
    searchPlaceholder: "Soru veya cevap içinde ara...",
    allLabel: `📚 Tümü (${faqs.length})`,
    notFound: "Aramanızla eşleşen soru bulunamadı."
  } : {
    title1: "Frequently Asked",
    title2: "Questions",
    desc: `The most critical ${faqs.length} questions and answers you need to know about climate change, the Youth Climate Council, and our environmental responsibilities.`,
    searchPlaceholder: "Search within questions or answers...",
    allLabel: `📚 All (${faqs.length})`,
    notFound: "No questions matched your search."
  };

  const activeCategoryDefault = lang === 'tr' ? "Tümü" : "All";
  
  const [activeCategory, setActiveCategory] = useState(activeCategoryDefault);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Update active category when language changes
  useEffect(() => {
    if (lang === 'tr' && !categoriesTR.includes(activeCategory)) {
        setActiveCategory("Tümü");
    } else if (lang === 'en' && !categoriesEN.includes(activeCategory)) {
        setActiveCategory("All");
    }
  }, [lang, activeCategory]);

  const filtered = faqs.filter((faq) => {
    const matchCategory = activeCategory === (lang === 'tr' ? "Tümü" : "All") || faq.category === activeCategory;
    const matchSearch =
      searchTerm === "" ||
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-background text-on-surface font-body animate-fade-in">
      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-12 animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4 text-primary font-headline">
            {text.title1} <span className="text-on-surface-variant font-medium">{text.title2}</span>
          </h1>
          <p className="text-on-surface-variant text-lg leading-relaxed">
            {text.desc}
          </p>
        </header>

        {/* Search */}
        <div className="mb-8 relative animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>search</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={text.searchPlaceholder}
            className="w-full pl-14 pr-6 py-5 rounded-2xl border border-outline-variant/30 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 bg-surface-container text-on-surface text-lg transition-all outline-none font-medium placeholder-on-surface-variant/50 shadow-lg"
          />
        </div>

        {/* Category Filter with Sliding Indicator */}
        <div className="relative inline-flex flex-wrap md:flex-nowrap gap-2 bg-surface-container-lowest p-2 rounded-full border border-outline-variant/20 shadow-lg mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {(() => {
            const [tabStyle, setTabStyle] = useState({ left: 8, top: 8, width: 0, height: 0, opacity: 0 });
            const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

            useEffect(() => {
              const activeIndex = categories.indexOf(activeCategory);
              const currTab = tabsRef.current[activeIndex];
              if (currTab) {
                setTabStyle({
                  left: currTab.offsetLeft,
                  top: currTab.offsetTop,
                  width: currTab.offsetWidth,
                  height: currTab.offsetHeight,
                  opacity: 1
                });
              }
            }, [activeCategory, categories]);

            return (
              <>
                <div
                  className="absolute bg-primary rounded-full shadow-[0_0_20px_rgba(107,255,143,0.3)] transition-all duration-300 ease-in-out pointer-events-none"
                  style={{
                    left: tabStyle.left,
                    top: tabStyle.top,
                    width: tabStyle.width,
                    height: tabStyle.height,
                    opacity: tabStyle.opacity
                  }}
                />
                {categories.map((cat, idx) => (
                  <button
                    key={cat}
                    ref={el => { tabsRef.current[idx] = el; }}
                    onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
                    className={`relative z-10 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest cursor-pointer border-none outline-none transition-colors ${activeCategory === cat
                        ? "text-on-primary"
                        : "bg-transparent text-on-surface-variant hover:text-on-surface"
                      }`}
                  >
                    {cat === (lang === 'tr' ? "Tümü" : "All") ? text.allLabel : cat}
                  </button>
                ))}
              </>
            );
          })()}
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filtered.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen
                    ? "border-primary/50 shadow-[0_0_30px_rgba(107,255,143,0.1)] bg-surface-container-highest"
                    : "border-outline-variant/20 bg-surface-container hover:border-outline-variant hover:bg-surface-container-high"
                  }`}
                style={{ animationDelay: `${Math.min((idx + 3) * 0.05, 0.5)}s` }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-6 md:p-8 flex items-center justify-between cursor-pointer bg-transparent border-none outline-none group"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <span className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm transition-colors ${isOpen ? 'bg-primary text-on-primary' : 'bg-surface-container-lowest text-primary-dim group-hover:bg-primary/20'}`}>
                      {idx + 1}
                    </span>
                    <span className={`font-bold text-lg leading-snug transition-colors ${isOpen ? 'text-on-surface' : 'text-on-surface-variant group-hover:text-on-surface'}`}>
                      {faq.question}
                    </span>
                  </div>
                  <span
                    className={`material-symbols-outlined flex-shrink-0 ml-4 transition-transform duration-300 ${isOpen ? 'text-primary' : 'text-on-surface-variant group-hover:text-primary-dim'}`}
                    style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}
                  >
                    expand_more
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 md:px-8 pb-8 pt-0">
                      <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/10 relative">
                        <span className="material-symbols-outlined absolute top-6 left-6 text-primary/40 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>format_quote</span>
                        <p className="text-on-surface-variant leading-relaxed pl-10 text-base">
                          {faq.answer}
                        </p>
                      </div>
                      <div className="mt-4 flex">
                        <span className="inline-block text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border border-primary/30 text-primary">
                          {faq.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 bg-surface-container rounded-3xl border border-outline-variant/10 mt-8">
            <span className="material-symbols-outlined text-6xl text-outline-variant mb-4">search_off</span>
            <p className="text-on-surface-variant text-lg">{text.notFound}</p>
          </div>
        )}
      </main>
    </div>
  );
}
