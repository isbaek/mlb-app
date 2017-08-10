import React from "react";

import Table from "./Table";
import fetchGame from "./utils/fetchGame.js";

// column labels for batting table
const COLUMNS = [
  { Header: "Name", accessor: "name" },
  { Header: "AB", accessor: "ab", minWidth: 20 },
  { Header: "R", accessor: "r", minWidth: 20 },
  { Header: "H", accessor: "h", minWidth: 20 },
  { Header: "RBI", accessor: "rbi", minWidth: 20 },
  { Header: "BB", accessor: "bb", minWidth: 20 },
  { Header: "SO", accessor: "so", minWidth: 20 },
  { Header: "LOB", accessor: "lob", minWidth: 20 },
  { Header: "AVG", accessor: "avg", minWidth: 20 },
  { Header: "OPS", accessor: "ops", minWidth: 20 }
];

export default function BattingTable({ game }) {
  return (
    <div>
      <Table data={game} columns={COLUMNS} />
    </div>
  );
}
