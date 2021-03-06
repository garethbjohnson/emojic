import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import http from 'http'
import { Server, Socket } from 'socket.io'

import { Game, Move, MoveType, Response } from 'emojic-shared'

import {
  activateAbility,
  continueTurn,
  createGame,
  playCard,
  setAttacker,
} from './game/controllers'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static(`${__dirname}/client`))

const httpServer = new http.Server(app)

const socketServer = new Server(httpServer)

const host = process.env.HOST || 'localhost'
const port = Number(process.env.PORT) || 3001

app.post('/api/games', createGame)

socketServer.on('connect', (socket: Socket) => {
  socket.on('close', () => console.log('close'))

  socket.on('message', (requestMessage: string) => {
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
            move.gameId,
            move.playerId,
            move.data.cardId,
            move.data.attributeIndex,
          )
          response = { status: 'SUCCESS', game: playerGame }
        } catch (error) {
          response = { status: 'FAILURE', message: error.message }
        }

        responseMessage = JSON.stringify(response)
        socket.send(responseMessage)
        return

      case MoveType.CONTINUE_TURN:
        try {
          playerGame = continueTurn(move.gameId, move.playerId)
          response = { status: 'SUCCESS', game: playerGame }
        } catch (error) {
          response = { status: 'FAILURE', message: error.message }
        }

        responseMessage = JSON.stringify(response)
        socket.send(responseMessage)
        return

      case MoveType.PLAY_CARD:
        try {
          playerGame = playCard(move.gameId, move.playerId, move.data.cardId)
          response = { status: 'SUCCESS', game: playerGame }
        } catch (error) {
          response = { status: 'FAILURE', message: error.message }
        }

        responseMessage = JSON.stringify(response)
        socket.send(responseMessage)
        return

      case MoveType.SET_ATTACKER:
        try {
          playerGame = setAttacker(move.gameId, move.playerId, move.data.cardId)
          response = { status: 'SUCCESS', game: playerGame }
        } catch (error) {
          response = { status: 'FAILURE', message: error.message }
        }

        responseMessage = JSON.stringify(response)
        socket.send(responseMessage)
        return

      default:
        return
    }
  })
})

httpServer.listen(port, host, () =>
  console.log(`Running at \`http://${host}:${port}\`...`),
)
