////
// FETCH API
// make a fetch api request to get the mlb game matches on a given day
////

import _ from "lodash";

// extracts and cleans up data
function normalizeGame(game) {
  return {
    id: game.id,
    home: {
      name: game.home_team_name,
      score: game.linescore.r.home
    },
    away: {
      name: game.away_team_name,
      score: game.linescore.r.away
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
