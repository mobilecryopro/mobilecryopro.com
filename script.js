const GOOGLE_ANALYTICS_MEASUREMENT_ID = "G-ZP3ZP784WD";

const isProductionAnalyticsContext = () => {
  const { hostname, pathname } = window.location;
  const isProductionHost =
    hostname === "mobilecryopro.com" || hostname === "www.mobilecryopro.com";
  const isNonProductionPage =
    pathname.startsWith("/sandbox/") ||
    pathname.startsWith("/original-attempt/") ||
    pathname.startsWith("/email-media/") ||
    pathname === "/blog-layout-preview.html" ||
    pathname === "/logo-options.html" ||
    pathname === "/logo-riffs.html";

  return isProductionHost && !isNonProductionPage;
};

const installGoogleAnalytics = () => {
  if (!isProductionAnalyticsContext() || window.gtag) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GOOGLE_ANALYTICS_MEASUREMENT_ID);

  const googleTag = document.createElement("script");
  googleTag.async = true;
  googleTag.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_MEASUREMENT_ID}`;
  googleTag.dataset.mobileCryoGoogleTag = "true";
  document.head.append(googleTag);
};

installGoogleAnalytics();

const trackAnalyticsEvent = (eventName, parameters = {}) => {
  const eventDetail = {
    eventName,
    parameters: {
      ...parameters,
      page_path: window.location.pathname,
    },
  };

  // Keep the launch candidate testable without polluting production GA4.
  window.dispatchEvent(
    new CustomEvent("mobilecryopro:analytics", { detail: eventDetail }),
  );

  if (!isProductionAnalyticsContext() || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, eventDetail.parameters);
};

const getLinkContext = (link) => {
  if (link.closest(".site-header")) {
    return "header";
  }
  if (link.closest(".site-footer")) {
    return "footer";
  }
  if (link.closest("form")) {
    return "form";
  }
  return "content";
};

document.addEventListener("click", (event) => {
  const link = event.target.closest?.("a[href]");

  if (!link) {
    return;
  }

  const url = new URL(link.href, window.location.href);
  const linkContext = getLinkContext(link);

  if (url.protocol === "tel:") {
    trackAnalyticsEvent("click_to_call", { link_context: linkContext });
    return;
  }

  if (url.protocol === "mailto:") {
    trackAnalyticsEvent("click_to_email", { link_context: linkContext });
    return;
  }

  if (url.hostname === "book.stripe.com") {
    trackAnalyticsEvent("booking_deposit_click", {
      link_context: linkContext,
      currency: "USD",
      value: 50,
    });
  }
});

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

const getFixedHeaderBottom = () => {
  if (!header || window.getComputedStyle(header).position !== "fixed") {
    return 0;
  }

  return Math.ceil(header.getBoundingClientRect().bottom);
};

const scrollToServiceArea = ({ behavior = "smooth" } = {}) => {
  const serviceArea = document.querySelector("#service-area");
  const serviceAreaHeading = serviceArea?.querySelector(".footer-section-heading");
  const scrollTarget = serviceAreaHeading || serviceArea;

  if (!scrollTarget) {
    return;
  }

  const fixedHeaderBottom = getFixedHeaderBottom();
  const viewportGap = fixedHeaderBottom ? 24 : 18;
  const targetTop =
    window.scrollY +
    scrollTarget.getBoundingClientRect().top -
    fixedHeaderBottom -
    viewportGap;

  window.scrollTo({
    top: Math.max(0, targetTop),
    behavior: reducedMotionQuery.matches ? "auto" : behavior,
  });
};

document.querySelectorAll('a[href*="#service-area"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const destination = new URL(link.href, window.location.href);
    const serviceArea = document.querySelector("#service-area");

    if (destination.origin !== window.location.origin || !serviceArea) {
      return;
    }

    event.preventDefault();
    window.history.pushState(null, "", "#service-area");
    window.requestAnimationFrame(() => scrollToServiceArea());
  });
});

if (window.location.hash === "#service-area") {
  const correctInitialServiceAreaPosition = () =>
    window.requestAnimationFrame(() =>
      scrollToServiceArea({ behavior: "auto" }),
    );

  correctInitialServiceAreaPosition();

  if (document.readyState !== "complete") {
    window.addEventListener("load", correctInitialServiceAreaPosition, {
      once: true,
    });
  }
}

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

const approvedGoogleReviews = Array.isArray(homepageProofContent.googleReviews)
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
const existingReviewCards = reviewTrack
  ? Array.from(reviewTrack.querySelectorAll(".review-card"))
  : [];
const canRenderReviewCards = Boolean(
  approvedGoogleReviews.length &&
  googleBusinessProfileUrl &&
  reviewCardTemplate,
);

if (
  googleReviewsSection &&
  reviewCarousel &&
  reviewTrack &&
  reviewPreviousButton &&
  reviewNextButton &&
  (canRenderReviewCards || existingReviewCards.length)
) {
  const reviewCards = canRenderReviewCards
    ? approvedGoogleReviews.map((review, index) => {
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
      })
    : existingReviewCards;

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

const approvedBeforeAfterCases = Array.isArray(homepageProofContent.beforeAfterCases)
  ? homepageProofContent.beforeAfterCases.filter((caseStudy) => {
      return (
        caseStudy?.approvedForWebsite === true &&
        caseStudy?.consentConfirmed === true &&
        String(caseStudy?.title || "").trim() &&
        String(caseStudy?.service || "").trim() &&
        String(caseStudy?.sessions || "").trim() &&
        String(caseStudy?.caption || "").trim() &&
        hasValidBeforeAfterPairs(caseStudy)
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
        beforeImage.src = pair.before.thumbnailUrl || pair.before.imageUrl;
        if (pair.before.thumbnailUrl) {
          beforeImage.srcset = `${pair.before.thumbnailUrl} 500w, ${pair.before.imageUrl} 1000w`;
          beforeImage.sizes = "(max-width: 760px) 50vw, 25vw";
        }
        beforeImage.alt = pair.before.alt;
        beforeImage.width = Number(pair.before.width) || 800;
        beforeImage.height = Number(pair.before.height) || 1000;
        beforeImage.loading = "lazy";
        beforeImage.decoding = "async";
        afterImage.src = pair.after.thumbnailUrl || pair.after.imageUrl;
        if (pair.after.thumbnailUrl) {
          afterImage.srcset = `${pair.after.thumbnailUrl} 500w, ${pair.after.imageUrl} 1000w`;
          afterImage.sizes = "(max-width: 760px) 50vw, 25vw";
        }
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

// Build the launch-candidate homepage sequence.
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

// Keep the mobile LCP image stable. The secondary desktop hero image is loaded
// only after the initial page has finished and the browser has idle time.
const secondaryHeroImage = document.querySelector(
  ".home-hero-media-slide[data-src]",
);

if (secondaryHeroImage) {
  const desktopHeroQuery = window.matchMedia("(min-width: 761px)");

  const loadSecondaryHeroImage = () => {
    if (!desktopHeroQuery.matches || secondaryHeroImage.src) return;

    secondaryHeroImage.addEventListener(
      "load",
      () => homepageHero?.classList.add("hero-slides-ready"),
      { once: true },
    );
    secondaryHeroImage.src = secondaryHeroImage.dataset.src;
  };

  const scheduleSecondaryHeroImage = () => {
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(loadSecondaryHeroImage, { timeout: 2000 });
    } else {
      window.setTimeout(loadSecondaryHeroImage, 750);
    }
  };

  if (document.readyState === "complete") {
    scheduleSecondaryHeroImage();
  } else {
    window.addEventListener("load", scheduleSecondaryHeroImage, { once: true });
  }

  desktopHeroQuery.addEventListener?.("change", loadSecondaryHeroImage);
}

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

// The service-area map and contact form form one continuous footer region.
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

      trackAnalyticsEvent("generate_lead", {
        form_type: isExpansionForm ? "expansion_inquiry" : "website_inquiry",
      });
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

const galleryDirectory = document.querySelector("[data-gallery-directory]");

if (galleryDirectory && "IntersectionObserver" in window) {
  const directoryLinks = Array.from(galleryDirectory.querySelectorAll('a[href^="#"]'));
  const directorySections = directoryLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const setCurrentGallerySection = (sectionId) => {
    directoryLinks.forEach((link) => {
      if (link.getAttribute("href") === `#${sectionId}`) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  const gallerySectionObserver = new IntersectionObserver(
    (entries) => {
      const visibleSections = entries
        .filter((entry) => entry.isIntersecting)
        .sort((first, second) => second.intersectionRatio - first.intersectionRatio);

      if (visibleSections[0]) {
        setCurrentGallerySection(visibleSections[0].target.id);
      }
    },
    {
      rootMargin: "-30% 0px -55% 0px",
      threshold: [0, 0.1, 0.35],
    },
  );

  directorySections.forEach((section) => gallerySectionObserver.observe(section));
}

const galleryLightbox = document.querySelector("[data-gallery-lightbox]");
const galleryOpenButtons = Array.from(document.querySelectorAll("[data-gallery-open]"));

if (galleryLightbox && galleryOpenButtons.length) {
  const lightboxImage = galleryLightbox.querySelector("[data-gallery-lightbox-image]");
  const lightboxTitle = galleryLightbox.querySelector("[data-gallery-lightbox-title]");
  const lightboxMeta = galleryLightbox.querySelector("[data-gallery-lightbox-meta]");
  const lightboxCurrent = galleryLightbox.querySelector("[data-gallery-lightbox-current]");
  const lightboxTotal = galleryLightbox.querySelector("[data-gallery-lightbox-total]");
  const lightboxThumbs = galleryLightbox.querySelector("[data-gallery-thumbs]");
  const closeButton = galleryLightbox.querySelector("[data-gallery-close]");
  const previousButton = galleryLightbox.querySelector("[data-gallery-prev]");
  const nextButton = galleryLightbox.querySelector("[data-gallery-next]");
  let currentGalleryIndex = 0;
  let thumbnailButtons = [];
  const adjacentPreloads = new Map();

  const getFullGallerySource = (image) => {
    const sourceCandidates = (image.getAttribute("srcset") || "")
      .split(",")
      .map((candidate) => {
        const [source, descriptor = "0w"] = candidate.trim().split(/\s+/);
        return { source, width: Number.parseInt(descriptor, 10) || 0 };
      })
      .filter((candidate) => candidate.source)
      .sort((first, second) => second.width - first.width);

    const fallbackSource = image.getAttribute("src") || image.src;
    return sourceCandidates[0]?.source || fallbackSource.replace(/-card(?=\.[^./?#]+(?:[?#].*)?$)/, "");
  };

  const getGalleryThumbnailSource = (image) =>
    getFullGallerySource(image).replace(/(\.[^./?#]+)([?#].*)?$/, "-thumb.webp$2");

  const preloadAdjacentGalleryImage = (index) => {
    const normalizedIndex = (index + galleryOpenButtons.length) % galleryOpenButtons.length;
    const sourceImage = galleryOpenButtons[normalizedIndex].querySelector("img");
    const fullSource = getFullGallerySource(sourceImage);

    if (!fullSource || adjacentPreloads.has(fullSource)) return;

    const preload = new Image();
    preload.decoding = "async";
    preload.src = fullSource;
    adjacentPreloads.set(fullSource, preload);
  };

  const showGalleryImage = (index) => {
    currentGalleryIndex = (index + galleryOpenButtons.length) % galleryOpenButtons.length;
    const selectedButton = galleryOpenButtons[currentGalleryIndex];
    const selectedImage = selectedButton.querySelector("img");

    lightboxImage.src = getFullGallerySource(selectedImage);
    lightboxImage.alt = selectedImage.alt;
    lightboxTitle.textContent = selectedButton.dataset.galleryTitle || selectedImage.alt;
    lightboxMeta.textContent = selectedButton.dataset.galleryMeta || "Mobile Cryo Pro gallery";
    lightboxCurrent.textContent = String(currentGalleryIndex + 1);
    lightboxTotal.textContent = String(galleryOpenButtons.length);

    thumbnailButtons.forEach((thumbnail, thumbnailIndex) => {
      if (thumbnailIndex === currentGalleryIndex) {
        thumbnail.setAttribute("aria-current", "true");
      } else {
        thumbnail.removeAttribute("aria-current");
      }
    });

    thumbnailButtons[currentGalleryIndex]?.scrollIntoView({ block: "nearest", inline: "center" });
    window.setTimeout(() => {
      preloadAdjacentGalleryImage(currentGalleryIndex - 1);
      preloadAdjacentGalleryImage(currentGalleryIndex + 1);
    }, 0);
  };

  const ensureThumbnailButtons = () => {
    if (thumbnailButtons.length) return;

    thumbnailButtons = galleryOpenButtons.map((button, index) => {
      const sourceImage = button.querySelector("img");
      const thumbnail = document.createElement("button");
      const thumbnailImage = document.createElement("img");

      thumbnail.type = "button";
      thumbnail.className = "gallery-lightbox-thumb";
      thumbnail.setAttribute("aria-label", `View image ${index + 1}: ${button.dataset.galleryTitle || sourceImage.alt}`);
      thumbnailImage.src = getGalleryThumbnailSource(sourceImage);
      thumbnailImage.alt = "";
      thumbnailImage.width = 240;
      thumbnailImage.height = 192;
      thumbnailImage.loading = "lazy";
      thumbnailImage.decoding = "async";
      thumbnail.append(thumbnailImage);
      thumbnail.addEventListener("click", () => showGalleryImage(index));
      lightboxThumbs.append(thumbnail);
      return thumbnail;
    });
  };

  const openGalleryLightbox = (index) => {
    ensureThumbnailButtons();
    showGalleryImage(index);
    document.body.classList.add("gallery-lightbox-open");
    galleryLightbox.showModal();
    closeButton.focus();
  };

  galleryOpenButtons.forEach((button, index) => {
    button.addEventListener("click", () => openGalleryLightbox(index));
  });

  closeButton.addEventListener("click", () => galleryLightbox.close());
  previousButton.addEventListener("click", () => showGalleryImage(currentGalleryIndex - 1));
  nextButton.addEventListener("click", () => showGalleryImage(currentGalleryIndex + 1));

  galleryLightbox.addEventListener("close", () => {
    document.body.classList.remove("gallery-lightbox-open");
    galleryOpenButtons[currentGalleryIndex]?.focus();
  });

  galleryLightbox.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showGalleryImage(currentGalleryIndex - 1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showGalleryImage(currentGalleryIndex + 1);
    }
  });
}
