# Walkthrough: Linux Mint OS Upgrade Engine & Offline/Online AI Customization

We have implemented, verified, and synchronized two major capabilities for **MintPilot on Linux Mint**:
1. **In-Place OS Upgrade & Installation Engine**: Allows any existing Linux Mint system to be converted into MintPilot Agent OS via a 1-line script or in-place CLI/WebUI updates.
2. **Offline & Online AI Customization**: Gives users complete control to switch their AI model themselves between local offline SLMs (Qwen 0.5B–7B, DeepSeek R1, GGUF, Ollama) and online cloud models (Google Gemini 2.5, OpenAI GPT-4o, Anthropic Claude, custom endpoints) via WebUI, CLI, and natural language.

All source code, live sync daemons, and artifacts are published and synchronized live on GitHub at [thakoralpesh3/mint-agent-os](https://github.com/thakoralpesh3/mint-agent-os) and deployed on the 24/7 online simulator at [thakoralpesh3.github.io/mint-agent-os](https://thakoralpesh3.github.io/mint-agent-os/).

---

## 🚀 1. In-Place Linux Mint OS Upgrade Engine

### 1-Line Universal Upgrade Script ([`upgrade_mint_to_agent_os.sh`](file:///home/alpesh/mint-agent-os/upgrade_mint_to_agent_os.sh))
Users running Linux Mint (21.x or 22.x) can transform their existing installation without reformatting or reinstalling:

```bash
curl -sSL https://raw.githubusercontent.com/thakoralpesh3/mint-agent-os/main/upgrade_mint_to_agent_os.sh | sudo bash
```

### What the Script Automates:
1. **OS & Hardware Tier Detection**: Verifies `/etc/os-release` and optimizes for 2GB–4GB low RAM or high-spec hardware.
2. **Dependency Installation**: Non-interactively installs `brightnessctl`, `pulseaudio-utils`, `xdotool`, `wmctrl`, `maim`, `tesseract-ocr`, `speech-dispatcher`, `ufw`, and `git`.
3. **Passwordless Polkit Control**: Installs `/etc/polkit-1/rules.d/99-mint-agent-permissions.rules` for seamless brightness, volume, power, and network control.
4. **Systemd Background Daemon**: Deploys, enables, and starts `mint-agent.service` for the desktop user.
5. **Desktop & Menu Integration**: Places desktop shortcuts in `/usr/share/applications/` and on `~/Desktop/`.
6. **Global CLI Launcher**: Installs `/usr/local/bin/mint-agent` accessible from any terminal.
7. **Security Baseline Setup**: Establishes SHA-256 cryptographic tripwires, activates UFW firewall, and deploys canary honeypots.

### In-Place Routine Updates ([`agent/core/updater.py`](file:///home/alpesh/mint-agent-os/agent/core/updater.py))
```bash
# Check if a new version is available upstream:
mint-agent --check-update

# Run in-place upgrade from GitHub:
mint-agent --update-os
```

---

## 🧠 2. Offline & Online AI Model Customization System

Users can customize and switch their AI brain anytime:

```mermaid
graph TD
    User([User]) --> Selector[WebUI Badge / CLI / Natural Language]
    Selector --> MM[ModelManager Core]

    subgraph "Offline AI (Zero Internet, 100% Private)"
        MM --> Q05[Qwen2.5 0.5B Ultra-Light 400MB RAM]
        MM --> Q15[Qwen2.5 Coder 1.5B 1.1GB RAM]
        MM --> DSK[DeepSeek R1 Distill 1.5B 1.2GB RAM]
        MM --> Q3[Qwen2.5 3B 2.2GB RAM]
        MM --> Q7[Qwen2.5 7B 5.0GB RAM]
        MM --> LocalGGUF[User Local .gguf Path]
        MM --> Ollama[Local Ollama http://localhost:11434]
    end

    subgraph "Online Cloud AI (Frontier Intelligence)"
        MM --> Gemini[Google Gemini 2.5 Flash / Pro]
        MM --> OpenAI[OpenAI GPT-4o / GPT-4o-mini]
        MM --> Claude[Anthropic Claude 3.5 Haiku / Sonnet]
        MM --> Custom[Custom OpenAI-Compatible Endpoint]
    end

    Online Cloud -.->|Internet Down or Key Missing| Q05
```

### Automatic Zero-Downtime Offline Fallback:
If an online cloud model is selected but internet drops or an API key is missing, MintPilot **automatically and gracefully falls back to the local offline SLM**, ensuring that laptop control and cybersecurity protection are never interrupted.

---

## 🧪 Verification & Test Results

### 1. Model Listing & Active Model Inspection
```bash
python3 /home/alpesh/mint-agent-os/agent/cli.py --list-models
```
```text
Active AI: Qwen2.5 0.5B Instruct (Ultra-Light) [Provider: OFFLINE]

--- OFFLINE LOCAL SLM MODELS (Zero Internet Required) ---
  ★ (ACTIVE) qwen2.5-0.5b-instruct      | RAM: 400MB | Qwen2.5 0.5B Instruct (Ultra-Light)
    qwen2.5-coder-1.5b         | RAM: 1100MB | Qwen2.5 Coder 1.5B (Code & Tool Use)
    deepseek-r1-distill-1.5b   | RAM: 1200MB | DeepSeek R1 Distill 1.5B (Offline Reasoning)
    qwen2.5-3b-instruct        | RAM: 2200MB | Qwen2.5 3B Instruct (Balanced)
    qwen2.5-7b-instruct        | RAM: 5000MB | Qwen2.5 7B Instruct (High-Performance)
    custom-gguf                | RAM: 1500MB | Custom Local GGUF Model
    local-ollama               | RAM: 2000MB | Local Ollama Daemon (http://localhost:11434)

--- ONLINE CLOUD AI MODELS (Frontier Intelligence) ---
    gemini-2.5-flash           | Speed: Ultra-Fast (<300ms) | Google Gemini 2.5 Flash
    gemini-2.5-pro             | Speed: Deep Reasoning   | Google Gemini 2.5 Pro
    gpt-4o-mini                | Speed: Fast             | OpenAI GPT-4o-mini
    gpt-4o                     | Speed: Standard         | OpenAI GPT-4o
    claude-3-5-haiku           | Speed: Very Fast        | Anthropic Claude 3.5 Haiku
    claude-3-5-sonnet          | Speed: Deep Thinking    | Anthropic Claude 3.5 Sonnet
    custom-openai-compatible   | Speed: Configurable     | Custom OpenAI-Compatible API
```

### 2. Model Switching Test
```bash
# Switch to offline 1.5B coder:
python3 /home/alpesh/mint-agent-os/agent/cli.py --set-model qwen2.5-coder-1.5b
# Output: ✓ Successfully switched active AI to: 'qwen2.5-coder-1.5b' (OFFLINE)

# Reset to default 0.5B ultra-light:
python3 /home/alpesh/mint-agent-os/agent/cli.py --set-model qwen2.5-0.5b-instruct
# Output: ✓ Successfully switched active AI to: 'qwen2.5-0.5b-instruct' (OFFLINE)
```

### 3. Check OS Update Test
```bash
python3 /home/alpesh/mint-agent-os/agent/cli.py --check-update
```
```text
🔍 Checking GitHub repository for MintPilot Agent OS updates...
✓ MintPilot Agent OS is completely up to date! (Commit: 561f6c1)
```

### 4. WebUI API Endpoints Verification
- `GET /api/models` -> returned 14 models with active model metadata.
- `POST /api/set_model` -> successfully switched to `gemini-2.5-flash` and reset to `qwen2.5-0.5b-instruct`.
- `GET /api/check_update` -> returned up to date status.

### 5. 24/7 Simulator Live Status
```bash
curl -sI https://thakoralpesh3.github.io/mint-agent-os/
```
```text
HTTP/2 200 OK
content-length: 22893
server: GitHub.com
```

---

## 📋 Summary of User Options

| User Goal | How to Do It |
|---|---|
| **Upgrade Existing Linux Mint to Agent OS** | Run `curl -sSL https://raw.githubusercontent.com/thakoralpesh3/mint-agent-os/main/upgrade_mint_to_agent_os.sh \| sudo bash` |
| **Check for Agent OS Updates** | `mint-agent --check-update` or click "Update OS" in WebUI |
| **Perform In-Place Agent OS Upgrade** | `mint-agent --update-os` or click "Run In-Place Upgrade" in WebUI |
| **View All AI Models (Offline & Online)** | `mint-agent --list-models` or click "🧠 AI" badge in WebUI |
| **Switch to Offline Local Model** | `mint-agent --set-model qwen2.5-1.5b` or pick in WebUI |
| **Switch to Online Google Gemini** | `mint-agent --set-key gemini <KEY>` then `mint-agent --set-model gemini-2.5-flash` |
| **Switch to Online OpenAI GPT-4o** | `mint-agent --set-key openai <KEY>` then `mint-agent --set-model gpt-4o` |
| **Try 24/7 Online OS Simulator** | Visit [thakoralpesh3.github.io/mint-agent-os](https://thakoralpesh3.github.io/mint-agent-os/) |
