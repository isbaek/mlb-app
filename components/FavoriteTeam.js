import React from "react";
import Link from "next/link";
import _ from "lodash";

// Get teams (names and codes)
import getTeams from "./utils/teams";
const TEAMS = getTeams();

function teamLogoURL(teamCode) {
  return `https://securea.mlb.com/mlb/images/team_logos/124x150/${teamCode}.png`;
}

function setFavoriteTeam(teamCode) {
  localStorage.setItem("fav", teamCode);
  window.location.reload();
}

function hasLocalStorage() {
  try {
    return localStorage && true;
  } catch (exception) {
    return false;
  }
}

function getFavoriteTeam() {
  if (!hasLocalStorage()) {
    return "tor";
  }
  // get fav team, or toronto blue jays by default
  return localStorage.getItem("fav") || "tor";
}

export default function FavoriteTeam() {
  return (
    <div className="TeamList">
      {TEAMS.map(team => (
        <img
          className={`TeamImage ${getFavoriteTeam() === team.code ? "active" : ""}`}
          src={teamLogoURL(team.code)}
          alt={team.name}
          onClick={() => setFavoriteTeam(team.code)}
        />
      ))}
    </div>
  );
}
