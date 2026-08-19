import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { imageManifestPlugin } from './vite-plugin-image-manifest.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), imageManifestPlugin('partners')],
})
