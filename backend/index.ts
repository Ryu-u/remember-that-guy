import express from 'express'
import { Request, Response, RequestHandler, NextFunction } from 'express'
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
import * as bodyParser from 'body-parser'
import console = require('console')

// なるほど
const app = express()

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

type PromiseRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>

const wrap = (fn: PromiseRequestHandler): RequestHandler => {
  return (req, res, next) => fn(req, res, next).catch(next)
}

// Serve the static files from the React app
app.use(express.static('../build'))
app.use(bodyParser.json())

// 過去のゲーム取得
app.get(
  '/past_games',
  wrap(async (req: Request, res: Response) => {
    // 直近３ゲーム
    const pastGameIds: number[] = []
    const gamesResponse = await axios.get<MatchlistDto>(
      'https://jp1.api.riotgames.com/lol/match/v4/matchlists/by-account/SmTe3BkIqi-OTAHezqR_gDtXt2dYLFMTLerAUDvQfaPpBzJLYWM530WP?endIndex=3&beginIndex=0&api_key=RGAPI-d0d63d26-5eac-46b1-9272-90a9479133cf'
    )
    gamesResponse.data.matches.map((game: MatchReferenceDto) => {
      pastGameIds.push(game.gameId)
    })

    // プレイヤー情報
    const players: Players[] = []
    // ここを待たないといけないけど待たせ方がよくわからない
    await Promise.all(
      pastGameIds.map(async pastGameId => {
        const playersResponse = await axios.get<
          PartOfMatchDto<PartOfParticipantIdentityDto<PartOfPlayerDto>, PartOfParticipantDto>
        >(
          `https://jp1.api.riotgames.com/lol/match/v4/matches/${pastGameId}?api_key=RGAPI-d0d63d26-5eac-46b1-9272-90a9479133cf`
        )
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
          red: redTeamParticipants.sort()
        })
      })
    )

    res.status(200).json({ playerTeams: players })
  })
)

// ライバル一覧
app.get(
  '/rivals',
  wrap(async (req: Request, res: Response) => {
    const rivalsResponse = await db.any('select name, description from rivals order by created_at')
    console.log(rivalsResponse)
    res.set({ 'Access-Control-Allow-Origin': '*' })
    res.status(200).json({ rivals: rivalsResponse })
  })
)

// ライバル登録
app.post(
  '/remember_rivals',
  wrap(async (req: Request, res: Response) => {
    await db.none('insert into rivals(name, description) values($1, $2)', [req.body.name, req.body.description])
    res.status(201).send('OK')
  })
)
const port = process.env.PORT || 5000
app.listen(port)
