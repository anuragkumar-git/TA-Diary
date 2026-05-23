import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "pwa.png", "pwa1.png"
      ],
      manifest: {
        name: "T.A. Diary",
        short_name: "T.A.",
        description: "An offline-first Travel Allowance diary PWA it lets the user create monthly diaries, record travel duty entries and leave entries.",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/pwa.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/pwa1.png",
            sizes: "512x512",
            type: "image/png"
          },
        ]
      },
      workbox: {
        globPatterns: [
          "**/*.{js, css, html, png, svg, woff2}"
        ]
      }
    })
  ],
})