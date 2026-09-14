import React, { useState, useEffect, useRef } from 'react';
import {
  Download,
  Copy,
  Check,
  X,
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

  // Compute dimensions based on aspect ratio
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
    const filename = `collagelab-${Date.now()}.${ext}`;

    downloadCanvas(renderedCanvasRef.current, filename, format, jpegQuality);

    confetti({
      particleCount: 70,
      spread: 60,
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
      alert('Could not copy directly to clipboard. Please use the Download button.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="pro-export-backdrop" onClick={onClose}>
      <div className="pro-export-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="pro-export-header">
          <div className="pro-export-title">Export Canvas</div>
          <button type="button" className="pro-close-btn" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="pro-export-body">
          {/* Controls Column */}
          <div className="pro-export-settings">
            {/* Format Selection */}
            <div className="export-section">
              <label className="section-label">File Format</label>
              <div className="format-toggle-row">
                {[
                  { id: 'image/png', label: 'PNG', note: 'Lossless' },
                  { id: 'image/jpeg', label: 'JPEG', note: 'Compressed' },
                  { id: 'image/webp', label: 'WebP', note: 'Modern' }
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    className={`format-option ${format === f.id ? 'active' : ''}`}
                    onClick={() => setFormat(f.id)}
                  >
                    <span className="format-title">{f.label}</span>
                    <span className="format-note">{f.note}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Resolution Multiplier */}
            <div className="export-section">
              <label className="section-label">Resolution Output</label>
              <div className="scale-toggle-row">
                <button
                  type="button"
                  className={`scale-option ${resolutionScale === 1 ? 'active' : ''}`}
                  onClick={() => setResolutionScale(1)}
                >
                  <span className="scale-title">1× Standard</span>
                  <span className="scale-dims">{baseW} × {baseH} px</span>
                </button>
                <button
                  type="button"
                  className={`scale-option ${resolutionScale === 2 ? 'active' : ''}`}
                  onClick={() => setResolutionScale(2)}
                >
                  <span className="scale-title">2× Ultra HD</span>
                  <span className="scale-dims">{baseW * 2} × {baseH * 2} px</span>
                </button>
              </div>
            </div>

            {/* JPEG Quality Slider */}
            {format === 'image/jpeg' && (
              <div className="export-section">
                <div className="section-label-row">
                  <span className="section-label">Compression Quality</span>
                  <span className="numeric-badge">{Math.round(jpegQuality * 100)}%</span>
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

            {/* Action Buttons */}
            <div className="export-cta-footer">
              <button
                type="button"
                className="btn-download-export"
                onClick={handleDownload}
                disabled={isRendering}
              >
                {isRendering ? (
                  <>
                    <Loader2 size={15} className="spinner" />
                    <span>Rendering Canvas...</span>
                  </>
                ) : (
                  <>
                    <Download size={15} />
                    <span>Download {exportW} × {exportH}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                className="btn-clipboard-export"
                onClick={handleCopyClipboard}
                disabled={isRendering}
              >
                {copied ? (
                  <>
                    <Check size={15} color="#10b981" />
                    <span style={{ color: '#10b981' }}>Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy size={15} />
                    <span>Copy to Clipboard</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Live Preview Column */}
          <div className="pro-export-preview">
            <div className="preview-label">Output Preview</div>
            <div className="preview-viewport-box">
              {isRendering ? (
                <div className="rendering-state">
                  <Loader2 size={24} className="spinner" />
                  <span>Generating high-resolution canvas...</span>
                </div>
              ) : previewDataUrl ? (
                <img
                  src={previewDataUrl}
                  alt="Collage Output"
                  className="preview-img"
                />
              ) : (
                <div className="rendering-state">Preparing preview...</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
