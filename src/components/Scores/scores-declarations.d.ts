export type Player = {
  personId: string;
  firstName: string;
  lastName: string;
}

export type LeaderStats = {
  personId: string;
  name: string;
  jerseyNum: string;
  position: string;
  points: number;
  rebounds: number;
  assists: number;
}

export type Team = {
  teamId: string;
  teamName: string;
  teamCity: string;
  teamTricode: string;
  teamSlug: string;
  wins: number;
  losses: number;
  score: number;
  seed: number;
  inBonus: null | boolean;
  timeoutsRemaining: number;
  periods: Period[];
  linescore: number[];
}

export type Arena = {
  name: string;
  isDomestic: boolean;
  city: string;
  stateAbbr: string;
  county: string;
}

export type Period = {
  period: number;
  periodType: 'REGULAR' | 'OVERTIME';
  score: number;
}

export type GameDuration = {
  hours: number;
  minutes: number;
}

export type Leaders = {
  homeLeaders: LeaderStats;
  awayLeader: LeaderStats;
}

export type Game = {
  gameId: string;
  gameCode: string;
  gameStatus: number;
  gameStatusText: string;
  gameTimeUTC: Date;
  gameEt: Date;
  seriesGameNumber: string;
  seriesText: string;
  ifNecessary: boolean;
  period: number;
  gameClock: string;
  // arena: Arena;
  awayTeam: Team;
  gameLeaders: Leaders
  teamLeader: Leaders
  homeTeam: Team;
}

export type Scoreboard = {
  gameDate: string;
  leagueId: string;
  leagueName: string;
  games: Game[];
}

export type ScoreboardV3 = {
  meta: {};
  scoreboard: Scoreboard;
}
