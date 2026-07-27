(function () {
  "use strict";

  var root = document.querySelector(".approaching-watch");
  var dataNode = document.getElementById("gajra-upcoming-watch-data");
  if (!root || !dataNode) return;

  var data;
  try {
    data = JSON.parse(dataNode.textContent);
  } catch (error) {
    return;
  }

  var records = Array.from(root.querySelectorAll("[data-watch-record]"));
  var filters = Array.from(root.querySelectorAll("[data-watch-filter]"));
  var search = root.querySelector("[data-watch-search]");
  var status = root.querySelector("[data-watch-status]");
  var activeRoute = "all";

  function applyFilters() {
    var query = search.value.trim().toLowerCase();
    var shown = 0;

    records.forEach(function (card) {
      var routeMatch = activeRoute === "all" || card.dataset.routes.split(" ").includes(activeRoute);
      var searchMatch = !query || card.dataset.search.includes(query);
      card.hidden = !(routeMatch && searchMatch);
      if (!card.hidden) shown += 1;
    });

    status.textContent = shown === 1 ? "1 opportunity shown." : shown + " opportunities shown.";
  }

  filters.forEach(function (button) {
    button.addEventListener("click", function () {
      activeRoute = button.dataset.watchFilter;
      filters.forEach(function (other) {
        other.setAttribute("aria-pressed", String(other === button));
      });
      applyFilters();
    });
  });

  search.addEventListener("input", applyFilters);

  function addOneDay(dateString) {
    var date = new Date(dateString + "T12:00:00Z");
    date.setUTCDate(date.getUTCDate() + 1);
    return date.toISOString().slice(0, 10);
  }

  function escapeCalendarText(value) {
    return String(value || "")
      .replace(/\\/g, "\\\\")
      .replace(/\n/g, "\\n")
      .replace(/,/g, "\\,")
      .replace(/;/g, "\\;");
  }

  function downloadCalendar(record) {
    var start = record.dateStart.replace(/-/g, "");
    var finalDate = record.dateEnd || record.dateStart;
    var end = addOneDay(finalDate).replace(/-/g, "");
    var description = record.summary + "\n\nQuestion to carry: " + record.jraQuestion +
      "\n\nCheck current details: " + record.actionUrl;
    var calendar = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//GAJRA Earth//Upcoming Watch//EN",
      "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      "UID:" + record.id + "@gajra.earth",
      "DTSTART;VALUE=DATE:" + start,
      "DTEND;VALUE=DATE:" + end,
      "SUMMARY:" + escapeCalendarText(record.title),
      "LOCATION:" + escapeCalendarText(record.location),
      "DESCRIPTION:" + escapeCalendarText(description),
      "URL:" + record.actionUrl,
      "END:VEVENT",
      "END:VCALENDAR",
      "",
    ].join("\r\n");
    var blob = new Blob([calendar], { type: "text/calendar;charset=utf-8" });
    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = record.id + ".ics";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);
  }

  root.querySelectorAll("[data-watch-calendar]").forEach(function (button) {
    button.addEventListener("click", function () {
      var record = data.records.find(function (item) {
        return item.id === button.dataset.watchCalendar;
      });
      if (record) downloadCalendar(record);
    });
  });

  applyFilters();
})();
