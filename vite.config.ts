import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? "/MAS/" : "/",
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(import.meta.dirname, "client", "src") } },
  root: path.resolve(import.meta.dirname, "client"),
  build: { outDir: path.resolve(import.meta.dirname, "dist"), emptyOutDir: true },
  server: { host: true, allowedHosts: true },
});
