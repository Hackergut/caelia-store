import type { ProductImage } from "@/lib/types";

/**
 * Native scroll-snap carousel.
 * Mobile: edge-to-edge square swipe rail + dot-style thumbs.
 * Desktop: main frame plus a thumbnail strip (grid on lg).
 */
export function ProductCarousel({
  images,
  id = "gallery",
}: {
  images: ProductImage[];
  id?: string;
}) {
  if (!images.length) return null;

  return (
    <div>
      <div className="relative aspect-square w-full overflow-hidden bg-cream-deep sm:rounded-sm">
        <div
          id={id}
          className="absolute inset-0 flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((img, i) => (
            <figure
              key={img.src}
              id={`${id}-${i}`}
              className="h-full w-full min-w-full shrink-0 snap-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                className="block h-full w-full object-cover"
                draggable={false}
                loading={i === 0 ? "eager" : "lazy"}
              />
            </figure>
          ))}
        </div>
      </div>

      {images.length > 1 && (
        <div className="snap-rail mt-3 gap-2">
          {images.map((img, i) => (
            <a
              key={img.src}
              href={`#${id}-${i}`}
              aria-label={`Immagine ${i + 1}`}
              className="block h-14 w-14 shrink-0 overflow-hidden ring-1 ring-mist/50 transition-opacity hover:opacity-80 sm:h-16 sm:w-16 lg:h-20 lg:w-20"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
