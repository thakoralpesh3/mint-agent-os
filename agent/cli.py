#!/usr/bin/env python3
"""
MintPilot CLI - Direct Command-Line Interface for Laptop Control
Usage:
  mint-agent "set volume to 50%"
  mint-agent "battery"
  mint-agent --interactive
"""

import sys
import json
import argparse
from pathlib import Path

# Ensure agent package is in path
ROOT_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT_DIR))

from agent.brain.inference import AgentBrain


def print_banner():
    print("""
\033[1;32m╔═══════════════════════════════════════════════════════════════╗
║                   🍃 MINTPILOT AI AGENT                       ║
║       Autonomous Offline Laptop Controller for Linux Mint     ║
╚═══════════════════════════════════════════════════════════════╝\033[0m
""")


def run_single(brain: AgentBrain, prompt: str, voice: bool = False):
    res = brain.process_command(prompt)
    mode = res.get("execution_mode", "standard")
    latency = res.get("latency_ms", 0)

    print(f"\033[1;34m[Thought]\033[0m {res.get('thought', 'Executed')}")
    print(f"\033[1;32m[Result]\033[0m {json.dumps(res.get('result', res), indent=2)}")
    print(f"\033[1;30m(Mode: {mode} | Latency: {latency}ms)\033[0m")

    if voice:
        brain.voice.speak(res.get("thought", "Command completed"))


def main():
    parser = argparse.ArgumentParser(description="MintPilot Offline Laptop Controller")
    parser.add_argument("prompt", nargs="*", help="Natural language command (e.g. 'set volume to 60')")
    parser.add_argument("-i", "--interactive", action="store_true", help="Launch interactive REPL session")
    parser.add_argument("-v", "--voice", action="store_true", help="Enable spoken voice reply")
    parser.add_argument("--tier", action="store_true", help="Display detected hardware tier and recommendations")
    args = parser.parse_args()

    brain = AgentBrain()

    if args.tier:
        print_banner()
        tier_info = brain.hardware_tier
        print(f"RAM Detected: {tier_info['ram_total_mb']} MB")
        print(f"Hardware Tier: \033[1;36m{tier_info['tier_name']}\033[0m")
        print(f"Recommended Model: \033[1;33m{tier_info['recommended_model']}\033[0m")
        return

    if args.prompt:
        full_prompt = " ".join(args.prompt)
        run_single(brain, full_prompt, voice=args.voice)
        return

    # Interactive Mode
    print_banner()
    print(f"\033[1;30mHardware Tier: {brain.hardware_tier['tier_name']}\033[0m")
    print("Type your instruction (e.g., 'volume 50%', 'battery', 'show windows') or 'exit':\n")

    while True:
        try:
            user_input = input("\033[1;32mmint-agent > \033[0m").strip()
            if not user_input:
                continue
            if user_input.lower() in ["exit", "quit", "q"]:
                print("Goodbye!")
                break
            run_single(brain, user_input, voice=args.voice)
            print("")
        except (KeyboardInterrupt, EOFError):
            print("\nExiting...")
            break


if __name__ == "__main__":
    main()
