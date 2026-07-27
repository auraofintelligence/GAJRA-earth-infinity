(function () {
  var root = document.documentElement;
  var slider = document.querySelector("[data-motion-slider]");
  var output = document.querySelector("[data-motion-output]");
  var summary = document.querySelector("[data-motion-summary]");
  var reset = document.querySelector("[data-motion-reset]");
  var storageKey = "gajra-motion-v1";
  var reducedMotion = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : null;

  function storedValue() {
    try {
      var stored = window.localStorage.getItem(storageKey);
      if (stored !== null && stored !== "") return Number(stored);
    } catch (error) {
      return null;
    }
    return null;
  }

  function initialValue() {
    var stored = storedValue();
    if (Number.isFinite(stored)) return Math.max(0, Math.min(100, stored));
    return reducedMotion && reducedMotion.matches ? 0 : 50;
  }

  function setMotion(value, persist) {
    var normalised = Math.max(0, Math.min(100, Number(value) || 0));
    var factor = normalised / 100;
    root.style.setProperty("--motion", factor.toFixed(2));
    root.style.setProperty("--motion-distance", (4 + factor * 20).toFixed(1) + "px");
    root.style.setProperty("--motion-duration", (0.15 + factor * 0.85).toFixed(2) + "s");
    root.style.setProperty("--ticker-duration", (80 - factor * 56).toFixed(1) + "s");
    root.style.setProperty("--glow-strength", (0.1 + factor * 0.9).toFixed(2));
    root.dataset.motion = normalised === 0 ? "off" : "on";
    if (slider) slider.value = String(normalised);
    if (output) output.value = String(normalised);
    if (summary) summary.value = String(normalised);
    document.querySelectorAll("[data-motion-video]").forEach(function (video) {
      if (normalised === 0) {
        video.pause();
      } else if (video.dataset.userPaused !== "true") {
        var playPromise = video.play();
        if (playPromise && playPromise.catch) playPromise.catch(function () {});
      }
    });
    document.dispatchEvent(
      new CustomEvent("gajra:motion", { detail: { value: normalised, factor: factor } }),
    );
    if (persist) {
      try {
        window.localStorage.setItem(storageKey, String(normalised));
      } catch (error) {
        // The control remains useful even when browser storage is unavailable.
      }
    }
  }

  if (slider) {
    setMotion(initialValue(), false);
    slider.addEventListener("input", function () {
      setMotion(slider.value, true);
    });
  }
  if (reset) {
    reset.addEventListener("click", function () {
      setMotion(50, true);
    });
  }

  var menuButton = document.querySelector("[data-menu-toggle]");
  var primaryNav = document.querySelector("[data-primary-nav]");
  if (menuButton && primaryNav) {
    menuButton.addEventListener("click", function () {
      var open = primaryNav.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(open));
    });
    primaryNav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        primaryNav.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
      }
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;
    document.querySelectorAll("details[open]").forEach(function (detail) {
      detail.removeAttribute("open");
    });
    if (primaryNav && menuButton) {
      primaryNav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
})();
