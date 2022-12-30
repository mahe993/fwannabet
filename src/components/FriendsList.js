import { Box } from "@mui/material";
import React from "react";
import FriendCard from "./FriendCard";
import CircularProgress from "@mui/material/CircularProgress";

const FriendsList = (props) => {
  const { friends, setFriends, loadingData } = props;

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
      <Box
        className="pending-friends-container"
        width="100%"
        minHeight="20vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={1}
      >
        <Box
          className="pending-friends-title"
          alignSelf="flex-start"
          fontStyle="italic"
          fontWeight="bold"
          fontSize={18}
        >
          Pending:
        </Box>
        {loadingData ? (
          <CircularProgress />
        ) : (
          <Box className="pending-friends-cards-container">
            {friends?.pending?.requestee?.map((user) => (
              <FriendCard key={user.id} user={user} />
            ))}
            {friends?.pending?.requestor?.map((user) => (
              <FriendCard key={user.id} user={user} />
            ))}
          </Box>
        )}
      </Box>
      <Box
        alignSelf="flex-start"
        fontStyle="italic"
        fontWeight="bold"
        fontSize={18}
      >
        Friends{!loadingData && `(${friends?.accepted?.length})`}:
      </Box>
      {loadingData ? (
        <CircularProgress />
      ) : (
        <Box>
          {friends?.accepted?.map((user) => (
            <FriendCard user={user} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default FriendsList;
