import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Popover } from "@mui/material";
import { POPOVER_ITEMS } from "../constants";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const MenuPopover = () => {
  const [popoverAnchor, setPopoverAnchor] = useState(null);

  const { logout } = useAuth0();
  const navigate = useNavigate();

  return (
    <>
      <MenuIcon onClick={(e) => setPopoverAnchor(e.currentTarget)} />
      <Popover
        open={!!popoverAnchor}
        anchorEl={popoverAnchor}
        onClose={() => {
          setPopoverAnchor(null);
        }}
        anchorOrigin={{
          vertical: 0,
          horizontal: "left",
        }}
        transformOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Box display="flex" flexDirection="column">
          {POPOVER_ITEMS.map((item) => {
            return (
              <Box
                key={item.name}
                border={1}
                color="black"
                p={1}
                onClick={
                  item.path === ""
                    ? () => logout({ returnTo: window.location.origin })
                    : () => {
                        setPopoverAnchor(null);
                        navigate(item.path);
                      }
                }
                css={css`
                  cursor: pointer;
                `}
              >
                {item.name}
              </Box>
            );
          })}
        </Box>
      </Popover>
    </>
  );
};

export default MenuPopover;
