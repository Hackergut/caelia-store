import { BRAND } from "@/lib/brand"

export interface CaeliaVariant {
  id: string
  name: string
  /** PBR albedo — official leather hex */
  base: string
  /** darker shade used for logo deboss / crevices */
  dark: string
  /** stitching thread color (tone-on-tone) */
  stitch: string
  /** subtle sheen tint */
  sheen: string
  /** official leather hex, used by catalog swatches */
  swatch: string
  roughness: number
  description: string
}

/**
 * Leather colourways — official CAELIA palette.
 *
 *   Burgundy  #4a0e16
 *   Cacao     #604c46
 *   Crema     #e7d4c0
 *   Rosa      #dfc0b4  (brand tint, not a catalog SKU)
 */
export const CAELIA_VARIANTS: CaeliaVariant[] = [
  {
    id: "burgundy",
    name: "Burgundy Caelia",
    swatch: BRAND.burgundy,
    base: BRAND.burgundy,
    dark: "#2e070d",
    stitch: "#7a2630",
    sheen: "#6b3038",
    roughness: 0.52,
    description: "Bordeaux maison #4a0e16",
  },
  {
    id: "cacao",
    name: "Cacao Caelia",
    swatch: BRAND.cacao,
    base: BRAND.cacao,
    dark: "#3e302c",
    stitch: "#7a6560",
    sheen: "#8a7570",
    roughness: 0.55,
    description: "Cuoio cacao #604c46",
  },
  {
    id: "crema",
    name: "Crema Caelia",
    swatch: BRAND.crema,
    base: BRAND.crema,
    dark: "#c4ae96",
    stitch: "#d4c0aa",
    sheen: "#f3e6d6",
    roughness: 0.58,
    description: "Pelle crema #e7d4c0",
  },
]

const SWATCH_ALIASES: Record<string, string> = {
  [BRAND.burgundy]: "burgundy",
  "#2e070d": "burgundy",
  "#7a2630": "burgundy",
  "#5c2e38": "burgundy",
  "#6b333d": "burgundy",
  "#d49b96": "burgundy",
  [BRAND.cacao]: "cacao",
  "#3e302c": "cacao",
  "#6d403b": "cacao",
  "#7b443b": "cacao",
  "#7b5644": "cacao",
  [BRAND.crema]: "crema",
  "#e5d1bd": "crema",
  "#ead6c2": "crema",
  "#efe5d8": "crema",
  "#f7f1ea": "crema",
}

export function leatherBySwatch(swatch: string | undefined): CaeliaVariant {
  if (!swatch) return CAELIA_VARIANTS[0]
  const hex = swatch.toLowerCase()
  const aliased = SWATCH_ALIASES[hex]
  if (aliased) return leatherById(aliased)
  return (
    CAELIA_VARIANTS.find((v) => v.swatch === hex || v.base === hex) ?? CAELIA_VARIANTS[0]
  )
}

export function leatherById(id: string): CaeliaVariant {
  return CAELIA_VARIANTS.find((v) => v.id === id) ?? CAELIA_VARIANTS[0]
}
