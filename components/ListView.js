import React from "react";

import fetchGames from "./utils/fetchGames.js";

function GameCardTeam({ team }) {
  if (team.winner) {
    return <p><b>{team.name} - {team.score}</b></p>;
  }
  return <p>{team.name} - {team.score}</p>;
}

function GameCard({ game }) {
  return (
    <li key={game.id}>
      <GameCardTeam team={game.home} />
      <GameCardTeam team={game.away} />
      <p>{game.status}</p>
    </li>
  );
}

class ListView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      games: []
    };
  }

  componentDidMount() {
    // make a fetch game request
    fetchGames()
      // save into state
      .then(games => this.setState({ games: games, isLoading: false }));
  }

  render() {
    // wait for the games to load
    if (this.state.isLoading) {
      return <div> Loading</div>;
    }
    return (
      <div>
        <ul>
          {this.state.games.map(game => <GameCard game={game} />)}
        </ul>
      </div>
    );
  }
}

export default ListView;
