import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
  server: { https: true, host: "0.0.0.0" }, // Not needed for Vite 5+
  plugins: [mkcert()],
  root: "src/",
  build: { outDir: "../dist" },
});
