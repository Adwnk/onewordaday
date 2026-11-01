# One Word A Day

Learn one everyday **Korean** and one **Filipino** word each day: native script with a 🔊 pronounce button, romanization / pronunciation tip, and a short definition. A date-seeded pair shows by default; **New words** swaps to another unused pair.

## Run

```bash
npm install
npm run dev   # http://localhost:3000
```

Words live in `data/korean.json` and `data/filipino.json` (`{ word, romanization, definition }`).

## Speech

Pronunciation uses the browser's Web Speech API (`speechSynthesis`) with `ko-KR` and `fil-PH`/`tl`. Voice availability depends on your browser/OS — Chrome and Safari usually have Korean; Filipino voices are rarer, so it may fall back to a default voice.
