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
    }
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
  }
};

window.addEventListener('DOMContentLoaded', () => {
  AgentSimulator.init();
});
