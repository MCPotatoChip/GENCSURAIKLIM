import { useState } from "react";
import { useTheme } from "../App";

export default function SimulasyonSureci() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { lang } = useTheme();

  const text = lang === 'tr' ? {
    title1: "Simülasyon",
    title2: "Süreci",
    desc: "Genç İklim Şurası simülasyonunun hazırlık, uygulama ve yaygınlaştırma aşamalarının tüm detayları. Gerçek dünya parametreleri ile şekillenen meclis aritmetiği ve komisyon çalışmaları.",
    sec1Title: "1. Hazırlık ve Uygulama",
    liveStatus: "Canlı Durum",
    simActive: "Simülasyon Aktif",
    simDesc: "İklim krizi ve çevre politikaları üzerine TBMM iç tüzüğünden esinlenilen \"Genç İklim Şurası İç Tüzüğü\" devrede.",
    comms: "Komisyonlar",
    mps: "Milletvekili",
    duration: "Süre",
    durationVal: "2 GÜN",
    activeComms: "Aktif Komisyonlar",
    comm1Name: "Su Kaynakları Komisyonu",
    comm1Desc: "Tarımda Su Yönetimi ve Kuraklıkla Mücadele Kanun Teklifi",
    comm2Name: "Enerji Yönetimi Komisyonu",
    comm2Desc: "Karbon Kotası ve Bireysel Sınırlandırma Kanun Teklifi",
    comm3Name: "İklim Afetleri Komisyonu",
    comm3Desc: "Ekolojik Göç ve Mağduriyetlerin Önlenmesi Kanun Teklifi",
    procTitle: "Meclis Usulü ve Akış",
    procSubtitle: "6 oturum ve 2 genel kurul simulasyonu",
    procText: "Çalışma alanları olarak okuldaki konferans salonları ve kütüphaneler kullanılmıştır. Tüm görüşmeler resmi iç tüzüğe sadık kalınarak, \"soy isimleri\" veya temsil edilen \"iller\" kullanılarak yapılmıştır. Genel kurullar Başkanlık Divanı (Meclis Başkanı, Başkanvekili ve Kâtip) tarafından yönetilmiştir.",
    step1Title: "Okunma",
    step1Desc: "Kanun teklifi kâtip tarafından yüksek sesle okunur ve komisyona duyurulur.",
    step2Title: "Müzakere",
    step2Desc: "Milletvekili kürsüde 5 dakikalık açıklama yapar ve soruları değerlendirir.",
    step3Title: "Oylama",
    step3Desc: "%50+1 oy alan teklif yasalaşır ve Genç Şura Resmi Gazetesine ilan edilir.",
    pc1Title: "Genel Kurul",
    pc1Desc: "Simülasyon açılışı ve vekil yeminleri",
    pc2Title: "Komisyon",
    pc2Desc: "Yasa tasarısı ateşli tartışmaları",
    rgBadge: "Kapanış Çıktısı",
    rgTitle: "Genç Şura Resmi Gazetesi",
    rgDesc: "Simülasyon sürecinin somut çıktısı olan resmi gazete; komisyonlarda 7 bölgenin temsilcileri tarafından oylanan bölgesel yasa tasarılarını içerir. Gençlerin iklim krizine karşı ürettikleri hukuki ve uygulanabilir çözümleri kanıtlayan nihai nitel veri aracıdır.",
    dlPng: "PNG İndir",
    dlPdf: "PDF Olarak Kaydet",
    sec2Title: "2. Toplumsal Etki (Sosyal Eylem)",
    sec2Desc: "Yasa yapıcı öğrencilerin edindikleri bilinci okul geneline taşıması hedeflenmiştir. Üç ana komisyon kendi alanlarına uygun fiziksel sosyal eylem planları gerçekleştirmiştir.",
    enAct1Title: "İmza Duvarı & Taahhütname",
    enAct1Desc: "Öğrencilerin hazırladığı 5 temel maddelik kişisel koruma bildirgesi okul panosuna asılarak diğer öğrencilerden fiziksel imzalar toplandı.",
    enAct2Title: "Okul Karbon Analizi",
    enAct2Desc: "Okuldaki elektrik, su ve kağıt giderleri hesaplanarak önlemler geliştirildi.",
    enAct3Title: "Tasarruflu Sürüş Broşürü",
    enAct3Desc: "Aileler için hazırlanan araç karbon sınırlandırması bilgilendirme broşürü evebeynlere dağıtıldı.",
    enAct4Title: "Karbon Borcumuzu Ödüyoruz",
    enAct4Desc: "Büyükşehir Belediyesi desteğiyle, mecliste harcanan emisyonu sıfırlamak için okulumuza 571 adet gül fidesi dikildi.",
    watAct1Title: "Damla Damla Gelecek Hasadı",
    watAct1Desc: "Okulun yağmur oluklarının altına variller kuruldu. Toplanan bu yağmur suları \"Karbon Borcu\" fidanlarının can suyu olarak kullanılarak ekolojik döngü sağlandı.",
    watAct2Title: "Görsel Farkındalık",
    watAct2Desc: "Tuvalet ve lavabolardaki musluklara gereksiz tüketimi önlemek için renkli \"SUYU KAPAT\" ikaz çıkartmaları yerleştirildi.",
    disAct1Title: "Hedef Sıfır Atık Belgesel",
    disAct1Desc: "Okul konferans salonunda öğrencilerin katılımıyla \"iklim göçmenleri ve ekolojik mağduriyetler\" temalı kısa belgesel gösterimi düzenlenmiştir.",
    sec3Title: "3. Makro Ölçekli Karşılıklar",
    sec3Desc: "Simülasyonda tartışılan yerel kanun tekliflerinin gerçek güncel dünyadaki acı afet ve kriz yansımaları.",
    macro1Title: "Enerji Krizi",
    macro1I1: "Avrupa (2022-2024): Fosil yakıt bağımlılığı ve arz sorunu fiyatları uçururken yenilenebilir yatırımları hızlandırdı.",
    macro1I2: "Almanya: Emisyon hedefleri için karbon salımını keserek rüzgar ve güneşe yöneldi.",
    macro1I3: "Türkiye: İç ve Güneydoğu Anadolu'da santral yatırımları agresif olarak artırıldı.",
    macro2Title: "Su Kıtlığı",
    macro2I1: "Konya Ovası: Yeraltı su seviyesi çöküşü büyük tarım hasarına ve tehlikeli obruklara yol açtı.",
    macro2I2: "Cape Town: Şehir \"Day Zero\" (suyun bitiş noktası) senaryosu ile yüzleşti.",
    macro2I3: "Aral Gölü: Yanlış sulama ve iklim değişimi sonucunda göl ekosistemi tümüyle felce uğradı.",
    macro3Title: "Afetler",
    macro3I1: "Karadeniz: Isınan hava kütlesi Kastamonu ve Bartın civarında ani ve yok edici sel felaketlerine yol açtı.",
    macro3I2: "Avustralya: Kuru zemin ve rekor sıcaklıklar doğa tarihinin en yıkıcı kitlesel mega yangınlarını körükledi.",
    macro3I3: "Pakistan: Muson anomalisi ülkenin devasa bir bölümünü sular altında bırakarak milyonları göçe zorladı.",
  } : {
    title1: "Simulation",
    title2: "Process",
    desc: "All details of the preparation, implementation, and dissemination phases of the Youth Climate Council simulation. Parliamentary arithmetic and commission works shaped by real-world parameters.",
    sec1Title: "1. Preparation and Implementation",
    liveStatus: "Live Status",
    simActive: "Simulation Active",
    simDesc: "The \"Youth Climate Council Internal Regulations\", inspired by the TBMM bylaws on the climate crisis and environmental policies, are in effect.",
    comms: "Commissions",
    mps: "Deputies",
    duration: "Duration",
    durationVal: "2 DAYS",
    activeComms: "Active Commissions",
    comm1Name: "Water Resources Commission",
    comm1Desc: "Water Management in Agriculture and Drought Combat Bill",
    comm2Name: "Energy Management Commission",
    comm2Desc: "Carbon Quota and Individual Limitation Bill",
    comm3Name: "Climate Disasters Commission",
    comm3Desc: "Ecological Migration and Prevention of Grievances Bill",
    procTitle: "Parliamentary Procedure and Flow",
    procSubtitle: "6 sessions and 2 general assembly simulations",
    procText: "School conference halls and libraries were used as workspaces. All negotiations were held adhering to the official bylaws, using \"surnames\" or the \"provinces\" represented. General assemblies were managed by the Presidential Council (Speaker, Deputy Speaker, and Clerk).",
    step1Title: "Reading",
    step1Desc: "The bill is read aloud by the clerk and announced to the commission.",
    step2Title: "Negotiation",
    step2Desc: "The deputy gives a 5-minute explanation at the pulpit and evaluates the questions.",
    step3Title: "Voting",
    step3Desc: "A proposal receiving 50%+1 votes becomes law and is announced in the Youth Council Official Gazette.",
    pc1Title: "General Assembly",
    pc1Desc: "Simulation opening and deputy oaths",
    pc2Title: "Commission",
    pc2Desc: "Fierce debates on the legislative bill",
    rgBadge: "Closing Output",
    rgTitle: "Youth Council Official Gazette",
    rgDesc: "The official gazette, the concrete output of the simulation process; includes the regional bills voted by the representatives of the 7 regions in the commissions. It is the ultimate qualitative data tool proving the legal and applicable solutions young people produced against the climate crisis.",
    dlPng: "Download PNG",
    dlPdf: "Save as PDF",
    sec2Title: "2. Social Impact (Social Action)",
    sec2Desc: "It was aimed that the law-maker students carry the consciousness they gained to the whole school. The three main commissions carried out physical social action plans suitable for their fields.",
    enAct1Title: "Signature Wall & Commitment",
    enAct1Desc: "A 5-item personal protection declaration prepared by the students was hung on the school board and physical signatures were collected from other students.",
    enAct2Title: "School Carbon Analysis",
    enAct2Desc: "Precautions were developed by calculating the school's electricity, water, and paper expenses.",
    enAct3Title: "Economy Driving Brochure",
    enAct3Desc: "An informative brochure on vehicle carbon limitation prepared for families was distributed to parents.",
    enAct4Title: "Paying Our Carbon Debt",
    enAct4Desc: "With the support of the Metropolitan Municipality, 571 rose seedlings were planted in our school to reset the emissions spent in the parliament.",
    watAct1Title: "Drop by Drop Future Harvest",
    watAct1Desc: "Barrels were set up under the school's rain gutters. These collected rainwater were used as life water for the \"Carbon Debt\" saplings, ensuring the ecological cycle.",
    watAct2Title: "Visual Awareness",
    watAct2Desc: "Colorful \"TURN OFF THE WATER\" warning stickers were placed on the faucets in toilets and sinks to prevent unnecessary consumption.",
    disAct1Title: "Target Zero Waste Documentary",
    disAct1Desc: "A short documentary screening themed \"climate migrants and ecological grievances\" was organized in the school conference hall with the participation of students.",
    sec3Title: "3. Macro-Scale Counterparts",
    sec3Desc: "Bitter disaster and crisis reflections in the real current world of the local bills discussed in the simulation.",
    macro1Title: "Energy Crisis",
    macro1I1: "Europe (2022-2024): Fossil fuel addiction and supply issues caused prices to soar while accelerating renewable investments.",
    macro1I2: "Germany: Turned to wind and solar by cutting carbon emissions for emission targets.",
    macro1I3: "Turkey: Power plant investments were aggressively increased in Central and Southeastern Anatolia.",
    macro2Title: "Water Scarcity",
    macro2I1: "Konya Basin: Groundwater level collapse caused massive agricultural damage and dangerous sinkholes.",
    macro2I2: "Cape Town: The city faced the \"Day Zero\" (the endpoint of water) scenario.",
    macro2I3: "Aral Sea: As a result of incorrect irrigation and climate change, the lake ecosystem was completely paralyzed.",
    macro3Title: "Disasters",
    macro3I1: "Black Sea: The warming air mass caused sudden and devastating flood disasters around Kastamonu and Bartın.",
    macro3I2: "Australia: Dry ground and record temperatures fueled the most devastating mass mega-fires in natural history.",
    macro3I3: "Pakistan: The monsoon anomaly submerged a massive part of the country, forcing millions to migrate.",
  };

  return (
    <div className="w-full">
      <main className="pt-24 pb-20 px-8 max-w-7xl mx-auto space-y-16">
        {/* Header Section */}
        <header className="mb-12">
          <h1 className="font-extrabold tracking-tight text-on-surface mb-4 text-5xl md:text-6xl font-headline">
            {text.title1} <span className="text-primary italic">{text.title2}</span>
          </h1>
          <p className="text-on-surface-variant max-w-3xl text-lg font-body leading-relaxed">
            {text.desc}
          </p>
        </header>

        {/* ================================= */}
        {/* 1. HAZIRLIK VE SİMÜLASYON AŞAMASI */}
        {/* ================================= */}
        <section>
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-on-surface font-headline">{text.sec1Title}</h2>
            <div className="h-px bg-outline-variant flex-grow ml-8 mb-3 opacity-30"></div>
          </div>

          {/* Main Grid Layout from Stitch Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Simulation Controls & Status */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              {/* Status Card */}
              <div className="bg-surface-container p-8 rounded-2xl biolume-glow border border-outline-variant/10">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary-dim">{text.liveStatus}</span>
                  <div className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-on-surface font-headline">{text.simActive}</h3>
                <p className="text-on-surface-variant text-sm mb-8 leading-relaxed font-body">{text.simDesc}</p>
                <div className="flex flex-col gap-3 mb-4">
                  <div className="bg-surface-container-highest px-4 py-3 rounded-lg flex justify-between items-center text-sm font-bold border border-outline-variant/5">
                    <span className="text-on-surface">{text.comms}</span>
                    <span className="text-primary tracking-widest">3</span>
                  </div>
                  <div className="bg-surface-container-highest px-4 py-3 rounded-lg flex justify-between items-center text-sm font-bold border border-outline-variant/5">
                    <span className="text-on-surface">{text.mps}</span>
                    <span className="text-secondary tracking-widest">49</span>
                  </div>
                  <div className="bg-surface-container-highest px-4 py-3 rounded-lg flex justify-between items-center text-sm font-bold border border-outline-variant/5">
                    <span className="text-on-surface">{text.duration}</span>
                    <span className="text-amber-400 tracking-widest">{text.durationVal}</span>
                  </div>
                </div>
              </div>

              {/* Parameter Bento Card */}
              <div className="bg-surface-container-high p-8 rounded-2xl border border-outline-variant/10">
                <h4 className="font-bold text-lg mb-6 text-on-surface font-headline">{text.activeComms}</h4>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2 font-bold">
                      <span className="text-blue-400">{text.comm1Name}</span>
                    </div>
                    <p className="text-xs text-on-surface-variant font-body">{text.comm1Desc}</p>
                  </div>
                  <div className="h-px bg-outline-variant/20"></div>
                  <div>
                    <div className="flex justify-between text-sm mb-2 font-bold">
                      <span className="text-amber-500">{text.comm2Name}</span>
                    </div>
                    <p className="text-xs text-on-surface-variant font-body">{text.comm2Desc}</p>
                  </div>
                  <div className="h-px bg-outline-variant/20"></div>
                  <div>
                    <div className="flex justify-between text-sm mb-2 font-bold">
                      <span className="text-rose-500">{text.comm3Name}</span>
                    </div>
                    <p className="text-xs text-on-surface-variant font-body">{text.comm3Desc}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Process & Visualizer */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              {/* Main Glassmorphic Process Card */}
              <div className="relative rounded-2xl overflow-hidden bg-surface-variant/40 backdrop-blur-2xl p-8 md:p-10 border border-outline-variant/10 biolume-glow h-full flex flex-col">
                <div className="absolute inset-0 z-0 opacity-20 overflow-hidden">
                  <img alt="Parlayan çizgilerle soyut dijital orman deseni" className="w-full h-full object-cover grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAd4L4DSAg1c2Kq3BHnQRdNVA502NRr8fCgb9p0-tgSCyQm-p3cBOqJdC7utBr3t3RQbctbqCKUIw7UooEWaieeroNYIINo2fe-6AOrVKc_E-dik94FePt8YsSRHSc44iEUrokpqQRG-wetjpVDgjm3ZgiWa_CI048umNyo4Cgd1kvUxSzc8ppz3PIs-iqMy-8s2NBUWltJd0bNAMNPL8zvAEpoiYrdLgzVoruwDNKdb17YzGpHeZTbGOWQOun6E_ohu2Ic6jdlFko" />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
                </div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-primary/20 p-3 rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">account_balance</span>
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-on-surface font-headline">{text.procTitle}</h2>
                      <p className="text-on-surface-variant text-sm font-body">{text.procSubtitle}</p>
                    </div>
                  </div>

                  <p className="text-on-surface leading-relaxed text-sm md:text-base font-body mb-8">
                    {text.procText}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-auto">
                    {/* Process Step 1 */}
                    <div className="bg-surface-container-lowest/70 backdrop-blur-md p-6 rounded-xl border border-outline-variant/5">
                      <span className="text-xs font-black text-primary/60 block mb-4 tracking-widest">ADIM 01</span>
                      <span className="material-symbols-outlined mb-2 text-primary">campaign</span>
                      <h5 className="font-bold mb-1 text-on-surface font-headline">{text.step1Title}</h5>
                      <p className="text-xs text-on-surface-variant font-body">{text.step1Desc}</p>
                      <div className="mt-4 flex items-center gap-2">
                        <div className="flex-1 h-1 bg-surface-container rounded-full"><div className="w-full h-full bg-primary rounded-full"></div></div>
                      </div>
                    </div>
                    {/* Process Step 2 */}
                    <div className="bg-surface-container-lowest/70 backdrop-blur-md p-6 rounded-xl border border-secondary/20 ring-1 ring-secondary/20">
                      <span className="text-xs font-black text-secondary block mb-4 tracking-widest">ADIM 02</span>
                      <span className="material-symbols-outlined mb-2 text-secondary">record_voice_over</span>
                      <h5 className="font-bold mb-1 text-on-surface font-headline">{text.step2Title}</h5>
                      <p className="text-xs text-on-surface-variant font-body">{text.step2Desc}</p>
                      <div className="mt-4 flex items-center gap-2">
                        <div className="flex-1 h-1 bg-surface-container rounded-full"><div className="w-full h-full bg-secondary rounded-full"></div></div>
                      </div>
                    </div>
                    {/* Process Step 3 */}
                    <div className="bg-surface-container-lowest/70 backdrop-blur-md p-6 rounded-xl border border-outline-variant/5">
                      <span className="text-xs font-black text-amber-500 block mb-4 tracking-widest">ADIM 03</span>
                      <span className="material-symbols-outlined mb-2 text-amber-500">how_to_vote</span>
                      <h5 className="font-bold mb-1 text-on-surface font-headline">{text.step3Title}</h5>
                      <p className="text-xs text-on-surface-variant font-body">{text.step3Desc}</p>
                      <div className="mt-4 flex items-center gap-2">
                        <div className="flex-1 h-1 bg-surface-container rounded-full"><div className="w-full h-full bg-amber-500 rounded-full"></div></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Photos Banner */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card rounded-2xl p-4 border border-outline-variant/10 flex items-center gap-4 group">
                  <div className="w-16 h-16 rounded-lg bg-surface-container-highest flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-3xl text-primary">account_balance</span>
                  </div>
                  <div>
                    <h6 className="font-bold text-sm text-on-surface">{text.pc1Title}</h6>
                    <p className="text-on-surface-variant text-xs mt-1">{text.pc1Desc}</p>
                  </div>
                </div>
                <div className="glass-card rounded-2xl p-4 border border-outline-variant/10 flex items-center gap-4 group">
                  <div className="w-16 h-16 rounded-lg bg-surface-container-highest flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-3xl text-secondary">forum</span>
                  </div>
                  <div>
                    <h6 className="font-bold text-sm text-on-surface">{text.pc2Title}</h6>
                    <p className="text-on-surface-variant text-xs mt-1">{text.pc2Desc}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Resmi Gazete Highlight */}
        <section className="glass-card rounded-2xl p-8 md:p-12 border border-outline-variant/10 flex flex-col lg:flex-row gap-12 items-center bg-gradient-to-r from-surface-container to-surface-container-highest">
          <div className="flex-1 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-400 bg-teal-400/10 px-3 py-1 rounded-full">{text.rgBadge}</span>
            <h3 className="text-3xl md:text-4xl font-bold text-on-surface font-headline border-b border-teal-500/30 pb-4 inline-block">{text.rgTitle}</h3>
            <p className="text-on-surface-variant leading-relaxed font-body text-lg">
              {text.rgDesc}
            </p>
            <div className="flex flex-wrap gap-4 pt-4 mt-8">
              <a href="/img/3.png" download className="bg-teal-600/90 hover:bg-teal-500 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-teal-900/50 flex items-center gap-2">
                <span className="material-symbols-outlined">download</span> {text.dlPng}
              </a>
              <button 
                onClick={() => { const printWin = window.open("/img/3.png", "_blank"); if (printWin) { printWin.addEventListener("load", () => { printWin.print(); }); } }}
                className="bg-surface-container-highest hover:bg-surface-variant text-on-surface border border-outline-variant/30 font-bold py-3 px-6 rounded-xl transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined">print</span> {text.dlPdf}
              </button>
            </div>
          </div>
          <div className="w-full lg:w-1/3 aspect-[3/4] rounded-xl overflow-hidden shadow-2xl shadow-black/50 border border-teal-500/20 transform rotate-2 hover:rotate-0 transition-all duration-500">
             <img src="/img/3.png" alt="Genç Şura Resmi Gazetesi" className="w-full h-full object-cover" />
          </div>
        </section>


        {/* ================================= */}
        {/* 2. YAYGINLAŞTIRMA AŞAMASI         */}
        {/* ================================= */}
        <section className="pt-8">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-on-surface font-headline">{text.sec2Title}</h2>
            <div className="h-px bg-outline-variant flex-grow ml-8 mb-3 opacity-30"></div>
          </div>
          <p className="text-on-surface-variant mb-12 text-lg max-w-3xl font-body">
            {text.sec2Desc}
          </p>

          {/* Activity Cards Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            
            {/* Enerji Komisyonu Aktiviteleri */}
            <div className="bg-gradient-to-br from-amber-900/20 to-surface-container-highest rounded-2xl p-8 border border-amber-500/20 glass-card">
              <div className="flex items-center gap-4 mb-6">
                <span className="material-symbols-outlined text-4xl text-amber-500">electric_bolt</span>
                <h3 className="font-bold text-xl text-on-surface">Enerji Yönetimi</h3>
              </div>
              <ul className="space-y-6">
                <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-amber-500 before:rounded-full">
                  <h4 className="font-bold text-on-surface mb-1 text-sm font-headline">{text.enAct1Title}</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{text.enAct1Desc}</p>
                </li>
                <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-amber-500 before:rounded-full">
                  <h4 className="font-bold text-on-surface mb-1 text-sm font-headline">{text.enAct2Title}</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{text.enAct2Desc}</p>
                </li>
                <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-amber-500 before:rounded-full">
                  <h4 className="font-bold text-on-surface mb-1 text-sm font-headline">{text.enAct3Title}</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{text.enAct3Desc}</p>
                </li>
                <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-primary before:rounded-full">
                  <h4 className="font-bold text-on-surface mb-1 text-sm font-headline text-primary">{text.enAct4Title}</h4>
                  <p className="text-xs text-primary/80 leading-relaxed font-medium">{text.enAct4Desc}</p>
                </li>
              </ul>
            </div>

            {/* Su Komisyonu Aktiviteleri */}
            <div className="bg-gradient-to-br from-blue-900/20 to-surface-container-highest rounded-2xl p-8 border border-blue-500/20 glass-card">
              <div className="flex items-center gap-4 mb-6">
                <span className="material-symbols-outlined text-4xl text-blue-500">water_drop</span>
                <h3 className="font-bold text-xl text-on-surface">Su Kaynakları</h3>
              </div>
              <ul className="space-y-6">
                <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-blue-500 before:rounded-full">
                  <h4 className="font-bold text-on-surface mb-1 text-sm font-headline">{text.watAct1Title}</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{text.watAct1Desc}</p>
                </li>
                <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-blue-500 before:rounded-full">
                  <h4 className="font-bold text-on-surface mb-1 text-sm font-headline">{text.watAct2Title}</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{text.watAct2Desc}</p>
                </li>
              </ul>
            </div>

            {/* İklim Afetleri Aktiviteleri */}
            <div className="bg-gradient-to-br from-rose-900/20 to-surface-container-highest rounded-2xl p-8 border border-rose-500/20 glass-card xl:col-span-1 md:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <span className="material-symbols-outlined text-4xl text-rose-500">temp_preferences_custom</span>
                <h3 className="font-bold text-xl text-on-surface">İklim Afetleri</h3>
              </div>
              <ul className="space-y-6">
                <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-rose-500 before:rounded-full">
                  <h4 className="font-bold text-on-surface mb-1 text-sm font-headline">{text.disAct1Title}</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{text.disAct1Desc}</p>
                </li>
              </ul>
            </div>

          </div>
          
          {/* Images Grid Showcase */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {['/img/4.png', '/img/5.png', '/img/1.png', '/img/8.png'].map((src, i) => (
               <div key={i} className="relative group overflow-hidden rounded-2xl aspect-square border border-outline-variant/10 cursor-pointer shadow-lg hover:shadow-primary/20 transition-all" onClick={() => setSelectedImage(src)}>
                 <img src={src} alt={`Galeri Görseli ${i+1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                 <div className="absolute inset-0 bg-surface/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <span className="material-symbols-outlined text-4xl text-white drop-shadow-md">zoom_in</span>
                 </div>
               </div>
            ))}
          </div>
        </section>


        {/* ================================= */}
        {/* 3. GÜNCEL İKLİM KRİZİ ÖRNEKLERİ  */}
        {/* ================================= */}
        <section className="pt-8">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-on-surface font-headline">{text.sec3Title}</h2>
            <div className="h-px bg-outline-variant flex-grow ml-8 mb-3 opacity-30"></div>
          </div>
          <p className="text-on-surface-variant mb-12 text-lg max-w-3xl font-body">
            {text.sec3Desc}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-8 rounded-2xl border-t-2 border-t-amber-500 border-x-outline-variant/10 border-b-outline-variant/10 hover:bg-surface-container-highest transition-colors">
               <h4 className="font-bold text-amber-500 mb-4 inline-flex items-center gap-2 border-b border-amber-500/20 pb-2 w-full font-headline">
                  <span className="material-symbols-outlined">electric_bolt</span> {text.macro1Title}
               </h4>
               <ul className="space-y-4 text-sm font-body text-on-surface-variant">
                  <li>{text.macro1I1}</li>
                  <li>{text.macro1I2}</li>
                  <li>{text.macro1I3}</li>
               </ul>
            </div>
            <div className="glass-card p-8 rounded-2xl border-t-2 border-t-blue-500 border-x-outline-variant/10 border-b-outline-variant/10 hover:bg-surface-container-highest transition-colors">
               <h4 className="font-bold text-blue-500 mb-4 inline-flex items-center gap-2 border-b border-blue-500/20 pb-2 w-full font-headline">
                  <span className="material-symbols-outlined">water_drop</span> {text.macro2Title}
               </h4>
               <ul className="space-y-4 text-sm font-body text-on-surface-variant">
                  <li>{text.macro2I1}</li>
                  <li>{text.macro2I2}</li>
                  <li>{text.macro2I3}</li>
               </ul>
            </div>
            <div className="glass-card p-8 rounded-2xl border-t-2 border-t-rose-500 border-x-outline-variant/10 border-b-outline-variant/10 hover:bg-surface-container-highest transition-colors">
               <h4 className="font-bold text-rose-500 mb-4 inline-flex items-center gap-2 border-b border-rose-500/20 pb-2 w-full font-headline">
                  <span className="material-symbols-outlined">temp_preferences_custom</span> {text.macro3Title}
               </h4>
               <ul className="space-y-4 text-sm font-body text-on-surface-variant">
                  <li>{text.macro3I1}</li>
                  <li>{text.macro3I2}</li>
                  <li>{text.macro3I3}</li>
               </ul>
            </div>
          </div>

        </section>

      </main>

      {/* Image Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-12 animate-fade-in" onClick={() => setSelectedImage(null)}>
          <button className="absolute top-6 right-6 md:top-10 md:right-10 text-white hover:text-primary transition-colors z-10 bg-surface-container-highest/50 rounded-full w-12 h-12 flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>
          <img src={selectedImage} alt="Expanded" className="max-w-full max-h-full rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] object-contain border border-outline-variant/20 animate-scale-in" onClick={(e) => e.stopPropagation()} />
        </div>
      )}

    </div>
  );
}
