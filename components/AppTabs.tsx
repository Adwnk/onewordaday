"use client";

import DailyWords from "./DailyWords";
import WordBank from "./WordBank";

type Tab = "daily" | "bank";

export default function AppTabs({
  tab,
  onTab,
  jumpPair,
  onJumpedPair,
  onViewPair,
  dailyActive,
  focusVocab,
  onFocusedVocab,
  onViewVocab,
  bankActive,
}: {
  tab: Tab;
  onTab: (tab: Tab) => void;
  jumpPair: number | null;
  onJumpedPair: () => void;
  onViewPair: (id: string) => void;
  dailyActive: boolean;
  focusVocab: string | null;
  onFocusedVocab: () => void;
  onViewVocab: (id: string) => void;
  bankActive: boolean;
}) {
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
            onClick={() => onTab(t)}
            className={`rounded-full px-5 py-2 font-medium ring-1 ${
              tab === t
                ? "bg-stone-900 text-white ring-stone-900 dark:bg-stone-100 dark:text-stone-900 dark:ring-stone-100"
                : "bg-white text-stone-700 ring-stone-300 dark:bg-stone-800 dark:text-stone-200 dark:ring-stone-600"
            }`}
          >
            {label}
          </button>
        ))}
      </nav>
      {/* keep both mounted so the daily card and flashcard position survive tab switches */}
      <div hidden={tab !== "daily"}>
        <DailyWords jumpTo={jumpPair} onJumped={onJumpedPair} onView={onViewPair} active={dailyActive} />
      </div>
      <div hidden={tab !== "bank"}>
        <WordBank focusId={focusVocab} onFocused={onFocusedVocab} onView={onViewVocab} active={bankActive} />
      </div>
    </div>
  );
}
