#!/usr/bin/env python3
"""
System & Hardware Controller for MintPilot on Linux Mint
Provides native control over audio, display brightness, battery,
networking (Wi-Fi), bluetooth, processes, and power states.
"""

import os
import re
import shutil
import subprocess
from typing import Dict, Any, List, Optional


class SystemController:
    """Controls Linux Mint hardware and system services."""

    def __init__(self):
        self._has_pactl = shutil.which("pactl") is not None
        self._has_brightnessctl = shutil.which("brightnessctl") is not None
        self._has_nmcli = shutil.which("nmcli") is not None
        self._has_bluetoothctl = shutil.which("bluetoothctl") is not None
        self._has_upower = shutil.which("upower") is not None

    # ==================== AUDIO / VOLUME ====================

    def get_volume(self) -> Dict[str, Any]:
        """Gets the current master volume and mute state."""
        if not self._has_pactl:
            return {"error": "pactl not available"}

        try:
            res = subprocess.run(
                ["pactl", "get-sink-volume", "@DEFAULT_SINK@"],
                capture_output=True, text=True, check=True
            )
            match = re.search(r"(\d+)%", res.stdout)
            vol = int(match.group(1)) if match else None

            mute_res = subprocess.run(
                ["pactl", "get-sink-mute", "@DEFAULT_SINK@"],
                capture_output=True, text=True, check=True
            )
            is_muted = "yes" in mute_res.stdout.lower()

            return {"volume_percent": vol, "muted": is_muted, "status": "success"}
        except Exception as e:
            return {"error": str(e), "status": "failed"}

    def set_volume(self, percent: int) -> Dict[str, Any]:
        """Sets the master volume (0 to 150%)."""
        if not self._has_pactl:
            return {"error": "pactl not available"}
        try:
            percent = max(0, min(150, int(percent)))
            subprocess.run(
                ["pactl", "set-sink-volume", "@DEFAULT_SINK@", f"{percent}%"],
                check=True, capture_output=True
            )
            return {"status": "success", "new_volume": percent}
        except Exception as e:
            return {"error": str(e), "status": "failed"}

    def toggle_mute(self, state: Optional[bool] = None) -> Dict[str, Any]:
        """Toggles or sets the audio mute state."""
        if not self._has_pactl:
            return {"error": "pactl not available"}
        try:
            arg = "toggle" if state is None else ("1" if state else "0")
            subprocess.run(
                ["pactl", "set-sink-mute", "@DEFAULT_SINK@", arg],
                check=True, capture_output=True
            )
            return self.get_volume()
        except Exception as e:
            return {"error": str(e), "status": "failed"}

    # ==================== DISPLAY BRIGHTNESS ====================

    def get_brightness(self) -> Dict[str, Any]:
        """Gets current display brightness percentage."""
        if self._has_brightnessctl:
            try:
                res = subprocess.run(
                    ["brightnessctl", "info"],
                    capture_output=True, text=True, check=True
                )
                match = re.search(r"\((\d+)%\)", res.stdout)
                val = int(match.group(1)) if match else None
                return {"brightness_percent": val, "status": "success"}
            except Exception as e:
                return {"error": str(e), "status": "failed"}
        return {"error": "brightnessctl not installed", "status": "failed"}

    def set_brightness(self, percent: int) -> Dict[str, Any]:
        """Sets display brightness (1 to 100%)."""
        percent = max(1, min(100, int(percent)))
        if self._has_brightnessctl:
            try:
                subprocess.run(
                    ["brightnessctl", "set", f"{percent}%"],
                    check=True, capture_output=True
                )
                return {"status": "success", "brightness_percent": percent}
            except Exception as e:
                return {"error": str(e), "status": "failed"}
        return {"error": "brightnessctl not available"}

    # ==================== BATTERY & POWER ====================

    def get_battery_status(self) -> Dict[str, Any]:
        """Returns battery charge percentage, state (charging/discharging), and health."""
        if not self._has_upower:
            return {"error": "upower not available"}

        try:
            enum_res = subprocess.run(
                ["upower", "-e"], capture_output=True, text=True, check=True
            )
            bat_path = None
            for line in enum_res.stdout.splitlines():
                if "battery" in line:
                    bat_path = line.strip()
                    break

            if not bat_path:
                return {"status": "desktop_no_battery", "percentage": 100, "state": "AC"}

            info_res = subprocess.run(
                ["upower", "-i", bat_path], capture_output=True, text=True, check=True
            )
            info = {}
            for line in info_res.stdout.splitlines():
                if ":" in line:
                    k, v = line.split(":", 1)
                    info[k.strip()] = v.strip()

            return {
                "percentage": info.get("percentage"),
                "state": info.get("state"),
                "time_to_empty": info.get("time to empty"),
                "time_to_full": info.get("time to full"),
                "status": "success"
            }
        except Exception as e:
            return {"error": str(e), "status": "failed"}

    def execute_power_action(self, action: str) -> Dict[str, Any]:
        """Executes sleep, lock, reboot, or poweroff."""
        action = action.lower().strip()
        commands = {
            "lock": ["cinnamon-screensaver-command", "-l"] if shutil.which("cinnamon-screensaver-command") else ["xdg-screensaver", "lock"],
            "suspend": ["systemctl", "suspend"],
            "sleep": ["systemctl", "suspend"],
            "reboot": ["systemctl", "reboot"],
            "poweroff": ["systemctl", "poweroff"],
            "shutdown": ["systemctl", "poweroff"]
        }

        if action not in commands:
            return {"error": f"Unknown power action '{action}'. Valid: lock, suspend, reboot, poweroff"}

        try:
            subprocess.run(commands[action], check=True)
            return {"status": "success", "action_triggered": action}
        except Exception as e:
            return {"error": str(e), "status": "failed"}

    # ==================== WI-FI & NETWORKING ====================

    def get_network_status(self) -> Dict[str, Any]:
        """Gets active Wi-Fi and Ethernet connections."""
        if not self._has_nmcli:
            return {"error": "nmcli not available"}
        try:
            con_res = subprocess.run(
                ["nmcli", "-t", "-f", "NAME,TYPE,DEVICE,STATE", "connection", "show", "--active"],
                capture_output=True, text=True, check=True
            )
            connections = []
            for line in con_res.stdout.splitlines():
                if line.strip():
                    parts = line.split(":")
                    if len(parts) >= 3:
                        connections.append({
                            "name": parts[0],
                            "type": parts[1],
                            "device": parts[2],
                            "state": parts[3] if len(parts) > 3 else "active"
                        })

            # Check Wi-Fi radio status
            radio_res = subprocess.run(
                ["nmcli", "radio", "wifi"], capture_output=True, text=True, check=True
            )
            wifi_enabled = "enabled" in radio_res.stdout.lower()

            return {
                "active_connections": connections,
                "wifi_radio_enabled": wifi_enabled,
                "status": "success"
            }
        except Exception as e:
            return {"error": str(e), "status": "failed"}

    def scan_wifi(self) -> Dict[str, Any]:
        """Scans for nearby Wi-Fi SSIDs."""
        if not self._has_nmcli:
            return {"error": "nmcli not available"}
        try:
            res = subprocess.run(
                ["nmcli", "-t", "-f", "IN-USE,SSID,SIGNAL,SECURITY", "device", "wifi", "list"],
                capture_output=True, text=True, check=True
            )
            networks = []
            for line in res.stdout.splitlines():
                if line.strip():
                    parts = line.split(":")
                    if len(parts) >= 4 and parts[1]:
                        networks.append({
                            "in_use": parts[0] == "*",
                            "ssid": parts[1],
                            "signal": parts[2],
                            "security": parts[3]
                        })
            return {"networks": networks, "status": "success"}
        except Exception as e:
            return {"error": str(e), "status": "failed"}

    def connect_wifi(self, ssid: str, password: Optional[str] = None) -> Dict[str, Any]:
        """Connects to a Wi-Fi network."""
        if not self._has_nmcli:
            return {"error": "nmcli not available"}
        try:
            cmd = ["nmcli", "device", "wifi", "connect", ssid]
            if password:
                cmd.extend(["password", password])
            res = subprocess.run(cmd, capture_output=True, text=True, check=True)
            return {"status": "success", "message": res.stdout.strip()}
        except subprocess.CalledProcessError as e:
            return {"status": "failed", "error": e.stderr.strip() or e.stdout.strip()}

    def toggle_wifi(self, enable: bool) -> Dict[str, Any]:
        """Turns Wi-Fi radio on or off."""
        if not self._has_nmcli:
            return {"error": "nmcli not available"}
        try:
            arg = "on" if enable else "off"
            subprocess.run(["nmcli", "radio", "wifi", arg], check=True, capture_output=True)
            return {"status": "success", "wifi_enabled": enable}
        except Exception as e:
            return {"error": str(e), "status": "failed"}

    # ==================== APPLICATION & PROCESS CONTROL ====================

    def launch_app(self, app_name: str) -> Dict[str, Any]:
        """Launches an application in the background."""
        try:
            # Check common launch tools
            if shutil.which("gio"):
                subprocess.Popen(["gio", "launch", app_name])
            elif shutil.which("gtk-launch"):
                subprocess.Popen(["gtk-launch", app_name])
            else:
                subprocess.Popen([app_name], start_new_session=True)
            return {"status": "success", "launched": app_name}
        except Exception as e:
            # Fallback direct execution
            try:
                subprocess.Popen([app_name], start_new_session=True)
                return {"status": "success", "launched": app_name}
            except Exception as e2:
                return {"error": f"Failed to launch: {e2}", "status": "failed"}

    def kill_process(self, process_name_or_pid: str) -> Dict[str, Any]:
        """Terminates a process by name or PID."""
        try:
            if process_name_or_pid.isdigit():
                subprocess.run(["kill", "-9", process_name_or_pid], check=True)
            else:
                subprocess.run(["pkill", "-f", process_name_or_pid], check=True)
            return {"status": "success", "killed": process_name_or_pid}
        except Exception as e:
            return {"error": str(e), "status": "failed"}

    def get_hardware_telemetry(self) -> Dict[str, Any]:
        """Returns CPU usage, RAM utilization, Disk space, and hardware specs."""
        try:
            # RAM
            with open("/proc/meminfo", "r") as f:
                mem_data = f.read()
            total_mem = int(re.search(r"MemTotal:\s+(\d+)", mem_data).group(1)) // 1024
            avail_mem = int(re.search(r"MemAvailable:\s+(\d+)", mem_data).group(1)) // 1024
            used_mem = total_mem - avail_mem

            # CPU
            cores = os.cpu_count() or 1
            load = os.getloadavg()

            # Disk
            st = os.statvfs("/")
            total_disk = (st.f_blocks * st.f_frsize) // (1024**3)
            avail_disk = (st.f_bavail * st.f_frsize) // (1024**3)
            used_disk = total_disk - avail_disk

            return {
                "ram_total_mb": total_mem,
                "ram_used_mb": used_mem,
                "ram_available_mb": avail_mem,
                "ram_usage_percent": round((used_mem / total_mem) * 100, 1),
                "cpu_cores": cores,
                "cpu_load_1min": load[0],
                "disk_total_gb": total_disk,
                "disk_used_gb": used_disk,
                "disk_available_gb": avail_disk,
                "status": "success"
            }
        except Exception as e:
            return {"error": str(e), "status": "failed"}
