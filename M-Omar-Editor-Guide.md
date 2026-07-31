# M. Omar — Editor Brand Guide

### Season 2 · سلسلة عدسات العين

Everything you need to build an episode that matches the approved look. Follow the numbers exactly —
they are not suggestions, they are what the existing episodes were built with.

**Canvas: 1080 × 1920 @ 30 fps.** Every number in this guide is for that canvas.

---

## 0. Before you start

### Fonts to install

| Where | Font | PostScript name |
|---|---|---|
| Captions, closing card, bullets | **Cairo Black** | `Cairo-Black` |
| Header (series name + episode number) | **Cairo Bold** | `Cairo-Bold` |

`Cairo-Black.ttf` is in `M OMAR/assets/`. **Cairo Bold is not in the folder — download it from
Google Fonts and install it.** If either font is missing, After Effects silently falls back to Arial
and the whole episode looks wrong. Check your text layers say *Cairo* before you build anything.

### Assets

All paths are inside the `M OMAR/` folder.

| File | Used for |
|---|---|
| `season2_firstcut/S2 Ep{n} - Dr.Mohamed Omar.mp4` | The episode footage |
| `season2_subs/S2 Ep{n} - Dr.Mohamed Omar.srt` | **All on-screen text** |
| `sesason2_VO/S2 Ep{n} - Dr.Mohamed Omar.mp3` | Voiceover, for checking the SRT *(folder name is misspelled on disk — that's correct)* |
| `seamless background.jpg` | Bottom background plate |
| `grey bg.jpg` | Grey plate behind the side-camera scenes |
| `signature.png` | Header signature (has its own alpha) |
| `Full signature animation.mp4` | Footer signature strip (needs keying) |
| `transition.mp4` | Light leak on cuts |
| `SFX/click1.mp3` | Cut click |
| `low2.MP3` | Music bed |
| `fins2v5.mp4` | Outro |
| `season2_motion/` | B-roll clips and stills + `motion_durations.md` timing sheet |

### The one rule that governs everything

**The SRT file is the only source of on-screen text.** Never retype from the script, from memory, or
from what you think you heard. See §13.

---

## 1. Canvas & resolution

- **1080 × 1920, 30 fps, square pixels**
- **Composition length = footage length + 5.40 seconds** (the outro). Nothing else sets it.

> ### ⚠ Read this once, then move on
>
> The source footage is **1920 × 1080 landscape**. At 1080 × 1920 you have to scale it to
> **177.78%** to fill the frame — that is an upscale, and it softens every shot.
>
> **Do one of these before you start:**
> 1. **Pre-upscale the source to 3840 × 2160** (Topaz, or any AI upscaler) and import that instead.
>    Season 1 already works this way — see `season1_firstcut/*_3840x2160.mp4` for the precedent.
>    This is the preferred fix.
> 2. Or build the comp at **608 × 1080** (footage sits at 100%, native pixels) and upscale once on
>    export.
>
> This matters most on the side-camera scenes in §3, where the whole point of the grey plate is to
> avoid scaling up.

---

## 2. The red zone — non-negotiable

Instagram covers the edges of a Reel with its own interface. **No readable text may land in these
bands**, on any layer, at any time.

| Zone | Keep clear |
|---|---|
| **Top** | 250 px |
| **Bottom** | 380 px |
| **Left & right** | 120 px each |

That leaves a safe band from **y = 250 to y = 1540**, and a usable width of **840 px**.

**How to check it properly:**
- Measure the **bounding box** of the text, not the baseline. A descender or a second line will sit
  lower than you think.
- Put a guide layer at all four boundaries and keep it on while you work.
- Check the **widest** caption in the episode, not the first one.
- A background box counts as part of the element — its edges must stay inside too.

**One deliberate exception:** the header (§5) sits above the 250 px line. That is intentional and
matches the approved episodes — **do not move it down** to "fix" it. If you ever want to change it,
check it on a real phone first, not in After Effects.

Reference: `dimensions.jpeg` in the project root.

---

## 3. Footage, backgrounds & the side-camera scenes

### Layer order (top to bottom)

```
  Captions / boxes / graphics
  ─────────────────────────────
  Transition adjustment layers
  B-roll cards
  ─────────────────────────────
  Footage
  BG Grey          ← grey bg.jpg
  BG Seamless      ← seamless background.jpg
  Music
```

`BG Grey` and `BG Seamless` both run the **full length of the composition** and are scaled to fill.

### Main scenes

| | |
|---|---|
| Scale | **177.78%** |
| Position | **[492, 960]** |

That is 48 px left of centre — the doctor sits slightly off-centre in the frame, and this
recentres him.

### Even scenes — the side camera

The 2nd, 4th, 6th … scene after each cut is the alternate camera angle. **All of them get the same
framing.** Strip every Scale and Position keyframe on these segments and set flat values:

| | |
|---|---|
| Scale | **168.9%** |
| Position | **[531, 1013]** |

No scene zoom, no drift, no keyframes — they are pinned.

### Why the grey plate exists

Pulling the side camera back to 168.9% makes the layer 3243 × 1824 px. In a 1920-tall comp, centred
at y = 1013, that leaves a **transparent strip about 101 px tall across the top of the frame**
(y = 0 to y = 101).

> **Fill that strip with `grey bg.jpg`. Do not mask it, and do not scale the footage up to cover it.**
>
> Scaling up to hide the gap is exactly what causes the pixelation this framing was designed to
> avoid. The grey plate sits underneath and fills it cleanly at no quality cost.

---

## 4. Captions

### Type

| | |
|---|---|
| Font | **Cairo Black** (`Cairo-Black`) |
| Size | **53 px** |
| Leading | **78 px** — set it manually, **never leave it on Auto** |
| Alignment | Centred, RTL |
| Position | **[540, 1306]** |
| Max characters per line | **28** |
| Max lines | **3** |

**3-line captions move up** to **[540, 960]** — the middle of the frame — so they clear the bottom
red zone.

### Colour — alternating lines

| Line | Colour |
|---|---|
| Line 1 | `#FFFFFF` white |
| **Line 2** | **`#FFA806` orange** |
| Line 3 | `#FFFFFF` white |

Every **even** line is orange. On a 2-line caption that means the second line; on a 3-line caption
the middle line. This is the signature caption look — do not skip it.

### Drop shadow

Use the **Drop Shadow effect**, not a layer style.

| | |
|---|---|
| Colour | Black |
| Opacity | **75%** |
| Direction | **210°** |
| Distance | **5 px** |
| Softness | **5 px** |

This is what makes the text readable over live footage. Do not replace it with a stroke — a stroke
was tried and rejected; it thickens the Arabic letterforms and reads worse.

### The background pill (optional, off by default)

Every caption can carry a black pill behind it, but it is **switched off** unless a specific caption
needs it.

| | |
|---|---|
| Fill | `#000000` at **40%** |
| Corner radius | **107 px** |
| Padding | **43 px** all round |

**Turn it on when** a caption lands over a bright part of the shot and the shadow alone is not
enough. See §14.

### Line balancing (kashida)

Arabic does not justify by stretching spaces — it stretches a **connector letter inside a word**
(tatweel, ـ). The approved look balances caption lines so they are roughly equal width.

- Stretch **inside a word**, never between words. Word order and word count must never change.
- A short single-line caption is grown to at least **594 px** wide (55% of the frame).
- Never stretch the slot immediately after the **first letter of the line's first word** — it pushes
  the start of the line and reads as a typo, not as justification.
- Never stretch after a non-joining letter (ا أ إ آ ٱ د ذ ر ز و ؤ ة ى ء) — you get a floating dash.
- Maximum 14 tatweels on one line.

If a line will not balance cleanly, leave it unbalanced. A wrong stretch is far more visible than an
uneven line.

---

## 5. Hook, header & signature

📎 [Header reference](https://drive.google.com/file/d/1rMqe3zC34QCVdPa1HSjlxTOIyt5UGLvF/view) ·
📎 [Signature reference](https://drive.google.com/file/d/1S0Phaq-Lt_u_3SNxZRCPClklprLvyp-x/view)

### 5.1 The hook = the first 2 captions

| | |
|---|---|
| Font | Cairo Black |
| Size | **85 px** |
| Colour | **`#FFA400`** orange — **no background box at all** |
| Leading | **103 px** |
| Position | **[540, 845]** |
| Max characters per line | **16** |

**The hook scene stays at 100% full-frame.** No punch-in, no scale-down, no reframing. Earlier
versions shrank the hook shot over the background plate — that was rejected. Leave it full.

Add **one extra whip transition + click** at the in-point of hook caption 2. This is a transition
effect only — **do not cut the footage there.**

### 5.2 Where the hook ends

> **The hook ends at the OUT point of hook caption 2.**

Write that timestamp down. It drives four separate things:

| What | Timing |
|---|---|
| Header appears | at the **in point of hook caption 2** |
| Footer signature strip disappears | at the **out point of hook caption 1** |
| Black scrim finishes fading in | at the **hook end** |
| White hook scrim finishes fading out | at the **hook end** |

### 5.3 Header — series name & episode number

**Appears at the start of hook caption 2. Runs until the end of the footage** (it disappears when
the outro starts). Fade it in and out — do not pop it on.

All three elements are **Cairo Bold, 27 px**.

**Top left — series name**

| | |
|---|---|
| Text | `سلسلة عدسات العين` |
| Position | **[253, 168]** |
| First word `سلسلة` | `#0F48B5` blue |
| Remaining words | `#C08B23` gold |

**Under it — the signature**

| | |
|---|---|
| File | `signature.png` |
| Position | **[248, 211]** |
| Scale | **23.1%** |

`signature.png` **already has an alpha channel — do not apply a colour key to it.** Just place it.
(The *footer* signature is a different file and does need keying — see 5.4.)

**Top right — episode number**

| | |
|---|---|
| Text | `الحلقة - {n} -` (e.g. `الحلقة - 3 -`) |
| Position | **[886, 190]** |
| First word `الحلقة` | `#0F48B5` blue |
| The rest | `#C08B23` gold |

> These three sit above the 250 px safe line. That is how the approved episodes look. Leave them.

### 5.4 Footer signature strip — hook only

This is the animated signature that draws itself at the bottom of the frame.

**It only appears during hook caption 1**: from **t = 0 to the out point of hook caption 1**, then
it is gone for the rest of the episode.

| | |
|---|---|
| File | `Full signature animation.mp4` (4.0 s source) |
| Timing | Time-stretch it so the full draw fits the hook-caption-1 window |
| Scale | **44.4%** |
| Position | **[542, 1298]** |
| Keying | **Linear Color Key** on `#FEFEFE`, tolerance **0**, softness **10** |

**Behind it, a white band:**

| | |
|---|---|
| Colour | `#FFFFFF` at **30%** |
| Size | **1080 × 302 px** — full width, edge to edge |
| Corners | **Square — 0 radius** |
| Position | **[540, 1298]** |
| Timing | Same in and out as the signature |

---

## 6. The black mask from below (scrim)

A soft black gradient rising from the bottom of the frame. It is what makes the captions readable
over any shot.

| | |
|---|---|
| Layer | Black solid, full comp size |
| Opacity | **40%** |
| Band height | **998 px** — top edge at **y = 922** |
| Mask feather | **558 px** |

### Building it correctly

Draw a rectangular mask covering the bottom band, then **extend the mask past the left, right and
bottom edges of the composition by the feather amount (558 px).**

If you don't overhang, the same feather that softens the top edge will also fade the band out at the
bottom of the frame — and you lose the coverage exactly where the captions are.

```
        ┌─────────────────┐  ← comp edge
        │                 │
        │                 │
   ╭┄┄┄┄┼┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┼┄┄┄┄╮   ← only THIS edge feathers (y=922)
   ┊    │█████████████████│    ┊
   ┊    │█████████████████│    ┊
   ╰┄┄┄┄┴─────────────────┴┄┄┄┄╯
        mask overhangs left, right and bottom
```

### Fade in

| Time | Opacity |
|---|---|
| t = 0 | **0%** |
| Hook end | **40%** |

Ease both keyframes. The opening frames stay clean — the scrim arrives as the hook finishes.

### Position in the layer stack

**Put the scrim ABOVE the topmost transition adjustment layer**, and below all text.

An adjustment layer affects everything beneath it. If the scrim sits below one, every cut will whip
and blur the scrim along with the shot — it will visibly wobble. Keep it above them.

### White hook scrim — episodes 7 to 14 only

Same geometry, opposite colour and opposite ramp:

| | |
|---|---|
| Colour | `#FFFFFF` at **40%** |
| Height / feather | Same: 998 px band, 558 px feather |
| t = 0 | **100%** |
| Hook end | **0%** |

Episodes 1–6 do not have this.

---

## 7. Transitions & clicks

### The cut

Cut on **real scene changes only** — where the doctor's position or the camera angle actually
changes. Minimum **2 seconds** between cuts. Do not cut for rhythm.

### The transition layer

At each cut, an **adjustment layer, 0.4 seconds long, centred on the cut** (0.2 s before, 0.2 s
after), carrying three effects **in this order**:

| # | Effect | Settings |
|---|---|---|
| 1 | **Motion Tile** | Output width & height **300%**, **Mirror Edges ON** |
| 2 | **Transform** | *Use Composition's Shutter Angle* **OFF**, Shutter Angle **180** — the pan/zoom whip goes here |
| 3 | **Gaussian Blur** | Peaks at **107** on the cut frame, 0 at both ends |

**Motion Tile with Mirror Edges is not optional.** Without it the whip sweeps empty frame edges into
view.

Randomise between pan (4 directions) and zoom (2 directions) across the episode — do not use the
same move on every cut. Each move eases out into the cut and settles back to rest after it.

Scenes also carry a gentle **2% zoom drift** across their length — except the even scenes (§3),
which are pinned flat.

### Light leak

`transition.mp4` (1.04 s), placed **directly under the adjustment layer**, blend mode **Screen**,
**100% scale**, centred on the cut.

### Clicks — main scenes only

> **Put a click on main scene changes only. Roughly 60% of your cuts should have one.**
>
> **No click on:** b-roll entrances, graphic or bullet reveals, the closing card, the outro, or any
> quick internal cut. A click on every single cut sounds cheap and tiring.

| | |
|---|---|
| File | `SFX/click1.mp3` |
| Level | **−6 dB** |
| Timing | At the **in point of the adjustment layer** — i.e. **0.2 s before the cut**, not on the cut |

Anchoring the click to the cut itself makes it feel late. It has to land as the whip starts.

Plus the one extra click at hook caption 2 (§5.1).

---

## 8. Music

📎 [Music file](https://drive.google.com/file/d/1xZ_Au37DGK2UozGb_4Gdbpm3fUfWTuw8/view)

| | |
|---|---|
| File | `M OMAR/low2.MP3` (143.3 s) |
| Starts | t = 0 |
| Position in stack | **Bottom layer** |
| Length | Trimmed to the composition length |

`low2.MP3` is already mixed quiet — place it at **0 dB** and it will sit correctly.

### If you use a different track

> **The voiceover must stay at least 12 dB above the music at all times.**

- Duck the bed under every line of speech. The doctor is never competing with the music.
- Avoid tracks with a strong melody in the **mid range** — that's where the voice lives. Pads,
  low pulses and soft rhythmic beds work; piano melodies and vocals do not.
- Let the music breathe up in the gaps between sentences and under the outro.
- **Check the mix on phone speakers, not headphones.** Headphones will convince you it's fine when
  it isn't. Almost every viewer is on a phone.

---

## 9. Bullets, highlights & the boxes behind them

### Bullet / list layout

- Pills stacked vertically with a **25 px** gap between them.
- The **whole block is centred both horizontally and vertically** on the middle of the frame
  (**[540, 960]**), not pinned to a fixed top position. Measure the assembled stack and centre it.

| Element | Size | Text colour | Box | Box opacity |
|---|---|---|---|---|
| **Title pill** | 56 px | `#FFFFFF` | `#FFA400` orange | 100% |
| **Item pill** | 53 px | `#122472` deep blue | `#FFFFFF` white | 92% |

### Box geometry

| | |
|---|---|
| Padding | **28 px** all round |
| Box height | Text height **+ 2 × padding** |
| Corner radius | Per template (see the quick reference in §15) |

### ⚠ Alignment — the thing that goes wrong

> **Centre the box on the text's measured bounding box — horizontally AND vertically. Do not rely on
> centre justification, and do not centre on the text layer's anchor point.**

With mixed Arabic and Latin text (which happens constantly — medical terms, numbers, "IOL"), the
text layer's origin sits at the **left edge of the text**, not its centre. If you centre the box on
the anchor, every pill in the stack drifts right by half its own width, and each one drifts by a
*different* amount because they're different lengths. It looks like a mistake, because it is one.

**Do this instead:** measure the rendered text rectangle, and place both the text and the box on that
rectangle's centre. Then Position *is* the visual centre and everything lines up.

Vertically, centre on the text's optical box, not the baseline — Arabic ascenders and descenders will
otherwise push the text high in its pill.

### Variants

- **Right-aligned stack:** each pill's right edge tucks **36 px past the right edge of the frame**.
  Vertical stacking and animation are unchanged.
- **Sequential reveal:** each pill disappears exactly when the next one appears — only one visible at
  a time.

### The footage behind a bullet/graphic scene

The shot **stays full-frame** — do not shrink it or slide it away. Instead:

| | |
|---|---|
| Opacity | 100% → **30%** → 100% |
| Gaussian Blur | 0 → **71** → 0 |

Ramp both in and out across the scene. Keeping the doctor visible behind the graphics was a
deliberate decision — earlier versions that pushed the shot away read badly.

---

## 10. B-roll

📎 [B-roll & closing reference](https://drive.google.com/file/d/1KDK3njxpLWMaf04Ozzii9SU2MowA6EzS/view)

### A rounded card is the default — not full frame

| | |
|---|---|
| Width | **929 px** (86% of frame width) |
| Height | Whatever preserves the source aspect ratio |
| Corner radius | **71 px** |
| Position | **[540, 960]** — dead centre |

### The footage behind it

Stays **full-frame**, and dims for the length of the b-roll window:

| | |
|---|---|
| Opacity | 100% → **45%** → 100% |
| Gaussian Blur | 0 → **98** → 0 |

Ramp in and out — do not hard-cut the dim.

### ⚠ Stacking — put b-roll BELOW the transition adjustment layers

The b-roll card sits **under the bottom-most transition adjustment layer**, so when a cut happens the
whip and blur carry the card along with the shot.

> This is deliberate. The card is meant to read as part of the scene, not as a sticker floating on
> top of it. Do not move it above the adjustment layers to "protect" it from the distortion.

### Square tile variant

Some scenes use a centred rounded **square** cropped from the source instead of a full card.
Episode 2 (the lens grid) uses:

| | |
|---|---|
| Size | **583 px** square (54% of frame width) |
| Corner radius | **85 px** |
| Position | **[540, 634]** |
| Rotation | **90°** |

### Optional label pill above the card

For b-roll that needs naming — e.g. Episode 4's night-driving photo,
`الهالات الضوئية في القيادة الليلية`:

| | |
|---|---|
| Text | `#FFFFFF`, **59 px** |
| Box | `#111111` at **55%** |
| Corner radius | **107 px** |
| Padding | **28 px** |
| Position | **[540, 576]** — upper third, above the card |
| Timing | Appears 0.15 s after the b-roll starts |

### Captions during b-roll

Any caption overlapping a b-roll window **drops to y ≈ 1469** so it clears the card. Colour and
style are unchanged — only the position moves.

### The motion clips

The clips in `season2_motion/` are 5-second AI renders that animate elements *out*. **They are played
in reverse** so the elements animate *in*, then time-stretched to fit the window.

**`season2_motion/motion_durations.md` is the per-episode timing sheet** — it lists every scene's
file, in/out timecode, duration, and the on-screen Arabic. Use it; do not re-time by eye.

---

## 11. Closing card

Every episode ends on a card built from the last few subtitle cues.

**Timing:** it appears at the **in point of the first cue it uses**, and **holds all the way to the
outro**. The cues it consumes must be **removed from the normal caption track** — they must not
render twice.

### Layout

Rows stacked vertically, starting at **y = 538**, with a **39 px** gap between rows.
**One pill per row.** Each row enters **0.35 s after the previous one**, with a scale-pop.

### Plain text rows

| | |
|---|---|
| Font | Cairo Black, **53 px** |
| Colour | `#FFFFFF` |
| Shadow | Drop shadow at **60%** |

### Pill rows

| | |
|---|---|
| Font | Cairo Black, **53 px** |
| Text colour | **`#F8A104`** |
| Fill | `#FFFFFF` at **100%** |
| Corner radius | **39 px** |
| Padding | **28 px** |
| Shadow | **None — no shadow on pills** |

The pills are the phrase you want remembered. Keep them to 2 words or fewer.

---

## 12. Outro

📎 [Outro file](https://drive.google.com/file/d/1ix5SlYmuafrogoQrj1qOy3j7zuZPOysA/view)

| | |
|---|---|
| File | `M OMAR/fins2v5.mp4` |
| Duration | **Exactly 5.400 seconds** |
| Starts | At the end of the footage |
| Framing | Full frame |

**Composition length = footage length + 5.40 s.** Nothing overlaps the outro — the header, footer,
captions and closing card have all ended by then.

If the outro clip is ever replaced, measure the new clip's real duration and rebuild the comp length
from it. Do not assume 5.4 s.

---

## 13. Arabic accuracy — the SRT workflow

📎 [SRT files](https://drive.google.com/drive/folders/1Gv-S6XoAuWYHJNNFXZYc7jdrGKgbDcB-)

This is the part clients notice. A single wrong letter undoes a well-built episode.

### The rules

1. **The SRT is the only source of on-screen text.** Never retype from the script or from memory.
   The doctor does not always say what the script says — what he *said* is what goes on screen.

2. **Check every cue word by word against the voiceover** (`sesason2_VO/`). Play the line, read the
   cue, confirm they match exactly — including dialect forms. If he said `بتدّي`, write `بتدّي`, not
   the formal equivalent.

3. **Change wording only.** Never touch a timestamp, never merge or split a cue, never renumber.
   Cue numbers and timings are how everything else in the project stays in sync — the graphics and
   the closing card are keyed to them.

4. **Back up before you edit.** Copy the whole folder to
   `season2_subs_backup_<tag>_<YYYYMMDD>` first. Two such backups already exist as examples.

5. **Log every change** as `(cue number) old → new`, following the format in
   `season2_subs_correction_report.md`. That report is the record of the last pass —
   **83 cues, 156 words corrected across episodes 1–14.**

### What to look for

| Check | Why |
|---|---|
| **ة vs ه** at the end of a word | The most common error by far |
| **أ / إ / ا** | Wrong hamza changes the word |
| **ى vs ي** at the end | Very easy to miss on screen |
| **Shadda and dialect vowels** | `بتدّي` vs `بتدي` — write what's pronounced |
| **Numbers** | Written as digits or words? Be consistent within the episode |
| **Medical terms** | Lens names, IOL types, procedure names — verify spelling every time |
| **Line breaks** | A break must replace a space. Never break inside a word |

### Read it back

Before you build, read the SRT out loud against the audio once, start to finish. You will catch
things reading silently that you missed listening.

---

## 14. Contrast — check it every time

> ### ⚠ Standing rule
>
> **White and orange (`#FFA806` / `#FFA400`) are the first colours to fail. Recheck contrast every
> single time text lands on a bright background.**

The backgrounds in this series are bright by design — the seamless plate, the grey plate, the white
closing pills, white b-roll cards, and any blown-out highlight in the shot itself (a window, a
lab coat, a reflection on glass). White text on any of them disappears. Orange on a light grey or a
warm highlight goes muddy and is worse — it looks like a rendering error, not a colour choice.

### Where it bites most

- Captions over the **grey plate** on side-camera scenes
- Orange **line 2** of a caption over a bright part of the shot
- The **hook** — 85 px orange with **no box behind it**, over a full-frame shot you don't control
- Orange **closing pills** and white **bullet pills** over a bright b-roll card
- The **white footer band** at 30% over a light background

### Fixes, in this order

1. **Confirm the black scrim actually covers it.** Most bottom-text problems are the scrim faded in
   too late or the text sitting above the band.
2. **Switch on the caption's black pill** (`#000000` @ 40%). It is already built on every caption —
   you just enable it. This is the intended fix, use it freely.
3. **Move the caption** to a darker part of the frame.
4. **Darken the b-roll card** or increase the dim on the footage behind it.

### How to check

- Look at it at **100% zoom**, not fit-to-window. Downscaling hides low contrast.
- **Look at it on a phone, in daylight.** This is the real test and it fails things that look fine
  on a monitor.
- Scrub the **whole duration** of the caption — the shot moves underneath it, and a caption that
  reads fine on frame 1 can vanish two seconds later.
- If you are unsure whether it passes, it doesn't. Add the pill.

---

## 15. Quick reference

### Colours

| Hex | Swatch | Used for |
|---|---|---|
| `#FFFFFF` | White | Caption lines 1 & 3, closing headlines, bullet pill fill, label text, footer band |
| `#FFA806` | Orange | **Caption line 2** (every even line) |
| `#FFA400` | Orange | Hook text, bullet title pill fill |
| `#F8A104` | Amber | Closing card pill text |
| `#0F48B5` | Blue | Header — first word of both lines |
| `#C08B23` | Gold | Header — remaining words |
| `#122472` | Deep blue | Bullet item text |
| `#111111` | Near-black | B-roll label pill |
| `#000000` | Black | Scrim, caption pill, shadows |
| `#FEFEFE` | — | Key colour for the footer signature (not a design colour) |

### Type

| Element | Font | Size | Colour | Position |
|---|---|---|---|---|
| Caption | Cairo Black | 53 | White / `#FFA806` alt | [540, 1306] |
| Caption (3 lines) | Cairo Black | 53 | White / `#FFA806` alt | [540, 960] |
| Caption (over b-roll) | Cairo Black | 53 | White / `#FFA806` alt | [540, ~1469] |
| Hook | Cairo Black | 85 | `#FFA400` | [540, 845] |
| Header — series | Cairo Bold | 27 | `#0F48B5` + `#C08B23` | [253, 168] |
| Header — episode | Cairo Bold | 27 | `#0F48B5` + `#C08B23` | [886, 190] |
| Signature (header) | *image* | 23.1% | — | [248, 211] |
| Bullet title | Cairo Black | 56 | White on `#FFA400` | centred block |
| Bullet item | Cairo Black | 53 | `#122472` on white 92% | centred block |
| B-roll label | Cairo Black | 59 | White on `#111111` 55% | [540, 576] |
| Closing text row | Cairo Black | 53 | White | from y 538 |
| Closing pill row | Cairo Black | 53 | `#F8A104` on white | from y 538 |

### Corner radii & padding

| Element | Corner | Padding |
|---|---|---|
| Caption pill | 107 | 43 |
| B-roll card | 71 | — |
| B-roll tile (Ep2) | 85 | — |
| B-roll label pill | 107 | 28 |
| Closing pill | 39 | 28 |
| Footer band | **0 (square)** | — |

### Timing

| Element | In | Out |
|---|---|---|
| Footer signature + band | 0 | End of hook caption 1 |
| Hook captions | 0 | End of hook caption 2 (= **hook end**) |
| Black scrim fade-in | 0 (at 0%) | Hook end (at 40%) |
| White hook scrim (Ep 7–14) | 0 (at 100%) | Hook end (at 0%) |
| Header + signature | Start of hook caption 2 | End of footage |
| Closing card | In point of its first cue | End of footage |
| Outro | End of footage | +5.40 s |

### Layer stack, top to bottom

```
  1.  Captions, boxes, bullets, closing card
  2.  Header (series, signature, episode number)
  3.  Footer signature + white band
  4.  Black scrim              ← above the transition layers
  5.  Transition adjustment layers
  6.  Light leaks
  7.  B-roll cards + labels    ← below the transition layers
  8.  Footage
  9.  BG Grey
 10.  BG Seamless
 11.  Music
```

---

## Pre-delivery checklist

- [ ] Comp is **1080 × 1920 @ 30 fps**, length = **footage + 5.40 s**
- [ ] Fonts are **Cairo Black** and **Cairo Bold** — no Arial anywhere
- [ ] SRT verified **word by word** against the voiceover; changes logged; timings untouched
- [ ] No text in the **red zone** (top 250 / bottom 380 / sides 120) — checked on the widest caption
- [ ] **Contrast checked on a phone, in daylight** — white and orange over every bright background
- [ ] **Line 2 of every caption is `#FFA806`**
- [ ] Leading is **78 px**, not Auto
- [ ] Even scenes pinned at **168.9% / [531, 1013]**, no keyframes
- [ ] **`grey bg.jpg` fills the top strip** on every even scene — nothing masked, nothing scaled up
- [ ] Scrim mask **overhangs left/right/bottom**; scrim is **above** the transition layers
- [ ] Clicks on **main scene cuts only** — none on b-roll, graphics or the closing card
- [ ] **Voiceover sits ≥ 12 dB above the music**, checked on phone speakers
- [ ] B-roll cards sit **below** the transition adjustment layers
- [ ] Closing-card cues are **not** also rendering as normal captions
- [ ] Outro starts exactly at the end of the footage
- [ ] Full playback watched **on a phone**, start to finish, before sending
