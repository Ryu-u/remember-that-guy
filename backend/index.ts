import express from 'express'
import { Request, Response } from 'express'
import db from './db/connect'
import axios, { AxiosResponse } from 'axios'
import {
  MatchReferenceDto,
  MatchlistDto,
  PartOfMatchDto,
  PartOfParticipantIdentityDto,
  PartOfParticipantDto,
  PartOfPlayerDto,
  Players,
  Player
} from './types'
import { promisify } from 'util'

const app = express()

// Serve the static files from the React app
app.use(express.static('../build'))

app.get('/past_games', async (req: Request, res: Response) => {
  // 直近３ゲーム
  const pastGameIds: number[] = []
  const gamesResponse = await axios.get<MatchlistDto>(
    'https://jp1.api.riotgames.com/lol/match/v4/matchlists/by-account/SmTe3BkIqi-OTAHezqR_gDtXt2dYLFMTLerAUDvQfaPpBzJLYWM530WP?endIndex=3&beginIndex=0&api_key=RGAPI-3962d085-0317-45ea-a989-4d40f5c8c14b'
  )
  gamesResponse.data.matches.map((game: MatchReferenceDto) => {
    pastGameIds.push(game.gameId)
  })

  // プレイヤー情報
  const players: Players[] = []
  // ここを待たないといけないけど待たせ方がよくわからない
  await pastGameIds.map(async pastGameId => {
    const playersResponse = await axios.get<
      PartOfMatchDto<
        PartOfParticipantIdentityDto<PartOfPlayerDto>,
        PartOfParticipantDto
      >
    >(
      `https://jp1.api.riotgames.com/lol/match/v4/matches/${pastGameId}?api_key=RGAPI-3962d085-0317-45ea-a989-4d40f5c8c14b`
    )
    const blueTeamParticipantIds: number[] = []
    const redTeamParticipantIds: number[] = []

    await playersResponse.data.participants.map(
      (participant: PartOfParticipantDto) => {
        if (participant.teamId === 100) {
          blueTeamParticipantIds.push(participant.participantId)
        } else {
          redTeamParticipantIds.push(participant.participantId)
        }
      }
    )

    const blueTeamParticipants: string[] = []
    const redTeamParticipants: string[] = []
    await playersResponse.data.participantIdentities.map(
      participantIdentity => {
        if (
          blueTeamParticipantIds.includes(participantIdentity.participantId)
        ) {
          blueTeamParticipants.push(participantIdentity.player.summonerName)
        } else {
          redTeamParticipants.push(participantIdentity.player.summonerName)
        }
      }
    )

    console.log('first')
    await promisify(() =>
      players.push({
        blue: blueTeamParticipants,
        red: redTeamParticipants
      })
    )
  })

  console.log('failure')
  res.json({ playerTeams: players })
})
const port = process.env.PORT || 5000
app.listen(port)
