"use client";

import { useMemo, useState } from "react";
import { vocab, sourceSentence, type VocabEntry } from "@/lib/vocab";
import { LANGS, speak } from "@/lib/speak";

type Filter = "both" | "korean" | "tagalog";

const POS: Record<string, string> = { n: "noun", adj: "adjective", adv: "adverb", pron: "pronoun", num: "number" };

function shuffled<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function WordBank() {
  const [filter, setFilter] = useState<Filter>("both");
  const [order, setOrder] = useState<VocabEntry[]>(vocab);
  const [pos, setPos] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const list = useMemo(() => order.filter((v) => filter === "both" || v.lang === filter), [order, filter]);
  const card = list[Math.min(pos, list.length - 1)];

  const go = (d: number) => {
    setFlipped(false);
    setPos((p) => (p + d + list.length) % list.length);
  };
  const choose = (f: Filter) => {
    setFilter(f);
    setPos(0);
    setFlipped(false);
  };
  const shuffle = () => {
    setOrder(shuffled(vocab));
    setPos(0);
    setFlipped(false);
  };

  if (!card) return <p className="text-center text-stone-500">No words yet.</p>;
  const l = LANGS[card.lang];
  const src = sourceSentence(card);
  const flip = () => setFlipped((f) => !f);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center gap-2" role="group" aria-label="Language filter">
        {(["both", "korean", "tagalog"] as Filter[]).map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => choose(f)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium ring-1 ${filter === f ? "bg-teal-600 text-white ring-teal-600" : "bg-white text-stone-700 ring-stone-300"}`}
          >
            {f === "both" ? "Both" : `${LANGS[f].flag} ${LANGS[f].label}`}
          </button>
        ))}
      </div>

      <div
        role="button"
        tabIndex={0}
        aria-label={flipped ? `${card.word}: ${card.english}. Tap to flip back` : `${card.word}. Tap to flip`}
        onClick={flip}
        onKeyDown={(e) => {
          if (e.target !== e.currentTarget) return;
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            flip();
          }
        }}
        className="flex min-h-64 cursor-pointer select-none flex-col items-center justify-center gap-3 rounded-2xl bg-white/80 p-6 text-center shadow-sm ring-1 ring-stone-200 transition hover:ring-teal-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 active:bg-teal-50/60"
      >
        <p className="text-sm font-medium uppercase tracking-wide text-stone-500">
          {l.flag} {l.label} · {POS[card.pos] ?? card.pos}
        </p>
        <div className="flex items-center gap-3">
          <h2 className="text-4xl font-semibold text-stone-900">{card.word}</h2>
          <button
            type="button"
            aria-label={`Hear ${card.word}`}
            onClick={(e) => {
              e.stopPropagation();
              speak(card.audio, card.word, l.codes);
            }}
            className="rounded-full bg-teal-50 p-2 text-2xl ring-1 ring-teal-200 hover:bg-teal-100 active:scale-95"
          >
            🔊
          </button>
        </div>
        {flipped ? (
          <div className="flex flex-col gap-1">
            <p className="text-lg italic text-teal-700">{card.romanization}</p>
            <p className="text-xl text-stone-800">{card.english}</p>
            {src && (
              <div className="mt-3 rounded-xl bg-stone-50 p-3 text-left ring-1 ring-stone-200">
                <p className="text-stone-900">{src.text}</p>
                <p className="text-sm italic text-stone-500">{src.en}</p>
                <p className="mt-1 text-xs text-stone-400">from the verb “{src.verb}”</p>
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm italic text-stone-400">Tap to flip</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <button type="button" onClick={() => go(-1)} className="rounded-full bg-white px-4 py-2 ring-1 ring-stone-300 active:scale-95">
          ← Prev
        </button>
        <span className="text-sm text-stone-500">
          {Math.min(pos, list.length - 1) + 1} / {list.length}
        </span>
        <button type="button" onClick={() => go(1)} className="rounded-full bg-white px-4 py-2 ring-1 ring-stone-300 active:scale-95">
          Next →
        </button>
      </div>
      <button
        type="button"
        onClick={shuffle}
        className="self-center rounded-full bg-teal-600 px-6 py-3 font-medium text-white shadow hover:bg-teal-700 active:scale-95"
      >
        🔀 Shuffle
      </button>
    </div>
  );
}
