import React from "react";
import ReactDOM from "react-dom";
import { MainView } from "./views/main";

import "../styles/index.scss";

const root = document.getElementById("app");

ReactDOM.render(<MainView title="Electron Base Template" />, root);

if (module.hot) {
    module.hot.accept();
}
