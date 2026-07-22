(() => {
  "use strict";

  const catalog = window.mobileCryoBlogCatalog;
  if (!catalog) return;

  const topicBySlug = {
    "complete-guide": "Start here",
    "how-cryotherapy-works": "Start here",
    "cryotherapy-safety": "Start here",
    "cryotherapy-vs-ice-packs": "Compare options",
    "cold-therapy-pain-inflammation": "Recovery",
    "localized-vs-whole-body": "Compare options",
    "choose-a-provider": "Start here",
    "questions-before-booking": "Start here"
  };

  catalog.articles.forEach((article) => {
    article.topic = topicBySlug[article.slug] || article.category;
    article.status = "Evidence checked";
  });

  catalog.articles.push(
    {
      slug: "mobile-cryotherapy-appointment",
      order: "09",
      category: "Mobile visits",
      topic: "Mobile visits",
      status: "Service facts checked",
      title: "What to Expect at a Mobile Cryotherapy Appointment",
      displayTitle: "What to expect at a mobile cryotherapy appointment.",
      description: "A practical walkthrough of choosing a service, confirming the location, meeting Dan, and preparing for a private mobile visit.",
      readTime: "4 min read",
      image: "/assets/mobile-recovery-home-setup.jpg",
      imageAlt: "A compact mobile cryotherapy setup in a private home",
      takeaways: [
        "Dan confirms the service, location, timing, and treatment area before the visit.",
        "Appointments can be requested for homes, hotels, gyms, offices, and private venues.",
        "Personal eligibility and the exact session plan are confirmed directly rather than guessed online."
      ],
      sections: [
        { heading: "Start with the goal, not a treatment label", body: `<p>You do not need to arrive knowing which service name to choose. Tell Dan what kind of appointment you are considering, the area you want to discuss, your location, and your preferred date. He can explain the current localized cryotherapy, CryoSkin body, and facial options before anything is scheduled.</p><p>If symptoms are new, severe, unexplained, worsening, or persistent, seek appropriate medical care rather than using a wellness appointment to delay an evaluation.</p>` },
        { heading: "Confirm the location and privacy", body: `<p>Mobile Cryo Pro accepts requests for homes, hotels, gyms, offices, wineries, events, and other suitable private venues across the North Bay. Sonoma and Marin are the primary service areas; Napa, Solano, and San Francisco are available by request. Venue access, parking, privacy, and group size can affect what is practical.</p><p>For a hotel, workplace, gym, or event, check the venue's rules first. Dan can confirm what the specific service needs once he knows the setting.</p>` },
        { heading: "Meet Dan and review the plan", body: `<p>Dan personally handles the intake, setup, and service. Before starting, confirm the exact service, selected area, expected sensation, price, and how to stop the session. This is also the time to disclose relevant health information and ask whether medical clearance is appropriate.</p>` },
        { heading: "During and after the appointment", body: `<p>Localized cryotherapy focuses on a selected area rather than placing you in a whole-body chamber. CryoSkin body and facial appointments are separate services. Because the equipment and procedure differ, follow the instructions for the appointment you actually booked.</p><p>Speak up immediately if anything feels wrong. After the session, follow Dan's service-specific guidance and do not treat temporary changes in sensation as proof that an injury or medical condition has been resolved.</p>` },
        { heading: "The easiest way to request a visit", body: `<p>Send the service or goal, city, preferred date, and whether the visit is for one person or a group. Dan can then confirm availability, current pricing, and any location details without a long back-and-forth.</p>` }
      ],
      refs: [],
      related: ["questions-before-booking", "choose-a-provider", "north-bay-mobile-cryotherapy"]
    },
    {
      slug: "cryotherapy-exercise-recovery",
      order: "10",
      category: "Recovery",
      topic: "Recovery",
      status: "Evidence checked",
      title: "Cold Therapy After Exercise: What the Research Actually Says",
      displayTitle: "Cold therapy after exercise: what the research actually says.",
      description: "A plain-English look at soreness, recovery, performance, and why results from one cooling method do not automatically apply to another.",
      readTime: "6 min read",
      image: "/assets/sports-recovery-stretch.jpg",
      imageAlt: "An athlete stretching as part of a recovery routine",
      takeaways: [
        "Some cold methods may help perceived soreness for some people in the short term.",
        "Research does not show a universal improvement in recovery or performance.",
        "Sleep, food, hydration, load management, and professional care still matter."
      ],
      sections: [
        { heading: "The useful answer is not yes or no", body: `<p>Cold is popular after hard training because it can change sensation and may make some people feel less sore. Reviews have found possible short-term effects on perceived soreness, but the results vary with timing, temperature, exposure method, and the outcome being measured.<sup><a href="#source-allan">1</a></sup><sup><a href="#source-cochrane">2</a></sup></p><p>Feeling better is a real experience, but it is not the same as faster tissue repair or improved performance.</p>` },
        { heading: "The method matters", body: `<p>Most exercise-recovery studies involve cold-water immersion, ice, or whole-body cryotherapy. A mobile localized service exposes a smaller selected area and should not inherit claims from those methods automatically. Even whole-body air exposure and cold-water immersion create different temperature responses.<sup><a href="#source-temperatures">3</a></sup></p>` },
        { heading: "Put cold in the right place", body: `<p>A localized session can be considered one optional part of a broader recovery routine. It does not replace sleep, adequate food and fluids, sensible training progression, or evaluation of a possible injury. Your coach or clinician's plan comes first when one exists.</p>` },
        { heading: "Know when soreness is not routine", body: `<p>Stop treating a symptom as ordinary post-workout soreness when it is severe, unusual, worsening, associated with major swelling or loss of function, or not improving as expected. Cold can temporarily change pain perception without identifying the cause.</p>` },
        { heading: "Questions worth asking", body: `<ul class="article-check-list"><li>What exact cooling method will be used?</li><li>Is the goal comfort, soreness management, or something that needs medical evaluation?</li><li>What result is realistic, and how long might it last?</li><li>Could reduced sensation make it harder to notice a warning sign?</li></ul>` }
      ],
      refs: ["allan", "cochrane", "temperatures"],
      related: ["cold-therapy-pain-inflammation", "cryotherapy-safety", "localized-vs-whole-body"]
    },
    {
      slug: "cryoskin-body-appointment",
      order: "11",
      category: "CryoSkin",
      topic: "CryoSkin & facials",
      status: "Service guide",
      title: "What to Expect From a CryoSkin 3.0 Body Appointment",
      displayTitle: "What to expect from a CryoSkin 3.0 body appointment.",
      description: "A straightforward guide to Mobile Cryo Pro's body-focused CryoSkin service, from choosing an area to confirming current pricing.",
      readTime: "4 min read",
      image: "/assets/client-arm-assessment.jpg",
      imageAlt: "Dan discussing a selected arm area before a mobile service",
      takeaways: [
        "CryoSkin 3.0 is a separate body-focused service, not whole-body cryotherapy.",
        "Dan maps the requested area and confirms the plan before the appointment.",
        "The sandbox does not promise inches lost, fat loss, or a particular visual result."
      ],
      sections: [
        { heading: "Choose the area you want to discuss", body: `<p>Mobile Cryo Pro currently lists a CryoSkin 3.0 body treatment for one mapped area, with an option to add another area during the same visit. Tell Dan the area you have in mind and what you hope to understand. He can confirm whether the body service or another listed option is the relevant conversation.</p>` },
        { heading: "Confirm the service and price", body: `<p>The current services page lists the CryoSkin 3.0 body treatment at $225 for one mapped area and an additional area at $120 during the same visit. Prices and suitability should still be confirmed before scheduling.</p><p>A lower-priced contouring and de-puffing option is listed separately. Similar names do not mean the services are interchangeable, so ask which one is being quoted.</p>` },
        { heading: "Plan for a private mobile setting", body: `<p>Body-focused appointments need an appropriate private space. Share whether the visit will be at a home, hotel, office, gym, or venue so Dan can confirm access and setup. The exact preparation, clothing, duration, and aftercare should come from Dan for the service being booked.</p>` },
        { heading: "Keep expectations specific", body: `<p>Photos, testimonials, and descriptions can imply guaranteed or typical physical changes even when the wording is vague. This guide therefore does not promise inches lost, fat loss, permanent contour changes, or a particular result. Ask what the exact device is intended to do, what evidence supports that use, how progress would be measured, and what variability to expect.</p>` },
        { heading: "What to include in your request", body: `<p>Send your city, the area you want to discuss, preferred timing, and whether you are considering one appointment or want information about a series. Dan can then explain the current options without assuming that one plan fits everyone.</p>` }
      ],
      refs: ["ftc"],
      related: ["cryofacial-appointment", "mobile-cryotherapy-appointment", "questions-before-booking"]
    },
    {
      slug: "cryofacial-appointment",
      order: "12",
      category: "Facials",
      topic: "CryoSkin & facials",
      status: "Service guide",
      title: "Cryofacial Appointments: The Two Mobile Cryo Pro Options",
      displayTitle: "Cryofacial appointments: the two Mobile Cryo Pro options.",
      description: "How the listed CryoSkin 3.0 facial and localized liquid-nitrogen cryofacial differ at the service-menu level—and what to ask before booking.",
      readTime: "4 min read",
      image: "/assets/client-shoulder-assessment.jpg",
      imageAlt: "Dan speaking with a client before a mobile appointment",
      takeaways: [
        "Mobile Cryo Pro lists two distinct facial services.",
        "The CryoSkin 3.0 facial is currently listed at $175; the localized option is quoted before booking.",
        "Exact procedure details and realistic expectations should be confirmed directly with Dan."
      ],
      sections: [
        { heading: "Two services, not two names for the same thing", body: `<p>Mobile Cryo Pro lists a CryoSkin 3.0 facial and a localized liquid-nitrogen cryofacial. They use different service descriptions, and the word “cryo” alone does not explain the equipment, exposure, or expected experience. Ask Dan to compare the options before choosing.</p>` },
        { heading: "Current pricing", body: `<p>The CryoSkin 3.0 facial is currently listed at $175. The localized liquid-nitrogen cryofacial is quoted before booking. Confirm the final price, travel considerations, and any package terms before scheduling.</p>` },
        { heading: "Questions to ask before the visit", body: `<ul class="article-check-list"><li>Which facial service are we discussing?</li><li>What equipment and cooling method does it use?</li><li>What preparation and aftercare are required?</li><li>What skin conditions, sensitivities, medications, or recent procedures affect eligibility?</li><li>What result is realistic, and what is not promised?</li></ul>` },
        { heading: "Be conservative with facial skin", body: `<p>Facial skin concerns can overlap with medical or dermatologic conditions. Share relevant history and seek a licensed clinician's guidance when you have an active skin problem, recent procedure, impaired sensation, unusual reaction to cold, or uncertainty about safety. A mobile wellness service should not diagnose a skin condition.</p>` },
        { heading: "Request the right appointment", body: `<p>Include the facial option you are considering, your location, preferred date, and any question you want answered before booking. Dan can clarify the difference without making you decode the menu on your own.</p>` }
      ],
      refs: [],
      related: ["cryoskin-body-appointment", "cryotherapy-safety", "questions-before-booking"]
    },
    {
      slug: "equine-barn-visit",
      order: "13",
      category: "Equine",
      topic: "Mobile visits",
      status: "Veterinarian-first guide",
      title: "Planning a Mobile Equine Cryotherapy Visit",
      displayTitle: "Planning a mobile equine cryotherapy visit.",
      description: "A barn-side logistics guide that keeps veterinary diagnosis, treatment decisions, and return-to-work advice with the horse's veterinarian.",
      readTime: "4 min read",
      image: "/assets/mobile-recovery-home-setup.jpg",
      imageAlt: "Compact equipment prepared for a mobile appointment",
      takeaways: [
        "Involve the horse's veterinarian when the visit relates to an injury, disease, lameness, or rehabilitation plan.",
        "Share the barn location, requested area, timing, and handling considerations before scheduling.",
        "This guide does not claim to treat laminitis, tendon injury, arthritis, swelling, or performance problems."
      ],
      sections: [
        { heading: "Start with the veterinarian when health is involved", body: `<p>Cold-related equine research is highly specific to the method, body area, duration, and condition. Evidence involving continuous distal-limb ice-water cooling does not establish what a brief localized mobile device will do. When a request involves lameness, injury, disease, rehabilitation, or return to work, the horse's veterinarian should direct the medical plan.</p>` },
        { heading: "Send the practical details", body: `<p>Include the barn address, preferred date, the area you want to discuss, who will handle the horse, and whether a veterinarian has provided instructions. Dan can confirm the current mobile service options, travel feasibility, price, and any site requirements before the visit.</p>` },
        { heading: "Create a calm, workable setup", body: `<p>A suitable appointment depends on safe access, appropriate restraint and handling, the horse's behavior, and a location where equipment can be used without creating avoidable risk. Do not assume that a human appointment workflow transfers to a horse.</p>` },
        { heading: "Keep roles clear", body: `<p>Mobile Cryo Pro should not diagnose the horse, prescribe a medical treatment, change medication, or decide when the horse can return to training. The veterinarian's instructions come first, and a session should stop if the horse becomes distressed or the setup is not safe.</p>` },
        { heading: "Ask for specifics before scheduling", body: `<p>Confirm the exact equipment, selected area, session plan, price, veterinarian involvement, stop procedure, and who is responsible for handling the horse. Clear expectations protect the horse, owner, veterinarian, and provider.</p>` }
      ],
      refs: [],
      related: ["mobile-cryotherapy-appointment", "questions-before-booking", "choose-a-provider"]
    },
    {
      slug: "north-bay-mobile-cryotherapy",
      order: "14",
      category: "North Bay",
      topic: "Mobile visits",
      status: "Local service guide",
      title: "Mobile Cryotherapy in Sonoma, Marin & the North Bay",
      displayTitle: "Mobile cryotherapy in Sonoma, Marin and the North Bay.",
      description: "Where Mobile Cryo Pro travels, which private settings can work, and the details that make an availability request easier to answer.",
      readTime: "4 min read",
      image: "/assets/recovery-knee-assessment-home.jpg",
      imageAlt: "A private mobile appointment in a home setting",
      takeaways: [
        "Sonoma and Marin are the primary service areas.",
        "Napa, Solano, and San Francisco are available by request.",
        "Homes, hotels, gyms, offices, wineries, events, and other suitable private venues can be considered."
      ],
      sections: [
        { heading: "A service-area business, not a storefront", body: `<p>Mobile Cryo Pro brings its listed services to approved private locations. That can remove a separate clinic trip from the day, but the address still needs to work for access, privacy, setup, and the service requested.</p>` },
        { heading: "Primary and by-request areas", body: `<p>Sonoma and Marin are the primary service areas. Napa, Solano, and San Francisco are available by request. Availability depends on the date, route, location, and type of visit, so a city name on the map is not a guarantee of a specific time slot.</p>` },
        { heading: "Settings that may work", body: `<p>Current site information lists homes, hotels, gyms, offices, wineries, private events, and training facilities. A venue visit may require advance permission, a private area, parking or loading instructions, and coordination with staff. Share those constraints at the start.</p>` },
        { heading: "How to get a useful answer quickly", body: `<p>Send the city or ZIP code, service or goal, preferred date and time window, number of people, and venue type. If it is a hotel, workplace, gym, winery, or event, mention any access rules. Dan can then confirm whether the route and setting are workable.</p>` },
        { heading: "Plan groups differently", body: `<p>Groups, teams, offices, retreats, and events need more coordination than a single private appointment. Include the estimated participant count and schedule so Dan can discuss timing and current group options rather than treating the visit like a standard one-person request.</p>` }
      ],
      refs: [],
      related: ["mobile-cryotherapy-appointment", "questions-before-booking", "cryoskin-body-appointment"]
    }
  );
})();
