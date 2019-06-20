import React from 'react'
import { Rival } from '../backend/types'
import axios from 'axios'

const

const RivalList: React.FC = () => async () => {
  const rivalListSetResponse = await axios.get('http://localhost:5000/rivals')

  return (
    <div>
      <div>
        {rivalListSetResponse.data.rivals.map((rival: Rival, index: number) => {
          return (
            <div key={index}>
              =>
              <div>{rival.name}</div>
              <div>{rival.description}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RivalList
