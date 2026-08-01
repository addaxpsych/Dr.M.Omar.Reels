/* ============================================================================
   Dr. M. Omar Reels — renderer
   Reads PROJECT from data.js and builds the dashboard.
   Nothing here needs editing to update the site — edit js/data.js instead.
   ========================================================================== */
(function () {
  "use strict";

  /* ------------------------------------------------------------- utils -- */

  const $ = (sel, root) => (root || document).querySelector(sel);

  /** Escape anything that comes from data.js before it touches innerHTML. */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, c => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[c]);
  }

  /** "2026-08-01" -> "1 Aug 2026". Parsed as plain Y-M-D, no timezone shifting. */
  function fmtDate(iso) {
    if (!iso) return null;
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
    if (!m) return iso;
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return `${Number(m[3])} ${months[Number(m[2]) - 1]} ${m[1]}`;
  }

  /** "Ep 04" / "Intro" */
  function epLabel(n) {
    return n === "intro" ? "Intro" : "Ep " + String(n).padStart(2, "0");
  }

  /* ------------------------------------------------------- episode index --
     `todos` in data.js names episodes by (series number, episode number) and
     nothing else. This resolves those pairs back to the real episode object,
     so a to-do chip's link, title and status always come from the same place
     the tables read them from and cannot drift.                             */

  let EP_INDEX = null;

  function buildEpIndex() {
    EP_INDEX = new Map();
    PROJECT.series.forEach(s => {
      s.episodes.forEach(ep => { EP_INDEX.set(s.number + ":" + ep.n, ep); });
    });
  }

  function findEpisode(seriesNo, n) {
    const ep = EP_INDEX.get(seriesNo + ":" + n);
    if (!ep) {
      console.warn("todos in data.js points at an episode that does not exist:",
                   "Series " + seriesNo, epLabel(n));
    }
    return ep || null;
  }

  /** Count episodes by status; every total on the page derives from this. */
  function tally(episodes) {
    const counts = Object.create(null);
    STATUS_ORDER.forEach(k => { counts[k] = 0; });
    episodes.forEach(ep => {
      if (counts[ep.status] === undefined) {
        console.warn("Unknown status in data.js:", ep.status, "on", epLabel(ep.n));
        counts[ep.status] = 0;
      }
      counts[ep.status]++;
    });
    const cleared = STATUS_ORDER
      .filter(k => STATUS_META[k] && STATUS_META[k].cleared)
      .reduce((sum, k) => sum + counts[k], 0);
    return { counts, cleared };
  }

  /* Warn loudly in the console if a series' declared `total` and its actual
     episode count ever drift apart — that would make the dashboard lie. */
  function assertTotals() {
    let declared = 0, actual = 0;
    PROJECT.series.forEach(s => {
      declared += s.total;
      actual += s.episodes.length;
      if (s.total !== s.episodes.length) {
        console.warn(
          `data.js: series "${s.name}" declares total ${s.total} but has ` +
          `${s.episodes.length} episodes. The bar uses the episode list.`
        );
      }
    });
    if (declared !== actual) {
      console.warn(`data.js: declared grand total ${declared}, actual ${actual}.`);
    }
    return actual;
  }

  /* ---------------------------------------------------------- fragments -- */

  function barHTML(counts, totalCount) {
    return STATUS_ORDER.map(k => {
      const n = counts[k] || 0;
      if (!n) return "";
      const pct = (n / totalCount) * 100;
      const label = `${n} ${STATUS_META[k].short}`;
      return `<span class="seg-${k}" data-w="${pct}" title="${esc(label)}"></span>`;
    }).join("");
  }

  function legendHTML(counts) {
    return STATUS_ORDER.map(k => {
      const n = counts[k] || 0;
      if (!n) return "";
      return `<span><i class="seg-${k}"></i>${esc(STATUS_META[k].short)} · ${n}</span>`;
    }).join("");
  }

  const ICON = {
    link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M9 7h8v8"/></svg>',
    tick: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="m4 12 5.5 5.5L20 6.5"/></svg>',
    warn: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4.5 22 20H2z"/><path d="M12 10v4.2M12 17.2v.1"/></svg>',
    dot:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><circle cx="12" cy="12" r="7.5"/></svg>',
    chev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 9 7 7 7-7"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.6l2.6 6.1 6.6.55-5 4.33 1.5 6.42L12 16.6l-5.7 3.4 1.5-6.42-5-4.33 6.6-.55z"/></svg>',
    live: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5 10 17.5 19.5 7"/></svg>'
  };

  function statusPill(status) {
    const meta = STATUS_META[status] || { label: status };
    return `<span class="pill pill--${esc(status)}"><i></i>${esc(meta.label)}</span>`;
  }

  /* The episode-level cell: only ever a sign-off band, or nothing.
     The per-reviewer detail lives on the version rows below it. */
  function episodeReviewCell(ep) {
    if (ep.status === "published") {
      return `<div class="band band--published">${ICON.star}Published</div>`;
    }
    if (ep.status === "approved") {
      return `<div class="band band--ready">${ICON.live}Ready to publish</div>`;
    }
    return "";
  }

  /* One chip per reviewer, carrying their verdict on THIS cut. */
  function verdictChips(version) {
    return PROJECT.reviewers.map(name => {
      const verdict = (version.reviews && version.reviews[name]) || "pending";
      const meta = VERDICT_META[verdict];
      if (!meta) {
        console.warn(`Unknown verdict "${verdict}" for ${name} on V${version.v}`);
      }
      const label = meta ? meta.label : verdict;
      const mark = verdict === "approved" ? ICON.tick
                 : verdict === "revisions" ? ICON.warn
                 : ICON.dot;
      return `<span class="vd vd--${esc(verdict)}">
                <span class="vd__ic" aria-hidden="true">${mark}</span>
                <b>${esc(name)}</b> ${esc(label)}
              </span>`;
    }).join("");
  }

  /* Titles are Arabic by default, but a few cuts are delivered in English and
     carry a Latin title — those must not be forced RTL or set in Cairo. */
  function titleAttrs(ep) {
    return /[؀-ۿ]/.test(ep.title) ? 'lang="ar"' : 'lang="en" dir="ltr"';
  }

  /* The little "open the cut" chip. Links are a mix of Frame.io and Google
     Drive — name the host so the label stays accurate as more get added. */
  function linkChipHTML(ep) {
    if (!ep.link) return "";
    const host = /drive\.google/.test(ep.link) ? "Google Drive" : "Frame.io";
    return `<a class="linkchip" href="${esc(ep.link)}" target="_blank" rel="noopener noreferrer"
               aria-label="Open ${esc(epLabel(ep.n))} on ${host}">${ICON.link}</a>`;
  }

  function versionRowHTML(ep, version) {
    return `<tr class="vrow">
      <td data-c="ep"><span class="vbadge">V${esc(version.v)}</span></td>
      <td data-c="title"></td>
      <td data-c="status"></td>
      <td data-c="reviews"><div class="checks">${verdictChips(version)}</div></td>
    </tr>`;
  }

  /* Returns the episode row PLUS one row per version. */
  function rowHTML(ep) {
    /* Only the episode row is clickable — a version row must not navigate. */
    const trAttrs = ep.link
      ? `class="is-linked" data-href="${esc(ep.link)}"`
      : `class=""`;
    const chip = linkChipHTML(ep);

    const versions = Array.isArray(ep.versions) ? ep.versions : [];

    const head = `<tr ${trAttrs}>
      <td data-c="ep"><span class="ep ${ep.n === "intro" ? "ep--intro" : ""}">${esc(epLabel(ep.n))}</span></td>
      <td data-c="title">
        <div class="tcell">
          <span class="ttl" ${titleAttrs(ep)}>${esc(ep.title)}</span>
          ${chip}
        </div>
      </td>
      <td data-c="status">${statusPill(ep.status)}</td>
      <td data-c="reviews">${episodeReviewCell(ep)}</td>
    </tr>`;

    return head + versions.map(v => versionRowHTML(ep, v)).join("");
  }

  /* The same episode as a card. Deliberately shows only the LATEST cut — the
     full version history is what List view is for. Same `is-linked`/`data-href`
     contract as the episode row, so one click handler serves both views. */
  function cardHTML(ep) {
    const versions = Array.isArray(ep.versions) ? ep.versions : [];
    const last = versions.length ? versions[versions.length - 1] : null;

    const foot = last
      ? `<div class="ecard__foot">
           <span class="vbadge">V${esc(last.v)}</span>
           <div class="checks">${verdictChips(last)}</div>
         </div>`
      : "";

    return `<article class="ecard ${ep.link ? "is-linked" : ""}"
                     ${ep.link ? `data-href="${esc(ep.link)}"` : ""}>
      <div class="ecard__top">
        <span class="ep ${ep.n === "intro" ? "ep--intro" : ""}">${esc(epLabel(ep.n))}</span>
        ${linkChipHTML(ep)}
      </div>
      <p class="ar ecard__ttl" ${titleAttrs(ep)}>${esc(ep.title)}</p>
      <div class="ecard__meta">${statusPill(ep.status)}</div>
      ${foot}
    </article>`;
  }

  /* --------------------------------------------------------- to-do cards --
     One card per person. Every episode assigned to them becomes a button that
     opens that episode's cut directly.                                      */

  const TONES = ["lavender", "mint", "rose", "peach", "butter", "sky"];

  /** One episode button. A real <a> when there is something to open, so it is
      keyboard reachable — unlike the is-linked/data-href rows and cards, which
      are click-only. Deliberately does NOT reuse that contract. */
  function epChipHTML(seriesNo, n) {
    const ep = findEpisode(seriesNo, n);
    if (!ep) return "";

    const label = esc(epLabel(ep.n));
    const status = esc(ep.status);
    const meta = STATUS_META[ep.status];
    const statusLabel = meta ? meta.label : ep.status;

    /* the title is Arabic on almost every episode, so it goes in the tooltip
       rather than in the chip — the chip has to stay one line wide */
    const desc = esc(`Series ${seriesNo} ${epLabel(ep.n)} — ${ep.title} · ${statusLabel}`);

    if (!ep.link) {
      return `<span class="epchip epchip--${status} epchip--dead" title="${desc} · no link yet">
        <i></i>${label}</span>`;
    }
    return `<a class="epchip epchip--${status}" href="${esc(ep.link)}"
               target="_blank" rel="noopener noreferrer"
               title="${desc}" aria-label="${desc}"><i></i>${label}</a>`;
  }

  function todoHTML(person) {
    const tasks = Array.isArray(person.tasks) ? person.tasks : [];
    const tone = TONES.indexOf(person.tone) > -1 ? person.tone : "";

    /* counted, never stored — same rule as every other number on the page */
    const count = tasks.reduce((sum, t) => sum + (t.eps ? t.eps.length : 0), 0);

    const groups = tasks.map(t => `<section class="todo__group">
        <p class="todo__task">${esc(t.label)} <span>Series ${esc(t.series)}</span></p>
        <div class="todo__eps">${(t.eps || []).map(n => epChipHTML(t.series, n)).join("")}</div>
      </section>`).join("");

    const body = count
      ? `<div class="todo__groups">${groups}</div>`
      : `<p class="todo__empty">Nothing assigned right now.</p>`;

    return `<article class="todo ${tone ? "todo--" + tone : ""}">
      <header class="todo__head">
        <span class="todo__avatar" aria-hidden="true">${esc(person.person.charAt(0))}</span>
        <span class="todo__id">
          <span class="todo__name">${esc(person.person)}</span>
          <span class="todo__role">${esc(person.role || "")}</span>
        </span>
        <span class="todo__count">${count} to do</span>
      </header>
      ${body}
    </article>`;
  }

  /* ------------------------------------------------------------ render -- */

  function render() {
    if (typeof PROJECT === "undefined") {
      console.error("data.js did not load — nothing to render.");
      return;
    }

    const grandTotal = assertTotals();
    buildEpIndex();

    /* --- header meta --- */
    const lu = $("#lastUpdated");
    if (lu) lu.textContent = fmtDate(PROJECT.lastUpdated) || "—";

    /* --- roll everything up --- */
    const allEpisodes = PROJECT.series.reduce((a, s) => a.concat(s.episodes), []);
    const overall = tally(allEpisodes);

    $("#ovCleared").textContent = overall.cleared;
    $("#ovTotal").textContent = grandTotal;
    $("#ovPct").textContent = Math.round((overall.cleared / grandTotal) * 100);
    $("#ovBar").innerHTML = barHTML(overall.counts, grandTotal);
    $("#ovLegend").innerHTML = legendHTML(overall.counts);

    /* --- per-series mini cards --- */
    $("#miniset").innerHTML = PROJECT.series.map(s => {
      const t = tally(s.episodes);
      const n = s.episodes.length;
      return `<a class="mini" href="#series-${esc(s.id)}"
                 style="--accent-series:${esc(s.accent)};--accent-soft:${esc(s.accentSoft)}">
        <span class="mini__name"><span>S${s.number}</span>${esc(s.name)}</span>
        <span class="mini__count"><b>${t.cleared}</b> / ${n}</span>
        <span class="mini__bar"><span class="bar">${barHTML(t.counts, n)}</span></span>
      </a>`;
    }).join("");

    /* --- to-do cards --- */
    $("#todos").innerHTML = (PROJECT.todos || []).map(todoHTML).join("");

    /* --- series accordions --- */
    $("#serieslist").innerHTML = PROJECT.series.map((s, i) => {
      const t = tally(s.episodes);
      const n = s.episodes.length;
      const open = i === 0;
      const head = `s-head-${esc(s.id)}`;
      const body = `s-body-${esc(s.id)}`;

      return `<section class="series" id="series-${esc(s.id)}"
                 style="--accent-series:${esc(s.accent)};--accent-soft:${esc(s.accentSoft)}">
        <button class="series__head" id="${head}" aria-expanded="${open}" aria-controls="${body}">
          <span class="series__no">Series ${s.number}</span>
          <span class="series__names">
            <span class="series__name">${esc(s.name)}${
              s.accentTBD ? '<span class="tbd">colour TBD</span>' : ""
            }</span>
            <span class="series__namear" lang="ar">${esc(s.nameAr)}</span>
          </span>
          <span class="series__stat">
            <span class="series__count"><b>${t.cleared}</b><span class="series__of"> / ${n}</span></span>
            <span class="series__statlbl">Approved</span>
          </span>
          <span class="series__chev">${ICON.chev}</span>
          <span class="series__barwrap"><span class="bar">${barHTML(t.counts, n)}</span></span>
        </button>

        <div class="series__body" id="${body}" data-open="${open}" role="region" aria-labelledby="${head}">
          <div class="series__bodyin">
            <div class="scroll-x">
              <table class="tbl">
                <thead><tr>
                  <th scope="col">Ep</th>
                  <th scope="col">Episode</th>
                  <th scope="col">Status</th>
                  <th scope="col">${PROJECT.reviewers.map(esc).join(" · ")}</th>
                </tr></thead>
                <tbody>${s.episodes.map(rowHTML).join("")}</tbody>
              </table>
            </div>
            <div class="ecards">${s.episodes.map(cardHTML).join("")}</div>
          </div>
        </div>
      </section>`;
    }).join("");

    wireUp();
    animateBars();
  }

  /* ------------------------------------------------------------- wiring -- */

  function wireUp() {
    /* accordion toggles */
    document.querySelectorAll(".series__head").forEach(btn => {
      btn.addEventListener("click", () => {
        const body = document.getElementById(btn.getAttribute("aria-controls"));
        const open = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", String(!open));
        body.dataset.open = String(!open);
      });
    });

    /* whole row / card is clickable when it has a link — but never hijack a
       real click on the chip itself, or a text selection. */
    document.querySelectorAll(".is-linked[data-href]").forEach(el => {
      el.addEventListener("click", e => {
        if (e.target.closest("a")) return;
        if (String(window.getSelection())) return;
        window.open(el.dataset.href, "_blank", "noopener,noreferrer");
      });
    });

    /* list / cards toggle — one switch, all three series */
    wireViewToggle();

    /* jumping from a mini card must also open that series */
    document.querySelectorAll(".mini").forEach(a => {
      a.addEventListener("click", () => {
        const target = document.querySelector(a.getAttribute("href"));
        if (!target) return;
        const btn = target.querySelector(".series__head");
        const body = target.querySelector(".series__body");
        btn.setAttribute("aria-expanded", "true");
        body.dataset.open = "true";
      });
    });
  }

  /* --------------------------------------------------- list / cards view -- */

  const VIEW_KEY = "epView";
  const VIEWS = ["cards", "list"];
  const VIEW_DEFAULT = "cards";   /* cards is the main view; list is the opt-in */

  /* localStorage throws in a few environments (file:// with storage blocked,
     private modes, the jsdom harness) — never let it take the page down. */
  function storedView() {
    try {
      const v = window.localStorage.getItem(VIEW_KEY);
      return VIEWS.indexOf(v) > -1 ? v : VIEW_DEFAULT;
    } catch (e) {
      return VIEW_DEFAULT;
    }
  }

  function setView(view, persist) {
    const list = $("#serieslist");
    if (!list) return;
    list.dataset.view = view;
    document.querySelectorAll("#viewToggle button").forEach(btn => {
      btn.setAttribute("aria-pressed", String(btn.dataset.view === view));
    });
    if (!persist) return;
    try { window.localStorage.setItem(VIEW_KEY, view); } catch (e) { /* fine */ }
  }

  function wireViewToggle() {
    document.querySelectorAll("#viewToggle button").forEach(btn => {
      btn.addEventListener("click", () => setView(btn.dataset.view, true));
    });
    setView(storedView(), false);
  }

  /* Bars are rendered at width 0 and filled on the next frame so the CSS
     transition actually runs on first paint. */
  function animateBars() {
    requestAnimationFrame(() => requestAnimationFrame(() => {
      document.querySelectorAll(".bar span[data-w]").forEach(seg => {
        seg.style.width = seg.dataset.w + "%";
      });
    }));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
