"use client";

import type { Language } from "@/lib/words";
import { notifySpeechEnd, notifySpeechStart } from "@/lib/gameAudio";

export const LANGS: Record<Language, { label: string; codes: string[]; flag: string }> = {
  korean: { label: "Korean", codes: ["ko-KR", "ko"], flag: "🇰🇷" },
  tagalog: { label: "Tagalog", codes: ["fil-PH", "fil", "tl-PH", "tl"], flag: "🇵🇭" },
};

function speakSynth(text: string, codes: string[]) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    alert("Speech isn't supported in this browser.");
    return;
  }
  const synth = window.speechSynthesis;
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const voices = synth.getVoices();
  const voice = codes
    .map((c) => voices.find((v) => v.lang.toLowerCase().startsWith(c.toLowerCase())))
    .find(Boolean);
  if (voice) u.voice = voice;
  u.lang = voice?.lang ?? codes[0];
  u.rate = 0.8;
  synth.speak(u);
}

let current: HTMLAudioElement | null = null;

/** Play the pre-generated clip; fall back to browser speech if it's missing or fails. */
export function speak(src: string, text: string, codes: string[]) {
  current?.pause();
  const audio = new Audio(src);
  current = audio;
  let fell = false;
  const fallback = () => {
    if (fell) return;
    fell = true;
    speakSynth(text, codes);
  };
  const ended = () => {
    if (current !== audio) return;
    notifySpeechEnd();
  };
  audio.addEventListener("ended", ended);
  audio.addEventListener("error", () => {
    ended();
    fallback();
  });
  audio.play().then(() => notifySpeechStart()).catch(() => {
    ended();
    fallback();
  });
}

