import { useState, useRef, useEffect } from "react";
import { useTheme } from "../App";
import { earnBadge } from "../hooks/useBadges";

interface Term {
    term: string;
    definition: string;
    category: string;
}

const termsTR: Term[] = [
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

const termsEN: Term[] = [
    // --- Basic ---
    { term: "Greenhouse Effect", definition: "The process where gases in the atmosphere trap the sun's rays and warm the earth. Water vapor, CO₂, and methane are major greenhouse gases.", category: "Basic" },
    { term: "Carbon Footprint", definition: "The total amount of greenhouse gas emissions produced directly and indirectly by an individual, organization, or product.", category: "Basic" },
    { term: "Carbon Neutral", definition: "The state of reducing net greenhouse gas emissions to zero by withdrawing CO₂ from the atmosphere exactly equal to the amount produced.", category: "Basic" },
    { term: "Net Zero Emissions", definition: "The amount of greenhouse gas emitted into the atmosphere equaling the amount absorbed. A global goal set for 2050.", category: "Basic" },
    { term: "Global Warming", definition: "The long-term increase in average temperatures on the Earth's surface due to greenhouse gas emissions.", category: "Basic" },
    { term: "Climate Change", definition: "Long-term changes in average weather conditions. Encompasses temperature, precipitation, and wind patterns.", category: "Basic" },
    { term: "Greenhouse Gas", definition: "A gas that traps heat in the atmosphere and contributes to the greenhouse effect (CO₂, CH₄, N₂O, water vapor, etc.).", category: "Basic" },
    { term: "Carbon Budget", definition: "The maximum amount of CO₂ that can be emitted into the atmosphere to keep global warming within a certain limit.", category: "Basic" },
    { term: "Fossil Fuel", definition: "Energy sources like coal, oil, and natural gas formed over millions of years that release CO₂ when burned.", category: "Basic" },
    { term: "Emission", definition: "The general name for gases or particles released into the atmosphere as a result of any process.", category: "Basic" },

    // --- Scientific ---
    { term: "Permafrost", definition: "A layer of soil that remains frozen continuously for at least two years. Thawing causes massive methane release.", category: "Scientific" },
    { term: "Albedo", definition: "The percentage of sunlight reflected by a surface. Glaciers have high albedo; melting accelerates warming.", category: "Scientific" },
    { term: "Ozone Layer", definition: "The gas layer located in the stratosphere that filters the sun's harmful ultraviolet rays.", category: "Scientific" },
    { term: "Thermohaline Circulation", definition: "The global ocean current system driven by differences in temperature and salinity in the oceans.", category: "Scientific" },
    { term: "Feedback Loop", definition: "Mechanisms by which climate change either accelerates or slows itself down. Glacier melting is a positive feedback.", category: "Scientific" },
    { term: "Climate Sensitivity", definition: "How much global average temperature will increase when atmospheric CO₂ doubles.", category: "Scientific" },
    { term: "Paleoclimatology", definition: "The study of past climate conditions through ice cores, sediments, and fossils.", category: "Scientific" },
    { term: "Ocean Acidification", definition: "Drop in pH value resulting from oceans absorbing CO₂ from the atmosphere. Affects coral reefs and marine life.", category: "Scientific" },
    { term: "Jet Stream", definition: "High-speed air current flowing in the stratosphere. Climate change can disrupt these currents, leading to extreme weather events.", category: "Scientific" },
    { term: "ENSO", definition: "El Niño–Southern Oscillation. Pacific Ocean climate variability system; affects global climate.", category: "Scientific" },

    // --- Gases ---
    { term: "Carbon Dioxide (CO₂)", definition: "Major greenhouse gas released by burning fossil fuels. Atmospheric concentration is ~422 ppm.", category: "Gases" },
    { term: "Methane (CH₄)", definition: "A greenhouse gas ~80 times more potent than CO₂. Arises from agriculture, landfills, and natural gas leaks.", category: "Gases" },
    { term: "Nitrous Oxide (N₂O)", definition: "A potent greenhouse gas arising from agricultural activities and industrial processes.", category: "Gases" },
    { term: "HFCs", definition: "Hydrofluorocarbons. Potent greenhouse gases used in refrigeration and air conditioning systems.", category: "Gases" },
    { term: "Sulfur Hexafluoride (SF₆)", definition: "A greenhouse gas used in electrical equipment, 23,500 times more potent than CO₂.", category: "Gases" },

    // --- Organizations ---
    { term: "IPCC", definition: "Intergovernmental Panel on Climate Change. UN body that assesses and reports on climate science.", category: "Organizations" },
    { term: "UNFCCC", definition: "UN Framework Convention on Climate Change. Agreement that frames international climate negotiations.", category: "Organizations" },
    { term: "UNEP", definition: "UN Environment Programme. Major UN agency dealing with global environmental issues.", category: "Organizations" },
    { term: "IEA", definition: "International Energy Agency. International organization working on energy security and clean energy transition.", category: "Organizations" },
    { term: "IRENA", definition: "International Renewable Energy Agency. Intergovernmental organization supporting the adoption of renewable energy.", category: "Organizations" },

    // --- Policy ---
    { term: "Paris Agreement", definition: "International agreement signed in 2015, aiming to keep global warming below 2°C (preferably 1.5°C).", category: "Policy" },
    { term: "Kyoto Protocol", definition: "International agreement signed in 1997, imposing greenhouse gas reduction obligations on developed nations.", category: "Policy" },
    { term: "COP", definition: "Conference of the Parties. Annual climate negotiation meeting of countries party to the UNFCCC.", category: "Policy" },
    { term: "NDC", definition: "Nationally Determined Contribution. Greenhouse gas reduction commitment submitted by each country under the Paris Agreement.", category: "Policy" },
    { term: "Carbon Tax", definition: "A pricing mechanism applied to CO₂ and other greenhouse gas emissions.", category: "Policy" },
    { term: "Carbon Trading", definition: "A market system where companies or countries buy and sell carbon emission allowances.", category: "Policy" },
    { term: "Green Deal", definition: "Comprehensive policy package aimed at reaching climate neutrality by 2050 for the EU.", category: "Policy" },
    { term: "Climate Justice", definition: "Advocacy for the rights of communities that create the least impact on climate change but suffer the most from it.", category: "Policy" },
    { term: "Green Economy", definition: "A low-carbon economic model that integrates environmental sustainability with social equity.", category: "Policy" },
    { term: "Carbon Border Tax", definition: "A tax applied to offset the carbon cost involved in the production of imported goods.", category: "Policy" },

    // --- Energy ---
    { term: "Renewable Energy", definition: "Naturally replenished and inexhaustible energy sources such as solar, wind, and hydroelectric.", category: "Energy" },
    { term: "Solar Energy", definition: "Energy derived from sunlight through photovoltaic panels or solar thermal collectors.", category: "Energy" },
    { term: "Wind Energy", definition: "Conversion of wind's kinetic energy into electricity via wind turbines.", category: "Energy" },
    { term: "Nuclear Energy", definition: "Energy produced via nuclear fission, emitting zero CO₂ during operation.", category: "Energy" },
    { term: "Green Hydrogen", definition: "Clean hydrogen fuel produced by electrolyzing water with renewable energy.", category: "Energy" },
    { term: "Energy Storage", definition: "Storing energy generated from renewable sources using batteries, pumped hydro, etc.", category: "Energy" },
    { term: "Smart Grid", definition: "An electrical grid that optimizes energy flow using digital technology, facilitating renewable energy integration.", category: "Energy" },
    { term: "Energy Efficiency", definition: "A collective term for technologies and behaviors that consume less energy to perform the same task.", category: "Energy" },

    // --- Environment ---
    { term: "Deforestation", definition: "The destruction of forest areas for agriculture, urbanization, or timber. Contributes to increased CO₂ in the atmosphere.", category: "Environment" },
    { term: "Biodiversity", definition: "The variety of life present in an ecosystem. Climate change threatens biodiversity.", category: "Environment" },
    { term: "Water Scarcity", definition: "Inadequate availability of usable fresh water resources. Climate change increases this risk.", category: "Environment" },
    { term: "Drought", definition: "A long-term shortage of precipitation. The frequency and severity of droughts are increasing with climate change.", category: "Environment" },
    { term: "Glacial Melt", definition: "The melting of polar and mountain glaciers due to rising temperatures; contributes to sea level rise.", category: "Environment" },
    { term: "Sea Level Rise", definition: "The rise in sea levels caused by the melting of glaciers and ice sheets along with thermal expansion of sea water.", category: "Environment" },
    { term: "Coral Bleaching", definition: "Corals expelling their symbiotic algae, becoming colorless and dying, as ocean temperatures rise.", category: "Environment" },
    { term: "Invasive Species", definition: "Organisms that harm local ecosystems when introduced outside their natural habitat. Climate change facilitates their spread.", category: "Environment" },
    { term: "Wildfire", definition: "Uncontrolled fire triggered by drought and high temperatures. Climate change increases the risk.", category: "Environment" },
    { term: "Microplastic", definition: "Plastic particles smaller than 5 mm. Damages ocean ecosystems and organisms.", category: "Environment" },

    // --- Technology ---
    { term: "Carbon Capture (CCS)", definition: "The technology of capturing and storing CO₂ underground from the atmosphere or at the source.", category: "Technology" },
    { term: "Direct Air Capture (DAC)", definition: "Machine-based technology that directly extracts and stores CO₂ from the atmosphere.", category: "Technology" },
    { term: "Circular Economy", definition: "An economic model based on reusing resources to minimize waste generation.", category: "Technology" },
    { term: "Electric Vehicle (EV)", definition: "A vehicle powered by electricity rather than fossil fuels. Reduces transportation emissions.", category: "Technology" },
    { term: "Green Building", definition: "Structures designed according to the principles of energy efficiency, water conservation, and low emissions.", category: "Technology" },
    { term: "Geothermal Energy", definition: "Electricity generation or heating utilizing the natural heat energy in the Earth's crust.", category: "Technology" },
    { term: "Biofuel", definition: "Fuel derived from organic matter. Biodiesel and bioethanol are major examples.", category: "Technology" },
    { term: "Smart Agriculture", definition: "Data-driven agricultural technologies that optimize irrigation, fertilizer, and pesticide use.", category: "Technology" },

    // --- Impacts ---
    { term: "Extreme Weather", definition: "Unusual meteorological events like severe storms, floods, droughts, heatwaves; increasing in frequency due to climate change.", category: "Impacts" },
    { term: "Climate Refugee", definition: "A person displaced due to climate change-induced droughts, floods, or rising sea levels.", category: "Impacts" },
    { term: "Food Insecurity", definition: "Decline in agricultural production and difficulty in accessing food due to changing precipitation and temperature patterns.", category: "Impacts" },
    { term: "Urban Heat Island", definition: "Major cities having significantly higher temperatures than their surroundings, caused by dense infrastructure.", category: "Impacts" },
    { term: "Vector-Borne Disease", definition: "Diseases transmitted by carrier organisms like mosquitoes and ticks, whose habitats expand with rising temperatures.", category: "Impacts" },
    { term: "Ecological Collapse", definition: "An ecosystem reaching a state where it can no longer fulfill its critical functions.", category: "Impacts" },
    { term: "Ocean Warming", definition: "Increase in average temperatures of oceans which absorb the majority of excess heat.", category: "Impacts" },
    { term: "Freshwater Decline", definition: "Reduction in available freshwater reserves due to glacial melt, over-extraction, and climate change.", category: "Impacts" },
    { term: "Air Pollution", definition: "Contamination of air by harmful substances emitted from sources like industry and vehicle emissions.", category: "Impacts" },
    { term: "Acid Rain", definition: "Acidic rainfall resulting from the combination of water with gases like SO₂ and NO₂ in the atmosphere.", category: "Impacts" },

    // --- Biology ---
    { term: "Ecosystem", definition: "An ecological system formed by living organisms interacting with each other and their environment.", category: "Biology" },
    { term: "Species Migration", definition: "Organisms shifting their habitats to more suitable regions due to climate change.", category: "Biology" },
    { term: "Mass Extinction", definition: "The extinction of a vast majority of species over a short geological period. A 6th mass extinction is currently underway.", category: "Biology" },
    { term: "Photosynthesis", definition: "The process by which plants convert CO₂ and water into glucose using solar energy; fundamental to the carbon cycle.", category: "Biology" },
    { term: "Carbon Sink", definition: "An ecosystem that absorbs more carbon from the atmosphere than it releases (e.g., forests, oceans, soil).", category: "Biology" },
    { term: "Phenology", definition: "The study of the seasonal cycles of living things. Climate change disrupts phenological timings.", category: "Biology" },
    { term: "Food Chain", definition: "The sequential relationship through which energy is transferred from one organism to another. Disrupted by climate change.", category: "Biology" },
    { term: "Blue Carbon", definition: "Carbon stored by coastal ecosystems such as mangroves, seagrasses, and salt marshes.", category: "Biology" },
    { term: "Biomass", definition: "Organic material derived from living or recently deceased organisms; forms the basis for renewable energy.", category: "Biology" },
    { term: "Microbiome", definition: "The entire collection of microorganisms inhabiting an ecosystem. Climate change impacts soil and ocean microbiomes.", category: "Biology" },
];

export default function Sozluk() {
    const { lang } = useTheme();
    
    const terms = lang === 'tr' ? termsTR : termsEN;
    const categories = [...new Set(terms.map((t) => t.category))];
    
    const text = lang === 'tr' ? {
        title1: "İklim",
        title2: "Sözlüğü",
        desc: `Gezegenimizin geleceğini anlamak için ihtiyacınız olan temel kavramlar ve bilimsel terimler rehberi. ${terms.length} terimi keşfedin.`,
        searchLabel: "Terim Ara",
        searchPlaceholder: "Örn: Karbon Ayak İzi...",
        all: "Tümü",
        showing: "Gösterilen sonuç:",
        featured: "Öne Çıkan Kavram -",
        ecoIndex: "Ekosistem Endeksi",
        notFound: "Terim Bulunamadı",
        tryAgain: "Farklı bir arama yapmayı deneyin."
    } : {
        title1: "Climate",
        title2: "Glossary",
        desc: `The fundamental concepts and scientific terms guide you need to understand our planet's future. Discover ${terms.length} terms.`,
        searchLabel: "Search Term",
        searchPlaceholder: "e.g. Carbon Footprint...",
        all: "All",
        showing: "Showing result:",
        featured: "Featured Concept -",
        ecoIndex: "Ecosystem Index",
        notFound: "Term Not Found",
        tryAgain: "Try making a different search."
    };

    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    // Reset filtering when translation language changes
    useEffect(() => {
        setActiveCategory(null);
    }, [lang]);

    const filtered = terms
        .filter((t) => {
            const matchSearch = t.term.toLowerCase().includes(search.toLowerCase()) ||
                t.definition.toLowerCase().includes(search.toLowerCase());
            const matchCat = !activeCategory || t.category === activeCategory;
            return matchSearch && matchCat;
        })
        .sort((a, b) => a.term.localeCompare(b.term, lang === 'tr' ? "tr" : "en"));

    useEffect(() => {
        if (search.length > 0) {
            earnBadge('knowledge_seeker');
        }
        if (search.length > 2 && filtered.length > 0) {
            earnBadge('glossary_master');
        }
    }, [search, filtered.length]);

    return (
        <div className="w-full">
            <main className="pt-24 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
                {/* Hero Section */}
                <header className="mb-20">
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-on-surface mb-6 font-headline">
                        {text.title1} <span className="text-primary italic">{text.title2}</span>
                    </h1>
                    <p className="text-xl text-on-surface-variant max-w-2xl leading-relaxed font-body">
                        {text.desc}
                    </p>
                </header>

                {/* Search and Filter Shell */}
                <section className="mb-16 flex flex-col md:flex-row gap-6 items-end">
                    <div className="w-full md:w-1/3">
                        <label className="block text-xs font-bold uppercase tracking-widest text-primary mb-3 ml-1 font-label">{text.searchLabel}</label>
                        <div className="relative">
                            <input
                                className="w-full bg-surface-variant/50 border-2 border-primary/20 rounded-2xl h-14 pl-14 pr-6 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary/60 focus:border-primary transition-all font-body placeholder:text-gray-500/80 outline-none"
                                placeholder={text.searchPlaceholder}
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
                                }, [activeCategory, lang]);

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
                                                {cat ? cat : text.all}
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
                    <p className="text-sm text-on-surface-variant mb-6 font-body">{text.showing} {filtered.length}</p>
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
                                                <span className="text-xs font-bold py-1 px-3 bg-primary/10 text-primary rounded-full uppercase tracking-tighter">{text.featured} {t.category}</span>
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
                                            <span className="text-xs font-bold text-primary uppercase">{text.ecoIndex}</span>
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
                        <p className="text-xl font-headline font-bold mb-2">{text.notFound}</p>
                        <p className="text-sm">{text.tryAgain}</p>
                    </div>
                )}
            </main>
        </div>
    );
}
