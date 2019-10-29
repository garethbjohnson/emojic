import { Game } from 'emojic-shared'

import { State } from './reducer'

export const selectGame = (state: State): Game | undefined => state.game
