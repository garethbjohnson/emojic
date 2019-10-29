import { Request, Response } from 'express'

import {
  AttributeActivatedAbility,
  Game,
  GameCard,
  Phase,
  PlayerArea,
  blackDeck,
} from 'emojic-shared'

import {
  getManaIsEnough,
  getManaMinusCost,
  getManaPlusAddition,
  getPlayerGame,
  getShuffled,
  getSortedHand,
  makeGameCard,
  makeId,
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

export const createGame = (_: Request, response: Response): void => {
  // TODO: take the player's ID.
  // TODO: authenticate the player.
  // TODO: pair the player with another player.
  // TODO: let the player play against AI.
  const playerId = makeId()

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
        hand: getSortedHand(unsortedHand),
        library,
        manaPool: {},
      },
    ],
    turn: {
      playerId,
      phase: Phase.Main1,
      landWasPlayed: false,
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

  if (card.type.main === 'Land' && game.turn.landWasPlayed)
    throw new Error('Cannot play more than one land per turn')

  const manaIsEnough =
    !card.manaCost || getManaIsEnough(card.manaCost, playerArea.manaPool)
  if (!manaIsEnough) throw new Error('Not enough mana')

  games[gameId] = {
    ...game,
    playerAreas: [
      ...game.playerAreas.filter(area => area.playerId !== playerId),
      {
        ...playerArea,
        battlefield: [...playerArea.battlefield, card],
        hand: playerArea.hand.filter(card => card.id !== cardId),
        manaPool: card.manaCost
          ? getManaMinusCost(playerArea.manaPool, card.manaCost)
          : playerArea.manaPool,
      },
    ],
    turn: {
      ...game.turn,
      landWasPlayed: card.type.main === 'Land' ? true : game.turn.landWasPlayed,
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
