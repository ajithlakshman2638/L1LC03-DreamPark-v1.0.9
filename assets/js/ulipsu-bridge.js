/* Ulipsu Shared Platform Asset: ulipsu-bridge.js (v1.0.9 — Ephemeral Session, Reset on Close) */
(function (global) {
  "use strict";

  function purgeStorageKeys(storage) {
    if (!storage) return;
    try {
      var toRemove = [];
      for (var i = 0; i < storage.length; i++) {
        var k = storage.key(i);
        if (k && (k.indexOf("ulipsu_state_") === 0 || k.indexOf("L1LC03") !== -1)) {
          toRemove.push(k);
        }
      }
      for (var j = 0; j < toRemove.length; j++) {
        storage.removeItem(toRemove[j]);
      }
    } catch (e) {}
  }

  function clearAllCachedData() {
    try { purgeStorageKeys(global.localStorage); } catch (e) {}
    try { purgeStorageKeys(global.sessionStorage); } catch (e) {}
    try {
      if (global.caches && typeof global.caches.keys === "function") {
        global.caches.keys().then(function (names) {
          for (var i = 0; i < names.length; i++) {
            global.caches.delete(names[i]);
          }
        });
      }
    } catch (e) {}
  }

  var Bridge = {
    moduleId: null,
    ready: false,
    listeners: [],
    memoryState: null,

    init: function (moduleId) {
      this.moduleId = moduleId || "L1LC03_DreamPark_v1.0.9";
      this.ready = true;
      this.memoryState = null;

      // Immediately clear any previously saved resume data / cache on open
      clearAllCachedData();

      // Clear all state and cache when window/tab closes or unloads
      var handleClose = function () {
        Bridge.memoryState = null;
        clearAllCachedData();
      };
      window.addEventListener("pagehide", handleClose);
      window.addEventListener("beforeunload", handleClose);
      window.addEventListener("unload", handleClose);

      window.addEventListener("message", this._onMessage.bind(this));
      this.post("ULIPSU_MODULE_READY", {
        moduleId: this.moduleId,
        timestamp: Date.now()
      });
      return this;
    },

    clearCache: function () {
      this.memoryState = null;
      clearAllCachedData();
    },

    post: function (type, payload) {
      var msg = {
        source: "ulipsu-digital-project",
        moduleId: this.moduleId,
        type: type,
        payload: payload || {}
      };
      try {
        if (window.parent && window.parent !== window) {
          window.parent.postMessage(msg, "*");
        }
      } catch (e) {}
      return msg;
    },

    saveState: function (state) {
      // Keep state strictly in memory for the current active session only (never persist to localStorage)
      this.memoryState = state ? JSON.parse(JSON.stringify(state)) : null;
      this.post("ULIPSU_SAVE_STATE", { state: state });
    },

    loadState: function () {
      // Always start fresh from the beginning when opened
      clearAllCachedData();
      return null;
    },

    submitArtifact: function (artifact) {
      this.post("ULIPSU_SUBMIT_ARTIFACT", artifact);
    },

    completeModule: function (summary) {
      this.post("ULIPSU_MODULE_COMPLETE", summary);
    },

    onMessage: function (cb) {
      if (typeof cb === "function") this.listeners.push(cb);
    },

    _onMessage: function (event) {
      for (var i = 0; i < this.listeners.length; i++) {
        try {
          this.listeners[i](event.data);
        } catch (e) {}
      }
    }
  };

  global.UlipsuBridge = Bridge;
})(window);
