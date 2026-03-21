import { useState, useEffect } from "react";

interface CountdownDay {
  name: string;
  icon: string;
  date: string; // MM-DD format
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
}

const environmentDays: CountdownDay[] = [
  {
    name: "Dünya Karbon Azaltım Günü",
    icon: "🏭",
    date: "01-28",
    color: "text-gray-400",
    bgColor: "bg-surface-container-highest",
    borderColor: "border-gray-500/30",
    description: "Karbon emisyonlarının azaltılması konusunda farkındalık günü",
  },
  {
    name: "Dünya Sulak Alanlar Günü",
    icon: "🌿",
    date: "02-02",
    color: "text-primary",
    bgColor: "bg-surface-container-highest",
    borderColor: "border-primary/30",
    description: "Sulak alanların korunması ve önemi",
  },
  {
    name: "Dünya Su Günü",
    icon: "💧",
    date: "03-22",
    color: "text-blue-400",
    bgColor: "bg-surface-container-highest",
    borderColor: "border-blue-500/30",
    description: "Küresel su kıtlığına dikkat çekme günü",
  },
  {
    name: "Dünya Meteoroloji Günü",
    icon: "🌦️",
    date: "03-23",
    color: "text-indigo-400",
    bgColor: "bg-surface-container-highest",
    borderColor: "border-indigo-500/30",
    description: "Hava ve iklim biliminin önemi",
  },
  {
    name: "Dünya Günü",
    icon: "🌍",
    date: "04-22",
    color: "text-primary",
    bgColor: "bg-surface-container-highest",
    borderColor: "border-primary/50",
    description: "Gezegenimizi koruma ve çevre bilinci",
  },
  {
    name: "Dünya İklim Günü",
    icon: "☀️",
    date: "05-15",
    color: "text-amber-400",
    bgColor: "bg-surface-container-highest",
    borderColor: "border-amber-500/30",
    description: "İklim değişikliği ile mücadele farkındalık günü",
  },
  {
    name: "Dünya Çevre Günü",
    icon: "🌱",
    date: "06-05",
    color: "text-primary",
    bgColor: "bg-surface-container-highest",
    borderColor: "border-primary/60",
    description: "Çevre koruma ve sürdürülebilirlik farkındalığı",
  },
  {
    name: "Dünya Okyanus Günü",
    icon: "🌊",
    date: "06-08",
    color: "text-cyan-400",
    bgColor: "bg-surface-container-highest",
    borderColor: "border-cyan-500/30",
    description: "Okyanusların korunması ve deniz yaşamı",
  },
  {
    name: "Dünya Çölleşme ile Mücadele Günü",
    icon: "🏜️",
    date: "06-17",
    color: "text-orange-400",
    bgColor: "bg-surface-container-highest",
    borderColor: "border-orange-500/30",
    description: "Çölleşme ve kuraklık ile mücadele",
  },
  {
    name: "Uluslararası Ozon Tabakasının Korunması Günü",
    icon: "🛡️",
    date: "09-16",
    color: "text-purple-400",
    bgColor: "bg-surface-container-highest",
    borderColor: "border-purple-500/30",
    description: "Ozon tabakasının korunması için farkındalık",
  },
  {
    name: "Dünya Hayvanlarını Koruma Günü",
    icon: "🐾",
    date: "10-04",
    color: "text-rose-400",
    bgColor: "bg-surface-container-highest",
    borderColor: "border-rose-500/30",
    description: "Yaban hayatının ve biyoçeşitliliğin korunması",
  },
  {
    name: "Dünya Toprak Günü",
    icon: "🌾",
    date: "12-05",
    color: "text-amber-600",
    bgColor: "bg-surface-container-highest",
    borderColor: "border-amber-700/30",
    description: "Toprak sağlığı ve sürdürülebilir tarım",
  },
];

function getNextOccurrence(mmdd: string, now: Date): Date {
  const [mm, dd] = mmdd.split("-").map(Number);
  const thisYear = new Date(now.getFullYear(), mm - 1, dd, 0, 0, 0);
  if (thisYear.getTime() > now.getTime()) return thisYear;
  return new Date(now.getFullYear() + 1, mm - 1, dd, 0, 0, 0);
}

function getCountdown(target: Date, now: Date) {
  const diff = target.getTime() - now.getTime();
  const totalSeconds = Math.max(0, Math.floor(diff / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

export default function ZamanCizelgesi() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Sort events by nearest
  const sorted = [...environmentDays].sort((a, b) => {
    const nextA = getNextOccurrence(a.date, now);
    const nextB = getNextOccurrence(b.date, now);
    return nextA.getTime() - nextB.getTime();
  });

  const nearestEvent = sorted[0];
  const nearestTarget = nearestEvent ? getNextOccurrence(nearestEvent.date, now) : now;
  const cd = getCountdown(nearestTarget, now);

  // Dynamic Calendar Calculation
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // 0 (Sun) to 6 (Sat)
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  const monthNames = [
    "OCAK", "ŞUBAT", "MART", "NİSAN", "MAYIS", "HAZİRAN", 
    "TEMMUZ", "AĞUSTOS", "EYLÜL", "EKİM", "KASIM", "ARALIK"
  ];

  // Helper to get event for a specific day in current month
  const getEventForDay = (day: number) => {
    const mmStr = String(currentMonth + 1).padStart(2, "0");
    const ddStr = String(day).padStart(2, "0");
    const dateStr = `${mmStr}-${ddStr}`;
    return environmentDays.find(e => e.date === dateStr);
  };

  return (
    <div className="w-full">
      <main className="pt-24 pb-20 px-8 max-w-7xl mx-auto min-h-screen">
        
        {/* Hero Countdown Section */}
        <section className="relative mb-16 animate-fade-in-up">
          <div className="glass-card rounded-2xl p-8 md:p-12 lg:p-16 overflow-hidden relative group border border-outline-variant/10 shadow-2xl">
            {/* Background Image Decor */}
            <div className="absolute inset-0 -z-10 opacity-20 group-hover:opacity-30 transition-opacity duration-700">
              <img 
                alt="Dense dark green rainforest canopy seen from above" 
                className="w-full h-full object-cover grayscale opacity-50 mix-blend-overlay" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWroV0Vaf3MvOs0OH0hbxxc86dQUfq8JKe3N0N29EUO5Gtn5DfiiM5Tb6x4sintm9FoLideCVREcch9IDsafKkt_kixBXGNVEhsD9l-4PQmmKovaRbTmtUtMB1wuahNYhNXEMwC69DO13cNrdW9937_MqP9pOvIPHfEm9ni1p4d3XlXKDgWjLI02Y8ZVEh08iswYfeeD7SpT4ggxFuVKOQpk9kXaHB5DvfvdJv1w4EKxwVw5FEGrvMMQVLoTw_CL2aIwwuyvFhtb8"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest/80 via-transparent to-surface-container-lowest/50"></div>
            </div>
            
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
              {/* Left Info */}
              <div className="max-w-xl text-center lg:text-left">
                <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6 font-headline">
                  Yaklaşan Dünya Etkinliği
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-on-surface tracking-tighter mb-4 font-headline flex items-center justify-center lg:justify-start gap-4">
                  {nearestEvent.name} <span className="text-5xl">{nearestEvent.icon}</span>
                </h1>
                <p className="text-lg text-on-surface-variant mb-10 font-body leading-relaxed">
                  {nearestEvent.description}. Hedefi yakalamak için dünya çapında düzenlenen faaliyetlere katılın ve ekosistemin yenilenmesine yardımcı olun.
                </p>
                <div className="flex justify-center lg:justify-start gap-4">
                  <button className="bg-gradient-to-b from-primary to-primary-container text-on-primary-container px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold text-xs md:text-sm uppercase tracking-widest biolume-glow hover:scale-105 active:scale-95 transition-all duration-300">
                    Ayrıntıları Görüntüle
                  </button>
                  <button className="px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold text-xs md:text-sm uppercase tracking-widest text-primary hover:bg-primary/10 transition-all border border-primary/30">
                    Takvime Ekle
                  </button>
                </div>
              </div>

              {/* Large Countdown Visual */}
              <div className="flex gap-3 md:gap-5 items-end justify-center lg:justify-end scale-90 md:scale-100">
                <div className="text-center">
                  <div className="text-5xl md:text-7xl lg:text-8xl font-black text-primary leading-none tabular-nums tracking-tighter shadow-primary/20 drop-shadow-xl">{String(cd.days).padStart(2, '0')}</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant mt-3 font-headline">Gün</div>
                </div>
                <div className="text-4xl md:text-6xl lg:text-7xl font-light text-primary/30 leading-none pb-3 md:pb-4">:</div>
                <div className="text-center">
                  <div className="text-5xl md:text-7xl lg:text-8xl font-black text-primary leading-none tabular-nums tracking-tighter shadow-primary/20 drop-shadow-xl">{String(cd.hours).padStart(2, '0')}</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant mt-3 font-headline">Saat</div>
                </div>
                <div className="text-4xl md:text-6xl lg:text-7xl font-light text-primary/30 leading-none pb-3 md:pb-4">:</div>
                <div className="text-center">
                  <div className="text-5xl md:text-7xl lg:text-8xl font-black text-primary leading-none tabular-nums tracking-tighter shadow-primary/20 drop-shadow-xl">{String(cd.minutes).padStart(2, '0')}</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant mt-3 font-headline">Dk</div>
                </div>
                {/* Optional Seconds */}
                <div className="text-4xl md:text-6xl lg:text-7xl font-light text-primary/30 leading-none pb-3 md:pb-4 hidden md:block">:</div>
                <div className="text-center hidden md:block">
                  <div className="text-5xl md:text-7xl lg:text-8xl font-black text-primary/60 leading-none tabular-nums tracking-tighter">{String(cd.seconds).padStart(2, '0')}</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant mt-3 font-headline">Sn</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid: Calendar & Events */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Calendar Section (Dynamic) */}
          <section className="lg:col-span-2 glass-card rounded-2xl p-8 md:p-10 border border-outline-variant/10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-on-surface font-headline">Aylık Ekosistem Takvimi</h2>
              <div className="flex items-center gap-4 bg-surface-container px-4 py-2 rounded-full border border-outline-variant/5">
                <span className="font-bold text-primary font-headline tracking-widest">{monthNames[currentMonth]} {currentYear}</span>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2 md:gap-3">
              {/* Day Labels */}
              {['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'].map(day => (
                <div key={day} className="text-center text-[10px] md:text-xs font-black text-on-surface-variant mb-4 tracking-tighter uppercase font-headline">
                  {day}
                </div>
              ))}

              {/* Empty padding for days before the 1st of month */}
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <div key={`empty-${i}`} className="h-16 md:h-24 p-2 bg-surface-container-low rounded-xl opacity-20 border border-transparent"></div>
              ))}

              {/* Active days in month */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const dayStr = String(i + 1);
                const event = getEventForDay(i + 1);
                const isToday = now.getDate() === (i + 1);

                if (event) {
                  return (
                    <div 
                      key={`day-${i}`} 
                      className={`h-20 md:h-24 p-2 md:p-3 bg-surface-container-highest border ${event.borderColor} rounded-xl relative group cursor-pointer biolume-glow transition-all hover:scale-105 active:scale-95 z-10`}
                    >
                      <span className={`text-xs md:text-sm font-black ${event.color}`}>{dayStr}</span>
                      <div className="absolute top-2 right-2 text-sm md:text-lg">{event.icon}</div>
                      <div className="absolute bottom-2 md:bottom-3 left-2 md:left-3 right-2 md:right-3">
                        <div className="text-[9px] md:text-[10px] font-bold leading-tight text-on-surface hidden md:block line-clamp-2">{event.name}</div>
                        <div className={`w-full h-1 ${event.color.replace('text', 'bg')} rounded-full mt-1 opacity-70`}></div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div 
                    key={`day-${i}`} 
                    className={`h-16 md:h-24 p-2 md:p-3 bg-surface-container-lowest rounded-xl text-xs md:text-sm font-bold text-on-surface-variant border border-outline-variant/5 ${isToday ? 'ring-1 ring-primary/50 bg-primary/5' : ''}`}
                  >
                    {dayStr}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Upcoming List Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant/10">
              <h3 className="text-xl font-bold tracking-tight text-on-surface font-headline">Sonraki Faaliyetler</h3>
            </div>
            
            <div className="space-y-4">
              {sorted.slice(1, 5).map((day, idx) => {
                const target = getNextOccurrence(day.date, now);
                const cd = getCountdown(target, now);
                const inDaysText = cd.days === 0 ? 'Bugün' : `${cd.days} Gün İçinde`;

                return (
                  <div key={day.name} className="bg-surface-container-high p-5 rounded-xl border-l-4 border-primary hover:bg-surface-container-highest hover:-translate-y-1 transition-all cursor-pointer shadow-lg">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-black text-primary uppercase tracking-widest font-headline">{inDaysText}</span>
                      <span className="text-xl">{day.icon}</span>
                    </div>
                    <h4 className="font-bold text-on-surface mb-1 text-sm">{day.name}</h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-2">{day.description}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-[10px] font-bold text-on-surface-variant font-headline bg-surface-container-lowest px-2 py-1 rounded">
                        {target.toLocaleDateString("tr-TR", { day: "numeric", month: "long" })}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-6 bg-gradient-to-br from-primary/10 to-transparent rounded-xl border border-primary/20 mt-8">
              <p className="text-sm font-medium text-primary-fixed mb-3 italic font-body">"Gezegenimize yönelik en büyük tehdit, onu başka birinin kurtaracağına olan inançtır."</p>
              <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-headline">— Robert Swan</span>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
