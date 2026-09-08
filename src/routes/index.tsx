import { createFileRoute } from "@tanstack/react-router";
import { HomeCampaign, WorkRow, FilmChapter } from "@/components/home-campaign";
import { ProductInfoMap } from "@/components/product-info-map";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <>
      <HomeCampaign />
      <FilmChapter
        n="01"
        title="Due pezzi."
        body="Astuccio e specchio, in caduta. Poi il gloss li prende."
        video="/campaign/splash-burst.mp4"
        poster="/campaign/splash-burst.jpg"
        alt="Astuccio e specchio nel gloss berry"
      />
      <FilmChapter
        n="02"
        title="La caduta."
        body="Il gloss copre la pelle. Il logo resta inciso."
        src="/campaign/edit-drip.jpg"
        alt="Gloss sul logo CAELIA"
        tone="rosa"
      />
      <WorkRow />
      <FilmChapter
        n="03"
        title="Il gesto."
        body="Rosa nude in mano. Cinque matite, uno specchio."
        src="/campaign/life-apply.jpg"
        alt="Il gesto con Rosa nude"
      />
      <FilmChapter
        n="04"
        title="Tutto intorno."
        body="Peonie, gloss, pennelli. L’astuccio al centro."
        src="/campaign/life-flatlay.jpg"
        alt="Still life Rosa nude"
        tone="rosa"
      />
      <ProductInfoMap />
    </>
  );
}
