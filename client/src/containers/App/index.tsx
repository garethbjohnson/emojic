import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  MoveActivateAbility,
  MovePlayCard,
  MoveType,
  Response,
  MoveContinueTurn,
} from 'emojic-shared'

import { Card } from '../../components/Card'
import { getManaAmountDisplay, getPhaseDisplay } from '../../helpers/card'
import { WEB_SOCKET_API_URL } from '../../helpers/constants'
import { createGame, getUpdateGameAction, selectGame } from '../../store'
import { Battlefield, Hand, Wrap } from './style'

let webSocket: WebSocket

const activateAbility = (
  playerId: string,
  cardId: string,
  attributeIndex: number
) => {
  const move: MoveActivateAbility = {
    playerId,
    type: MoveType.ACTIVATE_ABILITY,
    data: { attributeIndex, cardId },
  }

  const message = JSON.stringify(move)
  webSocket.send(message)
}

const continueTurn = (playerId: string) => {
  const move: MoveContinueTurn = {
    playerId,
    type: MoveType.CONTINUE_TURN,
  }

  const message = JSON.stringify(move)
  webSocket.send(message)
}

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

      const response: Response = JSON.parse(message)

      if (response.status === 'FAILURE') alert(response.message)

      if (response.status === 'SUCCESS') {
        const action = getUpdateGameAction(response.game)
        dispatch(action)
      }
    })
  }, [dispatch, game])

  return (
    <Wrap>
      {!game && 'Loading...'}

      {game && (
        <>
          <Battlefield>
            {playerArea!.battlefield &&
              playerArea!.battlefield.map(card => (
                <Card
                  activateAbility={(attributeIndex: number) =>
                    activateAbility(
                      playerArea!.playerId,
                      card.id,
                      attributeIndex
                    )
                  }
                  card={card}
                  key={card.id}
                />
              ))}
          </Battlefield>
          <h2>
            {game.turn.playerId === playerArea!.playerId
              ? 'Your turn'
              : "Opponent's turn"}{' '}
            ({getPhaseDisplay(game.turn.phase)} phase)
          </h2>{' '}
          <h2>
            Mana pool: {getManaAmountDisplay(playerArea!.manaPool) || 'No mana'}
          </h2>
          <Hand cardCount={playerArea!.hand.length}>
            {playerArea!.hand.map(card => (
              <Card
                card={card}
                key={card.id}
                onClick={() => playCard(playerArea!.playerId, card.id)}
              />
            ))}
          </Hand>
          <button onClick={() => continueTurn(playerArea!.playerId)}>
            Next turn
          </button>
        </>
      )}
    </Wrap>
  )
}
