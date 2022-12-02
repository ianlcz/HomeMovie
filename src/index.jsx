import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./index.css";
import App from "./App";
import Providers from "./contexts/Providers";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Providers>
      <Helmet
        meta={[
          { name: "description", content: "Gérez votre collection de films" },
          { name: "application-name", content: "HomeMovie" },
          { name: "apple-mobile-web-app-title", content: "HomeMovie" },
          { property: "og:image", content: "%PUBLIC_URL%/image-cover.png" },
          {
            property: "og:image:secure_url",
            content: "%PUBLIC_URL%/image-cover.png",
          },
          {
            name: `theme-color`,
            content: "#1e40af",
          },
        ]}
      >
        <title>HomeMovie</title>
      </Helmet>
      <App />
    </Providers>
  </BrowserRouter>,
);
