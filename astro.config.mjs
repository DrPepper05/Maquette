import { defineConfig, fontProviders } from 'astro/config';
import tailwind from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://maquette.ro',

  /* Vechile rute bilingve. Site-ul e doar în engleză din 2026-08-24. */
  redirects: {
    '/ro': '/',
    '/en': '/',
    '/ro/blueprint': '/blueprint',
    '/en/blueprint': '/blueprint',
    '/ro/servicii': '/',
    '/en/services': '/',
    '/ro/cum-lucram': '/contact',
    '/en/how-we-work': '/contact',
    '/ro/contact': '/contact',
    '/en/contact': '/contact',
    '/ro/lab': '/lab',
    '/en/lab': '/lab',
    '/ro/lucrari': '/blueprint',
    '/en/work': '/blueprint',
  },

  /* Fonturi self-hostate la build — CDN-ul Google era render-blocking
     și cel mai mare cost de LCP din site. */
  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: 'Figtree',
        cssVariable: '--font-figtree',
        weights: [300, 400, 600, 700],
        styles: ['normal'],
        subsets: ['latin'],
        fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      {
        provider: fontProviders.google(),
        name: 'JetBrains Mono',
        cssVariable: '--font-jbmono',
        weights: [500, 600],
        styles: ['normal'],
        subsets: ['latin'],
        fallbacks: ['ui-monospace', 'monospace'],
      },
    ],
  },

  vite: { plugins: [tailwind()] },
});
