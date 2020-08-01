import { Card } from '../types'

export const whiteManas: Card[] = [
  {
    name: '☀️',
    type: {
      modifier: 'Basic',
      main: 'Mana',
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
            white: 1,
          },
        },
      },
    ],
  },
]
