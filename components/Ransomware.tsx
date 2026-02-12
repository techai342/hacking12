
import React, { useState, useEffect } from 'react';

const Ransomware: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(259200); // 3 days in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${d}:${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full h-full bg-black text-[#ff0000] font-sans p-8 flex flex-col items-center justify-center overflow-hidden border-4 border-[#ff000033]">
      <div className="max-w-2xl w-full space-y-8 animate-pulse">
        <h1 className="text-3xl md:text-4xl font-bold text-center tracking-tight mb-12">
          Ooops, your important files are encrypted.
        </h1>

        <div className="space-y-6 text-lg md:text-xl leading-relaxed opacity-90">
          <p>
            If you see this text, but don't see the <span className="text-blue-500 underline">"Wana Decrypt0r"</span> window, 
            then your antivirus removed the decrypt software or you deleted it from your computer.
          </p>

          <p>
            If you need your files you have to run the decrypt software.
          </p>

          <p>
            Please find an application file named <span className="text-blue-500">"@WanaDecryptor@.exe"</span> in 
            any folder or restore from the antivirus quarantine.
          </p>

          <p className="font-bold">
            Run and follow the instructions!
          </p>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4">
          <div className="bg-[#ff000022] border border-[#ff0000] p-4 text-center">
            <div className="text-xs uppercase tracking-widest opacity-60">Payment Will Be Raised On</div>
            <div className="text-3xl font-mono font-bold tracking-tighter mt-1">
              {formatTime(timeLeft)}
            </div>
          </div>
          
          <div className="flex gap-4">
             <button className="px-6 py-2 border border-[#ff0000] hover:bg-[#ff0000] hover:text-black transition-colors text-sm font-bold uppercase">
               Check Payment
             </button>
             <button className="px-6 py-2 border border-[#ff0000] hover:bg-[#ff0000] hover:text-black transition-colors text-sm font-bold uppercase">
               Decrypt
             </button>
          </div>
        </div>
      </div>

      <div className="absolute top-4 left-4 text-[10px] opacity-20 font-mono rotate-1">
        VULNERABILITY_ID: MS17-010 // ETERNALBLUE_CORE
      </div>
      <div className="absolute bottom-4 right-4 text-[10px] opacity-20 font-mono -rotate-1">
        SHADOW_BROKERS_LEAK_DETECTION_POSITIVE
      </div>
    </div>
  );
};

export default Ransomware;
