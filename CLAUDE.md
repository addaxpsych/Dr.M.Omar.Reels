# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static project-management site tracking the delivery of a 50-reel Arabic ophthalmology video series
for Dr. Mohamed Omar Yousef. Two views:

- `index.html` — dashboard: per-person to-do cards, overall + per-series progress, episode tables
- `guidelines.html` — the brand/technical rules the video editor (Alaa) must follow

The dashboard has exactly three sections, in this order: `#todos`, the overview (`#ovBar`,
`#miniset`), and `#serieslist`. The Vertical / Horizontal tabs (`#formatTabs`) sit between the first
two and switch everything below them — see **Vertical and horizontal formats**. `README.md` still documents a `PROJECT.updates` array and a "daily
updates" feed — **that was removed**; nothing in `data.js` or `app.js` reads it. Trust this file.

Audience is a small mixed team: the doctor, one decision maker (Hajar), and video editors.
UI is English/LTR; all episode titles are Arabic and render RTL inline.

## Commands

There is **no build step, no npm, no tests in the repo**. It is plain static files.

```bash
python -m http.server 8000     # serve locally, then open http://localhost:8000
node --check js/data.js        # syntax-check after hand-editing data
node --check js/app.js
```

`node --check` catches a broken edit but proves nothing about the numbers, because every count is
derived at render — a data change that renders wrong is still valid JavaScript. Reach for the jsdom
harness under **Verifying changes** for anything beyond a one-word status flip.

Deployment: Cloudflare Pages, framework preset **None**, build command **empty**, output dir `/`.
Every push to `main` redeploys. Remote is `github.com/addaxpsych/Dr.M.Omar.Reels`.

## Architecture

### `js/data.js` is the single source of truth

It is the **only file edited during normal use** — the owner hand-edits it daily and pushes.
It defines four globals consumed by `js/app.js` (plain `<script>` tags, no modules, no bundler):

| Global | Purpose |
|---|---|
| `PROJECT` | `lastUpdated`, `reviewers`, `todos[]`, `series[]` |
| `STATUS_META` | per-status label + `cleared` flag |
| `STATUS_ORDER` | most-complete-first; drives progress-bar segment order |
| `VERDICT_META` | per-reviewer verdict labels |

**Every number on the dashboard is computed at load** by `tally()` (`app.js`) — totals, percentages
and bar widths are never stored. Do not introduce a hardcoded count anywhere. `assertTotals()`
warns in the console if a series' declared `total` drifts from its actual episode count; keep both
in sync when adding or removing episodes. (`index.html` hardcodes `50` in `#ovTotal` purely as
pre-script placeholder text — `render()` overwrites it with the summed total.)

`PROJECT.lastUpdated` is the one value nothing computes, and it is the easiest thing to forget in a
data-only edit — it drives the "Last updated" line in the header. Set it to the current date
whenever you change `data.js` on the owner's behalf.

### Per-person to-do cards, and the episode index

`PROJECT.todos` is the top section of the page: one card per person, each holding task groups of
`{ label, series, eps: [numbers] }`. **It stores episode numbers and nothing else** — no titles, no
links, no statuses. `buildEpIndex()` (`app.js`) builds a `Map` keyed `` `${series.number}:${ep.n}` ``
once per render, and `epChipHTML()` resolves every chip's link, Arabic title and status dot through
it. That is the whole point: a to-do card cannot drift from the episode tables, and a typo'd episode
number warns in the console instead of silently rendering nothing.

Two rules that are easy to break:

- Episode chips are real `<a target="_blank" rel="noopener noreferrer">` elements, so they are
  keyboard reachable. **They deliberately do not use the `is-linked`/`data-href` contract**, which is
  click-only and unfocusable. An episode with no `link` yet renders as `.epchip--dead` — a `<span>`,
  not a dead anchor.
- The "N to do" count on each card is summed at render, like every other number here.

A person may also carry an optional **`note`** — a pinned sentence above their task groups, for
addressing them directly ("kindly check Ep 7 V1 for approval"):

```js
note: { text: "Hello Hajar — kindly check Ep 7 V1 in Series 1 for approval:", series: 1, eps: [7] }
```

One chip is appended per entry in `eps`, in that order, each resolved through the same episode index
— so only `text` is hand-written prose. Two consequences worth knowing before editing one:

- **A version named in `text` ("V1") is the one thing that can drift**, because nothing derives it.
  When you append a version or record a verdict, re-read any note that mentions that episode.
- **Note episodes count toward "N to do"**, so an episode must not be listed in both `note.eps` and a
  `tasks` group or it is counted twice. Moving an episode from a task group into the note leaves the
  card's total unchanged — that is intended.

`todoHTML()` also accepts a singular `ep:` for backwards compatibility; `eps` is the shape to write.

Person colour comes from a `tone` slug (`lavender` / `mint` / `rose` / `peach` / `butter` / `sky`)
that maps to a `.todo--*` class. This is **not** the series pattern: a series carries its own
`accent`/`accentSoft` hex values inline because they are per-series data, whereas person colour is
pure presentation and lives in CSS next to its measured contrast comment. A person card and a series
must stay distinguishable by shape as well as hue — the person has a round initial avatar, the series
has its 4px left rail and "Series N" badge.

### Episode vs. version model

Two levels, and they mean different things:

- **Episode** has a `status` (`not-started` / `in-review` / `revisions` / `approved` / `published`).
  This is what the dashboard counts. `approved` and `published` are the two `cleared: true` states.
- **Version** is one delivered cut: `{ v: 1, reviews: { Hajar: "approved" } }`.
  Verdicts are `pending` / `approved` / `revisions`. Versions are **appended, never overwritten** —
  the history is the point. Rendered as indented sub-rows beneath the episode.

Nothing in the code derives one level from the other, so two conventions live only in the data and
must be applied by hand:

- **A verdict never moves the episode's `status` on its own.** Hajar approving the latest cut does
  not make the episode `approved` — the owner advances the status deliberately, and until they do
  the episode stays where it is. S1 Eps 4-7 and S2 Eps 5-6 all sit at `in-review` with an approved
  latest cut; that is current and correct, not a stale edit to tidy up. Auto-advancing on a verdict
  would silently inflate the cleared count.
- **A superseded version keeps whatever verdict it had.** Appending V3 does not resolve V2, so a cut
  can sit at `pending` forever once it has been replaced. That is a faithful record of who actually
  looked at what, not a bug to tidy up — do not backfill verdicts nobody gave.

Most episodes start at `v: 1`; the ones already in flight when versioning was introduced start at
`v: 0`, so "the latest cut" means the last array element, never the highest `v`.

Episodes that haven't started carry `versions: []`, so no sub-row is drawn. `link` sits on the
**episode**, not the version — all versions of an episode share one review link (Frame.io or Google
Drive; `rowHTML` sniffs the host for the aria-label).

`rowHTML()` returns the episode `<tr>` **plus one `<tr class="vrow">` per version**. Only the episode
row carries `is-linked`/`data-href` — version rows must never navigate.

### Vertical and horizontal formats

Every episode is delivered twice: the vertical reel (9:16) and a horizontal cut (16:9). The episode's
own `link` / `status` / `versions` are the **vertical** reel. The horizontal cut is an optional block
on the same episode:

```js
horizontal: { link: "https://f.io/UbW8gxDb", status: "in-review",
              versions: [ { v: 1, reviews: { Hajar: "pending" } } ] }
```

The two cuts are reviewed independently, so each has its own status and history. Only `n` and
`title` are shared. Nothing derives one format's status from the other's: the S1 Ep 1 horizontal cut
is `in-review` while its vertical reel is `published`, and that is correct. An episode with no
`horizontal` block counts as `not-started` with no link and no versions, so the owner adds the block
only when a cut exists. Every series therefore has the same episode count in both formats.

`inFormat(ep, format)` (`app.js`) projects an episode into an episode-shaped object for either
format, and `seriesInFormat()` does the same for the whole series list. `rowHTML`, `cardHTML` and
`tally` never see the `horizontal` key, which is why they needed no changes. Keep it that way: teach
the projection about a new format, not the fragments.

Rendering is split in two:

- `render()` runs once: header date, the to-do cards, both tabs' "N/51 cleared" counts (one `tally`
  per format), and the wiring of the two static toggles. **Wire static markup only here.** Wiring it
  in `wireUp()` would add another listener on every format switch.
- `renderFormat(format)` runs on load and on every tab click. It redraws the overview, mini cards and
  `#serieslist` from scratch, then calls `wireUp()` and `animateBars()`. It keeps whichever series
  accordions were open (`openSeriesIds()`). Only the very first render falls back to "S1 open". The
  Cards/List `data-view` sits on `#serieslist` itself, so it survives the redraw.

**The to-do cards always read the vertical cuts.** The episode index is built from `PROJECT.series`
as stored, and every task in `PROJECT.todos` is about vertical reels. The cards render in `render()`,
outside the format switch, which is why they sit above the tabs.

The choice persists to `localStorage` under `epFormat`. **Vertical is the default**
(`FORMAT_DEFAULT`). The markup's `aria-pressed` on `#formatTabs` and the `data-format-name` heading
text ("Vertical") must match it, because the script only corrects them once it has run.

### Two views of the same episodes

Every series body renders **both** an episode table (`rowHTML`) and a card grid (`cardHTML`), and a
single `data-view` attribute on `#serieslist` decides which is visible — CSS does the hiding, nothing
re-renders on that toggle (unlike the format tabs, which do). The Cards/List switch sits in `.sectionhead` above the accordions and persists
to `localStorage` under `epView`. **Cards is the default** (`VIEW_DEFAULT` in `app.js`); the markup's
`data-view="cards"` and `aria-pressed` in `index.html` must be kept in step with it, since `setView()`
only corrects them once the script has run.

The card is deliberately **not** a second full rendering of the row: it shows only the **latest** cut
and no sign-off band, because the status pill already carries that. Full version history is what List
view is for. Anything clickable in either view uses the same `is-linked` + `data-href` contract, and
one delegated handler in `wireUp()` serves both — keep that contract if you add a third view.

Most titles are Arabic, but a few cuts are delivered in English (S1 Ep 25 is Ep 24 in English).
`titleAttrs()` sniffs for Arabic characters and emits `lang="en" dir="ltr"` when there are none;
`.ttl[lang="en"]` then drops Cairo and the RTL flow while keeping the column's right alignment.

### Series accent colours flow through inline custom properties

`data.js` gives each series `accent` (legible-on-white) and `accentSoft` (a pale wash). `app.js`
emits them as inline `--accent-series` / `--accent-soft` on `.mini` and `.series`; the stylesheet
reads them via `var(--accent-series)`.

`accentSoft` now does real work rather than just tinting a badge: it is the background of the series
head, the mini card and every episode card in that series, so the colour reads as "series N"
everywhere. That means **`accent` and `accentSoft` must be a measured pair** — `accent` is used as
text *on* `accentSoft` in `.mini__count b` and `.series__count b`. The shipped pairs are S1 copper on
peach (4.6:1) and S2 blue on sky (6.1:1). Do not swap one without re-measuring the other.

**These names deliberately differ from the data field names, and from the global `--accent`** (which
is the Apple blue used for links/nav/focus). A previous rename of `accentLift` → `accentSoft` left
`app.js` reading the old field, which silently emitted an empty custom property and made series
badges fall back to grey — nothing errors when this breaks. If you rename a field in `data.js`,
grep `js/app.js` for it.

## Design system (`css/style.css`)

Pastel light theme on an off-white `#F7F6FA` ground: colour-washed cards with large radii (24–32px)
and soft, hue-tinted ambient shadows, native system font stack (no webfont except **Cairo**, the
brand's Arabic face).

### The pastel ramps

Six hues — peach, butter, mint, sky, lavender, rose — each with **four tiers**, extending the
fill-vs-ink split to colour surfaces:

| tier | role | constraint |
|---|---|---|
| `--<hue>` | vivid fill — bar segments, dots, avatar fill | ≥ 3:1 on white |
| `--<hue>-wash` | card surface | relative luminance ≥ 0.711 |
| `--<hue>-line` | hairline, rail, bar track | decorative |
| `--<hue>-ink` | text sitting on that wash | ≥ 4.5:1 |

The wash luminance floor is exactly what `--ink-2` needs to hold 6:1, which is also why none of
these can be more saturated than they are. Every `--*-ink` clears 4.5:1 on **every** wash, not just
its own, so a mis-paired chip from a hand-edited `data.js` still passes.

### Contrast is the standing constraint

Text on white or on a tint must clear **WCAG AA** (4.5:1 body, 3:1 large). Three conventions exist
because of this and must be preserved:

- **`*-ink` tokens** (`--accent-ink`, `--gold-ink`, `--st-*-ink`, `--<hue>-ink`) are the *text*
  colours. The plain token (`--accent`, `--gold`, `--st-approved`, `--<hue>`) is the *fill* — vivid,
  for bars and solid pills, and usually too light to read as text. Never use a fill token for small
  text. `--accent` is 3.6:1 on a wash: it is a link/focus colour, not a text colour.
- **`--ink-4` is decorative only** (large numerals, list markers). It fails AA at body sizes.
- **Tinted backgrounds are opaque, never `rgba()`.** An alpha fill composites with whatever is
  behind it, so a pill that passed on white silently failed once cards became pastel — and changed
  hue with it (orange over mint composited to olive). Opaque means one measured ratio on every
  ground: white, `--ground-2`, the `.vrow` tint, or any wash. `--st-*-bg` + `--st-*-edge` exist for
  this; the edge is an inset `box-shadow` so the box model stays put (a real border reflows the
  table).

Anything touching colour must be re-measured against its **actual composited background**, not
against white. `--ink-3` had to be darkened from `#6E6E73` to `#5E5E66` for exactly this reason: it
scored 3.85:1 on a wash across 19 call sites while looking fine on white.

### Arabic and RTL

`.ar` (block) and `.ar-i` (inline) both set Cairo, `direction: rtl` and **`unicode-bidi: isolate`**.
The isolation is load-bearing: without it, two Arabic runs either side of an English word swap
visual order. Use `.ar-i` for Arabic terms inside English sentences.

### Layout gotcha

Grid/flex items default to `min-width: auto`, which lets a wide table push the page past the
viewport. There is an explicit `min-width: 0` rule near the top of the stylesheet listing every grid
container's children — extend it when adding a new grid. Wide tables go inside `.scroll-x`.
The tables reflow to card grids below 880px via `grid-template-areas`.

## Verifying changes

The repo has no test suite. Verification is done with throwaway Node/jsdom harnesses in the
scratchpad (`npm install jsdom` there, never in the project). When changing data or rendering,
check at minimum:

- Counts still add up: episode totals per series, cleared count, in-review count, unique link count,
  **in both formats** (click `#formatTabs [data-format="horizontal"]` and re-check). Each episode
  row's `data-href` and pill must match that format's link and status, the to-do markup must be
  byte-identical before and after a switch, and the open accordions must survive it
- Rendered row counts: episode rows + version rows, verdict chip counts by type
- To-do integrity: every episode referenced by a `tasks` group **or a `note`** resolves in the
  episode index, chip counts match the data, each chip's `href` and `epchip--<status>` class match
  its episode, and no episode is referenced twice on one card
- No page-level horizontal overflow at 390px (`body.scrollWidth === 390`)
- Contrast of any new text colour against its actual composited background

Assert against `PROJECT` read back out of the window, not against numbers you typed into the
harness — an expectation hardcoded to today's data becomes a false failure on the next data edit.

Three things that will waste your time if you don't know them:

- **jsdom has no `requestAnimationFrame`**, and `render()` ends by calling `animateBars()`, which
  uses it. The throw escapes through your `dispatchEvent` call and looks like a page error, but the
  DOM is already fully rendered — nothing after `animateBars()` is skipped. Shim it
  (`w.requestAnimationFrame = cb => setTimeout(cb, 0)`) so a real error stays visible.

- **jsdom leaves `document.readyState` at `"loading"`**, so `app.js` parks `render()` on
  `DOMContentLoaded` and nothing renders. Dispatch the event yourself. And `const PROJECT` is a
  global *lexical* binding, not a `window` property — after `w.eval(dataJs)` it is invisible from
  the harness. Rewrite `^const ` to `var ` when eval'ing `data.js`, or read it via `w.eval("PROJECT")`.
- **Headless Chrome forces a ~504px minimum viewport**, so a `--window-size=390` screenshot silently
  crops rather than reflowing. To measure true mobile, embed the page in a 390px-wide `<iframe>` on a
  wider host page — and serve over `http://` (`python -m http.server`), because a `file://` iframe is
  cross-origin to its host and unreachable via `page.frames()`.

When checking overflow, ignore elements clipped by an `overflow: hidden` ancestor —
`.overall__glow` deliberately bleeds past its card and never reaches the page scroll width.

## Content sources

- `scripts/*.txt` — teleprompter scripts; the origin of every episode title. They are PDF
  extractions with mangled lam-alef ligatures (`الإبصار` appears as `اإلبصار`), so titles in
  `data.js` were hand-corrected. Re-derive titles carefully.
- `M-Omar-Editor-Guide.md` — the full technical brand guide. `guidelines.html` is a curated subset
  of it plus the owner's additional rules; the two must not contradict each other.
- `assets/` — reference images embedded in `guidelines.html`. Filenames contain spaces and must be
  URL-encoded in `src` attributes.

## Known open items

- **Caption size conflict**: the owner's brief says default captions are 30–34px; the brand guide
  §4/§15 says 53px on a 1080×1920 canvas. `guidelines.html` rule 10 shows both with a "confirm"
  warning rather than silently picking one. Do not resolve this without the owner.
- **Series 3 accent is a placeholder** (`accentTBD: true` in `data.js`), which renders a visible
  "colour TBD" flag on the series header. Replace `accent` + `accentSoft` and delete the flag when
  the series look is decided.
