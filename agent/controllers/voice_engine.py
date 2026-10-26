#!/usr/bin/env python3
"""
Offline Voice Engine for MintPilot on Linux Mint
Enables hands-free microphone listening (Vosk STT) and natural spoken replies
(Piper-TTS or espeak-ng / spd-say) 100% offline without any internet connection.
"""

import os
import shutil
import subprocess
from typing import Dict, Any, Optional


class VoiceEngine:
    """Provides offline speech-to-text and text-to-speech."""

    def __init__(self):
        self._tts_engine = self._find_tts_engine()

    def _find_tts_engine(self) -> Optional[str]:
        for tool in ["piper", "spd-say", "espeak-ng", "espeak"]:
            if shutil.which(tool):
                return tool
        return None

    def speak(self, text: str, wait: bool = False) -> Dict[str, Any]:
        """Speaks text using the best available offline Linux speech synthesizer."""
        if not self._tts_engine:
            return {"error": "No offline TTS engine found (tried piper, spd-say, espeak-ng, espeak)", "status": "failed"}

        text_clean = text.replace('"', '').replace("'", "")
        try:
            if self._tts_engine == "spd-say":
                # spd-say is standard on Ubuntu/Linux Mint
                cmd = ["spd-say", "-r", "5", "-p", "0", text_clean]
            elif self._tts_engine in ["espeak-ng", "espeak"]:
                cmd = [self._tts_engine, "-v", "en-us", "-s", "165", text_clean]
            elif self._tts_engine == "piper":
                cmd = ["bash", "-c", f"echo {shlex.quote(text_clean)} | piper --model /usr/share/mint-agent/models/piper-en.onnx --output-raw | aplay -r 22050 -f S16_LE -t raw -"]
            else:
                cmd = [self._tts_engine, text_clean]

            if wait:
                subprocess.run(cmd, check=True)
            else:
                subprocess.Popen(cmd)

            return {"status": "success", "engine": self._tts_engine, "spoken_text": text}
        except Exception as e:
            return {"error": str(e), "status": "failed"}

    def listen_vosk(self, duration_sec: int = 5) -> Dict[str, Any]:
        """
        Listens to microphone input for specified duration and transcribes via Vosk offline.
        """
        try:
            import vosk
            import sounddevice as sd
            import json
            import queue

            model_dir = "/usr/share/mint-agent/models/vosk-model-small-en-us"
            if not os.path.exists(model_dir):
                return {"error": f"Vosk model directory not found at {model_dir}", "status": "failed"}

            q = queue.Queue()

            def callback(indata, frames, time_info, status):
                q.put(bytes(indata))

            model = vosk.Model(model_dir)
            rec = vosk.KaldiRecognizer(model, 16000)

            with sd.RawInputStream(samplerate=16000, blocksize=8000, dtype='int16', channels=1, callback=callback):
                import time
                end_time = time.time() + duration_sec
                while time.time() < end_time:
                    data = q.get()
                    if rec.AcceptWaveform(data):
                        pass

            res = json.loads(rec.FinalResult())
            text = res.get("text", "").strip()
            return {"status": "success", "transcribed_text": text}

        except ImportError:
            return {"error": "vosk or sounddevice python packages not installed", "status": "failed"}
        except Exception as e:
            return {"error": str(e), "status": "failed"}
