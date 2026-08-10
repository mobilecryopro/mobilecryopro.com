/**
 * Approved homepage proof content.
 *
 * Both homepage sections are fail-closed. Production-ready records require
 * explicit website and consent approval. Sandbox-only records require their
 * own review flag and are never treated as production placement approval.
 * Do not use draft copy, inferred results, or unverified media.
 *
 * Google review record fields:
 * approved, reviewerName, rating, reviewText, reviewDate, sourceUrl.
 * Optional: reviewerInitial, localGuideLabel, dateTime.
 *
 * Before/after record fields:
 * approvedForWebsite, consentConfirmed, title, service, sessions, timeframe,
 * caption, disclaimer, pairs: [{ title, before, after }].
 * A legacy top-level before/after pair remains supported.
 */
window.mobileCryoContent = Object.freeze({
  // Required before any approved Google reviews can be published.
  googleBusinessProfileUrl: "",
  googleReviews: Object.freeze([]),
  beforeAfterCases: Object.freeze([]),
  sandboxBeforeAfterCases: Object.freeze([
    Object.freeze({
      approvedForSandbox: true,
      title: "Abdominal body-contouring photos",
      service: "Body contouring",
      sessions: "",
      timeframe: "Photos supplied on consecutive days",
      caption: "Client photo set supplied by Mobile Cryo Pro.",
      disclaimer: "Individual experiences vary. Measurements and treatment/session details were not provided. Photo positioning and conditions differ.",
      pairs: Object.freeze([
        Object.freeze({
          title: "Front view",
          before: Object.freeze({
            imageUrl: "assets/before-after/astra-body-contouring-before.webp",
            alt: "Front view of a client's abdomen before body contouring",
            label: "Before",
            caption: "",
          }),
          after: Object.freeze({
            imageUrl: "assets/before-after/astra-body-contouring-after.webp",
            alt: "Front view of the same client's abdomen after body contouring",
            label: "After",
            caption: "",
          }),
        }),
      ]),
    }),
    Object.freeze({
      approvedForSandbox: true,
      title: "Body-contouring photos: front and back",
      service: "Body contouring",
      sessions: "",
      timeframe: "",
      caption: "Front and back views from one client photo set.",
      disclaimer: "Individual experiences vary. Measurements, session count, and treatment details were not provided. Photos were taken on different days and under different conditions.",
      pairs: Object.freeze([
        Object.freeze({
          title: "Front view",
          before: Object.freeze({
            imageUrl: "assets/before-after/body-contouring-front-before.webp",
            alt: "Front torso view before body contouring",
            label: "Before",
            caption: "",
          }),
          after: Object.freeze({
            imageUrl: "assets/before-after/body-contouring-front-after.webp",
            alt: "Front torso view from the same body-contouring photo set",
            label: "After",
            caption: "",
          }),
        }),
        Object.freeze({
          title: "Back view",
          before: Object.freeze({
            imageUrl: "assets/before-after/body-contouring-back-before.webp",
            alt: "Back torso view before body contouring",
            label: "Before",
            caption: "",
          }),
          after: Object.freeze({
            imageUrl: "assets/before-after/body-contouring-back-after.webp",
            alt: "Back torso view from the same body-contouring photo set",
            label: "After",
            caption: "",
          }),
        }),
      ]),
    }),
    Object.freeze({
      approvedForSandbox: true,
      title: "One-session abdominal source pair",
      service: "Body contouring",
      sessions: "1 session (source filename)",
      timeframe: "Not provided",
      caption: "Manufacturer-library source pair supplied through Dan for placement review.",
      disclaimer: "Sandbox review only. Left/right order follows the conventional source layout but still needs confirmation. Photograph distance, pose, lighting, and conditions differ. Individual results vary.",
      pairs: Object.freeze([
        Object.freeze({
          title: "Working review order",
          before: Object.freeze({
            imageUrl: "/sandbox/assets/gallery/body-contouring-one-session-before.webp",
            alt: "Left source panel showing an adult's abdomen and shorts",
            label: "Left panel",
            caption: "Working before label; confirm before publication.",
          }),
          after: Object.freeze({
            imageUrl: "/sandbox/assets/gallery/body-contouring-one-session-after.webp",
            alt: "Right source panel showing the same adult's abdomen and shorts",
            label: "Right panel",
            caption: "Working after label; confirm before publication.",
          }),
        }),
      ]),
    }),
    Object.freeze({
      approvedForSandbox: true,
      title: "Neck skin-tightening source pair",
      service: "Facial and neck services",
      sessions: "1 session (source graphic)",
      timeframe: "Not provided",
      caption: "Manufacturer-library comparison supplied through Dan for placement review.",
      disclaimer: "The original source explicitly labels these before and after. Treatment protocol, timing, measurements, and typicality were not independently verified. Individual results vary.",
      pairs: Object.freeze([
        Object.freeze({
          title: "Neck view",
          before: Object.freeze({
            imageUrl: "/sandbox/assets/gallery/neck-skin-tightening-before.webp",
            alt: "Lower face and neck in the source image labeled before",
            label: "Before",
            caption: "",
          }),
          after: Object.freeze({
            imageUrl: "/sandbox/assets/gallery/neck-skin-tightening-after.webp",
            alt: "Lower face and neck in the source image labeled after",
            label: "After",
            caption: "",
          }),
        }),
      ]),
    }),
  ]),
});
