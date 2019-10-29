export enum MoveType {
  PLAY_CARD = 'PLAY_CARD',
}

interface MoveBase {
  playerId: string
  type: MoveType
}

export interface MovePlayCard extends MoveBase {
  type: MoveType.PLAY_CARD
  data: { cardId: string }
}

export type Move = MovePlayCard
