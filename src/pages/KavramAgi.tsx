// @ts-nocheck
import React from 'react';
import network3DHtml from '@/assets/sade_bolgesel_3D.html?raw';

export default function KavramAgi() {
  return (
    <div className="w-full">
      <main className="min-h-screen px-6 py-12 max-w-7xl mx-auto">
        {/* Hero Section */}
        <header className="mb-20 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent font-headline">
            İklim ve Ekosistem Kavram Ağı
          </h1>
          <p className="text-on-surface-variant max-w-2xl mx-auto text-lg font-body">
            Gezegenimizin geleceğini şekillendiren kritik kavramlar arasındaki karmaşık ilişkileri keşfedin. Fare ile çevirebilir, bölgelere göre filtreleme yapabilirsiniz.
          </p>
        </header>

        {/* Interactive Concept Map Canvas */}
        <div className="relative min-h-[800px] rounded-xl overflow-hidden biolume-glow border border-outline-variant/20 p-2 shadow-2xl bg-gradient-to-br from-surface-container to-surface">
          {/* Real 3D Iframe */}
          <div className="w-full h-full rounded-lg overflow-hidden bg-surface-container-lowest absolute inset-0 m-2" style={{width: 'calc(100% - 16px)', height: 'calc(100% - 16px)'}}>
            <iframe 
              srcDoc={network3DHtml} 
              width="100%" 
              height="100%" 
              style={{ border: 'none' }}
              title="3D Kavram Agi"
            />
          </div>
        </div>

        {/* Data Insights Bento Grid */}
        <section className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-surface-container p-8 rounded-xl flex flex-col justify-between min-h-[300px] border border-outline-variant/10">
            <div>
              <h4 className="text-2xl font-bold mb-4 flex items-center gap-2 text-on-surface font-headline">
                <span className="material-symbols-outlined text-primary">analytics</span>
                Etki Analizi
              </h4>
              <p className="text-on-surface-variant font-body">Kavramlar arasındaki ilişkilerin yoğunluğu, iklim stratejilerimizin önceliklerini belirliyor. Ormanlaşma ve yenilenebilir enerji entegrasyonu en yüksek korelasyona sahip.</p>
            </div>
            <div className="flex gap-4 mt-8 flex-wrap sm:flex-nowrap">
              <div className="bg-surface-container-highest p-4 rounded-xl flex-1 border border-outline-variant/5">
                <span className="block text-primary font-black text-2xl">84%</span>
                <span className="text-xs uppercase tracking-widest opacity-60 text-on-surface-variant">Bağlantı Gücü</span>
              </div>
              <div className="bg-surface-container-highest p-4 rounded-xl flex-1 border border-outline-variant/5">
                <span className="block text-secondary font-black text-2xl">+12.4</span>
                <span className="text-xs uppercase tracking-widest opacity-60 text-on-surface-variant">Ekosistem Endeksi</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-primary/10 to-surface-container-highest p-8 rounded-xl border border-primary/20 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(107,255,143,0.2)]">
              <span className="material-symbols-outlined text-primary text-3xl">add</span>
            </div>
            <h4 className="text-xl font-bold mb-2 text-on-surface font-headline">Yeni Kavram Ekle</h4>
            <p className="text-sm text-on-surface-variant mb-6 font-body">Ağ haritasına yeni bilimsel veriler ve kavramlar ekleyerek genişletin.</p>
            <button className="w-full py-3 bg-surface-container-highest rounded-full border border-outline-variant/30 font-bold hover:bg-primary hover:text-on-primary transition-all text-on-surface cursor-pointer">
              Kavram Oluştur
            </button>
          </div>
        </section>

        {/* Newsletter / Community Section */}
        <section className="mt-20 bg-surface-container-low rounded-2xl p-12 text-center relative overflow-hidden border border-outline-variant/10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-4 text-on-surface font-headline">Gezegen İçin Bilgi Ağına Katılın</h3>
            <p className="text-on-surface-variant mb-8 max-w-xl mx-auto font-body">Haftalık ekosistem raporları ve derinlemesine kavram incelemeleri için topluluğumuza üye olun.</p>
            <div className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
              <input 
                className="flex-1 bg-surface-container-lowest border border-outline-variant/20 rounded-full px-6 py-4 focus:ring-2 focus:ring-primary/40 text-on-surface outline-none" 
                placeholder="E-posta adresiniz" 
                type="email"
              />
              <button className="bg-primary text-on-primary-container px-10 py-4 rounded-full font-bold hover:shadow-[0_0_30px_rgba(107,255,143,0.3)] transition-all cursor-pointer">
                Abone Ol
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}