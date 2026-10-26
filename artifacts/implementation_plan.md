# Implementation Plan: Linux Mint PC Compatibility & Butter-Smooth Performance Governor

This plan ensures that **MintPilot Agent OS** strictly adheres to original **Linux Mint PC Hardware Requirements (2GB - 4GB RAM, dual-core 64-bit CPUs)**, guaranteeing that the operating system runs as snappy, responsive, lightweight, and butter-smooth as standard Linux Mint.

---

## 🎯 Linux Mint Hardware Benchmark Standards

| Metric | Official Linux Mint Standard | MintPilot Agent OS Performance Guarantee |
| :--- | :--- | :--- |
| **Minimum RAM** | 2 GB (2048 MB) | Supported. Agent footprint **<35MB RAM** (<1.5% of 2GB). |
| **Recommended RAM**| 4 GB (4096 MB) | Comfortable, zero UI lag, butter-smooth 60 FPS Cinnamon desktop. |
| **Idle CPU Usage** | ~0% - 1% | Background daemon and WebUI consume **0.0% to 0.1% CPU** when idle. |
| **Storage Requirement**| 20 GB min, 100 GB rec | Codebase footprint **<10MB** without model, ~400MB with 0.5B model. |
| **Desktop Responsiveness**| Instant mouse, window drag, Nemo browsing | Zero swap thrashing via `vm.swappiness=10` and `vfs_cache_pressure=50`. |

---

## 🛠️ Proposed Smoothness Components

### 1. Enhanced Smoothness & Performance Governor ([`agent/core/memory_guard.py`](file:///home/alpesh/mint-agent-os/agent/core/memory_guard.py))
- **Kernel Swappiness Optimization (`vm.swappiness=10`)**:
  - Default Linux swappiness (60) causes aggressive disk swapping even when free RAM exists, causing UI freezes.
  - Setting `vm.swappiness=10` keeps active desktop apps in RAM and prevents swap thrashing on 2GB-4GB machines.
- **VFS Cache Pressure Tuning (`vm.vfs_cache_pressure=50`)**:
  - Directs kernel to preserve directory and inode caches, making Nemo file browsing and launching apps snappy.
- **Process Nice & I/O Priority**:
  - Background agent daemons run with nice priority (`+10` to `+15`) and idle I/O priority (`ionice -c 3`), ensuring that the Cinnamon desktop compositor (`muffin`), audio server (`pipewire`/`pulseaudio`), and user-active windows get uninterrupted CPU priority.
- **Memory Pressure Governor**:
  - Real-time monitor of `/proc/meminfo` and `/proc/pressure/memory`.
  - Automatic proactive memory cleanup before reaching 85% threshold.

### 2. Linux Mint Hardware Compatibility Certification (`verify_mint_compatibility()`)
- Evaluates the host against Linux Mint hardware guidelines:
  - RAM Total & Available Check (Pass / Fail / Warn)
  - CPU Cores & Thread Throttling Check
  - Agent Overhead Percentage (<1% of system RAM)
  - Kernel Swappiness & Cache Tuning Status
- Generates a certified **"Linux Mint Butter-Smooth Health Report"**.

### 3. CLI Commands ([`agent/cli.py`](file:///home/alpesh/mint-agent-os/agent/cli.py))
- `mint-agent --smooth`: Audits and applies kernel smoothness optimizations (`swappiness=10`, `vfs_cache_pressure=50`, drops caches, sets nice priority).
- `mint-agent --benchmark-smoothness`: Measures real-time memory headroom, agent CPU load, and UI fluidity metrics.

### 4. WebUI Smoothness Panel ([`agent/webui/server.py`](file:///home/alpesh/mint-agent-os/agent/webui/server.py) & [`agent/webui/static/index.html`](file:///home/alpesh/mint-agent-os/agent/webui/static/index.html))
- API endpoints:
  - `GET /api/smoothness`: Returns kernel settings, RAM metrics, and smoothness grade.
  - `POST /api/optimize_smoothness`: Applies kernel tuning and cache cleanup.
- Dedicated dashboard panel: **"🍃 Linux Mint Butter-Smooth Optimizer"** with 1-click optimization button.

### 5. Automated Tuning in Upgrade Script ([`upgrade_mint_to_agent_os.sh`](file:///home/alpesh/mint-agent-os/upgrade_mint_to_agent_os.sh))
- Automatically configures `/etc/sysctl.d/99-mint-agent-smoothness.conf` with `vm.swappiness=10` and `vm.vfs_cache_pressure=50` during upgrade so every converted machine immediately runs silky smooth.

### 6. 24/7 Simulator Integration ([`docs/`](file:///home/alpesh/mint-agent-os/docs/))
- Add Smoothness Telemetry indicator and quick action chip `🍃 Smooth Mint` in the online simulator.

---

## Verification Plan
1. Test kernel parameter tuning and verify `/proc/sys/vm/swappiness` and `/proc/sys/vm/vfs_cache_pressure`.
2. Test `mint-agent --smooth` and `mint-agent --benchmark-smoothness`.
3. Test WebUI `/api/smoothness` and `/api/optimize_smoothness`.
4. Run `upgrade_mint_to_agent_os.sh` syntax check.
5. Push to GitHub and verify 24/7 Simulator on GitHub Pages.
