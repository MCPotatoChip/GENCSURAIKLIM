import { useState, useMemo } from "react";

interface FootprintInputs {
    electricity: number; // monthly kWh
    naturalGas: number; // monthly m³
    renewablePct: number; // 0-100 %

    carType: "electric" | "hybrid" | "gas" | "transit";
    carKm: number; // weekly km
    flightsShort: number; // annual
    flightsLong: number; // annual

    meatMeals: number; // weekly
    waste: number; // weekly kg
    compost: boolean;
    plantBased: boolean;
}

export default function KarbonAyakIzi() {
    const [inputs, setInputs] = useState<FootprintInputs>({
        electricity: 250,
        naturalGas: 15,
        renewablePct: 0,

        carType: "gas",
        carKm: 120,
        flightsShort: 0,
        flightsLong: 0,

        meatMeals: 4,
        waste: 5,
        compost: false,
        plantBased: false,
    });

    const handleNumber = (field: keyof FootprintInputs, value: string) => {
        setInputs((prev) => ({ ...prev, [field]: parseFloat(value) || 0 }));
    };

    const handleToggle = (field: "compost" | "plantBased") => {
        setInputs((prev) => {
            const next = { ...prev, [field]: !prev[field] };
            if (field === "plantBased" && next.plantBased) {
                next.meatMeals = 0;
            }
            return next;
        });
    };

    // Calculate annual emissions in kg
    const calculations = useMemo(() => {
        const WEEKS_IN_YEAR = 52;
        const MONTHS_IN_YEAR = 12;

        // Energy (kg CO2 per year)
        // std grid: 0.5 kg/kWh. renewable reduces this.
        const gridFactor = 0.5 * (1 - inputs.renewablePct / 100);
        const electricityAnnual = inputs.electricity * gridFactor * MONTHS_IN_YEAR;
        const gasAnnual = inputs.naturalGas * 2.0 * MONTHS_IN_YEAR;
        const energyTotal = electricityAnnual + gasAnnual;

        // Transport
        const carMultipliers = {
            electric: 0.05,
            hybrid: 0.12,
            gas: 0.21,
            transit: 0.08,
        };
        const carAnnual = inputs.carKm * carMultipliers[inputs.carType] * WEEKS_IN_YEAR;
        const flightShortAnnual = inputs.flightsShort * 150; // ~150kg per short flight
        const flightLongAnnual = inputs.flightsLong * 600; // ~600kg per long flight
        const transportTotal = carAnnual + flightShortAnnual + flightLongAnnual;

        // Waste & Food
        const meatAnnual = inputs.plantBased ? 0 : inputs.meatMeals * 3.3 * WEEKS_IN_YEAR;
        const wasteFactor = inputs.compost ? 1.0 : 2.5; // Composting reduces waste CO2 footprint
        const wasteAnnual = inputs.waste * wasteFactor * WEEKS_IN_YEAR;
        const lifestyleTotal = meatAnnual + wasteAnnual;

        const totalAnnualKg = energyTotal + transportTotal + lifestyleTotal;
        const totalAnnualTons = totalAnnualKg / 1000;

        return {
            energyTotal,
            transportTotal,
            lifestyleTotal,
            totalAnnualTons,
        };
    }, [inputs]);

    const { energyTotal, transportTotal, lifestyleTotal, totalAnnualTons } = calculations;

    // SVG Circular Progress logic
    const MAX_TONS = 15; // Above this is critical
    const progressPct = Math.min((totalAnnualTons / MAX_TONS) * 100, 100);
    const circleRadius = 42;
    const circleCircumference = 2 * Math.PI * circleRadius;
    const strokeDashoffset = circleCircumference - (progressPct / 100) * circleCircumference;

    const getLevelText = () => {
        if (totalAnnualTons < 3) return { text: "İdeal Seviye", color: "text-primary" };
        if (totalAnnualTons < 6) return { text: "Dünya Ortalaması", color: "text-secondary" };
        if (totalAnnualTons < 10) return { text: "Yüksek", color: "text-orange-400" };
        return { text: "Kritik", color: "text-error" };
    };

    return (
        <div className="min-h-screen bg-background text-on-surface font-body animate-fade-in">
            <main className="pt-32 pb-20 px-6 md:px-8 max-w-7xl mx-auto">
                {/* Header Section */}
                <header className="mb-12 animate-fade-in-up">
                    <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4 text-on-surface font-headline">
                        Karbon <span className="text-secondary">Hesaplayıcı</span>
                    </h1>
                    <p className="text-on-surface-variant text-lg max-w-2xl leading-relaxed">
                        Enerji, mobilite ve beslenme tüketimi genelindeki çevresel etkinizi analiz edin. 
                        Biyolüminesans görselleştiricimiz verilerinize gerçek zamanlı olarak uyum sağlar.
                    </p>
                </header>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                    
                    {/* Left Column: Inputs Bento Grid */}
                    <div className="xl:col-span-7 space-y-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        
                        {/* Energy Section */}
                        <section className="bg-surface-container rounded-3xl p-6 md:p-8 biolume-glow border border-outline-variant/10">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                                </div>
                                <h2 className="text-2xl font-bold tracking-tight font-headline">Enerji Kullanımı</h2>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant">Elektrik (kWh/ay)</label>
                                    <input 
                                        type="number" min="0" value={inputs.electricity} onChange={(e) => handleNumber("electricity", e.target.value)}
                                        className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-4 text-on-surface focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all outline-none font-bold text-lg" 
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant">Doğal Gaz (m³/ay)</label>
                                    <input 
                                        type="number" min="0" value={inputs.naturalGas} onChange={(e) => handleNumber("naturalGas", e.target.value)}
                                        className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-4 text-on-surface focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all outline-none font-bold text-lg" 
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-4 pt-4 border-t border-outline-variant/10">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant">Yenilenebilir Enerji Kaynağı (%)</label>
                                    <div className="flex items-center gap-6 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/20">
                                        <input 
                                            type="range" min="0" max="100" value={inputs.renewablePct} onChange={(e) => handleNumber("renewablePct", e.target.value)}
                                            className="flex-grow h-2 rounded-full appearance-none cursor-pointer outline-none focus:ring-2 focus:ring-primary/50" 
                                            style={{
                                                background: `linear-gradient(to right, #6bff8f ${inputs.renewablePct}%, #1a291e ${inputs.renewablePct}%)`
                                            }}
                                        />
                                        <span className="text-primary font-black w-14 text-right text-xl">{inputs.renewablePct}%</span>
                                    </div>
                                    <p className="text-xs text-on-surface-variant italic">Yenilenebilir enerji kullanmak doğrudan elektrik ayak izinizi %{inputs.renewablePct} azaltır.</p>
                                </div>
                            </div>
                        </section>

                        {/* Transport Section */}
                        <section className="bg-surface-container rounded-3xl p-6 md:p-8 border border-outline-variant/10">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-full bg-secondary-container/20 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-secondary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>directions_car</span>
                                </div>
                                <h2 className="text-2xl font-bold tracking-tight font-headline">Ulaşım ve Mobilite</h2>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant">Araç Tipi</label>
                                    <div className="relative">
                                        <select 
                                            value={inputs.carType} onChange={(e) => setInputs(prev => ({ ...prev, carType: e.target.value as FootprintInputs['carType'] }))}
                                            className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-4 text-on-surface focus:ring-2 focus:ring-secondary/40 focus:border-secondary/50 transition-all appearance-none outline-none font-bold text-base cursor-pointer"
                                        >
                                            <option value="electric">Elektrikli Araç</option>
                                            <option value="hybrid">Hibrit (Plug-in)</option>
                                            <option value="gas">Benzin / Dizel</option>
                                            <option value="transit">Sadece Toplu Taşıma</option>
                                        </select>
                                        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant">Haftalık Mesafe (km)</label>
                                    <input 
                                        type="number" min="0" value={inputs.carKm} onChange={(e) => handleNumber("carKm", e.target.value)}
                                        className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-4 text-on-surface focus:ring-2 focus:ring-secondary/40 focus:border-secondary/50 transition-all outline-none font-bold text-lg" 
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-4 pt-4 border-t border-outline-variant/10">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant">Yıllık Uçuş Sayısı</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="relative group">
                                            <input 
                                                type="number" min="0" value={inputs.flightsShort} onChange={(e) => handleNumber("flightsShort", e.target.value)}
                                                className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-xl py-4 pr-4 pl-14 text-on-surface focus:ring-2 focus:ring-secondary/40 focus:border-secondary/50 transition-all outline-none font-bold text-lg" 
                                            />
                                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-secondary transition-colors">flight_takeoff</span>
                                            <div className="absolute -top-3 left-4 bg-surface text-xs font-bold px-2 text-on-surface-variant">Kısa Mesafe (&lt; 3s)</div>
                                        </div>
                                        <div className="relative group">
                                            <input 
                                                type="number" min="0" value={inputs.flightsLong} onChange={(e) => handleNumber("flightsLong", e.target.value)}
                                                className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-xl py-4 pr-4 pl-14 text-on-surface focus:ring-2 focus:ring-secondary/40 focus:border-secondary/50 transition-all outline-none font-bold text-lg" 
                                            />
                                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-secondary transition-colors">travel_explore</span>
                                            <div className="absolute -top-3 left-4 bg-surface text-xs font-bold px-2 text-on-surface-variant">Uzun Mesafe (&gt; 3s)</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Waste & Lifestyle Section */}
                        <section className="bg-surface-container rounded-3xl p-6 md:p-8 border border-outline-variant/10">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-orange-400 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>delete</span>
                                </div>
                                <h2 className="text-2xl font-bold tracking-tight font-headline">Gıda ve Atık</h2>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="space-y-3">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant">Et İçeren Öğün (Haftalık)</label>
                                    <input 
                                        type="number" min="0" value={inputs.meatMeals} onChange={(e) => handleNumber("meatMeals", e.target.value)} disabled={inputs.plantBased}
                                        className={`w-full bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-4 text-on-surface focus:ring-2 focus:ring-orange-400/40 focus:border-orange-400/50 transition-all outline-none font-bold text-lg ${inputs.plantBased ? 'opacity-50 cursor-not-allowed' : ''}`} 
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant">Çöp Miktarı (Haftalık kg)</label>
                                    <input 
                                        type="number" min="0" value={inputs.waste} onChange={(e) => handleNumber("waste", e.target.value)}
                                        className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-4 text-on-surface focus:ring-2 focus:ring-orange-400/40 focus:border-orange-400/50 transition-all outline-none font-bold text-lg" 
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Toggle 1 */}
                                <div 
                                    onClick={() => handleToggle("compost")}
                                    className={`bg-surface-container-lowest p-5 rounded-xl flex items-center justify-between border cursor-pointer transition-all ${inputs.compost ? 'border-primary shadow-[0_0_15px_rgba(107,255,143,0.15)] bg-primary/5' : 'border-outline-variant/30 hover:border-primary/50'}`}
                                >
                                    <span className="font-bold text-sm">Organik kompost yapıyorum</span>
                                    <div className={`w-12 h-7 rounded-full relative flex items-center px-1 transition-colors ${inputs.compost ? 'bg-primary' : 'bg-surface-container-highest'}`}>
                                        <div className={`w-5 h-5 bg-on-surface rounded-full shadow-sm transition-transform ${inputs.compost ? 'translate-x-5' : 'translate-x-0'}`}></div>
                                    </div>
                                </div>
                                {/* Toggle 2 */}
                                <div 
                                    onClick={() => handleToggle("plantBased")}
                                    className={`bg-surface-container-lowest p-5 rounded-xl flex items-center justify-between border cursor-pointer transition-all ${inputs.plantBased ? 'border-primary shadow-[0_0_15px_rgba(107,255,143,0.15)] bg-primary/5' : 'border-outline-variant/30 hover:border-primary/50'}`}
                                >
                                    <span className="font-bold text-sm">Bitki bazlı besleniyorum (Vegan)</span>
                                    <div className={`w-12 h-7 rounded-full relative flex items-center px-1 transition-colors ${inputs.plantBased ? 'bg-primary' : 'bg-surface-container-highest'}`}>
                                        <div className={`w-5 h-5 bg-on-surface rounded-full shadow-sm transition-transform ${inputs.plantBased ? 'translate-x-5' : 'translate-x-0'}`}></div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Glowing Footprint Meter */}
                    <div className="xl:col-span-5 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <div className="sticky top-32">
                            <div className="glass-card bg-surface-container-high/60 rounded-3xl p-8 md:p-12 flex flex-col items-center text-center overflow-hidden relative border border-outline-variant/20 shadow-2xl">
                                
                                {/* Background Glow Effect */}
                                <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px]"></div>
                                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-secondary/10 rounded-full blur-[100px]"></div>
                                
                                <div className="flex justify-between items-center w-full mb-10 relative z-10">
                                    <span className="text-xs font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span> Canlı Analiz
                                    </span>
                                    <span className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full border border-current ${getLevelText().color}`}>
                                        {getLevelText().text}
                                    </span>
                                </div>

                                {/* Visual Meter SVG */}
                                <div className="relative w-64 h-64 md:w-80 md:h-80 mb-12 flex-shrink-0 z-10">
                                    <svg className="w-full h-full -rotate-90 drop-shadow-[0_0_20px_rgba(107,255,143,0.3)] transition-all" viewBox="0 0 100 100">
                                        {/* Background Track */}
                                        <circle 
                                            className="text-surface-container-lowest" 
                                            cx="50" cy="50" fill="transparent" r="42" 
                                            stroke="currentColor" strokeWidth="8"
                                        />
                                        {/* Progress Meter */}
                                        <circle 
                                            cx="50" cy="50" fill="transparent" r="42" 
                                            stroke="url(#gradient)" 
                                            strokeDasharray={circleCircumference} 
                                            strokeDashoffset={strokeDashoffset} 
                                            strokeLinecap="round" strokeWidth="8"
                                            className="transition-all duration-1000 ease-out"
                                        />
                                        <defs>
                                            <linearGradient id="gradient" x1="0%" x2="100%" y1="0%" y2="0%">
                                                <stop offset="0%" stopColor="#6bff8f" />
                                                <stop offset="100%" stopColor="#0abc56" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    
                                    {/* Center Text */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                        <span className="text-6xl md:text-7xl font-black text-on-surface leading-none font-headline tracking-tighter drop-shadow-lg">
                                            {totalAnnualTons.toFixed(1)}
                                        </span>
                                        <span className="text-xs font-bold text-on-surface-variant uppercase tracking-[0.2em] mt-3">Ton CO₂e/yıl</span>
                                    </div>
                                </div>

                                {/* Data Breakdown Bars */}
                                <div className="w-full space-y-5 mb-12 relative z-10">
                                    
                                    {/* Energy Bar */}
                                    <div className="group">
                                        <div className="flex justify-between items-center text-sm mb-2">
                                            <span className="text-on-surface-variant font-medium flex items-center gap-2">
                                                <span className="material-symbols-outlined text-[16px]">bolt</span> Enerji
                                            </span>
                                            <span className="text-on-surface font-black">{(energyTotal/1000).toFixed(1)} t</span>
                                        </div>
                                        <div className="h-2 w-full bg-surface-container-lowest rounded-full overflow-hidden border border-outline-variant/10">
                                            <div className="h-full bg-primary rounded-full transition-all duration-700" style={{ width: `${Math.min((energyTotal / (totalAnnualTons*1000||1)) * 100, 100)}%` }}></div>
                                        </div>
                                    </div>

                                    {/* Transport Bar */}
                                    <div className="group">
                                        <div className="flex justify-between items-center text-sm mb-2">
                                            <span className="text-on-surface-variant font-medium flex items-center gap-2">
                                                <span className="material-symbols-outlined text-[16px]">directions_car</span> Ulaşım
                                            </span>
                                            <span className="text-on-surface font-black">{(transportTotal/1000).toFixed(1)} t</span>
                                        </div>
                                        <div className="h-2 w-full bg-surface-container-lowest rounded-full overflow-hidden border border-outline-variant/10">
                                            <div className="h-full bg-secondary rounded-full transition-all duration-700" style={{ width: `${Math.min((transportTotal / (totalAnnualTons*1000||1)) * 100, 100)}%` }}></div>
                                        </div>
                                    </div>

                                    {/* Lifestyle Bar */}
                                    <div className="group">
                                        <div className="flex justify-between items-center text-sm mb-2">
                                            <span className="text-on-surface-variant font-medium flex items-center gap-2">
                                                <span className="material-symbols-outlined text-[16px]">restaurant</span> Gıda & Atık
                                            </span>
                                            <span className="text-on-surface font-black">{(lifestyleTotal/1000).toFixed(1)} t</span>
                                        </div>
                                        <div className="h-2 w-full bg-surface-container-lowest rounded-full overflow-hidden border border-outline-variant/10">
                                            <div className="h-full bg-orange-400 rounded-full transition-all duration-700" style={{ width: `${Math.min((lifestyleTotal / (totalAnnualTons*1000||1)) * 100, 100)}%` }}></div>
                                        </div>
                                    </div>

                                </div>

                                <button className="relative w-full py-5 rounded-xl bg-gradient-to-b from-primary to-primary-container text-on-primary-container font-black uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(107,255,143,0.3)] hover:shadow-[0_0_30px_rgba(107,255,143,0.5)] active:scale-95 transition-all flex justify-center items-center gap-2">
                                    <span className="material-symbols-outlined">save</span> Analizi Kaydet
                                </button>
                                
                            </div>
                            
                            {/* Side Tip Card */}
                            <div className="mt-8 bg-surface-container-high/80 backdrop-blur-md p-6 rounded-2xl border-l-[6px] border-primary shadow-lg animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                                <div className="flex gap-4 items-start">
                                    <span className="material-symbols-outlined text-primary text-3xl">lightbulb</span>
                                    <p className="text-sm text-on-surface-variant leading-relaxed">
                                        <strong className="text-on-surface">İpucu: </strong> 
                                        Yerel bir yenilenebilir enerji sağlayıcısına geçmek, Enerji ayak izinizi %60'a kadar azaltabilir. 
                                        Şu anki tüketiminle bu, {((energyTotal * 0.6)/1000).toFixed(1)} ton tasarruf demek!
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
