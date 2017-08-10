import React from "react";
import Link from "next/link";

// libs
import _ from "lodash";
import moment from "moment";

// components
import ListView from "./ListView";
import FavoriteTeam from "./FavoriteTeam";

export default class Homepage extends React.Component {
  render() {
    return (
      <div>
        <ListView date={moment("2017/08/09", "YYYY/MM/DD")} />
      </div>
    );
  }
}
