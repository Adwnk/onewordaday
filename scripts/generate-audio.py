#!/usr/bin/env python3
"""Pre-generate pronunciation clips with edge-tts (pip install edge-tts).
Files: public/audio/ko/<index>.mp3 and public/audio/tl/<index>.mp3,
where <index> is the word's position in data/korean.json / data/tagalog.json.
Usage: python3 scripts/generate-audio.py [--force]
"""
import asyncio, json, sys
from pathlib import Path
import edge_tts

ROOT = Path(__file__).resolve().parent.parent
SETS = [("korean.json", "ko", "ko-KR-SunHiNeural"), ("tagalog.json", "tl", "fil-PH-BlessicaNeural")]
RATE = "-15%"

async def main(force):
    for data, code, voice in SETS:
        words = json.loads((ROOT / "data" / data).read_text(encoding="utf-8"))
        out = ROOT / "public" / "audio" / code
        out.mkdir(parents=True, exist_ok=True)
        for i, w in enumerate(words):
            f = out / f"{i}.mp3"
            if f.exists() and not force:
                continue
            await edge_tts.Communicate(w["word"], voice, rate=RATE).save(str(f))
            print(f"{code}/{i}.mp3  {w['word']}")

asyncio.run(main("--force" in sys.argv))
