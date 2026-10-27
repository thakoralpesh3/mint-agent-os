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

try:
    from agent.core.stark_sfx import stark_sfx
except ImportError:
    stark_sfx = None


def print_banner(brain: AgentBrain):
    mode_color = "\033[1;31m[TURBO]\033[0m" if brain.permissions.is_turbo() else "\033[1;33m[SAFE]\033[0m"
    istat = brain.interaction.get_status()
    marvel_p = brain.marvel.get_active_persona()
    voice_str = "\033[1;32mON\033[0m" if istat['voice']['enabled'] else "\033[1;30mOFF\033[0m"
    print(f"""
\033[1;36m╔═══════════════════════════════════════════════════════════════╗
║         🌸 ARADHYA AI AGENT OS & CYBER DEFENSE NETWORK        ║
║   Autonomous Marvel-Class Sovereign Intelligence (Linux Mint) ║
╚═══════════════════════════════════════════════════════════════╝\033[0m
  Active Agent: \033[1;32m{marvel_p['name']}\033[0m ({marvel_p['title']})
  Mode: {mode_color} | Hardware Tier: \033[1;36m{brain.hardware_tier['tier_name']}\033[0m
  Interaction: \033[1;35m{istat['modality'].upper()}\033[0m | Style: \033[1;36m{istat['verbosity'].upper()}\033[0m | Voice: {voice_str} | Proactive: \033[1;33m{istat['proactivity'].upper()}\033[0m
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

    if voice or brain.interaction.voice_settings.get("enabled"):
        brain.voice.speak(res.get("thought", "Command completed"))


def main():
    parser = argparse.ArgumentParser(description="Aradhya AI Agent OS - Autonomous Controller & Marvel Cyber Defense Network")
    parser.add_argument("prompt", nargs="*", help="Natural language command")
    parser.add_argument("-i", "--interactive", action="store_true", help="Launch interactive REPL session")
    parser.add_argument("-v", "--voice", action="store_true", help="Enable spoken voice reply")
    parser.add_argument("--turbo", action="store_true", help="Execute in unrestricted Antigravity Turbo Mode (no permission prompts)")
    parser.add_argument("--safe", action="store_true", help="Execute in Safe Mode (requires confirmation for sensitive actions)")
    parser.add_argument("--persona", type=str, choices=["aradhya", "jarvis", "friday", "edith", "vision", "karen"], help="Switch Marvel AI Agent persona (Aradhya, Jarvis, Friday, Edith, Vision, Karen)")
    parser.add_argument("--protocol", type=str, help="Execute Marvel Stark Protocol (e.g. 'house party', 'clean slate', 'veronica', 'instant kill', 'barn door')")
    parser.add_argument("--house-party", action="store_true", help="Execute House Party Protocol: Multi-agent 5-guardian coordinated cross-talk sweep")
    parser.add_argument("--edith-scan", action="store_true", help="Execute E.D.I.T.H. Orbital Tactical Grid Scan across ports and processes")
    parser.add_argument("--list-personas", action="store_true", help="List all Marvel Series AI Agent personas available in Linux Mint")
    parser.add_argument("--list-protocols", action="store_true", help="List all Stark Protocols available for autonomous OS execution")
    parser.add_argument("--interaction", action="store_true", help="Display all user interaction options, modalities, and active settings")
    parser.add_argument("--modality", type=str, choices=["text", "voice", "hybrid", "hud", "notification", "cli"], help="Set user interaction modality channel")
    parser.add_argument("--verbosity", type=str, choices=["concise", "normal", "detailed", "security_auditor"], help="Set communication style and explanation depth")
    parser.add_argument("--proactivity", type=str, choices=["reactive", "balanced", "proactive"], help="Set proactive ambient system monitoring style")
    parser.add_argument("--voice-reply", type=str, choices=["on", "off"], help="Toggle spoken voice replies (on/off)")
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
    parser.add_argument("--theatre", "--house-party-theatre", action="store_true", help="Execute cinematic Coordinated Multi-Agent Theatre mission dialogue")
    parser.add_argument("--hud", action="store_true", help="Launch Iron Man Visor Tactical HUD with targeting reticle and live telemetry")
    parser.add_argument("--sfx", type=str, choices=["repulsor", "lock", "chime", "neutralized", "alarm"], help="Play Stark Sound Effect via PulseAudio/PipeWire")
    parser.add_argument("--proactive-check", action="store_true", help="Run proactive ambient system monitoring for thermal, memory, and socket warnings")
    args = parser.parse_args()

    mode_override = "turbo" if args.turbo else ("safe" if args.safe else None)
    brain = AgentBrain(mode=mode_override)

    if args.list_personas:
        print_banner(brain)
        personas = brain.marvel.list_personas()
        print("🤖 Marvel Series AI Agents for Linux Mint:\n")
        for p in personas:
            status = "\033[1;32m[ACTIVE]\033[0m" if p["is_active"] else "\033[1;30m[INACTIVE]\033[0m"
            print(f"  • \033[1;36m{p['name']:<12}\033[0m {status} — {p['title']}")
            print(f"    \033[1;33mSpecialty:\033[0m {p['specialty']}")
            print(f"    \033[1;35mTagline:\033[0m   {p['tagline']}\n")
        print("Switch anytime: mint-agent --persona <jarvis|friday|edith|vision|karen>")
        return

    if args.list_protocols:
        print_banner(brain)
        protos = brain.marvel.list_protocols()
        print("⚡ Stark Industries & Marvel Protocols for Linux Mint:\n")
        for k, pr in protos.items():
            print(f"  • \033[1;36mProtocol: {pr['name']:<35}\033[0m [{pr['level']}]")
            print(f"    \033[1;37m{pr['description']}\033[0m\n")
        print("Execute anytime: mint-agent --protocol '<name>' or in natural language: 'Jarvis, engage house party protocol'")
        return

    if args.persona:
        print_banner(brain)
        res = brain.marvel.set_persona(args.persona)
        if "error" in res:
            print(f"\033[1;31m✗ Error:\033[0m {res['error']}")
        else:
            print(f"\033[1;32m✓\033[0m {res['message']}")
            print(f"  \033[1;34mGreeting:\033[0m {res['greeting']}")
        return

    if args.protocol:
        print_banner(brain)
        res = brain.marvel.execute_protocol(args.protocol)
        if "error" in res:
            print(f"\033[1;31m✗ Error:\033[0m {res['error']}")
        else:
            print(f"\033[1;32m✓ Protocol Executed:\033[0m {res['protocol']} ({res['level']})")
            print(f"\033[1;34m[{res['agent']}]\033[0m {res['thought']}")
        return

    if args.house_party:
        print_banner(brain)
        res = brain.marvel.execute_protocol("house party")
        print("\033[1;36m🚀 STARK INDUSTRIES: HOUSE PARTY PROTOCOL ENGAGED\033[0m")
        print("Autonomous Multi-Agent Coordinated Deployment:\n")
        for member in res.get("multi_agent_team", []):
            print(f"  \033[1;33m[{member['agent']}]\033[0m — \033[1;37m{member['role']}\033[0m [{member['status']}]")
            print(f"    \033[1;32m\"{member['report']}\"\033[0m\n")
        print(f"\033[1;34mSentries Active:\033[0m {len(res.get('sentries_activated', []))} background guardians deployed.")
        return

    if args.edith_scan:
        print_banner(brain)
        res = brain.marvel.edith_tactical_scan()
        print("\033[1;36m🕶️  E.D.I.T.H. ORBITAL TACTICAL GRID SCANNER\033[0m")
        print(f"  • Satellite Link:   \033[1;32m{res['satellite_link']}\033[0m")
        print(f"  • Grid Status:      \033[1;32m{res['grid_status']}\033[0m")
        print(f"  • Perimeter Score:  \033[1;36m{res['perimeter_score']}/100\033[0m")
        print(f"  • Targets Scanned:  \033[1;33m{res['targets_scanned']} entities\033[0m\n")

        print("Tactical Target Assessment Matrix:")
        for t in res["targets"]:
            col = "\033[1;31m" if t["threat_level"] == "HOSTILE" else ("\033[1;33m" if t["threat_level"] == "ELEVATED" else "\033[1;32m")
            print(f"  [{t['target_id']}] {col}{t['threat_level']:<8}\033[0m Index: {t['threat_index']:>2}% | {t['category']:<16} | Action: \033[1;37m{t['action_recommended']}\033[0m")
            print(f"    Target: {t['entity']}")
            print(f"    Classification: {t['classification']}\n")
        print(f"\033[1;34m[E.D.I.T.H.]\033[0m {res['thought']}")
        return

    if args.sfx:
        if stark_sfx:
            print(f"\033[1;36m⚡ Playing Stark SFX:\033[0m {args.sfx}...")
            stark_sfx.play_by_name(args.sfx, async_play=False)
            print("\033[1;32m✓ Complete.\033[0m")
        else:
            print("\033[1;31m✗ Stark SFX Engine unavailable.\033[0m")
        return

    if args.theatre:
        print_banner(brain)
        theatre = brain.marvel.get_coordinated_multi_agent_theatre()
        print("\033[1;36m╔═══════════════════════════════════════════════════════════════╗\033[0m")
        print("\033[1;36m║     ⚡ STARK INDUSTRIES: COORDINATED MULTI-AGENT THEATRE     ║\033[0m")
        print("\033[1;36m║         Live Interactive Defense & Countermeasure Mission     ║\033[0m")
        print("\033[1;36m╚═══════════════════════════════════════════════════════════════╝\033[0m\n")
        import time
        for turn in theatre:
            if stark_sfx and turn.get("sfx"):
                stark_sfx.play_by_name(turn["sfx"], async_play=True)
            print(f"  \033[1;33m[STEP {turn['step']}]\033[0m \033[1;36m{turn['agent']}\033[0m — \033[1;37m{turn['role']}\033[0m")
            print(f"    \033[1;32mAction:\033[0m {turn['action']}")
            print(f"    \033[1;37m\"{turn['speech']}\"\033[0m\n")
            if brain.interaction.voice_settings.get("enabled"):
                brain.voice.speak(turn['speech'])
            time.sleep(0.4)
        print("\033[1;32m✓ Mission Accomplished. All 5 Marvel Series AI Agents deployed in harmony.\033[0m")
        return

    if args.hud:
        print_banner(brain)
        print("""\033[1;36m╔══════════════════════════════════════════════════════════════════════════╗
║               🕶️  STARK INDUSTRIES IRON MAN VISOR HUD                     ║
║                       MARK 85 TACTICAL AR MATRIX                         ║
╚══════════════════════════════════════════════════════════════════════════╝\033[0m
       \033[1;33m┌─── NORTH 350° ───┐\033[0m             \033[1;32m[TELEMETRY CORE: ONLINE]\033[0m
  \033[1;36m[ARC REACTOR]\033[0m                       \033[1;36m[TARGET MATRIX]\033[0m
  Output:  8.24 GW                      Lock: [TARGET-EDITH-01]
  Temp:    38.4 °C                      Type: Socket 0.0.0.0:8080
  Status:  100% NOMINAL                 Risk: ELEVATED (78%)
             \\                             /
              \\                           /
               \033[1;31m┌─── RETICLE LOCK-ON ───┐\033[0m
               │       \033[1;33m+  [+][+]  +\033[0m       │
               │   \033[1;36m<<  TARGET LOCKED  >>\033[0m  │
               │       \033[1;33m+  [+][+]  +\033[0m       │
               \033[1;31m└── RANGE: 0.42 METERS ──┘\033[0m
              /                           \\
             /                             \\
  \033[1;35m[SUIT ARMOR & KERNEL]\033[0m                 \033[1;33m[SATELLITE SENTRY]\033[0m
  Cinnamon Compositor: 60.0 FPS         Uplink: STARK-ORBITAL-7
  Swappiness:          10 (Butter-Smooth) Grid:  ACTIVE AR TARGETING
  Active Defense:      INSTANT KILL READY Mode:  PERIMETER ENFORCEMENT

\033[1;32m✓ Press 'H' in WebUI / Online Simulator for the Fullscreen Animated Visor HUD.\033[0m""")
        if stark_sfx:
            stark_sfx.play_target_lock()
        return

    if args.proactive_check:
        print_banner(brain)
        print("🔍 Scanning system telemetry for proactive Stark AI interventions...")
        interventions = brain.marvel.check_proactive_interventions()
        if not interventions:
            print("\033[1;32m✓ All system parameters nominal. No proactive warnings needed.\033[0m")
        else:
            print(f"\033[1;33m⚡ {len(interventions)} Proactive Stark Interventions Detected:\033[0m\n")
            for item in interventions:
                col = "\033[1;31m" if item["severity"] == "CRITICAL" else "\033[1;33m"
                print(f"  {col}[{item['severity']}]\033[0m \033[1;36m{item['agent']}\033[0m ({item['type']})")
                print(f"    \033[1;37m\"{item['speech']}\"\033[0m")
                print(f"    Recommended Protocol: \033[1;32mmint-agent --protocol {item['recommended_action']}\033[0m\n")
                if stark_sfx and item.get("sfx"):
                    stark_sfx.play_by_name(item["sfx"])
        return

    if args.interaction:
        print_banner(brain)
        status = brain.interaction.get_status()
        print("🗣️  MintPilot User Interaction Settings & Preferences:")
        print(f"  • Active Modality:       \033[1;36m{status['modality'].upper()}\033[0m (text, voice, hybrid, hud, notification, cli)")
        print(f"  • Communication Style:   \033[1;35m{status['verbosity'].upper()}\033[0m (concise, normal, detailed, security_auditor)")
        print(f"  • Proactivity Level:     \033[1;33m{status['proactivity'].upper()}\033[0m (reactive, balanced, proactive)")
        print(f"  • Spoken Voice Feedback: \033[1;32m{'ENABLED' if status['voice']['enabled'] else 'DISABLED'}\033[0m (Engine: {status['voice']['engine']}, Speed: {status['voice']['speed']} wpm)")
        print(f"  • Desktop Notifications: \033[1;32m{'ENABLED' if status['notifications']['enabled'] else 'DISABLED'}\033[0m (Urgency: {status['notifications']['urgency_threshold']})")
        print(f"  • Floating HUD Hotkey:   \033[1;32m{status['hud']['hotkey']}\033[0m (Centered Spotlight Raycast-style)")
        print("\nChange Interaction Options On-The-Fly:")
        print("  mint-agent --modality <text|voice|hybrid|hud|notification>")
        print("  mint-agent --verbosity <concise|normal|detailed|security_auditor>")
        print("  mint-agent --proactivity <reactive|balanced|proactive>")
        print("  mint-agent --voice-reply on/off")
        return

    if args.modality:
        print_banner(brain)
        res = brain.interaction.set_modality(args.modality)
        if "error" in res:
            print(f"\033[1;31m✗ Error:\033[0m {res['error']}")
        else:
            print(f"\033[1;32m✓\033[0m {res['message']}")
        return

    if args.verbosity:
        print_banner(brain)
        res = brain.interaction.set_verbosity(args.verbosity)
        if "error" in res:
            print(f"\033[1;31m✗ Error:\033[0m {res['error']}")
        else:
            print(f"\033[1;32m✓\033[0m {res['message']}")
        return

    if args.proactivity:
        print_banner(brain)
        res = brain.interaction.set_proactivity(args.proactivity)
        if "error" in res:
            print(f"\033[1;31m✗ Error:\033[0m {res['error']}")
        else:
            print(f"\033[1;32m✓\033[0m {res['message']}")
        return

    if args.voice_reply:
        print_banner(brain)
        val = args.voice_reply.lower() in ["on", "true", "1", "yes"]
        res = brain.interaction.set_voice(val)
        state_str = "ENABLED" if val else "DISABLED"
        print(f"\033[1;32m✓\033[0m Spoken voice replies {state_str}. (Modality: {res['modality'].upper()})")
        return

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
