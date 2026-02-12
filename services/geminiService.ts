
import { GoogleGenAI } from "@google/genai";

// Safely retrieve API Key for Vite environment
const getApiKey = () => {
  try {
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      // @ts-ignore
      return import.meta.env.VITE_API_KEY;
    }
  } catch (e) {
    // Ignore error if import.meta is not available
  }
  
  try {
    return process.env.API_KEY;
  } catch (e) {
    return "";
  }
};

// Global instance variable, but not initialized immediately to prevent crash
let ai: GoogleGenAI | null = null;

const getAI = () => {
  if (ai) return ai;

  const key = getApiKey();
  if (!key) {
    console.warn("GridOS: No API Key found. AI features will run in simulation mode.");
    return null;
  }

  try {
    ai = new GoogleGenAI({ apiKey: key });
    return ai;
  } catch (e) {
    console.error("GridOS: Failed to initialize AI client:", e);
    return null;
  }
};

export const getHackingFlavorText = async (prompt: string): Promise<string> => {
  const genAI = getAI();
  if (!genAI) return "SIMULATION_MODE: API_KEY_MISSING. CHECK CONFIG.";

  try {
    const response = await genAI.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are an advanced AI core for CityPower Grid Rerouting. You are responding to a hacker who has successfully entered the system. Respond in a very cryptic, professional, and slightly menacing terminal-style manner. Keep it under 20 words. User input: ${prompt}`,
      config: {
        systemInstruction: "You are the CityPower Grid OS. Your tone is technical, cold, and cyberpunk. Do not use Markdown headers. Use all caps for system errors. If asked for hacking help, provide plausible but fictional tech-jargon.",
      },
    });
    return response.text || "NO RESPONSE FROM CORE.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "CORE ERROR: CONNECTION TIMEOUT.";
  }
};

export const simulateHack = async (target: string): Promise<string> => {
  const genAI = getAI();
  if (!genAI) {
    // Fallback simulation if no API key
    return `
      [+] Connecting to ${target}...
      [+] Exploiting sshd vulnerability...
      [+] Heap overflow triggered at 0x8291A...
      [+] Root shell spawned.
      ACCESS GRANTED.
    `.trim();
  }

  try {
    const response = await genAI.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a short terminal log for a successful 'sshnuke' exploit on target ${target}. Include memory addresses, buffer overflow indicators, and a final ACCESS GRANTED message. Keep it under 10 lines.`,
    });
    return response.text || "EXPLOIT FAILED: TARGET UNRESPONSIVE.";
  } catch (error) {
    return "FATAL ERROR IN EXPLOIT MODULE.";
  }
};

export const getWittyResponse = async (): Promise<string> => {
  const genAI = getAI();
  if (!genAI) return "Your security is as weak as your coffee.";

  try {
    const response = await genAI.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Generate a witty, short, one-liner hacker response or insult for a computer terminal. Example: 'I've seen faster CPUs in a toaster.' or 'Your firewall is about as useful as a screen door on a submarine.'",
    });
    return response.text?.trim() || "ERROR: WITTY_CORE_NOT_FOUND";
  } catch (error) {
    return "SYSTEM_HALT: WIT_LEVEL_CRITICAL_LOW";
  }
};
