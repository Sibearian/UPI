import { defineConfig } from "vite";
import { resolve } from 'path'
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
  server: { https: true, host: "0.0.0.0" }, // Not needed for Vite 5+
  plugins: [mkcert()],
  root: "src/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        pay: resolve(__dirname, "src/pay.html")
      },
    },
    outDir: "../dist"
  }
});
