# One Word A Day

Learn one everyday **Korean** and one **Tagalog** (Filipino) word each day: native script with a 🔊 pronounce button, romanization / pronunciation tip, and a short definition. A date-seeded pair shows by default; **New words** swaps to another unused pair.

## Run

```bash
npm install
npm run dev   # http://localhost:3000
```

Words live in `data/pairs.json` (~56 shared meanings), generated from `scripts/build-pairs.py` (`python3 scripts/build-pairs.py`). Each entry: `{ id, english, korean: {word, romanization, definition, examples: [{text, highlight, en, tense}]}, tagalog: {...} }`. Each day (or refresh) shows one meaning in both languages with 2–4 short conversational sentences; the target word (as conjugated) is highlighted in soft yellow, and a badge marks past/present/future/polite etc.

## Speech

Pronunciation plays pre-generated MP3s in `public/audio/ko/<id>.mp3` / `<id>-ex1.mp3`, `<id>-ex2.mp3`, … and the same under `public/audio/tl/` (`<id>` = pair id, e.g. `water`). If a clip is missing or fails, it falls back to the browser's Web Speech API.

### Regenerating audio

Clips were made with [edge-tts](https://github.com/rany2/edge-tts) (Microsoft Edge online neural voices, no API key): `ko-KR-SunHiNeural` for Korean and `fil-PH-BlessicaNeural` for Tagalog, at rate -15%.

```bash
pip install edge-tts
python3 scripts/generate-audio.py          # only creates missing clips
python3 scripts/generate-audio.py --force  # regenerate all
```

Because filenames are index-based, if you insert/reorder words in the JSON, rerun with `--force`. Generation needs internet; playback in the app does not.

## Phase 2: Android APK (private sideload, Capacitor)

The app is exported as static files (`output: "export"` → `out/`) and wrapped by Capacitor (`android/`). App id `com.adwnk.onewordaday`, name "One Word A Day".

### One-time setup on Windows
1. Install **Android Studio** (https://developer.android.com/studio) with defaults — it includes the Android SDK and a bundled JDK.
2. Open Android Studio once and let it finish downloading SDK components.
3. In PowerShell, point Gradle at the bundled JDK and SDK (adjust if installed elsewhere):
   ```powershell
   setx JAVA_HOME "C:\Program Files\Android\Android Studio\jbr"
   setx ANDROID_HOME "$env:LOCALAPPDATA\Android\Sdk"
   ```
   Close and reopen PowerShell.

### Build the APK
```powershell
cd $HOME\Desktop\onewordaday
git pull
cmd /c "npm install"
cmd /c "npm run apk:debug"
```
APK: `android\app\build\outputs\apk\debug\app-debug.apk`

Alternative: `cmd /c "npm run android"` then `cmd /c "npm run cap:open"` and in Android Studio use **Build → Build App Bundle(s)/APK(s) → Build APK(s)**.

### Install on a Samsung phone
Copy `app-debug.apk` to the phone (USB, Google Drive, etc.), tap it, and allow "Install unknown apps" for the app you opened it from.

### Scripts
- `npm run build:app` – static export to `out/`
- `npm run cap:sync` – copy `out/` into the Android project
- `npm run android` – build + sync
- `npm run cap:open` – open in Android Studio
- `npm run apk:debug` – build + sync + Gradle debug APK
