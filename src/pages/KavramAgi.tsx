//@ts-nocheck
import React, { useEffect, useRef, useState, useContext } from 'react';
import { Network } from 'vis-network';
import { DataSet } from 'vis-data';
import { AppContext, useTheme } from '../App';
import networkData from '../data/iklim_kavram_agi.json';

const kavramSozluguTR: Record<string, string> = {
  "İKLİM": "Tüm ekosistemi etkileyen meteorolojik olaylar bütünü.",
  "KARBON": "Fosil yakıtların yanmasıyla atmosfere salınarak sera etkisini artıran element.",
  "EMİSYON": "Atmosfere salınan zararlı sera gazı salınımlarını ifade eder.",
  "TARIM": "İklim krizinden en çok etkilenen ve krize etki eden üretim sektörlerindendir.",
  "KURAKLIK": "Yağış miktarının normalin çok altına düşmesinden kaynaklanan su kıtlığı.",
  "SERA GAZI": "Atmosferde ısıyı tutarak yerkürenin ısınmasına neden olan gazlar.",
  "ENERJİ": "Temiz ve yenilenebilir enerji kaynaklarına geçiş esastır.",
  "ORMAN": "Dünyanın akciğerleri ve en önemli 'Karbon Yutak' alanlarından biridir."
};

const kavramSozluguEN: Record<string, string> = {
  "İKLİM": "The entirety of meteorological events affecting the whole ecosystem.",
  "KARBON": "Element released into the atmosphere by burning fossil fuels, increasing the greenhouse effect.",
  "EMİSYON": "Refers to the release of harmful greenhouse gases into the atmosphere.",
  "TARIM": "One of the production sectors most affected by the climate crisis and impacting the crisis.",
  "KURAKLIK": "Water shortage caused by precipitation falling well below normal.",
  "SERA GAZI": "Gases that trap heat in the atmosphere, causing global warming.",
  "ENERJİ": "The transition to clean and renewable energy sources is essential.",
  "ORMAN": "The lungs of the world and one of the most important 'Carbon Sink' areas."
};

interface NodeInfo {
  id: string;
  frekans: number;
  anlam: string;
}

export default function KavramAgi() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isDark } = useContext(AppContext);
  const { lang } = useTheme();
  const [nodeInfo, setNodeInfo] = useState<NodeInfo | null>(null);

  const kavramSozlugu = lang === 'tr' ? kavramSozluguTR : kavramSozluguEN;

  const text = lang === 'tr' ? {
    tag: "Organik Siber-Ekoloji Ağı",
    title1: "İklim",
    title2: "Bilgi Ağacı",
    desc: "Kavramların ana gövdeden esnek ve doğal dallara nasıl ayrıldığını inceleyin. Dalları aydınlatmak için fareyi yaprakların üzerinde gezdirin.",
    defaultDesc: "Raporda öne çıkan stratejik kavram.",
    freq: "Makale Frekansı:"
  } : {
    tag: "Organic Cyber-Ecology Network",
    title1: "Climate",
    title2: "Knowledge Tree",
    desc: "Examine how concepts branch out from the main trunk into flexible and natural branches. Hover over the leaves to illuminate the branches.",
    defaultDesc: "A strategic concept prominent in the report.",
    freq: "Article Frequency:"
  };

  useEffect(() => {
    if (!containerRef.current) return;

    if (!networkData || !networkData.nodes) {
        console.error("JSON verisi bulunamadı!");
        return;
    }

    const nodesDataSet = new DataSet<any>([]);
    const edgesDataSet = new DataSet<any>([]);

    const maxFrekans = Math.max(...networkData.nodes.map((n: any) => n.frekans || 1));

    const rawNodes = networkData.nodes.map((n: any) => {
        const isRoot = n.kategori === 'merkez';
        
        return {
            id: n.id,
            label: n.id,
            shape: 'dot', 
            size: isRoot ? 60 : 15 + 35 * ((n.frekans || 1) / maxFrekans),
            color: { 
                background: isRoot ? '#059669' : '#10b981',
                border: isRoot ? '#34d399' : '#6ee7b7'
            },
            font: { 
                color: isDark ? '#edfaec' : '#005f28', 
                size: isRoot ? 24 : 14, 
                bold: isRoot, 
                face: 'Inter, sans-serif' 
            },
            borderWidth: 4,
            shadow: { 
                enabled: true, 
                color: isRoot ? '#10b981' : 'rgba(16,185,129,0.3)', 
                size: isRoot ? 25 : 12, 
                x: 0, 
                y: 0 
            }
        };
    });

    const rawEdges = networkData.edges.map((e: any) => {
        const isTrunkEdge = e.from === 'İKLİM' || e.to === 'İKLİM';
        return {
            id: `${e.from}_${e.to}`,
            from: e.from,
            to: e.to,
            width: isTrunkEdge ? 5 : 2, 
            color: { color: isTrunkEdge ? '#059669' : '#10b981', opacity: 0.5 },
            smooth: { 
                enabled: true,
                type: 'cubicBezier', 
                forceDirection: 'vertical', 
                roundness: isTrunkEdge ? 0.3 : 0.7 
            }
        };
    });

    nodesDataSet.add(rawNodes);
    edgesDataSet.add(rawEdges);

    const data = { nodes: nodesDataSet, edges: edgesDataSet };

    const options = {
      nodes: {
        scaling: { label: { enabled: true, min: 14, max: 28 } },
      },
      edges: {
        selectionWidth: 4,
        smooth: { type: 'cubicBezier' },
      },
      layout: {
        hierarchical: false,
      },
      physics: {
        enabled: true,
        solver: 'forceAtlas2Based',
        forceAtlas2Based: {
            gravitationalConstant: -180,
            centralGravity: 0.015,
            springLength: 200,
            springConstant: 0.08,
            damping: 0.6
        },
        stabilization: {
            enabled: true,
            iterations: 200,
            updateInterval: 50
        }
      },
      interaction: {
        hover: true,
        dragView: false,
        zoomView: false,
        dragNodes: true
      }
    };

    const network = new Network(containerRef.current, data, options);

    network.on("hoverNode", function (params) {
      containerRef.current!.style.cursor = 'pointer';
      const hoveredNodeId = params.node;
      
      const isTrunkNode = hoveredNodeId === 'İKLİM';
      const originalNode = networkData.nodes.find((n: any) => n.id === hoveredNodeId);
      
      setNodeInfo({
          id: hoveredNodeId,
          frekans: originalNode ? originalNode.frekans : 500,
          anlam: kavramSozlugu[hoveredNodeId] || text.defaultDesc
      });

      nodesDataSet.update({ 
          id: hoveredNodeId, 
          borderWidth: 6, 
          shadow: { size: 35, color: isTrunkNode ? '#34d399' : '#6ee7b7' } 
      });

      const connectedEdges = network.getConnectedEdges(hoveredNodeId);
      connectedEdges.forEach((edgeId: string) => {
        edgesDataSet.update({ 
          id: edgeId, 
          width: 8, 
          color: { color: '#34d399', opacity: 1 },
          shadow: { enabled: true, color: '#10b981', size: 20 }
        });
      });
    });

    network.on("blurNode", function (params) {
      containerRef.current!.style.cursor = 'default';
      setNodeInfo(null);
      
      const blurredNodeId = params.node;
      const isTrunkNode = blurredNodeId === 'İKLİM';

      nodesDataSet.update({ 
          id: blurredNodeId, 
          borderWidth: 4, 
          shadow: { size: isTrunkNode ? 25 : 12, color: isTrunkNode ? '#10b981' : 'rgba(16,185,129,0.3)' } 
      });
      
      const connectedEdges = network.getConnectedEdges(blurredNodeId);
      connectedEdges.forEach((edgeId: string) => {
        const edge = rawEdges.find(e => e.id === edgeId);
        if (edge) {
            edgesDataSet.update({ id: edgeId, width: edge.width, color: edge.color, shadow: { enabled: false } });
        }
      });
    });

    return () => network.destroy();
  }, [isDark, kavramSozlugu, text.defaultDesc]); 

  return (
    <div className="flex flex-col items-center w-full max-w-[1400px] mx-auto px-4 py-16 animate-fade-in-up">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-950/40 border border-emerald-800 mb-4">
          <span className="material-symbols-outlined text-emerald-400 text-sm">spa</span>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">{text.tag}</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-black font-headline text-on-surface mb-4 tracking-tighter drop-shadow-lg">
          {text.title1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-300">{text.title2}</span>
        </h1>
        <p className="text-on-surface-variant max-w-2xl mx-auto text-lg leading-relaxed">
          {text.desc}
        </p>
      </div>

      <div className="w-full h-[800px] rounded-[3rem] border border-emerald-900/50 relative overflow-hidden shadow-[0_0_60px_rgba(16,185,129,0.1)] bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#0a2015] via-[#040b07] to-black">
        
        {nodeInfo && (
          <div className="absolute top-8 right-8 z-20 w-[340px] bg-[#030906]/90 backdrop-blur-2xl border border-emerald-500/40 rounded-3xl p-6 shadow-[0_0_40px_rgba(16,185,129,0.2)] animate-fade-in-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-black text-emerald-300 uppercase tracking-tight drop-shadow-md">{nodeInfo.id}</h3>
              <span className="material-symbols-outlined text-emerald-400 bg-emerald-950/40 p-2 rounded-full">spa</span>
            </div>
            
            <div className="flex items-center gap-2 mb-4 bg-emerald-950/50 py-2.5 px-4 rounded-xl border border-emerald-800/60">
              <span className="material-symbols-outlined text-sm text-emerald-400">analytics</span>
              <span className="text-sm font-bold text-emerald-100">{text.freq} {nodeInfo.frekans}</span>
            </div>
            
            <p className="text-sm text-emerald-100/80 leading-relaxed border-t border-emerald-800/40 pt-4 font-medium">
              {nodeInfo.anlam}
            </p>
          </div>
        )}

        <div ref={containerRef} className="w-full h-full relative z-10 focus:outline-none" />
      </div>
    </div>
  );
}