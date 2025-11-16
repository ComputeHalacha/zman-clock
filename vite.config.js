import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    legacy({
      targets: [
        'defaults',
        'Android >= 6',
        'ChromeAndroid >= 61',
        'iOS >= 12',
        'Safari >= 12'
      ],
      polyfills: [
        'es.promise',
        'es.array.includes',
        'es.string.includes',
        'es.object.assign',
        'es.array.find',
        'es.array.from'
      ],
      modernPolyfills: true
    })
  ],
  build: {
    target: ['es2015', 'chrome61', 'safari12'],
    cssTarget: 'chrome61'
  },
  esbuild: {
    target: 'es2015'
  }
});