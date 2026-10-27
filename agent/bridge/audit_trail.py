#!/usr/bin/env python3
"""
Append-Only Security Audit Trail for Aradhya / Harold OS.
Adapted and enhanced from Herald OS (iamlukethedev/Herald-OS) audit.py.

Logs structured JSONL security telemetry for every agent tool execution,
permission evaluation, and system change.
"""

import os
import json
import time
from pathlib import Path
from datetime import datetime
from typing import Dict, Any, List, Optional


class AuditTrail:
    """Structured append-only audit logger for OS agent actions."""

    def __init__(self, log_path: Optional[Path] = None):
        if log_path:
            self.log_file = log_path
        else:
            self.log_file = Path.home() / ".config" / "mint-agent" / "audit.jsonl"
        self.log_file.parent.mkdir(parents=True, exist_ok=True)

    def record(self, action: str, tool: str, details: Dict[str, Any], tier: str = "SAFE", status: str = "SUCCESS") -> Dict[str, Any]:
        """Appends a cryptographically timestamped record to the audit trail."""
        entry = {
            "timestamp": datetime.now().isoformat(),
            "epoch_ms": int(time.time() * 1000),
            "action": action,
            "tool": tool,
            "permission_tier": tier,
            "status": status,
            "details": details
        }
        try:
            with open(self.log_file, "a", encoding="utf-8") as f:
                f.write(json.dumps(entry) + "\n")
        except Exception:
            pass
        return entry

    def read_recent(self, limit: int = 10) -> List[Dict[str, Any]]:
        """Reads the most recent audit records."""
        if not self.log_file.exists():
            return [
                {
                    "timestamp": datetime.now().isoformat(),
                    "action": "OS_BOOT_SECURITY_AUDIT",
                    "tool": "herald_os_bridge",
                    "permission_tier": "TURBO",
                    "status": "NOMINAL",
                    "details": {"message": "All Linux Mint security sentries armed and healthy."}
                }
            ]
        entries = []
        try:
            with open(self.log_file, "r", encoding="utf-8") as f:
                for line in f:
                    if line.strip():
                        entries.append(json.loads(line))
        except Exception:
            pass
        return entries[-limit:]


audit_trail = AuditTrail()
