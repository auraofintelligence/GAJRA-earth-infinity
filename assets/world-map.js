import * as maplibregl from "./vendor/maplibre-gl.mjs";

(function () {
  var container = document.querySelector("[data-world-map]");
  var dataElement = document.getElementById("gajra-world-map-data");
  var statusElement = document.getElementById("world-map-status");
  var recordButtons = document.querySelectorAll("[data-map-record-button]");
  var projectionButtons = document.querySelectorAll("[data-map-projection]");
  var resetButton = document.querySelector("[data-map-reset]");

  if (!container || !dataElement) return;

  container.setAttribute("role", "region");
  if (statusElement) statusElement.setAttribute("aria-atomic", "true");

  var lastStatus = "";
  var recordsData;
  try {
    recordsData = JSON.parse(dataElement.textContent || "{}");
  } catch (error) {
    setStatus("Map data could not be read.");
    return;
  }

  var records = Array.isArray(recordsData.records) ? recordsData.records : [];
  var bridges = Array.isArray(recordsData.bridges) ? recordsData.bridges : [];
  var recordsById = new Map(records.map(function (record) {
    return [record.id, record];
  }));

  function setStatus(message) {
    if (!statusElement || message === lastStatus) return;
    lastStatus = message;
    statusElement.textContent = message;
  }

  function escapeText(value) {
    return String(value || "");
  }

  function makePointGeoJson() {
    return {
      type: "FeatureCollection",
      features: records
        .filter(function (record) {
          return Array.isArray(record.coordinates) && record.coordinates.length === 2;
        })
        .map(function (record) {
          return {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: record.coordinates,
            },
            properties: {
              id: record.id,
              kind: record.kind,
              name: record.name,
              locationLabel: record.locationLabel,
              precision: record.precision,
            },
          };
        }),
    };
  }

  function makeBridgeGeoJson() {
    return {
      type: "FeatureCollection",
      features: bridges
        .map(function (bridge) {
          var from = recordsById.get(bridge.from);
          var to = recordsById.get(bridge.to);
          if (!from || !to || !Array.isArray(from.coordinates) || !Array.isArray(to.coordinates)) return null;
          return {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [from.coordinates, to.coordinates],
            },
            properties: {
              id: bridge.id,
              label: bridge.label || "",
              status: bridge.status || "proposed",
            },
          };
        })
        .filter(Boolean),
    };
  }

  function popupForRecord(record) {
    var root = document.createElement("article");
    root.className = "world-map-popup";

    var label = document.createElement("span");
    label.textContent = escapeText(record.kind).replaceAll("-", " ");

    var title = document.createElement("h3");
    title.textContent = escapeText(record.name);

    var place = document.createElement("p");
    place.textContent = escapeText(record.locationLabel) + " | " + escapeText(record.precision);

    var note = document.createElement("p");
    note.textContent = escapeText(record.publicNote);

    root.append(label, title, place, note);

    if (record.url) {
      var link = document.createElement("a");
      link.href = record.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "Open source in a new tab";
      root.append(link);
    }

    return root;
  }

  function setProjection(map, projection) {
    var next = projection === "mercator" ? "mercator" : "globe";
    map.setProjection({ type: next });
    projectionButtons.forEach(function (button) {
      button.setAttribute("aria-pressed", String(button.dataset.mapProjection === next));
    });
    setStatus(next === "globe"
      ? "Sphere view active. Choose a public record below the map to explore a place."
      : "Flat view active. Choose a public record below the map to explore a place.");
  }

  function focusRecord(map, record) {
    if (!record || !Array.isArray(record.coordinates)) return;
    map.flyTo({
      center: record.coordinates,
      zoom: 4.4,
      speed: 0.7,
      essential: false,
    });
    new maplibregl.Popup({ closeButton: true, closeOnClick: true, maxWidth: "22rem" })
      .setLngLat(record.coordinates)
      .setDOMContent(popupForRecord(record))
      .addTo(map);
    setStatus("Showing " + record.name + ".");
  }

  function resetView(map) {
    map.flyTo({
      center: [18, 2],
      zoom: 1.25,
      bearing: 0,
      pitch: 0,
      speed: 0.75,
      essential: false,
    });
    setStatus("World view reset.");
  }

  var style = {
    version: 8,
    sources: {
      "eox-sentinel-cloudless": {
        type: "raster",
        tiles: [
          "https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless_3857/default/g/{z}/{y}/{x}.jpg",
        ],
        tileSize: 256,
        minzoom: 0,
        maxzoom: 13,
      },
    },
    layers: [
      {
        id: "satellite",
        type: "raster",
        source: "eox-sentinel-cloudless",
        paint: {
          "raster-brightness-min": 0.02,
          "raster-brightness-max": 0.9,
          "raster-contrast": 0.1,
          "raster-saturation": 0.05,
        },
      },
    ],
  };

  var map;
  try {
    map = new maplibregl.Map({
      container: container,
      style: style,
      center: [18, 2],
      zoom: 1.25,
      minZoom: 0.4,
      maxZoom: 9,
      projection: { type: "globe" },
      renderWorldCopies: false,
      attributionControl: false,
      hash: false,
    });
  } catch (error) {
    setStatus("Map engine could not start. The public records remain available below.");
    return;
  }

  map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), "bottom-left");

  if (typeof map.setFog === "function") {
    map.setFog({
      color: "rgb(7, 7, 10)",
      "high-color": "rgb(49, 74, 98)",
      "horizon-blend": 0.08,
      "space-color": "rgb(3, 4, 8)",
      "star-intensity": 0.35,
    });
  }

  var mapInitialised = false;

  function initialiseMapLayers() {
    if (mapInitialised) return;
    mapInitialised = true;
    container.dataset.mapReady = "true";
    setStatus(
      "Satellite atlas ready. " +
      records.length +
      " public record" +
      (records.length === 1 ? "" : "s") +
      " available. Use the view controls or choose a record below the map.",
    );

    map.addSource("gajra-records", {
      type: "geojson",
      data: makePointGeoJson(),
    });
    map.addSource("gajra-bridges", {
      type: "geojson",
      data: makeBridgeGeoJson(),
    });

    map.addLayer({
      id: "gajra-bridges-line",
      type: "line",
      source: "gajra-bridges",
      paint: {
        "line-color": "#73f4df",
        "line-width": 2,
        "line-opacity": 0.78,
      },
    });

    map.addLayer({
      id: "gajra-record-glow",
      type: "circle",
      source: "gajra-records",
      paint: {
        "circle-radius": 18,
        "circle-color": "#73f4df",
        "circle-opacity": 0.16,
        "circle-blur": 0.55,
      },
    });

    map.addLayer({
      id: "gajra-record-dot",
      type: "circle",
      source: "gajra-records",
      paint: {
        "circle-radius": 7,
        "circle-color": [
          "match",
          ["get", "kind"],
          "project-origin",
          "#ffbf52",
          "#73f4df",
        ],
        "circle-stroke-color": "#f7f2e8",
        "circle-stroke-width": 1.5,
      },
    });

    map.on("mouseenter", "gajra-record-dot", function () {
      map.getCanvas().style.cursor = "pointer";
    });

    map.on("mouseleave", "gajra-record-dot", function () {
      map.getCanvas().style.cursor = "";
    });

    map.on("click", "gajra-record-dot", function (event) {
      var feature = event.features && event.features[0];
      if (!feature) return;
      focusRecord(map, recordsById.get(feature.properties.id));
    });
  }

  map.on("load", initialiseMapLayers);
  map.on("style.load", initialiseMapLayers);
  map.on("idle", initialiseMapLayers);
  map.on("render", function () {
    if (!mapInitialised && typeof map.isStyleLoaded === "function" && map.isStyleLoaded()) {
      initialiseMapLayers();
    }
  });

  window.setTimeout(function () {
    if (!mapInitialised && typeof map.isStyleLoaded === "function" && map.isStyleLoaded()) {
      initialiseMapLayers();
    }
  }, 2500);

  var imageryErrorTimer;
  var imageryErrorAnnounced = false;
  map.on("error", function () {
    if (imageryErrorAnnounced) return;
    window.clearTimeout(imageryErrorTimer);
    imageryErrorTimer = window.setTimeout(function () {
      imageryErrorAnnounced = true;
      setStatus("Some satellite imagery is unavailable. The public record list below remains available.");
    }, 800);
  });

  projectionButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      setProjection(map, button.dataset.mapProjection);
    });
  });

  if (resetButton) {
    resetButton.addEventListener("click", function () {
      resetView(map);
    });
  }

  recordButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var record = recordsById.get(button.dataset.mapRecordButton);
      focusRecord(map, record);
    });
  });
})();
