import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import AppRoutes from "./routes";

const rootElement = document.getElementById("root");
ReactDOM.render(<AppRoutes />, rootElement);
serviceWorker.unregister();
