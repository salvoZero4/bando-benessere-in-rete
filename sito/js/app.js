(async function () {
  "use strict";

  const requiredDataKeys = [
    "hero",
    "areas",
    "appointments",
    "environment",
    "sport",
    "health",
    "associations",
    "news",
    "closing",
    "contact",
    "partners",
  ];

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
    website:
      '<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="12"/><path d="M4 16h24M16 4c4 4 6 8 6 12s-2 8-6 12M16 4c-4 4-6 8-6 12s2 8 6 12"/></svg>',
    sport:
      '<svg viewBox="0 0 32 32"><path d="M7 23c4-1 7-4 8-8l1-5m0 0 5 5 5 1M16 10l4-4m-8 20 5-7 6 7"/><circle cx="22" cy="5" r="2.5"/></svg>',
    people:
      '<svg viewBox="0 0 32 32"><circle cx="11" cy="11" r="4"/><circle cx="23" cy="12" r="3"/><path d="M4 26c0-5 3-8 7-8s8 3 8 8m0-6c1-2 3-3 5-3 3 0 5 3 5 7"/></svg>',
    calendar:
      '<svg viewBox="0 0 32 32"><rect x="5" y="7" width="22" height="20" rx="3"/><path d="M10 4v6m12-6v6M5 14h22m-16 5h3m4 0h3m-10 4h3"/></svg>',
    health:
      '<svg viewBox="0 0 32 32"><path d="M16 27S5 21 5 12a6 6 0 0 1 11-3 6 6 0 0 1 11 3c0 9-11 15-11 15Z"/><path d="M10 16h4l2-5 3 9 2-4h3"/></svg>',
    leaf:
      '<svg viewBox="0 0 32 32"><path d="M27 5C16 5 8 10 7 19c8 2 15-1 20-14Z"/><path d="M6 27c3-8 8-13 17-18M12 20c-3-2-5-5-6-9"/></svg>',
    news:
      '<svg viewBox="0 0 32 32"><path d="M6 6h17v21H8a2 2 0 0 1-2-2V6Z"/><path d="M23 11h3v14a2 2 0 0 1-2 2M10 11h9m-9 5h9m-9 5h5"/></svg>',
    recycling:
      '<svg viewBox="0 0 32 32"><path d="M10 8h12m-10-3h8l1 3H11l1-3Z"/><path d="m9 11 1 15h12l1-15M14 14v8m4-8v8"/></svg>',
    "plastic-free":
      '<svg viewBox="0 0 32 32"><path d="M6 22c5 0 5-3 10-3s5 3 10 3M7 26h18"/><path d="M12 17V8h8v9M10 8h12M15 5h2"/></svg>',
    school:
      '<svg viewBox="0 0 32 32"><path d="M5 9.5 16 5l11 4.5L16 14 5 9.5Z"/><path d="M9 12v7c4 3 10 3 14 0v-7M27 10v8"/><path d="M16 27c0-5 3-8 8-9-1 5-3 8-8 9Z"/></svg>',
  };

  function escapeHtml(value = "") {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function safeToken(value = "") {
    return String(value).toLowerCase().replace(/[^a-z0-9_-]/g, "");
  }

  function asArray(value) {
    return Array.isArray(value) ? value : [];
  }

  function linkAttributes(href = "") {
    return String(href).startsWith("http")
      ? ' target="_blank" rel="noopener"'
      : "";
  }

  function emptyState(message) {
    return `<p class="empty-state">${escapeHtml(message)}</p>`;
  }

  function imageData(image, fallback = {}) {
    if (typeof image === "string") {
      return { src: image, alt: fallback.alt || "" };
    }
    return {
      src: image?.src || fallback.src || "",
      alt: image?.alt || fallback.alt || "",
      position: image?.position || fallback.position || "center",
    };
  }

  function contentMedia(image, label, fileName, className = "") {
    const media = imageData(image);
    return `
      <div class="content-media ${escapeHtml(className)}">
        <div class="content-media__placeholder" aria-hidden="true">
          <span>${escapeHtml(label)}</span>
          <small>${escapeHtml(fileName || media.src)}</small>
        </div>
        ${
          media.src
            ? `<img src="${escapeHtml(media.src)}" alt="${escapeHtml(media.alt || label)}" loading="lazy" style="object-position:${escapeHtml(media.position)}" data-content-image />`
            : ""
        }
      </div>`;
  }

  function bindContentImages(container = document) {
    container.querySelectorAll("[data-content-image]").forEach((image) => {
      const hideBrokenImage = () => {
        image.hidden = true;
      };

      image.addEventListener(
        "error",
        hideBrokenImage,
        { once: true },
      );

      if (image.complete && image.naturalWidth === 0) {
        hideBrokenImage();
      }
    });
  }

  const italianMonths = {
    gennaio: 0,
    febbraio: 1,
    marzo: 2,
    aprile: 3,
    maggio: 4,
    giugno: 5,
    luglio: 6,
    agosto: 7,
    settembre: 8,
    ottobre: 9,
    novembre: 10,
    dicembre: 11,
  };

  function comparableDate(value = "", fallback = "past", precision = "start") {
    if (!value) return fallback === "future" ? Number.POSITIVE_INFINITY : 0;
    const normalized = String(value).trim().toLocaleLowerCase("it");
    const isoMatch = normalized.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (isoMatch) {
      return new Date(`${isoMatch[1]}-${isoMatch[2]}-${isoMatch[3]}T00:00:00`).getTime();
    }

    const longMatch = normalized.match(/^(\d{1,2})\s+([a-zà]+)\s+(\d{4})$/i);
    if (longMatch && italianMonths[longMatch[2]] !== undefined) {
      return new Date(
        Number(longMatch[3]),
        italianMonths[longMatch[2]],
        Number(longMatch[1]),
      ).getTime();
    }

    const monthMatch = normalized.match(/^([a-zà]+)\s+(\d{4})$/i);
    if (monthMatch && italianMonths[monthMatch[1]] !== undefined) {
      const month = italianMonths[monthMatch[1]];
      const day = precision === "end" ? new Date(Number(monthMatch[2]), month + 1, 0).getDate() : 1;
      return new Date(Number(monthMatch[2]), month, day).getTime();
    }

    const parsed = new Date(value).getTime();
    if (!Number.isNaN(parsed)) return parsed;
    return fallback === "future" ? Number.POSITIVE_INFINITY : 0;
  }

  function startOfToday() {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  }

  function sortEventsAscending(items) {
    return [...asArray(items)].sort(
      (first, second) =>
        comparableDate(first.date, "future") - comparableDate(second.date, "future"),
    );
  }

  function sortNewsDescending(items) {
    return [...asArray(items)].sort(
      (first, second) =>
        comparableDate(second.date, "past", "end") -
        comparableDate(first.date, "past", "end"),
    );
  }

  function splitEventsByDate(items) {
    const today = startOfToday();
    const future = [];
    const past = [];
    asArray(items).forEach((item) => {
      const timestamp = comparableDate(item.date, "future");
      if (timestamp < today) {
        past.push(item);
      } else {
        future.push(item);
      }
    });
    return {
      future: sortEventsAscending(future),
      past: sortEventsAscending(past).reverse(),
    };
  }

  function formatStoredNewsDate(value = "") {
    if (!value) return "";
    const parsed = new Date(`${value}T00:00:00`);
    if (Number.isNaN(parsed.getTime())) return value;
    return new Intl.DateTimeFormat("it-IT", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(parsed);
  }

  function readStoredManagementNews(managementData = {}) {
    const key = managementData.storageKey;
    if (!key) return [];
    try {
      const stored = window.localStorage.getItem(key);
      return asArray(stored ? JSON.parse(stored) : []);
    } catch (error) {
      return [];
    }
  }

  function normalizeNewsKey(item = {}) {
    return String(item.title || "").trim().toLocaleLowerCase("it");
  }

  function managementItemToNews(item = {}) {
    const text = item.text || item.description || "";
    const date = formatStoredNewsDate(item.date);
    const managedImage = imageData(item.image, {
      alt: `Immagine della comunicazione ${item.title || ""}`,
    });
    return {
      date,
      type: item.type || "Comunicazione pubblicata",
      title: item.title || "Nuova comunicazione",
      description: text,
      content: String(text)
        .split(/\n+/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean),
      search: `${item.title || ""} ${text} ${date}`,
      image: managedImage.src ? managedImage : null,
      source: "management",
    };
  }

  function storedItemToAppointment(item = {}) {
    const date = new Date(`${item.date}T00:00:00`);
    const validDate = !Number.isNaN(date.getTime());
    const day = validDate
      ? new Intl.DateTimeFormat("it-IT", { day: "2-digit" }).format(date)
      : "--";
    const month = validDate
      ? new Intl.DateTimeFormat("it-IT", { month: "short" })
          .format(date)
          .replace(".", "")
      : "";

    return {
      date: item.date || "",
      day,
      month,
      category: "gestione",
      label: "Evento",
      title: item.title || "Nuovo evento",
      description: item.description || "",
      time: "",
      place: item.place || "Altavilla Milicia",
      search: `${item.title || ""} ${item.description || ""} ${item.place || ""}`,
      attachment: item.attachmentData
        ? {
            src: item.attachmentData,
            name: item.attachmentName || "documento",
            type: item.attachmentType || "application/octet-stream",
          }
        : null,
      source: "management",
    };
  }

  function newsWithManagedItems(newsData = {}, managementData = {}) {
    const staticItems = asArray(newsData.items);
    const storedNews = readStoredManagementNews(managementData);
    const hasManagedArchive = Boolean(
      managementData.storageKey &&
        window.localStorage.getItem(managementData.storageKey),
    );
    const managedBaseKeys = new Set(asArray(managementData.items).map(normalizeNewsKey));
    const staticItemsByKey = new Map(
      staticItems.map((item) => [normalizeNewsKey(item), item]),
    );
    const normalizedStoredNews = storedNews.map((item) => {
      const fallback = staticItemsByKey.get(normalizeNewsKey(item)) || {};
      return {
        ...item,
        image: item.imageRemoved ? "" : item.image || fallback.image || "",
      };
    });
    const managedKeys = new Set(
      normalizedStoredNews.map((item) =>
        normalizeNewsKey(managementItemToNews(item)),
      ),
    );

    return {
      ...newsData,
      items: [
        ...normalizedStoredNews
          .filter((item) => (item.status || "Pubblicata") === "Pubblicata")
          .map(managementItemToNews),
        ...staticItems.filter((item) => {
          const key = normalizeNewsKey(item);
          if (managedKeys.has(key)) return false;
          if (hasManagedArchive && managedBaseKeys.has(key)) return false;
          return true;
        }),
      ],
    };
  }

  function appointmentsWithManagedItems(appointmentsData = {}, managementData = {}) {
    const key = managementData.eventStorageKey;
    if (!key) return appointmentsData;
    let storedEvents = [];
    try {
      storedEvents = asArray(
        window.localStorage.getItem(key)
          ? JSON.parse(window.localStorage.getItem(key))
          : [],
      );
    } catch (error) {
      storedEvents = [];
    }

    return {
      ...appointmentsData,
      items: [...storedEvents.map(storedItemToAppointment), ...asArray(appointmentsData.items)],
    };
  }

  function withEventArchive(appointmentsData = {}) {
    const archive = splitEventsByDate(appointmentsData.items);
    return {
      ...appointmentsData,
      archive,
      items: archive.future,
    };
  }

  function loadData() {
    const data = window.siteContent || {};
    const missing = requiredDataKeys.filter((key) => !data[key]);
    if (missing.length) {
      throw new Error(`File dati mancanti: ${missing.join(", ")}`);
    }
    return data;
  }

  function renderHero(data) {
    const quickLinks = asArray(data.quickLinks);
    const badges = asArray(data.badges);
    document.querySelector("#hero-content").innerHTML = `
      <div class="hero__content">
        <p class="eyebrow">${escapeHtml(data.eyebrow)}</p>
        <h1 id="hero-title">
          ${asArray(data.titleLines)
            .map(
              (line) =>
                `<span class="hero-title__line ${safeToken(line.className)}">${escapeHtml(line.text)}</span>`,
            )
            .join("")}
        </h1>
        <p class="hero__lead">${escapeHtml(data.lead)}</p>
        <form class="hero-search" id="hero-search" role="search">
          <label class="sr-only" for="hero-search-input">${escapeHtml(data.search?.label)}</label>
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"></circle><path d="m16 16 4 4"></path></svg>
          <input id="hero-search-input" type="search" placeholder="${escapeHtml(data.search?.placeholder)}" autocomplete="off" />
          <button type="submit">${escapeHtml(data.search?.button)}</button>
        </form>
        <div class="quick-links" aria-label="Ricerche rapide">
          <span>${escapeHtml(data.quickLinksLabel)}</span>
          ${quickLinks
            .map(
              (item) =>
                `<button type="button" data-search-term="${escapeHtml(item.term)}">${escapeHtml(item.label)}</button>`,
            )
            .join("")}
        </div>
      </div>
      <div class="hero__visual">
        ${contentMedia(
          {
            src: data.photo?.file,
            alt: data.photo?.label,
            position: data.photo?.position || "center",
          },
          data.photo?.label,
          data.photo?.file,
          "photo-placeholder photo-placeholder--hero",
        )}
        ${badges
          .map(
            (badge) => `
              <div class="hero-badge hero-badge--${safeToken(badge.variant)}">
                ${
                  badge.icon === "dot"
                    ? '<span class="status-dot" aria-hidden="true"></span>'
                    : `<span class="hero-badge__icon" aria-hidden="true">${escapeHtml(badge.icon)}</span>`
                }
                <span><strong>${escapeHtml(badge.label)}</strong>${escapeHtml(badge.text)}</span>
              </div>`,
            )
            .join("")}
      </div>`;
    bindContentImages(document.querySelector("#hero-content"));
  }

  function renderAreas(data) {
    const items = asArray(data.items);
    document.querySelector("#areas-content").innerHTML = `
      <div class="section-heading section-heading--split">
        <div><p class="eyebrow">${escapeHtml(data.eyebrow)}</p><h2 id="esplora-title">${escapeHtml(data.title)}</h2></div>
        <p>${escapeHtml(data.description)}</p>
      </div>
      <div class="area-grid">
        ${
          items.length
            ? items
                .map(
                  (item, index) => `
                    <a class="area-card area-card--${safeToken(item.color)}" href="#${escapeHtml(item.target)}" data-scroll-to="${escapeHtml(item.target)}">
                      <span class="area-card__number">${String(index + 1).padStart(2, "0")}</span>
                      <span class="area-card__icon" aria-hidden="true">${icons[item.icon] || icons.leaf}</span>
                      <span class="area-card__title">${escapeHtml(item.title)}</span>
                      <span class="area-card__text">${escapeHtml(item.description)}</span>
                      <span class="area-card__link">${escapeHtml(item.action)} <span aria-hidden="true">→</span></span>
                    </a>`,
                )
                .join("")
            : emptyState("Nessuna area disponibile.")
        }
      </div>`;
  }

  function eventTemplate(event, index) {
    return `
      <article class="event-card">
        <time class="event-date" datetime="${escapeHtml(event.date)}">
          <strong>${escapeHtml(event.day)}</strong><span>${escapeHtml(event.month)}</span>
        </time>
        <div class="event-card__content">
          <span class="event-card__category">${escapeHtml(event.label)}</span>
          <h3>${escapeHtml(event.title)}</h3>
          <p>${escapeHtml(event.description)}</p>
          <div class="event-card__meta">
            ${
              event.time
                ? `<span><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>${escapeHtml(event.time)}</span>`
                : ""
            }
            <span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-6 7-12a7 7 0 1 0-14 0c0 6 7 12 7 12Z"/><circle cx="12" cy="9" r="2.5"/></svg>${escapeHtml(event.place)}</span>
          </div>
          <button class="news-card__action" type="button" data-event-index="${index}" aria-haspopup="dialog">
            Apri evento <span aria-hidden="true">→</span>
          </button>
        </div>
      </article>`;
  }

  function renderAppointments(data) {
    const archive = data.archive || { future: asArray(data.items), past: [] };
    const items = asArray(archive.future).slice(0, 3);
    document.querySelector("#events-content").innerHTML = `
      <div class="section-heading section-heading--split section-heading--actions">
        <div><p class="eyebrow">${escapeHtml(data.eyebrow)}</p><h2 id="eventi-title">${escapeHtml(data.title)}</h2></div>
        <button class="text-link text-link--button" type="button" data-open-event-archive>
          ${escapeHtml(data.externalLink?.label || "Tutti gli eventi")} <span aria-hidden="true">→</span>
        </button>
      </div>
      <div class="event-grid${items.length === 1 ? " event-grid--single" : ""}" id="event-list" aria-live="polite">
        ${items.length ? items.map(eventTemplate).join("") : emptyState(data.emptyMessage)}
      </div>`;
  }

  function renderEnvironment(data) {
    const reserve = data.reserve || {};
    const coast = data.coast || {};
    const sustainability = data.sustainability || {};
    const beaches = asArray(coast.items);
    const initiatives = asArray(sustainability.items);
    document.querySelector("#environment-content").innerHTML = `
      <header class="territory__header">
        <p class="eyebrow">${escapeHtml(data.eyebrow)}</p>
        <h2 id="territorio-title">${escapeHtml(data.title)}</h2>
        <p>${escapeHtml(data.description)}</p>
      </header>
      <section class="nature-block nature-block--reserve" aria-labelledby="riserva-title">
        <div class="nature-block__content">
          <span class="nature-block__number">${escapeHtml(reserve.number)}</span>
          <p class="eyebrow">${escapeHtml(reserve.eyebrow)}</p>
          <h3 id="riserva-title">${escapeHtml(reserve.title)}</h3>
          ${asArray(reserve.paragraphs).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
          ${
            reserve.detailId
              ? `<button class="button button--light" type="button" data-environment-detail="${escapeHtml(reserve.detailId)}" aria-haspopup="dialog">${escapeHtml(reserve.action)} <span aria-hidden="true">→</span></button>`
              : ""
          }
        </div>
        ${contentMedia(
          {
            src: reserve.photo?.file,
            alt: reserve.photo?.label,
            position: reserve.photo?.position || "center",
          },
          reserve.photo?.label,
          reserve.photo?.file,
          "photo-placeholder photo-placeholder--reserve",
        )}
      </section>
      <section class="nature-block nature-block--coast" aria-labelledby="spiagge-title">
        <div class="nature-block__heading">
          <div><span class="nature-block__number">${escapeHtml(coast.number)}</span><p class="eyebrow">${escapeHtml(coast.eyebrow)}</p><h3 id="spiagge-title">${escapeHtml(coast.title)}</h3></div>
          <p>${escapeHtml(coast.description)}</p>
        </div>
        <div class="beach-grid">
          ${
            beaches.length
              ? beaches
                  .map(
                    (item) => `
                      <article class="beach-card">
                        ${contentMedia(item.image, `Foto ${item.title}`, item.image?.src, "beach-card__media")}
                        <div class="beach-card__body">
                          <p class="tag">${escapeHtml(item.type)}</p>
                          <h4>${escapeHtml(item.title)}</h4>
                          <p>${escapeHtml(item.description)}</p>
                        </div>
                      </article>`,
                  )
                  .join("")
              : emptyState(coast.emptyMessage)
          }
        </div>
      </section>
      <section class="nature-block nature-block--sustainability" aria-labelledby="sostenibilita-title">
        <div class="nature-block__heading">
          <div><span class="nature-block__number">${escapeHtml(sustainability.number)}</span><p class="eyebrow">${escapeHtml(sustainability.eyebrow)}</p><h3 id="sostenibilita-title">${escapeHtml(sustainability.title)}</h3></div>
          <p>${escapeHtml(sustainability.description)}</p>
        </div>
        <div class="sustainability-grid">
          ${
            initiatives.length
              ? initiatives
                  .map(
                    (item) => `
                      <article class="sustainability-card">
                        <span class="sustainability-card__icon" aria-hidden="true">${icons[item.icon] || icons.leaf}</span>
                        <h4>${escapeHtml(item.title)}</h4><p>${escapeHtml(item.description)}</p>
                        ${
                          item.detailId
                            ? `<button type="button" data-environment-detail="${escapeHtml(item.detailId)}" aria-haspopup="dialog">${escapeHtml(item.action)} <span aria-hidden="true">→</span></button>`
                            : ""
                        }
                      </article>`,
                  )
                  .join("")
              : emptyState(sustainability.emptyMessage)
          }
        </div>
      </section>`;
    bindContentImages(document.querySelector("#environment-content"));
  }

  function renderSport(data) {
    const items = asArray(data.items);
    document.querySelector("#sport-content").innerHTML = `
      <div class="section-heading section-heading--split">
        <div><p class="eyebrow">${escapeHtml(data.eyebrow)}</p><h2 id="movimento-title">${escapeHtml(data.title)}</h2></div>
        <p>${escapeHtml(data.description)}</p>
      </div>
      <div class="activity-grid">
        ${
          items.length
            ? items
                .map(
                  (item) => `
                    <article class="activity-card activity-card--${safeToken(item.variant)}">
                      ${contentMedia(
                        { src: item.photoFile, alt: item.photoLabel },
                        item.photoLabel,
                        item.photoFile,
                        "activity-card__art",
                      )}
                      <div class="activity-card__body">
                        <span class="tag">${escapeHtml(item.tag)}</span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p>
                        <a href="${escapeHtml(item.href)}"${linkAttributes(item.href)}>${escapeHtml(item.action)} <span aria-hidden="true">${String(item.href).startsWith("http") ? "↗" : "→"}</span></a>
                      </div>
                    </article>`,
                )
                .join("")
            : emptyState(data.emptyMessage)
        }
      </div>`;
    bindContentImages(document.querySelector("#sport-content"));
  }

  function serviceTemplate(service) {
    return `
      <article class="service-card">
        <span class="service-card__icon">${icons[service.icon] || icons.phone}</span>
        <h3>${escapeHtml(service.title)}</h3><p>${escapeHtml(service.description)}</p>
        <a href="${escapeHtml(service.href)}"${linkAttributes(service.href)}>${escapeHtml(service.action)} <span aria-hidden="true">${String(service.href).startsWith("http") ? "↗" : "→"}</span></a>
      </article>`;
  }

  function doctorTemplate(doctor) {
    return `
      <article class="doctor-card">
        <div class="doctor-card__heading">
          <span class="doctor-card__icon">${icons.doctor}</span>
          <div><span>Medicina generale</span><h4>${escapeHtml(doctor.name)}</h4></div>
        </div>
        <p class="doctor-card__address">${escapeHtml(doctor.address)}</p>
        <div class="doctor-card__contacts">
          ${asArray(doctor.phones)
            .map(
              (phone) =>
                `<a href="tel:${escapeHtml(String(phone).replaceAll(" ", ""))}" aria-label="Chiama ${escapeHtml(doctor.name)} al numero ${escapeHtml(phone)}"><span class="doctor-contact__icon">${icons.phone}</span><span>Chiama</span></a>`,
            )
            .join("")}
          ${
            doctor.email
              ? `<a href="mailto:${escapeHtml(doctor.email)}" aria-label="Invia un'email a ${escapeHtml(doctor.name)}"><span class="doctor-contact__icon">${icons.email}</span><span>Invia email</span></a>`
              : ""
          }
        </div>
        ${doctor.note ? `<p class="doctor-card__note">${escapeHtml(doctor.note)}</p>` : ""}
        ${
          asArray(doctor.hours).length
            ? `<details><summary>Orari di ricevimento</summary><dl class="doctor-hours">${doctor.hours
                .map(
                  ([day, time]) =>
                    `<div><dt>${escapeHtml(day)}</dt><dd>${escapeHtml(time)}</dd></div>`,
                )
                .join("")}</dl></details>`
            : ""
        }
      </article>`;
  }

  function renderHealth(data) {
    const services = asArray(data.services);
    const doctorsSection = data.doctorsSection || {};
    const doctors = asArray(doctorsSection.items);
    const accessItems = asArray(data.healthAccess);
    document.querySelector("#services-content").innerHTML = `
      <div class="section-heading section-heading--split section-heading--actions">
        <div><p class="eyebrow">${escapeHtml(data.eyebrow)}</p><h2 id="servizi-title">${escapeHtml(data.title)}</h2></div>
        <button class="text-link text-link--button" type="button" data-open-search>${escapeHtml(data.searchAction)} <span aria-hidden="true">→</span></button>
      </div>
      <p class="service-scroll-hint">${escapeHtml(data.servicesHint)} <span aria-hidden="true">→</span></p>
      <div class="service-grid" id="service-list" tabindex="0" role="region" aria-label="${escapeHtml(data.servicesAriaLabel)}">
        ${services.length ? services.map(serviceTemplate).join("") : emptyState(data.servicesEmptyMessage)}
      </div>
      <section class="doctors-section" id="medici-base" aria-labelledby="medici-base-title">
        <div class="doctors-section__heading"><div><p class="eyebrow">${escapeHtml(doctorsSection.eyebrow)}</p><h3 id="medici-base-title">${escapeHtml(doctorsSection.title)}</h3><p>${escapeHtml(doctorsSection.description)}</p></div></div>
        <p class="doctor-scroll-hint">${escapeHtml(doctorsSection.hint)} <span aria-hidden="true">→</span></p>
        <div class="doctor-grid" id="doctor-list" tabindex="0" role="region" aria-label="${escapeHtml(doctorsSection.ariaLabel)}">
          ${doctors.length ? doctors.map(doctorTemplate).join("") : emptyState(doctorsSection.emptyMessage)}
        </div>
        <div class="health-access-grid">
          ${accessItems
            .map(
              (item) => `
                <article>
                  <div class="health-access-grid__heading"><span class="health-access-grid__icon" aria-hidden="true">${icons[item.icon] || icons.website}</span><h4>${escapeHtml(item.title)}</h4></div>
                  <p>${escapeHtml(item.description)}</p>
                  <div class="health-access-grid__links">
                    ${asArray(item.links)
                      .map(
                        (link) =>
                          `<a href="${escapeHtml(link.href)}"${linkAttributes(link.href)} aria-label="${escapeHtml(link.ariaLabel)}"><span class="doctor-contact__icon" aria-hidden="true">${icons[link.icon] || icons.website}</span><span>${escapeHtml(link.label)}</span></a>`,
                      )
                      .join("")}
                  </div>
                </article>`,
            )
            .join("")}
        </div>
      </section>`;
  }

  function renderAssociations(data) {
    const items = asArray(data.items);

    function associationTemplate(item, index) {
      const disciplines = asArray(item.disciplines);

      return `
        <article class="association-card">
          <div class="association-card__media">
            <div class="association-card__placeholder" aria-hidden="true">
              <span>${icons.sport}</span>
              <small>Logo associazione</small>
            </div>
            <img
              class="${item.logoFit === "cover" ? "association-card__logo--cover" : ""}"
              src="${escapeHtml(item.logo)}"
              alt="Logo ${escapeHtml(item.name)}"
              loading="lazy"
              data-association-logo
            />
          </div>
          <div class="association-card__body">
            <span class="tag">Associazione sportiva</span>
            <h3>${escapeHtml(item.name)}</h3>
            <p class="association-card__disciplines">${escapeHtml(disciplines.join(" · "))}</p>
            <button class="association-card__action" type="button" data-association-index="${index}" aria-haspopup="dialog">
              Apri scheda <span aria-hidden="true">→</span>
            </button>
          </div>
        </article>`;
    }

    document.querySelector("#associations-content").innerHTML = `
      <div class="community__heading">
        <div>
          <p class="eyebrow">${escapeHtml(data.eyebrow)}</p>
          <h2 id="associazioni-title">${escapeHtml(data.title)}</h2>
        </div>
        <div>
          <p>${escapeHtml(data.description)}</p>
        </div>
      </div>
      <p class="association-scroll-hint">${escapeHtml(data.hint)} <span aria-hidden="true">→</span></p>
      <div class="association-grid" id="association-list" tabindex="0" role="region" aria-label="${escapeHtml(data.ariaLabel)}">
        ${items.length ? items.map(associationTemplate).join("") : emptyState(data.emptyMessage)}
      </div>`;

    document
      .querySelectorAll("[data-association-logo]")
      .forEach((image) => {
        image.addEventListener("error", () => {
          image.hidden = true;
        }, { once: true });
      });
  }

  function renderNews(data) {
    const items = sortNewsDescending(data.items);
    const visibleItems = items.slice(0, 3);
    data.items = items;
    document.querySelector("#news-content").innerHTML = `
      <div class="section-heading section-heading--split section-heading--actions">
        <div><p class="eyebrow">${escapeHtml(data.eyebrow)}</p><h2 id="news-title">${escapeHtml(data.title)}</h2></div>
        <button class="text-link text-link--button" type="button" data-open-news-archive>
          ${escapeHtml(data.archiveLabel)} <span aria-hidden="true">→</span>
        </button>
      </div>
      <div class="news-grid" id="news-list">
        ${
          visibleItems.length
            ? visibleItems
                .map(
                  (item, index) => `
                    <article class="news-card${imageData(item.image).src ? "" : " news-card--no-image"}">
                      ${
                        imageData(item.image).src
                          ? contentMedia(
                              item.image,
                              `Immagine ${item.title}`,
                              imageData(item.image).src,
                              "news-card__media",
                            )
                          : ""
                      }
                      <div class="news-card__body">
                        <span class="news-card__meta">${escapeHtml(item.type)} · ${escapeHtml(item.date)}</span>
                        <h3>${escapeHtml(item.title)}</h3><p class="news-card__description">${escapeHtml(item.description)}</p>
                        <button class="news-card__action" type="button" data-news-index="${index}" aria-haspopup="dialog">Leggi la comunicazione <span aria-hidden="true">→</span></button>
                      </div>
                    </article>`,
                )
                .join("")
            : emptyState(data.emptyMessage)
        }
      </div>`;
    bindContentImages(document.querySelector("#news-content"));
  }

  function renderClosing(data) {
    document.querySelector("#closing-content").innerHTML = `
      <div><p class="eyebrow">${escapeHtml(data.eyebrow)}</p><h2 id="closing-title">${escapeHtml(data.title)}</h2></div>
      <p>${escapeHtml(data.description)}</p>
      <button class="button button--light" type="button" data-scroll-top>${escapeHtml(data.button)} <span aria-hidden="true">↑</span></button>`;
  }

  function renderContact(data) {
    const form = data.form || {};
    document.querySelector("#contact-content").innerHTML = `
      <div class="contact-section__intro">
        <p class="eyebrow">${escapeHtml(data.eyebrow)}</p><h2 id="contact-title">${escapeHtml(data.title)}</h2><p>${escapeHtml(data.description)}</p>
        <div class="contact-section__details">
          ${asArray(data.details)
            .map(
              (detail) =>
                `<a href="${escapeHtml(detail.href)}"${linkAttributes(detail.href)}><span class="contact-section__detail-icon" aria-hidden="true">${icons[detail.icon] || icons.website}</span><span><small>${escapeHtml(detail.label)}</small>${escapeHtml(detail.value)}</span></a>`,
            )
            .join("")}
        </div>
      </div>
      <form class="contact-form" id="contact-form">
        <div class="contact-form__row">
          <label for="contact-name">${escapeHtml(form.nameLabel)}<input id="contact-name" name="name" type="text" autocomplete="name" required /></label>
          <label for="contact-email">${escapeHtml(form.emailLabel)}<input id="contact-email" name="email" type="email" autocomplete="email" required /></label>
        </div>
        <label for="contact-topic">${escapeHtml(form.topicLabel)}
          <select id="contact-topic" name="topic" required>
            <option value="">${escapeHtml(form.topicPlaceholder)}</option>
            ${asArray(form.topics).map((topic) => `<option value="${escapeHtml(topic.value)}">${escapeHtml(topic.label)}</option>`).join("")}
          </select>
        </label>
        <label for="contact-message">${escapeHtml(form.messageLabel)}<textarea id="contact-message" name="message" rows="5" required></textarea></label>
        <label class="contact-form__consent" for="contact-consent"><input id="contact-consent" name="consent" type="checkbox" required /><span>${escapeHtml(form.consentLabel)}</span></label>
        <div class="contact-form__footer"><button class="button button--primary" type="submit">${escapeHtml(form.submitLabel)} <span aria-hidden="true">→</span></button><p class="contact-form__note">${escapeHtml(form.note)}</p></div>
        <p class="contact-form__status" id="contact-form-status" role="status" aria-live="polite" tabindex="-1" hidden></p>
      </form>`;
  }

  function renderPartners(data) {
    document.querySelector("#partners-content").innerHTML = `
      <h2 class="partner-strip__title" id="partner-title">${escapeHtml(data.title)}</h2>
      <div class="partner-logos">
        ${asArray(data.items)
          .map(
            (item) =>
              `<img class="partner-logo partner-logo--${safeToken(item.variant)}" src="${escapeHtml(item.src)}" alt="${escapeHtml(item.alt)}" />`,
          )
          .join("")}
      </div>`;
  }

  function renderAll(data) {
    data.news = newsWithManagedItems(data.news, data.management);
    data.appointments = appointmentsWithManagedItems(
      data.appointments,
      data.management,
    );
    data.appointments = withEventArchive(data.appointments);
    renderHero(data.hero);
    renderAreas(data.areas);
    renderAppointments(data.appointments);
    renderEnvironment(data.environment);
    renderSport(data.sport);
    renderHealth(data.health);
    renderAssociations(data.associations);
    renderNews(data.news);
    renderClosing(data.closing);
    renderContact(data.contact);
    renderPartners(data.partners);
  }

  function allSearchableItems(data) {
    return [
      ...asArray(data.appointments.items).map((item) => ({
        type: "Evento",
        title: item.title,
        description: `${item.day} ${item.month} · ${item.place}`,
        search: `${item.title} ${item.description} ${item.search || ""}`,
        target: "#eventi",
      })),
      ...asArray(data.health.services).map((item) => ({
        type: "Servizio",
        title: item.title,
        description: item.description,
        search: `${item.title} ${item.description} ${item.search || ""}`,
        target: "#servizi",
      })),
      ...asArray(data.health.doctorsSection?.items).map((item) => ({
        type: "Medico di base",
        title: item.name,
        description: item.address,
        search: `${item.name} ${item.address} ${asArray(item.phones).join(" ")} ${item.search || ""}`,
        target: "#medici-base",
      })),
      ...asArray(data.sport.items).map((item) => ({
        type: "Sport",
        title: item.title,
        description: item.description,
        search: `${item.title} ${item.description} ${item.search || ""}`,
        target: "#movimento",
      })),
      ...asArray(data.news.items).map((item) => ({
        type: "Notizia",
        title: item.title,
        description: item.description,
        search: `${item.title} ${item.description} ${item.search || ""}`,
        target: "#news",
      })),
      {
        type: "Area",
        title: data.environment.title,
        description: data.environment.description,
        search: data.environment.search || "",
        target: "#territorio",
      },
      {
        type: "Area",
        title: data.associations.title,
        description: data.associations.description,
        search: data.associations.search || "",
        target: "#associazioni",
      },
    ];
  }

  function bindInteractions(data) {
    const searchDialog = document.querySelector("#search-dialog");
    const environmentDialog = document.querySelector("#environment-dialog");
    const communicationDialog = document.querySelector("#communication-dialog");
    const eventDetailDialog = document.querySelector("#event-detail-dialog");
    const archiveDialog = document.querySelector("#archive-dialog");
    const associationDialog = document.querySelector("#association-dialog");

    function associationContactTemplate(type, value) {
      if (!value) return "";
      const settings = {
        phone: {
          href: `tel:${String(value).replace(/[^+\d]/g, "")}`,
          label: "Chiama",
          icon: icons.phone,
        },
        email: {
          href: `mailto:${value}`,
          label: "Invia email",
          icon: icons.email,
        },
        web: {
          href: value,
          label: "Sito web",
          icon: icons.website,
        },
      };
      const contact = settings[type];
      if (!contact) return "";
      return `
        <a class="association-dialog__contact" href="${escapeHtml(contact.href)}"${linkAttributes(contact.href)}>
          <span aria-hidden="true">${contact.icon}</span>
          ${contact.label}
        </a>`;
    }

    function openAssociation(index, trigger) {
      const item = asArray(data.associations.items)[index];
      if (!item) return;
      const photo = associationDialog.querySelector("#association-dialog-photo");
      const photoPlaceholder = associationDialog.querySelector(
        ".association-dialog__photo span",
      );
      const associationPhoto = item.image || {};
      associationDialog.querySelector("#association-dialog-title").textContent =
        item.name;
      associationDialog.querySelector(
        "#association-dialog-affiliation",
      ).textContent = item.affiliation || "Affiliazione non indicata";
      associationDialog
        .querySelector("#association-dialog-disciplines")
        .replaceChildren(
          ...asArray(item.disciplines).map((discipline) => {
            const element = document.createElement("li");
            element.textContent = discipline;
            return element;
          }),
        );
      associationDialog.querySelector(
        "#association-dialog-description",
      ).textContent = item.description || "";
      associationDialog.querySelector("#association-dialog-contacts").innerHTML =
        [
          associationContactTemplate("phone", item.phone),
          associationContactTemplate("email", item.email),
          associationContactTemplate("web", item.web),
        ].join("");

      photoPlaceholder.innerHTML = icons.sport;
      photo.hidden = true;
      photo.removeAttribute("src");
      photo.alt = associationPhoto.alt || `Foto dell'associazione ${item.name}`;
      photo.style.objectPosition = associationPhoto.position || "center";
      if (associationPhoto.src) {
        photo.addEventListener(
          "load",
          () => {
            photo.hidden = false;
          },
          { once: true },
        );
        photo.addEventListener(
          "error",
          () => {
            photo.hidden = true;
          },
          { once: true },
        );
        photo.src = associationPhoto.src;
      }

      associationDialog._returnFocus = trigger;
      associationDialog.showModal();
    }

    function archiveEventTemplate(item, index, group) {
      return `
        <article class="archive-card archive-card--event">
          <time datetime="${escapeHtml(item.date)}">${escapeHtml(formatStoredNewsDate(item.date) || item.date)}</time>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.description)}</p>
          <small>${escapeHtml(item.place)}</small>
          <button class="news-card__action" type="button" data-archive-event-index="${index}" data-archive-event-group="${escapeHtml(group)}">Apri evento <span aria-hidden="true">→</span></button>
        </article>`;
    }

    function archiveNewsTemplate(item, index) {
      return `
        <article class="archive-card">
          <span>${escapeHtml(item.type)} · ${escapeHtml(item.date)}</span>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.description)}</p>
          <button class="news-card__action" type="button" data-archive-news-index="${index}">Leggi la comunicazione <span aria-hidden="true">→</span></button>
        </article>`;
    }

    function archiveSearchText(item = {}) {
      return [
        item.title,
        item.description,
        item.type,
        item.date,
        item.place,
        item.label,
      ]
        .filter(Boolean)
        .join(" ")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLocaleLowerCase("it");
    }

    function normalizedArchiveTerm(term = "") {
      return String(term)
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLocaleLowerCase("it");
    }

    function openArchive(config = {}, trigger) {
      const searchInput = archiveDialog.querySelector("#archive-search-input");
      const searchStatus = archiveDialog.querySelector(
        "#archive-search-status",
      );
      const archiveList = archiveDialog.querySelector("#archive-dialog-list");

      archiveDialog.querySelector("#archive-dialog-eyebrow").textContent =
        config.eyebrow || "";
      archiveDialog.querySelector("#archive-dialog-title").textContent =
        config.title || "";
      archiveDialog.querySelector("#archive-dialog-subtitle").textContent =
        config.subtitle || "";
      searchInput.value = "";
      searchInput.placeholder =
        config.searchPlaceholder || "Cerca nell'archivio";
      archiveDialog._renderArchive = (term = "") => {
        const result = config.render
          ? config.render(normalizedArchiveTerm(term))
          : {
              content:
                config.content ||
                emptyState(
                  config.emptyMessage || "Nessun contenuto disponibile.",
                ),
              count: 0,
            };
        archiveList.innerHTML = result.content;
        searchStatus.textContent = term.trim()
          ? `${result.count} ${result.count === 1 ? "risultato trovato" : "risultati trovati"}`
          : "";
      };
      archiveDialog._renderArchive();
      archiveDialog._returnFocus = trigger;
      archiveDialog.showModal();
    }

    function closeArchive() {
      if (archiveDialog.open) archiveDialog.close();
    }

    function openEventArchive(trigger) {
      const futureEvents = asArray(data.appointments.archive?.future).slice(3);
      const pastEvents = asArray(data.appointments.archive?.past);
      openArchive(
        {
          eyebrow: "Archivio calendario",
          title: "Eventi",
          subtitle:
            "Consulta gli altri appuntamenti futuri e gli eventi già trascorsi.",
          searchPlaceholder: "Cerca evento, luogo o data",
          render: (term) => {
            const futureMatches = futureEvents
              .map((item, index) => ({ item, index }))
              .filter(({ item }) => !term || archiveSearchText(item).includes(term));
            const pastMatches = pastEvents
              .map((item, index) => ({ item, index }))
              .filter(({ item }) => !term || archiveSearchText(item).includes(term));
            const count = futureMatches.length + pastMatches.length;
            return {
              count,
              content: `
                <section class="archive-group" aria-labelledby="future-events-title">
                  <h3 id="future-events-title">Eventi futuri</h3>
                  <div class="archive-group__list">
                    ${
                      futureMatches.length
                        ? futureMatches
                            .map(({ item, index }) =>
                              archiveEventTemplate(item, index, "future"),
                            )
                            .join("")
                        : emptyState(
                            term
                              ? "Nessun evento futuro corrisponde alla ricerca."
                              : "Non sono presenti altri eventi futuri.",
                          )
                    }
                  </div>
                </section>
                <section class="archive-group" aria-labelledby="past-events-title">
                  <h3 id="past-events-title">Eventi passati</h3>
                  <div class="archive-group__list">
                    ${
                      pastMatches.length
                        ? pastMatches
                            .map(({ item, index }) =>
                              archiveEventTemplate(item, index, "past"),
                            )
                            .join("")
                        : emptyState(
                            term
                              ? "Nessun evento passato corrisponde alla ricerca."
                              : "Non sono presenti eventi passati.",
                          )
                    }
                  </div>
                </section>`,
            };
          },
        },
        trigger,
      );
    }

    function openNewsArchive(trigger) {
      const news = sortNewsDescending(data.news.items);
      const archivedNews = news.slice(3);
      openArchive(
        {
          eyebrow: "Archivio comunicazioni",
          title: "Comunicazioni",
          subtitle:
            "Qui trovi le comunicazioni precedenti, ordinate dalla più recente alla meno recente.",
          searchPlaceholder: "Cerca comunicazione, tipologia o data",
          render: (term) => {
            const matches = archivedNews
              .map((item, index) => ({ item, index: index + 3 }))
              .filter(({ item }) => !term || archiveSearchText(item).includes(term));
            return {
              count: matches.length,
              content: matches.length
                ? matches
                    .map(({ item, index }) => archiveNewsTemplate(item, index))
                    .join("")
                : emptyState(
                    term
                      ? "Nessuna comunicazione corrisponde alla ricerca."
                      : "Non sono presenti altre comunicazioni in archivio.",
                  ),
            };
          },
        },
        trigger,
      );
    }

    function performSearch(term) {
      const container = document.querySelector("#search-results");
      const normalized = term.trim().toLocaleLowerCase("it");
      if (normalized.length < 2) {
        container.innerHTML =
          "<p>Scrivi almeno due caratteri per cercare tra eventi, servizi e notizie.</p>";
        return;
      }
      const results = allSearchableItems(data).filter((item) =>
        item.search.toLocaleLowerCase("it").includes(normalized),
      );
      container.innerHTML = results.length
        ? results
            .map(
              (item) =>
                `<a class="search-result" href="${item.target}" data-search-result><span>${escapeHtml(item.type)}</span><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.description)}</small></a>`,
            )
            .join("")
        : `<p>Nessun risultato per “${escapeHtml(term)}”. Prova con sport, farmacia, natura o famiglie.</p>`;
    }

    function openSearch(term = "") {
      searchDialog.showModal();
      const input = searchDialog.querySelector("#dialog-search-input");
      input.value = term;
      window.setTimeout(() => input.focus(), 50);
      performSearch(term);
    }

    function closeSearch() {
      if (searchDialog.open) searchDialog.close();
    }

    function openCommunication(index, trigger) {
      const item = asArray(data.news.items)[index];
      if (!item) return;
      const media = imageData(item.image);
      const mediaContainer = communicationDialog.querySelector(
        "#communication-media",
      );
      const communicationImage = communicationDialog.querySelector(
        "#communication-image",
      );
      communicationDialog.querySelector("#communication-title").textContent =
        item.title;
      communicationDialog.querySelector(
        "#communication-subtitle",
      ).textContent = item.description;
      communicationDialog.querySelector("#communication-type").textContent =
        item.type;
      communicationDialog.querySelector("#communication-date").textContent =
        item.date;
      communicationDialog
        .querySelector("#communication-content")
        .replaceChildren(
          ...asArray(item.content).map((paragraph) => {
            const element = document.createElement("p");
            element.textContent = paragraph;
            return element;
          }),
        );

      mediaContainer.hidden = !media.src;
      communicationImage.removeAttribute("src");
      if (media.src) {
        communicationImage.alt = media.alt || `Immagine ${item.title}`;
        communicationImage.style.objectPosition = media.position || "center";
        communicationImage.addEventListener(
          "error",
          () => {
            mediaContainer.hidden = true;
          },
          { once: true },
        );
        communicationImage.src = media.src;
      }

      communicationDialog._returnFocus = trigger;
      communicationDialog.showModal();
    }

    function openEventDetail(item, trigger) {
      if (!item) return;
      const attachment = item.attachment || {};
      const attachmentContainer = eventDetailDialog.querySelector(
        "#event-detail-attachment",
      );
      const downloadLink = eventDetailDialog.querySelector(
        "#event-detail-download",
      );
      const downloadLabel = eventDetailDialog.querySelector(
        "#event-detail-download-label",
      );

      eventDetailDialog.querySelector("#event-detail-title").textContent =
        item.title;
      eventDetailDialog.querySelector("#event-detail-description").textContent =
        item.description;
      eventDetailDialog.querySelector("#event-detail-date").textContent =
        formatStoredNewsDate(item.date) || item.date;
      eventDetailDialog.querySelector("#event-detail-place").textContent =
        item.place || "Altavilla Milicia";

      attachmentContainer.hidden = !attachment.src;
      downloadLink.removeAttribute("href");
      downloadLink.removeAttribute("download");
      downloadLabel.textContent = "Scarica documento";
      if (attachment.src) {
        downloadLink.href = attachment.src;
        downloadLink.download = attachment.name || "documento";
        downloadLabel.textContent = `Scarica ${attachment.name || "documento"}`;
      }

      eventDetailDialog._returnFocus = trigger;
      eventDetailDialog.showModal();
    }

    function openEnvironmentDetail(detailId, trigger) {
      const detail = data.environment.details?.[detailId];
      if (!detail) return;
      environmentDialog.dataset.theme = detail.theme || "forest";
      environmentDialog.querySelector("#environment-dialog-title").textContent =
        detail.title;
      environmentDialog.querySelector(
        "#environment-dialog-subtitle",
      ).textContent = detail.subtitle;
      environmentDialog.querySelector("#environment-dialog-type").textContent =
        detail.type;
      environmentDialog
        .querySelector("#environment-dialog-content")
        .replaceChildren(
          ...asArray(detail.content).map((paragraph) => {
            const element = document.createElement("p");
            element.textContent = paragraph;
            return element;
          }),
        );
      environmentDialog._returnFocus = trigger;
      environmentDialog.showModal();
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
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      window.scrollTo({
        top: targetPosition,
        behavior:
          reduceMotion || Math.abs(window.scrollY - targetPosition) > 1400
            ? "auto"
            : "smooth",
      });
      if (updateHash && window.history?.replaceState) {
        window.history.replaceState(null, "", `#${targetId}`);
      }
      return true;
    }

    function scrollToTop() {
      window.scrollTo({ top: 0, behavior: "auto" });
      if (window.history?.replaceState) {
        window.history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search,
        );
      }
    }

    function enableHorizontalKeyboardScroll(container, cardSelector) {
      if (!container) return;
      container.addEventListener("keydown", (event) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        const card = container.querySelector(cardSelector);
        if (!card) return;
        event.preventDefault();
        const gap =
          Number.parseFloat(window.getComputedStyle(container).columnGap) || 0;
        container.scrollBy({
          left:
            (event.key === "ArrowRight" ? 1 : -1) *
            (card.getBoundingClientRect().width + gap),
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
        });
      });
    }

    enableHorizontalKeyboardScroll(
      document.querySelector("#service-list"),
      ".service-card",
    );
    enableHorizontalKeyboardScroll(
      document.querySelector("#doctor-list"),
      ".doctor-card",
    );
    enableHorizontalKeyboardScroll(
      document.querySelector("#association-list"),
      ".association-card",
    );

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
    document
      .querySelector("#dialog-search")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        performSearch(document.querySelector("#dialog-search-input").value);
      });
    document
      .querySelector("#dialog-search-input")
      .addEventListener("input", (event) => performSearch(event.target.value));
    document
      .querySelector("#search-results")
      .addEventListener("click", (event) => {
        if (event.target.closest("[data-search-result]")) closeSearch();
      });
    archiveDialog
      .querySelector("#archive-search")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        archiveDialog._renderArchive?.(
          archiveDialog.querySelector("#archive-search-input").value,
        );
      });
    archiveDialog
      .querySelector("#archive-search-input")
      .addEventListener("input", (event) => {
        archiveDialog._renderArchive?.(event.target.value);
      });

    document.addEventListener("click", (event) => {
      const scrollLink = event.target.closest("[data-scroll-to]");
      const archiveNewsButton = event.target.closest("[data-archive-news-index]");
      const archiveEventButton = event.target.closest(
        "[data-archive-event-index]",
      );
      const associationButton = event.target.closest("[data-association-index]");
      if (scrollLink) {
        const targetId = scrollLink.dataset.scrollTo;
        if (document.getElementById(targetId)) {
          event.preventDefault();
          closeSearch();
          scrollToTarget(targetId);
        }
      }
      if (event.target.closest("[data-scroll-top]")) {
        event.preventDefault();
        scrollToTop();
      }
      if (event.target.closest("[data-open-event-archive]")) {
        event.preventDefault();
        openEventArchive(event.target.closest("[data-open-event-archive]"));
      }
      if (event.target.closest("[data-open-news-archive]")) {
        event.preventDefault();
        openNewsArchive(event.target.closest("[data-open-news-archive]"));
      }
      if (archiveNewsButton) {
        closeArchive();
        openCommunication(
          Number.parseInt(archiveNewsButton.dataset.archiveNewsIndex, 10),
          archiveNewsButton,
        );
      }
      if (archiveEventButton) {
        const futureEvents = asArray(data.appointments.archive?.future).slice(3);
        const pastEvents = asArray(data.appointments.archive?.past);
        const eventGroup =
          archiveEventButton.dataset.archiveEventGroup === "future"
            ? futureEvents
            : pastEvents;
        closeArchive();
        openEventDetail(
          eventGroup[
            Number.parseInt(archiveEventButton.dataset.archiveEventIndex, 10)
          ],
          archiveEventButton,
        );
      }
      if (associationButton) {
        openAssociation(
          Number.parseInt(associationButton.dataset.associationIndex, 10),
          associationButton,
        );
      }
    });

    document.querySelector("#news-list").addEventListener("click", (event) => {
      const button = event.target.closest("[data-news-index]");
      if (button) {
        openCommunication(Number.parseInt(button.dataset.newsIndex, 10), button);
      }
    });
    document.querySelector("#event-list").addEventListener("click", (event) => {
      const button = event.target.closest("[data-event-index]");
      if (button) {
        openEventDetail(
          asArray(data.appointments.archive?.future)[
            Number.parseInt(button.dataset.eventIndex, 10)
          ],
          button,
        );
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
        button.addEventListener("click", () => environmentDialog.close()),
      );
    document
      .querySelectorAll("[data-close-communication]")
      .forEach((button) =>
        button.addEventListener("click", () => communicationDialog.close()),
      );
    document
      .querySelectorAll("[data-close-event-detail]")
      .forEach((button) =>
        button.addEventListener("click", () => eventDetailDialog.close()),
      );
    document
      .querySelectorAll("[data-close-archive]")
      .forEach((button) => button.addEventListener("click", closeArchive));
    document
      .querySelectorAll("[data-close-association]")
      .forEach((button) =>
        button.addEventListener("click", () => associationDialog.close()),
      );
    environmentDialog.addEventListener("close", () => {
      environmentDialog._returnFocus?.focus();
      environmentDialog._returnFocus = null;
    });
    communicationDialog.addEventListener("close", () => {
      communicationDialog._returnFocus?.focus();
      communicationDialog._returnFocus = null;
    });
    eventDetailDialog.addEventListener("close", () => {
      eventDetailDialog._returnFocus?.focus();
      eventDetailDialog._returnFocus = null;
    });
    archiveDialog.addEventListener("close", () => {
      archiveDialog._returnFocus?.focus();
      archiveDialog._returnFocus = null;
    });
    associationDialog.addEventListener("close", () => {
      associationDialog._returnFocus?.focus();
      associationDialog._returnFocus = null;
    });
    [
      searchDialog,
      environmentDialog,
      communicationDialog,
      eventDetailDialog,
      archiveDialog,
      associationDialog,
    ].forEach((dialog) => {
      dialog.addEventListener("click", (event) => {
        if (event.target === dialog) dialog.close();
      });
    });

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

    const contactForm = document.querySelector("#contact-form");
    const contactFormStatus = document.querySelector("#contact-form-status");
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!contactForm.reportValidity()) return;
      const name = contactForm.elements.name.value.trim();
      const namePart = name ? `, ${name}` : "";
      contactFormStatus.textContent = String(
        data.contact.form?.successMessage || "Grazie{name}. Messaggio acquisito.",
      ).replace("{name}", namePart);
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
  }

  try {
    const data = loadData();
    renderAll(data);
    bindInteractions(data);
    window.portalData = { ...data, ready: true };
    document.querySelector("#contenuto").setAttribute("aria-busy", "false");
  } catch (error) {
    console.error(error);
    document.querySelector("#contenuto").innerHTML = `
      <section class="section"><div class="shell data-error" role="alert">
        <p class="eyebrow">Contenuti non disponibili</p>
        <h1>Non è stato possibile caricare i file dati.</h1>
        <p>${escapeHtml(error.message)}</p>
      </div></section>`;
    document.querySelector("#contenuto").setAttribute("aria-busy", "false");
    window.portalData = { ready: false, error: error.message };
  }
})();
