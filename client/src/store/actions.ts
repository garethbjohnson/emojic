import { Action, ActionCreator } from 'redux'

import { Game } from 'emojic-shared'

export type UpdateGameAction = PayloadAction<Game>

export type EmojicAction = UpdateGameAction

export interface PayloadAction<T> extends Action {
  payload: T
}

export enum ActionType {
  UPDATE_GAME = 'UPDATE_GAME',
}

export const getUpdateGameAction: ActionCreator<UpdateGameAction> = (
  payload: Game
): UpdateGameAction => ({
  type: ActionType.UPDATE_GAME,
  payload,
})
