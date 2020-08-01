import { Card } from '../types'

export const redManas: Card[] = [
  {
    name: '🔥',
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
            red: 1,
          },
        },
      },
    ],
  },
]
