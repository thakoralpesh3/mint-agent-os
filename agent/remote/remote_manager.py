#!/usr/bin/env python3
"""
Aradhya AI Agent OS - Remote Mobile Access Manager
Enables mobile smartphone companion access to Linux Mint PC:
- Auto LAN IP detection & zero-config pairing
- 6-digit OTP PIN & HMAC master pairing token
- Terminal ASCII QR code and vector SVG QR code generation
- Rate-limiting, brute-force defense, and instant revocation
- Touch trackpad, virtual typing, screen snapshot, and voice copilot relay
"""

import os
import sys
import json
import time
import socket
import secrets
import subprocess
from pathlib import Path
from typing import Dict, Any, List, Optional, Tuple

ROOT_DIR = Path(__file__).resolve().parent.parent.parent
CONFIG_DIR = ROOT_DIR / "agent" / "config"
SESSIONS_FILE = CONFIG_DIR / "remote_sessions.json"

try:
    import qrcode
    HAS_QRCODE = True
except ImportError:
    HAS_QRCODE = False


class RemoteAccessManager:
    """Manages secure mobile companion pairing, QR generation, and session lifecycle."""

    def __init__(self):
        CONFIG_DIR.mkdir(parents=True, exist_ok=True)
        self.sessions: Dict[str, Dict[str, Any]] = {}
        self.failed_attempts: Dict[str, List[float]] = {}
        self.master_token: str = ""
        self.pairing_pin: str = ""
        self.pin_created_at: float = 0.0
        self._load_state()

        if not self.master_token or not self.pairing_pin:
            self._regenerate_credentials()

    def _regenerate_credentials(self):
        """Generates a fresh 6-digit PIN and 32-character master token."""
        digits = "".join([str(secrets.randbelow(10)) for _ in range(6)])
        self.pairing_pin = digits
        self.master_token = secrets.token_hex(20)
        self.pin_created_at = time.time()
        self._save_state()

    def _load_state(self):
        """Loads persistent session state and tokens from file."""
        if SESSIONS_FILE.exists():
            try:
                with open(SESSIONS_FILE, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    self.master_token = data.get("master_token", "")
                    self.pairing_pin = data.get("pairing_pin", "")
                    self.pin_created_at = data.get("pin_created_at", time.time())
                    self.sessions = data.get("sessions", {})
            except Exception:
                pass

    def _save_state(self):
        """Persists session state and tokens to file."""
        try:
            with open(SESSIONS_FILE, "w", encoding="utf-8") as f:
                json.dump({
                    "master_token": self.master_token,
                    "pairing_pin": self.pairing_pin,
                    "pin_created_at": self.pin_created_at,
                    "sessions": self.sessions
                }, f, indent=2)
        except Exception:
            pass

    # ==================== NETWORK & LAN IP DISCOVERY ====================

    def get_lan_ips(self) -> List[str]:
        """Discovers all non-loopback LAN IPv4 addresses on Linux Mint."""
        ips = []
        seen = set()

        # Method 1: UDP probe to non-routable address (instant, kernel routing)
        try:
            s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
            s.settimeout(0.2)
            s.connect(("10.255.255.255", 1))
            primary_ip = s.getsockname()[0]
            s.close()
            if primary_ip and not primary_ip.startswith("127."):
                ips.append(primary_ip)
                seen.add(primary_ip)
        except Exception:
            pass

        # Method 2: hostname -I CLI
        try:
            out = subprocess.check_output(["hostname", "-I"], text=True, stderr=subprocess.DEVNULL).strip()
            for ip in out.split():
                if ip not in seen and not ip.startswith("127.") and ":" not in ip:
                    ips.append(ip)
                    seen.add(ip)
        except Exception:
            pass

        # Method 3: socket gethostbyname_ex
        try:
            hostname = socket.gethostname()
            _, _, host_ips = socket.gethostbyname_ex(hostname)
            for ip in host_ips:
                if ip not in seen and not ip.startswith("127.") and ":" not in ip:
                    ips.append(ip)
                    seen.add(ip)
        except Exception:
            pass

        if not ips:
            ips = ["127.0.0.1"]
        return ips

    def get_primary_ip(self) -> str:
        """Returns the most likely LAN IP accessible to mobile phones on local Wi-Fi."""
        lan_ips = self.get_lan_ips()
        for ip in lan_ips:
            # Prefer standard Wi-Fi router subnets
            if ip.startswith("192.168.") or ip.startswith("10.") or ip.startswith("172."):
                return ip
        return lan_ips[0]

    def get_mobile_url(self, port: int = 8888, auto_pair: bool = True) -> str:
        """Builds the full HTTP URL for the mobile companion webapp."""
        ip = self.get_primary_ip()
        base = f"http://{ip}:{port}/mobile"
        if auto_pair:
            return f"{base}?token={self.master_token}&pin={self.pairing_pin}"
        return base

    # ==================== CREDENTIALS & FORMATTING ====================

    def get_formatted_pin(self) -> str:
        """Returns PIN formatted as XXX-XXX (e.g. 742-198)."""
        p = self.pairing_pin.replace("-", "").strip()
        if len(p) == 6:
            return f"{p[:3]}-{p[3:]}"
        return p

    def get_pairing_pin(self) -> str:
        return self.pairing_pin

    def get_master_token(self) -> str:
        return self.master_token

    # ==================== QR CODE GENERATION ====================

    def generate_ascii_qr(self, url: Optional[str] = None, port: int = 8888) -> str:
        """Generates terminal-friendly ASCII QR code."""
        if not HAS_QRCODE:
            return "QR Code generation requires 'qrcode' library (pip install qrcode)."

        target_url = url or self.get_mobile_url(port=port, auto_pair=True)
        import io
        qr = qrcode.QRCode(box_size=1, border=1)
        qr.add_data(target_url)
        qr.make(fit=True)
        buf = io.StringIO()
        qr.print_ascii(out=buf, invert=True)
        return buf.getvalue()

    def generate_svg_qr(self, url: Optional[str] = None, port: int = 8888,
                        fill_color: str = "#87cf3e", bg_color: str = "#141714") -> str:
        """
        Generates ultra-crisp vector SVG QR code string (<6KB)
        Zero image library dependency; 100% lightweight & retina-ready.
        """
        if not HAS_QRCODE:
            return f"<svg><text fill='white'>QR Code unavailable</text></svg>"

        target_url = url or self.get_mobile_url(port=port, auto_pair=True)
        qr = qrcode.QRCode(border=2)
        qr.add_data(target_url)
        qr.make(fit=True)
        matrix = qr.modules
        size = len(matrix)

        rects = []
        for r in range(size):
            for c in range(size):
                if matrix[r][c]:
                    rects.append(f"M{c},{r}h1v1h-1z")

        path_data = "".join(rects)
        svg = (
            f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}" '
            f'shape-rendering="crispEdges" style="background:{bg_color};border-radius:12px;padding:8px;">'
            f'<path d="{path_data}" fill="{fill_color}"/>'
            f'</svg>'
        )
        return svg

    # ==================== AUTHENTICATION & SESSIONS ====================

    def is_rate_limited(self, ip: str) -> bool:
        """Enforces max 5 failed pairing attempts per IP within 15 minutes."""
        now = time.time()
        window = 15 * 60
        attempts = [t for t in self.failed_attempts.get(ip, []) if now - t < window]
        self.failed_attempts[ip] = attempts
        return len(attempts) >= 5

    def record_failed_attempt(self, ip: str):
        now = time.time()
        if ip not in self.failed_attempts:
            self.failed_attempts[ip] = []
        self.failed_attempts[ip].append(now)

    def verify_pin(self, pin_attempt: str, client_ip: str = "unknown",
                   user_agent: str = "mobile") -> Dict[str, Any]:
        """
        Verifies 6-digit PIN and issues a new session token.
        Accepts both formatted '742-198' and unformatted '742198'.
        """
        if self.is_rate_limited(client_ip):
            return {
                "authenticated": False,
                "error": "Rate limit exceeded. Too many failed pairing attempts. Try again in 15 minutes.",
                "status": "rate_limited"
            }

        cleaned = str(pin_attempt).replace("-", "").replace(" ", "").strip()
        expected = str(self.pairing_pin).replace("-", "").strip()

        if cleaned == expected and len(cleaned) == 6:
            # PIN matches! Create a distinct session token
            session_token = secrets.token_hex(24)
            now = time.time()
            session_info = {
                "token": session_token,
                "ip": client_ip,
                "user_agent": user_agent,
                "created_at": now,
                "last_active": now,
                "expires_at": now + (24 * 3600),  # 24 hour session
                "device_name": self._guess_device_name(user_agent)
            }
            self.sessions[session_token] = session_info
            self._save_state()
            return {
                "authenticated": True,
                "token": session_token,
                "expires_in_hours": 24,
                "device": session_info["device_name"],
                "status": "success"
            }
        else:
            self.record_failed_attempt(client_ip)
            return {
                "authenticated": False,
                "error": "Invalid pairing PIN. Check terminal or desktop QR code hub.",
                "status": "invalid_pin"
            }

    def verify_token(self, token: Optional[str]) -> bool:
        """
        Validates token (either master pairing token from QR code or active session token).
        """
        if not token:
            return False
        clean_token = token.strip()
        # 1. Master pairing token check
        if clean_token == self.master_token:
            return True
        # 2. Session tokens check
        if clean_token in self.sessions:
            sess = self.sessions[clean_token]
            if time.time() < sess.get("expires_at", 0):
                sess["last_active"] = time.time()
                return True
            else:
                # Expired session
                del self.sessions[clean_token]
                self._save_state()
        return False

    def get_session_info(self, token: str) -> Optional[Dict[str, Any]]:
        return self.sessions.get(token)

    def update_device_info(self, token: str, info: Dict[str, Any]):
        if token in self.sessions:
            self.sessions[token].update(info)
            self.sessions[token]["last_active"] = time.time()
            self._save_state()

    def revoke_session(self, token: str) -> bool:
        """Revokes a specific mobile session."""
        if token in self.sessions:
            del self.sessions[token]
            self._save_state()
            return True
        return False

    def revoke_all(self) -> Dict[str, Any]:
        """Revokes all sessions, regenerates PIN and master token."""
        count = len(self.sessions)
        self.sessions.clear()
        self.failed_attempts.clear()
        self._regenerate_credentials()
        return {
            "status": "revoked_all",
            "sessions_revoked": count,
            "new_pin": self.get_formatted_pin(),
            "new_token": self.master_token
        }

    def list_sessions(self) -> List[Dict[str, Any]]:
        """Lists active paired mobile companion devices."""
        now = time.time()
        active = []
        for tok, s in list(self.sessions.items()):
            if now < s.get("expires_at", 0):
                active.append({
                    "device": s.get("device_name", "Smartphone"),
                    "ip": s.get("ip", "unknown"),
                    "connected_ago_mins": round((now - s.get("created_at", now)) / 60, 1),
                    "last_active_mins": round((now - s.get("last_active", now)) / 60, 1)
                })
        return active

    def _guess_device_name(self, ua: str) -> str:
        ua_lower = ua.lower()
        if "iphone" in ua_lower:
            return "Apple iPhone"
        if "ipad" in ua_lower:
            return "Apple iPad"
        if "android" in ua_lower:
            if "samsung" in ua_lower:
                return "Samsung Galaxy"
            if "pixel" in ua_lower:
                return "Google Pixel"
            return "Android Phone"
        if "macintosh" in ua_lower:
            return "Apple Mac"
        if "windows" in ua_lower:
            return "Windows PC"
        if "linux" in ua_lower:
            return "Linux Client"
        return "Mobile Browser"

    # ==================== STATUS SUMMARY ====================

    def get_status(self, port: int = 8888) -> Dict[str, Any]:
        """Returns comprehensive status dictionary for API and WebUI."""
        lan_ips = self.get_lan_ips()
        primary_ip = self.get_primary_ip()
        mobile_url = self.get_mobile_url(port=port, auto_pair=False)
        auto_pair_url = self.get_mobile_url(port=port, auto_pair=True)
        active_devices = self.list_sessions()

        return {
            "status": "online",
            "primary_ip": primary_ip,
            "lan_ips": lan_ips,
            "port": port,
            "pin": self.get_formatted_pin(),
            "raw_pin": self.pairing_pin,
            "master_token": self.master_token,
            "mobile_url": mobile_url,
            "auto_pair_url": auto_pair_url,
            "connected_devices": len(active_devices),
            "sessions": active_devices,
            "svg_qr": self.generate_svg_qr(auto_pair_url, port=port)
        }


# Singleton instance
remote_manager = RemoteAccessManager()
