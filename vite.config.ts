import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ command, isPreview }) => ({
  base: command === 'build' || isPreview ? '/orchard-store/' : '/',
  plugins: [react(), svgr()],
}));
