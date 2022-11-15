import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Popover } from "@mui/material";
import { POPOVER_ITEMS } from "../constants";

const MenuPopover = () => {
  const [popoverAnchor, setPopoverAnchor] = useState(null);

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
          {POPOVER_ITEMS.map((item) => (
            <Box key={item.name} border={1} color="black" p={1}>
              {item.name}
            </Box>
          ))}
        </Box>
      </Popover>
    </>
  );
};

export default MenuPopover;
