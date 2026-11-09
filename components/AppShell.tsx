"use client";

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import AllWords from "./AllWords";
import AppTabs from "./AppTabs";
import Credits from "./Credits";
import SpellingBee from "./SpellingBee";
import { ThemeProvider, useTheme } from "./ThemeProvider";
import WordFind from "./WordFind";
import { enterGameAudio, leaveGameAudio, resumeAudio } from "@/lib/gameAudio";
import { getGameSettings, setMusicEnabled, setSfxEnabled, subscribeGameSettings } from "@/lib/gameSettings";
import { getSeenSnapshot, markVerb, markVocab, subscribeSeen, EMPTY_SEEN } from "@/lib/seen";
import type { ThemePref } from "@/lib/theme";

type Tab = "daily" | "bank";
type View = "main" | "all" | "word-find" | "spelling-bee" | "credits";

const TITLES: Record<Exclude<View, "main">, string> = {
  all: "All words",
  "word-find": "Word find",
  "spelling-bee": "Spelling bee",
  credits: "Credits",
};

export default function AppShell() {
  return (
    <ThemeProvider>
      <Shell />
    </ThemeProvider>
  );
}

function Shell() {
  const [view, setView] = useState<View>("main");
  const [tab, setTab] = useState<Tab>("daily");
  const [menuOpen, setMenuOpen] = useState(false);
  const [jumpPair, setJumpPair] = useState<number | null>(null);
  const [focusVocab, setFocusVocab] = useState<string | null>(null);
  const seen = useSyncExternalStore(subscribeSeen, getSeenSnapshot, () => EMPTY_SEEN);
  const seenVerbs = useMemo(() => new Set(seen.verbs), [seen]);
  const seenVocab = useMemo(() => new Set(seen.vocab), [seen]);

  const onViewPair = useCallback((id: string) => {
    markVerb(id);
  }, []);

  const onViewVocab = useCallback((id: string) => {
    markVocab(id);
  }, []);


  const inGame = view === "word-find" || view === "spelling-bee";
  useEffect(() => {
    if (!inGame) return;
    enterGameAudio();
    const unlock = () => resumeAudio();
    window.addEventListener("pointerdown", unlock);
    return () => {
      window.removeEventListener("pointerdown", unlock);
      leaveGameAudio();
    };
  }, [inGame]);

  const onJumpedPair = useCallback(() => setJumpPair(null), []);
  const onFocusedVocab = useCallback(() => setFocusVocab(null), []);

  const openVerb = (pairIndex: number) => {
    setJumpPair(pairIndex);
    setTab("daily");
    setView("main");
    setMenuOpen(false);
  };

  const openVocab = (id: string) => {
    setFocusVocab(id);
    setTab("bank");
    setView("main");
    setMenuOpen(false);
  };

  const go = (next: View) => {
    setMenuOpen(false);
    setView(next);
  };

  const menu = menuOpen && (
    <MenuPanel
      onClose={() => setMenuOpen(false)}
      onAllWords={() => go("all")}
      onWordFind={() => go("word-find")}
      onSpellingBee={() => go("spelling-bee")}
      onCredits={() => go("credits")}
    />
  );

  return (
    <>
      {view === "main" ? (
        <header className="relative px-12 text-center">
          <MenuButton open={menuOpen} onToggle={() => setMenuOpen((o) => !o)} />
          <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">One Word A Day</h1>
          <p className="mt-2 text-stone-600 dark:text-stone-400">
            An everyday Korean & Tagalog verb — read it, hear it, learn it.
          </p>
          {menu}
        </header>
      ) : (
        <header className="relative flex items-center gap-3 pr-12">
          <button
            type="button"
            onClick={() => setView("main")}
            aria-label="Back"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-xl text-stone-800 ring-1 ring-stone-300 dark:bg-stone-800 dark:text-stone-100 dark:ring-stone-600"
          >
            ‹
          </button>
          <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">{TITLES[view]}</h1>
          <MenuButton open={menuOpen} onToggle={() => setMenuOpen((o) => !o)} />
          {menu}
        </header>
      )}

      <div hidden={view !== "main"}>
        <AppTabs
          tab={tab}
          onTab={setTab}
          jumpPair={jumpPair}
          onJumpedPair={onJumpedPair}
          onViewPair={onViewPair}
          dailyActive={view === "main" && tab === "daily"}
          focusVocab={focusVocab}
          onFocusedVocab={onFocusedVocab}
          onViewVocab={onViewVocab}
          bankActive={view === "main" && tab === "bank"}
          onOpenVerb={openVerb}
        />
      </div>

      {view === "all" && (
        <AllWords seenVerbs={seenVerbs} seenVocab={seenVocab} onOpenVerb={openVerb} onOpenVocab={openVocab} />
      )}
      {view === "word-find" && <WordFind />}
      {view === "spelling-bee" && <SpellingBee />}
      {view === "credits" && <Credits />}
    </>
  );
}

function MenuButton({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      data-menu-button
      aria-label="Menu"
      aria-expanded={open}
      aria-haspopup="true"
      onClick={onToggle}
      className="absolute right-0 top-0 grid h-10 w-10 place-items-center rounded-full bg-white ring-1 ring-stone-300 hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 dark:bg-stone-800 dark:ring-stone-600 dark:hover:bg-stone-700"
    >
      <span aria-hidden="true" className="flex flex-col gap-1">
        <span className="block h-0.5 w-4 rounded bg-stone-800 dark:bg-stone-200" />
        <span className="block h-0.5 w-4 rounded bg-stone-800 dark:bg-stone-200" />
        <span className="block h-0.5 w-4 rounded bg-stone-800 dark:bg-stone-200" />
      </span>
    </button>
  );
}

function ToggleRow({ label, on, onToggle }: { label: string; on: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      role="menuitemcheckbox"
      aria-checked={on}
      onClick={onToggle}
      className="mt-2 flex w-full items-center justify-between text-base font-medium text-stone-900 dark:text-stone-100"
    >
      {label}
      <span
        className={`relative h-6 w-10 rounded-full transition-colors ${on ? "bg-teal-600" : "bg-stone-300 dark:bg-stone-600"}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${on ? "translate-x-4" : ""}`}
        />
      </span>
    </button>
  );
}

function MenuLink({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onClick}
      className="mt-2 flex w-full items-center justify-between text-base font-medium text-stone-900 dark:text-stone-100"
    >
      {label}
      <span aria-hidden="true" className="text-lg text-stone-400">
        ›
      </span>
    </button>
  );
}

function MenuPanel({
  onClose,
  onAllWords,
  onWordFind,
  onSpellingBee,
  onCredits,
}: {
  onClose: () => void;
  onAllWords: () => void;
  onWordFind: () => void;
  onSpellingBee: () => void;
  onCredits: () => void;
}) {
  const { pref, setPref } = useTheme();
  const settings = useSyncExternalStore(subscribeGameSettings, getGameSettings, () => ({ music: true, sfx: true }));
  const options: { id: ThemePref; label: string }[] = [
    { id: "system", label: "System" },
    { id: "light", label: "Light" },
    { id: "dark", label: "Dark" },
  ];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <>
      <button
        type="button"
        aria-label="Close menu"
        className="fixed inset-0 z-30 cursor-default bg-stone-900/35 dark:bg-black/50"
        onClick={onClose}
      />
      <div
        role="menu"
        className="absolute right-0 top-12 z-40 w-64 rounded-2xl bg-white p-4 text-left shadow-lg ring-1 ring-stone-200 dark:bg-stone-800 dark:ring-stone-600"
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">Appearance</p>
        <div className="mt-2 flex rounded-full bg-stone-100 p-0.5 dark:bg-stone-900" role="radiogroup" aria-label="Appearance">
          {options.map((opt) => (
            <button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={pref === opt.id}
              onClick={() => setPref(opt.id)}
              className={`flex-1 rounded-full py-1.5 text-xs font-semibold ${
                pref === opt.id
                  ? "bg-white text-teal-700 shadow-sm dark:bg-teal-950 dark:text-teal-200"
                  : "text-stone-600 dark:text-stone-400"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs leading-snug text-stone-500 dark:text-stone-400">
          System follows your phone. Light or Dark stays until you change it.
        </p>

        <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">Practice</p>
        <p className="mt-1 text-xs leading-snug text-stone-500 dark:text-stone-400">Korean only, for now</p>
        <MenuLink label="Word find" onClick={onWordFind} />
        <MenuLink label="Spelling bee" onClick={onSpellingBee} />

        <p className="mt-4 border-t border-stone-100 pt-3 text-xs font-semibold uppercase tracking-wide text-stone-500 dark:border-stone-700 dark:text-stone-400">
          Sound
        </p>
        <ToggleRow label="Music" on={settings.music} onToggle={() => setMusicEnabled(!settings.music)} />
        <ToggleRow label="Sound effects" on={settings.sfx} onToggle={() => setSfxEnabled(!settings.sfx)} />

        <div className="mt-3 border-t border-stone-100 pt-3 dark:border-stone-700">
          <MenuLink label="All words" onClick={onAllWords} />
          <MenuLink label="Credits" onClick={onCredits} />
        </div>
      </div>
    </>
  );
}
