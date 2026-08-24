import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://maquette.ro',
  i18n: {
    defaultLocale: 'ro',
    locales: ['ro', 'en'],
    routing: { prefixDefaultLocale: true },
  },
  redirects: {
    '/': '/ro/',
    // /lucrari s-a șters: era o dublură a homepage-ului și promitea
    // studii de caz care nu există. Se reface la primul acord scris.
    '/ro/lucrari': '/ro/blueprint',
    '/en/work': '/en/blueprint',
  },
  vite: { plugins: [tailwind()] },
});
