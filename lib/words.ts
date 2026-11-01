import pairsData from "@/data/pairs.json";

export type Language = "korean" | "tagalog";
export type Word = {
  word: string;
  romanization: string;
  definition: string;
  example: string;
  exampleEn: string;
  audio: string;
  exampleAudio: string;
};
export type Pair = { id: string; english: string; korean: Word; tagalog: Word };

type RawWord = Omit<Word, "audio" | "exampleAudio">;
type RawPair = { id: string; english: string; korean: RawWord; tagalog: RawWord };

/** Clips: public/audio/<code>/<id>.mp3 and <id>-example.mp3 */
const withAudio = (code: string, id: string, w: RawWord): Word => ({
  ...w,
  audio: `/audio/${code}/${id}.mp3`,
  exampleAudio: `/audio/${code}/${id}-example.mp3`,
});

export const pairs: Pair[] = (pairsData as RawPair[]).map((p) => ({
  id: p.id,
  english: p.english,
  korean: withAudio("ko", p.id, p.korean),
  tagalog: withAudio("tl", p.id, p.tagalog),
}));

export const pairCount = pairs.length;

/** Days since epoch in local time. */
export function dayNumber(date = new Date()): number {
  return Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000);
}

export function dailyIndex(date = new Date()): number {
  return dayNumber(date) % pairCount;
}

export function getPair(index: number): Pair {
  return pairs[index % pairCount];
}

/** Random index not in `used`; resets when all used. */
export function randomUnusedIndex(used: number[]): number {
  const all = Array.from({ length: pairCount }, (_, i) => i);
  const pool = all.filter((i) => !used.includes(i));
  const choices = pool.length ? pool : all.filter((i) => i !== used[used.length - 1]);
  return choices[Math.floor(Math.random() * choices.length)];
}
