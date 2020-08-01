import { Card } from '../types'

export const whiteCreatures: Card[] = [
  {
    name: '🐈',
    manaCost: {
      white: 1,
    },
    type: {
      main: 'Creature',
      subtypes: ['Cat'],
    },
    basePower: 1,
    baseToughness: 1,
  },
  {
    name: '💂',
    manaCost: {
      colorless: 1,
      white: 1,
    },
    type: {
      main: 'Creature',
      subtypes: ['Human', 'Soldier'],
    },
    basePower: 2,
    baseToughness: 2,
  },
  {
    name: '‍🦁',
    manaCost: {
      colorless: 2,
      white: 1,
    },
    type: {
      main: 'Creature',
      subtypes: ['Lion'],
    },
    basePower: 3,
    baseToughness: 3,
  },
  {
    name: '👼',
    manaCost: {
      colorless: 3,
      white: 1,
    },
    type: {
      main: 'Creature',
      subtypes: ['Angel'],
    },
    basePower: 4,
    baseToughness: 4,
  },
]
