export interface CaeliaVariant {
  id: string
  name: string
  /** PBR albedo — photo mid-tone lifted for ACES so the render matches the stills */
  base: string
  /** darker shade used for logo deboss / crevices */
  dark: string
  /** stitching thread color (tone-on-tone, as in the product photos) */
  stitch: string
  /** subtle sheen tint */
  sheen: string
  /** exact leather mid-tone sampled from public/products/*-pair.jpg */
  swatch: string
  roughness: number
  description: string
}

/**
 * Leather colours sampled from the published product stills
 * (burgundy/cacao/crema-caelia-pair.jpg), not the UI brand tokens.
 *
 *   Burgundy leather  #5c2e38
 *   Cacao leather     #6d403b
 *   Crema leather     #e5d1bd
 */
export const CAELIA_VARIANTS: CaeliaVariant[] = [
  {
    id: "burgundy",
    name: "Burgundy Caelia",
    swatch: "#5c2e38",
    base: "#6b333d",
    dark: "#3d1c22",
    stitch: "#704048",
    sheen: "#8a555c",
    roughness: 0.52,
    description: "Bordeaux maison, come nelle foto prodotto",
  },
  {
    id: "cacao",
    name: "Cacao Caelia",
    swatch: "#6d403b",
    base: "#7b443b",
    dark: "#4a2a27",
    stitch: "#8a5a54",
    sheen: "#9a6a64",
    roughness: 0.55,
    description: "Cuoio cacao caldo, come nelle foto prodotto",
  },
  {
    id: "crema",
    name: "Crema Caelia",
    swatch: "#e5d1bd",
    base: "#ead6c2",
    dark: "#c4ae96",
    stitch: "#d4c0aa",
    sheen: "#f3e6d6",
    roughness: 0.58,
    description: "Pelle crema, avorio caldo come nelle foto prodotto",
  },
]

const SWATCH_ALIASES: Record<string, string> = {
  "#5c2e38": "burgundy",
  "#6b333d": "burgundy",
  "#4a0e16": "burgundy",
  "#7a2630": "burgundy",
  "#d49b96": "burgundy",
  "#6d403b": "cacao",
  "#7b443b": "cacao",
  "#7b5644": "cacao",
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
