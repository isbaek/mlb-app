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
        const linescore = payload.data.boxscore.linescore;

        // runs, hits and errors for home and away team
        const home = {
          name: payload.data.boxscore.home_sname,
          runs: linescore.home_team_runs,
          hits: linescore.home_team_hits,
          errors: linescore.home_team_errors,
          scores: _.map(linescore.inning_line_score, "home"),
          batters: _.find(payload.data.boxscore.batting, {
            team_flag: "home"
          })
        };
        const away = {
          name: payload.data.boxscore.away_sname,
          runs: linescore.away_team_runs,
          hits: linescore.away_team_hits,
          errors: linescore.away_team_errors,
          scores: _.map(linescore.inning_line_score, "away"),
          batters: _.find(payload.data.boxscore.batting, {
            team_flag: "away"
          })
        };

        return { home, away };
      })
      // catch any errors
      .catch(err => {
        console.log("parsing failed", err);
      })
  );
}
