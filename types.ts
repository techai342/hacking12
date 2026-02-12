
export interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'success' | 'system';
  timestamp: string;
}

export interface WindowState {
  id: string;
  title: string;
  type: 'terminal' | 'process' | 'status' | 'witty-loader' | 'system-failure' | 'world-map' | 'filesystem' | 'port-scanner' | 'skull-matrix' | 'ransomware' | 'bank-interface' | 'system-hud';
  zIndex: number;
  isOpen: boolean;
  x: number;
  y: number;
  isMaximized?: boolean;
}

export enum CommandType {
  HELP = 'help',
  CLEAR = 'clear',
  NMAP = 'nmap',
  SSHNUKE = 'sshnuke',
  WHOAMI = 'whoami',
  STATUS = 'status',
  ASK = 'ask',
  WITTY = 'witty',
  FAIL = 'fail',
  MAP = 'map',
  FILES = 'files',
  SCAN = 'scan',
  SKULL = 'skull',
  RANSOM = 'ransom',
  BANK = 'bank',
  HUD = 'hud',
  OVERRIDE = 'override',
  EXIT = 'exit'
}
