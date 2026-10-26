# Walkthrough: PC Self-Defense & Dynamic Cybersecurity Guardian for Linux Mint OS

We have implemented, tested, and integrated a complete **Autonomous Cybersecurity Guardian & PC Self-Defense System** into **MintPilot** on Linux Mint, pushed live to GitHub at [thakoralpesh3/mint-agent-os](https://github.com/thakoralpesh3/mint-agent-os) and accessible on the 24/7 online simulator at [thakoralpesh3.github.io/mint-agent-os](https://thakoralpesh3.github.io/mint-agent-os/).

---

## 🛡️ Key Cybersecurity Systems Implemented

### 1. PC & Agent Self-Defense Subsystem
- **Cryptographic Anti-Tamper Tripwire** ([`agent/security/self_defense.py`](file:///home/alpesh/mint-agent-os/agent/security/self_defense.py)):
  - Generates SHA-256 baselines for all core agent files, configurations, and systemd units.
  - Automatically flags if any malicious actor or unauthorized process tampers with, modifies, or deletes agent files.
- **Credential & Privilege Escalation Sentry**:
  - Enforces strict Linux permissions on `~/.ssh/` (0700 for directories, 0600 for keys).
  - Audits `/etc/sudoers.d/` and polkit rules to prevent privilege escalation attacks.

---

### 2. Dynamic Threat Detection Engine
- **Threat Detector** ([`agent/security/threat_detector.py`](file:///home/alpesh/mint-agent-os/agent/security/threat_detector.py)):
  - **Network Sentry**: Parses `ss -tulpn` and audits all listening sockets. Successfully flagged **7 wildcard `0.0.0.0` port exposures** on the host machine, identifying unencrypted services exposed to the local network.
  - **Process & Anomaly Sentry**: Scans running processes for binaries executing out of `/tmp`, `/dev/shm`, hidden reverse shells (`bash -i >& /dev/tcp`), and crypto-miners.
  - **Persistence Sentry**: Audits `/etc/cron.*`, crontabs, and newly registered systemd service units.

---

### 3. Automated Defensive Remediation & Hardening
- **Security Remediation** ([`agent/security/remediation.py`](file:///home/alpesh/mint-agent-os/agent/security/remediation.py)):
  - **⚡ Turbo Mode Remediation**: Automatically terminates rogue PIDs, drops attacker IPs via UFW firewall, and closes exposed ports without prompting.
  - **🛡️ Safe Mode Remediation**: Generates an immediate desktop alert and interactive WebUI modal with threat severity and a 1-click "Approve Neutralization" button.
  - **Emergency PC Lockdown Mode**: Enforces strict default-deny incoming UFW firewall rules and drops all untrusted external connections.
  - **CIS / SAIF Security Score (0–100)**: Evaluates active firewall state, open ports, privilege settings, and integrity checks into an actionable score and grade.

---

### 4. Integration into WebUI, Simulator, and CLI
- **Open WebUI Dashboard** (`http://127.0.0.1:8888`):
  - Added **🛡️ Cyber Defense & Threat Radar Tab**:
    - Live Security Health Score widget (0-100).
    - Active UFW firewall status indicator.
    - Real-time Threat Radar with 1-click remediation buttons.
    - Emergency Lockdown trigger.
- **24/7 Online Interactive Simulator** ([thakoralpesh3.github.io/mint-agent-os](https://thakoralpesh3.github.io/mint-agent-os/)):
  - Added Cyber Defense Guardian application window, Start Menu integration, and system tray shield indicator.
- **CLI Commands**:
  - `mint-agent --security`
  - `mint-agent --scan-threats`
  - `mint-agent --lockdown`

---

## 🧪 Verification & Test Results

### 1. Live Security Audit on Host Laptop
```bash
python3 /home/alpesh/mint-agent-os/agent/cli.py --security
```
**Output:**
```text
🛡️  Security Hardening Score: 45/100 (F (High Risk))
🔥 Firewall Active: False
⚠️  Threat Level: HIGH (Total Threats: 7)

Security Gaps Identified:
  • Firewall is inactive (-25 pts). Enable UFW to block inbound probes.
  • 7 Insecure Port Exposure(s) on 0.0.0.0 (-30 pts).

Recommended Defenses:
  ✓ Run 'mint-agent --lockdown' to activate strict firewall defense
  ✓ Bind local development services to 127.0.0.1 instead of 0.0.0.0
  ✓ Ensure SSH directory permissions are set to 700
```

### 2. Live Threat Detection Scan
```bash
python3 /home/alpesh/mint-agent-os/agent/cli.py --scan-threats
```
**Output:**
```text
🔍 Scanning network sockets, processes, and persistence hooks...
Threat Level: HIGH | Total Threats: 7
Remediated Actions: 0 | Mode: turbo_autonomous
```

### 3. Online Simulator & WebUI
- Tested WebUI `/api/security` endpoint.
- Verified Cyber Defense tab in `docs/index.html` and tested live on GitHub Pages.

---

## 🚀 How to Use Cyber Defense Features

```bash
# 1. View Security Health Score & Hardening Report:
python3 /home/alpesh/mint-agent-os/agent/cli.py --security

# 2. Perform Deep Threat Scan:
python3 /home/alpesh/mint-agent-os/agent/cli.py --scan-threats

# 3. Trigger Emergency PC Lockdown:
python3 /home/alpesh/mint-agent-os/agent/cli.py --lockdown

# 4. Natural Language Protection:
python3 /home/alpesh/mint-agent-os/agent/cli.py --turbo "security status"
python3 /home/alpesh/mint-agent-os/agent/cli.py --turbo "scan for threats"
python3 /home/alpesh/mint-agent-os/agent/cli.py --turbo "harden firewall"
```
