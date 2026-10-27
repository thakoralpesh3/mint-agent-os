# Implementation Plan: Cinematic Marvel AI Agent Series Upgrade (Iron Man Visor HUD, Stark SFX, Proactive Voice Intercom & Autonomous Multi-Agent Theatre)

Deepen the Marvel Cinematic Universe AI experience across Linux Mint OS, the Python backend CLI, WebUI, and the 24/7 online simulator to fully embody J.A.R.V.I.S., F.R.I.D.A.Y., E.D.I.T.H., V.I.S.I.O.N., and K.A.R.E.N. with authentic audio-visual and autonomous behaviors:
1. **Iron Man Visor HUD (Heads-Up Display)**: An interactive tactical AR Visor with tracking reticles, audio frequency spectrum bars, lock-on target brackets, and real-time telemetry.
2. **Stark Audio FX Synthesizer**: Programmatic sound generator (Web Audio API in browser & zero-dependency Python `wave` in Linux Mint) generating repulsor charges, lock-on beeps, comms chimes, and tactical confirmation tones.
3. **Proactive Cinematic Interventions**: Jarvis and Friday proactively interrupt with vocal warnings when thermal/battery levels fluctuate or rogue sockets appear.
4. **Coordinated Multi-Agent Theatre Protocol**: Interactive multi-agent dialogue sequence where Jarvis, Friday, Edith, Vision, and Karen converse back-and-forth in real-time to neutralize threats.
5. **Linux Mint Cinnamon Desktop Integration**: `Super+J` (Jarvis), `Super+F` (Friday), `Super+E` (Edith), `Super+H` (Stark HUD) keybindings and Arc Reactor desktop applets.

## User Review Required

> [!IMPORTANT]
> The Iron Man Visor HUD can be run inside a windowed application or as a fullscreen tactical AR glass overlay over the desktop. In the online simulator, users can open it from the desktop icon, the Marvel window, or by pressing `H`.

> [!NOTE]
> All sound effects are generated programmatically (zero external MP3/WAV files required). In Linux Mint, a pure-Python PCM audio synthesizer outputs tones directly through PulseAudio/PipeWire (`paplay`/`aplay`). In the browser, the Web Audio API generates authentic sci-fi synthesizers.

---

## Proposed Changes

### Component 1: Stark Sound FX Synthesizer (Python & Browser)

#### [NEW] [`agent/core/stark_sfx.py`](file:///home/alpesh/mint-agent-os/agent/core/stark_sfx.py)
- Zero-dependency pure Python audio synthesizer utilizing `wave`, `math`, and `struct`.
- Synthesizes 5 signature Stark sound effects:
  - `play_repulsor_charge()`: 300Hz -> 1800Hz rising frequency sweep with resonant harmonics.
  - `play_target_lock()`: Dual-tone 2400Hz/3200Hz military targeting chirp.
  - `play_comms_chime()`: Jarvis/Friday 3-chord major arpeggio chime (C5-E5-G5).
  - `play_threat_neutralized()`: Descending tactical confirmation sweep (1200Hz -> 400Hz).
  - `play_alarm_klaxon()`: DEFCON emergency pulse warning.
- Automatically routes output through `paplay` (PulseAudio), `pw-play` (PipeWire), or `aplay` (ALSA). Gracefully bypasses if in headless mode.

---

### Component 2: Iron Man Visor Tactical HUD Overlay

#### [MODIFY] [`docs/index.html`](file:///home/alpesh/mint-agent-os/docs/index.html)
- Add full-screen / windowed **Stark Visor Tactical HUD Overlay** (`#stark-hud-overlay`):
  - HUD curved viewport vignette with futuristic cyan and gold edge meters.
  - Center dynamic mouse-tracking targeting reticle with live Cartesian coordinates and range telemetry.
  - Real-time animated audio spectrum visualizer (16 vibrating equalizer bars responding dynamically when speech is active).
  - Suit / OS Telemetry modules:
    - **Mark 85 Reactor Core**: 8.24 GW • Core Temp: 38°C • Power: 100%
    - **Vocal Intercom**: Active persona wave indicator & live transcript
    - **Tactical Lock-On Brackets**: Hovering over desktop icons and windows renders animated lock-on corners with entity classification (`SYSTEM_CRITICAL`, `NETWORK_GATEWAY`, `WORKSTATION_FILES`)
    - **Stark Protocols Quick Bar**: 1-click execution for Veronica, Instant Kill, House Party, and Clean Slate
  - Top action bar: Toggle Fullscreen HUD, Switch Persona, Trigger Voice Intercom, Exit HUD.

#### [MODIFY] [`docs/js/agent_simulator.js`](file:///home/alpesh/mint-agent-os/docs/js/agent_simulator.js)
- Implement `StarkHUD` subsystem inside `AgentSimulator`:
  - `openStarkHUD()` / `closeStarkHUD()` / `toggleStarkHUD()`
  - `initHUDCanvas()`: Renders interactive HUD reticle, tracking crosshairs, and rotating circular compass bearings.
  - `renderAudioSpectrum()`: Dynamic equalizer canvas showing audio frequency bars when speaking.
  - `playStarkSFX(type)`: Web Audio API programmatic oscillator generator for repulsor, target lock, comms chime, and neutralization tones.
  - Mousemove tracking on HUD canvas for fluid targeting reticle physics.

---

### Component 3: Proactive Autonomous Interventions & Vocal Warnings

#### [MODIFY] [`agent/core/marvel_agents.py`](file:///home/alpesh/mint-agent-os/agent/core/marvel_agents.py)
- Add `check_proactive_interventions(system_telemetry)`:
  - High Memory (>80%): Jarvis warns Tony and recommends `veronica` or `clean_slate`.
  - Wildcard Listening Sockets: Friday issues tactical warning and locks on target.
  - Critical Ingress Probes: Edith reports orbital satellite lock on hostile IP.
  - Unbalanced Resource Allocation: Vision offers philosophical balance analysis.
- Add `get_coordinated_multi_agent_theatre()`:
  - Generates a cinematic 6-step multi-agent dialogue script where Jarvis, Friday, Edith, Vision, and Karen pass context between each other to neutralize an intrusion in real time.

#### [MODIFY] [`agent/cli.py`](file:///home/alpesh/mint-agent-os/agent/cli.py)
- Add `--hud`: Launches terminal Stark Visor HUD with live ASCII reticle and telemetry.
- Add `--theatre` / `--house-party-theatre`: Runs the cinematic multi-agent coordinated live dialogue with authentic spoken voices and sound effects.
- Add `--sfx <sound>`: Plays sound effects from terminal (`repulsor`, `lock`, `chime`, `neutralized`).

---

### Component 4: Linux Mint Cinnamon Desktop Shortcuts & Hotkeys

#### [NEW] [`setup_marvel_desktop.sh`](file:///home/alpesh/mint-agent-os/setup_marvel_desktop.sh)
- Configures Linux Mint Cinnamon desktop hotkeys via `gsettings`:
  - `Super+J` -> Launches J.A.R.V.I.S. Voice / Terminal Governor
  - `Super+F` -> Launches F.R.I.D.A.Y. Tactical Combat Sentries
  - `Super+E` -> Launches E.D.I.T.H. Orbital Tactical Scan
  - `Super+H` -> Launches Stark Visor HUD
- Creates `/usr/share/applications/stark-agents.desktop` with custom category and Stark Industries branding.

---

## Verification Plan

### Automated Tests
1. **Python SFX Synthesizer Test**:
   - Run `python3 agent/core/stark_sfx.py --test` to verify in-memory WAV buffer generation and non-blocking playback.
2. **Coordinated Multi-Agent Theatre Test**:
   - Run `python3 agent/cli.py --theatre` to verify that all 5 agents generate dialogue sequentially with correct accents.
3. **JS Syntax & Bracket Balance Test**:
   - Run python bracket scanner on `docs/js/agent_simulator.js` to ensure zero syntax errors.
4. **Git Sync Verification**:
   - Verify `sync_daemon.py` pushes to GitHub repository.
5. **24/7 Simulator Deployment**:
   - Verify `curl -sI https://thakoralpesh3.github.io/mint-agent-os/` returns HTTP 200.

### Manual Verification
- Open [https://thakoralpesh3.github.io/mint-agent-os/](https://thakoralpesh3.github.io/mint-agent-os/).
- Click the new **`🕶️ Visor HUD`** button or press `H` to enter the full Iron Man HUD.
- Move mouse to test fluid targeting reticle tracking and lock-on brackets.
- Click **"Engage Multi-Agent Theatre"** to hear Jarvis, Friday, Edith, Vision, and Karen converse back-and-forth.
- Click **"Repulsor Charge"** and **"Target Lock"** to hear programmatic Web Audio SFX.
