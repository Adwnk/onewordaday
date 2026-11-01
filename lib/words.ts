import koreanData from "@/data/korean.json";
import tagalogData from "@/data/tagalog.json";

export type Word = { word: string; romanization: string; definition: string; audio: string };
export type Language = "korean" | "tagalog";

/** Attach the pre-generated clip path (public/audio/<code>/<index>.mp3). */
const withAudio = (code: string) => (w: Omit<Word, "audio">, i: number): Word => ({
  ...w,
  audio: `/audio/${code}/${i}.mp3`,
});

export const korean: Word[] = koreanData.map(withAudio("ko"));
export const tagalog: Word[] = tagalogData.map(withAudio("tl"));

export const pairCount = Math.min(korean.length, tagalog.length);

/** Days since epoch in local time. */
export function dayNumber(date = new Date()): number {
  return Math.floor(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000,
  );
}

/** Date-seeded pair index (Tagalog offset so pairs vary). */
export function dailyIndex(date = new Date()): number {
  return dayNumber(date) % pairCount;
}

export function getPair(index: number): { korean: Word; tagalog: Word } {
  return {
    korean: korean[index % korean.length],
    tagalog: tagalog[(index * 7 + 3) % tagalog.length],
  };
}

/** Random index not in `used`; resets when all used. */
export function randomUnusedIndex(used: number[]): number {
  const pool = Array.from({ length: pairCount }, (_, i) => i).filter(
    (i) => !used.includes(i),
  );
  const choices = pool.length ? pool : Array.from({ length: pairCount }, (_, i) => i).filter((i) => i !== used[used.length - 1]);
  return choices[Math.floor(Math.random() * choices.length)];
}
