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
        body="Specchio in mano, matite in tasca. Anche in volo."
        src="/campaign/life-plane.jpg"
        alt="CAELIA in viaggio"
      />
      <FilmChapter
        n="04"
        title="Carla."
        body="Burgundy Berry, lo stesso oggetto."
        src="/campaign/life-carla.jpg"
        alt="Carla con CAELIA Burgundy Berry"
      />
        n="05"
        body="I tre colori, insieme. Peonie, vanity, lo stesso gesto."
        src="/campaign/lifestyle-trio.jpg"
        alt="Burgundy Berry, Rosa nude e Marrone"
      />
      <ProductInfoMap />
    </>
  );
}
