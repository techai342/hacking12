
import React, { useState, useEffect, useRef } from 'react';

const SystemHUD: React.FC = () => {
  const [cpuData, setCpuData] = useState<number[]>(new Array(20).fill(0));
  const [netData, setNetData] = useState<number[]>(new Array(20).fill(0));

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuData(prev => [...prev.slice(1), Math.floor(Math.random() * 60) + 20]);
      setNetData(prev => [...prev.slice(1), Math.floor(Math.random() * 40) + 10]);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const MiniGraph = ({ data, color }: { data: number[], color: string }) => (
    <div className="flex items-end gap-[1px] h-12 w-full bg-black/40 border border-[#00d4ff22] p-1">
      {data.map((val, i) => (
        <div 
          key={i} 
          className="flex-1 transition-all duration-500" 
          style={{ height: `${val}%`, backgroundColor: color }}
        />
      ))}
    </div>
  );

  return (
    <div className="w-full h-full bg-[#02080a] text-[#00d4ff] font-mono p-4 flex flex-col gap-4 overflow-y-auto md:overflow-hidden select-none custom-scrollbar">
      {/* Top Bar Stats */}
      <div className="flex justify-between items-start border-b border-[#00d4ff33] pb-2 text-[10px] shrink-0">
        <div className="flex gap-2 md:gap-6 flex-col md:flex-row">
          <div>
            <span className="opacity-50">HOST:</span> <span className="font-bold">OBSIDIAN-NODE-X</span>
          </div>
          <div>
            <span className="opacity-50">OS:</span> <span className="font-bold">GRID_OS v4.2 PRO</span>
          </div>
        </div>
        <div className="text-right">
          <span className="opacity-50">UPTIME:</span> <span className="font-bold tracking-widest">02:49:35:12</span>
        </div>
      </div>

      {/* Main Grid: Single column on mobile, 12-col on desktop */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 pb-4 md:pb-0">
        
        {/* Left Column - System Monitors */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <div className="border border-[#00d4ff44] bg-[#00d4ff08] p-2">
            <div className="text-[10px] font-bold mb-2 flex justify-between">
              <span>CPU_LOAD_CORE_01</span>
              <span className="text-[#00d4ff]">{cpuData[19]}%</span>
            </div>
            <MiniGraph data={cpuData} color="#00d4ff" />
            <div className="text-[8px] mt-1 opacity-40">INTEL_CORE_I9_EQUIVALENT // VIRTUALIZED</div>
          </div>

          <div className="border border-[#00d4ff44] bg-[#00d4ff08] p-2">
            <div className="text-[10px] font-bold mb-2 flex justify-between">
              <span>NETWORK_TRAFFIC_UP</span>
              <span className="text-blue-400">{netData[19]} KB/S</span>
            </div>
            <MiniGraph data={netData} color="#60a5fa" />
          </div>

          <div className="flex-1 border border-[#00d4ff22] p-2 relative overflow-hidden min-h-[100px]">
             <div className="text-[10px] opacity-40 mb-2">TORRENT_QUEUE</div>
             <div className="space-y-2">
               {[
                 { name: 'slackware64-14.0.iso', p: 1.6, speed: '18.02 MB/s' },
                 { name: 'BT5R3-GNOME-32', p: 0.1, speed: '7.52 MB/s' },
                 { name: 'pmagic_2013_09_26.iso', p: 10.6, speed: '4.39 MB/s' }
               ].map((t, i) => (
                 <div key={i} className="text-[9px]">
                   <div className="flex justify-between mb-1">
                     <span className="truncate w-32">{t.name}</span>
                     <span>{t.p}%</span>
                   </div>
                   <div className="w-full h-1 bg-white/5">
                     <div className="h-full bg-blue-500" style={{ width: `${t.p}%` }}></div>
                   </div>
                   <div className="text-[8px] opacity-30 mt-1">{t.speed}</div>
                 </div>
               ))}
             </div>
          </div>
        </div>

        {/* Center - Visualization & Watermark */}
        <div className="md:col-span-5 flex flex-col items-center justify-center relative md:border-x border-[#00d4ff11] py-4 md:py-0">
          <div className="hidden md:block absolute top-4 left-4 text-[8px] opacity-20 max-w-[150px]">
             MEMORY_MAP_0x00FF82: DATA_STREAM_CORRUPTED. RETRYING_PACKET_HANDSHAKE_WITH_GATEWAY_NODE_CH_7...
          </div>
          
          <div className="text-5xl md:text-7xl font-bold opacity-10 tracking-widest pointer-events-none mb-8">THINK</div>
          
          <div className="relative w-32 h-32 md:w-48 md:h-48">
            {/* Animated Circular HUD */}
            <div className="absolute inset-0 border border-[#00d4ff44] rounded-full animate-[spin_10s_linear_infinite]"></div>
            <div className="absolute inset-2 border border-[#00d4ff22] rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-xs opacity-50">SECURE</div>
                <div className="text-xl font-bold">ALPHA-1</div>
              </div>
            </div>
            {/* Radar Sweep */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#00d4ff22] to-transparent rounded-full animate-[spin_4s_linear_infinite]"></div>
          </div>
          
          <div className="mt-8 grid grid-cols-2 gap-4 w-full px-4">
             <div className="p-2 border border-[#00d4ff22] text-center">
               <div className="text-[8px] opacity-50 uppercase">RAM_USAGE</div>
               <div className="text-lg font-bold">41%</div>
             </div>
             <div className="p-2 border border-[#00d4ff22] text-center">
               <div className="text-[8px] opacity-50 uppercase">SWAP_FILE</div>
               <div className="text-lg font-bold">12%</div>
             </div>
          </div>
        </div>

        {/* Right Column - System Details */}
        <div className="md:col-span-3 flex flex-col gap-4">
           <div className="p-2 bg-[#00d4ff05] border border-[#00d4ff22]">
             <div className="text-[10px] font-bold mb-1">STORAGE_STATUS</div>
             <div className="space-y-1">
               <div className="flex justify-between text-[9px]">
                 <span>DRIVE C:</span>
                 <span>72%</span>
               </div>
               <div className="w-full h-1 bg-white/10">
                 <div className="h-full bg-cyan-400" style={{ width: '72%' }}></div>
               </div>
               <div className="flex justify-between text-[9px] mt-2">
                 <span>DRIVE D:</span>
                 <span>12%</span>
               </div>
               <div className="w-full h-1 bg-white/10">
                 <div className="h-full bg-cyan-400" style={{ width: '12%' }}></div>
               </div>
             </div>
           </div>

           <div className="p-2 border border-[#00d4ff22] text-[9px] flex-1 min-h-[150px]">
             <div className="font-bold text-[#00d4ff] mb-2">NETWORK_CONFIG</div>
             <div className="space-y-1 opacity-70">
               <div>LAN IP: 192.168.33.124</div>
               <div>WAN IP: 82.121.2.45</div>
               <div>DNS_01: 8.8.8.8</div>
               <div>GATEWAY: 192.168.33.1</div>
               <div>PROXY: ACTIVE [SWISS_09]</div>
             </div>
             
             <div className="mt-4 border-t border-[#00d4ff22] pt-2">
               <div className="font-bold mb-1">SYS_LOGS</div>
               <div className="text-[8px] opacity-40 leading-tight">
                 [14:22:01] USB_DEVICE_CONNECTED: 'ThinkPad_Controller'<br/>
                 [14:25:55] LOGIN_SUCCESS: 'ROOT'<br/>
                 [14:29:12] SERVICE_RESTART: 'NTP_CLIENT'<br/>
               </div>
             </div>
           </div>

           <div className="text-right mt-auto hidden md:block">
             <div className="text-[40px] leading-none font-bold opacity-20">23</div>
             <div className="text-[10px] font-bold opacity-40 uppercase">November // Saturday</div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SystemHUD;
