//@ts-nocheck
import { useState, useEffect } from "react";
import { useTheme } from "../App";
import { earnBadge, isBadgeEarned } from "../hooks/useBadges";

// Daily tasks pool — index by day-of-year to always get the same task per day
const tasksTR = [
  { icon: "shower",           text: "Bugün 2 dakika kısa duş al.",                points: 10 },
  { icon: "directions_car",   text: "Bugün araç yerine yürü ya da toplu taşıma kullan.", points: 15 },
  { icon: "recycling",        text: "Çöplerini bugün ayrıştır.",                  points: 10 },
  { icon: "restaurant",       text: "Bugün öğünlerin birinde et tüketme.",        points: 12 },
  { icon: "lightbulb",        text: "Kullanmadığın odaların ışıklarını söndür.",  points: 8  },
  { icon: "local_grocery_store", text: "Bugün alışverişe bez çanta götür.",       points: 8  },
  { icon: "water_drop",       text: "Dişlerini fırçalarken musluğu kapat.",       points: 6  },
  { icon: "nature",           text: "Yakınındaki bir bitki veya ağacı sula.",     points: 10 },
  { icon: "laptop",           text: "Ekran süresini 30 dak azalt, E-atık azalt.", points: 8  },
  { icon: "share",            text: "Bir iklim gerçeğini sosyal medyada paylaş.", points: 12 },
  { icon: "compost",          text: "Organik atıklarını kompostla.",              points: 15 },
  { icon: "wb_sunny",         text: "Bugün çamaşırları kurutma makinesi yerine doğal kurut.", points: 10 },
  { icon: "eco",              text: "Bir arkadaşına iklim değişikliği hakkında bir şey anlat.", points: 12 },
  { icon: "battery_charging_full", text: "Elektronik cihazlarını şarj olduktan sonra prizden çek.", points: 7 },
  { icon: "volunteer_activism", text: "Yakınındaki bir doğal alanı temizlemeye katıl ya da planla.", points: 20 },
];

const tasksEN = [
  { icon: "shower",           text: "Take a 2-minute shorter shower today.",       points: 10 },
  { icon: "directions_car",   text: "Walk or use public transit instead of a car today.", points: 15 },
  { icon: "recycling",        text: "Separate your waste today.",                  points: 10 },
  { icon: "restaurant",       text: "Skip meat in one meal today.",                points: 12 },
  { icon: "lightbulb",        text: "Turn off lights in rooms you're not using.",  points: 8  },
  { icon: "local_grocery_store", text: "Bring a reusable bag to the store today.", points: 8  },
  { icon: "water_drop",       text: "Turn off the tap while brushing your teeth.", points: 6  },
  { icon: "nature",           text: "Water a nearby plant or tree.",               points: 10 },
  { icon: "laptop",           text: "Reduce screen time by 30 min, cut e-waste.",  points: 8  },
  { icon: "share",            text: "Share a climate fact on social media.",        points: 12 },
  { icon: "compost",          text: "Compost your organic waste.",                  points: 15 },
  { icon: "wb_sunny",         text: "Air-dry laundry instead of the machine.",     points: 10 },
  { icon: "eco",              text: "Tell a friend one thing about climate change.", points: 12 },
  { icon: "battery_charging_full", text: "Unplug chargers after devices are full.", points: 7 },
  { icon: "volunteer_activism", text: "Join or plan a local nature cleanup.",       points: 20 },
];

function getDayOfYear(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  return Math.floor(diff / 86400000);
}

const DONE_KEY = 'gencsura_daily_done';

export default function DailyChallenge() {
  const { lang } = useTheme();
  const tasks = lang === 'tr' ? tasksTR : tasksEN;
  const dayIdx = getDayOfYear() % tasks.length;
  const task = tasks[dayIdx];

  const todayStr = new Date().toISOString().slice(0, 10);
  const [done, setDone] = useState(() => {
    try { return JSON.parse(localStorage.getItem(DONE_KEY) || 'null') === todayStr; }
    catch { return false; }
  });
  const [animating, setAnimating] = useState(false);
  const [totalPoints, setTotalPoints] = useState(() => {
    try { return parseInt(localStorage.getItem('gencsura_points') || '0', 10); }
    catch { return 0; }
  });

  const handleDone = () => {
    if (done) return;
    setAnimating(true);
    localStorage.setItem(DONE_KEY, JSON.stringify(todayStr));
    const newPts = totalPoints + task.points;
    localStorage.setItem('gencsura_points', String(newPts));
    setTotalPoints(newPts);
    setDone(true);
    if (!isBadgeEarned('daily_task')) {
      earnBadge('daily_task');
    }
    setTimeout(() => setAnimating(false), 800);
  };

  const text = lang === 'tr' ? {
    title: "Günlük İklim Görevi",
    done: "Tamamlandı! ✅",
    btn: "Görevi Tamamladım",
    pts: "puan",
    total: "Toplam Puan",
    refresh: "Yarın yeni bir görev gelecek",
  } : {
    title: "Daily Climate Task",
    done: "Completed! ✅",
    btn: "I Completed the Task",
    pts: "pts",
    total: "Total Points",
    refresh: "A new task will come tomorrow",
  };

  return (
    <div className={`glass-card rounded-2xl border transition-all p-5 ${done ? 'border-emerald-500/30 bg-emerald-950/10' : 'border-primary/20'}`}>
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 flex-shrink-0 rounded-xl flex items-center justify-center transition-all ${done ? 'bg-emerald-500/20' : 'bg-primary/10'}`}>
          <span className={`material-symbols-outlined text-2xl ${done ? 'text-emerald-400' : 'text-primary'}`}
            style={{ fontVariationSettings: "'FILL' 1" }}>
            {task.icon}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-widest text-primary/70">{text.title}</span>
            <span className="text-xs font-black text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded-full">+{task.points} {text.pts}</span>
          </div>
          <p className="text-sm font-medium text-on-surface leading-snug">{task.text}</p>
          <div className="flex items-center gap-4 mt-3">
            {done ? (
              <span className="text-sm font-bold text-emerald-400">{text.done}</span>
            ) : (
              <button
                onClick={handleDone}
                className={`px-4 py-1.5 rounded-full bg-primary text-on-primary-container text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all ${animating ? 'scale-105 shadow-[0_0_20px_rgba(107,255,143,0.5)]' : ''}`}
              >
                {text.btn}
              </button>
            )}
            <span className="text-xs text-on-surface-variant">{text.total}: <span className="text-yellow-400 font-black">{totalPoints}</span></span>
          </div>
          {done && <p className="text-[10px] text-on-surface-variant/50 mt-1">{text.refresh}</p>}
        </div>
      </div>
    </div>
  );
}
