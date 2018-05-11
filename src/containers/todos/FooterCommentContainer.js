import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import { setCommentModify, deleteComment } from "../../actions/todoActions";
import { getTotalUnArchivedTodos } from "../../selectors/todoSelectors";

import FooterComment from "../../components/todoComponents/FooterComment";

const mapStateToProps = state => ({
  totalTodos: getTotalUnArchivedTodos(state.todoState)
});

const enhance = compose(
  connect(mapStateToProps, { deleteComment, setCommentModify }),
  withHandlers({
    footerClick: props => item => {
      if (item === "Delete") {
        props.deleteComment(props.id);
      } else if (item === "Modify") {
        props.setCommentModify(props.id);
        props.setUnderModification(props.id);
      } else if (item === "Move to") {
        !props.movingComment.status
          ? props.setCommentState({ status: true, from: props.id })
          : props.setCommentState({ status: false, from: -1 });
      }
    }
  })
);

const FooterCommentContainer = enhance(({ footerClick, totalTodos }) => (
  <FooterComment onClick={footerClick} totalTodos={totalTodos} />
));

export default FooterCommentContainer;
