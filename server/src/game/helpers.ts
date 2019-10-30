import {
  Card,
  Game,
  GameCard,
  ManaAmount,
  Player,
  getConvertedManaCost,
  makeId,
} from 'emojic-shared'

const colors = ['black', 'blue', 'green', 'red', 'white']
const colorLessAndColors = ['colorless', ...colors]
const colorLessAndColorsAndMulticolor = [...colorLessAndColors, 'multicolor']

export const getColor = (
  card: Card | GameCard
):
  | 'colorless'
  | 'black'
  | 'blue'
  | 'black'
  | 'green'
  | 'red'
  | 'white'
  | 'multicolor' => {
  // TODO: handle nonbasic lands.
  if (card.type.main === 'Mana' && card.type.modifier === 'Basic') {
    const manaAmount = card.attributes[0].effect.amount
    if (manaAmount.black) return 'black'
    if (manaAmount.blue) return 'blue'
    if (manaAmount.green) return 'green'
    if (manaAmount.red) return 'red'
    if (manaAmount.white) return 'white'
  }

  const { manaCost } = card

  if (!manaCost) return 'colorless'

  const { colorless, black, blue, red, green, white } = manaCost

  if (colorless && !black && !blue && !red && !green && !white)
    return 'colorless'
  if (!colorless && black && blue && !red && !green && !white) return 'black'
  if (!colorless && !black && blue && !red && !green && !white) return 'blue'
  if (!colorless && !black && !blue && red && !green && !white) return 'red'
  if (!colorless && !black && !blue && !red && green && !white) return 'green'
  if (!colorless && !black && !blue && !red && !green && white) return 'white'

  return 'multicolor'
}

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

  colors.forEach((color: keyof ManaAmount) => {
    if (cost[color]) {
      newPool[color] = (newPool[color] || 0) - cost[color]
      if (newPool[color] < 0) throw new Error('Not enough mana')
      costLeft[color] = 0
    }
  })

  for (const color of colorLessAndColors) {
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

export const getOpponentArea = (player: Player): Player => ({
  ...player,
  hand: getHiddenCards(player.hand),
  library: getHiddenCards(player.library),
})

export const getOwnArea = (player: Player): Player => ({
  ...player,
  library: getHiddenCards(player.library),
})

/** Get a game with cards hidden for the given player. */
export const getPlayerGame = (game: Game, playerId: string): Game => ({
  ...game,
  players: game.players.map(player =>
    player.id === playerId ? getOwnArea(player) : getOpponentArea(player)
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

export const getSortedCards = <T extends Card = GameCard>(hand: T[]): T[] => {
  const newHand = hand.slice()

  newHand.sort((card1: T, card2: T) => {
    if (card1.type.main === 'Mana' && card2.type.main !== 'Mana') return -1
    if (card1.type.main !== 'Mana' && card2.type.main === 'Mana') return 1

    const color1 = getColor(card1)
    const colorIndex1 = colorLessAndColorsAndMulticolor.indexOf(color1)
    const color2 = getColor(card2)
    const colorIndex2 = colorLessAndColorsAndMulticolor.indexOf(color2)

    if (colorIndex1 < colorIndex2) return -1
    if (colorIndex1 > colorIndex2) return 1

    const cost1 = card1.manaCost ? getConvertedManaCost(card1.manaCost) : 0
    const cost2 = card2.manaCost ? getConvertedManaCost(card2.manaCost) : 0

    if (cost1 < cost2) return -1
    if (cost1 > cost2) return 1
  })

  return newHand
}

export const makeGameCard = (card: Card): GameCard => ({
  id: makeId(),
  ...card,
})

export const hiddenCard: GameCard = {
  id: `mystery`,

  name: '',
  type: {
    main: 'Artifact',
  },
}
