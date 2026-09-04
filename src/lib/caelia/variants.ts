export interface CaeliaVariant {
  id: string
  name: string
  /** main leather color */
  base: string
  /** darker shade used for logo deboss / crevices */
  dark: string
  /** stitching thread color */
  stitch: string
  /** subtle sheen tint */
  sheen: string
  /** css swatch */
  swatch: string
  description: string
}

export const CAELIA_VARIANTS: CaeliaVariant[] = [
  {
    id: "burgundy",
    name: "Burgundy Caelia",
    base: "#4a0e16",
    dark: "#2e070d",
    stitch: "#7a2630",
    sheen: "#6b1a24",
    swatch: "linear-gradient(135deg,#7a2630 0%,#4a0e16 100%)",
    description: "Bordeaux intenso, il colore principale della maison",
  },
  {
    id: "cacao",
    name: "Cacao Caelia",
    base: "#7b5644",
    dark: "#5a3d2e",
    stitch: "#c4a07a",
    sheen: "#9a6d54",
    swatch: "linear-gradient(135deg,#9a6d54 0%,#7b5644 100%)",
    description: "Cuoio cacao caldo, ispirato alla pelle toscana",
  },
  {
    id: "crema",
    name: "Crema Caelia",
    base: "#efe5d8",
    dark: "#d4c4b0",
    stitch: "#c4b49e",
    sheen: "#f7f1ea",
    swatch: "linear-gradient(135deg,#f7f1ea 0%,#efe5d8 100%)",
    description: "Crema chiara, luminosa, discreta",
  },
]
