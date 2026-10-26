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
  mint-agent --security      Display full cybersecurity posture score & audit
  mint-agent --scan-threats  Scan network ports, rogue processes, and persistence
  mint-agent --counter-threats Active countermeasures (sever sockets, neutralize threats)
  mint-agent --deploy-decoys Deploy honeypot canary decoy credentials
  mint-agent --self-check    Inspect self-countering safety circuit breaker status
  mint-agent --rollback      Revert last system modifications to snapshot
  mint-agent --lockdown      Activate emergency UFW firewall lockdown
  mint-agent --turbo         Switch to Antigravity Autonomous Turbo Mode
  mint-agent --safe          Switch to Guarded Safe Mode (prompts confirmation)
  mint-agent --tier          Display hardware detection and model recommendations
  mint-agent --clean-ram     Execute memory cache cleanup
  neofetch                   Display Linux Mint OS telemetry & hardware specs
  free -h                    Display RAM and swap statistics
  ls -la                     List current directory contents
  whoami                     Display active username
  clear                      Clear terminal console
`);
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
    const p = prompt.toLowerCase().trim();

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
