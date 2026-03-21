import { useState } from "react";

export default function SimulasyonSureci() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  return (
    <div className="w-full">
      <main className="pt-24 pb-20 px-8 max-w-7xl mx-auto space-y-16">
        {/* Header Section */}
        <header className="mb-12">
          <h1 className="font-extrabold tracking-tight text-on-surface mb-4 text-5xl md:text-6xl font-headline">
            Simülasyon <span className="text-primary italic">Süreci</span>
          </h1>
          <p className="text-on-surface-variant max-w-3xl text-lg font-body leading-relaxed">
            Genç İklim Şurası simülasyonunun hazırlık, uygulama ve yaygınlaştırma aşamalarının tüm detayları. Gerçek dünya parametreleri ile şekillenen meclis aritmetiği ve komisyon çalışmaları.
          </p>
        </header>

        {/* ================================= */}
        {/* 1. HAZIRLIK VE SİMÜLASYON AŞAMASI */}
        {/* ================================= */}
        <section>
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-on-surface font-headline">1. Hazırlık ve Uygulama</h2>
            <div className="h-px bg-outline-variant flex-grow ml-8 mb-3 opacity-30"></div>
          </div>

          {/* Main Grid Layout from Stitch Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Simulation Controls & Status */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              {/* Status Card */}
              <div className="bg-surface-container p-8 rounded-2xl biolume-glow border border-outline-variant/10">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary-dim">Canlı Durum</span>
                  <div className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-on-surface font-headline">Simülasyon Aktif</h3>
                <p className="text-on-surface-variant text-sm mb-8 leading-relaxed font-body">İklim krizi ve çevre politikaları üzerine TBMM iç tüzüğünden esinlenilen "Genç İklim Şurası İç Tüzüğü" devrede.</p>
                <div className="flex flex-col gap-3 mb-4">
                  <div className="bg-surface-container-highest px-4 py-3 rounded-lg flex justify-between items-center text-sm font-bold border border-outline-variant/5">
                    <span className="text-on-surface">Komisyonlar</span>
                    <span className="text-primary tracking-widest">3</span>
                  </div>
                  <div className="bg-surface-container-highest px-4 py-3 rounded-lg flex justify-between items-center text-sm font-bold border border-outline-variant/5">
                    <span className="text-on-surface">Milletvekili</span>
                    <span className="text-secondary tracking-widest">49</span>
                  </div>
                  <div className="bg-surface-container-highest px-4 py-3 rounded-lg flex justify-between items-center text-sm font-bold border border-outline-variant/5">
                    <span className="text-on-surface">Süre</span>
                    <span className="text-amber-400 tracking-widest">2 GÜN</span>
                  </div>
                </div>
              </div>

              {/* Parameter Bento Card */}
              <div className="bg-surface-container-high p-8 rounded-2xl border border-outline-variant/10">
                <h4 className="font-bold text-lg mb-6 text-on-surface font-headline">Aktif Komisyonlar</h4>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2 font-bold">
                      <span className="text-blue-400">Su Kaynakları Komisyonu</span>
                    </div>
                    <p className="text-xs text-on-surface-variant font-body">Tarımda Su Yönetimi ve Kuraklıkla Mücadele Kanun Teklifi</p>
                  </div>
                  <div className="h-px bg-outline-variant/20"></div>
                  <div>
                    <div className="flex justify-between text-sm mb-2 font-bold">
                      <span className="text-amber-500">Enerji Yönetimi Komisyonu</span>
                    </div>
                    <p className="text-xs text-on-surface-variant font-body">Karbon Kotası ve Bireysel Sınırlandırma Kanun Teklifi</p>
                  </div>
                  <div className="h-px bg-outline-variant/20"></div>
                  <div>
                    <div className="flex justify-between text-sm mb-2 font-bold">
                      <span className="text-rose-500">İklim Afetleri Komisyonu</span>
                    </div>
                    <p className="text-xs text-on-surface-variant font-body">Ekolojik Göç ve Mağduriyetlerin Önlenmesi Kanun Teklifi</p>
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
                      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-on-surface font-headline">Meclis Usulü ve Akış</h2>
                      <p className="text-on-surface-variant text-sm font-body">6 oturum ve 2 genel kurul simulasyonu</p>
                    </div>
                  </div>

                  <p className="text-on-surface leading-relaxed text-sm md:text-base font-body mb-8">
                    Çalışma alanları olarak okuldaki konferans salonları ve kütüphaneler kullanılmıştır. 
                    Tüm görüşmeler resmi iç tüzüğe sadık kalınarak, "soy isimleri" veya temsil edilen "iller" kullanılarak yapılmıştır. 
                    Genel kurullar <strong>Başkanlık Divanı</strong> (Meclis Başkanı, Başkanvekili ve Kâtip) tarafından yönetilmiştir.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-auto">
                    {/* Process Step 1 */}
                    <div className="bg-surface-container-lowest/70 backdrop-blur-md p-6 rounded-xl border border-outline-variant/5">
                      <span className="text-xs font-black text-primary/60 block mb-4 tracking-widest">ADIM 01</span>
                      <span className="material-symbols-outlined mb-2 text-primary">campaign</span>
                      <h5 className="font-bold mb-1 text-on-surface font-headline">Okunma</h5>
                      <p className="text-xs text-on-surface-variant font-body">Kanun teklifi kâtip tarafından yüksek sesle okunur ve komisyona duyurulur.</p>
                      <div className="mt-4 flex items-center gap-2">
                        <div className="flex-1 h-1 bg-surface-container rounded-full"><div className="w-full h-full bg-primary rounded-full"></div></div>
                      </div>
                    </div>
                    {/* Process Step 2 */}
                    <div className="bg-surface-container-lowest/70 backdrop-blur-md p-6 rounded-xl border border-secondary/20 ring-1 ring-secondary/20">
                      <span className="text-xs font-black text-secondary block mb-4 tracking-widest">ADIM 02</span>
                      <span className="material-symbols-outlined mb-2 text-secondary">record_voice_over</span>
                      <h5 className="font-bold mb-1 text-on-surface font-headline">Müzakere</h5>
                      <p className="text-xs text-on-surface-variant font-body">Milletvekili kürsüde 5 dakikalık açıklama yapar ve soruları değerlendirir.</p>
                      <div className="mt-4 flex items-center gap-2">
                        <div className="flex-1 h-1 bg-surface-container rounded-full"><div className="w-full h-full bg-secondary rounded-full"></div></div>
                      </div>
                    </div>
                    {/* Process Step 3 */}
                    <div className="bg-surface-container-lowest/70 backdrop-blur-md p-6 rounded-xl border border-outline-variant/5">
                      <span className="text-xs font-black text-amber-500 block mb-4 tracking-widest">ADIM 03</span>
                      <span className="material-symbols-outlined mb-2 text-amber-500">how_to_vote</span>
                      <h5 className="font-bold mb-1 text-on-surface font-headline">Oylama</h5>
                      <p className="text-xs text-on-surface-variant font-body">%50+1 oy alan teklif yasalaşır ve Genç Şura Resmi Gazetesine ilan edilir.</p>
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
                    <h6 className="font-bold text-sm text-on-surface">Genel Kurul</h6>
                    <p className="text-on-surface-variant text-xs mt-1">Simülasyon açılışı ve vekil yeminleri</p>
                  </div>
                </div>
                <div className="glass-card rounded-2xl p-4 border border-outline-variant/10 flex items-center gap-4 group">
                  <div className="w-16 h-16 rounded-lg bg-surface-container-highest flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-3xl text-secondary">forum</span>
                  </div>
                  <div>
                    <h6 className="font-bold text-sm text-on-surface">Komisyon</h6>
                    <p className="text-on-surface-variant text-xs mt-1">Yasa tasarısı ateşli tartışmaları</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Resmi Gazete Highlight */}
        <section className="glass-card rounded-2xl p-8 md:p-12 border border-outline-variant/10 flex flex-col lg:flex-row gap-12 items-center bg-gradient-to-r from-surface-container to-surface-container-highest">
          <div className="flex-1 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-400 bg-teal-400/10 px-3 py-1 rounded-full">Kapanış Çıktısı</span>
            <h3 className="text-3xl md:text-4xl font-bold text-on-surface font-headline border-b border-teal-500/30 pb-4 inline-block">Genç Şura Resmi Gazetesi</h3>
            <p className="text-on-surface-variant leading-relaxed font-body text-lg">
              Simülasyon sürecinin somut çıktısı olan resmi gazete; komisyonlarda 7 bölgenin temsilcileri tarafından oylanan bölgesel yasa tasarılarını içerir. 
              Gençlerin iklim krizine karşı ürettikleri hukuki ve uygulanabilir çözümleri kanıtlayan nihai nitel veri aracıdır.
            </p>
            <div className="flex flex-wrap gap-4 pt-4 mt-8">
              <a href="/img/3.png" download className="bg-teal-600/90 hover:bg-teal-500 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-teal-900/50 flex items-center gap-2">
                <span className="material-symbols-outlined">download</span> PNG İndir
              </a>
              <button 
                onClick={() => { const printWin = window.open("/img/3.png", "_blank"); if (printWin) { printWin.addEventListener("load", () => { printWin.print(); }); } }}
                className="bg-surface-container-highest hover:bg-surface-variant text-on-surface border border-outline-variant/30 font-bold py-3 px-6 rounded-xl transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined">print</span> PDF Olarak Kaydet
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
            <h2 className="text-3xl font-bold tracking-tight text-on-surface font-headline">2. Toplumsal Etki (Sosyal Eylem)</h2>
            <div className="h-px bg-outline-variant flex-grow ml-8 mb-3 opacity-30"></div>
          </div>
          <p className="text-on-surface-variant mb-12 text-lg max-w-3xl font-body">
            Yasa yapıcı öğrencilerin edindikleri bilinci okul geneline taşıması hedeflenmiştir. Üç ana komisyon kendi alanlarına uygun fiziksel sosyal eylem planları gerçekleştirmiştir.
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
                  <h4 className="font-bold text-on-surface mb-1 text-sm font-headline">İmza Duvarı & Taahhütname</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">Öğrencilerin hazırladığı 5 temel maddelik kişisel koruma bildirgesi okul panosuna asılarak diğer öğrencilerden fiziksel imzalar toplandı.</p>
                </li>
                <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-amber-500 before:rounded-full">
                  <h4 className="font-bold text-on-surface mb-1 text-sm font-headline">Okul Karbon Analizi</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">Okuldaki elektrik, su ve kağıt giderleri hesaplanarak önlemler geliştirildi.</p>
                </li>
                <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-amber-500 before:rounded-full">
                  <h4 className="font-bold text-on-surface mb-1 text-sm font-headline">Tasarruflu Sürüş Broşürü</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">Aileler için hazırlanan araç karbon sınırlandırması bilgilendirme broşürü evebeynlere dağıtıldı.</p>
                </li>
                <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-primary before:rounded-full">
                  <h4 className="font-bold text-on-surface mb-1 text-sm font-headline text-primary">Karbon Borcumuzu Ödüyoruz</h4>
                  <p className="text-xs text-primary/80 leading-relaxed font-medium">Büyükşehir Belediyesi desteğiyle, mecliste harcanan emisyonu sıfırlamak için okulumuza 571 adet gül fidesi dikildi.</p>
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
                  <h4 className="font-bold text-on-surface mb-1 text-sm font-headline">Damla Damla Gelecek Hasadı</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">Okulun yağmur oluklarının altına variller kuruldu. Toplanan bu yağmur suları "Karbon Borcu" fidanlarının can suyu olarak kullanılarak ekolojik döngü sağlandı.</p>
                </li>
                <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-blue-500 before:rounded-full">
                  <h4 className="font-bold text-on-surface mb-1 text-sm font-headline">Görsel Farkındalık</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">Tuvalet ve lavabolardaki musluklara gereksiz tüketimi önlemek için renkli "SUYU KAPAT" ikaz çıkartmaları yerleştirildi.</p>
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
                  <h4 className="font-bold text-on-surface mb-1 text-sm font-headline">Hedef Sıfır Atık Belgesel</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">Okul konferans salonunda öğrencilerin katılımıyla "iklim göçmenleri ve ekolojik mağduriyetler" temalı kısa belgesel gösterimi düzenlenmiştir.</p>
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
            <h2 className="text-3xl font-bold tracking-tight text-on-surface font-headline">3. Makro Ölçekli Karşılıklar</h2>
            <div className="h-px bg-outline-variant flex-grow ml-8 mb-3 opacity-30"></div>
          </div>
          <p className="text-on-surface-variant mb-12 text-lg max-w-3xl font-body">
            Simülasyonda tartışılan yerel kanun tekliflerinin gerçek güncel dünyadaki acı afet ve kriz yansımaları.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-8 rounded-2xl border-t-2 border-t-amber-500 border-x-outline-variant/10 border-b-outline-variant/10 hover:bg-surface-container-highest transition-colors">
               <h4 className="font-bold text-amber-500 mb-4 inline-flex items-center gap-2 border-b border-amber-500/20 pb-2 w-full font-headline">
                  <span className="material-symbols-outlined">electric_bolt</span> Enerji Krizi
               </h4>
               <ul className="space-y-4 text-sm font-body text-on-surface-variant">
                  <li><strong>Avrupa (2022-2024):</strong> Fosil yakıt bağımlılığı ve arz sorunu fiyatları uçururken yenilenebilir yatırımları hızlandırdı.</li>
                  <li><strong>Almanya:</strong> Emisyon hedefleri için karbon salımını keserek rüzgar ve güneşe yöneldi.</li>
                  <li><strong>Türkiye:</strong> İç ve Güneydoğu Anadolu'da santral yatırımları agresif olarak artırıldı.</li>
               </ul>
            </div>
            <div className="glass-card p-8 rounded-2xl border-t-2 border-t-blue-500 border-x-outline-variant/10 border-b-outline-variant/10 hover:bg-surface-container-highest transition-colors">
               <h4 className="font-bold text-blue-500 mb-4 inline-flex items-center gap-2 border-b border-blue-500/20 pb-2 w-full font-headline">
                  <span className="material-symbols-outlined">water_drop</span> Su Kıtlığı
               </h4>
               <ul className="space-y-4 text-sm font-body text-on-surface-variant">
                  <li><strong>Konya Ovası:</strong> Yeraltı su seviyesi çöküşü büyük tarım hasarına ve tehlikeli obruklara yol açtı.</li>
                  <li><strong>Cape Town:</strong> Şehir "Day Zero" (suyun bitiş noktası) senaryosu ile yüzleşti.</li>
                  <li><strong>Aral Gölü:</strong> Yanlış sulama ve iklim değişimi sonucunda göl ekosistemi tümüyle felce uğradı.</li>
               </ul>
            </div>
            <div className="glass-card p-8 rounded-2xl border-t-2 border-t-rose-500 border-x-outline-variant/10 border-b-outline-variant/10 hover:bg-surface-container-highest transition-colors">
               <h4 className="font-bold text-rose-500 mb-4 inline-flex items-center gap-2 border-b border-rose-500/20 pb-2 w-full font-headline">
                  <span className="material-symbols-outlined">temp_preferences_custom</span> Afetler
               </h4>
               <ul className="space-y-4 text-sm font-body text-on-surface-variant">
                  <li><strong>Karadeniz:</strong> Isınan hava kütlesi Kastamonu ve Bartın civarında ani ve yok edici sel felaketlerine yol açtı.</li>
                  <li><strong>Avustralya:</strong> Kuru zemin ve rekor sıcaklıklar doğa tarihinin en yıkıcı kitlesel mega yangınlarını körükledi.</li>
                  <li><strong>Pakistan:</strong> Muson anomalisi ülkenin devasa bir bölümünü sular altında bırakarak milyonları göçe zorladı.</li>
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
