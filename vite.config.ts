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
        {
          src: "src/popup/index.html",
          dest: "popup",
        }
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
        entryFileNames: ({ name }) => {
          if (name === "background") return "background/background.js";
          if (name === "popup") return "popup/index.js"; // Ensure popup JS lands correctly
          return "[name].js";
        },
        chunkFileNames: "[name].js",
        assetFileNames: "[name][extname]",
      },
    },
  },
});
