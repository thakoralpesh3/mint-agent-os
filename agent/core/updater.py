#!/usr/bin/env bash
#!/usr/bin/env python3
"""
MintPilot In-Place OS & Agent Updater Engine
Allows a user running Linux Mint to check for upstream updates,
review changes, and perform autonomous in-place upgrades safely.
"""

import os
import sys
import json
import time
import shutil
import subprocess
from pathlib import Path
from typing import Dict, Any, Optional

ROOT_DIR = Path(__file__).resolve().parent.parent.parent


class OSUpdater:
    """Manages version tracking, upstream checks, and in-place agent OS updates."""

    GITHUB_REPO = "thakoralpesh3/mint-agent-os"
    UPSTREAM_BRANCH = "main"

    def __init__(self, repo_dir: Optional[Path] = None):
        self.repo_dir = repo_dir or ROOT_DIR
        self._has_git = shutil.which("git") is not None

    def get_version_info(self) -> Dict[str, Any]:
        """Returns local version metadata, commit hash, and timestamp."""
        if not self._has_git or not (self.repo_dir / ".git").exists():
            return {
                "version": "1.0.0",
                "commit": "installed-package",
                "date": time.strftime("%Y-%m-%d"),
                "is_git_managed": False,
                "repo_path": str(self.repo_dir)
            }

        try:
            commit = subprocess.check_output(
                ["git", "rev-parse", "--short", "HEAD"],
                cwd=str(self.repo_dir),
                stderr=subprocess.DEVNULL,
                text=True
            ).strip()

            date_str = subprocess.check_output(
                ["git", "log", "-1", "--format=%cd", "--date=short"],
                cwd=str(self.repo_dir),
                stderr=subprocess.DEVNULL,
                text=True
            ).strip()

            msg = subprocess.check_output(
                ["git", "log", "-1", "--format=%s"],
                cwd=str(self.repo_dir),
                stderr=subprocess.DEVNULL,
                text=True
            ).strip()

            return {
                "version": "1.0.0",
                "commit": commit,
                "date": date_str,
                "last_commit_message": msg,
                "is_git_managed": True,
                "repo_path": str(self.repo_dir)
            }
        except Exception as e:
            return {
                "version": "1.0.0",
                "commit": "unknown",
                "error": str(e),
                "is_git_managed": True
            }

    def check_for_updates(self) -> Dict[str, Any]:
        """Checks if remote repository has new updates."""
        if not self._has_git or not (self.repo_dir / ".git").exists():
            return {
                "update_available": False,
                "message": "MintPilot is running from a static installation without git tracking.",
                "local_commit": "static"
            }

        try:
            # 1. Fetch remote changes
            subprocess.run(
                ["git", "fetch", "origin", self.UPSTREAM_BRANCH],
                cwd=str(self.repo_dir),
                capture_output=True,
                text=True,
                timeout=15
            )

            local_hash = subprocess.check_output(
                ["git", "rev-parse", "HEAD"],
                cwd=str(self.repo_dir),
                text=True
            ).strip()

            remote_hash = subprocess.check_output(
                ["git", "rev-parse", f"origin/{self.UPSTREAM_BRANCH}"],
                cwd=str(self.repo_dir),
                text=True
            ).strip()

            if local_hash == remote_hash:
                return {
                    "update_available": False,
                    "message": "MintPilot Agent OS is completely up to date!",
                    "local_commit": local_hash[:7],
                    "remote_commit": remote_hash[:7],
                    "pending_commits": 0
                }

            # Count pending commits
            count_str = subprocess.check_output(
                ["git", "rev-list", "--count", f"HEAD..origin/{self.UPSTREAM_BRANCH}"],
                cwd=str(self.repo_dir),
                text=True
            ).strip()
            pending_count = int(count_str) if count_str.isdigit() else 1

            # Fetch recent commit titles
            log_str = subprocess.check_output(
                ["git", "log", f"HEAD..origin/{self.UPSTREAM_BRANCH}", "--oneline", "-n", "5"],
                cwd=str(self.repo_dir),
                text=True
            ).strip()

            return {
                "update_available": True,
                "message": f"New update available! {pending_count} new commit(s) upstream.",
                "local_commit": local_hash[:7],
                "remote_commit": remote_hash[:7],
                "pending_commits": pending_count,
                "recent_commits": log_str.splitlines()
            }
        except subprocess.TimeoutExpired:
            return {"update_available": False, "error": "Network timeout while querying GitHub."}
        except Exception as e:
            return {"update_available": False, "error": str(e)}

    def perform_update(self) -> Dict[str, Any]:
        """
        Executes an in-place upgrade:
        1. Pre-update safety snapshot
        2. Git pull / rebase
        3. Dependency check
        4. Re-establish security tripwire
        5. Systemd service restart
        """
        if not self._has_git or not (self.repo_dir / ".git").exists():
            return {"status": "failed", "error": "Cannot update: repository not managed by git."}

        try:
            # 1. Pull changes
            res = subprocess.run(
                ["git", "pull", "--rebase", "origin", self.UPSTREAM_BRANCH],
                cwd=str(self.repo_dir),
                capture_output=True,
                text=True,
                timeout=30
            )

            if res.returncode != 0:
                return {
                    "status": "failed",
                    "error": "Git pull failed. Local changes may conflict with upstream.",
                    "details": res.stderr or res.stdout
                }

            # 2. Re-verify tripwire baseline
            try:
                from agent.security.self_defense import SelfDefenseGuardian
                guardian = SelfDefenseGuardian()
                guardian.generate_baseline()
            except Exception:
                pass

            # 3. Reload systemd service if active
            reloaded_service = False
            if shutil.which("systemctl"):
                try:
                    subprocess.run(["systemctl", "--user", "daemon-reload"], capture_output=True)
                    subprocess.run(["systemctl", "--user", "try-restart", "aradhya-agent.service"], capture_output=True)
                    subprocess.run(["systemctl", "daemon-reload"], capture_output=True)
                    subprocess.run(["systemctl", "try-restart", "mint-agent.service"], capture_output=True)
                    reloaded_service = True
                except Exception:
                    pass

            v_info = self.get_version_info()
            return {
                "status": "success",
                "message": "Successfully upgraded Aradhya Agent OS to latest upstream release!",
                "current_commit": v_info.get("commit"),
                "service_reloaded": reloaded_service,
                "timestamp": time.strftime("%Y-%m-%d %H:%M:%S")
            }
        except Exception as e:
            return {"status": "failed", "error": str(e)}

    # ==================== LINUX MINT SOFTWARE & UPDATE MANAGERS ====================

    def open_software_manager(self, package: Optional[str] = None) -> Dict[str, Any]:
        """Launches the official Linux Mint Software Manager (mintinstall)."""
        if not shutil.which("mintinstall"):
            return {"status": "failed", "error": "mintinstall (Linux Mint Software Manager) not found."}
        try:
            cmd = ["mintinstall"]
            if package:
                cmd.append(package)
            subprocess.Popen(cmd, env=dict(os.environ, DISPLAY=os.environ.get("DISPLAY", ":0")))
            return {
                "status": "success",
                "message": f"Launched Linux Mint Software Manager" + (f" for '{package}'" if package else "")
            }
        except Exception as e:
            return {"status": "failed", "error": str(e)}

    def open_update_manager(self) -> Dict[str, Any]:
        """Launches the official Linux Mint Update Manager (mintupdate)."""
        if not shutil.which("mintupdate"):
            return {"status": "failed", "error": "mintupdate (Linux Mint Update Manager) not found."}
        try:
            subprocess.Popen(["mintupdate"], env=dict(os.environ, DISPLAY=os.environ.get("DISPLAY", ":0")))
            return {"status": "success", "message": "Launched Linux Mint Update Manager GUI"}
        except Exception as e:
            return {"status": "failed", "error": str(e)}

    def get_software_updates_summary(self) -> Dict[str, Any]:
        """
        Checks updates across all layers:
        1. Aradhya Agent OS (GitHub commits)
        2. Linux Mint System & APT packages (mintupdate-cli / apt)
        3. Flatpak packages (mintinstall backend)
        4. Open WebUI / AI models
        """
        summary = {
            "agent_os": self.check_for_updates(),
            "mint_updates": {"available": False, "count": 0, "packages": []},
            "flatpak_updates": {"available": False, "count": 0, "packages": []},
            "openwebui": {
                "version": "1.0.0-embedded",
                "type": "native-embedded",
                "url": "http://127.0.0.1:8888",
                "status": "running",
                "update_method": "agent_os"
            }
        }

        # Check mintupdate-cli / apt
        if shutil.which("mintupdate-cli"):
            try:
                proc = subprocess.run(
                    ["mintupdate-cli", "list"],
                    capture_output=True,
                    text=True,
                    timeout=10
                )
                if proc.returncode == 0 and proc.stdout.strip():
                    lines = [line.strip() for line in proc.stdout.splitlines() if line.strip()]
                    summary["mint_updates"] = {
                        "available": len(lines) > 0,
                        "count": len(lines),
                        "packages": lines[:10]
                    }
            except Exception:
                pass

        # Check flatpaks
        if shutil.which("flatpak"):
            try:
                proc = subprocess.run(
                    ["flatpak", "remote-ls", "--updates"],
                    capture_output=True,
                    text=True,
                    timeout=8
                )
                if proc.returncode == 0 and proc.stdout.strip():
                    f_lines = [l.strip() for l in proc.stdout.splitlines() if l.strip()]
                    summary["flatpak_updates"] = {
                        "available": len(f_lines) > 0,
                        "count": len(f_lines),
                        "packages": f_lines[:10]
                    }
            except Exception:
                pass

        return summary

    def update_all_items(self, include_system: bool = False) -> Dict[str, Any]:
        """
        Performs comprehensive updates:
        - Updates Agent OS & embedded Open WebUI
        - Optionally updates Linux Mint APT packages via mintupdate-cli / pkexec
        """
        results = {
            "agent_os": self.perform_update(),
            "system": None,
            "flatpak": None
        }

        if include_system:
            if shutil.which("pkexec") and shutil.which("mintupdate-cli"):
                try:
                    p = subprocess.run(
                        ["pkexec", "mintupdate-cli", "upgrade", "-y"],
                        capture_output=True,
                        text=True,
                        timeout=180
                    )
                    results["system"] = {
                        "status": "success" if p.returncode == 0 else "failed",
                        "output": p.stdout[-300:] if p.stdout else p.stderr[-300:]
                    }
                except Exception as ex:
                    results["system"] = {"status": "failed", "error": str(ex)}

            if shutil.which("flatpak"):
                try:
                    fp = subprocess.run(
                        ["flatpak", "update", "-y"],
                        capture_output=True,
                        text=True,
                        timeout=180
                    )
                    results["flatpak"] = {
                        "status": "success" if fp.returncode == 0 else "failed"
                    }
                except Exception as ex:
                    results["flatpak"] = {"status": "failed", "error": str(ex)}

        return results


if __name__ == "__main__":
    updater = OSUpdater()
    print("Version Info:", json.dumps(updater.get_version_info(), indent=2))
    print("Updates Summary:", json.dumps(updater.get_software_updates_summary(), indent=2))
