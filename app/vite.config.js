import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const SERVER_PORT = 8080;

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/analyze-mood": {
        target: `http://localhost:${SERVER_PORT}`,
        changeOrigin: true,
      },
      "/tracks": {
        target: `http://localhost:${SERVER_PORT}`,
        changeOrigin: true,
      },
    },
  },
});
