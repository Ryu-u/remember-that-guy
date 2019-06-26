import React from 'react'
import styled from 'styled-components'
import { PastGamesContext } from './hooks'

interface PlayerRowProps {
  playerName: string
}

const PlayerRow: React.FC<PlayerRowProps> = ({ playerName }) => {
  const ctx = React.useContext(PastGamesContext)
  if (!ctx) {
    throw new Error('no context')
  }

  return (
    <PlayerRowContainer>
      {(() => {
        if (ctx.rivals.includes(playerName)) {
          return <Remembered>登録済み</Remembered>
        } else if (playerName === 'ParanoiaNuts') {
          return <Myself>自分</Myself>
        } else {
          return (
            <RememberButton
              onClick={e => {
                e.stopPropagation()
                ctx.setIsModalOpen(true)
                ctx.setRivalNameState(playerName)
              }}
            >
              登録
            </RememberButton>
          )
        }
      })()}
      <PlayerName>{playerName}</PlayerName>
    </PlayerRowContainer>
  )
}

export default PlayerRow

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

const PlayerRowContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 10px 0;
`
const PlayerName = styled.div``
