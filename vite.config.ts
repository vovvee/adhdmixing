import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Repository Pages: /adhdmixing/. For a custom domain set VITE_BASE_URL=/.
  base: process.env.VITE_BASE_URL ?? '/adhdmixing/',
  plugins: [react()],
})
