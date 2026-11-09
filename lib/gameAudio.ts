import { getGameSettings, subscribeGameSettings } from "@/lib/gameSettings";

const TRACKS = [
  "/audio/music/amberlight.mp3",
  "/audio/music/undertow.mp3",
  "/audio/music/gymnopedie.mp3",
  "/audio/music/bach-prelude.mp3",
];

const TICKS = [
  "/audio/sfx/letter-select-0.mp3",
  "/audio/sfx/letter-select-1.mp3",
  "/audio/sfx/letter-select-2.mp3",
  "/audio/sfx/letter-select-3.mp3",
  "/audio/sfx/letter-select-4.mp3",
];

const FANFARE = "/audio/sfx/word-found.mp3";
const FADE = 2.4;
const MUSIC_VOL = 0.72;
const DUCK_VOL = 0.12;

let ctx: AudioContext | null = null;
let musicGain: GainNode | null = null;
let sfxGain: GainNode | null = null;
let musicBuffers: AudioBuffer[] = [];
let tickBuffers: AudioBuffer[] = [];
let fanfareBuffer: AudioBuffer | null = null;
let musicLoading: Promise<void> | null = null;
let sfxLoading: Promise<void> | null = null;
let lastTick: AudioBufferSourceNode | null = null;
let hidden = false;

let gameRefs = 0;
let playing = false;
let order: number[] = [];
let trackIndex = 0;
let current: { source: AudioBufferSourceNode; gain: GainNode } | null = null;
let nextTimer = 0;
let tickCursor = 0;
let speechActive = false;

function audioContext(): AudioContext {
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = new AC();
    musicGain = ctx.createGain();
    sfxGain = ctx.createGain();
    musicGain.gain.value = MUSIC_VOL;
    sfxGain.gain.value = 1;
    musicGain.connect(ctx.destination);
    sfxGain.connect(ctx.destination);
  }
  return ctx;
}

async function decode(url: string): Promise<AudioBuffer> {
  const res = await fetch(url);
  const buf = await res.arrayBuffer();
  return audioContext().decodeAudioData(buf.slice(0));
}

/** Short SFX load on their own so taps never wait on the music beds. */
function ensureSfx(): Promise<void> {
  if (!sfxLoading) {
    sfxLoading = (async () => {
      const [ticks, fanfare] = await Promise.all([Promise.all(TICKS.map(decode)), decode(FANFARE)]);
      tickBuffers = ticks;
      fanfareBuffer = fanfare;
    })().catch(() => {
      sfxLoading = null;
    });
  }
  return sfxLoading;
}

function ensureMusic(): Promise<void> {
  if (!musicLoading) {
    musicLoading = (async () => {
      musicBuffers = await Promise.all(TRACKS.map(decode));
    })().catch(() => {
      musicLoading = null;
    });
  }
  return musicLoading;
}

function shuffleOrder() {
  order = musicBuffers.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  trackIndex = 0;
}

function stopCurrent(fade = 0.4) {
  if (nextTimer) {
    window.clearTimeout(nextTimer);
    nextTimer = 0;
  }
  if (!current || !ctx) return;
  const { source, gain } = current;
  const now = ctx.currentTime;
  gain.gain.cancelScheduledValues(now);
  gain.gain.setValueAtTime(gain.gain.value, now);
  gain.gain.linearRampToValueAtTime(0, now + fade);
  try {
    source.stop(now + fade + 0.05);
  } catch {
    /* already stopped */
  }
  current = null;
}

function playTrack(index: number, fadeIn: number) {
  if (!ctx || !musicGain) return;
  const buffer = musicBuffers[index];
  if (!buffer) return;
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const gain = ctx.createGain();
  const now = ctx.currentTime;
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(1, now + Math.max(0.05, fadeIn));
  source.connect(gain);
  gain.connect(musicGain);
  source.start();
  current = { source, gain };

  const waitMs = Math.max(400, (buffer.duration - FADE) * 1000);
  nextTimer = window.setTimeout(() => {
    if (!playing) return;
    const prev = current;
    trackIndex = (trackIndex + 1) % order.length;
    playTrack(order[trackIndex], FADE);
    if (prev && ctx) {
      const t = ctx.currentTime;
      prev.gain.gain.cancelScheduledValues(t);
      prev.gain.gain.setValueAtTime(prev.gain.gain.value, t);
      prev.gain.gain.linearRampToValueAtTime(0, t + FADE);
      try {
        prev.source.stop(t + FADE + 0.08);
      } catch {
        /* already stopped */
      }
    }
  }, waitMs);
}

async function startPlayback() {
  if (playing || hidden || gameRefs <= 0 || !getGameSettings().music) return;
  await ensureMusic();
  if (!musicBuffers.length) return;
  await audioContext().resume();
  if (playing || hidden || gameRefs <= 0 || !getGameSettings().music) return;
  if (!order.length) shuffleOrder();
  playing = true;
  playTrack(order[trackIndex], 1.2);
}

function haltPlayback() {
  playing = false;
  stopCurrent(0.35);
}

export function resumeAudio() {
  if (hidden) return;
  if (ctx && ctx.state === "suspended") void ctx.resume();
  if (gameRefs > 0 && getGameSettings().music && !playing) void startPlayback();
}

export function enterGameAudio() {
  gameRefs += 1;
  void ensureSfx();
  void startPlayback();
}

export function leaveGameAudio() {
  gameRefs = Math.max(0, gameRefs - 1);
  if (gameRefs === 0) haltPlayback();
}

export function notifySpeechStart() {
  if (speechActive) return;
  speechActive = true;
  if (!ctx || !musicGain) return;
  const now = ctx.currentTime;
  musicGain.gain.cancelScheduledValues(now);
  musicGain.gain.setValueAtTime(musicGain.gain.value, now);
  musicGain.gain.linearRampToValueAtTime(DUCK_VOL, now + 0.16);
}

export function notifySpeechEnd() {
  if (!speechActive) return;
  speechActive = false;
  if (!ctx || !musicGain) return;
  const now = ctx.currentTime;
  musicGain.gain.cancelScheduledValues(now);
  musicGain.gain.setValueAtTime(musicGain.gain.value, now);
  musicGain.gain.linearRampToValueAtTime(MUSIC_VOL, now + 0.45);
}

function playBuffer(buffer: AudioBuffer | null, isTick = false) {
  if (!buffer || !getGameSettings().sfx || hidden) return;
  const ac = audioContext();
  if (ac.state === "suspended") void ac.resume();
  if (!sfxGain) return;
  if (isTick && lastTick) {
    // cut the previous tick so fast drags don't pile clips on top of each other
    try {
      lastTick.stop();
    } catch {
      /* already done */
    }
    lastTick = null;
  }
  const source = ac.createBufferSource();
  source.buffer = buffer;
  source.connect(sfxGain);
  source.start();
  if (isTick) {
    lastTick = source;
    source.onended = () => {
      if (lastTick === source) lastTick = null;
    };
  }
}

export function playLetterTick() {
  if (!getGameSettings().sfx) return;
  if (!tickBuffers.length) {
    // first tap only kicks off the (tiny) load; never queue a late tick
    void ensureSfx();
    return;
  }
  const buf = tickBuffers[tickCursor % tickBuffers.length];
  tickCursor += 1;
  playBuffer(buf, true);
}

export function playFanfare() {
  if (!getGameSettings().sfx) return;
  if (fanfareBuffer) {
    playBuffer(fanfareBuffer);
    return;
  }
  void ensureSfx().then(() => playBuffer(fanfareBuffer));
}

/** Pause music while the app is in the background; pick it back up on return. */
function onVisibility() {
  const nowHidden = document.visibilityState === "hidden";
  if (nowHidden === hidden) return;
  hidden = nowHidden;
  if (hidden) {
    haltPlayback();
    if (ctx && ctx.state === "running") void ctx.suspend();
  } else {
    if (ctx && ctx.state === "suspended") void ctx.resume();
    if (gameRefs > 0 && getGameSettings().music) void startPlayback();
  }
}

if (typeof document !== "undefined") {
  hidden = document.visibilityState === "hidden";
  document.addEventListener("visibilitychange", onVisibility);
  window.addEventListener("pagehide", () => {
    hidden = true;
    haltPlayback();
  });
  window.addEventListener("pageshow", () => {
    hidden = document.visibilityState === "hidden";
    if (!hidden && gameRefs > 0 && getGameSettings().music) void startPlayback();
  });
}

subscribeGameSettings(() => {
  const on = getGameSettings().music;
  if (!on) haltPlayback();
  else if (gameRefs > 0) void startPlayback();
});
