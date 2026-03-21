import { useState, useRef, useEffect } from "react";

interface Term {
    term: string;
    definition: string;
    category: string;
}

const terms: Term[] = [
    // --- Temel ---
    { term: "Sera Etkisi", definition: "Atmosferdeki gazların güneş ışınlarını hapsederek dünyayı ısıtması olayı. Su buharı, CO₂, metan başlıca sera gazlarıdır.", category: "Temel" },
    { term: "Karbon Ayak İzi", definition: "Bir bireyin, kuruluşun veya ürünün doğrudan ve dolaylı olarak ürettiği toplam sera gazı emisyonu miktarı.", category: "Temel" },
    { term: "Karbon Nötr", definition: "Üretilen CO₂ miktarı kadar atmosferden CO₂ çekerek net sera gazı emisyonunu sıfıra indirme durumu.", category: "Temel" },
    { term: "Net Sıfır Emisyon", definition: "Atmosfere salınan sera gazı miktarının, geri emilen miktara eşit olması. 2050 hedefi olarak belirlenen küresel amaç.", category: "Temel" },
    { term: "Küresel Isınma", definition: "Sera gazı emisyonları nedeniyle dünya yüzeyindeki ortalama sıcaklıkların uzun vadede artması.", category: "Temel" },
    { term: "İklim Değişikliği", definition: "Ortalama hava koşullarındaki uzun dönemli değişimler. Sıcaklık, yağış, rüzgar örüntülerini kapsar.", category: "Temel" },
    { term: "Sera Gazı", definition: "Atmosferde ısıyı tutan ve sera etkisine katkıda bulunan gaz (CO₂, CH₄, N₂O, su buharı vb.).", category: "Temel" },
    { term: "Karbon Bütçesi", definition: "Küresel ısınmayı belirli bir sınırda tutmak için atmosfere salınabilecek maksimum CO₂ miktarı.", category: "Temel" },
    { term: "Fosil Yakıt", definition: "Kömür, petrol ve doğal gaz gibi milyonlarca yılda oluşan, yanınca CO₂ çıkaran enerji kaynakları.", category: "Temel" },
    { term: "Emisyon", definition: "Herhangi bir süreç sonucunda atmosfere salınan gaz veya partiküllerin genel adı.", category: "Temel" },

    // --- Bilimsel ---
    { term: "Permafrost", definition: "En az iki yıl sürekli donmuş kalan toprak tabakası. Erimesi büyük miktarda metan salınımına neden olur.", category: "Bilimsel" },
    { term: "Albedo", definition: "Bir yüzeyin güneş ışığını yansıtma yüzdesi. Buzullar yüksek albedoya sahiptir; erimeleri ısınmayı hızlandırır.", category: "Bilimsel" },
    { term: "Ozon Tabakası", definition: "Stratosferde bulunan ve güneşin zararlı ultraviyole ışınlarını filtreleyen gaz tabakası.", category: "Bilimsel" },
    { term: "Termohalin Dolaşım", definition: "Okyanuslardaki sıcaklık ve tuz farklılıklarından kaynaklanan global okyanus akıntısı sistemi.", category: "Bilimsel" },
    { term: "Geri Besleme Döngüsü", definition: "İklim değişikliğinin kendi kendini hızlandırdığı ya da yavaşlattığı mekanizmalar. Buzul erimesi pozitif geri beslemedir.", category: "Bilimsel" },
    { term: "İklim Duyarlılığı", definition: "Atmosferdeki CO₂ miktarı iki katına çıktığında küresel ortalama sıcaklığın ne kadar artacağı.", category: "Bilimsel" },
    { term: "Paleoklimatoloji", definition: "Geçmişteki iklim koşullarını buzul karotları, tortular ve fosiller aracılığıyla inceleyen bilim dalı.", category: "Bilimsel" },
    { term: "Deniz Asitlenmesi", definition: "Okyanusların atmosferden CO₂ emmesi sonucu pH değerinin düşmesi. Mercan resifleri ve deniz yaşamını etkiler.", category: "Bilimsel" },
    { term: "Jet Akımı", definition: "Stratosferde yüksek hızda akan hava akımı. İklim değişikliği bu akımları bozarak aşırı hava olaylarına yol açabilir.", category: "Bilimsel" },
    { term: "ENSO", definition: "El Niño–Güney Salınımı. Pasifik Okyanusu'ndaki iklim değişkenliği sistemi; küresel iklimi etkiler.", category: "Bilimsel" },

    // --- Gazlar ---
    { term: "Karbondioksit (CO₂)", definition: "Fosil yakıtların yanmasıyla açığa çıkan başlıca sera gazı. Atmosferdeki konsantrasyonu ~422 ppm.", category: "Gazlar" },
    { term: "Metan (CH₄)", definition: "CO₂'den ~80 kat daha güçlü bir sera gazı. Tarım, çöp depolama ve doğal gaz sızıntılarından kaynaklanır.", category: "Gazlar" },
    { term: "Azot Oksit (N₂O)", definition: "Tarımsal faaliyetler ve sanayi süreçlerinden kaynaklanan güçlü bir sera gazı.", category: "Gazlar" },
    { term: "HFC'ler", definition: "Hidroflorokarbonlar. Soğutma ve klima sistemlerinde kullanılan güçlü sera gazları.", category: "Gazlar" },
    { term: "Sülfür Heksaflorit (SF₆)", definition: "Elektrik ekipmanlarında kullanılan, CO₂'den 23.500 kat güçlü bir sera gazı.", category: "Gazlar" },

    // --- Kuruluşlar ---
    { term: "IPCC", definition: "Hükümetlerarası İklim Değişikliği Paneli. İklim bilimini değerlendiren ve raporlayan BM kuruluşu.", category: "Kuruluşlar" },
    { term: "UNFCCC", definition: "BM İklim Değişikliği Çerçeve Sözleşmesi. Uluslararası iklim müzakerelerinin çerçevesini oluşturan anlaşma.", category: "Kuruluşlar" },
    { term: "UNEP", definition: "BM Çevre Programı. Küresel çevre sorunlarını ele alan başlıca BM ajansı.", category: "Kuruluşlar" },
    { term: "IEA", definition: "Uluslararası Enerji Ajansı. Enerji güvenliği ve temiz enerji geçişi konusunda çalışan uluslararası kuruluş.", category: "Kuruluşlar" },
    { term: "IRENA", definition: "Uluslararası Yenilenebilir Enerji Ajansı. Yenilenebilir enerjinin benimsenmesini destekleyen hükümetlerarası kuruluş.", category: "Kuruluşlar" },

    // --- Politika ---
    { term: "Paris Anlaşması", definition: "2015'te imzalanan, küresel ısınmayı 2°C'nin (tercihen 1.5°C) altında tutmayı hedefleyen uluslararası anlaşma.", category: "Politika" },
    { term: "Kyoto Protokolü", definition: "1997'de imzalanan, gelişmiş ülkelere sera gazı azaltım yükümlülükleri getiren uluslararası anlaşma.", category: "Politika" },
    { term: "COP", definition: "Taraflar Konferansı. UNFCCC'ye taraf ülkelerin yıllık iklim müzakereleri toplantısı.", category: "Politika" },
    { term: "NDC", definition: "Ulusal Katkı Beyanı. Her ülkenin Paris Anlaşması kapsamında sunduğu sera gazı azaltım taahhüdü.", category: "Politika" },
    { term: "Karbon Vergisi", definition: "CO₂ ve diğer sera gazı emisyonlarına uygulanan fiyatlandırma mekanizması.", category: "Politika" },
    { term: "Karbon Ticareti", definition: "Şirketlerin ya da ülkelerin karbon emisyon izinlerini alıp sattığı piyasa sistemi.", category: "Politika" },
    { term: "Yeşil Mutabakat", definition: "AB'nin 2050'ye kadar iklim nötrlüğüne ulaşmayı hedefleyen kapsamlı politika paketi.", category: "Politika" },
    { term: "İklim Adaleti", definition: "İklim değişikliğinin etkilerini en az yaratan ama en çok yaşayan toplulukların hakları için savunuculuk.", category: "Politika" },
    { term: "Yeşil Ekonomi", definition: "Çevresel sürdürülebilirliği sosyal eşitlikle bütünleştiren, düşük karbonlu ekonomik model.", category: "Politika" },
    { term: "Karbon Sınır Vergisi", definition: "İthal edilen ürünlerin üretim sürecindeki karbon maliyetini dengelemek için uygulanan vergi.", category: "Politika" },

    // --- Enerji ---
    { term: "Yenilenebilir Enerji", definition: "Güneş, rüzgar, hidroelektrik gibi doğal olarak yenilenen ve tükenmeyen enerji kaynakları.", category: "Enerji" },
    { term: "Güneş Enerjisi", definition: "Fotovoltaik paneller veya ısı toplayıcılar yoluyla güneş ışınlarından elde edilen enerji.", category: "Enerji" },
    { term: "Rüzgar Enerjisi", definition: "Rüzgar türbinleri aracılığıyla rüzgarın kinetik enerjisinin elektriğe dönüştürülmesi.", category: "Enerji" },
    { term: "Nükleer Enerji", definition: "Nükleer fisyon yoluyla üretilen, işletme sırasında CO₂ salınımı olmayan enerji kaynağı.", category: "Enerji" },
    { term: "Yeşil Hidrojen", definition: "Yenilenebilir enerji ile suyun elektrolizi yoluyla üretilen temiz hidrojen yakıtı.", category: "Enerji" },
    { term: "Enerji Depolama", definition: "Yenilenebilir enerji kaynaklarından üretilen enerjinin pil, pompalı su vb. yöntemlerle saklanması.", category: "Enerji" },
    { term: "Akıllı Şebeke", definition: "Enerji akışını dijital teknoloji ile optimize eden, yenilenebilir enerji entegrasyonunu kolaylaştıran elektrik ağı.", category: "Enerji" },
    { term: "Enerji Verimliliği", definition: "Aynı işi yaparken daha az enerji harcayan teknoloji ve davranışların bütünü.", category: "Enerji" },

    // --- Çevre ---
    { term: "Ormansızlaşma", definition: "Orman alanlarının tarım, kentleşme veya kereste için yok edilmesi. Atmosferdeki CO₂ artışına katkıda bulunur.", category: "Çevre" },
    { term: "Biyoçeşitlilik", definition: "Bir ekosistemde var olan canlı çeşitliliği. İklim değişikliği biyoçeşitliliği tehdit eder.", category: "Çevre" },
    { term: "Su Kıtlığı", definition: "Kullanılabilir tatlı su kaynaklarının yetersiz kalması. İklim değişikliği bu riski artırır.", category: "Çevre" },
    { term: "Kuraklık", definition: "Uzun süre yağış eksikliği. İklim değişikliği ile kuraklıkların sıklığı ve şiddeti artmaktadır.", category: "Çevre" },
    { term: "Buzul Erimesi", definition: "Artan sıcaklıklar nedeniyle kutup ve dağ buzullarının erimesi; deniz seviyesini yükseltir.", category: "Çevre" },
    { term: "Deniz Seviyesi Yükselmesi", definition: "Buzul ve buz tabakalarının erimesi ile deniz sularının ısıyla genleşmesi sonucu deniz seviyesinin artması.", category: "Çevre" },
    { term: "Mercan Ağarması", definition: "Okyanus sıcaklığı yükselince mercanların simbiyotik alglerini bırakarak renksizleşmesi ve ölmesi.", category: "Çevre" },
    { term: "İstilacı Tür", definition: "Doğal habitatı dışına taşınarak yerel ekosistemlere zarar veren canlı. İklim değişikliği yayılımlarını kolaylaştırır.", category: "Çevre" },
    { term: "Orman Yangını", definition: "Kuraklık ve yüksek sıcaklıkla tetiklenen kontrolsüz yangın. İklim değişikliği riski artırır.", category: "Çevre" },
    { term: "Mikroplastik", definition: "5 mm'den küçük plastik parçacıklar. Okyanus ekosistemlerine ve canlılara zarar verir.", category: "Çevre" },

    // --- Teknoloji ---
    { term: "Karbon Yakalama (CCS)", definition: "Atmosferdeki veya kaynaktaki CO₂'nin tutulup yeraltında depolanması teknolojisi.", category: "Teknoloji" },
    { term: "Doğrudan Hava Yakalama (DAC)", definition: "CO₂'yi doğrudan atmosferden emen ve depolayan makine tabanlı teknoloji.", category: "Teknoloji" },
    { term: "Döngüsel Ekonomi", definition: "Atık oluşumunu minimize eden, kaynakları yeniden kullanmaya dayalı ekonomik model.", category: "Teknoloji" },
    { term: "Elektrikli Araç (EV)", definition: "Fosil yakıt yerine elektrikle çalışan araç. Ulaşım kaynaklı emisyonları azaltır.", category: "Teknoloji" },
    { term: "Yeşil Bina", definition: "Enerji verimliliği, su tasarrufu ve düşük emisyon ilkelerine göre tasarlanan yapı.", category: "Teknoloji" },
    { term: "Jeotermal Enerji", definition: "Yer kabuğundaki doğal ısı enerjisinden yararlanarak elektrik üretimi veya ısıtma.", category: "Teknoloji" },
    { term: "Biyoyakıt", definition: "Organik maddelerden elde edilen yanıt. Biyodizel ve biyoetanol başlıca örneklerdir.", category: "Teknoloji" },
    { term: "Akıllı Tarım", definition: "Sulama, gübre ve ilaç kullanımını optimize eden veri tabanlı tarım teknolojileri.", category: "Teknoloji" },

    // --- Etki ---
    { term: "Aşırı Hava Olayları", definition: "Şiddetli fırtına, sel, kuraklık, sıcak dalgası gibi sıradan dışı meteorolojik olaylar; iklim değişikliğiyle sıklaşır.", category: "Etki" },
    { term: "İklim Mültecisi", definition: "İklim değişikliğinin yol açtığı kuraklık, sel veya yükselen deniz seviyesi nedeniyle yerinden edilen kişi.", category: "Etki" },
    { term: "Gıda Güvensizliği", definition: "Değişen yağış ve sıcaklık düzenleri nedeniyle tarımsal üretimin düşmesi ve gıdaya erişimin zorlaşması.", category: "Etki" },
    { term: "Kentsel Isı Adası", definition: "Büyük şehirlerin etrafına kıyasla daha yüksek sıcaklığa sahip olması; yoğun yapılaşmadan kaynaklanır.", category: "Etki" },
    { term: "Vektör Kaynaklı Hastalık", definition: "Sıcaklık artışı ile yayılan sivrisinek, kene gibi taşıyıcı canlılar aracılığıyla bulaşan hastalıklar.", category: "Etki" },
    { term: "Ekolojik Çöküş", definition: "Bir ekosistemin kritik işlevlerini yerine getiremeyecek hale gelmesi.", category: "Etki" },
    { term: "Okyanus Isınması", definition: "Fazla ısının büyük bölümünü absorbe eden okyanusların ortalama sıcaklığının artması.", category: "Etki" },
    { term: "Tatlı Su Azalması", definition: "Buzul erimesi, aşırı çekim ve iklim değişikliğinin etkisiyle kullanılabilir tatlı su rezervlerinin düşmesi.", category: "Etki" },
    { term: "Hava Kirliliği", definition: "Endüstriyel ve araç emisyonları gibi kaynaklardan yayılan zararlı maddelerin havayı kirletmesi.", category: "Etki" },
    { term: "Asit Yağmuru", definition: "SO₂ ve NO₂ gibi gazların atmosferde suyla birleşmesi sonucu oluşan asidik yağış.", category: "Etki" },

    // --- Biyoloji ---
    { term: "Ekosistem", definition: "Canlıların birbirleriyle ve çevreyle oluşturduğu ekolojik sistem.", category: "Biyoloji" },
    { term: "Tür Göçü", definition: "Canlıların iklim değişikliği nedeniyle daha uygun habitatlara doğru yer değiştirmesi.", category: "Biyoloji" },
    { term: "Kütlesel Yok Oluş", definition: "Dünya tarihinde kısa jeolojik sürede türlerin büyük çoğunluğunun yok olması. 6. yok oluş süreci yaşanmaktadır.", category: "Biyoloji" },
    { term: "Fotosentez", definition: "Bitkilerin güneş enerjisini kullanarak CO₂ ve suyu glikoza dönüştürmesi; karbon döngüsünün temelidir.", category: "Biyoloji" },
    { term: "Karbon Yutağı", definition: "Atmosferden daha fazla karbon emen, serbest bırakan ekosistem (ormanlar, okyanuslar, toprak).", category: "Biyoloji" },
    { term: "Fenoloji", definition: "Canlıların mevsimsel döngülerini inceleyen bilim. İklim değişikliği fenolojik zamanlamaları bozar.", category: "Biyoloji" },
    { term: "Besin Zinciri", definition: "Enerjinin bir canlıdan diğerine aktarıldığı sıralı ilişki. İklim değişikliği bu zincirleri bozar.", category: "Biyoloji" },
    { term: "Mavi Karbon", definition: "Mangrov, deniz çayırı ve tuzlu bataklık gibi kıyı ekosistemlerince depolanan karbon.", category: "Biyoloji" },
    { term: "Biyokütle", definition: "Canlı veya yakın zamanda ölmüş organizmalardan elde edilen organik malzeme; enerji kaynağı olarak kullanılır.", category: "Biyoloji" },
    { term: "Mikrobiyom", definition: "Bir ekosistemde yaşayan mikroorganizmaların bütünü. İklim değişikliği toprak ve okyanus mikrobiyomlarını etkiler.", category: "Biyoloji" },
];

const categories = [...new Set(terms.map((t) => t.category))];

export default function Sozluk() {
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const filtered = terms
        .filter((t) => {
            const matchSearch = t.term.toLowerCase().includes(search.toLowerCase()) ||
                t.definition.toLowerCase().includes(search.toLowerCase());
            const matchCat = !activeCategory || t.category === activeCategory;
            return matchSearch && matchCat;
        })
        .sort((a, b) => a.term.localeCompare(b.term, "tr"));

    return (
        <div className="w-full">
            <main className="pt-24 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
                {/* Hero Section */}
                <header className="mb-20">
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-on-surface mb-6 font-headline">
                        İklim <span className="text-primary italic">Sözlüğü</span>
                    </h1>
                    <p className="text-xl text-on-surface-variant max-w-2xl leading-relaxed font-body">
                        Gezegenimizin geleceğini anlamak için ihtiyacınız olan temel kavramlar ve bilimsel terimler rehberi. {terms.length} terimi keşfedin.
                    </p>
                </header>

                {/* Search and Filter Shell */}
                <section className="mb-16 flex flex-col md:flex-row gap-6 items-end">
                    <div className="w-full md:w-1/3">
                        <label className="block text-xs font-bold uppercase tracking-widest text-primary mb-3 ml-1 font-label">Terim Ara</label>
                        <div className="relative">
                            <input
                                className="w-full bg-surface-container-lowest border-none rounded-2xl h-14 pl-14 pr-6 text-on-surface focus:ring-1 focus:ring-primary/40 transition-all outline-none font-body"
                                placeholder="Örn: Karbon Ayak İzi..."
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-primary/60">manage_search</span>
                        </div>
                    </div>
                    {/* Category Filter with Sliding Indicator */}
                    <div className="flex-1 relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <div className="relative inline-flex flex-wrap md:flex-nowrap gap-2 bg-surface-container-lowest p-2 rounded-[24px] border border-outline-variant/20 shadow-lg">
                            {(() => {
                                const allCats = [null, ...categories];
                                const [tabStyle, setTabStyle] = useState({ left: 8, top: 8, width: 0, height: 0, opacity: 0 });
                                const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

                                useEffect(() => {
                                    const activeIndex = allCats.indexOf(activeCategory);
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
                                }, [activeCategory]);

                                return (
                                    <>
                                        <div 
                                            className="absolute bg-primary rounded-full shadow-[0_0_20px_rgba(107,255,143,0.3)] biolume-glow transition-all duration-300 ease-in-out pointer-events-none"
                                            style={{ 
                                                left: tabStyle.left, 
                                                top: tabStyle.top,
                                                width: tabStyle.width, 
                                                height: tabStyle.height,
                                                opacity: tabStyle.opacity
                                            }}
                                        />
                                        {allCats.map((cat, idx) => (
                                            <button
                                                key={cat || "all"}
                                                ref={el => { tabsRef.current[idx] = el; }}
                                                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                                                className={`relative z-10 px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider transition-colors cursor-pointer border-none outline-none ${
                                                    activeCategory === cat
                                                        ? "text-on-primary"
                                                        : "bg-transparent text-on-surface-variant hover:text-on-surface"
                                                }`}
                                            >
                                                {cat ? cat : "Tümü"}
                                            </button>
                                        ))}
                                    </>
                                );
                            })()}
                        </div>
                    </div>
                </section>

                {/* Result count */}
                {(search || activeCategory) && (
                    <p className="text-sm text-on-surface-variant mb-6 font-body">Gösterilen sonuç: {filtered.length}</p>
                )}

                {/* Bento Grid Glossary */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {filtered.map((t, i) => {
                        // Apply styling dynamically based on result sequence
                        if (i === 0 && !search && !activeCategory) {
                            return (
                                <div key={t.term} className="md:col-span-8 group">
                                    <div className="glass-card rounded-2xl p-10 h-full flex flex-col justify-between biolume-glow transition-all duration-500 hover:scale-[1.01] hover:bg-surface-container-highest/80 border border-outline-variant/10">
                                        <div>
                                            <div className="flex justify-between items-start mb-8">
                                                <span className="text-xs font-bold py-1 px-3 bg-primary/10 text-primary rounded-full uppercase tracking-tighter">Öne Çıkan Kavram - {t.category}</span>
                                                <span className="material-symbols-outlined text-primary-dim opacity-40 group-hover:opacity-100 transition-opacity">auto_awesome</span>
                                            </div>
                                            <h2 className="text-4xl font-extrabold text-on-surface mb-6 tracking-tight font-headline">{t.term}</h2>
                                            <p className="text-lg text-on-surface-variant leading-relaxed max-w-2xl font-body">
                                                {t.definition}
                                            </p>
                                        </div>
                                        <div className="mt-12 flex items-center gap-4">
                                            <div className="h-1 flex-1 bg-surface-container-lowest rounded-full overflow-hidden">
                                                <div className="h-full bg-primary w-2/3 shadow-[0_0_10px_rgba(107,255,143,0.5)]"></div>
                                            </div>
                                            <span className="text-xs font-bold text-primary uppercase">Ekosistem Endeksi</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        } else if (i % 3 === 1) {
                            return (
                                <div key={t.term} className="md:col-span-4 group">
                                    <div className="glass-card rounded-2xl p-8 h-full biolume-glow transition-all duration-500 hover:scale-[1.01] border-l-4 border-l-primary/30 border-t border-r border-b border-outline-variant/10">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
                                            <span className="text-[10px] font-black uppercase text-secondary/60">{t.category}</span>
                                        </div>
                                        <h2 className="text-2xl font-bold text-on-surface mb-4 font-headline">{t.term}</h2>
                                        <p className="text-on-surface-variant text-sm leading-relaxed font-body">
                                            {t.definition}
                                        </p>
                                    </div>
                                </div>
                            );
                        } else if (i % 3 === 2) {
                            return (
                                <div key={t.term} className="md:col-span-4 group">
                                    <div className="relative overflow-hidden rounded-2xl p-8 h-full flex flex-col justify-center transition-all duration-500 hover:scale-[1.01] bg-gradient-to-br from-emerald-900/40 to-surface-container border border-outline-variant/5">
                                        <div className="absolute right-[-10%] bottom-[-10%] opacity-10 pointer-events-none">
                                            <span className="material-symbols-outlined text-[120px]">cyclone</span>
                                        </div>
                                        <div className="flex items-center justify-between mb-3 relative z-10">
                                            <h2 className="text-2xl font-bold text-primary font-headline">{t.term}</h2>
                                        </div>
                                        <p className="text-on-surface-variant text-sm leading-relaxed relative z-10 font-body mb-4">
                                            {t.definition}
                                        </p>
                                        <div className="relative z-10">
                                            <span className="text-[10px] font-bold py-1 px-2 bg-surface-container-lowest text-on-surface-variant rounded uppercase">{t.category}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        } else {
                            return (
                                <div key={t.term} className="md:col-span-4 group">
                                    <div className="glass-card rounded-2xl p-8 h-full transition-all duration-500 hover:scale-[1.01] bg-surface-container/40 hover:bg-surface-container/80 border border-outline-variant/10">
                                        <h2 className="text-xl font-bold text-on-surface mb-3 flex items-center justify-between font-headline">
                                            {t.term}
                                            <span className="text-[10px] font-black uppercase text-primary/40 tracking-widest">{t.category}</span>
                                        </h2>
                                        <p className="text-on-surface-variant text-sm leading-relaxed font-body">
                                            {t.definition}
                                        </p>
                                    </div>
                                </div>
                            );
                        }
                    })}
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-20 text-on-surface-variant glass-card rounded-2xl mt-12 border border-outline-variant/10">
                        <div className="text-5xl mb-4"><span className="material-symbols-outlined text-6xl opacity-50">search_off</span></div>
                        <p className="text-xl font-headline font-bold mb-2">Terim Bulunamadı</p>
                        <p className="text-sm">Farklı bir arama yapmayı deneyin.</p>
                    </div>
                )}
            </main>
        </div>
    );
}
