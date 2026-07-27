(function () {
  "use strict";

  var root = document.querySelector(".approaching-watch");
  var dataNode = document.getElementById("gajra-upcoming-watch-data");
  var status = root ? root.querySelector("[data-watch-status]") : null;
  if (!root || !dataNode) return;

  var data;
  try {
    data = JSON.parse(dataNode.textContent);
  } catch (error) {
    if (status) status.textContent = "Upcoming opportunities could not be read.";
    return;
  }

  var records = Array.from(root.querySelectorAll("[data-watch-record]"));
  var filters = Array.from(root.querySelectorAll("[data-watch-filter]"));
  var search = root.querySelector("[data-watch-search]");
  var activeRoute = "all";
  if (status) status.setAttribute("aria-atomic", "true");

  function applyFilters() {
    var query = search ? search.value.trim().toLowerCase() : "";
    var shown = 0;

    records.forEach(function (card) {
      var routeMatch = activeRoute === "all" || card.dataset.routes.split(" ").includes(activeRoute);
      var searchMatch = !query || card.dataset.search.includes(query);
      card.hidden = !(routeMatch && searchMatch);
      if (!card.hidden) shown += 1;
    });

    if (status) {
      status.textContent =
        shown === 0
          ? "No opportunities match those filters."
          : shown === 1
            ? "1 opportunity shown."
            : shown + " opportunities shown.";
    }
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

  if (search) search.addEventListener("input", applyFilters);

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
    if (!record.dateStart || Number.isNaN(Date.parse(record.dateStart + "T12:00:00Z"))) {
      if (status) status.textContent = "This opportunity has no valid date for a calendar file.";
      return;
    }
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
      "DTSTAMP:" + new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, ""),
      "DTSTART;VALUE=DATE:" + start,
      "DTEND;VALUE=DATE:" + end,
      "SUMMARY:" + escapeCalendarText(record.title),
      "LOCATION:" + escapeCalendarText(record.location),
      "DESCRIPTION:" + escapeCalendarText(description),
      "URL:" + escapeCalendarText(record.actionUrl),
      "END:VEVENT",
      "END:VCALENDAR",
      "",
    ].join("\r\n");
    var blob = new Blob([calendar], { type: "text/calendar;charset=utf-8" });
    var link = document.createElement("a");
    var url = URL.createObjectURL(blob);
    link.href = url;
    link.download = record.id + ".ics";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 1000);
    if (status) status.textContent = "Calendar file downloaded for " + record.title + ".";
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
