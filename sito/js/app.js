(function () {
  "use strict";

  const data = window.portalData || { events: [], services: [], news: [] };
  const icons = {
    pharmacy: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M12 5h8v22h-8zM5 12h22v8H5z"/></svg>',
    doctor: '<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="10" r="5"/><path d="M7 28c0-7 3-11 9-11s9 4 9 11M8 5v7a4 4 0 0 0 8 0V5"/></svg>',
    hands: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M4 18c5-1 8 1 11 5l1 2 1-2c3-4 6-6 11-5M6 16V8m20 8V8"/><path d="M6 9c3 0 5 2 5 5v2m15-7c-3 0-5 2-5 5v2"/></svg>',
    phone: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M9 5 5 8c1 10 9 18 19 19l3-4-6-5-3 3c-4-2-7-5-9-9l3-3-3-4Z"/></svg>'
  };

  const eventList = document.querySelector("#event-list");
  const serviceList = document.querySelector("#service-list");
  const newsList = document.querySelector("#news-list");
  const searchDialog = document.querySelector("#search-dialog");
  const cmsDialog = document.querySelector("#cms-dialog");

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function eventTemplate(event) {
    return `
      <article class="event-card">
        <time class="event-date" datetime="2026-06-${escapeHtml(event.day)}">
          <strong>${escapeHtml(event.day)}</strong>
          <span>${escapeHtml(event.month)}</span>
        </time>
        <div class="event-card__content">
          <span class="event-card__category">${escapeHtml(event.label)}</span>
          <h3>${escapeHtml(event.title)}</h3>
          <p>${escapeHtml(event.description)}</p>
          <div class="event-card__meta">
            <span>
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
              ${escapeHtml(event.time)}
            </span>
            <span>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-6 7-12a7 7 0 1 0-14 0c0 6 7 12 7 12Z"/><circle cx="12" cy="9" r="2.5"/></svg>
              ${escapeHtml(event.place)}
            </span>
          </div>
        </div>
      </article>`;
  }

  function renderEvents(filter = "tutti") {
    const filtered = filter === "tutti"
      ? data.events.slice(0, 3)
      : data.events.filter((event) => event.category === filter);

    eventList.innerHTML = filtered.length
      ? filtered.map(eventTemplate).join("")
      : '<p class="empty-state">Nessun evento disponibile per questa categoria.</p>';
  }

  function renderServices() {
    serviceList.innerHTML = data.services.map((service) => `
      <article class="service-card">
        <span class="service-card__icon">${icons[service.icon] || icons.phone}</span>
        <h3>${escapeHtml(service.title)}</h3>
        <p>${escapeHtml(service.description)}</p>
        <button type="button" data-service-search="${escapeHtml(service.title)}">
          Apri la scheda <span aria-hidden="true">→</span>
        </button>
      </article>
    `).join("");
  }

  function renderNews() {
    newsList.innerHTML = data.news.map((news) => `
      <article class="news-card">
        <span class="news-card__meta">${escapeHtml(news.type)} · ${escapeHtml(news.date)}</span>
        <h3>${escapeHtml(news.title)}</h3>
        <p>${escapeHtml(news.description)}</p>
        <a href="#news">Leggi la comunicazione <span aria-hidden="true">→</span></a>
      </article>
    `).join("");
  }

  function allSearchableItems() {
    return [
      ...data.events.map((item) => ({
        type: "Evento",
        title: item.title,
        description: `${item.day} ${item.month} · ${item.place}`,
        search: `${item.title} ${item.description} ${item.search}`,
        target: "#eventi"
      })),
      ...data.services.map((item) => ({
        type: "Servizio",
        title: item.title,
        description: item.description,
        search: `${item.title} ${item.description} ${item.search}`,
        target: item.target
      })),
      ...data.news.map((item) => ({
        type: "Notizia",
        title: item.title,
        description: item.description,
        search: `${item.title} ${item.description} ${item.search}`,
        target: "#news"
      })),
      {
        type: "Area",
        title: "Ambiente e natura",
        description: "Belvedere, mare e itinerari a passo lento.",
        search: "ambiente natura mare belvedere sentieri passeggiata camminata",
        target: "#territorio"
      },
      {
        type: "Area",
        title: "Associazioni",
        description: "Realtà sportive, culturali e sociali del territorio.",
        search: "associazioni comunità volontariato cultura sport famiglie",
        target: "#associazioni"
      }
    ];
  }

  function openSearch(term = "") {
    if (!searchDialog) return;
    searchDialog.showModal();
    const input = searchDialog.querySelector("#dialog-search-input");
    input.value = term;
    window.setTimeout(() => input.focus(), 50);
    performSearch(term);
  }

  function closeSearch() {
    if (searchDialog && searchDialog.open) searchDialog.close();
  }

  function performSearch(term) {
    const container = document.querySelector("#search-results");
    const normalized = term.trim().toLocaleLowerCase("it");

    if (normalized.length < 2) {
      container.innerHTML = "<p>Scrivi almeno due caratteri per cercare tra eventi, servizi e notizie.</p>";
      return;
    }

    const results = allSearchableItems().filter((item) =>
      item.search.toLocaleLowerCase("it").includes(normalized)
    );

    container.innerHTML = results.length
      ? results.map((item) => `
          <a class="search-result" href="${item.target}" data-search-result>
            <span>${escapeHtml(item.type)}</span>
            <strong>${escapeHtml(item.title)}</strong>
            <small>${escapeHtml(item.description)}</small>
          </a>
        `).join("")
      : `<p>Nessun risultato per “${escapeHtml(term)}”. Prova con sport, farmacia, natura o famiglie.</p>`;
  }

  function setPreference(className, storageKey, button, activeLabel, inactiveLabel) {
    const active = document.body.classList.toggle(className);
    button.textContent = active ? activeLabel : inactiveLabel;
    try {
      localStorage.setItem(storageKey, active ? "true" : "false");
    } catch (error) {
      // The preference still works for the current session.
    }
  }

  function restorePreference(className, storageKey, button, activeLabel) {
    try {
      if (localStorage.getItem(storageKey) === "true") {
        document.body.classList.add(className);
        button.textContent = activeLabel;
      }
    } catch (error) {
      // Storage can be unavailable in private contexts; no action is needed.
    }
  }

  renderEvents();
  renderServices();
  renderNews();

  document.querySelectorAll("[data-event-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-event-filter]").forEach((item) => {
        const selected = item === button;
        item.classList.toggle("is-active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
      renderEvents(button.dataset.eventFilter);
    });
  });

  document.querySelector("#show-all-events").addEventListener("click", () => {
    document.querySelectorAll("[data-event-filter]").forEach((item) => {
      const selected = item.dataset.eventFilter === "tutti";
      item.classList.toggle("is-active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    eventList.innerHTML = data.events.map(eventTemplate).join("");
    eventList.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  document.querySelectorAll("[data-open-search]").forEach((button) => {
    button.addEventListener("click", () => openSearch());
  });

  document.querySelectorAll("[data-close-search]").forEach((button) => {
    button.addEventListener("click", closeSearch);
  });

  document.querySelectorAll("[data-search-term]").forEach((button) => {
    button.addEventListener("click", () => openSearch(button.dataset.searchTerm));
  });

  document.querySelector("#hero-search").addEventListener("submit", (event) => {
    event.preventDefault();
    openSearch(document.querySelector("#hero-search-input").value);
  });

  document.querySelector("#dialog-search").addEventListener("submit", (event) => {
    event.preventDefault();
    performSearch(document.querySelector("#dialog-search-input").value);
  });

  document.querySelector("#dialog-search-input").addEventListener("input", (event) => {
    performSearch(event.target.value);
  });

  document.querySelector("#search-results").addEventListener("click", (event) => {
    if (event.target.closest("[data-search-result]")) closeSearch();
  });

  serviceList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-service-search]");
    if (button) openSearch(button.dataset.serviceSearch);
  });

  [searchDialog, cmsDialog].forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
  });

  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".main-nav");
  navToggle.addEventListener("click", () => {
    const open = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!open));
    navToggle.querySelector(".sr-only").textContent = open ? "Apri il menu" : "Chiudi il menu";
    mainNav.classList.toggle("is-open", !open);
    document.body.classList.toggle("is-nav-open", !open);
  });

  mainNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.querySelector(".sr-only").textContent = "Apri il menu";
      mainNav.classList.remove("is-open");
      document.body.classList.remove("is-nav-open");
    }
  });

  document.querySelector("#cms-demo-button").addEventListener("click", () => cmsDialog.showModal());
  document.querySelectorAll("[data-close-cms]").forEach((button) => {
    button.addEventListener("click", () => cmsDialog.close());
  });

  const contrastToggle = document.querySelector("#contrast-toggle");
  const fontToggle = document.querySelector("#font-toggle");
  restorePreference("high-contrast", "benessere-contrast", contrastToggle, "Ripristina contrasto");
  restorePreference("large-text", "benessere-font", fontToggle, "Ripristina testo");

  contrastToggle.addEventListener("click", () => {
    setPreference("high-contrast", "benessere-contrast", contrastToggle, "Ripristina contrasto", "Aumenta contrasto");
  });

  fontToggle.addEventListener("click", () => {
    setPreference("large-text", "benessere-font", fontToggle, "Ripristina testo", "Ingrandisci testo");
  });
})();
