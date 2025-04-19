
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { auth } from "@/lib/auth";

// Initialize admin user
auth.initialize();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
