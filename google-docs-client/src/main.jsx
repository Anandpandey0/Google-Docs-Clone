import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-v3hm8sffm8n6kjwn.us.auth0.com"
      clientId="cEEDQw5tTdPoKJ51mkbMZuKc5cU6ipyv"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <ChakraProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </Auth0Provider>
  </React.StrictMode>
);
