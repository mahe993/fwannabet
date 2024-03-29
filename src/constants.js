import { createTheme } from "@mui/material";
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
  { name: "My Betlines", path: "/user/betlines" },
  { name: "My Bets", path: "/user/bets" },
  { name: "Account", path: "/account" },
  { name: "Help", path: "/help" },
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
  "Bet Odds",
  "Max Bet",
  "Min Bet",
  "Expiry",
];

// for create bet page instructions
export const PAGE_INSTRUCTIONS = [
  "Select the type of bet you want to create",
  "Enter a description that you and your friends understand\nIt should describe the scenario your friends want to see happen\ni.e. If the scenario happens, your friends win",
  "Set the payout odds for this bet line\nOdds can only be to 1 decimal point, minimum 1.1",
  "To ensure credit worthines, our rules are\n(Max loss) cannot exceed your (wallet balance)\n e.g. wallet balance = $100, bet odds = 3.0, max bet = $33\nthe max amount you will potentially lose is\n(bet odds * max bet) - (max bet)",
  "Set the minimum bet amount each player can play\nMin Bet must be at least $1 and cannot exceed Max bet\n e.g. Max Bet = $100, Min Bet = $1 - $100 inclusive ",
  "Set cut off time for this betline\nMinimum cut off time is 1 hour from creation",
];

// for create bet type options
export const BET_TYPES = [
  "Custom",
  "Weather (feature coming soon)",
  "Basketball (feature coming soon)",
  "Soccer (feature coming soon)",
  "Tennis (feature coming soon)",
];

// for wallet transfer method type options
export const TRANSFER_METHODS = [
  { value: "bankTransfer", label: "Bank Transfer" },
  { value: "qRCode", label: "PayNow/PayLah" },
  { value: "swiftCode", label: "Telegraphic Transfer" },
];
