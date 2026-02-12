
import React, { useState, useEffect } from 'react';
import { getWittyResponse } from '../services/geminiService';

const WittyLoader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timer: number;
    if (progress < 100) {
      timer = window.setTimeout(() => {
        // Randomize increment for that "authentic" loading feel
        const inc = Math.floor(Math.random() * 8) + 1;
        setProgress(prev => Math.min(prev + inc, 100));
      }, 150);
    } else if (loading) {
      fetchResponse();
    }
    return () => clearTimeout(timer);
  }, [progress, loading]);

  const fetchResponse = async () => {
    const res = await getWittyResponse();
    setResponse(res);
    setLoading(false);
  };

  const barSegments = 25;
  const activeSegments = Math.floor((progress / 100) * barSegments);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-black p-6 font-mono border-2 border-[#00ff41]">
      {!response ? (
        <>
          <div className="text-4xl md:text-6xl font-bold mb-8 tracking-widest animate-pulse">
            PLEASE WAIT
          </div>
          
          <div className="w-full max-w-md border-4 border-[#00ff41] p-1 relative mb-4">
            <div className="flex h-12 gap-1">
              {Array.from({ length: barSegments }).map((_, i) => (
                <div 
                  key={i} 
                  className={`flex-1 ${i < activeSegments ? 'bg-[#00ff41]' : 'bg-transparent'} border-r border-[#00ff4133] last:border-0`}
                />
              ))}
            </div>
            <div className="absolute right-2 bottom-[-2.5rem] text-3xl font-bold">
              {progress}%
            </div>
          </div>

          <div className="text-xl md:text-2xl mt-12 tracking-wider">
            WITTY RESPONSE LOADING
          </div>
        </>
      ) : (
        <div className="text-center">
          <div className="text-[#00ff4133] text-xs mb-2">SEQUENCE COMPLETE // DATA RETRIEVED</div>
          <div className="text-2xl md:text-3xl text-green-400 border-l-4 border-green-400 pl-4 py-2 italic">
            "{response}"
          </div>
          <button 
            onClick={() => { setProgress(0); setResponse(null); setLoading(true); }}
            className="mt-8 border border-[#00ff41] px-4 py-1 text-sm hover:bg-[#00ff41] hover:text-black transition-colors"
          >
            RE-RUN COMPONENT
          </button>
        </div>
      )}
    </div>
  );
};

export default WittyLoader;
