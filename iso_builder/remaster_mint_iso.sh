#!/usr/bin/env bash
# ==============================================================================
# MintPilot: Linux Mint AI Agent Edition Custom ISO Remastering Engine
# Remasters official Linux Mint ISO by injecting offline agent runtime,
# laptop controllers, hardware permissions, and desktop hotkeys.
# ==============================================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BASE_DIR="$(dirname "$SCRIPT_DIR")"
WORK_DIR="$SCRIPT_DIR/work"
CACHE_DIR="$SCRIPT_DIR/cache"

ISO_INPUT="${1:-}"
OUTPUT_ISO="${2:-$SCRIPT_DIR/LinuxMint-AI-Agent-Edition.iso}"

echo "=============================================================================="
echo "🍃 MintPilot Custom Linux Mint OS Builder"
echo "=============================================================================="

# 1. Locate Base ISO
if [ -z "$ISO_INPUT" ]; then
    FOUND_ISO=$(find "$CACHE_DIR" -maxdepth 1 -name "*.iso" | head -n 1)
    if [ -n "$FOUND_ISO" ]; then
        ISO_INPUT="$FOUND_ISO"
    else
        echo "No base ISO specified. Automatically downloading official Linux Mint ISO..."
        "$SCRIPT_DIR/download_mint_iso.sh" "cinnamon"
        ISO_INPUT=$(find "$CACHE_DIR" -maxdepth 1 -name "*.iso" | head -n 1)
    fi
fi

if [ ! -f "$ISO_INPUT" ]; then
    echo "❌ Error: Base ISO '$ISO_INPUT' does not exist."
    exit 1
fi

echo "Source Base ISO: $ISO_INPUT"
echo "Target Output:   $OUTPUT_ISO"

# 2. Check Prerequisites
for cmd in unsquashfs mksquashfs xorriso rsync; do
    if ! command -v "$cmd" &>/dev/null; then
        echo "❌ Missing build tool '$cmd'. Install via: sudo apt-get install -y squashfs-tools xorriso rsync"
        exit 1
    fi
done

# 3. Setup Workspace
echo "Setting up clean staging workspace in $WORK_DIR..."
sudo rm -rf "$WORK_DIR"
mkdir -p "$WORK_DIR/iso_mount" "$WORK_DIR/iso_root" "$WORK_DIR/custom_root"

# 4. Mount and Extract Base ISO
echo "Mounting base ISO..."
sudo mount -o loop "$ISO_INPUT" "$WORK_DIR/iso_mount"

echo "Extracting ISO filesystem structure..."
rsync -a -H --exclude='casper/filesystem.squashfs' "$WORK_DIR/iso_mount/" "$WORK_DIR/iso_root/"

echo "Extracting root squashfs (casper/filesystem.squashfs)..."
sudo unsquashfs -d "$WORK_DIR/custom_root" "$WORK_DIR/iso_mount/casper/filesystem.squashfs"

sudo umount "$WORK_DIR/iso_mount"

# 5. Inject MintPilot Autonomous Agent Core
echo "Injecting MintPilot Agent Core into /opt/mint-agent..."
sudo mkdir -p "$WORK_DIR/custom_root/opt/mint-agent"
sudo rsync -a --exclude='.git' --exclude='iso_builder/work' --exclude='iso_builder/cache' "$BASE_DIR/" "$WORK_DIR/custom_root/opt/mint-agent/"

# Permissions and CLI symlink
sudo chmod +x "$WORK_DIR/custom_root/opt/mint-agent/agent/cli.py"
sudo chmod +x "$WORK_DIR/custom_root/opt/mint-agent/agent/main.py"
sudo chmod +x "$WORK_DIR/custom_root/opt/mint-agent/agent/ui/hud_overlay.py"
sudo ln -sf /opt/mint-agent/agent/cli.py "$WORK_DIR/custom_root/usr/local/bin/mint-agent"

# 6. Install Systemd Services & Autostart
echo "Installing systemd service and desktop autostart..."
sudo cp "$SCRIPT_DIR/configs/mint-agent.service" "$WORK_DIR/custom_root/etc/systemd/system/"
sudo cp "$SCRIPT_DIR/configs/mint-agent-hud.desktop" "$WORK_DIR/custom_root/etc/xdg/autostart/"
sudo cp "$SCRIPT_DIR/configs/mint-agent-hud.desktop" "$WORK_DIR/custom_root/usr/share/applications/"
sudo cp "$SCRIPT_DIR/configs/99-mint-agent-permissions.rules" "$WORK_DIR/custom_root/etc/polkit-1/rules.d/"

# Enable agent systemd service inside chroot
sudo chroot "$WORK_DIR/custom_root" systemctl enable mint-agent.service 2>/dev/null || true

# 7. Configure Desktop Hotkey (Super+Space for HUD)
echo "Configuring Cinnamon & XFCE desktop hotkeys..."
sudo mkdir -p "$WORK_DIR/custom_root/etc/dconf/db/local.d"
cat << 'EOF' | sudo tee "$WORK_DIR/custom_root/etc/dconf/db/local.d/01-mint-agent" > /dev/null
[org/cinnamon/desktop/keybindings]
custom-list=['custom0']

[org/cinnamon/desktop/keybindings/custom-keybindings/custom0]
action='/usr/bin/python3 /opt/mint-agent/agent/ui/hud_overlay.py'
binding=['<Super>space']
name='MintPilot HUD'
EOF
sudo chroot "$WORK_DIR/custom_root" dconf update 2>/dev/null || true

# 8. Recompress SquashFS
echo "Rebuilding casper/filesystem.squashfs (this may take several minutes)..."
sudo rm -f "$WORK_DIR/iso_root/casper/filesystem.squashfs"
sudo mksquashfs "$WORK_DIR/custom_root" "$WORK_DIR/iso_root/casper/filesystem.squashfs" -comp xz -b 1048576 -noappend

# Update filesystem size
printf $(sudo du -sx --block-size=1 "$WORK_DIR/custom_root" | cut -f1) | sudo tee "$WORK_DIR/iso_root/casper/filesystem.size" > /dev/null

# 9. Update MD5 Sums
echo "Recalculating MD5 checksums..."
cd "$WORK_DIR/iso_root"
sudo rm -f md5sum.txt
find -type f -not -name 'md5sum.txt' -not -path './isolinux/*' -not -path './boot/*' | sudo xargs md5sum | sudo tee md5sum.txt > /dev/null
cd "$SCRIPT_DIR"

# 10. Generate Hybrid Bootable ISO with xorriso
echo "Building final hybrid bootable ISO with xorriso..."
sudo xorriso -as mkisofs \
    -r -V "Linux Mint AI Agent OS" \
    -cache-inodes \
    -J -l \
    -b isolinux/isolinux.bin \
    -c isolinux/boot.cat \
    -no-emul-boot \
    -boot-load-size 4 \
    -boot-info-table \
    -eltorito-alt-boot \
    -e boot/grub/efi.img \
    -no-emul-boot \
    -isohybrid-gpt-basdat \
    -o "$OUTPUT_ISO" \
    "$WORK_DIR/iso_root"

echo "=============================================================================="
echo "✓ Success! Custom Linux Mint AI Agent OS ISO built successfully:"
echo "Location: $OUTPUT_ISO"
echo "You can test boot it via: ./test_qemu.sh"
echo "Or flash it to a USB drive via: sudo dd if=$OUTPUT_ISO of=/dev/sdX bs=4M status=progress"
echo "=============================================================================="
