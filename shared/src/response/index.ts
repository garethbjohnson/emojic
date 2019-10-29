import { Game } from '../game'

export interface FailureResponse {
  status: 'FAILURE'
  message: string
}

export interface SuccessResponse {
  status: 'SUCCESS'
  game: Game
}

export type Response = FailureResponse | SuccessResponse
