import { ManaAmount } from './types'

export const getConvertedManaCost = (amount: ManaAmount): number =>
  ['colorless', 'black', 'blue', 'green', 'red', 'white'].reduce(
    (sum, color) => sum + (amount[color as keyof ManaAmount] || 0),
    0
  )
