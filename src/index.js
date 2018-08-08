import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import CRouter from "./routes";
import { Provider } from "react-redux";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, applyMiddleware } from "redux";
import reducer from "./reducers";
import { logger } from "redux-logger";

let store = createStore(reducer, applyMiddleware(logger));

ReactDOM.render(
  <Provider store={store}>
    <CRouter />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
