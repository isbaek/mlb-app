import React from "react";
import ReactTable from "react-table";

export default function Table(props) {
  return <ReactTable
    showPagination={false}
    defaultPageSize={props.data.length}
    sortable={false}
    resizable={false}
    {...props}
  />;
}
