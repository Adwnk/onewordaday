"use client";

import { useState } from "react";
import { type Word, type Language, type Example } from "@/lib/words";
import { LANGS, speak } from "@/lib/speak";
import { vocabById, type VocabEntry } from "@/lib/vocab";

const TENSE_STYLE: Record<string, string> = {
  past: "bg-sky-50 text-sky-700 ring-sky-200 dark:bg-sky-950 dark:text-sky-300 dark:ring-sky-800",
  present: "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:ring-emerald-800",
  future: "bg-violet-50 text-violet-700 ring-violet-200 dark:bg-violet-950 dark:text-violet-300 dark:ring-violet-800",
};

export default function WordCard({ word, language }: { word: Word; language: Language }) {
  const l = LANGS[language];
  const [shown, setShown] = useState<boolean[]>(() => word.examples.map(() => false));
  // Reset reveal state when the word changes (render-time adjustment, no effect needed).
  const [prevWord, setPrevWord] = useState(word);
  if (prevWord !== word) {
    setPrevWord(word);
    setShown(word.examples.map(() => false));
  }
  const allShown = shown.length > 0 && shown.every(Boolean);
  const toggleAll = () => setShown(word.examples.map(() => !allShown));
  const toggleOne = (i: number) => setShown((s) => s.map((v, j) => (j === i ? !v : v)));
  return (
    <section className="rounded-2xl bg-white/80 p-6 shadow-sm ring-1 ring-stone-200 dark:bg-stone-800 dark:ring-stone-600">
      <p className="text-sm font-medium uppercase tracking-wide text-stone-500 dark:text-stone-400">
        {l.flag} {l.label}
      </p>
      <div className="mt-3 flex items-center gap-3">
        <h2 className="text-4xl font-semibold text-stone-900 dark:text-stone-100">{word.word}</h2>
        <button
          type="button"
          onClick={() => speak(word.audio, word.word, l.codes)}
          aria-label={`Hear ${word.word} pronounced`}
          className="rounded-full bg-teal-50 p-2 text-2xl ring-1 ring-teal-200 hover:bg-teal-100 active:scale-95 dark:bg-teal-950 dark:ring-teal-800 dark:hover:bg-teal-900"
        >
          🔊
        </button>
      </div>
      <p className="mt-2 text-lg italic text-teal-700 dark:text-teal-300">
        {language === "tagalog" ? `Say it: ${word.romanization}` : word.romanization}
      </p>
      <p className="mt-3 text-stone-700 dark:text-stone-300">{word.definition}</p>
      {word.examples.length > 0 && (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs text-stone-400 dark:text-stone-500">Tap a sentence to hear it</p>
          <button
            type="button"
            onClick={toggleAll}
            aria-pressed={allShown}
            aria-label={`${allShown ? "Hide" : "Show"} all ${l.label} translations`}
            className={PILL}
          >
            {allShown ? "Hide all" : "Show all"}
          </button>
        </div>
      )}
      <ul className="mt-2 flex flex-col gap-2">
        {word.examples.map((ex, i) => (
          <ExampleItem key={`${i}-${ex.text}`} ex={ex} index={i} codes={l.codes} revealed={!!shown[i]} onToggle={() => toggleOne(i)} />
        ))}
      </ul>
    </section>
  );
}

const PILL =
  "min-h-8 shrink-0 rounded-full bg-white px-3 py-1 text-xs font-medium text-teal-700 ring-1 ring-teal-200 hover:bg-teal-50 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 dark:bg-stone-800 dark:text-teal-300 dark:ring-teal-800 dark:hover:bg-teal-950";

type Seg = { text: string; kind: "plain" | "hl" | "vocab"; vocab?: VocabEntry };

/** Split a sentence into plain / highlighted-verb / vocab-word segments. */
function segments(ex: Example, withVocab: boolean): Seg[] {
  const marks: { start: number; end: number; kind: "hl" | "vocab"; vocab?: VocabEntry }[] = [];
  const hi = ex.highlight ? ex.text.indexOf(ex.highlight) : -1;
  if (hi >= 0) marks.push({ start: hi, end: hi + ex.highlight.length, kind: "hl" });
  if (withVocab) {
    for (const v of ex.vocab ?? []) {
      const entry = vocabById[v.id];
      const s = ex.text.startsWith(v.surface, v.start ?? -1) ? v.start! : ex.text.indexOf(v.surface);
      if (!entry || s < 0) continue;
      const e = s + v.surface.length;
      if (marks.some((m) => s < m.end && e > m.start)) continue;
      marks.push({ start: s, end: e, kind: "vocab", vocab: entry });
    }
  }
  marks.sort((x, y) => x.start - y.start);
  const out: Seg[] = [];
  let pos = 0;
  for (const m of marks) {
    if (m.start > pos) out.push({ text: ex.text.slice(pos, m.start), kind: "plain" });
    out.push({ text: ex.text.slice(m.start, m.end), kind: m.kind, vocab: m.vocab });
    pos = m.end;
  }
  if (pos < ex.text.length) out.push({ text: ex.text.slice(pos), kind: "plain" });
  return out;
}

function ExampleItem({
  ex,
  index,
  codes,
  revealed,
  onToggle,
}: {
  ex: Example;
  index: number;
  codes: string[];
  revealed: boolean;
  onToggle: () => void;
}) {
  const [popup, setPopup] = useState<VocabEntry | null>(null);
  // Close the vocab popup when the translation gets hidden (underlines disappear).
  const [prevRevealed, setPrevRevealed] = useState(revealed);
  if (prevRevealed !== revealed) {
    setPrevRevealed(revealed);
    if (!revealed) setPopup(null);
  }
  const activate = () => {
    speak(ex.audio, ex.text, codes);
    setPopup(null);
  };
  const openVocab = (e: React.SyntheticEvent, v: VocabEntry) => {
    e.stopPropagation();
    setPopup((p) => (p?.id === v.id ? null : v));
  };
  return (
    <li
      role="button"
      tabIndex={0}
      aria-label={`Example ${index + 1}: ${ex.text}. Tap to hear it`}
      onClick={activate}
      onKeyDown={(e) => {
        if (e.target !== e.currentTarget) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          activate();
        }
      }}
      className="cursor-pointer select-none rounded-xl bg-stone-50 p-3 ring-1 ring-stone-200 transition hover:bg-teal-50/60 hover:ring-teal-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 active:bg-teal-100/60 dark:bg-stone-900 dark:ring-stone-600 dark:hover:bg-teal-950/60 dark:hover:ring-teal-800 dark:active:bg-teal-950"
    >
      <div className="flex items-start gap-2">
        <p className="flex-1 text-lg text-stone-900 dark:text-stone-100">
          {segments(ex, revealed).map((s, i) =>
            s.kind === "hl" ? (
              <mark key={i} className="rounded bg-amber-100 px-1 font-semibold text-stone-900 dark:bg-amber-900 dark:text-amber-100">{s.text}</mark>
            ) : s.kind === "vocab" && s.vocab ? (
              <span
                key={i}
                role="button"
                tabIndex={0}
                aria-label={`${s.text}: show meaning`}
                onClick={(e) => openVocab(e, s.vocab!)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openVocab(e, s.vocab!);
                  }
                }}
                className="cursor-help underline decoration-teal-300 decoration-dotted decoration-2 underline-offset-4 hover:decoration-teal-500"
              >
                {s.text}
              </span>
            ) : (
              <span key={i}>{s.text}</span>
            ),
          )}
        </p>
        <span aria-hidden="true" className="shrink-0 rounded-full bg-teal-50 p-1.5 text-lg ring-1 ring-teal-200 dark:bg-teal-950 dark:ring-teal-800">
          🔊
        </span>
      </div>
      {popup && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="mt-2 flex cursor-default items-center gap-3 rounded-lg bg-white p-2 text-sm shadow ring-1 ring-teal-200 dark:bg-stone-800 dark:ring-teal-800"
        >
          <button
            type="button"
            aria-label={`Hear ${popup.word}`}
            onClick={() => speak(popup.audio, popup.word, codes)}
            className="rounded-full bg-teal-50 p-1 ring-1 ring-teal-200 active:scale-95 dark:bg-teal-950 dark:ring-teal-800"
          >
            🔊
          </button>
          <div className="flex-1">
            <span className="font-semibold text-stone-900 dark:text-stone-100">{popup.word}</span>{" "}
            <span className="italic text-teal-700 dark:text-teal-300">{popup.romanization}</span>
            <span className="text-stone-600 dark:text-stone-300"> — {popup.english}</span>
          </div>
          <button type="button" aria-label="Close" onClick={() => setPopup(null)} className="px-1 text-stone-400 dark:text-stone-500">
            ✕
          </button>
        </div>
      )}
      <div className="mt-1 flex items-center gap-2">
        {ex.tense && (
          <span className={`rounded-full px-2 py-0.5 text-xs font-medium uppercase tracking-wide ring-1 ${TENSE_STYLE[ex.tense] ?? "bg-amber-50 text-amber-800 ring-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:ring-amber-800"}`}>
            {ex.tense}
          </span>
        )}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          onKeyDown={(e) => e.stopPropagation()}
          aria-expanded={revealed}
          aria-label={`${revealed ? "Hide" : "Show"} romanization and English for example ${index + 1}`}
          className={`ml-auto ${PILL}`}
        >
          {revealed ? "Hide" : "Show"}
        </button>
      </div>
      {revealed && (
        <div className="mt-1">
          {ex.romanization && <p className="text-sm italic text-teal-700 dark:text-teal-300">{ex.romanization}</p>}
          <p className="text-sm italic text-stone-500 dark:text-stone-400">{ex.en}</p>
          {(ex.vocab?.length ?? 0) > 0 && !popup && (
            <p className="mt-1 text-xs text-stone-400 dark:text-stone-500">Tap an underlined word for its meaning</p>
          )}
        </div>
      )}
    </li>
  );
}
