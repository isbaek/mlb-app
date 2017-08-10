import React from "react";
import ReactTable from "react-table";

import fetchGame from "./utils/fetchGame.js";

// column labels for batting table
const COLUMNS = [
  { Header: "Name", accessor: "name" },
  { Header: "AB", accessor: "ab", minWidth: 20 },
  { Header: "R", accessor: "r", minWidth: 20 },
  { Header: "H", accessor: "h", minWidth: 20 },
  { Header: "RBI", accessor: "rbi", minWidth: 20 },
  { Header: "BB", accessor: "bb", minWidth: 20 },
  { Header: "SO", accessor: "so", minWidth: 20 },
  { Header: "LOB", accessor: "lob", minWidth: 20 },
  { Header: "AVG", accessor: "avg", minWidth: 20 }
];

export default class BattingTable extends React.Component {
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
    console.log("batters: ", game.home.batters);
    return (
      <ReactTable
        data={[game.home.batters, game.away.batters]}
        columns={COLUMNS}
        showPagination={false}
        defaultPageSize={2}
        sortable={false}
        resizable={false}
      />
    );
  }
}
