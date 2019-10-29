import {
  Card,
  Game,
  GameCard,
  getConvertedManaCost,
  PlayerArea,
} from 'emojic-shared'

export const getHiddenCards = (cards: GameCard[]): GameCard[] =>
  cards.map(_ => hiddenCard)

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

export const getSortedHand = (hand: GameCard[]): GameCard[] => {
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
