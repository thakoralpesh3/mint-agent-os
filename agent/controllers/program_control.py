#!/usr/bin/env python3
"""
Program Controller for MintPilot on Linux Mint
Enables deep automation and control over installed desktop programs:
LibreOffice (Writer, Calc), VLC Media Player, Nemo File Manager,
Text Editors (Xed, VS Code), Calculator, and Terminal.
"""

import os
import time
import shutil
import subprocess
from typing import Dict, Any, List, Optional

from agent.controllers.gui_control import GUIController


class ProgramController:
    """Controls and automates Linux Mint desktop applications."""

    # Map of common software names to Linux executable binaries & window classes
    APP_REGISTRY = {
        "libreoffice_writer": {"bin": "libreoffice --writer", "win": "Writer", "desc": "LibreOffice Writer Document"},
        "libreoffice_calc": {"bin": "libreoffice --calc", "win": "Calc", "desc": "LibreOffice Calc Spreadsheet"},
        "vlc": {"bin": "vlc", "win": "VLC", "desc": "VLC Media Player"},
        "nemo": {"bin": "nemo", "win": "Nemo", "desc": "Nemo File Manager"},
        "terminal": {"bin": "x-terminal-emulator", "win": "Terminal", "desc": "Terminal Emulator"},
        "text_editor": {"bin": "xed", "win": "xed", "desc": "Xed Text Editor"},
        "calculator": {"bin": "gnome-calculator", "win": "Calculator", "desc": "GNOME Calculator"},
        "system_monitor": {"bin": "gnome-system-monitor", "win": "System Monitor", "desc": "System Monitor"},
        "gimp": {"bin": "gimp", "win": "GIMP", "desc": "GIMP Image Editor"}
    }

    def __init__(self, gui_controller: Optional[GUIController] = None):
        self.gui = gui_controller or GUIController()

    def launch_program(self, app_key_or_name: str, args: Optional[List[str]] = None) -> Dict[str, Any]:
        """Launches a desktop program and brings it to focus."""
        clean_key = app_key_or_name.lower().replace(" ", "_").strip()
        cmd = None
        win_title = None

        if clean_key in self.APP_REGISTRY:
            cmd = self.APP_REGISTRY[clean_key]["bin"]
            win_title = self.APP_REGISTRY[clean_key]["win"]
        else:
            # Custom binary
            cmd = app_key_or_name
            win_title = app_key_or_name

        full_cmd = [cmd]
        if args:
            full_cmd.extend(args)

        try:
            subprocess.Popen(" ".join(full_cmd), shell=True, start_new_session=True)
            time.sleep(1.0)
            if win_title:
                self.gui.focus_window(win_title)
            return {"status": "success", "program": app_key_or_name, "action": "launched"}
        except Exception as e:
            return {"error": str(e), "status": "failed"}

    def control_libreoffice_writer(self, text_to_write: str, save_path: Optional[str] = None) -> Dict[str, Any]:
        """
        Creates a new LibreOffice Writer document, types text into it, and saves if path is given.
        """
        self.launch_program("libreoffice_writer")
        time.sleep(2.0)  # Wait for Writer to initialize

        # Focus window
        self.gui.focus_window("Writer")
        time.sleep(0.5)

        # Type the text
        self.gui.type_text(text_to_write)
        time.sleep(0.5)

        if save_path:
            abs_path = os.path.abspath(os.path.expanduser(save_path))
            self.gui.hotkey("ctrl+s")
            time.sleep(0.8)
            self.gui.type_text(abs_path)
            time.sleep(0.3)
            self.gui.press_key("Return")
            return {"status": "success", "action": "written_and_saved", "file": abs_path}

        return {"status": "success", "action": "written_to_document"}

    def control_vlc(self, action: str, media_file: Optional[str] = None) -> Dict[str, Any]:
        """
        Controls VLC Media Player: play, pause, fullscreen, volume, or open file.
        """
        if media_file:
            path = os.path.abspath(os.path.expanduser(media_file))
            return self.launch_program("vlc", [path])

        self.gui.focus_window("VLC")
        time.sleep(0.2)

        act = action.lower().strip()
        if act in ["play", "pause", "toggle"]:
            self.gui.press_key("space")
        elif act in ["fullscreen", "toggle_fullscreen"]:
            self.gui.press_key("f")
        elif act in ["mute", "unmute"]:
            self.gui.press_key("m")
        elif act in ["stop"]:
            self.gui.press_key("s")
        elif act in ["forward", "seek_forward"]:
            self.gui.hotkey("alt+Right")
        elif act in ["backward", "seek_backward"]:
            self.gui.hotkey("alt+Left")
        else:
            return {"error": f"Unknown VLC action: '{action}'"}

        return {"status": "success", "action": f"vlc_{action}"}

    def open_directory_in_nemo(self, dir_path: str = "~") -> Dict[str, Any]:
        """Opens a folder path in Linux Mint's Nemo file manager."""
        target = os.path.abspath(os.path.expanduser(dir_path))
        return self.launch_program("nemo", [target])

    def close_program(self, app_name_or_window: str) -> Dict[str, Any]:
        """Closes a program window gracefully."""
        return self.gui.close_window(app_name_or_window)

    def list_running_programs(self) -> Dict[str, Any]:
        """Lists active desktop application windows with process information."""
        return self.gui.list_windows()
