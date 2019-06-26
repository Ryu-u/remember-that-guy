import React from 'react'
import { PastGame } from '../backend/types'
import styled from 'styled-components'
import TeamContainer from './TeamContainer'

interface GameContainerProps {
  pastGame: PastGame
}

export const GameContainer: React.FC<GameContainerProps> = ({ pastGame }) => {
  return (
    <GameContainerArea>
      <TeamContainer pastGameTeamMember={pastGame.red} teamName={'red'} />
      <TeamContainer pastGameTeamMember={pastGame.blue} teamName={'blue'} />
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
