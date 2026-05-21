import { SAD_GAMER_PALETTE, BADDIE_PALETTE } from './sprites.js';

export const GAMER_ARCHETYPES = {
  jock: {
    label: 'JOCK',
    blurb: 'thinks "lmk" is communication',
    palette: SAD_GAMER_PALETTE,
    accessory: null,
  },
  nerd: {
    label: 'NERD',
    blurb: "has a spreadsheet, can't use it",
    palette: {
      ...SAD_GAMER_PALETTE,
      h: '#3a8a3a', H: '#1a5a1a',
      j: '#a8884a', J: '#6a5028',
      n: '#000',
      b: '#4a2a1a', B: '#2a1408',
    },
    accessory: 'glasses',
  },
  fboy: {
    label: 'F-BOY',
    blurb: 'opens with "wyd"',
    palette: {
      ...SAD_GAMER_PALETTE,
      h: '#ff66b3', H: '#a82e7a',
      j: '#0a0a0a', J: '#1a1a1a',
      n: '#ffd400',
      b: '#d4af37', B: '#7a5a14',
    },
    accessory: 'cap',
  },
  softboy: {
    label: 'SOFT BOY',
    blurb: 'sends you a playlist instead of plans',
    palette: {
      ...SAD_GAMER_PALETTE,
      h: '#5a3a2a', H: '#3a1f12',
      j: '#e8c5d8', J: '#b08aa0',
      n: '#a07090',
      b: '#3a2a1a', B: '#1f1408',
    },
    accessory: 'beanie',
  },
};

export const BADDIE_ARCHETYPES = {
  alt: {
    label: 'ALT',
    blurb: 'eyeliner sharper than your wit',
    palette: BADDIE_PALETTE,
    accessory: null,
  },
  cleangirl: {
    label: 'CLEAN GIRL',
    blurb: 'pilates → matcha → unmatching you',
    palette: {
      ...BADDIE_PALETTE,
      h: '#3a2812', H: '#7a5a2a',
      p: '#f4f1e8', P: '#c9c4b5',
      d: '#1a1a1a', D: '#0a0a0a',
      g: '#d4af37',
      l: '#cf8a78',
    },
    accessory: null,
  },
  cowgirl: {
    label: 'COWGIRL',
    blurb: 'on her espresso tini coastal cowgirl arc',
    palette: {
      ...BADDIE_PALETTE,
      h: '#8a4a14', H: '#5a2a08',
      p: '#f4f1e8', P: '#b8a888',
      d: '#5a3a1a', D: '#2a1808',
      g: '#d4af37',
      l: '#c8425a',
    },
    accessory: 'cowboyhat',
  },
  egirl: {
    label: 'E-GIRL',
    blurb: "twitch sub at 3am couldn't save you",
    palette: {
      ...BADDIE_PALETTE,
      h: '#ff3a8a', H: '#a01a5a',
      p: '#0a0a0a', P: '#1f1f1f',
      d: '#6a3a8a', D: '#3a1a5a',
      g: '#c0c0c0',
      l: '#ff3a8a',
    },
    accessory: 'choker',
  },
};

export const ACCESSORIES = {
  glasses: {
    data: [
      '................',
      '................',
      '................',
      '................',
      '................',
      '................',
      '................',
      '..kkk..kk..kkk..',
      '..kgk..kk..kgk..',
      '..kkk..kk..kkk..',
    ],
    palette: { k: '#0a0a0a', g: '#bce0ff' },
  },
  cap: {
    data: [
      '................',
      '....kkkkkk......',
      '..kkjjjjjjk.....',
      '.kjjjjjjjjjkkkk.',
      '.kjjjjjjjjjjjjk.',
      '..kkkkkkkkkkkk..',
    ],
    palette: { k: '#0a0a0a', j: '#ff66b3' },
  },
  beanie: {
    data: [
      '................',
      '.....kkkkkk.....',
      '....kbbbbbbk....',
      '...kbbbbbbbbk...',
      '...kbbbbbbbbk...',
      '...kbbbbbbbbk...',
    ],
    palette: { k: '#0a0a0a', b: '#a86a3a' },
  },
  cowboyhat: {
    data: [
      '................',
      '....hhhhhhhh....',
      '...hccccccccch..',
      'hhhhccccccccchhh',
      '..hhhhhhhhhhhh..',
    ],
    palette: { h: '#3a1f08', c: '#8a5a28' },
  },
  choker: {
    data: [
      '................',
      '................',
      '................',
      '................',
      '................',
      '................',
      '................',
      '................',
      '................',
      '................',
      '....kkkkkkkk....',
      '....ksssssssk...',
    ],
    palette: { k: '#0a0a0a', s: '#c0c0c0' },
  },
};

export function getGamer(key) {
  return GAMER_ARCHETYPES[key] || GAMER_ARCHETYPES.jock;
}

export function getBaddie(key) {
  return BADDIE_ARCHETYPES[key] || BADDIE_ARCHETYPES.alt;
}
