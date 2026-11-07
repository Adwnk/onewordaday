"use client";

import { useMemo, useState } from "react";
import { pairs, type Language } from "@/lib/words";
import { vocab } from "@/lib/vocab";

type KindFilter = "all" | "verbs" | "bank" | "korean" | "tagalog";

type Row =
  | {
      kind: "verb";
      key: string;
      pairId: string;
      pairIndex: number;
      lang: Language;
      word: string;
      romanization: string;
      english: string;
    }
  | {
      kind: "bank";
      key: string;
      id: string;
      lang: Language;
      word: string;
      romanization: string;
      english: string;
    };

const FILTERS: { id: KindFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "verbs", label: "Verbs" },
  { id: "bank", label: "Word Bank" },
  { id: "korean", label: "Korean" },
  { id: "tagalog", label: "Tagalog" },
];

const ROWS: Row[] = [
  ...pairs.flatMap((p, i): Row[] => [
    {
      kind: "verb",
      key: `v-${p.id}-ko`,
      pairId: p.id,
      pairIndex: i,
      lang: "korean",
      word: p.korean.word,
      romanization: p.korean.romanization,
      english: p.english,
    },
    {
      kind: "verb",
      key: `v-${p.id}-tl`,
      pairId: p.id,
      pairIndex: i,
      lang: "tagalog",
      word: p.tagalog.word,
      romanization: p.tagalog.romanization,
      english: p.english,
    },
  ]),
  ...vocab.map(
    (v): Row => ({
      kind: "bank",
      key: `b-${v.id}`,
      id: v.id,
      lang: v.lang,
      word: v.word,
      romanization: v.romanization,
      english: v.english,
    }),
  ),
];

export default function AllWords({
  seenVerbs,
  seenVocab,
  onOpenVerb,
  onOpenVocab,
}: {
  seenVerbs: Set<string>;
  seenVocab: Set<string>;
  onOpenVerb: (pairIndex: number) => void;
  onOpenVocab: (id: string) => void;
}) {
  const [filter, setFilter] = useState<KindFilter>("all");
  const list = useMemo(
    () =>
      ROWS.filter((row) => {
        if (filter === "verbs") return row.kind === "verb";
        if (filter === "bank") return row.kind === "bank";
        if (filter === "korean" || filter === "tagalog") return row.lang === filter;
        return true;
      }),
    [filter],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter words">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium ring-1 ${
              filter === f.id
                ? "bg-stone-900 text-white ring-stone-900 dark:bg-stone-100 dark:text-stone-900 dark:ring-stone-100"
                : "bg-white text-stone-700 ring-stone-300 dark:bg-stone-800 dark:text-stone-200 dark:ring-stone-600"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <ul className="mt-4 flex flex-col gap-2">
        {list.map((row) => {
          const seen = row.kind === "verb" ? seenVerbs.has(row.pairId) : seenVocab.has(row.id);
          return (
            <li key={row.key}>
              <button
                type="button"
                onClick={() => (row.kind === "verb" ? onOpenVerb(row.pairIndex) : onOpenVocab(row.id))}
                className="flex w-full items-center gap-3 rounded-2xl bg-white/80 px-3.5 py-3 text-left shadow-sm ring-1 ring-stone-200 transition hover:ring-teal-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 dark:bg-stone-800 dark:ring-stone-600 dark:hover:ring-teal-700"
              >
                <span
                  aria-hidden="true"
                  className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] font-bold ${
                    seen
                      ? "bg-teal-600 text-white"
                      : "text-transparent ring-1 ring-stone-300 dark:ring-stone-500"
                  }`}
                >
                  ✓
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-lg font-semibold text-stone-900 dark:text-stone-100">
                    {row.word}
                  </span>
                  <span className="mt-0.5 block truncate text-sm text-stone-500 dark:text-stone-400">
                    {row.romanization} · {row.english}
                  </span>
                </span>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                    row.kind === "verb"
                      ? "bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300"
                      : "bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300"
                  }`}
                >
                  {row.kind === "verb" ? "Verb" : "Word Bank"}
                </span>
                <span className="sr-only">{seen ? "Seen" : "Not seen yet"}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
