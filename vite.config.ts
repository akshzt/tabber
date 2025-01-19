import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        // Copy manifest to dist/
        {
          src: "src/manifest.json",
          dest: ".",
        },
        // Copy all icons etc. from public to dist/public
        {
          src: "public/*",
          dest: "public",
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    }
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      // Multi-entry build
      input: {
        // Call this entry 'popup', referencing the file in src/popup
        popup: resolve(__dirname, "src/popup/index.html"),

        // Background script
        background: resolve(__dirname, "src/background/background.ts"),
      },
      output: {
        // For each entry, if chunk.name === 'popup',place it in dist/popup
        // If chunk.name === 'background', place it in dist/background
        entryFileNames: (chunk) =>
          chunk.name === "background"
            ? "background/background.js"
            : "popup/[name].js",

        // If there's any CSS extracted, you might also want to place it similarly:
        chunkFileNames: "[name].js",
        assetFileNames: () => {
          // E.g. put CSS in popup/ if it belongs to popup
          return "[name][extname]";
        },
      },
    },
  },
});
