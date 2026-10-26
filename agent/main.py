#!/usr/bin/env python3
"""
MintPilot Master Agent Daemon
Runs in the background, hosts the system tray icon, listens for global hotkey triggers,
and provides a Unix domain socket server for instant CLI communication.
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

SOCKET_PATH = "/tmp/mint_agent.sock"


class AgentDaemon:
    def __init__(self):
        self.brain = AgentBrain()
        self.tray = MintTrayApplet()

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
                except Exception as e:
                    pass

        t = threading.Thread(target=listen_loop, daemon=True)
        t.start()


def main():
    daemon = AgentDaemon()
    daemon.start_socket_server()
    print("🍃 MintPilot Master Agent Daemon active on Linux Mint.")
    Gtk.main()


if __name__ == "__main__":
    main()
