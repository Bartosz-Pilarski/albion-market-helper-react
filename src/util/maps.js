const numberToNumeral = {
  2: "II",
  3: "III",
  4: "IV",
  5: "V",
  6: "VI",
  7: "VII",
  8: "VIII"
}

const resources = {
  METAL: {
    RAW: 'ORE',
    REFINED: 'METALBAR'
  },
  WOOD: {
    RAW: 'WOOD',
    REFINED: 'PLANKS'
  },
  FIBER: {
    RAW: 'FIBER',
    REFINED: 'CLOTH'
  },
  STONE: {
    RAW: 'ROCK',
    REFINED: 'STONEBLOCK'
  },
  HIDE: {
    RAW: 'HIDE',
    REFINED: 'LEATHER'
  }
}

const resourcesReverse = {
  METALBAR: {
    TYPE: 'METAL'
  },
  ORE: {
    TYPE: 'METAL'
  },
  WOOD: {
    TYPE: 'WOOD'
  },
  PLANKS: {
    TYPE: 'WOOD'
  },
  FIBER: {
    TYPE: 'FIBER'
  },
  CLOTH: {
    TYPE: 'FIBER'
  },
  ROCK: {
    TYPE: 'STONE'
  },
  STONEBLOCK: {
    TYPE: 'STONE'
  },
  HIDE: {
    TYPE: 'HIDE'
  },
  LEATHER: {
    TYPE: 'HIDE'
  }
}

const translateLocation = {
  'Bridgewatch': { 
    classname: 'bridgewatch',
    initials: 'BW'
  },
  'Caerleon': { 
    classname: 'caerleon',
    initials: 'CL'
  },
  'Fort Sterling': { 
    classname: 'fortsterling',
    initials: 'FS'
  },
  'Lymhurst': { 
    classname: 'lymhurst',
    initials: 'LH'
  },
  'Martlock': { 
    classname: 'martlock',
    initials: 'ML'
  },
  'Thetford': { 
    classname: 'thetford',
    initials: 'TF'
  },
}

export {
  numberToNumeral,
  resources,
  resourcesReverse,
  translateLocation
}