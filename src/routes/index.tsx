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
        body="Carla, Burgundy Berry in mano. Specchio e matita."
        src="/campaign/life-carla.jpg"
        alt="Carla con CAELIA Burgundy Berry"
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
