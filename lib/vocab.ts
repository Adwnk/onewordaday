import vocabData from "@/data/vocab.json";
import { pairs, type Language } from "@/lib/words";

export type VocabSource = { verb: string; ex: number; surface: string };
export type VocabEntry = {
  id: string;
  lang: Language;
  word: string;
  romanization: string;
  english: string;
  pos: string;
  sources: VocabSource[];
  audio: string;
};

/** Word Bank entries; audio at public/audio/<ko|tl>/<id>.mp3 */
export const vocab: VocabEntry[] = (vocabData as Omit<VocabEntry, "audio">[]).map((v) => ({
  ...v,
  audio: `/audio/${v.lang === "korean" ? "ko" : "tl"}/${v.id}.mp3`,
}));

export const vocabById: Record<string, VocabEntry> = Object.fromEntries(vocab.map((v) => [v.id, v]));

/** The first sentence a vocab word appears in (native text + English). */
export function sourceSentence(v: VocabEntry) {
  const s = v.sources[0];
  const pairIndex = pairs.findIndex((p) => p.id === s?.verb);
  const pair = pairIndex >= 0 ? pairs[pairIndex] : undefined;
  const ex = pair?.[v.lang].examples[s.ex];
  return ex && pair ? { text: ex.text, en: ex.en, audio: ex.audio, verb: pair.english, pairIndex } : null;
}
