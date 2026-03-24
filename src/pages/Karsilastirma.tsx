import { useState, useEffect, useRef } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useTheme } from "../App";

interface CityData {
    name: string;
    avgTemp: number[];
    rainfall: number[];
    humidity: number[];
    group: string;
}

const citiesTR: CityData[] = [
    { name: "İstanbul", group: "🇹🇷 Türkiye", avgTemp: [6, 6, 8, 13, 17, 22, 25, 25, 21, 16, 12, 8], rainfall: [99, 72, 70, 46, 35, 35, 34, 37, 51, 90, 102, 119], humidity: [77, 76, 74, 72, 72, 68, 66, 67, 71, 76, 77, 78] },
    { name: "Ankara", group: "🇹🇷 Türkiye", avgTemp: [0, 2, 6, 11, 16, 20, 23, 23, 19, 13, 7, 2], rainfall: [40, 36, 37, 42, 51, 34, 15, 12, 18, 30, 31, 43], humidity: [76, 72, 64, 59, 57, 49, 42, 42, 48, 60, 71, 78] },
    { name: "İzmir", group: "🇹🇷 Türkiye", avgTemp: [9, 9, 12, 16, 21, 26, 28, 28, 24, 19, 14, 10], rainfall: [130, 101, 75, 46, 31, 8, 3, 2, 16, 44, 93, 142], humidity: [67, 64, 62, 59, 56, 46, 42, 43, 51, 60, 67, 69] },
    { name: "Antalya", group: "🇹🇷 Türkiye", avgTemp: [10, 10, 13, 16, 21, 25, 28, 28, 25, 20, 15, 11], rainfall: [235, 145, 99, 50, 27, 8, 3, 2, 12, 69, 129, 263], humidity: [65, 62, 61, 61, 60, 53, 52, 55, 55, 60, 64, 66] },
    { name: "Trabzon", group: "🇹🇷 Türkiye", avgTemp: [7, 7, 8, 12, 16, 20, 23, 23, 20, 16, 12, 9], rainfall: [73, 57, 56, 53, 53, 47, 36, 41, 63, 86, 82, 74], humidity: [72, 72, 73, 74, 76, 73, 71, 72, 74, 76, 73, 72] },
    { name: "Diyarbakır", group: "🇹🇷 Türkiye", avgTemp: [1, 3, 8, 13, 19, 26, 31, 30, 25, 17, 9, 3], rainfall: [72, 68, 69, 63, 42, 8, 1, 1, 5, 34, 55, 72], humidity: [77, 73, 65, 59, 47, 29, 23, 24, 30, 47, 64, 77] },
    { name: "Erzurum", group: "🇹🇷 Türkiye", avgTemp: [-9, -7, -2, 5, 10, 14, 19, 19, 14, 8, 0, -6], rainfall: [21, 25, 34, 52, 67, 43, 23, 15, 19, 40, 30, 21], humidity: [74, 73, 71, 65, 62, 55, 48, 46, 49, 62, 72, 75] },
    { name: "Konya", group: "🇹🇷 Türkiye", avgTemp: [0, 2, 6, 11, 16, 20, 24, 23, 19, 13, 6, 2], rainfall: [33, 25, 26, 32, 35, 19, 7, 5, 10, 25, 27, 37], humidity: [75, 70, 62, 56, 53, 43, 35, 35, 41, 56, 68, 77] },
    { name: "Londra", group: "🌍 Avrupa", avgTemp: [5, 5, 7, 10, 13, 16, 19, 18, 16, 12, 8, 5], rainfall: [55, 41, 42, 43, 49, 45, 45, 50, 49, 69, 59, 55], humidity: [81, 77, 73, 68, 68, 68, 68, 71, 74, 79, 81, 82] },
    { name: "Paris", group: "🌍 Avrupa", avgTemp: [4, 5, 8, 11, 15, 18, 20, 20, 17, 12, 7, 5], rainfall: [51, 41, 48, 52, 63, 50, 62, 53, 48, 62, 52, 58], humidity: [83, 78, 73, 69, 70, 70, 68, 71, 76, 82, 84, 85] },
    { name: "Berlin", group: "🌍 Avrupa", avgTemp: [0, 1, 5, 9, 14, 17, 20, 19, 15, 10, 5, 2], rainfall: [42, 33, 41, 37, 54, 69, 56, 58, 45, 37, 44, 55], humidity: [84, 80, 73, 67, 65, 67, 67, 69, 73, 79, 84, 86] },
    { name: "Moskova", group: "🌍 Avrupa", avgTemp: [-7, -6, -1, 6, 13, 17, 19, 17, 12, 5, -1, -5], rainfall: [52, 41, 35, 37, 53, 80, 85, 82, 68, 71, 55, 52], humidity: [83, 80, 74, 67, 64, 67, 71, 74, 78, 81, 84, 85] },
    { name: "New York", group: "🌎 Amerika", avgTemp: [1, 2, 6, 12, 17, 22, 25, 25, 21, 15, 9, 4], rainfall: [87, 75, 100, 99, 106, 112, 117, 113, 109, 98, 88, 92], humidity: [61, 59, 58, 56, 63, 66, 65, 67, 68, 65, 64, 63] },
    { name: "São Paulo", group: "🌎 Amerika", avgTemp: [23, 23, 22, 21, 18, 17, 17, 18, 19, 20, 21, 22], rainfall: [240, 215, 160, 75, 55, 40, 25, 30, 60, 125, 145, 200], humidity: [79, 78, 78, 77, 76, 74, 72, 70, 73, 76, 76, 78] },
    { name: "Tokyo", group: "🌏 Asya-Pasifik", avgTemp: [5, 6, 9, 14, 19, 22, 26, 27, 23, 18, 13, 8], rainfall: [52, 56, 117, 125, 138, 168, 154, 168, 210, 198, 93, 51], humidity: [52, 53, 58, 63, 68, 75, 77, 74, 73, 68, 62, 56] },
    { name: "Pekin", group: "🌏 Asya-Pasifik", avgTemp: [-3, 0, 6, 14, 20, 25, 27, 26, 21, 14, 5, -1], rainfall: [3, 6, 9, 26, 34, 78, 185, 160, 46, 22, 8, 3], humidity: [44, 39, 35, 35, 40, 55, 70, 73, 59, 50, 46, 45] },
    { name: "Mumbai", group: "🌏 Asya-Pasifik", avgTemp: [25, 25, 27, 29, 30, 29, 27, 27, 27, 28, 28, 26], rainfall: [1, 1, 0, 1, 20, 530, 840, 585, 340, 65, 15, 3], humidity: [62, 60, 62, 65, 68, 78, 85, 85, 82, 73, 65, 63] },
    { name: "Sydney", group: "🌏 Asya-Pasifik", avgTemp: [23, 23, 22, 19, 16, 14, 13, 14, 16, 18, 20, 22], rainfall: [102, 118, 131, 127, 120, 132, 98, 81, 69, 77, 83, 78], humidity: [65, 67, 68, 69, 69, 69, 65, 61, 60, 62, 63, 64] },
    { name: "Dubai", group: "🏜️ Orta Doğu & Afrika", avgTemp: [19, 20, 23, 27, 31, 34, 36, 36, 33, 29, 25, 21], rainfall: [11, 25, 22, 5, 0, 0, 0, 0, 0, 1, 2, 14], humidity: [65, 63, 60, 53, 48, 50, 53, 55, 56, 55, 59, 64] },
    { name: "Kahire", group: "🏜️ Orta Doğu & Afrika", avgTemp: [13, 15, 17, 21, 25, 28, 29, 29, 27, 24, 19, 15], rainfall: [5, 4, 4, 1, 1, 0, 0, 0, 0, 1, 3, 6], humidity: [59, 54, 50, 42, 38, 37, 40, 43, 47, 50, 57, 61] },
];

const citiesEN: CityData[] = [
    { name: "Istanbul", group: "🇹🇷 Turkey", avgTemp: [6, 6, 8, 13, 17, 22, 25, 25, 21, 16, 12, 8], rainfall: [99, 72, 70, 46, 35, 35, 34, 37, 51, 90, 102, 119], humidity: [77, 76, 74, 72, 72, 68, 66, 67, 71, 76, 77, 78] },
    { name: "Ankara", group: "🇹🇷 Turkey", avgTemp: [0, 2, 6, 11, 16, 20, 23, 23, 19, 13, 7, 2], rainfall: [40, 36, 37, 42, 51, 34, 15, 12, 18, 30, 31, 43], humidity: [76, 72, 64, 59, 57, 49, 42, 42, 48, 60, 71, 78] },
    { name: "Izmir", group: "🇹🇷 Turkey", avgTemp: [9, 9, 12, 16, 21, 26, 28, 28, 24, 19, 14, 10], rainfall: [130, 101, 75, 46, 31, 8, 3, 2, 16, 44, 93, 142], humidity: [67, 64, 62, 59, 56, 46, 42, 43, 51, 60, 67, 69] },
    { name: "Antalya", group: "🇹🇷 Turkey", avgTemp: [10, 10, 13, 16, 21, 25, 28, 28, 25, 20, 15, 11], rainfall: [235, 145, 99, 50, 27, 8, 3, 2, 12, 69, 129, 263], humidity: [65, 62, 61, 61, 60, 53, 52, 55, 55, 60, 64, 66] },
    { name: "Trabzon", group: "🇹🇷 Turkey", avgTemp: [7, 7, 8, 12, 16, 20, 23, 23, 20, 16, 12, 9], rainfall: [73, 57, 56, 53, 53, 47, 36, 41, 63, 86, 82, 74], humidity: [72, 72, 73, 74, 76, 73, 71, 72, 74, 76, 73, 72] },
    { name: "Diyarbakir", group: "🇹🇷 Turkey", avgTemp: [1, 3, 8, 13, 19, 26, 31, 30, 25, 17, 9, 3], rainfall: [72, 68, 69, 63, 42, 8, 1, 1, 5, 34, 55, 72], humidity: [77, 73, 65, 59, 47, 29, 23, 24, 30, 47, 64, 77] },
    { name: "Erzurum", group: "🇹🇷 Turkey", avgTemp: [-9, -7, -2, 5, 10, 14, 19, 19, 14, 8, 0, -6], rainfall: [21, 25, 34, 52, 67, 43, 23, 15, 19, 40, 30, 21], humidity: [74, 73, 71, 65, 62, 55, 48, 46, 49, 62, 72, 75] },
    { name: "Konya", group: "🇹🇷 Turkey", avgTemp: [0, 2, 6, 11, 16, 20, 24, 23, 19, 13, 6, 2], rainfall: [33, 25, 26, 32, 35, 19, 7, 5, 10, 25, 27, 37], humidity: [75, 70, 62, 56, 53, 43, 35, 35, 41, 56, 68, 77] },
    { name: "London", group: "🌍 Europe", avgTemp: [5, 5, 7, 10, 13, 16, 19, 18, 16, 12, 8, 5], rainfall: [55, 41, 42, 43, 49, 45, 45, 50, 49, 69, 59, 55], humidity: [81, 77, 73, 68, 68, 68, 68, 71, 74, 79, 81, 82] },
    { name: "Paris", group: "🌍 Europe", avgTemp: [4, 5, 8, 11, 15, 18, 20, 20, 17, 12, 7, 5], rainfall: [51, 41, 48, 52, 63, 50, 62, 53, 48, 62, 52, 58], humidity: [83, 78, 73, 69, 70, 70, 68, 71, 76, 82, 84, 85] },
    { name: "Berlin", group: "🌍 Europe", avgTemp: [0, 1, 5, 9, 14, 17, 20, 19, 15, 10, 5, 2], rainfall: [42, 33, 41, 37, 54, 69, 56, 58, 45, 37, 44, 55], humidity: [84, 80, 73, 67, 65, 67, 67, 69, 73, 79, 84, 86] },
    { name: "Moscow", group: "🌍 Europe", avgTemp: [-7, -6, -1, 6, 13, 17, 19, 17, 12, 5, -1, -5], rainfall: [52, 41, 35, 37, 53, 80, 85, 82, 68, 71, 55, 52], humidity: [83, 80, 74, 67, 64, 67, 71, 74, 78, 81, 84, 85] },
    { name: "New York", group: "🌎 Americas", avgTemp: [1, 2, 6, 12, 17, 22, 25, 25, 21, 15, 9, 4], rainfall: [87, 75, 100, 99, 106, 112, 117, 113, 109, 98, 88, 92], humidity: [61, 59, 58, 56, 63, 66, 65, 67, 68, 65, 64, 63] },
    { name: "São Paulo", group: "🌎 Americas", avgTemp: [23, 23, 22, 21, 18, 17, 17, 18, 19, 20, 21, 22], rainfall: [240, 215, 160, 75, 55, 40, 25, 30, 60, 125, 145, 200], humidity: [79, 78, 78, 77, 76, 74, 72, 70, 73, 76, 76, 78] },
    { name: "Tokyo", group: "🌏 Asia-Pacific", avgTemp: [5, 6, 9, 14, 19, 22, 26, 27, 23, 18, 13, 8], rainfall: [52, 56, 117, 125, 138, 168, 154, 168, 210, 198, 93, 51], humidity: [52, 53, 58, 63, 68, 75, 77, 74, 73, 68, 62, 56] },
    { name: "Beijing", group: "🌏 Asia-Pacific", avgTemp: [-3, 0, 6, 14, 20, 25, 27, 26, 21, 14, 5, -1], rainfall: [3, 6, 9, 26, 34, 78, 185, 160, 46, 22, 8, 3], humidity: [44, 39, 35, 35, 40, 55, 70, 73, 59, 50, 46, 45] },
    { name: "Mumbai", group: "🌏 Asia-Pacific", avgTemp: [25, 25, 27, 29, 30, 29, 27, 27, 27, 28, 28, 26], rainfall: [1, 1, 0, 1, 20, 530, 840, 585, 340, 65, 15, 3], humidity: [62, 60, 62, 65, 68, 78, 85, 85, 82, 73, 65, 63] },
    { name: "Sydney", group: "🌏 Asia-Pacific", avgTemp: [23, 23, 22, 19, 16, 14, 13, 14, 16, 18, 20, 22], rainfall: [102, 118, 131, 127, 120, 132, 98, 81, 69, 77, 83, 78], humidity: [65, 67, 68, 69, 69, 69, 65, 61, 60, 62, 63, 64] },
    { name: "Dubai", group: "🏜️ Middle East & Africa", avgTemp: [19, 20, 23, 27, 31, 34, 36, 36, 33, 29, 25, 21], rainfall: [11, 25, 22, 5, 0, 0, 0, 0, 0, 1, 2, 14], humidity: [65, 63, 60, 53, 48, 50, 53, 55, 56, 55, 59, 64] },
    { name: "Cairo", group: "🏜️ Middle East & Africa", avgTemp: [13, 15, 17, 21, 25, 28, 29, 29, 27, 24, 19, 15], rainfall: [5, 4, 4, 1, 1, 0, 0, 0, 0, 1, 3, 6], humidity: [59, 54, 50, 42, 38, 37, 40, 43, 47, 50, 57, 61] },
];

const monthsTR = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];
const monthsEN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function Karsilastirma() {
    const { lang } = useTheme();
    const cities = lang === 'tr' ? citiesTR : citiesEN;
    const months = lang === 'tr' ? monthsTR : monthsEN;

    const [city1Idx, setCity1Idx] = useState(0);
    const [city2Idx, setCity2Idx] = useState(8);

    const [metric, setMetric] = useState<"temp" | "rain" | "humidity">("temp");

    const cityGroups = cities.reduce<Record<string, { name: string; idx: number }[]>>((acc, city, i) => {
        if (!acc[city.group]) acc[city.group] = [];
        acc[city.group].push({ name: city.name, idx: i });
        return acc;
    }, {});

    const city1 = cities[city1Idx];
    const city2 = cities[city2Idx];

    const metricConfig = lang === 'tr' ? {
        temp: { label: "Sıcaklık (°C)", color1: "#6bff8f", color2: "#8ff8b4", varColor1: "primary", varColor2: "secondary", maxText: "En Sıcak Ay", minText: "En Soğuk Ay" },
        rain: { label: "Yağış (mm)", color1: "#22d3ee", color2: "#818cf8", varColor1: "cyan", varColor2: "indigo", maxText: "En Yağışlı Ay", minText: "En Kurak Ay" },
        humidity: { label: "Nem (%)", color1: "#60a5fa", color2: "#a78bfa", varColor1: "blue", varColor2: "purple", maxText: "En Yüksek Nem", minText: "En Düşük Nem" },
    } : {
        temp: { label: "Temperature (°C)", color1: "#6bff8f", color2: "#8ff8b4", varColor1: "primary", varColor2: "secondary", maxText: "Hottest Month", minText: "Coldest Month" },
        rain: { label: "Rainfall (mm)", color1: "#22d3ee", color2: "#818cf8", varColor1: "cyan", varColor2: "indigo", maxText: "Wettest Month", minText: "Driest Month" },
        humidity: { label: "Humidity (%)", color1: "#60a5fa", color2: "#a78bfa", varColor1: "blue", varColor2: "purple", maxText: "Highest Humidity", minText: "Lowest Humidity" },
    };
    
    const text = lang === 'tr' ? {
        title1: "Şehir İklim",
        title2: "Kıyaslaması",
        desc: "Çoklu metriklerle iki farklı dünya şehrini yan yana karşılaştırın. Tüm veriler gelecekteki çevresel etki rotasını görselleştirir.",
        refCity: "Referans Şehir",
        compCity: "Karşılaştırılan Şehir",
        selA: "SEÇİM A",
        selB: "SEÇİM B",
        mTemp: "Sıcaklık",
        mRain: "Aylık Yağış",
        mHumid: "Nem Oranı",
        avgAn: "Yıllık Ortalama",
        trendTitle: "Aylık Trend Karşılaştırması",
        variance: "Varyans Analizi",
        varianceDesc: "{c1} ve {c2} arasındaki sıcaklık, nem ve yağış metriklerindeki farklılıklar, coğrafi konumun ve okyanus akıntılarının mikro iklimleri nasıl şekillendirdiğini net bir şekilde gösteriyor."
    } : {
        title1: "City Climate",
        title2: "Comparison",
        desc: "Compare two different world cities side by side with multiple metrics. All data visualizes the future environmental impact path.",
        refCity: "Reference City",
        compCity: "Compared City",
        selA: "SELECTION A",
        selB: "SELECTION B",
        mTemp: "Temperature",
        mRain: "Monthly Rain",
        mHumid: "Humidity Rate",
        avgAn: "Annual Average",
        trendTitle: "Monthly Trend Comparison",
        variance: "Variance Analysis",
        varianceDesc: "Differences in temperature, humidity, and rainfall metrics between {c1} and {c2} clearly show how geographic location and ocean currents shape microclimates."
    };

    const chartData = months.map((m, i) => ({
        month: m,
        [city1.name]: metric === "temp" ? city1.avgTemp[i] : metric === "rain" ? city1.rainfall[i] : city1.humidity[i],
        [city2.name]: metric === "temp" ? city2.avgTemp[i] : metric === "rain" ? city2.rainfall[i] : city2.humidity[i],
    }));

    const mc = metricConfig[metric];

    const c1Data = metric === "temp" ? city1.avgTemp : metric === "rain" ? city1.rainfall : city1.humidity;
    const c2Data = metric === "temp" ? city2.avgTemp : metric === "rain" ? city2.rainfall : city2.humidity;

    const avg1 = c1Data.reduce((a, b) => a + b, 0) / 12;
    const avg2 = c2Data.reduce((a, b) => a + b, 0) / 12;

    const max1 = Math.max(...c1Data);
    const max2 = Math.max(...c2Data);

    const min1 = Math.min(...c1Data);
    const min2 = Math.min(...c2Data);

    const citySelect = (value: number, onChange: (v: number) => void, label: string, color: string, badge: string) => (
        <div className="glass-card p-6 md:p-8 rounded-2xl border border-outline-variant/20 hover:border-primary/40 transition-colors biolume-glow">
            <div className="flex flex-col gap-4">
                <label className={`text-xs font-bold uppercase tracking-widest text-${color}`}>{label}</label>
                <div className="flex items-center gap-4 bg-surface-container-highest p-4 rounded-xl border border-outline-variant/20 focus-within:border-primary/50 transition-colors">
                    <span className={`material-symbols-outlined text-${color}`}>location_on</span>
                    <select
                        value={value}
                        onChange={(e) => onChange(Number(e.target.value))}
                        className="bg-transparent border-none text-xl md:text-2xl font-bold w-full focus:ring-0 text-on-surface appearance-none outline-none cursor-pointer"
                    >
                        {Object.entries(cityGroups).map(([group, groupCities]) => (
                            <optgroup key={group} label={group} className="bg-surface text-on-surface-variant font-medium text-sm">
                                {groupCities.map((c) => (
                                    <option key={c.idx} value={c.idx} className="bg-surface-container-highest text-on-surface py-2 text-lg font-bold">{c.name}</option>
                                ))}
                            </optgroup>
                        ))}
                    </select>
                </div>
                <div className="flex gap-2">
                    <span className={`px-3 py-1 rounded-full bg-${color}/10 text-${color} text-[10px] font-bold border border-${color}/20 uppercase`}>{cities[value].group}</span>
                    <span className={`px-3 py-1 rounded-full bg-${color}/10 text-${color} text-[10px] font-bold border border-${color}/20 uppercase`}>{badge}</span>
                </div>
            </div>
        </div>
    );

    return (
        <div className="w-full">
            <main className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto space-y-12 animate-fade-in">
                {/* Header Section */}
                <header className="text-center space-y-4 animate-fade-in-up">
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-on-surface font-headline">
                        {text.title1} <span className="text-primary-container">{text.title2}</span>
                    </h1>
                    <p className="text-on-surface-variant max-w-2xl mx-auto text-lg font-body leading-relaxed">
                        {text.desc}
                    </p>
                </header>

                {/* City Search Shell */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    {citySelect(city1Idx, setCity1Idx, text.refCity, "primary", text.selA)}
                    {citySelect(city2Idx, setCity2Idx, text.compCity, "secondary", text.selB)}
                </div>

                {/* Metric Selection Tabs */}
                <div className="flex justify-center w-full relative animate-scale-in" style={{ animationDelay: '0.2s' }}>
                    <div className="relative inline-flex flex-wrap md:flex-nowrap gap-2 bg-surface-container p-2 rounded-full border border-outline-variant/20 shadow-lg">
                        {(() => {
                            const [tabStyle, setTabStyle] = useState({ left: 8, top: 8, width: 0, height: 0, opacity: 0 });
                            const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
                            
                            const metrics = [
                                { key: "temp", label: text.mTemp, icon: "thermostat" },
                                { key: "rain", label: text.mRain, icon: "water_drop" },
                                { key: "humidity", label: text.mHumid, icon: "humidity_percentage" },
                            ];

                            useEffect(() => {
                                const activeIndex = metrics.findIndex(m => m.key === metric);
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
                            }, [metric, lang]);

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
                                    {metrics.map((m, idx) => (
                                        <button
                                            key={m.key}
                                            ref={el => { tabsRef.current[idx] = el; }}
                                            onClick={() => setMetric(m.key as any)}
                                            className={`relative z-10 flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold uppercase tracking-widest text-sm transition-colors cursor-pointer ${
                                                metric === m.key 
                                                    ? "text-on-primary" 
                                                    : "text-on-surface-variant hover:text-on-surface"
                                            }`}
                                        >
                                            <span className="material-symbols-outlined text-[20px]">{m.icon}</span> {m.label}
                                        </button>
                                    ))}
                                </>
                            );
                        })()}
                    </div>
                </div>

                {/* Metric Dashboard Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    
                    {/* Averages (4 cols) */}
                    <div className="md:col-span-4 bg-surface-container p-8 rounded-2xl flex flex-col justify-between border border-outline-variant/10 shadow-lg">
                        <div className="flex justify-between items-start mb-8">
                            <h3 className="text-xl font-bold font-headline text-on-surface">{text.avgAn}</h3>
                            <span className="material-symbols-outlined text-primary">analytics</span>
                        </div>
                        <div className="space-y-8">
                            <div className="flex justify-between items-end border-b border-outline-variant/10 pb-4">
                                <div className="text-5xl md:text-6xl font-black text-primary font-headline">{avg1.toFixed(1)}</div>
                                <div className="text-sm font-bold text-on-surface-variant text-right uppercase">
                                    {city1.name}<br />
                                </div>
                            </div>
                            <div className="flex justify-between items-end">
                                <div className="text-5xl md:text-6xl font-black text-secondary font-headline">{avg2.toFixed(1)}</div>
                                <div className="text-sm font-bold text-on-surface-variant text-right uppercase">
                                    {city2.name}<br />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Historical Trends Chart (8 cols) */}
                    <div className="md:col-span-8 glass-card p-6 md:p-8 rounded-2xl border border-outline-variant/30 relative overflow-hidden flex flex-col min-h-[400px]">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl md:text-2xl font-bold font-headline text-on-surface">{text.trendTitle}</h3>
                            <div className="flex gap-4 text-xs font-bold uppercase tracking-widest">
                                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ backgroundColor: mc.color1 }}></span> {city1.name}</div>
                                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ backgroundColor: mc.color2 }}></span> {city2.name}</div>
                            </div>
                        </div>
                        
                        {/* Chart Area */}
                        <div className="flex-1 w-full min-h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(108, 121, 109, 0.2)" vertical={false} />
                                    <XAxis dataKey="month" tick={{ fill: "#a1aea2", fontSize: 12 }} axisLine={{ stroke: "rgba(108, 121, 109, 0.5)" }} tickLine={false} />
                                    <YAxis tick={{ fill: "#a1aea2", fontSize: 12 }} axisLine={false} tickLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: "#1a291e", borderRadius: "12px", border: "1px solid #3f4b41", color: "#edfaec", fontWeight: "bold" }}
                                        itemStyle={{ color: "#edfaec" }}
                                        cursor={{ fill: "rgba(107, 255, 143, 0.05)" }}
                                    />
                                    <Bar dataKey={city1.name} fill={mc.color1} radius={[6, 6, 0, 0]} />
                                    <Bar dataKey={city2.name} fill={mc.color2} radius={[6, 6, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Extrema / Projections (12 cols, split to smaller parts) */}
                    <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Extremes Card 1 */}
                        <div className="bg-surface-container-high p-6 md:p-8 rounded-2xl space-y-6 border border-outline-variant/20 shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full"></div>
                            <h4 className="text-sm font-bold uppercase tracking-widest text-primary flex items-center justify-between">
                                {mc.maxText} <span className="material-symbols-outlined">trending_up</span>
                            </h4>
                            <div className="grid grid-cols-2 gap-4 pt-2">
                                <div>
                                    <div className="text-lg font-medium text-on-surface-variant mb-1">{city1.name}</div>
                                    <div className="text-4xl md:text-5xl font-black text-on-surface font-headline">{max1}</div>
                                </div>
                                <div className="border-l border-outline-variant/20 pl-4">
                                    <div className="text-lg font-medium text-on-surface-variant mb-1">{city2.name}</div>
                                    <div className="text-4xl md:text-5xl font-black text-on-surface font-headline">{max2}</div>
                                </div>
                            </div>
                        </div>

                        {/* Extremes Card 2 */}
                        <div className="bg-surface-container-high p-6 md:p-8 rounded-2xl space-y-6 border border-outline-variant/20 shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-bl-full"></div>
                            <h4 className="text-sm font-bold uppercase tracking-widest text-secondary flex items-center justify-between">
                                {mc.minText} <span className="material-symbols-outlined">trending_down</span>
                            </h4>
                            <div className="grid grid-cols-2 gap-4 pt-2">
                                <div>
                                    <div className="text-lg font-medium text-on-surface-variant mb-1">{city1.name}</div>
                                    <div className="text-4xl md:text-5xl font-black text-on-surface font-headline">{min1}</div>
                                </div>
                                <div className="border-l border-outline-variant/20 pl-4">
                                    <div className="text-lg font-medium text-on-surface-variant mb-1">{city2.name}</div>
                                    <div className="text-4xl md:text-5xl font-black text-on-surface font-headline">{min2}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Comparison Insights (Full Width) */}
                    <div className="md:col-span-12 glass-card p-10 lg:p-12 rounded-3xl flex flex-col md:flex-row gap-12 items-center border border-primary/20 shadow-[0_0_40px_rgba(107,255,143,0.05)] biolume-glow">
                        <div className="md:w-1/3 text-center md:text-left space-y-6">
                            <h2 className="text-3xl md:text-4xl font-black leading-tight font-headline text-on-surface">{text.variance.split(' ')[0]}<br />{text.variance.split(' ')[1]}</h2>
                            <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">
                                {text.varianceDesc.replace('{c1}', city1.name).replace('{c2}', city2.name)}
                            </p>

                        </div>
                        <div className="md:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                            <img className="w-full h-40 object-cover rounded-2xl grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500 hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtyPmW7XXmyC2LYstE4VuxTD9u4ow_MnlM1men7lHA1KHkk2sGKSL6ctT2zocI06NEd6S5orqnLQ59QNQY7G6DgCDl_6E_bMG01_lqwUj1hTt9z_GZb9Oyq8dtKqMSBzDv1Ks2YIHmOUTan2DH8Yt8pBlrJ2yf7BgrryUASouutdPoFLs-PhkFt-_I6sPu_hjUvKyxZiuqV58AoSFjr9HtZq59fzzhx4L5UhXWzvHAXJC4ZUB9Kfdh_KuogjnBaEXNwrDrI3ewmKo" alt="Cityscape 1" />
                            <img className="w-full h-40 object-cover rounded-2xl grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500 hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtiCPtgwPAdden3gz1LXPm4B5_LmolpEwRABQp2L27gTZmGZBBfxtXxv6BBRNOte0gXV9VKe39gjwIs-Vuqo57B1lGb5bDkoiUNTHPdux3GKvvwz1fXzbmE3aEED2ai0emDJWcwYtFDkTreA7PV1oy1MoFvKe3GBb00W7tCtylCNoK_Xc2t6fD34FjNDk6hXEi5Jwq_r7PKojDHknhLdcN3nousJqPJCZpHAloiS5YiPG46RaziqB-uuyfdqDMJcgKd3SX9o7j6i0" alt="Cityscape 2" />
                            <img className="w-full h-40 object-cover rounded-2xl grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500 hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCV_6ZTjYQS4Jtyt1wv3igad7z3YSuRGe_YkZgwCREBOhy8nf5mjlpeOWAaRcsxkmlcc36pFxmzCMf5JXz-3X1Ij_5_NAJkpod6E-STW--ThAxprP5BDvMiNpaUl-sPMbqMobO4mWy6HUJpkKB7sUGrA3UCeWqQ9x7HCwU1LoVO6RxafqS164WshcYmFsZqqDIWGlewW9d2vRkqxSr9L0vfHZEwuNYCoSiuateVnXznL_QrHA9LTwC3n97DWvWBURi5UOM_Wmr9t04" alt="Plant life" />
                            <img className="w-full h-40 object-cover rounded-2xl grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500 hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBATOr-oNkqFAA8HKpEzqIkw5-y9vI8Py6xZALw9be6mphgb5GhOkfuTEa-NeaVVZljXunlRo53BCDj33DtHnlCbjGlPFK3AeUpwo_6bn8GO9R6O8u1bmDadMuEliXeHYOxXsYHYP_AI609Zu9GhOsd1DLv8FOzMN8eoYYBRZ9-6w-1I91orX4FXsncJOBa-ZXZqii2-2hUTXti01ih495VucaXC1q7s7XhWB5rx7AbErFqu5r3ZIrl2OkmER9bjEgJUb1YC5zAPqQ" alt="Architecture" />
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
