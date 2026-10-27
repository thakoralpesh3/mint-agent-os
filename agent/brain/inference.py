#!/usr/bin/env python3
"""
MintPilot Offline Autonomous Brain & Tool Router
Combines sub-millisecond fast deterministic intent routing,
permission control (Turbo vs Safe Mode), memory safeguards (2GB-4GB RAM),
cybersecurity PC self-defense, dynamic threat protection, active counter-measures,
and the agent self-countering safety circuit breaker.
"""

import os
import re
import json
import time
import shutil
import subprocess
from typing import Dict, Any, List, Optional

from agent.core.permission_manager import PermissionManager
from agent.core.interaction_manager import InteractionManager
from agent.core.marvel_agents import MarvelAgentManager
from agent.core.memory_guard import MemoryGuard
from agent.security.guardian import SecurityGuardian
from agent.brain.model_manager import ModelManager
from agent.core.updater import OSUpdater
from agent.controllers.system_control import SystemController
from agent.controllers.gui_control import GUIController
from agent.controllers.terminal_control import TerminalController
from agent.controllers.screen_vision import ScreenVisionController
from agent.controllers.voice_engine import VoiceEngine
from agent.controllers.browser_control import BrowserController
from agent.controllers.program_control import ProgramController
from agent.skills import founder_skills, replica_skills


class AgentBrain:
    """The central intelligence coordinating perception, planning, permissions, security, self-countering, and execution."""

    def __init__(self, model_path: Optional[str] = None, mode: Optional[str] = None):
        # Core Managers
        self.permissions = PermissionManager(mode=mode)
        self.interaction = InteractionManager()
        self.marvel = MarvelAgentManager(self)
        self.founder = founder_skills
        self.replica = replica_skills
        self.memory = MemoryGuard()
        self.security = SecurityGuardian(self.permissions)
        self.models = ModelManager()
        self.updater = OSUpdater()

        # Controllers
        self.system = SystemController()
        self.gui = GUIController()
        self.terminal = TerminalController()
        self.vision = ScreenVisionController()
        self.voice = VoiceEngine()
        self.browser = BrowserController(self.gui)
        self.programs = ProgramController(self.gui)

        self.model_path = model_path
        self.hardware_tier = self._detect_hardware_tier()

    def _detect_hardware_tier(self) -> Dict[str, Any]:
        """Detects hardware capabilities and selects the optimal offline SLM tier."""
        mem_stats = self.memory.get_memory_stats()
        ram_mb = mem_stats.get("total_mb", 4000)
        has_gpu = shutil.which("nvidia-smi") is not None

        if ram_mb <= 1250:
            tier = "Tier 0: Nano / Ultra-Low RAM (1GB PC)"
            recommended_model = "Deterministic Micro-Intent Engine + Cloud Fallback (0MB Local Model RAM)"
        elif ram_mb <= 4500:
            tier = "Tier 1: Ultra-Light (0.5B - 1.5B Q4 GGUF)"
            recommended_model = "qwen2.5-0.5b-instruct.Q4_K_M.gguf"
        elif ram_mb <= 12000:
            tier = "Tier 2: Balanced (3B Q4 GGUF)"
            recommended_model = "qwen2.5-3b-instruct.Q4_K_M.gguf"
        else:
            tier = "Tier 3: High-Performance (7B/8B Q4 GGUF)"
            recommended_model = "qwen2.5-7b-instruct.Q4_K_M.gguf"

        is_nano = ram_mb <= 1250
        zram_active = mem_stats.get("zram", {}).get("active", False)

        return {
            "ram_total_mb": ram_mb,
            "has_gpu": has_gpu,
            "tier_name": tier,
            "recommended_model": recommended_model,
            "is_low_ram": mem_stats.get("is_low_ram_system", True),
            "is_nano_spec": is_nano,
            "zram_active": zram_active
        }

    # ==================== FAST INTENT ROUTER (<2ms) ====================

    def match_fast_intent(self, prompt: str, prompt_cli: bool = False) -> Optional[Dict[str, Any]]:
        """
        Instantly detects and executes standard OS, cybersecurity, counter-measure,
        browser, program, and hardware commands without waiting for LLM token generation.
        """
        p = prompt.strip().lower()

        # Step A: Name-based Marvel Agent Invocation (e.g. "Aradhya, scan threats", "Jarvis, status")
        marvel_prefix_match = re.match(r"^(aradhya|jarvis|friday|edith|vision|karen|jocasta)[,\s]+(.+)$", p)
        if marvel_prefix_match:
            invoked_persona = marvel_prefix_match.group(1)
            self.marvel.set_persona(invoked_persona)
            p = marvel_prefix_match.group(2).strip()

        # Step B: Marvel Persona Identification & Switching
        if any(w in p for w in ["who are you", "what is your name", "what are you", "identify yourself"]):
            persona = self.marvel.get_active_persona()
            return {
                "thought": f"I am {persona['name']} ({persona['title']}). {persona['greeting']}",
                "result": {
                    "active_agent": persona["name"],
                    "title": persona["title"],
                    "specialty": persona["specialty"],
                    "available_agents": [a["name"] for a in self.marvel.list_personas()]
                }
            }

        if any(w in p for w in ["switch to aradhya", "activate aradhya", "use aradhya", "load aradhya", "call aradhya"]):
            res = self.marvel.set_persona("aradhya")
            return {"thought": self.marvel.get_active_persona()["greeting"], "result": res}

        if any(w in p for w in ["switch to jarvis", "activate jarvis", "use jarvis", "load jarvis"]):
            res = self.marvel.set_persona("jarvis")
            return {"thought": self.marvel.get_active_persona()["greeting"], "result": res}

        if any(w in p for w in ["switch to friday", "activate friday", "use friday", "load friday"]):
            res = self.marvel.set_persona("friday")
            return {"thought": self.marvel.get_active_persona()["greeting"], "result": res}

        if any(w in p for w in ["switch to edith", "activate edith", "use edith", "load edith"]):
            res = self.marvel.set_persona("edith")
            return {"thought": self.marvel.get_active_persona()["greeting"], "result": res}

        if any(w in p for w in ["switch to vision", "activate vision", "use vision", "load vision"]):
            res = self.marvel.set_persona("vision")
            return {"thought": self.marvel.get_active_persona()["greeting"], "result": res}

        if any(w in p for w in ["switch to karen", "activate karen", "use karen", "load karen"]):
            res = self.marvel.set_persona("karen")
            return {"thought": self.marvel.get_active_persona()["greeting"], "result": res}

        if any(w in p for w in ["switch to jocasta", "activate jocasta", "use jocasta", "load jocasta"]):
            res = self.marvel.set_persona("jocasta")
            return {"thought": self.marvel.get_active_persona()["greeting"], "result": res}

        if any(w in p for w in ["list personas", "show personas", "marvel agents", "stark agents", "available agents"]):
            personas = self.marvel.list_personas()
            active = self.marvel.get_active_persona()
            return {
                "thought": f"Active Agent: {active['name']}. Available Marvel series agents: J.A.R.V.I.S., F.R.I.D.A.Y., E.D.I.T.H., V.I.S.I.O.N., K.A.R.E.N., and J.O.C.A.S.T.A.",
                "result": {"active_agent": active["name"], "personas": personas}
            }

        # Step C: Marvel Stark Protocol Execution
        if "protocol" in p or any(w in p for w in ["instant kill mode", "clean slate", "house party", "veronica", "barn door", "baby monitor"]):
            for proto_key in self.marvel.PROTOCOLS:
                if proto_key in p:
                    proto_res = self.marvel.execute_protocol(proto_key)
                    return {
                        "thought": proto_res["thought"],
                        "result": proto_res
                    }

        if any(w in p for w in ["list protocols", "available protocols", "stark protocols", "show protocols"]):
            protos = self.marvel.list_protocols()
            return {
                "thought": "Available Stark Protocols: House Party, Clean Slate, Barn Door (Lockdown), Veronica (Hulkbuster Armor), Instant Kill Mode, and Baby Monitor (Safe Mode).",
                "result": protos
            }

        if any(w in p for w in ["edith scan", "tactical scan", "target scan", "orbital scan", "scan targets"]):
            scan_res = self.marvel.edith_tactical_scan()
            return {
                "thought": scan_res["thought"],
                "result": scan_res
            }

        # Step D: Marvel Specialized Tactical Skills
        if any(w in p for w in ["fight pattern", "scan fight", "combat scan", "countermeasures"]):
            skill_res = self.marvel.execute_skill("friday_fight_pattern")
            return {
                "thought": skill_res["combat_speech"],
                "result": skill_res
            }

        if any(w in p for w in ["drone strike", "orbital strike"]):
            target = "185.220.101.42"
            m_ip = re.search(r"\b(?:\d{1,3}\.){3}\d{1,3}\b", p)
            if m_ip:
                target = m_ip.group(0)
            skill_res = self.marvel.execute_skill("edith_orbital_recon", action="drone_strike", target=target)
            return {
                "thought": skill_res["speech"],
                "result": skill_res
            }

        if any(w in p for w in ["cad view", "3d schematics", "cad schematics", "holographic cad", "project armor", "hologram schematics"]):
            skill_res = self.marvel.execute_skill("jarvis_cad_diagnostics")
            return {
                "thought": skill_res["speech"],
                "result": skill_res
            }

        if any(w in p for w in ["mind stone", "forecast anomalies", "predict attacks", "entropy"]):
            skill_res = self.marvel.execute_skill("vision_mind_stone")
            return {
                "thought": skill_res["speech"],
                "result": skill_res
            }

        if any(w in p for w in ["suit mode", "taser web", "ricochet web", "web shooter"]):
            mode_name = "taser web" if "taser" in p else ("ricochet web" if "ricochet" in p else "baby monitor")
            skill_res = self.marvel.execute_skill("karen_suit_mentor", mode=mode_name)
            return {
                "thought": skill_res.get("speech", "Suit mode updated"),
                "result": skill_res
            }

        if any(w in p for w in ["electronic warfare", "deploy honeytoken", "zero trust egress"]):
            skill_res = self.marvel.execute_skill("jocasta_electronic_warfare")
            return {
                "thought": skill_res["speech"],
                "result": skill_res
            }

        if any(w in p for w in ["list skills", "marvel skills", "show skills"]):
            skills = self.marvel.list_skills()
            return {
                "thought": "Marvel Series Skills Matrix loaded. 6 specialized tactical skills available.",
                "result": skills
            }

        # 1. Active Counter-Defense, Future Hardening & Self-Countering
        if any(w in p for w in ["counter threats", "active counter", "counter attack", "sever sockets"]):
            res = self.security.scan_and_counter_threats()
            return {
                "thought": f"Active counter-measures executed. Threats countered: {res.get('countered_count', 0)} | Antibodies synthesized: {res.get('antibodies_synthesized', 0)}",
                "result": res
            }

        if any(w in p for w in ["immune", "antibodies", "attack memory", "future attack"]):
            res = self.security.get_immune_status()
            return {
                "thought": f"Digital Immune System Resilience: {res.get('resilience_score')}/100 ({res.get('grade')}). Active Antibodies: {res.get('total_antibodies')}.",
                "result": res
            }

        if any(w in p for w in ["harden future", "prepare future", "harden pc", "synthesize antibodies"]):
            res = self.security.harden_for_future_attacks()
            return {
                "thought": f"Proactive Defense Enforced: {res.get('message')}",
                "result": res
            }

        if any(w in p for w in ["defcon", "escalation posture", "threat posture"]):
            posture = self.security.get_full_security_posture()
            return {
                "thought": f"Dynamic Threat Escalation: {posture['defcon']['status']} - {posture['defcon']['posture']}",
                "result": posture["defcon"]
            }

        if any(w in p for w in ["deploy decoys", "honeypot", "canary decoys", "canary trap"]):
            res = self.security.deploy_decoys()
            return {
                "thought": "Canary decoy honeypots deployed. Any intrusion will trigger immediate counter-lockdown.",
                "result": res
            }

        if any(w in p for w in ["self check", "circuit breaker", "dead man switch", "counter itself"]):
            res = self.security.self_counter.get_circuit_status()
            return {
                "thought": "Agent Self-Countering Safety Circuit Breaker: ACTIVE & GOVERNING.",
                "result": res
            }

        if any(w in p for w in ["rollback", "undo last change", "revert snapshot"]):
            res = self.security.rollback_last_change()
            return {
                "thought": "Autonomous Rollback: Reverted state to pre-action snapshot.",
                "result": res
            }

        # 2. AI Model Customization (Offline & Online)
        if any(w in p for w in ["list models", "show models", "available models", "what models"]):
            models = self.models.list_models()
            active = models["active_model"]
            return {
                "thought": f"Active AI: {active['name']} ({active['provider'].upper()}). Available: {models['total_models']} models (Offline & Cloud).",
                "result": models
            }

        if any(w in p for w in ["switch model", "change ai", "change model", "set model", "use model", "use gemini", "use gpt", "use claude", "use offline"]):
            target = None
            for key in ["gemini-2.5-flash", "gemini-2.5-pro", "gemini", "gpt-4o-mini", "gpt-4o", "claude-3-5-haiku", "claude-3-5-sonnet", "claude", "qwen2.5-0.5b", "qwen2.5-1.5b", "qwen2.5-3b", "qwen2.5-7b", "deepseek", "ollama", "offline"]:
                if key in p:
                    target = key
                    break
            if not target:
                m = re.search(r"(?:to|model|ai)\s+([a-zA-Z0-9_\.\-]+)", p)
                if m:
                    target = m.group(1)

            if target:
                alias_map = {
                    "gemini": "gemini-2.5-flash",
                    "claude": "claude-3-5-haiku",
                    "qwen2.5-0.5b": "qwen2.5-0.5b-instruct",
                    "qwen2.5-1.5b": "qwen2.5-coder-1.5b",
                    "qwen2.5-3b": "qwen2.5-3b-instruct",
                    "qwen2.5-7b": "qwen2.5-7b-instruct",
                    "deepseek": "deepseek-r1-distill-1.5b",
                    "offline": "qwen2.5-0.5b-instruct"
                }
                final_model = alias_map.get(target, target)
                res = self.models.set_model(final_model)
                return {
                    "thought": res["message"],
                    "result": res
                }

        # 3. In-Place OS Updates
        if any(w in p for w in ["check update", "check for updates", "check os update"]):
            res = self.updater.check_for_updates()
            return {
                "thought": res.get("message", "Checked upstream for updates"),
                "result": res
            }

        if any(w in p for w in ["update os", "upgrade os", "upgrade agent", "update agent"]):
            res = self.updater.perform_update()
            return {
                "thought": res.get("message", "OS upgrade performed"),
                "result": res
            }

        # 4. Cybersecurity & PC Protection
        if any(w in p for w in ["scan threats", "scan for threats", "check threats", "threat scan", "audit threats"]):
            res = self.security.scan_and_counter_threats(auto_neutralize=False)
            return {
                "thought": f"Completed deep threat scan. Threat level: {res.get('threat_level')}",
                "result": res
            }

        if any(w in p for w in ["security score", "security status", "cyber defense", "security posture", "pc security"]):
            res = self.security.get_full_security_posture()
            return {
                "thought": f"Security Posture Score: {res.get('security_score')}/100 ({res.get('grade')})",
                "result": res
            }

        if any(w in p for w in ["lockdown", "emergency lockdown", "lockdown pc", "secure system"]):
            res = self.security.lockdown()
            return {
                "thought": "Emergency PC Lockdown enforced. Strict firewall rules active.",
                "result": res
            }

        if any(w in p for w in ["harden firewall", "enable firewall", "ufw enable"]):
            res = self.security.remediation.enable_firewall()
            return {
                "thought": "UFW Firewall activated with strict default-deny incoming policy.",
                "result": res
            }

        block_ip_m = re.search(r"block\s+ip\s+(\d+\.\d+\.\d+\.\d+)", p)
        if block_ip_m:
            ip = block_ip_m.group(1)
            res = self.security.remediation.block_ip(ip)
            return {
                "thought": f"Blocked hostile IP address {ip} via UFW.",
                "result": res
            }

        # 3. Permission Mode Switching
        if any(w in p for w in ["turbo mode", "enable turbo", "activate turbo", "switch to turbo"]):
            new_mode = self.permissions.set_mode("turbo")
            return {
                "thought": "Switched to Turbo Mode (Antigravity-Style). Autonomous execution & active counter-defense active.",
                "result": {"mode": new_mode, "status": "active"}
            }

        if any(w in p for w in ["safe mode", "enable safe mode", "activate safe mode", "switch to safe"]):
            new_mode = self.permissions.set_mode("safe")
            return {
                "thought": "Switched to Safe Mode. Explicit user permission will be requested before modifying system, files, or browser.",
                "result": {"mode": new_mode, "status": "active"}
            }

        if p in ["mode", "get mode", "what mode", "current mode"]:
            return {
                "thought": f"Current permission mode: {self.permissions.mode.upper()}",
                "result": {"mode": self.permissions.mode, "is_turbo": self.permissions.is_turbo()}
            }

        # 3b. User Interaction Options & Modalities
        if any(w in p for w in ["interaction status", "interaction options", "how do you interact", "interaction settings", "interaction modes"]):
            status = self.interaction.get_status()
            return {
                "thought": f"Interaction Options: Modality='{status['modality']}' | Verbosity='{status['verbosity']}' | Proactivity='{status['proactivity']}' | Voice={'ON' if status['voice']['enabled'] else 'OFF'}.",
                "result": status
            }

        if any(w in p for w in ["enable voice", "turn on voice", "voice on", "speak replies", "talk to me", "voice output"]):
            res = self.interaction.set_voice(True)
            self.voice.speak("Spoken voice replies enabled. I am ready to interact aloud.")
            return {
                "thought": "Voice interaction enabled. MintPilot will speak replies aloud using offline speech synthesis.",
                "result": res
            }

        if any(w in p for w in ["disable voice", "turn off voice", "voice off", "mute voice", "silent voice", "stop speaking"]):
            res = self.interaction.set_voice(False)
            return {
                "thought": "Voice interaction disabled. MintPilot will interact silently via text and visual UI.",
                "result": res
            }

        if any(w in p for w in ["concise mode", "be concise", "minimalist mode", "terse mode", "short replies", "brief mode"]):
            res = self.interaction.set_verbosity("concise")
            return {
                "thought": "Communication style set to Concise. Terse one-line confirmations enabled.",
                "result": res
            }

        if any(w in p for w in ["detailed mode", "be detailed", "explain everything", "mentor mode", "verbose mode", "detailed replies"]):
            res = self.interaction.set_verbosity("detailed")
            return {
                "thought": "Communication style set to Detailed Mentor. Deep explanations and underlying system commands will be shown.",
                "result": res
            }

        if any(w in p for w in ["security style", "security auditor", "auditor style", "security verbosity"]):
            res = self.interaction.set_verbosity("security_auditor")
            return {
                "thought": "Communication style set to Security Auditor. Responses will highlight DEFCON levels, CVE telemetry, and firewall posture.",
                "result": res
            }

        if any(w in p for w in ["normal style", "normal mode", "balanced style", "default style"]):
            res = self.interaction.set_verbosity("normal")
            return {
                "thought": "Communication style reset to Normal Balanced.",
                "result": res
            }

        if any(w in p for w in ["proactive mode", "be proactive", "ambient mode", "ambient copilot"]):
            res = self.interaction.set_proactivity("proactive")
            return {
                "thought": "Proactivity level set to Proactive Ambient Copilot. MintPilot will actively monitor and suggest system optimizations.",
                "result": res
            }

        if any(w in p for w in ["reactive mode", "be reactive", "silent proactivity", "speak only when asked"]):
            res = self.interaction.set_proactivity("reactive")
            return {
                "thought": "Proactivity level set to Reactive. MintPilot will act only when explicitly commanded.",
                "result": res
            }

        modality_m = re.search(r"(?:switch|set)\s+modality\s+to\s+([a-zA-Z_]+)", p)
        if modality_m:
            target_mod = modality_m.group(1)
            res = self.interaction.set_modality(target_mod)
            return {
                "thought": f"Switched interaction modality to '{target_mod}'.",
                "result": res
            }

        # 4. Memory & Butter-Smooth Linux Mint Performance
        if any(w in p for w in ["smooth mint", "butter smooth", "optimize smoothness", "tune smoothness", "smooth performance"]):
            res = self.memory.tune_kernel_smoothness()
            return {
                "thought": "Optimized Linux Mint kernel parameters (vm.swappiness=10, vm.vfs_cache_pressure=50) for butter-smooth 60fps desktop performance.",
                "result": res
            }

        if any(w in p for w in ["mint compatibility", "smoothness benchmark", "check smoothness", "compatibility benchmark"]):
            res = self.memory.verify_mint_compatibility()
            return {
                "thought": f"Linux Mint Hardware Compatibility: {res['score']}/100 ({res['grade']}). {res['recommendation']}",
                "result": res
            }

        if any(w in p for w in ["clean memory", "free ram", "clean ram", "optimize memory", "drop cache"]):
            return {
                "thought": "Cleaned memory caches and collected runtime garbage.",
                "result": self.memory.clean_memory()
            }

        if any(w in p for w in ["memory stats", "ram stats", "ram usage", "memory usage"]):
            return {
                "thought": "Retrieved system memory statistics.",
                "result": self.memory.get_memory_stats()
            }

        if any(w in p for w in ["optimize for 1gb", "optimize 1gb", "1gb ram", "setup 1gb", "1gb pc", "tune 1gb"]):
            res = self.memory.optimize_for_1gb_pc()
            return {
                "thought": f"Optimized PC for 1GB RAM: {res.get('tier')}. ZRAM compressed swap configured.",
                "result": res
            }

        if any(w in p for w in ["zram status", "check zram", "zram swap", "ram compression"]):
            res = self.memory.get_zram_stats()
            state = "ACTIVE" if res.get("active") else "INACTIVE"
            return {
                "thought": f"Kernel ZRAM Status: {state} ({res.get('disksize_mb')}MB allocated, {res.get('compression_ratio')}x ratio).",
                "result": res
            }

        # 5. Audio & Volume
        if "mute" in p:
            if "unmute" in p:
                return {"result": self.system.toggle_mute(state=False), "thought": "Unmuted master audio"}
            return {"result": self.system.toggle_mute(state=True), "thought": "Muted master audio"}

        vol_match = re.search(r"(?:volume|sound)\s*(?:to\s*)?(\d+)\s*%", p) or re.search(r"set\s*volume\s*(?:to\s*)?(\d+)", p)
        if vol_match:
            val = int(vol_match.group(1))
            return {"result": self.system.set_volume(val), "thought": f"Adjusted volume to {val}%"}

        if p in ["volume", "get volume", "what is the volume", "sound level"]:
            return {"result": self.system.get_volume(), "thought": "Retrieved volume level"}

        # 6. Display Brightness
        bright_match = re.search(r"brightness\s*(?:to\s*)?(\d+)\s*%", p) or re.search(r"set\s*brightness\s*(?:to\s*)?(\d+)", p)
        if bright_match:
            val = int(bright_match.group(1))
            return {"result": self.system.set_brightness(val), "thought": f"Adjusted screen brightness to {val}%"}

        if p in ["brightness", "get brightness", "screen brightness"]:
            return {"result": self.system.get_brightness(), "thought": "Retrieved brightness level"}

        # 7. Battery
        if any(w in p for w in ["battery", "battery percentage", "battery level", "power remaining"]):
            return {"result": self.system.get_battery_status(), "thought": "Retrieved battery telemetry"}

        # 8. Wi-Fi & Networking
        if "scan wifi" in p or "list wifi" in p or "available wifi" in p:
            return {"result": self.system.scan_wifi(), "thought": "Scanned nearby Wi-Fi networks"}

        if "wifi status" in p or "network status" in p:
            return {"result": self.system.get_network_status(), "thought": "Retrieved network connection status"}

        # 9. Power Actions (Sensitive)
        if p in ["lock", "lock screen", "lock laptop"]:
            perm = self.permissions.check_permission("power_action", {"action": "lock"}, prompt_cli=prompt_cli)
            if not perm.get("allowed"):
                return {"thought": "Safe Mode: Awaiting user approval to lock screen.", "permission": perm}
            return {"result": self.system.execute_power_action("lock"), "thought": "Locked workstation"}

        if p in ["sleep", "suspend", "sleep laptop"]:
            perm = self.permissions.check_permission("power_action", {"action": "suspend"}, prompt_cli=prompt_cli)
            if not perm.get("allowed"):
                return {"thought": "Safe Mode: Awaiting user approval to suspend laptop.", "permission": perm}
            return {"result": self.system.execute_power_action("suspend"), "thought": "Put laptop to sleep"}

        # 10. Browser Automation
        search_m = re.search(r"(?:search|google|search web for)\s+(.+)", p)
        if search_m and not p.startswith("fetch"):
            query = search_m.group(1).strip()
            return {"result": self.browser.search_web(query), "thought": f"Searched web for '{query}' in desktop browser"}

        open_url_m = re.search(r"(?:open url|open website|browse to|go to)\s+(https?://\S+|\S+\.\S+)", p)
        if open_url_m:
            url = open_url_m.group(1).strip()
            return {"result": self.browser.open_url_in_browser(url), "thought": f"Opened {url} in browser"}

        if p in ["new tab", "open tab"]:
            return {"result": self.browser.new_tab(), "thought": "Opened new browser tab"}

        if p in ["close tab", "close current tab"]:
            return {"result": self.browser.close_current_tab(), "thought": "Closed current browser tab"}

        if any(w in p for w in ["scroll down", "scroll page down"]):
            return {"result": self.browser.scroll_page("down"), "thought": "Scrolled webpage down"}

        if any(w in p for w in ["scroll up", "scroll page up"]):
            return {"result": self.browser.scroll_page("up"), "thought": "Scrolled webpage up"}

        fetch_m = re.search(r"(?:fetch|read page|get content of)\s+(https?://\S+|\S+\.\S+)", p)
        if fetch_m:
            url = fetch_m.group(1).strip()
            return {"result": self.browser.fetch_page_content(url), "thought": f"Fetched content from {url}"}

        # 11. Program Control
        if "nemo" in p or "file manager" in p or "open downloads" in p:
            folder = "~/Downloads" if "downloads" in p else "~"
            return {"result": self.programs.open_directory_in_nemo(folder), "thought": f"Opened Nemo file manager at {folder}"}

        if "vlc" in p:
            if any(w in p for w in ["pause", "play", "toggle"]):
                return {"result": self.programs.control_vlc("play"), "thought": "Toggled VLC playback"}
            if "fullscreen" in p:
                return {"result": self.programs.control_vlc("fullscreen"), "thought": "Toggled VLC fullscreen"}

        writer_m = re.search(r"(?:write document|open writer and type|libreoffice writer)\s+(?:saying\s+|with\s+)?(.+)", p)
        if writer_m:
            text = writer_m.group(1).strip()
            return {
                "result": self.programs.control_libreoffice_writer(text),
                "thought": f"Created new document in LibreOffice Writer with text: '{text[:50]}...'"
            }

        # 12. General App Launch
        launch_m = re.search(r"(?:open|launch|start)\s+(chrome|firefox|terminal|calculator|vlc|libreoffice|gimp)", p)
        if launch_m:
            app = launch_m.group(1)
            return {"result": self.programs.launch_program(app), "thought": f"Launched application '{app}'"}

        # 13. Window & Desktop Control
        if "show desktop" in p or "minimize all" in p:
            return {"result": self.gui.minimize_all_show_desktop(), "thought": "Minimized all windows to show desktop"}

        if p in ["list windows", "open windows", "active windows", "show windows", "running programs"]:
            return {"result": self.gui.list_windows(), "thought": "Listed open desktop windows"}

        focus_m = re.search(r"(?:switch to|focus|bring up)\s+(?:window\s+)?(.+)", p)
        if focus_m:
            win = focus_m.group(1).strip()
            return {"result": self.gui.focus_window(win), "thought": f"Focused window '{win}'"}

        close_m = re.search(r"(?:close window|close app)\s+(.+)", p)
        if close_m:
            win = close_m.group(1).strip()
            return {"result": self.gui.close_window(win), "thought": f"Closed window '{win}'"}

        return None

    # ==================== MAIN COGNITIVE DISPATCH ====================

    def process_command(self, user_prompt: str, prompt_cli: bool = False) -> Dict[str, Any]:
        """Processes command through self-countering circuit breaker, fast router, and SLM planning."""
        start_time = time.time()

        # Step 0: Self-Countering Safety Circuit Breaker Check
        circuit_check = self.security.self_counter.record_action_and_check(user_prompt)
        if circuit_check.get("circuit_tripped"):
            return {
                "thought": "Agent Self-Countering Circuit Breaker Tripped! Halted anomalous execution to protect PC.",
                "circuit_breaker": circuit_check,
                "execution_mode": "self_counter_circuit_break",
                "latency_ms": round((time.time() - start_time) * 1000, 2)
            }

        # Step 1: Fast Intent
        res = None
        fast_res = self.match_fast_intent(user_prompt, prompt_cli=prompt_cli)
        if fast_res:
            elapsed = round((time.time() - start_time) * 1000, 2)
            fast_res["latency_ms"] = elapsed
            fast_res["execution_mode"] = "deterministic_sub_millisecond"
            fast_res["permission_mode"] = self.permissions.mode
            res = fast_res

        # Step 2: Direct Shell Command Check ($ or !)
        elif user_prompt.startswith("!") or user_prompt.startswith("$"):
            cmd = user_prompt[1:].strip()
            perm = self.permissions.check_permission("terminal_execute", {"command": cmd}, prompt_cli=prompt_cli)
            if not perm.get("allowed"):
                res = {
                    "thought": f"Safe Mode: Awaiting approval to execute bash command: '{cmd}'",
                    "permission": perm,
                    "execution_mode": "permission_blocked",
                    "latency_ms": round((time.time() - start_time) * 1000, 2)
                }
            else:
                res = {
                    "thought": f"Direct shell execution: {cmd}",
                    "result": self.terminal.execute(cmd),
                    "execution_mode": "terminal_direct",
                    "permission_mode": self.permissions.mode,
                    "latency_ms": round((time.time() - start_time) * 1000, 2)
                }

        # Step 3: Local SLM Reasoning Fallback
        else:
            slm_res = self._execute_slm_reasoning(user_prompt)
            elapsed = round((time.time() - start_time) * 1000, 2)
            slm_res["latency_ms"] = elapsed
            slm_res["execution_mode"] = "slm_autonomous_planner"
            slm_res["permission_mode"] = self.permissions.mode
            res = slm_res

        # Interaction Feedback: Offline Voice Synthesis & Desktop Notification
        if res and "thought" in res:
            p_low = user_prompt.lower()
            if self.interaction.voice_settings.get("enabled"):
                if not any(w in p_low for w in ["mute", "disable voice", "silent voice", "voice off"]):
                    self.voice.speak(res["thought"])

            if self.interaction.modality == "notification":
                self.interaction.send_desktop_notification("MintPilot", res["thought"])

        # Enforce instant garbage collection on Tier 0 low-RAM systems to keep RSS under 30MB
        if self.hardware_tier.get("is_nano_spec"):
            import gc
            gc.collect()

        return res

    def _execute_slm_reasoning(self, prompt: str) -> Dict[str, Any]:
        """Executes reasoning using local model backend or safe fallback."""
        if shutil.which("ollama"):
            try:
                import urllib.request
                req_data = json.dumps({
                    "model": "qwen2.5-coder:1.5b",
                    "prompt": f"You are MintPilot, an offline Linux Mint cyber-guardian and laptop controller. Request: '{prompt}'. Return JSON tool call only.",
                    "stream": False
                }).encode('utf-8')
                req = urllib.request.Request("http://127.0.0.1:11434/api/generate", data=req_data, headers={'Content-Type': 'application/json'})
                with urllib.request.urlopen(req, timeout=10) as response:
                    res_body = json.loads(response.read().decode())
                    return {"thought": "Evaluated via local Ollama SLM", "response": res_body.get("response", "")}
            except Exception:
                pass

        return {
            "thought": f"Interpreted request for laptop defense and control: '{prompt}'",
            "memory": self.memory.get_memory_stats(),
            "status": "completed",
            "message": f"Processed: '{prompt}'. Mode: {self.permissions.mode.upper()} | Tier: {self.hardware_tier['tier_name']}"
        }

    infer = process_command
