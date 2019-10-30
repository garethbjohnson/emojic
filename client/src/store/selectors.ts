import { Game } from 'emojic-shared'

import { State } from './reducer'

export const selectGame = (state: State): Game | undefined => state.game

export const selectPlayerId = (state: State): string | undefined =>
  state.playerId
