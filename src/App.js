import React, { useState, useEffect, useCallback, useRef } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CanvasWorkspace from './components/CanvasWorkspace';
import InstagramMockup from './components/InstagramMockup';
import ExportModal from './components/ExportModal';
import {
  GRID_TEMPLATES,
  CURATED_PHOTOS,
  BACKGROUND_PRESETS
} from './types/collage';

export default function App() {
  // Top-level Application State
  const [mode, setMode] = useState('grid'); // 'grid' | 'freeform'
  const [aspectRatio, setAspectRatio] = useState('4:5');
  const [currentTemplate, setCurrentTemplate] = useState(GRID_TEMPLATES[4]); // Hero Left + 2 Right

  // Initial photos populated with aesthetic sample pictures
  const [photos, setPhotos] = useState([
    CURATED_PHOTOS[0].full, // Amalfi Coast
    CURATED_PHOTOS[6].full, // Artisan Latte
    CURATED_PHOTOS[2].full  // Santorini Blue Dome
  ]);
  const [cellAdjustments, setCellAdjustments] = useState({});
  const [activeCellIndex, setActiveCellIndex] = useState(null);

  // Background & Framing
  const [background, setBackground] = useState('golden-hour');
  const [customBgColor, setCustomBgColor] = useState('');
  const [bgPattern, setBgPattern] = useState('none');
  const [gap, setGap] = useState(8);
  const [padding, setPadding] = useState(12);
  const [radius, setRadius] = useState(16);
  const [borderWidth, setBorderWidth] = useState(0);
  const [borderColor, setBorderColor] = useState('#ffffff');

  // Filters
  const [filter, setFilter] = useState('golden-glow');

  // Freeform "Create Your Own" Items
  const [freeformItems, setFreeformItems] = useState([
    {
      id: 'ff-1',
      type: 'polaroid',
      url: CURATED_PHOTOS[11].full,
      caption: 'vintage 35mm memories',
      x: 15,
      y: 15,
      w: 48,
      h: 58,
      rot: -5,
      zIndex: 1
    },
    {
      id: 'ff-2',
      type: 'polaroid',
      url: CURATED_PHOTOS[3].full,
      caption: 'golden hour glow ✨',
      x: 44,
      y: 35,
      w: 48,
      h: 58,
      rot: 6,
      zIndex: 2
    }
  ]);
  const [selectedItemId, setSelectedItemId] = useState('ff-1');

  // Text Overlays
  const [texts, setTexts] = useState([
    {
      id: 'txt-1',
      text: 'AMALFI DUMP ✨',
      font: 'Playfair Display',
      size: 26,
      color: '#ffffff',
      bgPill: true,
      pillColor: 'rgba(0, 0, 0, 0.75)',
      x: 50,
      y: 92,
      align: 'center',
      shadow: true
    }
  ]);

  // Stickers & Badges
  const [stickers, setStickers] = useState([
    {
      id: 'st-init-1',
      type: 'location',
      text: '📍 Positano, Italy',
      x: 18,
      y: 8,
      rot: -2
    }
  ]);

  // UI Panels
  const [activeTab, setActiveTab] = useState('templates');
  const [isMockupActive, setIsMockupActive] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Undo / Redo History
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const isHistoryAction = useRef(false);

  // Snapshot current state for history
  const getCurrentSnapshot = useCallback(() => {
    return JSON.stringify({
      mode,
      aspectRatio,
      currentTemplateId: currentTemplate?.id,
      photos,
      cellAdjustments,
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
      texts,
      stickers
    });
  }, [
    mode,
    aspectRatio,
    currentTemplate,
    photos,
    cellAdjustments,
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
    texts,
    stickers
  ]);

  // Record history on meaningful changes
  useEffect(() => {
    if (isHistoryAction.current) {
      isHistoryAction.current = false;
      return;
    }
    const snap = getCurrentSnapshot();
    setHistory((prev) => {
      const upToCurrent = prev.slice(0, historyIndex + 1);
      if (upToCurrent[upToCurrent.length - 1] === snap) return prev;
      return [...upToCurrent, snap];
    });
    setHistoryIndex((prev) => prev + 1);
  }, [getCurrentSnapshot]); // eslint-disable-line react-hooks/exhaustive-deps

  // Undo Handler
  const handleUndo = () => {
    if (historyIndex > 0) {
      isHistoryAction.current = true;
      const targetIndex = historyIndex - 1;
      const snap = JSON.parse(history[targetIndex]);
      applySnapshot(snap);
      setHistoryIndex(targetIndex);
    }
  };

  // Redo Handler
  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      isHistoryAction.current = true;
      const targetIndex = historyIndex + 1;
      const snap = JSON.parse(history[targetIndex]);
      applySnapshot(snap);
      setHistoryIndex(targetIndex);
    }
  };

  const applySnapshot = (snap) => {
    if (!snap) return;
    setMode(snap.mode);
    setAspectRatio(snap.aspectRatio);
    const tpl = GRID_TEMPLATES.find((t) => t.id === snap.currentTemplateId);
    if (tpl) setCurrentTemplate(tpl);
    setPhotos(snap.photos);
    setCellAdjustments(snap.cellAdjustments || {});
    setBackground(snap.background);
    setCustomBgColor(snap.customBgColor || '');
    setBgPattern(snap.bgPattern || 'none');
    setGap(snap.gap);
    setPadding(snap.padding);
    setRadius(snap.radius);
    setBorderWidth(snap.borderWidth || 0);
    setBorderColor(snap.borderColor || '#ffffff');
    setFilter(snap.filter);
    setFreeformItems(snap.freeformItems || []);
    setTexts(snap.texts || []);
    setStickers(snap.stickers || []);
  };

  // Keyboard shortcut listener (Ctrl+Z / Ctrl+Y)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      } else if (
        ((e.ctrlKey || e.metaKey) && e.key === 'y') ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'z')
      ) {
        e.preventDefault();
        handleRedo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  // Template Selection
  const handleSelectTemplate = (tpl) => {
    setCurrentTemplate(tpl);
    // Ensure photos array matches template cells
    if (photos.length < tpl.photosCount) {
      const newPhotos = [...photos];
      while (newPhotos.length < tpl.photosCount) {
        const nextImg = CURATED_PHOTOS[newPhotos.length % CURATED_PHOTOS.length].full;
        newPhotos.push(nextImg);
      }
      setPhotos(newPhotos);
    }
  };

  // Cell Photo Change
  const handleCellPhotoChange = (index, url) => {
    setPhotos((prev) => {
      const next = [...prev];
      next[index] = url;
      return next;
    });
  };

  // Clear Cell Photo
  const handleClearCellPhoto = (index) => {
    setPhotos((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
  };

  // Cell Adjustments (Zoom, Pan, Rotate, Flip)
  const handleUpdateCellAdjustment = (index, newAdjust) => {
    setCellAdjustments((prev) => ({
      ...prev,
      [index]: { ...(prev[index] || {}), ...newAdjust }
    }));
  };

  // Freeform Item CRUD
  const handleAddFreeformItem = (item) => {
    const newItem = {
      id: 'ff-' + Date.now(),
      ...item
    };
    setFreeformItems((prev) => [...prev, newItem]);
    setSelectedItemId(newItem.id);
  };

  const handleUpdateFreeformItem = (id, updates) => {
    setFreeformItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const handleRemoveFreeformItem = (id) => {
    setFreeformItems((prev) => prev.filter((item) => item.id !== id));
    if (selectedItemId === id) setSelectedItemId(null);
  };

  const handleDuplicateFreeformItem = (id) => {
    const item = freeformItems.find((i) => i.id === id);
    if (!item) return;
    const duplicated = {
      ...item,
      id: 'ff-' + Date.now(),
      x: Math.min(80, item.x + 5),
      y: Math.min(80, item.y + 5),
      zIndex: freeformItems.length + 1
    };
    setFreeformItems((prev) => [...prev, duplicated]);
    setSelectedItemId(duplicated.id);
  };

  const handleReorderFreeformItem = (id, direction) => {
    setFreeformItems((prev) => {
      const idx = prev.findIndex((i) => i.id === id);
      if (idx === -1) return prev;
      const targetIdx = direction === 'up' ? idx + 1 : idx - 1;
      if (targetIdx < 0 || targetIdx >= prev.length) return prev;

      const updated = [...prev];
      const temp = updated[idx];
      updated[idx] = updated[targetIdx];
      updated[targetIdx] = temp;

      // Re-assign zIndexes
      return updated.map((it, i) => ({ ...it, zIndex: i + 1 }));
    });
  };

  // Text Handlers
  const handleAddText = (newText) => {
    setTexts((prev) => [...prev, { id: 'txt-' + Date.now(), ...newText }]);
  };

  const handleUpdateText = (id, updates) => {
    setTexts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  };

  const handleRemoveText = (id) => {
    setTexts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sticker Handlers
  const handleAddSticker = (newSticker) => {
    setStickers((prev) => [...prev, newSticker]);
  };

  const handleUpdateSticker = (id, updates) => {
    setStickers((prev) =>
      prev.map((st) => (st.id === id ? { ...st, ...updates } : st))
    );
  };

  const handleRemoveSticker = (id) => {
    setStickers((prev) => prev.filter((st) => st.id !== id));
  };

  // Apply Photo from Stock Library to currently selected cell or as a new Polaroid
  const handleApplyPhotoToSelected = (photoUrl) => {
    if (mode === 'grid') {
      if (activeCellIndex !== null && activeCellIndex < (currentTemplate?.photosCount || 3)) {
        handleCellPhotoChange(activeCellIndex, photoUrl);
      } else {
        // Apply to first available or first slot
        handleCellPhotoChange(0, photoUrl);
      }
    } else {
      // Add as new freeform item
      handleAddFreeformItem({
        type: 'polaroid',
        url: photoUrl,
        caption: 'aesthetic vibes',
        x: 25 + Math.random() * 20,
        y: 20 + Math.random() * 20,
        w: 45,
        h: 55,
        rot: (Math.random() - 0.5) * 14,
        zIndex: freeformItems.length + 1
      });
    }
  };

  // Handle local user file uploads
  const handleUploadPhoto = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      files.forEach((file, i) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const dataUrl = event.target.result;
          if (mode === 'grid') {
            const targetCell = activeCellIndex !== null ? (activeCellIndex + i) % (currentTemplate?.photosCount || 4) : i;
            handleCellPhotoChange(targetCell, dataUrl);
          } else {
            handleAddFreeformItem({
              type: 'polaroid',
              url: dataUrl,
              caption: file.name.replace(/\.[^/.]+$/, '').toLowerCase(),
              x: 20 + Math.random() * 30,
              y: 20 + Math.random() * 30,
              w: 45,
              h: 55,
              rot: (Math.random() - 0.5) * 12,
              zIndex: freeformItems.length + 1
            });
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Load Inspo Preset Project
  const handleLoadPreset = (preset) => {
    setMode(preset.mode);
    setAspectRatio(preset.aspectRatio);
    const tpl = GRID_TEMPLATES.find((t) => t.id === preset.templateId);
    if (tpl) setCurrentTemplate(tpl);
    if (preset.photos) setPhotos(preset.photos);
    if (preset.freeformItems) setFreeformItems(preset.freeformItems);
    setBackground(preset.background);
    setGap(preset.gap || 8);
    setPadding(preset.padding || 12);
    setRadius(preset.radius || 16);
    setFilter(preset.filter || 'normal');
    if (preset.texts) setTexts(preset.texts);
    if (preset.stickers) setStickers(preset.stickers);
  };

  // Shuffle Surprise
  const handleShuffle = () => {
    const randomTpl = GRID_TEMPLATES[Math.floor(Math.random() * GRID_TEMPLATES.length)];
    const randomBg = BACKGROUND_PRESETS[Math.floor(Math.random() * BACKGROUND_PRESETS.length)].id;
    const shuffledPhotos = [...CURATED_PHOTOS]
      .sort(() => 0.5 - Math.random())
      .slice(0, randomTpl.photosCount)
      .map((p) => p.full);

    setCurrentTemplate(randomTpl);
    setBackground(randomBg);
    setPhotos(shuffledPhotos);
  };

  // State bundle for export renderer
  const collageState = {
    mode,
    aspectRatio,
    currentTemplate,
    photos,
    cellAdjustments,
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
    texts,
    stickers
  };

  return (
    <div className="studio-app-root">
      {/* Top Navigation Bar */}
      <Header
        mode={mode}
        setMode={setMode}
        aspectRatio={aspectRatio}
        setAspectRatio={setAspectRatio}
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        onExport={() => setIsExportModalOpen(true)}
        isMockupActive={isMockupActive}
        setIsMockupActive={setIsMockupActive}
        onLoadPreset={handleLoadPreset}
        onShuffle={handleShuffle}
      />

      {/* Main Studio Body: Sidebar + Workspace */}
      <div className="studio-main-layout">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          mode={mode}
          setMode={setMode}
          currentTemplate={currentTemplate}
          onSelectTemplate={handleSelectTemplate}
          background={background}
          setBackground={setBackground}
          customBgColor={customBgColor}
          setCustomBgColor={setCustomBgColor}
          bgPattern={bgPattern}
          setBgPattern={setBgPattern}
          gap={gap}
          setGap={setGap}
          padding={padding}
          setPadding={setPadding}
          radius={radius}
          setRadius={setRadius}
          borderWidth={borderWidth}
          setBorderWidth={setBorderWidth}
          borderColor={borderColor}
          setBorderColor={setBorderColor}
          filter={filter}
          setFilter={setFilter}
          freeformItems={freeformItems}
          onAddFreeformItem={handleAddFreeformItem}
          onUpdateFreeformItem={handleUpdateFreeformItem}
          onRemoveFreeformItem={handleRemoveFreeformItem}
          onDuplicateFreeformItem={handleDuplicateFreeformItem}
          onReorderFreeformItem={handleReorderFreeformItem}
          selectedItemId={selectedItemId}
          setSelectedItemId={setSelectedItemId}
          texts={texts}
          onAddText={handleAddText}
          onUpdateText={handleUpdateText}
          onRemoveText={handleRemoveText}
          stickers={stickers}
          onAddSticker={handleAddSticker}
          onRemoveSticker={handleRemoveSticker}
          onApplyPhotoToSelected={handleApplyPhotoToSelected}
          onUploadPhoto={handleUploadPhoto}
        />

        <CanvasWorkspace
          mode={mode}
          aspectRatio={aspectRatio}
          currentTemplate={currentTemplate}
          photos={photos}
          cellAdjustments={cellAdjustments}
          onUpdateCellAdjustment={handleUpdateCellAdjustment}
          onCellPhotoChange={handleCellPhotoChange}
          onClearCellPhoto={handleClearCellPhoto}
          activeCellIndex={activeCellIndex}
          setActiveCellIndex={setActiveCellIndex}
          background={background}
          customBgColor={customBgColor}
          bgPattern={bgPattern}
          gap={gap}
          padding={padding}
          radius={radius}
          borderWidth={borderWidth}
          borderColor={borderColor}
          filter={filter}
          freeformItems={freeformItems}
          onUpdateFreeformItem={handleUpdateFreeformItem}
          selectedItemId={selectedItemId}
          setSelectedItemId={setSelectedItemId}
          onRemoveFreeformItem={handleRemoveFreeformItem}
          texts={texts}
          onUpdateText={handleUpdateText}
          stickers={stickers}
          onUpdateSticker={handleUpdateSticker}
          onRemoveSticker={handleRemoveSticker}
          onUploadPhoto={handleUploadPhoto}
        />
      </div>

      {/* Instagram Feed Mockup Overlay */}
      {isMockupActive && (
        <InstagramMockup
          aspectRatio={aspectRatio}
          onClose={() => setIsMockupActive(false)}
        >
          <CanvasWorkspace
            mode={mode}
            aspectRatio={aspectRatio}
            currentTemplate={currentTemplate}
            photos={photos}
            cellAdjustments={cellAdjustments}
            onUpdateCellAdjustment={() => {}}
            onCellPhotoChange={() => {}}
            onClearCellPhoto={() => {}}
            activeCellIndex={null}
            setActiveCellIndex={() => {}}
            background={background}
            customBgColor={customBgColor}
            bgPattern={bgPattern}
            gap={gap}
            padding={padding}
            radius={radius}
            borderWidth={borderWidth}
            borderColor={borderColor}
            filter={filter}
            freeformItems={freeformItems}
            onUpdateFreeformItem={() => {}}
            selectedItemId={null}
            setSelectedItemId={() => {}}
            onRemoveFreeformItem={() => {}}
            texts={texts}
            onUpdateText={() => {}}
            stickers={stickers}
            onUpdateSticker={() => {}}
            onRemoveSticker={() => {}}
            onUploadPhoto={() => {}}
          />
        </InstagramMockup>
      )}

      {/* High-Resolution Export Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        collageState={collageState}
        aspectRatio={aspectRatio}
      />
    </div>
  );
}
