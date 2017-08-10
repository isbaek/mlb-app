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
function GameCardTeam({ team }) {
  if (team.winner) {
    return <span><b>{team.name} - {team.score}</b></span>;
  }
  return <span>{team.name} - {team.score}</span>;
}

// this is a parent component of the team game card
function GameCard({ game }) {
  return (
    <Link href={`/game?id=${game.gameDataDirectory}`}>
      <a>
        <li key={game.id}>
          <GameCardTeam team={game.home} />
          <GameCardTeam team={game.away} />
          <p>{game.status}</p>
        </li>
      </a>
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
      <div>
        <DatePicker onChange={this.change} date={this.state.date} />
        <ul>
          {this.state.games.map(game => <GameCard game={game} />)}
        </ul>
      </div>
    );
  }
}

export default ListView;
