/** Official CAELIA palette — use these hexes everywhere colour is authored. */
export const BRAND = {
  burgundy: "#4a0e16",
  cacao: "#604c46",
  crema: "#e7d4c0",
  rosa: "#dfc0b4",
} as const

export type BrandColor = keyof typeof BRAND
