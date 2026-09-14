import React, { useState, useEffect, useRef } from 'react';
import {
  Download,
  Copy,
  Check,
  X,
  Sparkles,
  Loader2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  renderCollageToCanvas,
  downloadCanvas,
  copyCanvasToClipboard
} from '../utils/canvasExport';

export default function ExportModal({
  isOpen,
  onClose,
  collageState,
  aspectRatio
}) {
  const [resolutionScale, setResolutionScale] = useState(1); // 1 = 1080p, 2 = Ultra HD 2160p
  const [format, setFormat] = useState('image/png');
  const [jpegQuality, setJpegQuality] = useState(0.92);
  const [isRendering, setIsRendering] = useState(false);
  const [previewDataUrl, setPreviewDataUrl] = useState(null);
  const [copied, setCopied] = useState(false);
  const renderedCanvasRef = useRef(null);

  // Compute pixel dimensions based on aspect ratio & resolution scale
  let baseW = 1080;
  let baseH = 1080;
  if (aspectRatio === '4:5') {
    baseW = 1080;
    baseH = 1350;
  } else if (aspectRatio === '9:16') {
    baseW = 1080;
    baseH = 1920;
  } else if (aspectRatio === '16:9') {
    baseW = 1920;
    baseH = 1080;
  }

  const exportW = baseW * resolutionScale;
  const exportH = baseH * resolutionScale;

  // Render preview whenever modal opens or settings change
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    const generatePreview = async () => {
      setIsRendering(true);
      try {
        const canvas = await renderCollageToCanvas(collageState, exportW, exportH);
        if (!isMounted) return;
        renderedCanvasRef.current = canvas;
        const dataUrl = canvas.toDataURL(format, jpegQuality);
        setPreviewDataUrl(dataUrl);
      } catch (err) {
        console.error('Error rendering export preview:', err);
      } finally {
        if (isMounted) setIsRendering(false);
      }
    };

    generatePreview();

    return () => {
      isMounted = false;
    };
  }, [isOpen, resolutionScale, format, jpegQuality, collageState, exportW, exportH]);

  const handleDownload = () => {
    if (!renderedCanvasRef.current) return;
    const ext = format === 'image/jpeg' ? 'jpg' : format === 'image/webp' ? 'webp' : 'png';
    const filename = `instacollage-${Date.now()}.${ext}`;

    downloadCanvas(renderedCanvasRef.current, filename, format, jpegQuality);

    // Trigger celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleCopyClipboard = async () => {
    if (!renderedCanvasRef.current) return;
    try {
      await copyCanvasToClipboard(renderedCanvasRef.current);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (err) {
      alert('Unable to copy directly to clipboard. Please use the Download button.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="export-modal-backdrop" onClick={onClose}>
      <div className="export-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="export-modal-header">
          <div className="export-header-title">
            <Sparkles size={18} className="icon-sparkle" />
            <span>Export High-Resolution Collage</span>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Modal Body: Left Settings, Right Live Preview */}
        <div className="export-modal-body">
          {/* Settings Section */}
          <div className="export-settings-col">
            {/* Resolution Selector */}
            <div className="export-setting-group">
              <label className="setting-label">Resolution & Clarity</label>
              <div className="resolution-pills">
                <button
                  type="button"
                  className={`pill-btn ${resolutionScale === 1 ? 'active' : ''}`}
                  onClick={() => setResolutionScale(1)}
                >
                  <span className="pill-title">Standard HD (1x)</span>
                  <span className="pill-desc">{baseW} × {baseH}px</span>
                </button>
                <button
                  type="button"
                  className={`pill-btn ${resolutionScale === 2 ? 'active' : ''}`}
                  onClick={() => setResolutionScale(2)}
                >
                  <span className="pill-title">Ultra HD Retina (2x)</span>
                  <span className="pill-desc">{baseW * 2} × {baseH * 2}px</span>
                </button>
              </div>
            </div>

            {/* File Format Selector */}
            <div className="export-setting-group">
              <label className="setting-label">File Format</label>
              <div className="format-chips-row">
                {[
                  { id: 'image/png', label: 'PNG', note: 'Lossless' },
                  { id: 'image/jpeg', label: 'JPEG', note: 'Fast & small' },
                  { id: 'image/webp', label: 'WebP', note: 'Modern' }
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    className={`format-chip ${format === f.id ? 'active' : ''}`}
                    onClick={() => setFormat(f.id)}
                  >
                    <span className="fmt-name">{f.label}</span>
                    <span className="fmt-sub">{f.note}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* JPEG Quality Slider */}
            {format === 'image/jpeg' && (
              <div className="export-setting-group">
                <div className="slider-label">
                  <span>JPEG Quality</span>
                  <span className="slider-val">{Math.round(jpegQuality * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.6"
                  max="1.0"
                  step="0.05"
                  value={jpegQuality}
                  onChange={(e) => setJpegQuality(parseFloat(e.target.value))}
                />
              </div>
            )}

            {/* Export Action Buttons */}
            <div className="export-actions-bottom">
              <button
                type="button"
                className="btn-download-primary"
                onClick={handleDownload}
                disabled={isRendering}
              >
                {isRendering ? (
                  <>
                    <Loader2 size={16} className="spinning" />
                    <span>Rendering...</span>
                  </>
                ) : (
                  <>
                    <Download size={16} />
                    <span>Download Image ({exportW}×{exportH})</span>
                  </>
                )}
              </button>

              <button
                type="button"
                className="btn-copy-secondary"
                onClick={handleCopyClipboard}
                disabled={isRendering}
              >
                {copied ? (
                  <>
                    <Check size={16} color="#10b981" />
                    <span style={{ color: '#10b981' }}>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    <span>Copy to Clipboard</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Live Preview Section */}
          <div className="export-preview-col">
            <div className="preview-label">Live Canvas Preview</div>
            <div className="preview-box-viewport">
              {isRendering ? (
                <div className="rendering-placeholder">
                  <Loader2 size={32} className="spinning" />
                  <span>Generating high-res canvas...</span>
                </div>
              ) : previewDataUrl ? (
                <img
                  src={previewDataUrl}
                  alt="Export Collage Preview"
                  className="preview-rendered-img"
                />
              ) : (
                <div className="rendering-placeholder">Loading preview...</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
