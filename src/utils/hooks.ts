import React from 'react'
import { PastGame, Rival } from '../types/types'
import axios from 'axios'

// ど頭で使う
export const usePastGamesState = () => {
  const [pastGamesState, setPastGamesState] = React.useState<PastGame[]>([])
  return { pastGamesState, setPastGamesState }
}

export const useRivalsState = () => {
  const [rivalsState, setRivalsState] = React.useState<string[]>([])
  return { rivalsState, setRivalsState }
}

export const useRivalNameState = () => {
  const [rivalNameState, setRivalNameState] = React.useState<string>('')
  return { rivalNameState, setRivalNameState }
}

export const useIsModalOpenState = () => {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)
  return { isModalOpen, setIsModalOpen }
}

export interface PastGamesContextArgs {
  rivals: string[]
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  setRivalNameState: React.Dispatch<React.SetStateAction<string>>
}

export const PastGamesContext = React.createContext<PastGamesContextArgs | undefined>(undefined)

export const usePastGamesEffect = (
  setPastGamesState: React.Dispatch<React.SetStateAction<PastGame[]>>,
  setRivalsState: React.Dispatch<React.SetStateAction<string[]>>
) => {
  React.useEffect(() => {
    const getData = async () => {
      await axios.get('/api/v1/past_games').then(res => {
        setPastGamesState(res.data.playerTeams)
      })
      await axios.get('/api/v1/rivals').then(res => {
        const rivals: string[] = res.data.rivals.map((rival: Rival) => {
          return rival.name
        })
        setRivalsState(rivals)
      })
    }
    getData()
  }, [setPastGamesState, setRivalsState])
}
