import React from 'react'
import { Rival } from '../backend/types'
import axios from 'axios'

const RivalList: React.FC = () => {
  // setStateを配列に指定すればOKっぽい。理由は謎
  // Refは使えない？
  const [state, setState] = React.useState<Rival[]>([])
  React.useEffect(() => {
    const getRivals = async () => {
      await axios.get('http://localhost:5000/rivals').then(res => {
        setState(res.data.rivals)
      })
    }

    getRivals()
  }, [setState])

  return (
    <div>
      <div>
        {state.map((rival: Rival, index: number) => {
          const nameToUrl = rival.name.replace(/ /g, '')
          const opggUrl = `https://jp.op.gg/summoner/userName=${nameToUrl}`
          return (
            <div key={index}>
              <div>
                <a href={opggUrl} target="_blank" rel="noopener noreferrer">
                  {rival.name}
                </a>
              </div>
              <div>{rival.description}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RivalList
