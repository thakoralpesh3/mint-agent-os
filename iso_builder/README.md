# 🍃 Linux Mint AI Agent Edition — ISO Remastering Guide

This module provides a fully automated pipeline to build a bootable Linux Mint OS ISO (`LinuxMint-AI-Agent-Edition.iso`) with **MintPilot** embedded directly into the OS.

---

## 🚀 Quick Start: Building the OS

### Step 1: Install Build Tools
```bash
sudo apt-get update && sudo apt-get install -y squashfs-tools xorriso rsync qemu-system-x86
```

### Step 2: Run Automated Remastering
```bash
cd /home/alpesh/mint-agent-os/iso_builder
chmod +x *.sh
./remaster_mint_iso.sh
```
*Note: This script will automatically download the official Linux Mint base ISO if one is not present in `cache/`.*

### Step 3: Test Boot in Virtual Machine
```bash
./test_qemu.sh
```

### Step 4: Flash to USB Drive for Physical Laptop
```bash
# Replace /dev/sdX with your USB drive identifier (check with lsblk)
sudo dd if=LinuxMint-AI-Agent-Edition.iso of=/dev/sdX bs=4M status=progress conv=fsync
```

---

## 🧠 What's Embedded in the Custom OS?

1. **MintPilot Autonomous Agent Core** (`/opt/mint-agent/`)
   - Pre-installed with offline Small Language Model (SLM) reasoning support.
   - Fast deterministic hardware/OS router (<2ms latency).
2. **Complete Laptop Control Toolset**
   - Native audio/volume control (`pactl`).
   - Screen brightness (`brightnessctl`).
   - Wi-Fi and network management (`nmcli`).
   - Battery and power telemetry (`upower`).
   - Window and desktop GUI automation (`xdotool`, `wmctrl`, Linux AT-SPI accessibility).
   - Safe bash terminal execution.
   - Screen perception and OCR (`tesseract`).
   - Offline voice interaction (`Vosk` STT + `Piper` TTS).
3. **Desktop Integration**
   - **HUD Overlay**: Summon with `Super + Space` from anywhere on the desktop.
   - **System Tray Applet**: Live indicator in Linux Mint panel showing battery, memory health, and quick actions.
   - **Systemd Autostart**: Starts automatically on laptop boot (`mint-agent.service`).
   - **Passwordless Hardware Polkit Rule**: No root password popups when adjusting volume, brightness, or putting the laptop to sleep.
