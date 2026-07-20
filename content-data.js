/**
 * Approved homepage proof content.
 *
 * Both homepage sections are fail-closed: they remain hidden unless a record
 * contains every required field and its explicit approval flags are true.
 * Keep this file empty until Dan supplies source material and publication
 * approval. Do not use draft copy, inferred results, or unverified media.
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
});
