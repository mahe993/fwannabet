import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BACKEND_URL } from "../constants";

const WalletContext = React.createContext();

export const WalletContextProvider = ({ children }) => {
  const [wallet, setWallet] = useState();
  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();

  //upon authentication, find or create Wallet in db
  useEffect(() => {
    if (isAuthenticated) {
      getWallet();
    }
  }, [isAuthenticated]);

  const getWallet = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      const getWallet = await axios({
        url: `${BACKEND_URL}/wallets/${user.sub}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setWallet(getWallet.data);
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <WalletContext.Provider value={{ wallet, setWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = () => {
  const context = useContext(WalletContext);

  if (context === undefined) {
    throw new Error(
      "useWalletContext must be used within WalletContextProvider"
    );
  }

  return context;
};
