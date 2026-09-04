import type { ProductImage } from "@/lib/types";

/** Native scroll-snap carousel. Works without JS. */
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
      <div
        id={id}
        className="flex aspect-square w-full overflow-x-auto snap-x snap-mandatory scroll-smooth bg-cream-deep"
        style={{ scrollbarWidth: "thin" }}
      >
        {images.map((img, i) => (
          <figure
            key={img.src}
            id={`${id}-${i}`}
            className="relative h-full w-full min-w-full shrink-0 snap-center snap-always"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.alt}
              className="h-full w-full object-cover"
              draggable={false}
            />
          </figure>
        ))}
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
