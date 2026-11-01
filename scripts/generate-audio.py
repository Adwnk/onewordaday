#!/usr/bin/env python3
"""Pre-generate pronunciation clips with edge-tts (pip install edge-tts).
Reads data/pairs.json and writes, per pair id:
  public/audio/ko/<id>.mp3, public/audio/ko/<id>-example.mp3
  public/audio/tl/<id>.mp3, public/audio/tl/<id>-example.mp3
Usage: python3 scripts/generate-audio.py [--force]
"""
import asyncio, json, sys
from pathlib import Path
import edge_tts

ROOT = Path(__file__).resolve().parent.parent
LANGS = [("korean", "ko", "ko-KR-SunHiNeural"), ("tagalog", "tl", "fil-PH-BlessicaNeural")]
RATE = "-15%"

async def main(force):
    pairs = json.loads((ROOT / "data" / "pairs.json").read_text(encoding="utf-8"))
    for key, code, voice in LANGS:
        out = ROOT / "public" / "audio" / code
        out.mkdir(parents=True, exist_ok=True)
        for p in pairs:
            w = p[key]
            for name, text in ((p["id"], w["word"]), (f"{p['id']}-example", w["example"])):
                f = out / f"{name}.mp3"
                if f.exists() and not force:
                    continue
                await edge_tts.Communicate(text, voice, rate=RATE).save(str(f))
                print(f"{code}/{name}.mp3  {text}")

asyncio.run(main("--force" in sys.argv))
