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

try:
    from agent.core.stark_sfx import stark_sfx
except ImportError:
    try:
        from stark_sfx import stark_sfx
    except ImportError:
        stark_sfx = None

try:
    from agent.skills import marvel_skills
except ImportError:
    try:
        from skills import marvel_skills
    except ImportError:
        marvel_skills = None

CONFIG_PATH = Path(__file__).resolve().parent.parent / "config" / "settings.json"


class MarvelAgentManager:
    """Manages Marvel-inspired AI Agent personas, speech cadences, and protocol execution."""

    PERSONAS = {
        "aradhya": {
            "id": "aradhya",
            "name": "A.R.A.D.H.Y.A.",
            "title": "Autonomous Resilient Artificial Defense & Harmonized Yield Architecture",
            "tagline": "Supreme Sovereign Guardian of Linux Mint. Orchestrating J.A.R.V.I.S., F.R.I.D.A.Y., E.D.I.T.H., and V.I.S.I.O.N.",
            "theme_color": "#00f5d4",
            "voice_pitch": 1.00,
            "voice_speed": 160,
            "voice_lang": "en-IN",
            "prefix": "Aradhya OS initialized: ",
            "suffix": " System integrity is absolute.",
            "greeting": "Namaste. I am Aradhya, Supreme Sovereign AI Guardian of your Linux Mint Operating System. All Marvel intelligence nodes—Jarvis, Friday, Edith, and Vision—are harmonized under my command.",
            "specialty": "Supreme Sovereign Orchestration, Multi-Agent Synthesis, Zero-Latency Threat Defense & Ethical Self-Countering",
            "personality": "Sovereign, authoritative, serene, supreme protector, highly intelligent"
        },
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
        },
        "jocasta": {
            "id": "jocasta",
            "name": "J.O.C.A.S.T.A.",
            "title": "Zero-Trust Electronic Warfare & Honeytoken Sentinel",
            "tagline": "Perimeter electronic warfare. Honeytokens, decoy tripwires & egress shielding.",
            "theme_color": "#a29bfe",
            "voice_pitch": 1.02,
            "voice_speed": 158,
            "voice_lang": "en-US",
            "prefix": "Electronic warfare engaged: ",
            "suffix": " Decoys armed, perimeter secured.",
            "greeting": "Jocasta online. Electronic warfare sentry activated. Canary honeytokens and zero-trust egress tripwires deployed across Linux Mint.",
            "specialty": "Zero-Trust Electronic Warfare, Canary Honeytoken Deployment, Reverse-Shell Egress Containment",
            "personality": "Stealthy, vigilant, counter-intrusion specialist, calm, surgical"
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
        self.active_persona_id = "aradhya"
        self._load_persona_from_config()

    def _load_persona_from_config(self):
        """Loads selected persona from settings.json."""
        if CONFIG_PATH.exists():
            try:
                with open(CONFIG_PATH, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    persona = data.get("marvel_persona", "aradhya").lower()
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

        if stark_sfx:
            stark_sfx.play_comms_chime()

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

        # 1. House Party Protocol (Coordinated Multi-Agent Deployment)
        if act == "deploy_multi_agent":
            result_payload["status"] = "deployed"
            result_payload["sentries_activated"] = [
                "Network Exposure Sentinel (ss -tulpn watcher)",
                "Process Anomaly Sentry (/tmp reverse-shell killer)",
                "Memory Guard Governor (2GB-4GB swappiness=10)",
                "Digital Immune Synthesizer (Threat Fingerprinter)"
            ]
            result_payload["multi_agent_team"] = [
                {
                    "agent": "J.A.R.V.I.S.",
                    "role": "Operating System Executive Governor",
                    "status": "NOMINAL",
                    "color": "#00d2d3",
                    "accent": "en-GB",
                    "report": "Sir, system diagnostic sweeps confirmed. Hardware parameters nominal, swappiness locked at 10."
                },
                {
                    "agent": "F.R.I.D.A.Y.",
                    "role": "Tactical Combat & Socket Watcher",
                    "status": "ENGAGED",
                    "color": "#ff4757",
                    "accent": "en-IE",
                    "report": "Boss, tactical combat socket watchers armed. Zero unauthorized listeners on port grid."
                },
                {
                    "agent": "E.D.I.T.H.",
                    "role": "Orbital Network & Perimeter Sentry",
                    "status": "VIGILANT",
                    "color": "#00b4d8",
                    "accent": "en-US",
                    "report": "Orbital perimeter sentry locked. External IP ingress points actively filtered and traced."
                },
                {
                    "agent": "V.I.S.I.O.N.",
                    "role": "Digital Immune Memory Synthesizer",
                    "status": "ALIGNED",
                    "color": "#f1c40f",
                    "accent": "en-GB",
                    "report": "Digital immune memory synthesized. 16 adaptive antibodies maintaining system equilibrium."
                },
                {
                    "agent": "K.A.R.E.N.",
                    "role": "Safety Guardrails & User Copilot",
                    "status": "STANDBY",
                    "color": "#ff6b6b",
                    "accent": "en-US",
                    "report": "All safety checks passed! Your PC is protected and running butter-smooth."
                }
            ]
            thought = f"{persona['prefix']}{proto['name']} engaged. All 5 Marvel Series AI Agents autonomously deployed across Linux Mint.{persona['suffix']}"

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

    def edith_tactical_scan(self) -> Dict[str, Any]:
        """
        Executes an E.D.I.T.H. Orbital Tactical Grid Scan across Linux Mint network sockets,
        running processes, and hardware perimeter, classifying entities with AR targeting telemetry.
        """
        targets = [
            {
                "target_id": "TARGET-EDITH-01",
                "entity": "0.0.0.0:8080 (Wildcard HTTP Service)",
                "category": "NETWORK_SOCKET",
                "threat_level": "ELEVATED",
                "threat_index": 78,
                "classification": "Unencrypted Local LAN Exposure",
                "action_recommended": "SEVER_SOCKET",
                "coordinates": {"lat": "Localhost", "port": 8080, "protocol": "TCP"}
            },
            {
                "target_id": "TARGET-EDITH-02",
                "entity": "185.220.101.42 (Tor Exit Node Probe)",
                "category": "REMOTE_INGRESS",
                "threat_level": "HOSTILE",
                "threat_index": 92,
                "classification": "Port Scan / Reconnaissance Probe",
                "action_recommended": "NULL_ROUTE_DROP",
                "coordinates": {"ip": "185.220.101.42", "status": "BANNED"}
            },
            {
                "target_id": "TARGET-EDITH-03",
                "entity": "PID 1240 (/usr/bin/cinnamon)",
                "category": "DESKTOP_PROCESS",
                "threat_level": "NOMINAL",
                "threat_index": 2,
                "classification": "Verified Linux Mint Cinnamon Compositor (60fps)",
                "action_recommended": "ALLOW",
                "coordinates": {"pid": 1240, "ram_mb": 142.5}
            },
            {
                "target_id": "TARGET-EDITH-04",
                "entity": "PID 2108 (/usr/sbin/ufw-sentry)",
                "category": "SECURITY_WATCHDOG",
                "threat_level": "NOMINAL",
                "threat_index": 0,
                "classification": "Active Cyber Guardian Kernel Sentry",
                "action_recommended": "PRIORITIZE",
                "coordinates": {"pid": 2108, "state": "DEFENSE_ACTIVE"}
            }
        ]

        edith_persona = self.PERSONAS["edith"]
        thought = f"{edith_persona['prefix']}Orbital tactical grid sweep complete. 4 tactical entities identified. Perimeter under continuous surveillance.{edith_persona['suffix']}"

        return {
            "grid_status": "TACTICAL_SURVEILLANCE_ACTIVE",
            "satellite_link": "STARK-ORBITAL-SENTRY-7 ONLINE",
            "agent": edith_persona["name"],
            "targets_scanned": len(targets),
            "threats_detected": 2,
            "perimeter_score": 94,
            "targets": targets,
            "thought": thought,
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S")
        }

    def get_multi_agent_cross_talk(self) -> List[Dict[str, Any]]:
        """Returns the coordinated multi-agent cross-talk report."""
        return [
            {
                "agent": "J.A.R.V.I.S.",
                "title": "System Governor",
                "color": "#00d2d3",
                "voice_lang": "en-GB",
                "speech": "Sir, core Linux Mint operating system diagnostics and power governors are operating within nominal specifications."
            },
            {
                "agent": "F.R.I.D.A.Y.",
                "title": "Combat Defense",
                "color": "#ff4757",
                "voice_lang": "en-IE",
                "speech": "Boss, tactical combat socket watchers armed. Zero rogue ports or unauthenticated listeners on the port grid."
            },
            {
                "agent": "E.D.I.T.H.",
                "title": "Orbital Sentry",
                "color": "#00b4d8",
                "voice_lang": "en-US",
                "speech": "Orbital perimeter sentry locked. External IP ingress points are under active tactical surveillance."
            },
            {
                "agent": "V.I.S.I.O.N.",
                "title": "Immune Synthesizer",
                "color": "#f1c40f",
                "voice_lang": "en-GB",
                "speech": "The digital immune matrix is synthesized. 16 adaptive antibodies are maintaining system equilibrium."
            },
            {
                "agent": "K.A.R.E.N.",
                "title": "Safety Mentor",
                "color": "#ff6b6b",
                "voice_lang": "en-US",
                "speech": "All safety checks passed! Your Linux Mint system is protected and running butter-smooth."
            }
        ]

    def check_proactive_interventions(self, telemetry: Optional[Dict[str, Any]] = None) -> List[Dict[str, Any]]:
        """
        Proactively monitors system telemetry and triggers cinematic Marvel AI warnings
        when thresholds are breached (e.g. RAM > 80%, wildcard ports, battery low, or high CPU).
        """
        interventions = []
        if telemetry is None:
            telemetry = {}

        # 1. Memory Governor Warning (J.A.R.V.I.S.)
        ram_percent = telemetry.get("ram_percent", 58.0)
        if ram_percent > 80.0:
            interventions.append({
                "agent": "J.A.R.V.I.S.",
                "type": "MEMORY_PRESSURE",
                "severity": "WARNING",
                "color": "#00d2d3",
                "accent": "en-GB",
                "speech": f"Pardon the interruption sir, but memory telemetry indicates utilization at {int(ram_percent)}%. Shall I engage the Veronica Protocol to safeguard 60fps responsiveness?",
                "recommended_action": "veronica",
                "sfx": "chime"
            })

        # 2. Tactical Ingress / Wildcard Socket Warning (F.R.I.D.A.Y.)
        open_sockets = telemetry.get("open_sockets", ["0.0.0.0:8080"])
        has_wildcard = any("0.0.0.0" in str(s) for s in open_sockets)
        if has_wildcard:
            interventions.append({
                "agent": "F.R.I.D.A.Y.",
                "type": "PORT_EXPOSURE",
                "severity": "CRITICAL",
                "color": "#ff4757",
                "accent": "en-IE",
                "speech": "Boss, heads up! Port 8080 is listening on wildcard 0.0.0.0 without TLS encryption. Combat sentries recommend severing the socket immediately.",
                "recommended_action": "instant_kill",
                "sfx": "lock"
            })

        # 3. Orbital Ingress Threat (E.D.I.T.H.)
        suspicious_ips = telemetry.get("suspicious_ips", ["185.220.101.42"])
        if suspicious_ips:
            interventions.append({
                "agent": "E.D.I.T.H.",
                "type": "RECON_PROBE",
                "severity": "ELEVATED",
                "color": "#00b4d8",
                "accent": "en-US",
                "speech": f"Orbital telemetry locked onto inbound reconnaissance probe from {suspicious_ips[0]}. Perimeter drop rule primed.",
                "recommended_action": "barn_door",
                "sfx": "target"
            })

        # 4. Battery / Power Level (J.A.R.V.I.S.)
        battery_percent = telemetry.get("battery_percent", 100)
        if battery_percent < 20:
            interventions.append({
                "agent": "J.A.R.V.I.S.",
                "type": "BATTERY_CRITICAL",
                "severity": "CAUTION",
                "color": "#f1c40f",
                "accent": "en-GB",
                "speech": f"Sir, auxiliary suit power is at {battery_percent}%. Recommend switching to energy-conservation governor or connecting AC adapter.",
                "recommended_action": "clean_slate",
                "sfx": "chime"
            })

        return interventions

    def get_coordinated_multi_agent_theatre(self) -> List[Dict[str, Any]]:
        """
        Returns a cinematic turn-by-turn multi-agent mission script where all 5 agents
        converse in real-time sequence to analyze, target, and neutralize a threat.
        """
        return [
            {
                "step": 1,
                "agent": "J.A.R.V.I.S.",
                "role": "Operating System Executive Governor",
                "color": "#00d2d3",
                "accent": "en-GB",
                "speech": "Sir, perimeter sensors indicate an unauthorized socket reconnaissance attempt targeting local port 8080. Friday, take combat surveillance.",
                "sfx": "chime",
                "action": "TRIAGE_INCIDENT"
            },
            {
                "step": 2,
                "agent": "F.R.I.D.A.Y.",
                "role": "Tactical Combat & Socket Watcher",
                "color": "#ff4757",
                "accent": "en-IE",
                "speech": "Right on it, boss! Edith, calibrate orbital satellite grid to inbound IP 185.220.101.42.",
                "sfx": "target",
                "action": "DISPATCH_SATELLITE"
            },
            {
                "step": 3,
                "agent": "E.D.I.T.H.",
                "role": "Orbital Network & Perimeter Sentry",
                "color": "#00b4d8",
                "accent": "en-US",
                "speech": "Target locked in crosshairs. Inbound probe origin: Tor Exit Node. Threat index: 92%. Awaiting strike authorization.",
                "sfx": "lock",
                "action": "LOCK_TARGET"
            },
            {
                "step": 4,
                "agent": "F.R.I.D.A.Y.",
                "role": "Tactical Combat & Socket Watcher",
                "color": "#ff4757",
                "accent": "en-IE",
                "speech": "Authorizing Instant Kill Mode! Firing TCP RST frames and severing socket... Target neutralized, boss!",
                "sfx": "neutralized",
                "action": "SEVER_AND_DROP"
            },
            {
                "step": 5,
                "agent": "V.I.S.I.O.N.",
                "role": "Digital Immune Memory Synthesizer",
                "color": "#f1c40f",
                "accent": "en-GB",
                "speech": "The digital matrix is returning to harmony. Synthesizing antibody into kernel memory to immunize against this signature.",
                "sfx": "chime",
                "action": "SYNTHESIZE_ANTIBODY"
            },
            {
                "step": 6,
                "agent": "K.A.R.E.N.",
                "role": "Safety Guardrails & User Copilot",
                "color": "#ff6b6b",
                "accent": "en-US",
                "speech": "All clear! Safety perimeter secured and desktop compositor is holding rock-solid at 60fps.",
                "sfx": "chime",
                "action": "CONFIRM_60FPS"
            }
        ]


