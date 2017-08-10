import React from "react";
import ReactTable from "react-table";
//import "react-table/react-table.css";

import fetchGame from "./utils/fetchGame.js";

// column labels for table
function genColumns(home) {
  return [].concat(
  { Header: "Team Name", accessor: "name" },
  // Dynamically generate inning columns
  _.range(1, home.scores.length + 1).map(inning => ({
    Header: String(inning),
    accessor: `scores.${inning - 1}`,
  })),
  { Header: "R", accessor: "runs" },
  { Header: "H", accessor: "hits" },
  { Header: "E", accessor: "errors" },
  );
};

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

    return <ReactTable data={[
      game.home,
      game.away,
    ]} columns={columns} />;
  }
}
