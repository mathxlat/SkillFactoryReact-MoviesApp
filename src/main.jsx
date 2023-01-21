import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { MoviesProvider } from "./context/Movies";
import App from "./App";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <MoviesProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
      </MoviesProvider>
    </AuthProvider>
  </React.StrictMode>
);
