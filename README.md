# Dr. M. Omar — Reels Project Management System

Static site tracking the delivery of **50 reels** across three ophthalmology series, plus the brand
guidelines the video editor works to.

- **Dashboard** — `index.html` — progress per series, review queue, daily updates, episode tables
- **Editor Guidelines** — `guidelines.html` — the 13 rules every reel must follow

No build step, no dependencies. Cloudflare Pages serves the repository directly.

---

## The daily update loop

**You only ever edit one file: [`js/data.js`](js/data.js).**

Everything on the dashboard — every count, every percentage, every progress bar — is calculated from
that file at page load. There is no total to keep in sync by hand.

1. Open `js/data.js`
2. Make your change (see the recipes below)
3. Change `lastUpdated` to today's date
4. Commit and push:
   ```bash
   git add js/data.js
   git commit -m "Update: <what changed>"
   git push
   ```
5. Cloudflare redeploys in ~30 seconds

### Recipe — move an episode along

Find the episode and change its `status`:

```js
{ n: 7, title: "…", link: "https://f.io/5K457md6", status: "approved", … }
```

Valid statuses, exactly as spelled:

| Status | Shows as | Effect on the row |
|---|---|---|
| `"not-started"` | Hasn't started | — |
| `"in-review"` | In review | — |
| `"revisions"` | Working on revisions | — |
| `"approved"` | Ready to publish | Adds a **READY TO PUBLISH** band |
| `"published"` | Published | Adds a **PUBLISHED** band |

### Recipe — record a verdict

Each version carries one verdict per reviewer. Change the string:

```js
versions: [
  { v: 1, reviews: { Hajar: "approved" } }
]
```

Valid verdicts, exactly as spelled:

| Verdict | Shows as | Meaning |
|---|---|---|
| `"pending"` | Hajar pending | Hasn't looked at this cut yet |
| `"approved"` | Hajar approved | Signed this cut off |
| `"revisions"` | Hajar requested revisions | Asked for changes on this cut |

These are **display only** — the file is the source of truth, nobody clicks anything in the browser.

### Recipe — send a new cut for review

**Append** a version. Never overwrite the previous one — the history is the point:

```js
versions: [
  { v: 0, reviews: { Hajar: "revisions" } },
  { v: 1, reviews: { Hajar: "pending"   } }   // ← new cut
]
```

`v` is a number, shown as `V0` / `V1` / `V2`. Most episodes start at `v: 1`; the ones already in
progress when versioning was introduced start at `v: 0`. Newest goes **last**.

An episode that hasn't started has `versions: []` — no sub-row is drawn.

### Recipe — add a review link

```js
link: "https://f.io/XXXXXXXX",
```

The link sits on the **episode**, not the version — every version of an episode shares it. Use `null`
for no link. A row with a link becomes clickable and gets an ↗ chip. Frame.io and Google Drive URLs
both work; the chip names the host for screen readers.

### Recipe — post the day's update

Add a new block at the **top** of the `updates` array:

```js
updates: [
  {
    date: "2026-08-02",
    items: [
      { owner: "Alaa",  text: "Series 1 Ep 5 and Ep 6 revisions are due back today." },
      { owner: null,    text: "General note with no owner." }
    ]
  },
  … older blocks below …
]
```

The top block is highlighted as **Latest**.

---

## Structure

```
index.html              Dashboard
guidelines.html         Editor guidelines
css/style.css           All styling
js/data.js          ←   the only file you edit
js/app.js               Renders the dashboard from data.js
assets/                 Reference images used by the guidelines page
scripts/                Teleprompter scripts (source of the episode titles)
M-Omar-Editor-Guide.md  Full technical brand guide
```

---

## Running it locally

```bash
python -m http.server 8000
```

Then open <http://localhost:8000>. Opening `index.html` straight from the filesystem also works.

If a count ever looks wrong, open the browser console — `app.js` warns when a series' declared `total`
and its actual episode list disagree.

---

## Deploying to Cloudflare Pages

Connect the repository, then:

| Setting | Value |
|---|---|
| Framework preset | **None** |
| Build command | *(leave empty)* |
| Build output directory | `/` |

Every push to `main` redeploys.

---

## Open item

**Series 3 identity colour is a placeholder.** `js/data.js` marks it with `accentTBD: true`, which
renders a "colour TBD" flag on the series header. Replace `accent` and `accentSoft` on the
`vision-stories` series when the look is decided, and delete the `accentTBD` line.
