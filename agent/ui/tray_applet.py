#!/usr/bin/env python3
"""
MintPilot System Tray Applet for Linux Mint Panel
Displays agent status, hardware health, quick actions menu,
Turbo/Safe mode toggle, and one-click WebUI launcher.
"""

import sys
import subprocess
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent.parent
sys.path.insert(0, str(ROOT_DIR))

import gi
gi.require_version('Gtk', '3.0')
from gi.repository import Gtk

from agent.brain.inference import AgentBrain


class MintTrayApplet:
    def __init__(self):
        self.brain = AgentBrain()
        self.status_icon = Gtk.StatusIcon()
        self.status_icon.set_from_icon_name("system-run")
        self.update_tooltip()

        self.status_icon.connect("activate", self._on_left_click)
        self.status_icon.connect("popup-menu", self._on_right_click)

    def update_tooltip(self):
        mode_str = "TURBO" if self.brain.permissions.is_turbo() else "SAFE"
        self.status_icon.set_tooltip_text(f"MintPilot [{mode_str}] — Autonomous Laptop Agent")

    def _on_left_click(self, icon):
        """Launches HUD overlay on left click."""
        hud_path = ROOT_DIR / "agent" / "ui" / "hud_overlay.py"
        subprocess.Popen(["python3", str(hud_path)])

    def _open_webui(self, widget):
        """Opens the embedded Open WebUI in default browser."""
        subprocess.Popen(["xdg-open", "http://127.0.0.1:8888"])

    def _toggle_mode(self, widget):
        """Toggles between Turbo and Safe mode."""
        next_mode = "safe" if self.brain.permissions.is_turbo() else "turbo"
        self.brain.permissions.set_mode(next_mode)
        self.update_tooltip()

    def _on_right_click(self, icon, button, time):
        """Displays quick action context menu on right click."""
        menu = Gtk.Menu()

        # Item 1: Open HUD
        hud_item = Gtk.MenuItem(label="🍃 Open MintPilot HUD (Super+Space)")
        hud_item.connect("activate", self._on_left_click)
        menu.append(hud_item)

        # Item 2: Open WebUI
        webui_item = Gtk.MenuItem(label="🌐 Open WebUI Dashboard (localhost:8888)")
        webui_item.connect("activate", self._open_webui)
        menu.append(webui_item)

        menu.append(Gtk.SeparatorMenuItem())

        # Item 3: Mode Toggle
        mode_label = "⚡ Switch to SAFE Mode" if self.brain.permissions.is_turbo() else "⚡ Switch to TURBO Mode (Autonomous)"
        mode_item = Gtk.MenuItem(label=mode_label)
        mode_item.connect("activate", self._toggle_mode)
        menu.append(mode_item)

        # Item 4: Clean Memory
        mem_item = Gtk.MenuItem(label="🧹 Free RAM & Clean Cache")
        mem_item.connect("activate", lambda w: self.brain.memory.clean_memory())
        menu.append(mem_item)

        menu.append(Gtk.SeparatorMenuItem())

        # Item 5: Battery Status
        bat = self.brain.system.get_battery_status()
        bat_pct = bat.get("percentage", "100%")
        bat_state = bat.get("state", "AC")
        bat_item = Gtk.MenuItem(label=f"⚡ Battery: {bat_pct} ({bat_state})")
        menu.append(bat_item)

        # Item 6: Hardware Health
        mem_stats = self.brain.memory.get_memory_stats()
        ram_pct = mem_stats.get("usage_percent", 0)
        hw_item = Gtk.MenuItem(label=f"📊 RAM Usage: {ram_pct}% ({mem_stats.get('available_mb', 0)}MB free)")
        menu.append(hw_item)

        menu.append(Gtk.SeparatorMenuItem())

        # Item 7: Mute Toggle
        mute_item = Gtk.MenuItem(label="🔇 Toggle Audio Mute")
        mute_item.connect("activate", lambda w: self.brain.system.toggle_mute())
        menu.append(mute_item)

        # Item 8: Lock Workstation
        lock_item = Gtk.MenuItem(label="🔒 Lock Workstation")
        lock_item.connect("activate", lambda w: self.brain.system.execute_power_action("lock"))
        menu.append(lock_item)

        menu.append(Gtk.SeparatorMenuItem())

        # Item 9: Quit
        quit_item = Gtk.MenuItem(label="Exit MintPilot")
        quit_item.connect("activate", Gtk.main_quit)
        menu.append(quit_item)

        menu.show_all()
        menu.popup(None, None, Gtk.StatusIcon.position_menu, self.status_icon, button, time)


def main():
    applet = MintTrayApplet()
    Gtk.main()


if __name__ == "__main__":
    main()
