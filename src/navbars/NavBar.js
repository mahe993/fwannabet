import { Box } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { NAV_ITEMS } from "../constants";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box
        className="nav-bar"
        bgcolor="#222222"
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
