import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./auth/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <Helmet
        meta={[
          {
            name: `theme-color`,
            content: "#1e40af",
          },
        ]}
      ></Helmet>
      <App />
    </AuthProvider>
  </BrowserRouter>,
);
