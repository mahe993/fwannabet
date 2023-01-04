import React from "react";
import FriendCard from "./FriendCard";

const SearchResults = (props) => {
  const {
    searchResults,
    setLoadingData,
    fetchFriends,
    getValues,
    setSearchResults,
  } = props;

  return (
    <>
      {searchResults?.strangers?.map((connection) => (
        <FriendCard
          key={connection.id}
          connection={connection}
          setLoadingData={setLoadingData}
          fetchFriends={fetchFriends}
          getValues={getValues}
          setSearchResults={setSearchResults}
        />
      ))}
      {searchResults?.pending?.requestee?.map((connection) => (
        <FriendCard
          key={connection.id}
          connection={connection}
          setLoadingData={setLoadingData}
          fetchFriends={fetchFriends}
          getValues={getValues}
          setSearchResults={setSearchResults}
        />
      ))}
      {searchResults?.pending?.requestor?.map((connection) => (
        <FriendCard
          key={connection.id}
          connection={connection}
          setLoadingData={setLoadingData}
          fetchFriends={fetchFriends}
          getValues={getValues}
          setSearchResults={setSearchResults}
        />
      ))}
      {searchResults?.accepted?.map((connection) => (
        <FriendCard
          key={connection.id}
          connection={connection}
          setLoadingData={setLoadingData}
          fetchFriends={fetchFriends}
          getValues={getValues}
          setSearchResults={setSearchResults}
        />
      ))}
    </>
  );
};

export default SearchResults;
