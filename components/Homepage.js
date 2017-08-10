import React from "react";

// libs
import _ from "lodash";
import moment from "moment";

// components
import ListView from "./ListView";
import FavoriteTeam from "./FavoriteTeam";

// start with an example date upon entry
export default class Homepage extends React.Component {
  render() {
    return (
      <div>
        <ListView date={moment("2016/10/04", "YYYY/MM/DD")} />
      </div>
    );
  }
}
