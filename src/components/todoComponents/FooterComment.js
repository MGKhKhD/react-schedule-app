import React from "react";
import FotterItem from "../FotterItem";
import BasicComponents from "../BasicComponents";

import { comment_items } from "../../types";

const FooterComment = ({ onClick }) => (
  <BasicComponents.Repeat numItems={comment_items.length}>
    {idx => (
      <FotterItem
        key={idx}
        text={comment_items[idx]}
        color="red"
        onClick={() => onClick(comment_items[idx])}
      />
    )}
  </BasicComponents.Repeat>
);

export default FooterComment;
