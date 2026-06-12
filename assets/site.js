(function () {
  const root = document.documentElement;
  const storedTheme = localStorage.getItem("enterprise-html-theme");
  const initialTheme = storedTheme || "dark";
  root.dataset.theme = initialTheme;

  function icon(name) {
    const icons = {
      sun: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
      moon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 14.7A8.5 8.5 0 0 1 9.3 3 7 7 0 1 0 21 14.7Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    };
    return icons[name] || "";
  }

  function syncThemeButtons() {
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      const isLight = root.dataset.theme === "light";
      button.setAttribute("aria-label", `Switch to ${isLight ? "dark" : "light"} mode`);
      button.innerHTML = `${icon(isLight ? "moon" : "sun")} ${isLight ? "Dark" : "Light"}`;
    });
  }

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-theme-toggle]");
    if (!button) return;
    const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = nextTheme;
    localStorage.setItem("enterprise-html-theme", nextTheme);
    syncThemeButtons();
  });

  syncThemeButtons();

  const filterButtons = Array.from(document.querySelectorAll("[data-filter]"));
  const cards = Array.from(document.querySelectorAll("[data-lens]"));

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((item) => item.classList.toggle("active", item === button));
      cards.forEach((card) => {
        const show = filter === "all" || card.dataset.lens === filter;
        card.hidden = !show;
      });
    });
  });

  const revealItems = Array.from(document.querySelectorAll(".reveal"));
  revealItems.forEach((item) => item.classList.add("is-visible"));
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  const presenter = document.querySelector("[data-presenter]");
  const openPresenter = document.querySelector("[data-open-presenter]");
  const closePresenter = document.querySelector("[data-close-presenter]");
  const prev = document.querySelector("[data-prev-slide]");
  const next = document.querySelector("[data-next-slide]");
  const count = document.querySelector("[data-slide-count]");
  const slides = Array.from(document.querySelectorAll("[data-slide]"));
  let index = 0;

  function renderSlide() {
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("active", slideIndex === index);
    });
    if (count) {
      count.textContent = `${index + 1} / ${slides.length}`;
    }
  }

  function showPresenter() {
    if (!presenter) return;
    presenter.classList.add("active");
    presenter.setAttribute("aria-hidden", "false");
    renderSlide();
    closePresenter?.focus();
  }

  function hidePresenter() {
    if (!presenter) return;
    presenter.classList.remove("active");
    presenter.setAttribute("aria-hidden", "true");
    openPresenter?.focus();
  }

  function moveSlide(delta) {
    if (!slides.length) return;
    index = (index + delta + slides.length) % slides.length;
    renderSlide();
  }

  openPresenter?.addEventListener("click", showPresenter);
  closePresenter?.addEventListener("click", hidePresenter);
  prev?.addEventListener("click", () => moveSlide(-1));
  next?.addEventListener("click", () => moveSlide(1));

  document.addEventListener("keydown", (event) => {
    const target = event.target;
    const editing = target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
    if (!editing && event.key.toLowerCase() === "p" && !presenter?.classList.contains("active")) {
      showPresenter();
      return;
    }

    if (!presenter?.classList.contains("active")) return;

    if (event.key === "Escape") hidePresenter();
    if (event.key === "ArrowRight" || event.key === "PageDown") moveSlide(1);
    if (event.key === "ArrowLeft" || event.key === "PageUp") moveSlide(-1);
  });
})();
