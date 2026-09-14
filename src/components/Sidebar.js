import React, { useState } from 'react';
import {
  LayoutGrid,
  Layers,
  Palette,
  Sparkles,
  Type,
  Sticker,
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
  bgPattern,
  setBgPattern,
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

  const categories = ['All', '2 Photos', '3 Photos', '4 Photos', '5+ Photos', 'Photobooth'];
  const photoCategories = ['All', 'Aesthetic & Travel', 'Editorial & Fashion', 'Coffee & Cafe Vibes', 'Cyberpunk & Night', 'Film & Retro'];

  const filteredTemplates = templateCategory === 'All'
    ? GRID_TEMPLATES
    : GRID_TEMPLATES.filter((t) => t.category === templateCategory);

  const filteredPhotos = photoCategory === 'All'
    ? CURATED_PHOTOS
    : CURATED_PHOTOS.filter((p) => p.category === photoCategory);

  const selectedItem = freeformItems.find((item) => item.id === selectedItemId);

  return (
    <aside className="studio-sidebar">
      {/* Primary Tab Navigation */}
      <div className="sidebar-tabs">
        <button
          type="button"
          className={`tab-btn ${activeTab === 'templates' ? 'active' : ''}`}
          onClick={() => setActiveTab('templates')}
          title="Grid Templates"
        >
          <LayoutGrid size={18} />
          <span>Grids</span>
        </button>

        <button
          type="button"
          className={`tab-btn ${activeTab === 'freeform' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('freeform');
            if (mode !== 'freeform') setMode('freeform');
          }}
          title="Create Your Own Freeform Layout"
        >
          <Layers size={18} />
          <span>Layers</span>
        </button>

        <button
          type="button"
          className={`tab-btn ${activeTab === 'canvas' ? 'active' : ''}`}
          onClick={() => setActiveTab('canvas')}
          title="Canvas Background & Spacing"
        >
          <Palette size={18} />
          <span>Style</span>
        </button>

        <button
          type="button"
          className={`tab-btn ${activeTab === 'filters' ? 'active' : ''}`}
          onClick={() => setActiveTab('filters')}
          title="Aesthetic Photo Filters"
        >
          <Sparkles size={18} />
          <span>Filters</span>
        </button>

        <button
          type="button"
          className={`tab-btn ${activeTab === 'text' ? 'active' : ''}`}
          onClick={() => setActiveTab('text')}
          title="Story Text & Typography"
        >
          <Type size={18} />
          <span>Text</span>
        </button>

        <button
          type="button"
          className={`tab-btn ${activeTab === 'stickers' ? 'active' : ''}`}
          onClick={() => setActiveTab('stickers')}
          title="Badges, Location, Music, Stickers"
        >
          <Sticker size={18} />
          <span>Stickers</span>
        </button>

        <button
          type="button"
          className={`tab-btn ${activeTab === 'photos' ? 'active' : ''}`}
          onClick={() => setActiveTab('photos')}
          title="Aesthetic Photo Stock & Upload"
        >
          <ImageIcon size={18} />
          <span>Photos</span>
        </button>
      </div>

      {/* Tab Panel Contents */}
      <div className="sidebar-content">
        {/* ================= TAB 1: TEMPLATES ================= */}
        {activeTab === 'templates' && (
          <div className="panel-section">
            <div className="panel-header">
              <h3>Collage Templates</h3>
              <p className="panel-desc">Choose from 15+ curated Instagram grid layouts</p>
            </div>

            {/* Category Filter Chips */}
            <div className="category-chips">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`chip ${templateCategory === cat ? 'active' : ''}`}
                  onClick={() => setTemplateCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Template Thumbnails Grid */}
            <div className="templates-grid">
              {filteredTemplates.map((tpl) => {
                const isSelected = mode === 'grid' && currentTemplate?.id === tpl.id;
                return (
                  <button
                    key={tpl.id}
                    type="button"
                    className={`template-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => {
                      if (mode !== 'grid') setMode('grid');
                      onSelectTemplate(tpl);
                    }}
                  >
                    <div className="template-preview-box">
                      {tpl.cells.map((cell, idx) => (
                        <div
                          key={idx}
                          className="template-cell-preview"
                          style={{
                            left: `${cell.x}%`,
                            top: `${cell.y}%`,
                            width: `${cell.w}%`,
                            height: `${cell.h}%`
                          }}
                        />
                      ))}
                    </div>
                    <span className="template-name">{tpl.name}</span>
                    <span className="template-meta">{tpl.photosCount} slots</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= TAB 2: FREEFORM BUILDER ================= */}
        {activeTab === 'freeform' && (
          <div className="panel-section">
            <div className="panel-header">
              <h3>Create Your Own</h3>
              <p className="panel-desc">Freeform canvas: drag, resize, rotate & layer photos freely</p>
            </div>

            {/* Action Buttons to Add to Freeform Canvas */}
            <div className="add-layer-buttons">
              <button
                type="button"
                className="btn-add-layer polaroid"
                onClick={() =>
                  onAddFreeformItem({
                    type: 'polaroid',
                    url: CURATED_PHOTOS[Math.floor(Math.random() * CURATED_PHOTOS.length)].full,
                    caption: 'golden memories',
                    x: 25 + Math.random() * 20,
                    y: 20 + Math.random() * 20,
                    w: 45,
                    h: 55,
                    rot: (Math.random() - 0.5) * 16,
                    zIndex: freeformItems.length + 1
                  })
                }
              >
                <Plus size={15} />
                <span>+ Add Polaroid Card</span>
              </button>

              <button
                type="button"
                className="btn-add-layer framed"
                onClick={() =>
                  onAddFreeformItem({
                    type: 'photo',
                    url: CURATED_PHOTOS[Math.floor(Math.random() * CURATED_PHOTOS.length)].full,
                    x: 20 + Math.random() * 30,
                    y: 20 + Math.random() * 30,
                    w: 40,
                    h: 50,
                    radius: 12,
                    borderWidth: 2,
                    borderColor: '#ffffff',
                    rot: (Math.random() - 0.5) * 10,
                    zIndex: freeformItems.length + 1
                  })
                }
              >
                <Plus size={15} />
                <span>+ Add Framed Photo</span>
              </button>
            </div>

            {/* Selected Item Controls */}
            {selectedItem && (
              <div className="selected-item-box">
                <div className="section-subtitle">Edit Selected Element</div>
                {selectedItem.type === 'polaroid' && (
                  <div className="form-group">
                    <label>Polaroid Caption</label>
                    <input
                      type="text"
                      className="input-text"
                      value={selectedItem.caption || ''}
                      onChange={(e) => onUpdateFreeformItem(selectedItem.id, { caption: e.target.value })}
                      placeholder="Handwritten caption..."
                    />
                  </div>
                )}

                <div className="control-slider-group">
                  <div className="slider-label">
                    <span>Rotation</span>
                    <span className="slider-val">{Math.round(selectedItem.rot || 0)}°</span>
                  </div>
                  <input
                    type="range"
                    min="-45"
                    max="45"
                    value={selectedItem.rot || 0}
                    onChange={(e) => onUpdateFreeformItem(selectedItem.id, { rot: parseFloat(e.target.value) })}
                  />
                </div>

                <div className="control-slider-group">
                  <div className="slider-label">
                    <span>Width Scale</span>
                    <span className="slider-val">{Math.round(selectedItem.w || 40)}%</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="90"
                    value={selectedItem.w || 40}
                    onChange={(e) => onUpdateFreeformItem(selectedItem.id, { w: parseFloat(e.target.value) })}
                  />
                </div>

                {selectedItem.type === 'photo' && (
                  <div className="control-slider-group">
                    <div className="slider-label">
                      <span>Border Radius</span>
                      <span className="slider-val">{selectedItem.radius || 0}px</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="40"
                      value={selectedItem.radius || 0}
                      onChange={(e) => onUpdateFreeformItem(selectedItem.id, { radius: parseInt(e.target.value, 10) })}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Layer Hierarchy List */}
            <div className="layers-hierarchy">
              <div className="section-subtitle">Layers Stack ({freeformItems.length})</div>
              {freeformItems.length === 0 ? (
                <div className="empty-layers-msg">
                  No elements on canvas yet. Click "+ Add Polaroid Card" or "+ Add Framed Photo" above!
                </div>
              ) : (
                <div className="layers-list">
                  {freeformItems.map((item, idx) => {
                    const isSelected = selectedItemId === item.id;
                    return (
                      <div
                        key={item.id}
                        className={`layer-item ${isSelected ? 'active' : ''}`}
                        onClick={() => setSelectedItemId(item.id)}
                      >
                        <div className="layer-thumb">
                          {item.url ? (
                            <img src={item.url} alt="layer" />
                          ) : (
                            <span className="layer-type-icon">🖼️</span>
                          )}
                        </div>
                        <div className="layer-info">
                          <span className="layer-title">
                            {item.type === 'polaroid' ? `Polaroid: "${item.caption || 'photo'}"` : 'Framed Photo'}
                          </span>
                          <span className="layer-sub">Z-Index: {item.zIndex || idx + 1}</span>
                        </div>
                        <div className="layer-actions">
                          <button
                            type="button"
                            className="layer-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              onReorderFreeformItem(item.id, 'up');
                            }}
                            title="Bring Forward"
                          >
                            <ChevronUp size={14} />
                          </button>
                          <button
                            type="button"
                            className="layer-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              onReorderFreeformItem(item.id, 'down');
                            }}
                            title="Send Backward"
                          >
                            <ChevronDown size={14} />
                          </button>
                          <button
                            type="button"
                            className="layer-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDuplicateFreeformItem(item.id);
                            }}
                            title="Duplicate"
                          >
                            <Copy size={14} />
                          </button>
                          <button
                            type="button"
                            className="layer-btn delete"
                            onClick={(e) => {
                              e.stopPropagation();
                              onRemoveFreeformItem(item.id);
                            }}
                            title="Delete"
                          >
                            <Trash2 size={14} />
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

        {/* ================= TAB 3: CANVAS & BACKGROUND ================= */}
        {activeTab === 'canvas' && (
          <div className="panel-section">
            <div className="panel-header">
              <h3>Background & Framing</h3>
              <p className="panel-desc">Curated Instagram gradients, borders & spacing</p>
            </div>

            {/* Gradients & Background Colors */}
            <div className="section-subtitle">Background Themes</div>
            <div className="color-swatches-grid">
              {BACKGROUND_PRESETS.map((preset) => {
                const isSelected = background === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    className={`bg-preset-chip ${isSelected ? 'selected' : ''}`}
                    onClick={() => {
                      setBackground(preset.id);
                      setCustomBgColor('');
                    }}
                    title={preset.name}
                  >
                    <div
                      className="swatch-circle"
                      style={{
                        background: preset.css.startsWith('#') || preset.css.startsWith('linear') ? preset.css : '#2a2a35'
                      }}
                    />
                    <span className="swatch-name">{preset.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Custom Color Picker */}
            <div className="form-group custom-color-picker">
              <label>Custom Hex Color</label>
              <div className="color-input-wrapper">
                <input
                  type="color"
                  value={customBgColor || '#121417'}
                  onChange={(e) => {
                    setCustomBgColor(e.target.value);
                    setBackground('custom');
                  }}
                />
                <input
                  type="text"
                  className="input-text"
                  value={customBgColor || ''}
                  placeholder="#121417"
                  onChange={(e) => {
                    setCustomBgColor(e.target.value);
                    setBackground('custom');
                  }}
                />
              </div>
            </div>

            {/* Pattern Overlay */}
            <div className="section-subtitle">Background Texture Pattern</div>
            <div className="pattern-toggle-group">
              {['none', 'dots', 'grid'].map((pat) => (
                <button
                  key={pat}
                  type="button"
                  className={`chip ${bgPattern === pat ? 'active' : ''}`}
                  onClick={() => setBgPattern(pat)}
                >
                  {pat.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Grid Layout Sliders (Gap, Padding, Radius) */}
            {mode === 'grid' && (
              <div className="grid-controls-box">
                <div className="section-subtitle">Grid Layout Dimensions</div>

                <div className="control-slider-group">
                  <div className="slider-label">
                    <span>Cell Spacing (Gap)</span>
                    <span className="slider-val">{gap}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="32"
                    value={gap}
                    onChange={(e) => setGap(parseInt(e.target.value, 10))}
                  />
                </div>

                <div className="control-slider-group">
                  <div className="slider-label">
                    <span>Outer Padding</span>
                    <span className="slider-val">{padding}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="48"
                    value={padding}
                    onChange={(e) => setPadding(parseInt(e.target.value, 10))}
                  />
                </div>

                <div className="control-slider-group">
                  <div className="slider-label">
                    <span>Rounded Corners</span>
                    <span className="slider-val">{radius}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="40"
                    value={radius}
                    onChange={(e) => setRadius(parseInt(e.target.value, 10))}
                  />
                </div>

                <div className="control-slider-group">
                  <div className="slider-label">
                    <span>Border Thickness</span>
                    <span className="slider-val">{borderWidth}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={borderWidth}
                    onChange={(e) => setBorderWidth(parseInt(e.target.value, 10))}
                  />
                </div>

                {borderWidth > 0 && (
                  <div className="form-group">
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

        {/* ================= TAB 4: FILTERS & FX ================= */}
        {activeTab === 'filters' && (
          <div className="panel-section">
            <div className="panel-header">
              <h3>Aesthetic Photo Filters</h3>
              <p className="panel-desc">Apply iconic Instagram color grades and film aesthetics</p>
            </div>

            <div className="filters-grid">
              {FILTER_PRESETS.map((f) => {
                const isSelected = filter === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    className={`filter-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => setFilter(f.id)}
                  >
                    <div
                      className="filter-sample-preview"
                      style={{
                        backgroundImage: `url(${CURATED_PHOTOS[0].thumb})`,
                        filter: f.css
                      }}
                    />
                    <span className="filter-name">{f.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= TAB 5: TEXT & TYPOGRAPHY ================= */}
        {activeTab === 'text' && (
          <div className="panel-section">
            <div className="panel-header">
              <h3>Story Typography</h3>
              <p className="panel-desc">Add styled titles, captions & Instagram story pill text</p>
            </div>

            {/* Quick Text Add Buttons */}
            <div className="quick-text-buttons">
              <button
                type="button"
                className="btn-add-text"
                onClick={() =>
                  onAddText({
                    text: 'SUMMER MEMORIES',
                    font: 'Playfair Display',
                    size: 26,
                    color: '#ffffff',
                    bgPill: true,
                    pillColor: 'rgba(0,0,0,0.7)',
                    x: 50,
                    y: 85,
                    align: 'center',
                    shadow: true
                  })
                }
              >
                + Editorial Title Pill
              </button>

              <button
                type="button"
                className="btn-add-text"
                onClick={() =>
                  onAddText({
                    text: 'tokyo after dark • 02:45 am',
                    font: 'Space Grotesk',
                    size: 20,
                    color: '#00f2fe',
                    bgPill: false,
                    x: 50,
                    y: 15,
                    align: 'center',
                    shadow: true
                  })
                }
              >
                + Neon Aesthetic Subtitle
              </button>

              <button
                type="button"
                className="btn-add-text"
                onClick={() =>
                  onAddText({
                    text: 'good vibes only ✨',
                    font: 'Caveat',
                    size: 32,
                    color: '#ffd166',
                    bgPill: false,
                    x: 50,
                    y: 50,
                    align: 'center',
                    shadow: true
                  })
                }
              >
                + Handwritten Script
              </button>
            </div>

            {/* Existing Text Elements List */}
            <div className="text-elements-list">
              <div className="section-subtitle">Text Overlays ({texts.length})</div>
              {texts.map((item) => (
                <div key={item.id} className="text-editor-card">
                  <div className="text-card-top">
                    <input
                      type="text"
                      className="input-text font-bold"
                      value={item.text}
                      onChange={(e) => onUpdateText(item.id, { text: e.target.value })}
                      placeholder="Enter text..."
                    />
                    <button
                      type="button"
                      className="layer-btn delete"
                      onClick={() => onRemoveText(item.id)}
                      title="Remove text"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <div className="text-controls-grid">
                    <div className="form-group">
                      <label>Font Style</label>
                      <select
                        className="select-dropdown"
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

                    <div className="form-group">
                      <label>Color</label>
                      <input
                        type="color"
                        value={item.color}
                        onChange={(e) => onUpdateText(item.id, { color: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="control-slider-group">
                    <div className="slider-label">
                      <span>Font Size</span>
                      <span className="slider-val">{item.size}px</span>
                    </div>
                    <input
                      type="range"
                      min="12"
                      max="64"
                      value={item.size}
                      onChange={(e) => onUpdateText(item.id, { size: parseInt(e.target.value, 10) })}
                    />
                  </div>

                  <div className="control-slider-group">
                    <div className="slider-label">
                      <span>Vertical Position (Y)</span>
                      <span className="slider-val">{item.y}%</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="95"
                      value={item.y}
                      onChange={(e) => onUpdateText(item.id, { y: parseInt(e.target.value, 10) })}
                    />
                  </div>

                  <div className="checkbox-toggle">
                    <label>
                      <input
                        type="checkbox"
                        checked={item.bgPill}
                        onChange={(e) => onUpdateText(item.id, { bgPill: e.target.checked })}
                      />
                      <span>Instagram Story Background Pill</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 6: STICKERS & BADGES ================= */}
        {activeTab === 'stickers' && (
          <div className="panel-section">
            <div className="panel-header">
              <h3>Stickers & Badges</h3>
              <p className="panel-desc">Add Instagram badges, music player, location pills & stamps</p>
            </div>

            <div className="stickers-catalog">
              {STICKER_PRESETS.map((st) => (
                <button
                  key={st.id}
                  type="button"
                  className="sticker-catalog-item"
                  onClick={() =>
                    onAddSticker({
                      ...st,
                      id: 'st-' + Date.now(),
                      x: 20 + Math.random() * 50,
                      y: 15 + Math.random() * 60,
                      rot: (Math.random() - 0.5) * 12
                    })
                  }
                >
                  <div className="sticker-preview">
                    {st.type === 'badge' && <span className="verified-icon">✓</span>}
                    {st.type === 'music' && <span>🎵 {st.trackName}</span>}
                    {st.type === 'location' && <span>{st.text}</span>}
                    {st.type === 'timestamp' && <span className="retro-date">{st.text}</span>}
                    {st.type === 'rec' && <span className="rec-badge">{st.text}</span>}
                    {st.type === 'emoji' && <span className="emoji-large">{st.emoji}</span>}
                    {st.type === 'washi_tape' && <span className="washi-preview" />}
                    {st.type === 'barcode' && <span className="barcode-preview">||||| ||||</span>}
                    {st.type === 'film_sprocket' && <span>🎞️ {st.text}</span>}
                  </div>
                  <span className="sticker-title">{st.title}</span>
                </button>
              ))}
            </div>

            {/* Active Stickers on Canvas */}
            {stickers.length > 0 && (
              <div className="active-stickers-list">
                <div className="section-subtitle">Active Stickers ({stickers.length})</div>
                {stickers.map((st) => (
                  <div key={st.id} className="active-sticker-row">
                    <span>{st.title || st.text || st.emoji}</span>
                    <button
                      type="button"
                      className="layer-btn delete"
                      onClick={() => onRemoveSticker(st.id)}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 7: PHOTOS & UPLOAD ================= */}
        {activeTab === 'photos' && (
          <div className="panel-section">
            <div className="panel-header">
              <h3>Photo Library</h3>
              <p className="panel-desc">Upload local photos or use high-resolution aesthetic stock</p>
            </div>

            {/* File Upload Zone */}
            <label className="upload-dropzone">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={onUploadPhoto}
                style={{ display: 'none' }}
              />
              <Upload size={22} className="upload-icon" />
              <span className="upload-title">Upload Photos from Device</span>
              <span className="upload-sub">Supports PNG, JPG, WebP, HEIC</span>
            </label>

            {/* Stock Photo Categories */}
            <div className="category-chips">
              {photoCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`chip ${photoCategory === cat ? 'active' : ''}`}
                  onClick={() => setPhotoCategory(cat)}
                >
                  {cat.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Stock Photos Grid */}
            <div className="stock-photos-grid">
              {filteredPhotos.map((photo) => (
                <div
                  key={photo.id}
                  className="stock-photo-item"
                  onClick={() => onApplyPhotoToSelected(photo.full)}
                  title={`Click to use: ${photo.title}`}
                >
                  <img src={photo.thumb} alt={photo.title} loading="lazy" />
                  <div className="stock-photo-overlay">
                    <span>{photo.title}</span>
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
