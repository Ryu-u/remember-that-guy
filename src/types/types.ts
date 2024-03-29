export interface MatchlistDto {
  matches: MatchReferenceDto[]
  totalGames: number
  startIndex: number
  endIndex: number
}

export interface MatchReferenceDto {
  lane: string
  gameId: number
  champion: number
  platformId: string
  season: number
  queue: number
  role: string
  timestamp: number
}

export interface PartOfMatchDto<
  PI extends PartOfParticipantIdentityDto<PartOfPlayerDto>,
  P extends PartOfParticipantDto
> {
  participantIdentities: PI[]
  participants: P[]
  gameCreation: number
}

export interface PartOfParticipantIdentityDto<PL extends PartOfPlayerDto> {
  player: PL
  participantId: number
}

export interface PartOfParticipantDto {
  participantId: number
  teamId: 100 | 200
}

export interface PartOfPlayerDto {
  summonerName: string
}

export interface PartOfSummonerDto {
  accountId: string
}

export interface Players {
  blue: string[]
  red: string[]
  gameCreation: number
}

export interface Player {
  name: string
}

export interface Rival {
  name: string
  description: string
  createdAt: string
}

export interface PastGame {
  red: string[]
  blue: string[]
}

export enum TeamNames {
  RED = 'Red',
  BLUE = 'Blue'
}
