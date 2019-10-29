import { blackCreatures, blackLands } from '../card'

const blackLand = blackLands.find(land => land.name === '💀')

export const blackDeck = [
  ...blackCreatures
    .map(creature => Array(9).fill(creature))
    .reduce((x, y) => x.concat(y), []),
  ...Array(24).fill(blackLand),
]
