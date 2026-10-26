#!/usr/bin/env bash
# Wrapper forwarding to upgrade_mint_to_agent_os.sh
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
exec "$SCRIPT_DIR/upgrade_mint_to_agent_os.sh" "$@"
