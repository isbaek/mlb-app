import React from "react";

function teamLogoURL(teamCode) {
  return `https://securea.mlb.com/mlb/images/team_logos/124x150/${teamCode}@2x.png`;
}

function LogoScore({ team }) {
    return <div className="LogoScore">
        <img className="LogoScoreImage" src={teamLogoURL(team.code)} />
        <p>({team.totalWins} - {team.totalLosses})</p>
    </div>;
}

function GameSummary({ game }) {
    return <div className="GameSummary">
        <h2 className="GameSummaryTitle">
            {game.away.name} {game.away.runs}, {game.home.name} {game.home.runs}
        </h2>
        <p className="GameSummaryDate">{game.date}</p>
    </div>;
}

export default function GameOverview({ game }) {
  return (
    <div className="GameOverview">
        <LogoScore team={game.away} />
        <GameSummary game={game} />
        <LogoScore team={game.home} />
    </div>
  );
}
