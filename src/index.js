//Полифиллы
import "core-js/stable"
import "core-js/features/set";
import "core-js/features/map";
import "regenerator-runtime/runtime";
import "whatwg-fetch";

import React from "react";
import ReactDOM from "react-dom";
import {Main} from "./scripts/Main"


ReactDOM.render(
    (<Main/>),document.getElementById("root")
)
