import { Card, ManaAmount } from '../card'
import { Phase } from './constants'

export interface Game {
  id: string

  playerAreas: PlayerArea[]
  turn: Turn
}

export interface GameCard extends Card {
  id: string

  hasSummoningSickness?: boolean
  isTapped?: boolean
}

export interface PlayerArea {
  playerId: string

  battlefield?: GameCard[]
  exile?: GameCard[]
  graveyard?: GameCard[]
  hand: GameCard[]
  library: GameCard[]
  manaPool: ManaAmount
}

interface Turn {
  playerId: string
  phase: Phase
  manaWasPlayed: boolean
}
