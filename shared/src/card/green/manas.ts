import { Card } from '../types'

export const greenManas: Card[] = [
  {
    name: '🌳',
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
            green: 1,
          },
        },
      },
    ],
  },
]
