/**
 * mugRenderEngine.js
 *
 * Moteur de rendu réaliste pour les mugs personnalisés.
 *
 * Pipeline de compositing à 3 couches :
 *   1. Image originale du mug (base)
 *   2. Contenu personnalisé (texte / photo) avec déformation cylindrique
 *   3. Overlay de luminance extrait de l'image originale
 *      → appliqué en blend mode "screen" pour que les reflets du mug
 *        restent visibles AU-DESSUS du contenu imprimé
 *
 * Ce dernier point est ce qui donne l'impression que le contenu est
 * réellement imprimé sur la céramique plutôt que posé devant.
 */

// ─── Cache global des images ─────────────────────────────────────────────────
const IMAGE_CACHE = new Map();

/**
 * Charge une image et la met en cache.
 * @param {string} src
 * @returns {Promise<HTMLImageElement>}
 */
export function loadImage(src) {
  if (IMAGE_CACHE.has(src)) {
    return Promise.resolve(IMAGE_CACHE.get(src));
  }
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      IMAGE_CACHE.set(src, img);
      resolve(img);
    };
    img.onerror = () => reject(new Error(`Impossible de charger : ${src}`));
    img.src = src;
  });
}

// ─── Helpers typographie ──────────────────────────────────────────────────────

/**
 * Résout une valeur CSS fontSize en pixels.
 * Supporte : px, rem, em, clamp(min, val, max) avec vw/rem/px.
 */
export function parseFontSize(fontSizeStr, containerW = 800) {
  if (!fontSizeStr) return 16;
  const s = String(fontSizeStr).trim();

  const clampMatch = s.match(/clamp\(\s*([^,]+),\s*([^,]+),\s*([^)]+)\)/);
  if (clampMatch) {
    const parseUnit = (v) => {
      const t = v.trim();
      if (t.endsWith("vw")) return (parseFloat(t) / 100) * containerW;
      if (t.endsWith("rem")) return parseFloat(t) * 16;
      if (t.endsWith("px")) return parseFloat(t);
      return parseFloat(t) * 16;
    };
    return Math.max(
      parseUnit(clampMatch[1]),
      Math.min(parseUnit(clampMatch[2]), parseUnit(clampMatch[3]))
    );
  }
  if (s.endsWith("rem")) return parseFloat(s) * 16;
  if (s.endsWith("em")) return parseFloat(s) * 16;
  if (s.endsWith("px")) return parseFloat(s);
  return parseFloat(s) || 16;
}

/**
 * Convertit une valeur de zone (% ou px) en pixels absolus.
 */
export function zoneToPixels(zone, W, H) {
  const parse = (val, base) => {
    if (val === undefined || val === null) return 0;
    const s = String(val);
    if (s.endsWith("%")) return (parseFloat(s) / 100) * base;
    return parseFloat(s);
  };
  return {
    top: parse(zone.top, H),
    left: parse(zone.left, W),
    width: parse(zone.width, W),
    height: parse(zone.height, H),
  };
}

/**
 * Dessine du texte multiligne avec wrapping automatique sur un contexte 2D.
 * Retourne la hauteur totale utilisée.
 */
function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight, textAlign = "center") {
  if (!text) return 0;
  const words = text.split(/\s+/);
  const lines = [];
  let cur = "";

  for (const word of words) {
    if (!word) continue;
    const test = cur ? `${cur} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && cur) {
      lines.push(cur);
      cur = word;
    } else {
      cur = test;
    }
  }
  if (cur) lines.push(cur);

  // Centrage vertical dans la zone
  const totalH = lines.length * lineHeight;
  let startY = y + Math.max(0, lineHeight * 0.1);

  for (const line of lines) {
    let drawX = x;
    if (textAlign === "center") drawX = x + maxWidth / 2;
    else if (textAlign === "right") drawX = x + maxWidth;
    ctx.fillText(line, drawX, startY);
    startY += lineHeight;
  }
  return totalH;
}

// ─── Déformation cylindrique ──────────────────────────────────────────────────

/**
 * Applique une déformation cylindrique horizontale sur un canvas offscreen.
 *
 * Le principe : on déplace horizontalement chaque colonne de pixels
 * d'une quantité proportionnelle à sin(π·x/W), ce qui simule la courbure
 * d'une surface cylindrique vue de face.
 *
 * @param {OffscreenCanvas|HTMLCanvasElement} src   Canvas source
 * @param {number} amplitude  Amplitude max du déplacement en pixels
 * @returns {OffscreenCanvas} Canvas transformé
 */
function applyCylinderWarp(src, amplitude) {
  if (!amplitude || amplitude <= 0) return src;

  const W = src.width;
  const H = src.height;

  const dst = new OffscreenCanvas(W, H);
  const sctx = src.getContext("2d");
  const dctx = dst.getContext("2d");

  const srcData = sctx.getImageData(0, 0, W, H);
  const dstData = dctx.createImageData(W, H);
  const sd = srcData.data;
  const dd = dstData.data;

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      // Déplacement vertical sinusoïdal : max au centre de la hauteur, 0 aux bords
      // Cela crée l'effet "bombé" vertical caractéristique d'un cylindre
      const ty = y / H; // 0 → 1
      const verticalWarp = amplitude * 0.3 * Math.sin(Math.PI * ty);

      // Déplacement horizontal : simule la profondeur de la surface courbée
      const tx = x / W; // 0 → 1
      const horizontalWarp = amplitude * Math.sin(Math.PI * tx);

      const srcX = Math.round(x - horizontalWarp + verticalWarp * 0.2);
      const srcY = Math.round(y - verticalWarp * 0.5);

      if (srcX < 0 || srcX >= W || srcY < 0 || srcY >= H) continue;

      const si = (srcY * W + srcX) * 4;
      const di = (y * W + x) * 4;
      dd[di]     = sd[si];
      dd[di + 1] = sd[si + 1];
      dd[di + 2] = sd[si + 2];
      dd[di + 3] = sd[si + 3];
    }
  }

  dctx.putImageData(dstData, 0, 0);
  return dst;
}

// ─── Extraction overlay luminance ─────────────────────────────────────────────

/**
 * Extrait les hautes luminances (reflets, brillances) d'une zone de l'image
 * de base et les retourne sous forme de canvas avec fond transparent.
 *
 * Ces pixels seront réappliqués EN DESSUS du contenu personnalisé,
 * ce qui donne l'impression que le texte est imprimé sous la céramique
 * et que les reflets du mug passent naturellement devant.
 *
 * @param {HTMLImageElement} baseImg  Image originale du mug
 * @param {object} zone              Zone {left, top, width, height} en px
 * @param {number} threshold         Luminance minimale pour être un reflet (0-255)
 * @param {number} intensity         Force de l'effet (0-1)
 * @returns {OffscreenCanvas}
 */
function extractLuminanceOverlay(baseImg, zone, threshold = 210, intensity = 0.6) {
  const { left, top, width, height } = zone;
  if (width <= 0 || height <= 0) return null;

  // Canvas temporaire pour lire les pixels de l'image originale
  const reader = new OffscreenCanvas(width, height);
  const rctx = reader.getContext("2d");
  rctx.drawImage(baseImg, left, top, width, height, 0, 0, width, height);

  const imageData = rctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  // Canvas résultat : seuls les pixels à haute luminance sont gardés
  const overlay = new OffscreenCanvas(width, height);
  const octx = overlay.getContext("2d");
  const overlayData = octx.createImageData(width, height);
  const od = overlayData.data;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Luminance perceptuelle ITU-R BT.709
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    if (lum >= threshold) {
      // Pixel brillant → on le conserve avec une opacité proportionnelle
      const alpha = ((lum - threshold) / (255 - threshold)) * intensity;
      // Teinter légèrement vers le blanc pour simuler le reflet céramique
      od[i]     = Math.min(255, r + (255 - r) * 0.3);
      od[i + 1] = Math.min(255, g + (255 - g) * 0.3);
      od[i + 2] = Math.min(255, b + (255 - b) * 0.3);
      od[i + 3] = Math.round(alpha * 255);
    }
    // Sinon : pixel transparent (alpha = 0 par défaut)
  }

  octx.putImageData(overlayData, 0, 0);
  return overlay;
}

// ─── Rendu texte sur canvas offscreen ────────────────────────────────────────

/**
 * Rend un texte dans un canvas offscreen aux dimensions de la zone.
 */
function renderTextOffscreen(text, style, zoneW, zoneH, canvasW) {
  const offscreen = new OffscreenCanvas(zoneW, zoneH);
  const ctx = offscreen.getContext("2d");

  const fontSize = parseFontSize(style.fontSize, canvasW);
  const rawFamily = (style.fontFamily || "sans-serif").replace(/'/g, "").replace(/"/g, "");
  const weight = parseInt(style.fontWeight) >= 600 || style.fontWeight === "bold" ? "bold" : "normal";
  const fontStyle = style.fontStyle || "normal";
  const color = style.color || "#1a1a1a";
  const textAlign = style.textAlign || "center";
  const lineHeight = (style.lineHeight ?? 1.35) * fontSize;

  let displayText = text || "";
  if (style.textTransform === "uppercase") displayText = displayText.toUpperCase();
  else if (style.textTransform === "lowercase") displayText = displayText.toLowerCase();

  ctx.font = `${fontStyle} ${weight} ${fontSize}px "${rawFamily}"`;
  ctx.fillStyle = color;
  ctx.textAlign = textAlign === "left" ? "left" : textAlign === "right" ? "right" : "center";
  ctx.textBaseline = "top";

  if (style.letterSpacing) {
    const ls = parseFloat(style.letterSpacing);
    if (!isNaN(ls)) ctx.letterSpacing = `${ls * fontSize}px`;
  }

  drawWrappedText(ctx, displayText, 0, 0, zoneW, lineHeight, textAlign);
  return offscreen;
}

// ─── Rendu photo sur canvas offscreen ────────────────────────────────────────

/**
 * Rend une image utilisateur dans un canvas offscreen aux dimensions de la zone.
 * Applique un object-cover et optionnellement un cadre polaroid.
 */
function renderPhotoOffscreen(userImg, zoneW, zoneH, field) {
  const offscreen = new OffscreenCanvas(zoneW, zoneH);
  const ctx = offscreen.getContext("2d");

  const isPolaroid = field.polaroid || false;
  const rotation = (field.rotation ?? 0) * (Math.PI / 180);

  if (isPolaroid) {
    // Cadre polaroid : blanc + ombre + photo rognée
    const pad = zoneW * 0.05;
    const bottomPad = zoneH * 0.14;

    // Fond blanc du polaroid
    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,0.22)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 4;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, zoneW, zoneH);
    ctx.restore();

    // Clip pour la zone photo
    const photoX = pad;
    const photoY = pad;
    const photoW = zoneW - pad * 2;
    const photoH = zoneH - pad - bottomPad;

    ctx.save();
    ctx.beginPath();
    ctx.rect(photoX, photoY, photoW, photoH);
    ctx.clip();

    // Cover-fit
    const sx = userImg.width;
    const sy = userImg.height;
    const scale = Math.max(photoW / sx, photoH / sy);
    const dw = sx * scale;
    const dh = sy * scale;
    const dx = photoX + (photoW - dw) / 2;
    const dy = photoY + (photoH - dh) / 2;
    ctx.drawImage(userImg, dx, dy, dw, dh);
    ctx.restore();
  } else {
    // Photo standard avec clipping et cover-fit
    const style = field.style || {};

    // Clipping shape
    ctx.save();
    ctx.beginPath();
    if (style.borderRadius === "50%") {
      ctx.arc(zoneW / 2, zoneH / 2, Math.min(zoneW, zoneH) / 2, 0, Math.PI * 2);
    } else {
      const r = style.borderRadius ? parseFloat(style.borderRadius) : 0;
      if (r > 0) {
        ctx.roundRect(0, 0, zoneW, zoneH, r);
      } else {
        ctx.rect(0, 0, zoneW, zoneH);
      }
    }
    ctx.clip();

    // Cover-fit
    const scale = Math.max(zoneW / userImg.width, zoneH / userImg.height);
    const dw = userImg.width * scale;
    const dh = userImg.height * scale;
    const dx = (zoneW - dw) / 2;
    const dy = (zoneH - dh) / 2;
    ctx.drawImage(userImg, dx, dy, dw, dh);
    ctx.restore();
  }

  return offscreen;
}

// ─── Moteur principal ─────────────────────────────────────────────────────────

/**
 * Rend le mug personnalisé sur un canvas HTML5.
 *
 * @param {HTMLCanvasElement} canvas     Canvas de destination
 * @param {object}            template   Définition du template (depuis products.js)
 * @param {object}            fieldStates { [key]: { value, isCustomized } }
 */
export async function renderMug(canvas, template, fieldStates) {
  if (!canvas || !template) return;

  const ctx = canvas.getContext("2d");
  const W = canvas.width;   // 800
  const H = canvas.height;  // 800

  // ── 1. Charger l'image de base ───────────────────────────────────────────
  let baseImg;
  try {
    baseImg = await loadImage(template.imageUrl);
  } catch {
    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(0, 0, W, H);
    return;
  }

  // ── 2. Dessiner l'image originale complète ───────────────────────────────
  ctx.clearRect(0, 0, W, H);
  ctx.drawImage(baseImg, 0, 0, W, H);

  // ── 3. Récupérer la config de rendu du template ──────────────────────────
  const renderConfig = template.renderConfig || {};
  const cylinderWarp = renderConfig.cylinderWarp ?? 4;
  const overlayIntensity = renderConfig.overlayIntensity ?? 0.5;
  const overlayThreshold = renderConfig.overlayThreshold ?? 210;

  // Zone d'impression principale (pour l'overlay)
  const printZone = renderConfig.printZone
    ? zoneToPixels(renderConfig.printZone, W, H)
    : { left: 0, top: 0, width: W, height: H };

  // ── 4. Extraire l'overlay de luminance AVANT de modifier le canvas ───────
  //    On capture les reflets de l'image originale dans la zone d'impression
  const luminanceOverlay = extractLuminanceOverlay(
    baseImg,
    printZone,
    overlayThreshold,
    overlayIntensity
  );

  // ── 5. Rendre chaque champ modifié ───────────────────────────────────────
  for (const field of template.fields) {
    const state = fieldStates[field.key];
    if (!state?.isCustomized || !field.zone) continue;

    const zone = zoneToPixels(field.zone, W, H);
    const zW = Math.round(zone.width);
    const zH = Math.round(zone.height);
    if (zW <= 0 || zH <= 0) continue;

    let contentCanvas = null;

    if (field.type === "text") {
      // Rendre le texte sur un canvas offscreen
      contentCanvas = renderTextOffscreen(
        state.value || "",
        field.style || {},
        zW,
        zH,
        W
      );
    } else if (field.type === "image") {
      const src = state.value;
      if (!src || src === field.originalValue) continue;
      try {
        const userImg = await loadImage(src);
        contentCanvas = renderPhotoOffscreen(userImg, zW, zH, field);
      } catch {
        continue;
      }
    }

    if (!contentCanvas) continue;

    // ── Appliquer la déformation cylindrique ──────────────────────────────
    const warped = applyCylinderWarp(contentCanvas, cylinderWarp);

    // ── Composer sur le canvas principal ─────────────────────────────────
    //    Utiliser globalCompositeOperation "source-atop" dans la zone
    //    pour remplacer proprement la zone sans masque de couleur
    ctx.save();

    // Clip dans la zone du champ pour ne pas déborder
    ctx.beginPath();
    ctx.rect(zone.left, zone.top, zW, zH);
    ctx.clip();

    // Effacer la zone de l'image originale (supprime l'original du champ)
    ctx.clearRect(zone.left, zone.top, zW, zH);

    // Dessiner à nouveau le fond du mug dans cette zone (pour garder la couleur de base)
    ctx.drawImage(baseImg, zone.left, zone.top, zW, zH, zone.left, zone.top, zW, zH);

    // Dessiner le contenu personnalisé par-dessus
    ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(warped, zone.left, zone.top, zW, zH);

    ctx.restore();
  }

  // ── 6. Réappliquer l'overlay de luminance (reflets du mug) ──────────────
  //    "screen" blend mode : les zones sombres de l'overlay sont transparentes,
  //    les zones claires (reflets) s'appliquent en éclaircissement.
  //    Résultat : le contenu personnalisé semble SOUS les reflets de la céramique.
  if (luminanceOverlay && overlayIntensity > 0) {
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    ctx.drawImage(
      luminanceOverlay,
      printZone.left,
      printZone.top,
      printZone.width,
      printZone.height
    );
    ctx.restore();
  }
}
