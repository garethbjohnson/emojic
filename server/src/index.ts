import cors from 'cors'
import dotenv from 'dotenv'
import express, { Request } from 'express'
import withWebSockets from 'express-ws'
import WebSocket from 'ws'

import { Move, MoveType } from 'emojic-shared'

import { createGame, playCard } from './game/controllers'
import { getPlayerGame } from './game/helpers'

dotenv.config()

const baseApp = express()
baseApp.use(express.json())
baseApp.use(cors())

const { app } = withWebSockets(baseApp)

const port = process.env.PORT || 3000

app.post('/api/games', createGame)

app.ws('/api/games/:gameId', (webSocket: WebSocket, request: Request) => {
  webSocket.on('close', () => console.log(request.params.gameId, 'close'))

  webSocket.on('message', (message: string) => {
    let move: Move

    try {
      move = JSON.parse(message)
    } catch {
      return
    }

    const { playerId, data } = move

    switch (move.type) {
      case MoveType.PLAY_CARD:
        const playerGame = playCard(
          request.params.gameId,
          playerId,
          data.cardId
        )
        const message = JSON.stringify(playerGame)
        webSocket.send(message)
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
