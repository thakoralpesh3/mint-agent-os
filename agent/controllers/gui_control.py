#!/usr/bin/env python3
"""
GUI & Desktop Controller for MintPilot on Linux Mint
Enables full control over windows, mouse movements, clicks, keyboard
input, shortcuts, and UI element inspection via AT-SPI & xdotool.
"""

import re
import shutil
import subprocess
from typing import Dict, Any, List, Optional, Tuple


class GUIController:
    """Controls Linux Mint desktop windows, mouse, keyboard, and UI elements."""

    def __init__(self):
        self._has_xdotool = shutil.which("xdotool") is not None
        self._has_wmctrl = shutil.which("wmctrl") is not None

    # ==================== WINDOW MANAGEMENT ====================

    def list_windows(self) -> Dict[str, Any]:
        """Lists all open windows with their IDs, desktop workspace, and titles."""
        if not self._has_wmctrl:
            return {"error": "wmctrl not installed", "status": "failed"}

        try:
            res = subprocess.run(["wmctrl", "-l", "-p"], capture_output=True, text=True, check=True)
            windows = []
            for line in res.stdout.splitlines():
                parts = line.split(maxsplit=4)
                if len(parts) >= 5:
                    win_id, desktop, pid, host, title = parts
                    windows.append({
                        "id": win_id,
                        "workspace": int(desktop),
                        "pid": int(pid),
                        "title": title.strip()
                    })
                elif len(parts) == 4:
                    win_id, desktop, pid, host = parts
                    windows.append({
                        "id": win_id,
                        "workspace": int(desktop),
                        "pid": int(pid),
                        "title": ""
                    })
            return {"windows": windows, "status": "success"}
        except Exception as e:
            return {"error": str(e), "status": "failed"}

    def focus_window(self, query: str) -> Dict[str, Any]:
        """Brings a window to the front and gives it focus by title substring."""
        if not self._has_wmctrl:
            return {"error": "wmctrl not available"}
        try:
            subprocess.run(["wmctrl", "-a", query], check=True, capture_output=True)
            return {"status": "success", "focused": query}
        except subprocess.CalledProcessError as e:
            return {"status": "failed", "error": f"Window matching '{query}' not found"}

    def close_window(self, query: str) -> Dict[str, Any]:
        """Gracefully closes a window matching title substring."""
        if not self._has_wmctrl:
            return {"error": "wmctrl not available"}
        try:
            subprocess.run(["wmctrl", "-c", query], check=True, capture_output=True)
            return {"status": "success", "closed": query}
        except Exception as e:
            return {"error": str(e), "status": "failed"}

    def toggle_fullscreen(self, query: str) -> Dict[str, Any]:
        """Toggles fullscreen state for a window."""
        if not self._has_wmctrl:
            return {"error": "wmctrl not available"}
        try:
            subprocess.run(
                ["wmctrl", "-r", query, "-b", "toggle,fullscreen"],
                check=True, capture_output=True
            )
            return {"status": "success", "toggled_fullscreen": query}
        except Exception as e:
            return {"error": str(e), "status": "failed"}

    def minimize_all_show_desktop(self) -> Dict[str, Any]:
        """Shows desktop by toggling minimization on all windows."""
        if self._has_xdotool:
            subprocess.run(["xdotool", "key", "super+d"], check=True)
            return {"status": "success", "action": "show_desktop"}
        return {"error": "xdotool not available"}

    # ==================== MOUSE CONTROL ====================

    def get_mouse_position(self) -> Dict[str, Any]:
        """Gets current (x, y) mouse cursor coordinates."""
        if not self._has_xdotool:
            return {"error": "xdotool not installed"}
        try:
            res = subprocess.run(["xdotool", "getmouselocation", "--shell"], capture_output=True, text=True, check=True)
            loc = {}
            for line in res.stdout.splitlines():
                if "=" in line:
                    k, v = line.split("=", 1)
                    loc[k.strip().lower()] = int(v.strip()) if v.strip().isdigit() else v.strip()
            return {"x": loc.get("x", 0), "y": loc.get("y", 0), "status": "success"}
        except Exception as e:
            return {"error": str(e), "status": "failed"}

    def move_mouse(self, x: int, y: int) -> Dict[str, Any]:
        """Moves the mouse cursor to absolute coordinate (x, y)."""
        if not self._has_xdotool:
            return {"error": "xdotool not installed"}
        try:
            subprocess.run(["xdotool", "mousemove", str(int(x)), str(int(y))], check=True)
            return {"status": "success", "moved_to": {"x": x, "y": y}}
        except Exception as e:
            return {"error": str(e), "status": "failed"}

    def click(self, x: Optional[int] = None, y: Optional[int] = None, button: int = 1, clicks: int = 1) -> Dict[str, Any]:
        """
        Clicks at coordinates (x, y) or current location.
        Button 1=Left, 2=Middle, 3=Right.
        Clicks: 1=single, 2=double click.
        """
        if not self._has_xdotool:
            return {"error": "xdotool not installed"}
        try:
            cmd = ["xdotool"]
            if x is not None and y is not None:
                cmd.extend(["mousemove", str(int(x)), str(int(y))])

            if clicks == 2:
                cmd.extend(["click", "--repeat", "2", "--delay", "50", str(button)])
            else:
                cmd.extend(["click", str(button)])

            subprocess.run(cmd, check=True)
            return {"status": "success", "clicked": {"x": x, "y": y, "button": button, "repeat": clicks}}
        except Exception as e:
            return {"error": str(e), "status": "failed"}

    def drag(self, start_x: int, start_y: int, end_x: int, end_y: int) -> Dict[str, Any]:
        """Drags mouse from (start_x, start_y) to (end_x, end_y)."""
        if not self._has_xdotool:
            return {"error": "xdotool not installed"}
        try:
            subprocess.run(["xdotool", "mousemove", str(start_x), str(start_y)], check=True)
            subprocess.run(["xdotool", "mousedown", "1"], check=True)
            subprocess.run(["xdotool", "mousemove", str(end_x), str(end_y)], check=True)
            subprocess.run(["xdotool", "mouseup", "1"], check=True)
            return {"status": "success", "dragged": {"from": [start_x, start_y], "to": [end_x, end_y]}}
        except Exception as e:
            return {"error": str(e), "status": "failed"}

    # ==================== KEYBOARD CONTROL ====================

    def type_text(self, text: str, delay_ms: int = 12) -> Dict[str, Any]:
        """Types text into the currently focused window with natural keystroke delay."""
        if not self._has_xdotool:
            return {"error": "xdotool not installed"}
        try:
            subprocess.run(["xdotool", "type", "--delay", str(delay_ms), text], check=True)
            return {"status": "success", "typed_length": len(text)}
        except Exception as e:
            return {"error": str(e), "status": "failed"}

    def press_key(self, key_name: str) -> Dict[str, Any]:
        """Presses a single key (e.g. 'Return', 'Escape', 'BackSpace', 'Tab')."""
        if not self._has_xdotool:
            return {"error": "xdotool not installed"}
        try:
            subprocess.run(["xdotool", "key", key_name], check=True)
            return {"status": "success", "pressed": key_name}
        except Exception as e:
            return {"error": str(e), "status": "failed"}

    def hotkey(self, combo: str) -> Dict[str, Any]:
        """
        Presses a key combination (e.g. 'ctrl+c', 'ctrl+v', 'alt+Tab', 'ctrl+alt+t').
        """
        if not self._has_xdotool:
            return {"error": "xdotool not installed"}
        try:
            formatted = combo.replace(" ", "")
            subprocess.run(["xdotool", "key", formatted], check=True)
            return {"status": "success", "hotkey_executed": combo}
        except Exception as e:
            return {"error": str(e), "status": "failed"}

    # ==================== ACCESSIBILITY & UI TREE ====================

    def inspect_ui_tree(self) -> Dict[str, Any]:
        """
        Scans active desktop UI elements using pyatspi (Linux Accessibility) if available,
        or extracts active window widgets.
        """
        try:
            import pyatspi
            reg = pyatspi.Registry
            desktop = reg.getDesktop(0)
            elements = []

            for app_idx in range(desktop.childCount):
                app = desktop.getChildAtIndex(app_idx)
                if not app or not app.name:
                    continue
                app_dict = {"application": app.name, "windows": []}
                for win_idx in range(app.childCount):
                    win = app.getChildAtIndex(win_idx)
                    if not win:
                        continue
                    win_info = {"title": win.name, "role": win.getRoleName(), "buttons": []}
                    # Gather interactive elements
                    for c_idx in range(min(win.childCount, 25)):
                        child = win.getChildAtIndex(c_idx)
                        if child and child.name:
                            win_info["buttons"].append({
                                "name": child.name,
                                "role": child.getRoleName()
                            })
                    app_dict["windows"].append(win_info)
                elements.append(app_dict)
            return {"ui_elements": elements, "status": "success"}
        except ImportError:
            # Fallback to window enumeration
            return self.list_windows()
        except Exception as e:
            return {"status": "partial", "fallback_windows": self.list_windows(), "error": str(e)}
