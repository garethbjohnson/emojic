import { Request, Response } from 'express'

import {
  AttributeActivatedAbility,
  Game,
  Phase,
  Player,
  blackBlueDeck,
  makeId,
} from 'emojic-shared'

import {
  getManaIsEnough,
  getManaMinusCost,
  getManaPlusAddition,
  getPlayerGame,
  getShuffled,
  getSortedCards,
  makeGameCard,
} from './helpers'

const games: Record<string, Game> = {}

export const activateAbility = (
  gameId: string,
  playerId: string,
  cardId: string,
  attributeIndex: number
): Game => {
  const { game, player } = validateMoveBasics(gameId, playerId)

  const card = player.battlefield.find(card => card.id === cardId)
  if (!card) throw new Error('Card not found')

  const attribute = card.attributes[attributeIndex]
  if (!attribute) throw new Error('Ability not found')
  if (attribute.type !== 'ActivatedAbility')
    throw new Error('Attribute is not activated ability')

  const ability: AttributeActivatedAbility = attribute

  if (ability.cost.tap && card.isTapped)
    throw new Error('Card is already tapped')

  const manaIsEnough =
    !ability.cost.mana || getManaIsEnough(ability.cost.mana, player.manaPool)
  if (!manaIsEnough) throw new Error('Not enough mana')

  if (ability.effect.type === 'GetMana') {
    games[gameId] = {
      ...game,
      players: [
        ...game.players.filter(player => player.id !== playerId),
        {
          ...player,
          battlefield: ability.cost.tap
            ? player.battlefield.map(card =>
                card.id === cardId ? { ...card, isTapped: true } : card
              )
            : player.battlefield,
          manaPool: getManaPlusAddition(player.manaPool, ability.effect.amount),
        },
      ],
    }
  }

  return games[gameId]
}

export const continueTurn = (gameId: string, playerId: string): Game => {
  // TODO: do actual turn handling.

  const { game, player } = validateMoveBasics(gameId, playerId)

  if (game.turn.playerId !== playerId) throw new Error('Not your turn')

  games[gameId] = {
    ...game,
    players: [
      ...game.players.filter(player => player.id !== playerId),
      {
        ...player,
        battlefield: player.battlefield.map(card => ({
          ...card,
          isTapped: false,
          hasSummoningSickness: false,
        })),
        hand: getSortedCards([...player.hand, player.library[0]]),
        library: player.library.slice(1),
        manaPool: {},
      },
    ],
    turn: {
      ...game.turn,
      manaWasPlayed: false,
    },
  }

  return games[gameId]
}

export const createGame = (request: Request, response: Response): void => {
  // TODO: authenticate the player.
  // TODO: pair the player with another player.
  // TODO: let the player play against AI.
  console.log('request.body:', request.body)
  const { playerId } = request.body

  // TODO: let the player choose a deck.
  const unshuffledLibrary = blackBlueDeck.map(makeGameCard)
  const fullLibrary = getShuffled(unshuffledLibrary)

  const unsortedHand = fullLibrary.slice(0, 7)
  const library = fullLibrary.slice(7)

  // TODO: randomise starting player.
  // TODO: allow mulligans.
  const game: Game = {
    id: makeId(),

    players: [
      {
        id: playerId,

        battlefield: [],
        exile: [],
        graveyard: [],
        hand: getSortedCards(unsortedHand),
        library,
        manaPool: {},
      },
    ],
    turn: {
      playerId,
      phase: Phase.Main1,
      manaWasPlayed: false,
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
  const { game, player } = validateMoveBasics(gameId, playerId)

  const card = player.hand.find(card => card.id === cardId)
  if (!card) throw new Error('Card not found')

  if (card.type.main === 'Mana' && game.turn.manaWasPlayed)
    throw new Error('Cannot play more than one mana per turn')

  const manaIsEnough =
    !card.manaCost || getManaIsEnough(card.manaCost, player.manaPool)
  if (!manaIsEnough) throw new Error('Not enough mana')

  games[gameId] = {
    ...game,
    players: [
      ...game.players.filter(player => player.id !== playerId),
      {
        ...player,
        battlefield: getSortedCards([
          ...player.battlefield,
          {
            ...card,
            hasSummoningSickness: card.type.main === 'Creature' ? true : false,
          },
        ]),
        hand: player.hand.filter(card => card.id !== cardId),
        manaPool: card.manaCost
          ? getManaMinusCost(player.manaPool, card.manaCost)
          : player.manaPool,
      },
    ],
    turn: {
      ...game.turn,
      manaWasPlayed: card.type.main === 'Mana' ? true : game.turn.manaWasPlayed,
    },
  }

  return getPlayerGame(games[gameId], playerId)
}

export const validateMoveBasics = (
  gameId: string,
  playerId: string
): { game: Game; player: Player } => {
  const game = games[gameId]
  if (!game) throw new Error('Game not found')

  const player = game.players.find(player => player.id === playerId)
  if (!player) throw new Error('Player not found in game')

  const phaseIsValid = [Phase.Main1, Phase.Combat, Phase.Main2].includes(
    game.turn.phase
  )
  if (!phaseIsValid) throw new Error('Cannot play card this phase')

  return { game, player }
}
