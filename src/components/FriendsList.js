import { Box } from "@mui/material";
import React, { useState } from "react";
import FriendCard from "./FriendCard";

const FriendsList = () => {
  const [data, setData] = useState([]);

  //on mount axios get all your friends and set to data

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
      <Box
        alignSelf="flex-start"
        fontStyle="italic"
        fontWeight="bold"
        fontSize={18}
      >
        Pending:
      </Box>
      <Box
        color="orange" // orange to indicate TBD. remove when you start developing
      >
        Insert friend request invitations
        {data?.invites?.map((user) => (
          <FriendCard user={user} />
        ))}
      </Box>
      <Box
        color="orange" // orange to indicate TBD. remove when you start developing
      >
        Insert Pending friend acceptance users
        {data?.pending?.map((user) => (
          <FriendCard user={user} />
        ))}
      </Box>
      <Box
        alignSelf="flex-start"
        fontStyle="italic"
        fontWeight="bold"
        fontSize={18}
      >
        Friends({data?.accepted?.length || 0}):
      </Box>
      <Box
        color="orange" // orange to indicate TBD. remove when you start developing
      >
        Insert friends
        {data?.accepted?.map((user) => (
          <FriendCard user={user} />
        ))}
      </Box>
    </Box>
  );
};

export default FriendsList;
