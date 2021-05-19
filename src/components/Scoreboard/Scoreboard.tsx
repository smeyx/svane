import React, { useEffect, useState, ReactElement } from "react"
import Nba from '../../api';

export interface ScoreboardProps {
  gameDate: Date
}

export interface Player {
  personId: string;
  firstName: string;
  lastName: string;
}

export interface Team {
  teamId: string;
  triCode: string;
  win: number;
  loss: number;
  score: number;
  linescore: number[];
}

export interface Arena {
  name: string;
  isDomestic: boolean;
  city: string;
  stateAbbr: string;
  county: string;
}

export interface Period {
  current: number;
  type: string;
  maxRegular: number;
  isHalftime: boolean;
  isEndOfPeriod: boolean;
}

export interface GameDuration {
  hours: number;
  minutes: number;
}

export interface Game {
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

export interface Scoreboard {
  numGames: number;
  games: Game[];
}

export const Scoreboard: React.FC<ScoreboardProps> = (props: ScoreboardProps): ReactElement | null => {
  const [ scoreboard, setScoreboard ] = useState<Scoreboard>();

  const NbaApi: Nba = new Nba();
  const league = NbaApi.api('league');
  const game = NbaApi.api('game');

  const getScores = async () => {
    const scoreboard = await league.scoreboard(props.gameDate);
    setScoreboard(scoreboard);
    console.log(scoreboard);
  }

  useEffect( () => {
    if(!scoreboard) {
      getScores();
    }
  }, []);


  return (
    <>
      { scoreboard && 
        <>
        <p>Number of Games: { scoreboard.numGames }</p>
        { 
          scoreboard.games.map( (game: Game) => { 
            return ( 
              <div>
                <div>{ game.vTeam.triCode } { game.vTeam.score }</div>
                <div>{ game.hTeam.triCode } { game.hTeam.score }</div>
              </div>
            );
          })
        }
        </>
      }
    </>
  );
};

