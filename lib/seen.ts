const KEY = "owa-seen";

export type SeenState = { verbs: string[]; vocab: string[] };

export const EMPTY_SEEN: SeenState = { verbs: [], vocab: [] };

const listeners = new Set<() => void>();
let cache: SeenState | null = null;

function emit() {
  listeners.forEach((l) => l());
}

export function loadSeen(): SeenState {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? "");
    return {
      verbs: Array.isArray(raw.verbs) ? raw.verbs.filter((v: unknown) => typeof v === "string") : [],
      vocab: Array.isArray(raw.vocab) ? raw.vocab.filter((v: unknown) => typeof v === "string") : [],
    };
  } catch {
    return { verbs: [], vocab: [] };
  }
}

function save(seen: SeenState) {
  try {
    localStorage.setItem(KEY, JSON.stringify(seen));
  } catch {
    /* ignore */
  }
}

export function getSeenSnapshot(): SeenState {
  if (cache == null) cache = loadSeen();
  return cache;
}

export function subscribeSeen(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function markVerb(id: string): SeenState {
  const seen = getSeenSnapshot();
  if (seen.verbs.includes(id)) return seen;
  cache = { verbs: [...seen.verbs, id], vocab: seen.vocab };
  save(cache);
  emit();
  return cache;
}

export function markVocab(id: string): SeenState {
  const seen = getSeenSnapshot();
  if (seen.vocab.includes(id)) return seen;
  cache = { verbs: seen.verbs, vocab: [...seen.vocab, id] };
  save(cache);
  emit();
  return cache;
}
