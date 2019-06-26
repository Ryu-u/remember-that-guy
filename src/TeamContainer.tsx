import React from 'react'
import styled from 'styled-components'
import PlayerRow from './PlayerRow'

interface TeamContainerProps {
  pastGameTeamMember: string[]
  teamName: string
}

const TeamContainer: React.FC<TeamContainerProps> = ({ pastGameTeamMember, teamName }) => {
  return (
    <TeamRow>
      <TeamName>{teamName}</TeamName>
      {pastGameTeamMember.map((teamPlayerName: string, index1: number) => {
        return (
          <div key={index1}>
            <PlayerRow playerName={teamPlayerName} />
          </div>
        )
      })}
    </TeamRow>
  )
}

export default TeamContainer

const TeamRow = styled.div`
  width: 45%;
`

const TeamName = styled.div`
  font-size: 24px;
  border-bottom: 1px solid #cdcdcd;
  padding-bottom: 5px;
`
