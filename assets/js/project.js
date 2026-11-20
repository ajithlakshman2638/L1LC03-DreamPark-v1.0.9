/* Module-Specific Application Logic: L1LC03CP — Dream Park v1.0.9 Student Visual Studio */
(function (global) {
  "use strict";

  var DEFAULT_STATE = {
    currentStep: 0,
    completedSteps: {},
    showScopeDrawer: false,
    parkName: "",
    selectedFeatures: [],
    groundTheme: "meadow",
    zones: [null, null, null, null],
    selectedDockFeature: null,
    essayTitle: "",
    introOpinion: "",
    featureReasons: {},
    conclusion: "",
    generatedPdf: null,
    submitted: false
  };

  function cloneDefault() {
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
  }

  function getFeatureById(id) {
    var list = global.CONTENT_DATA.features || [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) return list[i];
    }
    return null;
  }

  function renderFeatureSvg(featureId, size) {
    var s = size || 52;
    if (featureId === "playground") {
      return (
        '<svg viewBox="0 0 80 80" width="' + s + '" height="' + s + '" aria-hidden="true">' +
          '<rect x="6" y="6" width="68" height="68" rx="14" fill="#FEF3C7"/>' +
          '<path d="M14 62 L24 22 L44 22 L54 62" fill="none" stroke="#DC2626" stroke-width="4" stroke-linecap="round"/>' +
          '<line x1="29" y1="22" x2="29" y2="46" stroke="#475569" stroke-width="2"/>' +
          '<line x1="39" y1="22" x2="39" y2="46" stroke="#475569" stroke-width="2"/>' +
          '<rect x="25" y="45" width="8" height="4" rx="1.5" fill="#F59E0B"/>' +
          '<rect x="35" y="45" width="8" height="4" rx="1.5" fill="#F59E0B"/>' +
          '<path d="M52 28 Q62 46 70 60" fill="none" stroke="#2563EB" stroke-width="5" stroke-linecap="round"/>' +
        '</svg>'
      );
    }
    if (featureId === "flower_garden") {
      return (
        '<svg viewBox="0 0 80 80" width="' + s + '" height="' + s + '" aria-hidden="true">' +
          '<rect x="6" y="6" width="68" height="68" rx="14" fill="#DCFCE7"/>' +
          '<circle cx="26" cy="30" r="9" fill="#EC4899"/><circle cx="26" cy="30" r="3.5" fill="#FEF08A"/>' +
          '<circle cx="52" cy="26" r="9" fill="#F59E0B"/><circle cx="52" cy="26" r="3.5" fill="#78350F"/>' +
          '<circle cx="38" cy="50" r="10" fill="#8B5CF6"/><circle cx="38" cy="50" r="4" fill="#FEF08A"/>' +
          '<circle cx="58" cy="52" r="8" fill="#EF4444"/><circle cx="58" cy="52" r="3" fill="#FEF08A"/>' +
        '</svg>'
      );
    }
    if (featureId === "bike_path") {
      return (
        '<svg viewBox="0 0 80 80" width="' + s + '" height="' + s + '" aria-hidden="true">' +
          '<rect x="6" y="6" width="68" height="68" rx="14" fill="#E0F2FE"/>' +
          '<path d="M12 58 C28 24, 52 56, 68 22" fill="none" stroke="#64748B" stroke-width="14" stroke-linecap="round"/>' +
          '<path d="M12 58 C28 24, 52 56, 68 22" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-dasharray="5 5"/>' +
          '<circle cx="28" cy="42" r="7" fill="none" stroke="#0F172A" stroke-width="2.5"/>' +
          '<circle cx="46" cy="42" r="7" fill="none" stroke="#0F172A" stroke-width="2.5"/>' +
          '<path d="M28 42 L37 33 L46 42" fill="none" stroke="#EF4444" stroke-width="2.5"/>' +
        '</svg>'
      );
    }
    if (featureId === "duck_pond") {
      return (
        '<svg viewBox="0 0 80 80" width="' + s + '" height="' + s + '" aria-hidden="true">' +
          '<rect x="6" y="6" width="68" height="68" rx="14" fill="#D1FAE5"/>' +
          '<ellipse cx="40" cy="44" rx="28" ry="18" fill="#38BDF8" stroke="#0284C7" stroke-width="2.5"/>' +
          '<ellipse cx="34" cy="42" rx="7" ry="4.5" fill="#FACC15"/>' +
          '<circle cx="39" cy="38" r="4" fill="#FACC15"/>' +
          '<polygon points="43,38 47,39 43,40" fill="#F97316"/>' +
        '</svg>'
      );
    }
    if (featureId === "board_games") {
      return (
        '<svg viewBox="0 0 80 80" width="' + s + '" height="' + s + '" aria-hidden="true">' +
          '<rect x="6" y="6" width="68" height="68" rx="14" fill="#FEF3C7"/>' +
          '<rect x="18" y="20" width="44" height="40" rx="6" fill="#FFFFFF" stroke="#B45309" stroke-width="2.5"/>' +
          '<rect x="22" y="24" width="18" height="16" fill="#F59E0B"/>' +
          '<rect x="40" y="40" width="18" height="16" fill="#F59E0B"/>' +
          '<circle cx="31" cy="32" r="4.5" fill="#DC2626"/>' +
          '<circle cx="49" cy="48" r="4.5" fill="#2563EB"/>' +
        '</svg>'
      );
    }
    if (featureId === "fountain_benches") {
      return (
        '<svg viewBox="0 0 80 80" width="' + s + '" height="' + s + '" aria-hidden="true">' +
          '<rect x="6" y="6" width="68" height="68" rx="14" fill="#EFF6FF"/>' +
          '<rect x="12" y="34" width="9" height="14" rx="2" fill="#92400E"/>' +
          '<rect x="59" y="34" width="9" height="14" rx="2" fill="#92400E"/>' +
          '<circle cx="40" cy="41" r="16" fill="#BAE6FD" stroke="#0284C7" stroke-width="2.5"/>' +
          '<circle cx="40" cy="41" r="8" fill="#38BDF8"/>' +
          '<circle cx="40" cy="41" r="3" fill="#FFFFFF"/>' +
        '</svg>'
      );
    }
    if (featureId === "dog_park") {
      return (
        '<svg viewBox="0 0 80 80" width="' + s + '" height="' + s + '" aria-hidden="true">' +
          '<rect x="6" y="6" width="68" height="68" rx="14" fill="#FFEDD5"/>' +
          '<circle cx="40" cy="46" r="10" fill="#92400E"/>' +
          '<circle cx="29" cy="33" r="4.5" fill="#92400E"/>' +
          '<circle cx="40" cy="29" r="4.5" fill="#92400E"/>' +
          '<circle cx="51" cy="33" r="4.5" fill="#92400E"/>' +
        '</svg>'
      );
    }
    return (
      '<svg viewBox="0 0 80 80" width="' + s + '" height="' + s + '" aria-hidden="true">' +
        '<rect x="6" y="6" width="68" height="68" rx="14" fill="#ECFDF5"/>' +
        '<rect x="25" y="46" width="6" height="16" fill="#78350F"/>' +
        '<circle cx="28" cy="36" r="14" fill="#15803D"/>' +
        '<rect x="49" y="44" width="6" height="18" fill="#78350F"/>' +
        '<circle cx="52" cy="33" r="15" fill="#16A34A"/>' +
      '</svg>'
    );
  }

  function renderHeroParkArt() {
    return (
      '<svg viewBox="0 0 260 140" width="235" height="126" aria-label="Dream Park Studio Illustration">' +
        '<rect x="20" y="16" width="220" height="108" rx="18" fill="#ECFDF5" stroke="#A7F3D0" stroke-width="3"/>' +
        '<path d="M20 72 Q130 56 240 72" fill="none" stroke="#FDE68A" stroke-width="14"/>' +
        '<circle cx="66" cy="46" r="18" fill="#10B981"/>' +
        '<rect x="63" y="58" width="6" height="16" fill="#78350F"/>' +
        '<ellipse cx="185" cy="48" rx="28" ry="15" fill="#38BDF8"/>' +
        '<circle cx="80" cy="96" r="12" fill="#EC4899"/>' +
        '<circle cx="104" cy="98" r="10" fill="#F59E0B"/>' +
        '<rect x="152" y="84" width="54" height="24" rx="6" fill="#78350F" stroke="#F59E0B" stroke-width="2"/>' +
      '</svg>'
    );
  }

  function evaluateOpinionPiece(s) {
    var title = (s.essayTitle || "").trim();
    var intro = (s.introOpinion || "").trim();
    var concl = (s.conclusion || "").trim();
    var placedIds = [];
    for (var z = 0; z < 4; z++) {
      if (s.zones[z]) placedIds.push(s.zones[z]);
    }

    var check1Pass = title.length >= 6 && intro.length >= 18;
    var check1Msg = title.length < 6
      ? "Write a clear title for your opinion piece (at least 6 characters)."
      : intro.length < 18
      ? "Write an opening opinion statement (at least 18 characters)."
      : "Strong title and clear opening opinion statement.";

    var filledCount = 0;
    var exampleCount = 0;
    var allText = (intro + " " + concl).toLowerCase();

    for (var i = 0; i < placedIds.length; i++) {
      var fid = placedIds[i];
      var r = ((s.featureReasons && s.featureReasons[fid]) || "").trim();
      allText += " " + r.toLowerCase();
      if (r.length >= 20) filledCount++;
      if (
        r.length >= 35 ||
        r.toLowerCase().indexOf("for example") !== -1 ||
        r.toLowerCase().indexOf("because") !== -1 ||
        r.toLowerCase().indexOf("like ") !== -1 ||
        r.toLowerCase().indexOf("where ") !== -1
      ) {
        exampleCount++;
      }
    }

    var check2Pass = placedIds.length === 4 && filledCount === 4;
    var check2Msg = placedIds.length < 4
      ? "Place all 4 features in Step 2 first."
      : filledCount < 4
      ? "Complete all 4 feature reason boxes (" + filledCount + "/4 ready, min 20 chars each)."
      : "All 4 chosen features have clear supporting reasons.";

    var check3Pass = check2Pass && exampleCount >= 2;
    var check3Msg = !check2Pass
      ? "Fill all 4 feature boxes with reasons and examples."
      : exampleCount < 2
      ? "Add supporting details or 'For example,' in at least 2 feature boxes."
      : "Great use of reasons and real-life examples!";

    var transitions = ["first", "second", "next", "then", "also", "finally", "lastly", "for example", "in my opinion", "i believe", "because"];
    var hasTransition = false;
    for (var t = 0; t < transitions.length; t++) {
      if (allText.indexOf(transitions[t]) !== -1) {
        hasTransition = true;
        break;
      }
    }
    var check4Pass = concl.length >= 15 && hasTransition;
    var check4Msg = concl.length < 15
      ? "Write a closing conclusion sentence (at least 15 characters)."
      : !hasTransition
      ? "Use connecting transition words (e.g., First, Next, Finally, For example)."
      : "Smooth transition words and solid conclusion complete.";

    var list = [
      { id: "c1", name: "1. Title & Opinion", pass: check1Pass, reason: check1Msg },
      { id: "c2", name: "2. All 4 Reasons", pass: check2Pass, reason: check2Msg },
      { id: "c3", name: "3. Examples & Why", pass: check3Pass, reason: check3Msg },
      { id: "c4", name: "4. Transitions & End", pass: check4Pass, reason: check4Msg }
    ];
    var score = 0;
    for (var k = 0; k < list.length; k++) if (list[k].pass) score++;
    return { list: list, score: score, allPassed: score === 4 };
  }

  function validateStepFields(stepIdx, s) {
    var nameTrim = (s.parkName || "").trim();
    var pickedCount = (s.selectedFeatures || []).length;

    if (stepIdx === 0) {
      if (pickedCount < 4) {
        return {
          valid: false,
          message: "Select " + (4 - pickedCount) + " more park feature" + (4 - pickedCount === 1 ? "" : "s") + " (" + pickedCount + "/4 chosen) to enable Next Step."
        };
      }
      if (nameTrim.length < 3) {
        return {
          valid: false,
          message: "Give your Dream Park a creative name (at least 3 characters) to enable Next Step."
        };
      }
      return {
        valid: true,
        message: "4 features chosen & '" + nameTrim + "' named — Next Step enabled."
      };
    }

    if (stepIdx === 1) {
      var placed = 0;
      for (var z = 0; z < 4; z++) {
        if (s.zones[z]) placed++;
      }
      if (placed < 4) {
        return {
          valid: false,
          message: "Drag & drop all 4 chosen features onto the park zones (" + placed + "/4 placed) to enable Next Step."
        };
      }
      return {
        valid: true,
        message: "All 4 features arranged on the Dream Park map — Next Step enabled."
      };
    }

    if (stepIdx === 2) {
      var opEval = evaluateOpinionPiece(s);
      var missing = [];
      for (var i = 0; i < opEval.list.length; i++) {
        if (!opEval.list[i].pass) {
          missing.push(opEval.list[i].name.replace(/^\d+\.\s*/, ""));
        }
      }
      if (missing.length > 0) {
        return {
          valid: false,
          message: "Complete required opinion sections (" + missing.join(", ") + ") to enable Next Step."
        };
      }
      return {
        valid: true,
        message: "All 4 opinion checks passed — Next Step enabled."
      };
    }

    if (stepIdx === 3) {
      var finalEval = evaluateOpinionPiece(s);
      if (!finalEval.allPassed) {
        return { valid: false, message: "Complete all opinion checks before submitting." };
      }
      if (!s.submitted) {
        return { valid: false, message: "Click 'Generate & Submit PDF to Ulipsu' to enable Finish Review." };
      }
      return { valid: true, message: "Dream Park PDF submitted — ready to Finish Review." };
    }

    return { valid: true, message: "" };
  }

  var ProjectModule = {
    state: cloneDefault(),
    onChange: null,
    wasAllPassed: false,

    init: function (savedState, onChange) {
      this.state = Object.assign(cloneDefault(), savedState || {});
      this.wasAllPassed = evaluateOpinionPiece(this.state).allPassed;
      this.onChange = onChange;
    },

    validateStep: function (stepIdx) {
      return validateStepFields(stepIdx, this.state);
    },

    setState: function (patch, rerender) {
      this.state = Object.assign({}, this.state, patch);
      var nowPassed = evaluateOpinionPiece(this.state).allPassed;
      if (nowPassed && !this.wasAllPassed && global.UlipsuKit) {
        global.UlipsuKit.celebrate();
        global.UlipsuKit.toast("Awesome! Your Dream Park & Opinion Piece are ready!");
      }
      this.wasAllPassed = nowPassed;
      if (typeof this.onChange === "function") {
        this.onChange(this.state);
      }
      if (rerender) {
        this.render(document.getElementById("app-stage"));
      }
    },

    renderScopeDrawer: function () {
      if (!this.state.showScopeDrawer) return "";
      var spec = global.CONTENT_DATA.scopeSpec;
      var esc = global.UlipsuKit.esc;
      return (
        '<section class="dp-scope-panel" aria-label="Scope and Improvisation Notes">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;gap:1rem;">' +
            '<strong style="font-size:1rem;color:#064E3B;">L1LC03CP Scope Specification — Browser Improvisation Notes</strong>' +
            '<button type="button" class="ulipsu-btn ulipsu-btn-secondary" id="btn-close-scope" style="padding:0.35rem 0.75rem;font-size:0.8rem;">Close</button>' +
          '</div>' +
          '<div class="dp-scope-cols">' +
            '<div class="dp-scope-box is-what">' +
              '<h4 style="color:#065F46;">What It Is (Browser Studio)</h4>' +
              '<ul>' + spec.whatItIs.map(function (item) { return '<li>' + esc(item) + '</li>'; }).join("") + '</ul>' +
            '</div>' +
            '<div class="dp-scope-box is-loses">' +
              '<h4 style="color:#991B1B;">What It Loses (Hands-On Craft)</h4>' +
              '<ul>' + spec.loses.map(function (item) { return '<li>' + esc(item) + '</li>'; }).join("") + '</ul>' +
            '</div>' +
            '<div class="dp-scope-box is-deciding">' +
              '<h4 style="color:#92400E;">Improvisation Applied</h4>' +
              '<ul>' + spec.needsDeciding.map(function (item) { return '<li>' + esc(item) + '</li>'; }).join("") + '</ul>' +
            '</div>' +
          '</div>' +
        '</section>'
      );
    },

    renderParkBoardHtml: function (interactive) {
      var s = this.state;
      var esc = global.UlipsuKit.esc;
      var data = global.CONTENT_DATA;
      var parkTitle = (s.parkName || "").trim() || "YOUR DREAM PARK";

      var zonesHtml = "";
      for (var z = 0; z < 4; z++) {
        var fid = s.zones[z];
        var feat = fid ? getFeatureById(fid) : null;
        var zLabel = data.zoneLabels[z].name;

        if (feat) {
          zonesHtml +=
            '<div class="dp-drop-zone has-feature" data-zone-idx="' + z + '" ' +
              (interactive ? 'draggable="true" data-drag-source-zone="' + z + '" data-drag-feature="' + esc(feat.id) + '"' : '') + '>' +
              '<span class="dp-zone-tag">Zone ' + (z + 1) + ' · ' + esc(zLabel) + '</span>' +
              renderFeatureSvg(feat.id, 54) +
              '<strong style="font-size:0.82rem;color:#0F172A;margin-top:0.3rem;display:block;">' + esc(feat.name) + '</strong>' +
              (interactive
                ? '<button type="button" class="dp-chip" data-remove-zone="' + z + '" style="margin-top:0.35rem;background:#FEF2F2;border-color:#FECACA;color:#991B1B;">✕ Remove</button>'
                : '') +
            '</div>';
        } else {
          zonesHtml +=
            '<div class="dp-drop-zone" data-zone-idx="' + z + '">' +
              '<span class="dp-zone-tag">Zone ' + (z + 1) + ' · ' + esc(zLabel) + '</span>' +
              '<span style="font-size:0.82rem;font-weight:700;color:#475569;">' +
                (interactive ? '+ Drop or Click Feature Here' : 'Empty Park Zone') +
              '</span>' +
            '</div>';
        }
      }

      return (
        '<div class="dp-park-board" data-ground="' + esc(s.groundTheme) + '">' +
          '<div class="dp-park-sign">🌳 ' + esc(parkTitle.toUpperCase()) + ' 🌳</div>' +
          '<div class="dp-park-zones">' + zonesHtml + '</div>' +
          '<div class="dp-park-gate">MAIN ENTRANCE GATE · ' + esc(parkTitle) + '</div>' +
        '</div>'
      );
    },

    renderLiveSidePreview: function () {
      var s = this.state;
      var esc = global.UlipsuKit.esc;
      var opEval = evaluateOpinionPiece(s);
      var pct = Math.round((opEval.score / 4) * 100);

      if (s.currentStep <= 1) {
        var placedCount = 0;
        for (var z = 0; z < 4; z++) if (s.zones[z]) placedCount++;
        return (
          '<div class="dp-preview-wrap">' +
            '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">' +
              '<strong style="font-size:0.83rem;color:#334155;">LIVE DREAM PARK MAP</strong>' +
              '<span class="ulipsu-pill" style="background:#DCFCE7;color:#065F46;">Placed: ' + placedCount + '/4</span>' +
            '</div>' +
            this.renderParkBoardHtml(s.currentStep === 1) +
          '</div>'
        );
      }

      var title = (s.essayTitle || "").trim() || ("Why " + ((s.parkName || "").trim() || "My Dream Park") + " Is the Best Park to Visit");
      var intro = (s.introOpinion || "").trim() || "In my opinion, my Dream Park is the best place for everyone to visit because it has four wonderful features.";
      var concl = (s.conclusion || "").trim() || "For all these reasons, I believe everyone will love spending the day at my Dream Park!";

      var reasonsHtml = "";
      for (var idx = 0; idx < 4; idx++) {
        var fid = s.zones[idx];
        var feat = fid ? getFeatureById(fid) : null;
        var rTxt = (fid && s.featureReasons && s.featureReasons[fid]) ? s.featureReasons[fid].trim() : "";
        reasonsHtml +=
          '<p class="dp-doc-para">' +
            '<strong>' + (idx + 1) + '. ' + esc(feat ? feat.shortName : ("Feature " + (idx + 1))) + ':</strong> ' +
            (rTxt ? esc(rTxt) : '<span style="color:#94A3B8;font-style:italic;">Write your reason and example in the box on the left...</span>') +
          '</p>';
      }

      return (
        '<div class="dp-preview-wrap">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">' +
            '<strong style="font-size:0.83rem;color:#334155;">OPINION PIECE PREVIEW</strong>' +
            '<span class="ulipsu-pill" style="background:#DCFCE7;color:#065F46;">Checks: ' + opEval.score + '/4</span>' +
          '</div>' +
          '<div class="dp-doc-sheet">' +
            '<h3 class="dp-doc-title">' + esc(title) + '</h3>' +
            '<p class="dp-doc-para">' + esc(intro) + '</p>' +
            reasonsHtml +
            '<p class="dp-doc-para" style="margin-bottom:0;"><strong>Conclusion:</strong> ' + esc(concl) + '</p>' +
          '</div>' +

          '<div class="dp-meter-bar" title="Opinion Writing Readiness">' +
            '<div class="dp-meter-fill" style="width:' + pct + '%;"></div>' +
          '</div>' +

          '<div class="dp-checks-grid">' +
            opEval.list.map(function (c) {
              return (
                '<div class="dp-check-card ' + (c.pass ? "is-pass" : "is-warn") + '">' +
                  '<div style="display:flex;justify-content:space-between;font-size:0.78rem;font-weight:700;margin-bottom:0.15rem;">' +
                    '<span>' + esc(c.name) + '</span>' +
                    '<span>' + (c.pass ? "✓ Pass" : "Needs Edit") + '</span>' +
                  '</div>' +
                  '<div style="font-size:0.73rem;color:#475569;">' + esc(c.reason) + '</div>' +
                '</div>'
              );
            }).join("") +
          '</div>' +
        '</div>'
      );
    },

    render: function (container) {
      if (!container) return;
      var data = global.CONTENT_DATA;
      var s = this.state;
      var step = data.steps[s.currentStep] || data.steps[0];
      var esc = global.UlipsuKit.esc;

      var html = this.renderScopeDrawer() +
        '<section class="dp-hero-banner">' +
          '<div>' +
            '<span class="dp-ost-badge">✦ ' + esc(step.frame) + ' · ' + esc(step.ost) + '</span>' +
            '<h1>' + esc(step.title) + '</h1>' +
            '<p>' + esc(step.prompt) + '</p>' +
          '</div>' +
          '<div class="dp-hero-art">' +
            renderHeroParkArt() +
          '</div>' +
        '</section>';

      if (s.currentStep === 0) {
        var pickedCount = s.selectedFeatures.length;
        var nameTrim = (s.parkName || "").trim();
        var nameValid = nameTrim.length >= 3;

        html +=
          '<div class="dp-grid-2">' +
            '<div class="ulipsu-card">' +
              '<div class="dp-field-header">' +
                '<h2 style="margin:0;font-size:1.12rem;">1. Choose Any 4 Park Features *</h2>' +
                '<span class="dp-req-badge ' + (pickedCount === 4 ? "is-ok" : "is-pending") + '">' + pickedCount + ' / 4 Picked</span>' +
              '</div>' +
              '<small style="display:block;color:#475569;margin-top:0.25rem;">Click 4 features from the storyboard list to include in your Dream Park:</small>' +
              '<div class="dp-feature-grid">' +
                data.features.map(function (f) {
                  var isSel = s.selectedFeatures.indexOf(f.id) !== -1;
                  return (
                    '<button type="button" class="dp-feature-card' + (isSel ? " is-selected" : "") + '" data-toggle-feature="' + esc(f.id) + '">' +
                      '<div class="dp-feature-thumb">' + renderFeatureSvg(f.id, 46) + '</div>' +
                      '<div>' +
                        '<strong style="display:block;font-size:0.86rem;color:#0F172A;">' + esc(f.name) + '</strong>' +
                        '<span style="font-size:0.73rem;color:#059669;font-weight:700;">' + esc(f.category) + '</span>' +
                      '</div>' +
                    '</button>'
                  );
                }).join("") +
              '</div>' +

              '<div class="dp-field">' +
                '<div class="dp-field-header">' +
                  '<label for="inp-park-name">2. Give Your Park a Creative Name *</label>' +
                  '<span class="dp-req-badge ' + (nameValid ? "is-ok" : "is-pending") + '">' + (nameValid ? "✓ Valid" : "Required *") + '</span>' +
                '</div>' +
                '<small>Choose a fun, welcoming name like "Sunshine Gardens" or "Wildflower Park":</small>' +
                '<input id="inp-park-name" class="dp-input ' + (nameValid ? "is-valid" : "is-invalid") + '" type="text" required placeholder="e.g., Sunshine Gardens" value="' + esc(s.parkName) + '" />' +
                '<div class="dp-chip-row">' +
                  data.parkNameSuggestions.map(function (n) {
                    return '<button type="button" class="dp-chip" data-fill-park-name="' + esc(n) + '">Try: ' + esc(n) + '</button>';
                  }).join("") +
                '</div>' +
              '</div>' +
            '</div>' +
            this.renderLiveSidePreview() +
          '</div>';
      } else if (s.currentStep === 1) {
        var placedCount = 0;
        for (var z = 0; z < 4; z++) if (s.zones[z]) placedCount++;

        html +=
          '<div class="dp-grid-2">' +
            '<div class="ulipsu-card">' +
              '<div class="dp-field-header">' +
                '<h2 style="margin:0;font-size:1.12rem;">1. Drag & Drop Your 4 Features onto the Park *</h2>' +
                '<span class="dp-req-badge ' + (placedCount === 4 ? "is-ok" : "is-pending") + '">' + placedCount + ' / 4 Placed</span>' +
              '</div>' +
              '<p style="font-size:0.84rem;color:#475569;margin-top:0.25rem;">Drag each feature from the dock into any of the 4 park zones on the right (or click a feature below, then click a zone):</p>' +
              '<div class="dp-dock">' +
                s.selectedFeatures.map(function (fid) {
                  var f = getFeatureById(fid);
                  if (!f) return "";
                  var isPlaced = s.zones.indexOf(fid) !== -1;
                  var isSelectedDock = s.selectedDockFeature === fid;
                  return (
                    '<div class="dp-drag-item' + (isPlaced ? " is-placed" : "") + (isSelectedDock ? " is-selected-dock" : "") + '" draggable="true" data-dock-feature="' + esc(fid) + '">' +
                      renderFeatureSvg(fid, 40) +
                      '<div style="min-width:0;">' +
                        '<strong style="display:block;font-size:0.82rem;color:#0F172A;">' + esc(f.shortName) + '</strong>' +
                        '<span style="font-size:0.71rem;color:' + (isPlaced ? "#059669" : "#B45309") + ';font-weight:700;">' +
                          (isPlaced ? "✓ Placed on map" : "⠿ Drag or click to place") +
                        '</span>' +
                      '</div>' +
                    '</div>'
                  );
                }).join("") +
              '</div>' +

              '<div class="dp-field">' +
                '<label for="sel-ground">2. Choose Park Ground Theme</label>' +
                '<select id="sel-ground" class="dp-select">' +
                  data.groundThemes.map(function (gt) {
                    return '<option value="' + esc(gt.id) + '"' + (s.groundTheme === gt.id ? " selected" : "") + '>' + esc(gt.name) + '</option>';
                  }).join("") +
                '</select>' +
              '</div>' +

              '<div style="display:flex;gap:0.6rem;flex-wrap:wrap;">' +
                '<button type="button" class="ulipsu-btn ulipsu-btn-secondary" id="btn-auto-arrange">✨ Auto-Arrange All 4 Features</button>' +
                '<button type="button" class="ulipsu-btn ulipsu-btn-secondary" id="btn-clear-zones">Clear Map</button>' +
              '</div>' +
            '</div>' +
            this.renderLiveSidePreview() +
          '</div>';
      } else if (s.currentStep === 2) {
        var defaultTitle = "Why " + ((s.parkName || "").trim() || "My Dream Park") + " Is the Best Park to Visit";
        var defaultIntro = "In my opinion, " + ((s.parkName || "").trim() || "My Dream Park") + " is the best park to visit because it has four wonderful features for everyone.";
        var defaultConcl = "For all these reasons, I believe " + ((s.parkName || "").trim() || "My Dream Park") + " is a fun and welcoming park for families and friends!";
        var titleOk = (s.essayTitle || "").trim().length >= 6;
        var introOk = (s.introOpinion || "").trim().length >= 18;
        var conclOk = (s.conclusion || "").trim().length >= 15;

        html +=
          '<div class="dp-grid-2">' +
            '<div class="ulipsu-card">' +
              '<h2 style="margin-top:0;font-size:1.12rem;">Write Your Opinion Piece (1 Reason Box Per Feature)</h2>' +
              '<p style="font-size:0.83rem;color:#475569;margin-top:0;">Fill your title, opening opinion, all 4 feature reason boxes, and conclusion to enable Next Step.</p>' +

              '<div class="dp-field">' +
                '<div class="dp-field-header">' +
                  '<label for="inp-essay-title">Opinion Piece Title *</label>' +
                  '<span class="dp-req-badge ' + (titleOk ? "is-ok" : "is-pending") + '">' + (titleOk ? "✓ Valid" : "Required *") + '</span>' +
                '</div>' +
                '<input id="inp-essay-title" class="dp-input ' + (titleOk ? "is-valid" : "is-invalid") + '" type="text" required placeholder="' + esc(defaultTitle) + '" value="' + esc(s.essayTitle) + '" />' +
                '<div class="dp-chip-row">' +
                  '<button type="button" class="dp-chip" data-fill-field="essayTitle" data-fill-val="' + esc(defaultTitle) + '">Use Suggested Title</button>' +
                '</div>' +
              '</div>' +

              '<div class="dp-field">' +
                '<div class="dp-field-header">' +
                  '<label for="inp-intro">Introduction — State Your Opinion *</label>' +
                  '<span class="dp-req-badge ' + (introOk ? "is-ok" : "is-pending") + '">' + (introOk ? "✓ Valid" : "Required (min 18 chars)") + '</span>' +
                '</div>' +
                '<textarea id="inp-intro" class="dp-textarea ' + (introOk ? "is-valid" : "is-invalid") + '" rows="2" required placeholder="' + esc(defaultIntro) + '">' + esc(s.introOpinion) + '</textarea>' +
                '<div class="dp-chip-row">' +
                  '<button type="button" class="dp-chip" data-fill-field="introOpinion" data-fill-val="' + esc(defaultIntro) + '">Insert Opening Opinion</button>' +
                '</div>' +
              '</div>' +

              '<h3 style="font-size:0.98rem;color:#064E3B;margin:1rem 0 0.6rem;">Reasons & Examples for Your 4 Chosen Features *</h3>' +
              s.zones.map(function (fid, idx) {
                var feat = fid ? getFeatureById(fid) : null;
                if (!feat) return "";
                var val = (s.featureReasons && s.featureReasons[fid]) || "";
                var rOk = val.trim().length >= 20;
                return (
                  '<div class="dp-reason-card' + (rOk ? " is-valid" : "") + '">' +
                    '<div class="dp-reason-card-head">' +
                      '<div style="display:flex;align-items:center;gap:0.55rem;">' +
                        renderFeatureSvg(fid, 38) +
                        '<div>' +
                          '<strong style="font-size:0.86rem;display:block;">Feature ' + (idx + 1) + ': ' + esc(feat.name) + '</strong>' +
                          '<span style="font-size:0.72rem;color:#475569;">Explain why you chose it + give an example</span>' +
                        '</div>' +
                      '</div>' +
                      '<span class="dp-req-badge ' + (rOk ? "is-ok" : "is-pending") + '">' + (rOk ? "✓ Valid" : "Required *") + '</span>' +
                    '</div>' +
                    '<textarea class="dp-textarea ' + (rOk ? "is-valid" : "is-invalid") + '" rows="2" data-reason-for="' + esc(fid) + '" placeholder="Use a transition word (First, Next, For example...) and explain why this makes your park great...">' + esc(val) + '</textarea>' +
                    '<div class="dp-chip-row">' +
                      data.transitionChips.map(function (tw) {
                        return '<button type="button" class="dp-chip" data-prepend-transition="' + esc(fid) + '" data-tw="' + esc(tw) + '">+ ' + esc(tw) + '</button>';
                      }).join("") +
                      '<button type="button" class="dp-chip" data-fill-reason="' + esc(fid) + '" style="background:#EEF2FF;border-color:#C7D2FE;color:#3730A3;">Use Example Idea</button>' +
                    '</div>' +
                  '</div>'
                );
              }).join("") +

              '<div class="dp-field">' +
                '<div class="dp-field-header">' +
                  '<label for="inp-conclusion">Conclusion — Wrap Up Your Opinion *</label>' +
                  '<span class="dp-req-badge ' + (conclOk ? "is-ok" : "is-pending") + '">' + (conclOk ? "✓ Valid" : "Required (min 15 chars)") + '</span>' +
                '</div>' +
                '<textarea id="inp-conclusion" class="dp-textarea ' + (conclOk ? "is-valid" : "is-invalid") + '" rows="2" required placeholder="' + esc(defaultConcl) + '">' + esc(s.conclusion) + '</textarea>' +
                '<div class="dp-chip-row">' +
                  '<button type="button" class="dp-chip" data-fill-field="conclusion" data-fill-val="' + esc(defaultConcl) + '">Insert Conclusion</button>' +
                '</div>' +
              '</div>' +
            '</div>' +
            this.renderLiveSidePreview() +
          '</div>';
      } else {
        var opEvalFinal = evaluateOpinionPiece(s);
        html +=
          '<div class="dp-grid-2">' +
            '<div class="ulipsu-card">' +
              '<h2 style="margin-top:0;font-size:1.12rem;">Dream Park Blueprint & Opinion Piece Verification (' + opEvalFinal.score + '/4)</h2>' +
              '<p style="font-size:0.85rem;color:#475569;margin-top:0;">Your 2-page PDF includes your visual Dream Park map (Page 1) and your full opinion piece (Page 2), replacing a physical model photo:</p>' +

              opEvalFinal.list.map(function (c) {
                return (
                  '<div class="dp-check-card ' + (c.pass ? "is-pass" : "is-warn") + '" style="margin-bottom:0.55rem;">' +
                    '<div style="display:flex;justify-content:space-between;font-size:0.8rem;font-weight:700;margin-bottom:0.15rem;">' +
                      '<span>' + esc(c.name) + '</span>' +
                      '<span>' + (c.pass ? "✓ Verified" : "⚠ Action Needed") + '</span>' +
                    '</div>' +
                    '<div style="font-size:0.75rem;color:#475569;">' + esc(c.reason) + '</div>' +
                  '</div>'
                );
              }).join("") +

              '<div style="margin-top:1.15rem;display:flex;flex-wrap:wrap;gap:0.75rem;">' +
                '<button type="button" class="ulipsu-btn ulipsu-btn-primary" id="btn-download-dp-pdf">⬇ Download Dream Park PDF</button>' +
                '<button type="button" class="ulipsu-btn ulipsu-btn-success" id="btn-submit-dp-pdf"' + (!opEvalFinal.allPassed ? " disabled" : "") + '>' +
                  (s.submitted ? "✓ PDF Submitted to Ulipsu" : "Generate & Submit PDF to Ulipsu") +
                '</button>' +
              '</div>' +

              (s.generatedPdf
                ? '<div style="margin-top:1rem;padding:0.85rem;border-radius:10px;background:#ECFDF5;border:1px solid #A7F3D0;">' +
                    '<strong style="color:#065F46;display:block;">2-Page PDF Artifact Ready: ' + esc(s.generatedPdf.fileName) + '</strong>' +
                    '<span style="font-size:0.8rem;color:#047857;">Page 1: Park Map · Page 2: Opinion Piece · Size: ' + Math.max(1, Math.round((s.generatedPdf.sizeBytes || 1024) / 1024)) + ' KB</span>' +
                  '</div>'
                : '') +

              '<div style="margin-top:1rem;">' +
                this.renderParkBoardHtml(false) +
              '</div>' +
            '</div>' +
            this.renderLiveSidePreview() +
          '</div>';
      }

      container.innerHTML = html;
      this.bindEvents(container);
    },

    placeFeatureInZone: function (featureId, targetZoneIdx) {
      if (!featureId || targetZoneIdx < 0 || targetZoneIdx > 3) return;
      var nextZones = this.state.zones.slice();
      var existingZone = nextZones.indexOf(featureId);
      if (existingZone !== -1 && existingZone !== targetZoneIdx) {
        // Swap with whatever was in targetZoneIdx
        var displaced = nextZones[targetZoneIdx];
        nextZones[existingZone] = displaced;
      }
      nextZones[targetZoneIdx] = featureId;
      this.setState({ zones: nextZones, selectedDockFeature: null }, true);
    },

    bindEvents: function (container) {
      var self = this;

      var closeScope = container.querySelector("#btn-close-scope");
      if (closeScope) {
        closeScope.addEventListener("click", function () {
          self.setState({ showScopeDrawer: false }, true);
        });
      }

      // Step 1: Toggle feature selection (up to 4)
      var featBtns = container.querySelectorAll("[data-toggle-feature]");
      for (var i = 0; i < featBtns.length; i++) {
        featBtns[i].addEventListener("click", function () {
          var fid = this.getAttribute("data-toggle-feature");
          var cur = self.state.selectedFeatures.slice();
          var idx = cur.indexOf(fid);
          if (idx !== -1) {
            cur.splice(idx, 1);
            var cleanZones = self.state.zones.map(function (zItem) {
              return zItem === fid ? null : zItem;
            });
            self.setState({ selectedFeatures: cur, zones: cleanZones }, true);
          } else {
            if (cur.length >= 4) {
              global.UlipsuKit.toast("You already picked 4 features! Click a picked feature to unselect it first.");
              return;
            }
            cur.push(fid);
            self.setState({ selectedFeatures: cur }, true);
          }
        });
      }

      var inpParkName = container.querySelector("#inp-park-name");
      if (inpParkName) {
        inpParkName.addEventListener("input", function () {
          var pos = this.selectionStart;
          self.setState({ parkName: this.value }, true);
          var el = document.getElementById("inp-park-name");
          if (el) {
            el.focus();
            try { el.setSelectionRange(pos, pos); } catch (e) {}
          }
        });
      }

      var nameChips = container.querySelectorAll("[data-fill-park-name]");
      for (var nc = 0; nc < nameChips.length; nc++) {
        nameChips[nc].addEventListener("click", function () {
          self.setState({ parkName: this.getAttribute("data-fill-park-name") }, true);
        });
      }

      // Step 2: Drag & Drop + Click-to-Place Park Builder
      var dockItems = container.querySelectorAll("[data-dock-feature]");
      for (var d = 0; d < dockItems.length; d++) {
        dockItems[d].addEventListener("dragstart", function (ev) {
          var fid = this.getAttribute("data-dock-feature");
          if (ev.dataTransfer) {
            ev.dataTransfer.setData("text/plain", fid);
            ev.dataTransfer.effectAllowed = "move";
          }
        });
        dockItems[d].addEventListener("click", function () {
          var fid = this.getAttribute("data-dock-feature");
          var nextSel = self.state.selectedDockFeature === fid ? null : fid;
          self.setState({ selectedDockFeature: nextSel }, true);
        });
      }

      var dropZones = container.querySelectorAll("[data-zone-idx]");
      for (var dz = 0; dz < dropZones.length; dz++) {
        dropZones[dz].addEventListener("dragstart", function (ev) {
          var fid = this.getAttribute("data-drag-feature");
          if (fid && ev.dataTransfer) {
            ev.dataTransfer.setData("text/plain", fid);
            ev.dataTransfer.effectAllowed = "move";
          }
        });
        dropZones[dz].addEventListener("dragover", function (ev) {
          ev.preventDefault();
          this.classList.add("is-dragover");
        });
        dropZones[dz].addEventListener("dragleave", function () {
          this.classList.remove("is-dragover");
        });
        dropZones[dz].addEventListener("drop", function (ev) {
          ev.preventDefault();
          this.classList.remove("is-dragover");
          var zIdx = parseInt(this.getAttribute("data-zone-idx"), 10);
          var fid = ev.dataTransfer ? ev.dataTransfer.getData("text/plain") : "";
          if (fid) {
            self.placeFeatureInZone(fid, zIdx);
          }
        });
        dropZones[dz].addEventListener("click", function (ev) {
          if (ev.target && ev.target.hasAttribute("data-remove-zone")) return;
          var zIdx = parseInt(this.getAttribute("data-zone-idx"), 10);
          if (self.state.selectedDockFeature) {
            self.placeFeatureInZone(self.state.selectedDockFeature, zIdx);
          } else {
            // Pick first unplaced feature automatically on click if none selected
            var unplaced = null;
            for (var u = 0; u < self.state.selectedFeatures.length; u++) {
              var cand = self.state.selectedFeatures[u];
              if (self.state.zones.indexOf(cand) === -1) {
                unplaced = cand;
                break;
              }
            }
            if (unplaced) {
              self.placeFeatureInZone(unplaced, zIdx);
            }
          }
        });
      }

      var remBtns = container.querySelectorAll("[data-remove-zone]");
      for (var rb = 0; rb < remBtns.length; rb++) {
        remBtns[rb].addEventListener("click", function (ev) {
          ev.stopPropagation();
          var zIdx = parseInt(this.getAttribute("data-remove-zone"), 10);
          var nextZones = self.state.zones.slice();
          nextZones[zIdx] = null;
          self.setState({ zones: nextZones }, true);
        });
      }

      var selGround = container.querySelector("#sel-ground");
      if (selGround) {
        selGround.addEventListener("change", function () {
          self.setState({ groundTheme: this.value }, true);
        });
      }

      var btnAuto = container.querySelector("#btn-auto-arrange");
      if (btnAuto) {
        btnAuto.addEventListener("click", function () {
          var nextZones = [null, null, null, null];
          for (var i = 0; i < 4; i++) {
            nextZones[i] = self.state.selectedFeatures[i] || null;
          }
          self.setState({ zones: nextZones, selectedDockFeature: null }, true);
          global.UlipsuKit.toast("All 4 features placed onto your Dream Park!");
        });
      }

      var btnClear = container.querySelector("#btn-clear-zones");
      if (btnClear) {
        btnClear.addEventListener("click", function () {
          self.setState({ zones: [null, null, null, null], selectedDockFeature: null }, true);
        });
      }

      // Step 3: Opinion Writer
      var fillChips = container.querySelectorAll("[data-fill-field]");
      for (var fc = 0; fc < fillChips.length; fc++) {
        fillChips[fc].addEventListener("click", function () {
          var patch = {};
          patch[this.getAttribute("data-fill-field")] = this.getAttribute("data-fill-val");
          self.setState(patch, true);
        });
      }

      var mainFields = [
        ["#inp-essay-title", "essayTitle"],
        ["#inp-intro", "introOpinion"],
        ["#inp-conclusion", "conclusion"]
      ];
      for (var mf = 0; mf < mainFields.length; mf++) {
        (function (pair) {
          var el = container.querySelector(pair[0]);
          if (!el) return;
          el.addEventListener("input", function () {
            var pos = this.selectionStart;
            var patch = {};
            patch[pair[1]] = this.value;
            self.setState(patch, true);
            var nextEl = document.querySelector(pair[0]);
            if (nextEl) {
              nextEl.focus();
              try { nextEl.setSelectionRange(pos, pos); } catch (e) {}
            }
          });
        })(mainFields[mf]);
      }

      var reasonAreas = container.querySelectorAll("[data-reason-for]");
      for (var ra = 0; ra < reasonAreas.length; ra++) {
        reasonAreas[ra].addEventListener("input", function () {
          var fid = this.getAttribute("data-reason-for");
          var pos = this.selectionStart;
          var nextReasons = Object.assign({}, self.state.featureReasons);
          nextReasons[fid] = this.value;
          self.setState({ featureReasons: nextReasons }, true);
          var nextEl = document.querySelector('[data-reason-for="' + fid + '"]');
          if (nextEl) {
            nextEl.focus();
            try { nextEl.setSelectionRange(pos, pos); } catch (e) {}
          }
        });
      }

      var twChips = container.querySelectorAll("[data-prepend-transition]");
      for (var tc = 0; tc < twChips.length; tc++) {
        twChips[tc].addEventListener("click", function () {
          var fid = this.getAttribute("data-prepend-transition");
          var tw = this.getAttribute("data-tw");
          var nextReasons = Object.assign({}, self.state.featureReasons);
          var cur = (nextReasons[fid] || "").trim();
          nextReasons[fid] = cur ? (cur + " " + tw + " ") : (tw + " ");
          self.setState({ featureReasons: nextReasons }, true);
          var targetArea = document.querySelector('[data-reason-for="' + fid + '"]');
          if (targetArea) {
            targetArea.focus();
            var len = targetArea.value.length;
            try { targetArea.setSelectionRange(len, len); } catch (e) {}
          }
        });
      }

      var starterReasonChips = container.querySelectorAll("[data-fill-reason]");
      for (var sr = 0; sr < starterReasonChips.length; sr++) {
        starterReasonChips[sr].addEventListener("click", function () {
          var fid = this.getAttribute("data-fill-reason");
          var feat = getFeatureById(fid);
          if (!feat) return;
          var nextReasons = Object.assign({}, self.state.featureReasons);
          nextReasons[fid] = feat.starterReason;
          self.setState({ featureReasons: nextReasons }, true);
        });
      }

      // Step 4: Download & Submit 2-Page PDF
      var btnDl = container.querySelector("#btn-download-dp-pdf");
      if (btnDl) {
        btnDl.addEventListener("click", function () {
          var res = global.UlipsuPDF.downloadDreamParkPDF(self.state);
          global.UlipsuKit.toast("Downloaded " + res.fileName);
        });
      }

      var btnSub = container.querySelector("#btn-submit-dp-pdf");
      if (btnSub) {
        btnSub.addEventListener("click", function () {
          var opEval = evaluateOpinionPiece(self.state);
          if (!opEval.allPassed) return;
          var pdfRes = global.UlipsuPDF.buildDreamParkPDFBlob(self.state);
          var reader = new FileReader();
          reader.onload = function (ev) {
            var artifact = {
              fileName: pdfRes.fileName,
              mimeType: "application/pdf",
              sizeBytes: pdfRes.blob.size,
              dataUrl: ev.target.result
            };
            if (global.LMSAdapter) {
              global.LMSAdapter.uploadWork(artifact);
            }
            var doneMap = Object.assign({}, self.state.completedSteps, { 3: true });
            self.setState({ generatedPdf: artifact, submitted: true, completedSteps: doneMap }, true);
            global.UlipsuKit.celebrate();
            global.UlipsuKit.toast("Dream Park PDF submitted to Ulipsu!");
          };
          reader.readAsDataURL(pdfRes.blob);
        });
      }
    }
  };

  global.ProjectModule = ProjectModule;
})(window);
