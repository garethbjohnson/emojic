import { Card } from '../types'

export const blueManas: Card[] = [
  {
    name: '💧',
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
            blue: 1,
          },
        },
      },
    ],
  },
]
