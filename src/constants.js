import { Box, createTheme } from "@mui/material";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import MenuPopover from "./components/MenuPopover";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PeopleIcon from "@mui/icons-material/People";
import CreateBetDialog from "./components/CreateBetDialog";

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
  { name: "addBet", icon: <CreateBetDialog />, path: "/test" },
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

export const returnFileSize = (number) => {
  if (number < 1024) {
    return `${number} bytes`;
  } else if (number >= 1024 && number < 1048576) {
    return `${(number / 1024).toFixed(1)} KB`;
  } else if (number >= 1048576) {
    return `${(number / 1048576).toFixed(1)} MB`;
  }
};

// for image clipping
export const createClippedImage = (numberOfImages, imgSource) => {
  const images = [];
  const totalImages = Math.ceil(numberOfImages);
  let clipping = "0%";
  for (let i = 0; i < totalImages; i++) {
    if (i === totalImages - 1) {
      clipping = `${(totalImages - numberOfImages) * 100}%`;
    }
    images.push(
      <Box
        height={25}
        width={25}
        display="flex"
        key={i}
        css={css`
          clip-path: inset(0% ${clipping} 0% 0%);
        `}
      >
        <img
          src={imgSource}
          alt="clipped"
          css={css`
            width: 100%;
            height: 100%;
          `}
        />
      </Box>
    );
  }
  return images;
};
