#!/usr/bin/env python3
"""Pre-generate pronunciation clips with edge-tts (pip install edge-tts).
Reads data/pairs.json + data/vocab.json and writes, per verb id / vocab id:
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
# Keys are (lang, clip name); kept for when "yes"/"Oo" clips come back.
TTS_OVERRIDES = {
    ("tl", "yes"): "oh-oh.",
    ("tl", "yes-ex1"): "Oh-oh, sige.",
}

def clips():
    """Yield (code, name, tts_text) for every clip the app needs."""
    pairs = json.loads((ROOT / "data" / "pairs.json").read_text(encoding="utf-8"))
    vocab = json.loads((ROOT / "data" / "vocab.json").read_text(encoding="utf-8"))
    for key, code, _ in LANGS:
        for p in pairs:
            w = p[key]
            yield code, p["id"], w["word"]
            for i, e in enumerate(w["examples"]):
                if "audioId" not in e:
                    yield code, f"{p['id']}-ex{i+1}", e["text"]
        for v in vocab:
            if v["lang"] == key:
                yield code, v["id"], v["word"]

async def main(force, only):
    voices = {code: voice for _, code, voice in LANGS}
    man_f = ROOT / "scripts" / "audio-manifest.json"  # kept out of public/ so it never ships in the APK
    manifest = json.loads(man_f.read_text()) if man_f.exists() else {}
    want = {}
    for code, name, text in clips():
        text = TTS_OVERRIDES.get((code, name), text)
        rel = f"{code}/{name}"
        want[rel] = text
        f = ROOT / "public" / "audio" / f"{rel}.mp3"
        f.parent.mkdir(parents=True, exist_ok=True)
        if only and rel not in only:
            continue
        if f.exists() and manifest.get(rel) == text and not force:
            continue
        for attempt in range(4):
            try:
                await edge_tts.Communicate(text, voices[code], rate=RATE).save(str(f)); break
            except Exception as e:
                print("retry", rel, e); await asyncio.sleep(2 * (attempt + 1))
        compress(f)
        manifest[rel] = text
        man_f.write_text(json.dumps(manifest, ensure_ascii=False, indent=0, sort_keys=True) + "\n", encoding="utf-8")
        print(f"{rel}.mp3  {text}")
    # remove orphans (files no longer referenced by the data)
    for f in (ROOT / "public" / "audio").glob("*/*.mp3"):
        rel = f"{f.parent.name}/{f.stem}"
        if rel not in want:
            f.unlink(); print("removed orphan", rel)
    manifest = {k: v for k, v in manifest.items() if k in want}
    man_f.write_text(json.dumps(manifest, ensure_ascii=False, indent=0, sort_keys=True) + "\n", encoding="utf-8")

if "--compress-all" in sys.argv:
    for f in sorted((ROOT / "public" / "audio").glob("*/*.mp3")): compress(f)
    sys.exit()
only = set(sys.argv[sys.argv.index("--only") + 1].split(",")) if "--only" in sys.argv else set()
asyncio.run(main("--force" in sys.argv, only))
