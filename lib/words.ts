import pairsData from "@/data/pairs.json";

export type Language = "korean" | "tagalog";
export type Example = { text: string; highlight: string; en: string; tense?: string; audio: string };
export type Word = { word: string; romanization: string; definition: string; audio: string; examples: Example[] };
export type Pair = { id: string; english: string; korean: Word; tagalog: Word };

type RawExample = Omit<Example, "audio">;
type RawWord = Omit<Word, "audio" | "examples"> & { examples: RawExample[] };
type RawPair = { id: string; english: string; korean: RawWord; tagalog: RawWord };

/** Clips: public/audio/<code>/<id>.mp3 and <id>-ex<N>.mp3 (N from 1) */
const withAudio = (code: string, id: string, w: RawWord): Word => ({
  ...w,
  audio: `/audio/${code}/${id}.mp3`,
  examples: w.examples.map((e, i) => ({ ...e, audio: `/audio/${code}/${id}-ex${i + 1}.mp3` })),
});

export const pairs: Pair[] = (pairsData as RawPair[]).map((p) => ({
  id: p.id,
  english: p.english,
  korean: withAudio("ko", p.id, p.korean),
  tagalog: withAudio("tl", p.id, p.tagalog),
}));

export const pairCount = pairs.length;

/** Split a sentence into [before, highlight, after]. */
export function splitHighlight(text: string, hl: string): [string, string, string] {
  const i = hl ? text.indexOf(hl) : -1;
  if (i < 0) return [text, "", ""];
  return [text.slice(0, i), hl, text.slice(i + hl.length)];
}

export function dayNumber(date = new Date()): number {
  return Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000);
}
export function dailyIndex(date = new Date()): number {
  return dayNumber(date) % pairCount;
}
export function getPair(index: number): Pair {
  return pairs[index % pairCount];
}
export function randomUnusedIndex(used: number[]): number {
  const all = Array.from({ length: pairCount }, (_, i) => i);
  const pool = all.filter((i) => !used.includes(i));
  const choices = pool.length ? pool : all.filter((i) => i !== used[used.length - 1]);
  return choices[Math.floor(Math.random() * choices.length)];
}
