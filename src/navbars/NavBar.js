import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NAV_ITEMS } from "../constants";
import Popover from "@mui/material/Popover";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box
        className="nav-bar"
        bgcolor="#111111"
        width="100%"
        height="8vh"
        position="fixed"
        bottom={0}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        pl={1}
        pr={1}
      >
        {NAV_ITEMS.map((item) => {
          return (
            <Box
              key={item.name}
              onClick={
                item.name !== "menu"
                  ? () => {
                      navigate(item.path);
                    }
                  : null
              }
            >
              {item.icon}
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default NavBar;
