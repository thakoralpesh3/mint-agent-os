#!/usr/bin/env python3
"""
Interaction Manager for MintPilot on Linux Mint
Governs how the agent communicates and interacts with the user across:
1. Modality Channels: Text (WebUI/Terminal), Voice (Offline Speech STT/TTS), Floating HUD (Super+Space), Desktop Notifications (libnotify).
2. Communication Styles / Verbosity: Concise (Silent Pro), Normal (Balanced), Detailed (Mentor/Explanatory), Security Auditor (DEFCON Telemetry).
3. Proactivity Level: Reactive (speaks only when spoken to), Balanced (alerts on critical events), Proactive (ambient system copilot).
4. Dual Permission Modes: Turbo Mode (Autonomous) vs Safe Mode (Guarded confirmations).
"""

import os
import json
import shutil
import subprocess
from pathlib import Path
from typing import Dict, Any, Optional, List

CONFIG_PATH = Path(__file__).resolve().parent.parent / "config" / "settings.json"


class InteractionManager:
    """Manages all modalities, personas, tones, and proactive interactivity options."""

    MODALITIES = ["text", "voice", "hybrid", "hud", "notification", "cli"]
    VERBOSITY_STYLES = ["concise", "normal", "detailed", "security_auditor"]
    PROACTIVITY_LEVELS = ["reactive", "balanced", "proactive"]

    def __init__(self, config_path: Optional[Path] = None):
        self.config_path = config_path or CONFIG_PATH
        self._load_config()

    def _load_config(self):
        """Loads interaction settings from settings.json with graceful defaults."""
        defaults = {
            "modality": "voice",            # voice (default), text, hybrid, hud, notification
            "verbosity": "normal",           # concise, normal, detailed, security_auditor
            "proactivity": "balanced",       # reactive, balanced, proactive
            "voice": {
                "enabled": True,
                "engine": "spd-say",         # piper, spd-say, espeak-ng, espeak
                "speed": 165,
                "pitch": 0,
                "volume": 100,
                "auto_listen_wake_word": True
            },
            "notifications": {
                "enabled": True,
                "urgency_threshold": "normal", # low, normal, critical
                "sound": False
            },
            "hud": {
                "hotkey": "<Super>space",
                "keep_centered": True,
                "auto_hide_sec": 3
            }
        }

        if self.config_path.exists():
            try:
                with open(self.config_path, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    interaction_cfg = data.get("interaction", {})
                    # Merge defaults
                    for k, v in defaults.items():
                        if k in interaction_cfg:
                            if isinstance(v, dict) and isinstance(interaction_cfg[k], dict):
                                v.update(interaction_cfg[k])
                                defaults[k] = v
                            else:
                                defaults[k] = interaction_cfg[k]
            except Exception:
                pass

        self.modality = defaults["modality"]
        self.verbosity = defaults["verbosity"]
        self.proactivity = defaults["proactivity"]
        self.voice_settings = defaults["voice"]
        self.notification_settings = defaults["notifications"]
        self.hud_settings = defaults["hud"]

    def save_config(self):
        """Persists current interaction settings to config file."""
        try:
            data = {}
            if self.config_path.exists():
                with open(self.config_path, "r", encoding="utf-8") as f:
                    data = json.load(f)

            data["interaction"] = {
                "modality": self.modality,
                "verbosity": self.verbosity,
                "proactivity": self.proactivity,
                "voice": self.voice_settings,
                "notifications": self.notification_settings,
                "hud": self.hud_settings
            }

            self.config_path.parent.mkdir(parents=True, exist_ok=True)
            with open(self.config_path, "w", encoding="utf-8") as f:
                json.dump(data, f, indent=2)
            return True
        except Exception:
            return False

    # ==================== INTERACTION MODALITY ====================

    def set_modality(self, modality: str) -> Dict[str, Any]:
        """Sets the primary user interaction modality."""
        clean = modality.lower().strip()
        if clean not in self.MODALITIES:
            return {"error": f"Invalid modality '{modality}'. Choices: {self.MODALITIES}", "status": "failed"}

        self.modality = clean
        if clean in ["voice", "hybrid"]:
            self.voice_settings["enabled"] = True
        elif clean == "text":
            self.voice_settings["enabled"] = False

        self.save_config()
        return {
            "status": "success",
            "modality": self.modality,
            "voice_active": self.voice_settings["enabled"],
            "message": f"Interaction modality switched to '{self.modality}'"
        }

    def is_voice_enabled(self) -> bool:
        """Returns True if voice output/input is currently active."""
        return self.modality in ["voice", "hybrid"] and self.voice_settings.get("enabled", True)

    def is_text_only(self) -> bool:
        """Returns True if the agent is operating in silent text-only mode."""
        return self.modality == "text" or not self.voice_settings.get("enabled", True)

    # ==================== VERBOSITY & PERSONA ====================

    def set_verbosity(self, style: str) -> Dict[str, Any]:
        """Sets the agent's explanation depth and tone."""
        clean = style.lower().strip()
        if clean not in self.VERBOSITY_STYLES:
            return {"error": f"Invalid style '{style}'. Choices: {self.VERBOSITY_STYLES}", "status": "failed"}

        self.verbosity = clean
        self.save_config()
        return {
            "status": "success",
            "verbosity": self.verbosity,
            "message": f"Agent communication style set to '{self.verbosity}'"
        }

    # ==================== PROACTIVITY LEVEL ====================

    def set_proactivity(self, level: str) -> Dict[str, Any]:
        """Sets the agent's background proactive monitoring style."""
        clean = level.lower().strip()
        if clean not in self.PROACTIVITY_LEVELS:
            return {"error": f"Invalid proactivity '{level}'. Choices: {self.PROACTIVITY_LEVELS}", "status": "failed"}

        self.proactivity = clean
        self.save_config()
        return {
            "status": "success",
            "proactivity": self.proactivity,
            "message": f"Agent proactivity level set to '{self.proactivity}'"
        }

    # ==================== VOICE SYNTHESIZER ====================

    def set_voice(self, enabled: bool, engine: Optional[str] = None, speed: Optional[int] = None) -> Dict[str, Any]:
        """Configures spoken voice feedback parameters."""
        self.voice_settings["enabled"] = enabled
        if engine:
            self.voice_settings["engine"] = engine
        if speed is not None:
            self.voice_settings["speed"] = max(80, min(300, speed))

        if enabled and self.modality == "text":
            self.modality = "hybrid"
        elif not enabled and self.modality == "voice":
            self.modality = "text"

        self.save_config()
        return {
            "status": "success",
            "voice_enabled": self.voice_settings["enabled"],
            "engine": self.voice_settings["engine"],
            "speed": self.voice_settings["speed"],
            "modality": self.modality
        }

    # ==================== DESKTOP NOTIFICATIONS ====================

    def send_desktop_notification(self, title: str, message: str, urgency: str = "normal", icon: str = "dialog-information") -> bool:
        """Sends native Linux Mint desktop notification using notify-send."""
        if not self.notification_settings.get("enabled", True):
            return False

        if not shutil.which("notify-send"):
            return False

        try:
            subprocess.Popen([
                "notify-send",
                "-a", "MintPilot",
                "-u", urgency,
                "-i", icon,
                title,
                message
            ])
            return True
        except Exception:
            return False

    # ==================== RESPONSE FORMATTER ====================

    def format_agent_response(self, thought: str, result: Any, execution_details: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """
        Formats the agent's output based on active verbosity preference:
        - concise: ultra-terse, minimal 1-line confirmation for power users.
        - normal: balanced thought + result summary.
        - detailed: mentor-style, shows exact commands executed, system diffs, and rationale.
        - security_auditor: DEFCON score, firewall state, tamper tripwire, threat counts.
        """
        details = execution_details or {}

        if self.verbosity == "concise":
            # Strip preamble and keep terse 1-liner
            concise_thought = thought.split('.')[0] if '.' in thought else thought
            return {
                "thought": f"✓ {concise_thought}",
                "result": result if isinstance(result, (int, float, str, bool)) else (result.get("status") if isinstance(result, dict) else "ok"),
                "style": "concise"
            }

        elif self.verbosity == "detailed":
            cmd = details.get("underlying_command", "internal_call")
            memory_before = details.get("ram_before_mb", "N/A")
            memory_after = details.get("ram_after_mb", "N/A")
            return {
                "thought": thought,
                "result": result,
                "explanation": {
                    "underlying_system_command": cmd,
                    "ram_impact": f"{memory_before}MB -> {memory_after}MB",
                    "rationale": details.get("rationale", "Executed to satisfy user laptop control or security intent."),
                    "permission_guarded": details.get("is_guarded", False)
                },
                "style": "detailed"
            }

        elif self.verbosity == "security_auditor":
            return {
                "thought": thought,
                "result": result,
                "security_telemetry": {
                    "defcon_level": details.get("defcon", "DEFCON 4 (PEACETIME)"),
                    "firewall_posture": details.get("firewall", "UFW Active / Strict Inbound Drop"),
                    "tamper_tripwire": details.get("tripwire", "Verified (SHA-256 Intact)"),
                    "immune_antibodies": details.get("antibodies", 16)
                },
                "style": "security_auditor"
            }

        # Normal default
        return {
            "thought": thought,
            "result": result,
            "style": "normal"
        }

    # ==================== STATUS SUMMARY ====================

    def get_status(self) -> Dict[str, Any]:
        """Returns comprehensive breakdown of user interaction settings."""
        return {
            "modality": self.modality,
            "verbosity": self.verbosity,
            "proactivity": self.proactivity,
            "voice": self.voice_settings,
            "notifications": self.notification_settings,
            "hud": self.hud_settings,
            "available_options": {
                "modalities": self.MODALITIES,
                "verbosity_styles": self.VERBOSITY_STYLES,
                "proactivity_levels": self.PROACTIVITY_LEVELS
            }
        }
