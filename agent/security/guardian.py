#!/usr/bin/env python3
"""
Master Security Guardian Coordinator for MintPilot on Linux Mint
Combines self-defense integrity monitoring, dynamic threat detection,
firewall remediation, and autonomous incident response.
"""

from typing import Dict, Any, List, Optional
from agent.security.self_defense import SelfDefenseGuardian
from agent.security.threat_detector import ThreatDetector
from agent.security.remediation import SecurityRemediation
from agent.core.permission_manager import PermissionManager


class SecurityGuardian:
    """The chief cybersecurity protector for the PC and MintPilot."""

    def __init__(self, permission_manager: Optional[PermissionManager] = None):
        self.permissions = permission_manager or PermissionManager()
        self.self_defense = SelfDefenseGuardian()
        self.detector = ThreatDetector()
        self.remediation = SecurityRemediation()

    def get_full_security_posture(self) -> Dict[str, Any]:
        """Performs a comprehensive security assessment and returns unified telemetry."""
        integrity = self.self_defense.verify_integrity()
        credentials = self.self_defense.audit_credentials_and_privileges()
        threats = self.detector.scan_all_threats()
        score = self.remediation.calculate_security_score(threats, integrity)

        return {
            "security_score": score["score"],
            "grade": score["grade"],
            "badge_color": score["badge_color"],
            "firewall_active": score["firewall_active"],
            "threat_summary": threats,
            "integrity_summary": integrity,
            "privilege_summary": credentials,
            "penalties": score["penalties"],
            "recommendations": score["recommendations"],
            "mode": self.permissions.mode
        }

    def scan_and_remediate(self, auto_neutralize: Optional[bool] = None) -> Dict[str, Any]:
        """
        Scans for threats.
        In Turbo Mode (or if auto_neutralize=True), automatically neutralizes critical threats.
        In Safe Mode, logs threats and flags them for interactive user approval.
        """
        threats_data = self.detector.scan_all_threats()
        active_threats = threats_data.get("threats", [])
        remediated_actions = []
        pending_actions = []

        is_turbo = self.permissions.is_turbo() if auto_neutralize is None else auto_neutralize

        for t in active_threats:
            severity = t.get("severity")
            # If critical malicious process found
            if severity == "CRITICAL" and "pid" in t:
                pid = t["pid"]
                if is_turbo:
                    res = self.remediation.terminate_process(pid)
                    remediated_actions.append({"threat": t["title"], "action": "terminated_process", "pid": pid, "result": res})
                else:
                    pending_actions.append({"threat": t, "action": f"kill -9 {pid}"})

            # If hostile external IP found
            if "hostile_ip" in t:
                ip = t["hostile_ip"]
                if is_turbo:
                    res = self.remediation.block_ip(ip)
                    remediated_actions.append({"threat": t["title"], "action": "blocked_ip", "ip": ip, "result": res})
                else:
                    pending_actions.append({"threat": t, "action": f"ufw deny from {ip}"})

        return {
            "threat_level": threats_data.get("threat_level"),
            "total_threats": len(active_threats),
            "remediated_count": len(remediated_actions),
            "remediated_actions": remediated_actions,
            "pending_approvals_count": len(pending_actions),
            "pending_actions": pending_actions,
            "mode_executed": "turbo_autonomous" if is_turbo else "safe_guarded"
        }

    def lockdown(self) -> Dict[str, Any]:
        """Enforces emergency system lockdown."""
        return self.remediation.emergency_lockdown()
