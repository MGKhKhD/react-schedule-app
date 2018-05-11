import React from "react";
import { withHandlers } from "recompose";

const enhance = withHandlers({
  descriptionClick: props => () => {
    if (props.title !== "+ add new sub task") {
      props.handleDescriptionClick();
      return;
    }
    return;
  }
});

const SubTodoDescriptionP = enhance(({ description, descriptionClick }) => (
  <p className="card-text" onClick={descriptionClick}>
    {description}
  </p>
));

export default SubTodoDescriptionP;
