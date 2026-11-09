import { vocab } from "@/lib/vocab";
import { THEMES } from "@/lib/themes";

export type GameWord = {
  id: string;
  korean: string;
  romanization: string;
  english: string;
  grid: string;
  audio: string;
};

/** Turn a gloss like "to know" or "rice; meal" into a grid word, or null if it won't fit. */
export function toGridWord(english: string): string | null {
  let s = english.normalize("NFD").replace(/\p{M}/gu, "").trim().replace(/^to\s+/i, "");
  s = s.split(";")[0]?.trim() ?? "";
  s = s.replace(/\(.*?\)/g, "").trim();
  const tokens = s
    .split(/\s+/)
    .map((w) => w.replace(/[^A-Za-z]/g, "").toUpperCase())
    .filter((w) => w.length >= 3 && w.length <= 10);
  if (tokens.length === 0) return null;
  if (tokens.length === 1) return tokens[0];
  return tokens[tokens.length - 1];
}

/**
 * Hand-picked grid words for multi-word meanings (keyed by Hangul), so the grid never
 * shows just the last word (e.g. "karaoke room" -> ROOM). null = leave out of the games.
 */
const GRID_OVERRIDES: Record<string, string | null> = {
  노래방: "KARAOKE",
  어젯밤: "LASTNIGHT",
  방금: "JUSTNOW",
  이번: "THISTIME",
  매일: "EVERYDAY",
  밤새: "ALLNIGHT",
  작년: "LASTYEAR",
  핸드폰: "CELLPHONE",
  전화번호: "PHONENUM",
  에어컨: "AIRCON",
  가스레인지: "GASSTOVE",
  일주일: "ONEWEEK",
  언니: "UNNI",
  치킨: "CHICKEN",
  김치볶음밥: "FRIEDRICE",
  전기세: null,
  조금: null,
  좀: null,
  잠깐: null,
  위: null,
  많이: null,
  계속: null,
  곡: null, // "(song) counter" is a grammar word, not a findable noun
};

function isMultiWord(english: string): boolean {
  const s = (english.replace(/^to\s+/i, "").split(";")[0] ?? "").replace(/\(.*?\)/g, "").trim();
  return s.split(/\s+/).length > 1;
}

function fromVocab(): GameWord[] {
  return vocab.flatMap((v) => {
    if (v.lang !== "korean") return [];
    let grid: string | null;
    if (v.word in GRID_OVERRIDES) grid = GRID_OVERRIDES[v.word];
    else if (isMultiWord(v.english)) grid = null; // never fall back to a fragment
    else grid = toGridWord(v.english);
    if (!grid) return [];
    return [
      {
        id: `vocab:${v.id}`,
        korean: v.word,
        romanization: v.romanization,
        english: v.english,
        grid,
        audio: v.audio,
      },
    ];
  });
}

/** Korean Word Bank words only (no daily verbs). */
export const allGameWords: GameWord[] = fromVocab();

function shuffle<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Pick unique-per-puzzle words (unique id, Hangul, and grid spelling). */
export function pickGameWords(n: number, excludeId?: string): GameWord[] {
  const picked: GameWord[] = [];
  const usedKo = new Set<string>();
  const usedGrid = new Set<string>();
  const usedId = new Set<string>();
  for (const w of shuffle(allGameWords)) {
    if (picked.length >= n) break;
    if (excludeId && w.id === excludeId) continue;
    if (usedId.has(w.id) || usedKo.has(w.korean) || usedGrid.has(w.grid)) continue;
    usedId.add(w.id);
    usedKo.add(w.korean);
    usedGrid.add(w.grid);
    picked.push(w);
  }
  return picked;
}

export type ThemeGroup = { label: string; words: GameWord[] };

const byKorean = new Map(allGameWords.map((w) => [w.korean, w]));

/** Themes that resolve to real Word Bank words. */
export const gameThemes: ThemeGroup[] = THEMES.map((t) => ({
  label: t.label,
  words: t.words.map((k) => byKorean.get(k)).filter((w): w is GameWord => !!w),
})).filter((t) => t.words.length >= 3);

/** Pick `themeCount` themes with `perTheme` words each; no Hangul or grid spelling repeats on one board. */
export function pickThemedWords(themeCount = 3, perTheme = 3): ThemeGroup[] | null {
  const usedKo = new Set<string>();
  const usedGrid = new Set<string>();
  const groups: ThemeGroup[] = [];
  for (const theme of shuffle(gameThemes)) {
    if (groups.length >= themeCount) break;
    const words: GameWord[] = [];
    for (const w of shuffle(theme.words)) {
      if (words.length >= perTheme) break;
      if (usedKo.has(w.korean) || usedGrid.has(w.grid) || words.some((x) => x.grid === w.grid)) continue;
      words.push(w);
    }
    if (words.length < perTheme) continue;
    for (const w of words) {
      usedKo.add(w.korean);
      usedGrid.add(w.grid);
    }
    groups.push({ label: theme.label, words });
  }
  return groups.length === themeCount ? groups : null;
}
