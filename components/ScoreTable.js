import React from "react";
import ReactTable from "react-table";
//import "react-table/react-table.css";

import fetchGame from "./utils/fetchGame.js";

const COLUMNS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "R", "H", "E"];

export default class ScoreTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scores: []
    };
  }

  componentDidMount() {
    // fetch the game scores and batting players
    fetchGame()
      // save into state
      .then(scores => this.setState({ scores: scores }));
  }

  render() {
    const columns = COLUMNS.map(c => ({ Header: c, accessor: c }));
    const data = [];

    return <ReactTable data={data} columns={columns} />;
  }
}
