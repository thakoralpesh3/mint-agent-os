#!/usr/bin/env python3
"""
Terminal & Shell Controller for MintPilot on Linux Mint
Enables autonomous command-line execution with safety guardrails,
timeout control, and output reflection.
"""

import os
import shlex
import subprocess
import time
from typing import Dict, Any, List


class TerminalController:
    """Executes system shell commands safely on Linux Mint."""

    # Catastrophic command patterns to block
    FORBIDDEN_PATTERNS = [
        "rm -rf /",
        "rm -rf /*",
        "mkfs",
        "dd if=/dev/zero",
        "dd if=/dev/urandom",
        ":(){ :|:& };:",  # fork bomb
        "> /dev/sda",
        "> /dev/nvme",
        "chmod -R 777 /"
    ]

    def __init__(self, default_timeout: int = 45):
        self.default_timeout = default_timeout

    def execute(self, command: str, timeout: int = None, cwd: str = None) -> Dict[str, Any]:
        """
        Executes a bash command and returns structured results.
        """
        command_clean = command.strip()
        timeout = timeout or self.default_timeout

        # Safety Check
        for forbidden in self.FORBIDDEN_PATTERNS:
            if forbidden in command_clean:
                return {
                    "status": "blocked",
                    "error": f"Security policy blocked dangerous command pattern: '{forbidden}'",
                    "command": command_clean
                }

        start_time = time.time()
        try:
            res = subprocess.run(
                ["bash", "-c", command_clean],
                capture_output=True,
                text=True,
                timeout=timeout,
                cwd=cwd or os.path.expanduser("~")
            )
            elapsed = round(time.time() - start_time, 2)

            return {
                "status": "success" if res.returncode == 0 else "error",
                "exit_code": res.returncode,
                "stdout": res.stdout,
                "stderr": res.stderr,
                "elapsed_seconds": elapsed,
                "command": command_clean
            }
        except subprocess.TimeoutExpired:
            return {
                "status": "timeout",
                "error": f"Command timed out after {timeout} seconds",
                "command": command_clean
            }
        except Exception as e:
            return {
                "status": "failed",
                "error": str(e),
                "command": command_clean
            }

    def install_packages(self, packages: List[str]) -> Dict[str, Any]:
        """Installs software packages via apt."""
        pkg_str = " ".join(shlex.quote(p) for p in packages)
        cmd = f"sudo DEBIAN_FRONTEND=noninteractive apt-get update && sudo apt-get install -y {pkg_str}"
        return self.execute(cmd, timeout=300)
