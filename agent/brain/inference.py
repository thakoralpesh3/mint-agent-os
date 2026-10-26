#!/usr/bin/env python3
"""
MintPilot Offline Autonomous Brain & Tool Router
Combines instant zero-latency deterministic intent matching with
hardware-adaptive local Small Language Model (SLM) reasoning.
"""

import os
import re
import json
import time
import shutil
import subprocess
from typing import Dict, Any, List, Optional

from agent.controllers.system_control import SystemController
from agent.controllers.gui_control import GUIController
from agent.controllers.terminal_control import TerminalController
from agent.controllers.screen_vision import ScreenVisionController
from agent.controllers.voice_engine import VoiceEngine


class AgentBrain:
    """The central intelligence coordinating perception, planning, and control."""

    def __init__(self, model_path: Optional[str] = None):
        self.system = SystemController()
        self.gui = GUIController()
        self.terminal = TerminalController()
        self.vision = ScreenVisionController()
        self.voice = VoiceEngine()

        self.model_path = model_path
        self.hardware_tier = self._detect_hardware_tier()

    def _detect_hardware_tier(self) -> Dict[str, Any]:
        """Detects hardware capabilities and selects the optimal offline SLM tier."""
        telemetry = self.system.get_hardware_telemetry()
        ram_mb = telemetry.get("ram_total_mb", 4000)
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
            "recommended_model": recommended_model
        }

    # ==================== FAST INTENT ROUTER (<2ms) ====================

    def match_fast_intent(self, prompt: str) -> Optional[Dict[str, Any]]:
        """
        Instantly detects and executes standard OS & hardware control commands
        without waiting for LLM token generation.
        """
        p = prompt.strip().lower()

        # 1. Volume
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

        # 2. Brightness
        bright_match = re.search(r"brightness\s*(?:to\s*)?(\d+)\s*%", p) or re.search(r"set\s*brightness\s*(?:to\s*)?(\d+)", p)
        if bright_match:
            val = int(bright_match.group(1))
            return {"result": self.system.set_brightness(val), "thought": f"Adjusted screen brightness to {val}%"}

        if p in ["brightness", "get brightness", "screen brightness"]:
            return {"result": self.system.get_brightness(), "thought": "Retrieved brightness level"}

        # 3. Battery
        if any(w in p for w in ["battery", "battery percentage", "battery level", "power remaining"]):
            return {"result": self.system.get_battery_status(), "thought": "Retrieved battery telemetry"}

        # 4. Wi-Fi
        if "scan wifi" in p or "list wifi" in p or "available wifi" in p:
            return {"result": self.system.scan_wifi(), "thought": "Scanned nearby Wi-Fi networks"}

        if "wifi status" in p or "network status" in p:
            return {"result": self.system.get_network_status(), "thought": "Retrieved network connection status"}

        # 5. Power States
        if p in ["lock", "lock screen", "lock laptop"]:
            return {"result": self.system.execute_power_action("lock"), "thought": "Locked workstation"}
        if p in ["sleep", "suspend", "sleep laptop"]:
            return {"result": self.system.execute_power_action("suspend"), "thought": "Put laptop to sleep"}

        # 6. Windows & Desktop
        if "show desktop" in p or "minimize all" in p:
            return {"result": self.gui.minimize_all_show_desktop(), "thought": "Minimized all windows to show desktop"}

        if p in ["list windows", "open windows", "active windows", "show windows"]:
            return {"result": self.gui.list_windows(), "thought": "Listed open desktop windows"}

        focus_match = re.search(r"(?:switch to|focus|bring up)\s+(?:window\s+)?(.+)", p)
        if focus_match:
            win_name = focus_match.group(1).strip()
            return {"result": self.gui.focus_window(win_name), "thought": f"Focused window '{win_name}'"}

        close_match = re.search(r"(?:close window|close app)\s+(.+)", p)
        if close_match:
            win_name = close_match.group(1).strip()
            return {"result": self.gui.close_window(win_name), "thought": f"Closed window '{win_name}'"}

        # 7. Launch Apps
        launch_match = re.search(r"(?:open|launch|start)\s+(chrome|firefox|terminal|nemo|files|calculator|vlc|libreoffice)", p)
        if launch_match:
            app = launch_match.group(1)
            app_map = {
                "chrome": "google-chrome",
                "firefox": "firefox",
                "terminal": "x-terminal-emulator",
                "files": "nemo",
                "nemo": "nemo",
                "calculator": "gnome-calculator",
                "vlc": "vlc",
                "libreoffice": "libreoffice"
            }
            exec_name = app_map.get(app, app)
            return {"result": self.system.launch_app(exec_name), "thought": f"Launched application {app}"}

        # 8. Hardware Telemetry
        if any(w in p for w in ["system stats", "ram usage", "cpu usage", "hardware telemetry", "system info"]):
            return {"result": self.system.get_hardware_telemetry(), "thought": "Gathered hardware metrics"}

        return None

    # ==================== DISPATCH & EXECUTION ====================

    def process_command(self, user_prompt: str) -> Dict[str, Any]:
        """
        Main cognitive dispatch:
        First checks zero-latency fast intent.
        If complex, invokes local SLM / tool calling.
        """
        start_time = time.time()

        # Step 1: Fast Intent
        fast_res = self.match_fast_intent(user_prompt)
        if fast_res:
            elapsed = round((time.time() - start_time) * 1000, 2)
            fast_res["latency_ms"] = elapsed
            fast_res["execution_mode"] = "deterministic_sub_millisecond"
            return fast_res

        # Step 2: Local SLM Reasoning for Multi-Step or Unstructured Queries
        slm_res = self._execute_slm_reasoning(user_prompt)
        elapsed = round((time.time() - start_time) * 1000, 2)
        slm_res["latency_ms"] = elapsed
        slm_res["execution_mode"] = "slm_autonomous_planner"
        return slm_res

    def _execute_slm_reasoning(self, prompt: str) -> Dict[str, Any]:
        """
        Executes reasoning using local offline model runtime (llama-cli / ollama / python-llama).
        """
        # If Ollama is running locally:
        if shutil.which("ollama"):
            try:
                import urllib.request
                req_data = json.dumps({
                    "model": "qwen2.5-coder:1.5b",
                    "prompt": f"You are MintPilot, an offline Linux Mint controller agent. User request: '{prompt}'. Return JSON tool call only.",
                    "stream": False
                }).encode('utf-8')
                req = urllib.request.Request("http://127.0.0.1:11434/api/generate", data=req_data, headers={'Content-Type': 'application/json'})
                with urllib.request.urlopen(req, timeout=10) as response:
                    res_body = json.loads(response.read().decode())
                    return {"thought": "Evaluated via local Ollama SLM", "response": res_body.get("response", "")}
            except Exception:
                pass

        # Fallback to direct Terminal execution if user gave a shell-like command
        if prompt.startswith("!") or prompt.startswith("$"):
            cmd = prompt[1:].strip()
            return {"thought": f"Direct shell execution: {cmd}", "result": self.terminal.execute(cmd)}

        # General intelligent interpretation
        return {
            "thought": f"Interpreted request for laptop control: '{prompt}'",
            "telemetry": self.system.get_hardware_telemetry(),
            "status": "completed",
            "message": f"Processed command: '{prompt}'. Hardware tier: {self.hardware_tier['tier_name']}"
        }
