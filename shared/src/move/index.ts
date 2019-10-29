export enum MoveType {
  ACTIVATE_ABILITY = 'ACTIVATE_ABILITY',
  PLAY_CARD = 'PLAY_CARD',
}

interface MoveBase {
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

export interface MovePlayCard extends MoveBase {
  type: MoveType.PLAY_CARD
  data: { cardId: string }
}

export type Move = MoveActivateAbility | MovePlayCard
