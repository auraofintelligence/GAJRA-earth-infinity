(function () {
  "use strict";

  var reviewEmail = "auraofintelligence@gmail.com";

  function clean(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function value(form, name) {
    var field = form.elements.namedItem(name);
    if (!field) return "";
    if (typeof field.length === "number" && !field.tagName) {
      var selected = Array.from(field).find(function (candidate) {
        return candidate.checked;
      });
      return selected ? selected.value : "";
    }
    return field.value || "";
  }

  function listWords(items) {
    if (items.length < 2) return items[0] || "";
    if (items.length === 2) return items[0] + " and " + items[1];
    return items.slice(0, -1).join(", ") + " and " + items[items.length - 1];
  }

  function missingFields(form) {
    var requirements = [
      ["title", "a short title"],
      ["contribution_type", "a contribution type"],
      ["summary", "the proposed contribution"],
      ["source", "a source or context note"],
      ["consent", "a consent choice"],
      ["correction", "a correction or return path"],
    ];
    var kind = clean(value(form, "contribution_type")).toLowerCase();
    if ((kind.includes("atlas") || kind.includes("map") || kind.includes("trace")) && !clean(value(form, "broad_location"))) {
      requirements.push(["broad_location", "a broad location"]);
    }
    return requirements
      .filter(function (entry) {
        return !clean(value(form, entry[0]));
      })
      .map(function (entry) {
        return entry[1];
      });
  }

  function row(label, entry) {
    var content = clean(entry);
    return content ? "- " + label + ": " + content : null;
  }

  function compose(form) {
    var missing = missingFields(form);
    var title = clean(value(form, "title")) || "Untitled GAJRA Earth contribution";
    return [
      "# " + title,
      "",
      "GAJRA EARTH CONTRIBUTION DRAFT",
      missing.length ? "" : null,
      missing.length ? "> Draft check: " + listWords(missing) + " still open before review." : null,
      "",
      row("Contribution type", value(form, "contribution_type")),
      row("Contributor or group", value(form, "contributor")),
      row("Broad location", value(form, "broad_location")),
      row("Contact route", value(form, "contact")),
      "",
      "## Proposed contribution",
      clean(value(form, "summary")) || "_Not answered yet_",
      "",
      "## Source and context",
      clean(value(form, "source")) || "_Not answered yet_",
      "",
      "## Consent",
      clean(value(form, "consent")) || "_Not answered yet_",
      "",
      "## Correction and return path",
      clean(value(form, "correction")) || "_Not answered yet_",
      "",
      "Prepared locally in the browser. Nothing was sent by the page.",
      "",
    ].filter(function (part) {
      return part !== null;
    }).join("\n");
  }

  function slug(value) {
    var safe = clean(value)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 56);
    return safe || "gajra-contribution-draft";
  }

  function setStatus(root, message, tone) {
    var status = root.querySelector("[data-contribution-status]");
    if (!status) return;
    status.textContent = message;
    status.dataset.tone = tone || "";
  }

  function update(root) {
    var form = root.querySelector("[data-contribution-form]");
    var output = root.querySelector("[data-contribution-output]");
    var text = compose(form);
    var missing = missingFields(form);
    if (output) output.textContent = text;
    return {
      form: form,
      text: text,
      missing: missing,
      title: clean(value(form, "title")),
    };
  }

  function actionStatus(root, state, success) {
    if (state.missing.length) {
      setStatus(root, success + " Open draft fields: " + listWords(state.missing) + ".", "warning");
    } else {
      setStatus(root, success, "saved");
    }
  }

  async function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }
    var area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.left = "-9999px";
    document.body.appendChild(area);
    area.select();
    var copied = document.execCommand("copy");
    area.remove();
    if (!copied) throw new Error("Copy unavailable");
  }

  function download(text, filename) {
    var blob = new Blob([text], { type: "text/markdown;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 1000);
  }

  function openShare(url) {
    var link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  function init(root) {
    var form = root.querySelector("[data-contribution-form]");
    if (!form) return;

    form.addEventListener("input", function () {
      update(root);
      setStatus(root, "Draft remains in this browser until you choose an action.");
    });
    form.addEventListener("change", function () {
      update(root);
      setStatus(root, "Draft remains in this browser until you choose an action.");
    });

    root.querySelector("[data-contribution-copy]")?.addEventListener("click", async function () {
      var state = update(root);
      try {
        await copyText(state.text);
        actionStatus(root, state, "Contribution draft copied.");
      } catch (error) {
        setStatus(root, "Copy did not work. Select the preview and copy it by hand.", "warning");
      }
    });

    root.querySelector("[data-contribution-download]")?.addEventListener("click", function () {
      var state = update(root);
      download(state.text, slug(state.title) + ".md");
      actionStatus(root, state, "Contribution draft downloaded.");
    });

    root.querySelector("[data-contribution-email]")?.addEventListener("click", function () {
      var state = update(root);
      var subject = state.title || "GAJRA Earth contribution for review";
      actionStatus(root, state, "Email draft opened for GAJRA review. Nothing has been sent yet.");
      window.location.href =
        "mailto:" +
        reviewEmail +
        "?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(state.text);
    });

    root.querySelector("[data-contribution-whatsapp]")?.addEventListener("click", function () {
      var state = update(root);
      actionStatus(root, state, "WhatsApp draft opened. Choose who receives it.");
      openShare("https://wa.me/?text=" + encodeURIComponent(state.text));
    });

    root.querySelector("[data-contribution-sms]")?.addEventListener("click", function () {
      var state = update(root);
      actionStatus(root, state, "SMS draft opened. Choose who receives it.");
      window.location.href = "sms:?body=" + encodeURIComponent(state.text);
    });

    update(root);
  }

  document.querySelectorAll("[data-contribution-tool]").forEach(init);
})();
