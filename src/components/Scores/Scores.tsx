import React, { useEffect, useState, ReactElement } from "react"
import styled, { css  } from 'styled-components';
import { ScoreboardV3, Scoreboard, Game } from './scores-declarations';
import Nba from '../../api';
import * as fs from 'fs';
import * as path from 'path';

const ScoresBox = styled.div`
  margin-top: 10vh;
  display: flex;
  flex-direction: column;
  min-width: 80vw;
  min-height: 80vh;
`;

const GameBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.2em 0;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`;

const TeamScoreBox = styled.div`
  margin: 0.4em;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const GameScoreBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const FillerElement = styled.div`
  flex: auto;
`;

const LogoImage = styled.img<{ bgColor?: string }>`
  width: 48px;

  ${ props => props.bgColor && css`
    background-color: ${ props.bgColor };
  `};
`;

const PlayerImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 100%;
  background-color: hsl(0, 0%, 90%);
  object-fit: cover;
  box-shadow: inset 0 0 10px hsl(0, 0%, 70%);
`;

export const Scores: React.FC = (): ReactElement | null => {
  const [ scoreboard, setScoreboard ] = useState<Scoreboard>();
  const [ gameDate, setGameDate ] = useState<Date>(new Date());
  const [ teams, setTeams ] = useState([]);

  const NbaApi: Nba = new Nba();
  const league = NbaApi.api('league');

  const getTeamsConfig = ():void => {
    fs.readFile(path.resolve(__dirname, '../../../../../../teams_config.json'), { encoding: 'utf8' }, ( (err, data) => {
     if(!err) {
       const teams = JSON.parse(data);
       const nbaTeams = teams.teams.config.filter( (team: any) => team.ttsName);
       setTeams(nbaTeams);
     }
    }));
  }

  const getBgColor = (teamId: string):string => {
    // return teams.filter( (team: any) => team.teamId === teamId);
    return '';
  }

  const getScores = async ():Promise<void> => {
    fs.readFile(path.resolve(__dirname, '../../../../../../scoreboardv3.json'), { encoding: 'utf8' }, ( (err, data) => {
      if(!err) {
        let scoreboard: ScoreboardV3 = JSON.parse(data);
        setScoreboard(scoreboard.scoreboard)
      }
    }));

    // const scoreboard = await league.scoreboard(gameDate);
    // setScoreboard(scoreboard);
  }

  useEffect( () => {
    if(!scoreboard)
      getScores();
      getTeamsConfig();
  }, [gameDate]);

  // TODO: improve this stuff. makes a lot of noise.
  const handleIncrementDate = ():void => {
    const currentDate: Date = gameDate;
    const newDate: Date = new Date();
    newDate.setDate(currentDate.getDate() + 1);

    setGameDate(newDate);
  }
  
  const handleDecrementDate = ():void => {
    const currentDate: Date = gameDate;
    const newDate: Date = new Date();
    newDate.setDate(currentDate.getDate() - 1);

    setGameDate(newDate);
  }
  
  return (
    <>
      { scoreboard && 
        <ScoresBox>
        <p>
          { gameDate.toLocaleDateString() }
          <a onClick={ () => handleDecrementDate() }>{ '<' }</a>
          <a onClick={ () => handleIncrementDate() }>{ '>' }</a>
        </p>
        { 
          scoreboard.games.map( (game: Game) => { 
            return ( 
              <GameBox key={ game.gameId } >
                <TeamScoreBox key={ game.awayTeam.teamId } >
                  <LogoImage src={ `./public/images/${ game.awayTeam.teamId }.svg` } />
                  <GameScoreBox>
                    { game.awayTeam.score } 
                  </GameScoreBox>
                </TeamScoreBox>
  
                <TeamScoreBox>
              <LogoImage src={ `./public/images/${ game.homeTeam.teamId }.svg` } />
                  <GameScoreBox>
                    { game.homeTeam.score }
              { 
                /*
                    <div >
                      { game.gameLeaders.homeLeaders.name }
                      <PlayerImage src={`./public/images/203458.png`} />
                    </div>
                 */ 
              }
                  </GameScoreBox>
                </TeamScoreBox>
              </GameBox>
            );
          })
        }
        </ScoresBox>
      }
    </>
  );
};

