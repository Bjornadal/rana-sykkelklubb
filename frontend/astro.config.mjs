// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://bjornadal.github.io',
  base: '/rana-sykkelklubb',
  vite: {
    plugins: [tailwindcss()],
  },
});
