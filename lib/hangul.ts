const CHOSEONG = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
const JUNGSEONG = ["ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ"];
const JONGSEONG = ["", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];

/** Split a Korean string into jamo in left-to-right order (알다 → ㅇ ㅏ ㄹ ㄷ ㅏ). */
export function decomposeJamo(text: string): string[] {
  const out: string[] = [];
  for (const ch of text) {
    const code = ch.charCodeAt(0) - 0xac00;
    if (code < 0 || code > 11171) {
      if (ch.trim()) out.push(ch);
      continue;
    }
    const c = Math.floor(code / 588);
    const v = Math.floor((code % 588) / 28);
    const t = code % 28;
    out.push(CHOSEONG[c], JUNGSEONG[v]);
    if (t > 0) out.push(JONGSEONG[t]);
  }
  return out;
}

function composeSyllable(c: string, v: string, t = ""): string {
  const ci = CHOSEONG.indexOf(c);
  const vi = JUNGSEONG.indexOf(v);
  const ti = t ? JONGSEONG.indexOf(t) : 0;
  if (ci < 0 || vi < 0 || ti < 0) return c + v + t;
  return String.fromCharCode(0xac00 + ci * 588 + vi * 28 + ti);
}

/**
 * Show the first `count` jamo of `word`, composing complete syllables
 * so hints read ㅇ → 아 → 알 → 알ㄷ → 알다.
 */
export function hintPrefix(word: string, count: number): string {
  if (count <= 0) return "";
  const groups = [...word].map((ch) => decomposeJamo(ch));
  let left = count;
  let out = "";
  for (const parts of groups) {
    if (left <= 0) break;
    if (left >= parts.length) {
      out += composeSyllable(parts[0], parts[1], parts[2] ?? "");
      left -= parts.length;
      continue;
    }
    const shown = parts.slice(0, left);
    if (shown.length === 1) out += shown[0];
    else out += composeSyllable(shown[0], shown[1]);
    left = 0;
  }
  return out;
}
