"use client";
import type { Word, Language } from "@/lib/words";

const LANGS: Record<Language, { label: string; codes: string[]; flag: string }> = {
  korean: { label: "Korean", codes: ["ko-KR", "ko"], flag: "🇰🇷" },
  tagalog: { label: "Tagalog", codes: ["fil-PH", "fil", "tl-PH", "tl"], flag: "🇵🇭" },
};

function speakSynth(text: string, codes: string[]) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    alert("Speech isn't supported in this browser.");
    return;
  }
  const synth = window.speechSynthesis;
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const voices = synth.getVoices();
  const voice = codes
    .map((c) => voices.find((v) => v.lang.toLowerCase().startsWith(c.toLowerCase())))
    .find(Boolean);
  if (voice) u.voice = voice;
  u.lang = voice?.lang ?? codes[0];
  u.rate = 0.8;
  synth.speak(u);
}

let current: HTMLAudioElement | null = null;

/** Play the pre-generated clip; fall back to browser speech if it's missing or fails. */
function speak(word: Word, codes: string[]) {
  current?.pause();
  const audio = new Audio(word.audio);
  current = audio;
  let fell = false;
  const fallback = () => {
    if (fell) return;
    fell = true;
    speakSynth(word.word, codes);
  };
  audio.addEventListener("error", fallback);
  audio.play().catch(fallback);
}

export default function WordCard({ word, language }: { word: Word; language: Language }) {
  const l = LANGS[language];
  return (
    <section className="rounded-2xl bg-white/80 p-6 shadow-sm ring-1 ring-stone-200">
      <p className="text-sm font-medium uppercase tracking-wide text-stone-500">
        {l.flag} {l.label}
      </p>
      <div className="mt-3 flex items-center gap-3">
        <h2 className="text-4xl font-semibold text-stone-900">{word.word}</h2>
        <button
          type="button"
          onClick={() => speak(word, l.codes)}
          aria-label={`Hear ${word.word} pronounced`}
          className="rounded-full bg-teal-50 p-2 text-2xl ring-1 ring-teal-200 hover:bg-teal-100 active:scale-95"
        >
          🔊
        </button>
      </div>
      <p className="mt-2 text-lg italic text-teal-700">
        {language === "tagalog" ? `Say it: ${word.romanization}` : word.romanization}
      </p>
      <p className="mt-3 text-stone-700">{word.definition}</p>
    </section>
  );
}
