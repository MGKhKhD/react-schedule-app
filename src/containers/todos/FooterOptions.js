import React, { Component } from "react";

import { filters_constants } from "../../types";
import { connect } from "react-redux";
import { setFilter } from "../../actions/todoActions";

import FotterItem from "../../components/FotterItem";
import BasicComponents from "../../components/BasicComponents";

class FooterOptions extends Component {
  constructor(props) {
    super(props);
    this.state = { clicked: filters_constants[0] };
  }

  handleClick = item => {
    this.setState({ clicked: filters_constants[item] });
    this.props.setFilter(filters_constants[item]);
  };

  render() {
    return (
      <BasicComponents.Repeat
        numItems={filters_constants.length}
        obj={filters_constants}
      >
        {item => (
          <FotterItem
            key={item}
            onClick={() => this.handleClick(item)}
            color={this.props.colors[item]}
            text={filters_constants[item]}
            clicked={this.state.clicked}
          />
        )}
      </BasicComponents.Repeat>
    );
  }
}

export default connect(null, { setFilter })(FooterOptions);
