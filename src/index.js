import React from "react";
import ReactDOM from "react-dom";
import bootstrap from "bootstrap"; // eslint-disable-line no-unused-vars
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import "./index.css";
import * as serviceWorker from "./serviceWorker";
import GalleryUpload from "./screens/gallery-upload";
import AppRoutes from "./routes";

const rootElement = document.getElementById("root");
ReactDOM.render(<AppRoutes />, rootElement);
serviceWorker.unregister();
