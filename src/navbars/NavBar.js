import { Box } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { NAV_ITEMS } from "../constants";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box
        className="nav-bar"
        bgcolor="#222222"
        width="100%"
        height="8vh"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        pl={2}
        pr={2}
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
              css={css`
                cursor: pointer;
              `}
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
