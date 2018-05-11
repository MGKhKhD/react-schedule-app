import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

import rootReducer from "./reducers/rootReducer";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";

import $ from "jquery";
import Popper from "popper.js";
window.jQuery = $;
window.Popper = Popper;
require("bootstrap");

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
