import { Dispatch } from 'redux'

import { HTTP_API_URL } from '../helpers/constants'
import { getUpdateGameAction } from './actions'

export const createGame = async (dispatch: Dispatch, playerId: string) => {
  const requestBody = { playerId }

  const response = await fetch(`${HTTP_API_URL}/games`, {
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })

  const game = await response.json()

  const action = getUpdateGameAction(game)
  dispatch(action)
}
