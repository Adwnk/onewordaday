#!/usr/bin/env python3
"""Pre-generate pronunciation clips with edge-tts (pip install edge-tts).
Reads data/pairs.json and writes, per pair id:
  public/audio/<ko|tl>/<id>.mp3 and <id>-ex<N>.mp3 (one per example, N from 1)
Edit scripts/build-pairs.py, run it to rebuild data/pairs.json, then run this.
Usage: python3 scripts/generate-audio.py [--force] [--only tl/yes,tl/yes-ex1]
"""
import asyncio, json, sys
from pathlib import Path
import edge_tts
import subprocess

def compress(f):
    """Trim leading/trailing silence and re-encode as 32 kbps mono 22.05 kHz MP3."""
    tmp = f.with_suffix(".tmp.mp3")
    af = ("silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.05,"
          "areverse,silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.15,areverse")
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(f), "-af", af, "-ac", "1", "-ar", "22050",
                    "-b:a", "32k", "-map_metadata", "-1", str(tmp)], check=True)
    tmp.replace(f)

ROOT = Path(__file__).resolve().parent.parent
LANGS = [("korean", "ko", "ko-KR-SunHiNeural"), ("tagalog", "tl", "fil-PH-BlessicaNeural")]
RATE = "-15%"
# TTS input overrides per (lang code, clip name); display text stays as in pairs.json.
# fil-PH-BlessicaNeural mangles standalone "Oo" (yes) into a breathy "eh?" or drops it.
TTS_OVERRIDES = {
    ("tl", "yes"): "oh-oh.",
    ("tl", "yes-ex1"): "Oh-oh, sige.",
}

async def main(force, only):
    pairs = json.loads((ROOT / "data" / "pairs.json").read_text(encoding="utf-8"))
    for key, code, voice in LANGS:
        out = ROOT / "public" / "audio" / code
        out.mkdir(parents=True, exist_ok=True)
        for p in pairs:
            w = p[key]
            items = [(p["id"], w["word"])] + [(f"{p['id']}-ex{i+1}", e["text"]) for i, e in enumerate(w["examples"]) if "audioId" not in e]
            for name, text in items:
                f = out / f"{name}.mp3"
                text = TTS_OVERRIDES.get((code, name), text)
                if only and f"{code}/{name}" not in only:
                    continue
                if f.exists() and not force and not only:
                    continue
                for attempt in range(4):
                    try:
                        await edge_tts.Communicate(text, voice, rate=RATE).save(str(f)); break
                    except Exception as e:
                        print("retry", name, e); await asyncio.sleep(2 * (attempt + 1))
                compress(f)
                print(f"{code}/{name}.mp3  {text}")

only = set(sys.argv[sys.argv.index("--only") + 1].split(",")) if "--only" in sys.argv else set()
if "--compress-all" in sys.argv:
    for f in sorted((ROOT / "public" / "audio").glob("*/*.mp3")): compress(f)
    sys.exit()
asyncio.run(main("--force" in sys.argv, only))
