export default function EylemRehberi() {
    return (
        <div className="w-full min-h-screen bg-background text-on-surface font-body animate-fade-in">
            <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
                <header className="mb-16 animate-fade-in-up">
                    <span className="text-primary font-bold tracking-widest uppercase text-xs">Ne Yapabiliriz?</span>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-none font-headline mt-2">
                        Eylem <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Rehberi</span>
                    </h1>
                    <p className="text-on-surface-variant text-lg max-w-2xl leading-relaxed">
                        İklim krizine karşı mücadelede bireysel adımların gücünü keşfedin. Günlük rutininize entegre edebileceğiniz pratik, sürdürülebilir eylem planları.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                    {/* Energy */}
                    <div className="glass-card rounded-3xl p-8 border border-outline-variant/10 hover:border-yellow-500/30 transition-all biolume-glow group">
                        <div className="w-14 h-14 rounded-full bg-yellow-500/20 flex items-center justify-center mb-6 group-hover:bg-yellow-500/30 transition-colors">
                            <span className="material-symbols-outlined text-yellow-500 text-3xl">bolt</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-4 font-headline text-on-surface">Enerji Tüketimi</h3>
                        <ul className="space-y-4 text-sm text-on-surface-variant">
                            <li className="flex gap-3"><span className="material-symbols-outlined text-yellow-500 text-[18px]">check_circle</span> Kullanılmayan cihazları fişten çekin (Hayalet tüketimi önler).</li>
                            <li className="flex gap-3"><span className="material-symbols-outlined text-yellow-500 text-[18px]">check_circle</span> LED aydınlatmaya geçerek %80 enerji tasarrufu sağlayın.</li>
                            <li className="flex gap-3"><span className="material-symbols-outlined text-yellow-500 text-[18px]">check_circle</span> Beyaz eşyalarınızda A+++ enerji sınıfını tercih edin.</li>
                        </ul>
                    </div>

                    {/* Water */}
                    <div className="glass-card rounded-3xl p-8 border border-outline-variant/10 hover:border-secondary/30 transition-all shadow-[0_0_30px_rgba(143,248,180,0.05)] group">
                        <div className="w-14 h-14 rounded-full bg-secondary/20 flex items-center justify-center mb-6 group-hover:bg-secondary/30 transition-colors">
                            <span className="material-symbols-outlined text-secondary text-3xl">water_drop</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-4 font-headline text-on-surface">Su Kaynakları</h3>
                        <ul className="space-y-4 text-sm text-on-surface-variant">
                            <li className="flex gap-3"><span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span> Duş sürenizi 5 dakikaya indirerek yılda binlerce litre su kurtarın.</li>
                            <li className="flex gap-3"><span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span> Musluklara perlatör (hava karıştırıcı) takarak basıncı koruyup suyu azaltın.</li>
                            <li className="flex gap-3"><span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span> Sızdıran tuvalet ve muslukları hemen tamir edin.</li>
                        </ul>
                    </div>

                    {/* Food */}
                    <div className="glass-card rounded-3xl p-8 border border-outline-variant/10 hover:border-orange-400/30 transition-all group">
                        <div className="w-14 h-14 rounded-full bg-orange-400/20 flex items-center justify-center mb-6 group-hover:bg-orange-400/30 transition-colors">
                            <span className="material-symbols-outlined text-orange-400 text-3xl">restaurant</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-4 font-headline text-on-surface">Gıda ve Beslenme</h3>
                        <ul className="space-y-4 text-sm text-on-surface-variant">
                            <li className="flex gap-3"><span className="material-symbols-outlined text-orange-400 text-[18px]">check_circle</span> Haftada 1-2 gün et tüketimini azaltın (örneğin "Etsiz Pazartesi").</li>
                            <li className="flex gap-3"><span className="material-symbols-outlined text-orange-400 text-[18px]">check_circle</span> Mevsiminde ve yerel üretilen gıdaları tercih ederek karbon ayak izinizi küçültün.</li>
                            <li className="flex gap-3"><span className="material-symbols-outlined text-orange-400 text-[18px]">check_circle</span> Organik atıklarınızı çöpe atmak yerine kompost yaparak toprağa geri kazandırın.</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 bg-surface-container rounded-3xl p-8 md:p-12 border border-primary/20 flex flex-col md:flex-row gap-8 items-center justify-between text-center md:text-left">
                    <div>
                        <h3 className="text-2xl font-bold font-headline text-on-surface mb-2">Simülasyonda Etkinizi Test Edin</h3>
                        <p className="text-on-surface-variant text-sm">Bu eylemlerin ülke veya küresel çapta uygulandığında yaratacağı devasa farkı kendi gözlerinizle görün.</p>
                    </div>
                    <a href="/simulator" className="inline-flex items-center gap-2 bg-primary text-on-primary-container font-black px-8 py-4 rounded-xl shadow-[0_0_20px_rgba(107,255,143,0.3)] hover:scale-105 transition-transform whitespace-nowrap uppercase tracking-widest text-sm">
                        <span className="material-symbols-outlined">play_arrow</span>
                        Simülatöre Git
                    </a>
                </div>
            </main>
        </div>
    );
}
