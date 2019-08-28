import React from 'react'
import styled, { css } from 'styled-components'
import { PastGamesContext } from '../../utils/hooks'

interface PlayerRowProps {
  playerName: string
}

// TODO: ここは要変更
const SUMMONER_NAME = ''

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
        } else if (playerName === SUMMONER_NAME) {
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

const basicStyles = css`
  width: 80px;
  height: 24px;
  font-size: 12px;
  margin-right: 20px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Remembered = styled.div`
  ${basicStyles}
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #cdcdcd;
`

const Myself = styled.div`
  ${basicStyles}
  font-weight: bold;
  background-color: #e6ebee;
  color: #6e899b;
  border: 1px solid #cdcdcd;
`

const RememberButton = styled.button`
  ${basicStyles}
  font-weight: bold;
  background-color: #0099ff;
  color: #ffffff;
  border: 1px solid #0099ff;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`

const PlayerRowContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 10px 0 0;
`
const PlayerName = styled.div`
  line-height: 24px;
`
