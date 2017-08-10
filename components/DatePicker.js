import React from "react";
import DatePick from "react-datepicker";
import moment from "moment";

export default class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: props.date
    };
  }

  change = ({ date }) => {
    if (this.props.onChange) {
      this.props.onChange(date);
    }
    this.setState({ startDate: date });
  };

  componentWillReceiveProps({ date }) {
    this.setState({ date: date });
  }

  render() {
    return (
      <DatePick
        placeholderText="Click to select a date"
        todayButton={"Today"}
        dateFormat="MM/DD/YYYY"
        selected={this.props.startDate}
        onChange={this.change}
      />
    );
  }
}
