
# GridOS v4.2 - Cyberpunk Terminal Simulator

![GridOS Banner](https://via.placeholder.com/1200x400/000000/00ff41?text=GRID_OS_SYSTEM_ONLINE)

> "The net is vast and infinite."

**GridOS** is a high-fidelity, React-based terminal simulation designed to replicate the experience of a cyberpunk hacking interface. It features a fully responsive layout, interactive CLI commands, real-time AI responses powered by Google Gemini, and immersive visual effects (CRT scanlines, flicker).

## 🚀 Live Demo

Access the terminal here: **[Insert Your Netlify URL Here]**

## ✨ Features

- **Interactive Terminal**: Full command-line interface with history, authentic typing effects, and error handling.
- **AI Integration**: Powered by Google Gemini (`gemini-3-flash-preview`) to generate witty hacker retorts and simulate exploits.
- **Visuals**: CRT monitor effects, scanlines, text glow, and retro typography.
- **Modules**:
  - `sshnuke`: Simulate server exploitation.
  - `map`: Interactive global network tracing map.
  - `bank`: Offshore financial dashboard.
  - `hud`: Real-time system telemetry.
  - `skull`: Decryption visualization.
  - `witty`: AI-generated insults and hacker jargon.
- **PWA Ready**: Installable as a native app on mobile and desktop.
- **Responsive**: Adapts from desktop battle-stations to mobile field decks.

## 🛠 Tech Stack

- **Core**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS
- **AI**: @google/genai SDK
- **Deployment**: Netlify / Vercel

## 🔧 Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/gridos.git
    cd gridos
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment**
    Create a `.env` file in the root directory:
    ```env
    VITE_API_KEY=your_google_gemini_api_key
    ```

4.  **Run Development Server**
    ```bash
    npm run dev
    ```

5.  **Build for Production**
    ```bash
    npm run build
    ```

## 📱 Mobile Installation (PWA)

1.  Navigate to the site on your mobile browser (Chrome/Safari).
2.  Tap **Share** (iOS) or **Menu** (Android).
3.  Select **"Add to Home Screen"**.
4.  Launch GridOS in full-screen immersive mode.

## 🤖 Commands

| Command | Description |
| :--- | :--- |
| `help` | List available modules |
| `sshnuke [ip]` | Attempt root exploit on target IP |
| `map` | Open global network tracker |
| `bank` | Access offshore accounts |
| `scan` | Initiate port scanning sequence |
| `ask [query]` | Ask the AI Core a question |
| `witty` | Generate random hacker quote |
| `fail` | Trigger kernel panic simulation |

## 📄 License

MIT License. Use responsibly. Unauthorized access to real mainframes is a federal crime.

---

*System Monitor: ONLINE* // *Connection: SECURE*
