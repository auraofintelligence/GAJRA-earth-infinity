(function () {
  "use strict";

  const labels = {
    meeting: {
      heading: "GAJRA EARTH MEETING CIRCLE",
      title: "Meeting title",
      kind: "Circle type",
      host: "Host or steward",
      location: "Place or link",
      invitees: "People to invite",
      question: "Core question",
      joy: "Joy to notice",
      responsibility: "Responsibility to protect",
      abundance: "Abundance to grow",
      trace: "Trace and consent",
      next: "Next step",
      file: "gajra-meeting-circle",
      subject: "GAJRA Earth meeting circle",
      copied: "Invitation copied.",
      downloaded: "Invitation downloaded."
    },
    event: {
      heading: "GAJRA EARTH FIELD KIT",
      title: "Kit name",
      kind: "Gathering type",
      host: "Host or group",
      location: "Place",
      invitees: "Who may wander up",
      question: "Question on the table",
      joy: "Useful help offered",
      responsibility: "Care and consent",
      abundance: "Materials",
      trace: "Trace to carry home",
      next: "Return path",
      file: "gajra-field-kit",
      subject: "GAJRA Earth field kit",
      copied: "Field kit copied.",
      downloaded: "Field kit downloaded."
    }
  };

  function clean(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function getFormData(form) {
    return Object.fromEntries(new FormData(form).entries());
  }

  function slug(value) {
    const safe = clean(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    return safe || "draft";
  }

  function line(label, value) {
    const text = clean(value);
    return text ? `- ${label}: ${text}` : null;
  }

  const essentialFields = {
    meeting: [
      ["title", "a meeting title"],
      ["location", "a place or call link"],
      ["date", "a date"],
      ["time", "a start time"],
      ["question", "the question"],
    ],
    event: [
      ["title", "a kit name"],
      ["location", "a place"],
      ["date", "a date"],
      ["time", "a start time"],
      ["question", "the question on the table"],
    ],
  };

  function listWords(items) {
    if (items.length < 2) return items[0] || "";
    if (items.length === 2) return `${items[0]} and ${items[1]}`;
    return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
  }

  function missingEssentials(type, data) {
    return (essentialFields[type] || [])
      .filter(([name]) => !clean(data[name]))
      .map(([, label]) => label);
  }

  function compose(type, data) {
    const l = labels[type];
    const title = clean(data.title) || (type === "meeting" ? "Untitled meeting circle" : "Untitled field kit");
    const date = clean(data.date);
    const time = clean(data.time);
    const duration = clean(data.duration);
    const end = clean(data.end || data.end_time || data.finish);
    const timing = end ? `${time || "Start time not set"} to ${end}` : [time, duration].filter(Boolean).join(", ");
    const when = [date, timing].filter(Boolean).join(", ");
    const missing = missingEssentials(type, data);
    const check = missing.length ? `> Draft check: ${listWords(missing)} still open.` : "";
    if (type === "meeting") {
      return [
        `# ${title}`,
        "",
        "A GAJRA EARTH MEETING CIRCLE",
        check ? "" : null,
        check || null,
        "",
        line(l.host, data.host),
        line(l.location, data.location),
        line("When", when),
        line(l.invitees, data.invitees),
        "",
        "## The question",
        clean(data.question) || "",
        "",
        line("Access and shared trace", data.trace),
        "",
        "A meeting of minds about self-alignment and AI alignment within Joyful Responsible Abundance."
      ].filter((part) => part !== null).join("\n");
    }
    return [
      `# ${title}`,
      "",
      l.heading,
      check ? "" : null,
      check || null,
      "",
      line(l.kind, data.kind),
      line(l.host, data.host),
      line(l.location, data.location),
      line("When", when),
      line(l.invitees, data.invitees),
      "",
      `## ${l.question}`,
      clean(data.question) || "",
      "",
      "## Joyful Responsible Abundance",
      line(l.joy, data.joy),
      line(l.responsibility, data.responsibility),
      line(l.abundance, data.abundance),
      "",
      "## Consent and return path",
      line(l.trace, data.trace),
      line(l.next, data.next),
      "",
      "Drafted locally in the browser. Nothing was sent by the page."
    ].filter((part) => part !== null).join("\n");
  }

  function download(filename, text, mime) {
    const blob = new Blob([text], { type: mime || "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1200);
  }

  function calendarEscape(value) {
    return String(value || "")
      .replace(/\\/g, "\\\\")
      .replace(/\r?\n/g, "\\n")
      .replace(/,/g, "\\,")
      .replace(/;/g, "\\;");
  }

  function parseDurationMinutes(value) {
    const text = clean(value).toLowerCase();
    if (!text) return null;
    if (/^\d{1,2}:\d{2}$/.test(text)) {
      const [hours, minutes] = text.split(":").map(Number);
      return hours * 60 + minutes;
    }
    if (/^\d+(?:\.\d+)?$/.test(text)) return Math.round(Number(text));
    if (text === "half an hour" || text === "half hour") return 30;
    const hours = [...text.matchAll(/(\d+(?:\.\d+)?)\s*(?:hours?|hrs?|h)\b/g)]
      .reduce((total, match) => total + Number(match[1]) * 60, 0);
    const minutes = [...text.matchAll(/(\d+(?:\.\d+)?)\s*(?:minutes?|mins?|m)\b/g)]
      .reduce((total, match) => total + Number(match[1]), 0);
    const total = Math.round(hours + minutes);
    return total > 0 ? total : NaN;
  }

  function parseClock(value) {
    const match = clean(value).match(/^(\d{1,2}):(\d{2})$/);
    if (!match) return null;
    const hour = Number(match[1]);
    const minute = Number(match[2]);
    if (hour > 23 || minute > 59) return null;
    return hour * 60 + minute;
  }

  function addMinutes(dateValue, timeValue, minutes) {
    const dateParts = String(dateValue).split("-").map(Number);
    const timeParts = String(timeValue).split(":").map(Number);
    const instant = new Date(Date.UTC(
      dateParts[0],
      dateParts[1] - 1,
      dateParts[2],
      timeParts[0],
      timeParts[1] + minutes,
      0,
    ));
    return {
      date: [
        instant.getUTCFullYear(),
        String(instant.getUTCMonth() + 1).padStart(2, "0"),
        String(instant.getUTCDate()).padStart(2, "0"),
      ].join(""),
      time: [
        String(instant.getUTCHours()).padStart(2, "0"),
        String(instant.getUTCMinutes()).padStart(2, "0"),
        "00",
      ].join(""),
    };
  }

  function calendarText(type, data, body) {
    const missing = [
      !clean(data.title) ? (type === "meeting" ? "a meeting title" : "a kit name") : "",
      !clean(data.date) ? "a date" : "",
      !clean(data.time) ? "a start time" : "",
    ].filter(Boolean);
    if (missing.length) {
      return { error: `Calendar file unavailable: ${listWords(missing)} not entered.` };
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date) || parseClock(data.time) === null) {
      return { error: "Check the date and start time before downloading a calendar file." };
    }

    const title = clean(data.title) || labels[type].subject;
    const location = clean(data.location);
    const start = data.date.replaceAll("-", "") + "T" + data.time.replace(":", "") + "00";
    const enteredEnd = clean(data.end || data.end_time || data.finish);
    const enteredDuration = clean(data.duration);
    let end;
    let durationNote = "";

    if (enteredEnd) {
      const startMinutes = parseClock(data.time);
      const endMinutes = parseClock(enteredEnd);
      if (endMinutes === null) {
        return { error: "Check the end time before downloading a calendar file." };
      }
      let delta = endMinutes - startMinutes;
      if (delta === 0) {
        return { error: "Choose an end time that differs from the start time." };
      }
      if (delta < 0) delta += 24 * 60;
      end = addMinutes(data.date, data.time, delta);
    } else if (enteredDuration) {
      const durationMinutes = parseDurationMinutes(enteredDuration);
      if (!Number.isFinite(durationMinutes) || durationMinutes <= 0) {
        return { error: "Write the length as, for example, 90 minutes or 2 hours." };
      }
      end = addMinutes(data.date, data.time, durationMinutes);
    } else {
      end = addMinutes(data.date, data.time, 60);
      durationNote = " No length was entered, so the calendar file uses one hour.";
    }

    return {
      text: [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//GAJRA Earth//Meeting Tools//EN",
      "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      `UID:${Date.now()}@gajra-earth`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "")}`,
      `DTSTART:${start}`,
      `DTEND:${end.date}T${end.time}`,
      `SUMMARY:${calendarEscape(title)}`,
      location ? `LOCATION:${calendarEscape(location)}` : "",
      `DESCRIPTION:${calendarEscape(body)}`,
      "END:VEVENT",
      "END:VCALENDAR",
      "",
      ].filter(Boolean).join("\r\n"),
      note: durationNote,
    };
  }

  function setStatus(root, message, tone) {
    const status = root.querySelector("[data-planner-status]");
    if (!status) return;
    status.textContent = message;
    status.dataset.tone = tone || "";
  }

  function update(root) {
    const type = root.dataset.planner;
    const form = root.querySelector("[data-planner-form]");
    const output = root.querySelector("[data-planner-output]");
    const data = getFormData(form);
    const text = compose(type, data);
    output.textContent = text;
    return { type, data, text };
  }

  function flagDraft(root, state, successMessage) {
    const missing = missingEssentials(state.type, state.data);
    if (missing.length) {
      setStatus(
        root,
        `${successMessage} Open draft fields: ${listWords(missing)}.`,
        "warning",
      );
      return;
    }
    setStatus(root, successMessage);
  }

  async function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.left = "-9999px";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    return ok;
  }

  function openShare(url) {
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  function initPlanner(root) {
    const type = root.dataset.planner;
    const form = root.querySelector("[data-planner-form]");
    form.addEventListener("input", () => update(root));
    form.addEventListener("change", () => update(root));

    root.querySelector("[data-planner-copy]")?.addEventListener("click", async () => {
      const state = update(root);
      try {
        await copyText(state.text);
        flagDraft(root, state, labels[type].copied);
      } catch (error) {
        setStatus(root, "Copy did not work. Select the preview text and copy it by hand.", "warning");
      }
    });

    root.querySelector("[data-planner-download]")?.addEventListener("click", () => {
      const state = update(root);
      download(`${labels[type].file}-${slug(state.data.title)}.md`, state.text, "text/markdown;charset=utf-8");
      flagDraft(root, state, labels[type].downloaded);
    });

    root.querySelector("[data-planner-ics]")?.addEventListener("click", () => {
      const state = update(root);
      const calendar = calendarText(type, state.data, state.text);
      if (calendar.error) {
        setStatus(root, calendar.error, "warning");
        return;
      }
      download(`${labels[type].file}-${slug(state.data.title)}.ics`, calendar.text, "text/calendar;charset=utf-8");
      setStatus(root, `Calendar file downloaded.${calendar.note}`);
    });

    root.querySelector("[data-planner-email]")?.addEventListener("click", () => {
      const state = update(root);
      const subject = clean(state.data.title) || labels[type].subject;
      flagDraft(root, state, "Email draft opened. Choose the recipient in your email app.");
      window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(state.text)}`;
    });

    root.querySelector("[data-planner-whatsapp]")?.addEventListener("click", () => {
      const state = update(root);
      flagDraft(root, state, "WhatsApp draft opened.");
      openShare(`https://wa.me/?text=${encodeURIComponent(state.text)}`);
    });

    update(root);
  }

  document.querySelectorAll("[data-planner]").forEach(initPlanner);
})();
