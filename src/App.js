import React from "react";
import { BrowserRouter } from "react-router-dom";
import { TestContextProvider } from "./contexts/TestContext";
import NavBar from "./navbars/NavBar";
import Router from "./router/Router";

const App = () => {
  return (
    <BrowserRouter>
      <TestContextProvider>
        <Router />
        <NavBar />
      </TestContextProvider>
    </BrowserRouter>
  );
};

export default App;
