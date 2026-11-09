import { pickThemedWords, type GameWord } from "@/lib/gameWords";

export type Cell = { r: number; c: number };

export type PlacedWord = {
  word: GameWord;
  cells: Cell[];
};

export type WordFindPuzzle = {
  size: number;
  grid: string[][];
  placed: PlacedWord[];
  groups: { label: string; ids: string[] }[];
};

const DIRS: Cell[] = [
  { r: 0, c: 1 },
  { r: 0, c: -1 },
  { r: 1, c: 0 },
  { r: -1, c: 0 },
  { r: 1, c: 1 },
  { r: 1, c: -1 },
  { r: -1, c: 1 },
  { r: -1, c: -1 },
];

function canPlace(grid: (string | null)[][], r: number, c: number, dir: Cell, letters: string): boolean {
  const size = grid.length;
  for (let i = 0; i < letters.length; i++) {
    const rr = r + dir.r * i;
    const cc = c + dir.c * i;
    if (rr < 0 || cc < 0 || rr >= size || cc >= size) return false;
    const cur = grid[rr][cc];
    if (cur && cur !== letters[i]) return false;
  }
  return true;
}

function placeWord(grid: (string | null)[][], word: GameWord): Cell[] | null {
  const size = grid.length;
  const letters = word.grid;
  const starts: { r: number; c: number; dir: Cell }[] = [];
  for (const dir of DIRS) {
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (canPlace(grid, r, c, dir, letters)) starts.push({ r, c, dir });
      }
    }
  }
  if (starts.length === 0) return null;
  const pick = starts[Math.floor(Math.random() * starts.length)];
  const cells: Cell[] = [];
  for (let i = 0; i < letters.length; i++) {
    const rr = pick.r + pick.dir.r * i;
    const cc = pick.c + pick.dir.c * i;
    grid[rr][cc] = letters[i];
    cells.push({ r: rr, c: cc });
  }
  return cells;
}

function fillRandom(grid: (string | null)[][]): string[][] {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return grid.map((row) => row.map((ch) => ch ?? letters[Math.floor(Math.random() * letters.length)]));
}

function tryGenerate(size: number, words: GameWord[]): Omit<WordFindPuzzle, "groups"> | null {
  const empty: (string | null)[][] = Array.from({ length: size }, () => Array<string | null>(size).fill(null));
  const placed: PlacedWord[] = [];
  for (const word of words) {
    const cells = placeWord(empty, word);
    if (!cells) return null;
    placed.push({ word, cells });
  }
  return { size, grid: fillRandom(empty), placed };
}

export function generateWordFind(): WordFindPuzzle {
  for (const size of [10, 11, 12]) {
    for (let attempt = 0; attempt < 40; attempt++) {
      const groups = pickThemedWords(3, 3);
      if (!groups) continue;
      // place longest first so they fit, but keep theme order for display
      const words = groups.flatMap((g) => g.words).sort((a, b) => b.grid.length - a.grid.length);
      const puzzle = tryGenerate(size, words);
      if (puzzle) {
        return { ...puzzle, groups: groups.map((g) => ({ label: g.label, ids: g.words.map((w) => w.id) })) };
      }
    }
  }
  throw new Error("Could not generate a word-find puzzle");
}

export function cellsEqual(a: Cell[], b: Cell[]): boolean {
  if (a.length !== b.length) return false;
  return a.every((cell, i) => cell.r === b[i].r && cell.c === b[i].c);
}

export function sameLine(a: Cell[], b: Cell[]): boolean {
  if (cellsEqual(a, b)) return true;
  return cellsEqual(a, [...b].reverse());
}
