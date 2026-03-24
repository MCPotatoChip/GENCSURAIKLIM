import { useState, useEffect, FormEvent } from "react";
import { useTheme } from "../App";
import { earnBadge } from "../hooks/useBadges";

export default function Oneri() {
  const { lang } = useTheme();

  const [name, setName] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);

  const text = lang === 'tr' ? {
    title1: "Yarışma",
    title2: "Önerileriniz",
    desc: "Katılmak istediğiniz yarışmalar veya proje fikirleriniz için önerilerinizi bizimle paylaşın. Ekip olarak değerlendirip en uygun yarışmalara birlikte başvuracağız.",
    nameLabel: "Adınız ve Soyadınız",
    namePlaceholder: "Örn. Ayşe Yılmaz",
    sugLabel: "Yarışma Öneriniz / Fikriniz",
    sugPlaceholder: "Şu yarışmaya katılabiliriz... / Böyle bir proje fikrim var...",
    submitObj: "Öneriyi Gönder",
    successMsg: "Öneriniz başarıyla paylaşıldı! Teşekkür ederiz.",
    commSug: "Topluluk Önerileri",
    emptyMsg: "Henüz bir öneri paylaşılmamış. İlk öneren sen ol!",
    exportData: "Veri Dışa Aktar",
    totalCount: "Şu ana kadar {count} adet öneri paylaşıldı.",
    downloadJson: "JSON Olarak İndir"
  } : {
    title1: "Competition",
    title2: "Suggestions",
    desc: "Share your competition ideas or project proposals with us. As a team, we'll evaluate them and apply to the most fitting competitions together.",
    nameLabel: "Full Name",
    namePlaceholder: "e.g. Ayse Yilmaz",
    sugLabel: "Your Competition Idea / Suggestion",
    sugPlaceholder: "We could participate in this competition... / I have this project idea...",
    submitObj: "Submit Suggestion",
    successMsg: "Your suggestion has been shared successfully! Thank you.",
    commSug: "Community Suggestions",
    emptyMsg: "No suggestions shared yet. Be the first to suggest!",
    exportData: "Export Data",
    totalCount: "So far, {count} suggestions have been shared.",
    downloadJson: "Download as JSON"
  };

  const getSuggestions = () => {
    const stored = localStorage.getItem("oneri_responses");
    if (!stored) {
      return [];
    }
    return JSON.parse(stored);
  };

  useEffect(() => {
    setMessages(getSuggestions());
  }, []);

  const [count, setCount] = useState(() => getSuggestions().length);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !suggestion) return;

    const current = getSuggestions();
    const newEntry = {
      name,
      suggestion,
      date: new Date().toISOString()
    };
    const updated = [newEntry, ...current];
    localStorage.setItem("oneri_responses", JSON.stringify(updated));
    setMessages(updated);
    setCount(updated.length);
    setSubmitted(true);
    earnBadge('suggestion_sent');
    setName("");
    setSuggestion("");

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  const handleDownload = () => {
    const data = getSuggestions();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `oneri_kayitlari_${new Date().getTime()}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="min-h-screen bg-background text-on-surface font-body animate-fade-in">
      <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
        <header className="mb-12 text-center animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4 text-on-surface font-headline">
            {text.title1} <span className="text-primary">{text.title2}</span>
          </h1>
          <p className="text-on-surface-variant text-lg leading-relaxed max-w-2xl mx-auto">
            {text.desc}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-12 xl:col-span-5 mb-8 lg:mb-0 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <div className="glass-card bg-surface-container-high/60 rounded-3xl p-8 border border-outline-variant/20 shadow-xl sticky top-24">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-3">
                    <label className="block text-sm font-bold uppercase tracking-widest text-primary">{text.nameLabel}</label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder={text.namePlaceholder}
                        className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-4 text-on-surface focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all outline-none font-medium placeholder-on-surface-variant/50 shadow-inner"
                    />
                    </div>

                    <div className="space-y-3">
                    <label className="block text-sm font-bold uppercase tracking-widest text-primary">{text.sugLabel}</label>
                    <textarea
                        value={suggestion}
                        onChange={e => setSuggestion(e.target.value)}
                        placeholder={text.sugPlaceholder}
                        rows={5}
                        className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-4 text-on-surface focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all outline-none font-medium placeholder-on-surface-variant/50 shadow-inner resize-y"
                    ></textarea>
                    </div>

                    <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-b from-primary to-primary-container text-on-primary-container font-black uppercase tracking-widest shadow-[0_0_20px_rgba(107,255,143,0.3)] hover:scale-[1.02] active:scale-95 transition-all text-sm biolume-glow flex items-center justify-center gap-2"
                    >
                    <span className="material-symbols-outlined">send</span> {text.submitObj}
                    </button>

                    {submitted && (
                    <div className="mt-4 p-4 bg-primary/10 border border-primary/30 text-primary rounded-xl font-bold flex items-center justify-center gap-2 animate-scale-in">
                        <span className="material-symbols-outlined">check_circle</span>
                        {text.successMsg}
                    </div>
                    )}
                </form>
                </div>
            </div>

            <div className="lg:col-span-12 xl:col-span-7 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center gap-3 mb-8">
                    <span className="material-symbols-outlined text-3xl text-primary p-2 bg-primary/10 rounded-xl">forum</span>
                    <h2 className="text-3xl font-black text-on-surface font-headline">{text.commSug}</h2>
                </div>
                
                <div className="space-y-6">
                    {messages.length === 0 ? (
                    <div className="text-center py-16 px-6 bg-surface-container/50 border border-outline-variant/10 rounded-2xl text-on-surface-variant">
                        <span className="material-symbols-outlined text-5xl mb-4 opacity-50">history_toggle_off</span>
                        <p className="text-lg">{text.emptyMsg}</p>
                    </div>
                    ) : (
                    messages.map((msg, idx) => (
                        <div key={idx} className="bg-surface-container border border-outline-variant/20 p-6 rounded-2xl shadow-sm hover:border-primary/30 transition-all hover:shadow-lg group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-primary font-bold text-xl border border-primary/20 shadow-inner">
                                {msg.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h4 className="font-bold text-lg text-on-surface">{msg.name}</h4>
                                <p className="text-xs text-on-surface-variant font-medium opacity-80 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">schedule</span> {new Date(msg.date).toLocaleDateString(lang === 'tr' ? "tr-TR" : "en-US", { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                            </div>
                            </div>
                        </div>
                        <div className="pl-16">
                            <div className="relative">
                                <span className="material-symbols-outlined absolute -left-6 -top-2 text-3xl text-primary/10 rotate-180">format_quote</span>
                                <p className="text-on-surface-variant leading-relaxed whitespace-pre-line text-lg bg-surface-container-lowest/50 p-4 rounded-xl border border-outline-variant/10 group-hover:bg-surface-container-lowest transition-colors">{msg.suggestion}</p>
                            </div>
                        </div>
                        </div>
                    ))
                    )}
                </div>

                <div className="mt-12 bg-surface-container-lowest rounded-2xl p-6 md:p-8 border border-outline-variant/10 text-center flex flex-col items-center">
                    <h3 className="text-xl font-bold text-on-surface font-headline mb-2">{text.exportData}</h3>
                    <p className="text-on-surface-variant text-sm mb-6">
                        {text.totalCount.replace('{count}', count.toString())}
                    </p>
                    <button
                        onClick={handleDownload}
                        disabled={count === 0}
                        className="px-6 py-3 rounded-xl bg-surface-container-highest text-on-surface font-bold text-xs uppercase tracking-widest hover:bg-surface-variant transition-colors border border-outline-variant/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                    >
                        <span className="material-symbols-outlined">download</span> {text.downloadJson}
                    </button>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}
