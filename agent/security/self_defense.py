#!/usr/bin/env python3
"""
PC Self-Defense & Anti-Tamper Guardian for MintPilot
Protects the agent's core processes, configuration files, systemd services,
SSH keys, and root privileges against tampering, deletion, or hijacking.
"""

import os
import hashlib
import json
from pathlib import Path
from typing import Dict, Any, List

ROOT_DIR = Path(__file__).resolve().parent.parent.parent
AGENT_DIR = ROOT_DIR / "agent"
TRIPWIRE_DB = AGENT_DIR / "config" / "integrity_hashes.json"


class SelfDefenseGuardian:
    """Guards the agent and critical system files against tampering."""

    CRITICAL_FILES = [
        AGENT_DIR / "main.py",
        AGENT_DIR / "cli.py",
        AGENT_DIR / "brain" / "inference.py",
        AGENT_DIR / "core" / "permission_manager.py",
        AGENT_DIR / "config" / "settings.json",
        ROOT_DIR / "iso_builder" / "configs" / "mint-agent.service"
    ]

    def __init__(self):
        self.tripwire_db = TRIPWIRE_DB
        self._ensure_integrity_baseline()

    def _hash_file(self, filepath: Path) -> str:
        """Computes SHA-256 hash of a file."""
        if not filepath.exists():
            return "FILE_MISSING"
        h = hashlib.sha256()
        with open(filepath, "rb") as f:
            while chunk := f.read(8192):
                h.update(chunk)
        return h.hexdigest()

    def _ensure_integrity_baseline(self):
        """Creates an initial cryptographic tripwire baseline if not present."""
        if not self.tripwire_db.exists():
            baseline = {}
            for path in self.CRITICAL_FILES:
                if path.exists():
                    baseline[str(path)] = self._hash_file(path)
            self.tripwire_db.parent.mkdir(parents=True, exist_ok=True)
            with open(self.tripwire_db, "w", encoding="utf-8") as f:
                json.dump(baseline, f, indent=2)

    def verify_integrity(self) -> Dict[str, Any]:
        """Verifies cryptographic hashes against the verified baseline."""
        if not self.tripwire_db.exists():
            self._ensure_integrity_baseline()

        with open(self.tripwire_db, "r", encoding="utf-8") as f:
            baseline = json.load(f)

        tampered_files = []
        verified_count = 0

        for path_str, expected_hash in baseline.items():
            path = Path(path_str)
            if not path.exists():
                tampered_files.append({"file": path_str, "status": "deleted_or_missing"})
                continue
            current_hash = self._hash_file(path)
            if current_hash != expected_hash:
                tampered_files.append({
                    "file": path_str,
                    "status": "hash_mismatch_modified",
                    "expected": expected_hash[:12] + "...",
                    "current": current_hash[:12] + "..."
                })
            else:
                verified_count += 1

        is_intact = len(tampered_files) == 0
        return {
            "status": "secure" if is_intact else "tampering_detected",
            "is_intact": is_intact,
            "verified_files": verified_count,
            "tampered_files": tampered_files
        }

    def update_integrity_baseline(self) -> Dict[str, Any]:
        """Updates baseline hashes after an intentional authorized code upgrade."""
        baseline = {}
        for path in self.CRITICAL_FILES:
            if path.exists():
                baseline[str(path)] = self._hash_file(path)
        with open(self.tripwire_db, "w", encoding="utf-8") as f:
            json.dump(baseline, f, indent=2)
        return {"status": "baseline_updated", "count": len(baseline)}

    def audit_credentials_and_privileges(self) -> Dict[str, Any]:
        """Audits SSH keys, sudoers, and root permissions for privilege escalation."""
        findings = []

        # 1. SSH directory permissions
        ssh_dir = Path(os.path.expanduser("~/.ssh"))
        if ssh_dir.exists():
            stat_info = os.stat(ssh_dir)
            mode = oct(stat_info.st_mode)[-3:]
            if mode not in ["700", "750"]:
                findings.append({
                    "severity": "HIGH",
                    "issue": f"Insecure ~/.ssh directory permissions ({mode}). Should be 700.",
                    "fix": "chmod 700 ~/.ssh"
                })

            for key in ssh_dir.glob("id_*"):
                if not key.name.endswith(".pub"):
                    key_mode = oct(os.stat(key).st_mode)[-3:]
                    if key_mode not in ["600", "400"]:
                        findings.append({
                            "severity": "HIGH",
                            "issue": f"Insecure private key permissions for {key.name} ({key_mode}).",
                            "fix": f"chmod 600 {key}"
                        })

        # 2. Check /etc/sudoers.d/ for loose files
        sudoers_d = Path("/etc/sudoers.d")
        if sudoers_d.exists():
            for f in sudoers_d.iterdir():
                if f.is_file():
                    mode = oct(os.stat(f).st_mode)[-3:]
                    if mode != "440":
                        findings.append({
                            "severity": "CRITICAL",
                            "issue": f"Loose sudoers configuration file: {f.name} ({mode}). Must be 0440.",
                            "fix": f"sudo chmod 0440 {f}"
                        })

        return {
            "status": "secure" if not findings else "vulnerabilities_found",
            "findings_count": len(findings),
            "findings": findings
        }
