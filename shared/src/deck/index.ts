import { blackCreatures, blackManas, blueCreatures, blueManas } from '../card'

const blackMana = blackManas.find(mana => mana.type.modifier === 'Basic')
const blueMana = blueManas.find(mana => mana.type.modifier === 'Basic')

export const blackDeck = [
  ...blackCreatures
    .map(creature => Array(9).fill(creature))
    .reduce((x, y) => x.concat(y), []),
  ...Array(24).fill(blackMana),
]

export const blackBlueDeck = [
  ...blackCreatures
    .map(creature => Array(4).fill(creature))
    .reduce((x, y) => x.concat(y), []),
  ...blueCreatures
    .map(creature => Array(4).fill(creature))
    .reduce((x, y) => x.concat(y), []),
  ...Array(12).fill(blackMana),
  ...Array(12).fill(blueMana),
]
