import React from 'react'
import styled from 'styled-components'
import PlayerRow from './PlayerRow'

interface TeamContainerProps {
  pastGameTeamMember: string[]
  PlayerRow: (playerName: string) => JSX.Element
  teamName: string
}

const TeamContainer: React.FC<TeamContainerProps> = ({ PlayerRow, pastGameTeamMember, teamName }) => {
  return (
    <div>
      <TeamName>{teamName}</TeamName>
      {pastGameTeamMember.map((teamPlayerName: string, index1: number) => {
        return (
          <div key={index1}>
            <PlayerRow playerName={teamPlayerName} />
          </div>
        )
      })}
    </div>
  )
}

export const TeamContainerEnhancer = (PlayerRow: (playerName: string, rivalsState: string[]) => JSX.Element) => (
  pastGameTeamMember: string[],
  teamName: string
) => {
  return <TeamContainer PlayerRow={PlayerRow} pastGameTeamMember={pastGameTeamMember} teamName={teamName} />
}

export default TeamContainer

const TeamName = styled.div`
  font-size: 24px;
  border-bottom: 1px solid #cdcdcd;
  padding-bottom: 5px;
`
