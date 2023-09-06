import { Box, useMediaQuery } from "@mui/material";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Auth0ProviderWithRedirectCallback from "./contexts/Auth0ProviderWithRedirectCallback";
import { UserContextProvider } from "./contexts/UserContext";
import { WalletContextProvider } from "./contexts/WalletContext";
import NavBar from "./navbars/NavBar";
import Router from "./router/Router";
import { BREAKPOINT } from "./constants";

const App = () => {
  const responsive = useMediaQuery(BREAKPOINT.breakpoints.up("tablet"));

  return (
    <BrowserRouter>
      <Auth0ProviderWithRedirectCallback>
        <UserContextProvider>
          <WalletContextProvider>
            <Box display="flex" height="100vh">
              {responsive && (
                <Box display="flex" flex={1} bgcolor="black"></Box>
              )}
              <Box
                display="flex"
                flex={1}
                flexDirection="column"
                overflow="hidden"
              >
                <Box flex={1} overflow="scroll">
                  <Router />
                </Box>
                <Box width="100%">
                  <NavBar />
                </Box>
              </Box>
              {responsive && (
                <Box display="flex" flex={1} bgcolor="black"></Box>
              )}
            </Box>
          </WalletContextProvider>
        </UserContextProvider>
      </Auth0ProviderWithRedirectCallback>
    </BrowserRouter>
  );
};

export default App;
