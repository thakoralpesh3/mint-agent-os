#!/usr/bin/env python3
"""
Permission Manager for MintPilot on Linux Mint
Enables dual operational modes:
- Turbo Mode (Antigravity-Style): Full autonomy, zero permission prompts, continuous self-healing execution.
- Safe Mode: Intercepts sensitive operations (shell commands, file alterations, browser actions, system power)
  and requests explicit user confirmation before completing tasks.
"""

import os
import json
from pathlib import Path
from typing import Dict, Any, Optional, Callable

CONFIG_PATH = Path(__file__).resolve().parent.parent / "config" / "settings.json"


class PermissionManager:
    """Controls action authorization policies and permission modes."""

    # Sensitive operations requiring approval in Safe Mode
    SENSITIVE_ACTIONS = [
        "terminal_execute",
        "install_packages",
        "power_action",
        "kill_process",
        "browser_click",
        "browser_fill",
        "program_save",
        "file_write",
        "file_delete"
    ]

    def __init__(self, mode: Optional[str] = None):
        self.config_path = CONFIG_PATH
        self.mode = mode or self._load_mode_from_config()
        self.pending_approvals: Dict[str, Dict[str, Any]] = {}
        self._approval_callback: Optional[Callable[[Dict[str, Any]], bool]] = None

    def _load_mode_from_config(self) -> str:
        """Loads mode from settings.json; defaults to 'turbo' if absent."""
        if self.config_path.exists():
            try:
                with open(self.config_path, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    return data.get("mode", "turbo").lower()
            except Exception:
                pass
        return "turbo"

    def set_mode(self, mode: str) -> str:
        """Updates mode ('turbo' or 'safe') and persists to configuration."""
        clean_mode = mode.lower().strip()
        if clean_mode not in ["turbo", "safe"]:
            raise ValueError(f"Invalid mode '{mode}'. Must be 'turbo' or 'safe'.")

        self.mode = clean_mode

        # Persist to settings.json
        if self.config_path.exists():
            try:
                with open(self.config_path, "r", encoding="utf-8") as f:
                    data = json.load(f)
                data["mode"] = self.mode
                with open(self.config_path, "w", encoding="utf-8") as f:
                    json.dump(data, f, indent=2)
            except Exception:
                pass

        return self.mode

    def is_turbo(self) -> bool:
        """Returns True if running in unrestricted autonomous Turbo Mode."""
        return self.mode == "turbo"

    def register_approval_callback(self, callback: Callable[[Dict[str, Any]], bool]):
        """Registers a UI or CLI callback handler to prompt the user for approval."""
        self._approval_callback = callback

    def check_permission(self, action_type: str, details: Dict[str, Any], prompt_cli: bool = False) -> Dict[str, Any]:
        """
        Evaluates whether the proposed action is permitted to execute.
        Returns:
          {"allowed": True} or {"allowed": False, "reason": "Requires user approval", "pending_id": ...}
        """
        # In Turbo Mode, everything is permitted immediately
        if self.is_turbo():
            return {
                "allowed": True,
                "mode": "turbo",
                "notice": "Autonomous Turbo Mode active: Executed without prompts."
            }

        # In Safe Mode, check if action is sensitive
        is_sensitive = action_type in self.SENSITIVE_ACTIONS or details.get("is_sensitive", False)

        if not is_sensitive:
            return {"allowed": True, "mode": "safe", "notice": "Non-sensitive read-only operation."}

        # Sensitive action in Safe Mode: Needs Approval
        action_id = f"act_{len(self.pending_approvals) + 1}_{action_type}"
        record = {
            "id": action_id,
            "action_type": action_type,
            "details": details,
            "status": "pending"
        }
        self.pending_approvals[action_id] = record

        # If a UI callback is registered, trigger it
        if self._approval_callback:
            approved = self._approval_callback(record)
            if approved:
                record["status"] = "approved"
                return {"allowed": True, "mode": "safe", "approved_by": "user_ui"}
            else:
                record["status"] = "rejected"
                return {"allowed": False, "reason": "User denied action in UI.", "mode": "safe"}

        # If CLI interactive prompt requested
        if prompt_cli:
            print(f"\n\033[1;33m[SAFE MODE PERMISSION REQUEST]\033[0m")
            print(f"Action: \033[1;36m{action_type}\033[0m")
            print(f"Details: {json.dumps(details, indent=2)}")
            try:
                ans = input("Approve this action? (y/N): ").strip().lower()
                if ans in ["y", "yes"]:
                    record["status"] = "approved"
                    return {"allowed": True, "mode": "safe", "approved_by": "cli_user"}
                else:
                    record["status"] = "rejected"
                    return {"allowed": False, "reason": "Action rejected by user.", "mode": "safe"}
            except (KeyboardInterrupt, EOFError):
                record["status"] = "rejected"
                return {"allowed": False, "reason": "Prompt aborted by user.", "mode": "safe"}

        # Pending approval (e.g. for WebUI modal poll)
        return {
            "allowed": False,
            "reason": "Safe Mode requires explicit user approval.",
            "mode": "safe",
            "pending_id": action_id,
            "action": record
        }

    def resolve_pending(self, action_id: str, approved: bool) -> bool:
        """Resolves a pending approval from WebUI or remote signal."""
        if action_id in self.pending_approvals:
            self.pending_approvals[action_id]["status"] = "approved" if approved else "rejected"
            return True
        return False
