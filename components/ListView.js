//libs
import React from "react";
import Link from "next/link";
import moment from "moment";

//components
import LoadingView from "./LoadingView";
import DatePicker from "./DatePicker";

//utils
import fetchGames from "./utils/fetchGames.js";

////
// Presentational
////

// this is a card component for displaying the winner
function teamLogoURL(teamCode) {
  return `https://securea.mlb.com/mlb/images/team_logos/124x150/${teamCode}.png`;
}

function GameCardTeam({ team }) {
    return <div className={`GameCardTeam ${team.winner ? 'Winner' : ''}`}>
        <span className="GameCardTeamName">{team.name}</span>
        <img className="GameCardTeamImage" src={teamLogoURL(team.code)} />
        <p className="GameCardTeamScore">{team.score}</p>
    </div>;
}

function GameCardTeamsVS() {
  return <span className="GameCardTeamsVS">vs</span>;
}

function GameCardStatus({ status }) {
  return <span className={`GameCardStatus ${status}`}>{status}</span>;
}

// this is a parent component of the team game card
function GameCard({ game }) {
  return (
    <Link href={`/game?id=${game.gameDataDirectory}`} prefetch>
        <div className="GameCard">
          <div className="GameCardTeams">
            <GameCardTeam team={game.home} />
            <GameCardTeamsVS />
            <GameCardTeam team={game.away} />
          </div>
          <GameCardStatus status={game.status} />
        </div>
    </Link>
  );
}

////
// Container
////

class ListView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      games: [],
      date: moment()
    };
  }

  componentDidMount() {
    // make a fetch game request
    fetchGames()
      // save into state
      .then(games => this.setState({ games: games, isLoading: false }));
  }

  change = date => {
    this.setState({
      date: date
    });
  };

  render() {
    // wait for the games to load
    if (this.state.isLoading) {
      return <LoadingView />;
    }
    return (
      <div className="ListView">
        <DatePicker onChange={this.change} date={this.state.date} />
        <div className="GameCards">
          {this.state.games.map(game => <GameCard game={game} />)}
        </div>
      </div>
    );
  }
}

export default ListView;
