import React from 'react'
import { Rival } from '../../types/types'
import styled from 'styled-components'
import RivalDescription from './RivalDescription'

interface RivalRowProps {
  rival: Rival
  opggUrl: string
}

const RivalListRow: React.FC<RivalRowProps> = ({ rival, opggUrl }) => {
  return (
    <RivalRow>
      <RivalNameColumn>
        <RivalNameAnchor href={opggUrl} target="_blank" rel="noopener noreferrer">
          {rival.name}
        </RivalNameAnchor>
      </RivalNameColumn>
      <RivalNameColumn>
        <RivalDescription description={rival.description} />
      </RivalNameColumn>
    </RivalRow>
  )
}

export default RivalListRow

const RivalRow = styled.div`
  width: 800px;
  border-bottom: 1px solid #cdcdcd;
  display: flex;
  justify-content: left;
  align-items: flex-start;
  padding: 15px 50px;
`
const RivalNameColumn = styled.div`
  width: 350px;
  justify-self: flex-start;
  overflow-wrap: break-word;
`
const RivalNameAnchor = styled.a`
  line-height: 1.5;
  text-decoration: none;

  &:hover {
    background-color: #cdcdcd;
  }
`
