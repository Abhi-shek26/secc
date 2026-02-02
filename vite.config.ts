import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(async ({ mode }) => {
  const plugins = [react()];

  // Only load Replit-specific plugins in development and on Replit
  if (mode !== "production" && process.env.REPL_ID !== undefined) {
    const [runtimeErrorOverlay, cartographer, devBanner] = await Promise.all([
      import("@replit/vite-plugin-runtime-error-modal"),
      import("@replit/vite-plugin-cartographer"),
      import("@replit/vite-plugin-dev-banner"),
    ]);
    
    plugins.push(
      runtimeErrorOverlay.default(),
      cartographer.cartographer(),
      devBanner.devBanner()
    );
  }

  return {
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "client", "src"),
        "@shared": path.resolve(import.meta.dirname, "shared"),
        "@assets": path.resolve(import.meta.dirname, "attached_assets"),
      },
    },
    root: path.resolve(import.meta.dirname, "client"),
    build: {
      outDir: path.resolve(import.meta.dirname, "dist/public"),
      emptyOutDir: true,
    },
    server: {
      fs: {
        strict: true,
        deny: ["**/.*"],
      },
    },
  };
});
