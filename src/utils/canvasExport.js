// High-Resolution Canvas Renderer for Instagram Collage Studio
import { BACKGROUND_PRESETS, FILTER_PRESETS } from '../types/collage';

/**
 * Load an image with crossOrigin support and promise resolution
 */
function loadImage(src) {
  return new Promise((resolve) => {
    if (!src) {
      resolve(null);
      return;
    }
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => {
      // Retry without anonymous or resolve null
      const fallbackImg = new Image();
      fallbackImg.onload = () => resolve(fallbackImg);
      fallbackImg.onerror = () => resolve(null);
      fallbackImg.src = src;
    };
    img.src = src;
  });
}

/**
 * Helper to draw rounded rectangle path
 */
function roundedRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/**
 * Draw image with "cover" fit (maintain aspect ratio, center crop)
 */
function drawImageCover(ctx, img, x, y, w, h, zoom = 1, panX = 0, panY = 0) {
  if (!img) return;
  const imgRatio = img.width / img.height;
  const cellRatio = w / h;

  let sWidth, sHeight;
  if (imgRatio > cellRatio) {
    sHeight = img.height;
    sWidth = img.height * cellRatio;
  } else {
    sWidth = img.width;
    sHeight = img.width / cellRatio;
  }

  // Apply zoom
  sWidth = sWidth / Math.max(0.5, zoom);
  sHeight = sHeight / Math.max(0.5, zoom);

  const sx = Math.max(0, Math.min(img.width - sWidth, (img.width - sWidth) / 2 + (panX / 100) * img.width));
  const sy = Math.max(0, Math.min(img.height - sHeight, (img.height - sHeight) / 2 + (panY / 100) * img.height));

  ctx.drawImage(img, sx, sy, sWidth, sHeight, x, y, w, h);
}

/**
 * Render the complete collage onto an HTML5 Canvas at target export resolution
 */
export async function renderCollageToCanvas(state, targetWidth = 1080, targetHeight = 1080) {
  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext('2d');

  if (!ctx) throw new Error('Could not get 2D canvas context');

  const scale = targetWidth / 1080;

  // 1. Draw Background
  const bgPreset = BACKGROUND_PRESETS.find((b) => b.id === state.background);
  if (bgPreset && bgPreset.type === 'gradient') {
    const grad = ctx.createLinearGradient(0, 0, targetWidth, targetHeight);
    const stops = bgPreset.stops;
    stops.forEach((color, i) => {
      grad.addColorStop(i / (stops.length - 1), color);
    });
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, targetWidth, targetHeight);
  } else if (state.customBgColor) {
    ctx.fillStyle = state.customBgColor;
    ctx.fillRect(0, 0, targetWidth, targetHeight);
  } else if (bgPreset && bgPreset.type === 'solid') {
    ctx.fillStyle = bgPreset.css;
    ctx.fillRect(0, 0, targetWidth, targetHeight);
  } else {
    // Default dark luxury background
    ctx.fillStyle = '#121417';
    ctx.fillRect(0, 0, targetWidth, targetHeight);
  }

  // Optional subtle background texture (e.g. grid dots or grain)
  if (state.bgPattern === 'dots') {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    const spacing = 36 * scale;
    for (let px = spacing / 2; px < targetWidth; px += spacing) {
      for (let py = spacing / 2; py < targetHeight; py += spacing) {
        ctx.beginPath();
        ctx.arc(px, py, 2 * scale, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  } else if (state.bgPattern === 'grid') {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.lineWidth = 1 * scale;
    const spacing = 48 * scale;
    for (let px = 0; px <= targetWidth; px += spacing) {
      ctx.beginPath();
      ctx.moveTo(px, 0);
      ctx.lineTo(px, targetHeight);
      ctx.stroke();
    }
    for (let py = 0; py <= targetHeight; py += spacing) {
      ctx.beginPath();
      ctx.moveTo(0, py);
      ctx.lineTo(targetWidth, py);
      ctx.stroke();
    }
  }

  // Determine active filter string
  const activeFilterPreset = FILTER_PRESETS.find((f) => f.id === state.filter);
  const filterCss = activeFilterPreset && activeFilterPreset.id !== 'normal' ? activeFilterPreset.css : 'none';

  // 2. Render Mode: GRID vs. FREEFORM
  if (state.mode === 'grid') {
    const padding = (state.padding || 12) * scale;
    const gap = (state.gap || 8) * scale;
    const radius = (state.radius || 12) * scale;

    const availWidth = targetWidth - padding * 2;
    const availHeight = targetHeight - padding * 2;

    const template = state.currentTemplate;
    const cells = template?.cells || [];

    // Pre-load all cell images
    const loadedImages = await Promise.all(
      cells.map((_, idx) => {
        const photoUrl = state.photos[idx];
        return loadImage(photoUrl);
      })
    );

    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];
      const img = loadedImages[i];
      const cellAdjust = state.cellAdjustments?.[i] || {};

      // Calculate position with gap
      const cx = padding + (cell.x / 100) * availWidth + gap / 2;
      const cy = padding + (cell.y / 100) * availHeight + gap / 2;
      const cw = (cell.w / 100) * availWidth - gap;
      const ch = (cell.h / 100) * availHeight - gap;

      ctx.save();
      // Rounded clipping path
      roundedRect(ctx, cx, cy, cw, ch, radius);
      ctx.clip();

      if (img) {
        if (filterCss !== 'none' && ctx.filter !== undefined) {
          ctx.filter = filterCss;
        }

        ctx.save();
        // Optional flip or rotate per cell
        if (cellAdjust.flipH || cellAdjust.flipV || cellAdjust.rotate) {
          ctx.translate(cx + cw / 2, cy + ch / 2);
          if (cellAdjust.rotate) ctx.rotate((cellAdjust.rotate * Math.PI) / 180);
          if (cellAdjust.flipH) ctx.scale(-1, 1);
          if (cellAdjust.flipV) ctx.scale(1, -1);
          ctx.translate(-(cx + cw / 2), -(cy + ch / 2));
        }

        drawImageCover(
          ctx,
          img,
          cx,
          cy,
          cw,
          ch,
          cellAdjust.zoom || 1,
          cellAdjust.panX || 0,
          cellAdjust.panY || 0
        );
        ctx.restore();
      } else {
        // Placeholder aesthetic tile
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.fillRect(cx, cy, cw, ch);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.font = `600 ${14 * scale}px 'Plus Jakarta Sans', sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText(`Photo ${i + 1}`, cx + cw / 2, cy + ch / 2);
      }

      ctx.restore();

      // Border outline if configured
      if (state.borderWidth && state.borderWidth > 0) {
        ctx.save();
        roundedRect(ctx, cx, cy, cw, ch, radius);
        ctx.strokeStyle = state.borderColor || '#ffffff';
        ctx.lineWidth = state.borderWidth * scale;
        ctx.stroke();
        ctx.restore();
      }
    }
  } else {
    // FREEFORM / CREATE YOUR OWN COLLAGE MODE
    const items = [...(state.freeformItems || [])].sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0));

    for (const item of items) {
      const ix = (item.x / 100) * targetWidth;
      const iy = (item.y / 100) * targetHeight;
      const iw = (item.w / 100) * targetWidth;
      const ih = (item.h / 100) * targetHeight;
      const rot = ((item.rot || 0) * Math.PI) / 180;

      ctx.save();
      ctx.translate(ix + iw / 2, iy + ih / 2);
      ctx.rotate(rot);

      // Shadow
      ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
      ctx.shadowBlur = 18 * scale;
      ctx.shadowOffsetX = 4 * scale;
      ctx.shadowOffsetY = 8 * scale;

      if (item.type === 'polaroid') {
        const cardW = iw;
        const cardH = ih;
        const photoPad = 12 * scale;
        const photoBottomPad = 48 * scale;

        // Draw Polaroid white card
        ctx.fillStyle = '#faf8f5';
        roundedRect(ctx, -cardW / 2, -cardH / 2, cardW, cardH, 6 * scale);
        ctx.fill();

        // Clear shadow for photo inside
        ctx.shadowColor = 'transparent';

        const photoW = cardW - photoPad * 2;
        const photoH = cardH - photoPad - photoBottomPad;
        const photoX = -cardW / 2 + photoPad;
        const photoY = -cardH / 2 + photoPad;

        ctx.save();
        roundedRect(ctx, photoX, photoY, photoW, photoH, 3 * scale);
        ctx.clip();

        const img = await loadImage(item.url);
        if (img) {
          if (filterCss !== 'none' && ctx.filter !== undefined) {
            ctx.filter = filterCss;
          }
          drawImageCover(ctx, img, photoX, photoY, photoW, photoH);
        } else {
          ctx.fillStyle = '#e8e4df';
          ctx.fillRect(photoX, photoY, photoW, photoH);
        }
        ctx.restore();

        // Polaroid handwritten caption
        if (item.caption) {
          ctx.fillStyle = '#222222';
          ctx.font = `700 ${18 * scale}px 'Caveat', cursive, sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(item.caption, 0, cardH / 2 - photoBottomPad / 2);
        }
      } else if (item.type === 'photo') {
        // Direct photo element
        const img = await loadImage(item.url);
        const radius = (item.radius || 12) * scale;

        ctx.save();
        roundedRect(ctx, -iw / 2, -ih / 2, iw, ih, radius);
        ctx.clip();

        if (img) {
          if (filterCss !== 'none' && ctx.filter !== undefined) {
            ctx.filter = filterCss;
          }
          drawImageCover(ctx, img, -iw / 2, -ih / 2, iw, ih);
        } else {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
          ctx.fillRect(-iw / 2, -ih / 2, iw, ih);
        }
        ctx.restore();

        // Border if any
        if (item.borderWidth) {
          ctx.shadowColor = 'transparent';
          roundedRect(ctx, -iw / 2, -ih / 2, iw, ih, radius);
          ctx.strokeStyle = item.borderColor || '#ffffff';
          ctx.lineWidth = item.borderWidth * scale;
          ctx.stroke();
        }
      } else if (item.type === 'sticker') {
        drawStickerOnCanvas(ctx, item, -iw / 2, -ih / 2, iw, ih, scale);
      }

      ctx.restore();
    }
  }

  // 3. Render Stickers
  if (state.stickers && state.stickers.length > 0) {
    for (const sticker of state.stickers) {
      const sx = (sticker.x / 100) * targetWidth;
      const sy = (sticker.y / 100) * targetHeight;
      const rot = ((sticker.rot || 0) * Math.PI) / 180;

      ctx.save();
      ctx.translate(sx, sy);
      ctx.rotate(rot);
      drawStickerOnCanvas(ctx, sticker, 0, 0, 180 * scale, 60 * scale, scale);
      ctx.restore();
    }
  }

  // 4. Render Text Overlays
  if (state.texts && state.texts.length > 0) {
    for (const textItem of state.texts) {
      const tx = (textItem.x / 100) * targetWidth;
      const ty = (textItem.y / 100) * targetHeight;
      const fontSize = (textItem.size || 24) * scale;
      const fontFam = textItem.font || 'Plus Jakarta Sans';

      ctx.save();
      ctx.font = `700 ${fontSize}px '${fontFam}', sans-serif`;
      ctx.textAlign = textItem.align || 'center';
      ctx.textBaseline = 'middle';

      const metrics = ctx.measureText(textItem.text);
      const textWidth = metrics.width;
      const textHeight = fontSize * 1.3;

      if (textItem.bgPill) {
        ctx.fillStyle = textItem.pillColor || 'rgba(0, 0, 0, 0.75)';
        const padX = 16 * scale;
        const padY = 8 * scale;
        const pillX = textItem.align === 'center' ? tx - textWidth / 2 - padX : tx - padX;
        const pillY = ty - textHeight / 2 - padY;
        const pillW = textWidth + padX * 2;
        const pillH = textHeight + padY * 2;
        roundedRect(ctx, pillX, pillY, pillW, pillH, 8 * scale);
        ctx.fill();
      }

      ctx.fillStyle = textItem.color || '#ffffff';
      if (textItem.shadow) {
        ctx.shadowColor = 'rgba(0,0,0,0.8)';
        ctx.shadowBlur = 10 * scale;
        ctx.shadowOffsetX = 2 * scale;
        ctx.shadowOffsetY = 3 * scale;
      }
      ctx.fillText(textItem.text, tx, ty);
      ctx.restore();
    }
  }

  return canvas;
}

/**
 * Draw custom Instagram & aesthetic stickers onto canvas
 */
function drawStickerOnCanvas(ctx, sticker, x, y, defaultW, defaultH, scale) {
  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,0.25)';
  ctx.shadowBlur = 8 * scale;

  if (sticker.type === 'location' || sticker.stickerType === 'location') {
    const text = sticker.text || '📍 Location';
    ctx.font = `600 ${14 * scale}px 'Plus Jakarta Sans', sans-serif`;
    const m = ctx.measureText(text);
    const w = m.width + 24 * scale;
    const h = 32 * scale;

    ctx.fillStyle = 'rgba(20, 20, 25, 0.85)';
    roundedRect(ctx, x, y, w, h, 16 * scale);
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1 * scale;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x + 12 * scale, y + h / 2);
  } else if (sticker.type === 'timestamp' || sticker.stickerType === 'timestamp') {
    const text = sticker.text || '’98 08 24';
    ctx.font = `700 ${22 * scale}px 'Courier New', monospace`;
    ctx.fillStyle = '#ff9800';
    ctx.shadowColor = 'rgba(255, 152, 0, 0.6)';
    ctx.shadowBlur = 6 * scale;
    ctx.fillText(text, x, y + 20 * scale);
  } else if (sticker.type === 'rec' || sticker.stickerType === 'rec') {
    const text = sticker.text || '● REC 00:14:28';
    ctx.font = `700 ${16 * scale}px 'Courier New', monospace`;
    ctx.fillStyle = '#ff3b30';
    ctx.fillText(text, x, y + 16 * scale);
  } else if (sticker.type === 'badge' || sticker.stickerType === 'badge') {
    // Instagram verified blue checkmark
    const r = 16 * scale;
    ctx.beginPath();
    ctx.arc(x + r, y + r, r, 0, Math.PI * 2);
    ctx.fillStyle = '#0095f6';
    ctx.fill();

    // White checkmark
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3 * scale;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(x + r - 6 * scale, y + r);
    ctx.lineTo(x + r - 1 * scale, y + r + 5 * scale);
    ctx.lineTo(x + r + 7 * scale, y + r - 4 * scale);
    ctx.stroke();
  } else if (sticker.type === 'emoji' || sticker.stickerType === 'emoji') {
    const emoji = sticker.emoji || '✨';
    ctx.font = `${36 * scale}px sans-serif`;
    ctx.fillText(emoji, x, y + 36 * scale);
  } else if (sticker.type === 'washi_tape' || sticker.stickerType === 'washi_tape') {
    const w = 90 * scale;
    const h = 28 * scale;
    ctx.fillStyle = sticker.color || 'rgba(255, 234, 167, 0.75)';
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = 'rgba(0,0,0,0.06)';
    ctx.strokeRect(x, y, w, h);
  } else if (sticker.type === 'music' || sticker.stickerType === 'music') {
    const track = sticker.trackName || 'Golden Hour';
    const artist = sticker.artist || 'JVKE';
    const w = 180 * scale;
    const h = 42 * scale;

    ctx.fillStyle = 'rgba(20, 20, 25, 0.88)';
    roundedRect(ctx, x, y, w, h, 21 * scale);
    ctx.fill();

    ctx.strokeStyle = 'rgba(255,255,255,0.18)';
    ctx.lineWidth = 1 * scale;
    ctx.stroke();

    // Music note icon
    ctx.font = `${16 * scale}px sans-serif`;
    ctx.fillStyle = '#ffffff';
    ctx.fillText('🎵', x + 12 * scale, y + 26 * scale);

    // Track & Artist text
    ctx.font = `700 ${12 * scale}px 'Plus Jakarta Sans', sans-serif`;
    ctx.fillText(track, x + 38 * scale, y + 18 * scale);
    ctx.font = `400 ${10 * scale}px 'Plus Jakarta Sans', sans-serif`;
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.fillText(artist, x + 38 * scale, y + 32 * scale);
  }

  ctx.restore();
}

/**
 * Trigger browser file download
 */
export function downloadCanvas(canvas, filename = 'instagram-collage.png', format = 'image/png', quality = 0.95) {
  const dataUrl = canvas.toDataURL(format, quality);
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Copy canvas directly to user clipboard
 */
export async function copyCanvasToClipboard(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(async (blob) => {
      if (!blob) {
        reject(new Error('Failed to create image blob'));
        return;
      }
      try {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        resolve(true);
      } catch (err) {
        // ClipboardItem write failed
        reject(err);
      }
    }, 'image/png');
  });
}
