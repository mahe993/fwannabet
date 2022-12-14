import { Box } from "@mui/material";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Auth0ProviderWithRedirectCallback from "./contexts/Auth0ProviderWithRedirectCallback";
import { UserContextProvider } from "./contexts/UserContext";
import { WalletContextProvider } from "./contexts/WalletContext";
import NavBar from "./navbars/NavBar";
import Router from "./router/Router";

const App = () => {
  return (
    <BrowserRouter>
      <Auth0ProviderWithRedirectCallback>
        <UserContextProvider>
          <WalletContextProvider>
            <Box display="flex" flexDirection="column">
              <Box height="92vh" overflow="scroll">
                <Router />
              </Box>
              <Box>
                <NavBar height="8vh" />
              </Box>
            </Box>
          </WalletContextProvider>
        </UserContextProvider>
      </Auth0ProviderWithRedirectCallback>
    </BrowserRouter>
  );
};

export default App;
