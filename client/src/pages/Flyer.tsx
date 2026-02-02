import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { ZoomIn, ZoomOut, Download, Maximize2, Share2 } from "lucide-react";

export default function Flyer() {
  const [zoom, setZoom] = useState(100);

  const handleDownload = async () => {
    const link = document.createElement("a");
    link.href = "/flyer.png";
    link.download = "SE-Womens-Chess-Championship-2026.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFullscreen = async () => {
    const elem = document.getElementById("flyer-full-page");
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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "2026 SE Women's & Girls Chess Championship",
          text: "Join us for Mother's Day Weekend - $5,000 Prize Fund!",
          url: window.location.href,
        });
      } catch (err) {
        if (err.name !== "AbortError") console.error(err);
      }
    } else {
      // Fallback: copy link to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              2026 Southeastern Regional Championship
            </h1>
            <p className="text-lg text-muted-foreground">
              Women's & Girls Chess Championship • Mother's Day Weekend
            </p>
            <p className="text-base text-muted-foreground mt-2">
              Saturday, May 9th, 2026 • Atlanta Chinese Christian Church, Tucker, GA
            </p>
          </div>

          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <button
                aria-label="Zoom out"
                className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
                onClick={() => setZoom(Math.max(50, zoom - 20))}
                disabled={zoom <= 50}
                title="Zoom out"
              >
                <ZoomOut className="h-5 w-5" />
              </button>
              <span className="min-w-[3.5rem] text-center text-sm font-semibold">{zoom}%</span>
              <button
                aria-label="Zoom in"
                className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
                onClick={() => setZoom(Math.min(200, zoom + 20))}
                disabled={zoom >= 200}
                title="Zoom in"
              >
                <ZoomIn className="h-5 w-5" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                aria-label="Fullscreen"
                className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                onClick={handleFullscreen}
                title="Fullscreen view"
              >
                <Maximize2 className="h-5 w-5" />
              </button>
              <button
                aria-label="Share flyer"
                className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                onClick={handleShare}
                title="Share flyer"
              >
                <Share2 className="h-5 w-5" />
              </button>
              <button
                aria-label="Download flyer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors text-sm font-semibold"
                onClick={handleDownload}
              >
                <Download className="h-4 w-4" />
                Download
              </button>
            </div>
          </div>

          {/* Image Container */}
          <div
            id="flyer-full-page"
            className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl overflow-hidden flex items-center justify-center p-4 max-h-[70vh] overflow-y-auto"
          >
            <img
              src="/flyer.png"
              alt="2026 Southeastern Women's & Girls Chess Championship - Mother's Day Weekend May 9th - $5,000 Prize Fund Guaranteed - Atlanta Chinese Christian Church - Women from all states eligible"
              className="w-full h-auto transition-transform duration-300"
              style={{ transform: `scale(${zoom / 100})` }}
            />
          </div>

          {/* Info Section */}
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-bold text-foreground mb-2">📅 When</h3>
              <p className="text-muted-foreground">
                Saturday, May 9th, 2026
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-bold text-foreground mb-2">📍 Where</h3>
              <p className="text-muted-foreground">
                Atlanta Chinese Christian Church<br />
                4434 Britt Rd, Tucker, GA
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-bold text-foreground mb-2">🏆 Prize</h3>
              <p className="text-muted-foreground">
                $5,000+ Guaranteed Prize Fund
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <a
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-primary to-pink-600 text-white hover:shadow-lg transition-shadow text-lg font-semibold"
            >
              Register Now
            </a>
            <p className="text-sm text-muted-foreground mt-3">
              Women from all states are eligible for cash prizes
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
