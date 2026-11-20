/* Ulipsu Standard Template Runtime: runtime.js (v1.0.9) */
(function (global) {
  "use strict";

  var Runtime = {
    bridge: null,

    resetToBeginning: function () {
      if (this.bridge) {
        this.bridge.clearCache();
      }
      var self = this;
      global.ProjectModule.init(null, function (nextState) {
        if (self.bridge) self.bridge.saveState(nextState);
        Runtime.syncChrome();
      });
      this.renderAll();
    },

    getMaxUnlockedStep: function () {
      var total = global.CONTENT_DATA.steps.length;
      var maxIdx = 0;
      for (var i = 0; i < total - 1; i++) {
        var check = global.ProjectModule.validateStep(i);
        if (check.valid) {
          maxIdx = i + 1;
        } else {
          break;
        }
      }
      return maxIdx;
    },

    init: function () {
      var data = global.CONTENT_DATA;
      var bridge = global.UlipsuBridge.init("L1LC03_DreamPark_v1.0.9");
      this.bridge = bridge;

      global.LMSAdapter.init({
        ilmCode: data.ilmCode,
        classCode: data.classCode,
        title: data.projectTitle,
        version: data.version
      });

      bridge.clearCache();
      global.ProjectModule.init(null, function (nextState) {
        bridge.saveState(nextState);
        Runtime.syncChrome();
      });

      window.addEventListener("pageshow", function (event) {
        if (event && event.persisted) {
          Runtime.resetToBeginning();
        }
      });

      var btnScope = document.getElementById("btn-scope");
      if (btnScope) {
        btnScope.addEventListener("click", function () {
          global.ProjectModule.setState({ showScopeDrawer: !global.ProjectModule.state.showScopeDrawer }, true);
          Runtime.syncChrome();
        });
      }

      var btnFull = document.getElementById("btn-fullscreen");
      if (btnFull) {
        btnFull.addEventListener("click", function () {
          try {
            if (!document.fullscreenElement) {
              document.documentElement.requestFullscreen();
              global.UlipsuKit.toast("Entered full-screen mode.");
            } else {
              document.exitFullscreen();
              global.UlipsuKit.toast("Exited full-screen mode.");
            }
          } catch (e) {
            global.UlipsuKit.toast("Full-screen is not supported in this frame.");
          }
        });
      }

      document.getElementById("btn-prev").addEventListener("click", function () {
        var cur = global.ProjectModule.state.currentStep;
        if (cur > 0) Runtime.goToStep(cur - 1);
      });

      document.getElementById("btn-next").addEventListener("click", function () {
        var cur = global.ProjectModule.state.currentStep;
        var stepCheck = global.ProjectModule.validateStep(cur);
        if (!stepCheck.valid) {
          global.UlipsuKit.toast(stepCheck.message || "Please complete all required fields first.");
          Runtime.syncChrome();
          return;
        }

        var total = data.steps.length;
        var doneMap = Object.assign({}, global.ProjectModule.state.completedSteps);
        doneMap[cur] = true;
        if (cur < total - 1) {
          global.ProjectModule.setState({ currentStep: cur + 1, completedSteps: doneMap }, true);
        } else {
          global.ProjectModule.setState({ completedSteps: doneMap }, true);
          global.UlipsuKit.toast("Dream Park Studio workflow complete!");
        }
        Runtime.syncChrome();
      });

      document.getElementById("btn-reset").addEventListener("click", function () {
        Runtime.resetToBeginning();
        global.UlipsuKit.toast("Dream Park Studio reset to Step 1.");
      });

      this.renderAll();
    },

    goToStep: function (idx) {
      var total = global.CONTENT_DATA.steps.length;
      if (idx < 0 || idx >= total) return;
      var maxUnlocked = this.getMaxUnlockedStep();
      if (idx > maxUnlocked) {
        var blockingCheck = global.ProjectModule.validateStep(maxUnlocked);
        global.UlipsuKit.toast(blockingCheck.message || "Complete the current step's required fields first.");
        return;
      }
      global.ProjectModule.setState({ currentStep: idx }, true);
      this.syncChrome();
    },

    syncChrome: function () {
      var data = global.CONTENT_DATA;
      var s = global.ProjectModule.state;
      var step = data.steps[s.currentStep] || data.steps[0];
      var maxUnlocked = this.getMaxUnlockedStep();
      var stepValidation = global.ProjectModule.validateStep(s.currentStep);

      var syncedDone = {};
      for (var k = 0; k < data.steps.length; k++) {
        if (s.completedSteps[k] && global.ProjectModule.validateStep(k).valid) {
          syncedDone[k] = true;
        }
      }

      global.UlipsuKit.renderStepper(
        document.getElementById("ulipsu-stepper-mount"),
        data.steps,
        s.currentStep,
        syncedDone,
        function (idx) {
          Runtime.goToStep(idx);
        },
        maxUnlocked
      );

      var stepNameEl = document.getElementById("hdr-step-name");
      if (stepNameEl) {
        stepNameEl.textContent = step.shortTitle || step.title;
      }
      var stepMetaEl = document.getElementById("hdr-step-meta");
      if (stepMetaEl) {
        stepMetaEl.textContent = step.frame + " · Step " + (s.currentStep + 1) + "/" + data.steps.length;
      }

      var btnScope = document.getElementById("btn-scope");
      if (btnScope) {
        if (s.showScopeDrawer) btnScope.classList.add("is-active");
        else btnScope.classList.remove("is-active");
      }

      var footerEl = document.getElementById("footer-status");
      if (stepValidation.valid) {
        footerEl.style.color = "#059669";
        footerEl.textContent = "✓ " + stepValidation.message;
      } else {
        footerEl.style.color = "#B45309";
        footerEl.textContent = "⚠ " + stepValidation.message;
      }

      document.getElementById("btn-prev").disabled = s.currentStep === 0;

      var btnNext = document.getElementById("btn-next");
      btnNext.disabled = !stepValidation.valid;
      btnNext.title = stepValidation.message;
      btnNext.textContent =
        s.currentStep === data.steps.length - 1 ? "Finish Review ✓" : "Next Step →";

      global.LMSAdapter.setProgress(s.currentStep, data.steps.length);
    },

    renderAll: function () {
      global.ProjectModule.render(document.getElementById("app-stage"));
      this.syncChrome();
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { Runtime.init(); });
  } else {
    Runtime.init();
  }

  global.UlipsuRuntime = Runtime;
})(window);
