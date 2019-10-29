import { Dispatch } from 'redux'

import { getCreateGameAction } from './actions'

const API_URL = process.env.REACT_APP_API_URL

export const createGame = async (dispatch: Dispatch) => {
  const response = await fetch(`${API_URL}/games`, { method: 'POST' })
  const game = await response.json()

  const action = getCreateGameAction(game)
  dispatch(action)
}
