import { useState } from "react";
import { useTheme } from "../App";
import { earnBadge } from "../hooks/useBadges";
import { supabase } from "../lib/supabaseClient";

interface SurveyAnswers {
  [key: string]: string;
}

const surveyQuestionsTR = [
  { id: "q1", group: "📚 Farkındalık ve Bilgi", groupId: "awareness", question: "İklim değişikliği konusunda ne kadar bilgi sahibisiniz?", options: ["Hiç bilgim yok", "Az bilgim var", "Orta düzeyde", "İyi düzeyde", "Çok iyi düzeyde"] },
  { id: "q2", group: "📚 Farkındalık ve Bilgi", groupId: "awareness", question: "İklim değişikliğinin en büyük nedeni sizce nedir?", options: ["Fosil yakıtlar", "Ormansızlaşma", "Endüstriyel üretim", "Tarım ve hayvancılık", "Hepsi birlikte"] },
  { id: "q3", group: "📚 Farkındalık ve Bilgi", groupId: "awareness", question: "Karbon ayak izi kavramını biliyor musunuz?", options: ["Hiç duymadım", "Adını duydum ama bilmiyorum", "Kabaca biliyorum", "İyi biliyorum", "Çok iyi biliyorum"] },
  { id: "q4", group: "📚 Farkındalık ve Bilgi", groupId: "awareness", question: "İklim değişikliğinin Türkiye'ye etkileri hakkında ne kadar bilgilisiniz?", options: ["Hiç bilgim yok", "Az bilgim var", "Orta düzeyde", "İyi düzeyde", "Çok iyi düzeyde"] },
  { id: "q5", group: "🌱 Bireysel Davranışlar", groupId: "behavior", question: "Günlük hayatınızda çevre dostu uygulamalar yapıyor musunuz?", options: ["Hiç yapmıyorum", "Nadiren", "Bazen", "Sıklıkla", "Her zaman"] },
  { id: "q6", group: "🌱 Bireysel Davranışlar", groupId: "behavior", question: "Karbon ayak izinizi azaltmak için hangi adımı atıyorsunuz?", options: ["Toplu taşıma kullanıyorum", "Geri dönüşüm yapıyorum", "Enerji tasarrufu yapıyorum", "Et tüketimimi azaltıyorum", "Hiçbirini yapmıyorum"] },
  { id: "q7", group: "🌱 Bireysel Davranışlar", groupId: "behavior", question: "Tek kullanımlık plastiği ne sıklıkla kullanıyorsunuz?", options: ["Her gün", "Haftada birkaç kez", "Ayda birkaç kez", "Çok nadir", "Hiç kullanmıyorum"] },
  { id: "q8", group: "🌱 Bireysel Davranışlar", groupId: "behavior", question: "Ulaşımda hangi yöntemi tercih edersiniz?", options: ["Özel araç", "Toplu taşıma", "Bisiklet / yaya", "Paylaşımlı araç", "Karışık kullanıyorum"] },
  { id: "q9", group: "🏛️ Politika ve Yönetim", groupId: "policy", question: "Türkiye'nin iklim politikalarını yeterli buluyor musunuz?", options: ["Kesinlikle yeterli", "Kısmen yeterli", "Kararsızım", "Yetersiz", "Kesinlikle yetersiz"] },
  { id: "q10", group: "🏛️ Politika ve Yönetim", groupId: "policy", question: "İklim değişikliği eğitimi okullarda zorunlu olmalı mı?", options: ["Kesinlikle evet", "Evet", "Kararsızım", "Hayır", "Kesinlikle hayır"] },
  { id: "q11", group: "🏛️ Politika ve Yönetim", groupId: "policy", question: "Karbon vergisi uygulaması hakkında ne düşünüyorsunuz?", options: ["Şiddetle destekliyorum", "Destekliyorum", "Kararsızım", "Karşıyım", "Şiddetle karşıyım"] },
  { id: "q12", group: "🏛️ Politika ve Yönetim", groupId: "policy", question: "Yenilenebilir enerjiye geçiş için devlet daha fazla yatırım yapmalı mı?", options: ["Kesinlikle evet", "Evet", "Kararsızım", "Hayır", "Kesinlikle hayır"] },
  { id: "q13", group: "🔮 Gelecek ve Endişe", groupId: "future", question: "İklim değişikliğinin sizin hayatınızı ne ölçüde etkileyeceğini düşünüyorsunuz?", options: ["Hiç etkilemez", "Az etkiler", "Orta ölçüde etkiler", "Çok etkiler", "Yaşamı tehdit eder"] },
  { id: "q14", group: "🔮 Gelecek ve Endişe", groupId: "future", question: "İklim değişikliğiyle mücadelede en etkili çözüm nedir?", options: ["Bireysel davranış değişikliği", "Hükümet politikaları", "Teknolojik yenilikler", "Uluslararası iş birliği", "Hepsi birlikte"] },
  { id: "q15", group: "🔮 Gelecek ve Endişe", groupId: "future", question: "2050'ye kadar iklim değişikliğiyle mücadelede başarılı olunacağını düşünüyor musunuz?", options: ["Kesinlikle evet", "Evet", "Kararsızım", "Hayır", "Kesinlikle hayır"] },
  { id: "q16", group: "🔮 Gelecek ve Endişe", groupId: "future", question: "Türkiye hangi iklim riskiyle en çok karşı karşıya?", options: ["Kuraklık", "Seller ve taşkınlar", "Orman yangınları", "Deniz seviyesi yükselmesi", "Hepsi eşit oranda"] },
  { id: "q17", group: "📝 Proje Hakkında", groupId: "project", question: "Genç İklim Şurası projesini daha önce duydunuz mu?", options: ["Hiç duymadım", "Az bilgim var", "Evet, genel hatlarıyla biliyorum", "İyi biliyorum", "Projeye katıldım"] },
  { id: "q18", group: "📝 Proje Hakkında", groupId: "project", question: "Bu web sitesini nasıl faydalı buldunuz?", options: ["Hiç faydalı değil", "Az faydalı", "Orta düzeyde faydalı", "Faydalı", "Çok faydalı"] },
  { id: "q19", group: "📝 Proje Hakkında", groupId: "project", question: "Projenin hangi bölümünü en faydalı buldunuz?", options: ["Veri Analizi", "Simülatör", "İklim Quizi", "Şehir Karşılaştırma", "Soru & Cevap"] },
  { id: "q20", group: "📝 Proje Hakkında", groupId: "project", question: "Gençlerin iklim politikasına katılımı ne kadar önemli?", options: ["Hiç önemli değil", "Az önemli", "Orta düzeyde", "Önemli", "Çok önemli"] },
];

const surveyQuestionsEN = [
  { id: "q1", group: "📚 Awareness and Knowledge", groupId: "awareness", question: "How knowledgeable are you about climate change?", options: ["Not at all", "Slightly", "Moderately", "Very", "Extremely"] },
  { id: "q2", group: "📚 Awareness and Knowledge", groupId: "awareness", question: "What do you think is the biggest cause of climate change?", options: ["Fossil fuels", "Deforestation", "Industrial production", "Agriculture and livestock", "All combined"] },
  { id: "q3", group: "📚 Awareness and Knowledge", groupId: "awareness", question: "Are you familiar with the concept of carbon footprint?", options: ["Never heard of it", "Heard the name but don't know", "Roughly know", "Know well", "Know very well"] },
  { id: "q4", group: "📚 Awareness and Knowledge", groupId: "awareness", question: "How informed are you about the effects of climate change on your country?", options: ["Not at all", "Slightly", "Moderately", "Very", "Extremely"] },
  { id: "q5", group: "🌱 Individual Behaviors", groupId: "behavior", question: "Do you practice eco-friendly habits in your daily life?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
  { id: "q6", group: "🌱 Individual Behaviors", groupId: "behavior", question: "Which step do you take to reduce your carbon footprint?", options: ["I use public transport", "I recycle", "I save energy", "I reduce meat consumption", "None of the above"] },
  { id: "q7", group: "🌱 Individual Behaviors", groupId: "behavior", question: "How often do you use single-use plastics?", options: ["Every day", "A few times a week", "A few times a month", "Very rarely", "Never"] },
  { id: "q8", group: "🌱 Individual Behaviors", groupId: "behavior", question: "Which transportation method do you prefer?", options: ["Private car", "Public transit", "Bike / walking", "Shared vehicle", "Mixed usage"] },
  { id: "q9", group: "🏛️ Policy & Governance", groupId: "policy", question: "Do you find current climate policies sufficient?", options: ["Completely sufficient", "Partially sufficient", "Undecided", "Insufficient", "Completely insufficient"] },
  { id: "q10", group: "🏛️ Policy & Governance", groupId: "policy", question: "Should climate change education be mandatory in schools?", options: ["Absolutely yes", "Yes", "Undecided", "No", "Absolutely no"] },
  { id: "q11", group: "🏛️ Policy & Governance", groupId: "policy", question: "What do you think about implementing a carbon tax?", options: ["Strongly support", "Support", "Undecided", "Oppose", "Strongly oppose"] },
  { id: "q12", group: "🏛️ Policy & Governance", groupId: "policy", question: "Should the government invest more to transition to renewable energy?", options: ["Absolutely yes", "Yes", "Undecided", "No", "Absolutely no"] },
  { id: "q13", group: "🔮 Future & Concerns", groupId: "future", question: "To what extent do you think climate change will affect your life?", options: ["Will not affect at all", "Slightly affect", "Moderately affect", "Highly affect", "Threatens life"] },
  { id: "q14", group: "🔮 Future & Concerns", groupId: "future", question: "What is the most effective solution in combating climate change?", options: ["Individual behavior change", "Government policies", "Technological innovations", "International cooperation", "All combined"] },
  { id: "q15", group: "🔮 Future & Concerns", groupId: "future", question: "Do you think we will be successful in combating climate change by 2050?", options: ["Absolutely yes", "Yes", "Undecided", "No", "Absolutely no"] },
  { id: "q16", group: "🔮 Future & Concerns", groupId: "future", question: "Which climate risk is your country most exposed to?", options: ["Drought", "Floods", "Forest fires", "Sea level rise", "All equally"] },
  { id: "q17", group: "📝 About the Project", groupId: "project", question: "Have you heard of the Youth Climate Council project before?", options: ["Never heard of it", "Little knowledge", "Yes, know the outline", "Know it well", "Participated in the project"] },
  { id: "q18", group: "📝 About the Project", groupId: "project", question: "How useful did you find this website?", options: ["Not useful at all", "Slightly useful", "Moderately useful", "Useful", "Very useful"] },
  { id: "q19", group: "📝 About the Project", groupId: "project", question: "Which part of the project did you find most useful?", options: ["Data Analysis", "Simulator", "Climate Quiz", "City Comparison", "Q&A"] },
  { id: "q20", group: "📝 About the Project", groupId: "project", question: "How important is youth participation in climate policy?", options: ["Not important at all", "Slightly important", "Moderately", "Important", "Very important"] },
];

const groupContextsTR: Record<string, { title: string, desc: string, img: string }> = {
  "awareness": { title: "Bilgi Güçtür", desc: "İklim krizini anlamak, onunla mücadele etmenin ilk adımıdır. Bu bölümde küresel ısınma dinamiklerine ne kadar aşina olduğunuzu keşfedeceğiz.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBfoxEHDtSy8xML_2_0ovGjaWAzya3DNZu9mOUo5oIy32quxoDdTOyBX0L-QfzP7HS-4fmXIQ-b3gP44ThJkwaK84n6fLpjDsmFN3x3LvGMVyjacFdhkRN6vEA9gl0jjM__V81Hq0VC9tKrurRNFkXlQ6f7-zmFa2pydyuNkzUsnbX5aTi9HrO5ZjjRwi--rjc3SxxK7Vn485uf1MIkyXIhz7ogYJmX7is_l3mkiZ8KZivImXYfKV5hewGgXzp2abiowidCzZePe94", },
  "behavior": { title: "Bireysel Etki", desc: "Her birimizin günlük seçimleri büyük bir kelebek etkisi yaratır. Tüketim, ulaşım ve enerji alışkanlıklarınızın gezegene etkisini değerlendireceğiz.", img: "https://lh3.googleusercontent.com/aida-public/AONM4S8qE37Yt6S207e_YdYnJvR86O0vYI4Bq9J_O1r3S7_6cQk7HkLZUfC2H5m0J2yPZ8u6qP2yJ5H9_T9V0sI9m6sB5Q7KzBfXJ8yO8V5r0lM6Vl_m0q7H2W5B2vF5c_Z_K9H2Y5V5cF5V_Z9Fv8QyF2H5V5V8Q9H2Y5V8_v8v8Q9V5V8Q9j9Kj8y2H5m0J2V5F5V8Q9v8Q9v8Q9v8Q9V5V8", },
  "policy": { title: "Sistemik Değişim", desc: "Bireysel çabaların ötesinde, hükümetlerin, yasaların ve uluslararası anlaşmaların oluşturduğu sistemik yaklaşımlara bakış açınız çok değerli.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDW7TfdN2EYK2ohEnf4op_XSE37_H-fAmDr4bzgswx3SqNpJXFt6ScLcyxquoABxeHnoJm0PoNgnzcG1fQ1Q1zVBv6lVlYQACRj8fLYtvmCvDgHHMJuxweAPeelJ2GTxN0xz-apAJCz3yxzFnFKXspGu0Rkq_UMHJV9ARq9N2XWwnVoO3CJr6GTENGXP1SBR8VOuLlhtYvXGBhSxqmNNBrjYNQkqmM0t3UJmWtHaXOFkHwIO_gHJhs0HsWJ52w0NUbQCfnN0tfy1EI", },
  "future": { title: "Geleceğin Sesi", desc: "Gezegenin geleceğine nasıl bakıyorsunuz? Umutlu musunuz yoksa endişeli mi? Gençliğin beklentisi yol haritamızı çizecek.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuClaaz0CvIAX5DMjJcXJkKkbiYKHpV3nb2ADzD9JacZ1knXn6Iqkhe8Cr_8LiSWgV8Wt8WQbIapyO6-unmNMnur_o3g0KRtvyflNYfTPmy63j2kAuaVekYdqVmLw38CORNjz80plEbdlF3gpie9Lticp4pPQ7R6R5Ewy0Zo-GDj7bqmZKe1YLSuUOH4pEwhn66ho9E2u4F_VWovHB2efihRyaZS_O63YWPN-Ao2J1GqIR5bwz-OpOb3fNzGgbnmIPewkzkT82NxAWY", },
  "project": { title: "Genç Şura İklim", desc: "Bu platformun etki yaratabilmesi için geri bildiriminiz hayati önem taşıyor. Web sitemizi ve vizyonumuzu değerlendirin.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAD0OctYXhcov69bMlK2_wL8YvadzwLBMGEs76M0ZI5AZlLGt2wAOESW8CSoquE0ioxynS12TWy06VxPqADHVXt2kA8IC94g6ZKv7nIuqIk7rA6HSa9SveeejwTy1JLbS2g59EywUXKlpx6c7bqCuUBhDBLU2m1XpTT6RWxN_Qa9ljdbnw1zWWM1VIv5QVdvC20FPM0Vu5FEgPdR-WKmVOxGLUtVIKsZbBqt4dutwVOiJbUPRMv_zU9mQwPY9VXttoHd2ww_5_IsQE", }
};

const groupContextsEN: Record<string, { title: string, desc: string, img: string }> = {
  "awareness": { title: "Knowledge is Power", desc: "Understanding the climate crisis is the first step to fighting it. Here we look at your familiarity with global warming dynamics.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBfoxEHDtSy8xML_2_0ovGjaWAzya3DNZu9mOUo5oIy32quxoDdTOyBX0L-QfzP7HS-4fmXIQ-b3gP44ThJkwaK84n6fLpjDsmFN3x3LvGMVyjacFdhkRN6vEA9gl0jjM__V81Hq0VC9tKrurRNFkXlQ6f7-zmFa2pydyuNkzUsnbX5aTi9HrO5ZjjRwi--rjc3SxxK7Vn485uf1MIkyXIhz7ogYJmX7is_l3mkiZ8KZivImXYfKV5hewGgXzp2abiowidCzZePe94", },
  "behavior": { title: "Individual Impact", desc: "Our daily choices create a butterfly effect. We'll evaluate how your habits impact the planet.", img: "https://lh3.googleusercontent.com/aida-public/AONM4S8qE37Yt6S207e_YdYnJvR86O0vYI4Bq9J_O1r3S7_6cQk7HkLZUfC2H5m0J2yPZ8u6qP2yJ5H9_T9V0sI9m6sB5Q7KzBfXJ8yO8V5r0lM6Vl_m0q7H2W5B2vF5c_Z_K9H2Y5V5cF5V_Z9Fv8QyF2H5V5V8Q9H2Y5V8_v8v8Q9V5V8Q9j9Kj8y2H5m0J2V5F5V8Q9v8Q9v8Q9v8Q9V5V8", },
  "policy": { title: "Systemic Change", desc: "Beyond individual efforts, your stance on government laws and systemic approaches is highly valuable.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDW7TfdN2EYK2ohEnf4op_XSE37_H-fAmDr4bzgswx3SqNpJXFt6ScLcyxquoABxeHnoJm0PoNgnzcG1fQ1Q1zVBv6lVlYQACRj8fLYtvmCvDgHHMJuxweAPeelJ2GTxN0xz-apAJCz3yxzFnFKXspGu0Rkq_UMHJV9ARq9N2XWwnVoO3CJr6GTENGXP1SBR8VOuLlhtYvXGBhSxqmNNBrjYNQkqmM0t3UJmWtHaXOFkHwIO_gHJhs0HsWJ52w0NUbQCfnN0tfy1EI", },
  "future": { title: "Voice of the Future", desc: "How do you view the future of the planet? Hopeful or anxious? The youth's expectations will shape our roadmap.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuClaaz0CvIAX5DMjJcXJkKkbiYKHpV3nb2ADzD9JacZ1knXn6Iqkhe8Cr_8LiSWgV8Wt8WQbIapyO6-unmNMnur_o3g0KRtvyflNYfTPmy63j2kAuaVekYdqVmLw38CORNjz80plEbdlF3gpie9Lticp4pPQ7R6R5Ewy0Zo-GDj7bqmZKe1YLSuUOH4pEwhn66ho9E2u4F_VWovHB2efihRyaZS_O63YWPN-Ao2J1GqIR5bwz-OpOb3fNzGgbnmIPewkzkT82NxAWY", },
  "project": { title: "Youth Climate Council", desc: "Your feedback is vital. Please rate our website and vision so we can make an impact.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAD0OctYXhcov69bMlK2_wL8YvadzwLBMGEs76M0ZI5AZlLGt2wAOESW8CSoquE0ioxynS12TWy06VxPqADHVXt2kA8IC94g6ZKv7nIuqIk7rA6HSa9SveeejwTy1JLbS2g59EywUXKlpx6c7bqCuUBhDBLU2m1XpTT6RWxN_Qa9ljdbnw1zWWM1VIv5QVdvC20FPM0Vu5FEgPdR-WKmVOxGLUtVIKsZbBqt4dutwVOiJbUPRMv_zU9mQwPY9VXttoHd2ww_5_IsQE", }
};

const fallbackImg = "https://lh3.googleusercontent.com/aida-public/AB6AXuBfoxEHDtSy8xML_2_0ovGjaWAzya3DNZu9mOUo5oIy32quxoDdTOyBX0L-QfzP7HS-4fmXIQ-b3gP44ThJkwaK84n6fLpjDsmFN3x3LvGMVyjacFdhkRN6vEA9gl0jjM__V81Hq0VC9tKrurRNFkXlQ6f7-zmFa2pydyuNkzUsnbX5aTi9HrO5ZjjRwi--rjc3SxxK7Vn485uf1MIkyXIhz7ogYJmX7is_l3mkiZ8KZivImXYfKV5hewGgXzp2abiowidCzZePe94";

export default function Anket() {
  const { lang } = useTheme();
  const [answers, setAnswers] = useState<SurveyAnswers>({});
  const [currentQ, setCurrentQ] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const surveyQuestions = lang === 'tr' ? surveyQuestionsTR : surveyQuestionsEN;
  const groupContexts = lang === 'tr' ? groupContextsTR : groupContextsEN;

  const text = lang === 'tr' ? {
    alertAll: "Lütfen tüm soruları cevaplayın!",
    doneTag: "Anketi Tamamladınız!",
    doneDesc: "Katılımınız için teşekkür ederiz. Yanıtlarınız sistemimize başarıyla kaydedildi ve gelecekteki projelerimize yön verecek.",
    savedSecure: "Cihazınıza güvenle kaydedildi",
    yourAnswers: "Kaydedilen Yanıtlarınız",
    download: "JSON Olarak İndir",
    restart: "Tekrar Doldur",
    part: "Bölüm",
    sciInt: "Bilimsel Entegrasyon",
    sciDesc: "Yanıtlarınız gizli tutulmakta olup sadece Türkiye genel iklim bilincini ölçmek amacıyla kullanılmaktadır.",
    tag: "İklim Şurası 2024",
    eval: "Etki Değerlendirmesi",
    prev: "Önceki",
    next: "Sonraki",
    send: "Gönder ve Kaydet",
  } : {
    alertAll: "Please answer all questions!",
    doneTag: "You Completed the Survey!",
    doneDesc: "Thank you for participating. Your responses have been successfully saved and will guide our future projects.",
    savedSecure: "Safely saved to your device",
    yourAnswers: "Your Saved Responses",
    download: "Download as JSON",
    restart: "Fill Again",
    part: "Part",
    sciInt: "Scientific Integration",
    sciDesc: "Your responses are kept confidential and are used only to measure general climate awareness.",
    tag: "Climate Council 2024",
    eval: "Impact Assessment",
    prev: "Previous",
    next: "Next",
    send: "Submit and Save",
  };

  const q = surveyQuestions[currentQ];
  const progressPercent = Math.round((currentQ / surveyQuestions.length) * 100);

  const handleSelect = (option: string) => {
    setAnswers((prev) => ({ ...prev, [q.id]: option }));
    
    if (currentQ < surveyQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQ(q => q + 1);
      }, 300);
    }
  };

  const nextQ = () => {
    if (currentQ < surveyQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
    }
  };

  const prevQ = () => {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
    }
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < surveyQuestions.length) {
      alert(text.alertAll);
      return;
    }

    const response = {
      timestamp: new Date().toISOString(),
      answers: surveyQuestions.map((sq) => ({
        id: sq.id,
        question: sq.question,
        answer: answers[sq.id as keyof typeof answers] || "No Answer",
      })),
    };
    
    // Fallback local storage
    const prev = JSON.parse(localStorage.getItem("anket_responses") || "[]") as object[];
    localStorage.setItem("anket_responses", JSON.stringify([...prev, response]));

    // Secure database saving
    try {
      await supabase.from("surveys").insert([{ answers: response }]);
    } catch (err) {
      console.warn("Could not save to Supabase", err);
    }

    setSubmitted(true);
    earnBadge('survey_done');
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentQ(0);
    setSubmitted(false);
  };

  const handleDownloadResults = () => {
    const responseData = {
      timestamp: new Date().toISOString(),
      answers: surveyQuestions.map((sq) => ({
        id: sq.id,
        group: sq.group,
        question: sq.question,
        answer: answers[sq.id] || "No Answer",
      })),
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(responseData, null, 2));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `anket_yanitlari_${new Date().getTime()}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  if (submitted) {
    return (
      <div className="w-full">
        <main className="min-h-screen pt-32 pb-20 px-6 max-w-6xl mx-auto flex flex-col items-center justify-center animate-scale-in">
          <div className="glass-card w-full p-12 md:p-20 rounded-3xl border border-primary/30 shadow-[0_0_50px_rgba(107,255,143,0.1)] relative overflow-hidden text-center max-w-4xl">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10"></div>
            
            <span className="material-symbols-outlined text-8xl text-primary mb-6 drop-shadow-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
              task_alt
            </span>
            
            <h1 className="text-5xl md:text-7xl font-black font-headline tracking-tighter text-on-surface mb-4">
              {text.doneTag}
            </h1>
            <p className="text-xl text-on-surface-variant mb-6 font-body leading-relaxed">
              {text.doneDesc}
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container-highest rounded-full text-sm font-bold text-on-surface-variant mb-12 border border-outline-variant/10">
              <span className="material-symbols-outlined text-primary text-sm">cloud_done</span>
              {text.savedSecure}
            </div>

            <div className="text-left bg-surface-container/50 border border-outline-variant/20 rounded-2xl p-6 md:p-8 max-h-[400px] overflow-y-auto mb-10 custom-scrollbar">
              <h3 className="font-bold text-xl mb-6 font-headline flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">analytics</span>
                {text.yourAnswers}
              </h3>
              <div className="space-y-6">
                {surveyQuestions.map((sq, idx) => (
                  <div key={sq.id} className="pb-4 border-b border-outline-variant/10 last:border-0 last:pb-0">
                    <p className="text-xs text-primary-dim uppercase tracking-widest font-bold mb-1">{sq.group.replace(/[^a-zA-ZğüşıöçĞÜŞİÖÇ\s]/g, '').trim()}</p>
                    <p className="text-base text-on-surface mb-2 font-medium">{idx + 1}. {sq.question}</p>
                    <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 border border-primary/20 rounded-lg inline-flex">
                      <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                      <span className="text-sm font-bold text-primary">{answers[sq.id]}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleDownloadResults}
                className="bg-surface-container-highest text-on-surface hover:bg-surface-container-high font-bold py-4 px-8 rounded-xl transition-all cursor-pointer border border-outline-variant flex items-center justify-center gap-3 biolume-glow hover:text-primary"
              >
                <span className="material-symbols-outlined">download</span>
                {text.download}
              </button>
              <button
                onClick={handleReset}
                className="bg-gradient-to-b from-primary to-primary-container text-on-primary-container font-black py-4 px-10 rounded-xl transition-all cursor-pointer shadow-[0_0_20px_rgba(107,255,143,0.3)] hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
              >
                <span className="material-symbols-outlined">refresh</span>
                {text.restart}
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const ctx = groupContexts[q.groupId] || { title: q.group, desc: "", img: fallbackImg };
  const imgUrl = ctx.img.startsWith('http') ? ctx.img : fallbackImg;

  return (
    <div className="w-full">
      <main className="min-h-screen pt-24 pb-12 px-6 lg:px-12 flex flex-col items-center justify-center animate-fade-in">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          <div className="lg:col-span-5 flex flex-col gap-6 order-2 lg:order-1 animate-fade-in-up">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] glass-card border border-outline-variant/20 shadow-2xl group">
              <img 
                src={imgUrl} 
                className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay group-hover:scale-105 group-hover:opacity-60 transition-all duration-[2s] ease-out" 
                alt="Context Background" 
                onError={(e) => { (e.target as HTMLImageElement).src = fallbackImg }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-surface/80 to-transparent"></div>
              <div className="absolute bottom-0 p-8 lg:p-10 w-full">
                <span className="inline-block px-3 py-1 bg-primary/20 border border-primary/30 text-primary font-bold text-xs uppercase tracking-[0.15em] rounded-full mb-4 shadow-[0_0_15px_rgba(107,255,143,0.2)]">
                  {q.group.split(' ')[0]} {text.part} {Object.keys(groupContexts).indexOf(q.groupId) + 1}
                </span>
                <h2 className="text-3xl lg:text-4xl font-black text-on-surface leading-tight tracking-tight mb-4 font-headline">
                  {ctx.title}
                </h2>
                <p className="text-on-surface-variant font-medium leading-relaxed font-body text-sm md:text-base">
                  {ctx.desc}
                </p>
              </div>
            </div>
            
            <div className="p-6 bg-surface-container-highest rounded-2xl border border-outline-variant/10 text-center lg:text-left flex items-start gap-4">
              <span className="material-symbols-outlined text-primary-dim p-2 bg-primary/10 rounded-lg">verified_user</span>
              <div>
                <p className="font-bold text-on-surface mb-1 text-sm">{text.sciInt}</p>
                <p className="text-xs text-on-surface-variant leading-relaxed">{text.sciDesc}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-8 order-1 lg:order-2 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            
            <div className="flex flex-col gap-5">
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-primary-dim text-xs font-bold tracking-widest uppercase mb-1 block">{text.tag}</span>
                  <h1 className="text-4xl md:text-5xl font-black text-on-surface tracking-tighter font-headline">
                    {text.eval}
                  </h1>
                </div>
                <div className="text-right flex items-baseline gap-1">
                  <span className="text-3xl font-black text-primary font-headline">{String(currentQ + 1).padStart(2, '0')}</span>
                  <span className="text-xl text-on-surface-variant font-medium">/{surveyQuestions.length}</span>
                </div>
              </div>
              
              <div className="h-2 w-full bg-surface-container-highest border border-outline-variant/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full shadow-[0_0_15px_rgba(107,255,143,0.4)] transition-all duration-500 ease-out" 
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>

            <div className="glass-card p-8 rounded-2xl border border-primary/20 shadow-[0_0_30px_rgba(107,255,143,0.05)] biolume-glow">
              <h3 className="text-2xl md:text-3xl font-bold text-on-surface leading-snug font-headline">
                {q.question}
              </h3>
            </div>

            <div className="flex flex-col gap-3">
              {q.options.map((option, idx) => {
                const isSelected = answers[q.id] === option;
                return (
                  <button
                    key={option}
                    onClick={() => handleSelect(option)}
                    className={`group relative p-5 rounded-xl border text-left transition-all duration-300 cursor-pointer overflow-hidden ${
                      isSelected 
                        ? "bg-primary-container/10 border-primary border-2 shadow-[0_0_20px_rgba(107,255,143,0.15)] scale-[1.01]" 
                        : "bg-surface-container border-outline-variant/20 hover:bg-surface-container-high hover:border-primary/40 active:scale-[0.99]"
                    }`}
                  >
                    <div className="flex items-center justify-between relative z-10 w-full">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                          isSelected ? "bg-primary text-on-primary" : "bg-surface-container-highest text-on-surface-variant group-hover:bg-primary/20 group-hover:text-primary"
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </div>
                        <span className={`text-base md:text-lg font-medium pr-8 ${isSelected ? "text-primary font-bold" : "text-on-surface"}`}>
                          {option}
                        </span>
                      </div>
                      
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                        isSelected ? "border-primary bg-primary" : "border-outline-variant group-hover:border-primary/50"
                      }`}>
                        {isSelected && <span className="material-symbols-outlined text-[16px] text-on-primary font-black">check</span>}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="flex items-center justify-between pt-4 mt-2 border-t border-outline-variant/10">
              <button 
                onClick={prevQ}
                disabled={currentQ === 0}
                className={`flex items-center gap-2 font-bold tracking-tight transition-all pb-1 border-b-2 ${
                  currentQ === 0 
                  ? "text-on-surface-variant/30 border-transparent cursor-not-allowed" 
                  : "text-on-surface-variant hover:text-primary border-transparent hover:border-primary cursor-pointer"
                }`}
              >
                <span className="material-symbols-outlined">arrow_back</span> {text.prev}
              </button>
              
              {currentQ === surveyQuestions.length - 1 ? (
                <button 
                  onClick={handleSubmit}
                  disabled={!answers[q.id]}
                  className={`px-8 py-4 font-black uppercase tracking-widest rounded-xl transition-all flex items-center gap-3 ${
                    answers[q.id] 
                    ? "bg-gradient-to-r from-primary to-primary-container text-on-primary biolume-glow cursor-pointer hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(107,255,143,0.4)]" 
                    : "bg-surface-variant text-on-surface-variant/50 cursor-not-allowed opacity-50"
                  }`}
                >
                  {text.send} <span className="material-symbols-outlined animate-bounce">rocket_launch</span>
                </button>
              ) : (
                <button 
                  onClick={nextQ}
                  disabled={!answers[q.id]}
                  className={`px-8 py-3 bg-surface-container-highest text-on-surface font-bold uppercase tracking-widest rounded-xl transition-all flex items-center gap-2 border border-outline-variant/20 ${
                    answers[q.id] 
                    ? "hover:bg-primary/20 hover:text-primary hover:border-primary/50 cursor-pointer" 
                    : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  {text.next} <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
