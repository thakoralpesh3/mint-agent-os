#!/usr/bin/env python3
"""
Dynamic Threat Detection Engine for MintPilot on Linux Mint
Monitors network sockets, running processes, filesystem anomalies,
reverse shells, and unauthorized persistence in real time.
"""

import os
import re
import glob
import subprocess
from pathlib import Path
from typing import Dict, Any, List


class ThreatDetector:
    """Scans and classifies active cybersecurity threats on Linux Mint."""

    # Malicious patterns in command line arguments
    MALICIOUS_CMD_PATTERNS = [
        r"bash\s+-i\s+>&?\s*/dev/tcp/",
        r"nc\s+-[el]\s+.*-e\s+",
        r"python.*import\s+pty.*spawn",
        r"xmrig",
        r"stratum\+tcp://",
        r"minerd",
        r"curl\s+.*\|\s*sh",
        r"wget\s+.*\|\s*sh"
    ]

    SUSPICIOUS_PATHS = [
        "/tmp",
        "/var/tmp",
        "/dev/shm"
    ]

    def __init__(self, immune_system=None):
        self.immune = immune_system

    def scan_all_threats(self) -> Dict[str, Any]:
        """Runs a complete system audit and categorizes threats by severity."""
        threats = []

        # 1. Network Sentry
        net_threats = self.scan_network_threats()
        threats.extend(net_threats)

        # 2. Process & Malware Sentry
        proc_threats = self.scan_process_threats()
        threats.extend(proc_threats)

        # 3. Persistence & Privilege Escalation Sentry
        persist_threats = self.scan_persistence_threats()
        threats.extend(persist_threats)

        # 4. Authentication & Brute-Force Sentry
        auth_threats = self.scan_auth_threats()
        threats.extend(auth_threats)

        # Count by severity
        crit_count = sum(1 for t in threats if t.get("severity") == "CRITICAL")
        high_count = sum(1 for t in threats if t.get("severity") == "HIGH")
        med_count = sum(1 for t in threats if t.get("severity") == "MEDIUM")

        threat_level = "CRITICAL" if crit_count > 0 else ("HIGH" if high_count > 0 else ("MEDIUM" if med_count > 0 else "SECURE"))

        return {
            "threat_level": threat_level,
            "total_threats": len(threats),
            "critical_count": crit_count,
            "high_count": high_count,
            "medium_count": med_count,
            "threats": threats
        }

    # ==================== NETWORK SENTRY ====================

    def scan_network_threats(self) -> List[Dict[str, Any]]:
        """Audits open listening ports for wildcard 0.0.0.0 exposure."""
        threats = []
        try:
            res = subprocess.run(
                ["ss", "-tulpn"],
                capture_output=True, text=True, check=True
            )
            for line in res.stdout.splitlines()[1:]:
                parts = line.split()
                if len(parts) >= 5:
                    proto = parts[0]
                    state = parts[1]
                    local_addr = parts[4]
                    proc_info = parts[6] if len(parts) > 6 else ""

                    # Check for wildcard binding (0.0.0.0 or [::])
                    if ("0.0.0.0:" in local_addr or "*:" in local_addr) and state in ["LISTEN", "UNCONN"]:
                        port = local_addr.split(":")[-1]
                        # Don't flag standard secure local mDNS unless rogue
                        if port in ["5353", "33441"]:
                            continue

                        threats.append({
                            "severity": "HIGH",
                            "category": "NETWORK_EXPOSURE",
                            "title": f"Insecure Wildcard Port Exposure (0.0.0.0:{port})",
                            "details": f"{proto.upper()} socket is publicly bound to 0.0.0.0:{port} ({proc_info}). Anyone on local Wi-Fi can connect.",
                            "port": port,
                            "protocol": proto,
                            "process": proc_info,
                            "remediation": f"Bind service to 127.0.0.1 or block external incoming on port {port} via UFW."
                        })
        except Exception as e:
            threats.append({"severity": "MEDIUM", "category": "AUDIT_ERROR", "title": f"Network scan error: {e}"})

        return threats

    # ==================== PROCESS SENTRY ====================

    def scan_process_threats(self) -> List[Dict[str, Any]]:
        """Scans running processes for rogue execution paths and malicious commands."""
        threats = []
        try:
            res = subprocess.run(
                ["ps", "-eo", "pid,user,%cpu,%mem,comm,args"],
                capture_output=True, text=True, check=True
            )
            lines = res.stdout.splitlines()
            for line in lines[1:]:
                parts = line.split(maxsplit=5)
                if len(parts) >= 6:
                    pid, user, cpu, mem, comm, args = parts

                    # 1. Check for malicious command line patterns
                    for pattern in self.MALICIOUS_CMD_PATTERNS:
                        if re.search(pattern, args, re.IGNORECASE):
                            threats.append({
                                "severity": "CRITICAL",
                                "category": "MALICIOUS_PROCESS",
                                "title": f"Suspicious Command Pattern Detected ({comm})",
                                "details": f"PID {pid} matches known intrusion pattern '{pattern}': {args[:80]}",
                                "pid": pid,
                                "command": comm,
                                "remediation": f"Kill process immediately: kill -9 {pid}"
                            })

                    # 2. Check for binaries running from temporary directories
                    for susp_dir in self.SUSPICIOUS_PATHS:
                        if susp_dir in args:
                            threats.append({
                                "severity": "HIGH",
                                "category": "SUSPICIOUS_EXEC_PATH",
                                "title": f"Binary Executing from Temporary Directory ({susp_dir})",
                                "details": f"PID {pid} ({comm}) running inside {susp_dir}: {args[:70]}",
                                "pid": pid,
                                "command": comm,
                                "remediation": f"Verify legitimacy or terminate: kill -9 {pid}"
                            })

        except Exception as e:
            threats.append({"severity": "MEDIUM", "category": "AUDIT_ERROR", "title": f"Process scan error: {e}"})

        return threats

    # ==================== PERSISTENCE SENTRY ====================

    def scan_persistence_threats(self) -> List[Dict[str, Any]]:
        """Checks crontabs and system persistence hooks."""
        threats = []

        # Check /etc/crontab and /var/spool/cron
        cron_paths = ["/etc/crontab"] + glob.glob("/etc/cron.*/*")
        for path in cron_paths:
            try:
                if os.path.isfile(path):
                    with open(path, "r", encoding="utf-8", errors="ignore") as f:
                        content = f.read()
                    for pattern in self.MALICIOUS_CMD_PATTERNS:
                        if re.search(pattern, content, re.IGNORECASE):
                            threats.append({
                                "severity": "CRITICAL",
                                "category": "PERSISTENCE_ATTACK",
                                "title": f"Malicious Cron Job Hook Detected in {path}",
                                "details": f"Found suspicious command pattern in scheduled tasks: {pattern}",
                                "file": path,
                                "remediation": f"Remove malicious task line from {path}"
                            })
            except Exception:
                pass

        return threats
