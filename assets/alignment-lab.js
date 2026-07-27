(function () {
  var lab = document.querySelector("[data-alignment-lab]");
  if (!lab) return;

  var storageKey = "gajra-alignment-lab-record-v1";
  var form = lab.querySelector("[data-lab-form]");
  var tabs = Array.from(lab.querySelectorAll("[data-lab-tab]"));
  var panels = Array.from(lab.querySelectorAll("[data-lab-panel]"));
  var stateOutput = lab.querySelector("[data-lab-state]");
  var progressOutput = lab.querySelector("[data-lab-progress]");
  var progressBar = lab.querySelector("[data-lab-progress-bar]");
  var uncertainty = lab.querySelector("[data-uncertainty]");
  var uncertaintyOutput = lab.querySelector("[data-uncertainty-output]");
  var saveButton = lab.querySelector("[data-lab-save]");
  var clearButton = lab.querySelector("[data-lab-clear]");
  var downloadButtons = Array.from(lab.querySelectorAll("[data-lab-download]"));
  var recordId = makeRecordId();
  var createdAt = new Date().toISOString();
  var dirty = false;

  var progressNames = [
    "record_title",
    "context_domain",
    "place_culture",
    "joy",
    "responsibility",
    "abundance",
    "balance",
    "stakeholders",
    "path_a",
    "path_b",
    "preference",
    "preference_reasoning",
    "commitment",
    "baseline",
    "action_boundary",
    "observed_outcome",
    "unexpected_effects",
    "externalities",
    "next_move",
    "revision",
    "assistance",
    "intended_uses",
    "use_boundaries",
    "blind_spots",
  ];

  function makeRecordId() {
    var date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
    var suffix = "";
    if (window.crypto && window.crypto.getRandomValues) {
      var bytes = new Uint8Array(4);
      window.crypto.getRandomValues(bytes);
      suffix = Array.from(bytes)
        .map(function (byte) {
          return byte.toString(16).padStart(2, "0");
        })
        .join("");
    } else {
      suffix = Math.random().toString(16).slice(2, 10).padEnd(8, "0");
    }
    return "gajra-" + date + "-" + suffix;
  }

  function setState(message, tone) {
    stateOutput.textContent = message;
    stateOutput.dataset.tone = tone || "quiet";
  }

  function fieldValue(name) {
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

  function currentValues() {
    var values = {};
    Array.from(new FormData(form).entries()).forEach(function (entry) {
      values[entry[0]] = entry[1];
    });
    return values;
  }

  function applyValues(values) {
    Object.keys(values || {}).forEach(function (name) {
      var candidates = Array.from(form.querySelectorAll('[name="' + name + '"]'));
      candidates.forEach(function (field) {
        if (field.type === "radio" || field.type === "checkbox") {
          field.checked = field.value === values[name];
        } else {
          field.value = values[name];
        }
      });
    });
  }

  function updateProgress() {
    var complete = progressNames.filter(function (name) {
      return fieldValue(name).trim().length > 0;
    }).length;
    var percent = Math.round((complete / progressNames.length) * 100);
    progressOutput.value = String(percent);
    progressOutput.textContent = String(percent);
    progressBar.style.width = percent + "%";
  }

  function updateUncertainty() {
    uncertaintyOutput.value = uncertainty.value;
    uncertaintyOutput.textContent = uncertainty.value;
  }

  function setActivePanel(name, focusTab) {
    tabs.forEach(function (tab) {
      var active = tab.dataset.labTab === name;
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
      if (active && focusTab) tab.focus();
    });
    panels.forEach(function (panel) {
      panel.hidden = panel.dataset.labPanel !== name;
    });
  }

  function buildRecord() {
    return {
      record_id: recordId,
      record_type: "gajra_alignment_map",
      schema_version: "0.1.0",
      created_at: createdAt,
      updated_at: new Date().toISOString(),
      context: {
        title: fieldValue("record_title"),
        domain: fieldValue("context_domain"),
        place_culture: fieldValue("place_culture"),
        stakeholders: fieldValue("stakeholders"),
      },
      jra_definition: {
        joy: fieldValue("joy"),
        responsibility: fieldValue("responsibility"),
        abundance: fieldValue("abundance"),
        balance_and_tensions: fieldValue("balance"),
      },
      preference_comparison: {
        path_a: fieldValue("path_a"),
        path_b: fieldValue("path_b"),
        current_preference: fieldValue("preference"),
        reasoning_conditions_and_missing_options: fieldValue("preference_reasoning"),
        uncertainty_percent: Number(fieldValue("uncertainty") || 50),
      },
      lived_experiment: {
        commitment: fieldValue("commitment"),
        baseline: fieldValue("baseline"),
        action_and_boundary: fieldValue("action_boundary"),
        observed_outcome: fieldValue("observed_outcome"),
        unexpected_effects: fieldValue("unexpected_effects"),
        externalities: fieldValue("externalities"),
        next_move: fieldValue("next_move"),
        revision: fieldValue("revision"),
      },
      source_card: {
        authorship: fieldValue("authorship"),
        assistance_tool_model_or_seed: fieldValue("assistance"),
        privacy: fieldValue("privacy"),
        consent: fieldValue("consent"),
        licence: fieldValue("record_licence"),
        review_state: fieldValue("review_state"),
        intended_uses: fieldValue("intended_uses"),
        boundaries_and_prohibited_uses: fieldValue("use_boundaries"),
        known_blind_spots: fieldValue("blind_spots"),
      },
      export_note:
        "Personal record or raw contribution material. Not automatically a valid training dataset.",
    };
  }

  function markdownSection(title, rows) {
    var body = rows
      .map(function (row) {
        return "### " + row[0] + "\n\n" + (row[1] || "_Not answered_");
      })
      .join("\n\n");
    return "## " + title + "\n\n" + body;
  }

  function buildMarkdown(record) {
    return [
      "# " + (record.context.title || "GAJRA alignment map"),
      "",
      "Record ID: `" + record.record_id + "`",
      "",
      "Created: " + record.created_at,
      "",
      "Updated: " + record.updated_at,
      "",
      markdownSection("Context", [
        ["Life, project or question", record.context.domain],
        ["Place or culture", record.context.place_culture],
        ["Affected people and places", record.context.stakeholders],
      ]),
      "",
      markdownSection("Joyful Responsible Abundance", [
        ["Joy is the light", record.jra_definition.joy],
        ["Responsibility is the hedge", record.jra_definition.responsibility],
        ["Abundance is the gift", record.jra_definition.abundance],
        ["Balance is the catalyst", record.jra_definition.balance_and_tensions],
      ]),
      "",
      markdownSection("Preference comparison", [
        ["Path A", record.preference_comparison.path_a],
        ["Path B", record.preference_comparison.path_b],
        ["Current leaning", record.preference_comparison.current_preference],
        ["Reasoning, conditions and missing options", record.preference_comparison.reasoning_conditions_and_missing_options],
        ["Uncertainty", String(record.preference_comparison.uncertainty_percent) + "%"],
      ]),
      "",
      markdownSection("Lived experiment", [
        ["Commitment", record.lived_experiment.commitment],
        ["Baseline", record.lived_experiment.baseline],
        ["Action and boundary", record.lived_experiment.action_and_boundary],
        ["Observed outcome", record.lived_experiment.observed_outcome],
        ["Unexpected effects", record.lived_experiment.unexpected_effects],
        ["Externalities", record.lived_experiment.externalities],
        ["Next move", record.lived_experiment.next_move],
        ["Revision", record.lived_experiment.revision],
      ]),
      "",
      markdownSection("Source card", [
        ["Authorship", record.source_card.authorship],
        ["Assistance, tool, model or seed", record.source_card.assistance_tool_model_or_seed],
        ["Privacy", record.source_card.privacy],
        ["Consent", record.source_card.consent],
        ["Licence", record.source_card.licence],
        ["Review state", record.source_card.review_state],
        ["Intended uses", record.source_card.intended_uses],
        ["Boundaries and prohibited uses", record.source_card.boundaries_and_prohibited_uses],
        ["Known blind spots", record.source_card.known_blind_spots],
      ]),
      "",
      record.export_note,
      "",
    ].join("\n");
  }

  function safeFilename(record, extension) {
    var base = (record.context.title || "gajra-alignment-map")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 48);
    return (base || "gajra-alignment-map") + "-" + record.record_id.slice(-8) + "." + extension;
  }

  function download(content, filename, type) {
    var blob = new Blob([content], { type: type });
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

  function saveLocal() {
    var payload = {
      record_id: recordId,
      created_at: createdAt,
      saved_at: new Date().toISOString(),
      values: currentValues(),
    };
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(payload));
      dirty = false;
      setState("Saved to this browser at " + new Date(payload.saved_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) + ".", "saved");
    } catch (error) {
      setState("This browser blocked local saving. Downloads still work.", "warning");
    }
  }

  function restoreLocal() {
    var stored;
    try {
      stored = window.localStorage.getItem(storageKey);
    } catch (error) {
      setState("This browser blocked local saving. Downloads still work.", "warning");
      return;
    }
    if (!stored) return;
    try {
      var payload = JSON.parse(stored);
      recordId = payload.record_id || recordId;
      createdAt = payload.created_at || createdAt;
      applyValues(payload.values);
      setState("Restored the record you chose to save on this device.", "saved");
    } catch (error) {
      setState("A saved record could not be read. You can clear it and begin again.", "warning");
    }
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener("click", function () {
      setActivePanel(tab.dataset.labTab, false);
    });
    tab.addEventListener("keydown", function (event) {
      var nextIndex = null;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % tabs.length;
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = tabs.length - 1;
      if (nextIndex === null) return;
      event.preventDefault();
      setActivePanel(tabs[nextIndex].dataset.labTab, true);
    });
  });

  form.addEventListener("input", function () {
    dirty = true;
    setState("Unsaved changes remain in this tab only.", "quiet");
    updateProgress();
    updateUncertainty();
  });

  saveButton.addEventListener("click", saveLocal);

  downloadButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var record = buildRecord();
      var format = button.dataset.labDownload;
      if (format === "markdown") {
        download(buildMarkdown(record), safeFilename(record, "md"), "text/markdown;charset=utf-8");
      }
      if (format === "json") {
        download(JSON.stringify(record, null, 2) + "\n", safeFilename(record, "json"), "application/json");
      }
      if (format === "jsonl") {
        download(JSON.stringify(record) + "\n", safeFilename(record, "jsonl"), "application/x-ndjson");
      }
      dirty = false;
      setState("Downloaded a " + format.toUpperCase() + " copy. Nothing was transmitted.", "saved");
    });
  });

  clearButton.addEventListener("click", function () {
    if (!window.confirm("Clear the locally saved record and empty this workbench? Download a copy first if you want to keep it.")) return;
    try {
      window.localStorage.removeItem(storageKey);
    } catch (error) {
      // The form can still be cleared when storage is unavailable.
    }
    form.reset();
    recordId = makeRecordId();
    createdAt = new Date().toISOString();
    dirty = false;
    updateProgress();
    updateUncertainty();
    setActivePanel("jra", false);
    setState("Local record cleared. This is a new unsaved map.", "quiet");
  });

  window.addEventListener("beforeunload", function (event) {
    if (!dirty) return;
    event.preventDefault();
    event.returnValue = "";
  });

  restoreLocal();
  setActivePanel("jra", false);
  updateProgress();
  updateUncertainty();
})();
