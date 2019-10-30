import { ManaAmount } from './types'

export const getConvertedManaCost = (amount: ManaAmount): number =>
  ['colorless', 'black', 'blue', 'green', 'red', 'white'].reduce(
    (sum, color) => sum + (amount[color as keyof ManaAmount] || 0),
    0
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
