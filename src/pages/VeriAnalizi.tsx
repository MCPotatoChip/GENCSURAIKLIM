import { useState, useRef, useEffect, useMemo } from "react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, Sector,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const tempData = [
  { year: "1970", avg: 13.2 }, { year: "1975", avg: 13.3 }, { year: "1980", avg: 13.5 },
  { year: "1985", avg: 13.4 }, { year: "1990", avg: 13.7 }, { year: "1995", avg: 13.8 },
  { year: "2000", avg: 14.0 }, { year: "2005", avg: 14.2 }, { year: "2010", avg: 14.4 },
  { year: "2015", avg: 14.7 }, { year: "2020", avg: 14.9 }, { year: "2024", avg: 15.1 },
];

const co2Data = [
  { year: "1990", emission: 170 }, { year: "1995", emission: 215 },
  { year: "2000", emission: 263 }, { year: "2005", emission: 318 },
  { year: "2010", emission: 368 }, { year: "2015", emission: 435 },
  { year: "2020", emission: 423 }, { year: "2024", emission: 490 },
];

const sectorData = [
  { name: "Enerji", value: 72, color: "#6bff8f" }, // primary
  { name: "Tarım", value: 12, color: "#8ff8b4" }, // secondary
  { name: "Sanayi", value: 9, color: "#fb923c" }, // orange
  { name: "Atık", value: 4, color: "#0ea5e9" }, // sky
  { name: "Diğer", value: 3, color: "#a1aea2" }, // on-surface-variant
];

const dataCards = [
  { icon: "thermostat", label: "Ortalama Sıcaklık Artışı", value: "+1.5°C", desc: "Son 50 yılda", color: "text-error" },
  { icon: "co2", label: "Yıllık CO₂ Emisyonu", value: "490 Mt", desc: "2024 tahmini", color: "text-primary" },
  { icon: "water", label: "Deniz Seviyesi Yükselişi", value: "+20 cm", desc: "Son 100 yılda", color: "text-secondary" },
  { icon: "forest", label: "Orman Kaybı", value: "10M ha", desc: "Yıllık küresel kayıp", color: "text-orange-400" },
  { icon: "solar_power", label: "Güneş Enerjisi Kapasitesi", value: "12 GW", desc: "Türkiye kurulu güç", color: "text-primary-dim" },
  { icon: "factory", label: "Küresel CO₂", value: "420 ppm", desc: "Atmosfer yoğunluğu", color: "text-on-surface-variant" },
];

type ChartTab = "temp" | "co2" | "sector";

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        className="transition-all duration-300 drop-shadow-[0_0_25px_rgba(107,255,143,0.8)]"
        style={{ transformOrigin: `${cx}px ${cy}px`, transform: 'scale(1.05)' }}
      />
    </g>
  );
};

export default function VeriAnalizi() {
  const [activeChart, setActiveChart] = useState<ChartTab>("temp");
  const [activePieIndex, setActivePieIndex] = useState(-1);

  const tabs = useMemo(() => [
    { key: "temp" as ChartTab, label: "Sıcaklık", icon: "thermostat" },
    { key: "co2" as ChartTab, label: "CO₂", icon: "co2" },
    { key: "sector" as ChartTab, label: "Sektörel", icon: "pie_chart" },
  ], []);

  const [tabStyle, setTabStyle] = useState({ left: 0, width: 0 });
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const activeIndex = tabs.findIndex(t => t.key === activeChart);
    const currTab = tabsRef.current[activeIndex];
    if (currTab) {
      setTabStyle({
        left: currTab.offsetLeft,
        width: currTab.offsetWidth
      });
    }
  }, [activeChart, tabs]);

  const onPieEnter = (_: any, index: number) => {
    setActivePieIndex(index);
  };
  const onPieLeave = () => {
    setActivePieIndex(-1);
  };

  const commonChartProps = {
    gridColor: "#1a291e", // outline-variant heavily faded
    axisColor: "#a1aea2", // on-surface-variant
    tooltipBg: "#0f1c13", // surface-container
    tooltipBorder: "#3f4b41", // outline-variant
    tooltipText: "#edfaec", // on-surface
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface-container border border-outline-variant/30 p-4 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.5)]">
          <p className="text-on-surface-variant font-bold mb-2 uppercase tracking-widest text-xs">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-on-surface font-black text-lg flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></span>
              {entry.value} {entry.name.includes("Sıcaklık") ? "°C" : entry.name.includes("Emisyonu") ? "Mt" : "%"}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-background text-on-surface font-body animate-fade-in">
      
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-12 animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4 text-on-surface font-headline">
            Veri <span className="text-primary font-medium">Analizi</span>
          </h1>
          <p className="text-on-surface-variant text-lg max-w-2xl leading-relaxed">
            Türkiye ve dünya çapındaki iklim verilerini görselleştirin. Emisyon trendlerini, 
            sıcaklık değişimlerini ve sektörel dağılımı inceleyerek ekolojik kırılganlığımızı değerlendirin.
          </p>
        </header>

        {/* Data Cards */}
        <div className="mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dataCards.map((item, i) => (
              <div
                key={i}
                className="bg-surface-container border border-outline-variant/10 rounded-3xl p-8 hover:border-primary/30 transition-all biolume-glow group"
                style={{ animationDelay: `${Math.min((i + 1) * 0.1, 0.6)}s` }}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-surface-container-highest flex items-center justify-center">
                    <span className={`material-symbols-outlined text-3xl ${item.color}`} style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-widest leading-relaxed mb-2">{item.label}</h3>
                  <div className="text-5xl font-black text-on-surface font-headline drop-shadow-md mb-2">{item.value}</div>
                  <p className="text-xs font-bold text-on-surface-variant/50 uppercase tracking-widest">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Charts Section */}
        <section className="bg-surface-container-high border border-outline-variant/10 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle bg glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 relative z-10">
            <h2 className="text-2xl font-black text-on-surface flex items-center gap-3 font-headline uppercase tracking-widest">
              <span className="material-symbols-outlined text-primary">insights</span>
              Detaylı Grafikler
            </h2>

            {/* Chart Tabs with Sliding Indicator */}
            <div className="relative flex flex-wrap gap-2 bg-surface-container-lowest p-1 rounded-2xl border border-outline-variant/10 inline-flex">
              <div 
                className="absolute top-1 bottom-1 bg-primary rounded-xl shadow-[0_0_15px_rgba(107,255,143,0.3)] transition-all duration-300 ease-in-out pointer-events-none"
                style={{ left: tabStyle.left, width: tabStyle.width }}
              />
              {tabs.map((tab, idx) => (
                <button
                  key={tab.key}
                  ref={el => { tabsRef.current[idx] = el; }}
                  onClick={() => setActiveChart(tab.key)}
                  className={`relative z-10 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-colors flex items-center gap-2 ${
                    activeChart === tab.key
                      ? "text-on-primary"
                      : "text-on-surface-variant hover:text-on-surface"
                    }`}
                >
                  <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full relative z-10 animate-fade-in">
            {activeChart === "temp" && (
              <div>
                <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-widest mb-8 pl-4 border-l-2 border-error">
                  Türkiye Ortalama Sıcaklık Değişimi (1970 - 2024)
                </h3>
                <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
                  <div className="min-w-[700px]">
                    <ResponsiveContainer width="100%" height={400}>
                      <LineChart data={tempData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={commonChartProps.gridColor} vertical={false} />
                        <XAxis dataKey="year" tick={{ fill: commonChartProps.axisColor, fontSize: 12, fontWeight: 'bold' }} axisLine={false} tickLine={false} dy={10} />
                        <YAxis domain={[13, 15.5]} tick={{ fill: commonChartProps.axisColor, fontSize: 12, fontWeight: 'bold' }} unit="°C" axisLine={false} tickLine={false} dx={-10} />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#3f4b41', strokeWidth: 1, strokeDasharray: '4 4' }} />
                        <Line
                          type="monotone"
                          dataKey="avg"
                          stroke="#ff7351" // error
                          strokeWidth={4}
                          dot={{ fill: "#1a291e", stroke: "#ff7351", strokeWidth: 3, r: 6 }}
                          activeDot={{ r: 8, fill: "#ff7351", stroke: "#000000", strokeWidth: 3 }}
                          name="Ortalama Sıcaklık"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {activeChart === "co2" && (
              <div>
                <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-widest mb-8 pl-4 border-l-2 border-primary">
                  Türkiye Yıllık CO₂ Emisyonları (Mt)
                </h3>
                <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
                  <div className="min-w-[700px]">
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={co2Data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={commonChartProps.gridColor} vertical={false} />
                        <XAxis dataKey="year" tick={{ fill: commonChartProps.axisColor, fontSize: 12, fontWeight: 'bold' }} axisLine={false} tickLine={false} dy={10} />
                        <YAxis tick={{ fill: commonChartProps.axisColor, fontSize: 12, fontWeight: 'bold' }} axisLine={false} tickLine={false} dx={-10} />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#142318' }} />
                        <Bar 
                          dataKey="emission" 
                          fill="#6bff8f" // primary
                          radius={[8, 8, 0, 0]} 
                          name="CO₂ Emisyonu" 
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {activeChart === "sector" && (
              <div>
                <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-widest mb-8 pl-4 border-l-2 border-secondary">
                  Türkiye Sera Gazı Emisyonları - Sektörel Dağılım
                </h3>
                <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
                  <div className="w-full md:flex-1 h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={sectorData}
                          cx="50%"
                          cy="50%"
                          innerRadius={100}
                          outerRadius={160}
                          paddingAngle={5}
                          dataKey="value"
                          stroke="none"
                          // @ts-ignore: activeIndex is valid in recharts but TS types might lag
                          activeIndex={activePieIndex}
                          activeShape={renderActiveShape}
                          onMouseEnter={onPieEnter}
                          onMouseLeave={onPieLeave}
                          className="transition-all duration-300 outline-none"
                        >
                          {sectorData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  {/* Custom Legend for Pie */}
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {sectorData.map((s, idx) => (
                      <div 
                        key={s.name} 
                        className={`bg-surface-container-lowest border border-outline-variant/20 p-4 rounded-2xl flex items-center justify-between transition-all duration-300 ${activePieIndex === idx ? 'scale-105 border-primary shadow-[0_0_15px_rgba(107,255,143,0.15)] bg-surface-container' : 'hover:border-primary/50 cursor-pointer'}`}
                        onMouseEnter={() => setActivePieIndex(idx)}
                        onMouseLeave={() => setActivePieIndex(-1)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded-full shadow-inner" style={{ backgroundColor: s.color }} />
                          <span className="font-bold text-on-surface">{s.name}</span>
                        </div>
                        <span className="text-2xl font-black text-on-surface-variant/50">%{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant/40 mt-10 text-center">
              Kaynak: Meteoroloji Genel Müdürlüğü, TÜİK ve Global Carbon Atlas verileri baz alınmıştır.
            </p>
          </div>
        </section>

      </main>
    </div>
  );
}
