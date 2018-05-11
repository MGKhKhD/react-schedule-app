import React from "react";

import CountingTagHeaderContainer from "../../containers/todos/CountingTagHeaderContainer";
import FooterOptions from "../../containers/todos/FooterOptions";

const colors = {
  ALL: "black",
  ACTIVE: "red",
  COMPLETED: "green",
  TOGGLE_ALL: "grey",
  DELETE_COMPLETED: "blue",
  ARCHIVES: "brown"
};

const Footer = () => {
  return (
    <p>
      <FooterOptions colors={colors} />
      <CountingTagHeaderContainer colors={colors} />
    </p>
  );
};

export default Footer;
