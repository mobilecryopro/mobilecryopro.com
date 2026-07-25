/**
 * Approved homepage proof content.
 *
 * Both homepage sections are fail-closed. Production-ready records require
 * explicit website and consent approval. Sandbox-only records require their
 * own review flag and are never treated as production approval.
 * Do not use draft copy, inferred results, or unverified media.
 *
 * Google review record fields:
 * approved, reviewerName, rating, reviewText, reviewDate, sourceUrl.
 * Optional: reviewerInitial, localGuideLabel, dateTime.
 *
 * Before/after record fields:
 * approvedForWebsite, consentConfirmed, title, service, sessions, timeframe,
 * caption, disclaimer, before: { imageUrl, alt, label, caption },
 * after: { imageUrl, alt, label, caption }.
 */
window.mobileCryoContent = Object.freeze({
  // Required before any approved Google reviews can be published.
  googleBusinessProfileUrl: "",
  googleReviews: Object.freeze([]),
  beforeAfterCases: Object.freeze([]),
  sandboxBeforeAfterCases: Object.freeze([
    Object.freeze({
      approvedForSandbox: true,
      title: "Abdominal CryoSkin treatment",
      service: "CryoSkin",
      sessions: "",
      timeframe: "Photos taken on consecutive days",
      caption: "",
      disclaimer: "Individual experiences vary. Measurements and treatment/session details were not provided.",
      before: Object.freeze({
        imageUrl: "assets/before-after/cryoskin-before.jpeg",
        alt: "Front view of a client's abdomen before a CryoSkin treatment",
        label: "Before",
        caption: "",
      }),
      after: Object.freeze({
        imageUrl: "assets/before-after/cryoskin-after.jpeg",
        alt: "Front view of a client's abdomen after a CryoSkin treatment",
        label: "After",
        caption: "",
      }),
    }),
    Object.freeze({
      approvedForSandbox: true,
      title: "Knee treatment",
      service: "Knee",
      sessions: "",
      timeframe: "Photos taken minutes apart",
      caption: "",
      disclaimer: "Individual experiences vary. Measurements and treatment/session details were not provided.",
      before: Object.freeze({
        imageUrl: "assets/before-after/knee-before.jpeg",
        alt: "Close view of a client's knee before treatment",
        label: "Before",
        caption: "",
      }),
      after: Object.freeze({
        imageUrl: "assets/before-after/knee-after.jpeg",
        alt: "Close view of a client's knee after treatment",
        label: "After",
        caption: "",
      }),
    }),
  ]),
});
