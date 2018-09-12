import React from "react";
import { render } from "react-dom";
import AppMount from "./AppMount";

render(
  <AppMount />,
  document.querySelector('[data-mount]')
);