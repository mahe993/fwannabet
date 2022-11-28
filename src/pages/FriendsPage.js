import { Box } from "@mui/material";
import React, { useState } from "react";
import FriendsList from "../components/FriendsList";
import PageHeader from "../components/PageHeader";
import FriendCard from "../components/FriendCard";

const FriendsPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // do a axios get request using search value and update searchResults

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <PageHeader header="Friends" />
      <Box
        width="95vw"
        color="orange" // orange to indicate TBD. remove when you start developing
      >
        Insert search bar to search for users. Search value should be
        debounced/throttled to make a get request. this is NOT a react hook form
        input
      </Box>
      <Box
        className="friends-page-content"
        width="95vw"
        border={1}
        minHeight="70vh"
        p={1}
      >
        {searchValue ? (
          searchResults.map((user) => <FriendCard users={user} />)
        ) : (
          <FriendsList />
        )}
        <FriendCard />
      </Box>
    </Box>
  );
};

export default FriendsPage;
