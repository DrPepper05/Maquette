# Maquette — brief de asset-uri vizuale

> Ce ai de făcut tu. Eu am scris prompturile, tu le rulezi în Midjourney și pui fișierele în `public/img/`.
> Un abonament Basic de $10 e suficient. Drepturile comerciale sunt incluse cât timp firma e sub $1M cifră de afaceri pe an.

---

## 1. Regula care contează mai mult decât orice prompt

**Fundalul trebuie să fie negru pur.** Nu gri închis, nu negru cu vignetă, nu negru cu gradient.

Imaginea se așază în pagină fără chenar, fără card, fără mască. Fundalul ei *devine* fundalul site-ului. Dacă e gri `#0F0F12` în loc de `#000000`, se vede un dreptunghi pe pagină și tot efectul dispare.

**Cum verifici în 5 secunde:** deschide imaginea, uită-te în colțuri. Dacă vezi vreo diferență de ton față de restul negrului, o regenerezi. Diferențele mici le pot corecta eu cu procesare, dar un gradient vizibil nu se repară.

**Al doilea criteriu de refuz:** subiect centrat cu spațiu gol în jur. Ne trebuie forme care **ies din cadru** pe cel puțin două margini — altfel nu se pot topi în pagină, se vor citi ca „poză pusă acolo".

---

## 2. Cum le rulezi

1. Deschizi Midjourney, lipești promptul exact cum e scris
2. Din cele 4 variante, alegi una și dai **Upscale**
3. Descarci la rezoluția maximă
4. Redenumești exact cum scrie mai jos și pui în `~/Desktop/site_Firma/public/img/`

Nu le converti și nu le redimensiona — le procesez eu.

Dacă versiunea din prompt (`--v 8.1`) nu mai e cea curentă, schimbă cu ce e la zi. Restul parametrilor rămân.

---

## 3. Stilul comun — de ce toate cele 7 arată ca o familie

Toate prompturile se termină cu același bloc de stil. **Nu-l modifica** — el ține site-ul unitar. Ce se schimbă între ele e doar subiectul și încadrarea.

```
intricate white filament structure, thin interconnected strands,
pure black background, dramatic rim lighting, high contrast monochrome,
extreme detail, macro render, deep negative space, no gradient, no vignette
```

---

## 4. Cele șapte prompturi

### 01 — Homepage → `hero-home.png`
Cel mai dens și cel mai complex. Miezul iese din colțul dreapta-sus, firele lungi curg spre stânga-jos și se sting.

```
a dense knotted core of intricate white filaments unraveling into long
trailing threads that dissolve into darkness, organic neural network
structure, asymmetric composition weighted to the upper right, intricate
white filament structure, thin interconnected strands, pure black
background, dramatic rim lighting, high contrast monochrome, extreme
detail, macro render, deep negative space, no gradient, no vignette
--ar 3:2 --style raw --stylize 250 --v 8.1
```

### 02 — `/blueprint` → `hero-blueprint.png`
Mai aerisit. Pagina are mult text și prețul, imaginea nu are voie să concureze.

```
a sparse skeletal lattice of fine white filaments, mostly empty space,
delicate and precise, a few strands crossing, intricate white filament
structure, thin interconnected strands, pure black background, dramatic
rim lighting, high contrast monochrome, extreme detail, macro render,
deep negative space, no gradient, no vignette
--ar 3:2 --style raw --stylize 200 --v 8.1
```

### 03 — `/servicii` → `hero-services.png`
Vertical, coloană în dreapta.

```
a vertical column of woven white filaments rising and branching, tall
narrow composition, threads escaping top and bottom edges, intricate
white filament structure, thin interconnected strands, pure black
background, dramatic rim lighting, high contrast monochrome, extreme
detail, macro render, deep negative space, no gradient, no vignette
--ar 2:3 --style raw --stylize 250 --v 8.1
```

### 04 — `/cum-lucram` → `hero-process.png`
Bandă joasă, orizontală. Stă sub text, nu lângă.

```
a low horizontal ribbon of parallel white filaments drifting sideways,
wide panoramic composition, strands entering from left and exiting right,
intricate white filament structure, thin interconnected strands, pure
black background, dramatic rim lighting, high contrast monochrome,
extreme detail, macro render, deep negative space, no gradient, no vignette
--ar 21:9 --style raw --stylize 200 --v 8.1
```

### 05 — `/lucrari` → `hero-work.png`
Foarte discret. Studiile de caz sunt vedeta, nu imaginea.

```
a few isolated white filaments scattered across vast emptiness, minimal,
restrained, ninety percent black, intricate white filament structure,
thin interconnected strands, pure black background, dramatic rim lighting,
high contrast monochrome, extreme detail, macro render, deep negative
space, no gradient, no vignette
--ar 3:2 --style raw --stylize 150 --v 8.1
```

### 06 — `/contact` → `hero-contact.png`
Mic, într-un colț.

```
a small tight knot of white filaments in the corner of the frame, compact,
the rest pure emptiness, intricate white filament structure, thin
interconnected strands, pure black background, dramatic rim lighting,
high contrast monochrome, extreme detail, macro render, deep negative
space, no gradient, no vignette
--ar 1:1 --style raw --stylize 200 --v 8.1
```

### 07 — `/lab` → `hero-lab.png`
Mai organic, mai biologic — se potrivește cu Declutter.

```
an organic cellular cluster of white filaments, membranes stretched
between strands, biological and soft, intricate white filament structure,
thin interconnected strands, pure black background, dramatic rim lighting,
high contrast monochrome, extreme detail, macro render, deep negative
space, no gradient, no vignette
--ar 3:2 --style raw --stylize 300 --v 8.1
```

---

## 5. Dacă familia asta nu-ți place

Nu le genera pe toate șapte până nu vezi prima. **Rulează întâi 01, uită-te la ea, și spune-mi.** Dacă nu-ți place registrul, schimbăm familia și rescriu toate cele șapte — costă cinci minute.

Două familii alternative, dacă filamentele nu te conving:

**Metal lichid** — înlocuiește primul bloc din fiecare prompt cu:
```
flowing liquid metal forms, mercury surface tension, sharp specular
highlights, molten chrome
```

**Cerneală în apă** — sau cu:
```
ink diffusing in water, smoke tendrils, soft volumetric density,
suspended particles
```

Restul blocului de stil rămâne identic în ambele cazuri.

---

## 6. Ce fac eu după ce le pui în folder

- Convertesc la WebP și tai din greutate (de la ~4 MB la ~130 KB fiecare)
- Forțez negrul la `#000000` pur dacă Midjourney a scos un gri apropiat
- Le încadrez pe fiecare pagină și verific pe 1440px și pe 390px că nu se vede nicio margine

**Nu-ți face griji de dimensiune sau format.** Vreau fișierele exact cum le descarci.
