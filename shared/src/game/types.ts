import { Card, ManaAmount } from '../card'
import { Phase } from './constants'

export interface Game {
  id: string

  players: Player[]
  turn: Turn
}

export interface GameCard extends Card {
  id: string

  hasSummoningSickness?: boolean
  isAttacking?: boolean
  isTapped?: boolean
}

export interface Player {
  id: string

  battlefield?: GameCard[]
  exile?: GameCard[]
  graveyard?: GameCard[]
  hand: GameCard[]
  library: GameCard[]

  life: number
  manaPool: ManaAmount
}

interface Turn {
  playerId: string
  phase: Phase
  manaWasPlayed: boolean
}
