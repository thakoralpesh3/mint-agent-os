# Implementation Plan: 24/7 Online Interactive Linux Mint OS Simulator on GitHub

This plan outlines the architecture and deployment of a 24/7 online, interactive **Linux Mint AI Agent OS Simulator** hosted directly on GitHub Pages (`https://thakoralpesh3.github.io/mint-agent-os/`), allowing anyone worldwide to preview, interact with, and test the operating system, the MintPilot agent, and Open WebUI directly from their web browser.

---

## User Review Required

> [!IMPORTANT]
> **GitHub Pages 24/7 Hosting Architecture**:
> - We will host the interactive OS simulator using **GitHub Pages** (via the `/docs` directory and GitHub Actions).
> - **Zero Server Maintenance / 100% Free 24/7 Uptime**: Runs entirely on GitHub's global CDN with zero hosting fees, no server maintenance, and guaranteed 24/7 availability.
> - **Interactive Desktop Fidelity**: Simulates the authentic Linux Mint Cinnamon desktop environment, complete with functional windows, Start Menu, taskbar, interactive Bash terminal (`mint-agent`), embedded Open WebUI, Firefox browser, Nemo file manager, and floating HUD overlay (`Super + Space`).

---

## Architecture Overview

```mermaid
graph TD
    subgraph GitHub Cloud (24/7 Hosting)
        Repo["GitHub: thakoralpesh3/mint-agent-os"] --> PagesWorkflow["GitHub Pages Engine (/docs)"]
        PagesWorkflow --> PublicURL["https://thakoralpesh3.github.io/mint-agent-os/ (24/7 Global Access)"]
    end

    subgraph Online OS Simulator (docs/)
        PublicURL --> DesktopUI["Linux Mint Cinnamon Desktop Shell"]
        
        DesktopUI --> CinnamonPanel["Taskbar, Start Menu, System Tray, MintPilot Applet"]
        DesktopUI --> WindowManager["Interactive Draggable/Resizable Window Manager"]
        
        WindowManager --> AppWebUI["MintPilot Open WebUI Window (Turbo/Safe Switch, Chat)"]
        WindowManager --> AppTerm["Interactive Bash Terminal (mint-agent CLI, neofetch, system commands)"]
        WindowManager --> AppBrowser["Firefox Browser Simulator"]
        WindowManager --> AppNemo["Nemo File Manager Simulator"]
        WindowManager --> AppHUD["Translucent Floating HUD Overlay (Super+Space)"]
        
        DesktopUI --> SimulationEngine["Offline Agent & OS Cognitive Simulation Engine"]
    end
```

---

## Proposed Changes

### 1. Online OS Simulator Web Application (`docs/`)

#### [NEW] [docs/index.html](file:///home/alpesh/mint-agent-os/docs/index.html)
- Main entry point for the online 24/7 OS simulator.
- Responsive HTML5 desktop workspace featuring:
  - Linux Mint Cinnamon desktop wallpaper and theme.
  - Desktop icon grid: MintPilot WebUI, Terminal, Nemo Files, Firefox, LibreOffice, Settings.
  - Cinnamon bottom panel with Start Menu, quick launch icons, clock/calendar, and MintPilot system tray applet.
  - Draggable, resizable, stackable window manager.
  - Global hotkey listener: pressing `Super + Space` summons the floating HUD overlay.

#### [NEW] [docs/css/cinnamon.css](file:///home/alpesh/mint-agent-os/docs/css/cinnamon.css)
- Pixel-perfect CSS replicating Linux Mint 22.3 Cinnamon styling:
  - Dark slate Cinnamon window borders, Mint green accents (`#87cf3e` / `#2ecc71`).
  - Window controls (minimize, maximize, close buttons).
  - Translucent taskbar, glowing system tray badges, and Start Menu animations.

#### [NEW] [docs/js/desktop.js](file:///home/alpesh/mint-agent-os/docs/js/desktop.js)
- Desktop state and window manager:
  - Window dragging, snapping, focusing, minimizing to panel, maximizing, and closing.
  - Taskbar application tabs and Start Menu popup toggle.
  - Clock and system tray status updater.

#### [NEW] [docs/js/agent_simulator.js](file:///home/alpesh/mint-agent-os/docs/js/agent_simulator.js)
- Interactive simulation engine:
  - **Open WebUI**: Full simulated chat with MintPilot, Turbo vs Safe mode toggle, hardware telemetry gauges, and quick action chips.
  - **Bash Terminal**: Interactive shell responding to `mint-agent "<prompt>"`, `mint-agent --turbo`, `neofetch`, `free -h`, `ls`, `help`, `cat`.
  - **Browser & Nemo**: Simulated web browsing and directory exploration.

---

### 2. GitHub Pages Deployment & Automation

#### [NEW] [.github/workflows/deploy-pages.yml](file:///home/alpesh/mint-agent-os/.github/workflows/deploy-pages.yml)
- GitHub Actions workflow that automatically verifies and deploys the simulator on every push to `main`.

#### [MODIFY] [README.md](file:///home/alpesh/mint-agent-os/README.md)
- Prominently feature the **Live 24/7 Online OS Simulator** link and badge at the top of the repository.

---

## Verification Plan

### Automated Tests
1. **Local Web Server Test**:
   - Serve `docs/` locally via `python3 -m http.server 9000`.
   - Test loading desktop UI, opening windows, and executing terminal commands.
2. **GitHub Pages Provisioning**:
   - Enable GitHub Pages on repository via GitHub API (`gh api`).
   - Push simulator to `main` branch.
   - Verify HTTP 200 response from `https://thakoralpesh3.github.io/mint-agent-os/`.

### Manual Verification
- Test dragging windows, opening the Start Menu, toggling Turbo Mode, and typing commands into the simulated terminal.
