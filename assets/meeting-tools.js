(function () {
  "use strict";

  const email = "auraofintelligence@gmail.com";

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
      copied: "Run sheet copied.",
      downloaded: "Run sheet downloaded."
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
    return text ? `- ${label}: ${text}` : `- ${label}: `;
  }

  function compose(type, data) {
    const l = labels[type];
    const title = clean(data.title) || (type === "meeting" ? "Untitled meeting circle" : "Untitled field kit");
    const date = clean(data.date);
    const time = clean(data.time);
    const duration = clean(data.duration);
    const when = [date, time, duration].filter(Boolean).join(", ");
    return [
      `# ${title}`,
      "",
      l.heading,
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
    ].join("\n");
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

  function calendarText(type, data, body) {
    if (!data.date || !data.time) return "";
    const title = clean(data.title) || labels[type].subject;
    const location = clean(data.location);
    const start = data.date.replaceAll("-", "") + "T" + data.time.replace(":", "") + "00";
    const safeBody = body.replace(/\r?\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
    return [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//GAJRA Earth//Meeting Tools//EN",
      "BEGIN:VEVENT",
      `UID:${Date.now()}@gajra-earth`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "")}`,
      `DTSTART:${start}`,
      `SUMMARY:${title}`,
      location ? `LOCATION:${location}` : "",
      `DESCRIPTION:${safeBody}`,
      "END:VEVENT",
      "END:VCALENDAR"
    ].filter(Boolean).join("\r\n");
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
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (!win) window.location.href = url;
  }

  function initPlanner(root) {
    const type = root.dataset.planner;
    const form = root.querySelector("[data-planner-form]");
    form.addEventListener("input", () => update(root));
    form.addEventListener("change", () => update(root));

    root.querySelector("[data-planner-copy]").addEventListener("click", async () => {
      const state = update(root);
      try {
        await copyText(state.text);
        setStatus(root, labels[type].copied);
      } catch (error) {
        setStatus(root, "Copy did not work. Select the preview text and copy it by hand.", "warning");
      }
    });

    root.querySelector("[data-planner-download]").addEventListener("click", () => {
      const state = update(root);
      download(`${labels[type].file}-${slug(state.data.title)}.md`, state.text, "text/markdown;charset=utf-8");
      setStatus(root, labels[type].downloaded);
    });

    root.querySelector("[data-planner-ics]").addEventListener("click", () => {
      const state = update(root);
      const ics = calendarText(type, state.data, state.text);
      if (!ics) {
        setStatus(root, "Add a date and start time to make a calendar file.", "warning");
        return;
      }
      download(`${labels[type].file}-${slug(state.data.title)}.ics`, ics, "text/calendar;charset=utf-8");
      setStatus(root, "Calendar file downloaded.");
    });

    root.querySelector("[data-planner-email]").addEventListener("click", () => {
      const state = update(root);
      const subject = clean(state.data.title) || labels[type].subject;
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(state.text)}`;
    });

    root.querySelector("[data-planner-whatsapp]").addEventListener("click", () => {
      const state = update(root);
      openShare(`https://wa.me/?text=${encodeURIComponent(state.text)}`);
    });

    update(root);
  }

  document.querySelectorAll("[data-planner]").forEach(initPlanner);
})();
