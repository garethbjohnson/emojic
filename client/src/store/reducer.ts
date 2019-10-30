import { Reducer } from 'redux'

import { Game, makeId } from 'emojic-shared'

import { ActionType, EmojicAction } from './actions'

export interface State {
  game?: Game
  playerId: string
}

const initialState: State = {
  playerId: makeId(),
}

export const reducer: Reducer<State, EmojicAction> = (
  state: State = initialState,
  action: EmojicAction
): State => {
  switch (action.type) {
    case ActionType.UPDATE_GAME:
      return {
        ...state,
        game: action.payload,
      }

    default:
      return { ...state }
  }
}
