"use client";

import { useState } from "react";
import { type Word, type Language, type Example } from "@/lib/words";
import { LANGS, speak } from "@/lib/speak";
import { vocabById, type VocabEntry } from "@/lib/vocab";

const TENSE_STYLE: Record<string, string> = {
  past: "bg-sky-50 text-sky-700 ring-sky-200",
  present: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  future: "bg-violet-50 text-violet-700 ring-violet-200",
};

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

function ExampleItem({ ex, index, codes }: { ex: Example; index: number; codes: string[] }) {
  const [revealed, setRevealed] = useState(false);
  const [popup, setPopup] = useState<VocabEntry | null>(null);
  const activate = () => {
    speak(ex.audio, ex.text, codes);
    setRevealed((r) => !r);
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
      aria-expanded={revealed}
      aria-label={`Example ${index + 1}: ${ex.text}. ${revealed ? "Tap to hide translation" : "Tap to hear and reveal translation"}`}
      onClick={activate}
      onKeyDown={(e) => {
        if (e.target !== e.currentTarget) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          activate();
        }
      }}
      className="cursor-pointer select-none rounded-xl bg-stone-50 p-3 ring-1 ring-stone-200 transition hover:bg-teal-50/60 hover:ring-teal-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 active:bg-teal-100/60"
    >
      <div className="flex items-start gap-2">
        <p className="flex-1 text-lg text-stone-900">
          {segments(ex, revealed).map((s, i) =>
            s.kind === "hl" ? (
              <mark key={i} className="rounded bg-amber-100 px-1 font-semibold text-stone-900">{s.text}</mark>
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
        <span aria-hidden="true" className="shrink-0 rounded-full bg-teal-50 p-1.5 text-lg ring-1 ring-teal-200">
          🔊
        </span>
      </div>
      {popup && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="mt-2 flex cursor-default items-center gap-3 rounded-lg bg-white p-2 text-sm shadow ring-1 ring-teal-200"
        >
          <button
            type="button"
            aria-label={`Hear ${popup.word}`}
            onClick={() => speak(popup.audio, popup.word, codes)}
            className="rounded-full bg-teal-50 p-1 ring-1 ring-teal-200 active:scale-95"
          >
            🔊
          </button>
          <div className="flex-1">
            <span className="font-semibold text-stone-900">{popup.word}</span>{" "}
            <span className="italic text-teal-700">{popup.romanization}</span>
            <span className="text-stone-600"> — {popup.english}</span>
          </div>
          <button type="button" aria-label="Close" onClick={() => setPopup(null)} className="px-1 text-stone-400">
            ✕
          </button>
        </div>
      )}
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
          {(ex.vocab?.length ?? 0) > 0 && !popup && (
            <p className="mt-1 text-xs text-stone-400">Tap an underlined word for its meaning</p>
          )}
        </div>
      )}
    </li>
  );
}
