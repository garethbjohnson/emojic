import { Card } from '../types'

export const blueCreatures: Card[] = [
  {
    name: '🦉',
    manaCost: {
      blue: 1,
    },
    type: {
      main: 'Creature',
      subtypes: ['Owl'],
    },
    basePower: 1,
    baseToughness: 1,
  },
  {
    name: '🧙‍',
    manaCost: {
      colorless: 1,
      blue: 1,
    },
    type: {
      main: 'Creature',
      subtypes: ['Human', 'Wizard'],
    },
    basePower: 2,
    baseToughness: 2,
  },
  {
    name: '🧜‍',
    manaCost: {
      colorless: 2,
      blue: 1,
    },
    type: {
      main: 'Creature',
      subtypes: ['Merfolk'],
    },
    basePower: 3,
    baseToughness: 3,
  },
  {
    name: '🦑',
    manaCost: {
      colorless: 3,
      blue: 1,
    },
    type: {
      main: 'Creature',
      subtypes: ['Kraken'],
    },
    basePower: 4,
    baseToughness: 4,
  },
]
