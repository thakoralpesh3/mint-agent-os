#!/usr/bin/env python3
"""
Browser Controller for MintPilot on Linux Mint
Enables deep browser automation both through native desktop GUI controls
(Firefox, Chrome, Chromium) and direct web content perception.
"""

import re
import time
import shutil
import urllib.request
import urllib.parse
import subprocess
from typing import Dict, Any, List, Optional

from agent.controllers.gui_control import GUIController


class BrowserController:
    """Automates and controls web browsers on Linux Mint."""

    SUPPORTED_BROWSERS = ["firefox", "google-chrome", "chromium-browser", "brave-browser"]

    def __init__(self, gui_controller: Optional[GUIController] = None):
        self.gui = gui_controller or GUIController()
        self.active_browser = self._detect_default_browser()

    def _detect_default_browser(self) -> str:
        """Finds the primary installed browser on the system."""
        for b in self.SUPPORTED_BROWSERS:
            if shutil.which(b):
                return b
        return "firefox"

    # ==================== NATIVE DESKTOP BROWSER CONTROL ====================

    def open_url_in_browser(self, url: str, new_tab: bool = True) -> Dict[str, Any]:
        """
        Opens a URL in the user's desktop browser (Firefox / Chrome).
        """
        if not url.startswith("http://") and not url.startswith("https://"):
            url = "https://" + url

        try:
            # Launch via xdg-open or direct browser
            subprocess.Popen(["xdg-open", url], start_new_session=True)
            time.sleep(1.2)
            return {
                "status": "success",
                "opened_url": url,
                "browser": self.active_browser,
                "action": "open_url"
            }
        except Exception as e:
            return {"error": str(e), "status": "failed"}

    def focus_browser(self) -> Dict[str, Any]:
        """Brings the active browser window to the foreground."""
        for b in ["Firefox", "Chrome", "Chromium", "Brave"]:
            res = self.gui.focus_window(b)
            if res.get("status") == "success":
                return {"status": "success", "focused_browser": b}
        return {"error": "No open browser window found to focus", "status": "failed"}

    def new_tab(self, url: Optional[str] = None) -> Dict[str, Any]:
        """Opens a new tab in the active browser, optionally navigating to a URL."""
        self.focus_browser()
        time.sleep(0.3)
        self.gui.hotkey("ctrl+t")
        time.sleep(0.3)

        if url:
            self.gui.type_text(url)
            time.sleep(0.1)
            self.gui.press_key("Return")

        return {"status": "success", "action": "new_tab", "url": url}

    def close_current_tab(self) -> Dict[str, Any]:
        """Closes the currently active browser tab."""
        self.focus_browser()
        time.sleep(0.2)
        self.gui.hotkey("ctrl+w")
        return {"status": "success", "action": "close_tab"}

    def switch_tab(self, direction: str = "next") -> Dict[str, Any]:
        """Switches to next or previous tab."""
        self.focus_browser()
        time.sleep(0.2)
        if direction.lower() in ["prev", "previous", "left"]:
            self.gui.hotkey("ctrl+Page_Up")
        else:
            self.gui.hotkey("ctrl+Page_Down")
        return {"status": "success", "action": f"switch_tab_{direction}"}

    def scroll_page(self, direction: str = "down", amount: int = 3) -> Dict[str, Any]:
        """Scrolls the current webpage up or down."""
        self.focus_browser()
        key = "Page_Down" if direction.lower() == "down" else "Page_Up"
        for _ in range(max(1, amount)):
            self.gui.press_key(key)
            time.sleep(0.15)
        return {"status": "success", "scrolled": direction, "times": amount}

    def search_web(self, query: str) -> Dict[str, Any]:
        """Performs a web search in the desktop browser."""
        encoded = urllib.parse.quote_plus(query)
        search_url = f"https://www.google.com/search?q={encoded}"
        return self.open_url_in_browser(search_url)

    # ==================== LIGHTWEIGHT CONTENT EXTRACTOR ====================

    def fetch_page_content(self, url: str) -> Dict[str, Any]:
        """
        Fetches web page content directly and extracts readable text & links.
        Extremely memory-efficient (<5MB RAM), ideal for 2GB-4GB laptops.
        """
        if not url.startswith("http://") and not url.startswith("https://"):
            url = "https://" + url

        try:
            req = urllib.request.Request(
                url,
                headers={"User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/119.0"}
            )
            with urllib.request.urlopen(req, timeout=12) as response:
                html = response.read().decode("utf-8", errors="ignore")

            # Extract Title
            title_m = re.search(r"<title[^>]*>(.*?)</title>", html, re.IGNORECASE | re.DOTALL)
            title = title_m.group(1).strip() if title_m else "No Title"

            # Strip script, style, comments
            clean_html = re.sub(r"<(script|style|noscript)[^>]*>.*?</\1>", "", html, flags=re.IGNORECASE | re.DOTALL)
            clean_html = re.sub(r"<!--.*?-->", "", clean_html, flags=re.DOTALL)

            # Extract Links
            links = []
            for match in re.finditer(r'<a[^>]+href=["\'](https?://[^"\']+)["\'][^>]*>(.*?)</a>', clean_html, re.IGNORECASE):
                href, text = match.group(1), re.sub(r"<[^>]+>", "", match.group(2)).strip()
                if text and len(links) < 25:
                    links.append({"text": text, "url": href})

            # Convert to plain text
            text = re.sub(r"<[^>]+>", " ", clean_html)
            text = re.sub(r"\s+", " ", text).strip()

            snippet = text[:2500] + ("..." if len(text) > 2500 else "")

            return {
                "status": "success",
                "url": url,
                "title": title,
                "text_snippet": snippet,
                "links": links
            }
        except Exception as e:
            return {"error": str(e), "status": "failed", "url": url}
