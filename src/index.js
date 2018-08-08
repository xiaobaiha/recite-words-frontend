import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import CRouter from "./routes";
import { Provider } from "react-redux";
import registerServiceWorker from "./registerServiceWorker";
import { createStore } from "redux";
import reducer from "./reducers";

let store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <CRouter />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
