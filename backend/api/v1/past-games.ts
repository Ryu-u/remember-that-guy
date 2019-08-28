import express from 'express'
import { Request, Response } from 'express'
import axios from 'axios'
import {
  MatchReferenceDto,
  MatchlistDto,
  PartOfMatchDto,
  PartOfParticipantIdentityDto,
  PartOfParticipantDto,
  PartOfPlayerDto,
  Players
} from '../../../src/types/types'

const router = express.Router()

const pastGamesRouter = async (req: Request, res: Response) => {
  // 直近３ゲーム
  const pastGameIds: number[] = []
  const gamesResponse = await axios.get<MatchlistDto>(
    'https://jp1.api.riotgames.com/lol/match/v4/matchlists/by-account' +
      '/SmTe3BkIqi-OTAHezqR_gDtXt2dYLFMTLerAUDvQfaPpBzJLYWM530WP' +
      '?endIndex=3&beginIndex=0&api_key=' +
      process.env.API_KEY
  )
  gamesResponse.data.matches.map((game: MatchReferenceDto) => {
    pastGameIds.push(game.gameId)
  })

  // プレイヤー情報
  const players: Players[] = []
  await Promise.all(
    pastGameIds.map(async pastGameId => {
      const playersResponse = await axios.get<
        PartOfMatchDto<PartOfParticipantIdentityDto<PartOfPlayerDto>, PartOfParticipantDto>
      >('https://jp1.api.riotgames.com/lol/match/v4/matches/' + pastGameId + '?api_key=' + process.env.API_KEY)
      const blueTeamParticipantIds: number[] = []
      const redTeamParticipantIds: number[] = []
      playersResponse.data.participants.map((participant: PartOfParticipantDto) => {
        if (participant.teamId === 100) {
          blueTeamParticipantIds.push(participant.participantId)
        } else {
          redTeamParticipantIds.push(participant.participantId)
        }
      })
      const blueTeamParticipants: string[] = []
      const redTeamParticipants: string[] = []
      playersResponse.data.participantIdentities.map(participantIdentity => {
        if (blueTeamParticipantIds.includes(participantIdentity.participantId)) {
          blueTeamParticipants.push(participantIdentity.player.summonerName)
        } else {
          redTeamParticipants.push(participantIdentity.player.summonerName)
        }
      })
      players.push({
        blue: blueTeamParticipants.sort(),
        red: redTeamParticipants.sort(),
        gameCreation: playersResponse.data.gameCreation
      })
    })
  )

  const responsePlayers = players.sort((a, b) => {
    if (a.gameCreation > b.gameCreation) {
      return 1
    } else {
      return -1
    }
  })
  return res.status(200).json({ playerTeams: responsePlayers })
}

router.route('/').get(pastGamesRouter)

export default router
