# Implementation Plan: Mobile Remote Access to PC (Antigravity-Style)

Provides Aradhya AI Agent OS with **mobile companion remote access**, allowing users to securely control their Linux Mint PC from any smartphone (iOS Safari / Android Chrome) over local Wi-Fi or secure tunnels, modeled after modern developer agent remote access (Google Antigravity).

## User Review Required

> [!IMPORTANT]
> **Zero Cloud Dependency & Low-RAM Compatibility**:
> The remote access subsystem runs directly on the local PC via the embedded Python HTTP/WebSocket server (`webui/server.py`) and standard library Python without requiring external cloud accounts or third-party servers. It consumes **<12MB RAM**, fully respecting our 1GB RAM PC budget.

> [!TIP]
> **Authentication & Pairing Security**:
> - **Dual-Layer Pairing**: Generates an ASCII terminal QR code + web QR code alongside an ephemeral **6-digit PIN** (`482-910`) and cryptographically signed token (`tok_...`).
> - **Brute-Force Lockout**: 5 failed PIN attempts trigger automatic 15-minute IP quarantine via `SecurityGuardian`.
> - **Safe Mode Mobile Approvals**: When the PC is in Safe Mode and a sensitive terminal or system command is requested, a push card appears on the phone screen allowing one-tap **[✓ Approve]** or **[✗ Reject]**.

---

## Proposed Changes

### Component 1: Remote Access Manager (`agent/remote/`)

#### [NEW] [remote_manager.py](file:///home/alpesh/mint-agent-os/agent/remote/remote_manager.py)
- Generates 6-digit OTP pairing PINs and HMAC-SHA256 session tokens.
- Discovers local network IP addresses (`192.168.x.x`, `10.x.x.x`, Tailscale/Wi-Fi).
- Produces ASCII QR codes for terminal rendering and SVG Data URIs for web display.
- Tracks active mobile sessions (device name, IP, connected timestamp, permissions).
- Provides instant session revocation (`revoke_all()` and `revoke_session(id)`).

#### [NEW] [__init__.py](file:///home/alpesh/mint-agent-os/agent/remote/__init__.py)
- Exposes `RemoteAccessManager` and singleton instance `remote_manager`.

---

### Component 2: Mobile Companion Web Interface & API (`agent/webui/`)

#### [NEW] [mobile.html](file:///home/alpesh/mint-agent-os/agent/webui/static/mobile.html)
- Responsive, touch-optimized PWA layout with Mint-Y & Stark Arc styling:
  1. 💬 **Agent Chat & Voice**: Spoken voice input (Web Speech API mic), multi-turn chat, Marvel persona selector.
  2. 🎮 **Quick PC Controls**: Volume slider, screen brightness, battery/charging telemetry, lock screen, sleep/wake, app launchers (Nemo, Firefox, Terminal, LibreOffice).
  3. 🖱️ **Virtual Trackpad & Keyboard**: Smooth touch surface mapping finger gestures to PC cursor motions (`xdotool`), tap-to-click, two-finger scroll, and remote text typing.
  4. 📷 **Screen Mirroring & Windows**: On-demand compressed screenshot of PC desktop and open window switcher.
  5. 🛡️ **Cyber Defense & Approvals**: DEFCON threat radar, emergency lockdown button, and Safe Mode approval cards.

#### [MODIFY] [server.py](file:///home/alpesh/mint-agent-os/agent/webui/server.py)
- Route `/mobile` and `/remote` to serve `mobile.html`.
- Add REST endpoints:
  - `GET /api/remote/status`: Returns pairing state, connected devices, and PC health telemetry.
  - `POST /api/remote/pair`: Validates 6-digit PIN or token to establish mobile session.
  - `POST /api/remote/command`: Executes natural language agent command or hardware action.
  - `POST /api/remote/trackpad`: Sends cursor move/click/scroll deltas to `gui_control.py`.
  - `POST /api/remote/keyboard`: Types keystrokes into active window via `gui_control.py`.
  - `GET /api/remote/screenshot`: Takes compressed screen capture via `screen_vision.py`.
  - `POST /api/remote/approve`: Resolves pending Safe Mode approval requests.

---

### Component 3: Cognitive Intent Router & CLI

#### [MODIFY] [inference.py](file:///home/alpesh/mint-agent-os/agent/brain/inference.py)
- Add deterministic intent routing for `"remote access"`, `"mobile control"`, `"connect phone"`, `"show qr code"`, `"remote pairing pin"`, and `"revoke remote"`.

#### [MODIFY] [cli.py](file:///home/alpesh/mint-agent-os/agent/cli.py)
- Add flags:
  - `--remote` / `--mobile`: Launches remote server and prints LAN URL, 6-digit PIN, and ASCII QR code.
  - `--remote-status`: Lists active connected mobile sessions.
  - `--remote-revoke`: Revokes all mobile pairing tokens.

---

### Component 4: 24/7 Online Web Simulator (`docs/`)

#### [MODIFY] [index.html](file:///home/alpesh/mint-agent-os/docs/index.html)
- Add Desktop Icon: `📱 Mobile Remote`.
- Add Start Menu item under *Administration*: `Mobile Remote Access & QR Hub`.
- Add **Window 11 (`#win-remote-access`)**:
  - QR Code Pairing Card with dynamic IP and PIN.
  - **Embedded Smartphone Interactive Simulator Frame**: An interactive phone mockup right inside the window where users can test touch trackpad, remote terminal commands, voice prompts, and screen mirroring directly in their browser.

#### [MODIFY] [agent_simulator.js](file:///home/alpesh/mint-agent-os/docs/js/agent_simulator.js)
- Add simulator methods:
  - `runRemotePair()`
  - `runRemoteTrackpadDemo()`
  - `runRemoteMobileCommand(cmd)`
  - `runRemoteScreenSnapshot()`
  - `runRemoteApproveDemo()`
  - `runRemoteRevoke()`

---

## Verification Plan

### Automated / CLI Tests
1. Test `remote_manager.py`:
   ```bash
   python3 -c "from agent.remote import remote_manager; print('LAN IPs:', remote_manager.get_lan_ips()); print('PIN:', remote_manager.get_pairing_pin()); print('Token:', remote_manager.get_pairing_token())"
   ```
2. Test CLI invocation:
   ```bash
   python3 -m agent.cli --remote
   python3 -m agent.cli --remote-status
   ```
3. Test Mobile API endpoints:
   ```bash
   # Test status endpoint
   curl -s http://127.0.0.1:8888/api/remote/status
   ```
4. Test Intent routing:
   ```bash
   python3 -m agent.cli "connect my phone"
   ```

### Manual Verification
1. Open web simulator on browser (`http://localhost:8888` and GitHub Pages `https://thakoralpesh3.github.io/mint-agent-os/`).
2. Launch Window 11: `📱 Mobile Remote Access`.
3. Test smartphone interactive frame: tap trackpad, send mobile command, and view simulated PC screen mirroring.
4. Verify auto-sync daemon pushes commits cleanly to GitHub `origin/main`.
