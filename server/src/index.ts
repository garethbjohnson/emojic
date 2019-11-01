import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import http from 'http'
import socketIo from 'socket.io'

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

const socket = socketIo(httpServer)

const port = process.env.PORT || 3000

app.post('/api/games', createGame)

socket.on('connection', connectedSocket => {
  connectedSocket.on('close', () => console.log('close'))

  connectedSocket.on('message', (requestMessage: string) => {
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
            move.data.attributeIndex
          )
          response = { status: 'SUCCESS', game: playerGame }
        } catch (error) {
          response = { status: 'FAILURE', message: error.message }
        }

        responseMessage = JSON.stringify(response)
        connectedSocket.send(responseMessage)
        return

      case MoveType.CONTINUE_TURN:
        try {
          playerGame = continueTurn(move.gameId, move.playerId)
          response = { status: 'SUCCESS', game: playerGame }
        } catch (error) {
          response = { status: 'FAILURE', message: error.message }
        }

        responseMessage = JSON.stringify(response)
        connectedSocket.send(responseMessage)
        return

      case MoveType.PLAY_CARD:
        try {
          playerGame = playCard(move.gameId, move.playerId, move.data.cardId)
          response = { status: 'SUCCESS', game: playerGame }
        } catch (error) {
          response = { status: 'FAILURE', message: error.message }
        }

        responseMessage = JSON.stringify(response)
        connectedSocket.send(responseMessage)
        return

      case MoveType.SET_ATTACKER:
        try {
          playerGame = setAttacker(move.gameId, move.playerId, move.data.cardId)
          response = { status: 'SUCCESS', game: playerGame }
        } catch (error) {
          response = { status: 'FAILURE', message: error.message }
        }

        responseMessage = JSON.stringify(response)
        connectedSocket.send(responseMessage)
        return

      default:
        return
    }
  })
})

httpServer.listen(port || 3000, () =>
  console.log(`Running at \`http://localhost:${port}\`...`)
)
