import moment from "moment";

import Page from "../components/Page";
import ListView from "../components/ListView";
import FavoriteTeam from "../components/FavoriteTeam";

// Supose date is formatted as YYYY/MM/DD
function parseDate(dateStr) {
  if (!dateStr) {
    return moment();
  }
  return moment(dateStr, "YYYY/MM/DD");
}

const Games = props => (
  <Page>
    <ListView date={parseDate(props.url.query.date)} />
  </Page>
);

export default Games;
