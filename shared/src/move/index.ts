export enum MoveType {
  ACTIVATE_ABILITY = 'ACTIVATE_ABILITY',
  CONTINUE_TURN = 'CONTINUE_TURN',
  PLAY_CARD = 'PLAY_CARD',
  SET_ATTACKER = 'SET_ATTACKER',
}

interface MoveBase {
  // TODO: add some sort of security key maybe.
  gameId: string
  playerId: string
  type: MoveType
}

export interface MoveActivateAbility extends MoveBase {
  type: MoveType.ACTIVATE_ABILITY
  data: {
    cardId: string
    attributeIndex: number
  }
}

export interface MoveContinueTurn extends MoveBase {
  type: MoveType.CONTINUE_TURN
}

export interface MovePlayCard extends MoveBase {
  type: MoveType.PLAY_CARD
  data: { cardId: string }
}

export interface MoveSetAttacker extends MoveBase {
  type: MoveType.SET_ATTACKER
  data: { cardId: string }
}

export type Move =
  | MoveActivateAbility
  | MoveContinueTurn
  | MovePlayCard
  | MoveSetAttacker
