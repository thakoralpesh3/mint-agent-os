# Walkthrough: 24/7 Online Interactive Linux Mint OS Simulator, MintPilot Offline Agent & GitHub Auto-Sync

We have built, verified, and deployed an **Online 24/7 Interactive OS Simulator** on GitHub Pages alongside the complete **MintPilot Linux Mint Operating System & Inbuilt Offline Agent** ecosystem.

---

## 🌐 1. Live 24/7 Online OS Simulator on GitHub Pages

The interactive operating system simulator is deployed and live at:  
👉 **[https://thakoralpesh3.github.io/mint-agent-os/](https://thakoralpesh3.github.io/mint-agent-os/)**

### Interactive Features Available Online 24/7:
- **Authentic Linux Mint Cinnamon Desktop Shell**:
  - Cinnamon bottom panel with functional Start Menu, quick launch icons, live clock, and MintPilot system tray applet.
  - Multi-window manager supporting drag, resize, maximize, minimize to taskbar, and focus.
- **Interactive MintPilot Open WebUI Window**:
  - Live chat with the offline agent.
  - Interactive **⚡ TURBO MODE / 🛡️ SAFE MODE** toggle switch with visual status indicators.
  - Real-time RAM and CPU telemetry gauges.
  - Quick action chips (`Volume 60%`, `Battery`, `Scan Wi-Fi`, `Free RAM`, `Nemo Files`).
- **Interactive Linux Mint Bash Terminal**:
  - Authentic Ubuntu/Mint prompt (`alpesh@mint-agent-os:~$`).
  - Responds to real commands:
    - `mint-agent "<command>"` (e.g. `mint-agent "volume 50%"`, `mint-agent "battery"`)
    - `mint-agent --turbo` (Antigravity-style autonomous execution)
    - `mint-agent --safe` (Guarded execution)
    - `mint-agent --clean-ram`
    - `mint-agent --tier`
    - `neofetch` (displays authentic Linux Mint 22.3 ASCII logo + hardware telemetry)
    - `free -h`, `ls -la`, `whoami`, `help`, `clear`
- **Simulated Firefox Web Browser**:
  - Address bar for entering URLs and simulated page viewing.
- **Simulated Nemo File Manager**:
  - Browsable directory structure (`/home/alpesh`, `/opt/mint-agent`, `Documents`, `Downloads`).
- **Floating HUD Overlay**:
  - Press `Super + Space` anywhere in the browser to summon the floating translucent command bar!

---

## 💻 2. Full Ecosystem Overview

| System | Description | Access / Location |
| :--- | :--- | :--- |
| **🌐 24/7 Online OS Simulator** | Web-based interactive Linux Mint Cinnamon simulator with embedded agent, terminal, browser, and Nemo. | [thakoralpesh3.github.io/mint-agent-os](https://thakoralpesh3.github.io/mint-agent-os/) |
| **🍃 Inbuilt Open WebUI** | Lightweight (<25MB RAM) offline web dashboard with OpenAI API endpoints (`/v1/chat/completions`). | Local port: `http://localhost:8888` |
| **⚡ Turbo vs Safe Mode** | Dual execution policy: Antigravity-style autonomous (Turbo) vs confirmation-required (Safe). | Configurable via WebUI, CLI (`--turbo`), or `settings.json` |
| **🌐 Browser Automation** | Automated URL navigation, tab switching, and memory-efficient DOM text extraction. | [`agent/controllers/browser_control.py`](file:///home/alpesh/mint-agent-os/agent/controllers/browser_control.py) |
| **🖥️ Program Control** | Desktop automation for LibreOffice Writer/Calc, VLC Media Player, Nemo, and Terminal. | [`agent/controllers/program_control.py`](file:///home/alpesh/mint-agent-os/agent/controllers/program_control.py) |
| **🧠 Memory Guard** | Keeps total footprint <35MB RAM, tailored for Linux Mint 2GB-4GB requirements. | [`agent/core/memory_guard.py`](file:///home/alpesh/mint-agent-os/agent/core/memory_guard.py) |
| **💿 OS ISO Remastering** | Remastering suite to build bootable `LinuxMint-AI-Agent-Edition.iso` with QEMU test runner. | [`iso_builder/`](file:///home/alpesh/mint-agent-os/iso_builder/) |
| **🔄 GitHub Live Auto-Sync** | Persistent background daemon auto-committing and pushing all conversation turns and code. | Continuous sync to `thakoralpesh3/mint-agent-os` |

---

## 🧪 Verification & Test Results

### 1. Online Simulator Validation
- Served `docs/` locally via HTTP: tested window dragging, Start Menu, terminal command execution (`neofetch`, `mint-agent --tier`, `free -h`).
- Enabled GitHub Pages on `thakoralpesh3/mint-agent-os` with root `/docs`.
- Verified HTTP status 200 on `https://thakoralpesh3.github.io/mint-agent-os/`.

### 2. Auto-Sync Daemon Validation
- Background daemon actively commits every conversation turn and artifact to `main`.
- All changes are synchronized in real time with GitHub.
