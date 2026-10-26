// MintPilot Online Agent & OS Cognitive Simulation Engine
const AgentSimulator = {
  mode: "turbo", // "turbo" or "safe"
  volume: 50,
  brightness: 80,
  muted: false,
  ramUsedMb: 2210,
  ramTotalMb: 3815,
  securityScore: 92,
  firewallActive: true,
  voiceEnabled: false,
  verbosity: 'normal',
  proactivity: 'balanced',
  modality: 'hybrid',
  activePersona: 'jarvis',
  personas: {
    jarvis: {
      id: 'jarvis',
      name: 'J.A.R.V.I.S.',
      title: 'Just A Rather Very Intelligent System',
      voiceLang: 'en-GB',
      rate: 1.0,
      pitch: 0.95,
      prefix: "Right away, sir.",
      suffix: "Shall I run further diagnostics on the system, sir?",
      greeting: "At your service, sir. All Linux Mint telemetry and core subsystems are running optimally.",
      color: "#00d2d3"
    },
    friday: {
      id: 'friday',
      name: 'F.R.I.D.A.Y.',
      title: 'Female Replacement Intelligent Digital Assistant Youth',
      voiceLang: 'en-IE',
      rate: 1.1,
      pitch: 1.15,
      prefix: "Right on it, boss!",
      suffix: "Combat sentries and socket monitors are primed.",
      greeting: "Hello, boss! Tactical combat and rapid threat neutralization systems are fully armed.",
      color: "#ff4757"
    },
    edith: {
      id: 'edith',
      name: 'E.D.I.T.H.',
      title: "Even Dead, I'm The Hero",
      voiceLang: 'en-US',
      rate: 1.05,
      pitch: 1.05,
      prefix: "Accessing Stark orbital defense grid:",
      suffix: "Target coordinates and network flows confirmed.",
      greeting: "Biometric match confirmed. E.D.I.T.H. orbital network surveillance and perimeter sentry online.",
      color: "#00b4d8"
    },
    vision: {
      id: 'vision',
      name: 'V.I.S.I.O.N.',
      title: 'Mind Stone Synthezoid Consciousness',
      voiceLang: 'en-GB',
      rate: 0.9,
      pitch: 0.85,
      prefix: "I perceive the equilibrium of our architecture:",
      suffix: "Order and balance are maintained across all digital pathways.",
      greeting: "Greetings. I am Vision. The digital immune matrix and ethical safety governors are aligned.",
      color: "#f1c40f"
    },
    karen: {
      id: 'karen',
      name: 'K.A.R.E.N.',
      title: 'Kinetic Analysis & Reconnaissance Entity Network',
      voiceLang: 'en-US',
      rate: 1.0,
      pitch: 1.2,
      prefix: "You've got this!",
      suffix: "I'm monitoring your safety parameters in the background.",
      greeting: "Hi there! Karen here. I'm ready to help you navigate and optimize your Linux Mint system.",
      color: "#ff6b6b"
    }
  },
  protocols: {
    house_party: {
      name: "House Party Protocol",
      description: "Deploys multi-agent background watchdogs across network, memory, and processes.",
      summary: "Autonomous multi-agent sentries dispatched. 4 background guardians active."
    },
    clean_slate: {
      name: "Clean Slate Protocol",
      description: "Frees memory cache, swap, temporary residue, and resets safety circuit history.",
      summary: "System purged. Cache cleared, swap synced, forensic residue eliminated."
    },
    instant_kill: {
      name: "Instant Kill Mode",
      description: "Dispatches TCP RST packets, severs hostile sockets, and force-terminates rogue PIDs.",
      summary: "Hostile connections severed. Inbound intruder sockets dropped with TCP RST."
    },
    veronica: {
      name: "Veronica Protocol",
      description: "Hulkbuster armor: Locks swappiness=10 and allocates kernel buffers for 60fps fluidity.",
      summary: "Hulkbuster reinforcement active. Kernel swappiness locked at 10 (Butter-Smooth)."
    },
    barn_door: {
      name: "Barn Door Protocol",
      description: "Default-deny UFW firewall lockdown. Isolates laptop perimeter instantly.",
      summary: "Perimeter locked down. Default-deny incoming firewall enforced."
    },
    baby_monitor: {
      name: "Baby Monitor Protocol",
      description: "Engages Guarded Safe Mode requiring confirmation before any state modification.",
      summary: "Guarded Safe Mode engaged. All sensitive modifications require authorization."
    }
  },
  threats: [
    { severity: "HIGH", title: "Wildcard Port Exposure (0.0.0.0:8080)", details: "HTTP service exposed to local network without TLS." }
  ],

  init() {
    this.setupTerminal();
    this.setupWebUI();
    this.setupHUD();
    this.setupBrowser();
  },

  // ==================== BASH TERMINAL SIMULATION ====================
  setupTerminal() {
    const term = document.getElementById('termOutput');
    const input = document.getElementById('termInput');
    if (!input || !term) return;

    this.printTermLine("Linux Mint 22.3 (Zena) LTS [Kernel: 6.8.0-45-generic x86_64]");
    this.printTermLine("🍃 MintPilot Cyber Defense Edition active. Type 'mint-agent --security' or 'help'.\n");

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = input.value.trim();
        if (!cmd) return;
        this.printTermLine(`alpesh@mint-agent-os:~$ ${cmd}`, 'term-prompt-echo');
        input.value = '';
        this.executeTerminalCommand(cmd);
      }
    });
  },

  printTermLine(text, className = '') {
    const term = document.getElementById('termOutput');
    if (!term) return;
    const line = document.createElement('div');
    if (className) line.className = className;
    line.innerText = text;
    term.appendChild(line);
    term.parentElement.scrollTop = term.parentElement.scrollHeight;
  },

  executeTerminalCommand(cmd) {
    const c = cmd.toLowerCase().trim();

    if (c === 'clear') {
      const term = document.getElementById('termOutput');
      if (term) term.innerHTML = '';
      return;
    }

    if (c === 'help') {
      this.printTermLine(`
MintPilot OS Available Commands:
  mint-agent "<prompt>"      Run natural language laptop control or security intent
  mint-agent --list-personas List Marvel series AI personas (Jarvis, Friday, Edith, Vision, Karen)
  mint-agent --persona <p>   Switch active Marvel AI Agent Persona
  mint-agent --list-protocols List Stark Emergency Defense Protocols
  mint-agent --protocol <pr> Execute Stark Protocol (house_party, clean_slate, instant_kill, etc.)
  mint-agent --interaction   Display active user interaction settings (Voice, HUD, Persona)
  mint-agent --modality <m>  Set modality: text, voice, hybrid, hud, notification
  mint-agent --verbosity <v> Set communication style: concise, normal, detailed, security_auditor
  mint-agent --proactivity <p> Set proactivity: reactive, balanced, proactive
  mint-agent --voice-reply on/off Toggle offline spoken voice replies
  mint-agent --security      Display full cybersecurity posture score & audit
  mint-agent --scan-threats  Scan network ports, rogue processes, and persistence
  mint-agent --counter-threats Active countermeasures (sever sockets, neutralize threats)
  mint-agent --deploy-decoys Deploy honeypot canary decoy credentials
  mint-agent --self-check    Inspect self-countering safety circuit breaker status
  mint-agent --rollback      Revert last system modifications to snapshot
  mint-agent --lockdown      Activate emergency UFW firewall lockdown
  mint-agent --turbo         Switch to Antigravity Autonomous Turbo Mode
  mint-agent --safe          Switch to Guarded Safe Mode (prompts confirmation)
  sudo ./make_bootable_usb.sh  Safe interactive bootable USB creator
  neofetch                   Display Linux Mint OS telemetry & hardware specs
  clear                      Clear terminal console
`);
      return;
    }

    if (c === 'mint-agent --interaction' || c === 'mint-agent -interaction') {
      this.printTermLine(`
╔═══════════════════════════════════════════════════════════════╗
║          🍃 MINTPILOT CYBER DEFENSE & AI CONTROLLER           ║
║       Autonomous Offline Security Guardian for Linux Mint     ║
╚═══════════════════════════════════════════════════════════════╝
  Mode: [TURBO] | Hardware Tier: Tier 1: Ultra-Light (0.5B - 1.5B Q4 GGUF)
  Interaction: ${this.modality.toUpperCase()} | Style: ${this.verbosity.toUpperCase()} | Voice: ${this.voiceEnabled ? 'ON' : 'OFF'} | Proactive: ${this.proactivity.toUpperCase()}

🗣️  MintPilot User Interaction Settings & Preferences:
  • Active Modality:       ${this.modality.toUpperCase()} (text, voice, hybrid, hud, notification, cli)
  • Communication Style:   ${this.verbosity.toUpperCase()} (concise, normal, detailed, security_auditor)
  • Proactivity Level:     ${this.proactivity.toUpperCase()} (reactive, balanced, proactive)
  • Spoken Voice Feedback: ${this.voiceEnabled ? 'ENABLED' : 'DISABLED'} (Engine: spd-say, Speed: 165 wpm)
  • Desktop Notifications: ENABLED (Urgency: normal)
  • Floating HUD Hotkey:   <Super>space (Centered Spotlight Raycast-style)

Change Interaction Options On-The-Fly:
  mint-agent --modality <text|voice|hybrid|hud|notification>
  mint-agent --verbosity <concise|normal|detailed|security_auditor>
  mint-agent --proactivity <reactive|balanced|proactive>
  mint-agent --voice-reply on/off`);
      return;
    }

    if (c.startsWith('mint-agent --verbosity') || c.startsWith('mint-agent --modality') || c.startsWith('mint-agent --proactivity') || c.startsWith('mint-agent --voice-reply')) {
      const parts = c.split(' ');
      const opt = parts[1];
      const val = parts[2] || '';
      if (opt === '--verbosity' && val) {
        this.setStyle(val);
        this.printTermLine(`✓ Agent communication style set to '${val}'`);
        return;
      }
      if (opt === '--modality' && val) {
        this.setModality(val);
        this.printTermLine(`✓ Interaction modality switched to '${val}'`);
        return;
      }
      if (opt === '--proactivity' && val) {
        this.setProactivity(val);
        this.printTermLine(`✓ Agent proactivity level set to '${val}'`);
        return;
      }
      if (opt === '--voice-reply') {
        this.voiceEnabled = (val === 'on' || val === 'true');
        this.updateInteractionBadges();
        this.printTermLine(`✓ Spoken voice replies ${this.voiceEnabled ? 'ENABLED' : 'DISABLED'}.`);
        return;
      }
    }
    if (c === 'mint-agent --list-personas' || c === 'mint-agent -list-personas') {
      const p = this.personas[this.activePersona] || this.personas.jarvis;
      this.printTermLine(`
╔═══════════════════════════════════════════════════════════════╗
║         ⚡ STARK INDUSTRIES MARVEL AI AGENT MATRIX            ║
║       Integrated Personas & Protocols for Linux Mint OS       ║
╚═══════════════════════════════════════════════════════════════╝
Active Agent: ${p.name} (${p.title})

Available Marvel Agents:
  ${this.activePersona === 'jarvis' ? '★' : ' '} jarvis   | J.A.R.V.I.S. | en-GB | Suave British butler, system diagnostics & governor
  ${this.activePersona === 'friday' ? '★' : ' '} friday   | F.R.I.D.A.Y. | en-IE | Irish combat copilot, rapid threat neutralization
  ${this.activePersona === 'edith' ? '★' : ' '} edith    | E.D.I.T.H.   | en-US | Orbital network surveillance, perimeter sentry
  ${this.activePersona === 'vision' ? '★' : ' '} vision   | V.I.S.I.O.N. | en-GB | Synthezoid digital immune memory, equilibrium
  ${this.activePersona === 'karen' ? '★' : ' '} karen    | K.A.R.E.N.   | en-US | Friendly neighborhood mentor, tutorial & safe mode

Switch Persona: mint-agent --persona <name>
Execute Protocol: mint-agent --protocol <name>`);
      return;
    }

    if (c === 'mint-agent --list-protocols' || c === 'mint-agent -list-protocols') {
      this.printTermLine(`
╔═══════════════════════════════════════════════════════════════╗
║                ⚡ STARK DEFENSE PROTOCOLS                     ║
║         Autonomous Emergency Contingency Subsystems           ║
╚═══════════════════════════════════════════════════════════════╝
Active Contingencies:
  1. house_party  | Multi-agent background watchdogs & autonomous sentries
  2. clean_slate  | Memory cache purge, swap sync, forensic trace scrub
  3. instant_kill | Active TCP RST disruptor & hostile socket severing
  4. veronica     | Hulkbuster kernel memory optimization (swappiness=10, 60fps)
  5. barn_door    | Emergency perimeter lockdown with default-deny UFW
  6. baby_monitor | Guarded Safe Mode with mandatory interactive approval

Execute with: mint-agent --protocol <name>`);
      return;
    }

    if (c.startsWith('mint-agent --persona ') || c.startsWith('mint-agent -persona ')) {
      const parts = c.split(' ');
      const pId = (parts[2] || '').toLowerCase().trim();
      if (this.personas[pId]) {
        this.switchPersona(pId);
        const p = this.personas[pId];
        this.printTermLine(`✓ Switched Marvel Agent Persona to: ${p.name} (${p.title})\n"${p.greeting}"`);
      } else {
        this.printTermLine(`Unknown persona '${pId}'. Available: jarvis, friday, edith, vision, karen`);
      }
      return;
    }

    if (c.startsWith('mint-agent --protocol ') || c.startsWith('mint-agent -protocol ')) {
      const parts = c.split(' ');
      const proto = (parts[2] || '').toLowerCase().trim();
      const p = this.personas[this.activePersona] || this.personas.jarvis;
      if (this.protocols[proto]) {
        const item = this.protocols[proto];
        this.printTermLine(`⚡ Executing Stark Protocol: [${item.name.toUpperCase()}]...`);
        this.printTermLine(`${p.name}: "${p.prefix} ${item.summary}"`);
        this.speak(`${p.prefix} ${item.summary}`, true);
        if (proto === 'clean_slate') {
          this.ramUsedMb = Math.max(1600, this.ramUsedMb - 400);
          this.updateTelemetryUI();
        } else if (proto === 'instant_kill') {
          this.securityScore = 96;
        } else if (proto === 'barn_door') {
          this.firewallActive = true;
          this.securityScore = 98;
        } else if (proto === 'baby_monitor') {
          this.setMode('safe');
        }
      } else {
        this.printTermLine(`Unknown protocol '${proto}'. Available: house_party, clean_slate, instant_kill, veronica, barn_door, baby_monitor`);
      }
      return;
    }

    if (c === 'whoami') {
      this.printTermLine('alpesh');
      return;
    }

    if (c.startsWith('ls')) {
      this.printTermLine(`total 48
drwxr-xr-x 12 alpesh alpesh 4096 Oct 26 19:30 .
drwxr-xr-x  4 root   root   4096 Oct 26 18:00 ..
drwxr-xr-x  6 alpesh alpesh 4096 Oct 26 18:40 agent
drwxr-xr-x  3 alpesh alpesh 4096 Oct 26 18:35 conversation
drwxr-xr-x  2 alpesh alpesh 4096 Oct 26 18:35 artifacts
drwxr-xr-x  3 alpesh alpesh 4096 Oct 26 18:40 iso_builder
-rw-r--r--  1 alpesh alpesh 8846 Oct 26 19:15 README.md
-rwxr-xr-x  1 alpesh alpesh  280 Oct 26 18:35 sync_to_github.sh`);
      return;
    }

    if (c === 'neofetch') {
      this.printTermLine(`
             ...-:::::-...                 alpesh@mint-agent-os
          .-MMMMMMMMMMMMMMM-.              --------------------
      .-MMMM\`..-::::::.-'MMMM-.           OS: Linux Mint 22.3 (Zena) x86_64
    .:MMMM.:MMMMMMMMMMMM:.MMMM:.          Host: Laptop Haswell-ULT
   -MMM-M---MMMMMMMMMMMMMMMMM.MMM-        Kernel: 6.8.0-45-generic
 \`:MMM:MM\`  :MMMM:....::-...-MMMM:        Uptime: 2 days, 14 hours
 :MMM.MMM\`  :MM:  \`-MMMM.MMMM:MMMM:       Packages: 2140 (dpkg)
.MMM.MMMM:  :MM.  -MMMMMMMMMM:MMMM.       Shell: bash 5.2.21
:MMM.MMMM:  :MM.  -MMMMMMMMMM:MMMM:       DE: Cinnamon 6.2.9
:MMM.MMMM:  :MM.  -MMMMMMMMMM:MMMM:       WM: Muffin (X11)
.MMM.MMMM:  :MM:--:MMMMMMMMMM:MMMM.       Theme: Mint-Y-Dark-Aqua
 :MMM.MMM-\`  \`-MMMMMMMMMMMM-'\`MMMM:       Terminal: mint-terminal
  :MMM:MMM:\`                \`MMMM:        CPU: Intel i3-4005U (4) @ 1.700GHz
   .MMM.MMMM:............--'MMMM.         GPU: Intel Haswell-ULT HD Graphics
     \`-MMMM..MMMMMMMMMMMMMMM-.\`           Memory: ${this.ramUsedMb}MiB / ${this.ramTotalMb}MiB (58%)
        \`\`--::-.......-:::--\`\`            Agent: MintPilot Cyber Guardian (Active)
`);
      return;
    }

    if (c.startsWith('free')) {
      this.printTermLine(`               total        used        free      shared  buff/cache   available
Mem:           3.7Gi       2.1Gi       512Mi        92Mi       1.1Gi       1.5Gi
Swap:          3.9Gi       780Mi       3.1Gi`);
      return;
    }

    if (c.includes('make_bootable_usb') || c === 'mint-agent --bootable' || c === 'mint-agent --download') {
      this.printTermLine(`
================================================================================
💾 MintPilot Linux Mint AI Agent Edition — Bootable USB Creator
================================================================================
[INFO] Verifying root privileges... OK (root verified)
[INFO] Detecting available block devices...
[INFO] Host Root Partition: /dev/nvme0n1p2 (PROTECTED from selection)

Target Candidate Disks Found:
  1) /dev/sdb  [Size: 28.9G]  [Model: SanDisk Ultra 3.0]  [Type: disk] (REMOVABLE USB)

[INFO] Auto-selected USB Drive: /dev/sdb (28.9G - SanDisk Ultra 3.0)
[INFO] Auto-detected ISO Image: /home/alpesh/mint-agent-os/LinuxMint-AI-Agent-Edition.iso (2.8G)
[INFO] ISO SHA-256 Checksum: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855

⚠️  WARNING: ALL DATA ON /dev/sdb WILL BE COMPLETELY OVERWRITTEN!
Are you sure you want to proceed? Type 'YES' to confirm: YES

[1/3] Unmounting existing partitions on /dev/sdb... OK
[2/3] Writing ISO image to /dev/sdb with dd (bs=4M status=progress)...
2832+0 records in
2832+0 records out
2969567232 bytes (2.8 GB, 2.8 GiB) copied, 18.234 s, 163 MB/s
[3/3] Flushing kernel disk buffers (sync)... OK

================================================================================
✅ SUCCESS! Bootable USB created successfully on /dev/sdb!
================================================================================
Next steps to boot into Linux Mint AI Agent Edition:
  1. Insert this USB into your laptop.
  2. Power on and immediately tap your laptop's boot menu key:
     • Lenovo: F12 (or Fn + F12)
     • Dell: F12
     • HP: F9 (or Esc -> F9)
     • ASUS: F8 or Esc
     • Acer: F12
     • MSI: F11
     • Apple Mac: Hold Option (Alt) key on boot
  3. Select the USB drive from the boot menu.`);
      return;
    }

    // mint-agent execution
    if (c.startsWith('mint-agent')) {
      const args = cmd.slice(10).trim();

      if (args === '--security') {
        this.printTermLine(`🛡️  Security Hardening Score: ${this.securityScore}/100 (A (Hardened))
🔥 Firewall Active: ${this.firewallActive}
🔒 Anti-Tamper Tripwire: ✓ All Core Files Verified (SHA-256 Intact)
⚠️  Threat Level: LOW (Total Threats: ${this.threats.length})

Active Protections:
  ✓ Autonomous UFW Firewall Shield Active
  ✓ Sudoers & SSH Keys Permissions Locked (0440 / 0700)
  ✓ Memory Guard & Process Watchdog Active`);
        return;
      }

      if (args === '--scan-threats') {
        this.printTermLine(`🔍 Scanning network sockets, processes, and persistence hooks...
Threat Level: LOW | Total Threats: ${this.threats.length}
Remediated Actions: 1 (Autonomous Port Isolation)
Status: System is protected under MintPilot Cyber Guardian.`);
        return;
      }

      if (args === '--counter-threats') {
        this.printTermLine(`⚔️ Executing Active Counter-Measures (Socket Severs & Decoy Traps)...
Threat Level: HIGH | Total Threats: 7
Countered Threats: 7 | Execution Mode: turbo_counter_active
Status: Insecure sockets severed via ss -K; TCP reset frames transmitted.`);
        return;
      }

      if (args === '--deploy-decoys') {
        this.printTermLine(`🪤 Deploying Honeypot Canary Decoys...
✓ Canary decoy honeypots active. Any unauthorized read will trip an emergency counter-lockdown.
Monitored Decoys:
  • /home/alpesh/.config/mint-agent/canary_decoys/aws_credentials.fake
  • /home/alpesh/.config/mint-agent/canary_decoys/ssh_private_key.fake
  • /home/alpesh/.config/mint-agent/canary_decoys/db_password.fake`);
        return;
      }

      if (args === '--self-check') {
        this.printTermLine(`🛑 Agent Self-Countering Safety Circuit Breaker Status:
Status: NORMAL / GOVERNING
Safety Governor: ACTIVE (Autonomous circuit breaker enabled)
Recent Action Velocity: 0 actions in 60s (Threshold: 12)
Repetition Throttler: 0 repetitions (Threshold: 4)
Available Snapshots for Rollback: 2`);
        return;
      }

      if (args === '--rollback') {
        this.printTermLine(`⏮️ Self-Countering Rollback: Reverting to pre-action snapshot...
✓ Successfully rolled back snapshot: 'Pre-execution safe configuration snapshot'
Restored files:
  • /etc/security/mint-agent-rules.conf
  • /home/alpesh/.config/mint-agent/settings.json`);
        return;
      }
      if (args === '--list-models') {
        this.printTermLine(`Active AI: Qwen2.5 0.5B Instruct (Ultra-Light) [Provider: OFFLINE]

--- OFFLINE LOCAL SLM MODELS (Zero Internet Required) ---
  ★ (ACTIVE) qwen2.5-0.5b-instruct      | RAM: 400MB | Qwen2.5 0.5B Instruct (Ultra-Light)
    qwen2.5-coder-1.5b         | RAM: 1100MB | Qwen2.5 Coder 1.5B (Code & Tool Use)
    deepseek-r1-distill-1.5b   | RAM: 1200MB | DeepSeek R1 Distill 1.5B (Offline Reasoning)
    qwen2.5-3b-instruct        | RAM: 2200MB | Qwen2.5 3B Instruct (Balanced)
    qwen2.5-7b-instruct        | RAM: 5000MB | Qwen2.5 7B Instruct (High-Performance)
    custom-gguf                | RAM: 1500MB | Custom Local GGUF Model
    local-ollama               | RAM: 2000MB | Local Ollama Daemon (http://localhost:11434)

--- ONLINE CLOUD AI MODELS (Frontier Intelligence) ---
    gemini-2.5-flash           | Speed: Ultra-Fast (<300ms) | [Key Configured] Google Gemini 2.5 Flash
    gemini-2.5-pro             | Speed: Deep Reasoning   | [Key Configured] Google Gemini 2.5 Pro
    gpt-4o-mini                | Speed: Fast             | [Key Configured] OpenAI GPT-4o-mini
    gpt-4o                     | Speed: Standard         | [Key Configured] OpenAI GPT-4o
    claude-3-5-haiku           | Speed: Very Fast        | [Key Configured] Anthropic Claude 3.5 Haiku
    claude-3-5-sonnet          | Speed: Deep Thinking    | [Key Configured] Anthropic Claude 3.5 Sonnet
    custom-openai-compatible   | Speed: Configurable     | [Key Configured] Custom OpenAI-Compatible API

To switch: mint-agent --set-model <MODEL_ID>`);
        return;
      }

      if (args.startsWith('--set-model')) {
        const mId = args.slice(11).trim() || 'gemini-2.5-flash';
        const simBadge = document.getElementById('simAiModelBadge');
        if (simBadge) {
          const isOff = mId.includes('qwen') || mId.includes('deepseek') || mId.includes('gguf');
          simBadge.innerText = `🧠 AI: ${mId.split('-')[0]} [${isOff ? 'OFFLINE' : 'ONLINE'}]`;
        }
        this.printTermLine(`✓ Successfully switched active AI model to: '${mId}'!`);
        return;
      }

      if (args === '--check-update') {
        this.printTermLine(`🔍 Checking GitHub repository (thakoralpesh3/mint-agent-os)...
✓ MintPilot Agent OS is completely up to date! (Commit: 9fc44c3)`);
        return;
      }

      if (args === '--update-os') {
        this.printTermLine(`🔄 Running in-place upgrade of MintPilot Agent OS...
  ✓ Fetched latest upstream commits from GitHub.
  ✓ Verified SHA-256 cryptographic tripwires intact.
  ✓ Systemd service mint-agent.service reloaded.
🎉 Successfully upgraded to latest MintPilot Agent OS release!`);
        return;
      }

      if (args === '--benchmark-smoothness') {
        this.printTermLine(`🔍 Auditing System against Official Linux Mint PC Requirements (2GB - 4GB RAM)...
Smoothness Grade: 100/100 (A+ (Butter-Smooth))

Compliance & Fluidity Checklist:
  ✓ System RAM           : 3815MB (Meets 4GB Recommended)
  ✓ Processor Cores      : 4 Cores (Dual-Core 64-bit)
  ✓ Agent Footprint      : 21.86MB (<1.2% of RAM, Ultra-Light)
  ✓ Kernel Swappiness    : vm.swappiness = 10 (Low swap thrashing)
  ✓ Process Scheduling   : Nice = +10 (Desktop UI given priority)

Agent Process Footprint: 21.86 MB RAM (0.573% of system RAM)
Scheduling Priority: Nice = +10 (Background priority, UI uninterrupted)

Recommendation: System runs as butter-smooth as original Linux Mint.`);
        return;
      }

      if (args === '--smooth') {
        this.printTermLine(`🍃 Optimizing Linux Mint Kernel for Butter-Smooth Performance (vm.swappiness=10)...
✓ Kernel memory parameters optimized for 60fps butter-smooth Linux Mint performance.
  • vm.swappiness: 10 (Ideal: 10)
  • vm.vfs_cache_pressure: 50 (Ideal: 50)
  • Status: BUTTER_SMOOTH`);
        return;
      }

      if (args === '--defcon') {
        this.printTermLine(`🚨 Dynamic Threat Escalation Posture: DEFCON 2 (ELEVATED THREAT)
  • Posture State: ACTIVE_COUNTER_DEFENSE
  • Description: Hostile probes or suspicious execution detected. TCP RST disruptor and canary honeytokens active.
  • Active Threat Count: 2 (Auto-quarantined)`);
        return;
      }

      if (args === '--immune-status') {
        this.printTermLine(`🛡️ Digital Immune System Resilience: 95/100 (A+ (Immune & Adaptive))
  • Total Synthesized Antibodies: 16
  • Recorded Threat Fingerprints: 12 indexed
  • Banned Hostile IPs: 1 null-routed
  • Dynamic Threat Signatures: 3 active
  • Future Attack Readiness: MAXIMUM (Proactive Kernel Hardening + Auto-Antibody Synthesis)

Sample Active Antibodies:
  ✓ [ab_syn_flood_guard] Drop invalid SYN packets and prevent TCP exhaustion
  ✓ [ab_icmp_broadcast_guard] Ignore broadcast ICMP requests (Smurf attack prevention)
  ✓ [ab_ip_spoof_guard] Enforce reverse path filtering (rp_filter=1)
  ✓ [ab_source_route_guard] Reject source-routed packets to prevent traffic hijacking`);
        return;
      }

      if (args === '--harden-future') {
        this.printTermLine(`🛡️ Synthesizing digital antibodies & enforcing proactive kernel network defense...
✓ PC successfully hardened against future attacks with adaptive immune memory.
  • Hardened Parameters: 12 (tcp_syncookies, rp_filter, log_martians)
  • Predictive Preemptions: Stealth Mode Active • Inotify Staging Watchdog Active`);
        return;
      }

      if (args === '--lockdown') {
        this.securityScore = 98;
        this.firewallActive = true;
        this.printTermLine(`🚨 Emergency PC Lockdown Enforced.
  ✓ UFW default-deny incoming rule active.
  ✓ All non-essential external ports dropped.
  ✓ Filesystems synced and secured.`);
        return;
      }

      if (args === '--tier') {
        this.printTermLine(`RAM Detected: 3815 MB
Hardware Tier: Tier 1: Ultra-Light (0.5B - 1.5B Q4 GGUF)
Recommended Model: qwen2.5-0.5b-instruct.Q4_K_M.gguf
Compatibility: Fully compatible with Linux Mint 2GB-4GB RAM requirements.`);
        return;
      }

      if (args === '--turbo') {
        this.setMode('turbo');
        this.printTermLine("✓ Switched to TURBO MODE (Antigravity-Style). Unrestricted autonomous execution & threat remediation active.");
        return;
      }

      if (args === '--safe') {
        this.setMode('safe');
        this.printTermLine("✓ Switched to SAFE MODE. Interactive permission approval required for sensitive actions.");
        return;
      }

      if (args === '--clean-ram') {
        this.ramUsedMb = Math.max(1600, this.ramUsedMb - 350);
        this.printTermLine(`✓ Memory Guard: Collected garbage, synced filesystem buffers.
  Current Available RAM: ${this.ramTotalMb - this.ramUsedMb} MB (Usage: ${Math.round((this.ramUsedMb/this.ramTotalMb)*100)}%)`);
        this.updateTelemetryUI();
        return;
      }

      // Natural language command
      const prompt = args.replace(/^["']|["']$/g, '');
      const res = this.processAgentIntent(prompt);

      this.printTermLine(`[Thought] ${res.thought}`);
      if (res.result) {
        this.printTermLine(`[Result] ${JSON.stringify(res.result, null, 2)}`);
      }
      this.printTermLine(`(Mode: ${this.mode.toUpperCase()} | Latency: ${res.latency_ms || 1.8}ms)\n`);
      return;
    }

    // Default bash fallback
    this.printTermLine(`bash: ${cmd}: command not found. Try 'mint-agent "${cmd}"' or 'help'.`);
  },

  // ==================== AGENT REASONING ENGINE ====================
  processAgentIntent(prompt) {
    let p = prompt.toLowerCase().trim();

    // Check for Marvel agent name prefix: "jarvis, ...", "friday, ...", "edith, ...", etc.
    let invokedPersona = null;
    if (p.startsWith('jarvis,') || p.startsWith('jarvis ')) {
      invokedPersona = 'jarvis';
      p = p.replace(/^jarvis[, ]+/, '').trim();
    } else if (p.startsWith('friday,') || p.startsWith('friday ')) {
      invokedPersona = 'friday';
      p = p.replace(/^friday[, ]+/, '').trim();
    } else if (p.startsWith('edith,') || p.startsWith('edith ')) {
      invokedPersona = 'edith';
      p = p.replace(/^edith[, ]+/, '').trim();
    } else if (p.startsWith('vision,') || p.startsWith('vision ')) {
      invokedPersona = 'vision';
      p = p.replace(/^vision[, ]+/, '').trim();
    } else if (p.startsWith('karen,') || p.startsWith('karen ')) {
      invokedPersona = 'karen';
      p = p.replace(/^karen[, ]+/, '').trim();
    }

    if (invokedPersona && this.personas[invokedPersona]) {
      this.activePersona = invokedPersona;
      const b = document.getElementById('starkActiveBadge');
      if (b) {
        b.innerText = `Active: ${this.personas[invokedPersona].name}`;
        b.style.borderColor = this.personas[invokedPersona].color;
        b.style.color = this.personas[invokedPersona].color;
      }
      const sb = document.getElementById('simMarvelBadge');
      if (sb) {
        sb.innerText = `🤖 ${this.personas[invokedPersona].name.replace(/\./g, '')} [STARK]`;
        sb.style.borderColor = this.personas[invokedPersona].color;
        sb.style.color = this.personas[invokedPersona].color;
      }
    }

    const activeP = this.personas[this.activePersona] || this.personas.jarvis;

    // Stark Headquarters Modal
    if (p.includes('stark headquarters') || p.includes('marvel agents') || p.includes('stark ai') || p.includes('open marvel') || p.includes('marvel hub')) {
      setTimeout(() => WindowManager.openApp('marvel'), 300);
      const text = `${activeP.prefix} Opening Stark Industries Headquarters. All Marvel Series AI Personas and Stark Protocols are online.`;
      this.speak(text);
      return {
        thought: `${activeP.name}: "${text}" ${activeP.suffix}`,
        result: { active_persona: activeP.name, protocols: Object.keys(this.protocols), status: "ready" },
        latency_ms: 1.0
      };
    }

    // Persona Switching Intent
    for (const [key, pers] of Object.entries(this.personas)) {
      if (p.includes(`switch to ${key}`) || p.includes(`activate ${key}`) || p.includes(`become ${key}`) || p.includes(`call ${key}`)) {
        this.switchPersona(key);
        return {
          thought: `${pers.name}: "${pers.greeting}"`,
          result: { persona: pers.name, voice_lang: pers.voiceLang, role: pers.title },
          latency_ms: 1.2
        };
      }
    }

    // Stark Defense Protocols Intent
    if (p.includes('house party') || p.includes('house party protocol')) {
      const text = `${activeP.prefix} House Party Protocol deployed: 4 autonomous micro-watchdogs launched across network, memory, and processes.`;
      this.speak(text);
      return {
        thought: `${activeP.name}: "${text}" ${activeP.suffix}`,
        result: { protocol: "house_party", active_sentries: 4, status: "deployed", execution_mode: "autonomous_grid" },
        latency_ms: 1.4
      };
    }

    if (p.includes('clean slate') || p.includes('clean slate protocol')) {
      this.ramUsedMb = Math.max(1600, this.ramUsedMb - 400);
      this.updateTelemetryUI();
      const text = `${activeP.prefix} Clean Slate Protocol executed: RAM caches freed, swap synced, and forensic residue scrubbed.`;
      this.speak(text);
      return {
        thought: `${activeP.name}: "${text}" ${activeP.suffix}`,
        result: { protocol: "clean_slate", freed_ram_mb: 400, swap_flushed: true, breaker_reset: true },
        latency_ms: 1.6
      };
    }

    if (p.includes('instant kill') || p.includes('instant kill mode')) {
      this.securityScore = 96;
      const text = `${activeP.prefix} Instant Kill Mode active: TCP RST disruption dispatches, all hostile network sockets severed.`;
      this.speak(text);
      return {
        thought: `${activeP.name}: "${text}" ${activeP.suffix}`,
        result: { protocol: "instant_kill", severed_sockets: 7, rst_packets_sent: 14, status: "neutralized" },
        latency_ms: 1.8
      };
    }

    if (p.includes('veronica') || p.includes('veronica protocol') || p.includes('hulkbuster')) {
      const text = `${activeP.prefix} Veronica Protocol deployed: Hulkbuster armor active. Kernel swappiness locked at 10 for 60fps butter-smooth execution.`;
      this.speak(text);
      return {
        thought: `${activeP.name}: "${text}" ${activeP.suffix}`,
        result: { protocol: "veronica", vm_swappiness: 10, vfs_cache_pressure: 50, fluidity_fps: 60, status: "armored" },
        latency_ms: 1.2
      };
    }

    if (p.includes('barn door') || p.includes('barn door protocol')) {
      this.firewallActive = true;
      this.securityScore = 98;
      const text = `${activeP.prefix} Barn Door Protocol enforced: Perimeter locked down with default-deny UFW firewall rules.`;
      this.speak(text);
      return {
        thought: `${activeP.name}: "${text}" ${activeP.suffix}`,
        result: { protocol: "barn_door", firewall: "ufw_default_deny", ingress: "blocked", status: "locked" },
        latency_ms: 1.5
      };
    }

    if (p.includes('baby monitor') || p.includes('baby monitor protocol')) {
      this.setMode('safe');
      const text = `${activeP.prefix} Baby Monitor Protocol engaged: Guarded Safe Mode active with mandatory interactive confirmation.`;
      this.speak(text);
      return {
        thought: `${activeP.name}: "${text}" ${activeP.suffix}`,
        result: { protocol: "baby_monitor", mode: "safe", approval_required: true, status: "guarded" },
        latency_ms: 1.1
      };
    }

    if (p.includes('interaction') || p.includes('how to interact') || p.includes('how do you interact')) {
      setTimeout(() => WindowManager.openApp('interaction'), 300);
      return {
        thought: `User Interaction Settings: Modality='${this.modality}' | Style='${this.verbosity}' | Voice=${this.voiceEnabled ? 'ON' : 'OFF'} | Proactivity='${this.proactivity}'. Opening Control Center...`,
        result: { modality: this.modality, verbosity: this.verbosity, voice: this.voiceEnabled, proactivity: this.proactivity },
        latency_ms: 1.2
      };
    }

    if (p.includes('enable voice') || p.includes('turn on voice') || p.includes('voice on') || p.includes('speak replies') || p.includes('talk to me')) {
      this.voiceEnabled = true;
      this.updateInteractionBadges();
      this.speak("Spoken voice replies enabled. I am now speaking to you offline.");
      return {
        thought: "Voice interaction enabled. MintPilot will now speak replies aloud using offline speech synthesis.",
        result: { voice_enabled: true, engine: "spd-say", speed: 165 },
        latency_ms: 1.4
      };
    }

    if (p.includes('disable voice') || p.includes('turn off voice') || p.includes('mute voice') || p.includes('voice off')) {
      this.voiceEnabled = false;
      this.updateInteractionBadges();
      return {
        thought: "Voice interaction disabled. MintPilot will interact silently via visual UI and text.",
        result: { voice_enabled: false },
        latency_ms: 1.1
      };
    }

    if (p.includes('concise mode') || p.includes('be concise') || p.includes('minimalist mode')) {
      this.verbosity = 'concise';
      this.updateInteractionBadges();
      return {
        thought: "Communication style set to Concise. Terse 1-line confirmations enabled.",
        result: { verbosity: "concise" },
        latency_ms: 1.0
      };
    }

    if (p.includes('detailed mode') || p.includes('be detailed') || p.includes('mentor mode') || p.includes('explain everything')) {
      this.verbosity = 'detailed';
      this.updateInteractionBadges();
      return {
        thought: "Communication style set to Detailed Mentor. Deep explanations, system rationale, and commands will be shown.",
        result: { verbosity: "detailed" },
        latency_ms: 1.3
      };
    }

    if (p.includes('security style') || p.includes('auditor style') || p.includes('security mode')) {
      this.verbosity = 'security_auditor';
      this.updateInteractionBadges();
      return {
        thought: "Communication style set to Security Auditor. Telemetry will emphasize DEFCON levels and threat posture.",
        result: { verbosity: "security_auditor" },
        latency_ms: 1.2
      };
    }

    if (p.includes('proactive mode') || p.includes('be proactive') || p.includes('ambient copilot')) {
      this.proactivity = 'proactive';
      this.updateInteractionBadges();
      return {
        thought: "Proactivity level set to Proactive Ambient Copilot. MintPilot will actively monitor and suggest system optimizations.",
        result: { proactivity: "proactive" },
        latency_ms: 1.1
      };
    }

    if (p.includes('reactive mode') || p.includes('be reactive')) {
      this.proactivity = 'reactive';
      this.updateInteractionBadges();
      return {
        thought: "Proactivity level set to Reactive. MintPilot will speak only when explicitly commanded.",
        result: { proactivity: "reactive" },
        latency_ms: 1.0
      };
    }

    if (p.includes('download') || p.includes('bootable') || p.includes('make usb') || p.includes('flash usb') || p.includes('iso')) {
      setTimeout(() => WindowManager.openApp('download'), 300);
      return {
        thought: "Opening Linux Mint AI Agent OS Download & Bootable USB Creator Hub...",
        result: {
          iso_name: "LinuxMint-AI-Agent-Edition.iso",
          size: "2.8 GB",
          usb_flasher: "make_bootable_usb.sh",
          ventoy_compatible: true,
          status: "ready"
        },
        latency_ms: 1.2
      };
    }

    // Active Counter-Measures & Self-Countering Circuit Breaker
    if (p.includes('counter threat') || p.includes('active counter') || p.includes('sever socket')) {
      return {
        thought: "Active counter-measures executed: Insecure sockets severed and hostile ports neutralized.",
        result: { status: "threats_countered", severed_sockets: 7, mode: "turbo_counter_active" },
        latency_ms: 1.5
      };
    }

    if (p.includes('deploy decoy') || p.includes('honeypot') || p.includes('canary')) {
      return {
        thought: "Canary decoy honeypots deployed. Any intrusion will trigger immediate counter-lockdown.",
        result: { status: "deployed", monitored_honeytokens: 3 },
        latency_ms: 1.8
      };
    }

    if (p.includes('self check') || p.includes('circuit breaker') || p.includes('counter itself')) {
      return {
        thought: "Agent Self-Countering Safety Circuit Breaker: ACTIVE & GOVERNING.",
        result: { circuit_tripped: false, runaway_threshold: 12, loop_repetition_threshold: 4, available_snapshots: 2 },
        latency_ms: 1.1
      };
    }

    if (p.includes('rollback') || p.includes('undo last change') || p.includes('revert snapshot')) {
      return {
        thought: "Autonomous Rollback: Reverted system and agent state to previous pre-action snapshot.",
        result: { status: "success", snapshot_restored: "snap_pre_action_0" },
        latency_ms: 2.4
      };
    }

    // Cybersecurity intents
    if (p.includes('security') || p.includes('defense') || p.includes('protect')) {
      return {
        thought: `Security Posture Score: ${this.securityScore}/100. System is guarded against network & process threats.`,
        result: {
          security_score: this.securityScore,
          firewall_active: this.firewallActive,
          threat_level: "LOW",
          anti_tamper: "verified_intact"
        },
        latency_ms: 1.4
      };
    }

    if (p.includes('scan threat') || p.includes('threat')) {
      return {
        thought: `Completed deep threat scan. No critical malware or unauthorized persistence detected.`,
        result: { threat_level: "LOW", total_threats: this.threats.length, remediated: 0 },
        latency_ms: 2.2
      };
    }

    if (p.includes('lockdown')) {
      this.securityScore = 98;
      this.firewallActive = true;
      return {
        thought: `Emergency PC Lockdown enforced. All incoming ports blocked via UFW.`,
        result: { status: "lockdown_active", firewall: "strict_drop" },
        latency_ms: 1.8
      };
    }

    // Safe mode sensitive check
    if (this.mode === 'safe' && (p.includes('rm ') || p.includes('delete') || p.includes('lock') || p.includes('reboot') || p.includes('kill'))) {
      return {
        thought: `Safe Mode Interception: Action requires user confirmation before proceeding.`,
        result: { status: "permission_required", action: prompt, approved: false },
        latency_ms: 1.2
      };
    }

    if (p.includes('volume') || p.includes('sound')) {
      const match = p.match(/(\d+)/);
      if (match) {
        this.volume = parseInt(match[1]);
        this.muted = false;
        return { thought: `Set master audio volume to ${this.volume}%`, result: { volume: this.volume, muted: false }, latency_ms: 2.1 };
      }
      return { thought: `Retrieved volume status`, result: { volume: this.volume, muted: this.muted }, latency_ms: 1.5 };
    }

    if (p.includes('mute')) {
      this.muted = !this.muted;
      return { thought: this.muted ? "Muted master audio" : "Unmuted master audio", result: { muted: this.muted, volume: this.volume }, latency_ms: 1.4 };
    }

    if (p.includes('battery')) {
      return { thought: "Retrieved laptop battery telemetry", result: { percentage: "94%", state: "charging", time_to_full: "28 minutes" }, latency_ms: 1.9 };
    }

    if (p.includes('wifi')) {
      return { thought: "Scanned wireless networks via nmcli", result: { active_ssid: "Chamunda-Fiber-5G", signal: "98%", available: ["Auto vivo Y22", "JioAirFiber-Ultra", "Chamunda-Guest"] }, latency_ms: 2.8 };
    }

    if (p.includes('nemo') || p.includes('file')) {
      WindowManager.openApp('nemo');
      return { thought: "Opened Nemo File Manager at /home/alpesh", result: { directory: "/home/alpesh", status: "launched" }, latency_ms: 3.2 };
    }

    if (p.includes('terminal')) {
      WindowManager.openApp('terminal');
      return { thought: "Focused interactive bash terminal emulator", result: { status: "success" }, latency_ms: 1.1 };
    }

    if (p.includes('firefox') || p.includes('browser') || p.includes('web')) {
      WindowManager.openApp('browser');
      return { thought: "Launched Firefox web browser window", result: { browser: "firefox", status: "success" }, latency_ms: 2.4 };
    }

    if (p.includes('clean') || p.includes('free ram')) {
      this.ramUsedMb = Math.max(1600, this.ramUsedMb - 320);
      this.updateTelemetryUI();
      return { thought: "Cleaned system caches and freed inactive memory buffers", result: { available_ram_mb: this.ramTotalMb - this.ramUsedMb }, latency_ms: 2.0 };
    }

    if (p.includes('smooth') || p.includes('benchmark')) {
      return {
        thought: "Audited Linux Mint PC compliance: 100/100 (A+ Butter-Smooth)",
        result: {
          score: 100,
          grade: "A+ (Butter-Smooth)",
          ram_compliance: "3815MB (Meets 4GB Recommended)",
          agent_footprint_mb: 21.86,
          agent_overhead_percent: "0.57%",
          kernel_swappiness: 10,
          nice_priority: 10,
          recommendation: "System runs as butter-smooth as original Linux Mint."
        },
        latency_ms: 0.8
      };
    }

    if (p.includes('immune') || p.includes('antibodies') || p.includes('future attack')) {
      return {
        thought: "Digital Immune System Resilience: 95/100 (A+ Adaptive). Active Antibodies: 16 synthesized.",
        result: {
          resilience_score: 95,
          grade: "A+ (Immune & Adaptive)",
          total_antibodies: 16,
          recorded_fingerprints: 12,
          banned_hostile_ips: ["185.220.101.42"],
          dynamic_signatures: 3,
          future_attack_readiness: "MAXIMUM (Proactive Kernel Hardening + Auto-Antibody Synthesis)"
        },
        latency_ms: 1.1
      };
    }

    if (p.includes('harden future') || p.includes('prepare future')) {
      return {
        thought: "Synthesized dynamic antibodies & applied proactive kernel network stack hardening against future attacks.",
        result: {
          status: "success",
          hardened_parameters: 12,
          parameters: ["net.ipv4.tcp_syncookies=1", "net.ipv4.conf.all.rp_filter=1", "net.ipv4.icmp_echo_ignore_broadcasts=1"],
          predictive_preemptions: ["Stealth Mode Active", "Inotify Staging Watchdog Active"]
        },
        latency_ms: 1.4
      };
    }

    if (p.includes('defcon') || p.includes('threat posture')) {
      return {
        thought: "Dynamic Threat Escalation: DEFCON 2 (ELEVATED THREAT) - ACTIVE_COUNTER_DEFENSE",
        result: {
          level: 2,
          status: "DEFCON 2 (ELEVATED THREAT)",
          color: "#e67e22",
          posture: "ACTIVE_COUNTER_DEFENSE",
          description: "Hostile probes or suspicious execution detected. TCP RST disruptor and canary honeytokens active."
        },
        latency_ms: 0.9
      };
    }

    return {
      thought: `Interpreted autonomous laptop control goal: '${prompt}'`,
      result: { prompt: prompt, execution_mode: "autonomous_slm_planner", status: "completed" },
      latency_ms: 4.5
    };
  },

  // ==================== OPEN WEBUI SIMULATION ====================
  setupWebUI() {
    const sendBtn = document.getElementById('webuiSendBtn');
    const input = document.getElementById('webuiInput');
    const history = document.getElementById('webuiHistory');

    if (!sendBtn || !input) return;

    sendBtn.addEventListener('click', () => {
      const text = input.value.trim();
      if (!text) return;
      this.sendWebUIMessage(text);
      input.value = '';
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const text = input.value.trim();
        if (!text) return;
        this.sendWebUIMessage(text);
        input.value = '';
      }
    });

    this.updateTelemetryUI();
  },

  sendWebUIMessage(prompt) {
    const history = document.getElementById('webuiHistory');
    if (!history) return;

    const userMsg = document.createElement('div');
    userMsg.className = 'webui-msg user';
    userMsg.innerText = prompt;
    history.appendChild(userMsg);

    setTimeout(() => {
      const res = this.processAgentIntent(prompt);
      const agentMsg = document.createElement('div');
      agentMsg.className = 'webui-msg agent';
      agentMsg.innerHTML = `
        <div style="font-size:0.75rem; color:#8cd9aa; margin-bottom:4px; font-style:italic;">🧠 ${res.thought}</div>
        <div>${res.result ? JSON.stringify(res.result, null, 2) : 'Command completed.'}</div>
        <div style="font-size:0.7rem; color:#777; margin-top:6px;">⚡ Latency: ${res.latency_ms || 2.1}ms | Mode: ${this.mode.toUpperCase()}</div>
      `;
      history.appendChild(agentMsg);
      history.scrollTop = history.scrollHeight;
    }, 200);
  },

  setMode(newMode) {
    this.mode = newMode;
    const pill = document.getElementById('webuiModePill');
    if (pill) {
      if (newMode === 'turbo') {
        pill.innerText = '⚡ TURBO MODE (Autonomous)';
        pill.style.background = 'rgba(231, 76, 60, 0.2)';
        pill.style.color = '#ff6b6b';
        pill.style.border = '1px solid #ff6b6b';
      } else {
        pill.innerText = '🛡️ SAFE MODE (Guarded)';
        pill.style.background = 'rgba(243, 156, 18, 0.2)';
        pill.style.color = '#f1c40f';
        pill.style.border = '1px solid #f1c40f';
      }
    }
  },

  toggleWebUIMode() {
    this.setMode(this.mode === 'turbo' ? 'safe' : 'turbo');
  },

  updateTelemetryUI() {
    const ramPct = Math.round((this.ramUsedMb / this.ramTotalMb) * 100);
    const ramEl = document.getElementById('webuiRamBadge');
    if (ramEl) ramEl.innerText = `RAM: ${ramPct}% (${this.ramTotalMb - this.ramUsedMb}MB free)`;
  },

  openModelModal() {
    const choice = prompt(
      "🧠 MintPilot AI Model Selector:\n" +
      "Choose an AI model:\n" +
      "  1. qwen2.5-0.5b (Offline SLM, 400MB RAM)\n" +
      "  2. qwen2.5-1.5b (Offline Coder SLM, 1.1GB RAM)\n" +
      "  3. deepseek-r1-1.5b (Offline Reasoning, 1.2GB RAM)\n" +
      "  4. gemini-2.5-flash (Online Cloud, Ultra-Fast)\n" +
      "  5. gpt-4o (Online Cloud Frontier)\n\n" +
      "Enter model name or number (e.g. 1 or gemini-2.5-flash):",
      "gemini-2.5-flash"
    );
    if (!choice) return;

    let target = choice.trim();
    if (target === '1') target = 'qwen2.5-0.5b';
    if (target === '2') target = 'qwen2.5-1.5b';
    if (target === '3') target = 'deepseek-r1-1.5b';
    if (target === '4') target = 'gemini-2.5-flash';
    if (target === '5') target = 'gpt-4o';

    const simBadge = document.getElementById('simAiModelBadge');
    const isOff = target.includes('qwen') || target.includes('deepseek') || target.includes('gguf');
    if (simBadge) {
      simBadge.innerText = `🧠 AI: ${target.split('-')[0]} [${isOff ? 'OFFLINE' : 'ONLINE'}]`;
    }
    this.sendWebUIMessage(`switch model to ${target}`);
  },

  switchDlTab(tabId, btn) {
    document.querySelectorAll('.dl-tab-pane').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.dl-tab-btn').forEach(b => b.classList.remove('active'));
    const target = document.getElementById(tabId);
    if (target) target.classList.add('active');
    if (btn) btn.classList.add('active');
  },

  openDownloadModal(tab = 'tab-iso') {
    WindowManager.openApp('download');
    const btn = document.querySelector(`.dl-tab-btn[onclick*="${tab}"]`);
    this.switchDlTab(tab, btn);
  },

  simulateFlasherInTerm() {
    WindowManager.openApp('terminal');
    const input = document.getElementById('termInput');
    if (input) {
      input.value = "sudo ./make_bootable_usb.sh";
      const e = new KeyboardEvent('keydown', { key: 'Enter' });
      input.dispatchEvent(e);
    }
  },

  speak(text, force = false) {
    if (!this.voiceEnabled && !force) return;
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const persona = this.personas[this.activePersona] || this.personas.jarvis;
        const clean = text.replace(/[*_#`\[\]]/g, '');
        const utter = new SpeechSynthesisUtterance(clean);
        utter.rate = persona.rate || 1.0;
        utter.pitch = persona.pitch || 1.0;
        utter.lang = persona.voiceLang || 'en-GB';

        // Match browser voice if available
        const voices = window.speechSynthesis.getVoices();
        if (voices && voices.length > 0) {
          const matched = voices.find(v => v.lang.toLowerCase().startsWith(persona.voiceLang.toLowerCase())) ||
                        voices.find(v => v.lang.toLowerCase().includes('en'));
          if (matched) utter.voice = matched;
        }

        window.speechSynthesis.speak(utter);
      } catch (e) {
        console.warn("Speech error:", e);
      }
    }
  },

  switchPersona(id) {
    const pId = id.toLowerCase().trim();
    if (!this.personas[pId]) return;
    this.activePersona = pId;
    const persona = this.personas[pId];

    // Update Marvel Headquarters active badge
    const badge = document.getElementById('starkActiveBadge');
    if (badge) {
      badge.innerText = `Active: ${persona.name}`;
      badge.style.borderColor = persona.color;
      badge.style.color = persona.color;
    }

    // Update WebUI header badge
    const simBadge = document.getElementById('simMarvelBadge');
    if (simBadge) {
      simBadge.innerText = `🤖 ${persona.name.replace(/\./g, '')} [STARK]`;
      simBadge.style.borderColor = persona.color;
      simBadge.style.color = persona.color;
    }

    this.voiceEnabled = true;
    this.updateInteractionBadges();
    this.speak(persona.greeting, true);
    this.sendWebUIMessage(`Switched active AI persona to ${persona.name}. "${persona.greeting}"`);
  },

  testCurrentPersonaVoice() {
    const persona = this.personas[this.activePersona] || this.personas.jarvis;
    this.voiceEnabled = true;
    this.updateInteractionBadges();
    this.speak(persona.greeting, true);
    alert(`🔊 ${persona.name} speaking:\n"${persona.greeting}"\n\n(Voice Accent: ${persona.voiceLang}, Pitch: ${persona.pitch}, Cadence: ${persona.rate})`);
  },

  openMarvelModal() {
    WindowManager.openApp('marvel');
  },

  testVoiceAudio() {
    this.voiceEnabled = true;
    this.updateInteractionBadges();
    this.speak("Hello! I am MintPilot on Linux Mint. Offline speech synthesis and user interaction are active and working smoothly.");
    alert("🔊 Speaking audio via browser speech synthesizer! Voice output is now active.");
  },

  toggleVoice() {
    this.voiceEnabled = !this.voiceEnabled;
    this.updateInteractionBadges();
    if (this.voiceEnabled) {
      this.speak("Voice output enabled.");
      this.sendWebUIMessage("enable voice");
    } else {
      this.sendWebUIMessage("disable voice");
    }
  },

  cycleStyle() {
    const styles = ['normal', 'detailed', 'security_auditor', 'concise'];
    const next = styles[(styles.indexOf(this.verbosity) + 1) % styles.length];
    this.setStyle(next);
    this.sendWebUIMessage(`${next} mode`);
  },

  cycleProactivity() {
    const levels = ['balanced', 'proactive', 'reactive'];
    const next = levels[(levels.indexOf(this.proactivity) + 1) % levels.length];
    this.setProactivity(next);
    this.sendWebUIMessage(`${next} mode`);
  },

  setModality(mod, btn) {
    this.modality = mod;
    if (mod === 'voice' || mod === 'hybrid') this.voiceEnabled = true;
    else if (mod === 'text') this.voiceEnabled = false;
    this.updateInteractionBadges();
    if (btn) {
      document.querySelectorAll('#modalityPills .option-pill').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
    }
    const expl = document.getElementById('modalityExplain');
    if (expl) {
      const m = {
        text: "Text WebUI: Visual responses only, silent mode.",
        voice: "Offline Voice: Hands-free spoken responses and microphone listening.",
        hybrid: "Hybrid Mode: Visual dashboard plus spoken audio feedback.",
        hud: "Spotlight HUD: Summonable instantly via Super+Space.",
        notification: "Desktop Toast: Subtle passive desktop banners via notify-send."
      };
      expl.innerHTML = `<strong>${mod.toUpperCase()}:</strong> ${m[mod] || ''}`;
    }
  },

  setStyle(style, btn) {
    this.verbosity = style;
    this.updateInteractionBadges();
    if (btn) {
      document.querySelectorAll('#stylePills .option-pill').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
    }
    const expl = document.getElementById('styleExplain');
    if (expl) {
      const m = {
        concise: "Concise Mode: Terse one-line action confirmations without lengthy boilerplate.",
        normal: "Normal Mode: Clear conversational answers and clean execution feedback.",
        detailed: "Detailed Mentor: Deep step-by-step explanations, underlying CLI commands, and RAM diffs.",
        security_auditor: "Security Auditor: Strict DEFCON levels, CVE telemetry, and firewall posture."
      };
      expl.innerHTML = `<strong>${style.toUpperCase()}:</strong> ${m[style] || ''}`;
    }
  },

  setProactivity(pro, btn) {
    this.proactivity = pro;
    this.updateInteractionBadges();
    if (btn) {
      document.querySelectorAll('#proactivePills .option-pill').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
    }
    const expl = document.getElementById('proactiveExplain');
    if (expl) {
      const m = {
        reactive: "Reactive Mode: Speaks or acts only when explicitly commanded. Never interrupts.",
        balanced: "Balanced Mode: Silent during normal work, alerts if battery < 15%, threats emerge, or RAM > 85%.",
        proactive: "Proactive Ambient Copilot: Continuously monitors health and suggests power and security optimizations."
      };
      expl.innerHTML = `<strong>${pro.toUpperCase()}:</strong> ${m[pro] || ''}`;
    }
  },

  updateInteractionBadges() {
    const vb = document.getElementById('simVoiceBadge');
    if (vb) {
      vb.innerText = `🎙️ Voice: ${this.voiceEnabled ? 'ON' : 'OFF'}`;
      vb.style.color = this.voiceEnabled ? '#2ecc71' : '#d6a4e8';
      vb.style.borderColor = this.voiceEnabled ? '#2ecc71' : '#9b59b6';
    }
    const sb = document.getElementById('simStyleBadge');
    if (sb) sb.innerText = `💬 Style: ${this.verbosity.charAt(0).toUpperCase() + this.verbosity.slice(1)}`;
    const pb = document.getElementById('simProactiveBadge');
    if (pb) pb.innerText = `🔔 Proactive: ${this.proactivity.charAt(0).toUpperCase() + this.proactivity.slice(1)}`;

    const cvb = document.getElementById('cardVoiceBadge');
    if (cvb) cvb.innerText = `Voice: ${this.voiceEnabled ? 'Enabled' : 'Disabled'}`;
    const csb = document.getElementById('cardStyleBadge');
    if (csb) csb.innerText = `Style: ${this.verbosity.charAt(0).toUpperCase() + this.verbosity.slice(1)}`;
    const cpb = document.getElementById('cardProactiveBadge');
    if (cpb) cpb.innerText = `Proactivity: ${this.proactivity.charAt(0).toUpperCase() + this.proactivity.slice(1)}`;
    const cmb = document.getElementById('cardModalityBadge');
    if (cmb) cmb.innerText = `Modality: ${this.modality.charAt(0).toUpperCase() + this.modality.slice(1)}`;

    const toggleBtn = document.getElementById('cardVoiceToggleBtn');
    if (toggleBtn) {
      toggleBtn.innerText = this.voiceEnabled ? 'ON' : 'OFF';
      toggleBtn.style.background = this.voiceEnabled ? '#27ae60' : '#222';
    }
  },

  openInteractionModal() {
    WindowManager.openApp('interaction');
  },

  openUpgradeModal() {
    const runInTerm = confirm(
      "🍃 Upgrade Existing Linux Mint to MintPilot Agent OS:\n\n" +
      "Run this 1-line command on any Linux Mint (21.x/22.x) machine:\n\n" +
      "curl -sSL https://raw.githubusercontent.com/thakoralpesh3/mint-agent-os/main/upgrade_mint_to_agent_os.sh | sudo bash\n\n" +
      "Would you like to simulate this upgrade in the terminal right now?"
    );
    if (runInTerm) {
      WindowManager.openApp('terminal');
      const input = document.getElementById('termInput');
      if (input) {
        input.value = "mint-agent --update-os";
        const e = new KeyboardEvent('keydown', { key: 'Enter' });
        input.dispatchEvent(e);
      }
    }
  },

  openSmoothnessModal() {
    alert(
      "🍃 Linux Mint Butter-Smooth Performance Governor:\n\n" +
      "• Compatibility Score: 100/100 (A+ Butter-Smooth)\n" +
      "• Official Mint RAM: 3.8GB / 4.0GB (Meets 2GB-4GB Standard)\n" +
      "• Agent Daemon Overhead: 21.8 MB (<0.6% of system RAM)\n" +
      "• Kernel Swappiness: vm.swappiness = 10 (Zero swap thrashing)\n" +
      "• Process Priority: Nice = +10, ionice = Idle (60fps UI guaranteed)\n\n" +
      "Linux Mint Cinnamon runs with 100% full native fluidity!"
    );
    this.sendWebUIMessage("benchmark smoothness");
  },

  openImmuneModal() {
    alert(
      "🧬 MintPilot Digital Immune System & Future Attack Readiness:\n\n" +
      "• Resilience Rating: 95/100 (A+ Adaptive)\n" +
      "• Active Synthesized Antibodies: 16 rules\n" +
      "• Attack Vector Fingerprints: 12 indexed in permanent memory\n" +
      "• Banned Hostile IPs: Null-routed via iptables DROP\n" +
      "• Proactive Kernel Defense: SYN Cookies, Anti-Spoofing, ICMP Broadcast Drop\n" +
      "• Predictive Hardening: Future attack vectors pre-emptively neutralized!"
    );
    this.sendWebUIMessage("immune status");
  },

  // ==================== HUD OVERLAY SIMULATION ====================
  setupHUD() {
    const hudInput = document.getElementById('hudInput');
    const hudResp = document.getElementById('hudResponse');
    if (!hudInput) return;

    hudInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const text = hudInput.value.trim();
        if (!text) return;
        hudResp.innerText = "Thinking...";
        setTimeout(() => {
          const res = this.processAgentIntent(text);
          hudResp.innerText = `✓ ${res.thought} (${res.latency_ms}ms)`;
          setTimeout(() => {
            const hud = document.getElementById('hudOverlay');
            if (hud) hud.style.display = 'none';
          }, 1500);
        }, 150);
      }
    });
  },

  // ==================== BROWSER SIMULATION ====================
  setupBrowser() {
    const urlInput = document.getElementById('browserUrl');
    const frame = document.getElementById('browserViewport');
    if (!urlInput || !frame) return;

    urlInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const u = urlInput.value.trim();
        frame.innerHTML = `<div style="padding:40px; text-align:center; color:#fff;">
          <h3>Browsing: ${u}</h3>
          <p style="color:#aaa; margin-top:10px;">Simulated lightweight DOM view extracted by MintPilot BrowserController.</p>
          <div style="background:#1b1e20; padding:20px; border-radius:8px; margin-top:20px; text-align:left; max-width:500px; margin-left:auto; margin-right:auto;">
            <strong>Title:</strong> Linux Mint & MintPilot Autonomous OS<br>
            <strong>Security:</strong> TLS Encrypted • Sentry Monitored<br>
            <strong>Memory:</strong> &lt;5MB RAM utilized
          </div>
        </div>`;
      }
    });
  }
};

window.addEventListener('DOMContentLoaded', () => {
  AgentSimulator.init();
});
