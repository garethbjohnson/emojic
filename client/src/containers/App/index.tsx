import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'

import { Game, MovePlayCard, MoveType } from 'emojic-shared'

import { Card } from '../../components/Card'
import { WEB_SOCKET_API_URL } from '../../helpers/constants'
import { createGame, getUpdateGameAction, selectGame } from '../../store'
import { Battlefield, Hand, Wrap } from './style'

let webSocket: WebSocket

const playCard = (playerId: string, cardId: string) => {
  const move: MovePlayCard = {
    playerId,
    type: MoveType.PLAY_CARD,
    data: { cardId },
  }

  const message = JSON.stringify(move)
  webSocket.send(message)
}

export const App: React.FC = () => {
  const dispatch = useDispatch()

  const game = useSelector(selectGame)
  const playerArea = game && game.playerAreas[0]

  React.useEffect(() => {
    createGame(dispatch)
  }, [])

  React.useEffect(() => {
    if (!game) return

    webSocket = new WebSocket(`${WEB_SOCKET_API_URL}/games/${game.id}`)

    webSocket.addEventListener('message', (event: MessageEvent) => {
      const message: string = event.data
      const game: Game = JSON.parse(message)
      const action = getUpdateGameAction(game)
      dispatch(action)
    })
  }, [dispatch, game])

  return (
    <Wrap>
      {!game && 'Loading...'}

      {game && (
        <>
          <h2>Battlefield</h2>
          <Battlefield>
            {playerArea!.battlefield &&
              playerArea!.battlefield.map(card => <Card card={card} />)}
          </Battlefield>

          <h2>Hand</h2>
          <Hand>
            {playerArea!.hand.map(card => (
              <Card
                card={card}
                onClick={() => playCard(playerArea!.playerId, card.id)}
              />
            ))}
          </Hand>
        </>
      )}
    </Wrap>
  )
}
