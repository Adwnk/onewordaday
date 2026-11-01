"use client";
import { useEffect, useState } from "react";
import WordCard from "./WordCard";
import { dailyIndex, getPair, randomUnusedIndex } from "@/lib/words";

export default function DailyWords() {
  const [used, setUsed] = useState<number[]>([]);
  useEffect(() => {
    // Pick today's pair on the client (local date) to avoid prerender/hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUsed([dailyIndex()]);
  }, []);
  if (used.length === 0) {
    return <p className="text-center text-stone-500">Loading today&apos;s words…</p>;
  }
  const pair = getPair(used[used.length - 1]);

  const refresh = () => {
    const next = randomUnusedIndex(used);
    setUsed((u) => (u.length >= 25 ? [next] : [...u, next]));
  };

  return (
    <div className="flex flex-col gap-5">
      <WordCard word={pair.korean} language="korean" />
      <WordCard word={pair.filipino} language="filipino" />
      <button
        type="button"
        onClick={refresh}
        className="self-center rounded-full bg-teal-600 px-6 py-3 font-medium text-white shadow hover:bg-teal-700 active:scale-95"
      >
        ↻ New words
      </button>
    </div>
  );
}
