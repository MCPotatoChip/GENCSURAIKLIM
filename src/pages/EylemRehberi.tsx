import { useEffect } from "react";
import { useTheme } from "../App";
import { earnBadge } from "../hooks/useBadges";

export default function EylemRehberi() {
    const { lang } = useTheme();

    useEffect(() => {
        earnBadge('eco_warrior');
    }, []);

    const text = lang === 'tr' ? {
        tag: "Ne Yapabiliriz?",
        title1: "Eylem",
        title2: "Rehberi",
        desc: "İklim krizine karşı mücadelede bireysel adımların gücünü keşfedin. Günlük rutininize entegre edebileceğiniz pratik, sürdürülebilir eylem planları.",
        energy: {
            title: "Enerji Tüketimi",
            l1: "Kullanılmayan cihazları fişten çekin (Hayalet tüketimi önler).",
            l2: "LED aydınlatmaya geçerek %80 enerji tasarrufu sağlayın.",
            l3: "Beyaz eşyalarınızda A+++ enerji sınıfını tercih edin."
        },
        water: {
            title: "Su Kaynakları",
            l1: "Duş sürenizi 5 dakikaya indirerek yılda binlerce litre su kurtarın.",
            l2: "Musluklara perlatör (hava karıştırıcı) takarak basıncı koruyup suyu azaltın.",
            l3: "Sızdıran tuvalet ve muslukları hemen tamir edin."
        },
        food: {
            title: "Gıda ve Beslenme",
            l1: "Haftada 1-2 gün et tüketimini azaltın (örneğin \"Etsiz Pazartesi\").",
            l2: "Mevsiminde ve yerel üretilen gıdaları tercih ederek karbon ayak izinizi küçültün.",
            l3: "Organik atıklarınızı çöpe atmak yerine kompost yaparak toprağa geri kazandırın."
        },
        simTest: {
            title: "Simülasyonda Etkinizi Test Edin",
            desc: "Bu eylemlerin ülke veya küresel çapta uygulandığında yaratacağı devasa farkı kendi gözlerinizle görün.",
            btn: "Simülatöre Git"
        }
    } : {
        tag: "What Can We Do?",
        title1: "Action",
        title2: "Guide",
        desc: "Discover the power of individual steps in the fight against the climate crisis. Practical, sustainable action plans you can integrate into your daily routine.",
        energy: {
            title: "Energy Consumption",
            l1: "Unplug unused devices (Prevents phantom drain).",
            l2: "Switch to LED lighting to save up to 80% energy.",
            l3: "Opt for A+++ energy class appliances."
        },
        water: {
            title: "Water Resources",
            l1: "Reduce shower time to 5 minutes to save thousands of liters a year.",
            l2: "Install aerators on faucets to maintain pressure while using less water.",
            l3: "Fix leaking toilets and faucets immediately."
        },
        food: {
            title: "Food and Diet",
            l1: "Reduce meat consumption 1-2 days a week (e.g., \"Meatless Monday\").",
            l2: "Choose seasonal and locally produced food to shrink your carbon footprint.",
            l3: "Compost organic waste instead of throwing it away to return nutrients to the soil."
        },
        simTest: {
            title: "Test Your Impact in the Simulator",
            desc: "See for yourself the massive difference these actions make when applied on a national or global scale.",
            btn: "Go to Simulator"
        }
    };

    return (
        <div className="w-full min-h-screen bg-background text-on-surface font-body animate-fade-in">
            <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
                <header className="mb-16 animate-fade-in-up">
                    <span className="text-primary font-bold tracking-widest uppercase text-xs">{text.tag}</span>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-none font-headline mt-2">
                        {text.title1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{text.title2}</span>
                    </h1>
                    <p className="text-on-surface-variant text-lg max-w-2xl leading-relaxed">
                        {text.desc}
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                    {/* Energy */}
                    <div className="glass-card rounded-3xl p-8 border border-outline-variant/10 hover:border-yellow-500/30 transition-all biolume-glow group">
                        <div className="w-14 h-14 rounded-full bg-yellow-500/20 flex items-center justify-center mb-6 group-hover:bg-yellow-500/30 transition-colors">
                            <span className="material-symbols-outlined text-yellow-500 text-3xl">bolt</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-4 font-headline text-on-surface">{text.energy.title}</h3>
                        <ul className="space-y-4 text-sm text-on-surface-variant">
                            <li className="flex gap-3"><span className="material-symbols-outlined text-yellow-500 text-[18px]">check_circle</span> {text.energy.l1}</li>
                            <li className="flex gap-3"><span className="material-symbols-outlined text-yellow-500 text-[18px]">check_circle</span> {text.energy.l2}</li>
                            <li className="flex gap-3"><span className="material-symbols-outlined text-yellow-500 text-[18px]">check_circle</span> {text.energy.l3}</li>
                        </ul>
                    </div>

                    {/* Water */}
                    <div className="glass-card rounded-3xl p-8 border border-outline-variant/10 hover:border-secondary/30 transition-all shadow-[0_0_30px_rgba(143,248,180,0.05)] group">
                        <div className="w-14 h-14 rounded-full bg-secondary/20 flex items-center justify-center mb-6 group-hover:bg-secondary/30 transition-colors">
                            <span className="material-symbols-outlined text-secondary text-3xl">water_drop</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-4 font-headline text-on-surface">{text.water.title}</h3>
                        <ul className="space-y-4 text-sm text-on-surface-variant">
                            <li className="flex gap-3"><span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span> {text.water.l1}</li>
                            <li className="flex gap-3"><span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span> {text.water.l2}</li>
                            <li className="flex gap-3"><span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span> {text.water.l3}</li>
                        </ul>
                    </div>

                    {/* Food */}
                    <div className="glass-card rounded-3xl p-8 border border-outline-variant/10 hover:border-orange-400/30 transition-all group">
                        <div className="w-14 h-14 rounded-full bg-orange-400/20 flex items-center justify-center mb-6 group-hover:bg-orange-400/30 transition-colors">
                            <span className="material-symbols-outlined text-orange-400 text-3xl">restaurant</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-4 font-headline text-on-surface">{text.food.title}</h3>
                        <ul className="space-y-4 text-sm text-on-surface-variant">
                            <li className="flex gap-3"><span className="material-symbols-outlined text-orange-400 text-[18px]">check_circle</span> {text.food.l1}</li>
                            <li className="flex gap-3"><span className="material-symbols-outlined text-orange-400 text-[18px]">check_circle</span> {text.food.l2}</li>
                            <li className="flex gap-3"><span className="material-symbols-outlined text-orange-400 text-[18px]">check_circle</span> {text.food.l3}</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 bg-surface-container rounded-3xl p-8 md:p-12 border border-primary/20 flex flex-col md:flex-row gap-8 items-center justify-between text-center md:text-left">
                    <div>
                        <h3 className="text-2xl font-bold font-headline text-on-surface mb-2">{text.simTest.title}</h3>
                        <p className="text-on-surface-variant text-sm">{text.simTest.desc}</p>
                    </div>
                    <a href="/simulator" className="inline-flex items-center gap-2 bg-primary text-on-primary-container font-black px-8 py-4 rounded-xl shadow-[0_0_20px_rgba(107,255,143,0.3)] hover:scale-105 transition-transform whitespace-nowrap uppercase tracking-widest text-sm">
                        <span className="material-symbols-outlined">play_arrow</span>
                        {text.simTest.btn}
                    </a>
                </div>
            </main>
        </div>
    );
}
