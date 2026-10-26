#!/usr/bin/env bash
# ==============================================================================
# MintPilot Agent OS — Bootable USB Creator
# Safely writes the MintPilot Agent OS ISO to a USB flash drive
# ==============================================================================

set -euo pipefail

# ANSI Colors
BOLD="\033[1m"
GREEN="\033[1;32m"
BLUE="\033[1;34m"
YELLOW="\033[1;33m"
RED="\033[1;31m"
CYAN="\033[1;36m"
RESET="\033[0m"

echo -e "${GREEN}═══════════════════════════════════════════════════════════════${RESET}"
echo -e "${GREEN}🍃 MINTPILOT AGENT OS — BOOTABLE USB CREATOR                   ${RESET}"
echo -e "${GREEN}   Make a Live Bootable USB for any Laptop or PC                ${RESET}"
echo -e "${GREEN}═══════════════════════════════════════════════════════════════${RESET}\n"

# 1. Require Root / Sudo
if [ "$EUID" -ne 0 ]; then
  echo -e "${YELLOW}⚠️ This script requires superuser privileges to write directly to USB.${RESET}"
  echo -e "Re-running with sudo...\n"
  exec sudo "$0" "$@"
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# 2. Locate MintPilot Agent OS ISO
ISO_CANDIDATES=(
  "$SCRIPT_DIR/LinuxMint-AI-Agent-Edition.iso"
  "$SCRIPT_DIR/mintpilot-agent-os.iso"
  "$SCRIPT_DIR/iso_builder/output/LinuxMint-AI-Agent-Edition.iso"
  "$SCRIPT_DIR/iso_builder/LinuxMint-AI-Agent-Edition.iso"
  "$SCRIPT_DIR/iso_builder/cache/linuxmint-22.3-cinnamon-64bit.iso"
  "$HOME/Downloads/LinuxMint-AI-Agent-Edition.iso"
  "$HOME/Downloads/mintpilot-agent-os.iso"
)

SELECTED_ISO=""
for iso in "${ISO_CANDIDATES[@]}"; do
  if [ -f "$iso" ]; then
    SELECTED_ISO="$iso"
    break
  fi
done

if [ -z "$SELECTED_ISO" ]; then
  echo -e "${YELLOW}🔍 No existing ISO image found in local directory or iso_builder.${RESET}"
  echo -e "\nYou have 3 options:"
  echo -e "  ${BOLD}1)${RESET} Build the ISO right now using the automated remastering engine"
  echo -e "  ${BOLD}2)${RESET} Specify the path to an existing .iso file manually"
  echo -e "  ${BOLD}3)${RESET} Download the latest prebuilt MintPilot Agent OS ISO"
  echo -e "  ${BOLD}4)${RESET} Exit"
  echo -ne "\nPlease select an option [1-4]: "
  read -r ISO_CHOICE

  case "$ISO_CHOICE" in
    1)
      echo -e "\n${BLUE}🚀 Launching ISO Builder...${RESET}"
      cd "$SCRIPT_DIR/iso_builder"
      chmod +x *.sh
      ./remaster_mint_iso.sh
      SELECTED_ISO="$SCRIPT_DIR/iso_builder/output/LinuxMint-AI-Agent-Edition.iso"
      ;;
    2)
      echo -ne "\nEnter full path to .iso file: "
      read -r MANUAL_PATH
      if [ -f "$MANUAL_PATH" ]; then
        SELECTED_ISO="$MANUAL_PATH"
      else
        echo -e "${RED}❌ File not found: $MANUAL_PATH${RESET}"
        exit 1
      fi
      ;;
    3)
      echo -e "\n${BLUE}🌐 Downloading latest release from GitHub...${RESET}"
      mkdir -p "$SCRIPT_DIR/iso_builder/output"
      SELECTED_ISO="$SCRIPT_DIR/iso_builder/output/LinuxMint-AI-Agent-Edition.iso"
      echo -e "Download URL: https://github.com/thakoralpesh3/mint-agent-os/releases/latest"
      curl -sSL "https://github.com/thakoralpesh3/mint-agent-os/releases/download/v1.0.0/LinuxMint-AI-Agent-Edition.iso" -o "$SELECTED_ISO" || {
        echo -e "${YELLOW}⚠️ Prebuilt release binary in progress on GitHub Releases.${RESET}"
        echo -e "Building ISO locally from source instead..."
        cd "$SCRIPT_DIR/iso_builder"
        chmod +x *.sh
        ./remaster_mint_iso.sh
        SELECTED_ISO="$SCRIPT_DIR/iso_builder/output/LinuxMint-AI-Agent-Edition.iso"
      }
      ;;
    *)
      echo "Aborted by user."
      exit 0
      ;;
  esac
fi

if [ ! -f "$SELECTED_ISO" ]; then
  echo -e "${RED}❌ Could not locate a valid ISO file.${RESET}"
  exit 1
fi

ISO_SIZE=$(du -h "$SELECTED_ISO" | cut -f1)
echo -e "\n${GREEN}✓ Selected ISO Image:${RESET} ${BOLD}$SELECTED_ISO${RESET} ($ISO_SIZE)"

# 3. Detect Connected USB Flash Drives
echo -e "\n${BLUE}🔍 Scanning for connected USB flash drives...${RESET}"

# Find root disk to protect it
ROOT_DISK=$(lsblk -no pkname "$(findmnt -n -o SOURCE /)" 2>/dev/null || true)
if [ -z "$ROOT_DISK" ]; then
  ROOT_DISK=$(df / | tail -1 | awk '{print $1}' | sed 's/[0-9]*$//' | sed 's/p[0-9]*$//' | sed 's#/dev/##')
fi

# List drives
echo -e "\nAvailable Drives:"
echo "----------------------------------------------------------------"
lsblk -d -o NAME,SIZE,MODEL,TRAN,TYPE,VENDOR 2>/dev/null || lsblk -d -o NAME,SIZE,MODEL,TYPE
echo "----------------------------------------------------------------"
echo -e "${CYAN}ℹ️ System OS disk to PROTECT: /dev/${ROOT_DISK}${RESET}"

# Filter potential USB drives
USB_LIST=()
while read -r name tran; do
  if [ -n "$name" ] && [ "$name" != "$ROOT_DISK" ]; then
    USB_LIST+=("$name")
  fi
done < <(lsblk -d -n -o NAME,TRAN | grep -i "usb" || true)

echo -e "\n${YELLOW}⚠️ WARNING: The selected drive will be COMPLETELY ERASED!${RESET}"
echo -ne "Enter target drive name (e.g. ${BOLD}sdb${RESET} or ${BOLD}sdc${RESET} - DO NOT include /dev/): "
read -r TARGET_NAME

TARGET_DEV="/dev/$TARGET_NAME"

# Safety Validation
if [ ! -b "$TARGET_DEV" ]; then
  echo -e "${RED}❌ Error: $TARGET_DEV is not a valid block device!${RESET}"
  exit 1
fi

if [ "$TARGET_NAME" == "$ROOT_DISK" ]; then
  echo -e "${RED}❌ CRITICAL SAFETY ERROR: You selected your active running system disk (/dev/$ROOT_DISK)!${RESET}"
  echo -e "${RED}Operation aborted to prevent accidental data loss.${RESET}"
  exit 1
fi

# Display selected drive info
echo -e "\n${BOLD}Target Device Selected:${RESET}"
lsblk "$TARGET_DEV" -o NAME,SIZE,MODEL,TRAN,MOUNTPOINT

echo -e "\n${RED}═══════════════════════════════════════════════════════════════${RESET}"
echo -e "${RED}⚠️  FINAL CONFIRMATION: ALL DATA ON $TARGET_DEV WILL BE DESTROYED!${RESET}"
echo -e "${RED}═══════════════════════════════════════════════════════════════${RESET}"
echo -ne "Type '${BOLD}YES${RESET}' (in all caps) to proceed: "
read -r CONFIRM

if [ "$CONFIRM" != "YES" ]; then
  echo -e "\nOperation cancelled. No changes were made."
  exit 0
fi

# 4. Unmount any active partitions on the target drive
echo -e "\n${BLUE}⏳ Unmounting partitions on $TARGET_DEV...${RESET}"
for part in $(lsblk -ln -o NAME "$TARGET_DEV"); do
  umount "/dev/$part" 2>/dev/null || true
done

# 5. Write ISO using dd
echo -e "\n${BLUE}🚀 Flashing MintPilot Agent OS to $TARGET_DEV...${RESET}"
echo -e "This may take 2 to 5 minutes depending on your USB drive speed.\n"

dd if="$SELECTED_ISO" of="$TARGET_DEV" bs=4M status=progress conv=fdatasync

# Ensure all buffers flushed to disk
echo -e "\n${BLUE}⏳ Syncing disk buffers (please do not unplug the drive)...${RESET}"
sync
udevadm settle 2>/dev/null || sleep 2

# 6. Success & Boot Key Guide
echo -e "\n${GREEN}═══════════════════════════════════════════════════════════════${RESET}"
echo -e "${GREEN}🎉 BOOTABLE USB CREATED SUCCESSFULLY!                          ${RESET}"
echo -e "${GREEN}═══════════════════════════════════════════════════════════════${RESET}"
echo -e "Your USB drive (${BOLD}$TARGET_DEV${RESET}) is now ready to boot MintPilot Agent OS."

echo -e "\n${BOLD}📋 How to Boot from this USB on Any Laptop / PC:${RESET}"
echo -e "  1. Turn off your target laptop or computer."
echo -e "  2. Plug this USB drive into a USB 3.0 / USB-C port."
echo -e "  3. Power on the PC and immediately press the ${BOLD}Boot Menu Key${RESET} repeatedly:"
echo -e "     • ${BOLD}Lenovo / ThinkPad:${RESET}   F12 (or Fn + F12), Enter"
echo -e "     • ${BOLD}Dell / Alienware:${RESET}    F12"
echo -e "     • ${BOLD}HP / Pavilion / Envy:${RESET} F9 or Esc"
echo -e "     • ${BOLD}Asus / ROG:${RESET}          F8, Del, or Esc"
echo -e "     • ${BOLD}Acer / Predator:${RESET}     F12"
echo -e "     • ${BOLD}MSI:${RESET}                 F11"
echo -e "     • ${BOLD}Apple Mac (Intel):${RESET}   Hold Option (Alt) key at power-on"
echo -e "  4. Select your USB drive from the menu and press Enter."
echo -e "  5. Enjoy ${BOLD}MintPilot Agent OS${RESET} live with full offline laptop control!"
echo -e "${GREEN}═══════════════════════════════════════════════════════════════${RESET}\n"
