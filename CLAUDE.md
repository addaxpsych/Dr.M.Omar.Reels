# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static project-management site tracking the delivery of a 49-reel Arabic ophthalmology video series
for Dr. Mohamed Omar Yousef. Two views:

- `index.html` — dashboard: progress, review queue, daily updates, per-episode tables
- `guidelines.html` — the brand/technical rules the video editor (Alaa) must follow

Audience is a small mixed team: the doctor, two decision makers (Hajar, Hossam), and video editors.
UI is English/LTR; all episode titles are Arabic and render RTL inline.

## Commands

There is **no build step, no npm, no tests in the repo**. It is plain static files.

```bash
python -m http.server 8000     # serve locally, then open http://localhost:8000
node --check js/data.js        # syntax-check after hand-editing data
node --check js/app.js
```

Deployment: Cloudflare Pages, framework preset **None**, build command **empty**, output dir `/`.
Every push to `main` redeploys. Remote is `github.com/addaxpsych/Dr.M.Omar.Reels`.

## Architecture

### `js/data.js` is the single source of truth

It is the **only file edited during normal use** — the owner hand-edits it daily and pushes.
It defines four globals consumed by `js/app.js` (plain `<script>` tags, no modules, no bundler):

| Global | Purpose |
|---|---|
| `PROJECT` | `lastUpdated`, `reviewers`, `updates[]`, `series[]` |
| `STATUS_META` | per-status label + `cleared` flag |
| `STATUS_ORDER` | most-complete-first; drives progress-bar segment order |
| `VERDICT_META` | per-reviewer verdict labels |

**Every number on the dashboard is computed at load** by `tally()` in `app.js:35` — totals,
percentages and bar widths are never stored. Do not introduce a hardcoded count anywhere.
`assertTotals()` (`app.js:53`) warns in the console if a series' declared `total` drifts from its
actual episode count; keep both in sync when adding or removing episodes.

### Episode vs. version model

Two levels, and they mean different things:

- **Episode** has a `status` (`not-started` / `in-review` / `revisions` / `approved` / `published`).
  This is what the dashboard counts. `approved` and `published` are the two `cleared: true` states.
- **Version** is one delivered cut: `{ v: 1, reviews: { Hajar: "approved", Hossam: "pending" } }`.
  Verdicts are `pending` / `approved` / `revisions`. Versions are **appended, never overwritten** —
  the history is the point. Rendered as indented sub-rows beneath the episode.

Episodes that haven't started carry `versions: []`, so no sub-row is drawn. `link` sits on the
**episode**, not the version — all versions of an episode share one review link (Frame.io or Google
Drive; `rowHTML` sniffs the host for the aria-label).

`rowHTML()` returns the episode `<tr>` **plus one `<tr class="vrow">` per version**. Only the episode
row carries `is-linked`/`data-href` — version rows must never navigate.

### Series accent colours flow through inline custom properties

`data.js` gives each series `accent` (legible-on-white) and `accentSoft` (a pale wash). `app.js`
emits them as inline `--accent-series` / `--accent-soft` on `.mini` and `.series`; the stylesheet
reads them via `var(--accent-series)`.

**These names deliberately differ from the data field names, and from the global `--accent`** (which
is the Apple blue used for links/nav/focus). A previous rename of `accentLift` → `accentSoft` left
`app.js` reading the old field, which silently emitted an empty custom property and made series
badges fall back to grey — nothing errors when this breaks. If you rename a field in `data.js`,
grep `js/app.js` for it.

## Design system (`css/style.css`)

Apple-style light theme: white / `#F5F5F7` grounds, native system font stack (no webfont except
**Cairo**, which is the brand's Arabic face), generous radii, colour only where it carries meaning.

### Contrast is the standing constraint

Text on white or on a tint must clear **WCAG AA** (4.5:1 body, 3:1 large). Two conventions exist
because of this and must be preserved:

- **`*-ink` tokens** (`--accent-ink`, `--gold-ink`, `--st-*-ink`) are the *text* colours. The plain
  token (`--accent`, `--gold`, `--st-approved`) is the *fill* — vivid, for bars and solid pills, and
  usually too light to read as text. Never use a fill token for small text.
- **`--ink-4` is decorative only** (large numerals, list markers). It fails AA at body sizes.

Verdict chips sit on the recessed `.vrow` tint, which costs ~0.25 of contrast ratio — that is why
`--st-approved-ink` is darker than it looks like it needs to be.

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

- Counts still add up: episode totals per series, cleared count, in-review count, unique link count
- Rendered row counts: episode rows + version rows, verdict chip counts by type
- No page-level horizontal overflow at 390px (`body.scrollWidth === 390`)
- Contrast of any new text colour against its actual composited background

Headless Chrome forces a **~504px minimum viewport**, so a `--window-size=390` screenshot silently
crops rather than reflowing. To capture true mobile, embed the page in a 390px-wide `<iframe>` on a
wider host page.

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
