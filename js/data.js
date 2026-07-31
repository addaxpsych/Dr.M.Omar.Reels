/* ============================================================================
   Dr. M. Omar Reels — PROJECT DATA
   ----------------------------------------------------------------------------
   THIS IS THE ONLY FILE YOU EDIT DAILY.

   To update the site:
     1. Change a `status`, tick a `reviews` flag, or add a `link`
     2. Add a new block at the TOP of `updates`
     3. Change `lastUpdated` to today
     4. Commit + push. Cloudflare rebuilds in ~30 seconds.

   Every number on the dashboard is COUNTED FROM THIS FILE.
   Never hand-edit a total anywhere else — there is nowhere else to edit it.

   STATUS must be exactly one of:
     "not-started"  hasn't started
     "in-review"    sent for review, waiting on Hajar / Hossam
     "revisions"    working on revisions
     "approved"     signed off  ->  row shows "READY TO PUBLISH"
     "published"    live        ->  row shows "PUBLISHED"

   REVIEWS: true = checked, false = unchecked. Display only.
   ========================================================================== */

const PROJECT = {

  /* Shown in the header. Change this every time you push. */
  lastUpdated: "2026-08-01",

  /* Order here = order of the checkbox columns in every table. */
  reviewers: ["Hajar", "Hossam"],

  /* --------------------------------------------------------------------------
     DAILY UPDATES  —  newest block FIRST. The top block is highlighted.
     `owner` is optional; leave it null for a general note.
     ------------------------------------------------------------------------ */
  updates: [
    {
      date: "2026-08-01",
      items: [
        {
          owner: "Hossam",
          text: "Please review Series 2 (IOL), Episodes 7 to 14, before sending the revisions to Alaa, the video editor."
        }
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
      accentSoft: "#F5EBDD",  // soft wash behind the series badge
      total: 25,
      episodes: [
        { n: "intro", title: "أسرار تصحيح الإبصار — تبسيط علمي لقرار مهم", link: null, status: "published", reviews: { Hajar: true, Hossam: true } },
        { n: 1,  title: "مش كل عمليات تصحيح النظر بالليزر واحد", link: "https://drive.google.com/file/d/1IEd_IV51sA-CH_BdtXWUBUlDyoWpIjxO/view?usp=drive_link", status: "published", reviews: { Hajar: true, Hossam: true } },
        { n: 2,  title: "إزاي تاخد أفضل رؤية من عملية الليزر؟", link: "https://drive.google.com/file/d/1YeNO0WZctCXnBcnfFY1My2lGCZ4MCCMG/view?usp=drive_link", status: "published", reviews: { Hajar: true, Hossam: true } },
        { n: 3,  title: "هل الليزر آمن فعلاً؟ وفيه مخاطرة؟", link: "https://drive.google.com/file/d/1p9ozLNe-D_j8Bz-2MRdzReWJrIdD0m94/view?usp=drive_link", status: "published", reviews: { Hajar: true, Hossam: true } },
        { n: 4,  title: "الليزر بيصلح النظر إزاي؟", link: null, status: "revisions", reviews: { Hajar: true, Hossam: true } },
        { n: 5,  title: "هل كل مقاسات النظر اللي زي بعضها بيناسبها نفس عملية التصحيح؟", link: "https://f.io/dY_V6g1f", status: "revisions", reviews: { Hajar: true, Hossam: true } },
        { n: 6,  title: "ليه الفيمتو ليزك أفضل من الليزك؟", link: "https://f.io/AjJKfp-U", status: "revisions", reviews: { Hajar: true, Hossam: true } },
        { n: 7,  title: "فيمتو سمايل… الحقيقة الكاملة", link: "https://f.io/TCVAa6Er", status: "in-review", reviews: { Hajar: false, Hossam: false } },
        { n: 8,  title: "فيمتو سمايل برو… مش تطوير، دي ثورة", link: "https://f.io/cVeSSjU7", status: "in-review", reviews: { Hajar: false, Hossam: false } },
        { n: 9,  title: "تصحيح النظر بالليزر من غير ما نلمس العين | Trans PRK", link: null, status: "not-started", reviews: { Hajar: false, Hossam: false } },
        { n: 10, title: "PRK vs LASIK… الحقيقة اللي محدش بيقولها", link: null, status: "not-started", reviews: { Hajar: false, Hossam: false } },
        { n: 11, title: "أعمل فيمتو سمايل ولا فيمتو ليزك؟ الفرق الحقيقي", link: null, status: "not-started", reviews: { Hajar: false, Hossam: false } },
        { n: 12, title: "الأمان في عمليات الليزر… مين أأمن عملية؟", link: null, status: "not-started", reviews: { Hajar: false, Hossam: false } },
        { n: 13, title: "كفاءة الرؤية بعد الليزك… السر في الـ Laser Profile", link: null, status: "not-started", reviews: { Hajar: false, Hossam: false } },
        { n: 14, title: "الليزر التفصيلي ببصمة العين | Customized vs Standard", link: null, status: "not-started", reviews: { Hajar: false, Hossam: false } },
        { n: 15, title: "هل كل أجهزة الليزر زي بعض؟ ولا الفرق كبير", link: null, status: "not-started", reviews: { Hajar: false, Hossam: false } },
        { n: 16, title: "هل كل أجهزة الفيمتوليزر زي بعض؟ وليه بنسمع أسعار متفاوتة؟", link: null, status: "not-started", reviews: { Hajar: false, Hossam: false } },
        { n: 17, title: "هل كل الناس ينفع تعمل ليزر؟", link: null, status: "not-started", reviews: { Hajar: false, Hossam: false } },
        { n: 18, title: "لو بتفكر تعمل ليزر… اوعى تعمل الأخطاء دي", link: null, status: "not-started", reviews: { Hajar: false, Hossam: false } },
        { n: 19, title: "هل نتيجة عمليات الليزر لتصحيح النظر مضمونة؟", link: null, status: "not-started", reviews: { Hajar: false, Hossam: false } },
        { n: 20, title: "مضاعفات عمليات الليزر… الحقيقة بدون تهويل", link: null, status: "not-started", reviews: { Hajar: false, Hossam: false } },
        { n: 21, title: "أهم قرار قبل عملية الليزر لتصحيح النظر… اختيار الدكتور", link: null, status: "not-started", reviews: { Hajar: false, Hossam: false } },
        { n: 22, title: "سعر عملية الليزك وتكلفة الفيمتو ليزك في مصر", link: null, status: "not-started", reviews: { Hajar: false, Hossam: false } },
        { n: 23, title: "سوبر ليزك؟ HD ليزك؟ ألترا ليزك… الحقيقة ورا الأسماء", link: null, status: "not-started", reviews: { Hajar: false, Hossam: false } },
        { n: 24, title: "ليه ناس كتير بتسافر مصر تعمل ليزر لتصحيح النظر؟", link: null, status: "not-started", reviews: { Hajar: false, Hossam: false } }
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
      accentSoft: "#E4EDFB",  // soft wash behind the series badge
      total: 15,
      episodes: [
        { n: "intro", title: "العدسات داخل العين — تبسيط علمي لقرار مهم", link: null, status: "published", reviews: { Hajar: true, Hossam: true } },
        { n: 1,  title: "إيه هي العدسات اللي بنزرعها داخل العين؟", link: null, status: "approved", reviews: { Hajar: true, Hossam: true } },
        { n: 2,  title: "أنواع العدسات داخل العين", link: null, status: "approved", reviews: { Hajar: true, Hossam: true } },
        { n: 3,  title: "العدسة العادية ولا العدسة المتقدمة؟ القرار مش بسيط", link: null, status: "approved", reviews: { Hajar: true, Hossam: true } },
        { n: 4,  title: "العدسة الترايفوكال أم العدسة ممتدة المجال؟ الحقيقة العلمية وراء الاختيار", link: "https://f.io/Ggs9JQoa", status: "in-review", reviews: { Hajar: true, Hossam: true } },
        { n: 5,  title: "هل في عدسة أفضل فعلاً؟", link: "https://f.io/6uztHD0q", status: "in-review", reviews: { Hajar: true, Hossam: true } },
        { n: 6,  title: "إزاي تختار العدسة المناسبة ليك؟", link: "https://f.io/itPJNpsP", status: "in-review", reviews: { Hajar: true, Hossam: true } },
        { n: 7,  title: "إزاي تستغنى عن النظارة بزراعة العدسات؟", link: "https://f.io/5K457md6", status: "revisions", reviews: { Hajar: true, Hossam: false } },
        { n: 8,  title: "أشهر الأخطاء عند اختيار عدسات العين", link: "https://f.io/L72d8z1g", status: "revisions", reviews: { Hajar: true, Hossam: false } },
        { n: 9,  title: "هل العدسة الأمريكية هي الأفضل فعلاً؟", link: "https://f.io/wmc9i0Wu", status: "revisions", reviews: { Hajar: true, Hossam: false } },
        { n: 10, title: "هل ينفع أزرع عدسة من غير ما أشيل عدسة العين؟ (ICL)", link: "https://f.io/6P44-nPo", status: "revisions", reviews: { Hajar: true, Hossam: false } },
        { n: 11, title: "هل ينفع نعمل زراعة عدسات مع الليزر؟ (Bioptics)", link: "https://f.io/edLllE2E", status: "revisions", reviews: { Hajar: true, Hossam: false } },
        { n: 12, title: "في زراعة العدسات… كل التفاصيل بتفرق", link: "https://f.io/MQLMKoph", status: "revisions", reviews: { Hajar: true, Hossam: false } },
        { n: 13, title: "بعد زراعة العدسات… هل ممكن النظر يضعف تاني؟", link: "https://f.io/7GstIi8Y", status: "revisions", reviews: { Hajar: true, Hossam: false } },
        { n: 14, title: "الخلاصة… إزاي تختار صح؟", link: "https://f.io/TDPy1csj", status: "revisions", reviews: { Hajar: true, Hossam: false } }
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
      accent: "#6E6E73",
      accentSoft: "#EFEFF1",
      accentTBD: true,
      total: 10,
      episodes: [
        { n: "intro", title: "Vision Stories — حكاوي بنشوفها بعين د. محمد عمر يوسف", link: null, status: "not-started", reviews: { Hajar: false, Hossam: false } },
        { n: 1, title: "قرار بسيط… خلّى عملية سهلة تتحول لزراعة قرنية", link: null, status: "not-started", reviews: { Hajar: false, Hossam: false } },
        { n: 2, title: "لما الإعلان يسبق الخبرة… المريض هو اللي يدفع الثمن", link: "https://f.io/mTk6uh0s", status: "in-review", reviews: { Hajar: false, Hossam: false } },
        { n: 3, title: "أخطر قرار… إزاي تختار أفضل دكتور عيون من الإنترنت؟", link: null, status: "not-started", reviews: { Hajar: false, Hossam: false } },
        { n: 4, title: "ليه سعر الفيمتوليزك بيختلف؟ الإجابة مش اللي في بالك", link: null, status: "not-started", reviews: { Hajar: false, Hossam: false } },
        { n: 5, title: "أهم 5 أسئلة قبل عملية الفيمتوليزك… الفرق بين نتيجة ممتازة ونتيجة عادية", link: null, status: "not-started", reviews: { Hajar: false, Hossam: false } },
        { n: 6, title: "ICL مش نوع واحد… الفرق اللي محدش بيقوله لك", link: null, status: "not-started", reviews: { Hajar: false, Hossam: false } },
        { n: 7, title: "إيه أفضل عدسة ترايفوكال؟ الإجابة اللي ناس كتير مش عايزة تسمعها", link: null, status: "not-started", reviews: { Hajar: false, Hossam: false } },
        { n: 8, title: "الفرق بين العدسات ثلاثية البؤر (Trifocal) والعدسات ممتدة المجال (EDOF)… ومين فيهم أفضل؟", link: null, status: "not-started", reviews: { Hajar: false, Hossam: false } },
        { n: 9, title: "سعر عدسة EDOF كام؟ قبل ما تسأل لازم تفهم الفرق ده", link: null, status: "not-started", reviews: { Hajar: false, Hossam: false } }
      ]
    }
  ]
};

/* --------------------------------------------------------------------------
   Status metadata. Order here = order of the segments in every progress bar,
   left (done) to right (not done). You should not need to touch this.
   ------------------------------------------------------------------------ */
const STATUS_META = {
  "published":   { label: "Published",           short: "Published",   cleared: true  },
  "approved":    { label: "Ready to publish",    short: "Approved",    cleared: true  },
  "revisions":   { label: "Working on revisions", short: "Revisions",  cleared: false },
  "in-review":   { label: "In review",           short: "In review",   cleared: false },
  "not-started": { label: "Hasn't started",      short: "Not started", cleared: false }
};

/* Bar segment order, most-complete first. */
const STATUS_ORDER = ["published", "approved", "revisions", "in-review", "not-started"];
