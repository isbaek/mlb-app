import React from "react";

import Table from "./Table";
import fetchGame from "./utils/fetchGame.js";

// column labels for table
function genColumns(home) {
  return [].concat(
    { Header: "Team Name", accessor: "name" },
    // Dynamically generate inning columns
    _.range(1, home.scores.length + 1).map(inning => ({
      Header: String(inning),
      accessor: `scores.${inning - 1}`,
      minWidth: 20
    })),
    { Header: "R", accessor: "runs", minWidth: 20 },
    { Header: "H", accessor: "hits", minWidth: 20 },
    { Header: "E", accessor: "errors", minWidth: 20 }
  );
}

export default class ScoreTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      game: null,
      isLoading: true
    };
  }

  componentDidMount() {
    // fetch the game scores and batting players
    fetchGame()
      // save into state
      .then(game => this.setState({ game: game, isLoading: false }));
  }

  render() {
    if (this.state.isLoading) {
      return <div>Loading</div>;
    }

    const game = this.state.game;

    // Columns will vary depending on number of innings
    // so we need to generate them dynamically
    const columns = genColumns(game.home);

    return (
      <Table
        data={[game.home, game.away]}
        columns={columns}
      />
    );
  }
}
