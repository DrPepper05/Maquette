# Contorul de like-uri (`/projects`)

Un Cloudflare Worker minim + KV. Butonul Like de pe `/projects` se randează
**doar** dacă `PUBLIC_LIKES_ENDPOINT` e setat la build-ul site-ului.

## Deploy (o singură dată)

```sh
npm i -g wrangler
wrangler login
cd workers/likes
wrangler kv namespace create LIKES     # copiază id-ul afișat în wrangler.toml
wrangler deploy                        # afișează URL-ul worker-ului
```

Apoi, la build-ul site-ului:

```sh
PUBLIC_LIKES_ENDPOINT="https://maquette-likes.<account>.workers.dev" npm run build
```

## Ce face

- `GET /?id=declutter` → `{ "count": 3 }`
- `POST {"id":"declutter"}` → incrementează și întoarce noul `count`
- Slug-uri necunoscute → 400 (lista închisă e în `worker.js`; se extinde acolo
  când apare un exponat nou).
- CORS e limitat la `maquette.ro` + `localhost:4321` (pentru `npm run preview`).

Contoarele pornesc de la zero și **nu se seedează** — zeroul onest e regula
brandului (vezi `docs/brand.md`).
