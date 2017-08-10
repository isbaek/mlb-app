////
// FETCH API
// make a fetch api request to get the scores for a single mlb game
////

import _ from "lodash";

// Fetch one game
export default function fetchGame(gameDataDirectory) {
  return (
    fetch(`http://gd2.mlb.com${gameDataDirectory}/boxscore.json`)
      // Parse response as JSON
      .then(res => res.json())
      // Cleanup big JSON mess into games
      .then(payload => {
        const scores = payload.data.boxscore.linescore.inning_line_score;
        const battersHome = _.find(payload.data.boxscore.batting, {
          team_flag: "home"
        });
        const battersAway = _.find(payload.data.boxscore.batting, {
          team_flag: "away"
        });
        return { scores, battersAway, battersHome };
      })
      // catch any errors
      .catch(err => {
        console.log("parsing failed", err);
      })
  );
}
