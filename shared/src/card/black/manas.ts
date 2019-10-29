import { Card } from '../types'

export const blackManas: Card[] = [
  {
    name: '💀',
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
            black: 1,
          },
        },
      },
    ],
  },
]
