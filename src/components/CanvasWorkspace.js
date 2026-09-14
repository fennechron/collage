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
  bgPattern,
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
  onUpdateText,
  stickers,
  onUpdateSticker,
  onRemoveSticker,
  onUploadPhoto
}) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const containerRef = useRef(null);
  const fileInputRef = useRef(null);
  const [dragOverCellIndex, setDragOverCellIndex] = useState(null);

  // Freeform drag interaction state
  const [draggingItemId, setDraggingItemId] = useState(null);
  const dragStartPos = useRef({ x: 0, y: 0, itemX: 0, itemY: 0 });

  // Determine background style
  const bgPreset = BACKGROUND_PRESETS.find((b) => b.id === background);
  let backgroundStyle = '#121417';
  if (customBgColor) {
    backgroundStyle = customBgColor;
  } else if (bgPreset) {
    backgroundStyle = bgPreset.css;
  }

  // Active filter CSS
  const activeFilterPreset = FILTER_PRESETS.find((f) => f.id === filter);
  const filterCss = activeFilterPreset ? activeFilterPreset.css : 'none';

  // Handle drag and drop photo directly onto cell
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

  // Freeform item mouse drag handling
  const handleFreeformMouseDown = (e, item) => {
    e.stopPropagation();
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
      setDraggingItemId(null);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <main className="studio-canvas-workspace" ref={containerRef}>
      {/* Hidden file input for cell swap */}
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

      {/* Center Artboard Area */}
      <div className="artboard-viewport" onClick={() => { setActiveCellIndex(null); setSelectedItemId(null); }}>
        <div
          id="collage-artboard"
          className={`collage-artboard aspect-${aspectRatio.replace(':', '-')}`}
          style={{
            transform: `scale(${zoomLevel})`,
            background: backgroundStyle,
            padding: `${padding}px`
          }}
        >
          {/* Subtle Background Texture Pattern */}
          {bgPattern === 'dots' && <div className="artboard-texture-dots" />}
          {bgPattern === 'grid' && <div className="artboard-texture-grid" />}

          {/* ================= MODE: GRID ================= */}
          {mode === 'grid' && (
            <div className="grid-layout-container">
              {currentTemplate?.cells.map((cell, idx) => {
                const photoUrl = photos[idx];
                const adjust = cellAdjustments[idx] || {};
                const isSelected = activeCellIndex === idx;
                const isDragOver = dragOverCellIndex === idx;

                return (
                  <div
                    key={idx}
                    className={`grid-cell-wrapper ${isSelected ? 'selected' : ''} ${isDragOver ? 'drag-over' : ''}`}
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
                      <div className="cell-image-holder">
                        <img
                          src={photoUrl}
                          alt={`Slot ${idx + 1}`}
                          className="cell-image"
                          style={{
                            filter: filterCss,
                            transform: `scale(${adjust.zoom || 1}) translate(${adjust.panX || 0}%, ${adjust.panY || 0}%) rotate(${adjust.rotate || 0}deg) ${adjust.flipH ? 'scaleX(-1)' : ''}`,
                            borderRadius: `${Math.max(0, radius - borderWidth)}px`
                          }}
                        />
                      </div>
                    ) : (
                      <div
                        className="cell-empty-placeholder"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveCellIndex(idx);
                          fileInputRef.current?.click();
                        }}
                      >
                        <Upload size={20} className="placeholder-icon" />
                        <span className="placeholder-text">Click to Add Photo</span>
                        <span className="placeholder-sub">or drop image here</span>
                      </div>
                    )}

                    {/* Active Cell Floating Toolbar */}
                    {isSelected && photoUrl && (
                      <div className="cell-floating-toolbar" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          className="cell-tool-btn"
                          title="Replace Photo"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Upload size={13} />
                        </button>
                        <button
                          type="button"
                          className="cell-tool-btn"
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
                          className="cell-tool-btn"
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
                          className="cell-tool-btn delete"
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

          {/* ================= MODE: FREEFORM / CREATE YOUR OWN ================= */}
          {mode === 'freeform' && (
            <div className="freeform-layer-container">
              {freeformItems.map((item) => {
                const isSelected = selectedItemId === item.id;
                const isDragging = draggingItemId === item.id;

                return (
                  <div
                    key={item.id}
                    className={`freeform-item ${item.type} ${isSelected ? 'selected' : ''} ${isDragging ? 'dragging' : ''}`}
                    style={{
                      left: `${item.x}%`,
                      top: `${item.y}%`,
                      width: `${item.w}%`,
                      transform: `rotate(${item.rot || 0}deg)`,
                      zIndex: item.zIndex || 1
                    }}
                    onMouseDown={(e) => handleFreeformMouseDown(e, item)}
                  >
                    {item.type === 'polaroid' && (
                      <div className="polaroid-card">
                        <div className="polaroid-photo-frame">
                          <img
                            src={item.url}
                            alt="polaroid"
                            style={{ filter: filterCss }}
                          />
                        </div>
                        <input
                          type="text"
                          className="polaroid-caption-input"
                          value={item.caption || ''}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) =>
                            onUpdateFreeformItem(item.id, { caption: e.target.value })
                          }
                          placeholder="Write caption..."
                        />
                      </div>
                    )}

                    {item.type === 'photo' && (
                      <div
                        className="framed-photo-box"
                        style={{
                          borderRadius: `${item.radius || 12}px`,
                          border: `${item.borderWidth || 2}px solid ${item.borderColor || '#ffffff'}`
                        }}
                      >
                        <img
                          src={item.url}
                          alt="framed"
                          style={{
                            filter: filterCss,
                            borderRadius: `${Math.max(0, (item.radius || 12) - (item.borderWidth || 2))}px`
                          }}
                        />
                      </div>
                    )}

                    {/* Selection Handles */}
                    {isSelected && (
                      <div className="item-selection-box" onClick={(e) => e.stopPropagation()}>
                        <div className="selection-handle top-left" />
                        <div className="selection-handle top-right" />
                        <div className="selection-handle bottom-left" />
                        <div className="selection-handle bottom-right" />
                        <button
                          type="button"
                          className="selection-delete-btn"
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
          )}

          {/* ================= TEXT OVERLAYS ================= */}
          {texts.map((t) => (
            <div
              key={t.id}
              className={`artboard-text-layer ${t.bgPill ? 'has-pill' : ''}`}
              style={{
                left: `${t.x}%`,
                top: `${t.y}%`,
                transform: 'translate(-50%, -50%)',
                fontFamily: `'${t.font}', sans-serif`,
                fontSize: `${t.size}px`,
                color: t.color,
                backgroundColor: t.bgPill ? (t.pillColor || 'rgba(0,0,0,0.7)') : 'transparent',
                textAlign: t.align || 'center'
              }}
            >
              {t.text}
            </div>
          ))}

          {/* ================= STICKER OVERLAYS ================= */}
          {stickers.map((st) => (
            <div
              key={st.id}
              className="artboard-sticker-layer"
              style={{
                left: `${st.x}%`,
                top: `${st.y}%`,
                transform: `rotate(${st.rot || 0}deg)`
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {st.type === 'location' && (
                <div className="sticker-location-pill">{st.text}</div>
              )}
              {st.type === 'timestamp' && (
                <div className="sticker-timestamp">{st.text}</div>
              )}
              {st.type === 'rec' && (
                <div className="sticker-rec-tag">{st.text}</div>
              )}
              {st.type === 'badge' && (
                <div className="sticker-verified-badge">
                  <Check size={14} color="#ffffff" strokeWidth={3} />
                </div>
              )}
              {st.type === 'music' && (
                <div className="sticker-music-card">
                  <span className="music-note">🎵</span>
                  <div className="music-info">
                    <span className="track">{st.trackName}</span>
                    <span className="artist">{st.artist}</span>
                  </div>
                  <div className="music-bars">
                    <span className="bar b1" />
                    <span className="bar b2" />
                    <span className="bar b3" />
                  </div>
                </div>
              )}
              {st.type === 'emoji' && (
                <div className="sticker-emoji-display">{st.emoji}</div>
              )}
              {st.type === 'washi_tape' && (
                <div className="sticker-washi-tape" style={{ background: st.color }} />
              )}
              <button
                type="button"
                className="sticker-remove-btn"
                onClick={() => onRemoveSticker(st.id)}
                title="Remove sticker"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Zoom & View Toolbar */}
      <div className="artboard-bottom-bar">
        <div className="artboard-info-tag">
          <span>{aspectRatio}</span>
          <span className="dot">•</span>
          <span>{mode === 'grid' ? currentTemplate?.name : 'Freeform Canvas'}</span>
        </div>

        <div className="zoom-controls-wrapper">
          <button
            type="button"
            className="zoom-btn"
            onClick={() => setZoomLevel(Math.max(0.4, zoomLevel - 0.1))}
            title="Zoom Out"
          >
            <ZoomOut size={15} />
          </button>
          <span className="zoom-label">{Math.round(zoomLevel * 100)}%</span>
          <button
            type="button"
            className="zoom-btn"
            onClick={() => setZoomLevel(Math.min(1.6, zoomLevel + 0.1))}
            title="Zoom In"
          >
            <ZoomIn size={15} />
          </button>
          <button
            type="button"
            className="zoom-btn reset"
            onClick={() => setZoomLevel(1)}
            title="Fit / Reset Zoom"
          >
            <Maximize2 size={15} />
          </button>
        </div>
      </div>
    </main>
  );
}
