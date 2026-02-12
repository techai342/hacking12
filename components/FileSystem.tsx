
import React from 'react';

const FOLDERS = [
  "ATTACKS", "DARKSTORE", "DOWNLOADS", "EXAMPLES", "GEN", "GLOBALIS",
  "HACKMS", "HOMECOM", "INTO", "ISLAND", "MATRIX", "REPO",
  "SYSTEM", "TEMP", "ROOT", "XMISSIONS", "CORES", "LOGS"
];

const FileSystem: React.FC = () => {
  return (
    <div className="w-full h-full bg-[#050a05] text-[#00ff41] font-mono p-4 flex flex-col">
      <div className="flex items-center gap-2 border-b border-[#00ff4133] pb-2 mb-4 text-xs">
        <span className="opacity-50">PATH:</span>
        <span className="font-bold">/HOME/root/</span>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
          {FOLDERS.map((folder, idx) => (
            <div key={idx} className="flex flex-col items-center group cursor-pointer">
              <div className="relative mb-1">
                {/* Retro Folder Icon */}
                <svg width="40" height="32" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform group-hover:scale-110">
                  <path d="M0 4C0 1.79086 1.79086 0 4 0H14.5L18.5 4H36C38.2091 4 40 5.79086 40 8V28C40 30.2091 38.2091 32 36 32H4C1.79086 32 0 30.2091 0 28V4Z" fill="#ffcc00" fillOpacity="0.8"/>
                  <path d="M0 8H40V28C40 30.2091 38.2091 32 36 32H4C1.79086 32 0 30.2091 0 28V8Z" fill="#ffcc00"/>
                </svg>
                <div className="absolute top-1 left-1 text-[8px] text-black font-bold opacity-30">{idx + 1}</div>
              </div>
              <span className="text-[10px] text-center font-bold tracking-tighter truncate w-full group-hover:bg-[#00ff41] group-hover:text-black px-1">
                {folder}
              </span>
            </div>
          ))}
          
          {/* Files */}
          <div className="flex flex-col items-center group cursor-pointer opacity-80">
            <div className="w-10 h-10 border border-[#00ff4166] flex items-center justify-center mb-1 group-hover:bg-[#00ff4133]">
              <div className="text-[8px]">.EXE</div>
            </div>
            <span className="text-[10px] text-center font-bold truncate w-full group-hover:bg-[#00ff41] group-hover:text-black">crack.sh</span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 border-t border-[#00ff4133] pt-2 text-[10px] flex justify-between opacity-50">
        <span>19 ITEMS FOUND</span>
        <span>4.2GB FREE</span>
      </div>
    </div>
  );
};

export default FileSystem;
