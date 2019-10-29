import { Action, ActionCreator } from 'redux'

import { Game } from 'emojic-shared'

export type CreateGameAction = PayloadAction<Game>

export type EmojicAction = CreateGameAction

export interface PayloadAction<T> extends Action {
  payload: T
}

export enum ActionType {
  CREATE_GAME = 'CREATE_GAME',
}

export const getCreateGameAction: ActionCreator<CreateGameAction> = (
  payload: Game
): CreateGameAction => ({
  type: ActionType.CREATE_GAME,
  payload,
})
