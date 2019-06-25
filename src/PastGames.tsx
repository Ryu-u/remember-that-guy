import React from 'react'
import styled from 'styled-components'
import { PastGame, Rival } from '../backend/types'
import axios from 'axios'
import DescriptionModal from './DescriptionModal'
import {
  usePastGamesState,
  useRivalsState,
  useRivalNameState,
  useIsModalOpenState,
  usePastGamesEffect,
  RivalsContext
} from './hooks'
import { PlayerRowEnhancer } from './PlayerRow'
import { TeamContainerEnhancer } from './TeamContainer'
import { GameContainer } from './GameContainer'

const PastGames: React.FC = () => {
  const { pastGamesState, setPastGamesState } = usePastGamesState()
  const { rivalsState, setRivalsState } = useRivalsState()
  const { isModalOpen, setIsModalOpen } = useIsModalOpenState()
  const { rivalNameState, setRivalNameState } = useRivalNameState()
  usePastGamesEffect(setPastGamesState, setRivalsState)

  const PlayerRow = PlayerRowEnhancer(setIsModalOpen, setRivalNameState)
  const EnhancedTeamContainer = TeamContainerEnhancer(PlayerRow)

  return (
    <RivalsContext.Provider value={rivalsState}>
      <Container>
        <DescriptionModal
          isModalOpen={isModalOpen}
          name={rivalNameState}
          setIsModalOpen={() => setIsModalOpen(false)}
          setRivalsState={setRivalsState}
        />
        {pastGamesState.map((pastGame, index0) => {
          return <GameContainer key={index0} pastGame={pastGame} TeamContainer={EnhancedTeamContainer} />
        })}
      </Container>
    </RivalsContext.Provider>
  )
}

export default PastGames

const Container = styled.div`
  width: 800px;
  margin: 0 auto;
  box-sizing: border-box;
`

const TeamContainer = styled.div`
  width: 45%;
`

const TeamName = styled.div`
  font-size: 24px;
  border-bottom: 1px solid #cdcdcd;
  padding-bottom: 5px;
`

const PlayerRow = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 10px 0;
`
const Remembered = styled.div`
  background-color: #ffffff;
  color: #000000;
  width: 80px;
  margin-right: 20px;
  font-size: 12px;
  text-align: center;
  border: 1px solid #cdcdcd;
  border-radius: 4px;
  box-sizing: border-box;
`

const Myself = styled.div`
  width: 80px;
  font-size: 12px;
  color: #6e899b;
  background-color: #e6ebee;
  margin-right: 20px;
  text-align: center;
  border: 1px solid #cdcdcd;
  border-radius: 4px;
  box-sizing: border-box;
`

const RememberButton = styled.button`
  background-color: #0099ff;
  color: #ffffff;
  width: 80px;
  font-size: 12px;
  smargin-right: 20px;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid #0099ff;
  margin-right: 20px;
  box-sizing: border-box;

  &:hover {
    opacity: 0.8;
  }
`
