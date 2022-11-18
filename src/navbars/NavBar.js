import { Box } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { NAV_ITEMS } from "../constants";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useAuth0 } from "@auth0/auth0-react";

const NavBar = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();

  return (
    <>
      {/* To change to "isAuthenticated" once Auth0 is done */}
      {!isAuthenticated && (
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
                  item.name !== "account" && item.name !== "addBet"
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
      )}
    </>
  );
};

export default NavBar;
