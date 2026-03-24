import { useState, useMemo } from "react";
import { useTheme } from "../App";
import { earnBadge } from "../hooks/useBadges";

interface QuizQuestion {
    question: string;
    options: string[];
    correct: number;
    explanation: string;
}

const easyQuestionsTR: QuizQuestion[] = [
    { question: "Sera etkisinin ana nedeni nedir?", options: ["Güneş patlamaları", "Atmosferdeki sera gazları", "Ozon tabakası", "Ay'ın çekim gücü"], correct: 1, explanation: "Sera gazları güneş ışınlarını hapsederek dünyayı ısıtır." },
    { question: "Hangisi yenilenebilir enerji kaynağı DEĞİLDİR?", options: ["Güneş enerjisi", "Rüzgar enerjisi", "Doğal gaz", "Hidroelektrik"], correct: 2, explanation: "Doğal gaz fosil yakıttır ve yenilenebilir değildir." },
    { question: "Dünya'nın ortalama sıcaklığı son 100 yılda yaklaşık ne kadar arttı?", options: ["0.1°C", "1.1°C", "5°C", "10°C"], correct: 1, explanation: "Son yüzyılda küresel ortalama sıcaklık yaklaşık 1.1°C artmıştır." },
    { question: "Hangisi en güçlü sera gazıdır?", options: ["Karbondioksit", "Metan", "Su buharı", "Azot"], correct: 1, explanation: "Metan, CO₂'den yaklaşık 80 kat daha güçlü bir sera gazıdır." },
    { question: "Paris İklim Anlaşması hangi yıl imzalandı?", options: ["2010", "2015", "2020", "2005"], correct: 1, explanation: "Paris İklim Anlaşması 2015 yılında imzalanmıştır." }
];

const easyQuestionsEN: QuizQuestion[] = [
    { question: "What is the main cause of the greenhouse effect?", options: ["Solar flares", "Greenhouse gases in the atmosphere", "Ozone layer", "Moon's gravitational pull"], correct: 1, explanation: "Greenhouse gases trap the sun's rays and warm the earth." },
    { question: "Which is NOT a renewable energy source?", options: ["Solar energy", "Wind energy", "Natural gas", "Hydroelectric"], correct: 2, explanation: "Natural gas is a fossil fuel and is not renewable." },
    { question: "About how much has the Earth's average temp increased in the last 100 years?", options: ["0.1°C", "1.1°C", "5°C", "10°C"], correct: 1, explanation: "In the last century, global average temp increased by about 1.1°C." },
    { question: "Which is the most potent greenhouse gas?", options: ["Carbon dioxide", "Methane", "Water vapor", "Nitrogen"], correct: 1, explanation: "Methane is about 80 times more potent than CO2." },
    { question: "What year was the Paris Agreement signed?", options: ["2010", "2015", "2020", "2005"], correct: 1, explanation: "The Paris Agreement was signed in 2015." }
];

const mediumQuestionsTR: QuizQuestion[] = [
    { question: "Türkiye'nin toplam sera gazı emisyonunda en büyük pay hangi sektöre aittir?", options: ["Tarım", "Enerji", "Ulaşım", "Sanayi"], correct: 1, explanation: "Enerji sektörü emisyonların %72'sinden sorumludur." },
    { question: "Permafrost nedir?", options: ["Bir buzul türü", "Kalıcı donmuş toprak", "Kutup ayısı", "Okyanus akıntısı"], correct: 1, explanation: "Permafrost, kalıcı donmuş topraktır." },
    { question: "Karbon ayak izi en yüksek gıda hangisidir?", options: ["Pirinç", "Tavuk", "Sığır eti", "Balık"], correct: 2, explanation: "Sığır eti (~27 kg CO₂/kg)." },
    { question: "'Karbon nötr' ne demektir?", options: ["Hiç karbon üretmemek", "Üretilen kadarını emmek", "Sadece yenilenebilir", "Fosil yakıtları yasaklamak"], correct: 1, explanation: "Net sıfır emisyona ulaşmaktır." },
    { question: "Ozon tabakasını incelten başlıca kimyasal nedir?", options: ["CO₂", "CFC", "Metan", "Nitrojen oksit"], correct: 1, explanation: "CFC gazları ozon tabakasını inceltir." }
];

const mediumQuestionsEN: QuizQuestion[] = [
    { question: "Which sector accounts for the largest share of Turkey's greenhouse gas emissions?", options: ["Agriculture", "Energy", "Transportation", "Industry"], correct: 1, explanation: "The energy sector is responsible for 72% of emissions." },
    { question: "What is permafrost?", options: ["A type of glacier", "Permanently frozen ground", "Polar bear", "Ocean current"], correct: 1, explanation: "Permafrost is permanently frozen ground." },
    { question: "Which food has the highest carbon footprint?", options: ["Rice", "Chicken", "Beef", "Fish"], correct: 2, explanation: "Beef (~27 kg CO2/kg)." },
    { question: "What does 'carbon neutral' mean?", options: ["Producing no carbon", "Absorbing as much as produced", "Only renewable", "Banning fossil fuels"], correct: 1, explanation: "Achieving net zero emissions." },
    { question: "What is the main chemical that depletes the ozone layer?", options: ["CO2", "CFC", "Methane", "Nitrogen oxide"], correct: 1, explanation: "CFC gases deplete the ozone layer." }
];

const hardQuestionsTR: QuizQuestion[] = [
    { question: "IPCC'nin 1.5°C raporuna göre, emisyonlar 2030'a kadar yüzde kaç azaltılmalı?", options: ["%25", "%35", "%45", "%55"], correct: 2, explanation: "Emisyonlar %45 azaltılmalıdır." },
    { question: "Atmosferdeki CO₂ konsantrasyonu yaklaşık kaç ppm'dir?", options: ["280 ppm", "350 ppm", "420 ppm", "500 ppm"], correct: 2, explanation: "Yaklaşık 420 ppm seviyesindedir." },
    { question: "Hangisi 'albedo etkisi' ile ilgilidir?", options: ["Okyanus asidi", "Güneş ışığını yansıtma oranı", "Erozyon", "Volkan"], correct: 1, explanation: "Bir yüzeyin güneş ışığını yansıtma yüzdesidir." },
    { question: "Kişi başı en yüksek CO₂ emisyonuna sahip ülke hangisidir?", options: ["Çin", "ABD", "Katar", "Hindistan"], correct: 2, explanation: "Katar en yüksek (37 ton/kişi)." },
    { question: "Okyanuslar CO₂'nin yüzde kaçını emer?", options: ["%5", "%15", "%25", "%50"], correct: 2, explanation: "%25-30'unu emer." }
];

const hardQuestionsEN: QuizQuestion[] = [
    { question: "According to the IPCC's 1.5°C report, by what percentage should emissions be reduced by 2030?", options: ["25%", "35%", "45%", "55%"], correct: 2, explanation: "Emissions should be reduced by 45%." },
    { question: "What is the approximate CO2 concentration in the atmosphere?", options: ["280 ppm", "350 ppm", "420 ppm", "500 ppm"], correct: 2, explanation: "It is about 420 ppm." },
    { question: "What is related to the 'albedo effect'?", options: ["Ocean acid", "Sunlight reflection rate", "Erosion", "Volcano"], correct: 1, explanation: "It is the percentage of sunlight reflected by a surface." },
    { question: "Which country has the highest CO2 emissions per capita?", options: ["China", "USA", "Qatar", "India"], correct: 2, explanation: "Qatar is the highest (~37 tons/person)." },
    { question: "What percentage of CO2 do the oceans absorb?", options: ["5%", "15%", "25%", "50%"], correct: 2, explanation: "They absorb 25-30%." }
];

type Difficulty = "easy" | "medium" | "hard";

export default function IklimQuizi() {
    const { lang } = useTheme();
    const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
    const [currentQ, setCurrentQ] = useState(0);
    const [score, setScore] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [finished, setFinished] = useState(false);

    const difficultyMap = lang === 'tr' ? {
        easy: { label: "Temel", questions: easyQuestionsTR, color: "text-primary", icon: "eco", desc: "İklim değişikliği ve çevre bilinci hakkında temel kavramlar." },
        medium: { label: "İleri Seviye", questions: mediumQuestionsTR, color: "text-amber-400", icon: "public", desc: "Küresel etkiler, politikalar ve iklim sistemleri detayları." },
        hard: { label: "Uzman", questions: hardQuestionsTR, color: "text-rose-400", icon: "science", desc: "Karmaşık iklim modelleri, raporlar ve kimyasal süreçler." },
    } : {
        easy: { label: "Basic", questions: easyQuestionsEN, color: "text-primary", icon: "eco", desc: "Basic concepts about climate change and environmental awareness." },
        medium: { label: "Advanced", questions: mediumQuestionsEN, color: "text-amber-400", icon: "public", desc: "Global impacts, policies, and climate systems details." },
        hard: { label: "Expert", questions: hardQuestionsEN, color: "text-rose-400", icon: "science", desc: "Complex climate models, reports, and chemical processes." },
    };

    const text = lang === 'tr' ? {
        tag: "Meydan Okuma",
        title1: "İklim",
        title2: "Nabzı",
        title3: "Bilgi Yarışması",
        desc: "İklim krizi hakkındaki bilginizi test edin. Kendinize en uygun seviyeyi seçin ve testi tamamlayarak puanları toplayın.",
        level: "Seviye",
        start: "Başla",
        perfect: "Mükemmel!",
        good: "İyi İş!",
        keepGoing: "Çalışmaya Devam!",
        correctAnswers: "Doğru Cevap",
        wrongAnswers: "Yanlış",
        successRate: "Başarı Oranı",
        playNew: "Yeni Bir Oyun Oyna",
        progress: "İlerleme",
        outOf: "Sorudan",
        correct: "DOĞRU CEVAP",
        wrong: "YANLIŞ CEVAP",
        nextQ: "Sonraki Soruya Geç",
        showResults: "Sonuçları Göster",
        currentScore: "Mevcut Skor",
        correctLabel: "Doğru:",
        wrongLabel: "Yanlış:",
        explanation: "Açıklama",
        hintTime: "İpucu Zamanı",
        hintDesc: "Soruyu dikkatlice okuyun. Emin olmadığınız cevapları elemek doğru sonuca ulaşmanızı kolaylaştırır."
    } : {
        tag: "Challenge",
        title1: "Climate",
        title2: "Pulse",
        title3: "Quiz",
        desc: "Test your knowledge about the climate crisis. Choose the best level for you and collect points by completing the test.",
        level: "Level",
        start: "Start",
        perfect: "Perfect!",
        good: "Good Job!",
        keepGoing: "Keep Going!",
        correctAnswers: "Correct Answers",
        wrongAnswers: "Wrong",
        successRate: "Success Rate",
        playNew: "Play a New Game",
        progress: "Progress",
        outOf: "of questions",
        correct: "CORRECT ANSWER",
        wrong: "WRONG ANSWER",
        nextQ: "Move to Next Question",
        showResults: "Show Results",
        currentScore: "Current Score",
        correctLabel: "Correct:",
        wrongLabel: "Wrong:",
        explanation: "Explanation",
        hintTime: "Hint Time",
        hintDesc: "Read the question carefully. Eliminating answers you are unsure of makes it easier to find the right result."
    };

    const questions = useMemo(() => {
        if (!difficulty) return [];
        const shuffled = [...difficultyMap[difficulty].questions].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 5); // Kept to 5 to avoid out of bounds in shortened lists
    }, [difficulty, lang]);

    const handleSelect = (idx: number) => {
        if (selected !== null) return;
        setSelected(idx);
        if (idx === questions[currentQ].correct) {
            setScore((s) => s + 1);
        }
        setShowResult(true);
    };

    const nextQuestion = () => {
        if (currentQ + 1 >= questions.length) {
            setFinished(true);
        } else {
            setCurrentQ((q) => q + 1);
            setSelected(null);
            setShowResult(false);
        }
    };

    const restart = () => {
        setDifficulty(null);
        setCurrentQ(0);
        setScore(0);
        setSelected(null);
        setShowResult(false);
        setFinished(false);
    };

    if (!difficulty) {
        return (
            <div className="w-full">
                <main className="min-h-screen pt-32 pb-20 px-6 max-w-6xl mx-auto flex flex-col gap-12">
                    <header className="text-center md:text-left animate-fade-in-up">
                        <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6 font-headline">
                            {text.tag}
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black font-headline tracking-tighter text-on-surface mb-6">
                            {text.title1} <span className="text-primary-container">{text.title2}</span> {text.title3}
                        </h1>
                        <p className="text-xl text-on-surface-variant max-w-2xl font-body">{text.desc}</p>
                    </header>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                        {(["easy", "medium", "hard"] as Difficulty[]).map((d) => (
                            <button
                                key={d}
                                onClick={() => setDifficulty(d)}
                                className="glass-card p-10 rounded-2xl border border-outline-variant/30 hover:border-primary/50 text-left group transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(107,255,143,0.2)] text-on-surface cursor-pointer relative overflow-hidden"
                            >
                                <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 rounded-full border border-primary/10 group-hover:bg-primary/10 transition-colors"></div>
                                <div className="mb-6">
                                    <span className={`material-symbols-outlined text-5xl ${difficultyMap[d].color}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                                        {difficultyMap[d].icon}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold mb-3 font-headline">{difficultyMap[d].label} {text.level}</h3>
                                <p className="text-on-surface-variant text-sm mb-6 leading-relaxed line-clamp-3">{difficultyMap[d].desc}</p>
                                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary group-hover:gap-4 transition-all">
                                    <span>{text.start}</span>
                                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </main>
            </div>
        );
    }

    if (finished) {
        const pct = Math.round((score / questions.length) * 100);
        // Badge triggers
        earnBadge('quiz_master');
        if (pct === 100) earnBadge('quiz_perfect');
        return (
            <div className="w-full">
                <main className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto flex flex-col items-center gap-12 text-center animate-scale-in">
                    <div className="glass-card w-full p-12 md:p-20 rounded-3xl border border-primary/30 shadow-[0_0_50px_rgba(107,255,143,0.1)] relative overflow-hidden">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10"></div>
                        
                        <span className="material-symbols-outlined text-8xl text-primary mb-6 drop-shadow-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                            {pct >= 80 ? 'trophy' : pct >= 50 ? 'thumb_up' : 'school'}
                        </span>
                        
                        <h1 className="text-5xl md:text-7xl font-black font-headline tracking-tighter text-on-surface mb-4">
                            {pct >= 80 ? text.perfect : pct >= 50 ? text.good : text.keepGoing}
                        </h1>
                        <p className="text-xl text-on-surface-variant mb-12">{text.level}: {difficultyMap[difficulty].label}</p>
                        
                        <div className="flex justify-center gap-12 mb-16">
                            <div>
                                <div className="text-6xl font-black text-primary font-headline mb-2">{score}<span className="text-3xl text-on-surface-variant">/{questions.length}</span></div>
                                <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">{text.correctAnswers}</div>
                            </div>
                            <div>
                                <div className="text-6xl font-black text-secondary font-headline mb-2">{pct}%</div>
                                <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">{text.successRate}</div>
                            </div>
                        </div>

                        <button
                            onClick={restart}
                            className="bg-gradient-to-b from-primary to-primary-container text-on-primary px-10 py-5 rounded-full font-black tracking-tight hover:shadow-[0_0_30px_rgba(107,255,143,0.4)] transition-all duration-300 active:scale-95 cursor-pointer text-lg"
                        >
                            {text.playNew}
                        </button>
                    </div>
                </main>
            </div>
        );
    }

    const q = questions[currentQ];
    const letters = ['A', 'B', 'C', 'D'];
    const currentProgress = ((currentQ + 1) / questions.length) * 100;

    return (
        <div className="w-full">
            <main className="min-h-screen pt-32 pb-20 px-6 max-w-6xl mx-auto flex flex-col gap-12">
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 animate-fade-in-up">
                    <div className="flex-1">
                        <span className="text-xs font-bold uppercase tracking-[0.1em] text-primary-dim mb-2 block">{text.level}: {difficultyMap[difficulty].label}</span>
                        <h1 className="text-4xl md:text-6xl font-black font-headline tracking-tighter text-on-surface">
                            {text.title1} <span className="text-primary-container">{text.title2}</span>
                        </h1>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2 min-w-[240px]">
                        <div className="flex justify-between w-full text-sm font-bold text-on-surface-variant font-headline">
                            <span>{text.progress}</span>
                            <span>{Math.round(currentProgress)}%</span>
                        </div>
                        <div className="w-full h-3 bg-surface-container-highest border border-outline-variant/10 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-gradient-to-r from-primary-container to-primary-fixed shadow-[0_0_15px_rgba(107,255,143,0.5)] transition-all duration-700 ease-out"
                                style={{ width: `${currentProgress}%` }}
                            ></div>
                        </div>
                    </div>
                </header>

                <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <div className="lg:col-span-8 flex flex-col gap-8">
                        <div className="surface-container p-8 md:p-12 rounded-2xl relative overflow-hidden group border border-outline-variant/30 shadow-2xl">
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-container/10 rounded-full blur-[80px] group-hover:bg-primary-container/20 transition-all duration-700"></div>
                            
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-primary font-black border border-primary/20 font-headline">
                                        {String(currentQ + 1).padStart(2, '0')}
                                    </div>
                                    <span className="text-on-surface-variant font-bold font-headline">{questions.length} {text.outOf} {currentQ + 1}.</span>
                                </div>
                                <h2 className="text-2xl md:text-4xl font-bold leading-tight tracking-tight mb-12 text-on-surface font-headline">
                                    {q.question}
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {q.options.map((opt, i) => {
                                        let btnClass = "border-outline-variant/50 hover:border-primary/40 hover:bg-surface-variant/50";
                                        let letterClass = "bg-surface-container-highest group-hover:bg-primary-container group-hover:text-on-primary";
                                        let textClass = "text-on-surface";
                                        
                                        if (showResult) {
                                            if (i === q.correct) {
                                                btnClass = "border-primary/60 bg-primary-container/10 shadow-[0_0_20px_rgba(107,255,143,0.15)]";
                                                letterClass = "bg-primary-container text-on-primary";
                                                textClass = "text-primary font-bold";
                                            } else if (i === selected) {
                                                btnClass = "border-error/60 bg-error-container/10 shadow-[0_0_20px_rgba(255,115,81,0.15)]";
                                                letterClass = "bg-error text-on-error";
                                                textClass = "text-error font-bold";
                                            } else {
                                                btnClass = "border-outline-variant/20 opacity-50";
                                                letterClass = "bg-surface-container-highest";
                                                textClass = "text-on-surface-variant";
                                            }
                                        }

                                        return (
                                            <button
                                                key={i}
                                                onClick={() => handleSelect(i)}
                                                disabled={showResult}
                                                className={`glass-card p-5 md:p-6 rounded-xl text-left border relative overflow-hidden group transition-all duration-300 active:scale-[0.98] cursor-pointer ${btnClass} ${!showResult && "biolume-glow"}`}
                                            >
                                                <div className="flex items-center gap-4 relative z-10">
                                                    <span className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center font-bold text-sm transition-colors font-headline ${letterClass}`}>
                                                        {letters[i]}
                                                    </span>
                                                    <span className={`text-sm md:text-base ${textClass}`}>{opt}</span>
                                                </div>
                                                
                                                {showResult && i === selected && (
                                                    <div className={`mt-4 pt-4 border-t ${i === q.correct ? 'border-primary/20 text-primary' : 'border-error/20 text-error'} flex items-center gap-2 text-[10px] font-black uppercase tracking-widest`}>
                                                        <span className="material-symbols-outlined text-sm">
                                                            {i === q.correct ? 'check_circle' : 'cancel'}
                                                        </span> 
                                                        {i === q.correct ? text.correct : text.wrong}
                                                    </div>
                                                )}
                                                {showResult && i === q.correct && i !== selected && (
                                                    <div className="mt-4 pt-4 border-t border-primary/20 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary">
                                                        <span className="material-symbols-outlined text-sm">check_circle</span> {text.correct}
                                                    </div>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex-1"></div>
                            {showResult && (
                                <button 
                                    onClick={nextQuestion}
                                    className="bg-gradient-to-b from-primary to-primary-container text-on-primary-container px-8 py-4 rounded-xl font-black tracking-tight biolume-glow transition-all duration-300 active:scale-95 cursor-pointer flex items-center gap-3 animate-fade-in"
                                >
                                    {currentQ + 1 >= questions.length ? text.showResults : text.nextQ}
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <div className="surface-container p-6 rounded-2xl border-l-4 border-primary shadow-xl">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-lg font-headline">{text.currentScore}</h3>
                                <span className="material-symbols-outlined text-primary-dim" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-5xl font-black text-on-surface font-headline">{score * 100}</span>
                                <span className="text-primary font-bold text-sm uppercase tracking-widest">XP</span>
                            </div>
                            <div className="mt-6 pt-6 border-t border-outline-variant/20">
                                <div className="flex flex-col gap-1 text-sm text-on-surface-variant">
                                    <div className="flex justify-between">
                                        <span>{text.correctLabel}</span>
                                        <span className="font-bold text-on-surface">{score}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>{text.wrongLabel}</span>
                                        <span className="font-bold text-on-surface">{showResult ? (currentQ + 1) - score : currentQ - score}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`surface-container-highest p-6 rounded-2xl relative overflow-hidden transition-all duration-500 border ${showResult ? (selected === q.correct ? 'border-primary/50 bg-primary/5' : 'border-error/50 bg-error/5') : 'border-outline-variant/10'}`}>
                            <div className="relative z-10">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${showResult ? (selected === q.correct ? 'bg-primary/20 text-primary' : 'bg-error/20 text-error') : 'bg-surface-variant text-on-surface-variant'}`}>
                                    <span className="material-symbols-outlined">
                                        {showResult ? (selected === q.correct ? 'task_alt' : 'error') : 'lightbulb'}
                                    </span>
                                </div>
                                <h4 className="font-bold mb-3 font-headline text-lg">
                                    {showResult ? text.explanation : text.hintTime}
                                </h4>
                                <p className="text-sm leading-relaxed text-on-surface-variant min-h-[80px]">
                                    {showResult ? q.explanation : text.hintDesc}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
