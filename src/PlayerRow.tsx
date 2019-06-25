import React from 'react'
import styled from 'styled-components'
import { RivalsContext } from './hooks'

interface PlayerRowProps {
  playerName: string
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  setRivalNameState: React.Dispatch<React.SetStateAction<string>>
}

const PlayerRow: React.FC<PlayerRowProps> = ({ playerName, setIsModalOpen, setRivalNameState }) => {
  const rivals = React.useContext(RivalsContext)
  return (
    <PlayerRowContainer>
      {(() => {
        if (rivals.includes(playerName)) {
          return <Remembered>登録済み</Remembered>
        } else if (playerName === 'ParanoiaNuts') {
          return <Myself>自分</Myself>
        } else {
          return (
            <RememberButton
              onClick={e => {
                e.stopPropagation()
                setIsModalOpen(true)
                setRivalNameState(playerName)
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

export const PlayerRowEnhancer = (
  ModalOpenHandler: React.Dispatch<React.SetStateAction<boolean>>,
  rivalNameStateHandler: React.Dispatch<React.SetStateAction<string>>
) => (playerName: string) => {
  return (
    <PlayerRow setIsModalOpen={ModalOpenHandler} setRivalNameState={rivalNameStateHandler} playerName={playerName} />
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
