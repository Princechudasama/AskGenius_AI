import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/search':{
        target:'https://askgenius-ai-latest.onrender.com',
        changeOrigin:true,
      },
    },
  },
})
