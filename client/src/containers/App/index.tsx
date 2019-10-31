import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import getSocket from 'socket.io-client'

import {
  MoveActivateAbility,
  MoveContinueTurn,
  MovePlayCard,
  MoveType,
  Response,
  getManaAmountDisplay,
} from 'emojic-shared'

import { Card } from '../../components/Card'
import { getPhaseDisplay } from '../../helpers/card'
import { WEB_SOCKET_API_URL } from '../../helpers/constants'
import {
  createGame,
  getUpdateGameAction,
  selectGame,
  selectPlayerId,
} from '../../store'
import {
  Hand,
  HandWrap,
  LibraryManaWrap,
  LibraryCardWrap,
  MainBattlefield,
  ManaPool,
  Table,
  Toolbar,
  Wrap,
  LibraryWrap,
  ManaWrap,
} from './style'

let socket: SocketIOClient.Socket

const activateAbility = (
  gameId: string,
  playerId: string,
  cardId: string,
  attributeIndex: number
) => {
  const move: MoveActivateAbility = {
    gameId,
    playerId,
    type: MoveType.ACTIVATE_ABILITY,
    data: { attributeIndex, cardId },
  }

  const message = JSON.stringify(move)
  socket.send(message)
}

const continueTurn = (gameId: string, playerId: string) => {
  const move: MoveContinueTurn = {
    gameId,
    playerId,
    type: MoveType.CONTINUE_TURN,
  }

  const message = JSON.stringify(move)
  socket.send(message)
}

const playCard = (gameId: string, playerId: string, cardId: string) => {
  const move: MovePlayCard = {
    gameId,
    playerId,
    type: MoveType.PLAY_CARD,
    data: { cardId },
  }

  const message = JSON.stringify(move)
  socket.send(message)
}

export const App: React.FC = () => {
  const dispatch = useDispatch()

  const game = useSelector(selectGame)
  const playerId = useSelector(selectPlayerId)

  const player = game && game.players.find(player => player.id === playerId)

  React.useEffect(() => {
    createGame(dispatch, playerId!)
  }, [])

  React.useEffect(() => {
    if (!game) return

    socket = getSocket(WEB_SOCKET_API_URL, { transports: ['websocket'] })

    socket.on('message', (message: string) => {
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
          <Table>
            <MainBattlefield>
              {player!.battlefield &&
                player!.battlefield
                  .filter(card => card.type.main !== 'Mana')
                  .map(card => (
                    <Card
                      activateAbility={(attributeIndex: number) =>
                        activateAbility(
                          game.id,
                          player!.id,
                          card.id,
                          attributeIndex
                        )
                      }
                      card={card}
                      key={card.id}
                    />
                  ))}
            </MainBattlefield>

            <LibraryManaWrap>
              <LibraryWrap>
                {player!.library.map((card, index) => (
                  <LibraryCardWrap
                    index={index}
                    key={index}
                    totalCount={player!.library.length}
                  >
                    <Card card={card} key={card.id} />
                  </LibraryCardWrap>
                ))}
              </LibraryWrap>

              <ManaWrap>
                {player!.battlefield &&
                  player!.battlefield
                    .filter(card => card.type.main === 'Mana')
                    .map(card => (
                      <Card
                        activateAbility={(attributeIndex: number) =>
                          activateAbility(
                            game.id,
                            player!.id,
                            card.id,
                            attributeIndex
                          )
                        }
                        card={card}
                        key={card.id}
                      />
                    ))}
              </ManaWrap>
            </LibraryManaWrap>
          </Table>

          <HandWrap>
            <Hand cardCount={player!.hand.length}>
              {player!.hand.map(card => (
                <Card
                  card={card}
                  key={card.id}
                  onClick={() => playCard(game.id, player!.id, card.id)}
                />
              ))}
            </Hand>

            <Toolbar>
              <h2>
                {game.turn.playerId === player!.id
                  ? 'Your turn'
                  : "Opponent's turn"}{' '}
                ({getPhaseDisplay(game.turn.phase)})
              </h2>{' '}
              <h3>
                Mana pool:{' '}
                {getManaAmountDisplay(player!.manaPool) ? (
                  <ManaPool>{getManaAmountDisplay(player!.manaPool)}</ManaPool>
                ) : (
                  'Empty'
                )}
              </h3>
              <button onClick={() => continueTurn(game.id, player!.id)}>
                Continue
              </button>
            </Toolbar>
          </HandWrap>
        </>
      )}
    </Wrap>
  )
}
