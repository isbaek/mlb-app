import React from "react";

//import presentational components
import ScoreTable from "./ScoreTable";
import BattingTable from "./BattingTable";
import LoadingView from "./LoadingView";

import fetchGame from "./utils/fetchGame.js";

function teamLogoURL(teamCode) {
  return `https://securea.mlb.com/mlb/images/team_logos/124x150/${teamCode}@2x.png`;
}

export default class DetailView extends React.Component {
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
      return <LoadingView />;
    }

    const game = this.state.game;
    return (
      <div>
        <ScoreTable game={game} />
        <BattingTable game={game} />
      </div>
    );
  }
}
