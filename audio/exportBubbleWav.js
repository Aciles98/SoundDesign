/**
 * Renders Bubble (pingPong) Click, Tick, and Startup to WAV using OfflineAudioContext.
 * Use from export.html to download files for Framer or other use.
 */

const SAMPLE_RATE = 44100;
const MASTER_GAIN = 0.35;

function floatTo16BitPCM(float32Array) {
  const buffer = new ArrayBuffer(float32Array.length * 2);
  const view = new DataView(buffer);
  let offset = 0;
  for (let i = 0; i < float32Array.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, float32Array[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
  return buffer;
}

function encodeWAV(samples, numChannels = 1) {
  const buffer = floatTo16BitPCM(samples);
  const dataLength = buffer.byteLength;
  const header = new ArrayBuffer(44);
  const view = new DataView(header);
  const writeStr = (offset, str) => {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
  };
  writeStr(0, "RIFF");
  view.setUint32(4, 36 + dataLength, true);
  writeStr(8, "WAVE");
  writeStr(12, "fmt ");
  view.setUint32(16, 16, true); // fmt chunk size
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, numChannels, true);
  view.setUint32(24, SAMPLE_RATE, true);
  view.setUint32(28, SAMPLE_RATE * numChannels * 2, true);
  view.setUint16(32, numChannels * 2, true);
  view.setUint16(34, 16, true);
  writeStr(36, "data");
  view.setUint32(40, dataLength, true);
  return new Blob([header, buffer], { type: "audio/wav" });
}

async function renderBubbleClick() {
  const duration = 0.1;
  const ctx = new OfflineAudioContext(1, SAMPLE_RATE * duration, SAMPLE_RATE);
  const t = 0;
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(900, t);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.26 * MASTER_GAIN, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.065);
  const master = ctx.createGain();
  master.gain.value = 1;
  osc.connect(gain);
  gain.connect(master);
  master.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.075);
  const buffer = await ctx.startRendering();
  return encodeWAV(buffer.getChannelData(0));
}

async function renderBubbleTick() {
  const duration = 0.08;
  const ctx = new OfflineAudioContext(1, SAMPLE_RATE * duration, SAMPLE_RATE);
  const t = 0;
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(1100, t);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.26 * MASTER_GAIN, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.055);
  const master = ctx.createGain();
  master.gain.value = 1;
  osc.connect(gain);
  gain.connect(master);
  master.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.065);
  const buffer = await ctx.startRendering();
  return encodeWAV(buffer.getChannelData(0));
}

async function renderBubbleStartup() {
  const duration = 0.35;
  const ctx = new OfflineAudioContext(1, SAMPLE_RATE * duration, SAMPLE_RATE);
  const t = 0;
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(280, t);
  osc.frequency.exponentialRampToValueAtTime(640, t + 0.22);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.001, t);
  gain.gain.exponentialRampToValueAtTime(0.26 * MASTER_GAIN, t + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
  const master = ctx.createGain();
  master.gain.value = 1;
  osc.connect(gain);
  gain.connect(master);
  master.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.31);
  const buffer = await ctx.startRendering();
  return encodeWAV(buffer.getChannelData(0));
}

function downloadBlob(blob, filename) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

export async function exportBubbleClickWav() {
  const blob = await renderBubbleClick();
  downloadBlob(blob, "bubble-click.wav");
}

export async function exportBubbleTickWav() {
  const blob = await renderBubbleTick();
  downloadBlob(blob, "bubble-tick.wav");
}

export async function exportBubbleStartupWav() {
  const blob = await renderBubbleStartup();
  downloadBlob(blob, "bubble-startup.wav");
}
