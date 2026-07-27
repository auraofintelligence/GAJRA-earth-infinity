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

  function setViewportWidth() {
    var viewportWidth = root.clientWidth;
    root.style.setProperty("--viewport-width", viewportWidth + "px");
    root.style.setProperty("--viewport-half-width", viewportWidth / 2 + "px");
  }

  setViewportWidth();
  window.addEventListener("resize", setViewportWidth, { passive: true });

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
    root.style.setProperty("--rail-duration", (190 - factor * 90).toFixed(1) + "s");
    root.style.setProperty("--seam-duration", (16 - factor * 10).toFixed(1) + "s");
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
    if (normalised === 0) {
      root.removeAttribute("data-pointer");
      document.querySelectorAll(".signal-card.is-pointer-active, .signal-card.is-touch-balanced").forEach(function (card) {
        card.classList.remove("is-pointer-active", "is-touch-balanced");
      });
    }
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

  document.querySelectorAll("[data-motion-video]").forEach(function (video) {
    video.addEventListener("pause", function () {
      if (root.dataset.motion !== "off") video.dataset.userPaused = "true";
    });
    video.addEventListener("play", function () {
      video.dataset.userPaused = "false";
    });
  });

  var pointerHideTimer;
  var cardTargets = document.querySelectorAll(".signal-card");

  function motionFactor() {
    if (root.dataset.motion === "off") return 0;
    return Number.parseFloat(getComputedStyle(root).getPropertyValue("--motion")) || 0;
  }

  function positionPointerLight(x, y, temporary) {
    if (!motionFactor()) return;
    root.style.setProperty("--pointer-x", x + "px");
    root.style.setProperty("--pointer-y", y + "px");
    root.dataset.pointer = "active";
    if (!temporary) return;
    window.clearTimeout(pointerHideTimer);
    pointerHideTimer = window.setTimeout(function () {
      root.removeAttribute("data-pointer");
    }, 900);
  }

  window.addEventListener(
    "pointermove",
    function (event) {
      positionPointerLight(event.clientX, event.clientY, event.pointerType === "touch");
    },
    { passive: true },
  );

  window.addEventListener("pointerleave", function () {
    root.removeAttribute("data-pointer");
  });

  cardTargets.forEach(function (card) {
    var touchTimer;

    function setCardLight(event) {
      var bounds = card.getBoundingClientRect();
      var x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
      var y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
      var factor = motionFactor();
      var balanceStrength = Math.min(1.55, factor * 2);
      card.style.setProperty("--card-light-x", (x * 100).toFixed(1) + "%");
      card.style.setProperty("--card-light-y", (y * 100).toFixed(1) + "%");
      card.style.setProperty("--card-rotate-x", ((0.5 - y) * 5 * balanceStrength).toFixed(2) + "deg");
      card.style.setProperty("--card-rotate-y", ((x - 0.5) * 6 * balanceStrength).toFixed(2) + "deg");
    }

    card.addEventListener(
      "pointermove",
      function (event) {
        if (!motionFactor() || event.pointerType === "touch") return;
        setCardLight(event);
        card.classList.add("is-pointer-active");
      },
      { passive: true },
    );

    card.addEventListener("pointerleave", function () {
      card.classList.remove("is-pointer-active");
      card.style.setProperty("--card-rotate-x", "0deg");
      card.style.setProperty("--card-rotate-y", "0deg");
    });

    card.addEventListener(
      "pointerdown",
      function (event) {
        if (!motionFactor()) return;
        setCardLight(event);
        positionPointerLight(event.clientX, event.clientY, event.pointerType === "touch");
        if (event.pointerType !== "touch") return;
        window.clearTimeout(touchTimer);
        card.classList.remove("is-touch-balanced");
        window.requestAnimationFrame(function () {
          card.classList.add("is-touch-balanced");
        });
        touchTimer = window.setTimeout(function () {
          card.classList.remove("is-touch-balanced");
          card.style.setProperty("--card-rotate-x", "0deg");
          card.style.setProperty("--card-rotate-y", "0deg");
        }, 700);
      },
      { passive: true },
    );
  });

  var seams = document.querySelectorAll("[data-kintsugi]");
  if ("IntersectionObserver" in window) {
    var seamObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-drawn");
          seamObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    seams.forEach(function (seam) {
      seamObserver.observe(seam);
    });
  } else {
    seams.forEach(function (seam) {
      seam.classList.add("is-drawn");
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
