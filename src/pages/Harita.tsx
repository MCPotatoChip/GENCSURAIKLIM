//@ts-nocheck
import { useState, useEffect, useRef } from "react";
import { useTheme } from "../App";
import { earnBadge } from "../hooks/useBadges";

interface RegionData {
    id: string;
    name: string;
    description: string;
    riskLevel: number;
    tempIncrease: number;
    precipitationChange: number;
    // Position as fixed % on the overlay (x=left%, y=top%)
    pos: [number, number];
    impact: string;
    mainRisk: string;
}

const regionsTR: RegionData[] = [
    { id: "marmara", name: "Marmara", description: "Kentsel ısı adası çok yüksek. Deniz seviyesi yükselmesi kıyıları tehdit ediyor.", riskLevel: 85, tempIncrease: 1.8, precipitationChange: -15, pos: [23, 24], impact: "Kentsel & Kıyı", mainRisk: "Isı Adası" },
    { id: "ege", name: "Ege", description: "Orman yangını riski çok yüksek. Tarımsal üretim doğrudan tehdit altında.", riskLevel: 92, tempIncrease: 2.1, precipitationChange: -22, pos: [14, 47], impact: "Tarım & Orman", mainRisk: "Yangın Riski" },
    { id: "akdeniz", name: "Akdeniz", description: "Tatlı su kaynaklarında ciddi azalma. Ekstremlerin frekansı artıyor.", riskLevel: 88, tempIncrease: 2.3, precipitationChange: -28, pos: [27, 68], impact: "Su Kaynakları", mainRisk: "Kuraklık" },
    { id: "icana", name: "İç Anadolu", description: "Uzun kuraklık periyotları. Göller ve yeraltı suları çekiliyor.", riskLevel: 95, tempIncrease: 2.5, precipitationChange: -30, pos: [43, 44], impact: "Tarım & Gıda", mainRisk: "Kritik Kuraklık" },
    { id: "karadeniz", name: "Karadeniz", description: "Ani yağışlar sebebiyle sel ve heyelan riski logaritmik artışta.", riskLevel: 78, tempIncrease: 1.4, precipitationChange: +12, pos: [48, 18], impact: "Afet Riski", mainRisk: "Sel & Heyelan" },
    { id: "doguanadolu", name: "Doğu Anadolu", description: "Kar örtüsü azalıyor. İlkbahar taşkınları ve yaz su kıtlığı artıyor.", riskLevel: 75, tempIncrease: 1.9, precipitationChange: -10, pos: [68, 34], impact: "Su Döngüsü", mainRisk: "Erime & Taşkın" },
    { id: "gda", name: "G.D. Anadolu", description: "Yüksek sıcaklıklar tarımı imkansız kılıyor. Çölleşme hızlanıyor.", riskLevel: 97, tempIncrease: 2.8, precipitationChange: -35, pos: [62, 60], impact: "Çölleşme", mainRisk: "Aşırı Sıcaklık" },
];

const regionsEN: RegionData[] = [
    { id: "marmara", name: "Marmara", description: "Very high urban heat island. Sea level rise threatens the coastline.", riskLevel: 85, tempIncrease: 1.8, precipitationChange: -15, pos: [23, 24], impact: "Urban & Coastal", mainRisk: "Heat Island" },
    { id: "ege", name: "Aegean", description: "Very high wildfire risk. Agricultural production under direct threat.", riskLevel: 92, tempIncrease: 2.1, precipitationChange: -22, pos: [14, 47], impact: "Agriculture & Forest", mainRisk: "Wildfire Risk" },
    { id: "akdeniz", name: "Mediterranean", description: "Serious freshwater depletion. Frequency of extremes increasing.", riskLevel: 88, tempIncrease: 2.3, precipitationChange: -28, pos: [27, 68], impact: "Water Resources", mainRisk: "Drought" },
    { id: "icana", name: "Central Anatolia", description: "Long drought periods. Lakes and groundwater retreating rapidly.", riskLevel: 95, tempIncrease: 2.5, precipitationChange: -30, pos: [43, 44], impact: "Agriculture & Food", mainRisk: "Critical Drought" },
    { id: "karadeniz", name: "Black Sea", description: "Sudden rainfall causing logarithmic rise in floods and landslides.", riskLevel: 78, tempIncrease: 1.4, precipitationChange: +12, pos: [48, 18], impact: "Disaster Risk", mainRisk: "Floods & Landslides" },
    { id: "doguanadolu", name: "Eastern Anatolia", description: "Snowpack declining. Spring floods and summer water scarcity rising.", riskLevel: 75, tempIncrease: 1.9, precipitationChange: -10, pos: [68, 34], impact: "Water Cycle", mainRisk: "Melt & Floods" },
    { id: "gda", name: "SE Anatolia", description: "Extreme heat making farming impossible. Desertification is accelerating.", riskLevel: 97, tempIncrease: 2.8, precipitationChange: -35, pos: [62, 60], impact: "Desertification", mainRisk: "Extreme Heat" },
];

const getRiskColor = (risk: number) => {
    if (risk >= 95) return { dot: "bg-red-500", border: "border-red-500/60", text: "text-red-400", badge: "bg-red-500/20 text-red-300 border-red-500/40" };
    if (risk >= 88) return { dot: "bg-orange-500", border: "border-orange-500/60", text: "text-orange-400", badge: "bg-orange-500/20 text-orange-300 border-orange-500/40" };
    if (risk >= 80) return { dot: "bg-yellow-500", border: "border-yellow-500/60", text: "text-yellow-400", badge: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40" };
    return { dot: "bg-emerald-500", border: "border-emerald-500/60", text: "text-emerald-400", badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40" };
};

// Timeline scenario projected data per region (2024 baseline, +x per decade)
const getProjectedTemp = (baseTemp: number, year: number) => {
    const decades = (year - 2024) / 10;
    return +(baseTemp + decades * 0.4).toFixed(1);
};
const getProjectedRisk = (baseRisk: number, year: number) => {
    const decades = (year - 2024) / 10;
    return Math.min(100, Math.round(baseRisk + decades * 3));
};

export default function Harita() {
    const { lang } = useTheme();
    const regions = lang === 'tr' ? regionsTR : regionsEN;

    const text = lang === 'tr' ? {
        title1: "Türkiye", title2: "İklim Risk Haritası",
        desc: "Bölgelerine göre iklim değişikliği risklerini inceleyin. Harita üzerindeki noktalar sabit kalır.",
        mapLayersLabel: "Katman",
        Wind: "Rüzgar", Temp: "Sıcaklık", Rain: "Yağış",
        regionalAnalysis: "Bölgesel Risk Analizi",
        riskLabel: "Risk", tempLabel: "Sıcaklık Artışı", precipLabel: "Yağış Değişimi",
        impactLabel: "Tehdit Alanı", mainRiskLabel: "Ana Risk",
        timelineLabel: "Gelecek Projeksiyon Tahmini", playLabel: "Oynat", pauseLabel: "Durdur",
        year: "Yıl",
        scoreCard: "Türkiye Geneli Risk Skoru",
    } : {
        title1: "Turkey", title2: "Climate Risk Map",
        desc: "Examine climate change risks by region. Markers on the map remain fixed.",
        mapLayersLabel: "Layer",
        Wind: "Wind", Temp: "Temperature", Rain: "Rain",
        regionalAnalysis: "Regional Risk Analysis",
        riskLabel: "Risk", tempLabel: "Temp Increase", precipLabel: "Precip Change",
        impactLabel: "Threat Area", mainRiskLabel: "Main Risk",
        timelineLabel: "Future Estemate Projection", playLabel: "Play", pauseLabel: "Pause",
        year: "Year",
        scoreCard: "Turkey Overall Risk Score",
    };

    const [mapLayer, setMapLayer] = useState<'wind' | 'temp' | 'rain'>('wind');
    const [selectedRegion, setSelectedRegion] = useState<RegionData>(regions[3]); // default: İç Anadolu
    const [timelineYear, setTimelineYear] = useState(2024);
    const [isPlaying, setIsPlaying] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Sync selected region when language changes
    useEffect(() => {
        const updated = regions.find(r => r.id === selectedRegion.id);
        if (updated) setSelectedRegion(updated);
    }, [lang]);

    // Auto-play timeline
    useEffect(() => {
        if (isPlaying) {
            intervalRef.current = setInterval(() => {
                setTimelineYear(y => {
                    if (y >= 2100) {
                        setIsPlaying(false);
                        return 2100;
                    }
                    return y + 1;
                });
            }, 80);
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, [isPlaying]);

    const mapUrls = {
        wind: "https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=mm&metricTemp=%C2%B0C&metricWind=km%2Fh&zoom=5&overlay=wind&product=ecmwf&level=surface&lat=39.0&lon=35.0&detailLat=39.0&detailLon=35.0",
        temp: "https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=mm&metricTemp=%C2%B0C&metricWind=km%2Fh&zoom=5&overlay=temp&product=ecmwf&level=surface&lat=39.0&lon=35.0&detailLat=39.0&detailLon=35.0",
        rain: "https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=mm&metricTemp=%C2%B0C&metricWind=km%2Fh&zoom=5&overlay=rain&product=ecmwf&level=surface&lat=39.0&lon=35.0&detailLat=39.0&detailLon=35.0",
    };

    const projTemp = getProjectedTemp(selectedRegion.tempIncrease, timelineYear);
    const projRisk = getProjectedRisk(selectedRegion.riskLevel, timelineYear);
    const colors = getRiskColor(projRisk);
    const yearProgress = (timelineYear - 2024) / (2100 - 2024);

    return (
        <div className="w-full">
            <main className="pt-24 pb-16 px-4 md:px-8 max-w-[1800px] mx-auto">
                {/* Header */}
                <header className="mb-8">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-on-surface mb-2 font-headline">
                        {text.title1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">{text.title2}</span>
                    </h1>
                    <p className="text-base text-on-surface-variant max-w-2xl">{text.desc}</p>
                </header>

                {/* Layer Selector */}
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-500/80">{text.mapLayersLabel}:</span>
                    {([
                        { id: 'wind' as const, label: text.Wind, icon: 'air' },
                        { id: 'temp' as const, label: text.Temp, icon: 'thermostat' },
                        { id: 'rain' as const, label: text.Rain, icon: 'water_drop' },
                    ]).map(l => (
                        <button key={l.id} onClick={() => { setMapLayer(l.id); earnBadge('map_explorer'); }}
                            className={`px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-1.5 transition-all border ${mapLayer === l.id ? 'bg-emerald-600 text-white border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.5)]' : 'border-emerald-900/40 text-emerald-300/60 hover:text-emerald-200'}`}>
                            <span className="material-symbols-outlined text-sm">{l.icon}</span>
                            {l.label}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                    {/* Map + Markers (LEFT) */}
                    <div className="xl:col-span-7 flex flex-col gap-4">
                        {/* Map Container — markers are absolute children so they scroll with nothing */}
                        <div className="relative rounded-3xl overflow-hidden border border-emerald-900/50 bg-[#030906]" style={{ height: '520px' }}>
                            {/* Iframe — pointer-events disabled so user can't scroll the map */}
                            <iframe
                                src={mapUrls[mapLayer]}
                                className="w-full h-full border-none opacity-75"
                                title="İklim Haritası"
                                style={{ pointerEvents: 'none' }}
                            />

                            {/* Fixed Marker Overlay — ALWAYS stays in position over iframe */}
                            <div className="absolute inset-0 z-10">
                                {regions.map((region) => {
                                    const c = getRiskColor(getProjectedRisk(region.riskLevel, timelineYear));
                                    const isSelected = selectedRegion.id === region.id;
                                    return (
                                        <div
                                            key={region.id}
                                            className="absolute"
                                            style={{ left: `${region.pos[0]}%`, top: `${region.pos[1]}%`, transform: 'translate(-50%, -50%)' }}
                                        >
                                            {/* Pulse ring */}
                                            {isSelected && (
                                                <div className={`absolute inset-0 -m-3 rounded-full border-2 ${c.border} animate-ping opacity-60`} />
                                            )}
                                            <button
                                                onClick={() => setSelectedRegion(region)}
                                                className={`relative w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-200 shadow-lg
                                                    ${isSelected ? `${c.dot} ${c.border} scale-125 shadow-[0_0_20px_rgba(255,255,255,0.3)]` : `bg-black/60 ${c.border} hover:scale-110`}`}
                                                title={region.name}
                                            >
                                                <div className={`w-3 h-3 rounded-full ${isSelected ? 'bg-white' : c.dot}`} />
                                            </button>
                                            <div className={`absolute left-1/2 -translate-x-1/2 top-full mt-1 px-2 py-0.5 rounded-md text-[10px] font-black whitespace-nowrap pointer-events-none
                                                ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                                                ${c.badge} border backdrop-blur-sm`}>
                                                {region.name}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Vignette */}
                            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(3,9,6,0.9)] z-0" />
                        </div>

                        {/* Timeline Control */}
                        <div className="glass-card rounded-2xl border border-emerald-900/30 p-5 flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-500/80 block">{text.timelineLabel}</span>
                                    <span className="text-3xl font-black text-emerald-100 font-headline">{timelineYear}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => { setTimelineYear(2024); setIsPlaying(false); }}
                                        className="w-9 h-9 rounded-full bg-emerald-950 flex items-center justify-center hover:bg-emerald-900 border border-emerald-800/50 transition-colors text-emerald-400"
                                    >
                                        <span className="material-symbols-outlined text-lg">restart_alt</span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (timelineYear >= 2100) setTimelineYear(2024);
                                            setIsPlaying(p => !p);
                                            earnBadge('era_explorer');
                                        }}
                                        className="px-4 h-9 rounded-full bg-emerald-600 flex items-center justify-center hover:bg-emerald-500 border border-emerald-400/50 transition-colors text-white font-bold text-sm gap-1.5"
                                    >
                                        <span className="material-symbols-outlined text-lg">{isPlaying ? 'pause' : 'play_arrow'}</span>
                                        {isPlaying ? text.pauseLabel : text.playLabel}
                                    </button>
                                </div>
                            </div>
                            <input
                                type="range" min="2024" max="2100" step="1" value={timelineYear}
                                onChange={(e) => { setIsPlaying(false); setTimelineYear(parseInt(e.target.value)); }}
                                className="w-full h-2 rounded-lg appearance-none cursor-pointer outline-none"
                                style={{ background: `linear-gradient(to right, #10b981 0%, #10b981 ${yearProgress * 100}%, #052e16 ${yearProgress * 100}%, #052e16 100%)` }}
                            />
                            <div className="flex justify-between text-[10px] font-bold text-emerald-500/50 px-0.5">
                                <span>2024</span><span>2040</span><span>2060</span><span>2080</span><span>2100</span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT PANEL — Selected Region Details + All Regions list */}
                    <div className="xl:col-span-5 flex flex-col gap-4 max-h-[800px] overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-900/50 scrollbar-track-transparent pr-1">
                        {/* Selected Region Detail */}
                        <div className={`glass-card rounded-2xl p-6 border ${colors.border} transition-all`}>
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h2 className={`text-3xl font-black font-headline ${colors.text}`}>{selectedRegion.name}</h2>
                                    <p className="text-xs text-emerald-100/50 mt-1">{selectedRegion.description}</p>
                                </div>
                                <div className={`text-right px-3 py-1 rounded-xl border ${colors.badge}`}>
                                    <div className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-70">{text.year}</div>
                                    <div className="text-2xl font-black">{timelineYear}</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className={`p-4 rounded-xl bg-black/30 border ${colors.border} flex flex-col gap-1`}>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500/60">{text.riskLabel}</span>
                                    <div className={`text-4xl font-black ${colors.text}`}>{projRisk}<span className="text-base opacity-40">/100</span></div>
                                    <div className="h-1.5 bg-black/50 rounded-full mt-1">
                                        <div className={`h-full ${colors.dot} rounded-full transition-all duration-500`} style={{ width: `${projRisk}%` }} />
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl bg-black/30 border border-emerald-900/40 flex flex-col gap-1">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500/60">{text.tempLabel}</span>
                                    <div className="text-4xl font-black text-red-400">+{projTemp}°<span className="text-base opacity-50">C</span></div>
                                    <div className="text-[10px] text-emerald-500/50 mt-1">2024 baz: +{selectedRegion.tempIncrease}°C</div>
                                </div>
                                <div className="p-4 rounded-xl bg-black/30 border border-emerald-900/40 flex flex-col gap-1">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500/60">{text.precipLabel}</span>
                                    <div className="text-3xl font-black text-yellow-400">{selectedRegion.precipitationChange > 0 ? '+' : ''}{selectedRegion.precipitationChange}%</div>
                                </div>
                                <div className="p-4 rounded-xl bg-black/30 border border-emerald-900/40 flex flex-col gap-1">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500/60">{text.mainRiskLabel}</span>
                                    <div className="text-sm font-black text-white mt-1">{selectedRegion.mainRisk}</div>
                                    <div className="text-[10px] text-emerald-500/50">{selectedRegion.impact}</div>
                                </div>
                            </div>
                        </div>

                        {/* All Regions List */}
                        <div className="glass-card rounded-2xl border border-emerald-900/30 p-4">
                            <h3 className="text-xs font-black uppercase tracking-widest text-emerald-500/80 mb-3 px-1">{text.regionalAnalysis}</h3>
                            <div className="flex flex-col gap-2">
                                {regions.map((region) => {
                                    const pRisk = getProjectedRisk(region.riskLevel, timelineYear);
                                    const c = getRiskColor(pRisk);
                                    const isSelected = selectedRegion.id === region.id;
                                    return (
                                        <button
                                            key={region.id}
                                            onClick={() => setSelectedRegion(region)}
                                            className={`w-full text-left p-3 rounded-xl border transition-all flex items-center gap-3
                                                ${isSelected ? `${c.border} bg-black/40` : 'border-emerald-900/20 hover:border-emerald-800/40 bg-black/20'}`}
                                        >
                                            <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${c.dot} ${isSelected ? 'shadow-[0_0_8px_currentColor]' : ''}`} />
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <span className={`text-sm font-black ${isSelected ? c.text : 'text-emerald-100'}`}>{region.name}</span>
                                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full border ${c.badge}`}>{region.mainRisk}</span>
                                                </div>
                                                <div className="flex items-center gap-3 mt-1">
                                                    <span className="text-[10px] text-emerald-500/50">{text.riskLabel}: <span className={`font-black ${c.text}`}>{pRisk}</span>/100</span>
                                                    <span className="text-[10px] text-red-400/70">+{getProjectedTemp(region.tempIncrease, timelineYear)}°C</span>
                                                </div>
                                            </div>
                                            <div className="w-12 h-1.5 bg-black/50 rounded-full flex-shrink-0">
                                                <div className={`h-full ${c.dot} rounded-full transition-all duration-500`} style={{ width: `${pRisk}%` }} />
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
