import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./memo.css";
import { IsLoginProvider } from "./hooks";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <IsLoginProvider>
      <App />
    </IsLoginProvider>
  </React.StrictMode>,
);
