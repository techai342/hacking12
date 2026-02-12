
import React, { useState, useEffect } from 'react';

const PortScanner: React.FC = () => {
  const [scannedIndices, setScannedIndices] = useState<Set<number>>(new Set());
  const [currentScan, setCurrentScan] = useState(0);
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    if (!isScanning) return;
    
    const interval = setInterval(() => {
      setCurrentScan(prev => {
        const next = prev + 1;
        if (next > 110) {
          setIsScanning(false);
          return prev;
        }
        setScannedIndices(old => new Set(old).add(prev));
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isScanning]);

  const ports = [
    { num: 80, status: 'OPEN', color: 'text-green-400' },
    { num: 21, status: 'CLOSED', color: 'text-red-400' },
    { num: 25, status: 'CLOSED', color: 'text-red-400' },
    { num: 77, status: 'CLOSED', color: 'text-red-400' },
    { num: 81, status: 'CLOSED', color: 'text-red-400' },
  ];

  return (
    <div className="w-full h-full bg-[#050a05] text-[#00ff41] font-mono flex flex-col md:flex-row gap-4 p-4 overflow-hidden">
      {/* Port Details Sidebar */}
      <div className="w-full md:w-48 border border-[#00ff4133] p-3 flex flex-col gap-4 bg-black/50 shrink-0">
        <div className="text-xs flex md:block justify-between items-start">
          <div>
            <div className="opacity-50 text-[10px]">TARGET_DOMAIN</div>
            <div className="font-bold text-blue-400">CustomIP.com</div>
          </div>
          <div className="md:mt-2 text-right md:text-left">
            <div className="opacity-50 text-[10px]">IP_ADDRESS</div>
            <div className="font-bold">1.1.1.242</div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:flex md:flex-col gap-2">
          {ports.map(port => (
            <div key={port.num} className="flex items-center justify-between text-[11px] border border-[#00ff4122] p-1">
              <span className="opacity-70">Port {port.num}</span>
              <span className={`font-bold ${port.status === 'OPEN' ? 'text-green-500' : 'text-red-500'}`}>
                [{port.status}]
              </span>
            </div>
          ))}
        </div>

        <div className="mt-auto hidden md:block">
          <div className="text-[10px] opacity-40 mb-2 leading-tight">
            Hint: It can be good to wait a few seconds after the scan is complete.
          </div>
          <button 
            onClick={() => { setScannedIndices(new Set()); setCurrentScan(0); setIsScanning(true); }}
            className="w-full border border-[#00ff41] py-1 text-[10px] hover:bg-[#00ff41] hover:text-black transition-colors"
          >
            RESCAN TARGET
          </button>
        </div>
      </div>

      {/* Grid Area */}
      <div className="flex-1 flex flex-col overflow-hidden min-h-0">
        <div className="flex justify-between items-center mb-2 shrink-0">
          <div className="text-sm font-bold tracking-widest text-green-400">
            {isScanning ? 'SCANNING_IN_PROGRESS...' : 'SCAN_COMPLETE'}
          </div>
          <div className="text-[10px] opacity-60">BLOCK_INDEX: {currentScan}</div>
        </div>
        
        <div className="flex-1 grid grid-cols-10 grid-rows-11 gap-1 border border-[#00ff4133] p-1 bg-black/30 overflow-y-auto custom-scrollbar">
          {Array.from({ length: 110 }).map((_, i) => (
            <div 
              key={i} 
              className={`border border-[#00ff4111] flex items-center justify-center text-[8px] transition-colors duration-300 ${
                scannedIndices.has(i) ? 'bg-[#00ff4133] border-[#00ff4133]' : ''
              } ${currentScan === i ? 'bg-[#00ff41] text-black animate-pulse' : 'text-[#00ff4144]'}`}
            >
              {i + 1}
            </div>
          ))}
        </div>
        
        {/* Mobile Rescan Button */}
        <button 
            onClick={() => { setScannedIndices(new Set()); setCurrentScan(0); setIsScanning(true); }}
            className="md:hidden mt-2 w-full border border-[#00ff41] py-2 text-[10px] hover:bg-[#00ff41] hover:text-black transition-colors shrink-0"
          >
            RESCAN TARGET
        </button>
      </div>
    </div>
  );
};

export default PortScanner;
