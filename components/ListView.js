//libs
import React from "react";
import moment from "moment";
import _ from "lodash";

// next utils
import Router from "next/router";
import Link from "next/link";

// components
import LoadingView from "./LoadingView";
import ErrorView from "./ErrorView";
import DatePicker from "./DatePicker";

//utils
import fetchGames from "./utils/fetchGames";

////
// Presentational
////

// this is a card component for displaying the winner
function teamLogoURL(teamCode) {
  return `https://securea.mlb.com/mlb/images/team_logos/124x150/${teamCode}.png`;
}

function GameCardTeam({ team }) {
  return (
    <div className={`GameCardTeam ${team.winner ? "Winner" : ""}`}>
      <span className="GameCardTeamName">{team.name}</span>
      <img className="GameCardTeamImage" src={teamLogoURL(team.code)} />
      <p className="GameCardTeamScore">{team.score}</p>
    </div>
  );
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
    //prefetch saves loading time
    (
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
    )
  );
}

////
// Container
////

class ListView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingError: "",
      isLoading: true,
      games: []
    };
  }

  componentDidMount() {
    this.fetchGames(this.props.date);
  }

  componentWillReceiveProps(nextProps) {
    this.fetchGames(nextProps.date);
  }

  fetchGames(date) {
    // Reset state
    this.setState({ loadingError: "", isLoading: true, games: [] });

    const [year, month, day] = date.format("YYYY/MM/DD").split("/", 3);
    // Fetch games for a given day
    fetchGames(year, month, day)
      // save into state
      .then(games => this.setState({ games: games, isLoading: false }))
      // Catch error
      .catch(err =>
        this.setState({ errorLoading: String(err), isLoading: false })
      );
  }

  change = date => {
    // Navigate to specific date
    Router.push(`/games?date=${date.format("YYYY/MM/DD")}`);
  };

  getFavorite = () => {
    return localStorage.getItem("fav") || "tor";
  };

  render() {
    // Handle errors in load
    if (this.state.errorLoading) {
      return <ErrorView msg={this.state.errorLoading} />;
    }

    // wait for the games to load
    if (this.state.isLoading) {
      return <LoadingView />;
    }

    // Sort by favorite team
    const favorite = this.getFavorite();
    const sortedGames = _.sortBy(this.state.games, game => {
      // Go blue jays !
      if (game.home.code === favorite || game.away.code === favorite) {
        return -1;
      }
      return 0;
    });

    return (
      <div className="ListView">
        <h1 className="ListViewTitle">
          {this.props.date.format("dddd Do of MMM YYYY")}
        </h1>
        <DatePicker onChange={this.change} date={this.props.date} />
        <div className="GameCards">
          {sortedGames.map(game => <GameCard game={game} />)}
        </div>
      </div>
    );
  }
}

export default ListView;
