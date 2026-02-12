
import React, { useEffect, useRef } from 'react';

const SkullMatrix: React.FC = () => {
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

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = new Array(columns).fill(1);

    // Simplified Skull Shape Bitmask (roughly 20x20)
    const skullMask = [
      "      XXXXXXXX      ",
      "    XXXXXXXXXXXX    ",
      "   XXXXXXXXXXXXXX   ",
      "  XXXXXXXXXXXXXXXX  ",
      "  XXXXXXXXXXXXXXXX  ",
      "  XX  XXXXXXXX  XX  ",
      "  XX  XXXXXXXX  XX  ",
      "  XXXXXXXXXXXXXXXX  ",
      "   XXXXXXXXXXXXXX   ",
      "    XXXXXXXXXXXX    ",
      "     XXXXXXXXXX     ",
      "      XXXXXXXX      ",
      "      XX XX XX      ",
      "      XX XX XX      ",
      "      XXXXXXXX      "
    ];

    const isInsideSkull = (x: number, y: number) => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      const maskW = skullMask[0].length * fontSize;
      const maskH = skullMask.length * fontSize;
      
      const relX = Math.floor((x - (centerX - maskW / 2)) / fontSize);
      const relY = Math.floor((y - (centerY - maskH / 2)) / fontSize);

      if (relY >= 0 && relY < skullMask.length && relX >= 0 && relX < skullMask[0].length) {
        return skullMask[relY][relX] === 'X';
      }
      return false;
    };

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        
        const inSkull = isInsideSkull(x, y);
        
        // Character choice
        const text = Math.random() > 0.5 ? "0" : "1";
        
        ctx.font = `${fontSize}px VT323`;
        
        if (inSkull) {
          ctx.fillStyle = '#00FF41';
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#00FF41';
        } else {
          ctx.fillStyle = '#003300';
          ctx.shadowBlur = 0;
        }

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
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
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute top-2 left-2 text-[10px] text-[#00ff41] opacity-40 font-mono pointer-events-none">
        DECRYPTING_BIO_SIGNATURE... [OK]<br/>
        INJECTING_PAYLOAD... [OK]<br/>
        BYPASSING_NEURAL_LINK... [OK]
      </div>
      <div className="absolute bottom-2 right-2 text-[10px] text-red-500 opacity-60 font-mono animate-pulse pointer-events-none">
        WARNING: TRACE_DETECTED
      </div>
    </div>
  );
};

export default SkullMatrix;
