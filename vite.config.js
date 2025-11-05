import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

const isProd = process.env.NODE_ENV === "production"

// https://vitejs.dev/config/
export default defineConfig({
  base: isProd ? "/my-bank-app/" : "/", 
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
