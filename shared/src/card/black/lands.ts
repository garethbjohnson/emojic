import { Card } from '../types'

export const blackLands: Card[] = [
  {
    name: '💀',
    type: {
      modifier: 'Basic',
      main: 'Land',
    },
    attributes: [
      {
        type: 'ActivatedAbility',
        cost: {
          tap: true,
        },
        effect: {
          type: 'GetMana',
          amount: {
            black: 1,
          },
        },
      },
    ],
  },
]
