//@ts-nocheck
import { useState, useEffect } from "react";

interface Step {
  icon: string;
  titleTR: string;
  titleEN: string;
  descTR: string;
  descEN: string;
}

const STEPS: Step[] = [
  { icon: 'eco', titleTR: 'GençŞura İklim\'e Hoş Geldin! 🌱', titleEN: 'Welcome to GençŞura İklim! 🌱', descTR: 'Türkiye\'nin iklim değişikliğiyle mücadele eden genç nesil projesi. Platform boyunca seninle ilgili çok şey var!', descEN: 'Turkey\'s youth climate initiative. There\'s a lot here for you throughout the platform!' },
  { icon: 'map', titleTR: 'İnteraktif Harita', titleEN: 'Interactive Map', descTR: 'Harita sayfasında Türkiye\'nin 7 bölgesinin iklim risk analizini incele. Zaman çizelgesiyle 2100\'e kadar projeksiyon gör.', descEN: 'On the Map page, examine the climate risk analysis of 7 Turkish regions. See projections up to 2100 with the timeline.' },
  { icon: 'science', titleTR: '"Ya Eğer...?" Simülatörü', titleEN: '"What If...?" Simulator', descTR: 'Simülatör sayfasında sensörleri ayarlayarak toplumsal alışkanlıkların etkisini hesapla ve senaryoyu çalıştır.', descEN: 'On the Simulator page, adjust sensors to calculate the impact of social habits and run the scenario.' },
  { icon: 'emoji_events', titleTR: 'Rozet Kazan 🏅', titleEN: 'Earn Badges 🏅', descTR: 'Platforma katılarak, quiz yaparak, anket doldurarak ve günlük görevleri tamamlayarak rozetler kazan. Rozetler sayfasından takip et.', descEN: 'Earn badges by engaging with the platform, taking quizzes, filling surveys, and completing daily tasks. Track them on the Badges page.' },
  { icon: 'lightbulb', titleTR: 'Yarışma Önerileriniz', titleEN: 'Competition Suggestions', descTR: 'Öneriler sayfasında katılmak istediğiniz yarışmalar için fikirlerinizi paylaşın. Diğer kullanıcıların önerilerini okuyun ve kendi görüşünüzü paylaşın!', descEN: 'On the Suggestions page, share your ideas for competitions you want to participate in. Read others\' ideas and share your own!' },
];

const TOUR_KEY = 'gencsura_tour_done';

export default function OnboardingTour({ lang }: { lang: 'tr' | 'en' }) {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const done = localStorage.getItem(TOUR_KEY);
    if (!done) {
      // Small delay so page loads first
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const close = () => {
    localStorage.setItem(TOUR_KEY, 'true');
    setVisible(false);
  };

  const next = () => {
    if (step < STEPS.length - 1) setStep(s => s + 1);
    else close();
  };

  const prev = () => setStep(s => Math.max(0, s - 1));

  if (!visible) return null;

  const current = STEPS[step];
  const progress = ((step + 1) / STEPS.length) * 100;
  const btnNext = lang === 'tr' ? (step === STEPS.length - 1 ? 'Başla! 🚀' : 'İleri →') : (step === STEPS.length - 1 ? 'Let\'s Go! 🚀' : 'Next →');
  const btnPrev = lang === 'tr' ? '← Geri' : '← Back';
  const skipLbl = lang === 'tr' ? 'Geç' : 'Skip';
  const stepLbl = lang === 'tr' ? `Adım ${step + 1} / ${STEPS.length}` : `Step ${step + 1} / ${STEPS.length}`;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative bg-surface-container border border-primary/20 rounded-3xl p-8 max-w-md w-full shadow-[0_0_60px_rgba(107,255,143,0.15)] animate-scale-in">
        {/* Close */}
        <button onClick={close} className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-colors">
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(107,255,143,0.2)]">
          <span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
            {current.icon}
          </span>
        </div>

        {/* Content */}
        <h2 className="text-2xl font-black text-on-surface text-center mb-3 font-headline">
          {lang === 'tr' ? current.titleTR : current.titleEN}
        </h2>
        <p className="text-on-surface-variant text-center leading-relaxed">
          {lang === 'tr' ? current.descTR : current.descEN}
        </p>

        {/* Progress */}
        <div className="mt-6 mb-4">
          <div className="h-1.5 bg-black/30 rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <div className="text-center text-xs text-on-surface-variant mt-1">{stepLbl}</div>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-3">
          {step > 0 && (
            <button onClick={prev} className="px-4 py-2 rounded-xl border border-outline-variant/30 text-on-surface-variant hover:text-on-surface text-sm font-bold transition-colors">
              {btnPrev}
            </button>
          )}
          {step === 0 && (
            <button onClick={close} className="px-4 py-2 rounded-xl border border-outline-variant/30 text-on-surface-variant hover:text-on-surface text-sm font-bold transition-colors">
              {skipLbl}
            </button>
          )}
          <button onClick={next} className="flex-1 py-2 rounded-xl bg-primary text-on-primary-container font-black text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(107,255,143,0.3)]">
            {btnNext}
          </button>
        </div>
      </div>
    </div>
  );
}
