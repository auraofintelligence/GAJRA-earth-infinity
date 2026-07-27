(function () {
  var canvas = document.querySelector("[data-cosmos]");
  if (!canvas) return;
  var context = canvas.getContext("2d", { alpha: false });
  var motion = 0.5;
  var stars = [];
  var frame;
  var width = 0;
  var height = 0;
  var dpr = 1;

  function randomStar() {
    return {
      x: Math.random(),
      y: Math.random(),
      size: 0.25 + Math.random() * 1.6,
      phase: Math.random() * Math.PI * 2,
      tint: Math.random(),
    };
  }

  function resize() {
    var bounds = canvas.getBoundingClientRect();
    width = Math.max(1, bounds.width);
    height = Math.max(1, bounds.height);
    dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    var count = Math.max(80, Math.min(320, Math.round((width * height) / 5000)));
    stars = Array.from({ length: count }, randomStar);
  }

  function planet(x, y, radius, colours) {
    var glow = context.createRadialGradient(x - radius * 0.25, y - radius * 0.3, 1, x, y, radius);
    glow.addColorStop(0, colours[0]);
    glow.addColorStop(0.58, colours[1]);
    glow.addColorStop(1, colours[2]);
    context.fillStyle = glow;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
  }

  function draw(time) {
    context.fillStyle = "#05050a";
    context.fillRect(0, 0, width, height);

    var nebula = context.createRadialGradient(width * 0.7, height * 0.24, 0, width * 0.7, height * 0.24, width * 0.7);
    nebula.addColorStop(0, "rgba(17, 77, 81, 0.22)");
    nebula.addColorStop(0.42, "rgba(66, 24, 74, 0.12)");
    nebula.addColorStop(1, "rgba(5, 5, 10, 0)");
    context.fillStyle = nebula;
    context.fillRect(0, 0, width, height);

    stars.forEach(function (star) {
      var pulse = motion === 0 ? 0.8 : 0.55 + Math.sin(time * 0.0007 * motion + star.phase) * 0.35;
      context.fillStyle =
        star.tint > 0.9
          ? "rgba(255, 197, 116," + pulse + ")"
          : star.tint < 0.1
            ? "rgba(115, 244, 223," + pulse + ")"
            : "rgba(245, 247, 255," + pulse + ")";
      context.beginPath();
      context.arc(star.x * width, star.y * height, star.size, 0, Math.PI * 2);
      context.fill();
    });

    var systemX = width * 0.76;
    var systemY = height * 0.42;
    var systemScale = Math.min(width, height) * 0.35;
    var orbitRadii = [0.2, 0.33, 0.48, 0.64, 0.82, 1];
    context.strokeStyle = "rgba(225, 237, 255, 0.10)";
    context.lineWidth = 1;
    orbitRadii.forEach(function (orbit) {
      context.beginPath();
      context.ellipse(systemX, systemY, systemScale * orbit, systemScale * orbit * 0.48, -0.18, 0, Math.PI * 2);
      context.stroke();
    });

    var sunGlow = context.createRadialGradient(systemX, systemY, 0, systemX, systemY, systemScale * 0.22);
    sunGlow.addColorStop(0, "rgba(255, 233, 174, 0.95)");
    sunGlow.addColorStop(0.25, "rgba(255, 166, 76, 0.7)");
    sunGlow.addColorStop(1, "rgba(255, 108, 53, 0)");
    context.fillStyle = sunGlow;
    context.beginPath();
    context.arc(systemX, systemY, systemScale * 0.22, 0, Math.PI * 2);
    context.fill();
    planet(systemX, systemY, Math.max(9, systemScale * 0.055), ["#fff7d5", "#ffc363", "#d35a32"]);

    orbitRadii.forEach(function (orbit, index) {
      // Earth is deliberately not drawn here. The real planet is shown with
      // credited NASA raster imagery at the threshold of the hero.
      if (index === 2) return;
      var speed = (0.00006 + index * 0.000008) * (0.25 + motion * 1.2);
      var angle = time * speed + index * 1.31;
      var x = systemX + Math.cos(angle) * systemScale * orbit;
      var y = systemY + Math.sin(angle) * systemScale * orbit * 0.48;
      var palettes = [
        ["#f0e8d5", "#9c8c79", "#423c39"],
        ["#fff0bd", "#d59054", "#5a3d32"],
        ["#cbffe8", "#5fc7b1", "#18304a"],
        ["#ffc4a0", "#d8674f", "#5d2d36"],
        ["#f5e5b2", "#b98f62", "#4c3c38"],
        ["#f4e2bf", "#c6ab76", "#534a51"],
      ];
      planet(x, y, Math.max(2, systemScale * (0.012 + index * 0.004)), palettes[index]);
    });

    if (motion > 0) {
      frame = window.requestAnimationFrame(draw);
    }
  }

  function updateMotion(event) {
    motion = event.detail.factor;
    window.cancelAnimationFrame(frame);
    draw(performance.now());
  }

  resize();
  draw(performance.now());
  window.addEventListener("resize", resize, { passive: true });
  document.addEventListener("gajra:motion", updateMotion);
})();
