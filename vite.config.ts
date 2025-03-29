import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@core" : "/src/core",
      "@modules" : "/src/modules",
    },
  },
  server: {
    proxy: {
      "/api/docker": {
        target: "https://hub.docker.com/v2/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/docker/, ""),
      },
    },
  },
  
});