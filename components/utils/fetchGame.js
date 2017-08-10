////
// FETCH API
// make a fetch api request to get the scores for a single mlb game
////

import _ from "lodash";

// Fetch one game
export default function fetchGame() {
  return (
    //fetch(`http://gd2.mlb.com${gameDataDirectory}/boxscore.json`)
    fetch(
      "http://gd2.mlb.com/components/game/mlb/year_2016/month_10/day_04/gid_2016_10_04_balmlb_tormlb_1/boxscore.json"
    )
      // Parse response as JSON
      .then(res => res.json())
      // Cleanup big JSON mess into games
      .then(payload => {
        // runs, hits and errors
        const rhe = {
          runs: payload.data.boxscore.linescore.home_team_runs
        };
        // score array with innings
        const scores = payload.data.boxscore.linescore.inning_line_score;
        // the batters of the home team
        const battersHome = _.find(payload.data.boxscore.batting, {
          team_flag: "home"
        });
        // the batters of the away team
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
