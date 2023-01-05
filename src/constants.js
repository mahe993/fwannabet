import { Box, createTheme } from "@mui/material";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import HomeIcon from "@mui/icons-material/Home";
import MenuPopover from "./components/MenuPopover";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PeopleIcon from "@mui/icons-material/People";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

/* eslint-disable default-case */
const backendURL = (devEnv) => {
  switch (devEnv) {
    case "development":
      return process.env.REACT_APP_DEVELOPMENT_BACKEND_URL;

    case "production":
      return process.env.REACT_APP_PRODUCTION_BACKEND_URL;
  }
};

export const BACKEND_URL = backendURL(process.env.NODE_ENV);

// for material UI useMedia hook
export const BREAKPOINT = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 800,
      laptop: 1024,
      desktop: 1200,
    },
  },
});

// for nav bar
export const NAV_ITEMS = [
  { name: "home", icon: <HomeIcon />, path: "/home" },
  { name: "friends", icon: <PeopleIcon />, path: "/friends" },
  { name: "addBet", icon: <AddCircleIcon />, path: "/createbet" },
  { name: "wallet", icon: <MonetizationOnIcon />, path: "/wallet" },
  { name: "menu", icon: <MenuPopover />, path: "/test" },
];

// for menu popover
export const POPOVER_ITEMS = [
  { name: "Account", path: "/account" },
  { name: "Logout", path: "" },
];

// for image upload preview
const FILE_TYPES = ["image/jpeg", "image/png", "image/jpg"];

export const validateFileType = (file) => {
  return FILE_TYPES.includes(file.type);
};

// for create bet pagination
export const PAGE_STEPS = [
  "Bet Type",
  "Bet Details",
  "Odds",
  "Min/Max Bet",
  "Expiry",
];

// for create bet page instructions
export const PAGE_INSTRUCTIONS = [
  "Select the type of bet you want to create",
  "Enter a description that you and your friends understand",
  "Set the payout odds for this bet line\nOdds can only be to 1 decimal point, minimum 1.1",
  "Set the min and max bet you are willing to take\nMax bet cannot exceed your (wallet balance) / (bet odds)\n e.g. wallet balance = $100, bet odds = 3.0, max bet = $33",
  "Set when this betline will close and\nwhen the results will be verified",
];

// for create bet type options
export const BET_TYPES = [
  "Custom",
  "Weather (feature coming soon)",
  "Basketball (feature coming soon)",
  "Soccer (feature coming soon)",
  "Tennis (feature coming soon)",
];
