// useBadges.ts — Global badge system for GençŞura İklim
// Badges are earned by interacting with the platform and stored in localStorage.

export interface Badge {
  id: string;
  nameTR: string;
  nameEN: string;
  descTR: string;
  descEN: string;
  icon: string;        // material-symbols icon name
  color: string;       // tailwind color class
  earned: boolean;
  earnedAt?: string;
}

const BADGE_DEFINITIONS: Omit<Badge, 'earned' | 'earnedAt'>[] = [
  { id: 'first_visit',    nameTR: 'İklim Kaşifi',      nameEN: 'Climate Explorer',   descTR: 'Platforma ilk kez katıldın!',              descEN: 'You joined the platform for the first time!',       icon: 'explore',            color: 'emerald' },
  { id: 'quiz_master',    nameTR: 'Quiz Ustası',        nameEN: 'Quiz Master',         descTR: 'İklim quizini tamamladın.',                descEN: 'You completed the climate quiz.',                   icon: 'psychology',         color: 'blue' },
  { id: 'quiz_perfect',   nameTR: 'Mükemmeliyetçi',    nameEN: 'Perfectionist',       descTR: 'Quizde 100 puan aldın!',                   descEN: 'You scored 100 in the quiz!',                       icon: 'star',               color: 'yellow' },
  { id: 'simulator_run',  nameTR: 'Senaryo Koşucusu',  nameEN: 'Scenario Runner',     descTR: 'İlk simülasyonunu çalıştırdın.',           descEN: 'You ran your first simulation.',                    icon: 'science',            color: 'purple' },
  { id: 'survey_done',    nameTR: 'Kamuoyu Sesi',      nameEN: 'Public Voice',        descTR: 'Anketi eksiksiz doldurdun.',               descEN: 'You completed the survey.',                         icon: 'how_to_vote',        color: 'teal' },
  { id: 'suggestion_sent',nameTR: 'Öneri Üreticisi',   nameEN: 'Idea Generator',      descTR: 'Bir yarışma önerisi paylaştın.',         descEN: 'You shared a competition suggestion.',               icon: 'lightbulb',          color: 'orange' },
  { id: 'daily_task',     nameTR: 'Günlük Kahraman',   nameEN: 'Daily Hero',          descTR: 'İlk günlük iklim görevini tamamladın.',    descEN: 'You completed your first daily climate task.',      icon: 'today',              color: 'green' },
  { id: 'map_explorer',   nameTR: 'Haritacı',          nameEN: 'Cartographer',        descTR: 'Tüm bölgeleri haritada inceledin.',        descEN: 'You explored all regions on the map.',              icon: 'map',                color: 'cyan' },
  { id: 'carbon_free',    nameTR: 'Karbon Dedektifi',  nameEN: 'Carbon Detective',    descTR: 'Karbon ayak izini hesapladın.',            descEN: 'You calculated your carbon footprint.',             icon: 'co2',                color: 'lime' },
  { id: 'knowledge_seeker',nameTR: 'Bilgi Avcısı',    nameEN: 'Knowledge Seeker',    descTR: 'Sözlükte kelime aradın.',                 descEN: 'You searched for words in the glossary.',           icon: 'menu_book',          color: 'amber' },
  { id: 'news_reader',    nameTR: 'Haber Takipçisi',   nameEN: 'News Follower',       descTR: 'Haberler sayfasını ziyaret ettin.',        descEN: 'You visited the news page.',                        icon: 'newspaper',          color: 'rose' },
  { id: 'glossary_master',nameTR: 'Kelime Dağarcığı',  nameEN: 'Glossary Master',     descTR: 'Sözlükte merak ettiğin terimleri aradın.', descEN: 'You searched terms in the glossary.',               icon: 'spellcheck',         color: 'emerald' },
  { id: 'info_junkie',    nameTR: 'Veri Kurdu',        nameEN: 'Data Junkie',         descTR: 'İnfografikler ve veri analizini inceledin.',descEN: 'You examined infographics and data analysis.',       icon: 'monitoring',         color: 'blue' },
  { id: 'eco_warrior',    nameTR: 'Eko Savaşçı',       nameEN: 'Eco Warrior',         descTR: 'Eylem rehberindeki günlük görevleri inceledin.', descEN: 'You explored daily tasks in the action guide.',   icon: 'eco',                color: 'green' },
  { id: 'time_traveler',  nameTR: 'Zaman Yolcusu',     nameEN: 'Time Traveler',       descTR: 'Gelecek projeksiyonlarına zaman çizelgesinde göz attın.', descEN: 'You viewed future projections on timeline.', icon: 'hourglass_empty',    color: 'purple' },
  { id: 'comparison_expert',nameTR:'Kıyaslama Uzmanı', nameEN: 'Comparison Expert',   descTR: 'Ülkelerin karbon emisyonlarını karşılaştırdın.', descEN: 'You compared carbon emissions of countries.', icon: 'balance',            color: 'teal' },
  { id: 'concept_mapper', nameTR: 'Kavram Kaşifi',     nameEN: 'Concept Mapper',      descTR: 'Kavram ağı üzerinde iklim terimlerini ilişkilendirdin.', descEN: 'You related climate terms on the concept map.', icon: 'hub',            color: 'orange' },
  { id: 'curious_mind',   nameTR: 'Meraklı Zihin',     nameEN: 'Curious Mind',        descTR: 'İklim konusunda uzmanlara soru sordun.',   descEN: 'You asked experts a question about climate.',       icon: 'help_center',        color: 'rose' },
  { id: 'all_modules',    nameTR: 'Tam İklim Savaşçısı', nameEN: 'Full Climate Warrior', descTR: 'Platformdaki tüm modülleri ziyaret ettin.', descEN: 'You visited all modules on the platform.',      icon: 'emoji_events',       color: 'gold' },
];

const STORAGE_KEY = 'gencsura_badges';

function loadBadges(): Record<string, { earned: boolean; earnedAt?: string }> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveBadges(data: Record<string, { earned: boolean; earnedAt?: string }>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getAllBadges(): Badge[] {
  const stored = loadBadges();
  return BADGE_DEFINITIONS.map(def => ({
    ...def,
    earned: !!stored[def.id]?.earned,
    earnedAt: stored[def.id]?.earnedAt,
  }));
}

export function earnBadge(id: string): boolean {
  const stored = loadBadges();
  if (stored[id]?.earned) return false; // already earned
  stored[id] = { earned: true, earnedAt: new Date().toISOString() };
  saveBadges(stored);
  // Dispatch custom event so other components can react
  window.dispatchEvent(new CustomEvent('badge_earned', { detail: { id } }));
  return true;
}

export function getEarnedCount(): number {
  const stored = loadBadges();
  return Object.values(stored).filter(v => v.earned).length;
}

export function isBadgeEarned(id: string): boolean {
  const stored = loadBadges();
  return !!stored[id]?.earned;
}

// Track visited pages for the "all_modules" badge
const VISITED_KEY = 'gencsura_visited_pages';
export function trackPageVisit(path: string) {
  const allPaths = ['/hakkinda','/simulasyon','/veri-analizi','/quiz','/simulator','/anket','/karbon','/harita','/zaman-cizelgesi','/karsilastirma','/eylem-rehberi','/sozluk','/kavram-agi','/infografikler','/soru-sor','/oneri','/haberler'];
  try {
    const visited: string[] = JSON.parse(localStorage.getItem(VISITED_KEY) || '[]');
    if (!visited.includes(path)) {
      visited.push(path);
      localStorage.setItem(VISITED_KEY, JSON.stringify(visited));
    }
    // Check first visit badge
    earnBadge('first_visit');
    
    // Check path-specific badges for new ones
    if (path === '/zaman-cizelgesi') earnBadge('time_traveler');
    if (path === '/karsilastirma') earnBadge('comparison_expert');
    if (path === '/kavram-agi') earnBadge('concept_mapper');
    if (path === '/soru-sor') earnBadge('curious_mind');

    // Check all modules badge
    if (allPaths.every(p => visited.includes(p))) earnBadge('all_modules');
  } catch { /* */ }
}
