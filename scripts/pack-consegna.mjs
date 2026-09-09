import { createWriteStream } from "node:fs";
import { cpSync, mkdirSync, rmSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import { execFileSync } from "node:child_process";

const root = "/workspace";
const staging = join(root, "artifacts", "consegna");
const campaign = join(root, "public", "campaign");
const products = join(root, "public", "products");
const theme = join(root, "shopify-theme");
const out = join(root, "public", "theme", "HgPaid-7kQ2mN9vL", "caelia-shopify-theme.zip");

rmSync(staging, { recursive: true, force: true });
mkdirSync(join(staging, "immagini", "01-burgundy-berry"), { recursive: true });
mkdirSync(join(staging, "immagini", "02-rosa-nude"), { recursive: true });
mkdirSync(join(staging, "immagini", "03-marrone"), { recursive: true });
mkdirSync(join(staging, "immagini", "04-lifestyle"), { recursive: true });
mkdirSync(join(staging, "immagini", "05-video-hero"), { recursive: true });
mkdirSync(join(staging, "immagini", "06-dettagli-zoom"), { recursive: true });
mkdirSync(join(staging, "immagini", "07-ecommerce-schede"), { recursive: true });
mkdirSync(join(staging, "tema"), { recursive: true });

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, acc);
    else acc.push(p);
  }
  return acc;
}

function destFor(name, rel) {
  const n = `${rel} ${name}`.toLowerCase();
  if (/\.(mp4|webm)$/i.test(name)) return "05-video-hero";
  if (/(pin-|zoom-|anatomy|infographic|stitch|pocket|mirror|wordmark|logo-zoom|close-)/.test(n))
    return "06-dettagli-zoom";
  if (/(life-|lifestyle-|fruit-|vanity|meadow|portrait|flowers|apply|hold)/.test(n))
    return "04-lifestyle";
  if (/(cacao|marrone)/.test(n)) return "03-marrone";
  if (/(rosa|crema|avorio|nude|pink)/.test(n)) return "02-rosa-nude";
  if (/(berry|burgundy|drip|due-seq|edit-drip|logo-drip|splash-burgundy|packshot-berry|pair-berry|model-berry)/.test(n))
    return "01-burgundy-berry";
  return "01-burgundy-berry";
}

for (const file of walk(campaign)) {
  const name = file.split("/").pop();
  const folder = destFor(name, file.replace(campaign, ""));
  cpSync(file, join(staging, "immagini", folder, name));
}
for (const file of walk(products)) {
  const name = file.split("/").pop();
  cpSync(file, join(staging, "immagini", "07-ecommerce-schede", name));
}

writeFileSync(
  join(staging, "LEGGIMI.txt"),
  `CAELIA — consegna file
=======================

1. TEMA SHOPIFY
   Apri la cartella tema/
   Carica caelia-os2.zip in Shopify Admin → Online Store → Themes → Upload
   Poi Publish.

2. IMMAGINI PRODOTTO
   Usa le cartelle in immagini/ come foto dei 3 prodotti.

   01-burgundy-berry   → prodotto handle burgundy-caelia
   02-rosa-nude        → prodotto handle crema-caelia
   03-marrone          → prodotto handle cacao-caelia
   04-lifestyle        → pagine Storia / lookbook
   05-video-hero       → hero e sezioni film (mp4)
   06-dettagli-zoom    → tasca, cucitura, logo, specchio
   07-ecommerce-schede → extra per le schede

   In Shopify: Products → [colore] → Media → upload.
   Consigliati in prima posizione: pair-berry.jpg / pair-rosa.jpg / pair-cacao.jpg

3. CSV
   Dentro il tema: products.csv — import Products → Import.

4. CONFIG
   Dentro il tema: CONFIG.md — colori, menu, collezione caelia, Payments.

Dopo il pagamento questo zip si sblocca da /download.
`,
);

writeFileSync(
  join(staging, "immagini", "LEGGIMI-immagini.txt"),
  `Assegna le copertine:
- Burgundy Berry → 01-burgundy-berry/pair-berry.jpg
- Rosa nude     → 02-rosa-nude/pair-rosa.jpg
- Marrone       → 03-marrone/pair-cacao.jpg
`,
);

execFileSync("python3", [
  "-c",
  `
import zipfile
from pathlib import Path
theme = Path("/workspace/shopify-theme")
out = Path("/workspace/artifacts/consegna/tema/caelia-os2.zip")
with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
    for p in theme.rglob("*"):
        if p.is_file() and p.name != ".DS_Store":
            z.write(p, p.relative_to(theme).as_posix())
outer = Path("/workspace/public/theme/HgPaid-7kQ2mN9vL/caelia-shopify-theme.zip")
src = Path("/workspace/artifacts/consegna")
with zipfile.ZipFile(outer, "w", zipfile.ZIP_DEFLATED) as z:
    for p in src.rglob("*"):
        if p.is_file() and p.name != ".DS_Store":
            z.write(p, p.relative_to(src).as_posix())
print("ok", outer.stat().st_size)
`,
]);
