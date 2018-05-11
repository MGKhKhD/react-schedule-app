import React from "react";
import { mapProps, compose, withHandlers } from "recompose";
import { pickKeys } from "../../utils";

const enhance = compose(
  mapProps(props =>
    pickKeys(props, ["handleTitleClick", "title", "toggleSubTask"])
  ),
  withHandlers({
    titleClick: props => () => {
      if (props.title === "+ add new sub task") {
        props.handleTitleClick();
      } else {
        props.toggleSubTask();
      }
    }
  })
);

const SubTodoTitleH = enhance(props => (
  <h5 className="card-title" onClick={props.titleClick}>
    {props.title}
  </h5>
));

export default SubTodoTitleH;
