const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".site-nav a");
const heroSlider = document.querySelector("[data-slider]");
const slides = Array.from(document.querySelectorAll("[data-slide]"));
const dots = Array.from(document.querySelectorAll("[data-dot]"));
const contactForms = document.querySelectorAll("[data-contact-form]");
const formspreeEndpoint = "https://formspree.io/f/mnjeppkn";
const bookingDepositPage = "https://book.stripe.com/eVqbJ18NNgCR2ofdR63VC00";
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const homepageProofContent = window.mobileCryoContent || {};
const sandboxPreviewMode = document.documentElement.dataset.sandboxPreview === "true";

if (header) {
  const updateScrolledHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 6);
  };

  updateScrolledHeader();
  window.addEventListener("scroll", updateScrolledHeader, { passive: true });
}

if (navToggle && header) {
  navToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    header?.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

if (slides.length && dots.length) {
  let activeIndex = 0;
  let sliderTimer = null;

  const showSlide = (index) => {
    activeIndex = index;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === activeIndex);
    });

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === activeIndex);
      dot.setAttribute("aria-pressed", String(dotIndex === activeIndex));
    });
  };

  const startSlider = () => {
    if (reducedMotionQuery.matches) {
      return;
    }

    clearInterval(sliderTimer);
    sliderTimer = setInterval(() => {
      const nextIndex = (activeIndex + 1) % slides.length;
      showSlide(nextIndex);
    }, 6500);
  };

  const stopSlider = () => {
    clearInterval(sliderTimer);
    sliderTimer = null;
  };

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = Number(dot.dataset.dot);

      if (!Number.isNaN(index)) {
        showSlide(index);
        startSlider();
      }
    });
  });

  showSlide(activeIndex);
  startSlider();

  heroSlider?.addEventListener("mouseenter", stopSlider);
  heroSlider?.addEventListener("mouseleave", startSlider);
  heroSlider?.addEventListener("focusin", stopSlider);
  heroSlider?.addEventListener("focusout", (event) => {
    if (!(event.relatedTarget instanceof Node) || !heroSlider.contains(event.relatedTarget)) {
      startSlider();
    }
  });

  reducedMotionQuery.addEventListener("change", (event) => {
    if (event.matches) {
      stopSlider();
    } else {
      startSlider();
    }
  });
}

const isSecureWebUrl = (value) => {
  try {
    return new URL(value, window.location.href).protocol === "https:";
  } catch {
    return false;
  }
};

const isGoogleUrl = (value) => {
  try {
    const url = new URL(value);
    const hostname = url.hostname.toLowerCase();

    return (
      url.protocol === "https:" &&
      (hostname === "google.com" ||
        hostname.endsWith(".google.com") ||
        hostname === "goo.gl" ||
        hostname.endsWith(".goo.gl") ||
        hostname === "g.page" ||
        hostname.endsWith(".g.page"))
    );
  } catch {
    return false;
  }
};

const isApprovedImageUrl = (value) => {
  try {
    const url = new URL(value, window.location.href);
    return url.protocol === "https:" || url.origin === window.location.origin;
  } catch {
    return false;
  }
};

const googleBusinessProfileUrl = isGoogleUrl(homepageProofContent.googleBusinessProfileUrl)
  ? homepageProofContent.googleBusinessProfileUrl
  : "";

const sandboxReviewSlots = Array.from({ length: 4 }, (_, index) => ({
  previewPlaceholder: true,
  reviewerName: "Reviewer attribution pending",
  reviewText: "Approved Google review text will appear here.",
  reviewDate: "Review date pending",
  slotNumber: index + 1,
}));

const approvedGoogleReviews = sandboxPreviewMode
  ? sandboxReviewSlots
  : Array.isArray(homepageProofContent.googleReviews)
    ? homepageProofContent.googleReviews.filter((review) => {
      const rating = Number(review?.rating);

      return (
        review?.approved === true &&
        String(review?.reviewerName || "").trim() &&
        String(review?.reviewText || "").trim() &&
        Number.isInteger(rating) &&
        rating >= 1 &&
        rating <= 5 &&
        isGoogleUrl(review?.sourceUrl)
      );
      })
    : [];

const googleReviewsSection = document.querySelector("[data-google-reviews]");
const reviewCarousel = document.querySelector("[data-review-carousel]");
const reviewTrack = document.querySelector("[data-review-track]");
const reviewPreviousButton = document.querySelector("[data-review-previous]");
const reviewNextButton = document.querySelector("[data-review-next]");
const reviewStatus = document.querySelector("[data-review-status]");
const googleProfileLink = document.querySelector("[data-google-profile-link]");
const reviewCardTemplate = document.querySelector("#google-review-card-template");

if (
  approvedGoogleReviews.length &&
  (googleBusinessProfileUrl || sandboxPreviewMode) &&
  googleReviewsSection &&
  reviewCarousel &&
  reviewTrack &&
  reviewPreviousButton &&
  reviewNextButton &&
  reviewCardTemplate
) {
  const reviewCards = approvedGoogleReviews.map((review, index) => {
    const card = reviewCardTemplate.content.firstElementChild.cloneNode(true);
    const isPreviewSlot = review.previewPlaceholder === true;
    const rating = Number(review.rating);
    const reviewerName = String(review.reviewerName).trim();
    const reviewDate = String(review.reviewDate || "").trim();
    const localGuideLabel = String(review.localGuideLabel || "").trim();
    const initial = String(review.reviewerInitial || reviewerName.charAt(0)).trim();
    const ratingElement = card.querySelector("[data-review-rating]");
    const dateElement = card.querySelector("[data-review-date]");
    const localGuideElement = card.querySelector("[data-review-local-guide]");

    card.setAttribute(
      "aria-label",
      isPreviewSlot
        ? `Preview review content slot ${index + 1} of ${approvedGoogleReviews.length}`
        : `Review ${index + 1} of ${approvedGoogleReviews.length}`,
    );
    card.querySelector("[data-review-text]").textContent = String(review.reviewText).trim();
    card.querySelector("[data-reviewer-name]").textContent = reviewerName;
    card.querySelector("[data-review-initial]").textContent = isPreviewSlot
      ? String(review.slotNumber)
      : initial.slice(0, 1).toUpperCase();

    if (isPreviewSlot) {
      ratingElement.textContent = "Rating pending approval";
      ratingElement.setAttribute("aria-label", "Rating pending approval");
      card.querySelector("[data-review-source]").remove();
      card.classList.add("is-sandbox-placeholder");
    } else {
      card.querySelector("[data-review-source]").href = review.sourceUrl;
      ratingElement.textContent = "★".repeat(rating);
      ratingElement.setAttribute("aria-label", `${rating} out of 5 stars`);
    }

    if (reviewDate) {
      dateElement.textContent = reviewDate;
      if (review.dateTime) {
        dateElement.dateTime = String(review.dateTime);
      }
    } else {
      dateElement.remove();
    }

    if (localGuideLabel && !isPreviewSlot) {
      localGuideElement.textContent = localGuideLabel;
    } else {
      localGuideElement.remove();
    }

    reviewTrack.append(card);
    return card;
  });

  const scrollBehavior = () => (reducedMotionQuery.matches ? "auto" : "smooth");
  const getReviewStep = () => {
    const firstCard = reviewCards[0];
    const trackStyles = window.getComputedStyle(reviewTrack);
    const gap = Number.parseFloat(trackStyles.columnGap || trackStyles.gap) || 0;

    return firstCard.getBoundingClientRect().width + gap;
  };
  const getActiveReviewIndex = () => {
    const step = getReviewStep();
    return step ? Math.min(reviewCards.length - 1, Math.max(0, Math.round(reviewCarousel.scrollLeft / step))) : 0;
  };
  const updateReviewControls = () => {
    const maxScrollLeft = reviewCarousel.scrollWidth - reviewCarousel.clientWidth;
    const activeIndex = getActiveReviewIndex();

    reviewPreviousButton.disabled = reviewCarousel.scrollLeft <= 2;
    reviewNextButton.disabled = reviewCarousel.scrollLeft >= maxScrollLeft - 2;
    if (reviewStatus) {
      reviewStatus.textContent = `Review ${activeIndex + 1} of ${reviewCards.length}`;
    }
  };
  const showReview = (index) => {
    const safeIndex = Math.min(reviewCards.length - 1, Math.max(0, index));
    reviewCarousel.scrollTo({
      left: safeIndex * getReviewStep(),
      behavior: scrollBehavior(),
    });
  };

  reviewPreviousButton.addEventListener("click", () => showReview(getActiveReviewIndex() - 1));
  reviewNextButton.addEventListener("click", () => showReview(getActiveReviewIndex() + 1));
  reviewCarousel.addEventListener("scroll", updateReviewControls, { passive: true });
  reviewCarousel.addEventListener("keydown", (event) => {
    const keyboardActions = {
      ArrowLeft: () => showReview(getActiveReviewIndex() - 1),
      ArrowRight: () => showReview(getActiveReviewIndex() + 1),
      Home: () => showReview(0),
      End: () => showReview(reviewCards.length - 1),
    };
    const action = keyboardActions[event.key];

    if (action) {
      event.preventDefault();
      action();
    }
  });

  if ("ResizeObserver" in window) {
    new ResizeObserver(updateReviewControls).observe(reviewCarousel);
  } else {
    window.addEventListener("resize", updateReviewControls, { passive: true });
  }

  if (googleProfileLink && googleBusinessProfileUrl) {
    googleProfileLink.href = googleBusinessProfileUrl;
    googleProfileLink.hidden = false;
  }

  googleReviewsSection.hidden = false;
  updateReviewControls();
}

const sandboxCaseSlots = Array.from({ length: 2 }, (_, index) => ({
  previewPlaceholder: true,
  title: `Approved case study slot ${index + 1}`,
  service: "Service details pending",
  sessions: "Pending approval",
  timeframe: "Pending approval",
  caption: "Approved case summary will appear here.",
  disclaimer: "Preview only. No client media or treatment result is shown.",
  before: {
    label: "Before",
    alt: "Placeholder for an approved before image",
    caption: "Approved before-image caption",
  },
  after: {
    label: "After",
    alt: "Placeholder for an approved after image",
    caption: "Approved after-image caption",
  },
}));

const getBeforeAfterPairs = (caseStudy) => {
  if (Array.isArray(caseStudy?.pairs) && caseStudy.pairs.length) {
    return caseStudy.pairs;
  }

  if (caseStudy?.before && caseStudy?.after) {
    return [{ before: caseStudy.before, after: caseStudy.after }];
  }

  return [];
};

const hasValidBeforeAfterPairs = (caseStudy, requireCaptions = false) => {
  const pairs = getBeforeAfterPairs(caseStudy);

  return (
    pairs.length > 0 &&
    pairs.every((pair) => {
      const hasRequiredMedia = (
        isApprovedImageUrl(pair?.before?.imageUrl) &&
        String(pair?.before?.alt || "").trim() &&
        isApprovedImageUrl(pair?.after?.imageUrl) &&
        String(pair?.after?.alt || "").trim()
      );

      if (!hasRequiredMedia || !requireCaptions) return hasRequiredMedia;

      return (
        String(pair?.before?.caption || "").trim() &&
        String(pair?.after?.caption || "").trim()
      );
    })
  );
};

const sandboxBeforeAfterCases = Array.isArray(homepageProofContent.sandboxBeforeAfterCases)
  ? homepageProofContent.sandboxBeforeAfterCases.filter((caseStudy) => {
    return (
      caseStudy?.approvedForSandbox === true &&
      String(caseStudy?.title || "").trim() &&
      String(caseStudy?.service || "").trim() &&
      hasValidBeforeAfterPairs(caseStudy)
    );
  })
  : [];

const approvedBeforeAfterCases = sandboxPreviewMode
  ? sandboxBeforeAfterCases.length
    ? sandboxBeforeAfterCases
    : sandboxCaseSlots
  : Array.isArray(homepageProofContent.beforeAfterCases)
    ? homepageProofContent.beforeAfterCases.filter((caseStudy) => {
      return (
        caseStudy?.approvedForWebsite === true &&
        caseStudy?.consentConfirmed === true &&
        String(caseStudy?.title || "").trim() &&
        String(caseStudy?.service || "").trim() &&
        String(caseStudy?.sessions || "").trim() &&
        String(caseStudy?.timeframe || "").trim() &&
        String(caseStudy?.caption || "").trim() &&
        String(caseStudy?.disclaimer || "").trim() &&
        hasValidBeforeAfterPairs(caseStudy, true)
      );
      })
    : [];

const beforeAfterSection = document.querySelector("[data-before-after-gallery]");
const beforeAfterGrid = document.querySelector("[data-before-after-grid]");
const beforeAfterTemplate = document.querySelector("#before-after-card-template");
const beforeAfterViewTemplate = document.querySelector("#before-after-view-template");

if (
  approvedBeforeAfterCases.length &&
  beforeAfterSection &&
  beforeAfterGrid &&
  beforeAfterTemplate &&
  beforeAfterViewTemplate
) {
  approvedBeforeAfterCases.forEach((caseStudy) => {
    const card = beforeAfterTemplate.content.firstElementChild.cloneNode(true);
    const isPreviewSlot = caseStudy.previewPlaceholder === true;
    const layoutClass = String(caseStudy.layoutClass || "").trim();
    const pairs = getBeforeAfterPairs(caseStudy);
    const views = card.querySelector("[data-case-views]");
    const metadata = card.querySelector("[data-case-metadata]");
    const metadataItems = [
      ["Sessions", caseStudy.sessions],
      ["Timeframe", caseStudy.timeframe],
    ].filter(([, value]) => String(value || "").trim());

    card.querySelector("[data-case-service]").textContent = String(caseStudy.service).trim();
    card.querySelector("[data-case-title]").textContent = String(caseStudy.title).trim();
    if (/^[a-z0-9_-]+$/i.test(layoutClass)) card.classList.add(layoutClass);
    const caseCaption = String(caseStudy.caption || "").trim();

    if (caseCaption) {
      card.querySelector("[data-case-caption]").textContent = caseCaption;
    } else {
      card.querySelector("[data-case-caption]").remove();
    }
    const caseDisclaimer = String(caseStudy.disclaimer || "").trim();

    if (caseDisclaimer) {
      card.querySelector("[data-case-disclaimer]").textContent = caseDisclaimer;
    } else {
      card.querySelector("[data-case-disclaimer]").remove();
    }

    pairs.forEach((pair) => {
      const view = beforeAfterViewTemplate.content.firstElementChild.cloneNode(true);
      const beforeImage = document.createElement(isPreviewSlot ? "div" : "img");
      const afterImage = document.createElement(isPreviewSlot ? "div" : "img");
      const beforeLabel = String(pair.before.label || "Before").trim();
      const afterLabel = String(pair.after.label || "After").trim();
      const viewTitle = String(pair.title || "").trim();
      const beforeCaption = String(pair.before.caption || "").trim();
      const afterCaption = String(pair.after.caption || "").trim();

      if (viewTitle) {
        view.querySelector("[data-view-title]").textContent = viewTitle;
      } else {
        view.querySelector("[data-view-title]").remove();
      }

      if (isPreviewSlot) {
        beforeImage.className = "sandbox-image-placeholder";
        beforeImage.setAttribute("role", "img");
        beforeImage.setAttribute("aria-label", pair.before.alt);
        beforeImage.textContent = "Approved before image";
        afterImage.className = "sandbox-image-placeholder";
        afterImage.setAttribute("role", "img");
        afterImage.setAttribute("aria-label", pair.after.alt);
        afterImage.textContent = "Approved after image";
        card.classList.add("is-sandbox-placeholder");
      } else {
        beforeImage.src = pair.before.imageUrl;
        beforeImage.alt = pair.before.alt;
        beforeImage.width = Number(pair.before.width) || 800;
        beforeImage.height = Number(pair.before.height) || 1000;
        beforeImage.loading = "lazy";
        beforeImage.decoding = "async";
        afterImage.src = pair.after.imageUrl;
        afterImage.alt = pair.after.alt;
        afterImage.width = Number(pair.after.width) || 800;
        afterImage.height = Number(pair.after.height) || 1000;
        afterImage.loading = "lazy";
        afterImage.decoding = "async";
      }

      view.querySelector("[data-before-image-slot]").replaceWith(beforeImage);
      view.querySelector("[data-after-image-slot]").replaceWith(afterImage);
      view.querySelector("[data-before-label]").textContent = beforeLabel;
      view.querySelector("[data-after-label]").textContent = afterLabel;

      if (beforeCaption) {
        view.querySelector("[data-before-caption]").textContent = beforeCaption;
      } else {
        view.querySelector("[data-before-caption]").remove();
      }

      if (afterCaption) {
        view.querySelector("[data-after-caption]").textContent = afterCaption;
      } else {
        view.querySelector("[data-after-caption]").remove();
      }

      views.append(view);
    });

    if (pairs.length > 1) {
      card.classList.add("is-multi-view");
      views.classList.add("is-multi-view");
    }

    metadataItems.forEach(([term, value]) => {
      const item = document.createElement("div");
      const label = document.createElement("dt");
      const description = document.createElement("dd");

      label.textContent = term;
      description.textContent = String(value).trim();
      item.append(label, description);
      metadata.append(item);
    });

    if (!metadataItems.length) {
      metadata.remove();
    }

    beforeAfterGrid.append(card);
  });

  beforeAfterSection.hidden = false;
}

// Build the review-only homepage sequence without changing the production page.
const homepageMain = document.querySelector("main");
const homepageHero = document.querySelector(".home-flagship-hero");
const servicesPricingSection = document.querySelector(".home-services-pricing-band");
const appointmentProcessSection = document.querySelector(".home-story-band");
const testimonialVideoSection = document.querySelector(".home-video-band");
const serviceAreaSection = document.querySelector("#service-area");
const serviceAreaLayout = serviceAreaSection?.querySelector(".home-map-layout");
const serviceAreaMap = serviceAreaSection?.querySelector(".home-service-map-card");
const footerContact = document.querySelector(".footer-contact");
const footerCopy = footerContact?.querySelector(".footer-copy");
const footerGrid = document.querySelector(".footer-grid");
const siteFooter = document.querySelector(".site-footer");
const homepageContactForm = document.querySelector("#contact-form");

if (serviceAreaLayout && serviceAreaMap && footerCopy && homepageContactForm) {
  const contactPanel = document.createElement("div");

  contactPanel.className = "home-map-contact-panel";
  contactPanel.append(footerCopy, homepageContactForm);
  serviceAreaLayout.classList.add("home-map-contact-layout");
  serviceAreaLayout.replaceChildren(serviceAreaMap, contactPanel);
  footerGrid?.classList.add("sandbox-footer-compact");
}

if (homepageMain) {
  [
    homepageHero,
    servicesPricingSection,
    appointmentProcessSection,
    testimonialVideoSection,
    beforeAfterSection,
    googleReviewsSection,
  ].forEach((section) => {
    if (section) {
      homepageMain.append(section);
    }
  });
}

// The service-area map and contact form are one continuous footer region in
// the sandbox preview. Production markup and styles remain untouched.
if (serviceAreaSection) {
  if (siteFooter) {
    siteFooter.prepend(serviceAreaSection);
  } else {
    homepageMain?.append(serviceAreaSection);
  }
}

contactForms.forEach((contactForm) => {
  const status = contactForm.querySelector(".contact-form-note");
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const isExpansionForm = contactForm.id === "interest-form";
  const readyMessage = isExpansionForm
    ? "Send an expansion inquiry to Mobile Cryo Pro. This is an expression of interest, not an offer or commitment."
    : "Send the form and Dan will reply as soon as possible.";

  if (sandboxPreviewMode) {
    contactForm.removeAttribute("action");
    contactForm.removeAttribute("method");
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = isExpansionForm ? "Send Expansion Inquiry" : "Send Request";
    }
    if (status) {
      status.textContent = readyMessage;
      status.setAttribute("aria-live", "polite");
    }
    return;
  }

  contactForm.action = formspreeEndpoint;
  contactForm.method = "POST";

  if (status) {
    status.textContent = readyMessage;
    status.setAttribute("aria-live", "polite");
  }

  if (!isExpansionForm && !contactForm.querySelector(".booking-deposit-link")) {
    const depositPrompt = document.createElement("p");
    const depositLink = document.createElement("a");

    depositPrompt.className = "booking-deposit-link";
    depositPrompt.append("Already scheduled? ");
    depositLink.href = bookingDepositPage;
    depositLink.target = "_blank";
    depositLink.rel = "noopener noreferrer";
    depositLink.textContent = "Pay the $50 booking deposit";
    depositPrompt.append(depositLink);
    contactForm.append(depositPrompt);
  }

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const baseSubject =
      contactForm.dataset.formSubject || "Mobile Cryo Pro — New inquiry";

    formData.set("_subject", name ? `${baseSubject} from ${name}` : baseSubject);
    formData.set(
      "inquiry_type",
      isExpansionForm ? "Expansion inquiry" : "Website inquiry",
    );
    formData.set("source_page", window.location.href);

    if (submitButton) {
      submitButton.disabled = true;
    }
    if (status) {
      status.textContent = "Sending…";
    }

    try {
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Formspree returned ${response.status}`);
      }

      contactForm.reset();
      if (status) {
        status.textContent = isExpansionForm
          ? "Thanks — your expansion inquiry was sent to Mobile Cryo Pro."
          : "Thanks — your message was sent. Dan will be in touch.";
      }
    } catch (error) {
      if (status) {
        status.textContent =
          "We couldn’t send that message. Please call or text (707) 413-9366, or email info@mobilecryopro.com.";
      }
      console.error("Form submission failed", error);
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });
});

if (sandboxPreviewMode) {
  document.querySelectorAll('a[href^="https://book.stripe.com"]').forEach((link) => {
    link.removeAttribute("href");
    link.removeAttribute("target");
    link.setAttribute("aria-disabled", "true");
    link.setAttribute("title", "Disabled in sandbox preview");
  });
}
