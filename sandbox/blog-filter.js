(() => {
  "use strict";
  const cards = [...document.querySelectorAll("[data-guide-card]")];
  const filters = [...document.querySelectorAll("[data-topic-filter]")];
  const search = document.querySelector("[data-guide-search]");
  const count = document.querySelector("[data-guide-count]");
  const empty = document.querySelector("[data-guide-empty]");
  if (!cards.length || !search) return;

  let topic = "All guides";
  const apply = () => {
    const query = search.value.trim().toLowerCase();
    let visible = 0;
    cards.forEach((card) => {
      const topicMatch = topic === "All guides" || card.dataset.topic === topic;
      const searchMatch = !query || card.dataset.search.includes(query);
      card.hidden = !(topicMatch && searchMatch);
      if (!card.hidden) visible += 1;
    });
    count.textContent = `${visible} guide${visible === 1 ? "" : "s"}`;
    empty.hidden = visible !== 0;
  };

  filters.forEach((button) => button.addEventListener("click", () => {
    topic = button.dataset.topicFilter;
    filters.forEach((candidate) => candidate.setAttribute("aria-pressed", String(candidate === button)));
    apply();
  }));
  document.querySelectorAll("[data-topic-shortcut]").forEach((link) => link.addEventListener("click", () => {
    const match = filters.find((button) => button.dataset.topicFilter === link.dataset.topicShortcut);
    if (match) match.click();
  }));
  search.addEventListener("input", apply);

  const requestedTopic = new URLSearchParams(window.location.search).get("topic");
  const requestedButton = filters.find((button) => button.dataset.topicFilter === requestedTopic);
  if (requestedButton) requestedButton.click();
})();
