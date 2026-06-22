import { defineConfig } from "vite";

export default defineConfig({
  base: "/Cardarp-Dex/",
  root: ".",
  publicDir: "public",
  build: {
    outDir: "dist",
    emptyOutDir: true
  }
});