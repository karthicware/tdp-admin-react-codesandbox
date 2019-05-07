import React from "react";
import ReactDOM from "react-dom";
import bootstrap from "bootstrap"; // eslint-disable-line no-unused-vars
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import "./styles.css";
import GalleryUpload from "./screens/gallery-upload";

function App() {
  return (
    <div className="container">
      <div className="jumbotron text-center mt-2">
        <h3>Gallery Uploads</h3>
      </div>
      <GalleryUpload />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
