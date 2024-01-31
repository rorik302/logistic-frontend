import { fileURLToPath, URL } from "node:url"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { readFileSync } from "fs"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  server: {
    https: {
      cert: readFileSync("./certs/cert.pem"),
      key: readFileSync("./certs/key.pem")
    },
    host: "localhost.com"
  }
})
