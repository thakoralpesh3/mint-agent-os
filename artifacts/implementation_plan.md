# Implementation Plan: 1GB RAM PC Native Compatibility & Tier 0 Nano Governor

Ensure **Aradhya Agent OS** natively runs butter-smooth, without freezing or OOM-crashing, on ultra-low-spec **1GB RAM PCs** (vintage x86_64 PCs, netbooks, thin clients, or minimal VMs) through dedicated Tier 0 kernel tuning, ZRAM RAM-compression swap, microscopic agent memory footprinting, and zero-RAM AI routing.

---

## User Review Required

> [!IMPORTANT]
> **Technical Reality on 1GB RAM PCs**:
> - **Standard Linux Mint Cinnamon** natively consumes ~750MB-900MB RAM out-of-the-box, leaving only ~100MB headroom on a 1GB machine without customization.
> - **Aradhya Agent OS itself** consumes only **~28MB - 35MB RAM**, making it remarkably lightweight.
> - However, running a 400MB+ local GGUF neural model alongside a desktop environment on 1GB physical RAM will trigger OOM killer freezes unless:
>   1. **ZRAM compressed RAM swap (lz4/zstd)** is enabled, expanding 1GB physical RAM to an effective **1.8GB - 2.2GB virtual RAM**.
>   2. **Tier 0: Nano Mode** is engaged: using the **Micro-Deterministic Fast Intent Engine** (0MB model RAM overhead) with optional Cloud API fallback (Gemini/OpenAI/Groq).
>   3. Kernel swappiness is tuned (`vm.swappiness = 100` for zram or `10` for spinning disk).
>   4. `MemoryGuard` accepts 1GB RAM as **PASS (Tier 0: Nano Low-RAM Profile)** instead of penalizing or failing.

---

## Proposed Changes

### Core Memory & Performance Governor

#### [MODIFY] [`agent/core/memory_guard.py`](file:///home/alpesh/mint-agent-os/agent/core/memory_guard.py)
- Introduce **Tier 0: Nano / Ultra-Low RAM (512MB - 1250MB)** profile.
- Add `setup_zram_swap(disk_size_mb=1024)`:
  - Automates kernel zram module loading (`modprobe zram num_devices=1`).
  - Sets compression algorithm (`zstd` or `lz4`).
  - Initializes `/dev/zram0` as swap with priority 32767.
- Add `optimize_for_1gb_pc()`:
  - Sets `vm.swappiness = 100` when zram is active (prioritizes compressing RAM pages over dropping file buffers).
  - Sets `vm.vfs_cache_pressure = 100` (rapid dentry reclaim on low RAM).
  - Sets `vm.watermark_boost_factor = 0` (prevents memory compaction spikes).
  - Disables heavy background telemetry polling intervals.
- Update `verify_mint_compatibility()`:
  - Recognize systems with 750MB - 1250MB RAM as **Tier 0 (1GB Ultra-Low Spec)**.
  - If ZRAM is detected: score = 95+ (`PASS (Tier 0: 1GB Low-Spec with Active ZRAM Compression)`).
  - If ZRAM is missing: prompt running `aradhya --optimize-1gb` without failing the host.
- Enhance `clean_memory()` with aggressive Python runtime garbage collection and immediate page cache trimming (`vm.drop_caches = 3`).

---

### Central Brain & AI Model Tiering

#### [MODIFY] [`agent/brain/inference.py`](file:///home/alpesh/mint-agent-os/agent/brain/inference.py)
- Update `_detect_hardware_tier()`:
  - Detect `ram_mb <= 1250`: classify as **Tier 0: Nano / Ultra-Low RAM (1GB PC)**.
  - Set recommended AI model to: `"Deterministic Micro-Intent Router + Cloud API Fallback (0MB Local Model RAM)"`.
  - Enforce `low_memory_mode = True` across the brain.
  - Auto-run `gc.collect()` after every completed user prompt or security remediation cycle.

#### [MODIFY] [`agent/brain/model_manager.py`](file:///home/alpesh/mint-agent-os/agent/brain/model_manager.py)
- Add Tier 0 catalog entry:
  - `deterministic-nano`: Zero-RAM footprint, <0.8ms latency, micro-regex and rule engine.
- Update model selection warning: if a user on a 1GB RAM PC attempts to load a 1.5B or 3B model, issue an alert recommending Tier 0 or Gemini Cloud API to avoid kernel freezing.

---

### CLI Interface & 1-Click Low-RAM Optimizer

#### [MODIFY] [`agent/cli.py`](file:///home/alpesh/mint-agent-os/agent/cli.py)
- Add new CLI commands:
  - `--optimize-1gb`: One-click command to optimize Linux Mint and Aradhya for 1GB RAM (configures zram swap, sets kernel parameters, lowers agent memory consumption, disables compositor effects recommendations).
  - `--zram-status`: Inspect real-time zram compression ratio, original data size, and memory saved.
  - Update `--tier`: Clearly displays Tier 0 (Nano / 1GB PC) specifications.
  - Update `--benchmark-smoothness`: Validates 60fps responsiveness and zero-OOM execution under 1GB RAM constraints.

---

### WebUI & Simulator Updates

#### [MODIFY] [`docs/index.html`](file:///home/alpesh/mint-agent-os/docs/index.html)
- Add **1GB RAM PC Compatibility** badge and configuration guide in:
  - Window 3: *System Health & Butter-Smooth Governor*.
  - Window 5: *Download Bootable ISO & GitHub Releases* (includes 1GB RAM ISO tuning notes, XFCE recommendations, and ZRAM flag).
  - Window 8: *Marvel Agent Headquarters* (shows how Jarvis & Friday operate in Tier 0 Nano Mode with 0MB model overhead).

#### [MODIFY] [`docs/js/agent_simulator.js`](file:///home/alpesh/mint-agent-os/docs/js/agent_simulator.js)
- Add Tier 0 (1GB RAM) simulation preset to the specs switcher.
- Allow users to toggle between **1GB RAM (Tier 0 Nano)**, **2GB-4GB RAM (Tier 1)**, and **8GB+ RAM (Tier 2/3)**.
- Display live simulated metrics: 1024MB Total RAM, 28MB Agent Footprint, ZRAM 2.4x compression ratio, and 0.6ms deterministic response time.

---

## Verification Plan

### Automated Tests
1. **Memory & Tier 0 Validation**:
   - `python3 -c "from agent.core.memory_guard import MemoryGuard; mg = MemoryGuard(); print(mg.verify_mint_compatibility())"`
   - `python3 -c "from agent.brain.inference import AgentBrain; b = AgentBrain(); print(b.hardware_tier)"`
2. **1GB Optimizer CLI Execution**:
   - `python3 -m agent.cli --tier`
   - `python3 -m agent.cli --benchmark-smoothness`
   - `python3 -m agent.cli --zram-status`
3. **Web Simulator Syntax Verification**:
   - Verify character-by-character syntax on `docs/js/agent_simulator.js`.
4. **Live Web Page Check**:
   - Verify GitHub Pages deployment at `https://thakoralpesh3.github.io/mint-agent-os/`.
