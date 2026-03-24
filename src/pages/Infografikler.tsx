import { useState } from "react";

const infographics = [
    {
        id: "sera",
        title: "Sera Etkisi Nasıl Çalışır?",
        icon: "🌡️",
        color: "from-orange-400 to-red-500",
        steps: [
            { icon: "☀️", text: "Güneş ışınları atmosfere ulaşır" },
            { icon: "🌍", text: "Yeryüzü ısıyı emer ve tekrar yayar" },
            { icon: "💨", text: "Sera gazları ısının uzaya kaçmasını engeller" },
            { icon: "🌡️", text: "Sıcaklık artar → Küresel ısınma" },
        ],
        fact: "Sanayi Devrimi'nden bu yana CO₂ seviyesi %50 arttı (280 → 420 ppm)",
    },
    {
        id: "karbon",
        title: "Karbon Döngüsü",
        icon: "🔄",
        color: "from-green-400 to-emerald-600",
        steps: [
            { icon: "🌳", text: "Bitkiler fotosentez ile CO₂ emer" },
            { icon: "🦁", text: "Hayvanlar solunum ile CO₂ salar" },
            { icon: "🌊", text: "Okyanuslar CO₂'nin %25'ini emer" },
            { icon: "🏭", text: "İnsan aktiviteleri dengeyi bozar" },
        ],
        fact: "İnsan kaynaklı yıllık CO₂ emisyonu: ~36 milyar ton",
    },
    {
        id: "enerji",
        title: "Enerji Kaynakları Karşılaştırması",
        icon: "⚡",
        color: "from-blue-400 to-indigo-600",
        steps: [
            { icon: "🏭", text: "Kömür: 820g CO₂/kWh" },
            { icon: "🔥", text: "Doğal Gaz: 490g CO₂/kWh" },
            { icon: "☀️", text: "Güneş: 41g CO₂/kWh" },
            { icon: "💨", text: "Rüzgar: 11g CO₂/kWh" },
        ],
        fact: "Yenilenebilir enerji, fosil yakıtlardan 20-75 kat daha az CO₂ üretir",
    },
    {
        id: "su",
        title: "Su Krizi ve İklim",
        icon: "💧",
        color: "from-cyan-400 to-blue-600",
        steps: [
            { icon: "🌡️", text: "Sıcaklık artışı buharlaşmayı hızlandırır" },
            { icon: "🏜️", text: "Kuraklık riski artar" },
            { icon: "🌊", text: "Buzullar eriyerek deniz seviyesi yükselir" },
            { icon: "🌪️", text: "Aşırı yağış olayları sıklaşır" },
        ],
        fact: "2050'ye kadar 5 milyar insan su kıtlığıyla karşılaşabilir",
    },
    {
        id: "gida",
        title: "Gıda ve Karbon Ayak İzi",
        icon: "🍽️",
        color: "from-amber-400 to-orange-600",
        steps: [
            { icon: "🐄", text: "Sığır eti: 27 kg CO₂/kg" },
            { icon: "🧀", text: "Peynir: 13.5 kg CO₂/kg" },
            { icon: "🍗", text: "Tavuk: 6.9 kg CO₂/kg" },
            { icon: "🥦", text: "Sebzeler: 2 kg CO₂/kg" },
        ],
        fact: "Gıda sistemi küresel emisyonların %26'sından sorumlu",
    },
    {
        id: "ulasim",
        title: "Ulaşımın Çevresel Etkisi",
        icon: "🚗",
        color: "from-purple-400 to-pink-600",
        steps: [
            { icon: "✈️", text: "Uçak: 285g CO₂/km (yolcu başı)" },
            { icon: "🚗", text: "Otomobil: 170g CO₂/km" },
            { icon: "🚌", text: "Otobüs: 89g CO₂/km (yolcu başı)" },
            { icon: "🚆", text: "Tren: 14g CO₂/km (yolcu başı)" },
        ],
        fact: "Ulaşım sektörü küresel CO₂ emisyonlarının %16'sını oluşturur",
    },
];

export default function Infografikler() {
    const [expanded, setExpanded] = useState<string | null>(null);

    return (
        <div className="min-h-screen">
            <section className="bg-gradient-to-br from-green-dark to-green-mid text-white py-16 px-6">
                <div className="max-w-5xl mx-auto animate-fade-in-up">
                    <h1 className="text-4xl font-bold mb-3">🎨 İnfografikler</h1>
                    <p className="text-green-200 text-lg">
                        İklim değişikliğini görsel olarak anlayın
                    </p>
                </div>
            </section>

            <div className="py-16 px-6 bg-white">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    {infographics.map((info) => (
                        <div
                            key={info.id}
                            className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all animate-fade-in-up cursor-pointer`}
                            onClick={() => setExpanded(expanded === info.id ? null : info.id)}
                        >
                            {/* Header */}
                            <div className={`bg-gradient-to-br ${info.color} text-white p-6`}>
                                <div className="flex items-center gap-3">
                                    <span className="text-4xl">{info.icon}</span>
                                    <h3 className="text-xl font-bold">{info.title}</h3>
                                </div>
                            </div>

                            {/* Steps */}
                            <div className="p-6 bg-green-faint">
                                <div className="space-y-3">
                                    {info.steps.map((step, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center gap-3 bg-white rounded-xl p-3 border border-green-100"
                                        >
                                            <div className="w-8 h-8 bg-green-main text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                                                {i + 1}
                                            </div>
                                            <span className="text-xl flex-shrink-0">{step.icon}</span>
                                            <span className="text-sm text-gray-700 font-medium">{step.text}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Fact */}
                                {(expanded === info.id) && (
                                    <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-xl p-4 animate-fade-in">
                                        <p className="text-sm text-yellow-800 font-medium">
                                            💡 <strong>Biliyor muydunuz?</strong> {info.fact}
                                        </p>
                                    </div>
                                )}

                                <p className="text-xs text-gray-400 mt-3 text-center">
                                    {expanded === info.id ? "Daraltmak için tıklayın" : "Detay için tıklayın"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
