import koreanData from "@/data/korean.json";
import filipinoData from "@/data/filipino.json";

export type Word = { word: string; romanization: string; definition: string };
export type Language = "korean" | "filipino";

export const korean: Word[] = koreanData;
export const filipino: Word[] = filipinoData;

export const pairCount = Math.min(korean.length, filipino.length);

/** Days since epoch in local time. */
export function dayNumber(date = new Date()): number {
  return Math.floor(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000,
  );
}

/** Date-seeded pair index (Filipino offset so pairs vary). */
export function dailyIndex(date = new Date()): number {
  return dayNumber(date) % pairCount;
}

export function getPair(index: number): { korean: Word; filipino: Word } {
  return {
    korean: korean[index % korean.length],
    filipino: filipino[(index * 7 + 3) % filipino.length],
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
