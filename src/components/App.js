import React from "react";

import Header from "../containers/Header";

const App = () => (
  <div className="container mt-4 ">
    <div className="row justify-content-md-center">
      <div
        className="card card-inverse"
        style={{
          backgroundColor: "#e1e9e96b",
          bordeColor: "#333",
          width: "50rem"
        }}
      >
        <Header />
      </div>
    </div>
  </div>
);

export default App;
