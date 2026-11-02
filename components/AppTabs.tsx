"use client";

import { useState } from "react";
import DailyWords from "./DailyWords";
import WordBank from "./WordBank";

type Tab = "daily" | "bank";

export default function AppTabs() {
  const [tab, setTab] = useState<Tab>("daily");
  const tabs: [Tab, string][] = [
    ["daily", "📅 Daily verb"],
    ["bank", "📚 Word Bank"],
  ];
  return (
    <div className="flex flex-col gap-6">
      <nav className="flex justify-center gap-2" role="tablist" aria-label="Sections">
        {tabs.map(([t, label]) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`rounded-full px-5 py-2 font-medium ring-1 ${tab === t ? "bg-stone-900 text-white ring-stone-900" : "bg-white text-stone-700 ring-stone-300"}`}
          >
            {label}
          </button>
        ))}
      </nav>
      {/* keep both mounted so the daily card and flashcard position survive tab switches */}
      <div hidden={tab !== "daily"}>
        <DailyWords />
      </div>
      <div hidden={tab !== "bank"}>
        <WordBank />
      </div>
    </div>
  );
}
