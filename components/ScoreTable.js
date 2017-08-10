import React from "react";
import ReactTable from "react-table";
//import "react-table/react-table.css";

import fetchGame from "./utils/fetchGame.js";

// column labels for table
const COLUMNS = [
  "Team Name",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "R",
  "H",
  "E"
];

export default class ScoreTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scores: [],
      isLoading: true
    };
  }

  componentDidMount() {
    // fetch the game scores and batting players
    fetchGame()
      // save into state
      .then(scores => this.setState({ scores: scores, isLoading: false }));
  }

  render() {
    if (this.state.isLoading) {
      return <div>Loading</div>;
    }
    // map each label on to the column
    const columns = COLUMNS.map(c => ({ Header: c, accessor: c }));

    const data = this.state.scores.scores;
    // get the inning scores for home
    const homeScores = data.map(score => score.home).slice(0, 9);
    // get the inning scores for away
    const awayScores = data.map(score => score.away).slice(0, 9);

    return <ReactTable data={[homeScores, awayScores]} columns={columns} />;
  }
}
