"use client";

import { useWishlist } from "@/lib/wishlist-context";

export function WishlistButton({
  handle,
  className = "",
}: {
  handle: string;
  className?: string;
}) {
  const { has, toggle } = useWishlist();
  const active = has(handle);
  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
      onClick={() => toggle(handle)}
      className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-mist hover:border-charcoal transition-colors ${
        active ? "bg-burgundy text-cream border-burgundy" : ""
      } ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path
          d="M12 21s-7-4.5-9.5-9.5C1 7 4 4 7 4c2 0 3.5 1 5 3 1.5-2 3-3 5-3 3 0 6 3 4.5 7.5C19 16.5 12 21 12 21z"
          fill={active ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
