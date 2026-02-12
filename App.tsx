
import React, { useState, useEffect, useRef } from 'react';
import { TerminalLine, WindowState, CommandType } from './types';
import TerminalWindow from './components/TerminalWindow';
import WittyLoader from './components/WittyLoader';
import SystemFailure from './components/SystemFailure';
import WorldMap from './components/WorldMap';
import FileSystem from './components/FileSystem';
import PortScanner from './components/PortScanner';
import SkullMatrix from './components/SkullMatrix';
import Ransomware from './components/Ransomware';
import BankInterface from './components/BankInterface';
import SystemHUD from './components/SystemHUD';
import { getHackingFlavorText, simulateHack } from './services/geminiService';

const INITIAL_WINDOWS: WindowState[] = [
  { id: 'main', title: 'root@grid-node:~', type: 'terminal', zIndex: 10, isOpen: true, x: 100, y: 50 },
  { id: 'status', title: 'SYSTEM_TELEMETRY', type: 'status', zIndex: 5, isOpen: true, x: 780, y: 150 },
  { id: 'ssh', title: 'SSH_EXPLOIT_V1', type: 'process', zIndex: 8, isOpen: false, x: 600, y: 100 },
  { id: 'witty', title: 'WITTY_CORE_LOADER', type: 'witty-loader', zIndex: 15, isOpen: false, x: 250, y: 120 },
  { id: 'failure', title: 'KERNEL_PANIC_DUMP', type: 'system-failure', zIndex: 20, isOpen: false, x: 150, y: 80 },
  { id: 'map', title: 'DARK_SIGNS_NETWORK_MAP', type: 'world-map', zIndex: 25, isOpen: false, x: 80, y: 40 },
  { id: 'files', title: 'FILE_EXPLORER_V4', type: 'filesystem', zIndex: 22, isOpen: false, x: 120, y: 100 },
  { id: 'scanner', title: 'PORT_PROBE_GRID', type: 'port-scanner', zIndex: 28, isOpen: false, x: 400, y: 50 },
  { id: 'skull', title: 'DECRYPT_THREAT_ENTITY', type: 'skull-matrix', zIndex: 30, isOpen: false, x: 200, y: 80 },
  { id: 'ransom', title: 'CRITICAL_SECURITY_NOTICE', type: 'ransomware', zIndex: 35, isOpen: false, x: 180, y: 60 },
  { id: 'bank', title: 'G-GLOBAL_FINANCIAL_NODE', type: 'bank-interface', zIndex: 40, isOpen: false, x: 150, y: 120 },
  { id: 'hud', title: 'SYSTEM_MONITOR_HUD', type: 'system-hud', zIndex: 45, isOpen: false, x: 50, y: 20 }
];

const App: React.FC = () => {
  const [windows, setWindows] = useState<WindowState[]>(INITIAL_WINDOWS);
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: 'GRID OS v4.2 INITIALIZED', type: 'system', timestamp: new Date().toLocaleTimeString() },
    { text: 'Type "help" for a list of commands.', type: 'system', timestamp: new Date().toLocaleTimeString() },
    { text: 'New: "hud" for advanced system telemetry.', type: 'success', timestamp: new Date().toLocaleTimeString() },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [input, setInput] = useState('');
  const [maxZ, setMaxZ] = useState(90);
  const inputRef = useRef<HTMLInputElement>(null);

  const focusWindow = (id: string) => {
    setWindows(prev => prev.map(w => {
      if (w.id === id) {
        return { ...w, zIndex: maxZ + 1, isOpen: true };
      }
      return w;
    }));
    setMaxZ(prev => prev + 1);
  };

  const toggleWindow = (id: string) => {
    setWindows(prev => prev.map(w => {
      if (w.id === id) {
        const nextState = !w.isOpen;
        if (nextState) focusWindow(id);
        return { ...w, isOpen: nextState };
      }
      return w;
    }));
  };

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const cmdLine = input.trim();
    const [cmd, ...args] = cmdLine.toLowerCase().split(' ');
    
    setHistory(prev => [...prev, { text: `root@grid-node:~# ${cmdLine}`, type: 'input', timestamp: new Date().toLocaleTimeString() }]);
    setInput('');
    setIsProcessing(true);

    switch (cmd) {
      case CommandType.HELP:
        setHistory(prev => [...prev, { 
          text: 'AVAILABLE MODULES: nmap, sshnuke, whoami, status, ask, witty, map, files, scan, skull, ransom, bank, hud, fail, clear, exit', 
          type: 'output', 
          timestamp: new Date().toLocaleTimeString() 
        }]);
        break;
      
      case CommandType.CLEAR:
        setHistory([]);
        break;

      case CommandType.FAIL:
        setHistory(prev => [...prev, { text: 'CRITICAL ERROR: TRIGGERING SYSTEM FAILURE SIMULATION...', type: 'error', timestamp: new Date().toLocaleTimeString() }]);
        toggleWindow('failure');
        break;

      case CommandType.MAP:
        toggleWindow('map');
        break;

      case CommandType.FILES:
        toggleWindow('files');
        break;

      case CommandType.SCAN:
        toggleWindow('scanner');
        break;

      case CommandType.SKULL:
        setHistory(prev => [...prev, { text: 'Bypassing neuro-encryption... rendering entity silhouette...', type: 'system', timestamp: new Date().toLocaleTimeString() }]);
        toggleWindow('skull');
        break;

      case CommandType.RANSOM:
        setHistory(prev => [...prev, { text: 'SIMULATING ENCRYPTION ATTACK...', type: 'error', timestamp: new Date().toLocaleTimeString() }]);
        toggleWindow('ransom');
        break;

      case CommandType.BANK:
        setHistory(prev => [...prev, { text: 'Establishing secure link to financial node...', type: 'system', timestamp: new Date().toLocaleTimeString() }]);
        toggleWindow('bank');
        break;

      case CommandType.HUD:
        setHistory(prev => [...prev, { text: 'Initializing system monitoring HUD...', type: 'system', timestamp: new Date().toLocaleTimeString() }]);
        toggleWindow('hud');
        break;

      case CommandType.WITTY:
        toggleWindow('witty');
        break;

      case CommandType.SSHNUKE:
        const ip = args[0] || '192.168.1.104';
        setHistory(prev => [...prev, { text: `Executing sshnuke exploit on ${ip}...`, type: 'system', timestamp: new Date().toLocaleTimeString() }]);
        const hackLog = await simulateHack(ip);
        setHistory(prev => [...prev, { text: hackLog, type: 'success', timestamp: new Date().toLocaleTimeString() }]);
        focusWindow('ssh');
        break;

      case CommandType.STATUS:
        focusWindow('status');
        break;

      case CommandType.ASK:
        const question = args.join(' ');
        if (!question) {
          setHistory(prev => [...prev, { text: 'QUERY REQUIRED.', type: 'error', timestamp: new Date().toLocaleTimeString() }]);
        } else {
          const answer = await getHackingFlavorText(question);
          setHistory(prev => [...prev, { text: `CORE: ${answer}`, type: 'output', timestamp: new Date().toLocaleTimeString() }]);
        }
        break;

      default:
        setHistory(prev => [...prev, { text: `UNKNOWN COMMAND: ${cmd}`, type: 'error', timestamp: new Date().toLocaleTimeString() }]);
        break;
    }

    setIsProcessing(false);
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden flex flex-col md:flex-row bg-black text-[#00ff41] select-none font-mono">
      
      {/* RESPONSIVE NAVIGATION (Sidebar on desktop, Bottom Bar on mobile) */}
      <div className="order-last md:order-first md:w-16 w-full md:h-full h-16 border-t md:border-t-0 md:border-r border-[#00ff4133] bg-[#000a00] flex flex-row md:flex-col items-center md:py-4 py-0 md:space-y-4 space-x-4 md:space-x-0 overflow-x-auto md:overflow-visible px-4 md:px-0 z-[3000]">
        {[
          { id: 'main', icon: 'T', label: 'Terminal' },
          { id: 'hud', icon: '📊', label: 'Dashboard' },
          { id: 'files', icon: '📁', label: 'Storage' },
          { id: 'scanner', icon: '📡', label: 'Scanner' },
          { id: 'bank', icon: '💰', label: 'Bank' },
          { id: 'skull', icon: '💀', label: 'Threat Entity' },
          { id: 'ransom', icon: '☣', label: 'Ransomware' },
          { id: 'map', icon: 'M', label: 'Network Map' },
          { id: 'status', icon: 'S', label: 'Status' },
          { id: 'witty', icon: 'W', label: 'Witty' },
          { id: 'failure', icon: 'F', label: 'Failure' },
          { id: 'ssh', icon: 'X', label: 'SshNuke' }
        ].map(item => (
          <button
            key={item.id}
            onClick={() => toggleWindow(item.id)}
            className={`flex-shrink-0 w-10 h-10 border flex items-center justify-center transition-all duration-200 hover:bg-[#00ff41] hover:text-black group relative ${
              windows.find(w => w.id === item.id)?.isOpen ? 'bg-[#00ff4133] border-[#00ff41]' : 'border-[#00ff4166]'
            }`}
          >
            <span className="font-bold">{item.icon}</span>
            {/* Tooltip only visible on desktop hover */}
            <div className="hidden md:block absolute left-14 bg-black border border-[#00ff41] text-[10px] px-2 py-1 opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none z-10 shadow-lg">
              {item.label.toUpperCase()}
            </div>
          </button>
        ))}
        <div className="hidden md:flex flex-1"></div>
        <div className="hidden md:block text-[10px] origin-center -rotate-90 opacity-40 mb-8 whitespace-nowrap">GRID_OS_SYSTEM</div>
      </div>

      {/* MAIN DESKTOP AREA */}
      <div className="flex-1 relative overflow-hidden flex flex-col">
        
        {/* Mobile Status Bar (Top) */}
        <div className="md:hidden h-8 bg-[#000a00] flex justify-between items-center px-4 text-[10px] z-[2000] border-b border-[#00ff4133] shrink-0">
          <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500"></div> LINKED</span>
          <span className="font-bold">GRID_OS_MOBILE</span>
          <span>{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        </div>

        {/* Background Decorative Grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#00ff41 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        {/* Windows Layer */}
        <div className="flex-1 relative overflow-hidden">
          {windows.map(win => (
            win.isOpen && (
              <TerminalWindow 
                key={win.id} 
                window={win} 
                onFocus={() => focusWindow(win.id)}
                onClose={() => setWindows(prev => prev.map(w => w.id === win.id ? { ...w, isOpen: false } : w))}
              >
                {win.id === 'main' && (
                  <div className="h-full flex flex-col">
                    <div className="flex-1 overflow-y-auto mb-2 p-3 custom-scrollbar">
                      {history.map((line, idx) => (
                        <div key={idx} className={`mb-1 leading-tight text-sm break-words ${
                          line.type === 'error' ? 'text-red-500' : 
                          line.type === 'success' ? 'text-green-400 font-bold' : 
                          line.type === 'system' ? 'text-yellow-600' : ''
                        }`}>
                          <span className="opacity-30 text-[9px] mr-2 italic">[{line.timestamp}]</span>
                          {line.text}
                        </div>
                      ))}
                      {isProcessing && <div className="animate-pulse">_ EXEC_CMD_ASYNC...</div>}
                    </div>
                    <form onSubmit={handleCommand} className="flex items-center p-2 border-t border-[#00ff4133] bg-black">
                      <span className="mr-2 text-green-400 font-bold text-xs">#</span>
                      <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 bg-transparent border-none outline-none text-[#00ff41] text-sm caret-[#00ff41] min-w-0"
                        autoFocus
                      />
                    </form>
                  </div>
                )}
                {win.id === 'status' && (
                  <div className="p-4 space-y-4">
                    <div className="flex justify-between text-xs border-b border-[#00ff4122] pb-1">
                      <span>CORE_TEMPERATURE</span><span className="text-red-400">72°C</span>
                    </div>
                    <div className="flex justify-between text-xs border-b border-[#00ff4122] pb-1">
                      <span>GRID_LOAD</span><span className="text-yellow-400">88%</span>
                    </div>
                    <div className="h-4 w-full bg-[#00ff4111] border border-[#00ff4144] p-[1px]">
                      <div className="h-full bg-[#00ff41] animate-[pulse_1s_infinite]" style={{ width: '88%' }}></div>
                    </div>
                    <div className="text-[10px] opacity-60">CPU_ARCH: XN-882 OMEGA_CORE</div>
                  </div>
                )}
                {win.id === 'ssh' && (
                  <div className="p-4 text-xs font-mono text-red-500 overflow-y-auto h-full">
                    <div className="font-bold mb-2">/usr/bin/sshnuke 192.168.1.104</div>
                    <div>[*] Connecting to target...</div>
                    <div>[*] Sending buffer overflow string...</div>
                    <div>[*] Attempting to overwrite EIP...</div>
                    <div className="text-green-500 font-bold mt-2">SUCCESS: ROOT SHELL OBTAINED.</div>
                    <div className="mt-1"># id</div>
                    <div className="mt-1">uid=0(root) gid=0(root) groups=0(root)</div>
                    <div className="animate-pulse mt-2"># _</div>
                  </div>
                )}
                {win.id === 'witty' && <WittyLoader />}
                {win.id === 'failure' && <SystemFailure />}
                {win.id === 'map' && <WorldMap />}
                {win.id === 'files' && <FileSystem />}
                {win.id === 'scanner' && <PortScanner />}
                {win.id === 'skull' && <SkullMatrix />}
                {win.id === 'ransom' && <Ransomware />}
                {win.id === 'bank' && <BankInterface />}
                {win.id === 'hud' && <SystemHUD />}
              </TerminalWindow>
            )
          ))}
        </div>

        {/* Desktop Status Bar (Bottom) */}
        <div className="hidden md:flex fixed bottom-0 left-16 right-0 h-6 bg-[#000a00] justify-between items-center px-4 text-[10px] z-[2000] border-t border-[#00ff4133]">
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500"></div> LINK_ESTABLISHED</span>
            <span className="opacity-40">SESSION_ID: 0x82A1B</span>
          </div>
          <div className="flex space-x-6">
            <span>{new Date().toLocaleTimeString()}</span>
            <span className="text-[#00ff41] font-bold">GRID_OS_CORE_CONNECTED</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default App;
