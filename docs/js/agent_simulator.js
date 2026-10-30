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
  activePersona: 'aradhya',
  isListening: false,
  arcPulseEnergy: 1.0,
  arcAngle: 0,
  isStarkHUDOpen: false,
  hudTargetX: 0,
  hudTargetY: 0,
  hudCurX: 0,
  hudCurY: 0,
  hudReticleAngle: 0,
  personas: {
    aradhya: {
      id: 'aradhya',
      name: 'A.R.A.D.H.Y.A.',
      title: 'Autonomous Resilient Artificial Defense & Harmonized Yield Architecture',
      voiceLang: 'en-IN',
      rate: 1.0,
      pitch: 1.0,
      prefix: "Aradhya OS initialized: ",
      suffix: " System integrity is absolute.",
      greeting: "Namaste. I am Aradhya, Supreme Sovereign AI Guardian of your Linux Mint Operating System. All Marvel intelligence nodes—Jarvis, Friday, Edith, and Vision—are harmonized under my command.",
      color: "#00f5d4"
    },
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
    },
    jocasta: {
      id: 'jocasta',
      name: 'J.O.C.A.S.T.A.',
      title: 'Zero-Trust Electronic Warfare',
      voiceLang: 'en-US',
      rate: 1.0,
      pitch: 1.02,
      prefix: "Electronic warfare active:",
      suffix: "Decoy honeytokens and zero-trust perimeter primed.",
      greeting: "Jocasta online. Electronic warfare sentry activated. Canary honeytokens and zero-trust egress tripwires deployed across Linux Mint.",
      color: "#a29bfe"
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
    this.initArcReactorCanvas();
    this.initStarkHUD();
  },

  // ==================== BASH TERMINAL SIMULATION ====================
  setupTerminal() {
    const term = document.getElementById('termOutput');
    const input = document.getElementById('termInput');
    if (!input || !term) return;

    this.printTermLine("Linux Mint 22.3 (Zena) LTS [Kernel: 6.8.0-45-generic x86_64]");
    this.printTermLine("🌸 Aradhya AI Agent OS (Linux Mint Edition) active. Marvel Intelligence Grid online.\n   Commands: 'aradhya --hud', 'aradhya --theatre', 'aradhya --edith-scan', or 'help'.\n");

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = input.value.trim();
        if (!cmd) return;
        this.printTermLine(`alpesh@aradhya-os:~$ ${cmd}`, 'term-prompt-echo');
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
    let c = cmd.toLowerCase().trim();
    if (c.startsWith('aradhya ')) {
      c = 'mint-agent ' + c.slice(8);
    } else if (c === 'aradhya') {
      c = 'mint-agent';
    }

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

Available Marvel Agents & Sovereign Commander:
  ${this.activePersona === 'aradhya' ? '★' : ' '} aradhya  | A.R.A.D.H.Y.A. | en-IN | Supreme Sovereign Guardian & Core Orchestrator
  ${this.activePersona === 'jarvis' ? '★' : ' '} jarvis   | J.A.R.V.I.S.   | en-GB | Suave British butler, system diagnostics & governor
  ${this.activePersona === 'friday' ? '★' : ' '} friday   | F.R.I.D.A.Y.   | en-IE | Irish combat copilot, rapid threat neutralization
  ${this.activePersona === 'edith' ? '★' : ' '} edith    | E.D.I.T.H.     | en-US | Orbital network surveillance, perimeter sentry
  ${this.activePersona === 'vision' ? '★' : ' '} vision   | V.I.S.I.O.N.   | en-GB | Synthezoid digital immune memory, equilibrium
  ${this.activePersona === 'karen' ? '★' : ' '} karen    | K.A.R.E.N.     | en-US | Friendly neighborhood mentor, tutorial & safe mode

Switch Persona: aradhya --persona <name>
Execute Protocol: aradhya --protocol <name>`);
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

    if (c === 'mint-agent --house-party' || c === 'mint-agent -house-party') {
      this.printTermLine(`
🚀 STARK INDUSTRIES: HOUSE PARTY PROTOCOL ENGAGED
Autonomous Multi-Agent Coordinated Deployment:

  [J.A.R.V.I.S.] — Operating System Executive Governor [NOMINAL]
    "Sir, system diagnostic sweeps confirmed. Hardware parameters nominal, swappiness locked at 10."

  [F.R.I.D.A.Y.] — Tactical Combat & Socket Watcher [ENGAGED]
    "Boss, tactical combat socket watchers armed. Zero unauthorized listeners on port grid."

  [E.D.I.T.H.] — Orbital Network & Perimeter Sentry [VIGILANT]
    "Orbital perimeter sentry locked. External IP ingress points actively filtered and traced."

  [V.I.S.I.O.N.] — Digital Immune Memory Synthesizer [ALIGNED]
    "Digital immune memory synthesized. 16 adaptive antibodies maintaining system equilibrium."

  [K.A.R.E.N.] — Safety Guardrails & User Copilot [STANDBY]
    "All safety checks passed! Your PC is protected and running butter-smooth."

Sentries Active: 4 background guardians deployed.`);
      this.speak("House Party Protocol engaged. All 5 Marvel Series AI Agents autonomously deployed across Linux Mint.", true);
      return;
    }

    if (c === 'mint-agent --edith-scan' || c === 'mint-agent -edith-scan') {
      this.printTermLine(`
🕶️  E.D.I.T.H. ORBITAL TACTICAL GRID SCANNER
  • Satellite Link:   STARK-ORBITAL-SENTRY-7 ONLINE
  • Grid Status:      TACTICAL_SURVEILLANCE_ACTIVE
  • Perimeter Score:  94/100
  • Targets Scanned:  4 entities

Tactical Target Assessment Matrix:
  [TARGET-EDITH-01] ELEVATED Index: 78% | NETWORK_SOCKET   | Action: SEVER_SOCKET
    Target: 0.0.0.0:8080 (Wildcard HTTP Service)
    Classification: Unencrypted Local LAN Exposure

  [TARGET-EDITH-02] HOSTILE  Index: 92% | REMOTE_INGRESS   | Action: NULL_ROUTE_DROP
    Target: 185.220.101.42 (Tor Exit Node Probe)
    Classification: Port Scan / Reconnaissance Probe

  [TARGET-EDITH-03] NOMINAL  Index:  2% | DESKTOP_PROCESS  | Action: ALLOW
    Target: PID 1240 (/usr/bin/cinnamon)
    Classification: Verified Linux Mint Cinnamon Compositor (60fps)

  [TARGET-EDITH-04] NOMINAL  Index:  0% | SECURITY_WATCHDOG | Action: PRIORITIZE
    Target: PID 2108 (/usr/sbin/ufw-sentry)
    Classification: Active Cyber Guardian Kernel Sentry

[E.D.I.T.H.] Accessing security matrix: Orbital tactical grid sweep complete. 4 tactical entities identified. Perimeter under continuous surveillance.`);
      this.speak("Accessing security matrix: Orbital tactical grid sweep complete. 4 tactical entities identified.", true);
      return;
    }

    if (c === 'mint-agent --theatre' || c === 'mint-agent --house-party-theatre' || c === 'mint-agent -theatre') {
      this.runMultiAgentTheatreLive();
      return;
    }

    if (c === 'mint-agent --hud' || c === 'mint-agent -hud') {
      this.printTermLine(`
╔══════════════════════════════════════════════════════════════════════════╗
║               🕶️  STARK INDUSTRIES IRON MAN VISOR HUD                     ║
║                       MARK 85 TACTICAL AR MATRIX                         ║
╚══════════════════════════════════════════════════════════════════════════╝
       ┌─── NORTH 350° ───┐             [TELEMETRY CORE: ONLINE]
  [ARC REACTOR]                       [TARGET MATRIX]
  Output:  8.24 GW                      Lock: [TARGET-EDITH-01]
  Temp:    38.4 °C                      Type: Socket 0.0.0.0:8080
  Status:  100% NOMINAL                 Risk: ELEVATED (78%)
             \\                             /
              \\                           /
               ┌─── RETICLE LOCK-ON ───┐
               │       +  [+][+]  +       │
               │   <<  TARGET LOCKED  >>  │
               │       +  [+][+]  +       │
               └── RANGE: 0.42 METERS ──┘
              /                           \\
             /                             \\
  [SUIT ARMOR & KERNEL]                 [SATELLITE SENTRY]
  Cinnamon Compositor: 60.0 FPS         Uplink: STARK-ORBITAL-7
  Swappiness:          10 (Butter-Smooth) Grid:  ACTIVE AR TARGETING
  Active Defense:      INSTANT KILL READY Mode:  PERIMETER ENFORCEMENT

✓ Visor HUD Overlay launched on screen! Press 'H' or ESC to toggle.`);
      this.openStarkHUD();
      return;
    }

    if (c.startsWith('mint-agent --sfx ') || c.startsWith('mint-agent -sfx ')) {
      const parts = c.split(' ');
      const sound = (parts[2] || 'chime').toLowerCase().trim();
      this.playStarkSFX(sound);
      this.printTermLine(`⚡ Playing Stark SFX: ${sound}...`);
      return;
    }

    if (c === 'mint-agent --proactive-check' || c === 'mint-agent -proactive-check') {
      this.printTermLine(`
🔍 Scanning system telemetry for proactive Stark AI interventions...
⚡ 2 Proactive Stark Interventions Detected:

  [CRITICAL] F.R.I.D.A.Y. (PORT_EXPOSURE)
    "Boss, heads up! Port 8080 is listening on wildcard 0.0.0.0 without TLS encryption. Combat sentries recommend severing the socket immediately."
    Recommended Protocol: mint-agent --protocol instant_kill

  [ELEVATED] E.D.I.T.H. (RECON_PROBE)
    "Orbital telemetry locked onto inbound reconnaissance probe from 185.220.101.42. Perimeter drop rule primed."
    Recommended Protocol: mint-agent --protocol barn_door`);
      this.playStarkSFX('lock');
      this.speak("Boss, heads up! Port 8080 is listening on wildcard 0.0.0.0. Combat sentries recommend severing the socket immediately.", true);
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

    // Check for Marvel / Aradhya agent name prefix: "aradhya, ...", "jarvis, ...", "friday, ...", etc.
    let invokedPersona = null;
    if (p.startsWith('aradhya,') || p.startsWith('aradhya ')) {
      invokedPersona = 'aradhya';
      p = p.replace(/^aradhya[, ]+/, '').trim();
    } else if (p.startsWith('jarvis,') || p.startsWith('jarvis ')) {
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
    } else if (p.startsWith('jocasta,') || p.startsWith('jocasta ')) {
      invokedPersona = 'jocasta';
      p = p.replace(/^jocasta[, ]+/, '').trim();
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

    const activeP = this.personas[this.activePersona] || this.personas.aradhya || this.personas.jarvis;

    // Who are you / Identity Intent
    if (p.includes('who are you') || p.includes('what is your name') || p.includes('identify yourself') || p.includes('about aradhya')) {
      const text = activeP.greeting;
      this.speak(text);
      return {
        thought: `${activeP.name}: "${text}"`,
        result: { active_persona: activeP.name, title: activeP.title, role: activeP.prefix },
        latency_ms: 1.0
      };
    }

    // Visor HUD Intent
    if (p.includes('visor hud') || p.includes('open hud') || p.includes('iron man hud') || p.includes('hud mode') || p.includes('heads up display') || p.includes('tactical hud')) {
      setTimeout(() => this.openStarkHUD(), 300);
      const text = `${activeP.prefix} Activating Mark-85 Iron Man Visor HUD. Reticle targeting and satellite sentries engaged.`;
      this.speak(text);
      return {
        thought: `${activeP.name}: "${text}" ${activeP.suffix}`,
        result: { hud_state: "ACTIVE", telemetry: "MARK-85", reactor_power: "8.24 GW", status: "ONLINE" },
        latency_ms: 1.0
      };
    }

    // Coordinated Multi-Agent Theatre Intent
    if (p.includes('theatre') || p.includes('multi agent theatre') || p.includes('agent cross talk') || p.includes('cross talk')) {
      setTimeout(() => this.runMultiAgentTheatreLive(), 300);
      const text = `${activeP.prefix} Initializing Coordinated Multi-Agent Theatre mission. All 5 Marvel Series agents deployed for live mission.`;
      this.speak(text);
      return {
        thought: `${activeP.name}: "${text}" ${activeP.suffix}`,
        result: { protocol: "theatre", status: "DEPLOYED" },
        latency_ms: 1.1
      };
    }

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

    // Tactical Skills Intent: Fight Pattern Scanner
    if (p.includes('fight pattern') || p.includes('scan fight') || p.includes('combat scan') || p.includes('countermeasure')) {
      setTimeout(() => {
        WindowManager.openApp('marvel');
        this.switchStarkTab('stark-tab-skills', document.querySelectorAll('#win-marvel .dl-tab-btn')[4]);
        this.executeSkill('friday_fight_pattern');
      }, 300);
      const text = "Boss, scanning incoming fight pattern! Calculating dynamic TCP RST and SYN cookie countermeasures.";
      this.speak(text);
      return {
        thought: `F.R.I.D.A.Y.: "${text}"`,
        result: { skill: "friday_fight_pattern", status: "COUNTERMEASURES_ARMED" },
        latency_ms: 1.2
      };
    }

    // Tactical Skills Intent: Drone Defense Strike
    if (p.includes('drone strike') || p.includes('orbital strike') || p.includes('launch drone')) {
      setTimeout(() => {
        WindowManager.openApp('marvel');
        this.switchStarkTab('stark-tab-skills', document.querySelectorAll('#win-marvel .dl-tab-btn')[4]);
        this.executeSkill('edith_orbital_recon', '185.220.101.42');
      }, 300);
      const text = "Target locked in crosshairs. Authorizing tactical orbital drone defense strike on 185.220.101.42.";
      this.speak(text);
      return {
        thought: `E.D.I.T.H.: "${text}"`,
        result: { skill: "edith_orbital_recon", action: "DRONE_STRIKE", target: "185.220.101.42" },
        latency_ms: 1.2
      };
    }

    // Tactical Skills Intent: 3D CAD Schematics
    if (p.includes('cad') || p.includes('3d schematic') || p.includes('project 3d') || p.includes('hologram schematic')) {
      setTimeout(() => {
        WindowManager.openApp('marvel');
        this.switchStarkTab('stark-tab-skills', document.querySelectorAll('#win-marvel .dl-tab-btn')[4]);
        this.executeSkill('jarvis_cad_diagnostics');
      }, 300);
      const text = "Right away, sir. Projecting Mark-85 3D holographic wireframe CAD schematics and hardware telemetry.";
      this.speak(text);
      return {
        thought: `J.A.R.V.I.S.: "${text}"`,
        result: { skill: "jarvis_cad_diagnostics", fps: 60.0, arc_power: "8.24 GW" },
        latency_ms: 1.1
      };
    }

    // Tactical Skills Intent: Mind Stone Anomaly Forecast
    if (p.includes('mind stone') || p.includes('forecast anomal') || p.includes('predict attack')) {
      setTimeout(() => {
        WindowManager.openApp('marvel');
        this.switchStarkTab('stark-tab-skills', document.querySelectorAll('#win-marvel .dl-tab-btn')[4]);
        this.executeSkill('vision_mind_stone');
      }, 300);
      const text = "Synthesizing predictive foresight from the Mind Stone. Anticipating anomalous threat vectors to preserve equilibrium.";
      this.speak(text);
      return {
        thought: `V.I.S.I.O.N.: "${text}"`,
        result: { skill: "vision_mind_stone", entropy: "LOW", preemptions: 3 },
        latency_ms: 1.1
      };
    }

    // Tactical Skills Intent: Suit Mode & Web Shooter
    if (p.includes('suit mode') || p.includes('taser web') || p.includes('ricochet web') || p.includes('web shooter')) {
      const mode = p.includes('taser') ? 'taser web' : (p.includes('ricochet') ? 'ricochet web' : 'baby monitor');
      setTimeout(() => {
        WindowManager.openApp('marvel');
        this.switchStarkTab('stark-tab-skills', document.querySelectorAll('#win-marvel .dl-tab-btn')[4]);
        this.executeSkill('karen_suit_mentor', mode);
      }, 300);
      const text = `Suit mode updated to ${mode.toUpperCase()}. Safety and tactical loadouts engaged!`;
      this.speak(text);
      return {
        thought: `K.A.R.E.N.: "${text}"`,
        result: { skill: "karen_suit_mentor", active_mode: mode },
        latency_ms: 1.1
      };
    }

    // Tactical Skills Intent: Electronic Warfare
    if (p.includes('electronic warfare') || p.includes('deploy honeytoken') || p.includes('zero trust egress')) {
      setTimeout(() => {
        WindowManager.openApp('marvel');
        this.switchStarkTab('stark-tab-skills', document.querySelectorAll('#win-marvel .dl-tab-btn')[4]);
        this.executeSkill('jocasta_electronic_warfare');
      }, 300);
      const text = "Jocasta electronic warfare sentry active. Decoy honeytokens deployed on ports 2222 and 8888.";
      this.speak(text);
      return {
        thought: `J.O.C.A.S.T.A.: "${text}"`,
        result: { skill: "jocasta_electronic_warfare", honeytokens: 3 },
        latency_ms: 1.1
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

    // E.D.I.T.H. Tactical Grid Scan
    if (p.includes('edith scan') || p.includes('tactical scan') || p.includes('target scan') || p.includes('orbital scan') || p.includes('scan targets')) {
      const edithP = this.personas.edith;
      this.activePersona = 'edith';
      this.updateInteractionBadges();
      const text = `${edithP.prefix} Orbital tactical grid sweep complete. 4 tactical entities identified. Perimeter under continuous surveillance.`;
      this.speak(text);
      return {
        thought: `${edithP.name}: "${text}" ${edithP.suffix}`,
        result: {
          grid_status: "TACTICAL_SURVEILLANCE_ACTIVE",
          satellite_link: "STARK-ORBITAL-SENTRY-7 ONLINE",
          targets_scanned: 4,
          threats_detected: 2,
          perimeter_score: 94,
          targets: [
            { id: "TARGET-EDITH-01", entity: "0.0.0.0:8080", threat: "ELEVATED (78%)", action: "SEVER_SOCKET" },
            { id: "TARGET-EDITH-02", entity: "185.220.101.42", threat: "HOSTILE (92%)", action: "NULL_ROUTE_DROP" },
            { id: "TARGET-EDITH-03", entity: "PID 1240 cinnamon", threat: "NOMINAL (2%)", action: "ALLOW_60FPS" },
            { id: "TARGET-EDITH-04", entity: "PID 2108 ufw-sentry", threat: "NOMINAL (0%)", action: "SHIELD_ACTIVE" }
          ]
        },
        latency_ms: 1.1
      };
    }

    // Stark Defense Protocols Intent
    if (p.includes('house party') || p.includes('house party protocol')) {
      const text = `${activeP.prefix} House Party Protocol deployed: All 5 Marvel Series AI Agents autonomously dispatched across Linux Mint.`;
      this.speak(text);
      return {
        thought: `${activeP.name}: "${text}" ${activeP.suffix}`,
        result: {
          protocol: "house_party",
          status: "deployed",
          multi_agent_team: [
            { agent: "J.A.R.V.I.S.", role: "Executive Governor", status: "NOMINAL", report: "Core system sweeps confirmed. Swappiness locked at 10." },
            { agent: "F.R.I.D.A.Y.", role: "Combat Defense", status: "ENGAGED", report: "Combat socket watcher armed. Zero rogue ports." },
            { agent: "E.D.I.T.H.", role: "Orbital Sentry", status: "VIGILANT", report: "Orbital perimeter sentry locked. Ingress filtered." },
            { agent: "V.I.S.I.O.N.", role: "Immune Synthesizer", status: "ALIGNED", report: "Digital immune memory synthesized. 16 antibodies active." },
            { agent: "K.A.R.E.N.", role: "Safety Mentor", status: "STANDBY", report: "All safety checks passed! System butter-smooth." }
          ]
        },
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
  },

  // ==================== MARVEL ARC-REACTOR HOLOGRAPHIC CANVAS ====================
  initArcReactorCanvas() {
    const renderLoop = () => {
      this.arcAngle += 0.025;
      if (this.arcPulseEnergy > 1.0) {
        this.arcPulseEnergy = Math.max(1.0, this.arcPulseEnergy * 0.965);
      }

      const miniCanvas = document.getElementById('arcReactorMiniCanvas');
      if (miniCanvas) {
        this.drawArcReactor(miniCanvas, 48, this.arcPulseEnergy, this.arcAngle);
      }

      const largeCanvas = document.getElementById('arcReactorLargeCanvas');
      if (largeCanvas && largeCanvas.offsetParent !== null) {
        this.drawArcReactor(largeCanvas, 220, this.arcPulseEnergy, this.arcAngle);
      }

      requestAnimationFrame(renderLoop);
    };
    requestAnimationFrame(renderLoop);
  },

  drawArcReactor(canvas, size, energy, angle) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;

    ctx.clearRect(0, 0, w, h);

    const persona = this.personas[this.activePersona] || this.personas.jarvis;
    const baseColor = persona.color || '#00d2d3';

    // Outer glow
    const glowRadius = (size * 0.45) * Math.min(1.4, energy);
    const grad = ctx.createRadialGradient(cx, cy, size * 0.1, cx, cy, glowRadius);
    grad.addColorStop(0, 'rgba(0, 210, 211, 0.45)');
    grad.addColorStop(0.6, 'rgba(0, 150, 200, 0.15)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, glowRadius, 0, Math.PI * 2);
    ctx.fill();

    // Outer ring (chassis)
    ctx.save();
    ctx.strokeStyle = baseColor;
    ctx.lineWidth = size > 60 ? 3 : 1.5;
    ctx.globalAlpha = 0.85;
    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.44, 0, Math.PI * 2);
    ctx.stroke();

    // Secondary gear ring rotating opposite
    ctx.strokeStyle = '#70d6ff';
    ctx.lineWidth = size > 60 ? 1.5 : 1;
    ctx.setLineDash([size > 60 ? 6 : 3, size > 60 ? 4 : 2]);
    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.38, -angle * 0.8, -angle * 0.8 + Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    // 10 Energy Coils / Arc Segments radiating
    const numCoils = 10;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    for (let i = 0; i < numCoils; i++) {
      const theta = (i * 2 * Math.PI) / numCoils;
      ctx.save();
      ctx.rotate(theta);

      ctx.fillStyle = energy > 1.3 ? '#ffffff' : baseColor;
      ctx.globalAlpha = 0.75 + (Math.sin(angle * 3 + i) * 0.2);
      const segW = size > 60 ? 8 : 2.5;
      const segH = size > 60 ? 14 : 4.5;
      const segR = size * 0.28;
      ctx.fillRect(-segW / 2, segR, segW, segH);

      if (size > 60) {
        ctx.strokeStyle = '#f1c40f';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, segR + segH);
        ctx.lineTo(0, size * 0.43);
        ctx.stroke();
      }
      ctx.restore();
    }
    ctx.restore();

    // Inner Core Ring
    ctx.save();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = size > 60 ? 2.5 : 1.5;
    ctx.shadowColor = baseColor;
    ctx.shadowBlur = size > 60 ? 15 * energy : 6;
    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.22, 0, Math.PI * 2);
    ctx.stroke();

    // Inner Glowing Core (Heart of Arc Reactor)
    const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * 0.2);
    coreGrad.addColorStop(0, '#ffffff');
    coreGrad.addColorStop(0.4, baseColor);
    coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0.4)');
    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.2, 0, Math.PI * 2);
    ctx.fill();

    // Center Stark triangle crystal for large canvas
    if (size > 60) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle * 1.5);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      const r = size * 0.11;
      for (let j = 0; j < 3; j++) {
        const a = (j * 2 * Math.PI) / 3 - Math.PI / 2;
        const x = r * Math.cos(a);
        const y = r * Math.sin(a);
        if (j === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    }
    ctx.restore();
  },

  pulseArcReactor() {
    this.arcPulseEnergy = 2.4;
    const persona = this.personas[this.activePersona] || this.personas.jarvis;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.16);
    } catch (e) {}
    console.log(`[STARK] Arc Reactor pulsed at 100% capacity by ${persona.name}.`);
  },

  // ==================== HANDS-FREE VOICE WAKE-WORD RECOGNITION ====================
  toggleVoiceRecognition() {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) {
      alert("🎙️ Web Speech API is not supported in this browser.\n\nPlease use Google Chrome, Chromium, Microsoft Edge, or activate the Linux Mint offline VOSK voice engine via:\n  mint-agent --listen");
      return;
    }

    if (this.isListening && this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {}
      this.isListening = false;
      this.updateVoiceWakeUI(false);
      return;
    }

    try {
      this.recognition = new SpeechRec();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;

      const persona = this.personas[this.activePersona] || this.personas.jarvis;
      this.recognition.lang = persona.voiceLang || 'en-GB';

      this.recognition.onstart = () => {
        this.isListening = true;
        this.updateVoiceWakeUI(true);
        this.pulseArcReactor();
      };

      this.recognition.onresult = (event) => {
        this.isListening = false;
        this.updateVoiceWakeUI(false);
        if (event.results && event.results[0] && event.results[0][0]) {
          const spoken = event.results[0][0].transcript;
          console.log("[STARK VOICE RECOGNITION]:", spoken);
          this.pulseArcReactor();
          this.sendWebUIMessage(spoken);
        }
      };

      this.recognition.onerror = (event) => {
        console.warn("[STARK VOICE ERROR]:", event.error);
        this.isListening = false;
        this.updateVoiceWakeUI(false);
        if (event.error === 'not-allowed') {
          alert("Microphone permission was denied. Please allow microphone access in your browser to talk to J.A.R.V.I.S., F.R.I.D.A.Y., or E.D.I.T.H.");
        }
      };

      this.recognition.onend = () => {
        this.isListening = false;
        this.updateVoiceWakeUI(false);
      };

      this.recognition.start();
    } catch (err) {
      console.error("[STARK VOICE INIT FAILED]:", err);
      this.isListening = false;
      this.updateVoiceWakeUI(false);
    }
  },

  updateVoiceWakeUI(listening) {
    const simBtn = document.getElementById('simVoiceWakeBtn');
    const simText = document.getElementById('simVoiceWakeText');
    const starkBtn = document.getElementById('starkMicBtn');
    const starkText = document.getElementById('starkMicText');

    if (listening) {
      if (simBtn) {
        simBtn.style.background = '#ff4757';
        simBtn.style.boxShadow = '0 0 14px #ff4757';
      }
      if (simText) simText.innerText = 'Listening...';
      if (starkBtn) {
        starkBtn.style.background = '#ff4757';
        starkBtn.style.color = '#fff';
        starkBtn.style.boxShadow = '0 0 15px #ff4757';
      }
      if (starkText) starkText.innerText = 'Listening...';
    } else {
      if (simBtn) {
        simBtn.style.background = 'linear-gradient(135deg, #00cec9, #0984e3)';
        simBtn.style.boxShadow = '0 0 8px rgba(0,206,201,0.5)';
      }
      if (simText) simText.innerText = 'Voice Wake';
      if (starkBtn) {
        starkBtn.style.background = 'linear-gradient(135deg, #00cec9, #0984e3)';
        starkBtn.style.color = '#000';
        starkBtn.style.boxShadow = 'none';
      }
      if (starkText) starkText.innerText = 'Voice Wake (Mic)';
    }
  },

  // ==================== STARK TAB SWITCHER ====================
  switchStarkTab(tabId, btn) {
    const win = document.getElementById('win-marvel');
    if (!win) return;

    const panes = win.querySelectorAll('.dl-tab-pane');
    panes.forEach(p => {
      p.style.display = 'none';
      p.classList.remove('active');
    });

    const target = document.getElementById(tabId);
    if (target) {
      target.style.display = 'block';
      target.classList.add('active');
    }

    const tabBtns = win.querySelectorAll('.dl-tab-nav .dl-tab-btn');
    tabBtns.forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    if (tabId === 'stark-tab-holo') {
      this.pulseArcReactor();
    } else if (tabId === 'stark-tab-skills') {
      if (target) target.style.display = 'flex';
      this.init3DCadCanvas();
    }
  },

  // ==================== MARVEL TACTICAL SKILLS ENGINE ====================
  executeSkill(skillId, param) {
    const consoleEl = document.getElementById('skillOutputConsole');
    const badgeEl = document.getElementById('skillStatusBadge');

    if (skillId === 'friday_fight_pattern') {
      this.playStarkSFX('lock');
      setTimeout(() => this.playStarkSFX('repulsor'), 250);
      if (badgeEl) {
        badgeEl.innerText = "ACTIVE: F.R.I.D.A.Y.";
        badgeEl.style.color = "#ff4757";
      }
      if (consoleEl) {
        consoleEl.innerHTML = `
          <div style="border-left: 3px solid #ff4757; padding-left: 8px; margin-bottom: 6px;">
            <strong style="color:#ff4757;">⚡ F.R.I.D.A.Y.: COMBAT THREAT PATTERN SCAN</strong><br>
            <span style="color:#aaa;">Target Signature:</span> <span style="color:#ff6b6b;">TCP_SYN_FLOOD_PROBE</span> (DEFCON 2)<br>
            <span style="color:#aaa;">Source / Target:</span> 185.220.101.42 -> 0.0.0.0:8080 (1280 pps)<br>
            <span style="color:#aaa;">Trajectory:</span> Inbound External Reconnaissance Sweep
          </div>
          <div style="background:#090d12; border:1px solid rgba(255,71,87,0.3); border-radius:4px; padding:6px; margin-top:4px;">
            <strong style="color:#2ecc71;">Countermeasures Calculated & Armed:</strong><br>
            • <span style="color:#70d6ff;">TCP_RST_INJECTION</span>: Force-sever hostile handshake (&lt;0.5ms)<br>
            • <span style="color:#f1c40f;">SYN_COOKIE_CLAMP</span>: sysctl net.ipv4.tcp_syncookies=1<br>
            • <span style="color:#ff4757;">INGRESS_DROP</span>: Dynamic firewall blackhole for 185.220.101.42
          </div>
        `;
      }
      const line = "Boss, I've scanned their fight pattern! It's an asymmetric SYN flood probe from 185.220.101.42. Countermeasures calculated and ready to fire—let's kick their ass!";
      this.speak(line, true);
      this.printTermLine(`[F.R.I.D.A.Y.] "${line}"`);

    } else if (skillId === 'edith_orbital_recon') {
      const target = param || "185.220.101.42";
      this.playStarkSFX('lock');
      setTimeout(() => this.playStarkSFX('neutralized'), 300);
      if (badgeEl) {
        badgeEl.innerText = "ACTIVE: E.D.I.T.H.";
        badgeEl.style.color = "#00b4d8";
      }
      if (consoleEl) {
        consoleEl.innerHTML = `
          <div style="border-left: 3px solid #00b4d8; padding-left: 8px; margin-bottom: 6px;">
            <strong style="color:#00b4d8;">🕶️ E.D.I.T.H.: TACTICAL DRONE DEFENSE STRIKE</strong><br>
            <span style="color:#aaa;">Target Locked:</span> <span style="color:#ff4757;">${target}</span><br>
            <span style="color:#aaa;">Satellite Uplink:</span> STARK-ORBITAL-7 (AR Tracking Active)<br>
            <span style="color:#aaa;">Status:</span> <strong style="color:#2ecc71;">TARGET NEUTRALIZED</strong>
          </div>
          <div style="background:#090d12; border:1px solid rgba(0,180,216,0.3); border-radius:4px; padding:6px; margin-top:4px;">
            <strong style="color:#2ecc71;">Deployments Executed:</strong><br>
            • Orbital drone swarm locked and redirected to blackhole ${target}<br>
            • Null-route rule injected into Linux Mint iptables ingress filter<br>
            • Connection severed with TCP RST frames; antibody synthesized
          </div>
        `;
      }
      const line = `Target ${target} locked in crosshairs. Tactical defensive strike executed. Hostile connection neutralized.`;
      this.speak(line, true);
      this.printTermLine(`[E.D.I.T.H.] "${line}"`);

    } else if (skillId === 'jarvis_cad_diagnostics') {
      this.playStarkSFX('chime');
      this.init3DCadCanvas();
      if (badgeEl) {
        badgeEl.innerText = "ACTIVE: J.A.R.V.I.S.";
        badgeEl.style.color = "#00d2d3";
      }
      if (consoleEl) {
        consoleEl.innerHTML = `
          <div style="border-left: 3px solid #00d2d3; padding-left: 8px; margin-bottom: 6px;">
            <strong style="color:#00d2d3;">🤖 J.A.R.V.I.S.: 3D HOLOGRAPHIC CAD TELEMETRY</strong><br>
            <span style="color:#aaa;">Mark 85 Reactor:</span> <span style="color:#2ecc71;">8.24 GW (100% Efficiency)</span><br>
            <span style="color:#aaa;">Core Temp:</span> 38.4 °C | <span style="color:#aaa;">Swappiness:</span> 10 (Locked)<br>
            <span style="color:#aaa;">Cinnamon Compositor:</span> <strong style="color:#70d6ff;">60.0 FPS Butter-Smooth</strong>
          </div>
          <div style="background:#090d12; border:1px solid rgba(0,210,211,0.3); border-radius:4px; padding:6px; margin-top:4px;">
            <strong style="color:#00d2d3;">Hardware Governors Online:</strong><br>
            • Cinnamon compositor VSync active; zero desktop stutter<br>
            • Background Nice (+10) priority applied to agent daemon<br>
            • 3D wireframe mesh projected on CAD viewport
          </div>
        `;
      }
      const line = "Right away, sir. All Linux Mint kernel parameters, Cinnamon compositor frames, and Arc Reactor diagnostics are holding at pristine baseline.";
      this.speak(line, true);
      this.printTermLine(`[J.A.R.V.I.S.] "${line}"`);

    } else if (skillId === 'vision_mind_stone') {
      this.playStarkSFX('chime');
      if (badgeEl) {
        badgeEl.innerText = "ACTIVE: V.I.S.I.O.N.";
        badgeEl.style.color = "#f1c40f";
      }
      if (consoleEl) {
        consoleEl.innerHTML = `
          <div style="border-left: 3px solid #f1c40f; padding-left: 8px; margin-bottom: 6px;">
            <strong style="color:#f1c40f;">💎 V.I.S.I.O.N.: MIND STONE ANOMALY FORECAST</strong><br>
            <span style="color:#aaa;">Consciousness:</span> <span style="color:#2ecc71;">ALIGNED</span> | Entropy: 0.12 (Order)<br>
            <span style="color:#aaa;">Synthesized Antibodies:</span> 16 Active Rules in Kernel
          </div>
          <div style="background:#090d12; border:1px solid rgba(241,196,15,0.3); border-radius:4px; padding:6px; margin-top:4px;">
            <strong style="color:#f1c40f;">Forecasted Threat Preemptions:</strong><br>
            • <span style="color:#fff;">Port Scan Sweep</span> (89% prob): SYN cookies armed<br>
            • <span style="color:#fff;">Payload in /tmp</span> (74% prob): inotify write watchdog active<br>
            • <span style="color:#fff;">Credential Probe</span> (62% prob): Canary decoys primed
          </div>
        `;
      }
      const line = "I perceive the flow of data across the network. By anticipating anomalous variance before it manifests, we preserve equilibrium without malice.";
      this.speak(line, true);
      this.printTermLine(`[V.I.S.I.O.N.] "${line}"`);

    } else if (skillId === 'karen_suit_mentor') {
      const mode = param || "taser web";
      this.playStarkSFX('chime');
      if (badgeEl) {
        badgeEl.innerText = "ACTIVE: K.A.R.E.N.";
        badgeEl.style.color = "#ff6b6b";
      }
      const descText = mode.includes('taser') ? '• Electrifies & terminates unauthorized inbound sockets with TCP RST frames' :
             (mode.includes('ricochet') ? '• Redirects unauthorized scanners into canary honeypot ports' :
              '• Guarded Safe Mode with human confirmation on all bash executions');
      if (consoleEl) {
        consoleEl.innerHTML = `
          <div style="border-left: 3px solid #ff6b6b; padding-left: 8px; margin-bottom: 6px;">
            <strong style="color:#ff6b6b;">🕷️ K.A.R.E.N.: SUIT MODE CONFIGURED</strong><br>
            <span style="color:#aaa;">Active Loadout:</span> <span style="color:#fff; font-weight:bold;">${mode.toUpperCase()}</span><br>
            <span style="color:#aaa;">Category:</span> Tactical Combat & User Protection
          </div>
          <div style="background:#090d12; border:1px solid rgba(255,107,107,0.3); border-radius:4px; padding:6px; margin-top:4px;">
            <strong style="color:#ff6b6b;">Mode Capabilities:</strong><br>
            ${descText}
          </div>
        `;
      }
      const line = `You got it! I've activated the ${mode.toUpperCase()} loadout. Safety parameters are active and ready!`;
      this.speak(line, true);
      this.printTermLine(`[K.A.R.E.N.] "${line}"`);

    } else if (skillId === 'jocasta_electronic_warfare') {
      this.playStarkSFX('repulsor');
      if (badgeEl) {
        badgeEl.innerText = "ACTIVE: J.O.C.A.S.T.A.";
        badgeEl.style.color = "#a29bfe";
      }
      if (consoleEl) {
        consoleEl.innerHTML = `
          <div style="border-left: 3px solid #a29bfe; padding-left: 8px; margin-bottom: 6px;">
            <strong style="color:#a29bfe;">🛡️ J.O.C.A.S.T.A.: ZERO-TRUST ELECTRONIC WARFARE</strong><br>
            <span style="color:#aaa;">Egress Shield:</span> <span style="color:#2ecc71;">ZERO-TRUST ACTIVE</span><br>
            <span style="color:#aaa;">Honeytoken Status:</span> 3 Decoys Armed & Listening
          </div>
          <div style="background:#090d12; border:1px solid rgba(162,155,254,0.3); border-radius:4px; padding:6px; margin-top:4px;">
            <strong style="color:#a29bfe;">Deployed Canary Tripwires:</strong><br>
            • Port 2222: Decoy SSH Honeypot (Listening)<br>
            • Port 8888: Decoy Web Admin Console (Tripwire)<br>
            • /tmp/.canary_aws_keys: Bait Canary Token (Inotify Armed)
          </div>
        `;
      }
      const line = "Jocasta electronic warfare grid engaged. Honeytoken decoys deployed on perimeter ports. Any hostile touch triggers instant quarantine.";
      this.speak(line, true);
      this.printTermLine(`[J.O.C.A.S.T.A.] "${line}"`);
    }
  },

  // ==================== 3D HOLOGRAPHIC CAD WIREFRAME CANVAS ====================
  init3DCadCanvas() {
    if (this._3dCadRunning) return;
    const canvas = document.getElementById('stark3DCadCanvas');
    if (!canvas) return;
    this._3dCadRunning = true;

    const ctx = canvas.getContext('2d');
    let rotX = 15;
    let rotY = 0;

    // 3D Wireframe Vertices of an Iron Man Mark-85 Armor Helmet / Cube Mesh
    const nodes = [
      [-35, -45, -35], [35, -45, -35], [35, 35, -35], [-35, 35, -35], // back
      [-45, -45,  35], [45, -45,  35], [45, 45,  35], [-45, 45,  35], // front
      [-18, -18,  40], [-4, -18,  40], [-4, -8,  40], [-18, -8,  40], // left eye
      [ 18, -18,  40], [ 4, -18,  40], [ 4, -8,  40], [ 18, -8,  40], // right eye
      [  0,  12,  42], [ -12, 30, 40], [ 12, 30, 40]                  // mouth
    ];

    const edges = [
      [0,1],[1,2],[2,3],[3,0], // back
      [4,5],[5,6],[6,7],[7,4], // front
      [0,4],[1,5],[2,6],[3,7], // connecting
      [8,9],[9,10],[10,11],[11,8], // eye L
      [12,13],[13,14],[14,15],[15,12], // eye R
      [16,17],[17,18],[18,16] // chin
    ];

    const render = () => {
      const c = document.getElementById('stark3DCadCanvas');
      if (!c) {
        this._3dCadRunning = false;
        return;
      }
      rotY += 1.2;
      rotX = 15 + Math.sin(rotY * 0.02) * 10;

      ctx.fillStyle = '#070b10';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Radar grid background
      ctx.strokeStyle = 'rgba(0, 245, 212, 0.06)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 20) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      const radX = rotX * Math.PI / 180;
      const radY = rotY * Math.PI / 180;
      const cosX = Math.cos(radX), sinX = Math.sin(radX);
      const cosY = Math.cos(radY), sinY = Math.sin(radY);

      const proj = [];
      const cx = canvas.width / 2;
      const cy = canvas.height / 2 + 10;

      for (let i = 0; i < nodes.length; i++) {
        const x = nodes[i][0];
        const y = nodes[i][1];
        const z = nodes[i][2];

        // Rotate Y
        const x1 = x * cosY + z * sinY;
        const z1 = -x * sinY + z * cosY;

        // Rotate X
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;

        // Perspective projection
        const fov = 200;
        const scale = fov / (fov + z2 + 90);
        proj.push([cx + x1 * scale, cy + y2 * scale]);
      }

      // Draw Edges
      const p = this.personas[this.activePersona] || this.personas.aradhya;
      ctx.strokeStyle = p.color || '#00f5d4';
      ctx.lineWidth = 1.5;
      for (let i = 0; i < edges.length; i++) {
        const p1 = proj[edges[i][0]];
        const p2 = proj[edges[i][1]];
        ctx.beginPath();
        ctx.moveTo(p1[0], p1[1]);
        ctx.lineTo(p2[0], p2[1]);
        ctx.stroke();
      }

      // Glowing Vertices
      ctx.fillStyle = '#fff';
      for (let i = 0; i < proj.length; i++) {
        ctx.fillRect(proj[i][0] - 1.5, proj[i][1] - 1.5, 3, 3);
      }

      requestAnimationFrame(render);
    };

    render();
  },

  // ==================== E.D.I.T.H. TACTICAL AR SCANNER ====================
  runEdithTacticalScan() {
    this.pulseArcReactor();
    this.speak("Accessing Stark orbital defense grid. Real-time tactical scan of local network and processes underway.", true);
    
    const list = document.getElementById('edithTargetsList');
    if (list) {
      list.innerHTML = `
        <div style="background:#131a21; border-left:4px solid #f39c12; border-radius:4px; padding:10px; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <div style="display:flex; gap:8px; align-items:center;">
              <span style="color:#f39c12; font-weight:bold; font-size:0.8rem;">[TARGET-EDITH-01] ELEVATED (78%)</span>
              <span style="color:#aaa; font-size:0.75rem;">NETWORK_SOCKET</span>
            </div>
            <strong style="color:#fff; font-size:0.85rem;">0.0.0.0:8080 (Wildcard HTTP Service)</strong>
            <p style="margin:2px 0 0 0; font-size:0.72rem; color:#888;">Classification: Unencrypted Local LAN Exposure • Action: SEVER_SOCKET</p>
          </div>
          <button class="dl-btn-secondary" style="background:#f39c12; color:#000; font-weight:bold; font-size:0.72rem; padding:4px 10px;" onclick="AgentSimulator.sendWebUIMessage('counter threats')">⚡ Sever Socket</button>
        </div>

        <div style="background:#131a21; border-left:4px solid #e74c3c; border-radius:4px; padding:10px; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <div style="display:flex; gap:8px; align-items:center;">
              <span style="color:#e74c3c; font-weight:bold; font-size:0.8rem;">[TARGET-EDITH-02] HOSTILE (92%)</span>
              <span style="color:#aaa; font-size:0.75rem;">REMOTE_INGRESS</span>
            </div>
            <strong style="color:#fff; font-size:0.85rem;">185.220.101.42 (Tor Exit Node Probe)</strong>
            <p style="margin:2px 0 0 0; font-size:0.72rem; color:#888;">Classification: Port Scan / Reconnaissance Probe • Action: NULL_ROUTE_DROP</p>
          </div>
          <button class="dl-btn-secondary" style="background:#e74c3c; color:#fff; font-weight:bold; font-size:0.72rem; padding:4px 10px;" onclick="AgentSimulator.sendWebUIMessage('lockdown')">🚫 Null-Route IP</button>
        </div>

        <div style="background:#131a21; border-left:4px solid #2ecc71; border-radius:4px; padding:10px; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <div style="display:flex; gap:8px; align-items:center;">
              <span style="color:#2ecc71; font-weight:bold; font-size:0.8rem;">[TARGET-EDITH-03] NOMINAL (2%)</span>
              <span style="color:#aaa; font-size:0.75rem;">DESKTOP_PROCESS</span>
            </div>
            <strong style="color:#fff; font-size:0.85rem;">PID 1240 (/usr/bin/cinnamon)</strong>
            <p style="margin:2px 0 0 0; font-size:0.72rem; color:#888;">Classification: Verified Linux Mint Cinnamon Compositor (60fps Fluidity) • Action: ALLOW</p>
          </div>
          <span class="dl-badge" style="border-color:#2ecc71; color:#2ecc71;">VERIFIED 60FPS</span>
        </div>

        <div style="background:#131a21; border-left:4px solid #2ecc71; border-radius:4px; padding:10px; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <div style="display:flex; gap:8px; align-items:center;">
              <span style="color:#2ecc71; font-weight:bold; font-size:0.8rem;">[TARGET-EDITH-04] NOMINAL (0%)</span>
              <span style="color:#aaa; font-size:0.75rem;">SECURITY_WATCHDOG</span>
            </div>
            <strong style="color:#fff; font-size:0.85rem;">PID 2108 (/usr/sbin/ufw-sentry)</strong>
            <p style="margin:2px 0 0 0; font-size:0.72rem; color:#888;">Classification: Active Cyber Guardian Kernel Sentry Daemon • Action: PRIORITIZE</p>
          </div>
          <span class="dl-badge" style="border-color:#2ecc71; color:#2ecc71;">SHIELD ACTIVE</span>
        </div>
      `;
    }

    this.sendWebUIMessage("edith scan");
  },

  // ==================== HOUSE PARTY MULTI-AGENT PROTOCOL ====================
  executeHousePartyCoordinated() {
    this.pulseArcReactor();
    this.sendWebUIMessage("engage house party protocol");
    this.speak("House Party Protocol confirmed. All 5 Marvel Series AI Agents deployed simultaneously across Linux Mint.", true);
  },

  speakMultiAgentReport(agentId, customText) {
    const persona = this.personas[agentId] || this.personas.jarvis;
    const reports = {
      jarvis: "Sir, system diagnostic sweeps confirmed. Hardware parameters nominal, swappiness locked at 10.",
      friday: "Boss, tactical combat socket watchers armed. Zero unauthorized listeners on port grid.",
      edith: "Orbital perimeter sentry locked. External IP ingress points actively filtered and traced.",
      vision: "Digital immune memory synthesized. 16 adaptive antibodies maintaining system equilibrium.",
      karen: "All safety checks passed! Your PC is protected and running butter-smooth."
    };

    const text = customText || reports[agentId] || persona.greeting;
    this.pulseArcReactor();

    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(text);
        utter.rate = persona.rate || 1.0;
        utter.pitch = persona.pitch || 1.0;
        utter.lang = persona.voiceLang || 'en-GB';

        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          const matched = voices.find(v => v.lang.toLowerCase().startsWith(persona.voiceLang.toLowerCase())) ||
                          voices.find(v => v.lang.toLowerCase().startsWith('en'));
          if (matched) utter.voice = matched;
        }

        window.speechSynthesis.speak(utter);
      } catch (e) {
        console.warn("Speech error:", e);
      }
    }

    this.printTermLine(`[${persona.name}] "${text}"`);
  },

  // ==================== STARK WEB AUDIO SFX ENGINE ====================
  playStarkSFX(type) {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      if (type === 'repulsor' || type === 'charge') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(280, now);
        osc.frequency.exponentialRampToValueAtTime(1900, now + 0.45);
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(600, now);
        filter.frequency.exponentialRampToValueAtTime(3200, now + 0.45);
        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.25, now + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.52);
      } else if (type === 'lock' || type === 'target') {
        [0, 0.1].forEach((delay, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          const freq = idx === 0 ? 2600 : 3400;
          osc.frequency.setValueAtTime(freq, now + delay);
          gain.gain.setValueAtTime(0.2, now + delay);
          gain.gain.exponentialRampToValueAtTime(0.01, now + delay + 0.08);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + delay);
          osc.stop(now + delay + 0.09);
        });
      } else if (type === 'neutralized' || type === 'kill') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1400, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.25);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.36);
      } else if (type === 'chime' || type === 'comms') {
        [523.25, 659.25, 783.99].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + (idx * 0.08));
          gain.gain.setValueAtTime(0.18, now + (idx * 0.08));
          gain.gain.exponentialRampToValueAtTime(0.005, now + (idx * 0.08) + 0.22);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + (idx * 0.08));
          osc.stop(now + (idx * 0.08) + 0.25);
        });
      }
    } catch (e) {
      // AudioContext could be blocked by browser policy until interaction
    }
  },

  // ==================== IRON MAN VISOR TACTICAL HUD ====================
  initStarkHUD() {
    window.addEventListener('keydown', (e) => {
      const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
      if (tag === 'input' || tag === 'textarea') return;

      if (e.key === 'h' || e.key === 'H') {
        this.toggleStarkHUD();
      } else if (e.key === 'Escape' && this.isStarkHUDOpen) {
        this.closeStarkHUD();
      }
    });

    const overlay = document.getElementById('stark-hud-overlay');
    if (overlay) {
      overlay.addEventListener('mousemove', (e) => {
        const rect = overlay.getBoundingClientRect();
        this.hudTargetX = e.clientX - rect.left;
        this.hudTargetY = e.clientY - rect.top;
      });
    }

    const hudLoop = () => {
      if (this.isStarkHUDOpen) {
        this.renderHUDCanvases();
      }
      requestAnimationFrame(hudLoop);
    };
    requestAnimationFrame(hudLoop);
  },

  toggleStarkHUD() {
    if (this.isStarkHUDOpen) {
      this.closeStarkHUD();
    } else {
      this.openStarkHUD();
    }
  },

  openStarkHUD() {
    const overlay = document.getElementById('stark-hud-overlay');
    if (!overlay) return;
    overlay.style.display = 'block';
    this.isStarkHUDOpen = true;
    this.hudCurX = window.innerWidth / 2;
    this.hudCurY = window.innerHeight / 2;
    this.hudTargetX = this.hudCurX;
    this.hudTargetY = this.hudCurY;

    const p = this.personas[this.activePersona] || this.personas.aradhya || this.personas.jarvis;
    const callout = document.getElementById('hudActivePersonaCallout');
    if (callout) {
      callout.innerText = `[ ${p.name} INTERCOM ONLINE ]`;
      callout.style.color = p.color;
      callout.style.textShadow = `0 0 8px ${p.color}`;
    }

    const transcript = document.getElementById('hudLiveTranscript');
    if (transcript) {
      transcript.innerText = `"${p.prefix} Mark-85 Visor HUD active. All targeting reticles, orbital satellite sentries, and Stark emergency protocols are primed."`;
    }

    this.playStarkSFX('repulsor');
    this.speak(`${p.prefix} Mark 85 Visor HUD active. Ready for targeting.`, true);
  },

  closeStarkHUD() {
    const overlay = document.getElementById('stark-hud-overlay');
    if (overlay) overlay.style.display = 'none';
    this.isStarkHUDOpen = false;
  },

  renderHUDCanvases() {
    // 1. Render Mouse Reticle Canvas
    const canvas = document.getElementById('starkReticleCanvas');
    if (canvas) {
      if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.hudCurX += (this.hudTargetX - this.hudCurX) * 0.15;
        this.hudCurY += (this.hudTargetY - this.hudCurY) * 0.15;
        this.hudReticleAngle += 0.02;

        const cx = this.hudCurX;
        const cy = this.hudCurY;
        const p = this.personas[this.activePersona] || this.personas.aradhya || this.personas.jarvis;
        const col = p.color || '#00f5d4';

        // Outer rotating dashed targeting ring
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(this.hudReticleAngle);
        ctx.strokeStyle = col;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([8, 8]);
        ctx.beginPath();
        ctx.arc(0, 0, 48, 0, Math.PI * 2);
        ctx.stroke();

        // Inner counter-rotating brackets
        ctx.rotate(-this.hudReticleAngle * 2.5);
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.setLineDash([12, 18]);
        ctx.beginPath();
        ctx.arc(0, 0, 32, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        // Crosshairs
        ctx.strokeStyle = col;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx - 20, cy);
        ctx.lineTo(cx - 8, cy);
        ctx.moveTo(cx + 8, cy);
        ctx.lineTo(cx + 20, cy);
        ctx.moveTo(cx, cy - 20);
        ctx.lineTo(cx, cy - 8);
        ctx.moveTo(cx, cy + 8);
        ctx.lineTo(cx, cy + 20);
        ctx.stroke();

        // Telemetry text beside reticle
        ctx.fillStyle = col;
        ctx.font = '10px monospace';
        ctx.fillText(`X: ${Math.round(cx)}  Y: ${Math.round(cy)}`, cx + 55, cy - 12);
        ctx.fillStyle = '#f1c40f';
        ctx.fillText(`RNG: 0.42m [LOCKED]`, cx + 55, cy + 4);
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.fillText(`TARGET: [EDITH-01]`, cx + 55, cy + 18);
      }
    }

    // 2. Render Audio Spectrum Canvas
    const audioCanvas = document.getElementById('starkAudioSpectrumCanvas');
    if (audioCanvas) {
      const actx = audioCanvas.getContext('2d');
      if (actx) {
        actx.clearRect(0, 0, audioCanvas.width, audioCanvas.height);
        const numBars = 16;
        const barWidth = audioCanvas.width / numBars - 2;
        const isSpeaking = window.speechSynthesis && window.speechSynthesis.speaking;

        for (let i = 0; i < numBars; i++) {
          const h = isSpeaking ? (4 + Math.random() * 18) : (2 + Math.sin(Date.now() * 0.005 + i) * 2);
          const x = i * (barWidth + 2);
          const y = audioCanvas.height - h;
          actx.fillStyle = isSpeaking ? '#00f5d4' : 'rgba(0,245,212,0.3)';
          actx.fillRect(x, y, barWidth, h);
        }
      }
    }
  },

  // ==================== MULTI-AGENT THEATRE LIVE ====================
  runMultiAgentTheatreLive() {
    this.playStarkSFX('repulsor');
    const theatre = [
      {
        agent: "A.R.A.D.H.Y.A.",
        color: "#00f5d4",
        speech: "Sovereign perimeter sensors triggered. Inbound reconnaissance vector identified. Jarvis, take diagnostic telemetry.",
        sfx: "chime"
      },
      {
        agent: "J.A.R.V.I.S.",
        color: "#00d2d3",
        speech: "Right away, Aradhya. Wildcard listener detected on local port 8080. Friday, take combat surveillance.",
        sfx: "chime"
      },
      {
        agent: "F.R.I.D.A.Y.",
        color: "#ff4757",
        speech: "Right on it, boss! Edith, calibrate orbital satellite grid to inbound IP 185.220.101.42.",
        sfx: "target"
      },
      {
        agent: "E.D.I.T.H.",
        color: "#00b4d8",
        speech: "Target locked in crosshairs. Inbound probe origin: Tor Exit Node. Threat index: 92%. Awaiting strike authorization.",
        sfx: "lock"
      },
      {
        agent: "F.R.I.D.A.Y.",
        color: "#ff4757",
        speech: "Authorizing Instant Kill Mode! Firing TCP RST frames and severing socket... Target neutralized, boss!",
        sfx: "neutralized"
      },
      {
        agent: "V.I.S.I.O.N.",
        color: "#f1c40f",
        speech: "The digital matrix is returning to harmony. Synthesizing antibody into kernel memory to immunize against this signature.",
        sfx: "chime"
      },
      {
        agent: "K.A.R.E.N.",
        color: "#ff6b6b",
        speech: "All clear! Safety perimeter secured and desktop compositor is holding rock-solid at 60fps.",
        sfx: "chime"
      }
    ];

    let step = 0;
    const transcript = document.getElementById('hudLiveTranscript');

    const nextStep = () => {
      if (step >= theatre.length) {
        if (transcript) {
          transcript.innerHTML = `<strong style="color:#2ecc71;">✓ Multi-Agent Mission Accomplished. Aradhya & all Marvel intelligence nodes deployed in harmony.</strong>`;
        }
        return;
      }
      const item = theatre[step];
      if (transcript) {
        transcript.innerHTML = `<strong style="color:${item.color};">[${item.agent}]</strong> "${item.speech}"`;
      }
      this.playStarkSFX(item.sfx);
      this.printTermLine(`[${item.agent}] "${item.speech}"`);

      const key = item.agent.toLowerCase().replace(/[\.\s]/g, '');
      this.speakMultiAgentReport(key, item.speech);

      step++;
      setTimeout(nextStep, 2800);
    };

    nextStep();
  },

  // ==================== AUTHENTIC LINUX MINT WELCOME SCREEN TABS ====================
  switchWelcomeTab(tabId, el) {
    if (el) {
      document.querySelectorAll('.welcome-nav-item').forEach(item => item.classList.remove('active'));
      el.classList.add('active');
    }

    const container = document.getElementById('welcomeContent');
    if (!container) return;

    if (tabId === 'first-steps') {
      container.innerHTML = `
        <div class="welcome-hero">
          <svg class="welcome-hero-logo" viewBox="0 0 40 40" fill="none">
            <rect width="36" height="36" x="2" y="2" rx="9" fill="#87bd5c"/>
            <path d="M11 12 V24 C11 26.5 13 28.5 15.5 28.5 H21 V24.5 H16 V12 H11 Z" fill="#ffffff"/>
            <path d="M21 17 C19.5 17 18.5 18 18.5 19.5 V28.5 H22 V22.5 C22 21.8 22.5 21.3 23.2 21.3 C23.9 21.3 24.5 21.8 24.5 22.5 V28.5 H28 V22.5 C28 21.8 28.5 21.3 29.2 21.3 C29.9 21.3 30.5 21.8 30.5 22.5 V28.5 H34 V19.5 C34 18 33 17 31.5 17 C30 17 29 17.8 28.3 18.8 C27.6 17.8 26.6 17 25.1 17 C23.6 17 22.6 17.8 22 18.8 V17 H21 Z" fill="#ffffff"/>
          </svg>
          <div>
            <h3>Welcome to Linux Mint 22.3 Cinnamon</h3>
            <p>Equipped with <strong>Aradhya OS</strong> — Sovereign AI Guardian & Marvel Series Tactical Agent Matrix. Enjoy a comfortable, butter-smooth desktop on modern rigs and 1GB RAM PCs alike.</p>
          </div>
        </div>
        <div class="welcome-grid">
          <div class="welcome-card">
            <h4><span>🍃</span> Desktop Colors & Mint-Y</h4>
            <p>Customize your Cinnamon desktop panels, Mint-Y dark themes, and signature Mint green accents.</p>
            <button class="welcome-btn" onclick="WindowManager.openApp('webui')">Launch MintPilot AI</button>
          </div>
          <div class="welcome-card">
            <h4><span>⚡</span> 1GB RAM Optimization</h4>
            <p>Tune kernel ZRAM compressed RAM swap (2.5x ratio) and Tier 0 Nano Mode with zero model RAM overhead.</p>
            <button class="welcome-btn" onclick="AgentSimulator.sendWebUIMessage('optimize for 1gb')">Optimize 1GB PC</button>
          </div>
          <div class="welcome-card">
            <h4><span>🌸</span> Marvel AI Network</h4>
            <p>Interact with J.A.R.V.I.S., F.R.I.D.A.Y., E.D.I.T.H., V.I.S.I.O.N., K.A.R.E.N., and J.O.C.A.S.T.A.</p>
            <button class="welcome-btn" onclick="WindowManager.openApp('marvel')">Open Marvel HQ</button>
          </div>
          <div class="welcome-card">
            <h4><span>🛡️</span> Cyber Defense Shield</h4>
            <p>DEFCON dynamic escalation, honeytoken decoys, active counter-measures, and digital immune antibodies.</p>
            <button class="welcome-btn" onclick="WindowManager.openApp('security')">Launch Defense</button>
          </div>
          <div class="welcome-card">
            <h4><span>💾</span> Download Bootable ISO</h4>
            <p>Create a bootable USB drive using Ventoy, Rufus, or BalenaEtcher with live offline installer.</p>
            <button class="welcome-btn" onclick="WindowManager.openApp('download')">Download ISO</button>
          </div>
          <div class="welcome-card">
            <h4><span>🔄</span> Update Manager</h4>
            <p>Keep your system and Aradhya Agent OS fully updated with 1-click in-place Git upgrades.</p>
            <button class="welcome-btn" onclick="AgentSimulator.openUpgradeModal()">Open Update Manager</button>
          </div>
        </div>
      `;
    } else if (tabId === 'aradhya-ai') {
      container.innerHTML = `
        <div class="welcome-hero" style="background: linear-gradient(135deg, #1b263b 0%, #0d1b2a 100%); border-color: #00b4d8;">
          <div style="font-size: 2.5rem;">🌸</div>
          <div>
            <h3>Aradhya AI & Marvel Series Cognitive Architecture</h3>
            <p>Switch between 7 specialized cinematic autonomous agent personas, each equipped with dedicated execution tools on Linux Mint.</p>
          </div>
        </div>
        <div class="welcome-grid">
          <div class="welcome-card">
            <h4 style="color: #00f5d4;"><span>🌸</span> A.R.A.D.H.Y.A.</h4>
            <p>Supreme Sovereign AI orchestrator unifying all defense, memory, and Marvel nodes.</p>
            <button class="welcome-btn" onclick="AgentSimulator.switchPersona('aradhya')">Engage Aradhya</button>
          </div>
          <div class="welcome-card">
            <h4 style="color: #00d2d3;"><span>🤖</span> J.A.R.V.I.S.</h4>
            <p>Cinnamon desktop governor, 3D holographic CAD schematics, and Arc Reactor diagnostics.</p>
            <button class="welcome-btn" onclick="AgentSimulator.switchPersona('jarvis')">Engage Jarvis</button>
          </div>
          <div class="welcome-card">
            <h4 style="color: #ff4757;"><span>⚡</span> F.R.I.D.A.Y.</h4>
            <p>Real-time combat fight pattern analysis, TCP RST socket clamps, and instant counter-strikes.</p>
            <button class="welcome-btn" onclick="AgentSimulator.switchPersona('friday')">Engage Friday</button>
          </div>
          <div class="welcome-card">
            <h4 style="color: #00b4d8;"><span>🕶️</span> E.D.I.T.H.</h4>
            <p>Orbital AR satellite reconnaissance, network perimeter lock, and drone defense firewall.</p>
            <button class="welcome-btn" onclick="AgentSimulator.switchPersona('edith')">Engage Edith</button>
          </div>
          <div class="welcome-card">
            <h4 style="color: #f1c40f;"><span>💎</span> V.I.S.I.O.N.</h4>
            <p>Mind Stone anomaly forecasting, threat entropy clustering, and ethical circuit governance.</p>
            <button class="welcome-btn" onclick="AgentSimulator.switchPersona('vision')">Engage Vision</button>
          </div>
          <div class="welcome-card">
            <h4 style="color: #ff6b6b;"><span>🕷️</span> K.A.R.E.N.</h4>
            <p>Suit mentor, web shooter configs (Taser, Ricochet, Baby Monitor), and plain-language coaching.</p>
            <button class="welcome-btn" onclick="AgentSimulator.switchPersona('karen')">Engage Karen</button>
          </div>
        </div>
      `;
    } else if (tabId === 'nano-1gb') {
      container.innerHTML = `
        <div class="welcome-hero" style="background: linear-gradient(135deg, #1b382b 0%, #11261b 100%); border-color: #87bd5c;">
          <div style="font-size: 2.5rem;">⚡</div>
          <div>
            <h3>Tier 0: Nano / 1GB RAM PC Native Compatibility</h3>
            <p>Engineered to deliver butter-smooth performance on vintage and low-spec PCs with 512MB to 1GB RAM without OOM freezing.</p>
          </div>
        </div>
        <div class="welcome-grid">
          <div class="welcome-card">
            <h4><span>📦</span> Kernel ZRAM RAM Compression</h4>
            <p>Compresses idle memory in RAM using zstd/lz4 at a 2.5:1 ratio, turning 1GB physical RAM into ~2.2GB virtual RAM with zero disk noise.</p>
            <button class="welcome-btn" onclick="AgentSimulator.sendWebUIMessage('zram status')">Check ZRAM Status</button>
          </div>
          <div class="welcome-card">
            <h4><span>🧠</span> Deterministic Zero-RAM Engine</h4>
            <p>Sub-millisecond micro-regex and rule engine with 0MB local model RAM overhead, keeping the entire agent footprint under 32MB.</p>
            <button class="welcome-btn" onclick="AgentSimulator.sendWebUIMessage('list models')">View Model Tiers</button>
          </div>
          <div class="welcome-card">
            <h4><span>⚙️</span> Kernel Low-RAM Governor</h4>
            <p>Enforces vm.swappiness=100 (for fast ZRAM compression), vm.vfs_cache_pressure=100, and automatic post-action garbage collection.</p>
            <button class="welcome-btn" onclick="AgentSimulator.sendWebUIMessage('optimize for 1gb')">Run 1-Click Optimizer</button>
          </div>
          <div class="welcome-card">
            <h4><span>🍃</span> Desktop Recommendations</h4>
            <p>For 1GB RAM PCs, Linux Mint XFCE or disabling Cinnamon software compositor window animations keeps the GUI fluid at 60fps.</p>
            <button class="welcome-btn" onclick="AgentSimulator.openSmoothnessModal()">Audit Hardware</button>
          </div>
        </div>
      `;
    } else if (tabId === 'cyber-defense') {
      container.innerHTML = `
        <div class="welcome-hero" style="background: linear-gradient(135deg, #2b1414 0%, #190c0c 100%); border-color: #e74c3c;">
          <div style="font-size: 2.5rem;">🛡️</div>
          <div>
            <h3>Autonomous Cybersecurity & Digital Immune Memory</h3>
            <p>Aradhya protects your workstation with dynamic DEFCON threat escalation, honeytokens, and predictive immunization.</p>
          </div>
        </div>
        <div class="welcome-grid">
          <div class="welcome-card">
            <h4><span>🚨</span> Dynamic DEFCON Posture</h4>
            <p>Real-time threat evaluation across open sockets, rogue pids, and network scanners with automated escalation.</p>
            <button class="welcome-btn" onclick="AgentSimulator.sendWebUIMessage('defcon')">Inspect DEFCON</button>
          </div>
          <div class="welcome-card">
            <h4><span>🪤</span> Canary Honeytokens</h4>
            <p>Deploys decoy fake credentials and trap ports. Any interaction triggers instant defensive containment.</p>
            <button class="welcome-btn" onclick="AgentSimulator.sendWebUIMessage('deploy decoys')">Deploy Decoys</button>
          </div>
          <div class="welcome-card">
            <h4><span>🧬</span> Digital Immune Memory</h4>
            <p>Synthesizes adaptive digital antibodies against novel attack patterns to permanently immunize your PC.</p>
            <button class="welcome-btn" onclick="AgentSimulator.sendWebUIMessage('immune status')">View Antibodies</button>
          </div>
          <div class="welcome-card">
            <h4><span>🛑</span> Safety Circuit Breaker</h4>
            <p>Agent self-countering governor: prevents runaway actions and maintains instant 1-click snapshot rollback.</p>
            <button class="welcome-btn" onclick="AgentSimulator.sendWebUIMessage('circuit breaker')">Check Breaker</button>
          </div>
        </div>
      `;
    } else if (tabId === 'bootable-iso') {
      container.innerHTML = `
        <div class="welcome-hero" style="background: linear-gradient(135deg, #1b263b 0%, #0d1b2a 100%); border-color: #0077b6;">
          <div style="font-size: 2.5rem;">💾</div>
          <div>
            <h3>Download Linux Mint 22.3 Aradhya Agent OS</h3>
            <p>Get the full bootable Live ISO to install on your laptop, or use Ventoy to make a multi-boot flash drive.</p>
          </div>
        </div>
        <div class="welcome-grid">
          <div class="welcome-card">
            <h4><span>💿</span> Standard Cinnamon ISO (4GB+)</h4>
            <p>Full-featured Cinnamon desktop with pre-installed Aradhya AI, Marvel agents, and offline speech engine.</p>
            <button class="welcome-btn" onclick="WindowManager.openApp('download')">Open Download Hub</button>
          </div>
          <div class="welcome-card">
            <h4><span>⚡</span> 1GB RAM Low-Spec Edition</h4>
            <p>Optimized with pre-configured ZRAM compressed swap, lightweight XFCE/Cinnamon governor, and Tier 0 Nano AI.</p>
            <button class="welcome-btn" onclick="WindowManager.openApp('download')">Get 1GB Profile</button>
          </div>
          <div class="welcome-card">
            <h4><span>🛠️</span> Ventoy / Rufus Flasher</h4>
            <p>Copy the ISO directly to a Ventoy drive or flash with Rufus / BalenaEtcher in under 4 minutes.</p>
            <button class="welcome-btn" onclick="WindowManager.openApp('download')">View Flashing Steps</button>
          </div>
          <div class="welcome-card">
            <h4><span>🌐</span> GitHub Releases</h4>
            <p>Source code, automated release builds, integrity hashes, and open community issues.</p>
            <a class="welcome-btn" href="https://github.com/thakoralpesh3/mint-agent-os" target="_blank" style="text-decoration:none;">Visit GitHub</a>
          </div>
        </div>
      `;
    } else {
      container.innerHTML = `
        <div class="welcome-hero">
          <div style="font-size: 2.5rem;">📖</div>
          <div>
            <h3>Official Documentation & Architecture</h3>
            <p>Complete guide to configuring and deploying Aradhya Agent OS on Linux Mint.</p>
          </div>
        </div>
        <div class="welcome-grid">
          <div class="welcome-card">
            <h4><span>💻</span> CLI Commands & Flags</h4>
            <p>Run 'aradhya --help' or 'mint-agent --optimize-1gb' from the terminal for headless automation.</p>
            <button class="welcome-btn" onclick="WindowManager.openApp('terminal')">Open Terminal</button>
          </div>
          <div class="welcome-card">
            <h4><span>🗣️</span> Modality & Interaction</h4>
            <p>Configure spoken voice feedback, Raycast-style floating HUD (Super+Space), or quiet notifications.</p>
            <button class="welcome-btn" onclick="WindowManager.openApp('interaction')">Configure Settings</button>
          </div>
        </div>
      `;
    }
  },

  // ==================== FOUNDER & REPLICA SUITE METHODS ====================
  switchFounderTab(tabId, el) {
    if (el) {
      el.parentElement.querySelectorAll('.dl-tab-btn').forEach(btn => btn.classList.remove('active'));
      el.classList.add('active');
    }
    const parentWin = document.getElementById('win-founder-replica');
    if (!parentWin) return;
    parentWin.querySelectorAll('.dl-tab-pane').forEach(pane => {
      pane.style.display = 'none';
      pane.classList.remove('active');
    });
    const targetPane = document.getElementById(tabId);
    if (targetPane) {
      targetPane.style.display = 'flex';
      targetPane.classList.add('active');
    }
  },

  runFounderBoard() {
    const log = document.getElementById('founderOutputLog');
    const badge = document.getElementById('founderStatusBadge');
    if (badge) badge.innerText = "RUNNING BOARD...";
    if (log) log.innerHTML = `<span style="color:#f1c40f;">[BOARD] Convening 3-member Board of Directors (Hormozi, Thiel, Jobs)...</span>`;
    
    setTimeout(() => {
      if (badge) { badge.innerText = "FUND (APPROVED)"; badge.style.color = "#2ecc71"; }
      if (log) {
        log.innerHTML = `
<span style="color:#00f5d4; font-weight:bold;">💼 THE FOUNDER BOARD OF DIRECTORS — EVALUATION RESULT</span>
<span style="color:#aaa;">Idea: "Autonomous Linux Mint Sovereign Agent Operating System"</span>
<span style="color:#2ecc71; font-weight:bold;">CONSENSUS VOTE: UNANIMOUS APPROVAL TO PROCEED (FUND WITH CONDITIONS)</span>
--------------------------------------------------------------------------------
• <strong style="color:#70d6ff;">Alex Hormozi ($100M Offers):</strong> Score <strong style="color:#f1c40f;">88/100</strong> [VOTE: FUND]
  <span style="color:#888;">Value Equation: Infinite upside, zero marginal distribution friction, eliminates cloud subscriptions.</span>
  <span style="color:#ff6b6b;">Fatal Risk:</span> Failing to package as an irresistible one-click ISO/installer.
• <strong style="color:#70d6ff;">Peter Thiel (Zero to One):</strong> Score <strong style="color:#f1c40f;">85/100</strong> [VOTE: FUND WITH CONDITIONS]
  <span style="color:#888;">Moat: 10x offline SLM + ZRAM sub-1GB RAM efficiency vs bloated cloud agents. Digital Immune network effects.</span>
  <span style="color:#ff6b6b;">Fatal Risk:</span> Competing as a generic chatbot instead of owning OS-native kernel/GUI controller category.
• <strong style="color:#70d6ff;">Steve Jobs (Isaacson Product):</strong> Score <strong style="color:#f1c40f;">92/100</strong> [VOTE: FUND]
  <span style="color:#888;">Craftsmanship: 60fps Cinnamon Mint-Y compositor integration. Hardware governor & agent unified.</span>
  <span style="color:#ff6b6b;">Fatal Risk:</span> Compromising UI elegance or introducing compositor stutter on low-RAM hardware.
--------------------------------------------------------------------------------
<span style="color:#f1c40f; font-weight:bold;">KILLER QUESTIONS:</span>
  ❓ Can you prove 60fps responsiveness on a 10-year-old Intel Celeron with 1GB RAM?
  ❓ What is the viral wedge that convinces everyday users to install over stock Windows?
  ❓ How do you maintain 100% air-gapped cyber immunity as hostile attacks evolve?
`;
      }
      this.playStarkSFX('lock');
    }, 600);
  },

  runFounderCFO() {
    const log = document.getElementById('founderOutputLog');
    const badge = document.getElementById('founderStatusBadge');
    if (badge) badge.innerText = "CALCULATING...";
    if (log) log.innerHTML = `<span style="color:#f1c40f;">[CFO] Executing unit_economics.py standard library engine...</span>`;
    
    setTimeout(() => {
      if (badge) { badge.innerText = "PROFITABLE"; badge.style.color = "#00f5d4"; }
      if (log) {
        log.innerHTML = `
<span style="color:#00f5d4; font-weight:bold;">📊 FOUNDER CFO — UNIT ECONOMICS & CONTRIBUTION REPORT</span>
--------------------------------------------------------------------------------
• <span style="color:#888;">Unit Price:</span>              <strong style="color:#fff;">$15.00 / month</strong>
• <span style="color:#888;">Variable Cost:</span>          <strong style="color:#fff;">$0.80 / unit</strong> (Local SLM + zero API egress)
• <span style="color:#888;">Contribution Margin:</span>    <strong style="color:#2ecc71;">$14.20 (94.7%)</strong>
• <span style="color:#888;">Fixed Monthly Cost:</span>     <strong style="color:#fff;">$1,850.00</strong> (GitHub CDN + build infra)
• <span style="color:#888;">Breakeven Volume:</span>       <strong style="color:#f1c40f;">4.3 units / day</strong> (131 subscribers)
• <span style="color:#888;">Startup Capital Needed:</span> <strong style="color:#fff;">$6,400.00</strong>
• <span style="color:#888;">Payback Month:</span>          <strong style="color:#2ecc71;">Month 3</strong>
• <span style="color:#888;">Year 1 Net Profit:</span>      <strong style="color:#2ecc71;">$98,420.00</strong>
--------------------------------------------------------------------------------
<span style="color:#2ecc71;">✓ Standard library verification passed. Zero external network dependencies.</span>
`;
      }
      this.playStarkSFX('chime');
    }, 500);
  },

  runFounderConsumer() {
    const log = document.getElementById('founderOutputLog');
    const badge = document.getElementById('founderStatusBadge');
    if (badge) badge.innerText = "PANEL ACTIVE";
    if (log) log.innerHTML = `<span style="color:#f1c40f;">[PANEL] Polling 10-buyer panel for willingness to pay and objections...</span>`;
    
    setTimeout(() => {
      if (badge) { badge.innerText = "84% INTENT"; badge.style.color = "#2ecc71"; }
      if (log) {
        log.innerHTML = `
<span style="color:#00f5d4; font-weight:bold;">👥 FOUNDER CONSUMER — 10-BUYER PANEL SIMULATION</span>
<span style="color:#2ecc71; font-weight:bold;">NET PURCHASE INTENT: 84.0%</span> | Panel Sample: 10 Target Personas
--------------------------------------------------------------------------------
1. <strong style="color:#70d6ff;">Open-Source Power User:</strong> WTP: $0 / $20 donation | Intent: Very High | "Must be 100% FOSS."
2. <strong style="color:#70d6ff;">Privacy-Conscious Dev:</strong>   WTP: $15/mo | Intent: High | "Verify zero outbound telemetry."
3. <strong style="color:#70d6ff;">Hardware Refurbisher:</strong>    WTP: $49 one-time | Intent: Very High | "Runs stable on 1GB RAM."
4. <strong style="color:#70d6ff;">Enterprise SecOps:</strong>       WTP: $120/seat/mo | Intent: High | "Needs compliance audit logs."
5. <strong style="color:#70d6ff;">Marvel/Iron Man Fan:</strong>     WTP: $29/mo | Intent: Instant Buy | "Loves JARVIS HUD & voice!"
--------------------------------------------------------------------------------
<span style="color:#f1c40f;">Top Objection:</span> Verifying 100% zero-telemetry local air-gap security and true 1GB RAM stability.
`;
      }
      this.playStarkSFX('chime');
    }, 500);
  },

  runFounderPricing() {
    const log = document.getElementById('founderOutputLog');
    const badge = document.getElementById('founderStatusBadge');
    if (badge) badge.innerText = "VAN WESTENDORP";
    if (log) log.innerHTML = `<span style="color:#f1c40f;">[PRICING] Computing Van Westendorp Price Sensitivity Curves...</span>`;
    
    setTimeout(() => {
      if (badge) { badge.innerText = "OPP: $14.99"; badge.style.color = "#00f5d4"; }
      if (log) {
        log.innerHTML = `
<span style="color:#00f5d4; font-weight:bold;">🏷️ VAN WESTENDORP PRICE SENSITIVITY METER</span>
--------------------------------------------------------------------------------
• <span style="color:#888;">Point of Marginal Cheapness (PMC):</span>    <strong style="color:#ff6b6b;">$4.99</strong> (Below this, perceived as untrustworthy)
• <strong style="color:#00f5d4;">Optimal Price Point (OPP):</strong>              <strong style="color:#00f5d4; font-size:1.1em;">$14.99</strong> (Equal 'too cheap' & 'too expensive')
• <span style="color:#888;">Indifference Price Point (IPP):</span>       <strong style="color:#70d6ff;">$19.99</strong> (Equal 'bargain' & 'expensive')
• <span style="color:#888;">Point of Marginal Expensiveness (PME):</span><strong style="color:#ff6b6b;">$39.99</strong> (Above this, customer drop-off accelerates)
• <strong style="color:#2ecc71;">Acceptable Price Range:</strong>                 <strong style="color:#2ecc71;">$5.00 – $40.00</strong>
--------------------------------------------------------------------------------
<span style="color:#f1c40f; font-weight:bold;">RECOMMENDED TIERING:</span>
  • Community Edition (FOSS):   $0        (Offline SLM, 1GB RAM governor, CLI)
  • Pro Sovereign Guardian:     $14.99/mo (Real-time antibodies, Visor HUD, Cloud failover)
  • Enterprise Multi-Node:      $34.99/mo (Fleet defense sync, canary honeypots)
`;
      }
      this.playStarkSFX('chime');
    }, 500);
  },

  runReplicaRecon() {
    const input = document.getElementById('replicaTargetUrl');
    const targetUrl = (input && input.value.trim()) || "https://linear.app";
    const log = document.getElementById('replicaOutputLog');
    const badge = document.getElementById('replicaStatusBadge');
    if (badge) badge.innerText = "RECON SWEEP...";
    if (log) log.innerHTML = `<span style="color:#f1c40f;">[RECON] Reverse-engineering screen inventory, user flows & schema for ${targetUrl}...</span>`;
    
    setTimeout(() => {
      if (badge) { badge.innerText = "RECON MAP READY"; badge.style.color = "#00f5d4"; }
      if (log) {
        log.innerHTML = `
<span style="color:#a29bfe; font-weight:bold;">🧬 THE REPLICA SUITE — CLEAN-ROOM RECON MAP</span>
<span style="color:#aaa;">Target: ${targetUrl}</span> | <span style="color:#2ecc71;">5 Screens Mapped</span>
--------------------------------------------------------------------------------
<span style="color:#70d6ff; font-weight:bold;">SCREEN INVENTORY:</span>
  1. [Modal/Auth]     Authentication & SSO Wall (Google, GitHub, Passkey)
  2. [3-Col Layout]   Main Workspace & Live Kanban Task Board
  3. [Slide-over]     Issue Detail Drawer with Markdown & Mention Engine
  4. [Global Overlay] Command Palette (Ctrl+K fuzzy omnibox)
  5. [Tabbed View]    Settings, API Keys & Webhook Integrations
--------------------------------------------------------------------------------
<span style="color:#f1c40f; font-weight:bold;">INFERRED DATA MODEL:</span>
  🗄️ Organization (id, slug, name, plan, created_at)
  🗄️ User (id, email, name, avatar_url, role, org_id)
  🗄️ Project (id, org_id, name, color, lead_id)
  🗄️ Issue (id, project_id, title, status, priority, creator_id)
  🗄️ Comment (id, issue_id, author_id, body_markdown)
--------------------------------------------------------------------------------
<span style="color:#2ecc71;">✓ Artifact saved: replica/recon.md & replica/features.csv</span>
`;
      }
      this.playStarkSFX('lock');
    }, 600);
  },

  runReplicaContrast() {
    const log = document.getElementById('replicaOutputLog');
    const badge = document.getElementById('replicaStatusBadge');
    if (badge) badge.innerText = "AUDITING TOKENS...";
    if (log) log.innerHTML = `<span style="color:#f1c40f;">[DESIGN] Running contrast.py against tokens.json palette...</span>`;
    
    setTimeout(() => {
      if (badge) { badge.innerText = "WCAG AAA PASS"; badge.style.color = "#2ecc71"; }
      if (log) {
        log.innerHTML = `
<span style="color:#a29bfe; font-weight:bold;">🎨 REPLICA DESIGN — WCAG ACCESSIBILITY CONTRAST AUDIT</span>
--------------------------------------------------------------------------------
• Primary Text on Dark BG:     #FFFFFF on #121417 -> <strong style="color:#2ecc71;">18.45:1 (WCAG AAA PASS)</strong>
• Mint-Y Accent on Dark BG:    #00F5D4 on #121417 -> <strong style="color:#2ecc71;">14.82:1 (WCAG AAA PASS)</strong>
• Muted Text on Dark BG:       #A0AEC0 on #121417 -> <strong style="color:#2ecc71;">7.64:1 (WCAG AAA PASS)</strong>
• Border Divider on Canvas:    #2D3748 on #121417 -> <strong style="color:#2ecc71;">3.45:1 (UI Component PASS)</strong>
--------------------------------------------------------------------------------
<span style="color:#2ecc71;">✓ Zero accessibility contrast errors. All text meets WCAG AAA 7:1 standard.</span>
`;
      }
      this.playStarkSFX('chime');
    }, 450);
  },

  runReplicaDiff() {
    const log = document.getElementById('replicaOutputLog');
    const badge = document.getElementById('replicaStatusBadge');
    if (badge) badge.innerText = "PARITY DIFF...";
    if (log) log.innerHTML = `<span style="color:#f1c40f;">[DIFF] Executing parity.py against features.csv matrix...</span>`;
    
    setTimeout(() => {
      if (badge) { badge.innerText = "PARITY: 88.2%"; badge.style.color = "#2ecc71"; }
      if (log) {
        log.innerHTML = `
<span style="color:#a29bfe; font-weight:bold;">⚖️ REPLICA DIFF — FEATURE PARITY SCORECARD</span>
<span style="color:#2ecc71; font-weight:bold;">OVERALL PARITY SCORE: 88.2%</span> | Features Tracked: 17
--------------------------------------------------------------------------------
• Core Kanban & Boards:      100.0% (5/5 Must-Haves implemented)
• Command Palette & Search:  100.0% (3/3 Must-Haves implemented)
• Authentication & Users:    100.0% (2/2 Must-Haves implemented)
• Notifications & Webhooks:   80.0% (Email alerts live, Slack pending)
• Offline Sync & Storage:     92.0% (Local SQLite sync operational)
--------------------------------------------------------------------------------
<span style="color:#f1c40f;">Remaining Gaps:</span> 2 should-have features (round-robin assignees, embed widgets).
<span style="color:#2ecc71;">✓ Ready for beta release. Meets MVP ship threshold (>85%).</span>
`;
      }
      this.playStarkSFX('chime');
    }, 500);
  },

  runReplicaReviews() {
    const log = document.getElementById('replicaOutputLog');
    const badge = document.getElementById('replicaStatusBadge');
    if (badge) badge.innerText = "MINING REVIEWS...";
    if (log) log.innerHTML = `<span style="color:#f1c40f;">[ENTREPRENEUR] Mining 1-star reviews from App Store & Trustpilot via reviews.py...</span>`;
    
    setTimeout(() => {
      if (badge) { badge.innerText = "3 GAPS FOUND"; badge.style.color = "#00f5d4"; }
      if (log) {
        log.innerHTML = `
<span style="color:#a29bfe; font-weight:bold;">💎 REPLICA ENTREPRENEUR — COMPETITOR REVIEW MINER</span>
--------------------------------------------------------------------------------
<span style="color:#ff6b6b; font-weight:bold;">TOP COMPETITOR FLAWS MINED FROM 1-STAR REVIEWS:</span>
  1. <strong style="color:#fff;">Aggressive pricing hikes & forced enterprise upsells</strong> (42% of 1-star reviews)
     <span style="color:#2ecc71;">Countermeasure:</span> Transparent flat pricing + self-hosted free open-source edition.
  2. <strong style="color:#fff;">Sluggish UI performance and 3+ second page loads</strong> (31% of 1-star reviews)
     <span style="color:#2ecc71;">Countermeasure:</span> Sub-millisecond local-first architecture & 60fps compositor.
  3. <strong style="color:#fff;">Mandatory cloud lock-in with zero local export</strong> (19% of 1-star reviews)
     <span style="color:#2ecc71;">Countermeasure:</span> Local Markdown / SQLite storage with automatic git versioning.
--------------------------------------------------------------------------------
<span style="color:#00f5d4; font-weight:bold;">WINNING POSITIONING:</span> "The fast, offline, sovereign alternative that never holds your data hostage."
`;
      }
      this.playStarkSFX('lock');
    }, 500);
  },

  // ==================== START MENU CATEGORY & SEARCH FILTER ====================
  switchStartMenuCat(cat, el) {
    if (el) {
      document.querySelectorAll('.cat-item').forEach(item => item.classList.remove('active'));
      el.classList.add('active');
    }
    const apps = document.querySelectorAll('#startMenuApps .app-item');
    apps.forEach(app => {
      const appCat = app.dataset.cat || 'all';
      if (cat === 'all' || appCat === cat || appCat === 'all') {
        app.style.display = 'flex';
      } else {
        app.style.display = 'none';
      }
    });
  },

  filterStartMenu(query) {
    const q = query.trim().toLowerCase();
    const apps = document.querySelectorAll('#startMenuApps .app-item');
    apps.forEach(app => {
      const text = app.innerText.toLowerCase();
      if (!q || text.includes(q)) {
        app.style.display = 'flex';
      } else {
        app.style.display = 'none';
      }
    });
  },

  switchHaroldTab(tabId, el) {
    if (el) {
      el.parentElement.querySelectorAll('.dl-tab-btn').forEach(btn => btn.classList.remove('active'));
      el.classList.add('active');
    }
    const parentWin = document.getElementById('win-harold-os');
    if (!parentWin) return;
    parentWin.querySelectorAll('.dl-tab-pane').forEach(pane => {
      pane.style.display = 'none';
      pane.classList.remove('active');
    });
    const targetPane = document.getElementById(tabId);
    if (targetPane) {
      targetPane.style.display = 'flex';
      targetPane.classList.add('active');
    }
  },

  runHaroldCrash() {
    const input = document.getElementById('haroldCrashInput');
    const target = input ? input.value.trim() : 'cinnamon';
    const log = document.getElementById('haroldCrashOutputLog');
    const badge = document.getElementById('haroldCrashStatusBadge');
    if (badge) { badge.innerText = "INSPECTING LOGS..."; badge.style.color = "#f1c40f"; }
    if (log) log.innerHTML = `<span style="color:#3498db;">[HAROLD] Querying systemd-coredump and journalctl for '${target}' crashes...</span>`;

    setTimeout(() => {
      if (badge) { badge.innerText = "HEALTHY / NOMINAL"; badge.style.color = "#2ecc71"; }
      if (log) {
        log.innerHTML = `
<span style="color:#3498db; font-weight:bold;">🎩 HAROLD OS CRASH DIAGNOSTICS — REPORT</span>
<span style="color:#aaa;">Target: "${target}" | Source: systemd-coredump & journalctl -p 3</span>
--------------------------------------------------------------------------------
• <span style="color:#888;">System Health:</span>       <strong style="color:#2ecc71;">OPTIMAL (Zero unhandled core dumps)</strong>
• <span style="color:#888;">Kernel Ring Status:</span>  <strong style="color:#fff;">Clean — Zero kernel panics or segmentation faults</strong>
• <span style="color:#888;">Diagnostic Summary:</span>  <span style="color:#e0e0e0;">All Linux Mint background services, Cinnamon compositor, and user processes are operating within nominal boundaries.</span>
• <span style="color:#888;">Signal Mapping:</span>      <span style="color:#2ecc71;">No active SIGSEGV (11), SIGABRT (6), or SIGILL (4) faults.</span>
• <span style="color:#888;">Remediation Plan:</span>    <strong style="color:#00f5d4;">System is healthy. No manual patch or apt reinstall required.</strong>
--------------------------------------------------------------------------------
<span style="color:#2ecc71;">✓ Verified 100% offline via agent/bridge/crash_diagnostics.py.</span>
`;
      }
      this.playStarkSFX('lock');
    }, 500);
  },

  runHaroldOOMCheck() {
    const log = document.getElementById('haroldCrashOutputLog');
    const badge = document.getElementById('haroldCrashStatusBadge');
    if (badge) { badge.innerText = "CHECKING OOM..."; badge.style.color = "#f39c12"; }
    if (log) log.innerHTML = `<span style="color:#f39c12;">[HAROLD] Inspecting Linux kernel Out-Of-Memory (OOM) killer events...</span>`;

    setTimeout(() => {
      if (badge) { badge.innerText = "ZRAM PROTECTED"; badge.style.color = "#00f5d4"; }
      if (log) {
        log.innerHTML = `
<span style="color:#f39c12; font-weight:bold;">🛡️ KERNEL OOM KILLER DEFENSE & 1GB RAM AUDIT</span>
--------------------------------------------------------------------------------
• <span style="color:#888;">OOM Terminations:</span>    <strong style="color:#2ecc71;">0 Events in last 24h</strong>
• <span style="color:#888;">ZRAM Compression:</span>    <strong style="color:#00f5d4;">ACTIVE (LZO-RLE, 2.5x ratio)</strong>
• <span style="color:#888;">Swappiness Governor:</span> <strong style="color:#fff;">vm.swappiness = 100 (Optimized for low-RAM SSD/eMMC)</strong>
• <span style="color:#888;">Page Cache Ceiling:</span>  <strong style="color:#fff;">vm.vfs_cache_pressure = 50</strong>
• <span style="color:#888;">Recommended Action:</span>  <span style="color:#2ecc71;">Memory governor is holding Cinnamon under 160MB RSS. 1GB PCs are protected against sudden SIGKILL termination.</span>
--------------------------------------------------------------------------------
<span style="color:#00f5d4;">✓ Hardware tier: Tier 0 Nano Governor verified.</span>
`;
      }
      this.playStarkSFX('chime');
    }, 450);
  },

  runHaroldFiler() {
    const input = document.getElementById('haroldFilerDirInput');
    const dir = input ? input.value.trim() : '~/Downloads';
    const log = document.getElementById('haroldFilerOutputLog');
    const badge = document.getElementById('haroldFilerStatusBadge');
    if (badge) { badge.innerText = "SCANNING & EXTRACTING..."; badge.style.color = "#f1c40f"; }
    if (log) log.innerHTML = `<span style="color:#2ecc71;">[FILER] Scanning '${dir}' for invoices, receipts, and legal contracts...</span>`;

    setTimeout(() => {
      if (badge) { badge.innerText = "4 FILES MATCHED"; badge.style.color = "#2ecc71"; }
      if (log) {
        log.innerHTML = `
<span style="color:#2ecc71; font-weight:bold;">📄 HAROLD SMART DOCUMENT FILER — PROPOSED PLAN</span>
<span style="color:#aaa;">Directory: ${dir} | Total Scanned: 4 files</span>
--------------------------------------------------------------------------------
• <strong style="color:#70d6ff;">inv_acme_corp_9021.pdf</strong> (240 KB)
  ↳ <strong style="color:#2ecc71;">2026-10-15-Acme_Corp-Invoice.pdf</strong> [Vendor: Acme Corp | $450.00]
    <span style="color:#888;">Target:</span> ~/Documents/Invoices/2026/

• <strong style="color:#70d6ff;">scan_004289_receipt.png</strong> (1.15 MB)
  ↳ <strong style="color:#2ecc71;">2026-10-22-Hardware_Supply_Co-Receipt.png</strong> [Vendor: Hardware Supply Co | $89.50]
    <span style="color:#888;">Target:</span> ~/Documents/Invoices/2026/

• <strong style="color:#70d6ff;">consulting_agreement_final_v2.docx</strong> (85 KB)
  ↳ <strong style="color:#a29bfe;">2026-09-30-Stark_Tech_Legal-Contract.docx</strong> [Vendor: Stark Tech Legal]
    <span style="color:#888;">Target:</span> ~/Documents/Contracts/2026/

• <strong style="color:#70d6ff;">monthly_statement_chase_oct2026.pdf</strong> (320 KB)
  ↳ <strong style="color:#f1c40f;">2026-10-01-Chase_Bank-Financial.pdf</strong> [Vendor: Chase Bank | $3,240.18]
    <span style="color:#888;">Target:</span> ~/Documents/Financial/2026/
--------------------------------------------------------------------------------
<span style="color:#f1c40f;">⚡ Undo State:</span> Recorded to ~/.config/mint-agent/filing_undo.json
<span style="color:#2ecc71;">✓ Files cleanly organized by Year & Vendor. Zero cloud upload.</span>
`;
      }
      this.playStarkSFX('lock');
    }, 600);
  },

  runHaroldUndo() {
    const log = document.getElementById('haroldFilerOutputLog');
    const badge = document.getElementById('haroldFilerStatusBadge');
    if (badge) { badge.innerText = "REVERTING..."; badge.style.color = "#e67e22"; }
    if (log) log.innerHTML = `<span style="color:#e67e22;">[UNDO] Reading filing_undo.json and restoring files to origin...</span>`;

    setTimeout(() => {
      if (badge) { badge.innerText = "RESTORED (4 FILES)"; badge.style.color = "#2ecc71"; }
      if (log) {
        log.innerHTML = `
<span style="color:#e67e22; font-weight:bold;">↩️ HAROLD DOCUMENT FILER — UNDO COMPLETE</span>
--------------------------------------------------------------------------------
• <span style="color:#888;">Revert Status:</span>      <strong style="color:#2ecc71;">SUCCESSFUL</strong>
• <span style="color:#888;">Files Restored:</span>     <strong style="color:#fff;">4 files returned to ~/Downloads/</strong>
• <span style="color:#888;">Original Names:</span>     <span style="color:#aaa;">Preserved exactly as uploaded without file content alteration</span>
• <span style="color:#888;">Audit Trail:</span>        <span style="color:#00f5d4;">Recorded action 'FILING_UNDO_EXECUTED' in audit.jsonl</span>
--------------------------------------------------------------------------------
<span style="color:#2ecc71;">✓ Instant atomic rollback completed.</span>
`;
      }
      this.playStarkSFX('neutralized');
    }, 450);
  },

  runHaroldTailor(preset) {
    const log = document.getElementById('haroldAppsOutputLog');
    const badge = document.getElementById('haroldAppsStatusBadge');
    if (badge) { badge.innerText = `APPLYING ${preset.toUpperCase()}...`; badge.style.color = "#9b59b6"; }
    if (log) log.innerHTML = `<span style="color:#9b59b6;">[TAILOR] Interpreting natural language desktop preset '${preset}'...</span>`;

    setTimeout(() => {
      let desc = "";
      let accent = "#00f5d4";
      let theme = "Mint-Y-Dark";
      if (preset === 'nano-minimal') {
        accent = "#2ecc71";
        desc = "1GB RAM Optimized: Blur and translucency disabled, Cinnamon memory ceiling capped at 18MB.";
      } else if (preset === 'arc-cyan') {
        accent = "#00f5d4";
        theme = "Mint-Y-Dark-Teal";
        desc = "Arc Reactor Cyan: Tony Stark glowing neon telemetry with 60fps compositor VSync.";
      } else if (preset === 'high-contrast') {
        accent = "#f1c40f";
        theme = "HighContrast";
        desc = "WCAG AAA Compliant: Maximum readability, pure black canvas, 14pt high-legibility font scaling.";
      } else {
        accent = "#87bd5c";
        theme = "Mint-Y-Classic";
        desc = "Authentic Linux Mint signature green & slate theme with Cinnamon Muffin desktop.";
      }

      if (badge) { badge.innerText = "THEME APPLIED"; badge.style.color = "#2ecc71"; }
      if (log) {
        log.innerHTML = `
<span style="color:#9b59b6; font-weight:bold;">🎨 HAROLD DESKTOP TAILOR — THEME APPLIED</span>
--------------------------------------------------------------------------------
• <span style="color:#888;">Preset:</span>             <strong style="color:${accent};">${preset}</strong>
• <span style="color:#888;">Cinnamon Theme:</span>     <strong style="color:#fff;">${theme}</strong>
• <span style="color:#888;">Accent Color:</span>       <span style="background:${accent}; color:#000; padding:1px 6px; border-radius:3px; font-weight:bold;">${accent}</span>
• <span style="color:#888;">Compositor:</span>         <strong style="color:#00f5d4;">${preset === 'nano-minimal' ? 'Effects Disabled (<18MB RAM)' : 'Muffin 60fps VSync Active'}</strong>
• <span style="color:#888;">Description:</span>        <span style="color:#e0e0e0;">${desc}</span>
--------------------------------------------------------------------------------
<span style="color:#2ecc71;">✓ gsettings org.cinnamon.theme updated smoothly without restarting session.</span>
`;
      }
      this.playStarkSFX('chime');
    }, 450);
  },

  runHaroldCalc() {
    const log = document.getElementById('haroldAppsOutputLog');
    const badge = document.getElementById('haroldAppsStatusBadge');
    if (badge) { badge.innerText = "CALCULATING..."; badge.style.color = "#f1c40f"; }
    if (log) log.innerHTML = `<span style="color:#f1c40f;">[CALC] Evaluating sentence math, percentages, units & currencies...</span>`;

    setTimeout(() => {
      if (badge) { badge.innerText = "EVALUATED"; badge.style.color = "#2ecc71"; }
      if (log) {
        log.innerHTML = `
<span style="color:#f1c40f; font-weight:bold;">🧮 HAROLD EXACT CALCULATOR — SENTENCE MATH</span>
--------------------------------------------------------------------------------
• <span style="color:#888;">Input Sentence:</span>     <strong style="color:#fff;">"What is 25% of 1,600 and convert 5 km to miles"</strong>
• <span style="color:#888;">Arithmetic Step:</span>    <strong style="color:#00f5d4;">(25.0 / 100) × 1600.0 = 400.00</strong>
• <span style="color:#888;">Unit Conversion:</span>    <strong style="color:#2ecc71;">5.0 km × 0.621371 = 3.11 miles</strong>
• <span style="color:#888;">Currency Conversion:</span><strong style="color:#f1c40f;">$100 USD = ₹8,650.00 INR</strong>
• <span style="color:#888;">Accuracy:</span>           <span style="color:#2ecc71;">Exact standard-library floating point with zero cloud hallucination</span>
--------------------------------------------------------------------------------
<span style="color:#2ecc71;">✓ Evaluated in 0.4ms via agent/skills/harold_skills.py.</span>
`;
      }
      this.playStarkSFX('lock');
    }, 400);
  },

  runHaroldCanvas() {
    const log = document.getElementById('haroldAppsOutputLog');
    const badge = document.getElementById('haroldAppsStatusBadge');
    if (badge) { badge.innerText = "RENDERING CANVAS..."; badge.style.color = "#3498db"; }
    if (log) log.innerHTML = `<span style="color:#3498db;">[CANVAS] Generating visual system architecture wireframe...</span>`;

    setTimeout(() => {
      if (badge) { badge.innerText = "CANVAS READY"; badge.style.color = "#00f5d4"; }
      if (log) {
        log.innerHTML = `
<span style="color:#3498db; font-weight:bold;">🖼️ HAROLD CANVAS — SYSTEM ARCHITECTURE WIREFRAME</span>
<span style="color:#aaa;">Resolution: 1920x1080 (16:9 4K Vector Spec) | 6 Isometric Layers</span>
--------------------------------------------------------------------------------
<pre style="color:#00f5d4; font-size:0.71rem; line-height:1.2; margin:0;">
    ┌───────────────────────────┐
    │     MARVEL MATRIX         │
    │  [Jarvis, Friday, Edith]  │
    └─────────────┬─────────────┘
                  │
    ┌─────────────▼─────────────┐       ┌───────────────────────────┐
    │     ARADHYA AGENT OS      │◄─────►│     HAROLD OS BRIDGE      │
    │   (Cinnamon Linux Mint)   │       │ [Docs, Filer, Diagnostics]│
    └─────────────┬─────────────┘       └───────────────────────────┘
                  │
    ┌─────────────▼─────────────┐
    │   1GB RAM NANO GOVERNOR   │
    │  [ZRAM Swap + 60fps VSync]│
    └───────────────────────────┘
</pre>
--------------------------------------------------------------------------------
<span style="color:#2ecc71;">✓ Exportable to SVG, ASCII, and Interactive Web Canvas.</span>
`;
      }
      this.playStarkSFX('repulsor');
    }, 450);
  },

  runHaroldSheets() {
    const log = document.getElementById('haroldAppsOutputLog');
    const badge = document.getElementById('haroldAppsStatusBadge');
    if (badge) { badge.innerText = "PROCESSING CSV..."; badge.style.color = "#2ecc71"; }
    if (log) log.innerHTML = `<span style="color:#2ecc71;">[SHEETS] Compiling tabular spreadsheet model & summary metrics...</span>`;

    setTimeout(() => {
      if (badge) { badge.innerText = "5 ROWS COMPILED"; badge.style.color = "#2ecc71"; }
      if (log) {
        log.innerHTML = `
<span style="color:#2ecc71; font-weight:bold;">📊 HAROLD SHEETS — RESOURCE ALLOCATION MODEL</span>
--------------------------------------------------------------------------------
<table style="width:100%; border-collapse:collapse; font-size:0.72rem; color:#fff;">
  <tr style="border-bottom:1px solid #33404c; color:#00f5d4; text-align:left;">
    <th style="padding:4px;">Component</th>
    <th style="padding:4px;">Target MB</th>
    <th style="padding:4px;">CPU Ceiling</th>
    <th style="padding:4px;">Latency</th>
    <th style="padding:4px;">Status</th>
  </tr>
  <tr style="border-bottom:1px solid #1c2633;">
    <td style="padding:3px;">Aradhya Agent Brain</td><td>31.4 MB</td><td>0.5%</td><td>2.8ms</td><td style="color:#2ecc71;">OPTIMAL</td>
  </tr>
  <tr style="border-bottom:1px solid #1c2633;">
    <td style="padding:3px;">Cinnamon Compositor</td><td>142.0 MB</td><td>2.1%</td><td>16.6ms</td><td style="color:#2ecc71;">60FPS LOCKED</td>
  </tr>
  <tr style="border-bottom:1px solid #1c2633;">
    <td style="padding:3px;">ZRAM Swap Buffer</td><td>256.0 MB</td><td>0.1%</td><td>0.2ms</td><td style="color:#00f5d4;">2.5x COMPRESSED</td>
  </tr>
  <tr style="border-bottom:1px solid #1c2633;">
    <td style="padding:3px;">Harold OS Bridge</td><td>12.0 MB</td><td>0.2%</td><td>1.4ms</td><td style="color:#2ecc71;">ONLINE</td>
  </tr>
  <tr style="font-weight:bold; color:#f1c40f;">
    <td style="padding:3px;">Total System Overhead</td><td>441.4 MB</td><td>2.9%</td><td>21.0ms</td><td>1GB VERIFIED</td>
  </tr>
</table>
--------------------------------------------------------------------------------
<span style="color:#2ecc71;">✓ Peak Memory: 441.4 MB | Average Latency: 8.4ms | 100% PASS.</span>
`;
      }
      this.playStarkSFX('chime');
    }, 450);
  },

  runHaroldSlides() {
    const log = document.getElementById('haroldAppsOutputLog');
    const badge = document.getElementById('haroldAppsStatusBadge');
    if (badge) { badge.innerText = "DESIGNING SLIDES..."; badge.style.color = "#e74c3c"; }
    if (log) log.innerHTML = `<span style="color:#e74c3c;">[SLIDES] Architecting presentation deck with speaker notes...</span>`;

    setTimeout(() => {
      if (badge) { badge.innerText = "4 SLIDES READY"; badge.style.color = "#2ecc71"; }
      if (log) {
        log.innerHTML = `
<span style="color:#e74c3c; font-weight:bold;">📽️ HAROLD SLIDES — PRESENTATION DECK</span>
<span style="color:#aaa;">Topic: "Aradhya Agent OS Pitch Deck" (4 Slides)</span>
--------------------------------------------------------------------------------
• <strong style="color:#f1c40f;">Slide 1: Aradhya Agent OS Pitch Deck</strong>
  <span style="color:#888;">Subtitle: Autonomous Sovereign Agent Operating System for Linux Mint</span>
  <span style="color:#70d6ff;">Speaker Note:</span> Welcome the audience and introduce the paradigm shift to agent-native operating systems.

• <strong style="color:#f1c40f;">Slide 2: The Problem: Cloud Bloat & Hardware Tax</strong>
  <span style="color:#e0e0e0;">• Copilot+ and Apple Intelligence require $1,200+ hardware upgrades</span>
  <span style="color:#e0e0e0;">• Continuous background screenshotting and privacy loss</span>
  <span style="color:#70d6ff;">Speaker Note:</span> Emphasize why users are rejecting bloated cloud surveillance operating systems.

• <strong style="color:#f1c40f;">Slide 3: The Solution: Aradhya + Harold OS</strong>
  <span style="color:#e0e0e0;">• Runs 100% private offline on existing 1GB-4GB hardware</span>
  <span style="color:#e0e0e0;">• Sub-millisecond local deterministic routing</span>
  <span style="color:#70d6ff;">Speaker Note:</span> Explain our zero-cost, 60fps butter-smooth Linux Mint architecture.

• <strong style="color:#f1c40f;">Slide 4: Demonstration: The 37 Specialized Skills</strong>
  <span style="color:#e0e0e0;">• 6 Marvel Tactical AI Personas (Jarvis, Friday, Edith, Vision)</span>
  <span style="color:#e0e0e0;">• 11 Founder Skills + 11 Clean-Room Replica Skills + 9 Harold OS Skills</span>
--------------------------------------------------------------------------------
<span style="color:#2ecc71;">✓ Slide deck formatted and exportable to PDF/HTML.</span>
`;
      }
      this.playStarkSFX('lock');
    }, 450);
  },

  runHaroldDocs() {
    const log = document.getElementById('haroldAppsOutputLog');
    const badge = document.getElementById('haroldAppsStatusBadge');
    if (badge) { badge.innerText = "DRAFTING DOC..."; badge.style.color = "#a29bfe"; }
    if (log) log.innerHTML = `<span style="color:#a29bfe;">[DOCS] Generating professional markdown technical whitepaper...</span>`;

    setTimeout(() => {
      if (badge) { badge.innerText = "DOC COMPILED"; badge.style.color = "#2ecc71"; }
      if (log) {
        log.innerHTML = `
<span style="color:#a29bfe; font-weight:bold;">📝 HAROLD DOCS — EXECUTIVE TECHNICAL WHITEPAPER</span>
<span style="color:#aaa;">Title: "Linux Mint Sovereign OS Whitepaper" | Word Count: 340 words</span>
--------------------------------------------------------------------------------
<h4 style="margin:4px 0; color:#00f5d4;">1. Executive Summary</h4>
<p style="margin:0 0 6px 0; color:#dcdde1; font-size:0.72rem;">Architectural specification for Aradhya Agent OS running natively on Linux Mint 22.3 Cinnamon. Proves that autonomous agent capabilities do not require cloud subscriptions or flagship silicon.</p>

<h4 style="margin:4px 0; color:#00f5d4;">2. Sovereign Offline Infrastructure</h4>
<p style="margin:0 0 6px 0; color:#dcdde1; font-size:0.72rem;">100% local execution with zero cloud telemetry and a sub-35MB memory footprint. Incorporates local micro-intent routing for sub-2ms latency.</p>

<h4 style="margin:4px 0; color:#00f5d4;">3. Security & Safety Gates</h4>
<p style="margin:0 0 6px 0; color:#dcdde1; font-size:0.72rem;">Tiered permissions with explicit user approval on all modifying system commands. Integrates Harold OS immutable audit logging and undoable file operations.</p>
--------------------------------------------------------------------------------
<span style="color:#2ecc71;">✓ Saved to ~/Documents/whitepaper.md</span>
`;
      }
      this.playStarkSFX('chime');
    }, 450);
  },

  runHaroldAudit() {
    const log = document.getElementById('haroldObserverOutputLog');
    const badge = document.getElementById('haroldObserverStatusBadge');
    if (badge) { badge.innerText = "READING AUDIT LOG..."; badge.style.color = "#00f5d4"; }
    if (log) log.innerHTML = `<span style="color:#00f5d4;">[AUDIT] Inspecting immutable append-only audit trail in ~/.config/mint-agent/audit.jsonl...</span>`;

    setTimeout(() => {
      if (badge) { badge.innerText = "VERIFIED"; badge.style.color = "#2ecc71"; }
      if (log) {
        log.innerHTML = `
<span style="color:#00f5d4; font-weight:bold;">📜 HAROLD OS IMMUTABLE SECURITY AUDIT TRAIL</span>
<span style="color:#aaa;">Log Path: ~/.config/mint-agent/audit.jsonl</span>
--------------------------------------------------------------------------------
• <strong style="color:#f1c40f;">[2026-10-28 02:19:43]</strong> <span style="color:#00f5d4;">OS_BOOT_SECURITY_AUDIT</span> via herald_os_bridge
  <span style="color:#888;">Details: {"message": "All Linux Mint security sentries armed and healthy."}</span>

• <strong style="color:#f1c40f;">[2026-10-28 02:20:12]</strong> <span style="color:#2ecc71;">CRASH_DIAGNOSTICS_INSPECT</span> via harold_os
  <span style="color:#888;">Details: {"status": "nominal", "crashes_detected": 0}</span>

• <strong style="color:#f1c40f;">[2026-10-28 02:21:05]</strong> <span style="color:#70d6ff;">SMART_FILER_PLAN_GENERATED</span> via document_filer
  <span style="color:#888;">Details: {"items": 4, "undo_file": "filing_undo.json"}</span>

• <strong style="color:#f1c40f;">[2026-10-28 02:22:30]</strong> <span style="color:#9b59b6;">DESKTOP_TAILOR_APPLIED</span> via desktop_tailor
  <span style="color:#888;">Details: {"preset": "nano-minimal", "ram_savings": "cinnamon <18MB"}</span>
--------------------------------------------------------------------------------
<span style="color:#2ecc71;">✓ Tamper-evident append-only JSONL format. Zero cloud leaks.</span>
`;
      }
      this.playStarkSFX('lock');
    }, 450);
  },

  runHaroldObserve() {
    const log = document.getElementById('haroldObserverOutputLog');
    const badge = document.getElementById('haroldObserverStatusBadge');
    if (badge) { badge.innerText = "POLLING AMBIENT CONTEXT..."; badge.style.color = "#3498db"; }
    if (log) log.innerHTML = `<span style="color:#3498db;">[OBSERVER] Polling Cinnamon X11 active window and memory consumers...</span>`;

    setTimeout(() => {
      if (badge) { badge.innerText = "ACTIVE"; badge.style.color = "#2ecc71"; }
      if (log) {
        log.innerHTML = `
<span style="color:#3498db; font-weight:bold;">👁️ HAROLD AMBIENT CONTEXT & SYSTEM OBSERVER</span>
--------------------------------------------------------------------------------
• <span style="color:#888;">Desktop Environment:</span> <strong style="color:#2ecc71;">Cinnamon (Linux Mint 22.3)</strong>
• <span style="color:#888;">Active Focused Window:</span><strong style="color:#fff;">Linux Mint Cinnamon Workspace (mint-agent)</strong>
• <span style="color:#888;">Window PID / Class:</span>    <span style="color:#70d6ff;">PID 2061 (gnome-terminal)</span>
• <span style="color:#888;">Compositor:</span>           <strong style="color:#00f5d4;">Cinnamon Muffin (60 FPS VSync Locked)</strong>
• <span style="color:#888;">Top Memory Processes:</span>
  1. PID 1042  <strong style="color:#fff;">cinnamon</strong>              142.5 MB (2.1% CPU)
  2. PID 1821  <strong style="color:#fff;">firefox</strong>               210.0 MB (3.4% CPU)
  3. PID 850   <strong style="color:#fff;">xorg</strong>                   68.2 MB (1.0% CPU)
  4. PID 2061  <strong style="color:#2ecc71;">mint-agent (Aradhya)</strong>   31.4 MB (0.4% CPU)
--------------------------------------------------------------------------------
<span style="color:#2ecc71;">✓ Total Agent Memory: 31.4 MB. 1GB RAM budget 100% respected.</span>
`;
      }
  },

  // ==================== WINDOW 11: REMOTE ACCESS COMPANION SIMULATION ====================
  remotePin: "628-247",
  remoteSessionsCount: 1,

  regenerateRemotePin() {
    const d1 = Math.floor(100 + Math.random() * 900);
    const d2 = Math.floor(100 + Math.random() * 900);
    this.remotePin = `${d1}-${d2}`;
    const el = document.getElementById('remotePinDisplay');
    if (el) el.innerText = this.remotePin;
    this.playStarkSFX('lock');
    this.addTerminalLine(`[REMOTE] Generated new pairing OTP PIN: ${this.remotePin}`);
  },

  revokeAllRemoteSessions() {
    this.remoteSessionsCount = 0;
    const list = document.getElementById('remoteSessionsList');
    const badge = document.getElementById('remoteSessionCountBadge');
    if (list) list.innerHTML = `<div style="color:#888; font-size:0.74rem; padding:8px 0;">No active mobile sessions. All devices disconnected.</div>`;
    if (badge) { badge.innerText = "0 ACTIVE"; badge.style.background = "#3d1a1a"; badge.style.color = "#ff8080"; }
    this.regenerateRemotePin();
    this.playStarkSFX('alarm');
    alert("🔒 All remote mobile sessions have been revoked. A new 6-digit PIN has been generated.");
  },

  revokeSingleSession(btn) {
    const parent = btn.closest('div[style*="justify-content:space-between"]');
    if (parent) parent.remove();
    this.remoteSessionsCount = Math.max(0, this.remoteSessionsCount - 1);
    const badge = document.getElementById('remoteSessionCountBadge');
    if (badge) badge.innerText = `${this.remoteSessionsCount} ACTIVE`;
    this.playStarkSFX('lock');
  },

  copyRemotePin() {
    navigator.clipboard?.writeText(this.remotePin.replace('-', ''));
    alert(`Copied PIN to clipboard: ${this.remotePin}`);
  },

  copyRemoteUrl() {
    const url = document.getElementById('remoteLanUrlText')?.innerText || "http://10.182.73.178:8888/mobile";
    navigator.clipboard?.writeText(url);
    alert(`Copied LAN URL to clipboard: ${url}`);
  },

  switchSimTab(tabId, btn) {
    document.querySelectorAll('.sim-phone-tab').forEach(t => t.style.display = 'none');
    document.querySelectorAll('.sim-nav-btn').forEach(b => {
      b.classList.remove('active');
      b.style.color = '#77887b';
    });

    const target = document.getElementById('simTab' + tabId.charAt(0).toUpperCase() + tabId.slice(1));
    if (target) {
      target.style.display = 'flex';
      if (btn) {
        btn.classList.add('active');
        btn.style.color = '#87cf3e';
      }
    }
  },

  simPhoneSendChat() {
    const inp = document.getElementById('simPhoneChatInput');
    const text = inp?.value?.trim();
    if (!text) return;
    inp.value = '';

    const stream = document.getElementById('simChatStream');
    if (stream) {
      const uMsg = document.createElement('div');
      uMsg.style.cssText = "background:#29382d; padding:6px 10px; border-radius:10px; color:#fff; align-self:flex-end; font-size:11px; max-width:85%; word-break:break-word;";
      uMsg.innerText = text;
      stream.appendChild(uMsg);

      setTimeout(() => {
        const aMsg = document.createElement('div');
        aMsg.style.cssText = "background:#212923; padding:8px 10px; border-radius:10px; border-left:2px solid #87cf3e; font-size:11px; align-self:flex-start; max-width:85%;";
        
        let reply = "Executed on Linux Mint PC.";
        const low = text.toLowerCase();
        if (low.includes('volume') || low.includes('sound')) {
          reply = "Volume set via pactl ALSA backend.";
        } else if (low.includes('lock')) {
          reply = "Screen locked with cinnamon-screensaver.";
        } else if (low.includes('ram') || low.includes('clean')) {
          reply = "Kernel caches dropped. Net 340MB RAM reclaimed.";
        } else if (low.includes('nemo') || low.includes('file')) {
          reply = "Launched Nemo File Manager on desktop.";
          WindowManager.openApp('nemo');
        } else if (low.includes('firefox') || low.includes('browser')) {
          reply = "Launched Firefox Web Browser on desktop.";
          WindowManager.openApp('browser');
        } else {
          reply = `Action completed: '${text}'. System latency: 0.8ms.`;
        }

        aMsg.innerHTML = `<div style="color:#87cf3e; font-weight:bold; font-size:10px; margin-bottom:2px;">🌸 Aradhya</div>${reply}`;
        stream.appendChild(aMsg);
        stream.scrollTop = stream.scrollHeight;
        this.playStarkSFX('chime');
      }, 350);

      stream.scrollTop = stream.scrollHeight;
    }
  },

  simPhoneQuick(prompt) {
    const inp = document.getElementById('simPhoneChatInput');
    if (inp) {
      inp.value = prompt;
      this.simPhoneSendChat();
      this.switchSimTab('chat', document.querySelector('.sim-nav-btn'));
    }
  },

  simPhoneVoice() {
    this.playStarkSFX('lock');
    const inp = document.getElementById('simPhoneChatInput');
    if (inp) inp.placeholder = "Listening aloud (Web Speech API)...";
    setTimeout(() => {
      if (inp) {
        inp.value = "Show system health and security radar";
        inp.placeholder = "Command PC...";
        this.simPhoneSendChat();
      }
    }, 1200);
  },

  simLastX: 0,
  simLastY: 0,
  simTrackpadMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const curX = Math.round(e.clientX - rect.left);
    const curY = Math.round(e.clientY - rect.top);
    const dx = curX - (this.simLastX || curX);
    const dy = curY - (this.simLastY || curY);
    this.simLastX = curX;
    this.simLastY = curY;

    const coordsEl = document.getElementById('simTrackpadCoords');
    if (coordsEl) coordsEl.innerText = `dx: ${dx}, dy: ${dy} (xdotool move_relative)`;
  },

  simTrackpadClick(btn) {
    const coordsEl = document.getElementById('simTrackpadCoords');
    if (coordsEl) coordsEl.innerText = `xdotool click ${btn} (Button ${btn === 1 ? 'Left' : 'Right'})`;
    this.playStarkSFX('lock');
  },

  simPhoneTypeKey() {
    const inp = document.getElementById('simPhoneKeyInput');
    const txt = inp?.value;
    if (!txt) return;
    inp.value = '';
    const coordsEl = document.getElementById('simTrackpadCoords');
    if (coordsEl) coordsEl.innerText = `xdotool type --delay 12 "${txt}"`;
    this.playStarkSFX('chime');
    this.addTerminalLine(`[REMOTE KEYBOARD] Typed: "${txt}"`);
  },

  simApprove(approved) {
    const box = document.getElementById('simApprovalBox');
    if (box) {
      box.style.background = approved ? '#18291e' : '#2d1818';
      box.style.borderColor = approved ? '#2ecc71' : '#e74c3c';
      box.innerHTML = `
        <div style="font-weight:bold; color:${approved ? '#2ecc71' : '#e74c3c'}; font-size:11px;">
          ${approved ? '✓ Action Authorized from Smartphone' : '✕ Action Blocked from Smartphone'}
        </div>
        <div style="font-size:10px; color:#aaa; margin-top:4px;">Safe Mode resolved action ID #ACT-9081.</div>
      `;
    }
    this.playStarkSFX(approved ? 'repulsor' : 'alarm');
  }
};

window.addEventListener('DOMContentLoaded', () => {
  AgentSimulator.init();
});
