import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bulma/css/bulma.min.css";

import { Provider } from "react-redux";
import store from "./state/store";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
