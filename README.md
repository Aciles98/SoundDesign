# SoundDesign

Minimal Web Audio sandbox for generating short UI sounds.

## Included interactions

- Click
- Pop
- Toggle (On/Off)
- Tick
- Drop (pressed)
- Success
- Error
- Warning
- Startup

## Push to GitHub (or any Git repo)

Share the project by pushing it to GitHub (or GitLab, Bitbucket, etc.):

1. **Create a new repo**  
   On [GitHub](https://github.com/new): create a new repository (e.g. `SoundDesign`). Do **not** add a README, .gitignore, or license if you already have them locally.

2. **Initialize Git and push** (if this folder is not a Git repo yet):

   ```bash
   cd /path/to/SoundDesign
   git init
   git add .
   git commit -m "Initial commit: Sound Lab with Bubble, Glass, Agent"
   git branch -M main
   git remote add origin https://github.com/Aciles98/sounds.git
   git push -u origin main
   ``` If the repo already exists and you cloned it, skip `git init` and `git remote add`, and use:

   ```bash
   git add .
   git commit -m "Your message"
   git push
   ```

3. **Using SSH instead of HTTPS**  
   If you use SSH keys, set the remote with:

   ```bash
   git remote add origin git@github.com:YOUR_USERNAME/SoundDesign.git
   ```

4. **Share the link**  
   After pushing, the project is at `https://github.com/YOUR_USERNAME/SoundDesign`. Others can clone it with `git clone https://github.com/YOUR_USERNAME/SoundDesign.git` and run it locally with `python3 -m http.server 5173`.

## Run locally

From this folder:

```bash
python3 -m http.server 5173
```

Then open `http://localhost:5173` and click the buttons.

## Using Bubble Click, Tick and Startup in Framer

1. **Export the WAV files**  
   With the server running, open `http://localhost:5173/export.html`. Click each button to download:
   - `bubble-click.wav`
   - `bubble-tick.wav`
   - `bubble-startup.wav`

2. **Add the files to Framer**  
   In your Framer project: **Assets** (or **Media**) → **Upload** → select the three WAV files (or drag them in).

3. **Play a sound on interaction**  
   - Select the element that should trigger the sound (button, card, link, etc.).  
   - In the right panel, open **Interactions** (or the element’s **Component** settings).  
   - Add an interaction, e.g. **While clicking** or **When clicking** (or **While hovering** if you prefer).  
   - Add an action: **Play sound** (or **Sound** → **Play**).  
   - Choose the asset: `bubble-click.wav`, `bubble-tick.wav`, or `bubble-startup.wav`.

4. **Typical uses**  
   - **Click**: buttons, links, toggles.  
   - **Tick**: checkmarks, step indicators, list items.  
   - **Startup**: page or section entrance, “ready” state.

If **Play sound** is not in the list, check the Framer docs for your plan (e.g. **Sound** under **Actions** or **Component** → **Sound**). You can also place an **Audio** component and set its source to one of the uploaded files, then control playback via code or interactions.

## Skill used: `generating-sounds-with-ai`

This project’s Web Audio code is written to follow these rules:

- Reuse a single `AudioContext`
- Resume a suspended context before playing
- Clean up/disconnect nodes after playback
- Use exponential envelopes (never ramp to 0)
- Use noise + bandpass for click/percussion

