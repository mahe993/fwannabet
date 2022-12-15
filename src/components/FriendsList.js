import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import FriendCard from "./FriendCard";
import { useAuth0 } from "@auth0/auth0-react";
import { BACKEND_URL } from "../constants";
import axios from "axios";

const FriendsList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // make api call here
    // API Call: data = {invited: [{id:XXX, username:XXX, profile_picture:XXX, status: invited}], pendingAccept: [{id, name, status: pending}], approved: [{id, name, status: approved}]}
    // setData
  }, []);

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
        Insert pending friend acceptance users
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
