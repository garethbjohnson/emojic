import { GameCard } from '../game/types'
import { Card, ManaAmount } from './types'

export const getColor = (
  card: Card | GameCard,
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

  const { black, blue, red, green, white } = manaCost

  if (!black && !blue && !red && !green && !white) return 'colorless'
  if (black && !blue && !red && !green && !white) return 'black'
  if (!black && blue && !red && !green && !white) return 'blue'
  if (!black && !blue && red && !green && !white) return 'red'
  if (!black && !blue && !red && green && !white) return 'green'
  if (!black && !blue && !red && !green && white) return 'white'

  return 'multicolor'
}

export const getConvertedManaCost = (amount: ManaAmount): number =>
  ['colorless', 'black', 'blue', 'green', 'red', 'white'].reduce(
    (sum, color) => sum + (amount[color as keyof ManaAmount] || 0),
    0,
  )

export const getManaAmountDisplay = (amount: ManaAmount): string => {
  let display = amount.colorless ? String(amount.colorless) : ''
  if (amount.black) display = `${display}${'💀'.repeat(amount.black)}`
  if (amount.blue) display = `${display}${'💧'.repeat(amount.blue)}`
  if (amount.green) display = `${display}${'🌳'.repeat(amount.green)}`
  if (amount.red) display = `${display}${'🔥'.repeat(amount.red)}`
  if (amount.white) display = `${display}${'☀️'.repeat(amount.white)}`
  return display
}
