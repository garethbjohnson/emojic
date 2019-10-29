import {
  Card,
  Game,
  GameCard,
  ManaAmount,
  PlayerArea,
  getConvertedManaCost,
} from 'emojic-shared'

export const getHiddenCards = (cards: GameCard[]): GameCard[] =>
  cards.map(_ => hiddenCard)

export const getManaIsEnough = (
  cost: ManaAmount,
  pool: ManaAmount
): boolean => {
  try {
    getManaMinusCost(pool, cost)
  } catch {
    return false
  }

  return true
}

export const getManaMinusCost = (
  pool: ManaAmount,
  cost: ManaAmount
): ManaAmount => {
  const newPool = { ...pool }
  const costLeft = { ...cost }

  const colors = ['black', 'blue', 'green', 'red', 'white']
  const colorsWithColorless = [...colors, 'colorless']

  colors.forEach((color: keyof ManaAmount) => {
    if (cost[color]) {
      newPool[color] = (newPool[color] || 0) - cost[color]
      if (newPool[color] < 0) throw new Error('Not enough mana')
      costLeft[color] = 0
    }
  })

  for (const color of colorsWithColorless) {
    while (newPool[color as keyof ManaAmount] > 0 && costLeft.colorless > 0) {
      newPool[color as keyof ManaAmount] =
        (newPool[color as keyof ManaAmount] || 0) - 1
      costLeft.colorless = (costLeft.colorless || 0) - 1
    }
  }

  if (costLeft.colorless > 0) throw new Error('Not enough mana')

  return newPool
}

export const getManaPlusAddition = (
  pool: ManaAmount,
  addition: ManaAmount
): ManaAmount => {
  const newPool = { ...pool }
  ;['colorless', 'black', 'blue', 'green', 'red', 'white'].forEach(
    (color: keyof ManaAmount) => {
      if (addition[color]) newPool[color] = addition[color] + (pool[color] || 0)
    }
  )

  return newPool
}

export const getOpponentArea = (area: PlayerArea): PlayerArea => ({
  ...area,
  hand: getHiddenCards(area.hand),
  library: getHiddenCards(area.library),
})

export const getOwnArea = (area: PlayerArea): PlayerArea => ({
  ...area,
  library: getHiddenCards(area.library),
})

/** Get a game with cards hidden for the given player. */
export const getPlayerGame = (game: Game, playerId: string): Game => ({
  ...game,
  playerAreas: game.playerAreas.map(area =>
    area.playerId === playerId ? getOwnArea(area) : getOpponentArea(area)
  ),
})

export const getShuffled = <T = GameCard>(items: T[]): T[] => {
  const newItems = items.slice()

  for (let index = newItems.length - 1; index > 0; index -= 1) {
    const index2 = Math.floor(Math.random() * (index + 1))
    ;[newItems[index], newItems[index2]] = [newItems[index2], newItems[index]]
  }

  return newItems
}

export const getSortedCards = (hand: GameCard[]): GameCard[] => {
  const newHand = hand.slice()

  newHand.sort((card1: GameCard, card2: GameCard) => {
    const cost1 = card1.manaCost ? getConvertedManaCost(card1.manaCost) : 0
    const cost2 = card2.manaCost ? getConvertedManaCost(card2.manaCost) : 0

    if (cost1 < cost2) return -1
    if (cost1 > cost2) return 1
    if (cost1 === cost2) return 0
  })

  return newHand
}

export const makeGameCard = (card: Card): GameCard => ({
  id: makeId(),
  ...card,
})

export const makeId = (): string =>
  [...Array(16)].map(() => Math.floor(Math.random() * 36).toString(36)).join('')

export const hiddenCard: GameCard = {
  id: `mystery`,

  name: '',
  type: {
    main: 'Artifact',
  },
}
