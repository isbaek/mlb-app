import React from "react";

function teamLogoURL(teamCode) {
  return `https://securea.mlb.com/mlb/images/team_logos/124x150/${teamCode}.png`;
}

function LogoScore({ team, onClick, active }) {
  return (
    <div
      className={`LogoScore ${team.winner ? "Winner" : ""} ${team.code === active.code ? "active" : ""}`}
      onClick={onClick}
    >
      <img className="LogoScoreImage" src={teamLogoURL(team.code)} />
      <p>({team.totalWins} - {team.totalLosses})</p>
    </div>
  );
}

function GameSummary({ game }) {
  return (
    <div className="GameSummary">
      <h2 className="GameSummaryTitle">
        {game.away.name} {game.away.runs}, {game.home.name} {game.home.runs}
      </h2>
      <p className="GameSummaryDate">{game.date}</p>
    </div>
  );
}

export default function GameOverview({ game, onClick, activeTeam }) {
  return (
    <div className="GameOverview">
      <LogoScore team={game.away} onClick={onClick} active={activeTeam} />
      <GameSummary game={game} />
      <LogoScore team={game.home} onClick={onClick} active={activeTeam} />
    </div>
  );
}
