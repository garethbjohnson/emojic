import cors from 'cors'
import dotenv from 'dotenv'
import express, { Request } from 'express'
import withWebSockets from 'express-ws'
import WebSocket from 'ws'

import { Game, Move, MoveType, Response } from 'emojic-shared'

import { activateAbility, createGame, playCard } from './game/controllers'

dotenv.config()

const baseApp = express()
baseApp.use(express.json())
baseApp.use(cors())

const { app } = withWebSockets(baseApp)

const port = process.env.PORT || 3000

app.post('/api/games', createGame)

app.ws('/api/games/:gameId', (webSocket: WebSocket, request: Request) => {
  webSocket.on('close', () => console.log(request.params.gameId, 'close'))

  webSocket.on('message', (requestMessage: string) => {
    let move: Move

    try {
      move = JSON.parse(requestMessage)
    } catch {
      return
    }

    let playerGame: Game
    let response: Response

    let responseMessage: string

    switch (move.type) {
      case MoveType.ACTIVATE_ABILITY:
        try {
          playerGame = activateAbility(
            request.params.gameId,
            move.playerId,
            move.data.cardId,
            move.data.attributeIndex
          )
          response = { status: 'SUCCESS', game: playerGame }
        } catch (error) {
          response = { status: 'FAILURE', message: error.message }
        }

        responseMessage = JSON.stringify(response)
        webSocket.send(responseMessage)
        return

      case MoveType.PLAY_CARD:
        try {
          playerGame = playCard(
            request.params.gameId,
            move.playerId,
            move.data.cardId
          )
          response = { status: 'SUCCESS', game: playerGame }
        } catch (error) {
          response = { status: 'FAILURE', message: error.message }
        }

        responseMessage = JSON.stringify(response)
        webSocket.send(responseMessage)
        return

      default:
        return
    }
  })

  webSocket.on('open', () => console.log(request.params.gameId, 'open'))

  console.log('socket')
})

app.listen(port || 3000, () =>
  console.log(`Running at \`http://localhost:${port}\`...`)
)
