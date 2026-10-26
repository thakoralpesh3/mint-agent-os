# Implementation Plan: Autonomous PC Protection, Threat-Adaptive Self-Countering & Future Attack Immune System

Provide MintPilot with comprehensive, autonomous end-to-end PC protection, dynamic threat-adaptive counter-measures, the ability to self-counter runaway or anomalous agent behavior, and a digital immune system with attack memory that prepares and hardens the PC against future attacks.

## User Review Required

> [!IMPORTANT]
> The **Digital Immune System** will automatically synthesize persistent defensive rules (iptables IP bans, custom regex attack signatures, and sysctl kernel network-hardening parameters). This runs in background without impacting PC performance or user workflows.

> [!NOTE]
> The **Self-Countering Circuit Breaker** operates autonomously: if the agent detects it is executing repetitive loops (>12 actions or 4 repeated tool calls), accessing forbidden system areas, or causing resource spikes, it trips its own circuit, halts execution, and rolls back to pre-action snapshots without needing user intervention.

---

## Proposed Changes

### Component 1: Digital Immune Engine & Future Attack Memory

#### [NEW] [`agent/security/immune_system.py`](file:///home/alpesh/mint-agent-os/agent/security/immune_system.py)
- **Attack Vector Fingerprinting**: Extracts and indexes attack signatures (source IP, subnet, targeted ports, process hashes, command patterns, canary decoy trips).
- **Immune Memory Persistence**: Stores learned attack vectors in `~/.config/mint-agent/immune_memory/` (`threat_fingerprints.json`, `antibodies.json`).
- **Antibody Generation**:
  - Synthesizes dynamic firewall DROP rules for persistent threat actors.
  - Generates custom pattern matchers loaded by `ThreatDetector` to block identical attacks in <0.1ms.
  - Proactive kernel stack hardening against network floods and spoofing:
    - `net.ipv4.tcp_syncookies = 1`
    - `net.ipv4.icmp_echo_ignore_broadcasts = 1`
    - `net.ipv4.conf.all.rp_filter = 1`
    - `net.ipv4.conf.all.accept_source_route = 0`
    - `net.ipv4.conf.all.log_martians = 1`
- **Predictive Counter-Hardening (Next-Attack Anticipation)**:
  - If SSH is probed -> pre-emptively hardens SSH rules and deploys port 2222 honeytokens.
  - If temporary staging exploits (`/tmp`, `/dev/shm`) are detected -> pre-emptively establishes inotify watchdogs and strict permissions.
- **Immune Readiness Score & Metric**: Calculates a 0-100 Resilience Score based on active antibodies and hardened attack vectors.

---

### Component 2: Dynamic Threat Escalation & Self-Counter Governor

#### [MODIFY] [`agent/security/guardian.py`](file:///home/alpesh/mint-agent-os/agent/security/guardian.py)
- Integrate `ImmuneSystem` into `SecurityGuardian`.
- Implement **DEFCON Dynamic Threat Response Matrix**:
  - **DEFCON 4 (Secure)**: Standard baseline monitoring, zero performance impact.
  - **DEFCON 3 (Elevated)**: Wildcard exposure; activates stealth port warnings, accelerates process polling.
  - **DEFCON 2 (Active Threat)**: Active socket severing (`ss -K` / TCP RST), canary honeytoken deployment, attacker rate-limiting.
  - **DEFCON 1 (Critical)**: Emergency lockdown, hostile IP subnet null-routing, rogue PID termination, automated immune antibody creation.
- Wire automatic transition from threat detection -> counter-measure -> immune antibody synthesis.

#### [MODIFY] [`agent/security/self_counter.py`](file:///home/alpesh/mint-agent-os/agent/security/self_counter.py)
- Deepen self-countering capabilities:
  - Add self-quarantine: isolates cognitive planning if dangerous actions (e.g. `rm -rf /`, raw disk writes, modifying core polkit rules) are hallucinated.
  - Add automatic memory and resource governor: trips if agent RAM exceeds 50MB or CPU exceeds 15% for >5s.
  - Add pre-action micro-snapshot auto-cleanup and verified rollback test.

#### [MODIFY] [`agent/security/threat_detector.py`](file:///home/alpesh/mint-agent-os/agent/security/threat_detector.py)
- Dynamically load synthesized attack signatures from `ImmuneSystem`.
- Add brute-force login sentry (auditing `/var/log/auth.log` or systemd journal for failed SSH/PAM attempts).
- Add reverse shell and stealth port scan detection.

---

### Component 3: CLI, Fast Cognitive Router & WebUI Dashboard

#### [MODIFY] [`agent/cli.py`](file:///home/alpesh/mint-agent-os/agent/cli.py)
- Add `--immune-status`: Displays immune memory, active antibodies, and future attack resilience rating.
- Add `--harden-future`: Proactively synthesizes antibodies and applies kernel anti-attack hardening.
- Add `--defcon`: Displays the active DEFCON threat level and escalation posture.

#### [MODIFY] [`agent/brain/inference.py`](file:///home/alpesh/mint-agent-os/agent/brain/inference.py)
- Add natural language intent routing:
  - "immune status", "future attacks", "harden pc", "how prepared are we", "defcon level", "counter yourself".

#### [MODIFY] [`agent/webui/server.py`](file:///home/alpesh/mint-agent-os/agent/webui/server.py)
- Add endpoints:
  - `GET /api/immune`: Returns antibodies, learned attack vectors, and resilience score.
  - `POST /api/harden_future`: Triggers proactive antibody synthesis and kernel anti-attack hardening.
  - `GET /api/defcon`: Returns DEFCON state and active defensive measures.

#### [MODIFY] [`agent/webui/static/index.html`](file:///home/alpesh/mint-agent-os/agent/webui/static/index.html)
- Add DEFCON status badge in header (`DEFCON 4: SECURE` / `DEFCON 1: LOCKDOWN`).
- Add Digital Immune System card in the Cyber Defense tab:
  - Real-time antibody count and resilience score.
  - List of neutralized attack vectors and learned threat signatures.
  - Interactive button: "🛡️ Synthesize Antibodies & Harden for Future Attacks".

---

### Component 4: 24/7 Simulator & Live GitHub Sync

#### [MODIFY] [`docs/index.html`](file:///home/alpesh/mint-agent-os/docs/index.html) & [`docs/js/agent_simulator.js`](file:///home/alpesh/mint-agent-os/docs/js/agent_simulator.js)
- Update simulator with DEFCON badge and Digital Immune System panel.
- Add simulated `--immune-status` and `--harden-future` commands in the terminal and WebUI chips.
- Verify live deployment at [https://thakoralpesh3.github.io/mint-agent-os/](https://thakoralpesh3.github.io/mint-agent-os/).

---

## Verification Plan

### Automated Tests
1. **Digital Immune System Test**:
   ```bash
   python3 -c "
   from agent.security.immune_system import ImmuneSystem
   imm = ImmuneSystem()
   print('Immune status:', imm.get_immune_status())
   res = imm.harden_system_for_future_attacks()
   print('Hardening result:', res)
   "
   ```
2. **Dynamic DEFCON Escalation & Self-Counter Test**:
   ```bash
   python3 -c "
   from agent.security.guardian import SecurityGuardian
   g = SecurityGuardian()
   print('Posture:', g.get_full_security_posture()['defcon'])
   "
   ```
3. **CLI Commands Verification**:
   ```bash
   python3 agent/cli.py --immune-status
   python3 agent/cli.py --harden-future
   python3 agent/cli.py --security
   ```
4. **WebUI Endpoints Verification**:
   ```bash
   curl -s http://127.0.0.1:9998/api/immune | jq .
   curl -s http://127.0.0.1:9998/api/defcon | jq .
   ```
5. **Simulator Deployment & GitHub Sync Verification**:
   ```bash
   /home/alpesh/mint-agent-os/sync_to_github.sh
   curl -sI https://thakoralpesh3.github.io/mint-agent-os/
   ```
