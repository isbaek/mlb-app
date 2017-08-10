import React from "react";
import DatePick from "react-datepicker";
import moment from "moment";

export default function DatePicker(props) {
  return (
    <DatePick
      placeholderText="Click to select a date"
      todayButton={"Today"}
      dateFormat="MM/DD/YYYY"
      selected={props.date}
      onChange={(date) => props.onChange(date)}
    />
  );
}
