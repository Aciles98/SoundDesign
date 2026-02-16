import {
  ensureResumed,
  getMasterGain,
  clamp01,
  cleanupOnEnded,
} from "../context.js";

// Glass: triangle, brighter, shorter decay, higher freq – harsh, crisp, glass-like.

export async function playClick(options = {}) {
  const ctx = await ensureResumed();
  const out = getMasterGain();
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(options.freq ?? 1400, t);
  const gain = ctx.createGain();
  const peak = clamp01(options.peak, 0.32);
  const decaySec = 0.038;
  gain.gain.setValueAtTime(peak, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + decaySec);
  osc.connect(gain);
  gain.connect(out);
  osc.start(t);
  osc.stop(t + decaySec + 0.01);
  cleanupOnEnded(osc, [gain]);
}

export async function playTick(options = {}) {
  const ctx = await ensureResumed();
  const out = getMasterGain();
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(options.freq ?? 1800, t);
  const gain = ctx.createGain();
  const peak = clamp01(options.peak, 0.3);
  const decaySec = 0.032;
  gain.gain.setValueAtTime(peak, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + decaySec);
  osc.connect(gain);
  gain.connect(out);
  osc.start(t);
  osc.stop(t + decaySec + 0.01);
  cleanupOnEnded(osc, [gain]);
}

export async function playPop(options = {}) {
  const ctx = await ensureResumed();
  const out = getMasterGain();
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = "triangle";
  const f0 = options.f0 ?? 900;
  const f1 = options.f1 ?? 280;
  osc.frequency.setValueAtTime(f0, t);
  osc.frequency.exponentialRampToValueAtTime(f1, t + 0.05);
  const gain = ctx.createGain();
  const peak = clamp01(options.peak, 0.3);
  const decaySec = 0.08;
  gain.gain.setValueAtTime(peak, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + decaySec);
  osc.connect(gain);
  gain.connect(out);
  osc.start(t);
  osc.stop(t + decaySec + 0.01);
  cleanupOnEnded(osc, [gain]);
}

export async function playToggle(isOn, options = {}) {
  const ctx = await ensureResumed();
  const out = getMasterGain();
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = "triangle";
  const up = Boolean(isOn);
  const f0 = up ? 480 : 640;
  const f1 = up ? 820 : 320;
  osc.frequency.setValueAtTime(f0, t);
  osc.frequency.exponentialRampToValueAtTime(f1, t + 0.045);
  const gain = ctx.createGain();
  const peak = clamp01(options.peak, 0.3);
  const decaySec = 0.08;
  gain.gain.setValueAtTime(peak, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + decaySec);
  osc.connect(gain);
  gain.connect(out);
  osc.start(t);
  osc.stop(t + decaySec + 0.01);
  cleanupOnEnded(osc, [gain]);
}

export async function playDropPressed(options = {}) {
  const ctx = await ensureResumed();
  const out = getMasterGain();
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(options.f0 ?? 380, t);
  osc.frequency.exponentialRampToValueAtTime(options.f1 ?? 140, t + 0.05);
  osc.frequency.exponentialRampToValueAtTime(260, t + 0.11);
  const gain = ctx.createGain();
  const peak = clamp01(options.peak, 0.3);
  const decaySec = 0.14;
  gain.gain.setValueAtTime(peak, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + decaySec);
  osc.connect(gain);
  gain.connect(out);
  osc.start(t);
  osc.stop(t + decaySec + 0.01);
  cleanupOnEnded(osc, [gain]);
}

export async function playSuccess(options = {}) {
  const ctx = await ensureResumed();
  const out = getMasterGain();
  const t = ctx.currentTime;
  const peak = clamp01(options.peak, 0.3);
  const f1 = options.f0 ?? 580;
  const f2 = options.f1 ?? 740;
  const toneDur = 0.065;
  const gap = 0.04;
  const playTone = (startTime, freq) => {
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, startTime);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(peak, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + toneDur);
    osc.connect(gain);
    gain.connect(out);
    osc.start(startTime);
    osc.stop(startTime + toneDur + 0.01);
    cleanupOnEnded(osc, [gain]);
  };
  playTone(t, f1);
  playTone(t + gap, f2);
}

export async function playError(options = {}) {
  const ctx = await ensureResumed();
  const out = getMasterGain();
  const t = ctx.currentTime;
  const peak = clamp01(options.peak, 0.3);
  const f1 = options.f0 ?? 540;
  const f2 = options.f1 ?? 400;
  const toneDur = 0.065;
  const gap = 0.04;
  const playTone = (startTime, freq) => {
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, startTime);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(peak, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + toneDur);
    osc.connect(gain);
    gain.connect(out);
    osc.start(startTime);
    osc.stop(startTime + toneDur + 0.01);
    cleanupOnEnded(osc, [gain]);
  };
  playTone(t, f1);
  playTone(t + gap, f2);
}

export async function playWarning(options = {}) {
  const ctx = await ensureResumed();
  const out = getMasterGain();
  const t = ctx.currentTime;
  const peak = clamp01(options.peak, 0.3);
  const freq = options.freq ?? 640;
  const beepDur = 0.055;
  const gap = 0.08;
  const playBeep = (startTime) => {
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, startTime);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(peak, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + beepDur);
    osc.connect(gain);
    gain.connect(out);
    osc.start(startTime);
    osc.stop(startTime + beepDur + 0.01);
    cleanupOnEnded(osc, [gain]);
  };
  playBeep(t);
  playBeep(t + gap);
}

export async function playStartup(options = {}) {
  const ctx = await ensureResumed();
  const out = getMasterGain();
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(options.f0 ?? 360, t);
  osc.frequency.exponentialRampToValueAtTime(options.f1 ?? 1200, t + 0.14);
  const gain = ctx.createGain();
  const peak = clamp01(options.peak, 0.3);
  const decaySec = 0.2;
  gain.gain.setValueAtTime(0.001, t);
  gain.gain.exponentialRampToValueAtTime(peak, t + 0.025);
  gain.gain.exponentialRampToValueAtTime(0.001, t + decaySec);
  osc.connect(gain);
  gain.connect(out);
  osc.start(t);
  osc.stop(t + decaySec + 0.01);
  cleanupOnEnded(osc, [gain]);
}
