(function () {
  "use strict";

  const data = window.portalData || {
    environmentDetails: {},
    events: [],
    services: [],
    doctors: [],
    news: [],
  };
  const icons = {
    pharmacy:
      '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M12 5h8v22h-8zM5 12h22v8H5z"/></svg>',
    parapharmacy:
      '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M8 11h16l-1 16H9L8 11Z"/><path d="M12 11V8a4 4 0 0 1 8 0v3M13 18h6m-3-3v6"/></svg>',
    doctor:
      '<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="12.5" cy="7.5" r="4"/><path d="M4.5 28v-4.2c0-5.3 3.2-8.8 8-8.8s8 3.5 8 8.8V28"/><path class="doctor-stethoscope" d="M9 15.8v3a3.8 3.8 0 0 0 7.6 0v-3M16.6 18.8v2.5c0 1.5 1.2 2.7 2.7 2.7"/><circle class="doctor-stethoscope-head" cx="20.5" cy="24" r="2.1"/><path class="doctor-medical-cross" d="M22 5h2.4V2.6h3V5h2.4v3h-2.4v2.4h-3V8H22z"/></svg>',
    hands:
      '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M4 18c5-1 8 1 11 5l1 2 1-2c3-4 6-6 11-5M6 16V8m20 8V8"/><path d="M6 9c3 0 5 2 5 5v2m15-7c-3 0-5 2-5 5v2"/></svg>',
    phone:
      '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M9 5 5 8c1 10 9 18 19 19l3-4-6-5-3 3c-4-2-7-5-9-9l3-3-3-4Z"/></svg>',
    email:
      '<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="4" y="7" width="24" height="18" rx="2"/><path d="m5 9 11 9L27 9"/></svg>',
  };

  const eventList = document.querySelector("#event-list");
  const serviceList = document.querySelector("#service-list");
  const doctorList = document.querySelector("#doctor-list");
  const newsList = document.querySelector("#news-list");
  const searchDialog = document.querySelector("#search-dialog");
  const environmentDialog = document.querySelector("#environment-dialog");
  const communicationDialog = document.querySelector("#communication-dialog");
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
            ${
              event.time
                ? `<span>
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
              ${escapeHtml(event.time)}
            </span>`
                : ""
            }
            <span>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-6 7-12a7 7 0 1 0-14 0c0 6 7 12 7 12Z"/><circle cx="12" cy="9" r="2.5"/></svg>
              ${escapeHtml(event.place)}
            </span>
          </div>
        </div>
      </article>`;
  }

  function renderEvents(filter = "tutti") {
    const filtered =
      filter === "tutti"
        ? data.events.slice(0, 3)
        : data.events.filter((event) => event.category === filter);

    eventList.innerHTML = filtered.length
      ? filtered.map(eventTemplate).join("")
      : '<p class="empty-state">Nessun evento disponibile per questa categoria.</p>';
  }

  function renderServices() {
    serviceList.innerHTML = data.services
      .map(
        (service) => `
      <article class="service-card">
        <span class="service-card__icon">${icons[service.icon] || icons.phone}</span>
        <h3>${escapeHtml(service.title)}</h3>
        <p>${escapeHtml(service.description)}</p>
        <a href="${escapeHtml(service.href)}"${service.href.startsWith("http") ? ' target="_blank" rel="noopener"' : ""}>
          ${escapeHtml(service.action)} <span aria-hidden="true">${service.href.startsWith("http") ? "↗" : "→"}</span>
        </a>
      </article>
    `,
      )
      .join("");
  }

  function renderDoctors() {
    doctorList.innerHTML = data.doctors
      .map(
        (doctor) => `
      <article class="doctor-card">
        <div class="doctor-card__heading">
          <span class="doctor-card__icon">${icons.doctor}</span>
          <div>
            <span>Medicina generale</span>
            <h4>${escapeHtml(doctor.name)}</h4>
          </div>
        </div>
        <p class="doctor-card__address">${escapeHtml(doctor.address)}</p>
        <div class="doctor-card__contacts">
          ${doctor.phones
            .map(
              (phone) => `
            <a
              href="tel:${escapeHtml(phone.replaceAll(" ", ""))}"
              aria-label="Chiama ${escapeHtml(doctor.name)} al numero ${escapeHtml(phone)}"
            >
              <span class="doctor-contact__icon">${icons.phone}</span>
              <span>Chiama</span>
            </a>
          `,
            )
            .join("")}
          <a
            href="mailto:${escapeHtml(doctor.email)}"
            aria-label="Invia un'email a ${escapeHtml(doctor.name)}"
          >
            <span class="doctor-contact__icon">${icons.email}</span>
            <span>Invia email</span>
          </a>
        </div>
        ${doctor.note ? `<p class="doctor-card__note">${escapeHtml(doctor.note)}</p>` : ""}
        <details>
          <summary>Orari di ricevimento</summary>
          <dl class="doctor-hours">
            ${doctor.hours
              .map(
                ([day, time]) => `
              <div>
                <dt>${escapeHtml(day)}</dt>
                <dd>${escapeHtml(time)}</dd>
              </div>
            `,
              )
              .join("")}
          </dl>
        </details>
      </article>
    `,
      )
      .join("");
  }

  function renderNews() {
    newsList.innerHTML = data.news
      .map(
        (news, index) => `
      <article class="news-card">
        <span class="news-card__meta">${escapeHtml(news.type)} · ${escapeHtml(news.date)}</span>
        <h3>${escapeHtml(news.title)}</h3>
        <p>${escapeHtml(news.description)}</p>
        <button
          class="news-card__action"
          type="button"
          data-news-index="${index}"
          aria-haspopup="dialog"
        >
          Leggi la comunicazione <span aria-hidden="true">→</span>
        </button>
      </article>
    `,
      )
      .join("");
  }

  function allSearchableItems() {
    return [
      ...data.events.map((item) => ({
        type: "Evento",
        title: item.title,
        description: `${item.day} ${item.month} · ${item.place}`,
        search: `${item.title} ${item.description} ${item.search}`,
        target: "#eventi",
      })),
      ...data.services.map((item) => ({
        type: "Servizio",
        title: item.title,
        description: item.description,
        search: `${item.title} ${item.description} ${item.search}`,
        target: "#servizi",
      })),
      ...data.doctors.map((item) => ({
        type: "Medico di base",
        title: item.name,
        description: item.address,
        search: `${item.name} ${item.address} ${item.phones.join(" ")} ${item.search}`,
        target: "#medici-base",
      })),
      ...data.news.map((item) => ({
        type: "Notizia",
        title: item.title,
        description: item.description,
        search: `${item.title} ${item.description} ${item.search}`,
        target: "#news",
      })),
      {
        type: "Area",
        title: "Ambiente e natura",
        description:
          "Riserva di Pizzo Cane, Pizzo Trigna e Grotta Mazzamuto, spiagge e iniziative per la sostenibilità.",
        search:
          "ambiente natura riserva pizzo cane pizzo trigna grotta mazzamuto spiagge cala sciabica passi capannina catena sostenibilità raccolta differenziata plastic free educazione ambientale scuola",
        target: "#territorio",
      },
      {
        type: "Area",
        title: "Associazioni",
        description: "Realtà sportive, culturali e sociali del territorio.",
        search: "associazioni comunità volontariato cultura sport famiglie",
        target: "#associazioni",
      },
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

  function openCommunication(index, trigger) {
    const news = data.news[index];
    if (!communicationDialog || !news) return;

    communicationDialog.querySelector("#communication-title").textContent =
      news.title;
    communicationDialog.querySelector("#communication-subtitle").textContent =
      news.description;
    communicationDialog.querySelector("#communication-type").textContent =
      news.type;
    communicationDialog.querySelector("#communication-date").textContent =
      news.date;

    const content = communicationDialog.querySelector("#communication-content");
    content.replaceChildren(
      ...(news.content || [news.description]).map((paragraph) => {
        const element = document.createElement("p");
        element.textContent = paragraph;
        return element;
      }),
    );

    communicationDialog._returnFocus = trigger;
    communicationDialog.showModal();
  }

  function closeCommunication() {
    if (communicationDialog?.open) communicationDialog.close();
  }

  function openEnvironmentDetail(detailId, trigger) {
    const detail = data.environmentDetails?.[detailId];
    if (!environmentDialog || !detail) return;

    environmentDialog.dataset.theme = detail.theme || "forest";
    environmentDialog.querySelector("#environment-dialog-title").textContent =
      detail.title;
    environmentDialog.querySelector(
      "#environment-dialog-subtitle",
    ).textContent = detail.subtitle;
    environmentDialog.querySelector("#environment-dialog-type").textContent =
      detail.type;

    const content = environmentDialog.querySelector(
      "#environment-dialog-content",
    );
    content.replaceChildren(
      ...(detail.content || [detail.subtitle]).map((paragraph) => {
        const element = document.createElement("p");
        element.textContent = paragraph;
        return element;
      }),
    );

    environmentDialog._returnFocus = trigger;
    environmentDialog.showModal();
  }

  function closeEnvironmentDetail() {
    if (environmentDialog?.open) environmentDialog.close();
  }

  function scrollToTarget(targetId, updateHash = true) {
    const target = document.getElementById(targetId);
    if (!target) return false;

    const scrollPadding =
      Number.parseFloat(
        window.getComputedStyle(document.documentElement).scrollPaddingTop,
      ) || 0;
    const targetPosition =
      target.getBoundingClientRect().top + window.scrollY - scrollPadding;
    const distance = Math.abs(window.scrollY - targetPosition);
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion || distance > 1400) {
      const root = document.documentElement;
      const previousScrollBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      window.scrollTo({ top: targetPosition, behavior: "auto" });
      window.requestAnimationFrame(() => {
        root.style.scrollBehavior = previousScrollBehavior;
      });
    } else {
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }

    if (updateHash && window.history && window.history.replaceState) {
      window.history.replaceState(null, "", `#${targetId}`);
    }

    return true;
  }

  function scrollToTop() {
    const root = document.documentElement;
    root.style.scrollBehavior = "auto";
    window.scrollTo({ top: 0, behavior: "auto" });

    if (window.history && window.history.replaceState) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
    }
  }

  function performSearch(term) {
    const container = document.querySelector("#search-results");
    const normalized = term.trim().toLocaleLowerCase("it");

    if (normalized.length < 2) {
      container.innerHTML =
        "<p>Scrivi almeno due caratteri per cercare tra eventi, servizi e notizie.</p>";
      return;
    }

    const results = allSearchableItems().filter((item) =>
      item.search.toLocaleLowerCase("it").includes(normalized),
    );

    container.innerHTML = results.length
      ? results
          .map(
            (item) => `
          <a class="search-result" href="${item.target}" data-search-result>
            <span>${escapeHtml(item.type)}</span>
            <strong>${escapeHtml(item.title)}</strong>
            <small>${escapeHtml(item.description)}</small>
          </a>
        `,
          )
          .join("")
      : `<p>Nessun risultato per “${escapeHtml(term)}”. Prova con sport, farmacia, natura o famiglie.</p>`;
  }

  renderEvents();
  renderServices();
  renderDoctors();
  renderNews();

  function enableHorizontalKeyboardScroll(container, cardSelector) {
    container.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

      const card = container.querySelector(cardSelector);
      if (!card) return;

      event.preventDefault();
      const gap =
        Number.parseFloat(window.getComputedStyle(container).columnGap) || 0;
      const direction = event.key === "ArrowRight" ? 1 : -1;
      container.scrollBy({
        left: direction * (card.getBoundingClientRect().width + gap),
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    });
  }

  enableHorizontalKeyboardScroll(serviceList, ".service-card");
  enableHorizontalKeyboardScroll(doctorList, ".doctor-card");

  document.querySelectorAll("[data-open-search]").forEach((button) => {
    button.addEventListener("click", () => openSearch());
  });

  document.querySelectorAll("[data-close-search]").forEach((button) => {
    button.addEventListener("click", closeSearch);
  });

  document.querySelectorAll("[data-search-term]").forEach((button) => {
    button.addEventListener("click", () =>
      openSearch(button.dataset.searchTerm),
    );
  });

  document.querySelector("#hero-search").addEventListener("submit", (event) => {
    event.preventDefault();
    openSearch(document.querySelector("#hero-search-input").value);
  });

  document
    .querySelector("#dialog-search")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      performSearch(document.querySelector("#dialog-search-input").value);
    });

  document
    .querySelector("#dialog-search-input")
    .addEventListener("input", (event) => {
      performSearch(event.target.value);
    });

  document
    .querySelector("#search-results")
    .addEventListener("click", (event) => {
      if (event.target.closest("[data-search-result]")) closeSearch();
    });

  document.addEventListener("click", (event) => {
    const scrollLink = event.target.closest("[data-scroll-to]");
    if (scrollLink) {
      const targetId = scrollLink.dataset.scrollTo;
      if (document.getElementById(targetId)) {
        event.preventDefault();
        closeSearch();
        scrollToTarget(targetId);
      }
    }

    const topButton = event.target.closest("[data-scroll-top]");
    if (topButton) {
      event.preventDefault();
      scrollToTop();
    }
  });

  newsList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-news-index]");
    if (button) {
      openCommunication(Number.parseInt(button.dataset.newsIndex, 10), button);
    }
  });

  document
    .querySelector("#territorio")
    .addEventListener("click", (event) => {
      const button = event.target.closest("[data-environment-detail]");
      if (button) {
        openEnvironmentDetail(button.dataset.environmentDetail, button);
      }
    });

  document
    .querySelectorAll("[data-close-environment]")
    .forEach((button) =>
      button.addEventListener("click", closeEnvironmentDetail),
    );

  environmentDialog.addEventListener("close", () => {
    environmentDialog._returnFocus?.focus();
    environmentDialog._returnFocus = null;
  });

  document
    .querySelectorAll("[data-close-communication]")
    .forEach((button) => button.addEventListener("click", closeCommunication));

  communicationDialog.addEventListener("close", () => {
    communicationDialog._returnFocus?.focus();
    communicationDialog._returnFocus = null;
  });

  [searchDialog, environmentDialog, communicationDialog, cmsDialog].forEach(
    (dialog) => {
      dialog.addEventListener("click", (event) => {
        if (event.target === dialog) dialog.close();
      });
    },
  );

  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".main-nav");
  navToggle.addEventListener("click", () => {
    const open = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!open));
    navToggle.querySelector(".sr-only").textContent = open
      ? "Apri il menu"
      : "Chiudi il menu";
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

  document
    .querySelector("#cms-demo-button")
    .addEventListener("click", () => cmsDialog.showModal());
  document.querySelectorAll("[data-close-cms]").forEach((button) => {
    button.addEventListener("click", () => cmsDialog.close());
  });

  const contactForm = document.querySelector("#contact-form");
  const contactFormStatus = document.querySelector("#contact-form-status");
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    const name = contactForm.elements.name.value.trim();
    contactFormStatus.textContent = `Grazie${name ? `, ${name}` : ""}. Il messaggio è stato acquisito nella simulazione del portale.`;
    contactFormStatus.hidden = false;
    contactForm.reset();
    contactFormStatus.focus();
  });

  const backToTop = document.querySelector(".back-to-top");
  const updateBackToTop = () => {
    backToTop.hidden = window.scrollY < 650;
  };
  window.addEventListener("scroll", updateBackToTop, { passive: true });
  updateBackToTop();
})();
