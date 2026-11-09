"use client";

import { useState, type FormEvent } from "react";
import { playFanfare } from "@/lib/gameAudio";
import { pickGameWords, type GameWord } from "@/lib/gameWords";
import { decomposeJamo, hintPrefix } from "@/lib/hangul";
import { LANGS, speak } from "@/lib/speak";

const PILL =
  "min-h-9 rounded-full px-4 py-1.5 text-sm font-medium ring-1 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400";

function nextWord(excludeId?: string): GameWord {
  const [word] = pickGameWords(1, excludeId);
  if (!word) throw new Error("No Korean game words available");
  return word;
}

export default function SpellingBee() {
  const [word, setWord] = useState<GameWord>(() => nextWord());
  const [guess, setGuess] = useState("");
  const [hints, setHints] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [feedback, setFeedback] = useState<"idle" | "wrong" | "correct">("idle");

  const jamo = decomposeJamo(word.korean);
  const hintText = hintPrefix(word.korean, hints);

  const goNext = () => {
    setWord(nextWord(word.id));
    setGuess("");
    setHints(0);
    setRevealed(false);
    setFeedback("idle");
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const a = guess.normalize("NFC").trim();
    const b = word.korean.normalize("NFC").trim();
    if (a === b) {
      setFeedback("correct");
      setRevealed(true);
      playFanfare();
      return;
    }
    setFeedback("wrong");
  };

  const playWord = () => speak(word.audio, word.korean, LANGS.korean.codes);

  return (
    <section className="flex flex-col gap-5">
      <p className="text-sm uppercase tracking-wide text-stone-500 dark:text-stone-400">Spell the Korean word</p>
      <p className="text-2xl font-medium text-stone-800 dark:text-stone-100">{word.english}</p>
      <button
        type="button"
        onClick={playWord}
        className="self-start text-left text-xl text-teal-800 underline-offset-4 hover:underline dark:text-teal-300"
      >
        {word.romanization}
      </button>
      <p className="text-sm text-stone-500 dark:text-stone-400">Tap the romanization to hear it. Type the Hangul below.</p>

      {hints > 0 && (
        <p className="font-medium text-teal-800 dark:text-teal-300" aria-live="polite">
          {hintText}
        </p>
      )}

      {revealed && (
        <p className="text-3xl font-semibold text-stone-900 dark:text-stone-50" aria-live="polite">
          {word.korean}
        </p>
      )}

      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <label className="sr-only" htmlFor="spelling-guess">
          Type the Korean word
        </label>
        <input
          id="spelling-guess"
          lang="ko"
          inputMode="text"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          value={guess}
          onChange={(e) => {
            setGuess(e.target.value);
            if (feedback !== "idle") setFeedback("idle");
          }}
          className="min-h-12 rounded-2xl bg-white px-4 text-xl ring-1 ring-stone-200 focus:outline-none focus:ring-2 focus:ring-teal-400 dark:bg-stone-800 dark:ring-stone-600"
        />
        {feedback === "wrong" && <p className="text-sm text-rose-600 dark:text-rose-400">Not quite — try again, or take a hint.</p>}
        {feedback === "correct" && <p className="text-sm text-teal-700 dark:text-teal-300">That&apos;s it.</p>}
        <button
          type="submit"
          className={`${PILL} self-start bg-teal-600 text-white ring-teal-600`}
        >
          Check
        </button>
      </form>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setHints((n) => Math.min(n + 1, jamo.length))}
          className={`${PILL} bg-white text-teal-700 ring-teal-200 dark:bg-stone-800 dark:text-teal-300 dark:ring-teal-800`}
        >
          Hint
        </button>
        <button
          type="button"
          onClick={() => setRevealed(true)}
          className={`${PILL} bg-white text-stone-700 ring-stone-200 dark:bg-stone-800 dark:text-stone-200 dark:ring-stone-600`}
        >
          Show answer
        </button>
        <button
          type="button"
          onClick={goNext}
          className={`${PILL} bg-white text-stone-700 ring-stone-200 dark:bg-stone-800 dark:text-stone-200 dark:ring-stone-600`}
        >
          Next word
        </button>
      </div>
    </section>
  );
}
