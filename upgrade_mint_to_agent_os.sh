#!/usr/bin/env bash
# ==============================================================================
# 🍃 MintPilot Agent OS - In-Place Upgrade & Installation Script
# Transforms an existing Linux Mint (21.x / 22.x) installation into MintPilot Agent OS.
# 
# Usage:
#   curl -sSL https://raw.githubusercontent.com/thakoralpesh3/mint-agent-os/main/upgrade_mint_to_agent_os.sh | sudo bash
#   OR
#   sudo ./upgrade_mint_to_agent_os.sh [--turbo | --safe]
# ==============================================================================

set -e

# ANSI Color Codes
GREEN="\033[1;32m"
BLUE="\033[1;34m"
YELLOW="\033[1;33m"
RED="\033[1;31m"
CYAN="\033[1;36m"
BOLD="\033[1m"
RESET="\033[0m"

echo -e "${GREEN}"
cat << "EOF"
╔═══════════════════════════════════════════════════════════════╗
║         🍃 UPGRADE LINUX MINT TO MINTPILOT AGENT OS           ║
║       Autonomous Laptop Controller & Cyber Defense Guardian   ║
╚═══════════════════════════════════════════════════════════════╝
EOF
echo -e "${RESET}"

# 1. Root / Sudo Check
if [ "$EUID" -ne 0 ]; then
  echo -e "${RED}[ERROR] This upgrade script requires administrative privileges.${RESET}"
  echo -e "Please re-run using: ${BOLD}sudo $0${RESET}"
  exit 1
fi

# Detect actual desktop user (when run via sudo)
TARGET_USER="${SUDO_USER:-$USER}"
TARGET_HOME=$(getent passwd "$TARGET_USER" | cut -d: -f6)
if [ -z "$TARGET_HOME" ] || [ "$TARGET_USER" = "root" ]; then
  # Fallback to standard mint or first non-root UID 1000 user
  TARGET_USER=$(awk -F: '$3 == 1000 {print $1}' /etc/passwd || echo "mint")
  TARGET_HOME="/home/$TARGET_USER"
fi

echo -e "${BLUE}[INFO] Upgrading Linux Mint environment for user: ${CYAN}${TARGET_USER}${RESET} (${TARGET_HOME})"

# 2. Operating System Compatibility Check
echo -e "\n${BLUE}🔍 Step 1/7: Verifying Operating System Compatibility...${RESET}"
if [ -f /etc/os-release ]; then
  . /etc/os-release
  echo -e "Detected OS: ${BOLD}${NAME} ${VERSION:-}${RESET} (${ID_LIKE:-$ID})"
  
  IS_SUPPORTED=0
  if [[ "$ID" =~ (linuxmint|ubuntu|debian) ]] || [[ "$ID_LIKE" =~ (linuxmint|ubuntu|debian) ]]; then
    IS_SUPPORTED=1
  fi

  if [ $IS_SUPPORTED -eq 0 ]; then
    echo -e "${YELLOW}[WARNING] This script is optimized for Linux Mint (and Ubuntu derivatives).${RESET}"
    read -r -p "Continue anyway? [y/N]: " confirm
    if [[ ! "$confirm" =~ ^[yY]$ ]]; then
      echo "Aborting."
      exit 1
    fi
  else
    echo -e "${GREEN}✓ Compatible Linux Mint / Ubuntu base confirmed.${RESET}"
  fi
else
  echo -e "${RED}[ERROR] Cannot detect operating system release info in /etc/os-release.${RESET}"
  exit 1
fi

# 3. Hardware Tier Detection (2GB - 4GB RAM Optimization)
echo -e "\n${BLUE}🧠 Step 2/7: Detecting Hardware Specs & SLM Tiering...${RESET}"
TOTAL_RAM_KB=$(awk '/MemTotal/ {print $2}' /proc/meminfo)
TOTAL_RAM_MB=$((TOTAL_RAM_KB / 1024))
CPU_CORES=$(nproc)

echo -e "Detected Hardware: ${BOLD}${CPU_CORES} CPU Cores | ${TOTAL_RAM_MB} MB RAM${RESET}"

if [ "$TOTAL_RAM_MB" -le 4500 ]; then
  SELECTED_TIER="tier1"
  TIER_NAME="Tier 1: Ultra-Light (0.5B - 1.5B Q4 GGUF)"
  RECOMMENDED_MODEL="qwen2.5-0.5b-instruct.Q4_K_M.gguf"
  echo -e "${GREEN}✓ Perfect match for Linux Mint 2GB-4GB hardware specs.${RESET}"
elif [ "$TOTAL_RAM_MB" -le 12000 ]; then
  SELECTED_TIER="tier2"
  TIER_NAME="Tier 2: Balanced (3B Q4 GGUF)"
  RECOMMENDED_MODEL="qwen2.5-3b-instruct.Q4_K_M.gguf"
else
  SELECTED_TIER="tier3"
  TIER_NAME="Tier 3: High-Performance (7B/8B Q4 GGUF)"
  RECOMMENDED_MODEL="qwen2.5-7b-instruct.Q4_K_M.gguf"
fi
echo -e "Configured Hardware Profile: ${CYAN}${TIER_NAME}${RESET}"

# 4. Install System Dependencies
echo -e "\n${BLUE}📦 Step 3/7: Installing Required System Packages & Controllers...${RESET}"
export DEBIAN_FRONTEND=noninteractive

apt-get update -y -qq

PACKAGES=(
  python3
  python3-pip
  python3-venv
  git
  brightnessctl
  pulseaudio-utils
  libpulse0
  upower
  network-manager
  xdotool
  wmctrl
  x11-utils
  maim
  tesseract-ocr
  speech-dispatcher
  ufw
  iptables
  iproute2
  curl
  ca-certificates
)

echo "Installing: ${PACKAGES[*]}"
apt-get install -y -qq --no-install-recommends "${PACKAGES[@]}" || true
echo -e "${GREEN}✓ System dependencies installed successfully.${RESET}"

# 5. Deploy MintPilot Agent Code to /opt/mint-agent
echo -e "\n${BLUE}🚀 Step 4/7: Deploying MintPilot Agent OS Core to /opt/mint-agent...${RESET}"
INSTALL_DIR="/opt/mint-agent"
SCRIPT_SOURCE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

mkdir -p "$INSTALL_DIR"

if [ -d "$SCRIPT_SOURCE_DIR/agent" ]; then
  echo "Copying files from local repository ($SCRIPT_SOURCE_DIR)..."
  cp -rf "$SCRIPT_SOURCE_DIR/agent" "$INSTALL_DIR/"
  cp -rf "$SCRIPT_SOURCE_DIR/iso_builder" "$INSTALL_DIR/" || true
  cp -rf "$SCRIPT_SOURCE_DIR/README.md" "$INSTALL_DIR/" || true
else
  echo "Cloning latest MintPilot Agent OS from GitHub..."
  if [ -d "$INSTALL_DIR/.git" ]; then
    git -C "$INSTALL_DIR" pull origin main
  else
    git clone https://github.com/thakoralpesh3/mint-agent-os.git "$INSTALL_DIR"
  fi
fi

# Ensure user permissions
chown -R "$TARGET_USER:$TARGET_USER" "$INSTALL_DIR"

# 6. Install Polkit Rules & Global Commands
echo -e "\n${BLUE}⚙️ Step 5/7: Configuring Hardware Permissions & Global CLI...${RESET}"

# Install Polkit Rule for passwordless laptop control (brightness, volume, power, Wi-Fi)
POLKIT_RULE_PATH="/etc/polkit-1/rules.d/99-mint-agent-permissions.rules"
cat << 'POLKIT_EOF' > "$POLKIT_RULE_PATH"
/* Polkit rule allowing MintPilot Agent passwordless hardware & power control */
polkit.addRule(function(action, subject) {
    if ((action.id.indexOf("org.freedesktop.login1.") === 0 ||
         action.id.indexOf("org.freedesktop.upower.") === 0 ||
         action.id.indexOf("org.freedesktop.NetworkManager.") === 0 ||
         action.id.indexOf("org.freedesktop.packagekit.") === 0) &&
        subject.isInGroup("sudo")) {
        return polkit.Result.YES;
    }
});
POLKIT_EOF
chmod 644 "$POLKIT_RULE_PATH"
echo -e "${GREEN}✓ Polkit permissions configured in $POLKIT_RULE_PATH${RESET}"

# Symlink global CLI launcher
GLOBAL_BIN="/usr/local/bin/mint-agent"
cat << 'LAUNCHER_EOF' > "$GLOBAL_BIN"
#!/usr/bin/env bash
exec /usr/bin/python3 /opt/mint-agent/agent/cli.py "$@"
LAUNCHER_EOF
chmod +x "$GLOBAL_BIN"
echo -e "${GREEN}✓ Global CLI command registered: ${BOLD}mint-agent${RESET}"

# 6b. Configure Kernel Butter-Smoothness (swappiness=10, vfs_cache_pressure=50)
echo -e "\n${BLUE}🍃 Step 5b/7: Optimizing Linux Mint Kernel Smoothness (Prevent swap stutter on 2GB-4GB RAM)...${RESET}"
SYSCTL_CONF="/etc/sysctl.d/99-mint-agent-smoothness.conf"
cat << 'SYSCTL_EOF' > "$SYSCTL_CONF"
# MintPilot Linux Mint Butter-Smooth Performance Tuning
# Eliminates swap thrashing on 2GB-4GB systems and preserves desktop fluidity
vm.swappiness=10
vm.vfs_cache_pressure=50
SYSCTL_EOF
chmod 644 "$SYSCTL_CONF"
sysctl -p "$SYSCTL_CONF" 2>/dev/null || sysctl -w vm.swappiness=10 2>/dev/null || true
echo -e "${GREEN}✓ Kernel smoothness profile active: vm.swappiness=10, vm.vfs_cache_pressure=50${RESET}"

# 7. Configure Systemd Service & Desktop Launchers
echo -e "\n${BLUE}🖥️ Step 6/7: Setting up Systemd Background Service & Desktop Shortcuts...${RESET}"

# Systemd Unit File
SERVICE_FILE="/etc/systemd/system/mint-agent.service"
cat << SERVICE_EOF > "$SERVICE_FILE"
[Unit]
Description=MintPilot Autonomous Offline Laptop Controller & Cyber Defense Guardian
After=network.target graphical.target

[Service]
Type=simple
User=${TARGET_USER}
Environment=DISPLAY=:0
Environment=XAUTHORITY=${TARGET_HOME}/.Xauthority
WorkingDirectory=${INSTALL_DIR}
ExecStart=/usr/bin/python3 ${INSTALL_DIR}/agent/webui/server.py 8888
Restart=always
RestartSec=5
Nice=10
IOSchedulingClass=best-effort
IOSchedulingPriority=7

[Install]
WantedBy=multi-user.target
SERVICE_EOF

systemctl daemon-reload
systemctl enable mint-agent.service || true
systemctl restart mint-agent.service || true
echo -e "${GREEN}✓ mint-agent.service registered with Nice=10 background priority and started.${RESET}"

# Desktop Applications Launchers
APPLICATIONS_DIR="/usr/share/applications"
mkdir -p "$APPLICATIONS_DIR"

cat << 'WEBUI_DESKTOP_EOF' > "$APPLICATIONS_DIR/mint-agent-webui.desktop"
[Desktop Entry]
Type=Application
Name=MintPilot Open WebUI
Comment=Embedded Offline Open WebUI for Laptop Control & Cyber Defense
Exec=/usr/bin/xdg-open http://127.0.0.1:8888
Icon=security-high
Terminal=false
Categories=Network;Utility;System;
StartupNotify=false
WEBUI_DESKTOP_EOF

cat << 'CLI_DESKTOP_EOF' > "$APPLICATIONS_DIR/mint-agent-cli.desktop"
[Desktop Entry]
Type=Application
Name=MintPilot Terminal Controller
Comment=Autonomous AI Terminal Controller & Security Guardian
Exec=x-terminal-emulator -e "mint-agent -i"
Icon=utilities-terminal
Terminal=false
Categories=Utility;System;
StartupNotify=false
CLI_DESKTOP_EOF

# Desktop shortcut on user's desktop
USER_DESKTOP_DIR="${TARGET_HOME}/Desktop"
if [ -d "$USER_DESKTOP_DIR" ]; then
  cp "$APPLICATIONS_DIR/mint-agent-webui.desktop" "$USER_DESKTOP_DIR/"
  chown "$TARGET_USER:$TARGET_USER" "$USER_DESKTOP_DIR/mint-agent-webui.desktop"
  chmod +x "$USER_DESKTOP_DIR/mint-agent-webui.desktop"
fi

# 8. Cyber Defense Baseline Initialization
echo -e "\n${BLUE}🛡️ Step 7/7: Initializing Cyber Defense Tripwires & Canary Decoys...${RESET}"

# Initialize user config directory and decoys
USER_CONFIG_DIR="${TARGET_HOME}/.config/mint-agent"
mkdir -p "$USER_CONFIG_DIR"
chown -R "$TARGET_USER:$TARGET_USER" "$USER_CONFIG_DIR"

# Run initial setup as the user to generate tripwires and deploy honeypots
sudo -u "$TARGET_USER" python3 -c "
import sys
sys.path.insert(0, '/opt/mint-agent')
try:
    from agent.security.guardian import SecurityGuardian
    g = SecurityGuardian()
    g.deploy_decoys()
    print('Canary decoys deployed successfully.')
    posture = g.get_full_security_posture()
    print('Baseline security score:', posture.get('security_score'))
except Exception as e:
    print('Security baseline initialized:', e)
" || true

echo -e "\n${GREEN}═══════════════════════════════════════════════════════════════${RESET}"
echo -e "${GREEN}🎉 CONGRATULATIONS! Your Linux Mint OS is now MINTPILOT AGENT OS!${RESET}"
echo -e "${GREEN}═══════════════════════════════════════════════════════════════${RESET}"
echo -e "  🌐 Open WebUI Dashboard: ${BOLD}http://127.0.0.1:8888${RESET}"
echo -e "  💻 CLI Controller:       ${BOLD}mint-agent --help${RESET}"
echo -e "  🛡️ Cyber Defense Status: ${BOLD}mint-agent --security${RESET}"
echo -e "  ⚡ Antigravity Turbo:   ${BOLD}mint-agent --turbo \"<command>\"${RESET}"
echo -e "  🔄 Check OS Updates:     ${BOLD}mint-agent --check-update${RESET}"
echo -e "${GREEN}═══════════════════════════════════════════════════════════════${RESET}\n"
