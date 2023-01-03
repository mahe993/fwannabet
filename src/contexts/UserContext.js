import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BACKEND_URL } from "../constants";

const UserContext = React.createContext();

export const UserContextProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState();
  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();

  //upon authentication, find or create user in db
  useEffect(() => {
    if (isAuthenticated) {
      getUserDetails();
    }
  }, [isAuthenticated]);

  const getUserDetails = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      const getUser = await axios({
        url: `${BACKEND_URL}/users/getuser/${user.sub}/${user.email}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setUserDetails(getUser.data);
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <UserContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUserContext must be used within UserContextProvider");
  }

  return context;
};
