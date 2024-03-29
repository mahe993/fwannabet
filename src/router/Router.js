import React from "react";
import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import LandingPage from "../pages/LandingPage";
import HomePage from "../pages/HomePage";
import AccountPage from "../pages/AccountPage";
import ProtectedRoute from "./ProtectedRoute";
import FriendsPage from "../pages/FriendsPage";
import CreateBetPage from "../pages/CreateBetPage";
import WalletPage from "../pages/WalletPage";
import MyBetlinesPage from "../pages/MyBetlinesPage";
import FriendBetlinesPage from "../pages/FriendBetlinesPage";
import MyBetsPage from "../pages/MyBetsPage";
import BetDetails from "../pages/BetDetails";
import HelpPage from "../pages/HelpPage";

const Router = () => {
  // All routes to be siblings. No child routes unless neccessary to prevent unneccessary use of <Outlet />
  return (
    <Routes>
      <Route path="/" element=<LandingPage /> />
      <Route path="/help" element=<HelpPage /> />
      <Route path="/home" element=<ProtectedRoute component={HomePage} /> />
      <Route
        path="/account"
        element=<ProtectedRoute component={AccountPage} />
      />
      <Route path="/wallet" element=<ProtectedRoute component={WalletPage} /> />
      <Route
        path="/friends"
        element=<ProtectedRoute component={FriendsPage} />
      />
      <Route
        path="/createbet"
        element=<ProtectedRoute component={CreateBetPage} />
      />
      <Route
        path="/user/betlines"
        element=<ProtectedRoute component={MyBetlinesPage} />
      />
      <Route
        path="/friend/betlines/:email"
        element=<ProtectedRoute component={FriendBetlinesPage} />
      />
      <Route
        path="/user/bets/"
        element=<ProtectedRoute component={MyBetsPage} />
      />
      <Route
        path="/bet/details/:betlineId"
        element=<ProtectedRoute component={BetDetails} />
      />
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
