
import React, { useState, useRef, useEffect } from 'react';
import { WindowState } from '../types';

interface TerminalWindowProps {
  window: WindowState;
  children: React.ReactNode;
  onFocus: () => void;
  onClose: () => void;
}

const TerminalWindow: React.FC<TerminalWindowProps> = ({ window: win, children, onFocus, onClose }) => {
  const [pos, setPos] = useState({ x: win.x, y: win.y });
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dragRef = useRef<{ offsetX: number; offsetY: number } | null>(null);

  // Check for mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    onFocus();
    if (!isMobile && (e.target as HTMLElement).classList.contains('window-header')) {
      setIsDragging(true);
      dragRef.current = {
        offsetX: e.clientX - pos.x,
        offsetY: e.clientY - pos.y
      };
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && dragRef.current) {
        setPos({
          x: e.clientX - dragRef.current.offsetX,
          y: e.clientY - dragRef.current.offsetY
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      dragRef.current = null;
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const getDimensions = () => {
    if (isMobile) {
      // Mobile dimensions are percentage based or fixed to viewport minus padding
      return { w: '94%', h: '85%' };
    }

    switch(win.type) {
      case 'terminal': return { w: '650px', h: '450px' };
      case 'witty-loader': return { w: '500px', h: '400px' };
      case 'system-failure': return { w: '800px', h: '550px' };
      case 'world-map': return { w: '850px', h: '500px' };
      case 'status': return { w: '300px', h: '250px' };
      case 'filesystem': return { w: '550px', h: '400px' };
      case 'port-scanner': return { w: '700px', h: '450px' };
      case 'skull-matrix': return { w: '600px', h: '600px' };
      case 'bank-interface': return { w: '750px', h: '450px' };
      case 'system-hud': return { w: '950px', h: '600px' };
      default: return { w: '400px', h: '300px' };
    }
  };

  const { w, h } = getDimensions();

  // Mobile position override
  const finalX = isMobile ? '3%' : pos.x;
  const finalY = isMobile ? '5%' : pos.y;
  
  // Mobile dragging is disabled to prevent scroll conflicts
  const dragCursor = isMobile ? 'default' : 'move';

  return (
    <div
      className="absolute border border-[#00ff41] bg-black shadow-[0_0_20px_rgba(0,255,65,0.2)] flex flex-col transition-all duration-200"
      style={{
        left: finalX,
        top: finalY,
        zIndex: win.zIndex,
        width: w,
        height: h,
        maxWidth: '100vw',
        maxHeight: '90vh' // Ensure it doesn't cover nav bar on mobile
      }}
      onMouseDown={onFocus}
    >
      {/* Header */}
      <div 
        className="window-header h-7 bg-[#00ff41] text-black px-2 flex justify-between items-center select-none text-[11px] font-bold shrink-0"
        style={{ cursor: dragCursor }}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2 pointer-events-none truncate mr-2">
          <div className="w-3 h-3 border border-black flex items-center justify-center font-mono">+</div>
          <span className="truncate">{win.title.toUpperCase()}</span>
        </div>
        <div className="flex gap-2 shrink-0">
          <button className="hover:bg-white/20 w-4 h-4 flex items-center justify-center">_</button>
          <button 
            onClick={(e) => { e.stopPropagation(); onClose(); }} 
            className="hover:bg-red-600 w-4 h-4 flex items-center justify-center transition-colors border border-black/20"
          >
            ×
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden bg-[rgba(0,5,0,0.95)] relative">
        <div className="absolute inset-0 pointer-events-none border border-[#00ff4122]"></div>
        {children}
      </div>
    </div>
  );
};

export default TerminalWindow;
