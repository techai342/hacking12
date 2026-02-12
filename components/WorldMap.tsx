
import React, { useState, useEffect } from 'react';

interface Node {
  id: string;
  label: string;
  x: number; // percentage
  y: number; // percentage
}

const NODES: Node[] = [
  { id: '1', label: 'san francisco', x: 12, y: 35 },
  { id: '2', label: 'westside.info', x: 18, y: 45 },
  { id: '3', label: 'proxy.fischertechnik.com', x: 28, y: 55 },
  { id: '4', label: 'vpn.crio.org', x: 35, y: 40 },
  { id: '5', label: 'globalmixed.com', x: 55, y: 42 },
  { id: '6', label: 'superproxy.org', x: 42, y: 60 },
  { id: '7', label: 'home.com', x: 58, y: 85 },
  { id: '8', label: 'securetalk.com', x: 62, y: 68 },
  { id: '9', label: 'vipsaver.com', x: 55, y: 35 },
  { id: '10', label: 'targetbids.com', x: 58, y: 48 },
];

const WorldMap: React.FC = () => {
  const [path, setPath] = useState<string[]>([]);
  const [locked, setLocked] = useState(false);

  const toggleNode = (id: string) => {
    if (locked) return;
    setPath(prev => {
      if (prev.includes(id)) return prev.filter(n => n !== id);
      return [...prev, id];
    });
  };

  const clearPath = () => {
    setPath([]);
    setLocked(false);
  };

  const getPos = (id: string) => NODES.find(n => n.id === id);

  return (
    <div className="w-full h-full bg-[#050a05] text-[#00ff41] font-mono flex flex-col p-4 relative overflow-hidden">
      {/* Header Info */}
      <div className="flex justify-between items-start mb-4 border-b border-[#00ff4133] pb-2 shrink-0">
        <div>
          <div className="text-[10px] opacity-60">HOME IP ADDRESS</div>
          <div className="text-lg font-bold">12.101.1.1</div>
        </div>
        <div className="text-right">
          <div className="text-[10px] opacity-60">CASH BALANCE</div>
          <div className="text-lg font-bold text-yellow-500">$714,393,427</div>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-4 overflow-hidden">
        {/* Sidebar Controls */}
        <div className="w-full md:w-40 flex flex-row md:flex-col gap-2 shrink-0">
          <div className="hidden md:block text-[10px] font-bold mb-1 opacity-80 uppercase tracking-widest border-l-2 border-[#00ff41] pl-2">The World Map</div>
          <button 
            onClick={() => setLocked(!locked)}
            className={`flex-1 md:flex-none w-full py-2 text-xs border border-[#00ff41] transition-colors ${locked ? 'bg-orange-600 text-black border-orange-600' : 'hover:bg-[#00ff4133]'}`}
          >
            {locked ? 'LOCKED' : 'LOCK'}
          </button>
          <button 
            onClick={clearPath}
            className="flex-1 md:flex-none w-full py-2 text-xs border border-[#00ff41] hover:bg-[#00ff4133] transition-colors"
          >
            CLEAR
          </button>
          <button 
            className="flex-1 md:flex-none w-full py-2 text-xs border border-[#00ff41] hover:bg-[#00ff4133] transition-colors"
          >
            REFRESH
          </button>

          <div className="hidden md:block mt-auto p-2 border border-[#00ff4133] text-[9px] opacity-50">
            Proxy servers added with the visual scanner show up here. Click through them and lock in a path.
          </div>
        </div>

        {/* Map Area */}
        <div className="flex-1 relative bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-contain bg-no-repeat bg-center opacity-80 filter grayscale sepia(100%) hue-rotate(80deg) brightness(0.6) min-h-[200px]">
          {/* Path Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            {path.map((nodeId, idx) => {
              if (idx === 0) return null;
              const p1 = getPos(path[idx - 1]);
              const p2 = getPos(nodeId);
              if (!p1 || !p2) return null;
              return (
                <line 
                  key={`${p1.id}-${p2.id}`}
                  x1={`${p1.x}%`} y1={`${p1.y}%`}
                  x2={`${p2.x}%`} y2={`${p2.y}%`}
                  stroke={locked ? '#ff9800' : '#00ff41'}
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  className="animate-[dash_20s_linear_infinite]"
                />
              );
            })}
          </svg>

          {/* Nodes */}
          {NODES.map(node => {
            const isActive = path.includes(node.id);
            const isLast = path[path.length - 1] === node.id;
            return (
              <div 
                key={node.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                onClick={() => toggleNode(node.id)}
              >
                <div className={`w-3 h-3 border-2 ${isActive ? 'bg-orange-500 border-white' : 'bg-black border-[#00ff41]'} group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(0,255,65,0.5)]`}></div>
                <div className={`absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] px-1 bg-black/80 border ${isActive ? 'border-orange-500 text-orange-500' : 'border-[#00ff4133] text-[#00ff41]'} pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity`}>
                  {node.label.toUpperCase()}
                </div>
                {isLast && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] text-white bg-red-600 px-1 font-bold animate-bounce">
                    EXIT_NODE
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes dash {
          to { stroke-dashoffset: -100; }
        }
      `}</style>
    </div>
  );
};

export default WorldMap;
