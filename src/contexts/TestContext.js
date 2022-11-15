import React, { useContext, useState } from "react";

const TestContext = React.createContext();

export const TestContextProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState("test");

  return (
    <TestContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </TestContext.Provider>
  );
};

export const useTestContext = () => {
  const context = useContext(TestContext);

  if (context === undefined) {
    throw new Error("useTestContext must be used within TestContextProvider");
  }

  return context;
};
