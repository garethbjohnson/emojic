import cors from 'cors'
import dotenv from 'dotenv'
import express, { Request } from 'express'
import withWebSockets from 'express-ws'
import WebSocket from 'ws'

import { createGame } from './game/controllers'

dotenv.config()

const baseApp = express()
baseApp.use(express.json())
baseApp.use(cors())

const { app } = withWebSockets(baseApp)

const port = process.env.PORT || 3000

app.post('/api/games', createGame)

// app.ws('/api/games/:gameId', (webSocket: WebSocket, request: Request) => {
//   webSocket.on('close', () => console.log(request.params.gameId, 'close'))
//   webSocket.on('message', () => console.log(request.params.gameId, 'message'))
//   webSocket.on('open', () => console.log(request.params.gameId, 'open'))
// })

app.listen(port || 3000, () =>
  console.log(`Running at \`http://localhost:${port}\`...`)
)
