////
// FETCH API
// make a fetch api request to get the mlb game matches on a given day
////

/* list of json urls for different game numbers

Multiple games = "http://gd2.mlb.com/components/game/mlb/year_2014/month_04/day_06/master_scoreboard.json";
One game = "http://gd2.mlb.com/components/game/mlb/year_2016/month_10/day_04/master_scoreboard.json";
No game = "http://gd2.mlb.com/components/game/mlb/year_2016/month_12/day_25/master_scoreboard.json";

*/

import _ from "lodash";
import 'whatwg-fetch';

// extracts and cleans up data
function normalizeGame(game) {
  // represents the score runs
  const r = (game.linescore && game.linescore.r) || {home: 0, away: 0};
  const runs = { home: Number(r.home), away: Number(r.away) };
  return {
    id: game.id,
    home: {
      code: game.home_code,
      name: game.home_team_name,
      score: runs.home,
      winner: runs.home > runs.away
    },
    away: {
      code: game.away_code,
      name: game.away_team_name,
      score: runs.away,
      winner: runs.home < runs.away
    },
    // final, postponed or cancelled
    status: game.status.status,
    gameDataDirectory: game.game_data_directory,
    date: game.original_date
  };
}

// Fetch all the games in a given day
function fetchGamesForDate(year, month, day) {
  return (
    fetch(
      `http://gd2.mlb.com/components/game/mlb/year_${year}/month_${month}/day_${day}/master_scoreboard.json`
    )
    //fetch("http://gd2.mlb.com/components/game/mlb/year_2014/month_04/day_06/master_scoreboard.json")
      // Parse response as JSON
      .then(res => res.json())
      // Cleanup big JSON mess into posts
      .then(payload => {
        const games = payload.data.games.game;

        // if only one game, just return that game
        if (!_.isArray(games)) {
          return [normalizeGame(games)];
        }
        // otherwise map over multiple games
        return games.map(normalizeGame);
      })
  );
}

export default fetchGamesForDate;
