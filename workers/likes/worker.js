/**
 * Contorul de like-uri pentru /projects — Cloudflare Worker + KV.
 * Nu face parte din build-ul site-ului; se deployează manual (vezi README.md).
 *
 *   GET  /?id=<slug>          → { count }
 *   POST { "id": "<slug>" }   → { count }  (incrementat)
 *
 * Slug-urile sunt lista închisă a exponatelor — orice altceva primește 400,
 * ca să nu se poată umple KV-ul cu chei arbitrare.
 */
const SLUGS = new Set(['declutter', 'gigtim']);

/* Origin-urile care au voie să citească/scrie. Pentru test local,
   adaugă temporar originul lui `npm run preview`. */
const ORIGINS = new Set(['https://maquette.ro', 'http://localhost:4321']);

function headers(req) {
  const origin = req.headers.get('origin') ?? '';
  return {
    'content-type': 'application/json',
    'access-control-allow-origin': ORIGINS.has(origin) ? origin : 'https://maquette.ro',
    'access-control-allow-methods': 'GET, POST, OPTIONS',
    'access-control-allow-headers': 'content-type',
  };
}

export default {
  async fetch(req, env) {
    const h = headers(req);
    if (req.method === 'OPTIONS') return new Response(null, { headers: h });

    let id;
    if (req.method === 'GET') {
      id = new URL(req.url).searchParams.get('id');
    } else if (req.method === 'POST') {
      id = (await req.json().catch(() => ({}))).id;
    } else {
      return new Response(JSON.stringify({ error: 'method not allowed' }), { status: 405, headers: h });
    }

    if (!SLUGS.has(id)) {
      return new Response(JSON.stringify({ error: 'unknown id' }), { status: 400, headers: h });
    }

    let count = parseInt((await env.LIKES.get('likes:' + id)) ?? '0', 10) || 0;
    if (req.method === 'POST') {
      /* KV nu e atomic — la trafic mic (like-uri pe un site de studio),
         un increment pierdut ocazional e acceptabil. */
      count += 1;
      await env.LIKES.put('likes:' + id, String(count));
    }
    return new Response(JSON.stringify({ count }), { headers: h });
  },
};
