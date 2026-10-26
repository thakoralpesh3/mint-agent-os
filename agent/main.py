#!/usr/bin/env python3
"""
MintPilot Master Agent Daemon
Runs in the background on Linux Mint:
- Hosts the System Tray Applet
- Launches the embedded Open WebUI on http://127.0.0.1:8888 (with OpenAI API)
- Listens on Unix domain socket for CLI commands
- Enforces hardware memory safeguards and permission modes
"""

import os
import sys
import json
import socket
import threading
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT_DIR))

import gi
gi.require_version('Gtk', '3.0')
from gi.repository import Gtk, GLib

from agent.brain.inference import AgentBrain
from agent.ui.tray_applet import MintTrayApplet
from agent.webui.server import run_webui_server

SOCKET_PATH = "/tmp/mint_agent.sock"


class AgentDaemon:
    def __init__(self):
        self.brain = AgentBrain()
        self.tray = MintTrayApplet()

    def start_webui(self):
        """Starts embedded Open WebUI server in a background thread."""
        t = threading.Thread(target=run_webui_server, daemon=True)
        t.start()

    def start_socket_server(self):
        """Starts Unix domain socket listener for instant CLI requests."""
        if os.path.exists(SOCKET_PATH):
            os.remove(SOCKET_PATH)

        server = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
        server.bind(SOCKET_PATH)
        server.listen(5)
        os.chmod(SOCKET_PATH, 0o777)

        def listen_loop():
            while True:
                try:
                    conn, _ = server.accept()
                    data = conn.recv(4096).decode('utf-8')
                    if data:
                        req = json.loads(data)
                        prompt = req.get("prompt", "")
                        res = self.brain.process_command(prompt)
                        conn.sendall(json.dumps(res).encode('utf-8'))
                    conn.close()
                except Exception:
                    pass

        t = threading.Thread(target=listen_loop, daemon=True)
        t.start()


def main():
    daemon = AgentDaemon()
    daemon.start_webui()
    daemon.start_socket_server()
    print("============================================================")
    print("🍃 MintPilot Master Agent Daemon Active on Linux Mint")
    print("WebUI:    http://127.0.0.1:8888")
    print("OpenAI:   http://127.0.0.1:8888/v1")
    print(f"Mode:     {daemon.brain.permissions.mode.upper()}")
    print("============================================================")
    Gtk.main()


if __name__ == "__main__":
    main()
