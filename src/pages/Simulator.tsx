//@ts-nocheck
import { useState, useMemo, useRef, useEffect } from "react";
import { useTheme } from "../App";
import { earnBadge } from "../hooks/useBadges";

interface Scenario {
    id: string;
    title: string;
    icon: string;
    description: string;
    unit: string;
    min: number;
    max: number;
    defaultVal: number;
    step: number;
    calcSaving: (val: number) => number;
    savingUnit: string;
    population: number;
    context: string;
    category: string;
    color: string;
}

const scenariosTR: Scenario[] = [
    { id: "car", title: "Araba Kullanımını Azaltma", icon: "directions_car", description: "Herkes günde kaç km daha az araba kullansa?", unit: "km/gün", min: 0, max: 50, defaultVal: 10, step: 1, calcSaving: (km) => km * 0.21 * 365 * 85_000_000 / 1_000_000, savingUnit: "M ton CO₂/yıl", population: 85_000_000, context: "Türkiye nüfusu baz alınmıştır.", category: "karbon", color: "primary" },
    { id: "meat", title: "Et Tüketimini Azaltma", icon: "restaurant", description: "Herkes haftada kaç öğün daha az et yese?", unit: "öğün/hafta", min: 0, max: 14, defaultVal: 3, step: 1, calcSaving: (meals) => meals * 3.3 * 52 * 85_000_000 / 1_000_000, savingUnit: "M ton CO₂/yıl", population: 85_000_000, context: "Bir öğün sığır eti ~3.3 kg CO₂", category: "karbon", color: "primary" },
    { id: "energy", title: "Enerji Tasarrufu", icon: "bolt", description: "Herkes elektrik tüketimini yüzde kaç azaltsa?", unit: "%", min: 0, max: 50, defaultVal: 10, step: 1, calcSaving: (pct) => (pct / 100) * 200 * 0.5 * 12 * 85_000_000 / 1_000_000, savingUnit: "M ton CO₂/yıl", population: 85_000_000, context: "Kişi başı aylık ~200 kWh, 0.5 kg CO₂/kWh", category: "karbon", color: "primary" },
    { id: "recycle", title: "Geri Dönüşüm", icon: "recycling", description: "Herkes çöpünün yüzde kaçını geri dönüştürse?", unit: "%", min: 0, max: 100, defaultVal: 50, step: 5, calcSaving: (pct) => (pct / 100) * 2.5 * 52 * 85_000_000 / 1_000_000, savingUnit: "M ton CO₂/yıl", population: 85_000_000, context: "Kişi başı hft: ~5 kg çöp", category: "karbon", color: "primary" },
    { id: "tree", title: "Ağaç Dikme", icon: "nature", description: "Her aile kaç ağaç dikse?", unit: "ağaç/aile", min: 0, max: 20, defaultVal: 2, step: 1, calcSaving: (trees) => trees * 22 * 20_000_000 / 1_000_000, savingUnit: "M ton CO₂/yıl", population: 20_000_000, context: "Yılda ~22 kg CO₂/ağaç", category: "karbon", color: "primary" },
    { id: "shower", title: "Duş Süresi", icon: "shower", description: "Herkes kaç dakika daha kısa duş alsa?", unit: "dk/gün", min: 0, max: 15, defaultVal: 5, step: 1, calcSaving: (min) => min * 12 * 365 * 85_000_000 / 1_000_000_000, savingUnit: "mlr L/yıl", population: 85_000_000, context: "1 dk = ~12 L su", category: "su", color: "secondary" },
    { id: "faucet", title: "Musluk Kontrolü", icon: "water_damage", description: "Musluk kapalı kalsa?", unit: "dk/gün", min: 0, max: 10, defaultVal: 3, step: 1, calcSaving: (min) => min * 10 * 365 * 85_000_000 / 1_000_000_000, savingUnit: "mlr L/yıl", population: 85_000_000, context: "Dakikada ~10L boşa akar", category: "su", color: "secondary" },
    { id: "drip", title: "Sızıntı Tamiri", icon: "plumbing", description: "Sızıntılar tamir edilse?", unit: "damla/dk", min: 0, max: 30, defaultVal: 10, step: 1, calcSaving: (drips) => drips * 0.05 * 1440 * 365 * 20_000_000 / 1_000_000_000, savingUnit: "mlr L/yıl", population: 20_000_000, context: "Her damla ~0.05 mL", category: "su", color: "secondary" },
    { id: "rainwater", title: "Yağmur Suyu Hasadı", icon: "cloud", description: "Binaların yüzde kaçında sistem kurulsa?", unit: "% binalar", min: 0, max: 100, defaultVal: 30, step: 5, calcSaving: (pct) => (pct / 100) * 500 * 10_000_000 / 1_000_000_000, savingUnit: "mlr L/yıl", population: 10_000_000, context: "Yıllık 500L/m² 10M bina.", category: "su", color: "secondary" },
    { id: "plastic", title: "Plastik Azaltımı", icon: "shopping_bag", description: "Haftada kaç poşet az kullanılsa?", unit: "poşet/hafta", min: 0, max: 20, defaultVal: 5, step: 1, calcSaving: (bags) => bags * 52 * 85_000_000 / 1_000_000_000, savingUnit: "mlr poşet/yıl", population: 85_000_000, context: "Naylon poşet azaltımı", category: "atik", color: "orange-400" },
    { id: "food_waste", title: "Gıda İsrafı", icon: "fastfood", description: "Herkes gıda israfını yüzde kaç azaltsa?", unit: "%", min: 0, max: 100, defaultVal: 30, step: 5, calcSaving: (pct) => (pct / 100) * 93 * 85_000_000 / 1_000_000, savingUnit: "M ton gıda/yıl", population: 85_000_000, context: "Kişi başı yıllık ~93 kg israf", category: "atik", color: "orange-400" },
    { id: "compost", title: "Kompostlama", icon: "compost", description: "Organik atıkların yüzde kaçı kompostlansa?", unit: "%", min: 0, max: 100, defaultVal: 40, step: 5, calcSaving: (pct) => (pct / 100) * 150 * 85_000_000 / 1_000_000_000, savingUnit: "M ton atık/yıl", population: 85_000_000, context: "Kişi başı yıllık ~150 kg", category: "atik", color: "orange-400" },
];

const scenariosEN: Scenario[] = [
    { id: "car", title: "Reduce Car Usage", icon: "directions_car", description: "What if everyone drove how many km less per day?", unit: "km/day", min: 0, max: 50, defaultVal: 10, step: 1, calcSaving: (km) => km * 0.21 * 365 * 85_000_000 / 1_000_000, savingUnit: "M tons CO₂/yr", population: 85_000_000, context: "Based on Turkey's population.", category: "karbon", color: "primary" },
    { id: "meat", title: "Reduce Meat Consumption", icon: "restaurant", description: "What if everyone ate how many fewer meat meals per week?", unit: "meals/week", min: 0, max: 14, defaultVal: 3, step: 1, calcSaving: (meals) => meals * 3.3 * 52 * 85_000_000 / 1_000_000, savingUnit: "M tons CO₂/yr", population: 85_000_000, context: "One beef meal ~3.3 kg CO₂", category: "karbon", color: "primary" },
    { id: "energy", title: "Energy Savings", icon: "bolt", description: "What if everyone reduced electricity use by what percentage?", unit: "%", min: 0, max: 50, defaultVal: 10, step: 1, calcSaving: (pct) => (pct / 100) * 200 * 0.5 * 12 * 85_000_000 / 1_000_000, savingUnit: "M tons CO₂/yr", population: 85_000_000, context: "Monthly per capita ~200 kWh, 0.5 kg CO₂/kWh", category: "karbon", color: "primary" },
    { id: "recycle", title: "Recycling", icon: "recycling", description: "What if everyone recycled what percentage of their waste?", unit: "%", min: 0, max: 100, defaultVal: 50, step: 5, calcSaving: (pct) => (pct / 100) * 2.5 * 52 * 85_000_000 / 1_000_000, savingUnit: "M tons CO₂/yr", population: 85_000_000, context: "Per capita weekly: ~5 kg waste", category: "karbon", color: "primary" },
    { id: "tree", title: "Planting Trees", icon: "nature", description: "What if every family planted how many trees?", unit: "trees/family", min: 0, max: 20, defaultVal: 2, step: 1, calcSaving: (trees) => trees * 22 * 20_000_000 / 1_000_000, savingUnit: "M tons CO₂/yr", population: 20_000_000, context: "Yearly ~22 kg CO₂/tree", category: "karbon", color: "primary" },
    { id: "shower", title: "Shower Duration", icon: "shower", description: "What if everyone took shorter showers by how many minutes?", unit: "min/day", min: 0, max: 15, defaultVal: 5, step: 1, calcSaving: (min) => min * 12 * 365 * 85_000_000 / 1_000_000_000, savingUnit: "bln L/yr", population: 85_000_000, context: "1 min = ~12 L water", category: "su", color: "secondary" },
    { id: "faucet", title: "Faucet Control", icon: "water_damage", description: "What if the faucet stayed off?", unit: "min/day", min: 0, max: 10, defaultVal: 3, step: 1, calcSaving: (min) => min * 10 * 365 * 85_000_000 / 1_000_000_000, savingUnit: "bln L/yr", population: 85_000_000, context: "~10L flows down the drain per minute", category: "su", color: "secondary" },
    { id: "drip", title: "Leak Repair", icon: "plumbing", description: "What if leaks were repaired?", unit: "drops/min", min: 0, max: 30, defaultVal: 10, step: 1, calcSaving: (drips) => drips * 0.05 * 1440 * 365 * 20_000_000 / 1_000_000_000, savingUnit: "bln L/yr", population: 20_000_000, context: "Each drop ~0.05 mL", category: "su", color: "secondary" },
    { id: "rainwater", title: "Rainwater Harvesting", icon: "cloud", description: "What percentage of buildings installed the system?", unit: "% buildings", min: 0, max: 100, defaultVal: 30, step: 5, calcSaving: (pct) => (pct / 100) * 500 * 10_000_000 / 1_000_000_000, savingUnit: "bln L/yr", population: 10_000_000, context: "Annual 500L/m² 10M buildings.", category: "su", color: "secondary" },
    { id: "plastic", title: "Plastic Reduction", icon: "shopping_bag", description: "How many fewer bags used per week?", unit: "bags/week", min: 0, max: 20, defaultVal: 5, step: 1, calcSaving: (bags) => bags * 52 * 85_000_000 / 1_000_000_000, savingUnit: "bln bags/yr", population: 85_000_000, context: "Plastic bag reduction", category: "atik", color: "orange-400" },
    { id: "food_waste", title: "Food Waste", icon: "fastfood", description: "What if everyone reduced food waste by what percentage?", unit: "%", min: 0, max: 100, defaultVal: 30, step: 5, calcSaving: (pct) => (pct / 100) * 93 * 85_000_000 / 1_000_000, savingUnit: "M tons food/yr", population: 85_000_000, context: "Per capita annual ~93 kg waste", category: "atik", color: "orange-400" },
    { id: "compost", title: "Composting", icon: "compost", description: "What percentage of organic waste was composted?", unit: "%", min: 0, max: 100, defaultVal: 40, step: 5, calcSaving: (pct) => (pct / 100) * 150 * 85_000_000 / 1_000_000_000, savingUnit: "M tons waste/yr", population: 85_000_000, context: "Per capita annual ~150 kg", category: "atik", color: "orange-400" },
];

type Category = "all" | "karbon" | "su" | "atik";

export default function Simulator() {
    const { lang } = useTheme();
    const scenarios = lang === 'tr' ? scenariosTR : scenariosEN;

    const [values, setValues] = useState<Record<string, number>>(() => {
        const init: Record<string, number> = {};
        scenarios.forEach((s) => (init[s.id] = s.defaultVal));
        return init;
    });
    const [activeCategory, setActiveCategory] = useState<Category>("all");
    const [isRunning, setIsRunning] = useState(false);

    // Displayed states for the button
    const [displayedCarbon, setDisplayedCarbon] = useState(0);
    const [displayedWater, setDisplayedWater] = useState(0);
    const [targetYear, setTargetYear] = useState(2050);

    const categoryConfig = lang === 'tr' ? {
        all: { label: "Tümü", icon: "public", textClass: "text-on-surface" },
        karbon: { label: "Karbon", icon: "co2", textClass: "text-primary" },
        su: { label: "Su", icon: "water_drop", textClass: "text-secondary" },
        atik: { label: "Atık", icon: "recycling", textClass: "text-orange-400" },
    } : {
        all: { label: "All", icon: "public", textClass: "text-on-surface" },
        karbon: { label: "Carbon", icon: "co2", textClass: "text-primary" },
        su: { label: "Water", icon: "water_drop", textClass: "text-secondary" },
        atik: { label: "Waste", icon: "recycling", textClass: "text-orange-400" },
    };

    const text = lang === 'tr' ? {
        title1: "Ya Eğer...?",
        title2: "Simülatörü",
        desc: "Toplumsal alışkanlıklarımızın ekosistem üzerindeki muazzam etkisini görselleştirin. Sensörleri ayarlayarak Türkiye veya dünya çapında küçük bir adımın nasıl dev bir dalgayla sonuçlanacağını test edin.",
        activeSim: "Gerçek Zamanlı Simülasyon Aktif",
        readySim: "Simülatör Hazır",
        targetYearLabel: "Hedef Yıl Karası",
        runSim: "Senaryoyu Çalıştır",
        cSave: "CO₂ Tasarrufu",
        cUnit: "M ton/yıl",
        wSave: "Su Tasarrufu",
        wUnit: "Milyar L/yıl",
        lowImpact: "Düşük Etki",
        simSaved: "Simüle Edilen Tasarruf",
        scenariosLabel: "Senaryolar",
        reset: "Sıfırla",
        treeEq: "Ağaç Eşdeğeri Tasarruf",
        poolEq: "Olimpik Havuz Su Tasarrufu",
    } : {
        title1: "What If...?",
        title2: "Simulator",
        desc: "Visualize the tremendous impact of our social habits on the ecosystem. By adjusting the sensors, test how a small step can result in a giant wave across Turkey or the world.",
        activeSim: "Real-Time Simulation Active",
        readySim: "Simulator Ready",
        targetYearLabel: "Target Land Year",
        runSim: "Run Scenario",
        cSave: "CO₂ Savings",
        cUnit: "M tons/yr",
        wSave: "Water Savings",
        wUnit: "Billion L/yr",
        lowImpact: "Low Impact",
        simSaved: "Simulated Savings",
        scenariosLabel: "Scenarios",
        reset: "Reset",
        treeEq: "Tree Equivalent Savings",
        poolEq: "Olympic Pool Water Savings",
    };

    const cats = useMemo(() => Object.keys(categoryConfig) as Category[], [lang]);
    const [tabStyle, setTabStyle] = useState({ left: 4, top: 4, width: 0, height: 0, opacity: 0 });
    const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

    useEffect(() => {
        const activeIndex = cats.indexOf(activeCategory);
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
    }, [activeCategory, cats, lang]);

    const filteredScenarios = activeCategory === "all"
        ? scenarios
        : scenarios.filter((s) => s.category === activeCategory);

    // Calculate totals
    const carbonTotal = useMemo(() => scenarios
        .filter((s) => s.category === "karbon")
        .reduce((sum, s) => sum + s.calcSaving(values[s.id]), 0), [values, scenarios]);

    const maxCarbon = 150; // Roughly the max possible in our simulation settings

    const waterTotal = useMemo(() => scenarios
        .filter((s) => s.category === "su")
        .reduce((sum, s) => sum + s.calcSaving(values[s.id]), 0), [values, scenarios]);

    const maxWater = 4; // Roughly max possible billions of liters based on sliders

    const resetDefaults = () => {
        const init: Record<string, number> = {};
        scenarios.forEach((s) => (init[s.id] = s.defaultVal));
        setValues(init);
    };

    return (
        <div className="w-full bg-surface text-on-surface font-body animate-fade-in">
            <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">

                {/* Hero Header */}
                <header className="mb-12 animate-fade-in-up">
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 text-primary font-headline">
                        {text.title1} <span className="text-on-surface-variant font-medium">{text.title2}</span>
                    </h1>
                    <p className="text-xl text-on-surface-variant max-w-2xl leading-relaxed">
                        {text.desc}
                    </p>
                </header>

                {/* Simulation Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Panel: Main Simulator Visual & Output */}
                    <div className="lg:col-span-8 flex flex-col gap-8">
                        {/* Visual Canvas */}
                        <div className="relative h-[400px] md:h-[500px] w-full bg-surface-container rounded-2xl overflow-hidden biolume-glow shadow-2xl border border-outline-variant/20 group">
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2MUfshRvu2ryyWwM2MqOXkT0VgsztLs7ZUKV7q9UOq1itD8WlqWLEomNxPfLu01NvWBFsAz_skyC4N9tGS6UVulGUTshBgOxucMkvpPAY_ndHQGGwkff-byUIzWudun78OqvKLaFxgWm0ul7tPxuRGs1utpgeKBj9Q1T6MO1hxLs1tpAs3YDMDhaFDTSsaWYfhdFJuy2Z6p1_wYoEn8BVu453JpeCVlh8fsYYeuyS_uds9saAsFTMyMsm10A9eYHQRxl3KSo41C8"
                                alt="Forest Simulation"
                                className={`w-full h-full object-cover transition-all duration-1000 ${isRunning ? 'scale-110 saturate-200 brightness-125 opacity-100' : 'scale-100 saturate-100 opacity-60'}`}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent"></div>

                            {/* HUD Overlays */}
                            <div className="absolute top-6 left-6 flex flex-col gap-2">
                                <div className="bg-surface-container-highest/80 backdrop-blur-md px-4 py-2 rounded-full border border-outline-variant/20 flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${isRunning ? 'bg-error' : 'bg-primary'} animate-pulse`}></span>
                                    <span className="text-xs font-bold tracking-widest uppercase text-on-surface">
                                        {isRunning ? text.activeSim : text.readySim}
                                    </span>
                                </div>
                            </div>

                            <div className="absolute bottom-8 left-8 right-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                                <div className="space-y-1">
                                    <div className="text-sm font-bold text-primary-dim tracking-widest uppercase">{text.targetYearLabel}</div>
                                    <div className="text-5xl md:text-6xl font-black text-on-surface font-headline drop-shadow-lg shadow-black transition-all duration-1000">{targetYear}</div>
                                </div>
                                <button
                                    onClick={() => {
                                        setIsRunning(true);
                                        setDisplayedCarbon(carbonTotal);
                                        setDisplayedWater(waterTotal);
                                        earnBadge('simulator_run');

                                        // Dinamik hedef yıl hesaplaması:
                                        const yearDrop = Math.floor((carbonTotal / maxCarbon) * 20);
                                        setTargetYear(Math.max(2030, 2050 - yearDrop));

                                        setTimeout(() => setIsRunning(false), 2000);
                                    }}
                                    className="bg-primary shadow-[0_0_20px_rgba(107,255,143,0.2)] hover:shadow-[0_0_30px_rgba(107,255,143,0.5)] transition-all px-8 py-4 rounded-xl text-on-primary-container font-black tracking-widest flex items-center justify-center gap-2 active:scale-95 w-full uppercase"
                                >
                                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                                    {text.runSim}
                                </button>
                            </div>
                        </div>

                        {/* Metric Cards: Side by Side */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* CO2 Metric */}
                        <div className="bg-surface-container rounded-2xl p-8 biolume-glow group border border-outline-variant/10 hover:border-primary/30 transition-colors">
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-4 rounded-2xl bg-surface-container-highest">
                                    <span className="material-symbols-outlined text-primary-dim text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>co2</span>
                                </div>
                                <div className="text-right">
                                    <div className="text-primary-dim text-sm font-bold uppercase tracking-widest">{text.cSave}</div>
                                    <div className="text-4xl font-black text-on-surface font-headline transition-all duration-1000">
                                        {displayedCarbon.toLocaleString(lang === 'tr' ? "tr-TR" : "en-US", { maximumFractionDigits: 0 })} <span className="text-base font-normal text-on-surface-variant tracking-normal">{text.cUnit}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="h-4 w-full bg-surface-container-lowest rounded-full overflow-hidden border border-outline-variant/30">
                                    <div style={{ width: `${Math.min((displayedCarbon / maxCarbon) * 100, 100)}%` }} className="h-full bg-gradient-to-r from-primary-container to-primary-dim rounded-full shadow-[0_0_15px_rgba(107,255,143,0.6)] transition-all duration-1000 ease-out"></div>
                                </div>
                                <div className="flex justify-between text-xs font-bold text-on-surface-variant tracking-wider uppercase">
                                    <span>{text.lowImpact}</span>
                                    <span className="text-primary">{text.simSaved}</span>
                                </div>
                            </div>
                        </div>

                        {/* Water Metric */}
                        <div className="bg-surface-container rounded-2xl p-8 group border border-outline-variant/10 hover:border-secondary/30 transition-colors shadow-[0_0_30px_rgba(143,248,180,0.05)]">
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-4 rounded-2xl bg-surface-container-highest">
                                    <span className="material-symbols-outlined text-secondary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>water_drop</span>
                                </div>
                                <div className="text-right">
                                    <div className="text-secondary text-sm font-bold uppercase tracking-widest">{text.wSave}</div>
                                    <div className="text-4xl font-black text-on-surface font-headline transition-all duration-1000">
                                        {displayedWater.toLocaleString(lang === 'tr' ? "tr-TR" : "en-US", { maximumFractionDigits: 1 })} <span className="text-base font-normal text-on-surface-variant tracking-normal">{text.wUnit}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="h-4 w-full bg-surface-container-lowest rounded-full overflow-hidden border border-outline-variant/30">
                                    <div style={{ width: `${Math.min((displayedWater / maxWater) * 100, 100)}%` }} className="h-full bg-gradient-to-r from-secondary-container to-secondary rounded-full shadow-[0_0_15px_rgba(143,248,180,0.6)] transition-all duration-1000 ease-out"></div>
                                </div>
                                <div className="flex justify-between text-xs font-bold text-on-surface-variant tracking-wider uppercase">
                                    <span>{text.lowImpact}</span>
                                    <span className="text-secondary">{text.simSaved}</span>
                                </div>
                            </div>
                        </div>

                        </div>
                    </div>

                    {/* Right Panel: Controls & Bento Grid Info */}
                    <div className="lg:col-span-4 flex flex-col gap-6">

                    {/* Variables Configuration */}
                    <div className="bg-surface-container-highest p-6 md:p-8 rounded-2xl flex flex-col gap-6 border border-outline-variant/10 shadow-lg shrink-0 h-[650px] flex flex-col">
                        <h3 className="text-xl font-black text-on-surface flex items-center justify-between gap-2 font-headline uppercase tracking-widest">
                            <span className="flex items-center gap-2"><span className="material-symbols-outlined text-primary">tune</span> {text.scenariosLabel}</span>
                            <button onClick={resetDefaults} className="text-xs text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest w-auto p-0 m-0 bg-transparent border-none outline-none">
                                {text.reset}
                            </button>
                        </h3>

                        {/* Filters with Sliding Indicator */}
                        <div className="relative inline-flex flex-wrap md:flex-nowrap gap-2 bg-surface-container-lowest p-1 rounded-2xl border border-outline-variant/10">
                            {(() => {
                                const themeColors = {
                                    all: "bg-surface-container shadow-[0_0_15px_rgba(255,255,255,0.05)]",
                                    karbon: "bg-primary shadow-[0_0_15px_rgba(107,255,143,0.3)]",
                                    su: "bg-secondary shadow-[0_0_15px_rgba(143,248,180,0.3)]",
                                    atik: "bg-orange-400 shadow-[0_0_15px_rgba(251,146,60,0.3)]"
                                };

                                return (
                                    <>
                                        <div
                                            className={`absolute rounded-[10px] transition-all duration-300 ease-in-out pointer-events-none ${themeColors[activeCategory]}`}
                                            style={{
                                                left: tabStyle.left,
                                                top: tabStyle.top,
                                                width: tabStyle.width,
                                                height: tabStyle.height,
                                                opacity: tabStyle.opacity
                                            }}
                                        />
                                        {cats.map((cat, idx) => {
                                            const cfg = categoryConfig[cat];
                                            return (
                                                <button
                                                    key={cat}
                                                    ref={el => { tabsRef.current[idx] = el; }}
                                                    onClick={() => setActiveCategory(cat)}
                                                    className={`relative z-10 px-4 py-2 rounded-[10px] text-xs font-bold uppercase tracking-wider cursor-pointer border-none outline-none transition-colors flex items-center gap-1 ${activeCategory === cat
                                                        ? cat === 'all' ? 'text-on-surface' : 'text-on-surface-lowest drop-shadow-md'
                                                        : "bg-transparent text-on-surface-variant hover:text-on-surface"
                                                        }`}
                                                >
                                                    {cfg.label}
                                                </button>
                                            );
                                        })}
                                    </>
                                );
                            })()}
                        </div>

                        {/* Scrollable Scenarios */}
                        <div className="flex-1 overflow-y-auto pr-2 space-y-6 scrollbar-thin scrollbar-thumb-surface-container-lowest scrollbar-track-transparent">
                            {filteredScenarios.map((s) => (
                                <div key={s.id} className="space-y-3 group">
                                    <div className="flex justify-between items-start text-sm font-medium">
                                        <div className="flex items-center gap-2 max-w-[70%]">
                                            <span className={`material-symbols-outlined text-${s.color} text-lg`}>{s.icon}</span>
                                            <span className="text-on-surface leading-tight text-xs md:text-sm">{s.title}</span>
                                        </div>
                                        <span className={`text-${s.color} font-black text-right min-w-[30%] text-xs md:text-sm`}>{values[s.id]} {s.unit.split('/')[0]}</span>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="range"
                                            min={s.min}
                                            max={s.max}
                                            step={s.step}
                                            value={values[s.id]}
                                            onChange={(e) => setValues((prev) => ({ ...prev, [s.id]: Number(e.target.value) }))}
                                            className={`w-full h-1.5 bg-surface-container-lowest rounded-full appearance-none cursor-pointer outline-none focus:ring-1 focus:ring-${s.color}/50`}
                                            style={{
                                                background: `linear-gradient(to right, ${s.color === 'primary' ? '#6bff8f' : s.color === 'secondary' ? '#8ff8b4' : '#fb923c'} 0%, ${s.color === 'primary' ? '#6bff8f' : s.color === 'secondary' ? '#8ff8b4' : '#fb923c'} ${(values[s.id] - s.min) / (s.max - s.min) * 100}%, #000000 ${(values[s.id] - s.min) / (s.max - s.min) * 100}%, #000000 100%)`
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Insights Bento Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-1 bg-primary/10 rounded-2xl p-6 border border-primary/20 flex flex-col justify-between shadow-[0_0_20px_rgba(107,255,143,0.05)]">
                            <span className="material-symbols-outlined text-primary text-3xl mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>park</span>
                            <div>
                                <div className="text-2xl font-black text-on-surface font-headline transition-all duration-1000">{((displayedCarbon / 22 * 1000000) / 1_000_000).toFixed(1)}M</div>
                                <div className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant leading-tight mt-1">{text.treeEq}</div>
                            </div>
                        </div>
                        <div className="col-span-1 bg-secondary/10 rounded-2xl p-6 border border-secondary/20 flex flex-col justify-between shadow-[0_0_20px_rgba(143,248,180,0.05)]">
                            <span className="material-symbols-outlined text-secondary text-3xl mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>pool</span>
                            <div>
                                <div className="text-2xl font-black text-on-surface font-headline transition-all duration-1000">{((displayedWater * 1000000000 / 2500000) >= 1000 ? ((displayedWater * 1000000000 / 2500000) / 1000).toFixed(1) + 'k' : (displayedWater * 1000000000 / 2500000).toFixed(0))}</div>
                                <div className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant leading-tight mt-1">{text.poolEq}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
    );
}
