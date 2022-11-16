import React from "react";
import { BrowserRouter } from "react-router-dom";
import Auth0ProviderWithRedirectCallback from "./contexts/Auth0ProviderWithRedirectCallback";
import { TestContextProvider } from "./contexts/TestContext";
import NavBar from "./navbars/NavBar";
import Router from "./router/Router";

const App = () => {
  return (
    <BrowserRouter>
      <Auth0ProviderWithRedirectCallback>
        <TestContextProvider>
          <Router />
          <NavBar />
        </TestContextProvider>
      </Auth0ProviderWithRedirectCallback>
    </BrowserRouter>
  );
};

export default App;
