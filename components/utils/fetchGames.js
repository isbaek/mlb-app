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

// extracts and cleans up data
function normalizeGame(game) {
  const runs = game.linescore.r;
  return {
    id: game.id,
    home: {
      name: game.home_team_name,
      score: runs.home,
      winner: runs.home > runs.away
    },
    away: {
      name: game.away_team_name,
      score: runs.away,
      winner: runs.home < runs.away
    },
    status: game.status.status // final, postponed or cancelled
  };
}

// Fetch all the games in a given day
function fetchGamesForDate() {
  return (
    fetch(
      "http://gd2.mlb.com/components/game/mlb/year_2014/month_04/day_06/master_scoreboard.json"
    )
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
      // catch any errors
      .catch(err => {
        console.log("parsing failed", err);
      })
  );
}

export default function fetchGames() {
  return fetchGamesForDate();
}
