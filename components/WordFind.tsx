"use client";

import { useCallback, useRef, useState, type PointerEvent } from "react";
import { playFanfare, playLetterTick } from "@/lib/gameAudio";
import { LANGS, speak } from "@/lib/speak";
import { generateWordFind, sameLine, type Cell, type WordFindPuzzle } from "@/lib/wordFind";

const COLORS = ["#0d9488", "#0284c7", "#ea580c", "#7c3aed", "#db2777", "#16a34a", "#d97706", "#2563eb", "#e11d48", "#0f766e"];

const PILL =
  "min-h-9 rounded-full px-4 py-1.5 text-sm font-medium ring-1 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400";

export default function WordFind() {
  const [puzzle, setPuzzle] = useState<WordFindPuzzle>(() => generateWordFind());
  const [found, setFound] = useState<Set<string>>(() => new Set());
  const [hintArmed, setHintArmed] = useState(false);
  const [revealed, setRevealed] = useState<Record<string, number>>({});
  const [selecting, setSelecting] = useState<Cell[] | null>(null);
  const selectingRef = useRef<Cell[] | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const colorOf = (id: string) => {
    const i = puzzle.placed.findIndex((p) => p.word.id === id);
    return COLORS[(i < 0 ? 0 : i) % COLORS.length];
  };

  const newPuzzle = () => {
    setPuzzle(generateWordFind());
    setFound(new Set());
    setHintArmed(false);
    setRevealed({});
    setSelecting(null);
    selectingRef.current = null;
  };

  const cellAt = (clientX: number, clientY: number): Cell | null => {
    const el = gridRef.current;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const { size } = puzzle;
    const c = Math.floor(((clientX - rect.left) / rect.width) * size);
    const r = Math.floor(((clientY - rect.top) / rect.height) * size);
    if (r < 0 || c < 0 || r >= size || c >= size) return null;
    return { r, c };
  };

  const extendSelection = (cells: Cell[], next: Cell): Cell[] => {
    const already = cells.findIndex((p) => p.r === next.r && p.c === next.c);
    if (already >= 0) {
      if (cells.length >= 2 && already === cells.length - 2) return cells.slice(0, -1);
      return cells;
    }
    if (cells.length === 0) return [next];
    const start = cells[0];
    if (cells.length === 1) {
      if (Math.max(Math.abs(next.r - start.r), Math.abs(next.c - start.c)) !== 1) return cells;
      return [start, next];
    }
    const dirR = Math.sign(cells[1].r - start.r);
    const dirC = Math.sign(cells[1].c - start.c);
    const last = cells[cells.length - 1];
    if (next.r === last.r + dirR && next.c === last.c + dirC) return [...cells, next];
    return cells;
  };

  const finishSelection = () => {
    const sel = selectingRef.current;
    selectingRef.current = null;
    setSelecting(null);
    if (!sel || sel.length < 2) return;
    const match = puzzle.placed.find((p) => !found.has(p.word.id) && sameLine(sel, p.cells));
    if (!match) return;
    setFound((prev) => new Set(prev).add(match.word.id));
    playFanfare();
  };

  const onGridPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    const cell = cellAt(e.clientX, e.clientY);
    if (!cell) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    e.preventDefault();
    const next = [cell];
    selectingRef.current = next;
    setSelecting(next);
    playLetterTick();
  };

  const onGridPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!selectingRef.current) return;
    const cell = cellAt(e.clientX, e.clientY);
    if (!cell) return;
    const prev = selectingRef.current;
    const next = extendSelection(prev, cell);
    if (next === prev) return;
    if (next.length > prev.length) playLetterTick();
    selectingRef.current = next;
    setSelecting(next);
  };

  const onWordTap = useCallback(
    (id: string) => {
      const item = puzzle.placed.find((p) => p.word.id === id);
      if (!item) return;
      if (hintArmed) {
        setRevealed((prev) => {
          const cur = prev[id] ?? 0;
          if (cur >= item.cells.length) return prev;
          return { ...prev, [id]: cur + 1 };
        });
        setHintArmed(false);
        return;
      }
      speak(item.word.audio, item.word.korean, LANGS.korean.codes);
    },
    [hintArmed, puzzle.placed],
  );

  const done = found.size === puzzle.placed.length;

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {puzzle.placed.map((p) => {
          const isFound = found.has(p.word.id);
          return (
            <button
              key={p.word.id}
              type="button"
              onClick={() => onWordTap(p.word.id)}
              className={`rounded-full px-3 py-1 text-lg font-medium ring-1 ${
                hintArmed && !isFound
                  ? "bg-teal-50 ring-teal-300 dark:bg-teal-950 dark:ring-teal-700"
                  : "bg-white ring-stone-200 dark:bg-stone-800 dark:ring-stone-600"
              }`}
              style={isFound ? { color: colorOf(p.word.id), textDecoration: "line-through" } : undefined}
            >
              {p.word.korean}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-stone-500 dark:text-stone-400">
          {found.size}/{puzzle.placed.length}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            aria-pressed={hintArmed}
            onClick={() => setHintArmed((v) => !v)}
            className={`${PILL} ${
              hintArmed
                ? "bg-teal-600 text-white ring-teal-600"
                : "bg-white text-teal-700 ring-teal-200 dark:bg-stone-800 dark:text-teal-300 dark:ring-teal-800"
            }`}
          >
            Hint
          </button>
          <button
            type="button"
            onClick={newPuzzle}
            className={`${PILL} bg-white text-stone-700 ring-stone-200 dark:bg-stone-800 dark:text-stone-200 dark:ring-stone-600`}
          >
            New puzzle
          </button>
        </div>
      </div>

      {hintArmed && (
        <p className="text-sm text-teal-700 dark:text-teal-300">Tap a Korean word to circle its next letter.</p>
      )}

      <div
        ref={gridRef}
        role="grid"
        aria-label="Word find grid"
        className="relative aspect-square w-full touch-none select-none overflow-hidden rounded-2xl bg-white ring-1 ring-stone-200 dark:bg-stone-800 dark:ring-stone-600"
        onPointerDown={onGridPointerDown}
        onPointerMove={onGridPointerMove}
        onPointerUp={finishSelection}
        onPointerCancel={finishSelection}
      >
        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox={`0 0 ${puzzle.size} ${puzzle.size}`} preserveAspectRatio="none">
          {puzzle.placed.map((p) =>
            found.has(p.word.id) ? (
              <polyline
                key={p.word.id}
                points={p.cells.map((cell) => `${cell.c + 0.5},${cell.r + 0.5}`).join(" ")}
                fill="none"
                stroke={colorOf(p.word.id)}
                strokeWidth="0.72"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.45"
              />
            ) : null,
          )}
          {selecting && selecting.length > 1 && (
            <polyline
              points={selecting.map((cell) => `${cell.c + 0.5},${cell.r + 0.5}`).join(" ")}
              fill="none"
              stroke="#0d9488"
              strokeWidth="0.72"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.35"
            />
          )}
          {puzzle.placed.map((p) => {
            const n = revealed[p.word.id] ?? 0;
            if (!n || found.has(p.word.id)) return null;
            return p.cells.slice(0, n).map((cell, i) => (
              <circle
                key={`${p.word.id}-${i}`}
                cx={cell.c + 0.5}
                cy={cell.r + 0.5}
                r="0.38"
                fill="none"
                stroke={colorOf(p.word.id)}
                strokeWidth="0.07"
              />
            ));
          })}
        </svg>
        <div className="relative grid h-full w-full" style={{ gridTemplateColumns: `repeat(${puzzle.size}, minmax(0, 1fr))` }}>
          {puzzle.grid.map((row, r) =>
            row.map((ch, c) => (
              <div key={`${r}-${c}`} role="gridcell" className="grid place-items-center text-sm font-semibold text-stone-800 dark:text-stone-100 sm:text-base">
                {ch}
              </div>
            )),
          )}
        </div>
      </div>

      {done && <p className="text-center text-sm font-medium text-teal-700 dark:text-teal-300">Nice — you found every word. Start a new puzzle whenever you like.</p>}
    </section>
  );
}
