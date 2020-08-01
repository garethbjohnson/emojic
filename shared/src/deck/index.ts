import {
  blackCreatures,
  blackManas,
  blueCreatures,
  blueManas,
  greenCreatures,
  greenManas,
  redCreatures,
  redManas,
  whiteCreatures,
  whiteManas,
} from '../card'

const blackMana = blackManas.find((mana) => mana.type.modifier === 'Basic')
const blueMana = blueManas.find((mana) => mana.type.modifier === 'Basic')
const greenMana = greenManas.find((mana) => mana.type.modifier === 'Basic')
const redMana = redManas.find((mana) => mana.type.modifier === 'Basic')
const whiteMana = whiteManas.find((mana) => mana.type.modifier === 'Basic')

export const blackDeck = [
  ...blackCreatures
    .map((creature) => Array(9).fill(creature))
    .reduce((x, y) => x.concat(y), []),
  ...Array(24).fill(blackMana),
]

export const blackBlueDeck = [
  ...blackCreatures
    .map((creature) => Array(4).fill(creature))
    .reduce((x, y) => x.concat(y), []),
  ...blueCreatures
    .map((creature) => Array(4).fill(creature))
    .reduce((x, y) => x.concat(y), []),
  ...Array(12).fill(blackMana),
  ...Array(12).fill(blueMana),
]

export const blackGreenDeck = [
  ...blackCreatures
    .map((creature) => Array(4).fill(creature))
    .reduce((x, y) => x.concat(y), []),
  ...greenCreatures
    .map((creature) => Array(4).fill(creature))
    .reduce((x, y) => x.concat(y), []),
  ...Array(12).fill(blackMana),
  ...Array(12).fill(greenMana),
]

export const blueGreenDeck = [
  ...blueCreatures
    .map((creature) => Array(4).fill(creature))
    .reduce((x, y) => x.concat(y), []),
  ...greenCreatures
    .map((creature) => Array(4).fill(creature))
    .reduce((x, y) => x.concat(y), []),
  ...Array(12).fill(blueMana),
  ...Array(12).fill(greenMana),
]

export const blueRedDeck = [
  ...blueCreatures
    .map((creature) => Array(4).fill(creature))
    .reduce((x, y) => x.concat(y), []),
  ...redCreatures
    .map((creature) => Array(4).fill(creature))
    .reduce((x, y) => x.concat(y), []),
  ...Array(12).fill(blueMana),
  ...Array(12).fill(redMana),
]

export const blueWhiteDeck = [
  ...blueCreatures
    .map((creature) => Array(4).fill(creature))
    .reduce((x, y) => x.concat(y), []),
  ...whiteCreatures
    .map((creature) => Array(4).fill(creature))
    .reduce((x, y) => x.concat(y), []),
  ...Array(12).fill(blueMana),
  ...Array(12).fill(whiteMana),
]

export const greenDeck = [
  ...greenCreatures
    .map((creature) => Array(9).fill(creature))
    .reduce((x, y) => x.concat(y), []),
  ...Array(24).fill(greenMana),
]

export const rainbowDeck = [
  ...blueCreatures,
  ...blackCreatures,
  ...greenCreatures,
  ...redCreatures,
  ...whiteCreatures,
  ...Array(5).fill(blueMana),
  ...Array(5).fill(blackMana),
  ...Array(5).fill(greenMana),
  ...Array(5).fill(redMana),
  ...Array(5).fill(whiteMana),
]
