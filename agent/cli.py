#!/usr/bin/env python3
"""
MintPilot CLI - Direct Command-Line Interface for Laptop Control & Cyber Defense
Usage:
  mint-agent "set volume to 50%"
  mint-agent --security
  mint-agent --scan-threats
  mint-agent --lockdown
  mint-agent --turbo "open nemo"
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
║          🍃 MINTPILOT CYBER DEFENSE & AI CONTROLLER           ║
║       Autonomous Offline Security Guardian for Linux Mint     ║
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
    parser = argparse.ArgumentParser(description="MintPilot Offline Laptop Controller & Security Guardian")
    parser.add_argument("prompt", nargs="*", help="Natural language command")
    parser.add_argument("-i", "--interactive", action="store_true", help="Launch interactive REPL session")
    parser.add_argument("-v", "--voice", action="store_true", help="Enable spoken voice reply")
    parser.add_argument("--turbo", action="store_true", help="Execute in unrestricted Antigravity Turbo Mode (no permission prompts)")
    parser.add_argument("--safe", action="store_true", help="Execute in Safe Mode (requires confirmation for sensitive actions)")
    parser.add_argument("--security", action="store_true", help="Display full cybersecurity posture score and threat audit")
    parser.add_argument("--scan-threats", action="store_true", help="Scan for network exposures, rogue processes, and persistence")
    parser.add_argument("--lockdown", action="store_true", help="Enforce strict autonomous emergency firewall lockdown")
    parser.add_argument("--tier", action="store_true", help="Display detected hardware tier and recommendations")
    parser.add_argument("--clean-ram", action="store_true", help="Clean cache and free RAM")
    parser.add_argument("--counter-threats", action="store_true", help="Execute active defensive countermeasures (sever sockets, disrupt threats)")
    parser.add_argument("--deploy-decoys", action="store_true", help="Deploy honeypot canary decoy credentials and files")
    parser.add_argument("--self-check", action="store_true", help="Check agent self-countering circuit breaker and dead-man switch status")
    parser.add_argument("--rollback", action="store_true", help="Roll back the agent's last changes to previous snapshot")
    parser.add_argument("--list-models", action="store_true", help="List all available offline SLMs and online Cloud LLMs")
    parser.add_argument("--set-model", type=str, help="Switch active AI model (e.g. 'qwen2.5-1.5b', 'gemini-2.5-flash', 'gpt-4o')")
    parser.add_argument("--set-key", nargs=2, metavar=("PROVIDER", "KEY"), help="Store API key for online provider (e.g. gemini, openai, claude)")
    parser.add_argument("--check-update", action="store_true", help="Check upstream GitHub repository for MintPilot Agent OS updates")
    parser.add_argument("--update-os", action="store_true", help="Perform in-place upgrade of MintPilot Agent OS from GitHub")
    parser.add_argument("--smooth", action="store_true", help="Apply Linux Mint kernel swappiness and cache tuning for 60fps butter-smooth performance")
    parser.add_argument("--benchmark-smoothness", action="store_true", help="Audit PC hardware against Linux Mint official standards and check agent footprint")
    parser.add_argument("--immune-status", action="store_true", help="Display Digital Immune Memory, attack fingerprints, active antibodies, and resilience score")
    parser.add_argument("--harden-future", action="store_true", help="Synthesize antibodies and enforce kernel network defenses against future attacks")
    parser.add_argument("--defcon", action="store_true", help="Display active dynamic DEFCON threat escalation posture")
    args = parser.parse_args()

    mode_override = "turbo" if args.turbo else ("safe" if args.safe else None)
    brain = AgentBrain(mode=mode_override)

    if args.smooth:
        print_banner(brain)
        print("🍃 Optimizing Linux Mint Kernel for Butter-Smooth Performance (vm.swappiness=10)...")
        res = brain.memory.tune_kernel_smoothness()
        print(f"✓ {res['message']}")
        settings = res['current_settings']
        print(f"  • vm.swappiness: {settings['swappiness']} (Ideal: {settings['swappiness_ideal']})")
        print(f"  • vm.vfs_cache_pressure: {settings['vfs_cache_pressure']} (Ideal: {settings['vfs_cache_pressure_ideal']})")
        print(f"  • Status: \033[1;32m{settings['status'].upper()}\033[0m")
        return

    if args.benchmark_smoothness:
        print_banner(brain)
        print("🔍 Auditing System against Official Linux Mint PC Requirements (2GB - 4GB RAM)...")
        compat = brain.memory.verify_mint_compatibility()
        print(f"Smoothness Grade: \033[1;32m{compat['score']}/100 ({compat['grade']})\033[0m")
        print("\nCompliance & Fluidity Checklist:")
        for c in compat["checks"]:
            color = "\033[1;32m" if c["status"] in ["OPTIMAL", "PASS"] else "\033[1;33m"
            print(f"  {color}✓ {c['item']:<20}\033[0m : {c['detail']}")
        fp = compat["agent_footprint"]
        print(f"\nAgent Process Footprint: \033[1;36m{fp['agent_rss_mb']} MB RAM\033[0m ({fp['overhead_percent_of_system']}% of system RAM)")
        print(f"Scheduling Priority: Nice = \033[1;32m+{fp['nice_priority']}\033[0m (Background priority, UI uninterrupted)")
        print(f"\nRecommendation: \033[1;37m{compat['recommendation']}\033[0m")
        return

    if args.list_models:
        print_banner(brain)
        data = brain.models.list_models()
        active = data["active_model"]
        print(f"Active AI: \033[1;32m{active['name']}\033[0m [Provider: \033[1;36m{active['provider'].upper()}\033[0m]")
        print("\n\033[1;32m--- OFFLINE LOCAL SLM MODELS (Zero Internet Required) ---\033[0m")
        for m in data["offline_models"]:
            mark = "★ (ACTIVE)" if m["is_active"] else " "
            print(f"  {mark} \033[1;37m{m['id']:<26}\033[0m | RAM: {m['ram_required_mb']}MB | {m['name']}")
        print("\n\033[1;34m--- ONLINE CLOUD AI MODELS (Frontier Intelligence) ---\033[0m")
        for m in data["online_models"]:
            mark = "★ (ACTIVE)" if m["is_active"] else " "
            key_tag = "\033[1;32m[Key Configured]\033[0m" if m["has_api_key"] else "\033[1;33m[Key Missing]\033[0m"
            print(f"  {mark} \033[1;37m{m['id']:<26}\033[0m | Speed: {m['speed']:<16} | {key_tag} {m['name']}")
        print("\nTo switch: mint-agent --set-model <MODEL_ID>")
        return

    if args.set_model:
        print_banner(brain)
        res = brain.models.set_model(args.set_model)
        print(f"\033[1;32m✓ {res['message']}\033[0m")
        return

    if args.set_key:
        provider, key = args.set_key
        res = brain.models.set_api_key(provider, key)
        print(f"\033[1;32m✓ {res['message']}\033[0m")
        return

    if args.check_update:
        print_banner(brain)
        print("🔍 Checking GitHub repository for MintPilot Agent OS updates...")
        res = brain.updater.check_for_updates()
        if res.get("update_available"):
            print(f"🚀 \033[1;33m{res['message']}\033[0m")
            print(f"Local Commit: {res.get('local_commit')} -> Remote: {res.get('remote_commit')}")
            print("Run 'mint-agent --update-os' to apply.")
        else:
            print(f"✓ \033[1;32m{res.get('message', 'Up to date')}\033[0m (Commit: {res.get('local_commit')})")
        return

    if args.update_os:
        print_banner(brain)
        print("🔄 Performing in-place upgrade of MintPilot Agent OS from GitHub...")
        res = brain.updater.perform_update()
        if res.get("status") == "success":
            print(f"🎉 \033[1;32m{res['message']}\033[0m (Commit: {res.get('current_commit')})")
        else:
            print(f"❌ \033[1;31mUpgrade failed: {res.get('error')}\033[0m")
        return

    if args.counter_threats:
        print_banner(brain)
        print("⚔️ Executing Active Counter-Measures (Socket Severs & Decoy Traps)...")
        res = brain.security.scan_and_counter_threats()
        print(f"Threat Level: \033[1;31m{res['threat_level']}\033[0m | Total Threats: {res['total_threats']}")
        print(f"Countered Threats: \033[1;32m{res['countered_count']}\033[0m | Execution Mode: {res['mode_executed']}")
        print(json.dumps(res, indent=2))
        return

    if args.deploy_decoys:
        print_banner(brain)
        print("🪤 Deploying Honeypot Canary Decoys...")
        res = brain.security.deploy_decoys()
        print(f"✓ {res.get('message', 'Decoys deployed')}")
        print(json.dumps(res, indent=2))
        return

    if args.self_check:
        print_banner(brain)
        print("🛑 Agent Self-Countering Safety Circuit Breaker Status:")
        circuit = brain.security.self_counter.get_circuit_status()
        state_color = "\033[1;31mTRIPPED\033[0m" if circuit['circuit_tripped'] else "\033[1;32mNORMAL / GOVERNING\033[0m"
        print(f"Status: {state_color}")
        print(f"Recent Action Velocity: {circuit['recent_action_count']} actions in 60s (Threshold: {circuit['runaway_threshold']})")
        print(f"Available Snapshots for Rollback: {circuit['snapshot_count']}")
        print(json.dumps(circuit, indent=2))
        return

    if args.rollback:
        print_banner(brain)
        print("⏮️ Self-Countering Rollback: Reverting to pre-action snapshot...")
        res = brain.security.rollback_last_change()
        if res.get("status") == "success":
            print(f"\033[1;32m✓ {res.get('message')}\033[0m")
        else:
            print(f"\033[1;33m⚠️ {res.get('message', 'Rollback failed')}\033[0m")
        print(json.dumps(res, indent=2))
        return

    if args.defcon:
        print_banner(brain)
        posture = brain.security.get_full_security_posture()
        defcon = posture["defcon"]
        print(f"🚨 Dynamic Threat Escalation Posture: \033[1;31m{defcon['status']}\033[0m")
        print(f"Posture State: \033[1;33m{defcon['posture']}\033[0m")
        print(f"Details: {defcon['description']}")
        print(f"Active Threat Count: {posture['threat_summary']['total_threats']}")
        return

    if args.immune_status:
        print_banner(brain)
        imm = brain.security.get_immune_status()
        print(f"🛡️  Digital Immune System Resilience: \033[1;32m{imm['resilience_score']}/100 ({imm['grade']})\033[0m")
        print(f"Total Synthesized Antibodies: \033[1;36m{imm['total_antibodies']}\033[0m")
        print(f"Recorded Threat Fingerprints: {imm['recorded_fingerprints_count']}")
        print(f"Banned Hostile IPs: {len(imm['banned_hostile_ips'])}")
        print(f"Custom Dynamic Signatures: {imm['custom_threat_signatures_count']}")
        print(f"\nFuture Attack Readiness: \033[1;32m{imm['future_attack_readiness']}\033[0m")
        print("\nActive Antibodies Sample:")
        for ab in imm["active_antibodies"][:6]:
            desc = ab.get('description') or ab.get('threat_type')
            print(f"  ✓ [\033[1;36m{ab['antibody_id']}\033[0m] {desc}")
        return

    if args.harden_future:
        print_banner(brain)
        print("🛡️  Synthesizing digital antibodies & enforcing proactive kernel network defense...")
        res = brain.security.harden_for_future_attacks()
        print(f"\033[1;32m✓ {res['message']}\033[0m")
        kd = res["kernel_defense"]
        print(f"Hardened Kernel Parameters ({kd['hardened_parameters']}):")
        for k, v in list(kd["parameters"].items())[:5]:
            print(f"  • {k} = {v['value']} ({v['status']})")
        print(f"\nPredictive Next-Attack Defenses ({res['predictive_hardening']['predictive_defenses_count']}):")
        for p in res['predictive_hardening']['preemptions']:
            print(f"  ⚔️  Anticipation: \033[1;33m{p['anticipation']}\033[0m -> {p['proactive_defense']}")
        return

    if args.security:
        print_banner(brain)
        posture = brain.security.get_full_security_posture()
        defcon = posture["defcon"]
        print(f"🛡️  Security Hardening Score: \033[1;32m{posture['security_score']}/100 ({posture['grade']})\033[0m | {defcon['status']}")
        print(f"🔥 Firewall Active: {posture['firewall_active']}")
        print(f"🧬 Immune Resilience: \033[1;36m{posture['immune_summary']['resilience_score']}/100 ({posture['immune_summary']['grade']})\033[0m | Antibodies: {posture['immune_summary']['total_antibodies']}")
        print(f"⚠️  Threat Level: {posture['threat_summary']['threat_level']} (Total Threats: {posture['threat_summary']['total_threats']})")
        if posture['penalties']:
            print("\nSecurity Gaps Identified:")
            for p in posture['penalties']:
                print(f"  • \033[1;33m{p}\033[0m")
        if posture['recommendations']:
            print("\nRecommended Defenses:")
            for r in posture['recommendations']:
                print(f"  ✓ {r}")
        return

    if args.scan_threats:
        print_banner(brain)
        print("🔍 Scanning network sockets, processes, and persistence hooks...")
        res = brain.security.scan_and_remediate()
        print(f"Threat Level: \033[1;31m{res['threat_level']}\033[0m | Total Threats: {res['total_threats']}")
        print(f"Remediated Actions: {res['remediated_count']} | Mode: {res['mode_executed']}")
        print(json.dumps(res, indent=2))
        return

    if args.lockdown:
        print_banner(brain)
        res = brain.security.lockdown()
        print(f"🚨 \033[1;31m{res['message']}\033[0m")
        print(json.dumps(res, indent=2))
        return

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
    print("Commands: 'security', 'counter threats', 'deploy decoys', 'self check', 'rollback', 'lockdown', 'turbo mode', 'safe mode', 'exit'\n")

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
