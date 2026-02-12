
import React, { useEffect, useRef } from 'react';

const SystemFailure: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    
    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const columns = Math.floor(canvas.width / 20);
    const drops: number[] = new Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0';
      ctx.font = '15px VT323';

      for (let i = 0; i < drops.length; i++) {
        // Random numbers/characters
        const text = Math.floor(Math.random() * 10).toString();
        ctx.fillText(text, i * 20, drops[i] * 20);

        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-full bg-black overflow-hidden flex items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0 opacity-40" />
      
      <div className="relative z-10 border-4 border-[#00ff41] bg-black p-8 shadow-[0_0_50px_rgba(0,255,65,0.5)] flex flex-col items-center">
        <div className="text-6xl md:text-8xl font-bold tracking-tighter text-[#00ff41] animate-pulse">
          SYSTEM FAILURE
        </div>
        <div className="mt-4 text-[#00ff41] text-xs opacity-60 tracking-[0.5em]">
          CRITICAL KERNEL PANIC // ADDRESS_OUT_OF_BOUNDS
        </div>
        <div className="mt-8 flex gap-4">
          <div className="h-4 w-4 bg-[#00ff41] animate-ping"></div>
          <div className="h-4 w-4 bg-[#00ff41] animate-ping [animation-delay:0.2s]"></div>
          <div className="h-4 w-4 bg-[#00ff41] animate-ping [animation-delay:0.4s]"></div>
        </div>
      </div>
    </div>
  );
};

export default SystemFailure;
