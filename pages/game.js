import Page from "../components/Page";
import DetailView from "../components/DetailView";

const Game = props => (
  <Page>
    <DetailView gameDataDirectory={props.url.query.id} />
  </Page>
);

export default Game;
