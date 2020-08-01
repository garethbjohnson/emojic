import { Card } from '../types'

export const redCreatures: Card[] = [
  {
    name: '🦎',
    manaCost: {
      red: 1,
    },
    type: {
      main: 'Creature',
      subtypes: ['Lizard'],
    },
    basePower: 1,
    baseToughness: 1,
  },
  {
    name: '👺',
    manaCost: {
      colorless: 1,
      red: 1,
    },
    type: {
      main: 'Creature',
      subtypes: ['Goblin'],
    },
    basePower: 2,
    baseToughness: 2,
  },
  {
    name: '‍👹',
    manaCost: {
      colorless: 2,
      red: 1,
    },
    type: {
      main: 'Creature',
      subtypes: ['Ogre'],
    },
    basePower: 3,
    baseToughness: 3,
  },
  {
    name: '🐉',
    manaCost: {
      colorless: 3,
      red: 1,
    },
    type: {
      main: 'Creature',
      subtypes: ['Dragon'],
    },
    basePower: 4,
    baseToughness: 4,
  },
]
