import {
  ensureResumed,
  getMasterGain,
  clamp01,
  cleanupOnEnded,
} from "../context.js";

export async function playClick(options = {}) {
  const ctx = await ensureResumed();
  const out = getMasterGain();
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(options.freq ?? 900, t);
  const gain = ctx.createGain();
  const peak = clamp01(options.peak, 0.26);
  const decaySec = 0.065;
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
  osc.type = "sine";
  osc.frequency.setValueAtTime(options.freq ?? 1100, t);
  const gain = ctx.createGain();
  const peak = clamp01(options.peak, 0.26);
  const decaySec = 0.055;
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
  osc.type = "sine";
  const f0 = options.f0 ?? 680;
  const f1 = options.f1 ?? 220;
  osc.frequency.setValueAtTime(f0, t);
  osc.frequency.exponentialRampToValueAtTime(f1, t + 0.08);
  const gain = ctx.createGain();
  const peak = clamp01(options.peak, 0.26);
  const decaySec = 0.14;
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
  osc.type = "sine";
  const up = Boolean(isOn);
  const f0 = up ? 360 : 500;
  const f1 = up ? 620 : 260;
  osc.frequency.setValueAtTime(f0, t);
  osc.frequency.exponentialRampToValueAtTime(f1, t + 0.07);
  const gain = ctx.createGain();
  const peak = clamp01(options.peak, 0.26);
  const decaySec = 0.14;
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
  osc.type = "sine";
  osc.frequency.setValueAtTime(options.f0 ?? 300, t);
  osc.frequency.exponentialRampToValueAtTime(options.f1 ?? 110, t + 0.08);
  osc.frequency.exponentialRampToValueAtTime(220, t + 0.16);
  const gain = ctx.createGain();
  const peak = clamp01(options.peak, 0.26);
  const decaySec = 0.22;
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
  const peak = clamp01(options.peak, 0.26);
  const f1 = options.f0 ?? 523;
  const f2 = options.f1 ?? 659;
  const toneDur = 0.1;
  const gap = 0.06;
  const playTone = (startTime, freq) => {
    const osc = ctx.createOscillator();
    osc.type = "sine";
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
  const peak = clamp01(options.peak, 0.26);
  const f1 = options.f0 ?? 494;
  const f2 = options.f1 ?? 370;
  const toneDur = 0.1;
  const gap = 0.06;
  const playTone = (startTime, freq) => {
    const osc = ctx.createOscillator();
    osc.type = "sine";
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
  const peak = clamp01(options.peak, 0.26);
  const freq = options.freq ?? 520;
  const beepDur = 0.08;
  const gap = 0.12;
  const playBeep = (startTime) => {
    const osc = ctx.createOscillator();
    osc.type = "sine";
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
  osc.type = "sine";
  osc.frequency.setValueAtTime(options.f0 ?? 280, t);
  osc.frequency.exponentialRampToValueAtTime(options.f1 ?? 640, t + 0.22);
  const gain = ctx.createGain();
  const peak = clamp01(options.peak, 0.26);
  const decaySec = 0.3;
  gain.gain.setValueAtTime(0.001, t);
  gain.gain.exponentialRampToValueAtTime(peak, t + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.001, t + decaySec);
  osc.connect(gain);
  gain.connect(out);
  osc.start(t);
  osc.stop(t + decaySec + 0.01);
  cleanupOnEnded(osc, [gain]);
}
