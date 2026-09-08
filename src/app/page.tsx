import { ProductInfoMap } from "@/components/product-info-map";
import { Caelia3DExplorer } from "@/components/caelia-3d-explorer";
import {
  HomeCampaign,
  CampaignStudio,
  ChapterGrid,
  RitualBlock,
} from "@/components/motion/home-campaign";

export default function Home() {
  return (
    <>
      <HomeCampaign />
      <ProductInfoMap />
      <Caelia3DExplorer />
      <CampaignStudio />
      <RitualBlock />
      <ChapterGrid />
      <section className="border-t border-mist/40 bg-cream">
        <div className="shell-narrow py-10 text-center text-[10px] uppercase tracking-[0.22em] text-ink/40 sm:text-[11px] md:py-14">
          Italia · Pelle vegana · Resi 30 giorni
        </div>
      </section>
    </>
  );
}
