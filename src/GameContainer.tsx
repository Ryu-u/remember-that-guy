import React from 'react'
import { PastGame, TeamName } from '../backend/types'
import styled from 'styled-components'

interface GameContainerProps {
  pastGame: PastGame
  TeamContainer: JSX.Element
}

export const GameContainer: React.FC<GameContainerProps> = ({ pastGame, TeamContainer }) => {
  return (
    <GameContainerArea>
      <TeamContainer pastGame={pastGame.red} />
    </GameContainerArea>
  )
}

const GameContainerArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border: 1px solid #cdcdcd;
  border-radius: 7px;
  margin-top: 10px;
  padding: 20px;
  box-sizing: border-box;
`
