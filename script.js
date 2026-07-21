const installUnifiedSiteFooter = () => {
  const pageShell = document.querySelector(".page-shell");

  if (!pageShell) {
    return;
  }

  const existingFooter = pageShell.querySelector(".site-footer");
  const existingHomepageServiceArea = pageShell.querySelector("main #service-area");
  const footer = existingFooter || document.createElement("footer");

  existingHomepageServiceArea?.remove();
  footer.className = "site-footer site-footer-unified";
  footer.innerHTML = `
    <section class="footer-map-contact" id="service-area" aria-labelledby="footer-service-title">
      <div class="footer-shell">
        <div class="footer-section-heading">
          <p class="eyebrow">Mobile across the North Bay</p>
          <h2 id="footer-service-title">See the service area. Tell Dan what you need.</h2>
          <p>Sonoma and Marin are home base. Napa, Solano, and San Francisco are available by request.</p>
        </div>

        <div class="footer-map-contact-layout">
          <figure class="service-map-card footer-service-map-card">
            <div
              class="service-map"
              role="application"
              aria-label="Interactive map of Mobile Cryo Pro's North Bay service area"
            >
              <p class="map-fallback">North Bay service area map.</p>
            </div>
            <figcaption>Primary service throughout Sonoma and Marin, with additional North Bay and San Francisco appointments by request.</figcaption>
          </figure>

          <div class="footer-form-panel">
            <div class="footer-copy">
              <h2>Request a mobile visit.</h2>
              <p>Share the service or goal, your location, and the timing you have in mind.</p>
            </div>

            <form class="contact-form" id="contact-form" data-contact-form>
              <div class="form-grid">
                <label class="form-field">
                  <span>Name</span>
                  <input type="text" name="name" autocomplete="name" required />
                </label>
                <label class="form-field">
                  <span>Email</span>
                  <input type="email" name="email" autocomplete="email" spellcheck="false" required />
                </label>
                <label class="form-field form-field-full">
                  <span>Phone <em>(optional)</em></span>
                  <input type="tel" name="phone" autocomplete="tel" inputmode="tel" />
                </label>
                <label class="form-field form-field-full">
                  <span>Message</span>
                  <textarea name="message" placeholder="Service or goal, location, and preferred date or time." required></textarea>
                </label>
              </div>
              <button class="button button-primary" type="submit">Send Message</button>
              <p class="contact-form-note" aria-live="polite">Send the form and Dan will reply as soon as possible.</p>
              <p class="booking-deposit-link">Already scheduled? <a href="https://book.stripe.com/eVqbJ18NNgCR2ofdR63VC00" target="_blank" rel="noopener noreferrer">Pay the $50 booking deposit</a></p>
            </form>
          </div>
        </div>
      </div>
    </section>

    <div class="footer-secondary">
      <div class="footer-shell">
        <div class="footer-contact footer-contact-compact">
          <a class="footer-brand" href="index.html" aria-label="Mobile Cryo Pro home">
            <img class="footer-logo" src="assets/mobile-cryo-pro-logo.png?v=9" alt="Mobile Cryo Pro" width="1100" height="360" loading="lazy" />
          </a>
          <div class="footer-contact-list">
            <div class="footer-contact-item">
              <span>Call or text</span>
              <a href="tel:+17074139366">(707) 413-9366</a>
            </div>
            <div class="footer-contact-item">
              <span>Email</span>
              <a href="mailto:info@mobilecryopro.com">info@mobilecryopro.com</a>
            </div>
            <div class="footer-contact-item">
              <span>Service area</span>
              <p>Sonoma, Marin, and the wider North Bay. SF and Napa by request.</p>
            </div>
          </div>
        </div>

        <div class="footer-bar">
          <p>&copy; Mobile Cryo Pro &middot; Mobile cryotherapy across the North Bay</p>
          <div class="footer-payment-methods" aria-label="Payment methods available through Stripe">
            <a class="payment-mark payment-mark-visa" href="https://book.stripe.com/eVqbJ18NNgCR2ofdR63VC00" target="_blank" rel="noopener noreferrer" aria-label="Visa — pay booking deposit">VISA</a>
            <a class="payment-mark payment-mark-mastercard" href="https://book.stripe.com/eVqbJ18NNgCR2ofdR63VC00" target="_blank" rel="noopener noreferrer" aria-label="Mastercard — pay booking deposit"></a>
            <a class="payment-mark payment-mark-amex" href="https://book.stripe.com/eVqbJ18NNgCR2ofdR63VC00" target="_blank" rel="noopener noreferrer" aria-label="American Express — pay booking deposit">AMEX</a>
            <a class="payment-mark payment-mark-discover" href="https://book.stripe.com/eVqbJ18NNgCR2ofdR63VC00" target="_blank" rel="noopener noreferrer" aria-label="Discover — pay booking deposit">DISCOVER</a>
            <a class="payment-mark payment-mark-apple" href="https://book.stripe.com/eVqbJ18NNgCR2ofdR63VC00" target="_blank" rel="noopener noreferrer" aria-label="Apple Pay — pay booking deposit">Apple Pay</a>
            <a class="payment-mark payment-mark-link" href="https://book.stripe.com/eVqbJ18NNgCR2ofdR63VC00" target="_blank" rel="noopener noreferrer" aria-label="Link — pay booking deposit">● link</a>
            <a class="payment-mark payment-mark-klarna" href="https://book.stripe.com/eVqbJ18NNgCR2ofdR63VC00" target="_blank" rel="noopener noreferrer" aria-label="Klarna — pay booking deposit">Klarna</a>
            <a class="payment-mark payment-mark-amazon" href="https://book.stripe.com/eVqbJ18NNgCR2ofdR63VC00" target="_blank" rel="noopener noreferrer" aria-label="Amazon Pay — pay booking deposit">amazon pay</a>
            <a class="payment-mark payment-mark-cash" href="https://book.stripe.com/eVqbJ18NNgCR2ofdR63VC00" target="_blank" rel="noopener noreferrer" aria-label="Cash App Pay — pay booking deposit">$ Cash</a>
            <a class="payment-mark payment-mark-bank" href="https://book.stripe.com/eVqbJ18NNgCR2ofdR63VC00" target="_blank" rel="noopener noreferrer" aria-label="US bank account — pay booking deposit">▥ Bank</a>
          </div>
          <div class="footer-links">
            <a href="about.html">About</a>
            <a href="services.html">Services</a>
            <a href="blog.html">Blog</a>
            <a href="faq.html">FAQ</a>
            <a href="service-areas.html">Service Areas</a>
            <a href="expansion-opportunities.html">Expansion</a>
          </div>
        </div>
      </div>
    </div>
  `;

  if (!existingFooter) {
    pageShell.append(footer);
  }
};

installUnifiedSiteFooter();

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

const initializeFooterMap = () => {
  const mapElement = document.querySelector(".site-footer .service-map");

  if (!mapElement) {
    return;
  }

  const loadMapScript = () => {
    if (typeof window.initServiceMaps === "function") {
      window.initServiceMaps(document.querySelector(".site-footer"));
      return;
    }

    const existingMapScript = document.querySelector('script[src^="map.js"]');
    if (existingMapScript) {
      existingMapScript.addEventListener("load", () => window.initServiceMaps?.(document.querySelector(".site-footer")), { once: true });
      return;
    }

    const mapScript = document.createElement("script");
    mapScript.src = "map.js?v=5";
    mapScript.addEventListener("load", () => window.initServiceMaps?.(document.querySelector(".site-footer")), { once: true });
    document.body.append(mapScript);
  };

  const loadLeaflet = () => {
    if (!document.querySelector('link[href*="leaflet.css"]')) {
      const leafletStyles = document.createElement("link");
      leafletStyles.rel = "stylesheet";
      leafletStyles.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      leafletStyles.integrity = "sha256-p4NxAoJBhIINfQ3yn+RytqVNVXLT+XTIuQbMZojtk+o=";
      leafletStyles.crossOrigin = "";
      document.head.append(leafletStyles);
    }

    if (window.L) {
      loadMapScript();
      return;
    }

    const existingLeafletScript = document.querySelector('script[src*="leaflet.js"]');
    if (existingLeafletScript) {
      existingLeafletScript.addEventListener("load", loadMapScript, { once: true });
      return;
    }

    const leafletScript = document.createElement("script");
    leafletScript.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    leafletScript.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
    leafletScript.crossOrigin = "";
    leafletScript.addEventListener("load", loadMapScript, { once: true });
    document.body.append(leafletScript);
  };

  if (!("IntersectionObserver" in window)) {
    loadLeaflet();
    return;
  }

  const mapObserver = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) {
        return;
      }

      mapObserver.disconnect();
      loadLeaflet();
    },
    { rootMargin: "600px 0px" },
  );

  mapObserver.observe(mapElement);
};

initializeFooterMap();

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
