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
| `"in-review"` | In review | Reviewer checkboxes visible |
| `"revisions"` | Working on revisions | Reviewer checkboxes visible |
| `"approved"` | Ready to publish | Checkboxes replaced by a **READY TO PUBLISH** band |
| `"published"` | Published | Checkboxes replaced by a **PUBLISHED** band |

### Recipe — tick a reviewer off

```js
reviews: { Hajar: true, Hossam: true }
```

`true` = checked, `false` = unchecked. These are **display only** — the file is the source of truth,
nobody ticks a box in the browser.

### Recipe — add a Frame.io link

```js
link: "https://f.io/XXXXXXXX",
```

Use `null` for no link. A row with a link becomes clickable and gets an ↗ chip.

### Recipe — add a publish date

```js
publishDate: "2026-08-14",
```

Always `YYYY-MM-DD`. Use `null` if not published yet — the column shows an em dash.

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
renders a "colour TBD" flag on the series header. Replace `accent` and `accentLift` on the
`vision-stories` series when the look is decided, and delete the `accentTBD` line.
