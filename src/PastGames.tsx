import React from 'react'
import styled from 'styled-components'
import { PastGame, Rival } from '../backend/types'
import axios from 'axios'
import DescriptionModal from './DescriptionModal'

const PastGames: React.FC = () => {
  const [pastGamesState, setPastGamesState] = React.useState<PastGame[]>([])
  const [rivalsState, setRivalsState] = React.useState<string[]>([])
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)
  const [rivalNameState, setRivalNameState] = React.useState<string>('')
  React.useEffect(() => {
    const getData = async () => {
      await axios.get('http://localhost:5000/past_games').then(res => {
        setPastGamesState(res.data.playerTeams)
      })
      await axios.get('http://localhost:5000/rivals').then(res => {
        const rivals: string[] = res.data.rivals.map((rival: Rival) => {
          return rival.name
        })
        setRivalsState(rivals)
      })
    }
    getData()
  }, [setPastGamesState])

  return (
    <Container>
      <DescriptionModal isModalOpen={isModalOpen} name={rivalNameState} setIsModalOpen={() => setIsModalOpen(false)} setRivalsState={setRivalsState} />
      {pastGamesState.map((pastGame, index0) => {
        return (
          <GameContainer key={index0}>
            {/* red */}
            <TeamContainer>
              <TeamName>red</TeamName>
              {pastGame.red.map((redTeamPlayerName: string, index1: number) => {
                return (
                  <PlayerRow key={index1}>
                    {(() => {
                      if (rivalsState.includes(redTeamPlayerName)) {
                        return <Remembered>登録済み</Remembered>
                      } else if (redTeamPlayerName === 'ParanoiaNuts') {
                        return <Myself>自分</Myself>
                      } else {
                        return (
                          <RememberButton
                            onClick={e => {
                              e.stopPropagation()
                              setIsModalOpen(true)
                              setRivalNameState(redTeamPlayerName)
                            }}
                          >
                            登録
                          </RememberButton>
                        )
                      }
                    })()}
                    <PlayerName>{redTeamPlayerName}</PlayerName>
                  </PlayerRow>
                )
              })}
            </TeamContainer>
            {/* blue */}
            <TeamContainer>
              <TeamName>blue</TeamName>
              {pastGame.blue.map((blueTeamPlayerName: string, index1: number) => {
                return (
                  <PlayerRow key={index1}>
                    {(() => {
                      if (rivalsState.includes(blueTeamPlayerName)) {
                        return <Remembered>登録済み</Remembered>
                      } else if (blueTeamPlayerName === 'ParanoiaNuts') {
                        return <Myself>自分</Myself>
                      } else {
                        return (
                          <RememberButton
                            onClick={e => {
                              e.stopPropagation()
                              setIsModalOpen(true)
                              setRivalNameState(blueTeamPlayerName)
                            }}
                          >
                            登録
                          </RememberButton>
                        )
                      }
                    })()}
                    <PlayerName>{blueTeamPlayerName}</PlayerName>
                  </PlayerRow>
                )
              })}
            </TeamContainer>
          </GameContainer>
        )
      })}
    </Container>
  )
}

export default PastGames

const Container = styled.div`
  width: 800px;
  margin: 0 auto;
  box-sizing: border-box;
`

const GameContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border: 1px solid #cdcdcd;
  border-radius: 7px;
  margin-top: 10px;
  padding: 20px;
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

const PlayerName = styled.div``
