import React from "react";
import { hydrateRoot } from "react-dom/client";
import { Home } from "./pages/";

const container = document.getElementById("root");
if (container) {
    hydrateRoot(container, <Home />);
}