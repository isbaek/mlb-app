import React from "react";
import ReactTable from "react-table";
//import "react-table/react-table.css";

import fetchGame from "./utils/fetchGame.js";

function teamLogoURL(teamCode) {
  return `https://securea.mlb.com/mlb/images/team_logos/124x150/${teamCode}@2x.png`;
}

export default class DetailView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scores: [],
      players: []
    };
  }

  componentDidMount() {
    // fetch the game scores and batting players
    fetchGame()
      // save into state
      .then((scores, players) =>
        this.setState({ scores: scores, players: players })
      );
  }

  render() {
    return <ReactTable data={data} columns={columns} />;
  }
}
