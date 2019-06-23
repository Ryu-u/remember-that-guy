import React from 'react'
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
    <div>
      <DescriptionModal
        isModalOpen={isModalOpen}
        name={rivalNameState}
        setIsModalOpen={() => setIsModalOpen(false)}
      />
      {pastGamesState.map((pastGame, index0) => {
        return (
          <div key={index0}>
            <div>red</div>
            {/* red */}

            {pastGame.red.map((redTeamPlayerName: string, index1: number) => {
              return (
                <div key={index1}>
                  {rivalsState.includes(redTeamPlayerName) ? (
                    <div>登録済み</div>
                  ) : (
                    <button
                      onClick={e => {
                        e.stopPropagation()
                        setIsModalOpen(true)
                        setRivalNameState(redTeamPlayerName)
                      }}
                    >
                      登録
                    </button>
                  )}
                  <div>{redTeamPlayerName}</div>
                </div>
              )
            })}
            {/* blue */}
            <div>blue</div>
            {pastGame.blue.map((blueTeamPlayerName, index2) => {
              return (
                <div key={index2}>
                  {rivalsState.includes(blueTeamPlayerName) ? (
                    <div>登録済み</div>
                  ) : (
                    <button
                      onClick={e => {
                        e.stopPropagation()
                        setIsModalOpen(true)
                        setRivalNameState(blueTeamPlayerName)
                      }}
                    >
                      登録
                    </button>
                  )}
                  <div>{blueTeamPlayerName}</div>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default PastGames
