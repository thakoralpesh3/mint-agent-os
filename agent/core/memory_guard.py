#!/usr/bin/env python3
"""
Linux Mint Memory Guard & Hardware Optimizer
Enforces strict compliance with Linux Mint system requirements (2GB - 4GB RAM),
preventing out-of-memory kernel kills, system freezes, and excessive swap thrashing.
"""

import os
import re
import gc
import subprocess
from typing import Dict, Any, Tuple


class MemoryGuard:
    """Monitors memory health and optimizes performance on 2GB-4GB RAM systems."""

    def __init__(self, high_threshold_percent: int = 85):
        self.high_threshold_percent = high_threshold_percent

    def get_memory_stats(self) -> Dict[str, Any]:
        """Reads kernel /proc/meminfo to get accurate real-time RAM metrics."""
        try:
            with open("/proc/meminfo", "r") as f:
                data = f.read()

            total_kb = int(re.search(r"MemTotal:\s+(\d+)", data).group(1))
            avail_kb = int(re.search(r"MemAvailable:\s+(\d+)", data).group(1))
            swap_total_kb = int(re.search(r"SwapTotal:\s+(\d+)", data).group(1))
            swap_free_kb = int(re.search(r"SwapFree:\s+(\d+)", data).group(1))

            used_kb = total_kb - avail_kb
            used_pct = round((used_kb / total_kb) * 100, 1)

            swap_used_kb = swap_total_kb - swap_free_kb
            swap_pct = round((swap_used_kb / swap_total_kb) * 100, 1) if swap_total_kb > 0 else 0.0

            return {
                "total_mb": total_kb // 1024,
                "available_mb": avail_kb // 1024,
                "used_mb": used_kb // 1024,
                "usage_percent": used_pct,
                "swap_total_mb": swap_total_kb // 1024,
                "swap_used_mb": swap_used_kb // 1024,
                "swap_percent": swap_pct,
                "is_low_ram_system": (total_kb // 1024) <= 4500,
                "status": "healthy" if used_pct < self.high_threshold_percent else "high_pressure"
            }
        except Exception as e:
            return {"error": str(e), "status": "unknown"}

    def check_safe_to_execute(self, required_mb: int = 250) -> Tuple[bool, str]:
        """Checks if there is enough free RAM to execute an operation safely."""
        stats = self.get_memory_stats()
        avail_mb = stats.get("available_mb", 1000)

        if avail_mb < required_mb:
            # Under severe pressure: run housekeeping
            self.clean_memory()
            stats_after = self.get_memory_stats()
            if stats_after.get("available_mb", 0) < required_mb:
                return False, f"Memory pressure too high: only {stats_after.get('available_mb')}MB available (needs {required_mb}MB)."

        return True, "Memory safe"

    def clean_memory(self) -> Dict[str, Any]:
        """Frees Python runtime garbage and syncs cached OS buffers."""
        # 1. Force Python Garbage Collection
        collected = gc.collect()

        # 2. Sync filesystems
        try:
            subprocess.run(["sync"], check=True)
        except Exception:
            pass

        # 3. If running with sudo privileges or polkit, drop kernel clean caches
        try:
            subprocess.run(["sudo", "-n", "sysctl", "-w", "vm.drop_caches=3"], capture_output=True)
        except Exception:
            pass

        stats = self.get_memory_stats()
        return {
            "status": "cleaned",
            "python_objects_freed": collected,
            "current_available_mb": stats.get("available_mb", 0),
            "usage_percent": stats.get("usage_percent", 0)
        }
