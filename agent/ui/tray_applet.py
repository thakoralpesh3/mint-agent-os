#!/usr/bin/env python3
"""
MintPilot System Tray Applet for Linux Mint Panel
Displays agent status, hardware health, and quick actions menu.
"""

import sys
import subprocess
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent.parent
sys.path.insert(0, str(ROOT_DIR))

import gi
gi.require_version('Gtk', '3.0')
from gi.repository import Gtk, GLib

from agent.brain.inference import AgentBrain


class MintTrayApplet:
    def __init__(self):
        self.brain = AgentBrain()
        self.status_icon = Gtk.StatusIcon()
        self.status_icon.set_from_icon_name("system-run")
        self.status_icon.set_tooltip_text("MintPilot — Autonomous Laptop Agent")

        self.status_icon.connect("activate", self._on_left_click)
        self.status_icon.connect("popup-menu", self._on_right_click)

    def _on_left_click(self, icon):
        """Launches HUD overlay on left click."""
        hud_path = ROOT_DIR / "agent" / "ui" / "hud_overlay.py"
        subprocess.Popen(["python3", str(hud_path)])

    def _on_right_click(self, icon, button, time):
        """Displays quick action context menu on right click."""
        menu = Gtk.Menu()

        # Item 1: Open HUD
        hud_item = Gtk.MenuItem(label="🍃 Open MintPilot HUD (Super+Space)")
        hud_item.connect("activate", self._on_left_click)
        menu.append(hud_item)

        menu.append(Gtk.SeparatorMenuItem())

        # Item 2: Battery Status
        bat = self.brain.system.get_battery_status()
        bat_pct = bat.get("percentage", "100%")
        bat_state = bat.get("state", "AC")
        bat_item = Gtk.MenuItem(label=f"⚡ Battery: {bat_pct} ({bat_state})")
        menu.append(bat_item)

        # Item 3: Hardware Health
        hw = self.brain.system.get_hardware_telemetry()
        ram_pct = hw.get("ram_usage_percent", 0)
        hw_item = Gtk.MenuItem(label=f"📊 RAM Usage: {ram_pct}% ({hw.get('ram_used_mb', 0)} MB)")
        menu.append(hw_item)

        menu.append(Gtk.SeparatorMenuItem())

        # Item 4: Mute Toggle
        mute_item = Gtk.MenuItem(label="🔇 Toggle Audio Mute")
        mute_item.connect("activate", lambda w: self.brain.system.toggle_mute())
        menu.append(mute_item)

        # Item 5: Lock Workstation
        lock_item = Gtk.MenuItem(label="🔒 Lock Workstation")
        lock_item.connect("activate", lambda w: self.brain.system.execute_power_action("lock"))
        menu.append(lock_item)

        menu.append(Gtk.SeparatorMenuItem())

        # Item 6: Quit
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
