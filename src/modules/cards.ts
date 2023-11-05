import type { Actions, Cards } from "./types"

const cards: Cards = {
  rangers: {
    title: "Rangers",
    power: 5,
    suit: "Army",
  },
  elvenArchers: {
    title: "Elven Archers",
    power: 10,
    suit: "Army",
  },
  dwarvishInfantry: {
    title: "Dwarvish Infantry",
    power: 15,
    suit: "Army",
  },
  lightCavalry: {
    title: "Light Cavalry",
    power: 17,
    suit: "Army",
  },
  celestialKnights: {
    title: "Celestial Knights",
    power: 20,
    suit: "Army",
  },
  protectionRune: {
    title: "Protection Rune",
    power: 1,
    suit: "Artifact",
  },
  worldTree: {
    title: "World Tree",
    power: 2,
    suit: "Artifact",
  },
  bookOfChanges: {
    title: "Book of Changes",
    power: 3,
    suit: "Artifact",
  },
  shieldOfKeth: {
    title: "Shield of Keth",
    power: 4,
    suit: "Artifact",
  },
  gemOfOrder: {
    title: "Gem of Order",
    power: 5,
    suit: "Artifact",
  },
  warhorse: {
    title: "Warhorse",
    power: 6,
    suit: "Beast",
  },
  unicorn: {
    title: "Unicorn",
    power: 9,
    suit: "Beast",
  },
  hydra: {
    title: "Hydra",
    power: 12,
    suit: "Beast",
  },
  dragon: {
    title: "Dragon",
    power: 30,
    suit: "Beast",
  },
  basilisk: {
    title: "Basilisk",
    power: 35,
    suit: "Beast",
  },
  candle: {
    title: "Candle",
    power: 2,
    suit: "Flame",
  },
  fireElemental: {
    title: "Fire ELemental",
    power: 4,
    suit: "Flame",
  },
  forge: {
    title: "Forge",
    power: 9,
    suit: "Flame",
  },
  lightning: {
    title: "Lightning",
    power: 11,
    suit: "Flame",
  },
  wildfire: {
    title: "Wildfire",
    power: 40,
    suit: "Flame",
  },
  fountainOfLife: {
    title: "Fountain of Life",
    power: 1,
    suit: "Flood",
  },
  waterElemental: {
    title: "Water Elemental",
    power: 4,
    suit: "Flood",
  },
  island: {
    title: "Island",
    power: 14,
    suit: "Flood",
  },
  swamp: {
    title: "Swamp",
    power: 18,
    suit: "Flood",
  },
  greatFlood: {
    title: "Great Flood",
    power: 32,
    suit: "Flood",
  },
  earthElemental: {
    title: "Earth Elemental",
    power: 4,
    suit: "Land",
  },
  undergroundCaverns: {
    title: "Underground Caverns",
    power: 6,
    suit: "Land",
  },
  forest: {
    title: "Forest",
    power: 7,
    suit: "Land",
  },
  bellTower: {
    title: "Bell Tower",
    power: 8,
    suit: "Land",
  },
  mountain: {
    title: "Mountain",
    power: 9,
    suit: "Land",
  },
  princess: {
    title: "Princess",
    power: 2,
    suit: "Leader",
  },
  warlord: {
    title: "Warlord",
    power: 4,
    suit: "Leader",
  },
  queen: {
    title: "Queen",
    power: 6,
    suit: "Leader",
  },
  king: {
    title: "King",
    power: 8,
    suit: "Leader",
  },
  empress: {
    title: "Empress",
    power: 10,
    suit: "Leader",
  },
  magicWand: {
    title: "Magic Wand",
    power: 1,
    suit: "Weapon",
  },
  elvenLongbow: {
    title: "Elven Longbow",
    power: 3,
    suit: "Weapon",
  },
  swordOfKeth: {
    title: "Sword of Keth",
    power: 7,
    suit: "Weapon",
  },
  warship: {
    title: "Warship",
    power: 23,
    suit: "Weapon",
  },
  warDirigible: {
    title: "War Dirigible",
    power: 35,
    suit: "Weapon",
  },
  airElemental: {
    title: "Air Elemental",
    power: 4,
    suit: "Weather",
  },
  rainstorm: {
    title: "Rainstorm",
    power: 8,
    suit: "Weather",
  },
  whirlwind: {
    title: "Whirlwind",
    power: 13,
    suit: "Weather",
  },
  smoke: {
    title: "Smoke",
    power: 27,
    suit: "Weather",
  },
  blizzard: {
    title: "Blizzard",
    power: 30,
    suit: "Weather",
  },
  necromancer: {
    title: "Necromancer",
    power: 3,
    suit: "Wizard",
  },
  elementalEnchantress: {
    title: "Elemental Enchantress",
    power: 5,
    suit: "Wizard",
  },
  collector: {
    title: "Collector",
    power: 7,
    suit: "Wizard",
  },
  beastmaster: {
    title: "Beastmaster",
    power: 9,
    suit: "Wizard",
  },
  warlockLord: {
    title: "Warlock Lord",
    power: 25,
    suit: "Wizard",
  },
}

const protectActions: Actions = {
  rangers(_, __, protectedSuits) {
    protectedSuits.add("Army")
  },
  protectionRune(_, __, protectedSuits) {
    for (const suit of [
      "Army",
      "Leader",
      "Wizard",
      "Weather",
      "Weapon",
      "Land",
      "Flood",
      "Artifact",
      "Flame",
      "Beast",
      "Wild",
    ]) {
      protectedSuits.add(suit)
    }
  },
}
const blockActions: Actions = {}
const unblockActions: Actions = {}
const bonusActions: Actions = {
  rangers(hand, blocked) {
    let sum = this.power
    for (const [name, card] of hand) {
      if (card.suit === "Land" && !blocked.has(name)) sum += 10
    }
    return sum
  },
  elvenArchers(hand, blocked) {
    let sum = this.power + 5
    for (const [name, card] of hand) {
      if (card.suit === "Weather" && !blocked.has(name)) {
        sum -= 5
        break
      }
    }
    return sum
  },
  worldTree(hand, blocked) {
    let sum = this.power
    let count = 0
    const suits: Set<string> = new Set()
    for (const [name, card] of hand) {
      if (blocked.has(name)) continue
      suits.add(card.suit)
      count++
    }
    return count === suits.size ? sum + 50 : sum
  },
  bookOfChanges() {
    return this.power
  },
  protectionRune() {
    return this.power
  },
  shieldOfKeth(hand, blocked) {
    let sum = this.power
    for (const [name, card] of hand) {
      if (card.suit === "Leader" && !blocked.has(name)) {
        if (hand.has("swordOfKeth")) sum += 40
        else sum += 15
        break
      }
    }
    return sum
  },
  gemOfOrder(hand, blocked) {
    let sum = this.power
    const powers = []
    for (const [name, card] of hand) {
      if (!blocked.has(name)) {
        powers.push(card.power)
      }
    }
    powers.sort((a, b) => a - b)
    let max = 0
    let currMax = 0
    for (let i = 0; i < powers.length; i++) {
      if (currMax === 0 || powers[i] === powers[i - 1] + 1) currMax++
      else {
        max = Math.max(max, currMax)
        currMax = 0
      }
    }
    max = Math.max(max, currMax)
    switch (max) {
      case 3:
        sum += 10
        break
      case 4:
        sum += 30
        break
      case 5:
        sum += 60
        break
      case 6:
        sum += 100
        break
      case 7 || 8:
        sum += 150
        break

      default:
        break
    }
    return sum
  },
}
const penaltyActions: Actions = {
  dwarvishInfantry(hand, blocked, protectedSuits) {
    let sum = this.power
    if (protectedSuits.has("Army")) return sum
    for (const [name, card] of hand) {
      if (
        card.suit === "Army" &&
        name !== "dwarvishInfantry" &&
        !blocked.has(name)
      )
        sum -= 2
    }
    return sum
  },
  lightCavalry(hand, blocked, protectedSuits) {
    let sum = this.power
    if (protectedSuits.has("Land")) return sum
    for (const [name, card] of hand) {
      if (card.suit === "Land" && !blocked.has(name)) sum -= 2
    }
    return sum
  },
  celestialKnights(hand, blocked, protectedSuits) {
    let sum = this.power
    if (protectedSuits.has("Leader")) return sum
    for (const [name, card] of hand) {
      if (card.suit === "Leader" && !blocked.has(name)) {
        sum -= 8
        break
      }
    }
    return sum
  },
}

const actions = [
  protectActions,
  blockActions,
  unblockActions,
  bonusActions,
  penaltyActions,
]

export { cards, actions }
