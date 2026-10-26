# Implementation Plan: Upgrade Existing Linux Mint OS to MintPilot Agent OS

This plan introduces an automated, safe, and customizable upgrade path for anyone running an existing **Linux Mint OS (21.x or 22.x)** to transform their installation into **MintPilot Agent OS** without reinstalling or flashing an ISO.

---

## User Review Required

> [!IMPORTANT]
> The upgrade process will:
> 1. Install necessary dependencies (e.g. `brightnessctl`, `pulseaudio-utils`, `xdotool`, `wmctrl`, `maim`, `tesseract-ocr`, `ufw`).
> 2. Install the agent into `/opt/mint-agent` and configure a systemd service (`mint-agent.service`) for the current user.
> 3. Add polkit rules to `/etc/polkit-1/rules.d/` allowing the agent to control volume, brightness, battery, power, and Wi-Fi without password prompts.
> 4. Add desktop shortcuts and global CLI command `/usr/local/bin/mint-agent`.
> 5. Create pre-action snapshots so users can rollback at any time.

---

## Proposed Components & Changes

### 1. Universal Upgrade & Installation Script (`upgrade_mint_to_agent_os.sh`)

#### [NEW] [upgrade_mint_to_agent_os.sh](file:///home/alpesh/mint-agent-os/upgrade_mint_to_agent_os.sh)
A robust, idempotent bash script that can be executed directly or piped from `curl`:
- **Compatibility Check**: Verifies `/etc/os-release` (supports Linux Mint 21.x, 22.x, Ubuntu 22.04/24.04).
- **Hardware Tier Detection**: Detects CPU cores and RAM size; configures optimal Tier 1 (2GB–4GB low RAM) or Tier 2/3 settings.
- **Dependency Installation**: Installs required packages non-interactively via `apt-get`.
- **Repository Setup**: Clones or updates code into `/opt/mint-agent`.
- **System Integration**:
  - Installs Polkit permissions in `/etc/polkit-1/rules.d/99-mint-agent-permissions.rules`.
  - Configures and enables `mint-agent.service` systemd unit.
  - Installs Desktop shortcuts in `/usr/share/applications/` and `~/Desktop/`.
  - Symlinks `/usr/local/bin/mint-agent`.
- **Cybersecurity & Safety Initialization**:
  - Establishes initial SHA-256 cryptographic tripwire baseline for the system.
  - Deploys canary honeypots and configures UFW firewall baseline.
  - Takes a pre-install system configuration snapshot for easy rollback.

---

### 2. In-Place OS Updater Engine (`agent/core/updater.py`)

#### [NEW] [agent/core/updater.py](file:///home/alpesh/mint-agent-os/agent/core/updater.py)
A dedicated Python module handling routine updates for existing MintPilot installations:
- `check_for_updates()`: Checks GitHub remote repository for newer commits or releases.
- `perform_update()`: Fetches updates via git, updates dependencies if necessary, verifies cryptographic integrity, reloads systemd services, and reports changelog.
- `get_version_info()`: Returns local commit hash, version number, and install timestamp.

---

### 3. CLI In-Place Update Command

#### [MODIFY] [agent/cli.py](file:///home/alpesh/mint-agent-os/agent/cli.py)
- Add arguments:
  - `--update-os`: Pulls the latest MintPilot updates from GitHub and reloads the service.
  - `--check-update`: Checks if a newer version of MintPilot is available upstream.
- Add fast router intent matching: "update os", "upgrade agent", "check updates".

---

### 4. Embedded Open WebUI Update Dashboard

#### [MODIFY] [agent/webui/server.py](file:///home/alpesh/mint-agent-os/agent/webui/server.py)
- Add API endpoints:
  - `GET /api/check_update`: Returns whether updates are available.
  - `POST /api/update_os`: Triggers in-place update with progress telemetry.

#### [MODIFY] [agent/webui/static/index.html](file:///home/alpesh/mint-agent-os/agent/webui/static/index.html)
- Add "Check for Updates" / "Upgrade OS" button in the WebUI header/settings.
- Show update dialog with version info, changelog, and one-click update trigger.

---

### 5. 24/7 Online Simulator & Documentation

#### [MODIFY] [docs/index.html](file:///home/alpesh/mint-agent-os/docs/index.html) & [docs/js/agent_simulator.js](file:///home/alpesh/mint-agent-os/docs/js/agent_simulator.js)
- Add an **"Upgrade Your Linux Mint"** modal / application launcher on the online simulator, allowing visitors to copy the 1-line upgrade command or run the simulation:
  ```bash
  curl -sSL https://raw.githubusercontent.com/thakoralpesh3/mint-agent-os/main/upgrade_mint_to_agent_os.sh | sudo bash
  ```
- Support `mint-agent --update-os` in the simulated terminal.

#### [MODIFY] [README.md](file:///home/alpesh/mint-agent-os/README.md)
- Add dedicated section: **"Upgrading an Existing Linux Mint Installation to MintPilot Agent OS"** with:
  - 1-line automated command.
  - Step-by-step manual instructions.
  - Rollback and uninstaller options.

---

## Verification Plan

### Automated & Script Tests
1. **Script Syntax & Dry-Run Test**:
   ```bash
   bash -n /home/alpesh/mint-agent-os/upgrade_mint_to_agent_os.sh
   ```
2. **Updater Engine Unit Test**:
   ```bash
   python3 -c "from agent.core.updater import OSUpdater; u = OSUpdater(); print(u.get_version_info())"
   ```
3. **CLI Update Flag Test**:
   ```bash
   python3 /home/alpesh/mint-agent-os/agent/cli.py --check-update
   ```
4. **WebUI Update Endpoints Test**:
   - Query `GET /api/check_update` and verify JSON response.
5. **Git Synchronization**:
   - Run `/home/alpesh/mint-agent-os/sync_to_github.sh` and verify push.
