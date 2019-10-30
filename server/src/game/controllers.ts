import { Request, Response } from 'express'

import {
  AttributeActivatedAbility,
  Game,
  Phase,
  PlayerArea,
  blackDeck,
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
  const { game, playerArea } = validateMoveBasics(gameId, playerId)

  const card = playerArea.battlefield.find(card => card.id === cardId)
  if (!card) throw new Error('Card not found')

  const attribute = card.attributes[attributeIndex]
  if (!attribute) throw new Error('Ability not found')
  if (attribute.type !== 'ActivatedAbility')
    throw new Error('Attribute is not activated ability')

  const ability: AttributeActivatedAbility = attribute

  if (ability.cost.tap && card.isTapped)
    throw new Error('Card is already tapped')

  const manaIsEnough =
    !ability.cost.mana ||
    getManaIsEnough(ability.cost.mana, playerArea.manaPool)
  if (!manaIsEnough) throw new Error('Not enough mana')

  if (ability.effect.type === 'GetMana') {
    games[gameId] = {
      ...game,
      playerAreas: [
        ...game.playerAreas.filter(area => area.playerId !== playerId),
        {
          ...playerArea,
          battlefield: ability.cost.tap
            ? playerArea.battlefield.map(card =>
                card.id === cardId ? { ...card, isTapped: true } : card
              )
            : playerArea.battlefield,
          manaPool: getManaPlusAddition(
            playerArea.manaPool,
            ability.effect.amount
          ),
        },
      ],
    }
  }

  return games[gameId]
}

export const continueTurn = (gameId: string, playerId: string): Game => {
  // TODO: do actual turn handling.

  const { game, playerArea } = validateMoveBasics(gameId, playerId)

  if (game.turn.playerId !== playerId) throw new Error('Not your turn')

  games[gameId] = {
    ...game,
    playerAreas: [
      ...game.playerAreas.filter(area => area.playerId !== playerId),
      {
        ...playerArea,
        battlefield: playerArea.battlefield.map(card => ({
          ...card,
          isTapped: false,
          hasSummoningSickness: false,
        })),
        hand: getSortedCards([...playerArea.hand, playerArea.library[0]]),
        library: playerArea.library.slice(1),
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
  const unshuffledLibrary = blackDeck.map(makeGameCard)
  const fullLibrary = getShuffled(unshuffledLibrary)

  const unsortedHand = fullLibrary.slice(0, 7)
  const library = fullLibrary.slice(7)

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
  const { game, playerArea } = validateMoveBasics(gameId, playerId)

  const card = playerArea.hand.find(card => card.id === cardId)
  if (!card) throw new Error('Card not found')

  if (card.type.main === 'Mana' && game.turn.manaWasPlayed)
    throw new Error('Cannot play more than one mana per turn')

  const manaIsEnough =
    !card.manaCost || getManaIsEnough(card.manaCost, playerArea.manaPool)
  if (!manaIsEnough) throw new Error('Not enough mana')

  games[gameId] = {
    ...game,
    playerAreas: [
      ...game.playerAreas.filter(area => area.playerId !== playerId),
      {
        ...playerArea,
        battlefield: getSortedCards([
          ...playerArea.battlefield,
          {
            ...card,
            hasSummoningSickness: card.type.main === 'Creature' ? true : false,
          },
        ]),
        hand: playerArea.hand.filter(card => card.id !== cardId),
        manaPool: card.manaCost
          ? getManaMinusCost(playerArea.manaPool, card.manaCost)
          : playerArea.manaPool,
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
): { game: Game; playerArea: PlayerArea } => {
  const game = games[gameId]
  if (!game) throw new Error('Game not found')

  const playerArea = game.playerAreas.find(area => area.playerId === playerId)
  if (!playerArea) throw new Error('Player not found in game')

  const phaseIsValid = [Phase.Main1, Phase.Combat, Phase.Main2].includes(
    game.turn.phase
  )
  if (!phaseIsValid) throw new Error('Cannot play card this phase')

  return { game, playerArea }
}
