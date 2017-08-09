import React from "react";

import fetchGames from "./utils/fetchGames.js";

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
    if (this.state.isLoading) {
      return <div> Loading</div>;
    }
    return (
      <div>
        <ul>
          {this.state.games.map(game => (
            <li key={game.id}>
              <p>{game.homeName}</p>
              <p>{game.awayName}</p>
              <p>{game.status}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ListView;
