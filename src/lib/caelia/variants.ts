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
    id: 'cognac',
    name: 'Cognac',
    base: '#97643c',
    dark: '#5f3a1e',
    stitch: '#d3a06b',
    sheen: '#c98f5f',
    swatch: 'linear-gradient(135deg,#b5814f 0%,#94623c 100%)',
    description: 'Cuoio caldo ispirato alla pelle naturale toscana',
  },
  {
    id: 'blush',
    name: 'Blush',
    base: '#d0a093',
    dark: '#96685e',
    stitch: '#b3837a',
    sheen: '#eec0b2',
    swatch: 'linear-gradient(135deg,#e2b8ab 0%,#cf9c8d 100%)',
    description: 'Rosa cipria delicato, finitura opaca setosa',
  },
  {
    id: 'bordeaux',
    name: 'Bordeaux',
    base: '#5d1f2e',
    dark: '#360d16',
    stitch: '#a2556a',
    sheen: '#8a3a4c',
    swatch: 'linear-gradient(135deg,#7c3243 0%,#58202d 100%)',
    description: 'Rosso vino intenso, carattere deciso',
  },
]
