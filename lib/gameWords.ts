import { vocab } from "@/lib/vocab";
import { pairs } from "@/lib/words";

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

function fromPairs(): GameWord[] {
  return pairs.flatMap((p) => {
    const grid = toGridWord(p.english);
    if (!grid) return [];
    return [
      {
        id: `verb:${p.id}`,
        korean: p.korean.word,
        romanization: p.korean.romanization,
        english: p.english,
        grid,
        audio: p.korean.audio,
      },
    ];
  });
}

function fromVocab(): GameWord[] {
  return vocab.flatMap((v) => {
    if (v.lang !== "korean") return [];
    const grid = toGridWord(v.english);
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

export const allGameWords: GameWord[] = [...fromPairs(), ...fromVocab()];

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
