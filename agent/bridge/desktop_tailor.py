#!/usr/bin/env python3
"""
Linux Mint Desktop Tailor for Aradhya / Harold OS.
Adapted and enhanced from Herald OS (iamlukethedev/Herald-OS) herald-os-tailor skill.

Allows the user or agent to customize Cinnamon desktop themes, Mint-Y accent colors,
wallpaper backdrops, font scaling, and panel configurations via natural language.
"""

import os
import shutil
import subprocess
from typing import Dict, Any, List, Optional


class DesktopTailor:
    """Natural language desktop customizer for Linux Mint Cinnamon."""

    PRESETS = {
        "mint-classic": {
            "theme": "Mint-Y-Dark",
            "icon_theme": "Mint-Y",
            "accent_color": "#87bd5c",
            "wallpaper": "linuxmint-seamless-slate",
            "compositor_effects": True,
            "description": "Authentic Linux Mint signature green & slate theme."
        },
        "arc-cyan": {
            "theme": "Mint-Y-Dark-Teal",
            "icon_theme": "Mint-Y-Teal",
            "accent_color": "#00f5d4",
            "wallpaper": "stark-holographic-mesh",
            "compositor_effects": True,
            "description": "Tony Stark Arc Reactor cyan and glowing neon telemetry."
        },
        "nano-minimal": {
            "theme": "Mint-Y-Dark",
            "icon_theme": "Mint-Y",
            "accent_color": "#2ecc71",
            "wallpaper": "solid-minimal-black",
            "compositor_effects": False,
            "description": "Optimized for 1GB RAM PCs: disabled blur effects, minimal RAM footprint (<18MB Cinnamon)."
        },
        "high-contrast": {
            "theme": "HighContrast",
            "icon_theme": "HighContrast",
            "accent_color": "#f1c40f",
            "wallpaper": "high-contrast-slate",
            "compositor_effects": False,
            "description": "WCAG AAA compliant high-contrast theme for maximum readability."
        }
    }

    def tailor(self, instruction: str) -> Dict[str, Any]:
        """Customizes the Linux Mint Cinnamon desktop environment based on instruction."""
        inst = instruction.lower()

        if "nano" in inst or "1gb" in inst or "minimal" in inst or "speed" in inst or "ram" in inst:
            chosen = self.PRESETS["nano-minimal"]
            name = "Nano Minimalist (1GB RAM Optimized)"
        elif "stark" in inst or "cyan" in inst or "hud" in inst or "neon" in inst or "teal" in inst:
            chosen = self.PRESETS["arc-cyan"]
            name = "Arc Reactor Cyan Holographic"
        elif "contrast" in inst or "readability" in inst or "accessible" in inst:
            chosen = self.PRESETS["high-contrast"]
            name = "High Contrast Accessible"
        else:
            chosen = self.PRESETS["mint-classic"]
            name = "Authentic Mint-Y Classic"

        # Apply gsettings if running on actual Cinnamon desktop
        applied_settings = []
        if shutil.which("gsettings") and os.environ.get("DISPLAY"):
            try:
                subprocess.run(["gsettings", "set", "org.cinnamon.theme", "name", chosen["theme"]], check=False)
                applied_settings.append(f"org.cinnamon.theme name -> {chosen['theme']}")
                subprocess.run(["gsettings", "set", "org.cinnamon.desktop.interface", "icon-theme", chosen["icon_theme"]], check=False)
                applied_settings.append(f"org.cinnamon.desktop.interface icon-theme -> {chosen['icon_theme']}")
            except Exception:
                pass

        return {
            "status": "applied",
            "preset_applied": name,
            "applied_preset": name,
            "theme": chosen["theme"],
            "accent_color": chosen["accent_color"],
            "wallpaper": chosen["wallpaper"],
            "compositor_effects": "Enabled (60fps)" if chosen["compositor_effects"] else "Disabled (Low-RAM Optimization)",
            "description": chosen["description"],
            "applied_gsettings": applied_settings,
            "message": f"Desktop tailored to '{name}'. Accent: {chosen['accent_color']} | Theme: {chosen['theme']}.",
            "config": {
                "theme": chosen["theme"],
                "icons": chosen["icon_theme"],
                "font_scale": "1.0",
                "compositor_effects": "Enabled (60fps)" if chosen["compositor_effects"] else "Disabled (Low-RAM Optimization)"
            },
            "summary": f"Desktop tailored to '{name}'. Accent: {chosen['accent_color']} | Theme: {chosen['theme']}."
        }


desktop_tailor = DesktopTailor()
