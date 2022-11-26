import React from "react";

export const userContext = React.createContext();

export default function UserContextProvider({ children }) {
  const [userLoaded, setUserLoaded] = React.useState(null);

  return (
    <userContext.Provider value={{ userLoaded, setUserLoaded }}>
      {children}
    </userContext.Provider>
  );
}
