# One Word A Day

Learn one everyday **Korean** and one **Tagalog** (Filipino) word each day: native script with a 🔊 pronounce button, romanization / pronunciation tip, and a short definition. A date-seeded pair shows by default; **New words** swaps to another unused pair.

## Run

```bash
npm install
npm run dev   # http://localhost:3000
```

Words live in `data/pairs.json`: one entry per shared meaning (`{ id, english, korean: {word, romanization, definition, example, exampleEn}, tagalog: {...} }`). Each day (or refresh) shows one meaning in both languages, with a short conversational example sentence.

## Speech

Pronunciation plays pre-generated MP3s in `public/audio/ko/<id>.mp3` / `<id>-example.mp3` and the same under `public/audio/tl/` (`<id>` = pair id, e.g. `water`). If a clip is missing or fails, it falls back to the browser's Web Speech API.

### Regenerating audio

Clips were made with [edge-tts](https://github.com/rany2/edge-tts) (Microsoft Edge online neural voices, no API key): `ko-KR-SunHiNeural` for Korean and `fil-PH-BlessicaNeural` for Tagalog, at rate -15%.

```bash
pip install edge-tts
python3 scripts/generate-audio.py          # only creates missing clips
python3 scripts/generate-audio.py --force  # regenerate all
```

Because filenames are index-based, if you insert/reorder words in the JSON, rerun with `--force`. Generation needs internet; playback in the app does not.
