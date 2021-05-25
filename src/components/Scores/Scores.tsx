import React, { useEffect, useState, ReactElement } from "react"
import styled from 'styled-components';
import { Scoreboard, Game } from './scores-declarations';
import Nba from '../../api';
import * as fs from 'fs';
import * as path from 'path';

const ScoresBox = styled.div`
  margin-top: 10vh;
  display: flex;
  flex-direction: column;
  width: 80vw;
  height: 80vh;
`;

const GameBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 10vh;
  margin: 0.2em 0;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`;

const TeamScoreBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1em;
  margin-right: 1em;
`;

const FillerElement = styled.div`
  flex: auto;
`;

export const Scores: React.FC = (): ReactElement | null => {
  const [ scoreboard, setScoreboard ] = useState<Scoreboard>();
  const [ gameDate, setGameDate ] = useState<Date>(new Date());

  const NbaApi: Nba = new Nba();
  const league = NbaApi.api('league');

  const getScores = async ():Promise<void> => {
    const scoreboard = await league.scoreboard(gameDate);
    setScoreboard(scoreboard);
  }

  useEffect( () => {
    console.log('getting scores');
    if(!scoreboard)
      getScores();
  }, [gameDate]);

  const handleDateChange = (day: number):void => { 
    console.log(day);
    const nextDate = new Date();
    nextDate.setDate(day);
    setGameDate(nextDate);
  }
  
  return (
    <>
      { scoreboard && 
        <ScoresBox>
        <p>
          { gameDate.toLocaleDateString() }
          <a onClick={ () => handleDateChange( new Date().setDate(gameDate.getDate() - 1) ) }>{ '<' }</a>
          <a onClick={ () => handleDateChange( new Date().setDate(gameDate.getDate() + 1) ) }>{ '>' }</a>
        </p>
        { 
          scoreboard.games.map( (game: Game) => { 
            return ( 
              <GameBox key={ game.gameId } >
                <TeamScoreBox key={ game.vTeam.teamId } >
                  <img style={{ marginRight: '0.7em' }} src={ `https://cdn.nba.com/logos/nba/${ game.vTeam.teamId }/global/D/logo.svg` } height={ 64 } width={ 64 }/>
                  { game.vTeam.triCode } { game.vTeam.score }
                </TeamScoreBox>
  
                <FillerElement />
                <TeamScoreBox>
                  { game.hTeam.score } { game.hTeam.triCode }
                  <img style={{ marginLeft: '0.7em' }} src={ `https://cdn.nba.com/logos/nba/${ game.hTeam.teamId }/global/D/logo.svg` } height={ 64 } width={ 64 }/>
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

