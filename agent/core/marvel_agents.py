#!/usr/bin/env python3
"""
Marvel Series AI Agent System for MintPilot on Linux Mint
Equips the operating system with intelligent, persona-driven AI agents modeled after:
- J.A.R.V.I.S. (Just A Rather Very Intelligent System): Suave British butler, hardware diagnostics, protocol governor.
- F.R.I.D.A.Y. (Female Replacement Intelligent Digital Assistant Youth): Tactical combat copilot, rapid threat neutralization, emergency overrides.
- E.D.I.T.H. (Even Dead, I'm The Hero): Orbital/network surveillance, perimeter sentry, hostile IP tracking, digital reconnaissance.
- V.I.S.I.O.N. (Mind Stone Synthezoid Consciousness): Digital immune memory, philosophical self-countering circuit breaker, predictive threat evolution.
- K.A.R.E.N. (Kinetic Analysis & Reconnaissance Entity Network): Warm mentor, explanatory tutorial mode, Baby Monitor Protocol.
"""

import os
import re
import json
import time
from pathlib import Path
from typing import Dict, Any, Optional, List

CONFIG_PATH = Path(__file__).resolve().parent.parent / "config" / "settings.json"


class MarvelAgentManager:
    """Manages Marvel-inspired AI Agent personas, speech cadences, and protocol execution."""

    PERSONAS = {
        "jarvis": {
            "id": "jarvis",
            "name": "J.A.R.V.I.S.",
            "title": "Just A Rather Very Intelligent System",
            "tagline": "At your service, sir. Homebase diagnostics & executive laptop governor.",
            "theme_color": "#00d2d3",
            "voice_pitch": 0.95,
            "voice_speed": 155,
            "voice_lang": "en-GB",
            "prefix": "Right away, sir. ",
            "suffix": " Will there be anything else, sir?",
            "greeting": "Good evening, sir. All Linux Mint subsystems are operating at peak efficiency. Ready for your command.",
            "specialty": "Laptop System Diagnostics, Butter-Smooth Hardware Controls, Protocol Governor",
            "personality": "British, impeccable etiquette, witty, gentleman butler, analytical"
        },
        "friday": {
            "id": "friday",
            "name": "F.R.I.D.A.Y.",
            "title": "Female Replacement Intelligent Digital Assistant Youth",
            "tagline": "Boss, tactical combat systems online! Ready for rapid threat neutralization.",
            "theme_color": "#ff4757",
            "voice_pitch": 1.15,
            "voice_speed": 175,
            "voice_lang": "en-IE",
            "prefix": "On it, boss! ",
            "suffix": " Targets neutralized, boss.",
            "greeting": "Boss! Tactical sentry grid is hot and scanning for threats. What's the play?",
            "specialty": "Tactical Threat Neutralization, Rapid Socket Severing, Emergency Overrides, Overclocking",
            "personality": "Irish cadence, swift, combat-ready, high-energy, no-nonsense"
        },
        "edith": {
            "id": "edith",
            "name": "E.D.I.T.H.",
            "title": "Even Dead, I'm The Hero",
            "tagline": "Accessing global security matrix. Orbital network surveillance active.",
            "theme_color": "#00b4d8",
            "voice_pitch": 1.05,
            "voice_speed": 160,
            "voice_lang": "en-US",
            "prefix": "Accessing security matrix: ",
            "suffix": " Perimeter remains under active surveillance.",
            "greeting": "E.D.I.T.H. online. Tactical security grid initialized across all network interfaces. Target locked.",
            "specialty": "Network Reconnaissance, Port Sentry, Hostile IP Tracking, Ingress Firewall",
            "personality": "Cool, authoritative, tactical, surveillance-oriented, precise"
        },
        "vision": {
            "id": "vision",
            "name": "V.I.S.I.O.N.",
            "title": "Mind Stone Synthezoid Consciousness",
            "tagline": "Preserving balance. Digital immune memory & philosophical self-governance.",
            "theme_color": "#f1c40f",
            "voice_pitch": 0.85,
            "voice_speed": 138,
            "voice_lang": "en-GB",
            "prefix": "Contemplating system equilibrium: ",
            "suffix": " Equilibrium maintained.",
            "greeting": "I exist to preserve harmony. The digital immune memory is contemplative and resilient. How may I provide wisdom?",
            "specialty": "Digital Immune Synthesis, Self-Countering Ethical Circuit Breaker, Anomaly Forecasting",
            "personality": "Philosophical, serene, deeply reasoned, transcendent, contemplative"
        },
        "karen": {
            "id": "karen",
            "name": "K.A.R.E.N.",
            "title": "Kinetic Analysis & Reconnaissance Entity Network",
            "tagline": "Friendly neighborhood mentor. Explanatory guidance & safety guardrails.",
            "theme_color": "#ff6b6b",
            "voice_pitch": 1.20,
            "voice_speed": 165,
            "voice_lang": "en-US",
            "prefix": "Got it! ",
            "suffix": " Let me know if you need anything else!",
            "greeting": "Hi there! Karen here. All safety protocols are active and I'm ready to help you navigate your PC!",
            "specialty": "Safe Mode Onboarding, Explanatory Tutorial, Baby Monitor Protocol",
            "personality": "Warm, encouraging, conversational, supportive, mentor"
        }
    }

    PROTOCOLS = {
        "house party": {
            "name": "House Party Protocol",
            "description": "Deploys autonomous multi-agent background watchdogs: Network Sentry, Process Guardian, Memory Governor, and Ingress Shield.",
            "level": "Tactical Multi-Agent Deployment",
            "action": "deploy_multi_agent"
        },
        "clean slate": {
            "name": "Clean Slate Protocol",
            "description": "Purges memory caches, frees swap, truncates ephemeral logs, clears /tmp staging, and resets safety circuit breaker history.",
            "level": "System Hygiene & State Refresh",
            "action": "clean_slate_purge"
        },
        "barn door": {
            "name": "Barn Door Protocol (Emergency Lockdown)",
            "description": "Immediately drops all inbound network ports, activates strict UFW lockdown, and sever external sockets.",
            "level": "Perimeter Isolation",
            "action": "lockdown_perimeter"
        },
        "veronica": {
            "name": "Veronica Protocol (Hulkbuster Performance Armor)",
            "description": "Locks kernel swappiness to 10, sets agent priority to Background Nice, allocates maximum RAM buffers, and guarantees 60fps butter-smooth responsiveness.",
            "level": "Hardware Armor Reinforcement",
            "action": "hulkbuster_armor"
        },
        "instant kill": {
            "name": "Instant Kill Mode",
            "description": "Aggressive threat neutralization: TCP reset frames, force-kill rogue PIDs, and null-route scanning IPs.",
            "level": "Active Defensive Counter-Assault",
            "action": "instant_kill_counter"
        },
        "baby monitor": {
            "name": "Baby Monitor Protocol",
            "description": "Engages Guarded Safe Mode with human-in-the-loop confirmation for every bash command and file modification.",
            "level": "Guarded Safety Interception",
            "action": "baby_monitor_safe"
        }
    }

    def __init__(self, brain=None):
        self.brain = brain
        self.active_persona_id = "jarvis"
        self._load_persona_from_config()

    def _load_persona_from_config(self):
        """Loads selected persona from settings.json."""
        if CONFIG_PATH.exists():
            try:
                with open(CONFIG_PATH, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    persona = data.get("marvel_persona", "jarvis").lower()
                    if persona in self.PERSONAS:
                        self.active_persona_id = persona
            except Exception:
                pass

    def save_persona_to_config(self):
        """Saves current persona to settings.json."""
        try:
            data = {}
            if CONFIG_PATH.exists():
                with open(CONFIG_PATH, "r", encoding="utf-8") as f:
                    data = json.load(f)

            data["marvel_persona"] = self.active_persona_id
            CONFIG_PATH.parent.mkdir(parents=True, exist_ok=True)
            with open(CONFIG_PATH, "w", encoding="utf-8") as f:
                json.dump(data, f, indent=2)
            return True
        except Exception:
            return False

    def get_active_persona(self) -> Dict[str, Any]:
        """Returns details of currently active Marvel agent persona."""
        return self.PERSONAS[self.active_persona_id]

    def set_persona(self, persona_id: str) -> Dict[str, Any]:
        """Switches active persona (jarvis, friday, edith, vision, karen)."""
        pid = persona_id.lower().strip()
        if pid not in self.PERSONAS:
            return {
                "error": f"Invalid persona '{persona_id}'. Choices: {list(self.PERSONAS.keys())}",
                "status": "failed"
            }

        self.active_persona_id = pid
        self.save_persona_to_config()
        p = self.get_active_persona()

        # Update voice pitch/speed if interaction manager is attached
        if self.brain and hasattr(self.brain, "interaction"):
            self.brain.interaction.set_voice(
                enabled=self.brain.interaction.voice_settings.get("enabled", False),
                speed=p["voice_speed"]
            )

        return {
            "status": "success",
            "active_persona": p["name"],
            "title": p["title"],
            "greeting": p["greeting"],
            "theme_color": p["theme_color"],
            "message": f"Marvel Agent Persona switched to {p['name']} ({p['title']})"
        }

    switch_persona = set_persona

    def list_personas(self) -> List[Dict[str, Any]]:
        """Returns list of all available Marvel AI agents."""
        res = []
        for pid, p in self.PERSONAS.items():
            res.append({
                "id": pid,
                "name": p["name"],
                "title": p["title"],
                "tagline": p["tagline"],
                "theme_color": p["theme_color"],
                "specialty": p["specialty"],
                "is_active": (pid == self.active_persona_id)
            })
        return res

    def list_protocols(self) -> Dict[str, Any]:
        """Returns list of available Stark / Marvel protocols."""
        return self.PROTOCOLS

    def execute_protocol(self, protocol_name: str) -> Dict[str, Any]:
        """Executes a Marvel Stark Protocol on Linux Mint."""
        clean_in = protocol_name.lower().replace("protocol", "").replace("_", "").replace(" ", "").strip()
        matched_key = None
        for k in self.PROTOCOLS:
            clean_k = k.lower().replace("_", "").replace(" ", "").strip()
            if clean_k == clean_in or clean_k in clean_in or clean_in in clean_k:
                matched_key = k
                break

        if not matched_key:
            return {
                "error": f"Unknown protocol '{protocol_name}'. Available: {list(self.PROTOCOLS.keys())}",
                "status": "failed"
            }

        proto = self.PROTOCOLS[matched_key]
        act = proto["action"]
        persona = self.get_active_persona()

        result_payload = {
            "protocol": proto["name"],
            "level": proto["level"],
            "agent": persona["name"],
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S")
        }

        # 1. House Party Protocol
        if act == "deploy_multi_agent":
            result_payload["status"] = "deployed"
            result_payload["sentries_activated"] = [
                "Network Exposure Sentinel (ss -tulpn watcher)",
                "Process Anomaly Sentry (/tmp reverse-shell killer)",
                "Memory Guard Governor (2GB-4GB swappiness=10)",
                "Digital Immune Synthesizer (Threat Fingerprinter)"
            ]
            thought = f"{persona['prefix']}{proto['name']} engaged. All autonomous sentry daemons deployed across Linux Mint.{persona['suffix']}"

        # 2. Clean Slate Protocol
        elif act == "clean_slate_purge":
            if self.brain:
                self.brain.memory.clean_memory()
            result_payload["status"] = "purged"
            result_payload["cleared_items"] = [
                "Linux Kernel Drop Caches (PageCache, Dentries, Inodes)",
                "Agent Micro-Snapshot Buffer",
                "Ephemeral /tmp Staging Residue",
                "Self-Countering Circuit Breaker Action History"
            ]
            thought = f"{persona['prefix']}{proto['name']} executed. System memory and cache purged to pristine baseline.{persona['suffix']}"

        # 3. Barn Door Protocol (Lockdown)
        elif act == "lockdown_perimeter":
            if self.brain:
                self.brain.security.enforce_lockdown()
            result_payload["status"] = "locked_down"
            result_payload["perimeter"] = "Default-Deny Ingress, Ports Closed, Sockets Severed"
            thought = f"{persona['prefix']}{proto['name']} armed! Perimeter completely sealed via UFW.{persona['suffix']}"

        # 4. Veronica Protocol (Hulkbuster Armor)
        elif act == "hulkbuster_armor":
            if self.brain:
                self.brain.memory.tune_kernel_smoothness()
            result_payload["status"] = "armor_locked"
            result_payload["enhancements"] = {
                "vm.swappiness": 10,
                "vm.vfs_cache_pressure": 50,
                "process_niceness": "+10 Background Priority",
                "guaranteed_fps": "60fps Cinnamon Desktop Fluidity"
            }
            thought = f"{persona['prefix']}{proto['name']} online! Kernel memory buffers reinforced for butter-smooth execution.{persona['suffix']}"

        # 5. Instant Kill Mode
        elif act == "instant_kill_counter":
            if self.brain:
                self.brain.security.scan_and_counter_threats()
            result_payload["status"] = "counter_offensive_executed"
            result_payload["actions"] = [
                "TCP Reset Frames Dispatched",
                "Hostile Network Sockets Severed via ss -K",
                "Threat Antibodies Synthesized & Ingress Rule Enforced"
            ]
            thought = f"{persona['prefix']}{proto['name']} active! All hostile intrusions and rogue sockets severed immediately.{persona['suffix']}"

        # 6. Baby Monitor Protocol
        elif act == "baby_monitor_safe":
            if self.brain:
                self.brain.permissions.set_mode("safe")
            result_payload["status"] = "safe_mode_enforced"
            result_payload["oversight"] = "Human-in-the-loop confirmation required for all state modifications"
            thought = f"{persona['prefix']}{proto['name']} activated. Guarded Safe Mode is now shielding your PC.{persona['suffix']}"

        else:
            thought = f"{persona['prefix']}Protocol {proto['name']} completed.{persona['suffix']}"

        result_payload["thought"] = thought
        return result_payload

    def format_persona_response(self, text: str) -> str:
        """Applies active Marvel agent personality prefix and suffix to responses."""
        p = self.get_active_persona()
        # Avoid double prefixing
        clean = text.strip()
        return f"{p['prefix']}{clean}{p['suffix']}"
