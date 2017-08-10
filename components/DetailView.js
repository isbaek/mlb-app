import React from "react";

//import presentational components
import GameOverview from "./GameOverview";
import ScoreTable from "./ScoreTable";
import BattingTable from "./BattingTable";
import LoadingView from "./LoadingView";

//utils
import fetchGame from "./utils/fetchGame.js";

export default class DetailView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      game: null,
      isLoading: true,
      toggleTable: true
    };
  }

  componentDidMount() {
    // fetch the game scores and batting players
    fetchGame(this.props.gameDataDirectory)
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
        <GameOverview game={game} />
        <ScoreTable game={game} />
        {this.state.toggleTable
          ? <BattingTable game={game.home.batters} />
          : <BattingTable game={game.away.batters} />}
        <button onClick={this.handleToggle} />
      </div>
    );
  }
}
