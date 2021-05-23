export type Player = {
  personId: string;
  firstName: string;
  lastName: string;
}

export type Team = {
  teamId: string;
  triCode: string;
  win: number;
  loss: number;
  score: number;
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
  current: number;
  type: string;
  maxRegular: number;
  isHalftime: boolean;
  isEndOfPeriod: boolean;
}

export type GameDuration = {
  hours: number;
  minutes: number;
}

export type Game = {
  seasonYear: number;
  gameId: string;
  arena: Arena;
  isGameActivated: boolean;
  startTimeUTC: Date;
  gameUrlCode: string;
  clock: string;
  isBuzzerBeater: boolean;
  attendance: number;
  gameDuration: GameDuration;
  period: Period;
  vTeam: Team;
  hTeam: Team;
}

export type Scoreboard = {
  numGames: number;
  games: Game[];
}
