(function () {
  var canvas = document.querySelector("[data-cosmos]");
  if (!canvas) return;

  var context = canvas.getContext("2d", { alpha: true });
  var root = document.documentElement;
  var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var configuredMotion = Number.parseFloat(
    root.style.getPropertyValue("--motion") || getComputedStyle(root).getPropertyValue("--motion"),
  );
  var motion = reducedMotion || root.dataset.motion === "off"
    ? 0
    : Number.isFinite(configuredMotion)
      ? configuredMotion
      : 0.5;
  var stars = [];
  var frame;
  var width = 0;
  var height = 0;
  var dpr = 1;
  var earthReady = false;
  var earthImage = new Image();

  earthImage.decoding = "async";
  earthImage.src = "assets/media/nasa-blue-marble-2012.jpg";
  earthImage.addEventListener("load", function () {
    earthReady = true;
    window.cancelAnimationFrame(frame);
    draw(performance.now());
  });

  var bodies = [
    { name: "Mercury", orbit: 0.14, size: 2.4, angle: -0.65, kind: "rock", colours: ["#e5ded0", "#8b8174", "#343133"] },
    { name: "Venus", orbit: 0.23, size: 4.1, angle: 0.45, kind: "rock", colours: ["#fff0b8", "#d09252", "#573b2f"] },
    { name: "Earth", orbit: 0.33, size: 4.4, angle: 1.45, kind: "earth" },
    { name: "Mars", orbit: 0.43, size: 3.2, angle: 2.45, kind: "rock", colours: ["#ffc1a0", "#d05f45", "#582a2c"] },
    { name: "Jupiter", orbit: 0.59, size: 9.8, angle: -1.35, kind: "jupiter" },
    { name: "Saturn", orbit: 0.73, size: 8.2, angle: 0.18, kind: "saturn" },
    { name: "Uranus", orbit: 0.87, size: 5.7, angle: 2.75, kind: "uranus" },
    { name: "Neptune", orbit: 1, size: 5.5, angle: -2.35, kind: "neptune" },
  ];

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
    window.cancelAnimationFrame(frame);
    draw(performance.now());
  }

  function gradientSphere(x, y, radius, colours) {
    var glow = context.createRadialGradient(
      x - radius * 0.28,
      y - radius * 0.32,
      Math.max(1, radius * 0.05),
      x,
      y,
      radius,
    );
    glow.addColorStop(0, colours[0]);
    glow.addColorStop(0.58, colours[1]);
    glow.addColorStop(1, colours[2]);
    context.fillStyle = glow;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
  }

  function drawEarth(x, y, radius) {
    if (!earthReady) return;
    context.save();
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.clip();
    context.drawImage(earthImage, x - radius, y - radius, radius * 2, radius * 2);
    context.restore();
    context.strokeStyle = "rgba(112, 226, 255, 0.92)";
    context.lineWidth = Math.max(1, radius * 0.12);
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.stroke();
  }

  function drawJupiter(x, y, radius) {
    context.save();
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.clip();
    context.fillStyle = "#d5b083";
    context.fillRect(x - radius, y - radius, radius * 2, radius * 2);
    var bands = ["#f1dfc0", "#aa7658", "#e2c69a", "#825846", "#f4e2bf", "#b9825c"];
    bands.forEach(function (colour, index) {
      var bandHeight = (radius * 2) / bands.length;
      context.fillStyle = colour;
      context.fillRect(x - radius, y - radius + index * bandHeight, radius * 2, bandHeight + 1);
    });
    context.fillStyle = "rgba(163, 65, 45, 0.9)";
    context.beginPath();
    context.ellipse(x + radius * 0.35, y + radius * 0.26, radius * 0.24, radius * 0.13, -0.12, 0, Math.PI * 2);
    context.fill();
    context.restore();
  }

  function drawSaturn(x, y, radius) {
    context.save();
    context.strokeStyle = "rgba(220, 193, 139, 0.76)";
    context.lineWidth = Math.max(2, radius * 0.24);
    context.beginPath();
    context.ellipse(x, y, radius * 1.85, radius * 0.52, -0.24, Math.PI, Math.PI * 2);
    context.stroke();
    gradientSphere(x, y, radius, ["#fff1c9", "#c8a875", "#5f5050"]);
    context.strokeStyle = "rgba(246, 222, 172, 0.9)";
    context.lineWidth = Math.max(2, radius * 0.16);
    context.beginPath();
    context.ellipse(x, y, radius * 1.85, radius * 0.52, -0.24, 0, Math.PI);
    context.stroke();
    context.restore();
  }

  function drawUranus(x, y, radius) {
    context.save();
    context.strokeStyle = "rgba(179, 238, 238, 0.6)";
    context.lineWidth = Math.max(1, radius * 0.12);
    context.beginPath();
    context.ellipse(x, y, radius * 1.55, radius * 0.38, Math.PI / 2.2, 0, Math.PI * 2);
    context.stroke();
    gradientSphere(x, y, radius, ["#ddffff", "#80cfd0", "#315e72"]);
    context.restore();
  }

  function drawLabel(name, x, y, radius, compact) {
    context.font = (compact ? "600 8px" : "600 10px") + " ui-monospace, SFMono-Regular, Consolas, monospace";
    context.fillStyle = name === "Earth" ? "rgba(115, 244, 223, 0.98)" : "rgba(245, 242, 234, 0.76)";
    context.textAlign = x > width * 0.82 ? "right" : "left";
    var offset = radius + (compact ? 4 : 6);
    context.fillText(name.toUpperCase(), x > width * 0.82 ? x - offset : x + offset, y - radius * 0.3);
  }

  function drawBody(body, x, y, radius, compact) {
    if (body.kind === "earth") drawEarth(x, y, radius);
    if (body.kind === "rock") gradientSphere(x, y, radius, body.colours);
    if (body.kind === "jupiter") drawJupiter(x, y, radius);
    if (body.kind === "saturn") drawSaturn(x, y, radius);
    if (body.kind === "uranus") drawUranus(x, y, radius);
    if (body.kind === "neptune") gradientSphere(x, y, radius, ["#8cb9ff", "#356ccb", "#15285d"]);
    drawLabel(body.name, x, y, radius, compact);
  }

  function draw(time) {
    var compact = width < 720;
    context.clearRect(0, 0, width, height);
    context.fillStyle = "rgba(3, 4, 10, 0.72)";
    context.fillRect(0, 0, width, height);

    var nebula = context.createRadialGradient(width * 0.72, height * 0.34, 0, width * 0.72, height * 0.34, width * 0.72);
    nebula.addColorStop(0, "rgba(17, 77, 81, 0.20)");
    nebula.addColorStop(0.42, "rgba(66, 24, 74, 0.10)");
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

    var systemX = compact ? width * 0.5 : width * 0.77;
    var systemY = compact ? height * 0.25 : height * 0.43;
    var systemScale = compact
      ? Math.min(width * 0.46, height * 0.19)
      : Math.min(width * 0.31, height * 0.37);
    var orbitHeight = compact ? 0.58 : 0.45;

    context.strokeStyle = "rgba(225, 237, 255, 0.16)";
    context.lineWidth = 1;
    bodies.forEach(function (body) {
      context.beginPath();
      context.ellipse(
        systemX,
        systemY,
        systemScale * body.orbit,
        systemScale * body.orbit * orbitHeight,
        -0.12,
        0,
        Math.PI * 2,
      );
      context.stroke();
    });

    var sunRadius = Math.max(compact ? 9 : 12, systemScale * 0.052);
    var sunGlow = context.createRadialGradient(systemX, systemY, 0, systemX, systemY, sunRadius * 4);
    sunGlow.addColorStop(0, "rgba(255, 239, 189, 1)");
    sunGlow.addColorStop(0.26, "rgba(255, 166, 76, 0.76)");
    sunGlow.addColorStop(1, "rgba(255, 108, 53, 0)");
    context.fillStyle = sunGlow;
    context.beginPath();
    context.arc(systemX, systemY, sunRadius * 4, 0, Math.PI * 2);
    context.fill();
    gradientSphere(systemX, systemY, sunRadius, ["#fffbe4", "#ffc363", "#d35a32"]);
    drawLabel("Sol", systemX, systemY, sunRadius, compact);

    bodies.forEach(function (body, index) {
      var speed = (0.000012 + (7 - index) * 0.0000018) * motion * 1.28;
      var angle = body.angle + time * speed;
      var x = systemX + Math.cos(angle) * systemScale * body.orbit;
      var y = systemY + Math.sin(angle) * systemScale * body.orbit * orbitHeight;
      var sizeUnit = Math.max(compact ? 0.74 : 0.95, systemScale / 185);
      var radius = Math.max(body.name === "Mercury" ? 2.2 : 3, body.size * sizeUnit);
      drawBody(body, x, y, radius, compact);
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
  window.addEventListener("resize", resize, { passive: true });
  document.addEventListener("gajra:motion", updateMotion);
})();
