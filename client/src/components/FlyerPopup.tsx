import React, { useEffect, useState } from "react";
import { X, ZoomIn, ZoomOut, Download, Maximize2 } from "lucide-react";

export function FlyerPopup() {
  const [visible, setVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [zoom, setZoom] = useState(100);

  useEffect(() => {
    try {
      const shown = localStorage.getItem("flyerShown");
      if (shown) setHasShown(true);
    } catch (e) {}

    const onScroll = () => {
      if (window.scrollY > 300 && !hasShown) {
        setVisible(true);
        setHasShown(true);
        try {
          localStorage.setItem("flyerShown", "1");
        } catch (e) {}
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasShown]);

  const handleDownload = async () => {
    const link = document.createElement("a");
    link.href = "/flyer.png";
    link.download = "SE-Womens-Chess-Championship-2026.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFullscreen = async () => {
    const elem = document.getElementById("flyer-image");
    if (!elem) return;
    try {
      if (!document.fullscreenElement) {
        await elem.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (e) {
      console.error("Fullscreen request failed", e);
    }
  };

  if (!visible) {
    return (
      <div className="fixed bottom-6 right-6 z-40 group">
        <button
          aria-label="Open event flyer"
          className="bg-gradient-to-r from-primary to-pink-600 text-white p-3.5 rounded-full shadow-lg hover:scale-110 transition-all duration-500 ease-in-out hover:ease-out animate-bounce hover:animate-none"
          onClick={() => setVisible(true)}
          title="View event flyer"
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" />
            <polyline points="13 2 13 9 20 9" />
          </svg>
        </button>
        <div className="absolute bottom-16 right-0 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto whitespace-nowrap text-xs">
          View Flyer
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="relative z-50 max-w-5xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between bg-gradient-to-r from-primary to-pink-600 text-white p-4 rounded-t-lg">
          <div className="flex items-center gap-3">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" />
            </svg>
            <h2 className="text-lg font-bold">2026 SE Women's & Girls Chess Championship</h2>
          </div>
          <button
            aria-label="Close flyer"
            className="p-2 rounded-md hover:bg-white/20 transition-colors"
            onClick={() => {
              setVisible(false);
              setZoom(100);
            }}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Image container with zoom */}
        <div className="flex-1 overflow-auto bg-black/40 flex items-center justify-center">
          <img
            id="flyer-image"
            src="/flyer.png"
            alt="2026 Southeastern Women's & Girls Chess Championship - Mother's Day Weekend May 9th"
            className="max-w-full transition-transform duration-300"
            style={{ transform: `scale(${zoom / 100})` }}
          />
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-slate-900 border-t flex items-center justify-between p-4 rounded-b-lg">
          <div className="flex items-center gap-2">
            <button
              aria-label="Zoom out"
              className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
              onClick={() => setZoom(Math.max(50, zoom - 20))}
              disabled={zoom <= 50}
            >
              <ZoomOut className="h-5 w-5" />
            </button>
            <span className="min-w-[3rem] text-center text-sm font-medium">{zoom}%</span>
            <button
              aria-label="Zoom in"
              className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
              onClick={() => setZoom(Math.min(200, zoom + 20))}
              disabled={zoom >= 200}
            >
              <ZoomIn className="h-5 w-5" />
            </button>
            <div className="w-px h-6 bg-slate-300 dark:bg-slate-600 mx-1" />
            <button
              aria-label="Toggle fullscreen"
              className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              onClick={handleFullscreen}
              title="Fullscreen view"
            >
              <Maximize2 className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/flyer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm font-medium"
            >
              View Full Page
            </a>
            <button
              aria-label="Download flyer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors text-sm font-medium"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4" />
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlyerPopup;
