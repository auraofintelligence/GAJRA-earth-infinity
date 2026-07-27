(function () {
  "use strict";

  var lenses = {
    joy: {
      label: "Joy as light",
      prompt: "What became brighter, more alive or more worth noticing?",
    },
    responsibility: {
      label: "Responsibility as a safe hedge",
      prompt: "Which boundary, promise or return path makes exploration safer?",
    },
    abundance: {
      label: "Abundance as a gift",
      prompt: "What time, care, knowledge or possibility became shareable?",
    },
    bridge: {
      label: "Difference as a bridge",
      prompt: "Where could curiosity turn distance into a meeting point?",
    },
    beyond: {
      label: "Beyond familiar edges",
      prompt: "Which possibility opened beyond the first map?",
    },
    return: {
      label: "Return and celebration",
      prompt: "What deserves to travel home, be shared or be celebrated?",
    },
  };

  function clean(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function fieldValue(form, name) {
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

  function setFieldValue(form, name, nextValue) {
    var fields = Array.from(form.querySelectorAll('[name="' + name + '"]'));
    fields.forEach(function (field) {
      if (field.type === "radio" || field.type === "checkbox") {
        field.checked = field.value === nextValue;
      } else {
        field.value = nextValue;
      }
    });
  }

  function selectedLens(form) {
    var key = clean(fieldValue(form, "lens")).toLowerCase();
    return {
      key: lenses[key] ? key : "joy",
      detail: lenses[key] || lenses.joy,
    };
  }

  function compose(form) {
    var lens = selectedLens(form);
    var title = clean(fieldValue(form, "title")) || "My listening trace";
    var notes = clean(fieldValue(form, "notes"));
    var question = clean(fieldValue(form, "question"));
    var next = clean(fieldValue(form, "next"));
    return [
      "# " + title,
      "",
      "GAJRA EARTH LISTENING TRACE",
      "",
      "- Listening lens: " + lens.detail.label,
      "- Prompt: " + lens.detail.prompt,
      "",
      "## What I noticed",
      notes || "_Not answered yet_",
      "",
      "## A question still travelling",
      question || "_Not answered yet_",
      "",
      "## Where I may carry it next",
      next || "_Not answered yet_",
      "",
      "Prepared locally in the browser. Nothing was sent by the page.",
      "",
    ].join("\n");
  }

  function missingFields(form) {
    var missing = [];
    if (!clean(fieldValue(form, "notes"))) missing.push("what you noticed");
    if (!clean(fieldValue(form, "question"))) missing.push("a question still travelling");
    return missing;
  }

  function listWords(items) {
    if (items.length < 2) return items[0] || "";
    if (items.length === 2) return items[0] + " and " + items[1];
    return items.slice(0, -1).join(", ") + " and " + items[items.length - 1];
  }

  function slug(value) {
    var safe = clean(value)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 56);
    return safe || "gajra-listening-trace";
  }

  function setStatus(root, message, tone) {
    var status = root.querySelector("[data-culture-status]");
    if (!status) return;
    status.textContent = message;
    status.dataset.tone = tone || "";
  }

  function syncLensButtons(root, key) {
    root.querySelectorAll("[data-culture-lens]").forEach(function (button) {
      button.setAttribute("aria-pressed", String(button.dataset.cultureLens === key));
    });
  }

  function update(root) {
    var form = root.querySelector("[data-culture-form]");
    var output = root.querySelector("[data-culture-output]");
    var lens = selectedLens(form);
    syncLensButtons(root, lens.key);
    if (output) output.textContent = compose(form);
    return {
      form: form,
      text: compose(form),
      title: clean(fieldValue(form, "title")),
      missing: missingFields(form),
    };
  }

  function actionStatus(root, state, success) {
    if (state.missing.length) {
      setStatus(root, success + " The trace still has space for " + listWords(state.missing) + ".", "warning");
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
    var form = root.querySelector("[data-culture-form]");
    if (!form) return;
    var initialLens = selectedLens(form).key;
    setFieldValue(form, "lens", initialLens);

    root.querySelectorAll("[data-culture-lens]").forEach(function (button) {
      button.addEventListener("click", function () {
        var key = button.dataset.cultureLens;
        if (!lenses[key]) return;
        setFieldValue(form, "lens", key);
        update(root);
        setStatus(root, lenses[key].prompt);
      });
    });

    form.addEventListener("input", function () {
      update(root);
      setStatus(root, "Listening trace remains in this browser until you choose an action.");
    });
    form.addEventListener("change", function () {
      update(root);
      setStatus(root, "Listening trace remains in this browser until you choose an action.");
    });

    root.querySelector("[data-culture-copy]")?.addEventListener("click", async function () {
      var state = update(root);
      try {
        await copyText(state.text);
        actionStatus(root, state, "Listening trace copied.");
      } catch (error) {
        setStatus(root, "Copy did not work. Select the preview and copy it by hand.", "warning");
      }
    });

    root.querySelector("[data-culture-download]")?.addEventListener("click", function () {
      var state = update(root);
      download(state.text, slug(state.title) + ".md");
      actionStatus(root, state, "Listening trace downloaded.");
    });

    root.querySelector("[data-culture-email]")?.addEventListener("click", function () {
      var state = update(root);
      actionStatus(root, state, "Email draft opened. Choose who receives it.");
      window.location.href =
        "mailto:?subject=" +
        encodeURIComponent(state.title || "GAJRA Earth listening trace") +
        "&body=" +
        encodeURIComponent(state.text);
    });

    root.querySelector("[data-culture-whatsapp]")?.addEventListener("click", function () {
      var state = update(root);
      actionStatus(root, state, "WhatsApp draft opened. Choose who receives it.");
      openShare("https://wa.me/?text=" + encodeURIComponent(state.text));
    });

    root.querySelector("[data-culture-sms]")?.addEventListener("click", function () {
      var state = update(root);
      actionStatus(root, state, "SMS draft opened. Choose who receives it.");
      window.location.href = "sms:?body=" + encodeURIComponent(state.text);
    });

    update(root);
  }

  document.querySelectorAll("[data-culture-tool]").forEach(init);
})();
