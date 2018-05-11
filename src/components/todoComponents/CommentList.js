import React from "react";

import CommentListLiTag from "./CommentListLiTag";
import CommentListChildren from "../../containers/todos/CommentListChildren";
import BasicComponents from "../BasicComponents";

const CommentList = ({
  comments,
  restricted,
  changingComment,
  commentManagement
}) => (
  <BasicComponents.List numItems={comments.length}>
    {idx => {
      const comment = comments[idx];
      return (
        <CommentListLiTag key={idx} comment={comment}>
          {({ commentId, mouse }) => {
            const mouseInfo = { commentId, mouse };
            return (
              <CommentListChildren
                comment={comment}
                commentManagement={commentManagement}
                restricted={restricted}
                changingComment={changingComment}
                mouseInfo={mouseInfo}
              />
            );
          }}
        </CommentListLiTag>
      );
    }}
  </BasicComponents.List>
);

export default CommentList;
