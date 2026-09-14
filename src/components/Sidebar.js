import React, { useState } from 'react';
import {
  LayoutGrid,
  Layers,
  Palette,
  Sliders,
  Type,
  Bookmark,
  Image as ImageIcon,
  Upload,
  Plus,
  Trash2,
  Copy,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import {
  GRID_TEMPLATES,
  BACKGROUND_PRESETS,
  FILTER_PRESETS,
  STICKER_PRESETS,
  FONT_PRESETS,
  CURATED_PHOTOS
} from '../types/collage';

export default function Sidebar({
  activeTab,
  setActiveTab,
  mode,
  setMode,
  currentTemplate,
  onSelectTemplate,
  background,
  setBackground,
  customBgColor,
  setCustomBgColor,
  gap,
  setGap,
  padding,
  setPadding,
  radius,
  setRadius,
  borderWidth,
  setBorderWidth,
  borderColor,
  setBorderColor,
  filter,
  setFilter,
  freeformItems,
  onAddFreeformItem,
  onUpdateFreeformItem,
  onRemoveFreeformItem,
  onDuplicateFreeformItem,
  onReorderFreeformItem,
  selectedItemId,
  setSelectedItemId,
  texts,
  onAddText,
  onUpdateText,
  onRemoveText,
  stickers,
  onAddSticker,
  onRemoveSticker,
  onApplyPhotoToSelected,
  onUploadPhoto
}) {
  const [templateCategory, setTemplateCategory] = useState('All');
  const [photoCategory, setPhotoCategory] = useState('All');

  const categories = ['All', '2 Photos', '3 Photos', '4 Photos', 'Filmstrip', 'Moodboard'];
  const photoCategories = ['All', 'Travel & Architecture', 'Editorial & Portrait', 'Lifestyle & Coffee', '35mm Film & Vintage'];

  const filteredTemplates = templateCategory === 'All'
    ? GRID_TEMPLATES
    : GRID_TEMPLATES.filter((t) => t.category === templateCategory);

  const filteredPhotos = photoCategory === 'All'
    ? CURATED_PHOTOS
    : CURATED_PHOTOS.filter((p) => p.category === photoCategory);

  const selectedItem = freeformItems.find((item) => item.id === selectedItemId);

  return (
    <aside className="pro-sidebar">
      {/* 60px Primary Icon Rail */}
      <nav className="sidebar-rail">
        <button
          type="button"
          className={`rail-btn ${activeTab === 'templates' ? 'active' : ''}`}
          onClick={() => setActiveTab('templates')}
          title="Grid Layouts"
        >
          <LayoutGrid size={18} />
          <span>Layouts</span>
        </button>

        <button
          type="button"
          className={`rail-btn ${activeTab === 'freeform' ? 'active' : ''}`}
          onClick={() => setActiveTab('freeform')}
          title="Freeform Scrapbook Layers"
        >
          <Layers size={18} />
          <span>Layers</span>
        </button>

        <button
          type="button"
          className={`rail-btn ${activeTab === 'canvas' ? 'active' : ''}`}
          onClick={() => setActiveTab('canvas')}
          title="Canvas Spacing & Background"
        >
          <Palette size={18} />
          <span>Canvas</span>
        </button>

        <button
          type="button"
          className={`rail-btn ${activeTab === 'filters' ? 'active' : ''}`}
          onClick={() => setActiveTab('filters')}
          title="Film Stocks & Color Grades"
        >
          <Sliders size={18} />
          <span>Grading</span>
        </button>

        <button
          type="button"
          className={`rail-btn ${activeTab === 'text' ? 'active' : ''}`}
          onClick={() => setActiveTab('text')}
          title="Editorial Typography"
        >
          <Type size={18} />
          <span>Type</span>
        </button>

        <button
          type="button"
          className={`rail-btn ${activeTab === 'stickers' ? 'active' : ''}`}
          onClick={() => setActiveTab('stickers')}
          title="Badges & Details"
        >
          <Bookmark size={18} />
          <span>Details</span>
        </button>

        <button
          type="button"
          className={`rail-btn ${activeTab === 'photos' ? 'active' : ''}`}
          onClick={() => setActiveTab('photos')}
          title="Curated Imagery & Uploads"
        >
          <ImageIcon size={18} />
          <span>Assets</span>
        </button>
      </nav>

      {/* 320px Drawer Panel */}
      <div className="sidebar-drawer">
        {/* ================= TAB 1: LAYOUT TEMPLATES ================= */}
        {activeTab === 'templates' && (
          <div className="drawer-panel">
            <div className="drawer-header">
              <h3>Grid Layouts</h3>
              <p>Curated compositional frameworks for Instagram</p>
            </div>

            {/* Category Filter Pills */}
            <div className="category-pill-row">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`cat-pill ${templateCategory === cat ? 'active' : ''}`}
                  onClick={() => setTemplateCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Layout Cards */}
            <div className="layouts-grid">
              {filteredTemplates.map((tpl) => {
                const isSelected = mode === 'grid' && currentTemplate?.id === tpl.id;
                return (
                  <button
                    key={tpl.id}
                    type="button"
                    className={`layout-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => {
                      if (mode !== 'grid') setMode('grid');
                      onSelectTemplate(tpl);
                    }}
                  >
                    <div className="layout-card-canvas">
                      {tpl.cells.map((cell, idx) => (
                        <div
                          key={idx}
                          className="layout-cell-preview"
                          style={{
                            left: `${cell.x}%`,
                            top: `${cell.y}%`,
                            width: `${cell.w}%`,
                            height: `${cell.h}%`
                          }}
                        />
                      ))}
                    </div>
                    <div className="layout-card-info">
                      <span className="layout-name">{tpl.name}</span>
                      <span className="layout-slots">{tpl.photosCount} photos</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= TAB 2: FREEFORM LAYERS ================= */}
        {activeTab === 'freeform' && (
          <div className="drawer-panel">
            <div className="drawer-header">
              <h3>Freeform Scrapbook</h3>
              <p>Custom collage: arrange, rotate, and style elements freely</p>
            </div>

            {/* Element Add Buttons */}
            <div className="add-elements-row">
              <button
                type="button"
                className="btn-add-element polaroid-btn"
                onClick={() =>
                  onAddFreeformItem({
                    type: 'polaroid',
                    url: CURATED_PHOTOS[Math.floor(Math.random() * CURATED_PHOTOS.length)].full,
                    caption: 'polaroid memory',
                    x: 20 + Math.random() * 20,
                    y: 20 + Math.random() * 20,
                    w: 46,
                    h: 56,
                    rot: (Math.random() - 0.5) * 14,
                    zIndex: freeformItems.length + 1
                  })
                }
              >
                <Plus size={14} />
                <span>Polaroid Print</span>
              </button>

              <button
                type="button"
                className="btn-add-element framed-btn"
                onClick={() =>
                  onAddFreeformItem({
                    type: 'photo',
                    url: CURATED_PHOTOS[Math.floor(Math.random() * CURATED_PHOTOS.length)].full,
                    x: 25 + Math.random() * 20,
                    y: 25 + Math.random() * 20,
                    w: 42,
                    h: 52,
                    radius: 8,
                    borderWidth: 2,
                    borderColor: '#ffffff',
                    rot: (Math.random() - 0.5) * 8,
                    zIndex: freeformItems.length + 1
                  })
                }
              >
                <Plus size={14} />
                <span>Framed Photo</span>
              </button>
            </div>

            {/* Selected Element Controls */}
            {selectedItem && (
              <div className="inspector-panel">
                <div className="inspector-header">Selected Element</div>

                {selectedItem.type === 'polaroid' && (
                  <div className="field-group">
                    <label>Caption Text</label>
                    <input
                      type="text"
                      className="pro-input"
                      value={selectedItem.caption || ''}
                      onChange={(e) => onUpdateFreeformItem(selectedItem.id, { caption: e.target.value })}
                      placeholder="Write a caption..."
                    />
                  </div>
                )}

                <div className="slider-group">
                  <div className="slider-label-row">
                    <span>Rotation</span>
                    <span className="slider-numeric">{Math.round(selectedItem.rot || 0)}°</span>
                  </div>
                  <input
                    type="range"
                    min="-45"
                    max="45"
                    value={selectedItem.rot || 0}
                    onChange={(e) => onUpdateFreeformItem(selectedItem.id, { rot: parseFloat(e.target.value) })}
                  />
                </div>

                <div className="slider-group">
                  <div className="slider-label-row">
                    <span>Scale</span>
                    <span className="slider-numeric">{Math.round(selectedItem.w || 40)}%</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button type="button" className="layer-tool-btn" style={{ padding: '2px 8px' }} onClick={() => onUpdateFreeformItem(selectedItem.id, { w: Math.max(20, (selectedItem.w || 40) - 1) })}>-</button>
                    <input
                      type="range"
                      min="20"
                      max="90"
                      value={selectedItem.w || 40}
                      onChange={(e) => onUpdateFreeformItem(selectedItem.id, { w: parseFloat(e.target.value) })}
                      style={{ flex: 1 }}
                    />
                    <button type="button" className="layer-tool-btn" style={{ padding: '2px 8px' }} onClick={() => onUpdateFreeformItem(selectedItem.id, { w: Math.min(90, (selectedItem.w || 40) + 1) })}>+</button>
                  </div>
                </div>

                {selectedItem.type === 'photo' && (
                  <div className="slider-group">
                    <div className="slider-label-row">
                      <span>Border Radius</span>
                      <span className="slider-numeric">{selectedItem.radius || 0} px</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button type="button" className="layer-tool-btn" style={{ padding: '2px 8px' }} onClick={() => onUpdateFreeformItem(selectedItem.id, { radius: Math.max(0, (selectedItem.radius || 0) - 1) })}>-</button>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={selectedItem.radius || 0}
                        onChange={(e) => onUpdateFreeformItem(selectedItem.id, { radius: parseInt(e.target.value, 10) })}
                        style={{ flex: 1 }}
                      />
                      <button type="button" className="layer-tool-btn" style={{ padding: '2px 8px' }} onClick={() => onUpdateFreeformItem(selectedItem.id, { radius: Math.min(100, (selectedItem.radius || 0) + 1) })}>+</button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Layer Stack */}
            <div className="layer-stack-wrapper">
              <div className="drawer-subhead">Layers ({freeformItems.length})</div>
              {freeformItems.length === 0 ? (
                <div className="empty-state-notice">
                  Canvas is empty. Click "+ Polaroid Print" or "+ Framed Photo" above to start building your custom collage.
                </div>
              ) : (
                <div className="layer-cards-list">
                  {freeformItems.map((item, idx) => {
                    const isSelected = selectedItemId === item.id;
                    return (
                      <div
                        key={item.id}
                        className={`layer-row ${isSelected ? 'selected' : ''}`}
                        onClick={() => setSelectedItemId(item.id)}
                      >
                        <div className="layer-preview-thumb">
                          {item.url && <img src={item.url} alt="layer thumbnail" />}
                        </div>
                        <div className="layer-details">
                          <span className="layer-name">
                            {item.type === 'polaroid' ? `Polaroid: "${item.caption || 'Print'}"` : 'Framed Photo'}
                          </span>
                          <span className="layer-meta">Layer #{idx + 1}</span>
                        </div>
                        <div className="layer-action-tools">
                          <button
                            type="button"
                            className="layer-tool-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              onReorderFreeformItem(item.id, 'up');
                            }}
                            title="Bring Forward"
                          >
                            <ChevronUp size={13} />
                          </button>
                          <button
                            type="button"
                            className="layer-tool-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              onReorderFreeformItem(item.id, 'down');
                            }}
                            title="Send Backward"
                          >
                            <ChevronDown size={13} />
                          </button>
                          <button
                            type="button"
                            className="layer-tool-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDuplicateFreeformItem(item.id);
                            }}
                            title="Duplicate"
                          >
                            <Copy size={13} />
                          </button>
                          <button
                            type="button"
                            className="layer-tool-btn delete"
                            onClick={(e) => {
                              e.stopPropagation();
                              onRemoveFreeformItem(item.id);
                            }}
                            title="Delete"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 3: CANVAS & STYLING ================= */}
        {activeTab === 'canvas' && (
          <div className="drawer-panel">
            <div className="drawer-header">
              <h3>Canvas & Background</h3>
              <p>Configure backdrop tones, margins, and border geometry</p>
            </div>

            {/* Background Palette */}
            <div className="drawer-subhead">Backdrop Palette</div>
            <div className="backdrop-grid">
              {BACKGROUND_PRESETS.map((preset) => {
                const isSelected = background === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    className={`backdrop-chip ${isSelected ? 'selected' : ''}`}
                    onClick={() => {
                      setBackground(preset.id);
                      setCustomBgColor('');
                    }}
                  >
                    <span
                      className="swatch-indicator"
                      style={{
                        background: preset.css.startsWith('#') || preset.css.startsWith('linear') ? preset.css : '#161920'
                      }}
                    />
                    <span className="swatch-label">{preset.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Custom Color Input */}
            <div className="field-group custom-color-row">
              <label>Custom Hex Color</label>
              <div className="color-picker-box">
                <input
                  type="color"
                  value={customBgColor || '#121418'}
                  onChange={(e) => {
                    setCustomBgColor(e.target.value);
                    setBackground('custom');
                  }}
                />
                <input
                  type="text"
                  className="pro-input mono"
                  value={customBgColor || ''}
                  placeholder="#121418"
                  onChange={(e) => {
                    setCustomBgColor(e.target.value);
                    setBackground('custom');
                  }}
                />
              </div>
            </div>

            {/* Grid Layout Dimensions */}
            {mode === 'grid' && (
              <div className="geometry-controls-section">
                <div className="drawer-subhead">Layout Geometry</div>

                <div className="slider-group">
                  <div className="slider-label-row">
                    <span>Cell Spacing (Gap)</span>
                    <span className="slider-numeric">{gap} px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="32"
                    value={gap}
                    onChange={(e) => setGap(parseInt(e.target.value, 10))}
                  />
                </div>

                <div className="slider-group">
                  <div className="slider-label-row">
                    <span>Outer Margin (Padding)</span>
                    <span className="slider-numeric">{padding} px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="48"
                    value={padding}
                    onChange={(e) => setPadding(parseInt(e.target.value, 10))}
                  />
                </div>

                <div className="slider-group">
                  <div className="slider-label-row">
                    <span>Corner Radius</span>
                    <span className="slider-numeric">{radius} px</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button type="button" className="layer-tool-btn" style={{ padding: '2px 8px' }} onClick={() => setRadius(Math.max(0, radius - 1))}>-</button>
                    <input
                      type="range"
                      min="0"
                      max="36"
                      value={radius}
                      onChange={(e) => setRadius(parseInt(e.target.value, 10))}
                      style={{ flex: 1 }}
                    />
                    <button type="button" className="layer-tool-btn" style={{ padding: '2px 8px' }} onClick={() => setRadius(Math.min(36, radius + 1))}>+</button>
                  </div>
                </div>

                <div className="slider-group">
                  <div className="slider-label-row">
                    <span>Border Width</span>
                    <span className="slider-numeric">{borderWidth} px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="8"
                    value={borderWidth}
                    onChange={(e) => setBorderWidth(parseInt(e.target.value, 10))}
                  />
                </div>

                {borderWidth > 0 && (
                  <div className="field-group">
                    <label>Border Color</label>
                    <input
                      type="color"
                      value={borderColor}
                      onChange={(e) => setBorderColor(e.target.value)}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 4: FILM STOCKS & COLOR GRADING ================= */}
        {activeTab === 'filters' && (
          <div className="drawer-panel">
            <div className="drawer-header">
              <h3>Color Grading & Film Stocks</h3>
              <p>Authentic photographic tonal profiles and color grading</p>
            </div>

            <div className="filters-catalog-grid">
              {FILTER_PRESETS.map((f) => {
                const isSelected = filter === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    className={`filter-item-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => setFilter(f.id)}
                  >
                    <div
                      className="filter-mini-thumb"
                      style={{
                        backgroundImage: `url(${CURATED_PHOTOS[0].thumb})`,
                        filter: f.css
                      }}
                    />
                    <span className="filter-title">{f.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= TAB 5: EDITORIAL TYPOGRAPHY ================= */}
        {activeTab === 'text' && (
          <div className="drawer-panel">
            <div className="drawer-header">
              <h3>Editorial Typography</h3>
              <p>Add refined headlines, subheadings, and captions</p>
            </div>

            <div className="add-text-presets">
              <button
                type="button"
                className="btn-text-preset serif"
                onClick={() =>
                  onAddText({
                    text: 'POSITANO MEMORIES',
                    font: 'Playfair Display',
                    size: 24,
                    color: '#ffffff',
                    bgPill: true,
                    pillColor: 'rgba(18, 20, 24, 0.85)',
                    x: 50,
                    y: 92,
                    align: 'center'
                  })
                }
              >
                + Editorial Serif Title
              </button>

              <button
                type="button"
                className="btn-text-preset mono"
                onClick={() =>
                  onAddText({
                    text: 'STUDIO ARCHIVE • 02:45 AM',
                    font: 'Space Grotesk',
                    size: 16,
                    color: '#ffffff',
                    bgPill: false,
                    x: 50,
                    y: 10,
                    align: 'center'
                  })
                }
              >
                + Technical Monochrome
              </button>

              <button
                type="button"
                className="btn-text-preset script"
                onClick={() =>
                  onAddText({
                    text: 'golden memories ✨',
                    font: 'Caveat',
                    size: 28,
                    color: '#f8fafc',
                    bgPill: false,
                    x: 50,
                    y: 50,
                    align: 'center'
                  })
                }
              >
                + Handwritten Note
              </button>
            </div>

            <div className="text-items-list">
              <div className="drawer-subhead">Text Layers ({texts.length})</div>
              {texts.map((item) => (
                <div key={item.id} className="text-card-editor">
                  <div className="text-card-header">
                    <input
                      type="text"
                      className="pro-input bold"
                      value={item.text}
                      onChange={(e) => onUpdateText(item.id, { text: e.target.value })}
                    />
                    <button
                      type="button"
                      className="layer-tool-btn delete"
                      onClick={() => onRemoveText(item.id)}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>

                  <div className="text-properties-grid">
                    <div className="field-group">
                      <label>Typeface</label>
                      <select
                        className="pro-select"
                        value={item.font}
                        onChange={(e) => onUpdateText(item.id, { font: e.target.value })}
                      >
                        {FONT_PRESETS.map((f) => (
                          <option key={f.id} value={f.id}>
                            {f.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="field-group">
                      <label>Color</label>
                      <input
                        type="color"
                        value={item.color}
                        onChange={(e) => onUpdateText(item.id, { color: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="slider-group">
                    <div className="slider-label-row">
                      <span>Size</span>
                      <span className="slider-numeric">{item.size} px</span>
                    </div>
                    <input
                      type="range"
                      min="12"
                      max="56"
                      value={item.size}
                      onChange={(e) => onUpdateText(item.id, { size: parseInt(e.target.value, 10) })}
                    />
                  </div>

                  <label className="checkbox-row">
                    <input
                      type="checkbox"
                      checked={item.bgPill}
                      onChange={(e) => onUpdateText(item.id, { bgPill: e.target.checked })}
                    />
                    <span>Frosted Backing Pill</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 6: BADGES & DETAILS ================= */}
        {activeTab === 'stickers' && (
          <div className="drawer-panel">
            <div className="drawer-header">
              <h3>Badges & Details</h3>
              <p>Minimalist location tags, audio metadata, and date stamps</p>
            </div>

            <div className="badges-list">
              {STICKER_PRESETS.map((st) => (
                <button
                  key={st.id}
                  type="button"
                  className="badge-item-row"
                  onClick={() =>
                    onAddSticker({
                      ...st,
                      id: 'st-' + Date.now(),
                      x: 20 + Math.random() * 40,
                      y: 15 + Math.random() * 50,
                      rot: (Math.random() - 0.5) * 6
                    })
                  }
                >
                  <span className="badge-preview-icon">
                    {st.type === 'badge' && '✓'}
                    {st.type === 'music' && '🎵'}
                    {st.type === 'location' && '📍'}
                    {st.type === 'timestamp' && '⏱️'}
                    {st.type === 'rec' && '🔴'}
                    {st.type === 'washi_tape' && 'Tape'}
                    {st.type === 'barcode' && '|||||'}
                    {st.type === 'film_sprocket' && '🎞️'}
                  </span>
                  <span className="badge-name">{st.title}</span>
                </button>
              ))}
            </div>

            {stickers.length > 0 && (
              <div className="active-elements-section">
                <div className="drawer-subhead">Applied Badges ({stickers.length})</div>
                {stickers.map((st) => (
                  <div key={st.id} className="active-badge-row">
                    <span>{st.title || st.text}</span>
                    <button
                      type="button"
                      className="layer-tool-btn delete"
                      onClick={() => onRemoveSticker(st.id)}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 7: ASSETS & UPLOAD ================= */}
        {activeTab === 'photos' && (
          <div className="drawer-panel">
            <div className="drawer-header">
              <h3>Assets & Media</h3>
              <p>High-resolution imagery and local media upload</p>
            </div>

            {/* Clean Upload Dropzone */}
            <label className="pro-upload-dropzone">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={onUploadPhoto}
                style={{ display: 'none' }}
              />
              <Upload size={18} className="dropzone-icon" />
              <span className="dropzone-primary">Upload Images</span>
              <span className="dropzone-sub">Click to browse or drop files here</span>
            </label>

            {/* Category Pills */}
            <div className="category-pill-row">
              {photoCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`cat-pill ${photoCategory === cat ? 'active' : ''}`}
                  onClick={() => setPhotoCategory(cat)}
                >
                  {cat.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Photo Cards Grid */}
            <div className="assets-gallery-grid">
              {filteredPhotos.map((photo) => (
                <div
                  key={photo.id}
                  className="asset-tile"
                  onClick={() => onApplyPhotoToSelected(photo.full)}
                  title={`Apply: ${photo.title}`}
                >
                  <img src={photo.thumb} alt={photo.title} loading="lazy" />
                  <div className="asset-tile-hover">
                    <span>Use Photo</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
