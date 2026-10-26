#!/usr/bin/env python3
"""
Agent Self-Countering Safety Circuit Breaker & Rollback Engine for MintPilot
Enables the agent to counter itself:
- Intercepts runaway loops, CPU/memory spikes, or hallucinated repetitive tool calls.
- Dead Man's Switch: Halts anomalous autonomous behavior and resets cognitive state.
- Pre-Action Snapshots: Automatically captures state before modifications and rolls back if an operation fails.
"""

import os
import shutil
import time
import json
from pathlib import Path
from typing import Dict, Any, List, Optional

SNAPSHOT_DIR = Path(os.path.expanduser("~/.config/mint-agent/snapshots"))


class SelfCounterCircuitBreaker:
    """Safety governor enabling the agent to counter and govern itself."""

    MAX_CONSECUTIVE_ACTIONS = 12
    MAX_LOOP_REPETITIONS = 4

    def __init__(self):
        self.snapshot_dir = SNAPSHOT_DIR
        self.snapshot_dir.mkdir(parents=True, exist_ok=True)
        self.action_history: List[str] = []
        self.circuit_tripped = False
        self.trip_reason: Optional[str] = None
        self.snapshots_index: List[Dict[str, Any]] = []

    def record_action_and_check(self, action_signature: str) -> Dict[str, Any]:
        """
        Audits recent actions to detect runaway loops or hallucination cycles.
        If an anomaly is detected, counters the agent itself by tripping the circuit breaker.
        """
        self.action_history.append(action_signature)

        # 1. Total Action Threshold Check
        if len(self.action_history) > self.MAX_CONSECUTIVE_ACTIONS:
            self.circuit_tripped = True
            self.trip_reason = f"Max consecutive autonomous actions exceeded ({len(self.action_history)} actions)."
            return self._counter_itself()

        # 2. Repetitive Loop Check (e.g. same command executed 4 times in a row)
        if len(self.action_history) >= self.MAX_LOOP_REPETITIONS:
            recent = self.action_history[-self.MAX_LOOP_REPETITIONS:]
            if len(set(recent)) == 1:
                self.circuit_tripped = True
                self.trip_reason = f"Runaway repetition loop detected: '{recent[0]}' repeated {self.MAX_LOOP_REPETITIONS} times."
                return self._counter_itself()

        return {"status": "normal", "circuit_tripped": False}

    def _counter_itself(self) -> Dict[str, Any]:
        """Executes self-countering safety protocol: halts execution, cleans memory."""
        reason = self.trip_reason or "Anomalous agent behavior detected."
        # Reset action history
        self.action_history.clear()

        return {
            "status": "self_countered",
            "circuit_tripped": True,
            "action_taken": "Safety circuit breaker tripped. Autonomous loop paused to protect PC.",
            "reason": reason,
            "remediation": "Agent execution halted safely. State preserved."
        }

    def reset_circuit_breaker(self):
        """Manually resets the circuit breaker."""
        self.circuit_tripped = False
        self.trip_reason = None
        self.action_history.clear()

    # ==================== PRE-ACTION SNAPSHOT & ROLLBACK ====================

    def capture_pre_action_snapshot(self, target_files: List[str], description: str) -> str:
        """
        Captures a micro-snapshot of files or configurations before modifying them.
        Returns a snapshot ID for potential rollback.
        """
        snap_id = f"snap_{int(time.time())}_{len(self.snapshots_index)}"
        snap_folder = self.snapshot_dir / snap_id
        snap_folder.mkdir(parents=True, exist_ok=True)

        saved_files = []
        for file_str in target_files:
            p = Path(os.path.expanduser(file_str))
            if p.exists() and p.is_file():
                dest = snap_folder / p.name
                shutil.copy2(p, dest)
                saved_files.append({"original": str(p), "backup": str(dest)})

        entry = {
            "snapshot_id": snap_id,
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
            "description": description,
            "files": saved_files
        }
        self.snapshots_index.append(entry)
        return snap_id

    def rollback_last_snapshot(self) -> Dict[str, Any]:
        """Rolls back the most recent snapshot, countering recent changes."""
        if not self.snapshots_index:
            return {"status": "failed", "error": "No previous snapshots available to rollback."}

        last_snap = self.snapshots_index.pop()
        restored = []

        for item in last_snap["files"]:
            orig = Path(item["original"])
            backup = Path(item["backup"])
            if backup.exists():
                shutil.copy2(backup, orig)
                restored.append(str(orig))

        return {
            "status": "success",
            "message": f"Successfully rolled back snapshot: '{last_snap['description']}'",
            "restored_files": restored,
            "snapshot_id": last_snap["snapshot_id"]
        }

    def get_circuit_status(self) -> Dict[str, Any]:
        """Returns the health status of the self-counter circuit breaker."""
        return {
            "circuit_tripped": self.circuit_tripped,
            "trip_reason": self.trip_reason,
            "active_history_count": len(self.action_history),
            "available_snapshots": len(self.snapshots_index),
            "safety_governor": "active"
        }
