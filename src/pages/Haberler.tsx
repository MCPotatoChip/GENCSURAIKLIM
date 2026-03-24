//@ts-nocheck
import { useState } from "react";
import { useTheme } from "../App";
import { earnBadge } from "../hooks/useBadges";

interface Article {
  id: string;
  category: 'ipcc' | 'turkey' | 'global' | 'tech';
  date: string;
  source: string;
  url: string;
  titleTR: string; titleEN: string;
  summaryTR: string; summaryEN: string;
  icon: string;
  color: string;
}

const articles: Article[] = [
  {
    id: 'ar6', category: 'ipcc', date: '2023-03-20', source: 'IPCC', url: 'https://www.ipcc.ch/report/ar6/syr/',
    icon: 'science', color: 'blue',
    titleTR: 'IPCC AR6 Sentez Raporu Yayımlandı',
    titleEN: 'IPCC AR6 Synthesis Report Released',
    summaryTR: '1,5°C sınırını aşmamak için karbon emisyonlarının 2025\'ten önce zirveye ulaşması gerektiği sonucuna varıldı. Mevcut politikalarla yüzyıl sonunda 3.2°C ısınma öngörülüyor.',
    summaryEN: 'Concluded that carbon emissions must peak before 2025 to stay within the 1.5°C limit. Current policies project 3.2°C warming by the end of the century.',
  },
  {
    id: 'cop28', category: 'global', date: '2023-12-13', source: 'UNFCCC', url: 'https://unfccc.int/cop28',
    icon: 'public', color: 'emerald',
    titleTR: 'COP28 Dubai: Fosil Yakıtlardan Geçiş Anlaşması',
    titleEN: 'COP28 Dubai: Fossil Fuel Transition Agreement',
    summaryTR: 'COP28\'de 190\'dan fazla ülke fosil yakıtlardan "geçiş" konusunda uzlaşma sağladı. Yenilenebilir enerji kapasitesini 2030\'a kadar üç katına çıkarma hedefi benimsendi.',
    summaryEN: 'More than 190 countries agreed on "transitioning" from fossil fuels at COP28. A goal to triple renewable energy capacity by 2030 was adopted.',
  },
  {
    id: 'turkey_drought', category: 'turkey', date: '2024-01-15', source: 'Meteoroloji', url: 'https://www.mgm.gov.tr',
    icon: 'water_drop', color: 'orange',
    titleTR: 'Türkiye\'de 2023 Barajları Tarihin En Düşük Doluluk Oranına Ulaştı',
    titleEN: 'Turkey\'s 2023 Reservoirs Hit Historically Low Levels',
    summaryTR: 'Türkiye genelinde baraj doluluk oranı yüzde 40\'ların altına indi. İç Anadolu ve Ege\'de azalan yağışlar tarımsa büyük tehdit oluşturuyor.',
    summaryEN: 'Reservoir levels across Turkey fell below 40%. Decreasing rainfall in Central Anatolia and the Aegean poses a major threat to agriculture.',
  },
  {
    id: 'solar_record', category: 'tech', date: '2024-02-01', source: 'IEA', url: 'https://www.iea.org/reports/renewables-2023',
    icon: 'wb_sunny', color: 'yellow',
    titleTR: 'Güneş Enerjisi 2023\'te Rekor Büyümeyle Nükleerle Eşitlendi',
    titleEN: 'Solar Energy Matched Nuclear with Record Growth in 2023',
    summaryTR: 'IEA verilerine göre 2023\'te dünyada yüklenen güneş enerjisi kapasitesi 413 GW\'a ulaştı ve nükleer enerjinin toplam kapasitesini geçti.',
    summaryEN: 'According to IEA data, global installed solar capacity reached 413 GW in 2023, surpassing total nuclear energy capacity.',
  },
  {
    id: 'arctic_ice', category: 'global', date: '2023-09-19', source: 'NSIDC', url: 'https://nsidc.org/',
    icon: 'ac_unit', color: 'cyan',
    titleTR: 'Antarktika Deniz Buzu Rekor Düşük Seviyede',
    titleEN: 'Antarctic Sea Ice at Record Low',
    summaryTR: 'Antarktika deniz buzu Eylül 2023\'te 17 milyon km²\'nin altına düşerek ölçüm tarihinin en düşük kış maksimumunu kırdı.',
    summaryEN: 'Antarctic sea ice fell below 17 million km² in September 2023, breaking the lowest winter maximum in measurement history.',
  },
  {
    id: 'turkey_ev', category: 'turkey', date: '2024-03-01', source: 'OAİB', url: 'https://www.oaib.org.tr/',
    icon: 'electric_car', color: 'green',
    titleTR: 'TOGG ile Türkiye Elektrikli Araç Üretiminde İlk Adım',
    titleEN: 'Turkey Takes First Step in EV Production with TOGG',
    summaryTR: 'Türkiye\'nin yerli elektrikli otomobili TOGG\'un seri üretimine başlandı. 2030\'a kadar 1 milyon elektrikli araç hedefi iklim hedefleriyle uyumlu.',
    summaryEN: 'Mass production of Turkey\'s domestic electric car, TOGG, has begun. The goal of 1 million electric vehicles by 2030 aligns with climate targets.',
  },
  {
    id: 'methane', category: 'ipcc', date: '2023-11-08', source: 'Copernicus', url: 'https://atmosphere.copernicus.eu/',
    icon: 'co2', color: 'red',
    titleTR: 'Atmosferik Metan Konsantrasyonu 2023\'te Tüm Zamanların Rekorunu Kırdı',
    titleEN: 'Atmospheric Methane Hit All-Time High in 2023',
    summaryTR: 'Copernicus\'a göre 2023\'te atmosferdeki metan konsantrasyonu 1923 ppb\'ye ulaştı. Bu değer sanayi öncesi döneme kıyasla %165 artışa işaret ediyor.',
    summaryEN: 'According to Copernicus, methane concentration in the atmosphere reached 1923 ppb in 2023, signaling a 165% increase compared to the pre-industrial period.',
  },
  {
    id: 'forest_fire', category: 'turkey', date: '2023-08-01', source: 'OGM', url: 'https://www.ogm.gov.tr/',
    icon: 'local_fire_department', color: 'rose',
    titleTR: '2023 Yaz Yangın Sezonu Türkiye\'de ~12.000 Hektar Orman Yaktı',
    titleEN: '2023 Wildfire Season Burned ~12,000 Hectares of Forest in Turkey',
    summaryTR: 'Ege ve Akdeniz bölgelerinde etkili olan 2023 yangın sezonu yüzlerce yangın olayını kapsıyor. İklim değişikliği riski her geçen yıl artıyor.',
    summaryEN: 'The 2023 fire season, effective in Aegean and Mediterranean regions, covers hundreds of fire incidents. Climate change risk increases year by year.',
  },
];

const catsTR = { all: 'Tümü', ipcc: 'IPCC', turkey: 'Türkiye', global: 'Dünya', tech: 'Teknoloji' };
const catsEN = { all: 'All', ipcc: 'IPCC', turkey: 'Turkey', global: 'Global', tech: 'Technology' };
const colorMap: Record<string, string> = {
  blue: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
  emerald: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
  orange: 'bg-orange-500/10 border-orange-500/30 text-orange-400',
  yellow: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
  cyan: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400',
  green: 'bg-green-500/10 border-green-500/30 text-green-400',
  red: 'bg-red-500/10 border-red-500/30 text-red-400',
  rose: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
};

let newsEarned = false;

export default function Haberler() {
  const { lang } = useTheme();
  const [catFilter, setCatFilter] = useState<string>('all');

  // Badge trigger
  if (!newsEarned) { earnBadge('news_reader'); newsEarned = true; }

  const text = lang === 'tr' ? {
    title1: 'İklim', title2: 'Haberleri',
    desc: 'Küresel ve yerel iklim haberlerini, IPCC raporlarını ve çevre gelişmelerini takip edin.',
    readMore: 'Kaynağa Git →',
    source: 'Kaynak',
  } : {
    title1: 'Climate', title2: 'News',
    desc: 'Follow global and local climate news, IPCC reports, and environmental developments.',
    readMore: 'Visit Source →',
    source: 'Source',
  };

  const cats = lang === 'tr' ? catsTR : catsEN;
  const filtered = catFilter === 'all' ? articles : articles.filter(a => a.category === catFilter);

  return (
    <div className="w-full">
      <main className="pt-24 pb-20 px-6 max-w-5xl mx-auto">
        <header className="mb-10">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 font-headline">
            {text.title1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">{text.title2}</span>
          </h1>
          <p className="text-lg text-on-surface-variant max-w-2xl">{text.desc}</p>
        </header>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {Object.entries(cats).map(([key, label]) => (
            <button key={key} onClick={() => setCatFilter(key)}
              className={`px-4 py-1.5 rounded-full text-sm font-bold border transition-all ${catFilter === key ? 'bg-blue-500/20 border-blue-400/50 text-blue-300' : 'border-transparent text-on-surface-variant hover:text-on-surface'}`}>
              {label}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map(article => {
            const cls = colorMap[article.color] ?? colorMap.blue;
            return (
              <a key={article.id} href={article.url} target="_blank" rel="noopener noreferrer"
                className="group glass-card rounded-2xl border border-outline-variant/20 p-6 hover:border-blue-500/30 transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] block no-underline">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 flex-shrink-0 rounded-xl flex items-center justify-center border ${cls}`}>
                    <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>{article.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${cls}`}>
                        {(cats as Record<string, string>)[article.category]}
                      </span>
                      <span className="text-[10px] text-on-surface-variant">{text.source}: <strong>{article.source}</strong></span>
                      <span className="text-[10px] text-on-surface-variant ml-auto">{new Date(article.date).toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-US', { year: 'numeric', month: 'short' })}</span>
                    </div>
                    <h2 className="text-sm font-black text-on-surface mb-2 group-hover:text-blue-300 transition-colors">
                      {lang === 'tr' ? article.titleTR : article.titleEN}
                    </h2>
                    <p className="text-xs text-on-surface-variant leading-relaxed mb-3">
                      {lang === 'tr' ? article.summaryTR : article.summaryEN}
                    </p>
                    <span className="text-xs font-bold text-blue-400 group-hover:text-blue-300 transition-colors">
                      {text.readMore}
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </main>
    </div>
  );
}
