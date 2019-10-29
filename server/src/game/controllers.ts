import { Request, Response } from 'express'

import { blackDeck, Game, Phase } from 'emojic-shared'

import { getPlayerGame, getShuffled, makeGameCard, makeId } from './helpers'

const games: Record<string, Game> = {}

export const createGame = (_: Request, response: Response): void => {
  // TODO: take the player's ID.
  // TODO: authenticate the player.
  // TODO: pair the player with another player.
  // TODO: let the player play against AI.
  const playerId = makeId()

  // TODO: let the player choose a deck.
  const unshuffledLibrary = blackDeck.map(makeGameCard)
  const library = getShuffled(unshuffledLibrary)

  // TODO: randomise starting player.
  // TODO: allow mulligans.
  const game: Game = {
    id: makeId(),

    playerAreas: [
      {
        playerId,

        battlefield: [],
        exile: [],
        graveyard: [],
        hand: library.slice(0, 7),
        library: library.slice(7),
      },
    ],
    turn: {
      playerId,
      phase: Phase.Upkeep,
    },
  }

  games[game.id] = game

  const playerGame = getPlayerGame(game, playerId)

  response.status(201).send(playerGame)
}

export const playCard = (
  gameId: string,
  playerId: string,
  cardId: string
): Game => {
  const game = games[gameId]
  if (!game) throw new Error('Game not found')

  const playerArea = game.playerAreas.find(area => area.playerId === playerId)
  if (!playerArea) throw new Error('Player not found in game')

  const card = playerArea.hand.find(card => card.id === cardId)
  if (!card) throw new Error('Card not found')

  games[gameId] = {
    ...game,
    playerAreas: [
      ...game.playerAreas.filter(area => area.playerId !== playerId),
      {
        ...playerArea,
        battlefield: [...playerArea.battlefield, card],
        hand: playerArea.hand.filter(card => card.id !== cardId),
      },
    ],
  }

  return getPlayerGame(games[gameId], playerId)
}
