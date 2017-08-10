import React from "react";
import ReactTable from "react-table";

export default function Table(props) {
  return <ReactTable
    showPagination={false}
    defaultPageSize={2}
    sortable={false}
    resizable={false}
    {...props}
  />;
}
