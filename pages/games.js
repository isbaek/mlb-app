import Page from "../components/Page";
import ListView from "../components/ListView";

const Games = (props) => (
  <Page>
    <ListView date={props.url.query.date} />
  </Page>
);

export default Games;
