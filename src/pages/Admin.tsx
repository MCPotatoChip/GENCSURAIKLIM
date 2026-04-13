import { useState, useEffect } from "react";
import { useTheme } from "../App";
import { supabase } from "../lib/supabaseClient";

export default function Admin() {
  const { lang } = useTheme();
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [surveys, setSurveys] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const text = lang === 'tr' ? {
    title: "Yönetici Paneli",
    passPrompt: "Lütfen yönetici şifresini girin.",
    passPlaceholder: "Şifre",
    login: "Giriş Yap",
    incorrect: "Hatalı şifre!",
    surveyData: "Anket Sonuçları",
    noData: "Henüz anket verisi yok.",
    download: "Tüm Verileri İndir (JSON)"
  } : {
    title: "Admin Panel",
    passPrompt: "Please enter the admin password.",
    passPlaceholder: "Password",
    login: "Login",
    incorrect: "Incorrect password!",
    surveyData: "Survey Results",
    noData: "No survey data yet.",
    download: "Download All Data (JSON)"
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "GenCSura2024!") {
      setIsAuthenticated(true);
      fetchSurveys();
    } else {
      setError(text.incorrect);
    }
  };

  const fetchSurveys = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('surveys')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setSurveys(data || []);
    } catch (e: any) {
      console.error(e);
      // Fallback
      const prev = JSON.parse(localStorage.getItem("anket_responses") || "[]");
      setSurveys(prev.map((ans: any, i: number) => ({ id: i, answers: ans, created_at: ans.timestamp })));
    } finally {
      setLoading(false);
    }
  };

  const downloadAll = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(surveys, null, 2));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `all_survey_results_${new Date().getTime()}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  if (!isAuthenticated) {
    return (
      <div className="w-full min-h-screen pt-32 pb-20 px-6 flex flex-col items-center">
        <h1 className="text-4xl font-black mb-8">{text.title}</h1>
        <form onSubmit={handleLogin} className="glass-card p-8 rounded-2xl w-full max-w-md border border-primary/20">
          <p className="mb-4 text-on-surface-variant font-medium text-center">{text.passPrompt}</p>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => { setPassword(e.target.value); setError(null); }}
            placeholder={text.passPlaceholder}
            className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-4 text-on-surface focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all outline-none mb-4"
          />
          {error && <p className="text-error font-bold mb-4">{error}</p>}
          <button type="submit" className="w-full py-4 rounded-xl bg-primary text-on-primary-container font-black uppercase tracking-widest biolume-glow hover:scale-105 active:scale-95 transition-all">
            {text.login}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen pt-32 pb-20 px-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-black text-on-surface font-headline">{text.surveyData}</h1>
        <button onClick={downloadAll} className="px-6 py-3 rounded-xl bg-surface-container-highest text-on-surface font-bold text-xs uppercase hover:bg-surface-variant border border-outline-variant/20 flex items-center justify-center gap-2">
          <span className="material-symbols-outlined">download</span> {text.download}
        </button>
      </div>

      {loading ? (
         <div className="text-center py-20 animate-pulse"><span className="material-symbols-outlined text-4xl">hourglass_empty</span></div>
      ) : surveys.length === 0 ? (
         <div className="text-center py-10 bg-surface-container rounded-2xl">
            <p className="text-on-surface-variant font-medium">{text.noData}</p>
         </div>
      ) : (
         <div className="space-y-6">
           {surveys.map((survey) => (
             <div key={survey.id} className="bg-surface-container border border-outline-variant/20 p-6 rounded-2xl shadow-sm overflow-x-auto text-sm">
               <p className="text-xs text-primary font-bold mb-2">{new Date(survey.created_at || new Date()).toLocaleString()}</p>
               <pre className="text-on-surface-variant">{JSON.stringify(survey.answers, null, 2)}</pre>
             </div>
           ))}
         </div>
      )}
    </div>
  );
}
