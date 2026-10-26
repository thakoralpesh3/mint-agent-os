#!/usr/bin/env python3
"""
MintPilot Native GTK3 HUD Command Bar
Provides an elegant floating Spotlight/Raycast-style command overlay
summonable on Linux Mint via Super+Space or Ctrl+Space.
"""

import sys
from pathlib import Path

# Ensure agent package is in path
ROOT_DIR = Path(__file__).resolve().parent.parent.parent
sys.path.insert(0, str(ROOT_DIR))

import gi
gi.require_version('Gtk', '3.0')
gi.require_version('Gdk', '3.0')
from gi.repository import Gtk, Gdk, GLib

from agent.brain.inference import AgentBrain


class MintHUDOverlay(Gtk.Window):
    def __init__(self):
        super().__init__(title="MintPilot HUD")
        self.brain = AgentBrain()

        # Window styling: Frameless, Centered, Topmost
        self.set_decorated(False)
        self.set_resizable(False)
        self.set_position(Gtk.WindowPosition.CENTER)
        self.set_keep_above(True)
        self.set_default_size(650, 160)

        # Transparency & CSS
        self.set_app_paintable(True)
        screen = self.get_screen()
        visual = screen.get_rgba_visual()
        if visual and screen.is_composited():
            self.set_visual(visual)

        self._apply_css()
        self._build_ui()

        # Event handling
        self.connect("key-press-event", self._on_key_press)
        self.connect("destroy", Gtk.main_quit)

    def _apply_css(self):
        css_provider = Gtk.CssProvider()
        css = b"""
        window {
            background-color: rgba(24, 28, 26, 0.94);
            border: 2px solid #2ecc71;
            border-radius: 16px;
        }
        entry {
            background-color: rgba(36, 44, 40, 0.9);
            color: #ffffff;
            border: 1px solid #3d5647;
            border-radius: 10px;
            font-size: 17px;
            padding: 10px 14px;
            caret-color: #2ecc71;
        }
        entry:focus {
            border-color: #2ecc71;
        }
        label.status {
            color: #95a5a6;
            font-size: 13px;
        }
        label.result {
            color: #2ecc71;
            font-size: 14px;
            font-weight: bold;
        }
        """
        css_provider.load_from_data(css)
        Gtk.StyleContext.add_provider_for_screen(
            self.get_screen(),
            css_provider,
            Gtk.STYLE_PROVIDER_PRIORITY_APPLICATION
        )

    def _build_ui(self):
        vbox = Gtk.Box(orientation=Gtk.Orientation.VERTICAL, spacing=12)
        vbox.set_margin_top(16)
        vbox.set_margin_bottom(16)
        vbox.set_margin_start(20)
        vbox.set_margin_end(20)

        # Header Title
        title_box = Gtk.Box(orientation=Gtk.Orientation.HORIZONTAL)
        title_label = Gtk.Label(label="🍃 MintPilot — Autonomous Laptop Controller")
        title_label.set_halign(Gtk.Align.START)
        title_box.pack_start(title_label, True, True, 0)

        esc_hint = Gtk.Label(label="[ESC to close]")
        esc_hint.get_style_context().add_class("status")
        esc_hint.set_halign(Gtk.Align.END)
        title_box.pack_end(esc_hint, False, False, 0)
        vbox.pack_start(title_box, False, False, 0)

        # Command Input Field
        self.entry = Gtk.Entry()
        self.entry.set_placeholder_text("Type instruction (e.g. 'mute', 'volume 50%', 'battery', 'open nemo')...")
        self.entry.connect("activate", self._on_submit)
        vbox.pack_start(self.entry, False, False, 0)

        # Output / Feedback Box
        self.result_label = Gtk.Label(label="")
        self.result_label.get_style_context().add_class("result")
        self.result_label.set_halign(Gtk.Align.START)
        vbox.pack_start(self.result_label, False, False, 0)

        self.add(vbox)

    def _on_key_press(self, widget, event):
        if event.keyval == Gdk.KEY_Escape:
            self.destroy()
            return True
        return False

    def _on_submit(self, entry):
        text = entry.get_text().strip()
        if not text:
            return

        self.result_label.set_text("Thinking...")
        # Process command
        res = self.brain.process_command(text)
        thought = res.get("thought", "Action executed")
        latency = res.get("latency_ms", 0)

        self.result_label.set_text(f"✓ {thought} ({latency}ms)")
        # Auto-clear after 3 seconds or keep visible
        GLib.timeout_add_seconds(3, self._reset_status)

    def _reset_status(self):
        self.entry.set_text("")
        self.result_label.set_text("")
        return False


def main():
    win = MintHUDOverlay()
    win.show_all()
    Gtk.main()


if __name__ == "__main__":
    main()
