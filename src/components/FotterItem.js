import React from "react";

import BasicComponents from "./BasicComponents";

const FotterItem = ({ onClick, color, text, clicked }) => {
  let index = text.indexOf("_");
  let print;
  if (index === -1) {
    print =
      text.substring(0, 1).toUpperCase() + text.substring(1).toLowerCase();
  } else {
    print =
      text.substring(0, 1).toUpperCase() +
      text.substring(1, index + 1).toLowerCase() +
      text.substring(index + 1, index + 2).toUpperCase() +
      text.substring(index + 2).toLowerCase();
  }
  return (
    <BasicComponents.Span
      style={{ color: color, fontSize: clicked === text ? "1.3rem" : "1rem" }}
      onClick={onClick}
      className="mr-1 ml-1"
    >
      {print}
      {"     "}
    </BasicComponents.Span>
  );
};

export default FotterItem;
