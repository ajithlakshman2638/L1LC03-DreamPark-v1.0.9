/* Ulipsu Shared Platform Asset: lms-adapter.js */
(function (global) {
  "use strict";

  var LMSAdapter = {
    initialized: false,
    progress: 0,
    status: "incomplete",
    submissions: [],

    init: function (meta) {
      this.meta = meta || {};
      this.initialized = true;
      if (global.UlipsuBridge) {
        global.UlipsuBridge.post("LMS_INIT", { meta: this.meta });
      }
    },

    setProgress: function (stepIndex, totalSteps) {
      var pct = Math.min(100, Math.round(((stepIndex + 1) / Math.max(1, totalSteps)) * 100));
      this.progress = pct;
      if (global.UlipsuBridge) {
        global.UlipsuBridge.post("LMS_PROGRESS", {
          progress: pct,
          step: stepIndex + 1,
          totalSteps: totalSteps
        });
      }
    },

    uploadWork: function (fileMeta) {
      var record = {
        fileName: fileMeta.fileName,
        mimeType: fileMeta.mimeType || "application/pdf",
        sizeBytes: fileMeta.sizeBytes || 0,
        dataUrl: fileMeta.dataUrl || "",
        uploadedAt: new Date().toISOString()
      };
      this.submissions.push(record);
      this.status = "completed";
      this.progress = 100;
      if (global.UlipsuBridge) {
        global.UlipsuBridge.submitArtifact(record);
        global.UlipsuBridge.completeModule({
          status: "completed",
          progress: 100,
          artifact: {
            fileName: record.fileName,
            mimeType: record.mimeType,
            sizeBytes: record.sizeBytes,
            uploadedAt: record.uploadedAt
          }
        });
      }
      return record;
    }
  };

  global.LMSAdapter = LMSAdapter;
})(window);
