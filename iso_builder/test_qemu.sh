#!/usr/bin/env bash
# Runs the remastered Linux Mint AI Agent Edition ISO in QEMU virtual machine
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ISO_PATH="${1:-$SCRIPT_DIR/LinuxMint-AI-Agent-Edition.iso}"

if [ ! -f "$ISO_PATH" ]; then
    echo "❌ Error: ISO not found at $ISO_PATH"
    echo "Run ./remaster_mint_iso.sh first to build the ISO."
    exit 1
fi

if ! command -v qemu-system-x86_64 &>/dev/null; then
    echo "Installing QEMU..."
    sudo apt-get update && sudo apt-get install -y qemu-system-x86
fi

KVM_FLAG=""
if [ -w /dev/kvm ]; then
    KVM_FLAG="-enable-kvm"
fi

echo "Booting $ISO_PATH in QEMU (4GB RAM)..."
qemu-system-x86_64 \
    $KVM_FLAG \
    -m 4096 \
    -smp 2 \
    -cdrom "$ISO_PATH" \
    -boot d \
    -vga virtio \
    -display gtk
