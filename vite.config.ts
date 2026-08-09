import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { partnersManifestPlugin } from './vite-plugin-partners-manifest.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), partnersManifestPlugin()],
})
