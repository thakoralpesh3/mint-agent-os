# Implementation Plan: Active Counter-Defense & Agent Self-Countering Safety Circuit Breaker

This update introduces two advanced defense systems to **MintPilot**:
1. **Active Threat Counter-Measures (Counter-Defense)**: Active intruder disruption, TCP RST socket killing, attacker IP tarpitting, and canary decoy honeypots that trap and neutralize adversaries in real time.
2. **Agent Self-Countering Circuit Breaker (Countering Itself)**: An autonomous safety governor and "Dead Man's Switch" that monitors MintPilot itself. If the agent enters a runaway hallucination loop, consumes excessive resources, attempts unsafe self-modification, or executes an erroneous action, it automatically **counters itself**, halts execution, and rolls back to the last known safe system snapshot.

---

## User Review Required

> [!IMPORTANT]
> **Active Counter-Defense & Self-Countering Safety Architecture**:
> - **Active Threat Counter-Measures**:
>   - **Socket Disruption**: Immediately drops and severs established connections from attacker IPs using `ss -K` / `iptables REJECT --reject-with tcp-reset`.
>   - **Canary Decoy Honeypots**: Deploys lightweight decoy credentials (`~/.config/mint-agent/canary.token`) that act as intrusion tripwires; any unauthorized process attempting to read them triggers an immediate autonomous counter-lockdown.
> - **Self-Countering Circuit Breaker (AI Safety Governor)**:
>   - **Runaway Loop Detection**: If MintPilot's own processes exceed predefined CPU (>75% for 60s) or memory thresholds, the circuit breaker counters the agent itself by throttling and resetting the reasoning state.
>   - **Configuration Rollback Snapshots**: Automatically captures micro-snapshots of configuration and system state before making changes; if a change causes a failure, it autonomously rolls back to the previous snapshot.

---

## Architecture Overview

```mermaid
graph TD
    subgraph Active Counter-Defense (Countering Threats)
        ThreatDetector["Threat Sentry (Intruders, Scanners)"] --> CounterRouter{"Counter-Defense Router"}
        CounterRouter --> TCPKill["Socket Disruption (TCP RST / ss -K)"]
        CounterRouter --> Tarpit["Attacker IP Tarpit & Drop"]
        CounterRouter --> DecoyTraps["Canary Honeypot Decoys (Tripwire Alarms)"]
    end

    subgraph Self-Countering Circuit Breaker (Countering Itself)
        AgentWatchdog["Independent Safety Watchdog"] --> BehavioralAudit["Agent Resource & Loop Audit"]
        BehavioralAudit --> AnomalyDetector{"Runaway Loop / Hallucination?"}
        AnomalyDetector -->|Yes| SelfHalt["Counter Itself: Throttle Process & Reset Loop"]
        
        StateSnapshot["Pre-Action Snapshot Engine"] --> Rollback["Autonomous State Rollback"]
        AnomalyDetector -->|Corrupted State| Rollback
    end

    subgraph Integration
        CounterRouter --> WebUI["Open WebUI: Counter-Measures Panel"]
        SelfHalt --> WebUI
        CounterRouter --> Simulator["24/7 Online Simulator"]
    end
```

---

## Proposed Changes

### 1. Active Threat Counter-Measures Engine

#### [NEW] [agent/security/counter_measures.py](file:///home/alpesh/mint-agent-os/agent/security/counter_measures.py)
- **Active Socket Disruption**: Uses `ss -K dst <IP>` and `iptables` to immediately sever active malicious sessions.
- **Canary Honeypot Traps**: Deploys fake decoy files in `~/.aws/credentials.canary` or `~/.ssh/canary_key`. An inotify watcher triggers immediate counter-isolation if touched.
- **Tarpit & Blacklisting**: Enforces persistent firewall drop rules against repeat offender IPs.

---

### 2. Agent Self-Countering Circuit Breaker

#### [NEW] [agent/security/self_counter.py](file:///home/alpesh/mint-agent-os/agent/security/self_counter.py)
- **Dead Man's Switch & Safety Governor**:
  - Monitors MintPilot's child processes, CPU usage, and reasoning iteration counters.
  - If a loop exceeds 10 rapid repetitive tool calls or CPU spikes past safe limits, the governor **counters the agent itself**, pauses the agent, and outputs a diagnostic trace.
- **Pre-Action Snapshot & Rollback**:
  - Captures configuration state (`settings.json`, firewall rules, network profiles) before executing multi-step operations.
  - Automatically counters and reverts unwanted state changes if an error is detected.

---

### 3. Integration with Brain, CLI, WebUI, and Simulator

#### [MODIFY] [agent/brain/inference.py](file:///home/alpesh/mint-agent-os/agent/brain/inference.py)
- Wire `CounterMeasures` and `SelfCounterCircuitBreaker` into the cognitive dispatch loop.
- Support natural language intents: `"counter threats"`, `"deploy decoys"`, `"self-check"`, `"rollback last change"`.

#### [MODIFY] [agent/cli.py](file:///home/alpesh/mint-agent-os/agent/cli.py)
- Add flags:
  - `mint-agent --counter-threats`
  - `mint-agent --deploy-decoys`
  - `mint-agent --self-check`
  - `mint-agent --rollback`

#### [MODIFY] [agent/webui/static/index.html](file:///home/alpesh/mint-agent-os/agent/webui/static/index.html) & [docs/](file:///home/alpesh/mint-agent-os/docs/)
- Add **Counter-Defense & Circuit Breaker status** to the Cyber Defense tab in the WebUI and the 24/7 Online Simulator.

---

## Verification Plan

### Automated Tests
1. **Canary Trap Test**:
   - Deploy canary decoy; trigger access and verify immediate counter-alarm.
2. **Self-Countering Circuit Breaker Test**:
   - Simulate a runaway loop (e.g. 15 repetitive iterations); verify the circuit breaker intercepts and halts execution.
   - Test pre-action snapshot creation and successful rollback.
3. **WebUI & Simulator Test**:
   - Verify `/api/security` returns counter-measure and self-defense telemetry.
4. **GitHub Auto-Sync**:
   - Verify all modules push to `thakoralpesh3/mint-agent-os`.
