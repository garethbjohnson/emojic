import { Card } from '../types'

export const blackCreatures: Card[] = [
  {
    name: '🕷',
    manaCost: {
      black: 1,
    },
    type: {
      main: 'Creature',
      subtypes: ['Spider'],
    },
    basePower: 1,
    baseToughness: 1,
  },
  {
    name: '🧛‍',
    manaCost: {
      colorless: 1,
      black: 1,
    },
    type: {
      main: 'Creature',
      subtypes: ['Vampire'],
    },
    basePower: 2,
    baseToughness: 2,
  },
  {
    name: '🧟‍',
    manaCost: {
      colorless: 2,
      black: 1,
    },
    type: {
      main: 'Creature',
      subtypes: ['Zombie'],
    },
    basePower: 3,
    baseToughness: 3,
  },
  {
    name: '👿',
    manaCost: {
      colorless: 3,
      black: 1,
    },
    type: {
      main: 'Creature',
      subtypes: ['Demon'],
    },
    basePower: 4,
    baseToughness: 4,
  },
]
