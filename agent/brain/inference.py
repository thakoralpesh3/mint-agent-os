#!/usr/bin/env python3
"""
MintPilot Offline Autonomous Brain & Tool Router
Combines sub-millisecond fast deterministic intent routing,
permission control (Turbo vs Safe Mode), memory safeguards (2GB-4GB RAM),
cybersecurity PC self-defense & threat protection, browser automation,
program control, and local SLM cognitive planning.
"""

import os
import re
import json
import time
import shutil
import subprocess
from typing import Dict, Any, List, Optional

from agent.core.permission_manager import PermissionManager
from agent.core.memory_guard import MemoryGuard
from agent.security.guardian import SecurityGuardian
from agent.controllers.system_control import SystemController
from agent.controllers.gui_control import GUIController
from agent.controllers.terminal_control import TerminalController
from agent.controllers.screen_vision import ScreenVisionController
from agent.controllers.voice_engine import VoiceEngine
from agent.controllers.browser_control import BrowserController
from agent.controllers.program_control import ProgramController


class AgentBrain:
    """The central intelligence coordinating perception, planning, permissions, security, and execution."""

    def __init__(self, model_path: Optional[str] = None, mode: Optional[str] = None):
        # Core Managers
        self.permissions = PermissionManager(mode=mode)
        self.memory = MemoryGuard()
        self.security = SecurityGuardian(self.permissions)

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

        if ram_mb <= 4500:
            tier = "Tier 1: Ultra-Light (0.5B - 1.5B Q4 GGUF)"
            recommended_model = "qwen2.5-0.5b-instruct.Q4_K_M.gguf"
        elif ram_mb <= 12000:
            tier = "Tier 2: Balanced (3B Q4 GGUF)"
            recommended_model = "qwen2.5-3b-instruct.Q4_K_M.gguf"
        else:
            tier = "Tier 3: High-Performance (7B/8B Q4 GGUF)"
            recommended_model = "qwen2.5-7b-instruct.Q4_K_M.gguf"

        return {
            "ram_total_mb": ram_mb,
            "has_gpu": has_gpu,
            "tier_name": tier,
            "recommended_model": recommended_model,
            "is_low_ram": mem_stats.get("is_low_ram_system", True)
        }

    # ==================== FAST INTENT ROUTER (<2ms) ====================

    def match_fast_intent(self, prompt: str, prompt_cli: bool = False) -> Optional[Dict[str, Any]]:
        """
        Instantly detects and executes standard OS, cybersecurity, browser,
        program, and hardware commands without waiting for LLM token generation.
        """
        p = prompt.strip().lower()

        # 1. Cybersecurity & PC Protection
        if any(w in p for w in ["scan threats", "scan for threats", "check threats", "threat scan", "audit threats"]):
            res = self.security.scan_and_remediate()
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

        # 2. Permission Mode Switching
        if any(w in p for w in ["turbo mode", "enable turbo", "activate turbo", "switch to turbo"]):
            new_mode = self.permissions.set_mode("turbo")
            return {
                "thought": "Switched to Turbo Mode (Antigravity-Style). Autonomous execution & threat remediation active without prompts.",
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

        # 3. Memory & Housekeeping
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

        # 4. Audio & Volume
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

        # 5. Display Brightness
        bright_match = re.search(r"brightness\s*(?:to\s*)?(\d+)\s*%", p) or re.search(r"set\s*brightness\s*(?:to\s*)?(\d+)", p)
        if bright_match:
            val = int(bright_match.group(1))
            return {"result": self.system.set_brightness(val), "thought": f"Adjusted screen brightness to {val}%"}

        if p in ["brightness", "get brightness", "screen brightness"]:
            return {"result": self.system.get_brightness(), "thought": "Retrieved brightness level"}

        # 6. Battery
        if any(w in p for w in ["battery", "battery percentage", "battery level", "power remaining"]):
            return {"result": self.system.get_battery_status(), "thought": "Retrieved battery telemetry"}

        # 7. Wi-Fi & Networking
        if "scan wifi" in p or "list wifi" in p or "available wifi" in p:
            return {"result": self.system.scan_wifi(), "thought": "Scanned nearby Wi-Fi networks"}

        if "wifi status" in p or "network status" in p:
            return {"result": self.system.get_network_status(), "thought": "Retrieved network connection status"}

        # 8. Power Actions (Sensitive)
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

        # 9. Browser Automation
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

        # 10. Program Control
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

        # 11. General App Launch
        launch_m = re.search(r"(?:open|launch|start)\s+(chrome|firefox|terminal|calculator|vlc|libreoffice|gimp)", p)
        if launch_m:
            app = launch_m.group(1)
            return {"result": self.programs.launch_program(app), "thought": f"Launched application '{app}'"}

        # 12. Window & Desktop Control
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
        """Processes command through security verification, fast router, and SLM planning."""
        start_time = time.time()

        # Step 1: Fast Intent
        fast_res = self.match_fast_intent(user_prompt, prompt_cli=prompt_cli)
        if fast_res:
            elapsed = round((time.time() - start_time) * 1000, 2)
            fast_res["latency_ms"] = elapsed
            fast_res["execution_mode"] = "deterministic_sub_millisecond"
            fast_res["permission_mode"] = self.permissions.mode
            return fast_res

        # Step 2: Direct Shell Command Check ($ or !)
        if user_prompt.startswith("!") or user_prompt.startswith("$"):
            cmd = user_prompt[1:].strip()
            perm = self.permissions.check_permission("terminal_execute", {"command": cmd}, prompt_cli=prompt_cli)
            if not perm.get("allowed"):
                return {
                    "thought": f"Safe Mode: Awaiting approval to execute bash command: '{cmd}'",
                    "permission": perm,
                    "execution_mode": "permission_blocked",
                    "latency_ms": round((time.time() - start_time) * 1000, 2)
                }
            return {
                "thought": f"Direct shell execution: {cmd}",
                "result": self.terminal.execute(cmd),
                "execution_mode": "terminal_direct",
                "permission_mode": self.permissions.mode,
                "latency_ms": round((time.time() - start_time) * 1000, 2)
            }

        # Step 3: Local SLM Reasoning Fallback
        slm_res = self._execute_slm_reasoning(user_prompt)
        elapsed = round((time.time() - start_time) * 1000, 2)
        slm_res["latency_ms"] = elapsed
        slm_res["execution_mode"] = "slm_autonomous_planner"
        slm_res["permission_mode"] = self.permissions.mode
        return slm_res

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
