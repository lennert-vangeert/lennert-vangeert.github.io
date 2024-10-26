import React from "react";
import ReactDOM from "react-dom/client";
import Counter from "./Counter/Counter";  
import "./css/reset.css";
import "./css/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Counter />
  </React.StrictMode>
);
