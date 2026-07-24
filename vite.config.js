import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Exposes the server to your network/proxy
    port: 3001,
    strictPort: true, // Prevents Vite from auto-switching to 3001
    // allowedHosts: ['yourfrontenddomain.co.nz'] // Uncomment and add your domain if Vite blocks the host
  },
});
