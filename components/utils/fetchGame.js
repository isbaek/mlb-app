////
// FETCH API
// make a fetch api request to get the scores for a single mlb game
////

import _ from "lodash";
// handle older safari version that cannot read fetch
import "whatwg-fetch";

// Fetch one game
export default function fetchGame(gameDataDirectory) {
  return (
    fetch(`http://gd2.mlb.com${gameDataDirectory}/boxscore.json`)
      .then(res => res.json())
      // Cleanup big JSON mess into games
      .then(payload => {
        const boxscore = payload.data.boxscore;
        const linescore = boxscore.linescore;

        // comparing score utility const
        const runs = {
          home: Number(linescore.home_team_runs),
          away: Number(linescore.away_team_runs)
        };

        // runs, hits and errors for home and away team
        const home = {
          code: boxscore.home_team_code,
          name: boxscore.home_fname,
          totalWins: boxscore.home_wins,
          totalLosses: boxscore.home_loss,
          runs: linescore.home_team_runs,
          hits: linescore.home_team_hits,
          errors: linescore.home_team_errors,
          scores: _.map(linescore.inning_line_score, "home"),
          batters: _.find(payload.data.boxscore.batting, {
            team_flag: "home"
          }).batter,
          winner: runs.home > runs.away
        };
        const away = {
          code: boxscore.away_team_code,
          name: boxscore.away_fname,
          totalWins: boxscore.away_wins,
          totalLosses: boxscore.away_loss,
          runs: linescore.away_team_runs,
          hits: linescore.away_team_hits,
          errors: linescore.away_team_errors,
          scores: _.map(linescore.inning_line_score, "away"),
          batters: _.find(payload.data.boxscore.batting, {
            team_flag: "away"
          }).batter,
          winner: runs.home < runs.away
        };

        return { home, away, date: boxscore.date };
      })
  );
}
