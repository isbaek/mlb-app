import React from "react";
import Link from "next/link";
import _ from "lodash";

// Get teams (names and codes)
import getTeams from "./utils/teams";
const TEAMS = getTeams();

function teamLogoURL(teamCode) {
  return `https://securea.mlb.com/mlb/images/team_logos/124x150/${teamCode}.png`;
}

export default function FavoriteTeam() {
  return (
    <div className="TeamList">
      {TEAMS.map(team => (
        <img
          className="TeamImage"
          src={teamLogoURL(team.code)}
          alt={team.name}
        />
      ))}
    </div>
  );
}
