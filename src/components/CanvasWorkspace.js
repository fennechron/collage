import React, { useRef, useState } from 'react';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  RotateCw,
  FlipHorizontal,
  Trash2,
  Upload,
  Check
} from 'lucide-react';
import { BACKGROUND_PRESETS, FILTER_PRESETS } from '../types/collage';

export default function CanvasWorkspace({
  mode,
  aspectRatio,
  currentTemplate,
  photos,
  cellAdjustments,
  onUpdateCellAdjustment,
  onCellPhotoChange,
  onClearCellPhoto,
  activeCellIndex,
  setActiveCellIndex,
  background,
  customBgColor,
  gap,
  padding,
  radius,
  borderWidth,
  borderColor,
  filter,
  freeformItems,
  onUpdateFreeformItem,
  selectedItemId,
  setSelectedItemId,
  onRemoveFreeformItem,
  texts,
  stickers,
  onRemoveSticker,
  setIsInteracting
}) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const containerRef = useRef(null);
  const fileInputRef = useRef(null);
  const [dragOverCellIndex, setDragOverCellIndex] = useState(null);

  // Freeform dragging state
  const [draggingItemId, setDraggingItemId] = useState(null);
  const dragStartPos = useRef({ x: 0, y: 0, itemX: 0, itemY: 0 });

  // Determine background style
  const bgPreset = BACKGROUND_PRESETS.find((b) => b.id === background);
  let backgroundStyle = '#121418';
  if (customBgColor) {
    backgroundStyle = customBgColor;
  } else if (bgPreset) {
    backgroundStyle = bgPreset.css;
  }

  // Active filter CSS
  const activeFilterPreset = FILTER_PRESETS.find((f) => f.id === filter);
  const filterCss = activeFilterPreset ? activeFilterPreset.css : 'none';

  // Handle drop file directly on cell
  const handleDropOnCell = (e, index) => {
    e.preventDefault();
    setDragOverCellIndex(null);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        onCellPhotoChange(index, event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Freeform dragging interaction
  const handleFreeformMouseDown = (e, item) => {
    e.stopPropagation();
    setIsInteracting(true);
    setSelectedItemId(item.id);
    setDraggingItemId(item.id);
    dragStartPos.current = {
      x: e.clientX,
      y: e.clientY,
      itemX: item.x,
      itemY: item.y
    };

    const handleMouseMove = (moveEvent) => {
      const artboard = document.getElementById('collage-artboard');
      if (!artboard) return;
      const rect = artboard.getBoundingClientRect();
      const deltaXPercent = ((moveEvent.clientX - dragStartPos.current.x) / rect.width) * 100;
      const deltaYPercent = ((moveEvent.clientY - dragStartPos.current.y) / rect.height) * 100;

      const newX = Math.max(0, Math.min(85, dragStartPos.current.itemX + deltaXPercent));
      const newY = Math.max(0, Math.min(85, dragStartPos.current.itemY + deltaYPercent));

      onUpdateFreeformItem(item.id, { x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsInteracting(false);
      setDraggingItemId(null);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleResizeMouseDown = (e, item, corner) => {
    e.stopPropagation();
    e.preventDefault();
    setIsInteracting(true);
    setDraggingItemId(item.id);

    const startX = e.clientX;
    const startY = e.clientY;
    const startW = item.w || 40;
    const startH = item.h || startW;
    const startItemX = item.x;
    const startItemY = item.y || 20;
    
    const artboard = document.getElementById('collage-artboard');
    if (!artboard) return;
    const rect = artboard.getBoundingClientRect();

    const handleMouseMove = (moveEvent) => {
      // Consider zoom level for accurate resize tracking
      const deltaX = (moveEvent.clientX - startX) / zoomLevel;
      const deltaY = (moveEvent.clientY - startY) / zoomLevel;
      
      const deltaXPercent = (deltaX / rect.width) * 100;
      const deltaYPercent = (deltaY / rect.height) * 100;
      
      let newW = startW;
      let newH = startH;
      let newX = startItemX;
      let newY = startItemY;
      
      if (['ne', 'se', 'e'].includes(corner)) {
         newW = startW + deltaXPercent;
      } else if (['nw', 'sw', 'w'].includes(corner)) {
         newW = startW - deltaXPercent;
         newX = startItemX + deltaXPercent;
      }

      if (['sw', 'se', 's'].includes(corner)) {
         newH = startH + deltaYPercent;
      } else if (['nw', 'ne', 'n'].includes(corner)) {
         newH = startH - deltaYPercent;
         newY = startItemY + deltaYPercent;
      }
      
      if (newW < 10) {
         if (['nw', 'sw', 'w'].includes(corner)) newX = startItemX + (startW - 10);
         newW = 10;
      }
      if (newW > 150) {
         if (['nw', 'sw', 'w'].includes(corner)) newX = startItemX - (150 - startW);
         newW = 150;
      }

      if (newH < 10) {
         if (['nw', 'ne', 'n'].includes(corner)) newY = startItemY + (startH - 10);
         newH = 10;
      }
      if (newH > 150) {
         if (['nw', 'ne', 'n'].includes(corner)) newY = startItemY - (150 - startH);
         newH = 150;
      }

      onUpdateFreeformItem(item.id, { w: newW, h: newH, x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsInteracting(false);
      setDraggingItemId(null);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <main className="pro-workspace" ref={containerRef}>
      {/* Hidden file input for quick image change */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => {
          if (e.target.files && e.target.files[0] && activeCellIndex !== null) {
            const reader = new FileReader();
            reader.onload = (ev) => {
              onCellPhotoChange(activeCellIndex, ev.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
          }
        }}
      />

      {/* Center Viewport */}
      <div
        className="artboard-stage"
        onClick={() => {
          setActiveCellIndex(null);
          setSelectedItemId(null);
        }}
      >
        <div
          id="collage-artboard"
          className={`artboard-frame aspect-${aspectRatio.replace(':', '-')}`}
          style={{
            transform: `scale(${zoomLevel})`,
            background: backgroundStyle,
            padding: `${padding}px`
          }}
        >
          {/* ================= MODE: GRID ================= */}
          {mode === 'grid' && (
            <div className="grid-cells-container">
              {currentTemplate?.cells.map((cell, idx) => {
                const photoUrl = photos[idx];
                const adjust = cellAdjustments[idx] || {};
                const isSelected = activeCellIndex === idx;
                const isDragOver = dragOverCellIndex === idx;

                return (
                  <div
                    key={idx}
                    className={`grid-cell ${isSelected ? 'selected' : ''} ${isDragOver ? 'drag-over' : ''}`}
                    style={{
                      left: `calc(${cell.x}% + ${gap / 2}px)`,
                      top: `calc(${cell.y}% + ${gap / 2}px)`,
                      width: `calc(${cell.w}% - ${gap}px)`,
                      height: `calc(${cell.h}% - ${gap}px)`,
                      borderRadius: `${radius}px`,
                      border: borderWidth > 0 ? `${borderWidth}px solid ${borderColor}` : 'none'
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveCellIndex(idx);
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOverCellIndex(idx);
                    }}
                    onDragLeave={() => setDragOverCellIndex(null)}
                    onDrop={(e) => handleDropOnCell(e, idx)}
                  >
                    {photoUrl ? (
                      <div className="cell-photo-wrapper">
                        <img
                          src={photoUrl}
                          alt={`Slot ${idx + 1}`}
                          className="cell-photo-element"
                          draggable={false}
                          style={{
                            filter: filterCss,
                            transform: `scale(${adjust.zoom || 1}) translate(${adjust.panX || 0}%, ${adjust.panY || 0}%) rotate(${adjust.rotate || 0}deg) ${adjust.flipH ? 'scaleX(-1)' : ''}`,
                            borderRadius: `${Math.max(0, radius - borderWidth)}px`
                          }}
                        />
                      </div>
                    ) : (
                      <div
                        className="cell-placeholder"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveCellIndex(idx);
                          fileInputRef.current?.click();
                        }}
                      >
                        <Upload size={18} className="placeholder-icon" />
                        <span className="placeholder-label">Add Photo</span>
                      </div>
                    )}

                    {/* Floating Contextual Toolbar for Active Cell */}
                    {isSelected && photoUrl && (
                      <div className="floating-cell-toolbar" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          className="cell-tool-action"
                          title="Replace Photo"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Upload size={13} />
                        </button>
                        <button
                          type="button"
                          className="cell-tool-action"
                          title="Rotate 90°"
                          onClick={() =>
                            onUpdateCellAdjustment(idx, {
                              rotate: ((adjust.rotate || 0) + 90) % 360
                            })
                          }
                        >
                          <RotateCw size={13} />
                        </button>
                        <button
                          type="button"
                          className="cell-tool-action"
                          title="Flip Horizontal"
                          onClick={() =>
                            onUpdateCellAdjustment(idx, {
                              flipH: !adjust.flipH
                            })
                          }
                        >
                          <FlipHorizontal size={13} />
                        </button>
                        <button
                          type="button"
                          className="cell-tool-action danger"
                          title="Remove Photo"
                          onClick={() => onClearCellPhoto(idx)}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* ================= FREEFORM SCRAPBOOK LAYERS ================= */}
          <div className="freeform-canvas-container">
            {freeformItems.map((item) => {
                const isSelected = selectedItemId === item.id;
                const isDragging = draggingItemId === item.id;

                return (
                  <div
                    key={item.id}
                    className={`freeform-layer ${item.type} ${isSelected ? 'selected' : ''} ${isDragging ? 'dragging' : ''}`}
                    style={{
                      left: `${item.x}%`,
                      top: `${item.y}%`,
                      width: `${item.w}%`,
                      height: `${item.h || item.w}%`,
                      transform: `rotate(${item.rot || 0}deg)`,
                      zIndex: item.zIndex || 1
                    }}
                    onMouseDown={(e) => handleFreeformMouseDown(e, item)}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {item.type === 'polaroid' && (
                      <div className="pro-polaroid-card">
                        <div className="polaroid-image-frame">
                          <img
                            src={item.url}
                            alt="polaroid"
                            draggable={false}
                            style={{ filter: filterCss }}
                          />
                        </div>
                        <input
                          type="text"
                          className="polaroid-caption-edit"
                          value={item.caption || ''}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) =>
                            onUpdateFreeformItem(item.id, { caption: e.target.value })
                          }
                          placeholder="Add caption..."
                        />
                      </div>
                    )}

                    {item.type === 'photo' && (
                      <div
                        className="pro-framed-photo"
                        style={{
                          borderRadius: `${item.radius || 8}px`,
                          border: `${item.borderWidth || 2}px solid ${item.borderColor || '#ffffff'}`
                        }}
                      >
                        <img
                          src={item.url}
                          alt="framed"
                          draggable={false}
                          style={{
                            filter: filterCss,
                            borderRadius: `${Math.max(0, (item.radius || 8) - (item.borderWidth || 2))}px`
                          }}
                        />
                      </div>
                    )}

                    {/* Figma/Canva Style Selection Bounding Box */}
                    {isSelected && (
                      <div className="pro-selection-bounding" onClick={(e) => e.stopPropagation()}>
                        <div className="selection-handle-node nw" onMouseDown={(e) => handleResizeMouseDown(e, item, 'nw')} />
                        <div className="selection-handle-node ne" onMouseDown={(e) => handleResizeMouseDown(e, item, 'ne')} />
                        <div className="selection-handle-node sw" onMouseDown={(e) => handleResizeMouseDown(e, item, 'sw')} />
                        <div className="selection-handle-node se" onMouseDown={(e) => handleResizeMouseDown(e, item, 'se')} />
                        <div className="selection-handle-node n" onMouseDown={(e) => handleResizeMouseDown(e, item, 'n')} />
                        <div className="selection-handle-node s" onMouseDown={(e) => handleResizeMouseDown(e, item, 's')} />
                        <div className="selection-handle-node e" onMouseDown={(e) => handleResizeMouseDown(e, item, 'e')} />
                        <div className="selection-handle-node w" onMouseDown={(e) => handleResizeMouseDown(e, item, 'w')} />
                        <button
                          type="button"
                          className="selection-delete-icon"
                          onClick={() => onRemoveFreeformItem(item.id)}
                          title="Delete Element"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          {/* ================= TEXT OVERLAYS ================= */}
          {texts.map((t) => (
            <div
              key={t.id}
              className={`pro-text-overlay ${t.bgPill ? 'with-pill' : ''}`}
              style={{
                left: `${t.x}%`,
                top: `${t.y}%`,
                transform: 'translate(-50%, -50%)',
                fontFamily: `'${t.font}', sans-serif`,
                fontSize: `${t.size}px`,
                color: t.color,
                backgroundColor: t.bgPill ? (t.pillColor || 'rgba(18, 20, 24, 0.85)') : 'transparent',
                textAlign: t.align || 'center'
              }}
            >
              {t.text}
            </div>
          ))}

          {/* ================= BADGES & STICKER OVERLAYS ================= */}
          {stickers.map((st) => (
            <div
              key={st.id}
              className="pro-badge-overlay"
              style={{
                left: `${st.x}%`,
                top: `${st.y}%`,
                transform: `rotate(${st.rot || 0}deg)`
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {st.type === 'location' && (
                <div className="pro-location-tag">
                  <span className="dot-pin" />
                  <span>{st.text}</span>
                </div>
              )}
              {st.type === 'timestamp' && (
                <div className="pro-date-tag">{st.text}</div>
              )}
              {st.type === 'rec' && (
                <div className="pro-rec-tag">
                  <span className="rec-dot" />
                  <span>{st.text}</span>
                </div>
              )}
              {st.type === 'badge' && (
                <div className="pro-verified-circle">
                  <Check size={13} color="#ffffff" strokeWidth={3} />
                </div>
              )}
              {st.type === 'music' && (
                <div className="pro-music-pill">
                  <span className="music-icon">🎵</span>
                  <div className="music-details">
                    <span className="music-track">{st.trackName}</span>
                    <span className="music-artist">{st.artist}</span>
                  </div>
                </div>
              )}
              {st.type === 'washi_tape' && (
                <div className="pro-washi-tape" style={{ background: st.color }} />
              )}
              <button
                type="button"
                className="badge-remove-btn"
                onClick={() => onRemoveSticker(st.id)}
                title="Remove"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Bottom View Toolbar */}
      <div className="floating-canvas-toolbar">
        <div className="toolbar-info">
          <span className="canvas-aspect-badge">{aspectRatio}</span>
          <span className="canvas-mode-badge">{mode === 'grid' ? currentTemplate?.name : 'Scrapbook'}</span>
        </div>

        <div className="toolbar-divider" />

        <div className="zoom-controls">
          <button
            type="button"
            className="zoom-tool-btn"
            onClick={() => setZoomLevel(Math.max(0.4, zoomLevel - 0.1))}
            title="Zoom Out"
          >
            <ZoomOut size={14} />
          </button>
          <span className="zoom-value">{Math.round(zoomLevel * 100)}%</span>
          <button
            type="button"
            className="zoom-tool-btn"
            onClick={() => setZoomLevel(Math.min(1.6, zoomLevel + 0.1))}
            title="Zoom In"
          >
            <ZoomIn size={14} />
          </button>
          <button
            type="button"
            className="zoom-tool-btn reset"
            onClick={() => setZoomLevel(1)}
            title="Fit to Screen"
          >
            <Maximize2 size={13} />
          </button>
        </div>
      </div>
    </main>
  );
}
