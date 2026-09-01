import { defineConfig, fontProviders } from 'astro/config';
import tailwind from '@tailwindcss/vite';

/* SITE/BASE_PATH vin din CI (GitHub Pages servește sub /Maquette/);
   local și pe domeniul final rămân valorile implicite. */
const base = process.env.BASE_PATH ?? '/';
/* Astro prefixează cu base doar sursele redirectărilor, nu destinațiile. */
const b = base.replace(/\/$/, '');

export default defineConfig({
  site: process.env.SITE ?? 'https://maquette.ro',
  base,

  /* Vechile rute bilingve (site doar în engleză din 2026-08-24)
     + /lab → /projects (redenumit 2026-08-25). */
  redirects: {
    '/ro': b + '/',
    '/en': b + '/',
    '/ro/blueprint': b + '/blueprint',
    '/en/blueprint': b + '/blueprint',
    '/ro/servicii': b + '/services',
    '/en/services': b + '/services',
    '/ro/cum-lucram': b + '/contact',
    '/en/how-we-work': b + '/contact',
    '/ro/contact': b + '/contact',
    '/en/contact': b + '/contact',
    '/lab': b + '/projects',
    '/ro/lab': b + '/projects',
    '/en/lab': b + '/projects',
    '/ro/lucrari': b + '/blueprint',
    '/en/work': b + '/blueprint',
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
