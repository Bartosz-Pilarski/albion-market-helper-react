/**
 * Associative array translating numbers in the 2-8 range to roman numerals for aesthetic purposes.
 */
const numberToNumeral = {
  2: "II",
  3: "III",
  4: "IV",
  5: "V",
  6: "VI",
  7: "VII",
  8: "VIII"
}

/**
 * Associative array for looking up RAW and REFINED item counterparts of a given resource type.
 * @typedef {Object} Resources an object containing a RAW and REFINED property, containing the respective item names
 * @property {ResourceType} METAL
 * @property {ResourceType} WOOD
 * @property {ResourceType} FIBER
 * @property {ResourceType} STONE
 * @property {ResourceType} HIDE
 */
/** 
 * @typedef {Object} ResourceType
 * @property {string} RAW raw resource name
 * @property {string} REFINED refined resource name
*/
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

/**
 * Associtaive array that essentialy accomplishes the reverse of the Resources object.
 * Translates the names of RAW and REFINED resource to their respective TYPES
 * @typedef {Object} resourcesReverse
 * @property {Resource} METALBAR
 * @property {Resource} ORE
 * @property {Resource} WOOD
 * @property {Resource} PLANKS
 * @property {Resource} FIBER
 * @property {Resource} CLOTH
 * @property {Resource} ROCK
 * @property {Resource} STONEBLOCK
 * @property {Resource} HIDE
 * @property {Resource} LEATHER
 */
/**
 * @typedef {Object} Resource
 * @property {string} TYPE name of the resource type a given resource is associated with
 */
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

/**
 * Associative array translating the human-styled writing of location names to a more code-relevant one
 * Mostly here for consistency, but also because Fort Sterling needs to be squashed into one word every time
 * @typedef {Object} TranslateLocation
 * @property {Location} Bridgewatch
 * @property {Location} Caerleon
 * @property {Location} `Fort Sterling`
 * @property {Location} Lymhurst
 * @property {Location} Martlock
 * @property {Location} Thetford
 */
/**
 * @typedef {Object} Location
 * @property {String} classname location's name as used in CSS
 * @property {string} initials location's name as initials for shorthands
 */
const translateLocation = {
  Bridgewatch: { 
    classname: 'bridgewatch',
    initials: 'BW'
  },
  Caerleon: { 
    classname: 'caerleon',
    initials: 'CL'
  },
  'Fort Sterling': { 
    classname: 'fortsterling',
    initials: 'FS'
  },
  Lymhurst: { 
    classname: 'lymhurst',
    initials: 'LH'
  },
  Martlock: { 
    classname: 'martlock',
    initials: 'ML'
  },
  Thetford: { 
    classname: 'thetford',
    initials: 'TF'
  },
}

/**
 * Associative array storing the Resource Return Rates (RRRs) of various refining locations, in pairs of normal and focus values - for refining with and without focus respectively.
 * @typedef {Object} resourceReturnRates 
 * @property {RRR} city - Royal city without a specialized refining bonus for the resource
 * @property {RRR} cityBonus - Royal city specializing in said resource
 * @property {RRR} island - Player-owned island in a non-specialized city
 * @property {RRR} islandBonus - Player-owned island in a city specializing in said resource
 * @property {RRR} hideout - Black Zone guild Hideout
 */
/**
 * @typedef {Object} RRR
 * @property {number} normal - RRR without focus
 * @property {number} focus - RRR with foucs
 */
const resourceReturnRates = {
  city: {
    normal: 0.152,
    focus: 0.435
  },
  cityBonus: {
    normal: 0.367,
    focus: 0.539
  },
  island: {
    normal: 0,
    focus: 0.371
  },
  islandBonus: {
    normal: 0.285,
    focus: 0.497
  },
  hideout: {
    normal: 0.2,
    focus: 0.46
  },
}

export {
  numberToNumeral,
  resources,
  resourcesReverse,
  translateLocation,
  resourceReturnRates
}