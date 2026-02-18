# Sound Lab

**An interactive Web Audio sandbox for designing and prototyping UI sound.**  
Build, compare, and export short feedback sounds—no audio files required.

---

## What it does

Sound Lab lets you **browse preset sound sets** and **design your own** in the browser. Switch between **Library** (curated collections) and **Playground** (waveform, attack, decay) to find the right feel for clicks, toggles, success states, and more.

- **Library** — Four collections: **Bubble** (soft, iOS-style), **Glass** (bright, short), **Agent** (futuristic), **Woods** (warm, low). Each collection defines the same set of interactions in a distinct character.
- **Playground** — One shared set of pads (Click, Pointing, Tick, Toggle, Drop, Success, Error, Warning, Start) driven by your choices: waveform (sine, triangle, square, sawtooth), attack, and decay. No presets; you shape the sound live.

The app responds to the system theme and uses the same sounds for its own UI: the theme switch plays the **Toggle** sound; changing Library/Playground tabs plays **Pointing**.

---

## Sound set

| Interaction | Role |
|------------|------|
| **Click** | Buttons, links, primary actions |
| **Pointing** | Hover, tab focus, selection |
| **Tick** | Checkmarks, steps, list items |
| **Toggle** | On/off switches, toggles |
| **Drop** | Drag release, place item |
| **Success** | Task done, confirmation |
| **Error** | Validation, failure |
| **Warning** | Caution, non-blocking alert |
| **Start** | Page/section ready, boot |

---

## Tech

- **Vanilla JS** — No framework; single `index.html` plus `audio/` module (context, sounds).
- **Web Audio API** — One `AudioContext`, resumed on first interaction; oscillators + gain envelopes; cleanup on stop.
- **CSS** — Light/dark theme via `data-theme`, layout and controls in one file.

---

## Run it

From the project root:

```bash
python3 -m http.server 5173
```

Open **http://localhost:5173**, enable **Sound**, and use **Library** or **Playground** to trigger and compare sounds.

---

## Export for Framer (or any design tool)

1. With the server running, open **http://localhost:5173/export.html**.
2. Download the WAVs you need (e.g. `bubble-click.wav`, `bubble-tick.wav`, `bubble-startup.wav`).
3. In Framer: **Assets** → upload the files → add a **Play sound** action to your interaction and pick the asset.

Use **Click** for buttons/links, **Tick** for checkmarks or steps, **Start** for entrances or “ready” states.

---

## Why this project

I built Sound Lab to explore **programmatic UI sound**: same interactions, different timbres and envelopes, all in the browser. The goal was a small, self-contained tool that could double as a design aid and a portfolio piece for Web Audio and front-end work.
