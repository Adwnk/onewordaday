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

  /** Fractional grid position (in cells) of a pointer, clamped to the board. */
  const posAt = (clientX: number, clientY: number) => {
    const el = gridRef.current;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const { size } = puzzle;
    const x = ((clientX - rect.left) / rect.width) * size;
    const y = ((clientY - rect.top) / rect.height) * size;
    return { x, y };
  };

  const cellAt = (clientX: number, clientY: number): Cell | null => {
    const p = posAt(clientX, clientY);
    if (!p) return null;
    const c = Math.floor(p.x);
    const r = Math.floor(p.y);
    if (r < 0 || c < 0 || r >= puzzle.size || c >= puzzle.size) return null;
    return { r, c };
  };

  /** Straight line from the start cell toward the finger, snapped to the nearest of 8 directions. */
  const lineTo = (start: Cell, clientX: number, clientY: number): Cell[] => {
    const p = posAt(clientX, clientY);
    if (!p) return [start];
    const dx = p.x - (start.c + 0.5);
    const dy = p.y - (start.r + 0.5);
    const dist = Math.hypot(dx, dy);
    if (dist < 0.5) return [start];
    const angle = Math.atan2(dy, dx);
    const step = Math.round(angle / (Math.PI / 4));
    const dirC = Math.round(Math.cos(step * (Math.PI / 4)));
    const dirR = Math.round(Math.sin(step * (Math.PI / 4)));
    // project the finger onto that direction to get how many cells along
    const unit = Math.hypot(dirC, dirR);
    const along = (dx * dirC + dy * dirR) / (unit * unit);
    const n = Math.max(0, Math.round(along));
    const { size } = puzzle;
    const cells: Cell[] = [start];
    for (let i = 1; i <= n; i++) {
      const r = start.r + dirR * i;
      const c = start.c + dirC * i;
      if (r < 0 || c < 0 || r >= size || c >= size) break;
      cells.push({ r, c });
    }
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
    const prev = selectingRef.current;
    if (!prev) return;
    const next = lineTo(prev[0], e.clientX, e.clientY);
    const same = next.length === prev.length && next.every((cell, i) => cell.r === prev[i].r && cell.c === prev[i].c);
    if (same) return;
    const sameDir = prev.length > 1 && next.length > 1 && next[1].r === prev[1].r && next[1].c === prev[1].c;
    if (next.length > prev.length || (!sameDir && next.length > 1)) playLetterTick();
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
      <div className="flex flex-col divide-y divide-stone-100 rounded-2xl bg-white/80 px-4 py-1 ring-1 ring-stone-200 dark:divide-stone-700 dark:bg-stone-800 dark:ring-stone-600">
        {puzzle.groups.map((g) => (
          <div key={g.label} className="flex items-center gap-3 py-2.5">
            <p className="w-20 shrink-0 text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">{g.label}</p>
            <div className="flex flex-wrap gap-x-2 gap-y-1">
              {g.ids.map((id) => {
                const p = puzzle.placed.find((x) => x.word.id === id);
                if (!p) return null;
                const isFound = found.has(id);
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => onWordTap(id)}
                    className={`rounded-full px-2.5 py-0.5 text-lg font-semibold ${
                      hintArmed && !isFound
                        ? "bg-teal-50 ring-1 ring-teal-300 dark:bg-teal-950 dark:ring-teal-700"
                        : "text-stone-900 dark:text-stone-100"
                    }`}
                    style={isFound ? { color: colorOf(id), textDecoration: "line-through", textDecorationThickness: 2 } : undefined}
                  >
                    {p.word.korean}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
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

      <div className="rounded-2xl bg-white p-3 ring-1 ring-stone-200 dark:bg-stone-800 dark:ring-stone-600">
      <div
        ref={gridRef}
        role="grid"
        aria-label="Word find grid"
        className="relative aspect-square w-full touch-none select-none"
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
          {selecting && selecting.length === 1 && (
            <circle cx={selecting[0].c + 0.5} cy={selecting[0].r + 0.5} r="0.36" fill="#0d9488" opacity="0.35" />
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
              <div key={`${r}-${c}`} role="gridcell" className="grid place-items-center font-bold text-stone-800 dark:text-stone-100"
                style={{ fontSize: `min(${puzzle.size <= 10 ? 22 : puzzle.size === 11 ? 20 : 18}px, ${Math.round(70 / puzzle.size)}vw)` }}>
                {ch}
              </div>
            )),
          )}
        </div>
      </div>
      </div>

      {done && <p className="text-center text-sm font-medium text-teal-700 dark:text-teal-300">Nice — you found all nine. Start a new puzzle whenever you like.</p>}
    </section>
  );
}
