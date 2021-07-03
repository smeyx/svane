import React, { useEffect, useState, ReactElement } from "react"
import styled from 'styled-components';
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
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const GameScoreBox = styled.div`
  margin-left: 0.5em;
  display: flex;
  flex-direction: column;
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
    fs.readFile(path.resolve(__dirname, '../../../../../../scoreboardv3.json'), { encoding: 'utf8' }, ( (err, data) => {
      console.log(err);
      if(!err) {
        let scoreboard: ScoreboardV3 = JSON.parse(data);
        setScoreboard(scoreboard.scoreboard)
      }
    }));

    // const scoreboard = await league.scoreboard(gameDate);
    // setScoreboard(scoreboard);
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
    // setGameDate(nextDate);
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
            console.log(game);
            return ( 
              <GameBox key={ game.gameId } >
                <TeamScoreBox key={ game.awayTeam.teamId } >
                  <img src={ `./public/images/${ game.awayTeam.teamId }.svg` } />
                  <GameScoreBox>
                    { game.awayTeam.score } 
                    <div >
                      { game.gameLeaders.awayLeaders.name }
                      <img src={`https://cdn.nba.com/headshots/nba/latest/260x190/${ game.gameLeaders.awayLeaders.personId }.png`}/>
                    </div>
                  </GameScoreBox>
                </TeamScoreBox>
  
                <TeamScoreBox>
              <img src={ `./public/images/${ game.homeTeam.teamId }.svg` } />
                  <GameScoreBox>
                    { game.homeTeam.score }
                    <div >
                      { game.gameLeaders.homeLeaders.name }
                      <img src={`https://cdn.nba.com/headshots/nba/latest/260x190/${ game.gameLeaders.homeLeaders.personId }.png`} />
                    </div>
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

