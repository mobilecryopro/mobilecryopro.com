(() => {
  const offerEnd = Date.parse("2026-12-09T00:00:00-08:00");
  const offerIsActive = Date.now() < offerEnd;
  const contactForm = document.querySelector("#contact-form");

  document.querySelectorAll("[data-offer-active]").forEach((element) => {
    element.hidden = !offerIsActive;
  });
  document.querySelector("[data-offer-ended]").hidden = offerIsActive;

  if (!offerIsActive || !contactForm) return;

  contactForm.dataset.formSubject = "Mobile Cryo Pro — FIRST20 first-visit offer";

  const offerFields = {
    offer_code: "FIRST20",
    offer_service: "First localized cryotherapy session, one area",
    offer_service_price: "$50, regularly $70; any travel fee quoted separately",
    offer_booking_dates: "November 9–December 8, 2026, Pacific time",
  };

  Object.entries(offerFields).forEach(([name, value]) => {
    const field = document.createElement("input");
    field.type = "hidden";
    field.name = name;
    field.value = value;
    contactForm.append(field);
  });
})();
