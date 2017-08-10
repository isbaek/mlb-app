import React from 'react';
import Link from 'next/link';
import _ from 'lodash';

// Get teams (names and codes)
import getTeams from './utils/teams';
const TEAMS = getTeams();

function teamLogoURL(teamCode) {
  return `https://securea.mlb.com/mlb/images/team_logos/124x150/${teamCode}.png`;
}


export default class Homepage extends React.Component {

    render() {
        return <div className="HomepageTeamList">
          {TEAMS.map(team => (
            <div className="HomepageTeam">
              <img src={teamLogoURL(team.code)} />
              <span>{team.name}</span>
            </div>
          ))}
        </div>;
    }
}