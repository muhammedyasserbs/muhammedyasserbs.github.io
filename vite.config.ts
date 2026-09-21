import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    // Hashed vendor files stay cached between visits, while the app and its
    // below-the-fold chunk can load independently instead of one large HTML.
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-dom/client"],
          motion: ["framer-motion"],
          icons: ["lucide-react"],
        },
      },
    },
  },
  // Arena previews are proxied through a dynamic subdomain.
  server: {
    allowedHosts: [".e2b.app"],
  },
});
