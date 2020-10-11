import React from "react";
import ReactDOM from "react-dom";
import {Main} from "./scripts/Main"

// eslint-disable-next-line no-undef
webshims.polyfill("forms forms-ext");

ReactDOM.render(
    (<Main/>),document.getElementById("root")
)
