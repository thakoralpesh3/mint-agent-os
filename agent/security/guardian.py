#!/usr/bin/env python3
"""
Master Security Guardian Coordinator for MintPilot on Linux Mint
Combines self-defense integrity monitoring, dynamic threat detection,
firewall remediation, active counter-measures (socket disruption, decoys),
and the agent self-countering safety circuit breaker.
"""

from typing import Dict, Any, List, Optional
from agent.security.self_defense import SelfDefenseGuardian
from agent.security.threat_detector import ThreatDetector
from agent.security.remediation import SecurityRemediation
from agent.security.counter_measures import ThreatCounterMeasures
from agent.security.self_counter import SelfCounterCircuitBreaker
from agent.core.permission_manager import PermissionManager


class SecurityGuardian:
    """The chief cybersecurity protector for the PC and MintPilot."""

    def __init__(self, permission_manager: Optional[PermissionManager] = None):
        self.permissions = permission_manager or PermissionManager()
        self.self_defense = SelfDefenseGuardian()
        self.detector = ThreatDetector()
        self.remediation = SecurityRemediation()
        self.counter_measures = ThreatCounterMeasures()
        self.self_counter = SelfCounterCircuitBreaker()

    def get_full_security_posture(self) -> Dict[str, Any]:
        """Performs a comprehensive security assessment and returns unified telemetry."""
        integrity = self.self_defense.verify_integrity()
        credentials = self.self_defense.audit_credentials_and_privileges()
        threats = self.detector.scan_all_threats()
        score = self.remediation.calculate_security_score(threats, integrity)
        circuit = self.self_counter.get_circuit_status()

        return {
            "security_score": score["score"],
            "grade": score["grade"],
            "badge_color": score["badge_color"],
            "firewall_active": score["firewall_active"],
            "threat_summary": threats,
            "integrity_summary": integrity,
            "privilege_summary": credentials,
            "circuit_breaker": circuit,
            "penalties": score["penalties"],
            "recommendations": score["recommendations"],
            "mode": self.permissions.mode
        }

    def scan_and_counter_threats(self, auto_neutralize: Optional[bool] = None) -> Dict[str, Any]:
        """
        Scans for threats and executes active counter-measures.
        In Turbo Mode: Actively counters threats immediately.
        In Safe Mode: Flags threats for interactive approval.
        """
        threats_data = self.detector.scan_all_threats()
        active_threats = threats_data.get("threats", [])
        countered_actions = []
        pending_actions = []

        is_turbo = self.permissions.is_turbo() if auto_neutralize is None else auto_neutralize

        for t in active_threats:
            severity = t.get("severity")
            if is_turbo:
                # Active counter-measure execution
                res = self.counter_measures.counter_threat(t)
                countered_actions.append(res)
            else:
                pending_actions.append({"threat": t, "recommended_counter": "neutralize_threat"})

        return {
            "threat_level": threats_data.get("threat_level"),
            "total_threats": len(active_threats),
            "countered_count": len(countered_actions),
            "countered_actions": countered_actions,
            "pending_approvals_count": len(pending_actions),
            "pending_actions": pending_actions,
            "mode_executed": "turbo_counter_active" if is_turbo else "safe_guarded"
        }

    def deploy_decoys(self) -> Dict[str, Any]:
        """Deploys honeypot canary decoy files."""
        return self.counter_measures.deploy_canary_decoys()

    def lockdown(self) -> Dict[str, Any]:
        """Enforces emergency system lockdown."""
        return self.remediation.emergency_lockdown()

    def rollback_last_change(self) -> Dict[str, Any]:
        """Counters the agent's recent actions by rolling back the last state snapshot."""
        return self.self_counter.rollback_last_snapshot()
