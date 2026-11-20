/* Ulipsu Standard Template Runtime: kit.js (v1.0.9) */
(function (global) {
  "use strict";

  var toastTimer = null;

  var UlipsuKit = {
    esc: function (str) {
      return String(str == null ? "" : str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
    },

    toast: function (message) {
      var el = document.getElementById("ulipsu-toast");
      if (!el) {
        el = document.createElement("div");
        el.id = "ulipsu-toast";
        el.className = "ulipsu-toast";
        document.body.appendChild(el);
      }
      el.textContent = message;
      el.classList.add("is-visible");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(function () {
        el.classList.remove("is-visible");
      }, 3000);
    },

    celebrate: function () {
      var colors = ["#4F46E5", "#F59E0B", "#10B981", "#EC4899", "#0EA5E9", "#8B5CF6"];
      for (var i = 0; i < 36; i++) {
        var piece = document.createElement("div");
        piece.className = "cp-confetti-piece";
        piece.style.left = Math.round(Math.random() * 98) + "vw";
        piece.style.backgroundColor = colors[i % colors.length];
        piece.style.animationDelay = (Math.random() * 0.45).toFixed(2) + "s";
        piece.style.width = (7 + Math.round(Math.random() * 6)) + "px";
        piece.style.height = (10 + Math.round(Math.random() * 8)) + "px";
        document.body.appendChild(piece);
        (function (node) {
          setTimeout(function () {
            if (node.parentNode) node.parentNode.removeChild(node);
          }, 2900);
        })(piece);
      }
    },

    renderStepper: function (container, steps, currentIndex, completedMap, onSelect, maxUnlockedIndex) {
      if (!container) return;
      var maxIdx = typeof maxUnlockedIndex === "number" ? maxUnlockedIndex : steps.length - 1;
      var html = '<div class="ulipsu-hdr-segments" role="group" aria-label="Step Progress">';
      for (var i = 0; i < steps.length; i++) {
        var isActive = i === currentIndex;
        var isDone = Boolean(completedMap && completedMap[i]);
        var isLocked = i > maxIdx;
        var cls = "ulipsu-seg-btn" +
          (isActive ? " is-active" : "") +
          (isDone ? " is-done" : "") +
          (isLocked ? " is-locked" : "");
        var lbl = UlipsuKit.esc(steps[i].shortTitle || steps[i].title);
        html +=
          '<button type="button" class="' + cls + '" data-step-idx="' + i + '" title="' + lbl + '"' +
          (isLocked ? ' disabled aria-disabled="true"' : '') + '></button>';
      }
      html += "</div>";
      container.innerHTML = html;

      var btns = container.querySelectorAll("[data-step-idx]");
      for (var b = 0; b < btns.length; b++) {
        btns[b].addEventListener("click", function () {
          if (this.disabled) return;
          var idx = parseInt(this.getAttribute("data-step-idx"), 10);
          if (typeof onSelect === "function") onSelect(idx);
        });
      }
    }
  };

  global.UlipsuKit = UlipsuKit;
})(window);
