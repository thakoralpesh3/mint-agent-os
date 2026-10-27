#!/usr/bin/env bash
# ==============================================================================
# MintPilot: Stark Industries Marvel AI Desktop & Hotkey Integrator
# Configures Cinnamon shortcuts, application launchers, and terminal integrations.
# ==============================================================================

set -e

GREEN="\033[1;32m"
CYAN="\033[1;36m"
YELLOW="\033[1;33m"
RESET="\033[0m"

echo -e "${CYAN}╔═══════════════════════════════════════════════════════════════╗${RESET}"
echo -e "${CYAN}║    ⚡ STARK INDUSTRIES MARVEL AI CINNAMON DESKTOP INTEGRATION ║${RESET}"
echo -e "${CYAN}║          Linux Mint Hotkeys, Visor HUD & Desktop Applets      ║${RESET}"
echo -e "${CYAN}╚═══════════════════════════════════════════════════════════════╝${RESET}"

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
USER_BIN="$HOME/.local/bin"
mkdir -p "$USER_BIN"
ln -sf "$APP_DIR/agent/cli.py" "$USER_BIN/mint-agent"
chmod +x "$USER_BIN/mint-agent"
echo -e "${GREEN}✓ Linked mint-agent to $USER_BIN/mint-agent${RESET}"

# 2. Create Desktop Application Launcher
DESKTOP_DIR="$HOME/.local/share/applications"
mkdir -p "$DESKTOP_DIR"

cat << 'EOF' > "$DESKTOP_DIR/stark-marvel-agents.desktop"
[Desktop Entry]
Version=1.0
Type=Application
Name=Stark Industries Marvel AI
GenericName=Autonomous Marvel OS Agent
Comment=J.A.R.V.I.S., F.R.I.D.A.Y., E.D.I.T.H., V.I.S.I.O.N. Cyber Defense Network
Exec=mint-agent --hud
Icon=utilities-terminal
Terminal=true
Categories=System;Security;Utility;
Keywords=Jarvis;Friday;Edith;Vision;Stark;Marvel;AI;Agent;
StartupNotify=true
EOF

chmod +x "$DESKTOP_DIR/stark-marvel-agents.desktop"
echo -e "${GREEN}✓ Created Stark Industries desktop launcher in $DESKTOP_DIR${RESET}"

# 3. Configure Cinnamon Custom Hotkeys via gsettings (if cinnamon desktop is active)
if command -v gsettings &>/dev/null; then
    echo -e "\n${YELLOW}Configuring Cinnamon Super-Key Shortcuts:${RESET}"
    echo -e "  • ${CYAN}Super + J${RESET} -> J.A.R.V.I.S. Voice & Diagnostic Sweep"
    echo -e "  • ${CYAN}Super + F${RESET} -> F.R.I.D.A.Y. Tactical Combat & Threat Neutralizer"
    echo -e "  • ${CYAN}Super + E${RESET} -> E.D.I.T.H. Orbital Tactical Grid Scan"
    echo -e "  • ${CYAN}Super + H${RESET} -> Iron Man Visor Tactical HUD Overlay"

    # Define hotkey array for Cinnamon
    BINDINGS=(
        "custom0:J.A.R.V.I.S. Command:mint-agent 'Jarvis, system status':<Super>j"
        "custom1:F.R.I.D.A.Y. Combat:mint-agent --protocol instant_kill:<Super>f"
        "custom2:E.D.I.T.H. Scan:mint-agent --edith-scan:<Super>e"
        "custom3:Stark Visor HUD:mint-agent --hud:<Super>h"
    )

    CURRENT_LIST=$(gsettings get org.cinnamon.desktop.keybindings custom-list 2>/dev/null || echo "[]")
    
    for item in "${BINDINGS[@]}"; do
        IFS=":" read -r ID NAME CMD BIND <<< "$item"
        SCHEMA="org.cinnamon.desktop.keybindings.custom-keybinding:/org/cinnamon/desktop/keybindings/custom-keybindings/$ID/"
        gsettings set "$SCHEMA" name "$NAME" 2>/dev/null || true
        gsettings set "$SCHEMA" command "$CMD" 2>/dev/null || true
        gsettings set "$SCHEMA" binding "['$BIND']" 2>/dev/null || true
    done

    # Add custom bindings to custom-list if not already present
    gsettings set org.cinnamon.desktop.keybindings custom-list "['custom0', 'custom1', 'custom2', 'custom3']" 2>/dev/null || true
    echo -e "${GREEN}✓ Registered Cinnamon hotkeys successfully.${RESET}"
fi

# 4. Sound Test
echo -e "\n${YELLOW}Testing Stark Sound Effects Engine...${RESET}"
python3 "$APP_DIR/agent/core/stark_sfx.py" chime || true

echo -e "\n${GREEN}⚡ Stark Industries Marvel AI Desktop Integration Completed!${RESET}"
echo -e "  • Run: ${CYAN}mint-agent --theatre${RESET} for Coordinated Multi-Agent mission"
echo -e "  • Run: ${CYAN}mint-agent --hud${RESET} for Visor HUD"
echo -e "  • Run: ${CYAN}mint-agent --edith-scan${RESET} for Tactical AR Scan"
