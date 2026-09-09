import { createFileRoute } from "@tanstack/react-router";
import { HomeCampaign, WorkRow, FilmChapter } from "@/components/home-campaign";
import { ProductInfoMap } from "@/components/product-info-map";
import { ScrollDrip } from "@/components/scroll-drip";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <>
      <HomeCampaign />
      <ScrollDrip />
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
        body="I tre colori, insieme. Peonie, vanity, lo stesso gesto."
        src="/campaign/lifestyle-trio.jpg"
        alt="Burgundy Berry, Rosa nude e Marrone"
      />
      <ProductInfoMap />
    </>
  );
}
