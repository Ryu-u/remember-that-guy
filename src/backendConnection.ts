import axios from 'axios'

export const getPastTimesData = async () => {
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

export const
