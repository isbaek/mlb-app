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

  handleToggle = () => {
    this.setState({
      toggleTable: !this.state.toggleTable
    });
  };

  activeTeam = () => {
    if (this.state.toggleTable) {
      return this.state.game.home;
    }
    return this.state.game.away;
  };

  render() {
    if (this.state.isLoading) {
      return <LoadingView />;
    }

    const game = this.state.game;
    return (
      <div>
        <GameOverview
          game={game}
          onClick={this.handleToggle}
          activeTeam={this.activeTeam()}
        />
        <h2>ScoreTable</h2>
        <ScoreTable game={game} />
        <h2>Batting Table - {this.activeTeam().name}</h2>
        <BattingTable batters={this.activeTeam().batters} />
      </div>
    );
  }
}
