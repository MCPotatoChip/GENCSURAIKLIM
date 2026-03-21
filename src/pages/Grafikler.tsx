// @ts-nocheck
import React from 'react';
import sankeyImg from '@/assets/sankey.png';
import barChartImg from '@/assets/bar_chart.png';

export default function Grafikler() {
  return (
    <div className="w-full">
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Header */}
        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 text-on-surface font-headline">
            İnfografikler
          </h1>
          <p className="text-lg text-on-surface-variant max-w-2xl font-body">
            Dünyamızın nabzını tutan gerçek zamanlı veriler. 2D grafikler ve derinlemesine analizlerle Tutanaklar ve Kanun Teklifleri üzerinden elde edilen veri haritalarını inceleyin.
          </p>
        </header>

        {/* Bento Grid Panel */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Main Chart - Original Bar Chart Integration */}
          <div className="md:col-span-8 glass-card rounded-xl p-8 relative overflow-hidden group border border-outline-variant/10">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-xl font-bold mb-1 text-on-surface font-headline">Simülasyon Geneli Kavram Frekansları</h3>
                <p className="text-sm text-on-surface-variant">Tutanaklar ve Kanun Teklifleri Frekans Analizi</p>
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded-full border border-primary/20">ANALİZ</span>
              </div>
            </div>
            
            <div className="w-full bg-surface/50 rounded-lg p-4 border border-outline-variant/10 mix-blend-screen overflow-hidden">
              <img 
                src={barChartImg} 
                alt="Frekans Analizi" 
                className="w-full rounded-lg object-contain hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Stats Card: CO2 (From Stitch) */}
          <div className="md:col-span-4 bg-surface-container rounded-xl p-8 flex flex-col justify-between border border-outline-variant/10">
            <div>
              <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-secondary" style={{fontSize: '24px'}}>cloud</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-on-surface font-headline">Atmosferik CO2</h3>
              <p className="text-4xl font-extrabold text-primary mb-2">421.5 <span className="text-sm font-normal text-on-surface-variant">ppm</span></p>
              <p className="text-sm text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-error text-xs">trending_up</span>
                Geçen yıla göre %0.6 artış
              </p>
            </div>
            <div className="mt-8 pt-8 border-t border-outline-variant/10">
              <button className="w-full py-3 rounded-xl bg-surface-container-highest text-primary font-bold hover:bg-primary hover:text-on-primary transition-all duration-300 biolume-glow cursor-pointer">
                Raporu İndir
              </button>
            </div>
          </div>

          {/* Sea Level Change: Bar Chart (From Stitch) */}
          <div className="md:col-span-6 glass-card rounded-xl p-8 border border-outline-variant/10">
            <div className="flex items-center gap-4 mb-8">
              <span className="material-symbols-outlined text-secondary text-3xl">waves</span>
              <h3 className="text-xl font-bold text-on-surface font-headline">Deniz Seviyesi Yükselmesi</h3>
            </div>
            <div className="flex items-end h-40 gap-4">
              <div className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-primary/20 h-1/4 rounded-t-lg"></div>
                <span className="text-[10px] text-on-surface-variant">1990</span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-primary/40 h-2/5 rounded-t-lg"></div>
                <span className="text-[10px] text-on-surface-variant">2000</span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-primary/60 h-3/5 rounded-t-lg"></div>
                <span className="text-[10px] text-on-surface-variant">2010</span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-primary/80 h-4/5 rounded-t-lg shadow-[0_0_10px_rgba(107,255,143,0.2)]"></div>
                <span className="text-[10px] text-on-surface-variant">2020</span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-secondary h-full rounded-t-lg shadow-[0_0_20px_rgba(143,248,180,0.3)]"></div>
                <span className="text-[10px] text-on-surface-variant">Bugün</span>
              </div>
            </div>
          </div>

          {/* Map/Analysis Inset (From Stitch) */}
          <div className="md:col-span-6 bg-surface-container rounded-xl p-8 relative overflow-hidden border border-outline-variant/10">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-4 text-on-surface font-headline">Bölgesel Etki Analizi</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl border border-outline-variant/5">
                  <span className="text-sm font-medium text-on-surface">Kuzey Kutbu</span>
                  <span className="text-error font-bold">+4.2°C</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl border border-outline-variant/5">
                  <span className="text-sm font-medium text-on-surface">Amazon Havzası</span>
                  <span className="text-primary font-bold">-%12 Nem</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl border border-outline-variant/5">
                  <span className="text-sm font-medium text-on-surface">Akdeniz</span>
                  <span className="text-error font-bold">+1.8°C</span>
                </div>
              </div>
            </div>
            
            {/* Abstract background pattern */}
            <div className="absolute right-[-10%] bottom-[-10%] opacity-20 w-64 h-64 pointer-events-none">
              <img className="w-full h-full object-cover rounded-full blur-3xl " alt="Abstract" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAkkrqbWsKmjErFMMhm3uq_mJ0_qKv-N9b5RKKkAp4GB5H6x4qQUVQbIGMSLVKE1W6l-hZGYvcJYK4kQFo51_kd2UQK486PNyBCNXapyFfG2z5cbRjUWDE0eTeJmmiMnWGc8oQ4pXJ2s-ZezxW3HWK57SYeci-n4_iq19RHrQwbi9AeiAIe42xRATiWEW3C-UdFQdxF7NJBl8LDeOLYH2MxcnVwlbvUjA7hA-2Sai-OLcK-uJEZNim2582k2wWV54mW6QZ0F0KyUw"/>
            </div>
          </div>

          {/* Sankey Diagram (Original feature replacement) */}
          <div className="md:col-span-12 mt-4 glass-card rounded-xl p-8 relative overflow-hidden group border border-outline-variant/10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2 text-on-surface font-headline">Söylem Dönüşüm Akışı (Sankey)</h2>
                <p className="text-on-surface-variant max-w-2xl">
                  Farklı aşamalardaki argümanların birbirine dönüşüm haritası. Karar alma süreçlerindeki etki noktalarını gösterir.
                </p>
              </div>
              <span className="material-symbols-outlined text-4xl text-primary opacity-50 hidden sm:block">device_hub</span>
            </div>
            
            <div className="w-full bg-[#cbd5e1] rounded-xl p-4 md:p-8 flex justify-center border border-outline-variant/20 relative">
               <div className="absolute inset-0 bg-gradient-to-tr from-surface-container-lowest/20 to-transparent pointer-events-none"></div>
               <img 
                 src={sankeyImg} 
                 alt="Sankey Diyagramı" 
                 className="w-full max-w-5xl rounded-lg object-contain mix-blend-multiply relative z-10" 
               />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}