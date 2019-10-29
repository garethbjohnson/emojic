import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Card } from '../../components/Card'
import { createGame, selectGame } from '../../store'
import { Wrap } from './style'

export const App: React.FC = () => {
  const dispatch = useDispatch()

  const game = useSelector(selectGame)

  React.useEffect(() => {
    createGame(dispatch)
  }, [])

  return (
    <Wrap>
      {!game && 'Loading'}
      {game && game.playerAreas[0].hand.map(card => <Card card={card} />)}
    </Wrap>
  )
}
