import React, { useState } from 'react';
import {
  Download,
  RotateCcw,
  RotateCw,
  Eye,
  EyeOff,
  LayoutGrid,
  Layers,
  Sparkles,
  Check,
  ChevronDown
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
  onLoadPreset
}) {
  const [showPresetsMenu, setShowPresetsMenu] = useState(false);
  const [projectName, setProjectName] = useState('Amalfi Memories');

  return (
    <header className="pro-header">
      {/* Left: App Logo & Project Title */}
      <div className="header-left">
        <div className="brand-mark" title="CollageLab Studio">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="4" />
            <path d="M3 9h18" />
            <path d="M9 21V9" />
          </svg>
        </div>

        <div className="project-meta">
          <div className="project-title-row">
            <input
              type="text"
              className="project-name-input"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Untitled Collage"
            />
            <span className="save-status-pill">
              <Check size={11} strokeWidth={3} />
              <span>Saved</span>
            </span>
          </div>
          <span className="platform-sub">Instagram Creator Studio</span>
        </div>
      </div>

      {/* Center: Canvas Format Selector & Mode Switcher */}
      <div className="header-center">
        {/* Aspect Ratio Segmented Group */}
        <div className="segmented-control">
          {ASPECT_RATIOS.map((ar) => {
            const isActive = aspectRatio === ar.id;
            return (
              <button
                key={ar.id}
                type="button"
                className={`segment-btn ${isActive ? 'active' : ''}`}
                onClick={() => setAspectRatio(ar.id)}
              >
                <span className="segment-ratio">{ar.id}</span>
                <span className="segment-label">{ar.sub.replace('IG ', '')}</span>
              </button>
            );
          })}
        </div>

        {/* Mode Selector */}
        <div className="mode-segmented">
          <button
            type="button"
            className={`mode-tab-btn ${mode === 'grid' ? 'active' : ''}`}
            onClick={() => setMode('grid')}
            title="Grid Layouts"
          >
            <LayoutGrid size={14} />
            <span>Grid Layout</span>
          </button>
          <button
            type="button"
            className={`mode-tab-btn ${mode === 'freeform' ? 'active' : ''}`}
            onClick={() => setMode('freeform')}
            title="Freeform Scrapbook Canvas"
          >
            <Layers size={14} />
            <span>Freeform Canvas</span>
          </button>
        </div>
      </div>

      {/* Right: History, Presets, Preview & Export */}
      <div className="header-right">
        {/* Undo / Redo */}
        <div className="tool-group">
          <button
            type="button"
            className="icon-tool-btn"
            onClick={onUndo}
            disabled={!canUndo}
            title="Undo (Ctrl+Z)"
          >
            <RotateCcw size={15} />
          </button>
          <button
            type="button"
            className="icon-tool-btn"
            onClick={onRedo}
            disabled={!canRedo}
            title="Redo (Ctrl+Y)"
          >
            <RotateCw size={15} />
          </button>
        </div>

        <div className="header-divider" />

        {/* Presets Menu */}
        <div className="dropdown-wrapper">
          <button
            type="button"
            className="btn-ghost-header"
            onClick={() => setShowPresetsMenu(!showPresetsMenu)}
          >
            <Sparkles size={14} className="accent-icon" />
            <span>Presets</span>
            <ChevronDown size={13} className="chevron-icon" />
          </button>

          {showPresetsMenu && (
            <div className="pro-dropdown-menu">
              <div className="dropdown-section-header">Curated Styles</div>
              {SAMPLE_PROJECTS.map((proj) => (
                <button
                  key={proj.id}
                  type="button"
                  className="dropdown-item"
                  onClick={() => {
                    onLoadPreset(proj);
                    setProjectName(proj.name);
                    setShowPresetsMenu(false);
                  }}
                >
                  <span className="dropdown-item-title">{proj.name}</span>
                  <span className="dropdown-item-meta">{proj.aspectRatio} • {proj.mode === 'grid' ? 'Grid' : 'Freeform'}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Instagram Post Mockup Toggle */}
        <button
          type="button"
          className={`btn-preview-toggle ${isMockupActive ? 'active' : ''}`}
          onClick={() => setIsMockupActive(!isMockupActive)}
          title="Preview inside realistic Instagram Feed post"
        >
          {isMockupActive ? <EyeOff size={15} /> : <Eye size={15} />}
          <span>{isMockupActive ? 'Exit Preview' : 'Preview Post'}</span>
        </button>

        {/* Primary Export Button */}
        <button
          type="button"
          className="btn-export-primary"
          onClick={onExport}
        >
          <Download size={15} />
          <span>Export</span>
        </button>
      </div>
    </header>
  );
}
