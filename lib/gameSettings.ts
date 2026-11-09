const MUSIC_KEY = "owa-music";
const SFX_KEY = "owa-sfx";

export type GameSettings = { music: boolean; sfx: boolean };

const listeners = new Set<() => void>();
let cache: GameSettings | null = null;

function readFlag(key: string): boolean {
  try {
    const v = localStorage.getItem(key);
    return v !== "0";
  } catch {
    return true;
  }
}

function writeFlag(key: string, on: boolean) {
  try {
    localStorage.setItem(key, on ? "1" : "0");
  } catch {
    /* ignore */
  }
}

export function loadGameSettings(): GameSettings {
  return { music: readFlag(MUSIC_KEY), sfx: readFlag(SFX_KEY) };
}

export function getGameSettings(): GameSettings {
  if (cache == null) cache = loadGameSettings();
  return cache;
}

export function subscribeGameSettings(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function emit() {
  listeners.forEach((l) => l());
}

export function setMusicEnabled(on: boolean) {
  const cur = getGameSettings();
  if (cur.music === on) return;
  cache = { ...cur, music: on };
  writeFlag(MUSIC_KEY, on);
  emit();
}

export function setSfxEnabled(on: boolean) {
  const cur = getGameSettings();
  if (cur.sfx === on) return;
  cache = { ...cur, sfx: on };
  writeFlag(SFX_KEY, on);
  emit();
}
