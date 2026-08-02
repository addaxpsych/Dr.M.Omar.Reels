/* ============================================================================
   Dr. M. Omar Reels — PROJECT DATA
   ----------------------------------------------------------------------------
   THIS IS THE ONLY FILE YOU EDIT DAILY.

   To update the site:
     1. Change a `status`, record a verdict, add a version, or add a `link`
     2. Move or delete episode numbers in `todos` so each person's card is right
     3. Change `lastUpdated` to today
     4. Commit + push. Cloudflare rebuilds in ~30 seconds.

   Every number on the dashboard is COUNTED FROM THIS FILE.
   Never hand-edit a total anywhere else — there is nowhere else to edit it.

   STATUS (the episode as a whole) must be exactly one of:
     "not-started"  hasn't started
     "in-review"    sent for review, waiting on Hajar / Hossam
     "revisions"    working on revisions
     "approved"     signed off  ->  row shows "READY TO PUBLISH"
     "published"    live        ->  row shows "PUBLISHED"

   VERSIONS — each episode carries a list of cuts, oldest first.
     { v: 1, reviews: { Hajar: "approved", Hossam: "pending" } }

     `v` is a number, rendered as V0 / V1 / V2 …
     Each reviewer's verdict must be exactly one of:
       "pending"    hasn't looked at this cut yet
       "approved"   signed this cut off
       "revisions"  asked for changes on this cut

     To send a new cut for review, APPEND a version — never overwrite the old
     one. The history is the point.

     Episodes that haven't started have `versions: []` — nothing was cut yet.

   The `link` sits on the EPISODE, not the version: every version of an episode
   shares the same review link.
   ========================================================================== */

const PROJECT = {

  /* Shown at the top of the dashboard. Change this every time you push. */
  lastUpdated: "2026-08-02",

  /* Order here = order the verdicts are listed on every version row. */
  reviewers: ["Hajar", "Hossam"],

  /* --------------------------------------------------------------------------
     TO-DO  —  one card per person, shown side by side at the top of the page.

     Each entry in `eps` becomes a clickable button on that person's card. The
     button's link, Arabic title and status dot are looked up from the `series`
     data below — you never repeat them here, so a card can never disagree with
     the episode tables. An episode with no `link` yet renders as a dashed,
     non-clickable chip.

       person   the name on the card
       role     the small grey line under it
       tone     card colour: lavender | mint | rose | peach | butter | sky
                (these are CSS classes — see `.todo--*` in css/style.css)
       note     OPTIONAL pinned message at the top of that person's card:
                  { text: "...", series: 1, ep: 6 }
                The chip after the sentence is looked up like any other chip,
                so its link and status stay correct on their own. Only `text`
                is hand-written — if you name a version in it ("V3"), you are
                the one keeping that in step. Delete the whole `note` when the
                message no longer applies. Its episode counts toward "N to do",
                so do NOT also list it under `tasks`.
       tasks    one group per line of work:
                  label   what to do, e.g. "Review" / "Revisions" / "Remake"
                  series  the series NUMBER (1, 2, 3), not its id
                  eps     the episode numbers, as numbers

     To hand a task over, move the number from one person's `eps` to another's.
     To clear a finished task, delete the number. The "N to do" count on each
     card is counted from this list — there is no total to keep in sync.
     ------------------------------------------------------------------------ */
  todos: [
    {
      person: "Hajar",
      role: "Reviewer",
      tone: "lavender",
      note: {
        text: "Hello Hajar — kindly check Ep 6 V3 in Series 1 for approval:",
        series: 1,
        ep: 6
      },
      tasks: [
        { label: "Review", series: 1, eps: [7, 8, 10, 11, 12, 13, 14] },
        { label: "Review", series: 2, eps: [12, 13, 14] },
        { label: "Review", series: 3, eps: [2] }
      ]
    },
    {
      person: "Hossam",
      role: "Reviewer",
      tone: "mint",
      tasks: [
        { label: "Review", series: 1, eps: [4, 5, 6, 7, 8, 10, 11, 12, 13, 14] },
        { label: "Review", series: 2, eps: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] }
      ]
    },
    {
      person: "Abdo",
      role: "Video editor",
      tone: "rose",
      tasks: [
        { label: "Remake", series: 1, eps: [7, 8, 9, 10, 11, 12, 13, 14] }
      ]
    },
    {
      person: "Alaa",
      role: "Video editor",
      tone: "butter",
      tasks: [
        { label: "Revisions", series: 2, eps: [7, 8, 9, 10, 11, 12, 13, 14] }
      ]
    }
  ],

  /* --------------------------------------------------------------------------
     SERIES
     ------------------------------------------------------------------------ */
  series: [

    /* ======================= SERIES 1 — REFRACTIVE ======================== */
    {
      id: "refractive",
      number: 1,
      name: "Refractive",
      nameAr: "أسرار تصحيح الإبصار",
      tagline: "Laser Vision Secrets",
      accent: "#8F5714",      // copper, dark enough for 11px text on white (AA)
      accentSoft: "#FEDBBF",  // peach wash — the series head, minis and cards
                              // (copper on it is 4.6:1, measured)
      total: 26,
      episodes: [
        { n: "intro", title: "أسرار تصحيح الإبصار — تبسيط علمي لقرار مهم", link: null, status: "published",
          versions: [ { v: 1, reviews: { Hajar: "approved", Hossam: "approved" } } ] },
        { n: 1, title: "مش كل عمليات تصحيح النظر بالليزر واحد", link: "https://drive.google.com/file/d/1IEd_IV51sA-CH_BdtXWUBUlDyoWpIjxO/view?usp=drive_link", status: "published",
          versions: [ { v: 1, reviews: { Hajar: "approved", Hossam: "approved" } } ] },
        { n: 2, title: "إزاي تاخد أفضل رؤية من عملية الليزر؟", link: "https://drive.google.com/file/d/1YeNO0WZctCXnBcnfFY1My2lGCZ4MCCMG/view?usp=drive_link", status: "published",
          versions: [ { v: 1, reviews: { Hajar: "approved", Hossam: "approved" } } ] },
        { n: 3, title: "هل الليزر آمن فعلاً؟ وفيه مخاطرة؟", link: "https://drive.google.com/file/d/1p9ozLNe-D_j8Bz-2MRdzReWJrIdD0m94/view?usp=drive_link", status: "published",
          versions: [ { v: 1, reviews: { Hajar: "approved", Hossam: "approved" } } ] },
        { n: 4, title: "الليزر بيصلح النظر إزاي؟", link: "https://f.io/UXNc-lOb", status: "in-review",
          versions: [ { v: 1, reviews: { Hajar: "revisions", Hossam: "revisions" } },
                      { v: 2, reviews: { Hajar: "approved", Hossam: "pending" } } ] },
        { n: 5, title: "هل كل مقاسات النظر اللي زي بعضها بيناسبها نفس عملية التصحيح؟", link: "https://f.io/dY_V6g1f", status: "in-review",
          versions: [ { v: 1, reviews: { Hajar: "revisions", Hossam: "revisions" } },
                      { v: 2, reviews: { Hajar: "revisions", Hossam: "pending" } },
                      { v: 3, reviews: { Hajar: "approved", Hossam: "pending" } } ] },
        { n: 6, title: "ليه الفيمتو ليزك أفضل من الليزك؟", link: "https://f.io/AjJKfp-U", status: "in-review",
          versions: [ { v: 1, reviews: { Hajar: "revisions", Hossam: "revisions" } },
                      { v: 2, reviews: { Hajar: "pending", Hossam: "pending" } },
                      { v: 3, reviews: { Hajar: "pending", Hossam: "pending" } } ] },
        { n: 7, title: "فيمتو سمايل… الحقيقة الكاملة", link: "https://f.io/Y3rKi3aJ", status: "in-review",
          versions: [ { v: 0, reviews: { Hajar: "pending", Hossam: "pending" } } ] },
        { n: 8, title: "فيمتو سمايل برو… مش تطوير، دي ثورة", link: "https://f.io/cVeSSjU7", status: "in-review",
          versions: [ { v: 0, reviews: { Hajar: "pending", Hossam: "pending" } } ] },
        { n: 9,  title: "تصحيح النظر بالليزر من غير ما نلمس العين | Trans PRK", link: null, status: "not-started", versions: [] },
        { n: 10, title: "PRK vs LASIK… الحقيقة اللي محدش بيقولها", link: "https://f.io/Es98Ggut", status: "in-review",
          versions: [ { v: 0, reviews: { Hajar: "pending", Hossam: "pending" } } ] },
        { n: 11, title: "أعمل فيمتو سمايل ولا فيمتو ليزك؟ الفرق الحقيقي", link: "https://f.io/JL1xSn5z", status: "in-review",
          versions: [ { v: 0, reviews: { Hajar: "pending", Hossam: "pending" } } ] },
        { n: 12, title: "الأمان في عمليات الليزر… مين أأمن عملية؟", link: "https://f.io/hsMS_b-v", status: "in-review",
          versions: [ { v: 0, reviews: { Hajar: "pending", Hossam: "pending" } } ] },
        { n: 13, title: "كفاءة الرؤية بعد الليزك… السر في الـ Laser Profile", link: "https://f.io/WgFOUjwA", status: "in-review",
          versions: [ { v: 0, reviews: { Hajar: "pending", Hossam: "pending" } } ] },
        { n: 14, title: "الليزر التفصيلي ببصمة العين | Customized vs Standard", link: "https://f.io/z5WofLTh", status: "in-review",
          versions: [ { v: 0, reviews: { Hajar: "pending", Hossam: "pending" } } ] },
        { n: 15, title: "هل كل أجهزة الليزر زي بعض؟ ولا الفرق كبير", link: null, status: "not-started", versions: [] },
        { n: 16, title: "هل كل أجهزة الفيمتوليزر زي بعض؟ وليه بنسمع أسعار متفاوتة؟", link: "https://f.io/FSxhnmnX", status: "in-review",
          versions: [ { v: 0, reviews: { Hajar: "pending", Hossam: "pending" } } ] },
        { n: 17, title: "هل كل الناس ينفع تعمل ليزر؟", link: null, status: "not-started", versions: [] },
        { n: 18, title: "لو بتفكر تعمل ليزر… اوعى تعمل الأخطاء دي", link: null, status: "not-started", versions: [] },
        { n: 19, title: "هل نتيجة عمليات الليزر لتصحيح النظر مضمونة؟", link: null, status: "not-started", versions: [] },
        { n: 20, title: "مضاعفات عمليات الليزر… الحقيقة بدون تهويل", link: null, status: "not-started", versions: [] },
        { n: 21, title: "أهم قرار قبل عملية الليزر لتصحيح النظر… اختيار الدكتور", link: null, status: "not-started", versions: [] },
        { n: 22, title: "سعر عملية الليزك وتكلفة الفيمتو ليزك في مصر", link: null, status: "not-started", versions: [] },
        { n: 23, title: "سوبر ليزك؟ HD ليزك؟ ألترا ليزك… الحقيقة ورا الأسماء", link: null, status: "not-started", versions: [] },
        { n: 24, title: "ليه ناس كتير بتسافر مصر تعمل ليزر لتصحيح النظر؟", link: null, status: "not-started", versions: [] },
        /* Ep 25 is Ep 24 again, delivered in English. A Latin title renders LTR. */
        { n: 25, title: "Why do so many people travel to Egypt for laser vision correction?", link: null, status: "not-started", versions: [] }
      ]
    },

    /* ========================== SERIES 2 — IOL ============================ */
    {
      id: "iol",
      number: 2,
      name: "IOL",
      nameAr: "سلسلة عدسات العين",
      tagline: "Inside the Eye",
      accent: "#0F48B5",      // brand blue — confirmed. Editor guide §5.3 / §15
      accentSoft: "#CCE3FF",  // sky wash — the series head, minis and cards
                              // (brand blue on it is 6.1:1, measured)
      total: 15,
      episodes: [
        { n: "intro", title: "العدسات داخل العين — تبسيط علمي لقرار مهم", link: null, status: "published",
          versions: [ { v: 1, reviews: { Hajar: "approved", Hossam: "approved" } } ] },
        { n: 1, title: "إيه هي العدسات اللي بنزرعها داخل العين؟", link: null, status: "approved",
          versions: [ { v: 1, reviews: { Hajar: "approved", Hossam: "approved" } } ] },
        { n: 2, title: "أنواع العدسات داخل العين", link: null, status: "approved",
          versions: [ { v: 1, reviews: { Hajar: "approved", Hossam: "approved" } } ] },
        { n: 3, title: "العدسة العادية ولا العدسة المتقدمة؟ القرار مش بسيط", link: null, status: "approved",
          versions: [ { v: 1, reviews: { Hajar: "approved", Hossam: "approved" } } ] },
        { n: 4, title: "العدسة الترايفوكال أم العدسة ممتدة المجال؟ الحقيقة العلمية وراء الاختيار", link: "https://f.io/Ggs9JQoa", status: "in-review",
          versions: [
            { v: 1, reviews: { Hajar: "revisions", Hossam: "revisions" } },
            { v: 2, reviews: { Hajar: "revisions", Hossam: "pending" } },
            { v: 3, reviews: { Hajar: "revisions", Hossam: "pending" } },
            { v: 4, reviews: { Hajar: "approved",  Hossam: "pending" } }
          ] },
        { n: 5, title: "هل في عدسة أفضل فعلاً؟", link: "https://f.io/6uztHD0q", status: "in-review",
          versions: [
            { v: 1, reviews: { Hajar: "revisions", Hossam: "revisions" } },
            { v: 2, reviews: { Hajar: "revisions", Hossam: "pending" } },
            { v: 3, reviews: { Hajar: "approved",  Hossam: "pending" } }
          ] },
        { n: 6, title: "إزاي تختار العدسة المناسبة ليك؟", link: "https://f.io/itPJNpsP", status: "in-review",
          versions: [
            { v: 1, reviews: { Hajar: "revisions", Hossam: "revisions" } },
            { v: 2, reviews: { Hajar: "revisions", Hossam: "pending" } },
            { v: 3, reviews: { Hajar: "revisions", Hossam: "pending" } },
            { v: 4, reviews: { Hajar: "approved",  Hossam: "pending" } }
          ] },
        { n: 7, title: "إزاي تستغنى عن النظارة بزراعة العدسات؟", link: "https://f.io/5K457md6", status: "revisions",
          versions: [ { v: 0, reviews: { Hajar: "revisions", Hossam: "pending" } } ] },
        { n: 8, title: "أشهر الأخطاء عند اختيار عدسات العين", link: "https://f.io/L72d8z1g", status: "revisions",
          versions: [ { v: 0, reviews: { Hajar: "revisions", Hossam: "pending" } } ] },
        { n: 9, title: "هل العدسة الأمريكية هي الأفضل فعلاً؟", link: "https://f.io/wmc9i0Wu", status: "revisions",
          versions: [ { v: 0, reviews: { Hajar: "revisions", Hossam: "pending" } } ] },
        { n: 10, title: "هل ينفع أزرع عدسة من غير ما أشيل عدسة العين؟ (ICL)", link: "https://f.io/6P44-nPo", status: "revisions",
          versions: [ { v: 0, reviews: { Hajar: "revisions", Hossam: "pending" } } ] },
        { n: 11, title: "هل ينفع نعمل زراعة عدسات مع الليزر؟ (Bioptics)", link: "https://f.io/edLllE2E", status: "revisions",
          versions: [ { v: 0, reviews: { Hajar: "revisions", Hossam: "pending" } } ] },
        { n: 12, title: "في زراعة العدسات… كل التفاصيل بتفرق", link: "https://f.io/MQLMKoph", status: "revisions",
          versions: [ { v: 0, reviews: { Hajar: "revisions", Hossam: "pending" } } ] },
        { n: 13, title: "بعد زراعة العدسات… هل ممكن النظر يضعف تاني؟", link: "https://f.io/7GstIi8Y", status: "revisions",
          versions: [ { v: 0, reviews: { Hajar: "revisions", Hossam: "pending" } } ] },
        { n: 14, title: "الخلاصة… إزاي تختار صح؟", link: "https://f.io/TDPy1csj", status: "revisions",
          versions: [ { v: 0, reviews: { Hajar: "revisions", Hossam: "pending" } } ] }
      ]
    },

    /* ===================== SERIES 3 — VISION STORIES ====================== */
    {
      id: "vision-stories",
      number: 3,
      name: "Vision Stories",
      nameAr: "حكاوي بنشوفها بعين د. محمد عمر يوسف",
      tagline: "Vision Stories",
      /* ⚠ TBD — placeholder identity colour. Series 3 has no reference asset yet.
         Change these two lines when the series look is decided. */
      accent: "#55555A",
      accentSoft: "#EFEFF1",
      accentTBD: true,
      /* This series has no intro reel. */
      total: 9,
      episodes: [
        { n: 1, title: "قرار بسيط… خلّى عملية سهلة تتحول لزراعة قرنية", link: null, status: "not-started", versions: [] },
        { n: 2, title: "لما الإعلان يسبق الخبرة… المريض هو اللي يدفع الثمن", link: "https://f.io/mTk6uh0s", status: "in-review",
          versions: [ { v: 0, reviews: { Hajar: "pending", Hossam: "pending" } } ] },
        { n: 3, title: "أخطر قرار… إزاي تختار أفضل دكتور عيون من الإنترنت؟", link: null, status: "not-started", versions: [] },
        { n: 4, title: "ليه سعر الفيمتوليزك بيختلف؟ الإجابة مش اللي في بالك", link: null, status: "not-started", versions: [] },
        { n: 5, title: "أهم 5 أسئلة قبل عملية الفيمتوليزك… الفرق بين نتيجة ممتازة ونتيجة عادية", link: null, status: "not-started", versions: [] },
        { n: 6, title: "ICL مش نوع واحد… الفرق اللي محدش بيقوله لك", link: null, status: "not-started", versions: [] },
        { n: 7, title: "إيه أفضل عدسة ترايفوكال؟ الإجابة اللي ناس كتير مش عايزة تسمعها", link: null, status: "not-started", versions: [] },
        { n: 8, title: "الفرق بين العدسات ثلاثية البؤر (Trifocal) والعدسات ممتدة المجال (EDOF)… ومين فيهم أفضل؟", link: null, status: "not-started", versions: [] },
        { n: 9, title: "سعر عدسة EDOF كام؟ قبل ما تسأل لازم تفهم الفرق ده", link: null, status: "not-started", versions: [] }
      ]
    }
  ]
};

/* --------------------------------------------------------------------------
   Status metadata. Order here = order of the segments in every progress bar,
   left (done) to right (not done). You should not need to touch this.
   ------------------------------------------------------------------------ */
const STATUS_META = {
  "published":   { label: "Published",            short: "Published",   cleared: true  },
  "approved":    { label: "Ready to publish",     short: "Approved",    cleared: true  },
  "revisions":   { label: "Working on revisions", short: "Revisions",   cleared: false },
  "in-review":   { label: "In review",            short: "In review",   cleared: false },
  "not-started": { label: "Hasn't started",       short: "Not started", cleared: false }
};

/* Bar segment order, most-complete first. */
const STATUS_ORDER = ["published", "approved", "revisions", "in-review", "not-started"];

/* Per-reviewer verdict on a single version. */
const VERDICT_META = {
  "approved":  { label: "approved" },
  "revisions": { label: "requested revisions" },
  "pending":   { label: "pending" }
};
