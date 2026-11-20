/* Ulipsu Shared Platform Asset: pdf.js — Multi-Page Direct PDF Generator (v1.0.9) */
(function (global) {
  "use strict";

  function asciiBytes(str) {
    var out = new Uint8Array(str.length);
    for (var i = 0; i < str.length; i++) {
      out[i] = str.charCodeAt(i) & 0xff;
    }
    return out;
  }

  function dataUrlToUint8Array(dataUrl) {
    var base64 = dataUrl.split(",")[1];
    var bin = atob(base64);
    var len = bin.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = bin.charCodeAt(i);
    }
    return bytes;
  }

  // Builds a valid multi-page %PDF-1.4 document from an array of { bytes, width, height } JPEG pages
  function buildMultiPagePdfFromJpegs(pages) {
    var pageW = 595;
    var pageH = 842;
    var count = pages.length;

    var totalObjs = 2 + count * 3;
    var kidsList = [];
    for (var p = 0; p < count; p++) {
      kidsList.push((3 + p * 3) + " 0 R");
    }

    var obj1 = "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n";
    var obj2 = "2 0 obj\n<< /Type /Pages /Kids [" + kidsList.join(" ") + "] /Count " + count + " >>\nendobj\n";

    var header = "%PDF-1.4\n";
    var parts = [asciiBytes(header), asciiBytes(obj1), asciiBytes(obj2)];
    var offsets = [0, header.length, header.length + obj1.length];
    var pos = header.length + obj1.length + obj2.length;

    for (var i = 0; i < count; i++) {
      var pg = pages[i];
      var pageObjNum = 3 + i * 3;
      var imgObjNum = 4 + i * 3;
      var contObjNum = 5 + i * 3;

      var scale = Math.min(pageW / pg.width, pageH / pg.height);
      var drawW = Math.round(pg.width * scale);
      var drawH = Math.round(pg.height * scale);
      var offsetX = Math.round((pageW - drawW) / 2);
      var offsetY = Math.round((pageH - drawH) / 2);

      var pageObj =
        pageObjNum + " 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 " +
        pageW + " " + pageH +
        "] /Resources << /XObject << /Im" + i + " " + imgObjNum + " 0 R >> >> /Contents " +
        contObjNum + " 0 R >>\nendobj\n";

      var imgHead =
        imgObjNum + " 0 obj\n<< /Type /XObject /Subtype /Image /Width " +
        pg.width + " /Height " + pg.height +
        " /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length " +
        pg.bytes.length + " >>\nstream\n";
      var imgTail = "\nendstream\nendobj\n";

      var streamStr =
        "q\n" + drawW + " 0 0 " + drawH + " " + offsetX + " " + offsetY + " cm\n/Im" + i + " Do\nQ\n";
      var contObj =
        contObjNum + " 0 obj\n<< /Length " + streamStr.length + " >>\nstream\n" +
        streamStr + "endstream\nendobj\n";

      offsets.push(pos);
      parts.push(asciiBytes(pageObj));
      pos += pageObj.length;

      offsets.push(pos);
      parts.push(asciiBytes(imgHead));
      parts.push(pg.bytes);
      parts.push(asciiBytes(imgTail));
      pos += imgHead.length + pg.bytes.length + imgTail.length;

      offsets.push(pos);
      parts.push(asciiBytes(contObj));
      pos += contObj.length;
    }

    var xrefStart = pos;
    var xref = "xref\n0 " + (totalObjs + 1) + "\n0000000000 65535 f \n";
    for (var o = 1; o <= totalObjs; o++) {
      var offStr = String(offsets[o]);
      while (offStr.length < 10) offStr = "0" + offStr;
      xref += offStr + " 00000 n \n";
    }
    var trailer = "trailer\n<< /Size " + (totalObjs + 1) + " /Root 1 0 R >>\nstartxref\n" + xrefStart + "\n%%EOF";
    parts.push(asciiBytes(xref));
    parts.push(asciiBytes(trailer));

    var totalLen = 0;
    for (var j = 0; j < parts.length; j++) totalLen += parts[j].length;

    var pdfBytes = new Uint8Array(totalLen);
    var cursor = 0;
    for (var k = 0; k < parts.length; k++) {
      pdfBytes.set(parts[k], cursor);
      cursor += parts[k].length;
    }
    return new Blob([pdfBytes], { type: "application/pdf" });
  }

  function wrapLines(ctx, text, maxWidth) {
    var words = String(text || "").split(/\s+/);
    var lines = [];
    var current = "";
    for (var i = 0; i < words.length; i++) {
      var test = current ? current + " " + words[i] : words[i];
      if (ctx.measureText(test).width > maxWidth && current) {
        lines.push(current);
        current = words[i];
      } else {
        current = test;
      }
    }
    if (current) lines.push(current);
    return lines;
  }

  function triggerDownload(blob, fileName) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 200);
  }

  function drawZoneFeatureIllustration(ctx, featureId, cx, cy) {
    if (featureId === "playground") {
      ctx.strokeStyle = "#DC2626";
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.moveTo(cx - 115, cy + 45);
      ctx.lineTo(cx - 85, cy - 45);
      ctx.lineTo(cx - 25, cy - 45);
      ctx.lineTo(cx + 5, cy + 45);
      ctx.stroke();
      ctx.strokeStyle = "#475569";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx - 68, cy - 45); ctx.lineTo(cx - 68, cy + 12);
      ctx.moveTo(cx - 42, cy - 45); ctx.lineTo(cx - 42, cy + 12);
      ctx.stroke();
      ctx.fillStyle = "#F59E0B";
      ctx.fillRect(cx - 78, cy + 10, 20, 8);
      ctx.fillRect(cx - 52, cy + 10, 20, 8);
      ctx.fillStyle = "#2563EB";
      ctx.fillRect(cx + 25, cy - 35, 16, 80);
      ctx.strokeStyle = "#F59E0B";
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.moveTo(cx + 40, cy - 30);
      ctx.quadraticCurveTo(cx + 80, cy + 15, cx + 115, cy + 42);
      ctx.stroke();
    } else if (featureId === "flower_garden") {
      ctx.fillStyle = "#86EFAC";
      ctx.beginPath();
      ctx.ellipse(cx, cy + 8, 120, 48, 0, 0, Math.PI * 2);
      ctx.fill();
      var blooms = [
        [-75, -8, "#EC4899"], [-25, -20, "#F59E0B"], [30, -14, "#8B5CF6"],
        [80, -2, "#EF4444"], [-50, 22, "#F97316"], [10, 24, "#E11D48"], [62, 22, "#3B82F6"]
      ];
      for (var i = 0; i < blooms.length; i++) {
        var bx = cx + blooms[i][0];
        var by = cy + blooms[i][1];
        ctx.fillStyle = blooms[i][2];
        ctx.beginPath(); ctx.arc(bx, by, 13, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#FEF08A";
        ctx.beginPath(); ctx.arc(bx, by, 5, 0, Math.PI * 2); ctx.fill();
      }
    } else if (featureId === "bike_path") {
      ctx.strokeStyle = "#94A3B8";
      ctx.lineWidth = 34;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(cx - 120, cy + 25);
      ctx.bezierCurveTo(cx - 40, cy - 45, cx + 40, cy + 45, cx + 120, cy - 20);
      ctx.stroke();
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 3;
      ctx.setLineDash([12, 10]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.strokeStyle = "#0F172A";
      ctx.lineWidth = 4;
      ctx.beginPath(); ctx.arc(cx - 22, cy + 4, 15, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(cx + 22, cy + 4, 15, 0, Math.PI * 2); ctx.stroke();
      ctx.strokeStyle = "#EF4444";
      ctx.beginPath();
      ctx.moveTo(cx - 22, cy + 4); ctx.lineTo(cx, cy - 14); ctx.lineTo(cx + 22, cy + 4);
      ctx.stroke();
    } else if (featureId === "duck_pond") {
      ctx.fillStyle = "#38BDF8";
      ctx.beginPath();
      ctx.ellipse(cx, cy + 4, 122, 52, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#0284C7";
      ctx.lineWidth = 4;
      ctx.stroke();
      var ducks = [[-35, -4], [32, 12]];
      for (var d = 0; d < ducks.length; d++) {
        var dx = cx + ducks[d][0];
        var dy = cy + ducks[d][1];
        ctx.fillStyle = "#FACC15";
        ctx.beginPath(); ctx.ellipse(dx, dy, 16, 10, 0, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(dx + 10, dy - 9, 8, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#F97316";
        ctx.beginPath(); ctx.moveTo(dx + 17, dy - 10); ctx.lineTo(dx + 25, dy - 8); ctx.lineTo(dx + 17, dy - 6); ctx.fill();
      }
    } else if (featureId === "board_games") {
      ctx.fillStyle = "#FEF3C7";
      ctx.fillRect(cx - 56, cy - 42, 112, 84);
      ctx.strokeStyle = "#92400E";
      ctx.lineWidth = 4;
      ctx.strokeRect(cx - 56, cy - 42, 112, 84);
      for (var r = 0; r < 3; r++) {
        for (var c = 0; c < 4; c++) {
          if ((r + c) % 2 === 0) {
            ctx.fillStyle = "#D97706";
            ctx.fillRect(cx - 56 + c * 28, cy - 42 + r * 28, 28, 28);
          }
        }
      }
      ctx.fillStyle = "#DC2626";
      ctx.beginPath(); ctx.arc(cx - 28, cy, 11, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#2563EB";
      ctx.beginPath(); ctx.arc(cx + 28, cy, 11, 0, Math.PI * 2); ctx.fill();
    } else if (featureId === "fountain_benches") {
      ctx.fillStyle = "#92400E";
      ctx.fillRect(cx - 125, cy - 14, 34, 28);
      ctx.fillRect(cx + 91, cy - 14, 34, 28);
      ctx.fillStyle = "#BAE6FD";
      ctx.beginPath(); ctx.arc(cx, cy, 46, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = "#0284C7"; ctx.lineWidth = 4; ctx.stroke();
      ctx.fillStyle = "#38BDF8";
      ctx.beginPath(); ctx.arc(cx, cy, 24, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath(); ctx.arc(cx, cy, 9, 0, Math.PI * 2); ctx.fill();
    } else if (featureId === "dog_park") {
      ctx.strokeStyle = "#B45309";
      ctx.lineWidth = 4;
      ctx.setLineDash([10, 6]);
      ctx.strokeRect(cx - 115, cy - 44, 230, 88);
      ctx.setLineDash([]);
      ctx.fillStyle = "#78350F";
      ctx.beginPath(); ctx.arc(cx - 32, cy + 8, 16, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(cx - 48, cy - 12, 7, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(cx - 32, cy - 18, 7, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(cx - 16, cy - 12, 7, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#FDE68A";
      ctx.fillRect(cx + 22, cy - 6, 48, 12);
      ctx.beginPath(); ctx.arc(cx + 22, cy - 6, 8, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(cx + 22, cy + 6, 8, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(cx + 70, cy - 6, 8, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(cx + 70, cy + 6, 8, 0, Math.PI * 2); ctx.fill();
    } else {
      var trees = [[-62, 6], [0, -10], [62, 8]];
      for (var t = 0; t < trees.length; t++) {
        var tx = cx + trees[t][0];
        var ty = cy + trees[t][1];
        ctx.fillStyle = "#78350F";
        ctx.fillRect(tx - 7, ty + 10, 14, 34);
        ctx.fillStyle = "#15803D";
        ctx.beginPath(); ctx.arc(tx, ty - 4, 32, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#22C55E";
        ctx.beginPath(); ctx.arc(tx - 8, ty - 12, 20, 0, Math.PI * 2); ctx.fill();
      }
    }
  }

  var UlipsuPDF = {
    renderParkMapCanvas: function (state) {
      var canvas = document.createElement("canvas");
      canvas.width = 1240;
      canvas.height = 1754;
      var ctx = canvas.getContext("2d");

      var data = global.CONTENT_DATA;
      var featureMap = {};
      for (var f = 0; f < data.features.length; f++) {
        featureMap[data.features[f].id] = data.features[f];
      }

      ctx.fillStyle = "#F0FDF4";
      ctx.fillRect(0, 0, 1240, 1754);

      ctx.strokeStyle = "#065F46";
      ctx.lineWidth = 14;
      ctx.strokeRect(42, 42, 1156, 1670);

      ctx.fillStyle = "#064E3B";
      ctx.fillRect(42, 42, 1156, 145);
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 44px Lato, sans-serif";
      ctx.fillText((state.parkName || "MY DREAM PARK").toUpperCase(), 85, 112);

      ctx.fillStyle = "#FDE68A";
      ctx.font = "bold 24px Lato, sans-serif";
      ctx.fillText("L1LC03CP · DREAM PARK BLUEPRINT (PART 1: PARK MODEL LAYOUT)", 85, 155);

      var boardX = 85;
      var boardY = 230;
      var boardW = 1070;
      var boardH = 980;
      ctx.fillStyle = state.groundTheme === "blossom" ? "#FCE7F3" : state.groundTheme === "riverside" ? "#E0F2FE" : "#DCFCE7";
      ctx.fillRect(boardX, boardY, boardW, boardH);
      ctx.strokeStyle = "#047857";
      ctx.lineWidth = 8;
      ctx.strokeRect(boardX, boardY, boardW, boardH);

      ctx.fillStyle = "#FEF3C7";
      ctx.fillRect(boardX + boardW / 2 - 24, boardY + 20, 48, boardH - 40);
      ctx.fillRect(boardX + 20, boardY + boardH / 2 - 24, boardW - 40, 48);

      var zoneCoords = [
        { x: boardX + 35, y: boardY + 35, w: 470, h: 420, label: "ZONE 1 · NORTH-WEST" },
        { x: boardX + 565, y: boardY + 35, w: 470, h: 420, label: "ZONE 2 · NORTH-EAST" },
        { x: boardX + 35, y: boardY + 525, w: 470, h: 420, label: "ZONE 3 · SOUTH-WEST" },
        { x: boardX + 565, y: boardY + 525, w: 470, h: 420, label: "ZONE 4 · SOUTH-EAST" }
      ];

      for (var z = 0; z < 4; z++) {
        var zc = zoneCoords[z];
        var fid = state.zones[z];
        var feat = fid ? featureMap[fid] : null;

        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(zc.x, zc.y, zc.w, zc.h);
        ctx.strokeStyle = "#059669";
        ctx.lineWidth = 4;
        ctx.strokeRect(zc.x, zc.y, zc.w, zc.h);

        ctx.fillStyle = "#065F46";
        ctx.font = "bold 20px Lato, sans-serif";
        ctx.fillText(zc.label, zc.x + 22, zc.y + 38);

        if (feat) {
          drawZoneFeatureIllustration(ctx, feat.id, zc.x + zc.w / 2, zc.y + 195);
          ctx.fillStyle = "#0F172A";
          ctx.font = "bold 24px Lato, sans-serif";
          var fLines = wrapLines(ctx, feat.name, zc.w - 44);
          for (var fl = 0; fl < Math.min(2, fLines.length); fl++) {
            ctx.fillText(fLines[fl], zc.x + 22, zc.y + 335 + fl * 30);
          }
        }
      }

      ctx.fillStyle = "#78350F";
      ctx.fillRect(390, boardY + boardH - 28, 460, 56);
      ctx.fillStyle = "#FEF3C7";
      ctx.font = "bold 24px Lato, sans-serif";
      ctx.fillText("WELCOME GATE · " + (state.parkName || "DREAM PARK").toUpperCase().slice(0, 18), 425, boardY + boardH + 8);

      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(85, 1275, 1070, 385);
      ctx.strokeStyle = "#A7F3D0";
      ctx.lineWidth = 4;
      ctx.strokeRect(85, 1275, 1070, 385);

      ctx.fillStyle = "#064E3B";
      ctx.font = "bold 28px Lato, sans-serif";
      ctx.fillText("FOUR CHOSEN PARK FEATURES", 120, 1328);

      ctx.font = "25px Lato, sans-serif";
      ctx.fillStyle = "#1E293B";
      for (var lz = 0; lz < 4; lz++) {
        var lFeat = state.zones[lz] ? featureMap[state.zones[lz]] : null;
        var itemTxt = (lz + 1) + ". " + (lFeat ? lFeat.name + " (" + data.zoneLabels[lz].name + ")" : "Not placed");
        ctx.fillText(itemTxt, 120, 1385 + lz * 58);
      }

      return canvas;
    },

    renderOpinionEssayCanvas: function (state) {
      var canvas = document.createElement("canvas");
      canvas.width = 1240;
      canvas.height = 1754;
      var ctx = canvas.getContext("2d");

      var data = global.CONTENT_DATA;
      var featureMap = {};
      for (var f = 0; f < data.features.length; f++) {
        featureMap[data.features[f].id] = data.features[f];
      }

      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, 1240, 1754);

      ctx.strokeStyle = "#059669";
      ctx.lineWidth = 12;
      ctx.strokeRect(42, 42, 1156, 1670);

      ctx.fillStyle = "#1E1B4B";
      ctx.fillRect(42, 42, 1156, 135);
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 38px Lato, sans-serif";
      ctx.fillText("PART 2: OPINION PIECE — " + (state.parkName || "MY DREAM PARK").toUpperCase(), 85, 108);
      ctx.fillStyle = "#A3E635";
      ctx.font = "bold 22px Lato, sans-serif";
      ctx.fillText("L1LC03 · Quill and Tell: The Art of Opinion Writing (L1LC03CP)", 85, 148);

      var curY = 240;
      ctx.fillStyle = "#064E3B";
      ctx.font = "bold 40px Lato, sans-serif";
      var titleLines = wrapLines(ctx, state.essayTitle || ("Why " + (state.parkName || "My Dream Park") + " Is the Best Park"), 1070);
      for (var t = 0; t < Math.min(2, titleLines.length); t++) {
        ctx.fillText(titleLines[t], 85, curY);
        curY += 50;
      }

      ctx.strokeStyle = "#A3E635";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(85, curY - 10);
      ctx.lineTo(1155, curY - 10);
      ctx.stroke();
      curY += 32;

      ctx.fillStyle = "#4338CA";
      ctx.font = "bold 24px Lato, sans-serif";
      ctx.fillText("INTRODUCTION (MY OPINION):", 85, curY);
      curY += 36;

      ctx.fillStyle = "#0F172A";
      ctx.font = "25px Lato, sans-serif";
      var introLines = wrapLines(ctx, state.introOpinion || "", 1070);
      for (var i = 0; i < Math.min(4, introLines.length); i++) {
        ctx.fillText(introLines[i], 85, curY);
        curY += 34;
      }
      curY += 20;

      for (var z = 0; z < 4; z++) {
        var fid = state.zones[z];
        var feat = fid ? featureMap[fid] : null;
        var fTitle = feat ? feat.name : "Feature " + (z + 1);
        var reasonTxt = (fid && state.featureReasons && state.featureReasons[fid]) ? state.featureReasons[fid] : "";

        ctx.fillStyle = "#ECFDF5";
        ctx.fillRect(85, curY - 24, 1070, 185);
        ctx.strokeStyle = "#6EE7B7";
        ctx.lineWidth = 2;
        ctx.strokeRect(85, curY - 24, 1070, 185);

        ctx.fillStyle = "#065F46";
        ctx.font = "bold 24px Lato, sans-serif";
        ctx.fillText("Reason " + (z + 1) + " — " + fTitle + ":", 108, curY + 12);

        ctx.fillStyle = "#1E293B";
        ctx.font = "23px Lato, sans-serif";
        var rLines = wrapLines(ctx, reasonTxt, 1020);
        for (var rl = 0; rl < Math.min(3, rLines.length); rl++) {
          ctx.fillText(rLines[rl], 108, curY + 50 + rl * 32);
        }
        curY += 205;
      }

      curY += 10;
      ctx.fillStyle = "#4338CA";
      ctx.font = "bold 24px Lato, sans-serif";
      ctx.fillText("CONCLUSION:", 85, curY);
      curY += 36;

      ctx.fillStyle = "#0F172A";
      ctx.font = "25px Lato, sans-serif";
      var concLines = wrapLines(ctx, state.conclusion || "", 1070);
      for (var c = 0; c < Math.min(4, concLines.length); c++) {
        ctx.fillText(concLines[c], 85, curY);
        curY += 34;
      }

      return canvas;
    },

    buildDreamParkPDFBlob: function (state) {
      var mapCanvas = this.renderParkMapCanvas(state);
      var essayCanvas = this.renderOpinionEssayCanvas(state);

      var mapJpeg = dataUrlToUint8Array(mapCanvas.toDataURL("image/jpeg", 0.92));
      var essayJpeg = dataUrlToUint8Array(essayCanvas.toDataURL("image/jpeg", 0.92));

      var blob = buildMultiPagePdfFromJpegs([
        { bytes: mapJpeg, width: mapCanvas.width, height: mapCanvas.height },
        { bytes: essayJpeg, width: essayCanvas.width, height: essayCanvas.height }
      ]);

      var safeName = (state.parkName || "DreamPark").replace(/[^a-zA-Z0-9_-]/g, "_");
      return { blob: blob, fileName: safeName + "_DreamPark_L1LC03CP_v1.0.9.pdf" };
    },

    downloadDreamParkPDF: function (state) {
      var res = this.buildDreamParkPDFBlob(state);
      triggerDownload(res.blob, res.fileName);
      return res;
    }
  };

  global.UlipsuPDF = UlipsuPDF;
})(window);
