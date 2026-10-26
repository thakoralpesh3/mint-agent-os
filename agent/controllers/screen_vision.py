#!/usr/bin/env python3
"""
Screen Perception & Vision Controller for MintPilot
Takes screenshots and extracts on-screen text coordinates using lightweight OCR.
"""

import os
import shutil
import subprocess
import tempfile
from typing import Dict, Any, List, Optional


class ScreenVisionController:
    """Provides visual perception of the desktop screen on Linux Mint."""

    def __init__(self):
        self._capture_tool = self._find_capture_tool()
        self._has_tesseract = shutil.which("tesseract") is not None

    def _find_capture_tool(self) -> Optional[str]:
        for tool in ["maim", "scrot", "import"]:
            if shutil.which(tool):
                return tool
        return None

    def capture_screenshot(self, output_path: Optional[str] = None) -> Dict[str, Any]:
        """Captures a screenshot of the primary display."""
        if not output_path:
            fd, output_path = tempfile.mkstemp(suffix=".png", prefix="mint_screen_")
            os.close(fd)

        if not self._capture_tool:
            # Fallback to python PIL / pyscreenshot if available
            try:
                from PIL import ImageGrab
                im = ImageGrab.grab()
                im.save(output_path)
                return {"status": "success", "file_path": output_path, "tool": "ImageGrab"}
            except Exception as e:
                return {"error": f"No screenshot utility found (tried maim, scrot, import, PIL): {e}", "status": "failed"}

        try:
            if self._capture_tool == "maim":
                subprocess.run(["maim", output_path], check=True)
            elif self._capture_tool == "scrot":
                subprocess.run(["scrot", output_path], check=True)
            elif self._capture_tool == "import":
                subprocess.run(["import", "-window", "root", output_path], check=True)

            return {
                "status": "success",
                "file_path": output_path,
                "tool": self._capture_tool,
                "size_bytes": os.path.getsize(output_path)
            }
        except Exception as e:
            return {"error": str(e), "status": "failed"}

    def read_screen_text(self, bounding_box: Optional[Dict[str, int]] = None) -> Dict[str, Any]:
        """
        Captures the screen and performs OCR to find all visible text and words.
        """
        cap = self.capture_screenshot()
        if cap.get("status") != "success":
            return cap

        img_path = cap["file_path"]

        if not self._has_tesseract:
            return {
                "status": "partial",
                "screenshot_path": img_path,
                "text": "",
                "note": "tesseract-ocr not installed. Screen captured but OCR skipped."
            }

        try:
            # Run tesseract CLI
            out_base = img_path + "_ocr"
            subprocess.run(["tesseract", img_path, out_base, "--oem", "1", "-l", "eng"], check=True, capture_output=True)
            txt_file = out_base + ".txt"
            if os.path.exists(txt_file):
                with open(txt_file, "r", encoding="utf-8") as f:
                    extracted = f.read().strip()
                os.remove(txt_file)
            else:
                extracted = ""

            return {
                "status": "success",
                "screenshot_path": img_path,
                "text": extracted,
                "text_length": len(extracted)
            }
        except Exception as e:
            return {"error": f"OCR failed: {e}", "screenshot_path": img_path, "status": "failed"}
