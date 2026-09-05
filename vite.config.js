import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

function copyRootAssets() {
  return {
    name: 'copy-root-assets',
    closeBundle() {
      const source = path.resolve('assets');
      const destination = path.resolve('dist/assets');
      if (!fs.existsSync(source)) return;
      fs.mkdirSync(destination, { recursive: true });
      for (const file of fs.readdirSync(source)) {
        const from = path.join(source, file);
        const to = path.join(destination, file);
        if (fs.statSync(from).isFile()) fs.copyFileSync(from, to);
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), copyRootAssets()],
  build: {
    target: 'es2020',
    sourcemap: false,
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
  },
});
