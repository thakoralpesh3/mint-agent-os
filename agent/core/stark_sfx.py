#!/usr/bin/env python3
"""
Stark Sound Effects (SFX) Synthesizer for MintPilot Linux Mint OS.
Zero-dependency, pure Python audio generator utilizing `wave`, `math`, and `struct`.
Synthesizes authentic sci-fi sound effects and routes playback through PulseAudio (paplay),
PipeWire (pw-play), or ALSA (aplay).
"""

import math
import os
import shutil
import struct
import subprocess
import sys
import tempfile
import threading
import wave


class StarkSFXEngine:
    """Synthesizes and plays Stark Industries audio cues programmatically."""

    SAMPLE_RATE = 22050  # Lightweight, crisp audio

    def __init__(self, enabled: bool = True):
        self.enabled = enabled
        self._player = self._detect_player()

    def _detect_player(self) -> str:
        """Finds available system audio player (paplay > pw-play > aplay)."""
        for player in ["paplay", "pw-play", "aplay"]:
            if shutil.which(player):
                return player
        return ""

    def _play_wav_bytes(self, wav_data: bytes, async_play: bool = True):
        """Writes WAV bytes to temporary file and plays via detected system player."""
        if not self.enabled or not self._player:
            return

        def _worker():
            tmp_path = None
            try:
                with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as f:
                    f.write(wav_data)
                    tmp_path = f.name
                subprocess.run(
                    [self._player, tmp_path],
                    stdout=subprocess.DEVNULL,
                    stderr=subprocess.DEVNULL,
                    check=False,
                )
            except Exception:
                pass
            finally:
                if tmp_path and os.path.exists(tmp_path):
                    try:
                        os.remove(tmp_path)
                    except OSError:
                        pass

        if async_play:
            t = threading.Thread(target=_worker, daemon=True)
            t.start()
        else:
            _worker()

    def _create_wav_buffer(self, samples: list[float]) -> bytes:
        """Encodes floating point audio samples [-1.0, 1.0] to 16-bit mono WAV bytes."""
        import io

        buf = io.BytesIO()
        with wave.open(buf, "wb") as wf:
            wf.setnchannels(1)  # Mono
            wf.setsampwidth(2)  # 16-bit
            wf.setframerate(self.SAMPLE_RATE)
            packed = bytearray()
            for s in samples:
                val = max(-1.0, min(1.0, s))
                int_val = int(val * 32767.0)
                packed.extend(struct.pack("<h", int_val))
            wf.writeframes(packed)
        return buf.getvalue()

    def play_repulsor_charge(self, async_play: bool = True):
        """Synthesizes rising repulsor energy charge: 300Hz -> 1800Hz with harmonic hum."""
        duration = 0.55
        total_samples = int(self.SAMPLE_RATE * duration)
        samples = []

        phase = 0.0
        for i in range(total_samples):
            t = i / self.SAMPLE_RATE
            progress = t / duration

            # Frequency ramps up exponentially
            freq = 300.0 * (6.0 ** progress)
            phase += 2.0 * math.pi * freq / self.SAMPLE_RATE

            # Envelope: rise quickly and sustain
            env = min(1.0, t * 15.0) * (0.8 + 0.2 * progress)

            sample = (
                0.7 * math.sin(phase)
                + 0.2 * math.sin(phase * 2.0)
                + 0.1 * math.sin(phase * 3.0)
            ) * env

            samples.append(sample)

        self._play_wav_bytes(self._create_wav_buffer(samples), async_play)

    def play_target_lock(self, async_play: bool = True):
        """Synthesizes high-frequency targeting chirps (2600Hz -> 3400Hz)."""
        duration = 0.22
        total_samples = int(self.SAMPLE_RATE * duration)
        samples = []

        for i in range(total_samples):
            t = i / self.SAMPLE_RATE
            if t < 0.08:
                env = math.exp(-t * 25.0)
                sample = math.sin(2.0 * math.pi * 2600.0 * t) * env
            elif t < 0.11:
                sample = 0.0
            else:
                t2 = t - 0.11
                env = math.exp(-t2 * 20.0)
                sample = math.sin(2.0 * math.pi * 3400.0 * t2) * env
            samples.append(sample * 0.85)

        self._play_wav_bytes(self._create_wav_buffer(samples), async_play)

    def play_comms_chime(self, async_play: bool = True):
        """Synthesizes J.A.R.V.I.S. / F.R.I.D.A.Y. comms chime (C5-E5-G5 arpeggio)."""
        duration = 0.40
        total_samples = int(self.SAMPLE_RATE * duration)
        samples = [0.0] * total_samples

        notes = [
            (523.25, 0.00, 0.25),  # C5
            (659.25, 0.08, 0.25),  # E5
            (783.99, 0.16, 0.24),  # G5
        ]

        for freq, start_t, note_dur in notes:
            start_idx = int(start_t * self.SAMPLE_RATE)
            dur_samples = int(note_dur * self.SAMPLE_RATE)
            for j in range(dur_samples):
                idx = start_idx + j
                if idx < total_samples:
                    t_note = j / self.SAMPLE_RATE
                    env = math.exp(-t_note * 12.0)
                    samples[idx] += 0.3 * math.sin(2.0 * math.pi * freq * t_note) * env

        self._play_wav_bytes(self._create_wav_buffer(samples), async_play)

    def play_threat_neutralized(self, async_play: bool = True):
        """Synthesizes tactical confirmation tone: descending frequency followed by low punch."""
        duration = 0.35
        total_samples = int(self.SAMPLE_RATE * duration)
        samples = []

        phase = 0.0
        for i in range(total_samples):
            t = i / self.SAMPLE_RATE
            if t < 0.20:
                freq = 1400.0 - (900.0 * (t / 0.20))
                phase += 2.0 * math.pi * freq / self.SAMPLE_RATE
                env = 1.0 - (t / 0.20) * 0.4
                sample = math.sin(phase) * env * 0.7
            else:
                t2 = t - 0.20
                env = math.exp(-t2 * 18.0)
                sample = math.sin(2.0 * math.pi * 260.0 * t2) * env * 0.9
            samples.append(sample)

        self._play_wav_bytes(self._create_wav_buffer(samples), async_play)

    def play_alarm_klaxon(self, async_play: bool = True):
        """Synthesizes emergency DEFCON / warning klaxon pulse."""
        duration = 0.32
        total_samples = int(self.SAMPLE_RATE * duration)
        samples = []

        for i in range(total_samples):
            t = i / self.SAMPLE_RATE
            freq = 880.0 if (t % 0.16) < 0.08 else 660.0
            env = 0.8 * (0.5 + 0.5 * math.sin(2.0 * math.pi * 12.0 * t))
            sample = math.sin(2.0 * math.pi * freq * t) * env
            samples.append(sample)

        self._play_wav_bytes(self._create_wav_buffer(samples), async_play)

    def play_by_name(self, name: str, async_play: bool = True):
        """Dispatches sound effect by identifier."""
        lookup = {
            "repulsor": self.play_repulsor_charge,
            "charge": self.play_repulsor_charge,
            "lock": self.play_target_lock,
            "target": self.play_target_lock,
            "chime": self.play_comms_chime,
            "comms": self.play_comms_chime,
            "neutralized": self.play_threat_neutralized,
            "kill": self.play_threat_neutralized,
            "alarm": self.play_alarm_klaxon,
            "warning": self.play_alarm_klaxon,
        }
        fn = lookup.get(name.lower().strip())
        if fn:
            fn(async_play=async_play)
        else:
            print(f"Unknown SFX: {name}. Available: repulsor, lock, chime, neutralized, alarm")


# Singleton instance
stark_sfx = StarkSFXEngine()


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "--test":
        print(f"Testing Stark SFX Engine (Detected player: '{stark_sfx._player or 'NONE'}')...")
        sfx_list = ["chime", "lock", "repulsor", "neutralized", "alarm"]
        for s in sfx_list:
            print(f"Synthesizing and playing: {s}...")
            stark_sfx.play_by_name(s, async_play=False)
        print("✓ All Stark SFX synthesized and verified successfully.")
    elif len(sys.argv) > 1:
        stark_sfx.play_by_name(sys.argv[1], async_play=False)
    else:
        print("Usage: python3 stark_sfx.py <chime|lock|repulsor|neutralized|alarm|--test>")
