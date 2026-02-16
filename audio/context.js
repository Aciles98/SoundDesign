let audioContext = null;
let masterGain = null;

export function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
}

export async function ensureResumed() {
  const ctx = getAudioContext();
  if (ctx.state === "suspended") {
    await ctx.resume();
  }
  return ctx;
}

export function getMasterGain() {
  const ctx = getAudioContext();
  if (!masterGain) {
    masterGain = ctx.createGain();
    masterGain.gain.value = 0.35;
    masterGain.connect(ctx.destination);
  }
  return masterGain;
}

export function setMasterVolume(value) {
  const gain = getMasterGain();
  const ctx = getAudioContext();
  const t = ctx.currentTime;
  const v = Math.max(0, Math.min(1, Number.isFinite(value) ? value : 0.35));
  gain.gain.setValueAtTime(gain.gain.value, t);
  gain.gain.linearRampToValueAtTime(v, t + 0.02);
}

export function getAudioMeta() {
  const ctx = audioContext;
  return {
    state: ctx?.state ?? "not-created",
    sampleRate: ctx?.sampleRate ?? null,
  };
}

export function clamp01(x, fallback = 0.3) {
  const n = Number.isFinite(x) ? x : fallback;
  return Math.min(1, Math.max(0, n));
}

export function cleanupOnEnded(source, nodes = []) {
  source.onended = () => {
    try {
      source.disconnect();
    } catch {}
    for (const node of nodes) {
      try {
        node.disconnect();
      } catch {}
    }
  };
}
