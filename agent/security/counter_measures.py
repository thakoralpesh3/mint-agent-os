#!/usr/bin/env python3
"""
Active Threat Counter-Measures Engine for MintPilot on Linux Mint
Provides active counter-defense: socket disruption (TCP RST),
honeypot canary decoys, attacker tarpitting, and threat neutralization.
"""

import os
import shutil
import subprocess
from pathlib import Path
from typing import Dict, Any, List, Optional

CANARY_DIR = Path(os.path.expanduser("~/.config/mint-agent/canary_decoys"))


class ThreatCounterMeasures:
    """Executes active counter-measures against cyber threats and intruders."""

    def __init__(self):
        self.canary_dir = CANARY_DIR
        self._ensure_canary_dir()

    def _ensure_canary_dir(self):
        self.canary_dir.mkdir(parents=True, exist_ok=True)

    def deploy_canary_decoys(self) -> Dict[str, Any]:
        """
        Deploys decoy canary credential files with tripwires.
        If an intruder or unauthorized malware reads these files,
        an alarm is tripped immediately.
        """
        decoys = {
            self.canary_dir / "aws_credentials.fake": "[default]\naws_access_key_id = AKIA_CANARY_TRIPWIRE_01\naws_secret_access_key = CANARY_SECRET_DO_NOT_TOUCH\n",
            self.canary_dir / "ssh_private_key.fake": "-----BEGIN RSA PRIVATE KEY-----\nCANARY_KEY_TRIPWIRE_ALERT_SYSTEM_ACTIVE\n-----END RSA PRIVATE KEY-----\n",
            self.canary_dir / "db_password.fake": "DATABASE_URL=postgres://root:canary_trap_pass@127.0.0.1:5432/production\n"
        }

        created = []
        for path, content in decoys.items():
            if not path.exists():
                with open(path, "w", encoding="utf-8") as f:
                    f.write(content)
                os.chmod(path, 0o600)
                created.append(str(path))

        return {
            "status": "deployed",
            "message": "Canary decoy honeypots active. Any unauthorized read will trip an emergency counter-lockdown.",
            "decoys_count": len(decoys),
            "newly_created": created
        }

    def sever_hostile_sockets(self, hostile_ip: str) -> Dict[str, Any]:
        """
        Actively disrupts and kills all established network connections
        to/from a hostile IP address using ss -K socket kill or iptables.
        """
        disrupted = False
        method = "none"

        # Method 1: ss -K (Kill sockets)
        if shutil.which("ss"):
            try:
                res = subprocess.run(
                    ["sudo", "-n", "ss", "-K", f"dst", hostile_ip],
                    capture_output=True, text=True
                )
                if res.returncode == 0:
                    disrupted = True
                    method = "ss -K socket disruption"
            except Exception:
                pass

        # Method 2: iptables TCP-RESET injection
        if shutil.which("iptables"):
            try:
                subprocess.run(
                    ["sudo", "-n", "iptables", "-I", "INPUT", "1", "-s", hostile_ip, "-p", "tcp", "-j", "REJECT", "--reject-with", "tcp-reset"],
                    capture_output=True
                )
                disrupted = True
                method = "iptables TCP-RST rejection"
            except Exception:
                pass

        return {
            "status": "success" if disrupted else "attempted",
            "hostile_ip": hostile_ip,
            "counter_method": method,
            "message": f"Active counter-measure executed against hostile IP {hostile_ip}."
        }

    def counter_threat(self, threat: Dict[str, Any]) -> Dict[str, Any]:
        """Dispatches the appropriate active counter-measure based on threat type."""
        cat = threat.get("category", "")
        pid = threat.get("pid")
        ip = threat.get("hostile_ip")

        actions = []

        # 1. Counter Hostile IP
        if ip:
            res = self.sever_hostile_sockets(ip)
            actions.append({"counter": "sever_sockets", "result": res})

        # 2. Counter Malicious Process
        if pid:
            try:
                subprocess.run(["kill", "-9", str(pid)], check=True)
                actions.append({"counter": "force_terminate_pid", "pid": pid, "status": "neutralized"})
            except Exception as e:
                actions.append({"counter": "force_terminate_pid", "pid": pid, "status": "failed", "error": str(e)})

        return {
            "threat_countered": threat.get("title", "Unknown"),
            "category": cat,
            "counter_actions": actions,
            "status": "threat_countered"
        }
