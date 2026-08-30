(function installSandboxSiteFooter() {
  var pageShell = document.querySelector(".page-shell");
  if (!pageShell) return;

  var existingFooter = pageShell.querySelector(".site-footer");
  var existingServiceArea = pageShell.querySelector("main #service-area");
  var footer = existingFooter || document.createElement("footer");

  if (existingServiceArea) existingServiceArea.remove();
  footer.className = "site-footer site-footer-unified";
  footer.innerHTML = `
    <section class="footer-map-contact" id="service-area" aria-labelledby="footer-service-title">
      <div class="footer-shell">
        <div class="footer-section-heading">
          <p class="eyebrow">Mobile across the North Bay</p>
          <h2 id="footer-service-title">Check your area and request a mobile visit</h2>
          <p>Sonoma and Marin are home base. Napa, Solano, and San Francisco are available by request.</p>
        </div>
        <div class="footer-map-contact-layout">
          <figure class="service-map-card footer-service-map-card">
            <div class="service-map" role="application" aria-label="Interactive map of Mobile Cryo Pro's North Bay service area">
              <p class="map-fallback">North Bay service area map.</p>
            </div>
            <figcaption>Not sure whether your address is covered? Include your city or ZIP code in the message.</figcaption>
          </figure>
          <div class="footer-form-panel">
            <div class="footer-copy">
              <h2>Appointments &amp; Questions</h2>
              <p>Share the service or goal, your location, and the timing you have in mind. You&rsquo;re also welcome to call or text <a class="footer-call-link" href="tel:+17074139366">(707) 413-9366</a>.</p>
            </div>
            <form class="contact-form" id="contact-form" data-contact-form>
              <div class="form-grid">
                <label class="form-field"><span>Name</span><input type="text" name="name" autocomplete="name" required /></label>
                <label class="form-field"><span>Email</span><input type="email" name="email" autocomplete="email" spellcheck="false" required /></label>
                <label class="form-field form-field-full"><span>Phone <em>(optional)</em></span><input type="tel" name="phone" autocomplete="tel" inputmode="tel" /></label>
                <label class="form-field form-field-full"><span>Message</span><textarea name="message" placeholder="Service or goal, location, and preferred date or time." required></textarea></label>
              </div>
              <button class="button button-primary" type="submit">Send Request</button>
              <p class="contact-form-note" aria-live="polite">Dan will reply as soon as possible.</p>
              <p class="form-privacy-note">Use this form for scheduling details, not medical records. By sending, you authorize a reply about your request. <a href="/privacy.html">Privacy Policy</a></p>
              <p class="booking-deposit-link">Already scheduled? <a href="https://book.stripe.com/eVqbJ18NNgCR2ofdR63VC00" target="_blank" rel="noopener noreferrer">Pay the $50 booking deposit</a></p>
            </form>
          </div>
        </div>
      </div>
    </section>
    <div class="footer-secondary">
      <div class="footer-shell">
        <div class="footer-contact footer-contact-compact">
          <a class="footer-brand" href="/index.html" aria-label="Mobile Cryo Pro home">
            <img class="footer-logo" src="/assets/optimized/mobile-cryo-pro-logo-360.webp" srcset="/assets/optimized/mobile-cryo-pro-logo-360.webp 360w, /assets/optimized/mobile-cryo-pro-logo-600.webp 600w" sizes="(max-width: 760px) 292px, 220px" alt="Mobile Cryo Pro" width="600" height="196" loading="lazy" decoding="async" />
          </a>
          <div class="footer-contact-list">
            <div class="footer-contact-item"><span>Call or text</span><a href="tel:+17074139366">(707) 413-9366</a></div>
            <div class="footer-contact-item"><span>Email</span><a href="mailto:info@mobilecryopro.com">info@mobilecryopro.com</a></div>
            <div class="footer-contact-item"><span>Service area</span><p>Sonoma and Marin. Napa, Solano, and San Francisco by request.</p></div>
          </div>
        </div>
        <div class="footer-bar">
          <p>&copy; Mobile Cryo Pro</p>
          <div class="footer-payment-methods" aria-label="Accepted payment methods">
            <a class="payment-mark payment-mark-visa" href="https://book.stripe.com/eVqbJ18NNgCR2ofdR63VC00" target="_blank" rel="noopener noreferrer" aria-label="Visa — pay booking deposit">VISA</a><a class="payment-mark payment-mark-mastercard" href="https://book.stripe.com/eVqbJ18NNgCR2ofdR63VC00" target="_blank" rel="noopener noreferrer" aria-label="Mastercard — pay booking deposit"></a><a class="payment-mark payment-mark-amex" href="https://book.stripe.com/eVqbJ18NNgCR2ofdR63VC00" target="_blank" rel="noopener noreferrer" aria-label="American Express — pay booking deposit">AMEX</a><a class="payment-mark payment-mark-discover" href="https://book.stripe.com/eVqbJ18NNgCR2ofdR63VC00" target="_blank" rel="noopener noreferrer" aria-label="Discover — pay booking deposit">DISCOVER</a><a class="payment-mark payment-mark-apple" href="https://book.stripe.com/eVqbJ18NNgCR2ofdR63VC00" target="_blank" rel="noopener noreferrer" aria-label="Apple Pay — pay booking deposit">Apple Pay</a><a class="payment-mark payment-mark-link" href="https://book.stripe.com/eVqbJ18NNgCR2ofdR63VC00" target="_blank" rel="noopener noreferrer" aria-label="Link — pay booking deposit">● link</a><a class="payment-mark payment-mark-klarna" href="https://book.stripe.com/eVqbJ18NNgCR2ofdR63VC00" target="_blank" rel="noopener noreferrer" aria-label="Klarna — pay booking deposit">Klarna</a><a class="payment-mark payment-mark-amazon" href="https://book.stripe.com/eVqbJ18NNgCR2ofdR63VC00" target="_blank" rel="noopener noreferrer" aria-label="Amazon Pay — pay booking deposit">amazon pay</a><a class="payment-mark payment-mark-cash" href="https://book.stripe.com/eVqbJ18NNgCR2ofdR63VC00" target="_blank" rel="noopener noreferrer" aria-label="Cash App Pay — pay booking deposit">$ Cash</a><a class="payment-mark payment-mark-bank" href="https://book.stripe.com/eVqbJ18NNgCR2ofdR63VC00" target="_blank" rel="noopener noreferrer" aria-label="US bank account — pay booking deposit">▥ Bank</a>
          </div>
          <div class="footer-links"><a href="/about.html">About</a><a href="/services.html">Services</a><a href="/guides/index.html">Guides</a><a href="/faq.html">FAQ</a><a href="/service-areas.html">Service Areas</a><a href="/expansion-opportunities.html">Expansion</a><a href="/privacy.html">Privacy</a><a href="/terms.html">Terms</a></div>
        </div>
      </div>
    </div>`;

  if (!existingFooter) pageShell.append(footer);

  var mapElement = footer.querySelector(".service-map");
  if (!mapElement) return;

  var loadMapScript = function () {
    if (typeof window.initServiceMaps === "function") {
      window.initServiceMaps(footer);
      return;
    }
    var existing = document.querySelector('script[src$="map.js?v=7"]');
    if (existing) {
      existing.addEventListener("load", function () { window.initServiceMaps && window.initServiceMaps(footer); }, { once: true });
      return;
    }
    var script = document.createElement("script");
    script.src = "/map.js?v=7";
    script.addEventListener("load", function () { window.initServiceMaps && window.initServiceMaps(footer); }, { once: true });
    document.body.append(script);
  };

  var loadLeaflet = function () {
    var stylesReady = false;
    var styles = document.querySelector('link[href*="leaflet.css"]');

    var showMapFallback = function () {
      if (stylesReady) return;
      mapElement.removeAttribute("role");
      mapElement.setAttribute("aria-label", "North Bay service area map unavailable");
      mapElement.innerHTML = '<p class="map-fallback">The interactive map is temporarily unavailable. Primary service is throughout Sonoma and Marin, with additional areas available by request.</p>';
    };

    var startLeaflet = function () {
      if (stylesReady) return;
      stylesReady = true;

      if (window.L) {
        loadMapScript();
        return;
      }
      var existing = document.querySelector('script[src*="leaflet.js"]');
      if (existing) {
        existing.addEventListener("load", loadMapScript, { once: true });
        return;
      }
      var script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
      script.crossOrigin = "";
      script.addEventListener("load", loadMapScript, { once: true });
      document.body.append(script);
    };

    if (!styles) {
      styles = document.createElement("link");
      styles.rel = "stylesheet";
      styles.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      styles.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
      styles.crossOrigin = "";
      document.head.append(styles);
    }

    if (styles.sheet) {
      startLeaflet();
      return;
    }

    styles.addEventListener("load", startLeaflet, { once: true });
    styles.addEventListener("error", showMapFallback, { once: true });
    window.setTimeout(showMapFallback, 8000);
  };

  if (!("IntersectionObserver" in window)) {
    loadLeaflet();
    return;
  }
  var observer = new IntersectionObserver(function (entries) {
    if (!entries.some(function (entry) { return entry.isIntersecting; })) return;
    observer.disconnect();
    loadLeaflet();
  }, { rootMargin: "600px 0px" });
  observer.observe(mapElement);
})();
