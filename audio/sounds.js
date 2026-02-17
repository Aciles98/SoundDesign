import {
  ensureResumed,
  getAudioContext,
  getAudioMeta,
  getMasterGain,
  setMasterVolume,
  clamp01,
  cleanupOnEnded,
} from "./context.js";

export { getAudioContext, getAudioMeta, setMasterVolume };

// Bubble collection (sine, soft, iOS-style).
async function pingPongClick(options = {}) {
  const ctx = await ensureResumed();
  const out = getMasterGain();
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(options.freq ?? 900, t);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(clamp01(options.peak, 0.26), t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.065);
  osc.connect(gain);
  gain.connect(out);
  osc.start(t);
  osc.stop(t + 0.075);
  cleanupOnEnded(osc, [gain]);
}
async function pingPongTick(options = {}) {
  const ctx = await ensureResumed();
  const out = getMasterGain();
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(options.freq ?? 880, t);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(clamp01(options.peak, 0.22), t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
  osc.connect(gain);
  gain.connect(out);
  osc.start(t);
  osc.stop(t + 0.055);
  cleanupOnEnded(osc, [gain]);
}
async function pingPongPop(options = {}) {
  const ctx = await ensureResumed();
  const out = getMasterGain();
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(options.f0 ?? 680, t);
  osc.frequency.exponentialRampToValueAtTime(options.f1 ?? 220, t + 0.08);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(clamp01(options.peak, 0.26), t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
  osc.connect(gain);
  gain.connect(out);
  osc.start(t);
  osc.stop(t + 0.15);
  cleanupOnEnded(osc, [gain]);
}
async function pingPongToggle(isOn, options = {}) {
  const ctx = await ensureResumed();
  const out = getMasterGain();
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = "sine";
  const up = Boolean(isOn);
  osc.frequency.setValueAtTime(up ? 360 : 500, t);
  osc.frequency.exponentialRampToValueAtTime(up ? 620 : 260, t + 0.07);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(clamp01(options.peak, 0.26), t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
  osc.connect(gain);
  gain.connect(out);
  osc.start(t);
  osc.stop(t + 0.15);
  cleanupOnEnded(osc, [gain]);
}
async function pingPongDrop(options = {}) {
  const ctx = await ensureResumed();
  const out = getMasterGain();
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(options.f0 ?? 300, t);
  osc.frequency.exponentialRampToValueAtTime(options.f1 ?? 110, t + 0.08);
  osc.frequency.exponentialRampToValueAtTime(220, t + 0.16);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(clamp01(options.peak, 0.26), t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
  osc.connect(gain);
  gain.connect(out);
  osc.start(t);
  osc.stop(t + 0.23);
  cleanupOnEnded(osc, [gain]);
}
async function pingPongSuccess(options = {}) {
  const ctx = await ensureResumed();
  const out = getMasterGain();
  const t = ctx.currentTime;
  const peak = clamp01(options.peak, 0.26);
  const f1 = options.f0 ?? 523.25, f2 = options.f1 ?? 659.25;
  const toneDur = 0.1, gap = 0.06;
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
async function pingPongError(options = {}) {
  const ctx = await ensureResumed();
  const out = getMasterGain();
  const t = ctx.currentTime;
  const peak = clamp01(options.peak, 0.26);
  const f1 = options.f0 ?? 494, f2 = options.f1 ?? 370;
  const toneDur = 0.1, gap = 0.06;
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
async function pingPongWarning(options = {}) {
  const ctx = await ensureResumed();
  const out = getMasterGain();
  const t = ctx.currentTime;
  const peak = clamp01(options.peak, 0.26);
  const freq = options.freq ?? 520, beepDur = 0.1, gap = 0.06;
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
async function pingPongStartup(options = {}) {
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

// Glass collection (triangle, brighter, shorter).
async function glassClick(options = {}) {
  const ctx = await ensureResumed();
  const out = getMasterGain();
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(options.freq ?? 1400, t);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(clamp01(options.peak, 0.32), t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.038);
  osc.connect(gain);
  gain.connect(out);
  osc.start(t);
  osc.stop(t + 0.048);
  cleanupOnEnded(osc, [gain]);
}
async function glassTick(options = {}) {
  const ctx = await ensureResumed();
  const out = getMasterGain();
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(options.freq ?? 1500, t);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(clamp01(options.peak, 0.28), t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
  osc.connect(gain);
  gain.connect(out);
  osc.start(t);
  osc.stop(t + 0.045);
  cleanupOnEnded(osc, [gain]);
}
async function glassPop(options = {}) {
  const ctx = await ensureResumed();
  const out = getMasterGain();
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(options.freq ?? 1600, t);
  const gain = ctx.createGain();
  const decaySec = 0.036;
  gain.gain.setValueAtTime(clamp01(options.peak, 0.3), t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + decaySec);
  osc.connect(gain);
  gain.connect(out);
  osc.start(t);
  osc.stop(t + decaySec + 0.01);
  cleanupOnEnded(osc, [gain]);
}
async function glassToggle(isOn, options = {}) {
  const ctx = await ensureResumed();
  const out = getMasterGain();
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(options.freq ?? (Boolean(isOn) ? 1500 : 1700), t);
  const gain = ctx.createGain();
  const decaySec = 0.035;
  gain.gain.setValueAtTime(clamp01(options.peak, 0.3), t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + decaySec);
  osc.connect(gain);
  gain.connect(out);
  osc.start(t);
  osc.stop(t + decaySec + 0.01);
  cleanupOnEnded(osc, [gain]);
}
async function glassDrop(options = {}) {
  const ctx = await ensureResumed();
  const out = getMasterGain();
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(options.freq ?? 1400, t);
  const gain = ctx.createGain();
  const decaySec = 0.038;
  gain.gain.setValueAtTime(clamp01(options.peak, 0.3), t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + decaySec);
  osc.connect(gain);
  gain.connect(out);
  osc.start(t);
  osc.stop(t + decaySec + 0.01);
  cleanupOnEnded(osc, [gain]);
}
async function glassSuccess(options = {}) {
  const ctx = await ensureResumed();
  const out = getMasterGain();
  const t = ctx.currentTime;
  const peak = clamp01(options.peak, 0.3);
  const f1 = options.f0 ?? 1318.5, f2 = options.f1 ?? 1760;
  const toneDur = 0.065, gap = 0.04;
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
async function glassError(options = {}) {
  const ctx = await ensureResumed();
  const out = getMasterGain();
  const t = ctx.currentTime;
  const peak = clamp01(options.peak, 0.3);
  const f1 = options.f0 ?? 540, f2 = options.f1 ?? 400;
  const toneDur = 0.065, gap = 0.04;
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
async function glassWarning(options = {}) {
  const ctx = await ensureResumed();
  const out = getMasterGain();
  const t = ctx.currentTime;
  const peak = clamp01(options.peak, 0.3);
  const freq = options.freq ?? 640, beepDur = 0.065, gap = 0.04;
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
async function glassStartup(options = {}) {
  const ctx = await ensureResumed();
  const out = getMasterGain();
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(options.freq ?? 1200, t);
  const gain = ctx.createGain();
  const decaySec = 0.04;
  gain.gain.setValueAtTime(clamp01(options.peak, 0.3), t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + decaySec);
  osc.connect(gain);
  gain.connect(out);
  osc.start(t);
  osc.stop(t + decaySec + 0.01);
  cleanupOnEnded(osc, [gain]);
}

const pingPong = {
  playClick: pingPongClick,
  playTick: pingPongTick,
  playPop: pingPongPop,
  playToggle: pingPongToggle,
  playDropPressed: pingPongDrop,
  playSuccess: pingPongSuccess,
  playError: pingPongError,
  playWarning: pingPongWarning,
  playStartup: pingPongStartup,
};
// Agent collection (futuristic / retro vaporwave: aggressive highpass + strong attack).
const AGENT_HIGHPASS_HZ = 2200;
const AGENT_ATTACK_SEC = 0.062;

function agentChain(ctx, out, t, { peak = 0.42, decaySec = 0.06 } = {}) {
  const filter = ctx.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.value = AGENT_HIGHPASS_HZ;
  filter.Q.value = 0.6;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.001, t);
  gain.gain.linearRampToValueAtTime(clamp01(peak), t + AGENT_ATTACK_SEC);
  gain.gain.exponentialRampToValueAtTime(0.001, t + decaySec);
  filter.connect(gain);
  gain.connect(out);
  return { filter, gain };
}

async function agentClick(options = {}) {
  const ctx = await ensureResumed();
  const out = getMasterGain();
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(options.freq ?? 1200, t);
  const chain = agentChain(ctx, out, t, { peak: clamp01(options.peak, 0.38), decaySec: 0.07 });
  osc.connect(chain.filter);
  osc.start(t);
  osc.stop(t + 0.08);
  cleanupOnEnded(osc, [chain.gain]);
}

async function agentTick(options = {}) {
  const ctx = await ensureResumed();
  const out = getMasterGain();
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(options.freq ?? 1100, t);
  const chain = agentChain(ctx, out, t, { peak: clamp01(options.peak, 0.3), decaySec: 0.09 });
  osc.connect(chain.filter);
  osc.start(t);
  osc.stop(t + 0.1);
  cleanupOnEnded(osc, [chain.gain]);
}

async function agentPop(options = {}) {
  const ctx = await ensureResumed();
  const out = getMasterGain();
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(options.f0 ?? 1400, t);
  osc.frequency.exponentialRampToValueAtTime(options.f1 ?? 400, t + 0.1);
  const chain = agentChain(ctx, out, t, { peak: clamp01(options.peak, 0.38), decaySec: 0.14 });
  osc.connect(chain.filter);
  osc.start(t);
  osc.stop(t + 0.15);
  cleanupOnEnded(osc, [chain.gain]);
}

async function agentToggle(isOn, options = {}) {
  const ctx = await ensureResumed();
  const out = getMasterGain();
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = "sine";
  const up = Boolean(isOn);
  osc.frequency.setValueAtTime(up ? 480 : 600, t);
  osc.frequency.exponentialRampToValueAtTime(up ? 900 : 400, t + 0.08);
  const chain = agentChain(ctx, out, t, { peak: clamp01(options.peak, 0.38), decaySec: 0.14 });
  osc.connect(chain.filter);
  osc.start(t);
  osc.stop(t + 0.15);
  cleanupOnEnded(osc, [chain.gain]);
}

async function agentDrop(options = {}) {
  const ctx = await ensureResumed();
  const out = getMasterGain();
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(options.f0 ?? 600, t);
  osc.frequency.exponentialRampToValueAtTime(options.f1 ?? 200, t + 0.1);
  osc.frequency.exponentialRampToValueAtTime(400, t + 0.18);
  const chain = agentChain(ctx, out, t, { peak: clamp01(options.peak, 0.38), decaySec: 0.24 });
  osc.connect(chain.filter);
  osc.start(t);
  osc.stop(t + 0.25);
  cleanupOnEnded(osc, [chain.gain]);
}

async function agentSuccess(options = {}) {
  const ctx = await ensureResumed();
  const out = getMasterGain();
  const t = ctx.currentTime;
  const peak = clamp01(options.peak, 0.36);
  const f1 = options.f0 ?? 523.25, f2 = options.f1 ?? 659.25;
  const toneDur = 0.115, gap = 0.07;
  const playTone = (startTime, freq) => {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, startTime);
    const chain = agentChain(ctx, out, startTime, { peak, decaySec: toneDur + 0.02 });
    osc.connect(chain.filter);
    osc.start(startTime);
    osc.stop(startTime + toneDur + 0.02);
    cleanupOnEnded(osc, [chain.gain]);
  };
  playTone(t, f1);
  playTone(t + gap, f2);
}

async function agentError(options = {}) {
  const ctx = await ensureResumed();
  const out = getMasterGain();
  const t = ctx.currentTime;
  const peak = clamp01(options.peak, 0.38);
  const f1 = options.f0 ?? 580, f2 = options.f1 ?? 440;
  const toneDur = 0.115, gap = 0.07;
  const playTone = (startTime, freq) => {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, startTime);
    const chain = agentChain(ctx, out, startTime, { peak, decaySec: toneDur });
    osc.connect(chain.filter);
    osc.start(startTime);
    osc.stop(startTime + toneDur + 0.01);
    cleanupOnEnded(osc, [chain.gain]);
  };
  playTone(t, f1);
  playTone(t + gap, f2);
}

async function agentWarning(options = {}) {
  const ctx = await ensureResumed();
  const out = getMasterGain();
  const t = ctx.currentTime;
  const peak = clamp01(options.peak, 0.38);
  const freq = options.freq ?? 640;
  const beepDur = 0.115, gap = 0.07;
  const playBeep = (startTime) => {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, startTime);
    const chain = agentChain(ctx, out, startTime, { peak, decaySec: beepDur });
    osc.connect(chain.filter);
    osc.start(startTime);
    osc.stop(startTime + beepDur + 0.01);
    cleanupOnEnded(osc, [chain.gain]);
  };
  playBeep(t);
  playBeep(t + gap);
}

async function agentStartup(options = {}) {
  const ctx = await ensureResumed();
  const out = getMasterGain();
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(options.f0 ?? 400, t);
  osc.frequency.exponentialRampToValueAtTime(options.f1 ?? 1000, t + 0.24);
  const chain = agentChain(ctx, out, t, { peak: clamp01(options.peak, 0.38), decaySec: 0.32 });
  osc.connect(chain.filter);
  osc.start(t);
  osc.stop(t + 0.34);
  cleanupOnEnded(osc, [chain.gain]);
}

const glass = {
  playClick: glassClick,
  playTick: glassTick,
  playPop: glassPop,
  playToggle: glassToggle,
  playDropPressed: glassDrop,
  playSuccess: glassSuccess,
  playError: glassError,
  playWarning: glassWarning,
  playStartup: glassStartup,
};

const agent = {
  playClick: agentClick,
  playTick: agentTick,
  playPop: agentPop,
  playToggle: agentToggle,
  playDropPressed: agentDrop,
  playSuccess: agentSuccess,
  playError: agentError,
  playWarning: agentWarning,
  playStartup: agentStartup,
};

// Woods collection: misma estructura y duración que Bubble. Sine, frecuencias bajas (bosque), sin filtros.
async function woodsClick(options = {}) {
  const ctx = await ensureResumed();
  const out = getMasterGain();
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(options.freq ?? 200, t);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(clamp01(options.peak, 0.26), t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.065);
  osc.connect(gain);
  gain.connect(out);
  osc.start(t);
  osc.stop(t + 0.075);
  cleanupOnEnded(osc, [gain]);
}
async function woodsTick(options = {}) {
  const ctx = await ensureResumed();
  const out = getMasterGain();
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(options.freq ?? 180, t);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(clamp01(options.peak, 0.22), t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
  osc.connect(gain);
  gain.connect(out);
  osc.start(t);
  osc.stop(t + 0.055);
  cleanupOnEnded(osc, [gain]);
}
async function woodsPop(options = {}) {
  const ctx = await ensureResumed();
  const out = getMasterGain();
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(options.f0 ?? 280, t);
  osc.frequency.exponentialRampToValueAtTime(options.f1 ?? 120, t + 0.08);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(clamp01(options.peak, 0.26), t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
  osc.connect(gain);
  gain.connect(out);
  osc.start(t);
  osc.stop(t + 0.15);
  cleanupOnEnded(osc, [gain]);
}
async function woodsToggle(isOn, options = {}) {
  const ctx = await ensureResumed();
  const out = getMasterGain();
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = "sine";
  const up = Boolean(isOn);
  osc.frequency.setValueAtTime(up ? 200 : 280, t);
  osc.frequency.exponentialRampToValueAtTime(up ? 320 : 180, t + 0.07);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(clamp01(options.peak, 0.26), t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
  osc.connect(gain);
  gain.connect(out);
  osc.start(t);
  osc.stop(t + 0.15);
  cleanupOnEnded(osc, [gain]);
}
async function woodsDrop(options = {}) {
  const ctx = await ensureResumed();
  const out = getMasterGain();
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(options.f0 ?? 220, t);
  osc.frequency.exponentialRampToValueAtTime(options.f1 ?? 100, t + 0.08);
  osc.frequency.exponentialRampToValueAtTime(180, t + 0.16);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(clamp01(options.peak, 0.26), t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
  osc.connect(gain);
  gain.connect(out);
  osc.start(t);
  osc.stop(t + 0.23);
  cleanupOnEnded(osc, [gain]);
}
async function woodsSuccess(options = {}) {
  const ctx = await ensureResumed();
  const out = getMasterGain();
  const t = ctx.currentTime;
  const peak = clamp01(options.peak, 0.26);
  const f1 = options.f0 ?? 240, f2 = options.f1 ?? 300;
  const toneDur = 0.1, gap = 0.06;
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
async function woodsError(options = {}) {
  const ctx = await ensureResumed();
  const out = getMasterGain();
  const t = ctx.currentTime;
  const peak = clamp01(options.peak, 0.26);
  const f1 = options.f0 ?? 220, f2 = options.f1 ?? 165;
  const toneDur = 0.1, gap = 0.06;
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
async function woodsWarning(options = {}) {
  const ctx = await ensureResumed();
  const out = getMasterGain();
  const t = ctx.currentTime;
  const peak = clamp01(options.peak, 0.26);
  const freq = options.freq ?? 200, beepDur = 0.1, gap = 0.06;
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
async function woodsStartup(options = {}) {
  const ctx = await ensureResumed();
  const out = getMasterGain();
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(options.f0 ?? 140, t);
  osc.frequency.exponentialRampToValueAtTime(options.f1 ?? 380, t + 0.22);
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

const woods = {
  playClick: woodsClick,
  playTick: woodsTick,
  playPop: woodsPop,
  playToggle: woodsToggle,
  playDropPressed: woodsDrop,
  playSuccess: woodsSuccess,
  playError: woodsError,
  playWarning: woodsWarning,
  playStartup: woodsStartup,
};

let currentCollection = pingPong;

export function setCollection(name) {
  if (name === "Glass") currentCollection = glass;
  else if (name === "Agent") currentCollection = agent;
  else if (name === "Woods") currentCollection = woods;
  else currentCollection = pingPong;
}

export function getCurrentCollectionName() {
  if (currentCollection === glass) return "Glass";
  if (currentCollection === agent) return "Agent";
  if (currentCollection === woods) return "Woods";
  return "Bubble";
}

export async function playClick(options = {}) {
  return currentCollection.playClick(options);
}
export async function playTick(options = {}) {
  return currentCollection.playTick(options);
}
export async function playPop(options = {}) {
  return currentCollection.playPop(options);
}
export async function playToggle(isOn, options = {}) {
  return currentCollection.playToggle(isOn, options);
}
export async function playDropPressed(options = {}) {
  return currentCollection.playDropPressed(options);
}
export async function playSuccess(options = {}) {
  return currentCollection.playSuccess(options);
}
export async function playError(options = {}) {
  return currentCollection.playError(options);
}
export async function playWarning(options = {}) {
  return currentCollection.playWarning(options);
}
export async function playStartup(options = {}) {
  return currentCollection.playStartup(options);
}

// Short tone with given waveform type (sine, triangle, square, sawtooth). Skill: setValueAtTime then exponential decay.
function playOscillatorTone(ctx, out, t, { type = "sine", freq = 440, durationSec = 0.2, peak = 0.22 } = {}) {
  const osc = ctx.createOscillator();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(clamp01(peak), t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + durationSec);

  osc.connect(gain);
  gain.connect(out);
  osc.start(t);
  osc.stop(t + durationSec + 0.01);
  cleanupOnEnded(osc, [gain]);
}

export async function playSine(options = {}) {
  const ctx = await ensureResumed();
  playOscillatorTone(ctx, getMasterGain(), ctx.currentTime, { type: "sine", freq: options.freq ?? 440, durationSec: 0.2, peak: options.peak ?? 0.22 });
}

export async function playTriangle(options = {}) {
  const ctx = await ensureResumed();
  playOscillatorTone(ctx, getMasterGain(), ctx.currentTime, { type: "triangle", freq: options.freq ?? 440, durationSec: 0.2, peak: options.peak ?? 0.2 });
}

export async function playSquare(options = {}) {
  const ctx = await ensureResumed();
  playOscillatorTone(ctx, getMasterGain(), ctx.currentTime, { type: "square", freq: options.freq ?? 440, durationSec: 0.15, peak: options.peak ?? 0.15 });
}

export async function playSawtooth(options = {}) {
  const ctx = await ensureResumed();
  playOscillatorTone(ctx, getMasterGain(), ctx.currentTime, { type: "sawtooth", freq: options.freq ?? 440, durationSec: 0.15, peak: options.peak ?? 0.12 });
}

// Soft noise burst: louder, longer exponential tail so it doesn’t cut off.
export async function playNoise(options = {}) {
  const ctx = await ensureResumed();
  const out = getMasterGain();
  const t = ctx.currentTime;
  const bufferSec = options.durationSec ?? 0.06;
  const decaySec = 0.1;

  const buffer = ctx.createBuffer(1, Math.max(1, Math.floor(ctx.sampleRate * bufferSec)), ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / 220);
  }
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = options.filterHz ?? 4000;
  filter.Q.value = 0.7;
  const gain = ctx.createGain();
  const peak = clamp01(options.peak, 0.35);
  gain.gain.setValueAtTime(peak, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + decaySec);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(out);
  source.start(t);
  source.stop(t + Math.min(bufferSec + 0.015, decaySec));
  cleanupOnEnded(source, [filter, gain]);
}

// Noise through lowpass – muffled, organic; louder and longer tail.
export async function playLowpass(options = {}) {
  const ctx = await ensureResumed();
  const out = getMasterGain();
  const t = ctx.currentTime;
  const bufferSec = options.durationSec ?? 0.08;
  const decaySec = 0.12;

  const buffer = ctx.createBuffer(1, Math.max(1, Math.floor(ctx.sampleRate * bufferSec)), ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / 120);
  }
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = options.filterHz ?? 800;
  filter.Q.value = 0.7;
  const gain = ctx.createGain();
  const peak = clamp01(options.peak, 0.38);
  gain.gain.setValueAtTime(peak, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + decaySec);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(out);
  source.start(t);
  source.stop(t + Math.min(bufferSec + 0.02, decaySec));
  cleanupOnEnded(source, [filter, gain]);
}

// Noise through highpass – thin but not harsh; louder and longer tail.
export async function playHighpass(options = {}) {
  const ctx = await ensureResumed();
  const out = getMasterGain();
  const t = ctx.currentTime;
  const bufferSec = options.durationSec ?? 0.06;
  const decaySec = 0.09;

  const buffer = ctx.createBuffer(1, Math.max(1, Math.floor(ctx.sampleRate * bufferSec)), ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / 90);
  }
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.value = options.filterHz ?? 2000;
  filter.Q.value = 0.7;
  const gain = ctx.createGain();
  const peak = clamp01(options.peak, 0.32);
  gain.gain.setValueAtTime(peak, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + decaySec);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(out);
  source.start(t);
  source.stop(t + Math.min(bufferSec + 0.015, decaySec));
  cleanupOnEnded(source, [filter, gain]);
}

// Noise through bandpass – organic click-like; louder and longer tail.
export async function playBandpass(options = {}) {
  const ctx = await ensureResumed();
  const out = getMasterGain();
  const t = ctx.currentTime;
  const bufferSec = options.durationSec ?? 0.025;
  const decaySec = 0.045;

  const buffer = ctx.createBuffer(1, Math.max(1, Math.floor(ctx.sampleRate * bufferSec)), ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / 60);
  }
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = options.filterHz ?? 3600;
  filter.Q.value = options.q ?? 2.5;
  const gain = ctx.createGain();
  const peak = clamp01(options.peak, 0.4);
  gain.gain.setValueAtTime(peak, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + decaySec);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(out);
  source.start(t);
  source.stop(t + Math.min(bufferSec + 0.015, decaySec));
  cleanupOnEnded(source, [filter, gain]);
}

// Refresh: upward gesture (quick pitch sweep up), like "reset".
export async function playRefresh(options = {}) {
  const ctx = await ensureResumed();
  const out = getMasterGain();
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = "sine";
  const f0 = options.f0 ?? 300;
  const f1 = options.f1 ?? 800;
  osc.frequency.setValueAtTime(f0, t);
  osc.frequency.exponentialRampToValueAtTime(f1, t + 0.06);
  const gain = ctx.createGain();
  const peak = clamp01(options.peak, 0.2);
  gain.gain.setValueAtTime(peak, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
  osc.connect(gain);
  gain.connect(out);
  osc.start(t);
  osc.stop(t + 0.12);
  cleanupOnEnded(osc, [gain]);
}

// Fast: very short sound (short attack/decay).
export async function playFast(options = {}) {
  const ctx = await ensureResumed();
  const out = getMasterGain();
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(options.freq ?? 880, t);
  const gain = ctx.createGain();
  const peak = clamp01(options.peak, 0.2);
  gain.gain.setValueAtTime(peak, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
  osc.connect(gain);
  gain.connect(out);
  osc.start(t);
  osc.stop(t + 0.04);
  cleanupOnEnded(osc, [gain]);
}

// Slow: long swell (slow attack and decay).
export async function playSlow(options = {}) {
  const ctx = await ensureResumed();
  const out = getMasterGain();
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(options.freq ?? 440, t);
  const gain = ctx.createGain();
  const peak = clamp01(options.peak, 0.18);
  gain.gain.setValueAtTime(0.001, t);
  gain.gain.exponentialRampToValueAtTime(peak, t + 0.15);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
  osc.connect(gain);
  gain.connect(out);
  osc.start(t);
  osc.stop(t + 0.52);
  cleanupOnEnded(osc, [gain]);
}

// Low: low-frequency tone.
export async function playLow(options = {}) {
  const ctx = await ensureResumed();
  playOscillatorTone(ctx, getMasterGain(), ctx.currentTime, { type: "sine", freq: options.freq ?? 200, durationSec: 0.25, peak: options.peak ?? 0.22 });
}

// Mid: mid-frequency tone.
export async function playMid(options = {}) {
  const ctx = await ensureResumed();
  playOscillatorTone(ctx, getMasterGain(), ctx.currentTime, { type: "sine", freq: options.freq ?? 440, durationSec: 0.25, peak: options.peak ?? 0.22 });
}

// High: high-frequency tone.
export async function playHigh(options = {}) {
  const ctx = await ensureResumed();
  playOscillatorTone(ctx, getMasterGain(), ctx.currentTime, { type: "sine", freq: options.freq ?? 1200, durationSec: 0.2, peak: options.peak ?? 0.18 });
}

export async function playConfirm(options = {}) {
  const ctx = await ensureResumed();
  const out = getMasterGain();

  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = "sine";

  const f0 = options.f0 ?? 400;
  const f1 = options.f1 ?? 600;
  osc.frequency.setValueAtTime(f0, t);
  osc.frequency.exponentialRampToValueAtTime(f1, t + 0.04);

  const gain = ctx.createGain();
  const peak = clamp01(options.peak, 0.25);
  gain.gain.setValueAtTime(peak, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

  osc.connect(gain);
  gain.connect(out);

  osc.start(t);
  osc.stop(t + 0.14);
  cleanupOnEnded(osc, [gain]);
}

export async function playWhoosh(options = {}) {
  const ctx = await ensureResumed();
  const out = getMasterGain();

  const t = ctx.currentTime;
  const durationSec = options.durationSec ?? 0.24;

  const buffer = ctx.createBuffer(
    1,
    Math.max(1, Math.floor(ctx.sampleRate * durationSec)),
    ctx.sampleRate
  );
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.7;
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.Q.value = options.q ?? 2;
  filter.frequency.setValueAtTime(options.f0 ?? 500, t);
  filter.frequency.exponentialRampToValueAtTime(options.f1 ?? 5500, t + durationSec);

  const gain = ctx.createGain();
  const peak = clamp01(options.peak, 0.32);
  gain.gain.setValueAtTime(0.001, t);
  gain.gain.exponentialRampToValueAtTime(peak, t + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.001, t + durationSec + 0.03); // longer tail so no abrupt cutoff

  source.connect(filter);
  filter.connect(gain);
  gain.connect(out);

  source.start(t);
  source.stop(t + durationSec + 0.04);
  cleanupOnEnded(source, [filter, gain]);
}
