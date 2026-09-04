import type { ProductImage } from "@/lib/types";

/** Native scroll-snap carousel. Images keep a square frame. */
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
      <div className="relative w-full aspect-square bg-cream-deep">
        <div
          id={id}
          className="absolute inset-0 flex overflow-x-auto snap-x snap-mandatory scroll-smooth"
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
              />
            </figure>
          ))}
        </div>
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {images.map((img, i) => (
            <a
              key={img.src}
              href={`#${id}-${i}`}
              className="block h-16 w-16 shrink-0 overflow-hidden ring-1 ring-mist/50"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt="" className="h-full w-full object-cover" />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
