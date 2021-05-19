import Nba from './api';

(async () => {
  const NbaApi: Nba = new Nba();
  const league = NbaApi.api('league');
  const game = NbaApi.api('game');
  // const scores = await league.todayScores();
  // const standings = await league.fetchStandings();
  const today: Date = new Date();
  const yesterday: Date = new Date();
  yesterday.setDate(today.getDate() - 1);
  const todayScores = await league.scoreboard(today);
  const scoreboard = await league.scoreboard(yesterday);

  const boxscore = await game.boxscore(scoreboard.games[0].gameId, yesterday)

  // https://cdn.nba.com/logos/nba/{ teamUrlCode }/global/D/logo.svg
  // https://cdn.nba.com/headshots/nba/latest/260x190/{ personId }.png
  console.log(todayScores.games);
  //console.log(boxscore.stats.activePlayers);
})();
