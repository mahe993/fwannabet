import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { debounce } from "lodash";
import FriendsList from "../components/FriendsList";
import PageHeader from "../components/PageHeader";
import FriendCard from "../components/FriendCard";

const FriendsPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // do a axios get request using search value and update searchResults

  // Debounce the search so it only runs after a certain amount of time has passed
  // without any new input (to avoid making unnecessary network requests)
  const debouncedSearch = debounce(() => {
    // Make a GET request to the server to search for users
    //   fetch(`/search?q=${query}`)
    //    .then(response => response.json())
    //    .then(data => setSearchResults(data.results));
  }, 500);

  useEffect(() => {
    // Run the debounced search when the searchValue changes
    debouncedSearch();
  }, [searchValue]);

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <PageHeader header="Friends" />
      <Box
        width="95vw"
        color="orange" // orange to indicate TBD. remove when you start developing
      >
        {/* Insert search bar to search for users. Search value should be
        debounced/throttled to make a get request. this is NOT a react hook form
        input */}
        <form>
          <label htmlFor="search-box">Search:</label>
          <input
            type="text"
            id="search-box"
            placeholder="Search for your friends"
            value={searchValue}
            onChange={handleChange}
          />
        </form>
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
        {/* <FriendCard /> */}
      </Box>
    </Box>
  );
};

export default FriendsPage;
