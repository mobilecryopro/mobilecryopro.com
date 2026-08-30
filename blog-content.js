(() => {
  "use strict";

  const sources = {
    algafly: { label: "Algafly & George (2007), nerve conduction and pain thresholds", url: "https://pubmed.ncbi.nlm.nih.gov/17224445/" },
    whiteWells: { label: "White & Wells (2013), physiological effects of cooling", url: "https://pubmed.ncbi.nlm.nih.gov/24004719/" },
    allan: { label: "Allan et al. (2022), overview of cooling modalities and recovery", url: "https://pubmed.ncbi.nlm.nih.gov/35195747/" },
    cochrane: { label: "Costello et al. (2015), Cochrane review of whole-body cryotherapy", url: "https://pubmed.ncbi.nlm.nih.gov/26383887/" },
    bleakley: { label: "Bleakley et al. (2004), systematic review of ice for acute soft-tissue injury", url: "https://pubmed.ncbi.nlm.nih.gov/14754753/" },
    postop: { label: "2026 systematic review of cryotherapy after musculoskeletal surgery", url: "https://pubmed.ncbi.nlm.nih.gov/41047148/" },
    marathon: { label: "Wilson et al. (2018), whole-body cryotherapy vs cold-water immersion after a marathon", url: "https://pubmed.ncbi.nlm.nih.gov/29127510/" },
    temperatures: { label: "Costello et al. (2012), temperature responses to whole-body cryotherapy and cold-water immersion", url: "https://pubmed.ncbi.nlm.nih.gov/23139763/" },
    perfusion: { label: "Khoshnevis et al. (2014), cutaneous blood-flow response after cooling", url: "https://pubmed.ncbi.nlm.nih.gov/24562697/" },
    nerveCases: { label: "Malone et al. (1992), cryotherapy-related peripheral nerve injury case series", url: "https://pubmed.ncbi.nlm.nih.gov/16558167/" },
    nerveSafety: { label: "Covington & Bassett (1993), nerve injury from prolonged cooling", url: "https://pubmed.ncbi.nlm.nih.gov/27439042/" },
    urticaria: { label: "Prosty et al. (2022), cold urticaria systematic review", url: "https://pubmed.ncbi.nlm.nih.gov/34673287/" },
    raynaud: { label: "Belch et al. (2017), Raynaud phenomenon guidance", url: "https://pubmed.ncbi.nlm.nih.gov/28895508/" },
    fda: { label: "FDA, avoiding injury with circulating hot/cold therapy devices", url: "https://www.fda.gov/consumers/consumer-updates/cold-facts-help-avoid-injury-water-circulating-hotcold-therapy-devices" },
    ftc: { label: "FTC Health Products Compliance Guidance", url: "https://www.ftc.gov/business-guidance/resources/health-products-compliance-guidance" }
  };

  const articles = [
    {
      slug: "complete-guide",
      order: "01",
      category: "Foundation",
      title: "Localized Cryotherapy: What It Is & What to Expect",
      displayTitle: "Localized cryotherapy: what it is and what to expect.",
      description: "What localized cryotherapy is, how it differs from other cold methods, what a visit may involve, and what the research actually supports.",
      readTime: "9 min read",
      image: "assets/recovery-shoulder-cryo-home.jpg",
      imageAlt: "Practitioner positioning localized cryotherapy equipment near a client's shoulder",
      grade: "Evidence varies by modality and outcome",
      takeaways: [
        "Cryotherapy is an umbrella term, not one uniform treatment.",
        "Cooling physiology is established; many health and recovery outcomes remain uncertain or condition-specific.",
        "Ask what equipment and cooling method a provider uses before applying research to a service."
      ],
      sections: [
        { heading: "Cryotherapy means several different things", body: `<p>In research and everyday use, <em>cryotherapy</em> can describe an ice pack, cold-water immersion, a cooling sleeve, a localized stream of cold air or gas, or a chamber that exposes most of the body to very cold air. These methods differ in temperature, duration, tissue area, depth of cooling, and risk. They should not be treated as interchangeable.</p><p>Mobile Cryo Pro offers localized cryotherapy. Research involving ice, immersion, or whole-body chambers should not be assumed to establish outcomes for a localized service unless the device, protocol, population, and measured result are meaningfully comparable.</p>` },
        { heading: "What cooling can do inside the body", body: `<p>Cooling can lower skin and underlying tissue temperature. Depending on dose and location, it can alter local blood flow, metabolism, and nerve conduction. A small controlled study of ankle cooling found slower nerve conduction and higher pain thresholds, which helps explain temporary numbing effects.<sup><a href="#source-algafly">1</a></sup> Reviews of cooling physiology describe similar pathways but stress that response depends on the method and protocol.<sup><a href="#source-whiteWells">2</a></sup></p><div class="article-callout"><strong>Mechanism is not outcome</strong><p>A measurable change in temperature, circulation, or nerve conduction does not prove that tissue heals faster, swelling resolves, or a medical condition improves.</p></div>` },
        { heading: "Where cold may fit", body: `<p>Some people use cold because it can briefly change how an area feels, and some research reports short-term changes in perceived soreness after exercise. Results vary. A Cochrane review found insufficient, very low-quality evidence for whole-body cryotherapy after exercise,<sup><a href="#source-cochrane">3</a></sup> while broader reviews describe mixed findings that depend on the method and timing.<sup><a href="#source-allan">4</a></sup></p><p>That is a reason to keep expectations specific—not to promise faster healing, disease treatment, “detoxification,” immune enhancement, permanent pain relief, or better athletic performance.</p>` },
        { heading: "What a localized visit should clarify", body: `<p>Before exposure, a provider should identify the exact modality, treatment area, expected sensation, planned duration, protective barriers, stop procedure, and relevant safety screen. You should understand what will happen during the appointment and be able to stop the session immediately.</p>` },
        { heading: "Who should seek medical guidance first", body: `<p>Cold can cause skin or nerve injury when exposure is excessive or sensation and circulation are impaired. Published cases document peripheral nerve injury after cryotherapy,<sup><a href="#source-nerveCases">5</a></sup> and the FDA warns that people with circulation or sensation problems may face higher injury risk with hot/cold therapy devices.<sup><a href="#source-fda">6</a></sup> Cold urticaria and Raynaud phenomenon also require special caution because cold can provoke reactions.<sup><a href="#source-urticaria">7</a></sup><sup><a href="#source-raynaud">8</a></sup></p><p>This educational guide cannot determine individual eligibility. People with a diagnosed condition, unexplained symptoms, impaired sensation or circulation, pregnancy-related questions, or medication concerns should consult an appropriately licensed healthcare professional.</p>` },
        { heading: "The practical bottom line", body: `<p>“Cryotherapy” covers several very different ways of using cold. The short-term effects of cooling are easier to show than meaningful long-term health results. A trustworthy provider should explain the exact method, avoid guarantees, screen carefully, and never present a temporary change in sensation as treatment of a disease.</p>` }
      ],
      refs: ["algafly", "whiteWells", "cochrane", "allan", "nerveCases", "fda", "urticaria", "raynaud"]
    },
    {
      slug: "how-cryotherapy-works",
      order: "02",
      category: "How it works",
      title: "How Cryotherapy Works: What Happens Inside Your Body",
      displayTitle: "How cryotherapy works inside the body.",
      description: "A plain-English look at cooling, circulation, nerve signals, temporary changes in sensation, and where the science stops.",
      readTime: "7 min read",
      image: "assets/client-shoulder-assessment.jpg",
      imageAlt: "Practitioner assessing a client's shoulder before a service",
      grade: "Physiology supported; clinical translation uncertain",
      takeaways: ["Dose and modality determine how much tissue cools.", "Nerve and blood-flow effects can help explain temporary sensations.", "Physiology alone does not establish healing or disease treatment."],
      sections: [
        { heading: "First, the tissue has to cool", body: `<p>Heat moves from warmer tissue toward the colder application. The amount and depth of cooling depend on the temperature difference, duration, body area, tissue composition, contact method, and whether the exposure is wet, dry, compressed, or moving. That is why a chamber, an ice pack, immersion, and a localized device can create different temperature profiles.<sup><a href="#source-temperatures">1</a></sup></p>` },
        { heading: "Local blood flow changes", body: `<p>Cooling usually narrows nearby blood vessels and reduces blood flow at the skin for a time. One study comparing several cooling devices found that the size of this change varied by device.<sup><a href="#source-perfusion">2</a></sup> A blood-flow change is something researchers can measure; by itself, it does not show that an injury is healing.</p>` },
        { heading: "Nerve conduction and pain perception", body: `<p>Nerves conduct signals more slowly as local temperature drops. In a small study of 23 male sports participants, ankle cooling to a skin temperature of 10°C reduced measured nerve-conduction velocity and increased pain threshold and tolerance.<sup><a href="#source-algafly">3</a></sup> This supports a temporary sensory mechanism. It does not establish long-term pain relief or treatment of a diagnosed pain condition.</p>` },
        { heading: "Changes researchers can measure", body: `<p>Cooling can change how much energy local tissue uses and can affect chemical signals in experimental settings. Reviews describe these as possible pieces of a recovery response, while emphasizing that temperature, timing, and method matter.<sup><a href="#source-whiteWells">4</a></sup> A lab marker can move without a person feeling better, moving better, or healing faster.</p>` },
        { heading: "Rewarming is part of the response", body: `<p>When the exposure ends, tissues rewarm at different rates. Deeper tissues generally cool and rewarm differently from skin. Claims about a dramatic "rush" of circulation or whole-body systemic reset should not be made without direct measurements for the exact protocol.</p>` },
        { heading: "What those changes can—and cannot—tell you", body: `<div class="evidence-two-column"><div><strong class="evidence-grade evidence-grade-supported">What we know</strong><ul><li>Cold can lower tissue temperature.</li><li>It can affect local blood flow and nerve signals.</li><li>The result depends on how the cold is applied.</li></ul></div><div><strong class="evidence-grade evidence-grade-unsupported">What that does not prove</strong><ul><li>Faster tissue repair.</li><li>Treatment of arthritis or injury.</li><li>Better performance or permanent pain relief.</li></ul></div></div>` }
      ],
      refs: ["temperatures", "perfusion", "algafly", "whiteWells"]
    },
    {
      slug: "cryotherapy-safety",
      order: "03",
      category: "Safety",
      title: "Is Cryotherapy Safe? Risks, Side Effects & Who Should Avoid It",
      displayTitle: "Is cryotherapy safe?",
      description: "The known risks of cold exposure, conservative screening questions, stop signs, and the limits of online safety advice.",
      readTime: "8 min read",
      image: "assets/recovery-knee-consultation.jpg",
      imageAlt: "Practitioner speaking with a client before a localized service",
      grade: "Risk depends on modality, dose, health, and supervision",
      takeaways: ["No cold exposure is risk-free.", "Impaired circulation or sensation can increase injury risk.", "Cold-triggered disorders and concerning skin changes require special caution."],
      sections: [
        { heading: "Safety is not a yes-or-no property", body: `<p>Risk depends on the device, temperature, duration, treatment area, protective layers, supervision, and the person's health. A brief, monitored localized exposure is different from prolonged ice contact or whole-body chamber exposure. A provider should never use a general statement such as "cryotherapy is safe" as a substitute for screening and protocol.</p>` },
        { heading: "Known harms include skin and nerve injury", body: `<p>Excessive cold can cause pain, burns, blistering, tissue injury, or nerve damage. Case reports and case series document peripheral nerve injuries following cryotherapy, particularly when exposure was prolonged or poorly controlled.<sup><a href="#source-nerveCases">1</a></sup><sup><a href="#source-nerveSafety">2</a></sup> Rare reports do not provide a precise incidence rate, but they show that injury is possible.</p>` },
        { heading: "Circulation and sensation matter", body: `<p>The FDA's guidance for circulating hot/cold devices says people with diabetes, neuropathy, poor circulation, or reduced ability to feel temperature may be at higher risk and should discuss use with a healthcare professional.<sup><a href="#source-fda">3</a></sup> The FDA page applies to those devices specifically, but the safety principle is relevant: if someone cannot reliably feel or respond to excessive cold, ordinary warning sensations may not protect them.</p>` },
        { heading: "Cold-triggered conditions need special caution", body: `<p>Cold urticaria can cause hives and, in some affected people, systemic reactions including anaphylaxis. A systematic review estimated anaphylaxis in roughly one-fifth of patients studied with cold urticaria, though estimates varied and apply only to people with that disorder.<sup><a href="#source-urticaria">4</a></sup> Raynaud phenomenon is characterized by cold-triggered vasospasm and color changes in digits.<sup><a href="#source-raynaud">5</a></sup> These are reasons to seek medical guidance, not conditions for a nonmedical provider to diagnose.</p>` },
        { heading: "Stop signs during or after exposure", body: `<p>Stop immediately and seek appropriate help for intense or increasing pain, burning, marked numbness, unusual skin discoloration, welts, blistering, swelling, breathing difficulty, faintness, or symptoms that persist or worsen. The FDA specifically lists numbness, pain, burning, blisters, welts, swelling, and color change as reasons to stop device use and contact a clinician.<sup><a href="#source-fda">6</a></sup></p>` },
        { heading: "Questions a provider should answer", body: `<ul class="article-check-list"><li>What exact device and exposure method will be used?</li><li>What health conditions, medications, or skin findings change eligibility?</li><li>How are duration and distance controlled?</li><li>How can I stop the session immediately?</li><li>What training and emergency procedures are in place?</li><li>What aftercare or delayed symptoms should I watch for?</li></ul><div class="article-callout"><strong>Ask before booking</strong><p>Confirm the exact device, contraindications, safety instructions, and stop procedure with the provider before beginning a session.</p></div>` }
      ],
      refs: ["nerveCases", "nerveSafety", "fda", "urticaria", "raynaud"]
    },
    {
      slug: "cryotherapy-vs-ice-packs",
      order: "04",
      category: "Comparison",
      title: "Cryotherapy vs Ice Packs: Which Works Better?",
      displayTitle: "Cryotherapy vs ice packs.",
      description: "Why the honest comparison depends on the goal, dose, device, tissue depth, safety, convenience, and direct evidence.",
      readTime: "7 min read",
      image: "assets/recovery-knee-assessment-home.jpg",
      imageAlt: "Client receiving a knee assessment during a mobile appointment",
      grade: "No universal winner established",
      takeaways: ["Both are cold exposures, but delivery and dose differ.", "Direct head-to-head evidence for a specific localized device is needed to declare a winner.", "Convenience or comfort should not be marketed as superior medical efficacy."],
      sections: [
        { heading: "The short answer", body: `<p>Research does not establish one universal winner. An ice pack is a conductive, contact-based application. "Cryotherapy" may refer to many different systems, including localized air or gas exposure. Which is more appropriate depends on the goal, treatment area, desired tissue cooling, time, safety factors, and evidence for the exact protocol.</p>` },
        { heading: "Why dose matters more than the label", body: `<p>Temperature alone does not describe exposure. Contact, compression, moisture, duration, tissue thickness, and device distance influence cooling. Comparative research shows that even cold-water immersion and whole-body air exposure produce different skin, muscle, and core temperature responses.<sup><a href="#source-temperatures">1</a></sup> It is therefore not valid to assume a localized device reproduces ice-pack evidence.</p>` },
        { heading: "What ice research can tell us", body: `<p>A systematic review of ice for recent soft-tissue injuries found too little consistent research to identify one best method, duration, or schedule.<sup><a href="#source-bleakley">2</a></sup> More recent reviews after surgery find some small short-term changes in selected settings, but no consistent advantage for swelling or function.<sup><a href="#source-postop">3</a></sup></p>` },
        { heading: "What a localized service may change", body: `<p>A supervised localized service may offer controlled timing, access to hard-to-wrap areas, and a provider who monitors the exposure. Those are operational differences, not proof of greater clinical effectiveness. To claim better pain relief, recovery, or healing, Mobile Cryo Pro would need relevant head-to-head evidence for its exact device and protocol.</p>` },
        { heading: "A fair comparison checklist", body: `<div class="comparison-table-wrap"><table class="comparison-table"><thead><tr><th>Question</th><th>Ice pack</th><th>Localized service</th></tr></thead><tbody><tr><th scope="row">Exposure</th><td>Direct conductive contact, usually through a barrier</td><td>Depends on the device; verify air, gas, contact, distance, and temperature</td></tr><tr><th scope="row">Supervision</th><td>Often self-administered</td><td>Provider-monitored during an appointment</td></tr><tr><th scope="row">Evidence</th><td>Condition- and protocol-specific, with important limitations</td><td>Requires device- and protocol-specific evidence</td></tr><tr><th scope="row">Risk</th><td>Burn, skin, or nerve injury if misused</td><td>Risk depends on device, duration, area, screening, and operation</td></tr></tbody></table></div>` },
        { heading: "Bottom line", body: `<p>Choose based on a clearly defined purpose, an appropriate safety screen, and evidence that actually matches the method. If a provider says its technology "works better than ice," ask for a direct comparison involving that exact system and a meaningful patient outcome.</p>` }
      ],
      refs: ["temperatures", "bleakley", "postop"]
    },
    {
      slug: "cold-therapy-pain-inflammation",
      order: "05",
      category: "Pain & recovery",
      title: "How Cold Therapy Affects Pain and Inflammation",
      displayTitle: "How cold therapy affects pain and inflammation.",
      description: "What research supports about short-term sensory effects—and why broad anti-inflammatory or healing claims go too far.",
      readTime: "8 min read",
      image: "assets/client-knee-consultation.jpg",
      imageAlt: "Practitioner and client discussing a knee before a service",
      grade: "Title reframed: outcomes are not uniformly established",
      takeaways: ["Cooling can slow local nerve conduction and temporarily alter pain perception.", "Blood-flow and biomarker changes do not automatically improve healing.", "Pain and inflammation claims must name the condition, modality, and time frame."],
      sections: [
        { heading: "Why the details matter", body: `<p>It is easy to hear “cold reduces pain and inflammation” as a universal promise. The research is narrower. Cold can temporarily change sensation, blood flow, and some lab measurements, while results that matter day to day vary by the condition, cooling method, and timing.</p>` },
        { heading: "A plausible short-term pain mechanism", body: `<p>Local cooling can slow sensory nerve conduction and raise pain threshold. In one small controlled experiment, cooling the ankle to a skin temperature of 10°C reduced nerve-conduction velocity and increased pain threshold and tolerance.<sup><a href="#source-algafly">1</a></sup> That helps explain temporary numbing. It does not establish durable relief or correction of the cause of pain.</p>` },
        { heading: "Inflammation is not one simple target", body: `<p>Inflammation is part of the body's response to injury and training. Cooling may reduce local perfusion and influence metabolic or inflammatory signals,<sup><a href="#source-whiteWells">2</a></sup> but lower blood flow or a changed biomarker is not automatically a better clinical outcome. The important outcomes are how a person feels and functions, whether tissue recovers, and whether harms occur.</p>` },
        { heading: "What clinical reviews find", body: `<p>Evidence depends heavily on context. A 2026 review of cryotherapy after musculoskeletal surgery reported small average pain improvements that did not reach the authors' threshold for a clinically important difference, and found no substantial improvement in swelling or function.<sup><a href="#source-postop">3</a></sup> A Cochrane review of whole-body cryotherapy for post-exercise soreness found very low-quality, insufficient evidence.<sup><a href="#source-cochrane">4</a></sup></p><p>These findings should not be transferred directly to a localized mobile service. They demonstrate why “reduces pain and inflammation” needs a defined setting and outcome.</p>` },
        { heading: "A useful way to talk about it", body: `<div class="evidence-two-column"><div><strong class="evidence-grade evidence-grade-supported">Reasonable</strong><ul><li>Cold can temporarily affect sensation.</li><li>Response varies by person and method.</li><li>Different cold services have different evidence.</li></ul></div><div><strong class="evidence-grade evidence-grade-unsupported">Too broad</strong><ul><li>“Flushes inflammation.”</li><li>“Accelerates healing.”</li><li>“Treats chronic pain” without direct evidence for that use.</li></ul></div></div>` },
        { heading: "When pain needs evaluation", body: `<p>Cold can mask pain temporarily. New, severe, unexplained, worsening, or persistent pain—and pain with weakness, numbness, major swelling, deformity, fever, or loss of function—needs appropriate clinical evaluation rather than a wellness treatment.</p>` }
      ],
      refs: ["algafly", "whiteWells", "postop", "cochrane"]
    },
    {
      slug: "localized-vs-whole-body",
      order: "06",
      category: "Comparison",
      title: "Localized Cryotherapy vs Whole Body Cryotherapy",
      displayTitle: "Localized vs whole-body cryotherapy.",
      description: "How a targeted mobile service differs from a whole-body chamber—and why research about one should not be used to sell the other.",
      readTime: "7 min read",
      image: "assets/guides/guide-localized-vs-whole-body-v3.webp",
      imageAlt: "Athlete and practitioner discussing localized cryotherapy options",
      grade: "Distinct modalities; evidence cannot be transferred",
      takeaways: ["Localized exposure targets a smaller area; whole-body exposure cools most of the body in a chamber.", "Temperature and physiological responses differ across modalities.", "Whole-body studies do not validate localized service claims."],
      sections: [
        { heading: "The defining difference is exposure", body: `<p>Localized cryotherapy applies cold to a selected body area. Whole-body cryotherapy places most of the body in a chamber of very cold, dry air for a short period. That difference changes the surface area exposed, the temperature profile, the safety environment, and the questions a study can answer.</p>` },
        { heading: "Temperature responses are not interchangeable", body: `<p>Research comparing whole-body cryotherapy with cold-water immersion shows different skin, muscle, and core-temperature responses.<sup><a href="#source-temperatures">1</a></sup> More broadly, reviews emphasize that cooling method, dose, timing, and body area shape the physiological response.<sup><a href="#source-allan">2</a></sup> The same caution applies even more strongly when comparing a whole-body chamber to an unspecified localized device.</p>` },
        { heading: "Whole-body recovery evidence is uncertain", body: `<p>A Cochrane review located only four small eligible whole-body trials involving 64 participants, mostly young men, and rated the evidence very low quality. It concluded that evidence was insufficient to support whole-body cryotherapy for preventing or treating muscle soreness after exercise.<sup><a href="#source-cochrane">3</a></sup> In a marathon study, whole-body cryotherapy was not superior to cold-water immersion and expectancy effects may have influenced perceived recovery.<sup><a href="#source-marathon">4</a></sup></p>` },
        { heading: "What this means for localized providers", body: `<p>A localized provider cannot cite chamber studies as direct proof of better recovery, lower inflammation, or improved performance. Localized claims need studies that match the device, treatment area, dose, population, and meaningful outcome. Mechanistic research can explain possibilities, but should be labeled indirect.</p>` },
        { heading: "Operational and safety questions differ", body: `<div class="comparison-table-wrap"><table class="comparison-table"><thead><tr><th>Dimension</th><th>Localized</th><th>Whole-body</th></tr></thead><tbody><tr><th scope="row">Area</th><td>Selected body region</td><td>Most of the body</td></tr><tr><th scope="row">Systemic exposure</th><td>Usually lower, but device-dependent</td><td>Central to the procedure</td></tr><tr><th scope="row">Evidence needed</th><td>Exact local device, area, protocol, and outcome</td><td>Exact chamber protocol, population, and outcome</td></tr><tr><th scope="row">Safety review</th><td>Skin, sensation, circulation, local anatomy, device use</td><td>Whole-body exposure plus chamber-specific operational risks</td></tr></tbody></table></div>` },
        { heading: "Bottom line", body: `<p>“Cryotherapy” is too broad to function as evidence. Name the method first, then ask whether the research actually matches it. Choose a provider based on accurate service information rather than outcomes borrowed from a different form of cold exposure.</p>` }
      ],
      refs: ["temperatures", "allan", "cochrane", "marathon"]
    },
    {
      slug: "choose-a-provider",
      order: "07",
      category: "Buying guide",
      title: "How to Choose the Best Cryotherapy Provider",
      displayTitle: "How to choose a cryotherapy provider.",
      description: "An evidence-aware checklist for device transparency, training, screening, sanitation, consent, claims, and emergency readiness.",
      readTime: "6 min read",
      image: "assets/mobile-recovery-home-setup.jpg",
      imageAlt: "Practitioner setting up mobile recovery equipment in a private home space",
      grade: "Consumer checklist; no provider ranking implied",
      takeaways: ["A credible provider names the exact modality and its limits.", "Screening, sanitation, training, and stop procedures should be specific.", "Guarantees and borrowed evidence are warning signs."],
      sections: [
        { heading: "“Best” should mean transparent and appropriate", body: `<p>There is no universal best provider for every person or goal. A better question is whether a provider is transparent about its equipment, scope, training, safety procedures, evidence, costs, and limitations—and whether the service is appropriate for you.</p>` },
        { heading: "1. Ask for the exact modality and device", body: `<p>The provider should be able to name the system, explain whether it uses contact, air, gas, or another method, and describe how exposure is controlled. If the marketing cites research, ask whether the research used that device and protocol. Comparative studies show that cooling methods can create different temperature responses.<sup><a href="#source-temperatures">1</a></sup></p>` },
        { heading: "2. Evaluate the safety process", body: `<p>Look for a health-history screen, skin check when relevant, clear contraindications, informed consent, continuous monitoring, an immediate stop option, and documented response procedures. Cold-related nerve and skin injury is possible when exposure is excessive or misapplied.<sup><a href="#source-nerveCases">2</a></sup> People with impaired circulation or sensation may need medical guidance before cold-device use.<sup><a href="#source-fda">3</a></sup></p>` },
        { heading: "3. Verify training without confusing it with licensure", body: `<p>Ask what training the operator completed, who provided it, whether it is current, and what it covers. A manufacturer certificate is not the same as a medical license. The provider should describe its scope accurately and refer medical questions, diagnosis, and concerning symptoms to licensed clinicians.</p>` },
        { heading: "4. Inspect sanitation and privacy", body: `<p>For mobile visits, ask how equipment and contact surfaces are cleaned between clients, how clean and used items are separated, what space or power is required, and how private health information is handled in homes, hotels, gyms, or events.</p>` },
        { heading: "5. Pressure-test the claims", body: `<p>Health claims should match competent and reliable scientific evidence. The FTC warns that the overall message matters: testimonials, images, and before/after presentations can imply typical or objective results even when fine print is present.<sup><a href="#source-ftc">4</a></sup> Be cautious with guarantees, cure language, dramatic systemic claims, or studies from a different modality.</p>` },
        { heading: "6. Understand price, cancellation, and follow-up", body: `<p>Confirm the full cost, deposits, travel charges, session length, cancellation terms, package expiration, and how concerns are handled afterward. A professional provider should be comfortable giving you time to decide.</p><div class="article-callout"><strong>Before you book</strong><p>Ask the provider to explain the equipment, training, contraindications, sanitation practices, and emergency process in clear terms.</p></div>` }
      ],
      refs: ["temperatures", "nerveCases", "fda", "ftc"]
    },
    {
      slug: "questions-before-booking",
      order: "08",
      category: "Booking guide",
      title: "What Questions Should You Ask Before Booking Cryotherapy?",
      displayTitle: "Questions to ask before booking cryotherapy.",
      description: "A saveable checklist for comparing the service, safety process, realistic expectations, total cost, and practical details before booking.",
      readTime: "6 min read",
      image: "assets/guides/guide-questions-before-booking.webp",
      imageAlt: "Client and practitioner reviewing questions before a mobile appointment",
      grade: "Practical preparation; not medical clearance",
      takeaways: ["Define the goal and exact modality before comparing evidence.", "Ask how eligibility, exposure, stop signs, and follow-up are handled.", "Do not use a wellness booking to delay evaluation of concerning symptoms."],
      sections: [
        { heading: "Start with the purpose", body: `<ol class="question-list"><li><strong>What exact goal are we discussing?</strong><span>Temporary comfort, post-exercise soreness, or another clearly defined outcome?</span></li><li><strong>Is this a wellness service or medical treatment?</strong><span>Who handles diagnosis, clearance, or treatment decisions?</span></li><li><strong>What would make you refer me to a clinician instead?</strong><span>A responsible provider should recognize scope limits.</span></li></ol>` },
        { heading: "Identify the exposure", body: `<ol class="question-list" start="4"><li><strong>What device and cooling method will you use?</strong><span>Ask for the model, treatment area, duration, distance or contact method, and protective barriers.</span></li><li><strong>Does the research you cite match this system?</strong><span>Evidence about a chamber, immersion, or ice is not automatically evidence for a localized device.<sup><a href="#source-temperatures">1</a></sup></span></li><li><strong>What should I feel, and how do I stop?</strong><span>You should be able to end exposure immediately.</span></li></ol>` },
        { heading: "Ask about eligibility and risk", body: `<ol class="question-list" start="7"><li><strong>What conditions, medicines, or skin findings change eligibility?</strong><span>Discuss cold-triggered disorders and impaired circulation or sensation.</span></li><li><strong>What warning signs require stopping or follow-up?</strong><span>FDA cold-device guidance includes pain, burning, numbness, blisters, welts, swelling, and discoloration.<sup><a href="#source-fda">2</a></sup></span></li><li><strong>What training and emergency procedures do you have?</strong><span>Ask what the training covers and how an unexpected reaction is handled.</span></li></ol>` },
        { heading: "Ask for realistic evidence", body: `<ol class="question-list" start="10"><li><strong>What result is reasonably expected, and for how long?</strong><span>Look for uncertainty and individual variability, not guarantees.</span></li><li><strong>What are the alternatives?</strong><span>A provider should not present one service as the only path.</span></li><li><strong>Are testimonials or photos typical?</strong><span>The FTC treats implied messages in reviews and before/after imagery as advertising claims that need support.<sup><a href="#source-ftc">3</a></sup></span></li></ol>` },
        { heading: "Confirm the practical terms", body: `<ol class="question-list" start="13"><li><strong>What is the total cost?</strong><span>Include deposit, travel, packages, add-ons, and cancellation terms.</span></li><li><strong>What space, clothing, preparation, or aftercare is required?</strong><span>Instructions should be specific to the device and setting.</span></li><li><strong>How are equipment, privacy, and records handled?</strong><span>This matters especially for mobile home, hotel, gym, office, and event visits.</span></li></ol>` },
        { heading: "Do not book around a red flag", body: `<p>New, severe, unusual, worsening, or persistent symptoms need appropriate medical evaluation. A temporary numbing effect can change how pain feels without addressing its cause. A credible provider will not ask you to ignore warning signs or substitute a wellness service for needed care.</p><div class="article-callout"><strong>Save this list</strong><p>The quality of the answers matters more than the confidence with which they are delivered. Specifics, limits, and willingness to refer are positive signs.</p></div>` }
      ],
      refs: ["temperatures", "fda", "ftc"]
    }
  ];

  const escapeHtml = (value) => String(value).replace(/[&<>"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[character]);

  window.mobileCryoBlogCatalog = { sources, articles };

  const renderCard = (article) => `
    <article class="blog-card evidence-card">
      <a class="blog-card-image" href="guides/${encodeURIComponent(article.slug)}.html" aria-label="Read ${escapeHtml(article.title)}">
        <img src="${article.image}" alt="${escapeHtml(article.imageAlt)}" width="1600" height="1067" loading="lazy" />
        <span class="evidence-card-number" aria-hidden="true">${article.order}</span>
      </a>
      <div class="blog-card-copy">
        <div class="blog-meta-row"><span>${escapeHtml(article.category)}</span><span>${escapeHtml(article.readTime)}</span></div>
        <h3><a href="guides/${encodeURIComponent(article.slug)}.html">${escapeHtml(article.title)}</a></h3>
        <p>${escapeHtml(article.description)}</p>
        <a class="text-link" href="guides/${encodeURIComponent(article.slug)}.html">Explore this guide</a>
      </div>
    </article>`;

  const grid = document.querySelector("[data-blog-card-grid]");
  if (grid) grid.innerHTML = articles.map(renderCard).join("");

  const articleRoot = document.querySelector("[data-article-root]");
  if (!articleRoot) return;

  const slug = new URLSearchParams(window.location.search).get("guide") || "";
  const article = articles.find((entry) => entry.slug === slug);
  if (!article) return;

  document.title = `${article.title} | Mobile Cryo Pro`;
  const description = document.querySelector('meta[name="description"]');
  if (description) description.content = article.description;

  const referenceItems = article.refs.map((key, index) => {
    const source = sources[key];
    return `<li id="source-${key}"><a href="${source.url}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.label)}</a><span class="source-type">Source ${index + 1}</span></li>`;
  }).join("");

  const articleIndex = articles.findIndex((entry) => entry.slug === article.slug);
  const related = [articles[(articleIndex + 1) % articles.length], articles[(articleIndex + 2) % articles.length]];

  articleRoot.innerHTML = `
    <article class="article-shell evidence-article-shell">
      <header class="article-hero evidence-article-hero">
        <div class="article-hero-copy">
          <a class="blog-back-link" href="guides/index.html">Back to guides</a>
          <p class="eyebrow">${escapeHtml(article.category)} · Guide ${article.order} of 08</p>
          <h1>${escapeHtml(article.displayTitle)}</h1>
          <p>${escapeHtml(article.description)}</p>
          <div class="blog-meta-row"><span>Last reviewed July 21, 2026</span><span>${escapeHtml(article.readTime)}</span></div>
        </div>
        <figure class="article-hero-media"><img src="${article.image}" alt="${escapeHtml(article.imageAlt)}" width="1600" height="1067" /></figure>
      </header>
      <div class="article-layout">
        <aside class="article-sidebar evidence-sidebar">
          <p class="panel-label">Important</p>
          <p>This article provides general educational information, not medical advice, diagnosis, or a promise of results. Ask a qualified healthcare professional about personal medical concerns.</p>
          <nav aria-label="On this page"><strong>In this guide</strong><ol>${article.sections.map((section, index) => `<li><a href="#section-${index + 1}">${escapeHtml(section.heading)}</a></li>`).join("")}</ol></nav>
          <a class="button button-secondary" href="../services.html">View services</a>
        </aside>
        <div class="article-content evidence-article-content">
          <section class="key-takeaways" aria-labelledby="takeaways-heading"><p class="panel-label">Key takeaways</p><h2 id="takeaways-heading">What to know</h2><ul>${article.takeaways.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></section>
          ${article.sections.map((section, index) => `<section id="section-${index + 1}" class="article-section"><h2>${escapeHtml(section.heading)}</h2>${section.body}</section>`).join("")}
          <section class="article-sources" aria-labelledby="sources-heading"><p class="eyebrow">Sources</p><h2 id="sources-heading">Research and further reading</h2><ol class="reference-list">${referenceItems}</ol><p class="source-disclosure">Research may examine different forms of cold therapy, populations, and protocols. Each source is described in context and should not be treated as proof for every device or use.</p></section>
        </div>
      </div>
    </article>
    <section class="related-posts-section related-guides-section"><div class="section-heading"><p class="eyebrow">Related guides</p><h2>More topics to explore</h2></div><div class="blog-card-grid">${related.map(renderCard).join("")}</div></section>`;
})();
