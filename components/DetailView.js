import React from "react";

//import presentational components
import GameOverview from "./GameOverview";
import ScoreTable from "./ScoreTable";
import BattingTable from "./BattingTable";
import LoadingView from "./LoadingView";
import ErrorView from "./ErrorView";

//utils
import fetchGame from "./utils/fetchGame.js";

export default class DetailView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      game: null,
      isLoading: true,
      toggleTable: true,
      loadingError: ""
    };
  }

  componentDidMount() {
    // fetch the game scores and batting players
    fetchGame(this.props.gameDataDirectory)
      // save into state
      .then(game => this.setState({ game: game, isLoading: false }))
      // catch errors
      .catch(err =>
        this.setState({ loadingError: String(err), isLoading: false })
      );
  }

  // toggle batter view
  handleToggle = () => {
    this.setState({
      toggleTable: !this.state.toggleTable
    });
  };

  // get the current active team batter view
  activeTeam = () => {
    if (this.state.toggleTable) {
      return this.state.game.home;
    }
    return this.state.game.away;
  };

  render() {
    // handle loading
    if (this.state.isLoading) {
      return <LoadingView />;
    }

    // catch any errors
    if (this.state.loadingError) {
      return <ErrorView msg="Baseball not found :( Stay tuned!" />;
    }

    const game = this.state.game;
    return (
      <div>
        <GameOverview
          game={game}
          onClick={this.handleToggle}
          activeTeam={this.activeTeam()}
        />
<<<<<<< HEAD
        <h2>Score Table</h2>
=======
        <h2  className="TableHeading ScoreTable">Score Table</h2>
>>>>>>> origin/master
        <ScoreTable game={game} />
        <h2 className="TableHeading BattingTable">Batting Table - {this.activeTeam().name}</h2>
        <BattingTable batters={this.activeTeam().batters} />
      </div>
    );
  }
}
