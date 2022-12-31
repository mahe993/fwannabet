import { Box } from "@mui/material";
import React from "react";
import FriendCard from "./FriendCard";
import CircularProgress from "@mui/material/CircularProgress";

const FriendsList = (props) => {
  const { friends, setFriends, loadingData, setLoadingFriendsPage } = props;


  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
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
          <Box
            className="pending-friend-cards-container"
            width="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={1}
          >
            {friends?.pending?.requestee?.map((connection) => (
              <FriendCard
                key={connection.id}
                connection={connection}
                setLoadingFriendsPage={setLoadingFriendsPage}
              />
            ))}
            {friends?.pending?.requestor?.map((connection) => (
              <FriendCard
                key={connection.id}
                connection={connection}
                setLoadingFriendsPage={setLoadingFriendsPage}
              />
            ))}
          </Box>
        )}
      </Box>
      <Box
        className="accepted-friends-container"
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={1}
      >
        <Box
          className="accepted-friends-title"
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
          <Box
            className="accepted-friend-cards-container"
            width="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={1}
          >
            {friends?.accepted?.map((connection) => (
              <FriendCard
                key={connection.id}
                connection={connection}
                setLoadingFriendsPage={setLoadingFriendsPage}
              />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default FriendsList;
