import { useState, useMemo, useRef, useEffect } from "react";

interface MapRegion {
  id: string;
  label: string;
  lat: number;
  lon: number;
  zoom: number;
  short: string;
  desc: string;
}

const regions: MapRegion[] = [
  { id: "turkey", label: "Türkiye", short: "TR", lat: 39.5, lon: 35.5, zoom: 6, desc: "Marmara, Ege ve Anadolu genel izleme" },
  { id: "europe", label: "Avrupa", short: "EU", lat: 50, lon: 10, zoom: 4, desc: "Kıta genelinde kirlilik ve rüzgar" },
  { id: "world", label: "Dünya", short: "GL", lat: 20, lon: 0, zoom: 3, desc: "Küresel sıcaklık anomalileri" },
  { id: "asia", label: "Asya", short: "AS", lat: 35, lon: 90, zoom: 3, desc: "Muson ve emisyon izleme" },
  { id: "africa", label: "Afrika", short: "AF", lat: 5, lon: 20, zoom: 3, desc: "Kuraklık ve sahra etkileri" },
  { id: "americas", label: "Amerika", short: "AM", lat: 15, lon: -80, zoom: 3, desc: "Tropikal fırtına döngüleri" },
];

const mapLayers = [
  {
    id: "temp",
    label: "Sıcaklık",
    icon: "thermostat",
    description: "Yüzey sıcaklık dağılımı",
    overlay: "temp",
    product: "ecmwf",
    color: "primary",
    value: "15°C - 35°C",
  },
  {
    id: "wind",
    label: "Rüzgar Hızı",
    icon: "air",
    description: "Anlık rüzgar yönü ve şiddeti",
    overlay: "wind",
    product: "ecmwf",
    color: "cyan-400",
    value: "10-40 km/h",
  },
  {
    id: "rain",
    label: "Yağış",
    icon: "water_drop",
    description: "Yağmur ve kar örtüsü",
    overlay: "rain",
    product: "ecmwf",
    color: "blue-400",
    value: "0.5 - 12 mm",
  },
  {
    id: "co",
    label: "CO Seviyesi",
    icon: "co2",
    description: "Karbon monoksit gazı yoğunluğu",
    overlay: "cosc",
    product: "cams",
    color: "orange-400",
    value: "Kritik",
  },
  {
    id: "pm25",
    label: "Hava Kalitesi",
    icon: "aq",
    description: "PM2.5 hava kirliliği partikülleri",
    overlay: "pm2p5",
    product: "cams",
    color: "secondary",
    value: "42 AQI",
  },
];

function buildSrc(layer: typeof mapLayers[0], region: MapRegion) {
  return `https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=default&metricTemp=°C&metricWind=default&zoom=${region.zoom}&overlay=${layer.overlay}&product=${layer.product}&level=surface&lat=${region.lat}&lon=${region.lon}`;
}

const liveDate = new Date().toLocaleDateString("tr-TR", { month: "long", day: "numeric", year: "numeric" });

export default function Harita() {
  const [activeLayer, setActiveLayer] = useState(mapLayers[0]);
  const [activeRegion, setActiveRegion] = useState(regions[0]); // Turkey default

  const iframeSrc = useMemo(() => buildSrc(activeLayer, activeRegion), [activeLayer, activeRegion]);

  return (
    <div className="w-full flex flex-col h-screen pt-20 overflow-hidden font-body selection:bg-primary/30 selection:text-primary animate-fade-in bg-background">
        
      {/* Main Map Viewport */}
      <main className="relative flex-grow overflow-hidden border-t border-outline-variant/10">
        
        {/* Interactive Overlay Layer (Heatmap Glows - pointer events none so iframe can be clicked) */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-primary/10 blur-[100px] rounded-full transition-all duration-1000"></div>
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-error/5 blur-[120px] rounded-full transition-all duration-1000"></div>
          <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-secondary/10 blur-[80px] rounded-full transition-all duration-1000"></div>
        </div>

        {/* The iframe Map Layer */}
        <div className="absolute inset-0 z-0">
          <iframe
            key={`${activeLayer.id}-${activeRegion.id}`}
            src={iframeSrc}
            width="100%"
            height="100%"
            frameBorder="0"
            title={`${activeRegion.label} ${activeLayer.label} Haritası`}
            className="w-full h-full filter saturate-[0.85] contrast-[1.1] " 
            style={{ minHeight: "100%" }}
          ></iframe>
        </div>

        {/* Floating Filters Sidebar (Left) */}
        <aside className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4 animate-slide-in-right">
          <div className="bg-surface-variant/80 backdrop-blur-2xl p-4 rounded-2xl flex flex-col gap-6 shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/10">
            <div className="flex flex-col gap-3">
              <p className="text-[10px] uppercase tracking-[0.1em] font-bold text-on-surface-variant px-2">Harita Katmanları</p>
              
              {mapLayers.map((layer) => {
                const isActive = activeLayer.id === layer.id;
                return (
                  <button
                    key={layer.id}
                    onClick={() => setActiveLayer(layer)}
                    className={`group flex items-center gap-4 p-3 rounded-xl transition-all duration-300 w-full text-left ${
                      isActive
                        ? "bg-primary/20 text-primary border border-primary/30 shadow-[0_0_15px_rgba(107,255,143,0.15)]"
                        : "bg-surface-container/50 text-on-surface-variant border border-transparent hover:bg-surface-container hover:text-on-surface"
                    }`}
                  >
                    <span 
                        className="material-symbols-outlined transition-transform group-hover:scale-110" 
                        style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                    >
                        {layer.icon}
                    </span>
                    <span className="text-sm font-bold tracking-wide hidden md:block">{layer.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="h-px bg-white/10"></div>
            
            {/* Visual Style Static Toggle */}
            <div className="flex flex-col gap-2">
              <p className="text-[10px] uppercase tracking-[0.1em] font-bold text-on-surface-variant px-2">Veri Sağlayıcı</p>
              <div className="flex p-1 bg-surface-container-lowest rounded-full border border-white/5">
                <div className="py-2 px-4 md:px-6 rounded-full bg-surface-container-highest text-xs font-bold text-on-surface w-full text-center">Windy API</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Top Region Selection Bar with Sliding Indicator */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex justify-center w-full max-w-4xl px-4 animate-fade-in-up">
          <div className="relative inline-flex bg-surface-variant/80 backdrop-blur-xl px-2 py-2 rounded-full border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.3)] overflow-x-auto snap-x hide-scrollbar">
            {(() => {
              const [tabStyle, setTabStyle] = useState({ left: 8, top: 8, width: 0, height: 0, opacity: 0 });
              const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

              useEffect(() => {
                const activeIndex = regions.findIndex(r => r.id === activeRegion.id);
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
              }, [activeRegion]);

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
                  {regions.map((region, idx) => (
                    <button
                      key={region.id}
                      ref={el => { tabsRef.current[idx] = el; }}
                      onClick={() => setActiveRegion(region)}
                      className={`relative z-10 px-5 md:px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap snap-center cursor-pointer border-none outline-none ${
                        activeRegion.id === region.id
                          ? "text-on-primary-container"
                          : "text-on-surface-variant hover:text-primary hover:bg-white/5"
                      }`}
                    >
                      {region.label}
                    </button>
                  ))}
                </>
              );
            })()}
          </div>
        </div>

        {/* Right Side Stats Card */}
        <div className="absolute right-4 md:right-8 top-6 z-20 w-72 md:w-80 animate-slide-in-left hidden lg:block">
          <div className="bg-surface-container/90 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] space-y-6 border border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] blur-[20px] group-hover:bg-primary/10 transition-colors"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-black text-on-surface tracking-tight mb-2 font-headline">{activeRegion.label}</h3>
              <p className="text-sm text-primary font-bold flex items-center gap-1.5 uppercase tracking-widest">
                <span className="material-symbols-outlined text-[16px]">location_on</span>
                {activeRegion.desc}
              </p>
            </div>

            <div className="space-y-4 relative z-10">
              <div className="flex justify-between items-end border-b border-outline-variant/20 pb-4">
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">{activeLayer.label} Seviyesi</span>
                <span className="text-3xl font-black text-on-surface font-headline">{activeLayer.value}</span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">{activeLayer.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 relative z-10">
              <div className="bg-surface-container-highest/60 p-4 rounded-xl border border-white/5">
                <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-tighter mb-1">Koordinat</p>
                <p className="text-sm font-bold text-on-surface">{activeRegion.lat}° N, {activeRegion.lon}° E</p>
              </div>
              <div className="bg-surface-container-highest/60 p-4 rounded-xl border border-white/5">
                <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-tighter mb-1">Yakınlaştırma</p>
                <p className="text-sm font-bold text-on-surface">Seviye {activeRegion.zoom}</p>
              </div>
            </div>

            <button className="relative z-10 w-full py-4 rounded-xl bg-gradient-to-b from-primary to-primary-container text-on-primary-container font-black text-xs md:text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(107,255,143,0.2)] hover:shadow-[0_0_30px_rgba(107,255,143,0.4)] transition-all active:scale-95 flex justify-center items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">public</span> Raporu Görüntüle
            </button>
          </div>
        </div>

        {/* Bottom Data Legend & Timeline */}
        <div className="absolute bottom-6 md:bottom-8 left-4 md:left-8 right-4 md:right-8 z-20 flex flex-col md:flex-row items-end justify-between gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          
          {/* Legend */}
          <div className="bg-surface-variant/90 backdrop-blur-xl px-6 py-5 rounded-2xl shadow-2xl border border-white/10 w-full md:min-w-[300px] md:w-auto">
            <p className="text-[10px] uppercase font-bold text-on-surface-variant tracking-[0.2em] mb-4 flex justify-between">
                <span>Katman Isı Haritası Skalası</span>
                <span className="text-primary">{activeLayer.label}</span>
            </p>
            <div className="flex items-center gap-0 h-4 rounded-full overflow-hidden mb-3 shadow-inner">
              <div className="flex-1 h-full bg-blue-500"></div>
              <div className="flex-1 h-full bg-cyan-400"></div>
              <div className="flex-1 h-full bg-emerald-500"></div>
              <div className="flex-1 h-full bg-primary"></div>
              <div className="flex-1 h-full bg-yellow-400"></div>
              <div className="flex-1 h-full bg-orange-500"></div>
              <div className="flex-1 h-full bg-error"></div>
            </div>
            <div className="flex justify-between text-[10px] font-bold text-on-surface-variant">
              <span>Düşük</span>
              <span>Optimum</span>
              <span>Kritik/Yüksek</span>
            </div>
          </div>

          {/* Timeline Control */}
          <div className="bg-surface-container/95 backdrop-blur-2xl p-5 md:p-6 rounded-2xl shadow-2xl border border-white/10 w-full md:w-1/3 min-w-[300px]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <button className="material-symbols-outlined text-primary bg-primary/10 rounded-full p-1 hover:scale-110 transition-transform">play_arrow</button>
                <span className="text-sm font-bold text-on-surface">{liveDate}</span>
              </div>
              <span className="text-[10px] font-black text-primary px-3 py-1 bg-primary/20 rounded-full border border-primary/30 tracking-widest shadow-[0_0_10px_rgba(107,255,143,0.2)] animate-pulse">CANLI VERİ</span>
            </div>
            <div className="relative w-full h-8 flex items-center mt-2 pb-2">
              <div className="absolute inset-0 top-1/2 -translate-y-1/2 h-1.5 bg-surface-container-highest overflow-hidden rounded-full w-full border border-white/5">
                <div className="h-full bg-gradient-to-r from-primary/50 to-primary/80 w-[85%]"></div>
              </div>
              
              <div className="absolute left-[85%] top-1/2 -translate-y-1/2 w-5 h-5 bg-primary rounded-full shadow-[0_0_20px_rgba(107,255,143,0.8)] border-2 border-surface border-opacity-50 cursor-pointer hover:scale-125 transition-transform z-10"></div>
              
              {/* Time Markers */}
              <div className="absolute top-6 left-0 text-[9px] font-bold text-on-surface-variant tracking-wider">00:00</div>
              <div className="absolute top-6 left-1/4 text-[9px] font-bold text-on-surface-variant tracking-wider">06:00</div>
              <div className="absolute top-6 left-1/2 text-[9px] font-bold text-on-surface-variant tracking-wider">12:00</div>
              <div className="absolute top-6 left-3/4 text-[9px] font-bold text-on-surface-variant tracking-wider">18:00</div>
              <div className="absolute top-6 right-0 text-[10px] font-black text-primary tracking-wider drop-shadow-md">ŞİMDİ</div>
            </div>
          </div>

        </div>
      </main>

    </div>
  );
}
