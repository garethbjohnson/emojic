import { Card } from '../types'

export const greenCreatures: Card[] = [
  {
    name: '🐸',
    manaCost: {
      green: 1,
    },
    type: {
      main: 'Creature',
      subtypes: ['Frog'],
    },
    basePower: 1,
    baseToughness: 1,
  },
  {
    name: '🧝',
    manaCost: {
      colorless: 1,
      green: 1,
    },
    type: {
      main: 'Creature',
      subtypes: ['Elf'],
    },
    basePower: 2,
    baseToughness: 2,
  },
  {
    name: '🐗‍',
    manaCost: {
      colorless: 2,
      green: 1,
    },
    type: {
      main: 'Creature',
      subtypes: ['Boar'],
    },
    basePower: 3,
    baseToughness: 3,
  },
  {
    name: '🦏',
    manaCost: {
      colorless: 3,
      green: 1,
    },
    type: {
      main: 'Creature',
      subtypes: ['Rhino'],
    },
    basePower: 4,
    baseToughness: 4,
  },
]
