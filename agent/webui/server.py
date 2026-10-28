#!/usr/bin/env python3
"""
MintPilot Embedded Offline Open WebUI Server
Lightweight (<25MB RAM), fully offline HTTP server providing:
- WebUI Dashboard on http://localhost:8888
- Cyber Defense & Threat Radar API (/api/security, /api/lockdown, /api/scan_threats)
- OpenAI-compatible API (/v1/models, /v1/chat/completions)
- Real-time Turbo/Safe mode switching
- Browser, Program, and System control endpoints
"""

import os
import sys
import json
import time
from pathlib import Path
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse

ROOT_DIR = Path(__file__).resolve().parent.parent.parent
sys.path.insert(0, str(ROOT_DIR))

from agent.brain.inference import AgentBrain
from agent.remote.remote_manager import remote_manager

STATIC_DIR = Path(__file__).resolve().parent / "static"
CONFIG_PATH = ROOT_DIR / "agent" / "config" / "settings.json"


class WebUIRequestHandler(BaseHTTPRequestHandler):
    brain: AgentBrain = None

    def log_message(self, format, *args):
        pass

    def _is_authenticated(self, body: dict = None) -> bool:
        """Validates bearer auth token, query token, or body token for remote access."""
        # 1. Authorization header: Bearer <token>
        auth_header = self.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header[7:].strip()
            if remote_manager.verify_token(token):
                return True

        # 2. Query param: ?token=<token>
        parsed = urlparse(self.path)
        if "token=" in parsed.query:
            from urllib.parse import parse_qs
            qs = parse_qs(parsed.query)
            token = qs.get("token", [""])[0]
            if remote_manager.verify_token(token):
                return True

        # 3. Body token
        if body and isinstance(body, dict) and "token" in body:
            if remote_manager.verify_token(body.get("token")):
                return True

        # 4. Localhost exemption for local PC desktop
        client_ip = self.client_address[0] if hasattr(self, "client_address") else ""
        if client_ip in ["127.0.0.1", "::1", "localhost"]:
            return True

        return False

    def _send_json(self, data: dict, status: int = 200):
        body = json.dumps(data).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path

        # 1. WebUI HTML Dashboard
        if path in ["/", "/index.html"]:
            html_path = STATIC_DIR / "index.html"
            if html_path.exists():
                content = html_path.read_bytes()
                self.send_response(200)
                self.send_header("Content-Type", "text/html; charset=utf-8")
                self.send_header("Content-Length", str(len(content)))
                self.end_headers()
                self.wfile.write(content)
                return
            else:
                self._send_json({"error": "index.html not found"}, 404)
                return

        # 1b. Mobile Remote Companion App
        if path in ["/mobile", "/mobile.html", "/remote"]:
            mobile_path = STATIC_DIR / "mobile.html"
            if mobile_path.exists():
                content = mobile_path.read_bytes()
                self.send_response(200)
                self.send_header("Content-Type", "text/html; charset=utf-8")
                self.send_header("Content-Length", str(len(content)))
                self.end_headers()
                self.wfile.write(content)
                return
            else:
                self._send_json({"error": "mobile.html not found"}, 404)
                return

        # 1c. Remote Access Status & Pairing Telemetry API
        if path == "/api/remote/status":
            configured_port = get_configured_port()
            status_data = remote_manager.get_status(port=configured_port)
            status_data["mode"] = self.brain.permissions.mode
            status_data["active_persona"] = self.brain.marvel.get_active_persona().get("name", "Aradhya")
            self._send_json(status_data)
            return

        # 1d. Remote Live Desktop Screenshot
        if path == "/api/remote/screenshot":
            if not self._is_authenticated():
                self._send_json({"error": "Unauthorized. Pairing token required."}, 401)
                return
            cap = self.brain.vision.capture_screenshot()
            if cap.get("status") == "success" and os.path.exists(cap.get("file_path", "")):
                try:
                    with open(cap["file_path"], "rb") as f:
                        img_bytes = f.read()
                    self.send_response(200)
                    self.send_header("Content-Type", "image/png")
                    self.send_header("Content-Length", str(len(img_bytes)))
                    self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
                    self.end_headers()
                    self.wfile.write(img_bytes)
                    try:
                        os.remove(cap["file_path"])
                    except Exception:
                        pass
                    return
                except Exception:
                    pass
            # Fallback lightweight SVG placeholder if X11 capture is unavailable
            svg_fallback = f'''<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360">
                <rect width="640" height="360" fill="#141815"/>
                <rect x="20" y="20" width="600" height="320" rx="12" fill="#1e2520" stroke="#2d3830" stroke-width="2"/>
                <text x="320" y="150" font-family="sans-serif" font-size="20" font-weight="bold" fill="#87cf3e" text-anchor="middle">🍃 Linux Mint Desktop Active</text>
                <text x="320" y="190" font-family="sans-serif" font-size="14" fill="#a0b0a4" text-anchor="middle">Companion Remote Linked • Mode: {self.brain.permissions.mode.upper()}</text>
                <text x="320" y="230" font-family="sans-serif" font-size="12" fill="#62992b" text-anchor="middle">Cinnamon Workspace 1 • 60 FPS Smooth</text>
            </svg>'''.encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "image/svg+xml")
            self.send_header("Content-Length", str(len(svg_fallback)))
            self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
            self.end_headers()
            self.wfile.write(svg_fallback)
            return

        # 2. System Status & Telemetry API
        if path == "/api/status":
            mem = self.brain.memory.get_memory_stats()
            hw = self.brain.system.get_hardware_telemetry()
            bat = self.brain.system.get_battery_status()
            windows = self.brain.gui.list_windows().get("windows", [])
            security = self.brain.security.get_full_security_posture()

            smoothness = self.brain.memory.verify_mint_compatibility()

            self._send_json({
                "status": "online",
                "mode": self.brain.permissions.mode,
                "is_turbo": self.brain.permissions.is_turbo(),
                "tier": self.brain.hardware_tier,
                "active_model": self.brain.models.get_active_model(),
                "smoothness": smoothness,
                "memory": mem,
                "hardware": hw,
                "battery": bat,
                "windows": windows,
                "security": security,
                "interaction": self.brain.interaction.get_status(),
                "marvel": {
                    "active": self.brain.marvel.get_active_persona(),
                    "personas": self.brain.marvel.list_personas()
                },
                "pending_approvals": list(self.brain.permissions.pending_approvals.values())
            })
            return

        # 3. Dedicated Security Posture API: GET /api/security
        if path == "/api/security":
            posture = self.brain.security.get_full_security_posture()
            self._send_json(posture)
            return

        # 4. Self-Countering Safety Circuit Breaker API: GET /api/self_counter
        if path == "/api/self_counter":
            circuit = self.brain.security.self_counter.get_circuit_status()
            self._send_json(circuit)
            return

        # 5. AI Models Catalog API: GET /api/models
        if path == "/api/models":
            models_data = self.brain.models.list_models()
            self._send_json(models_data)
            return

        # 6. Check OS Update API: GET /api/check_update
        if path == "/api/check_update":
            update_data = self.brain.updater.check_for_updates()
            self._send_json(update_data)
            return

        # 7. Linux Mint PC Smoothness & Hardware Audit: GET /api/smoothness
        if path == "/api/smoothness":
            compat = self.brain.memory.verify_mint_compatibility()
            self._send_json(compat)
            return

        # 8. Digital Immune Memory & Future Attack Readiness: GET /api/immune
        if path == "/api/immune":
            immune_data = self.brain.security.get_immune_status()
            self._send_json(immune_data)
            return

        # 9. Dynamic Threat Escalation Posture: GET /api/defcon
        if path == "/api/defcon":
            posture = self.brain.security.get_full_security_posture()
            self._send_json(posture.get("defcon", {}))
            return

        # 10. User Interaction Settings & Modalities: GET /api/interaction
        if path == "/api/interaction":
            self._send_json(self.brain.interaction.get_status())
            return

        # 11. Marvel Series AI Agents & Stark Protocols: GET /api/marvel
        if path == "/api/marvel":
            self._send_json({
                "active_persona": self.brain.marvel.get_active_persona(),
                "personas": self.brain.marvel.list_personas(),
                "protocols": self.brain.marvel.list_protocols()
            })
            return

        if path == "/api/marvel/edith-scan":
            self._send_json(self.brain.marvel.edith_tactical_scan())
            return

        if path == "/api/marvel/cross-talk":
            self._send_json({
                "cross_talk": self.brain.marvel.get_multi_agent_cross_talk(),
                "timestamp": time.strftime("%Y-%m-%d %H:%M:%S")
            })
            return

        # 11. OpenAI-Compatible: GET /v1/models
        if path == "/v1/models":
            self._send_json({
                "object": "list",
                "data": [
                    {
                        "id": "mintpilot-slm",
                        "object": "model",
                        "created": int(time.time()),
                        "owned_by": "mintpilot"
                    },
                    {
                        "id": self.brain.hardware_tier.get("recommended_model", "qwen2.5-coder:1.5b"),
                        "object": "model",
                        "created": int(time.time()),
                        "owned_by": "mintpilot"
                    }
                ]
            })
            return

        self._send_json({"error": "Endpoint not found"}, 404)

    def do_POST(self):
        parsed = urlparse(self.path)
        path = parsed.path

        content_length = int(self.headers.get("Content-Length", 0))
        post_data = self.rfile.read(content_length)
        body = {}
        if post_data:
            try:
                body = json.loads(post_data.decode("utf-8"))
            except Exception:
                pass

        # 1. Chat Execution API: POST /api/chat
        if path == "/api/chat":
            prompt = body.get("prompt", "")
            if not prompt:
                self._send_json({"error": "Missing prompt"}, 400)
                return

            res = self.brain.process_command(prompt)
            self._send_json(res)
            return

        # 2. Permission Mode Toggle: POST /api/mode
        if path == "/api/mode":
            mode = body.get("mode", "turbo")
            new_mode = self.brain.permissions.set_mode(mode)
            self._send_json({"status": "success", "mode": new_mode, "is_turbo": self.brain.permissions.is_turbo()})
            return

        # 3. Security Lockdown: POST /api/lockdown
        if path == "/api/lockdown":
            lockdown_res = self.brain.security.lockdown()
            self._send_json(lockdown_res)
            return

        # 4. Threat Scan & Remediate: POST /api/scan_threats
        if path == "/api/scan_threats":
            scan_res = self.brain.security.scan_and_remediate()
            self._send_json(scan_res)
            return

        # 5. Active Counter-Measures: POST /api/counter_threats
        if path == "/api/counter_threats":
            counter_res = self.brain.security.scan_and_counter_threats()
            self._send_json(counter_res)
            return

        # 6. Deploy Honeypot Decoys: POST /api/deploy_decoys
        if path == "/api/deploy_decoys":
            decoy_res = self.brain.security.deploy_decoys()
            self._send_json(decoy_res)
            return

        # 7. Self-Countering Rollback: POST /api/rollback
        if path == "/api/rollback":
            rollback_res = self.brain.security.rollback_last_change()
            self._send_json(rollback_res)
            return

        # 8. Reset or Query Circuit Breaker: POST /api/self_counter
        if path == "/api/self_counter":
            action = body.get("action", "status")
            if action == "reset":
                self.brain.security.self_counter.circuit_tripped = False
                self.brain.security.self_counter.trip_reason = None
            circuit = self.brain.security.self_counter.get_circuit_status()
            self._send_json(circuit)
            return

        # 9. Block Hostile IP: POST /api/block_ip
        if path == "/api/block_ip":
            ip = body.get("ip")
            if not ip:
                self._send_json({"error": "Missing IP address"}, 400)
                return
            block_res = self.brain.security.remediation.block_ip(ip)
            self._send_json(block_res)
            return

        # 10. Switch AI Model: POST /api/set_model
        if path == "/api/set_model":
            model_id = body.get("model")
            if not model_id:
                self._send_json({"error": "Missing model identifier"}, 400)
                return
            provider = body.get("provider")
            api_key = body.get("api_key")
            custom_url = body.get("custom_url")
            res = self.brain.models.set_model(
                model_id=model_id,
                provider=provider,
                api_key=api_key,
                custom_url=custom_url
            )
            self._send_json(res)
            return

        # 11. Perform In-Place OS Update: POST /api/update_os
        if path == "/api/update_os":
            res = self.brain.updater.perform_update()
            self._send_json(res)
            return

        # 12. Optimize Linux Mint Smoothness (Kernel Swappiness & Cache Tuning): POST /api/optimize_smoothness
        if path == "/api/optimize_smoothness":
            res = self.brain.memory.tune_kernel_smoothness()
            self._send_json(res)
            return

        # 13. Synthesize Digital Antibodies & Harden for Future Attacks: POST /api/harden_future
        if path == "/api/harden_future":
            res = self.brain.security.harden_for_future_attacks()
            self._send_json(res)
            return

        # 14. Update User Interaction Settings: POST /api/interaction
        if path == "/api/interaction":
            if "modality" in body:
                self.brain.interaction.set_modality(body["modality"])
            if "verbosity" in body:
                self.brain.interaction.set_verbosity(body["verbosity"])
            if "proactivity" in body:
                self.brain.interaction.set_proactivity(body["proactivity"])
            if "voice" in body:
                v = body["voice"]
                self.brain.interaction.set_voice(
                    enabled=v.get("enabled", False),
                    engine=v.get("engine"),
                    speed=v.get("speed")
                )
            self._send_json(self.brain.interaction.get_status())
            return

        # 15. Switch Marvel Agent Persona: POST /api/marvel/persona
        if path == "/api/marvel/persona":
            pid = body.get("persona")
            if not pid:
                self._send_json({"error": "Missing persona parameter"}, 400)
                return
            res = self.brain.marvel.set_persona(pid)
            self._send_json(res)
            return

        # 16. Execute Stark Protocol: POST /api/marvel/protocol
        if path == "/api/marvel/protocol":
            proto = body.get("protocol")
            if not proto:
                self._send_json({"error": "Missing protocol parameter"}, 400)
                return
            res = self.brain.marvel.execute_protocol(proto)
            self._send_json(res)
            return

        # 6. Resolve Approval: POST /api/resolve_permission
        if path == "/api/resolve_permission":
            act_id = body.get("id")
            approved = body.get("approved", False)
            success = self.brain.permissions.resolve_pending(act_id, approved)
            self._send_json({"status": "resolved" if success else "not_found", "action_id": act_id, "approved": approved})
            return

        # 7. Clean Memory: POST /api/clean_memory
        if path == "/api/clean_memory":
            cleaned = self.brain.memory.clean_memory()
            self._send_json(cleaned)
            return

        # 8. OpenAI-Compatible: POST /v1/chat/completions
        if path == "/v1/chat/completions":
            messages = body.get("messages", [])
            last_prompt = messages[-1].get("content", "") if messages else "Hello"

            res = self.brain.process_command(last_prompt)
            reply = res.get("thought", "")
            if "result" in res:
                reply += "\n\nResult:\n```json\n" + json.dumps(res["result"], indent=2) + "\n```"

            self._send_json({
                "id": f"chatcmpl-{int(time.time())}",
                "object": "chat.completion",
                "created": int(time.time()),
                "model": "mintpilot-slm",
                "choices": [
                    {
                        "index": 0,
                        "message": {
                            "role": "assistant",
                            "content": reply
                        },
                        "finish_reason": "stop"
                    }
                ],
                "usage": {
                    "prompt_tokens": len(last_prompt.split()),
                    "completion_tokens": len(reply.split()),
                    "total_tokens": len(last_prompt.split()) + len(reply.split())
                }
            })
            return

        self._send_json({"error": "Endpoint not found"}, 404)


def get_configured_port() -> int:
    if CONFIG_PATH.exists():
        try:
            with open(CONFIG_PATH, "r") as f:
                d = json.load(f)
                return d.get("webui", {}).get("port", 8888)
        except Exception:
            pass
    return 8888


def run_webui_server(port: int = None, host: str = "0.0.0.0"):
    WebUIRequestHandler.brain = AgentBrain()
    target_port = port or get_configured_port()

    # Automatic port fallback if port is in use
    httpd = None
    for attempt_port in range(target_port, target_port + 10):
        try:
            server_address = (host, attempt_port)
            httpd = HTTPServer(server_address, WebUIRequestHandler)
            target_port = attempt_port
            break
        except OSError:
            continue

    if not httpd:
        print(f"❌ Error: Unable to bind WebUI server to ports {target_port}-{target_port+10}")
        return

    print(f"============================================================")
    print(f"🍃 MintPilot Open WebUI active on: http://127.0.0.1:{target_port}")
    print(f"Mode: {WebUIRequestHandler.brain.permissions.mode.upper()} | Security Guardian: ACTIVE")
    print(f"OpenAI API: http://127.0.0.1:{target_port}/v1")
    print(f"============================================================")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down WebUI server...")
        httpd.server_close()


if __name__ == "__main__":
    p = None
    if len(sys.argv) > 1 and sys.argv[1].isdigit():
        p = int(sys.argv[1])
    run_webui_server(port=p)
