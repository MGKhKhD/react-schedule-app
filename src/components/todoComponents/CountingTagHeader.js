import React, { Component } from "react";
import { Motion, spring, presets } from "react-motion";
import { filters_constants } from "../../types";

import BasicComponents from "../BasicComponents";

class CountingTagHeader extends Component {
  render() {
    return (
      <Motion
        defaultStyle={{ x: 0 }}
        style={{
          x: spring(this.props.totalTodos, {
            ...presets.gentle,
            precision: 10
          })
        }}
      >
        {value => (
          <BasicComponents.Span
            className="float-right mr-4"
            style={{ color: this.props.color }}
          >
            {value.x} todos{" "}
            {this.props.activeFilter === filters_constants.ARCHIVES
              ? "archived"
              : "left"}
          </BasicComponents.Span>
        )}
      </Motion>
    );
  }
}

export default CountingTagHeader;
