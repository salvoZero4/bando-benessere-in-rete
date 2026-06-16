(function () {
  "use strict";

  const root = document.querySelector("#management-content");
  const newsDialog = document.querySelector("#news-dialog");
  const eventDialog = document.querySelector("#event-dialog");
  const newsForm = document.querySelector("#news-form");
  const eventForm = document.querySelector("#event-form");
  const preview = document.querySelector("#image-preview");
  const previewImage = preview?.querySelector("img");
  const newsDialogTitle = document.querySelector("#news-dialog-title");
  const newsSubmitButton = document.querySelector("[data-news-submit]");

  let imageData = "";
  let imageName = "";
  let editingNewsId = "";
  let newsItems = [];
  let eventItems = [];

  function escapeHtml(value = "") {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function asArray(value) {
    return Array.isArray(value) ? value : [];
  }

  function readStoredArray(key, fallback) {
    if (!key) return asArray(fallback);
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? asArray(JSON.parse(stored)) : asArray(fallback);
    } catch (error) {
      return asArray(fallback);
    }
  }

  function saveArray(key, items) {
    if (!key) return;
    window.localStorage.setItem(key, JSON.stringify(items));
  }

  function formatDate(value) {
    if (!value) return "Data non indicata";
    const date = new Date(`${value}T00:00:00`);
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat("it-IT", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  }

  function dayMonth(value) {
    const date = new Date(`${value}T00:00:00`);
    if (Number.isNaN(date.getTime())) return { day: "--", month: "" };
    return {
      day: new Intl.DateTimeFormat("it-IT", { day: "2-digit" }).format(date),
      month: new Intl.DateTimeFormat("it-IT", { month: "short" })
        .format(date)
        .replace(".", ""),
    };
  }

  function todayValue() {
    return new Date().toISOString().slice(0, 10);
  }

  function loadManagementData() {
    const data = window.siteContent?.management;
    if (!data) throw new Error("File dati dell'area gestione mancante.");
    return {
      ...data,
      items: readStoredArray(data.storageKey, data.items),
      events: {
        ...(data.events || {}),
        items: readStoredArray(data.eventStorageKey, data.events?.items),
      },
    };
  }

  function saveNewsItems() {
    saveArray(window.siteContent.management.storageKey, newsItems);
  }

  function saveEventItems() {
    saveArray(window.siteContent.management.eventStorageKey, eventItems);
  }

  function imageBlock(item) {
    if (item.image) {
      return `<img src="${escapeHtml(item.image)}" alt="Immagine della news ${escapeHtml(item.title)}" loading="lazy" />`;
    }
    return `
      <div class="management-news-card__placeholder" aria-hidden="true">
        <svg viewBox="0 0 48 48">
          <rect x="5" y="8" width="38" height="32" rx="4" />
          <circle cx="17" cy="19" r="4" />
          <path d="m8 36 10-10 7 7 5-5 10 8" />
        </svg>
        <span>${escapeHtml(item.imageName || "Immagine non caricata")}</span>
      </div>`;
  }

  function newsTemplate(item) {
    return `
      <article class="management-news-card" data-news-id="${escapeHtml(item.id)}">
        <div class="management-news-card__media">
          ${imageBlock(item)}
        </div>
        <div class="management-news-card__body">
          <div class="management-news-card__meta">
            <span>${escapeHtml(item.status || "Pubblicata")}</span>
            <time datetime="${escapeHtml(item.date)}">${escapeHtml(formatDate(item.date))}</time>
          </div>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.text)}</p>
          <div class="management-card-actions" aria-label="Azioni per ${escapeHtml(item.title)}">
            <button class="button button--ghost button--compact" type="button" data-edit-news="${escapeHtml(item.id)}">Modifica</button>
            <button class="button button--danger button--compact" type="button" data-delete-news="${escapeHtml(item.id)}">Cancella</button>
          </div>
        </div>
      </article>`;
  }

  function eventTemplate(item) {
    const parts = dayMonth(item.date);
    return `
      <article class="management-event-card" data-event-id="${escapeHtml(item.id)}">
        <time class="management-event-date" datetime="${escapeHtml(item.date)}">
          <strong>${escapeHtml(parts.day)}</strong>
          <span>${escapeHtml(parts.month)}</span>
        </time>
        <div>
          <span class="management-news-card__meta">${escapeHtml(formatDate(item.date))}</span>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.description)}</p>
          <small>${escapeHtml(item.place)}</small>
          <div class="management-card-actions">
            <button class="button button--danger button--compact" type="button" data-delete-event="${escapeHtml(item.id)}">Cancella evento</button>
          </div>
        </div>
      </article>`;
  }

  function getStats(data) {
    const configuredStats = asArray(data.stats);
    const dynamicStats = configuredStats.length
      ? configuredStats
      : [
          { label: "Comunicazioni", value: "0" },
          { label: "Eventi simulati", value: "0" },
          { label: "Stato area", value: "Simulazione" },
        ];

    return dynamicStats.map((stat, index) => {
      const label = stat.label || "";
      if (index === 0 || label.toLowerCase().includes("comunicazioni")) {
        return { ...stat, value: String(newsItems.length) };
      }
      if (label.toLowerCase().includes("event")) {
        return { ...stat, value: String(eventItems.length) };
      }
      return stat;
    });
  }

  function statsTemplate(data) {
    return getStats(data)
      .map(
        (stat) =>
          `<article><span>${escapeHtml(stat.label)}</span><strong>${escapeHtml(stat.value)}</strong></article>`,
      )
      .join("");
  }

  function renderManagement(data) {
    const events = data.events || {};
    root.innerHTML = `
      <section class="management-hero" aria-labelledby="management-title">
        <div class="shell management-hero__grid">
          <div>
            <p class="eyebrow">${escapeHtml(data.eyebrow)}</p>
            <h1 id="management-title">${escapeHtml(data.title)}</h1>
            <p>${escapeHtml(data.description)}</p>
          </div>
          <div class="management-panel">
            <span class="management-panel__status">Accesso personale</span>
            <strong>Simulazione CMS</strong>
            <p>Nessuna modifica viene inviata online. News ed eventi restano salvati nel browser.</p>
          </div>
        </div>
      </section>

      <section class="management-dashboard">
        <div class="shell">
          <div class="management-stats">
            ${statsTemplate(data)}
          </div>

          <div class="management-toolbar">
            <div>
              <p class="eyebrow">Archivio news</p>
              <h2>Elenco notizie</h2>
            </div>
            <button class="button button--primary" type="button" data-open-news-dialog>
              ${escapeHtml(data.addButton)}
            </button>
          </div>
          <div class="management-list" id="management-news-list">
            ${
              newsItems.length
                ? newsItems.map(newsTemplate).join("")
                : `<p class="empty-state">${escapeHtml(data.emptyMessage)}</p>`
            }
          </div>

          <div class="management-toolbar management-toolbar--spaced">
            <div>
              <p class="eyebrow">${escapeHtml(events.eyebrow || "Agenda")}</p>
              <h2>${escapeHtml(events.title || "Eventi")}</h2>
            </div>
            <button class="button button--primary" type="button" data-open-event-dialog>
              ${escapeHtml(events.addButton || "Aggiungi evento")}
            </button>
          </div>
          <div class="management-event-list" id="management-event-list">
            ${
              eventItems.length
                ? eventItems.map(eventTemplate).join("")
                : `<p class="empty-state">${escapeHtml(events.emptyMessage || "Non sono presenti eventi inseriti dal personale.")}</p>`
            }
          </div>
        </div>
      </section>`;
  }

  function refreshStats() {
    const stats = document.querySelector(".management-stats");
    if (stats) {
      stats.innerHTML = statsTemplate(window.siteContent.management);
    }
  }

  function refreshNewsList() {
    const list = document.querySelector("#management-news-list");
    if (!list) return;
    list.innerHTML = newsItems.length
      ? newsItems.map(newsTemplate).join("")
      : `<p class="empty-state">${escapeHtml(window.siteContent.management.emptyMessage)}</p>`;
    refreshStats();
  }

  function refreshEventList() {
    const list = document.querySelector("#management-event-list");
    const config = window.siteContent.management.events || {};
    if (!list) return;
    list.innerHTML = eventItems.length
      ? eventItems.map(eventTemplate).join("")
      : `<p class="empty-state">${escapeHtml(config.emptyMessage || "Non sono presenti eventi inseriti dal personale.")}</p>`;
    refreshStats();
  }

  function resetNewsForm(item) {
    imageData = item?.image || "";
    imageName = item?.imageName || "";
    editingNewsId = item?.id || "";
    newsForm.reset();
    newsForm.elements.title.value = item?.title || "";
    newsForm.elements.date.value = item?.date || todayValue();
    newsForm.elements.text.value = item?.text || "";
    newsDialogTitle.textContent = item ? "Modifica news" : "Aggiungi news";
    newsSubmitButton.textContent = item ? "Salva modifiche" : "Pubblica";
    preview.hidden = !imageData;
    if (imageData) {
      previewImage.src = imageData;
    } else {
      previewImage.removeAttribute("src");
    }
  }

  function resetEventForm() {
    eventForm.reset();
    eventForm.elements.date.value = todayValue();
  }

  function openNewsDialog(item) {
    resetNewsForm(item);
    newsDialog.showModal();
    newsForm.elements.title.focus();
  }

  function closeNewsDialog() {
    newsDialog.close();
  }

  function openEventDialog() {
    resetEventForm();
    eventDialog.showModal();
    eventForm.elements.title.focus();
  }

  function closeEventDialog() {
    eventDialog.close();
  }

  function editNews(id) {
    const item = newsItems.find((news) => news.id === id);
    if (item) openNewsDialog(item);
  }

  function deleteNews(id) {
    newsItems = newsItems.filter((news) => news.id !== id);
    saveNewsItems();
    refreshNewsList();
  }

  function deleteEvent(id) {
    eventItems = eventItems.filter((event) => event.id !== id);
    saveEventItems();
    refreshEventList();
  }

  function bindMobileNav() {
    const navToggle = document.querySelector(".nav-toggle");
    const mainNav = document.querySelector(".main-nav");
    let navScrollPosition = 0;

    function setMobileNavOpen(open) {
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.querySelector(".sr-only").textContent = open
        ? "Chiudi il menu"
        : "Apri il menu";
      mainNav.classList.toggle("is-open", open);

      if (open) {
        navScrollPosition = window.scrollY;
        document.body.style.position = "fixed";
        document.body.style.top = `-${navScrollPosition}px`;
        document.body.style.right = "0";
        document.body.style.left = "0";
        document.body.classList.add("is-nav-open");
        return;
      }

      document.body.classList.remove("is-nav-open");
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.right = "";
      document.body.style.left = "";
      const previousScrollBehavior =
        document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, navScrollPosition);
      document.documentElement.style.scrollBehavior = previousScrollBehavior;
    }

    navToggle.addEventListener("click", () => {
      const open = navToggle.getAttribute("aria-expanded") === "true";
      setMobileNavOpen(!open);
    });

    mainNav.addEventListener("click", (event) => {
      if (!event.target.closest("a")) return;
      setMobileNavOpen(false);
    });
  }

  function bindInteractions() {
    document.addEventListener("click", (event) => {
      const editButton = event.target.closest("[data-edit-news]");
      const deleteButton = event.target.closest("[data-delete-news]");
      const deleteEventButton = event.target.closest("[data-delete-event]");

      if (event.target.closest("[data-open-news-dialog]")) openNewsDialog();
      if (event.target.closest("[data-close-news-dialog]")) closeNewsDialog();
      if (event.target.closest("[data-open-event-dialog]")) openEventDialog();
      if (event.target.closest("[data-close-event-dialog]")) closeEventDialog();
      if (editButton) editNews(editButton.dataset.editNews);
      if (deleteButton) deleteNews(deleteButton.dataset.deleteNews);
      if (deleteEventButton) deleteEvent(deleteEventButton.dataset.deleteEvent);
    });

    newsDialog.addEventListener("click", (event) => {
      if (event.target === newsDialog) closeNewsDialog();
    });

    eventDialog.addEventListener("click", (event) => {
      if (event.target === eventDialog) closeEventDialog();
    });

    newsForm.elements.image.addEventListener("change", (event) => {
      const file = event.target.files?.[0];
      if (!file) {
        if (!editingNewsId) {
          imageData = "";
          imageName = "";
          preview.hidden = true;
        }
        return;
      }
      imageName = file.name;
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        imageData = String(reader.result || "");
        previewImage.src = imageData;
        preview.hidden = false;
      });
      reader.readAsDataURL(file);
    });

    newsForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!newsForm.reportValidity()) return;

      const item = {
        id: editingNewsId || `news-${Date.now()}`,
        title: newsForm.elements.title.value.trim(),
        text: newsForm.elements.text.value.trim(),
        date: newsForm.elements.date.value,
        image: imageData,
        imageName,
        status: "Pubblicata",
      };

      newsItems = editingNewsId
        ? newsItems.map((news) => (news.id === editingNewsId ? item : news))
        : [item, ...newsItems];
      saveNewsItems();
      refreshNewsList();
      closeNewsDialog();
    });

    eventForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!eventForm.reportValidity()) return;

      const item = {
        id: `event-${Date.now()}`,
        date: eventForm.elements.date.value,
        title: eventForm.elements.title.value.trim(),
        description: eventForm.elements.description.value.trim(),
        place: eventForm.elements.place.value.trim(),
      };

      eventItems = [item, ...eventItems];
      saveEventItems();
      refreshEventList();
      closeEventDialog();
    });

    const backToTop = document.querySelector(".back-to-top");
    backToTop.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "auto" }),
    );
    const updateBackToTop = () => {
      backToTop.hidden = window.scrollY < 650;
    };
    window.addEventListener("scroll", updateBackToTop, { passive: true });
    updateBackToTop();
    bindMobileNav();
  }

  try {
    const data = loadManagementData();
    newsItems = asArray(data.items);
    eventItems = asArray(data.events?.items);
    renderManagement(data);
    bindInteractions();
    root.setAttribute("aria-busy", "false");
    window.managementData = { ready: true, news: newsItems, events: eventItems };
  } catch (error) {
    console.error(error);
    root.innerHTML = `
      <section class="section"><div class="shell data-error" role="alert">
        <p class="eyebrow">Area gestione non disponibile</p>
        <h1>Non è stato possibile caricare il pannello.</h1>
        <p>${escapeHtml(error.message)}</p>
      </div></section>`;
    root.setAttribute("aria-busy", "false");
    window.managementData = { ready: false, error: error.message };
  }
})();
