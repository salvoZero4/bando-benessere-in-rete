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
        <figure class="photo-placeholder photo-placeholder--hero">
          <span class="photo-placeholder__label">${escapeHtml(data.photo?.label)}</span>
          <small>Spazio riservato · ${escapeHtml(data.photo?.file)}</small>
        </figure>
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

  function eventTemplate(event) {
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
        </div>
      </article>`;
  }

  function renderAppointments(data) {
    const items = asArray(data.items);
    document.querySelector("#events-content").innerHTML = `
      <div class="section-heading section-heading--split section-heading--actions">
        <div><p class="eyebrow">${escapeHtml(data.eyebrow)}</p><h2 id="eventi-title">${escapeHtml(data.title)}</h2></div>
        ${
          data.externalLink?.href
            ? `<a class="text-link" href="${escapeHtml(data.externalLink.href)}"${linkAttributes(data.externalLink.href)}>${escapeHtml(data.externalLink.label)} <span aria-hidden="true">↗</span></a>`
            : ""
        }
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
        <figure class="photo-placeholder photo-placeholder--reserve">
          <span class="photo-placeholder__label">${escapeHtml(reserve.photo?.label)}</span>
          <small>Spazio riservato · ${escapeHtml(reserve.photo?.file)}</small>
        </figure>
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
                    (item) => `<article class="beach-card"><span class="beach-card__icon" aria-hidden="true">≈</span><p class="tag">${escapeHtml(item.type)}</p><h4>${escapeHtml(item.title)}</h4><p>${escapeHtml(item.description)}</p></article>`,
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
                      <div class="activity-card__art photo-placeholder"><span class="photo-placeholder__label">${escapeHtml(item.photoLabel)}</span><small>${escapeHtml(item.photoFile)}</small></div>
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

    function contactButton(type, value) {
      const isPhone = type === "phone";
      const label = isPhone ? "Chiama" : "Invia email";
      const unavailableLabel = isPhone
        ? "Telefono non pubblicato"
        : "Email non pubblicata";

      if (!value) {
        return `<span class="association-contact association-contact--disabled"><span class="association-contact__icon" aria-hidden="true">${icons[type]}</span>${unavailableLabel}</span>`;
      }

      const href = isPhone
        ? `tel:${String(value).replace(/[^+\d]/g, "")}`
        : `mailto:${value}`;
      return `<a class="association-contact" href="${escapeHtml(href)}"><span class="association-contact__icon" aria-hidden="true">${icons[type]}</span>${label}</a>`;
    }

    function associationTemplate(item) {
      const disciplines = asArray(item.disciplines);
      const image = item.image || {};

      return `
        <article class="association-card">
          <div class="association-card__media">
            <div class="association-card__placeholder" aria-hidden="true">
              <span>${icons.sport}</span>
              <small>Immagine da inserire</small>
            </div>
            <img
              src="${escapeHtml(image.src)}"
              alt="${escapeHtml(image.alt)}"
              loading="lazy"
              style="object-position: ${escapeHtml(image.position || "center")}"
              data-association-image
              hidden
            />
          </div>
          <div class="association-card__body">
            <h3>${escapeHtml(item.name)}</h3>
            <div class="association-card__detail">
              <span>Affiliazione</span>
              <strong>${escapeHtml(item.affiliation)}</strong>
            </div>
            <div class="association-card__detail">
              <span>Discipline praticate</span>
              <ul>
                ${disciplines.map((discipline) => `<li>${escapeHtml(discipline)}</li>`).join("")}
              </ul>
            </div>
            <p>${escapeHtml(item.description)}</p>
          </div>
          <div class="association-card__footer">
            <div class="association-card__contacts">
              ${contactButton("phone", item.phone)}
              ${contactButton("email", item.email)}
            </div>
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
      <div class="association-grid" tabindex="0" role="region" aria-label="${escapeHtml(data.ariaLabel)}">
        ${items.length ? items.map(associationTemplate).join("") : emptyState(data.emptyMessage)}
      </div>`;

    document
      .querySelectorAll("[data-association-image]")
      .forEach((image) => {
        const showImage = () => {
          if (image.naturalWidth > 0) image.hidden = false;
        };

        image.addEventListener("load", showImage, { once: true });
        image.addEventListener("error", () => {
          image.hidden = true;
        }, { once: true });

        if (image.complete) showImage();
      });
  }

  function renderNews(data) {
    const items = asArray(data.items);
    document.querySelector("#news-content").innerHTML = `
      <div class="section-heading section-heading--split section-heading--actions">
        <div><p class="eyebrow">${escapeHtml(data.eyebrow)}</p><h2 id="news-title">${escapeHtml(data.title)}</h2></div>
        <a class="text-link" href="#news-list" data-scroll-to="news-list">${escapeHtml(data.archiveLabel)} <span aria-hidden="true">→</span></a>
      </div>
      <div class="news-grid" id="news-list">
        ${
          items.length
            ? items
                .map(
                  (item, index) => `
                    <article class="news-card">
                      <span class="news-card__meta">${escapeHtml(item.type)} · ${escapeHtml(item.date)}</span>
                      <h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p>
                      <button class="news-card__action" type="button" data-news-index="${index}" aria-haspopup="dialog">Leggi la comunicazione <span aria-hidden="true">→</span></button>
                    </article>`,
                )
                .join("")
            : emptyState(data.emptyMessage)
        }
      </div>`;
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
      communicationDialog._returnFocus = trigger;
      communicationDialog.showModal();
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
      if (event.target.closest("[data-scroll-top]")) {
        event.preventDefault();
        scrollToTop();
      }
    });

    document.querySelector("#news-list").addEventListener("click", (event) => {
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
        button.addEventListener("click", () => environmentDialog.close()),
      );
    document
      .querySelectorAll("[data-close-communication]")
      .forEach((button) =>
        button.addEventListener("click", () => communicationDialog.close()),
      );
    environmentDialog.addEventListener("close", () => {
      environmentDialog._returnFocus?.focus();
      environmentDialog._returnFocus = null;
    });
    communicationDialog.addEventListener("close", () => {
      communicationDialog._returnFocus?.focus();
      communicationDialog._returnFocus = null;
    });
    [searchDialog, environmentDialog, communicationDialog].forEach((dialog) => {
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
