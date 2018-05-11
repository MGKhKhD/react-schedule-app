import React from "react";
import { withHandlers } from "recompose";

import BasicComponents from "../BasicComponents";

const SubTaskDate = withHandlers({
  click: ({ headerClick }) => () => headerClick()
})(({ dueDate, click }) => (
  <BasicComponents.Span onClick={click}>{dueDate}</BasicComponents.Span>
));

export default SubTaskDate;
