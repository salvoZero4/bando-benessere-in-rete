(function () {
  "use strict";

  const galleryRoot = document.querySelector("#gallery-content");
  const dialog = document.querySelector("#gallery-dialog");

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

  function loadGalleryData() {
    const data = window.siteContent?.gallery;
    if (!data) {
      throw new Error("File dati della fotogallery mancante.");
    }
    return data;
  }

  function imageTemplate(image, index, className = "") {
    return `
      <div class="gallery-image ${className}">
        <img
          src="${escapeHtml(image.src)}"
          alt="${escapeHtml(image.alt)}"
          loading="${index < 2 ? "eager" : "lazy"}"
          style="object-position: ${escapeHtml(image.position || "center")}"
          data-gallery-image
        />
        <div class="gallery-image__placeholder" data-gallery-placeholder hidden>
          <svg viewBox="0 0 48 48" aria-hidden="true">
            <rect x="5" y="8" width="38" height="32" rx="4" />
            <circle cx="17" cy="19" r="4" />
            <path d="m8 36 10-10 7 7 5-5 10 8" />
          </svg>
          <strong>Immagine non disponibile</strong>
          <small>${escapeHtml(image.src)}</small>
        </div>
      </div>`;
  }

  function photoCardTemplate(image, section, sectionIndex, imageIndex) {
    return `
      <button
        class="gallery-card${image.featured ? " gallery-card--featured" : ""}"
        type="button"
        data-gallery-section="${sectionIndex}"
        data-gallery-image-index="${imageIndex}"
        aria-label="${escapeHtml(section.photoLabel || "Apri la fotografia")}: ${escapeHtml(image.title)}"
      >
        ${imageTemplate(image, imageIndex)}
        <span class="gallery-card__overlay">
          <span class="gallery-card__category">${escapeHtml(section.title)}</span>
          <strong>${escapeHtml(image.title)}</strong>
          ${image.description ? `<span>${escapeHtml(image.description)}</span>` : ""}
        </span>
      </button>`;
  }

  function emptySectionTemplate(data, section) {
    return `
      <div class="gallery-section-empty">
        <span class="gallery-section-empty__icon" aria-hidden="true">
          <svg viewBox="0 0 48 48">
            <rect x="5" y="8" width="38" height="32" rx="4" />
            <circle cx="17" cy="19" r="4" />
            <path d="m8 36 10-10 7 7 5-5 10 8" />
          </svg>
        </span>
        <div>
          <strong>Spazio per le fotografie</strong>
          <p>${escapeHtml(section.emptyMessage || data.emptySectionMessage)}</p>
        </div>
      </div>`;
  }

  function renderGallery(data) {
    const sections = asArray(data.sections);
    const totalImages = sections.reduce(
      (total, section) => total + asArray(section.images).length,
      0,
    );

    galleryRoot.innerHTML = `
      <section class="gallery-hero" aria-labelledby="gallery-title">
        <div class="shell gallery-hero__inner">
          <div>
            <p class="eyebrow">${escapeHtml(data.eyebrow)}</p>
            <h1 id="gallery-title">${escapeHtml(data.title)}</h1>
          </div>
          <p>${escapeHtml(data.description)}</p>
        </div>
      </section>

      <nav class="gallery-index" aria-label="Aree della fotogallery">
        <div class="shell gallery-index__inner">
          ${sections
            .map(
              (section) => `
                <a href="#${escapeHtml(section.id)}">
                  <span>${escapeHtml(section.number)}</span>
                  ${escapeHtml(section.title)}
                </a>`,
            )
            .join("")}
        </div>
      </nav>

      <div class="gallery-macro-sections">
        ${sections
          .map((section, sectionIndex) => {
            const images = asArray(section.images);
            return `
              <section
                class="gallery-macro gallery-macro--${safeToken(section.theme)}"
                id="${escapeHtml(section.id)}"
                aria-labelledby="${escapeHtml(section.id)}-title"
              >
                <div class="shell">
                  <header class="gallery-macro__header">
                    <span class="gallery-macro__number">${escapeHtml(section.number)}</span>
                    <div>
                      <p class="eyebrow">${escapeHtml(section.eyebrow)}</p>
                      <h2 id="${escapeHtml(section.id)}-title">${escapeHtml(section.title)}</h2>
                    </div>
                    <p>${escapeHtml(section.description)}</p>
                  </header>
                  ${
                    images.length
                      ? `<div class="gallery-grid">${images
                          .map((image, imageIndex) =>
                            photoCardTemplate(
                              image,
                              { ...section, photoLabel: data.photoLabel },
                              sectionIndex,
                              imageIndex,
                            ),
                          )
                          .join("")}</div>`
                      : emptySectionTemplate(data, section)
                  }
                </div>
              </section>`;
          })
          .join("")}
      </div>

      <p class="sr-only" aria-live="polite">
        ${totalImages} fotografie presenti nella galleria.
      </p>`;

    bindImageFallbacks();

    galleryRoot.addEventListener("click", (event) => {
      const card = event.target.closest(
        "[data-gallery-section][data-gallery-image-index]",
      );
      if (!card) return;
      const section = sections[Number.parseInt(card.dataset.gallerySection, 10)];
      const image =
        asArray(section?.images)[
          Number.parseInt(card.dataset.galleryImageIndex, 10)
        ];
      openPhoto(image, section, card);
    });
  }

  function bindImageFallbacks(root = document) {
    root.querySelectorAll("[data-gallery-image]").forEach((image) => {
      const showPlaceholder = () => {
        image.hidden = true;
        image.nextElementSibling.hidden = false;
      };
      image.addEventListener("error", showPlaceholder);
      if (image.complete && image.naturalWidth === 0) showPlaceholder();
    });
  }

  function openPhoto(image, section, trigger) {
    if (!image || !section) return;
    dialog.querySelector("#gallery-dialog-category").textContent = section.title;
    dialog.querySelector("#gallery-dialog-title").textContent = image.title;
    dialog.querySelector("#gallery-dialog-description").textContent =
      image.description || "";

    const media = dialog.querySelector("#gallery-dialog-media");
    media.innerHTML = imageTemplate(image, 0, "gallery-image--dialog");
    bindImageFallbacks(media);

    dialog._returnFocus = trigger;
    dialog.showModal();
  }

  function bindCommonInteractions() {
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

    document
      .querySelectorAll("[data-close-gallery]")
      .forEach((button) => button.addEventListener("click", () => dialog.close()));

    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });

    dialog.addEventListener("close", () => {
      dialog._returnFocus?.focus();
      dialog._returnFocus = null;
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
  }

  try {
    const data = loadGalleryData();
    renderGallery(data);
    bindCommonInteractions();
    window.galleryData = { ...data, ready: true };
    galleryRoot.setAttribute("aria-busy", "false");
  } catch (error) {
    console.error(error);
    galleryRoot.innerHTML = `
      <section class="section"><div class="shell data-error" role="alert">
        <p class="eyebrow">Fotogallery non disponibile</p>
        <h1>Non è stato possibile caricare il file dati.</h1>
        <p>${escapeHtml(error.message)}</p>
      </div></section>`;
    galleryRoot.setAttribute("aria-busy", "false");
    window.galleryData = { ready: false, error: error.message };
  }
})();
