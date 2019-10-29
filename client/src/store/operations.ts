import { Dispatch } from 'redux'

import { HTTP_API_URL } from '../helpers/constants'
import { getUpdateGameAction } from './actions'

export const createGame = async (dispatch: Dispatch) => {
  const response = await fetch(`${HTTP_API_URL}/games`, { method: 'POST' })
  const game = await response.json()

  const action = getUpdateGameAction(game)
  dispatch(action)
}
