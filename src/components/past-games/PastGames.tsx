import React from 'react'
import styled from 'styled-components'
import DescriptionModal from './DescriptionModal'
import {
  usePastGamesState,
  useRivalsState,
  useRivalNameState,
  useIsModalOpenState,
  usePastGamesEffect,
  PastGamesContext
} from '../../utils/hooks'
import { GameContainer } from './GameContainer'

const PastGames: React.FC = () => {
  const { pastGamesState, setPastGamesState } = usePastGamesState()
  const { rivalsState, setRivalsState } = useRivalsState()
  const { isModalOpen, setIsModalOpen } = useIsModalOpenState()
  const { rivalNameState, setRivalNameState } = useRivalNameState()
  usePastGamesEffect(setPastGamesState, setRivalsState)

  const handleModalClose = React.useCallback(() => setIsModalOpen(false), [setIsModalOpen])

  React.useContext(PastGamesContext)

  return (
    <PastGamesContext.Provider
      value={{
        rivals: rivalsState,
        setIsModalOpen,
        setRivalNameState
      }}
    >
      <Container>
        <DescriptionModal
          isModalOpen={isModalOpen}
          name={rivalNameState}
          handleModalClose={handleModalClose}
          setRivalsState={setRivalsState}
        />
        {pastGamesState.map((pastGame, index0) => {
          return <GameContainer key={index0} pastGame={pastGame} />
        })}
      </Container>
    </PastGamesContext.Provider>
  )
}

export default PastGames

const Container = styled.div`
  width: 800px;
  margin: 100px auto 30px;
  box-sizing: border-box;
`
