"use client";

import { useState } from "react";
import { splitHighlight, type Word, type Language } from "@/lib/words";

const TENSE_STYLE: Record<string, string> = {
  past: "bg-sky-50 text-sky-700 ring-sky-200",
  present: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  future: "bg-violet-50 text-violet-700 ring-violet-200",
};

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
function speak(src: string, text: string, codes: string[]) {
  current?.pause();
  const audio = new Audio(src);
  current = audio;
  let fell = false;
  const fallback = () => {
    if (fell) return;
    fell = true;
    speakSynth(text, codes);
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
          onClick={() => speak(word.audio, word.word, l.codes)}
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
      <ul className="mt-4 flex flex-col gap-2">
        {word.examples.map((ex, i) => (
          <ExampleItem key={`${i}-${ex.text}`} ex={ex} index={i} codes={l.codes} />
        ))}
      </ul>
    </section>
  );
}

function ExampleItem({ ex, index, codes }: { ex: Word["examples"][number]; index: number; codes: (typeof LANGS)[Language]["codes"] }) {
  const [revealed, setRevealed] = useState(false);
  const [a, hl, b] = splitHighlight(ex.text, ex.highlight);
  const activate = () => {
    speak(ex.audio, ex.text, codes);
    setRevealed((r) => !r);
  };
  return (
    <li
      role="button"
      tabIndex={0}
      aria-expanded={revealed}
      aria-label={`Example ${index + 1}: ${ex.text}. ${revealed ? "Tap to hide translation" : "Tap to hear and reveal translation"}`}
      onClick={activate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          activate();
        }
      }}
      className="cursor-pointer select-none rounded-xl bg-stone-50 p-3 ring-1 ring-stone-200 transition hover:bg-teal-50/60 hover:ring-teal-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 active:scale-[0.99] active:bg-teal-100/60"
    >
      <div className="flex items-start gap-2">
        <p className="flex-1 text-lg text-stone-900">
          {a}
          {hl && <mark className="rounded bg-amber-100 px-1 font-semibold text-stone-900">{hl}</mark>}
          {b}
        </p>
        <span aria-hidden="true" className="shrink-0 rounded-full bg-teal-50 p-1.5 text-lg ring-1 ring-teal-200">
          🔊
        </span>
      </div>
      <div className="mt-1 flex items-center gap-2">
        {ex.tense && (
          <span className={`rounded-full px-2 py-0.5 text-xs font-medium uppercase tracking-wide ring-1 ${TENSE_STYLE[ex.tense] ?? "bg-amber-50 text-amber-800 ring-amber-200"}`}>
            {ex.tense}
          </span>
        )}
        {!revealed && <p className="text-sm italic text-stone-400">Tap to reveal</p>}
      </div>
      {revealed && (
        <div className="mt-1">
          {ex.romanization && <p className="text-sm italic text-teal-700">{ex.romanization}</p>}
          <p className="text-sm italic text-stone-500">{ex.en}</p>
        </div>
      )}
    </li>
  );
}
