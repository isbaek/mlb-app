import React from "react";

import Table from "./Table";
import fetchGame from "./utils/fetchGame.js";

// column labels for table
function genColumns(home) {
  return [].concat(
    { Header: "Team Name", accessor: "name" },
    // Dynamically generate inning columns
    _.range(1, home.scores.length + 1).map(inning => ({
      Header: String(inning),
      accessor: `scores.${inning - 1}`,
      minWidth: 20
    })),
    { Header: "R", accessor: "runs", minWidth: 20 },
    { Header: "H", accessor: "hits", minWidth: 20 },
    { Header: "E", accessor: "errors", minWidth: 20 }
  );
}

export default function ScoreTable({ game }) {
  // Columns will vary depending on number of innings
  // so we need to generate them dynamically
  const columns = genColumns(game.home);

  return <Table className="ScoreTable -striped -highlight" data={[game.home, game.away]} columns={columns} />;
}
