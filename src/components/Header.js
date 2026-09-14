import React, { useState } from 'react';
import {
  Sparkles,
  Download,
  RotateCcw,
  RotateCw,
  Smartphone,
  Eye,
  EyeOff,
  LayoutGrid,
  Layers,
  Palette,
  Shuffle
} from 'lucide-react';
import { ASPECT_RATIOS, SAMPLE_PROJECTS } from '../types/collage';

export default function Header({
  mode,
  setMode,
  aspectRatio,
  setAspectRatio,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onExport,
  isMockupActive,
  setIsMockupActive,
  onLoadPreset,
  onShuffle
}) {
  const [showPresetsMenu, setShowPresetsMenu] = useState(false);

  return (
    <header className="studio-header">
      {/* Brand & Title */}
      <div className="header-brand">
        <div className="brand-logo-badge">
          <div className="instagram-gradient-ring">
            <div className="instagram-inner-dot">
              <Sparkles size={16} className="brand-icon" />
            </div>
          </div>
        </div>
        <div className="brand-titles">
          <div className="brand-main">
            <span className="brand-text">InstaCollage</span>
            <span className="badge-studio">PRO STUDIO</span>
          </div>
          <span className="brand-sub">Aesthetic Instagram Collage Creator</span>
        </div>
      </div>

      {/* Center Controls: Mode & Aspect Ratio */}
      <div className="header-center">
        {/* Creator Mode Switcher */}
        <div className="mode-toggle-group">
          <button
            type="button"
            className={`mode-btn ${mode === 'grid' ? 'active' : ''}`}
            onClick={() => setMode('grid')}
            title="Preset Grid Layouts"
          >
            <LayoutGrid size={15} />
            <span>Grid Presets</span>
          </button>
          <button
            type="button"
            className={`mode-btn ${mode === 'freeform' ? 'active' : ''}`}
            onClick={() => setMode('freeform')}
            title="Create Your Own Freeform Collage"
          >
            <Layers size={15} />
            <span>Freeform Canvas</span>
            <span className="badge-new">Custom</span>
          </button>
        </div>

        {/* Aspect Ratio Selector */}
        <div className="aspect-ratio-selector">
          {ASPECT_RATIOS.map((ar) => (
            <button
              key={ar.id}
              type="button"
              className={`aspect-btn ${aspectRatio === ar.id ? 'active' : ''}`}
              onClick={() => setAspectRatio(ar.id)}
              title={`${ar.label} (${ar.sub})`}
            >
              {ar.id === '9:16' ? <Smartphone size={14} /> : null}
              <span>{ar.id}</span>
              <span className="aspect-sub">{ar.sub.split(' ')[1] || ar.sub}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons: Undo/Redo, Presets, Mockup, Export */}
      <div className="header-actions">
        {/* Undo / Redo */}
        <div className="btn-group-tools">
          <button
            type="button"
            className="icon-action-btn"
            onClick={onUndo}
            disabled={!canUndo}
            title="Undo (Ctrl+Z)"
          >
            <RotateCcw size={16} />
          </button>
          <button
            type="button"
            className="icon-action-btn"
            onClick={onRedo}
            disabled={!canRedo}
            title="Redo (Ctrl+Y)"
          >
            <RotateCw size={16} />
          </button>
        </div>

        {/* Presets Menu */}
        <div className="presets-dropdown-container">
          <button
            type="button"
            className="action-btn-secondary"
            onClick={() => setShowPresetsMenu(!showPresetsMenu)}
            title="Load Aesthetic Starter Collage"
          >
            <Palette size={15} />
            <span>Inspo Styles</span>
          </button>

          {showPresetsMenu && (
            <div className="presets-dropdown-menu">
              <div className="dropdown-title">Aesthetic Inspo Presets</div>
              {SAMPLE_PROJECTS.map((proj) => (
                <button
                  key={proj.id}
                  type="button"
                  className="preset-option-item"
                  onClick={() => {
                    onLoadPreset(proj);
                    setShowPresetsMenu(false);
                  }}
                >
                  <span className="preset-name">{proj.name}</span>
                  <span className="preset-tag">{proj.mode} • {proj.aspectRatio}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Shuffle Photos & Style */}
        <button
          type="button"
          className="action-btn-secondary"
          onClick={onShuffle}
          title="Shuffle sample photos and background"
        >
          <Shuffle size={15} />
          <span>Surprise Me</span>
        </button>

        {/* Live Instagram Feed Mockup Toggle */}
        <button
          type="button"
          className={`action-btn-mockup ${isMockupActive ? 'active' : ''}`}
          onClick={() => setIsMockupActive(!isMockupActive)}
          title="Preview inside realistic Instagram Feed post"
        >
          {isMockupActive ? <EyeOff size={15} /> : <Eye size={15} />}
          <span>{isMockupActive ? 'Hide Mockup' : 'IG Mockup'}</span>
        </button>

        {/* High-Res Export */}
        <button
          type="button"
          className="btn-export-main"
          onClick={onExport}
          title="Export high-resolution 1080p collage"
        >
          <Download size={16} />
          <span>Export 1080p</span>
        </button>
      </div>
    </header>
  );
}
