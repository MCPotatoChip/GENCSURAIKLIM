// @ts-nocheck
import React from 'react';
import sankeyImg from '@/assets/sankey.png';
import barChartImg from '@/assets/bar_chart.png';

export default function NlpAnalysis() {
  return (
    <div className="w-full bg-[#1E212B] p-8 text-white">
      <div className="max-w-7xl mx-auto space-y-12">
        
        <div className="text-center mb-12 mt-12">
          <h1 className="text-4xl font-bold text-[#00E676] mb-4">
            Söylem ve Frekans Analizi
          </h1>
          <p className="text-gray-400">
            Tutanaklar ve Kanun Teklifleri üzerinden elde edilen frekans ve dönüşüm haritaları.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* ÇUBUK GRAFİĞİ */}
          <section className="bg-[#282C34] rounded-2xl p-6 shadow-2xl border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-600 pb-2">
              1. Simülasyon Geneli Kavram Frekansları
            </h2>
            <img 
              src={barChartImg} 
              alt="Frekans Analizi" 
              className="w-full rounded-lg object-contain"
            />
          </section>

          {/* SANKEY DİYAGRAMI */}
          <section className="bg-[#282C34] rounded-2xl p-6 shadow-2xl border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-600 pb-2">
              2. Söylem Dönüşüm Akışı (Sankey)
            </h2>
            <div className="bg-white rounded-lg p-2">
              <img 
                src={sankeyImg} 
                alt="Sankey Diyagramı" 
                className="w-full rounded-lg object-contain" 
              />
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}