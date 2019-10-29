import { blackCreatures, blackManas } from '../card'

const blackMana = blackManas.find(mana => mana.type.modifier === 'Basic')

export const blackDeck = [
  ...blackCreatures
    .map(creature => Array(9).fill(creature))
    .reduce((x, y) => x.concat(y), []),
  ...Array(24).fill(blackMana),
]
