const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".site-nav a");
const heroSlider = document.querySelector("[data-slider]");
const slides = Array.from(document.querySelectorAll("[data-slide]"));
const dots = Array.from(document.querySelectorAll("[data-dot]"));
const contactForms = document.querySelectorAll("[data-contact-form]");
const formspreeEndpoint = "https://formspree.io/f/mnjeppkn";
const bookingDepositPage = "book.html";
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

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

  if (!isExpansionForm) {
    const depositPrompt = document.createElement("p");
    const depositLink = document.createElement("a");

    depositPrompt.className = "booking-deposit-link";
    depositPrompt.append("Already scheduled? ");
    depositLink.href = bookingDepositPage;
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
          "We couldn’t send that message. Please call or text (707) 867-6101, or email info@mobilecryopro.com.";
      }
      console.error("Form submission failed", error);
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });
});
