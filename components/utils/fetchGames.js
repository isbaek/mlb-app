////
// FETCH API
// make a fetch api request to get the mlb game matches on a given day
////

import _ from "lodash";

// extracts and cleans up data
function normalizeGame(game) {
  return {
    id: game.id,
    homeName: game.home_team_name,
    awayName: game.away_team_name,
    status: game.status.status, // final, postponed or cancelled
    homeScore: game.linescore.r.home,
    awayScore: game.linescore.r.away
  };
}

// Fetch all the games in a given day
function fetchGameForDate() {
  return (
    fetch(
      "http://gd2.mlb.com/components/game/mlb/year_2014/month_04/day_06/master_scoreboard.json"
    )
      // Parse response as JSON
      .then(res => res.json())
      // Cleanup big JSON mess into posts
      .then(payload => {
        return payload.data.games.game.map(child => normalizeGame(child));
      })
      // catch any errors
      .catch(err => {
        console.log("parsing failed", err);
      })
  );
}

export default function fetchGames() {
  return fetchGameForDate();
}
