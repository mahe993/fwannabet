import React from "react";
import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import LandingPage from "../pages/LandingPage";
import TestPage from "../pages/TestPage";
import HomePage from "../pages/HomePage";
import AccountPage from "../pages/AccountPage";

const Router = () => {
  // All routes to be siblings. No child routes unless neccessary to prevent unneccessary use of <Outlet />
  return (
    <Routes>
      <Route path="/" element=<LandingPage /> />
      <Route path="/home" element=<HomePage /> />
      <Route path="/account" element=<AccountPage /> />

      <Route path="/test" element=<TestPage /> />
      <Route
        path="*"
        element={
          <Box component="p" p="1rem" display="flex" justifyContent="center">
            There's nothing here!
          </Box>
        }
      />
    </Routes>
  );
};

export default Router;
