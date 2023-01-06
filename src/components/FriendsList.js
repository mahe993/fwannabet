import { Box } from "@mui/material";
import React from "react";
import FriendCard from "./FriendCard";

const FriendsList = (props) => {
  const { friends, fetchFriends, loadingData, setLoadingData, getValues } =
    props;

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
      {friends?.pending && (
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
                fetchFriends={fetchFriends}
                key={connection.id}
                connection={connection}
                setLoadingData={setLoadingData}
                getValues={getValues}
              />
            ))}
            {friends?.pending?.requestor?.map((connection) => (
              <FriendCard
                fetchFriends={fetchFriends}
                key={connection.id}
                connection={connection}
                setLoadingData={setLoadingData}
                getValues={getValues}
              />
            ))}
          </Box>
        </Box>
      )}
      {friends?.accepted && (
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
                fetchFriends={fetchFriends}
                key={connection.id}
                connection={connection}
                setLoadingData={setLoadingData}
                getValues={getValues}
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default FriendsList;
