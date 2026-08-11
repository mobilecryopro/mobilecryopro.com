/**
 * Approval-gated homepage proof content.
 *
 * Production-ready records remain separate from sandbox-only case studies.
 * Sandbox records are never treated as production publication approval.
 */
window.mobileCryoContent = Object.freeze({
  googleBusinessProfileUrl: "",
  googleReviews: Object.freeze([]),
  beforeAfterCases: Object.freeze([]),
  sandboxBeforeAfterCases: Object.freeze([
    Object.freeze({
      approvedForSandbox: true,
      title: "Neck skin-tightening",
      service: "Facial & neck",
      sessions: "1 session",
      timeframe: "",
      layoutClass: "before-after-card-square",
      caption: "A focused comparison of the neck and jawline.",
      disclaimer: "Manufacturer-provided case-study imagery. Individual results vary.",
      pairs: Object.freeze([
        Object.freeze({
          title: "",
          before: Object.freeze({
            imageUrl: "/sandbox/assets/gallery/homepage-neck-skin-tightening-before.webp",
            alt: "Neck and jawline before skin-tightening cryotherapy",
            label: "Before",
            caption: "",
            width: 1000,
            height: 1000,
          }),
          after: Object.freeze({
            imageUrl: "/sandbox/assets/gallery/homepage-neck-skin-tightening-after.webp",
            alt: "Neck and jawline after skin-tightening cryotherapy",
            label: "After",
            caption: "",
            width: 1000,
            height: 1000,
          }),
        }),
      ]),
    }),
    Object.freeze({
      approvedForSandbox: true,
      title: "Abdominal contouring",
      service: "Body sculpting",
      sessions: "3 sessions",
      timeframe: "",
      layoutClass: "before-after-card-square",
      caption: "A side-profile comparison from a three-session body-sculpting series.",
      disclaimer: "Manufacturer-provided case-study imagery. Individual results vary.",
      pairs: Object.freeze([
        Object.freeze({
          title: "",
          before: Object.freeze({
            imageUrl: "/sandbox/assets/gallery/homepage-abdominal-contouring-before.webp",
            alt: "Abdomen before a three-session body-sculpting series",
            label: "Before",
            caption: "",
            width: 1000,
            height: 1000,
          }),
          after: Object.freeze({
            imageUrl: "/sandbox/assets/gallery/homepage-abdominal-contouring-after.webp",
            alt: "Abdomen after a three-session body-sculpting series",
            label: "After",
            caption: "",
            width: 1000,
            height: 1000,
          }),
        }),
      ]),
    }),
  ]),
});
