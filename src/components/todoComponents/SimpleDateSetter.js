import React, { Component } from "react";
import BasicComponents from "../BasicComponents";

class SimpleDateSetter extends Component {
  constructor(props) {
    super(props);
    this.date = new Date();
    this.state = {
      year: this.date.getFullYear(),
      month: this.date.getMonth(),
      day: this.date.getDate(),
      status: "y"
    };
  }

  handleYearClick = year => {
    this.setState({
      ...this.state,
      year,
      status: "m"
    });
  };

  handleMonthClick = month => {
    this.setState({
      ...this.state,
      month,
      status: "d"
    });
  };

  handleDayClick = day => {
    this.setState({
      ...this.state,
      day,
      status: ""
    });
    this.handleClose();
  };

  handleClose = () => {
    const { year, month, day } = this.state;
    this.props.closeToolTipDate({ year, month, day });
  };

  setMonthOptions = month => {
    let arr = [];
    let len = 12 - month;
    while (len--) arr[len] = month + len + 1;
    return arr;
  };

  setDayOptions = day => {
    let arr = [];
    let len = 31 - day;
    while (len--) arr[len] = day + len + 1;
    return arr;
  };

  handleClick = date => {
    if (this.state.status === "y") {
      this.handleYearClick(date);
      return;
    }

    if (this.state.status === "m") {
      this.handleMonthClick(date);
      return;
    }
    if (this.state.status === "d") {
      this.handleDayClick(date);
      return;
    }
    return;
  };

  render() {
    const dayName = ["Mon", "Thu", "Wed", "Thr", "Fri", "Sat", "Sun"];
    const { year, month, day, status } = this.state;
    const yearOptions = [year, year + 1, year + 2];
    const monthOptions =
      year === new Date().getFullYear()
        ? this.setMonthOptions(month)
        : this.setMonthOptions(1);
    const dayOptions =
      month === new Date().getMonth()
        ? this.setDayOptions(day)
        : this.setDayOptions(1);
    const selectTitle =
      status === "y" ? "year" : status === "m" ? "month" : "day";
    const options =
      status === "y" ? yearOptions : status === "m" ? monthOptions : dayOptions;
    return (
      <div className="row">
        <BasicComponents.Span className="flout-left">
          Select {selectTitle}
        </BasicComponents.Span>
        <BasicComponents.Dropdown
          onClick={this.handleClick}
          options={options}
          name={selectTitle}
          mainButtonClassName="btn-secondary"
        />
        <BasicComponents.Span
          style={{ color: "red" }}
          className="flout-right"
          onClick={() => this.props.closeToolTipDate(null)}
        >
          X
        </BasicComponents.Span>
      </div>
    );
  }
}

export default SimpleDateSetter;
