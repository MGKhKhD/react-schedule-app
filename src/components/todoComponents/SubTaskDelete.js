import React from "react";
import { withHandlers } from "recompose";
import BasicComponents from "../BasicComponents";

const enhance = withHandlers({
  deleteClick: props => () => props.deleteClick()
});

const SubTaskDelete = enhance(({ deleteClick }) => (
  <BasicComponents.Span onClick={deleteClick} className="float-right">
    X
  </BasicComponents.Span>
));

export default SubTaskDelete;
