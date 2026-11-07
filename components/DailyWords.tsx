"use client";
import { useEffect, useState } from "react";
import WordCard from "./WordCard";
import { dailyIndex, getPair, randomUnusedIndex, pairCount } from "@/lib/words";

export default function DailyWords({
  jumpTo,
  onJumped,
  onView,
  active,
}: {
  jumpTo: number | null;
  onJumped: () => void;
  onView: (id: string) => void;
  active: boolean;
}) {
  const [used, setUsed] = useState<number[]>([]);

  if (jumpTo != null && (used.length === 0 || used[used.length - 1] !== jumpTo)) {
    setUsed((u) => {
      if (u.length === 0) return [jumpTo];
      if (u[u.length - 1] === jumpTo) return u;
      return u.includes(jumpTo) ? [...u.filter((i) => i !== jumpTo), jumpTo] : [...u, jumpTo];
    });
  }

  useEffect(() => {
    if (used.length > 0) return;
    // Pick today's pair on the client (local date) to avoid prerender/hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUsed([dailyIndex()]);
  }, [used.length]);

  useEffect(() => {
    if (jumpTo != null) onJumped();
  }, [jumpTo, onJumped]);

  const current = used.length > 0 ? used[used.length - 1] : null;

  useEffect(() => {
    if (!active || current == null) return;
    onView(getPair(current).id);
  }, [active, current, onView]);

  if (used.length === 0 || current == null) {
    return <p className="text-center text-stone-500 dark:text-stone-400">Loading today&apos;s verb…</p>;
  }
  const pair = getPair(current);

  const refresh = () => {
    window.scrollTo({ top: 0 });
    const next = randomUnusedIndex(used);
    setUsed((u) => (u.length >= pairCount ? [next] : [...u, next]));
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="sticky top-0 z-20 -mx-5 border-b border-stone-200/70 bg-[#faf7f2]/90 px-5 pb-2 pt-[calc(env(safe-area-inset-top)+0.5rem)] backdrop-blur dark:border-stone-700 dark:bg-[#1c1917]/90">
        <div className="flex items-center justify-between gap-3">
          <p className="min-w-0 text-lg font-medium text-stone-600 dark:text-stone-300">
            Today&apos;s verb: <span className="text-teal-700 dark:text-teal-300">{pair.english}</span>
          </p>
          <button
            type="button"
            onClick={refresh}
            aria-label="Show a new verb"
            className="min-h-9 shrink-0 rounded-full bg-teal-600 px-4 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-teal-700 active:scale-95"
          >
            ↻ New word
          </button>
        </div>
      </div>
      <WordCard word={pair.korean} language="korean" />
      <WordCard word={pair.tagalog} language="tagalog" />
      <button
        type="button"
        onClick={refresh}
        className="self-center rounded-full bg-teal-600 px-6 py-3 font-medium text-white shadow hover:bg-teal-700 active:scale-95"
      >
        ↻ New verb
      </button>
    </div>
  );
}
