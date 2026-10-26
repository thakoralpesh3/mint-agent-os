#!/usr/bin/env python3
"""
MintPilot CLI - Direct Command-Line Interface for Laptop Control
Usage:
  mint-agent "set volume to 50%"
  mint-agent "search web for Linux Mint"
  mint-agent "write document in libreoffice saying Hello World"
  mint-agent --turbo "open nemo"
  mint-agent --safe "$ rm test.txt"
  mint-agent -i
"""

import sys
import json
import argparse
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT_DIR))

from agent.brain.inference import AgentBrain


def print_banner(brain: AgentBrain):
    mode_color = "\033[1;31m[TURBO]\033[0m" if brain.permissions.is_turbo() else "\033[1;33m[SAFE]\033[0m"
    print(f"""
\033[1;32m╔═══════════════════════════════════════════════════════════════╗
║                   🍃 MINTPILOT AI AGENT                       ║
║       Autonomous Offline Laptop Controller for Linux Mint     ║
╚═══════════════════════════════════════════════════════════════╝\033[0m
  Mode: {mode_color} | Hardware Tier: \033[1;36m{brain.hardware_tier['tier_name']}\033[0m
""")


def run_single(brain: AgentBrain, prompt: str, voice: bool = False, prompt_cli: bool = False):
    res = brain.process_command(prompt, prompt_cli=prompt_cli)
    mode = res.get("execution_mode", "standard")
    latency = res.get("latency_ms", 0)

    print(f"\033[1;34m[Thought]\033[0m {res.get('thought', 'Executed')}")
    if "result" in res:
        print(f"\033[1;32m[Result]\033[0m {json.dumps(res['result'], indent=2)}")
    elif "permission" in res:
        print(f"\033[1;33m[Permission]\033[0m {json.dumps(res['permission'], indent=2)}")
    else:
        print(f"\033[1;32m[Result]\033[0m {json.dumps(res, indent=2)}")

    print(f"\033[1;30m(Mode: {res.get('permission_mode', brain.permissions.mode).upper()} | Latency: {latency}ms)\033[0m")

    if voice:
        brain.voice.speak(res.get("thought", "Command completed"))


def main():
    parser = argparse.ArgumentParser(description="MintPilot Offline Laptop Controller")
    parser.add_argument("prompt", nargs="*", help="Natural language command")
    parser.add_argument("-i", "--interactive", action="store_true", help="Launch interactive REPL session")
    parser.add_argument("-v", "--voice", action="store_true", help="Enable spoken voice reply")
    parser.add_argument("--turbo", action="store_true", help="Execute in unrestricted Antigravity Turbo Mode (no permission prompts)")
    parser.add_argument("--safe", action="store_true", help="Execute in Safe Mode (requires confirmation for sensitive actions)")
    parser.add_argument("--tier", action="store_true", help="Display detected hardware tier and recommendations")
    parser.add_argument("--clean-ram", action="store_true", help="Clean cache and free RAM")
    args = parser.parse_args()

    mode_override = "turbo" if args.turbo else ("safe" if args.safe else None)
    brain = AgentBrain(mode=mode_override)

    if args.clean_ram:
        res = brain.memory.clean_memory()
        print(f"✓ Memory cleaned: {json.dumps(res, indent=2)}")
        return

    if args.tier:
        print_banner(brain)
        tier_info = brain.hardware_tier
        mem_stats = brain.memory.get_memory_stats()
        print(f"RAM Total: {mem_stats.get('total_mb')} MB | Available: {mem_stats.get('available_mb')} MB ({mem_stats.get('usage_percent')}% used)")
        print(f"Hardware Tier: \033[1;36m{tier_info['tier_name']}\033[0m")
        print(f"Recommended Model: \033[1;33m{tier_info['recommended_model']}\033[0m")
        return

    if args.prompt:
        full_prompt = " ".join(args.prompt)
        run_single(brain, full_prompt, voice=args.voice, prompt_cli=True)
        return

    # Interactive Mode
    print_banner(brain)
    print("Commands: 'turbo mode', 'safe mode', 'clean ram', 'exit'\n")

    while True:
        try:
            mode_tag = "\033[1;31m[turbo]\033[0m" if brain.permissions.is_turbo() else "\033[1;33m[safe]\033[0m"
            user_input = input(f"mint-agent {mode_tag} > ").strip()
            if not user_input:
                continue
            if user_input.lower() in ["exit", "quit", "q"]:
                print("Goodbye!")
                break
            run_single(brain, user_input, voice=args.voice, prompt_cli=True)
            print("")
        except (KeyboardInterrupt, EOFError):
            print("\nExiting...")
            break


if __name__ == "__main__":
    main()
